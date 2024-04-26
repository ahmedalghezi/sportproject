import React, { useState, useEffect } from 'react';

const MicTestComponent = ({ onMicTestResult }) => {
    const [micPermission, setMicPermission] = useState('pending');
    const [audioLevel, setAudioLevel] = useState(0);
    const [recording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [audioSrc, setAudioSrc] = useState(null);
    const [showPlayButton, setShowPlayButton] = useState(false); // New state to control the visibility of the play button

    // Request mic permission and start processing audio stream
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                setMicPermission('granted');
                processAudioStream(stream);
                if (onMicTestResult) {
                    onMicTestResult(true); // Notify parent component about mic test success
                }
            })
            .catch(err => {
                setMicPermission('denied');
                console.error('Mikrofonzugriff wurde verweigert', err);
                if (onMicTestResult) {
                    onMicTestResult(false); // Notify parent component about mic test failure
                }
            });
    }, []);

    // Implement processAudioStream function here
    const processAudioStream = (stream) => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);

        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            // Scale the average value to fit your visual component's requirements
            setAudioLevel(average);
        };
    };

    // Start recording
    const startRecording = () => {
        setRecording(true);
        setRecordedChunks([]);
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        setRecordedChunks(prevChunks => [...prevChunks, event.data]);
                    }
                };
                mediaRecorder.start();
                // Stop recording after 5 seconds (for demonstration)
                setTimeout(() => {
                    stopRecording(mediaRecorder); // Pass mediaRecorder object to stopRecording
                }, 3000);
            })
            .catch(err => {
                console.error('Aufnahme konnte nicht gestartet werden', err);
                setRecording(false);
            });
    };

    const stopRecording = (mediaRecorder) => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setRecording(false);
            setShowPlayButton(true); // Show the play button after recording stops
        }
    };

    // Play recorded audio
    const playRecordedAudio = () => {
        const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        // setAudioSrc(audioURL);

        // Create an audio element and play the recorded audio
        const audio = new Audio(audioURL);
        audio.play();
        audio.addEventListener('ended', () => {
            // setAudioSrc(null); // Hide audio bar after playback
            setShowPlayButton(false); // Hide the play button after audio finishes playing
        });
    };

    // Render the main content based on micPermission state
    return (
        <div>
            {micPermission === 'granted' ? (
                <div>
                    <p>Audiopegel-Anzeigebalken in grüner Farbe</p>
                    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                        <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
                    </div>
                    {/* <button onClick={startRecording} disabled={recording}>Start MIC Test</button>
                    {showPlayButton && (
                        <button onClick={playRecordedAudio}>Play Recorded Audio</button>
                    )}
                    {audioSrc && <audio src={audioSrc} controls />} */}
                </div>
            ) : micPermission === 'pending' ? (
                <p>Mikrofonzugriff angefordert...</p>
            ) : (
                <p>Zugriff verweigert: Mikrofon erforderlich</p>
            )}
        </div>
    );
};

export default MicTestComponent;
