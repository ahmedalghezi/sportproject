import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text, Line } from 'react-konva';
import { useEffect, useState } from 'react';
import { generateCoordinates } from './utils';
import ScoreBoard from './ScoreBoard';
import axios from 'axios'

const PADDING = 20
const LOGGED_IN_USER_ID = "546722"

function CognitionTest({ canvasWidth, canvasHeight, circleRadius, setOnRecordsTable, numberOfNodes }) {

  const [xs, setXs] = useState([])
  const [ys, setYs] = useState([])
  const [dragX, setDragX] = useState(xs[0])
  const [dragY, setDragY] = useState(ys[0])
  const [isDragging, setIsDragging] = useState(false)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [currentErrorIndex, setCurrentErrorIndex] = useState(-1)
  const [tries, setTries] = useState(0)
  const [visited, setVisited] = useState(Array(25))
  const [coordsVisited, setCoordsVisited] = useState([])
  const [finished, setFinished] = useState(false)
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleDragStart = () => {
    if(!timerRunning) {
      setTimerRunning(true)
    }
    setIsDragging(true)
  };

  const handleDragEnd = (pos) => {
    setIsDragging(false)
    setTries(tries + 1)
    // can't draw on previous point with kanva, increment with a very small number each time
    if(dragX !== xs[score - 1] + 0.000001) {
      setDragX(xs[score - 1] + 0.000001)
      setDragY(ys[score - 1] + 0.000001)
    } else {
      setDragX(dragX + 0.000001)
      setDragY(dragY + 0.000001)
    }
    setCurrentErrorIndex(score - 1)
  }

  const retry = () => {
    if(score !== 0 && score !== numberOfNodes){
      sendData(false)
    }
    if(dragX !== xs[0] + 0.000001){
      setDragX(xs[0] + 0.000001)
      setDragY(ys[0] + 0.000001)
    }
    else {
      setDragX(dragX + 0.000001)
      setDragY(dragY + 0.000001)
    }
    setIsDragging(false)
    setScore(0)
    setErrors(0)
    setCurrentErrorIndex(-1)
    setTries(0)
    setVisited(Array(25))
    setCoordsVisited([])
    setFinished(false)
    setTimerRunning(false)
    setTime(0)
  }

  const shuffle = () => {
    retry()
    const res = generateCoordinates(canvasWidth, canvasHeight, PADDING, numberOfNodes)
    setXs(res.xs)
    setYs(res.ys)
    setDragX(res.xs[0])
    setDragY(res.ys[0])
  }

  const sendData = (finished) => {
    const data = {
      "user_id": LOGGED_IN_USER_ID,
      "numberOfPoints": numberOfNodes,
      "score": score,
      "finished": finished,
      "errorsCount": errors, 
      "triesCount": tries,
      "test_time_in_secs": time,
      "participated_on_date": (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    };

    axios.post('http://localhost:3333/submit_test_records', data)
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.log(error);
      });
  }

  // init: this code only, runs once in component lifecycle
  useEffect(() => {
    const res = generateCoordinates(canvasWidth, canvasHeight, PADDING, numberOfNodes)
    setXs(res.xs)
    setYs(res.ys)
    setDragX(res.xs[0])
    setDragY(res.ys[0])
  }, [canvasWidth, canvasHeight])

  return (
    <>
      <div className="canvas-container" style={{width: canvasWidth + "px", height: canvasHeight + "px"}}>
          <Stage width={canvasWidth} height={canvasHeight}>
            <Layer>
            <Line stroke="#black" draggable="false" points={coordsVisited} strokeWidth={3}/>
              {xs.map((_, index) => (
                  <Group 
                      key={"point" + index}
                      x={xs[index]}
                      y={ys[index]}
                      >
                      <Circle
                          x={0}
                          y={0}
                          radius={circleRadius}
                          fill={visited[index] ? "orange" : "#89b717"}
                          shadowColor="black"
                          shadowBlur={5}
                      />
                      <Text text={index + 1} x={index > 8 ? -7 : -3} y={-5} />
                  </Group>
              ))}
              <Group 
                      key={"drag_point"}
                      id={"drag_point"}
                      x={dragX}
                      y={dragY}
                      draggable={!finished}
                      visible={!finished}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      dragBoundFunc={function (pos, e) {
                        // user can't drag outside of the canvas
                        const newPos = {...pos};
                        if (pos.x < PADDING) {
                          newPos.x = PADDING
                        }
                        if (pos.y < PADDING) {
                          newPos.y = PADDING
                        }
                        if (pos.x > canvasWidth - PADDING) {
                          newPos.x = canvasWidth - PADDING
                        }
                        if (pos.y > canvasHeight - PADDING) {
                          newPos.y = canvasHeight
                        }
                        if (score === numberOfNodes) {
                          setFinished(true)
                          setTimerRunning(false)
                          sendData(true)
                        }
                        // check if user passed over another element when dragging
                        let overNode = false
                        for (let i = 0; i < xs.length; i++) {
                          // if the cursor is from a distance smaller than the circleRadius from the node point, then the user went over the node
                          if ( Math.abs(newPos.x - xs[i]) < circleRadius && Math.abs(newPos.y - ys[i]) < circleRadius ) {
                            overNode = true
                            // if we visited the next correct node
                            if(i === score) {
                              const newVisited = visited
                              visited[i] = true
                              setVisited(newVisited)

                              if(score === 0){
                                coordsVisited.push(xs[0])
                                coordsVisited.push(ys[0])
                              }
                              coordsVisited.push(xs[i])
                              coordsVisited.push(ys[i])

                              setScore(score + 1)
                              setCurrentErrorIndex(i)
                              break;
                              // make sure an error does not count twice
                              // leaving dragged node does not count as an error
                            }  else if (i !== currentErrorIndex && i !==score - 1) {
                              setCurrentErrorIndex(i)
                              setErrors(errors + 1)
                            }
                          }
                        }
                        if(!overNode && currentErrorIndex !== -1) {
                          setCurrentErrorIndex(-1)
                        }
                        return newPos;
                      }}
                  >
                      <Circle
                          x={0}
                          y={0}
                          fill={"red"}
                          radius={circleRadius}
                          shadowColor="black"
                          shadowBlur={10}
                          opacity={isDragging ? 0.4 : 1}  
                      />
                      <Text text={Math.max(1, score)} x={-3} y={-5}/>
                  </Group>
              <Text text={"Start"} x={xs[0] - circleRadius - 5} y={ys[0] - 2 * circleRadius} fontStyle="bold" align="center" fill="orange" />
              <Text text={"End"} x={xs[xs.length - 1] - circleRadius } y={ys[ys.length - 1] - 2 * circleRadius} fontStyle="bold" align="center" fill="orange" />
            </Layer>
        </Stage>
      </div>
      <ScoreBoard score={score} tries={tries} errors={errors} time={time} retry={retry} shuffle={shuffle} setOnRecordsTable={setOnRecordsTable} />
    </>
  );
}

export default CognitionTest;