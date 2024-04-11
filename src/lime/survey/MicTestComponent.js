import React, { useState, useEffect } from 'react';

const MicTestComponent = () => {
    const [micPermission, setMicPermission] = useState('pending');
    const [audioLevel, setAudioLevel] = useState(0);

    // Request mic permission and start processing audio stream
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                setMicPermission('granted');
                processAudioStream(stream);
            })
            .catch(err => {
                setMicPermission('denied');
                console.error('Microphone access was denied', err);
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


    return (
        <div>
            {micPermission === 'granted' ? (
                <div>
                    <p>Mic Access Granted. Speak into your microphone.</p>
                    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                        <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
                    </div>
                </div>
            ) : (
                <p>Requesting microphone access...</p>
            )}
        </div>
    );
};

export default MicTestComponent;
