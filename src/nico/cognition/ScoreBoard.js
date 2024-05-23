import './ScoreBoard.css';

function ScoreBoard({ score, tries, time, errors, retry, shuffle, setOnRecordsTable }) {
  return (
    <div className="ScoreBoard">
      <div className="sb_row score">
        <div>Score:</div>
        <div>{score}</div>
      </div>
      <div className="sb_row errors">
        <div>Errors:</div>
        <div>{errors}</div>
      </div>
      <div className="sb_row tries">
        <div>Tries:</div>
        <div>{tries}</div>
      </div>
      <div className="sb_row tries">
        <div>Time:</div>
        <div>{time}</div>
      </div>
      <div className="sb_row">
        <div>
            <button onClick={retry}>Retry</button>
            <button onClick={shuffle}>Shuffle</button>
            <button onClick={() => {
              setOnRecordsTable(true)
            }}>See previous Records</button>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
