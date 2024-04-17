// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);

//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };


//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Requesting microphone access...</p>
//             )}
//         </div>
//     );
// };

// export default MicTestComponent;


// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);
//     const [recording, setRecording] = useState(false);

//     let mediaRecorder;
//     let recordedChunks = [];

//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };

//     // const handleRecord = () => {
//     //     recordedChunks = [];
//     //     const stream = new MediaStream();
//     //     const audioTracks = navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//     //         stream.getTracks().forEach(track => {
//     //             stream.addTrack(track);
//     //         });
//     //     });
//     //     mediaRecorder = new MediaRecorder(stream);
//     //     mediaRecorder.ondataavailable = event => {
//     //         if (event.data.size > 0) {
//     //             recordedChunks.push(event.data);
//     //         }
//     //     };
//     //     mediaRecorder.onstop = () => {
//     //         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//     //         const audioUrl = URL.createObjectURL(blob);
//     //         const audio = new Audio(audioUrl);
//     //         audio.play();
//     //     };
//     //     mediaRecorder.start();
//     //     setRecording(true);
//     // };

//     const handleRecord = async () => {
//         recordedChunks = [];
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.ondataavailable = event => {
//                 if (event.data.size > 0) {
//                     recordedChunks.push(event.data);
//                 }
//             };
//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//                 const audioUrl = URL.createObjectURL(blob);
//                 const audio = new Audio(audioUrl);
//                 audio.play();
//             };
//             mediaRecorder.start();
//             setRecording(true);
//         } catch (error) {
//             console.error('Error accessing audio tracks:', error);
//         }
//     };
    

//     // const handleStop = () => {
//     //     mediaRecorder.stop();
//     //     setRecording(false);
//     // };

//     const handleStop = () => {
//         if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//             mediaRecorder.stop();
//             setRecording(false);
//         } else {
//             console.warn('MediaRecorder is not properly initialized or already stopped.');
//         }
//     };

//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={handleRecord} disabled={recording}>
//                         Record
//                     </button>
//                     <button onClick={handleStop} disabled={!recording}>
//                         Stop
//                     </button>
//                 </div>
//             ) : (
//                 <p>Requesting microphone access...</p>
//             )}
//         </div>
//     );
// };

// export default MicTestComponent;


// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);
//     const [recording, setRecording] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const [audioSrc, setAudioSrc] = useState(null);

//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };

//     // Start recording
//     // const startRecording = () => {
//     //     setRecording(true);
//     //     setRecordedChunks([]);
//     //     navigator.mediaDevices.getUserMedia({ audio: true })
//     //         .then(stream => {
//     //             const mediaRecorder = new MediaRecorder(stream);
//     //             mediaRecorder.ondataavailable = event => {
//     //                 if (event.data.size > 0) {
//     //                     setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//     //                 }
//     //             };
//     //             mediaRecorder.start();
//     //             // Stop recording after 5 seconds (for demonstration)
//     //             setTimeout(() => {
//     //                 stopRecording(mediaRecorder);
//     //             }, 5000);
//     //         })
//     //         .catch(err => {
//     //             console.error('Failed to start recording', err);
//     //             setRecording(false);
//     //         });
//     // };

//     const startRecording = () => {
//         setRecording(true);
//         setRecordedChunks([]);
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     if (event.data.size > 0) {
//                         setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                     }
//                 };
//                 mediaRecorder.start();
//                 // Stop recording after 5 seconds (for demonstration)
//                 setTimeout(() => {
//                     stopRecording(mediaRecorder); // Pass mediaRecorder object to stopRecording
//                 }, 5000);
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 setRecording(false);
//             });
//     };

    

//     // Stop recording
//     // const stopRecording = (mediaRecorder) => {
//     //     if (mediaRecorder.state === 'recording') {
//     //         mediaRecorder.stop();
//     //         setRecording(false);
//     //     }
//     // };

//     const stopRecording = (mediaRecorder) => {
//         if (mediaRecorder && mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             setRecording(false);
//         }
//     };

//     // Play recorded audio
//     const playRecordedAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         setAudioSrc(audioURL);

//         // Create an audio element and play the recorded audio
//         const audio = new Audio(audioURL);
//         audio.play();
//     };

//     // Render the main content based on micPermission state
//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={recording ? null : startRecording} disabled={recording}>Start Recording</button>
//                     <button onClick={recording ? () => stopRecording() : () => playRecordedAudio()} disabled={!recording && recordedChunks.length === 0}>
//                         {recording ? 'Stop Recording' : 'Play Recorded Audio'}
//                     </button>
//                     {audioSrc && <audio src={audioSrc} controls />}
//                 </div>
//             ) : micPermission === 'pending' ? (
//                 <p>Requesting microphone access...</p>
//             ) : (
//                 <p>Microphone access denied. Please grant access to proceed.</p>
//             )}
//         </div>
//     );
// };

// export default MicTestComponent;



// import React, { useState, useRef } from 'react';

// const MicTestComponent = () => {
//     const [recording, setRecording] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const audioRef = useRef(null);

//     const startRecording = () => {
//         setRecording(true);
//         setRecordedChunks([]);
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     if (event.data.size > 0) {
//                         setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                     }
//                 };
//                 mediaRecorder.start();
//                 setTimeout(() => {
//                     stopRecording(mediaRecorder);
//                 }, 5000); // Stop recording after 5 seconds (for demonstration)
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 setRecording(false);
//             });
//     };

//     const stopRecording = (mediaRecorder) => {
//         if (mediaRecorder && mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             setRecording(false);
//         }
//     };

//     const playAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         audioRef.current.src = audioURL;
//         audioRef.current.play();
//     };

//     const handleAudioEnded = () => {
//         // Hide the audio bar when the audio playback ends
//         setRecordedChunks([]);
//     };

//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={recording ? null : startRecording} disabled={recording}>
//                         Start Recording
//                     </button>
//                     <button onClick={recording ? () => stopRecording() : () => playAudio()} disabled={!recording && recordedChunks.length === 0}>
//                         {recording ? 'Stop Recording' : 'Play Recorded Audio'}
//                     </button>
//                     {audioSrc && <audio src={audioSrc} controls />}
//                 </div>
//             ) : micPermission === 'pending' ? (
//                 <p>Requesting microphone access...</p>
//             ) : (
//                 <p>Microphone access denied. Please grant access to proceed.</p>
//             )}
//         </div>
//     );
    
//             };
// export default MicTestComponent;


// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);
//     const [recording, setRecording] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const [audioSrc, setAudioSrc] = useState(null);

//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };

//     // Start recording
//     const startRecording = () => {
//         setRecording(true);
//         setRecordedChunks([]);
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     if (event.data.size > 0) {
//                         setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                     }
//                 };
//                 mediaRecorder.start();
//                 // Stop recording after 5 seconds (for demonstration)
//                 setTimeout(() => {
//                     stopRecording(mediaRecorder); // Pass mediaRecorder object to stopRecording
//                 }, 5000);
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 setRecording(false);
//             });
//     };

//     const stopRecording = (mediaRecorder) => {
//         if (mediaRecorder && mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             setRecording(false);
//         }
//     };

//     // Play recorded audio
//     const playRecordedAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         setAudioSrc(audioURL);

//         // Create an audio element and play the recorded audio
//         const audio = new Audio(audioURL);
//         audio.play();
//         audio.addEventListener('ended', () => {
//             setAudioSrc(null); // Hide audio bar after playback
//         });
//     };

//     // Render the main content based on micPermission state
//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={recording ? null : startRecording} disabled={recording}>Start Recording</button>
//                     <button onClick={recording ? () => stopRecord




// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);
//     const [recording, setRecording] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const [audioSrc, setAudioSrc] = useState(null);
//     const [playingAudio, setPlayingAudio] = useState(false); // New state for tracking audio playback


//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };

//     // Start recording
//     const startRecording = () => {
//         setRecording(true);
//         setRecordedChunks([]);
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     if (event.data.size > 0) {
//                         setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                     }
//                 };
//                 mediaRecorder.start();
//                 // Stop recording after 5 seconds (for demonstration)
//                 setTimeout(() => {
//                     stopRecording(mediaRecorder); // Pass mediaRecorder object to stopRecording
//                 }, 5000);
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 setRecording(false);
//             });
//     };

//     const stopRecording = (mediaRecorder) => {
//         if (mediaRecorder && mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             setRecording(false);
//         }
//     };

//     // Play recorded audio
//     const playRecordedAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         setAudioSrc(audioURL);
//         setPlayingAudio(true);

//         // Create an audio element and play the recorded audio
//         const audio = new Audio(audioURL);
//         audio.play();
//         audio.addEventListener('ended', () => {
//             setAudioSrc(null); // Hide audio bar after playback
//             setPlayingAudio(false);
//         });
//     };

//     // Render the main content based on micPermission state
//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={recording ? null : startRecording} disabled={recording}>Start Recording</button>
//                     <button onClick={recording ? () => stopRecording() : () => playRecordedAudio()} disabled={!recording && recordedChunks.length === 0}>
//                         {playingAudio ? 'Stop Recording' : 'Play Recorded Audio'}
//                     </button>
//                     {audioSrc && <audio src={audioSrc} controls />}
//                 </div>
//             ) : micPermission === 'pending' ? (
//                 <p>Requesting microphone access...</p>
//             ) : (
//                 <p>Microphone access denied. Please grant access to proceed.</p>
//             )}
//         </div>
//     );
// };

// export default MicTestComponent;



// import React, { useState, useEffect } from 'react';

// const MicTestComponent = () => {
//     const [micPermission, setMicPermission] = useState('pending');
//     const [audioLevel, setAudioLevel] = useState(0);
//     const [recording, setRecording] = useState(false);
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const [audioSrc, setAudioSrc] = useState(null);
//     const [playingAudio, setPlayingAudio] = useState(false); // New state for tracking audio playback

//     // Request mic permission and start processing audio stream
//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 setMicPermission('granted');
//                 processAudioStream(stream);
//             })
//             .catch(err => {
//                 setMicPermission('denied');
//                 console.error('Microphone access was denied', err);
//             });
//     }, []);

//     // Implement processAudioStream function here
//     const processAudioStream = (stream) => {
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;

//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);

//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = function() {
//             const array = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteFrequencyData(array);
//             const arraySum = array.reduce((a, value) => a + value, 0);
//             const average = arraySum / array.length;
//             // Scale the average value to fit your visual component's requirements
//             setAudioLevel(average);
//         };
//     };

//     // Start recording
//     const startRecording = () => {
//         setRecording(true);
//         setRecordedChunks([]);
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = event => {
//                     if (event.data.size > 0) {
//                         setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                     }
//                 };
//                 mediaRecorder.start();
//                 // Stop recording after 5 seconds (for demonstration)
//                 setTimeout(() => {
//                     stopRecording(mediaRecorder); // Pass mediaRecorder object to stopRecording
//                 }, 5000);
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 setRecording(false);
//             });
//     };

//     const stopRecording = (mediaRecorder) => {
//         if (mediaRecorder && mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             setRecording(false);
//         }
//     };

//     // Play recorded audio
//     const playRecordedAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         setAudioSrc(audioURL);
//         setPlayingAudio(true); // Set playingAudio state to true when audio playback starts

//         // Create an audio element and play the recorded audio
//         const audio = new Audio(audioURL);
//         audio.play();
//         audio.addEventListener('ended', () => {
//             setAudioSrc(null); // Hide audio bar after playback
//             setPlayingAudio(false); // Reset playingAudio state after playback ends
//         });
//     };

//     // Render the main content based on micPermission state
//     return (
//         <div>
//             {micPermission === 'granted' ? (
//                 <div>
//                     <p>Mic Access Granted. Speak into your microphone.</p>
//                     <div style={{ width: '100%', backgroundColor: '#ddd' }}>
//                         <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
//                     </div>
//                     <button onClick={recording ? null : startRecording} disabled={recording}>Start Recording</button>
//                     <button onClick={recording ? () => stopRecording() : () => playRecordedAudio()} disabled={!recording && recordedChunks.length === 0}>
//                         {playingAudio ? 'Play Recorded Audio' : 'Stop Recording' }
//                     </button>
//                     {audioSrc && <audio src={audioSrc} controls />}
//                 </div>
//             ) : micPermission === 'pending' ? (
//                 <p>Requesting microphone access...</p>
//             ) : (
//                 <p>Microphone access denied. Please grant access to proceed.</p>
//             )}
//         </div>
//     );
// };

// export default MicTestComponent;


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
                console.error('Microphone access was denied', err);
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
                }, 5000);
            })
            .catch(err => {
                console.error('Failed to start recording', err);
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
                    <p>Mic Access Granted. Speak into your microphone.</p>
                    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                        <div style={{ height: '20px', width: `${audioLevel}%`, backgroundColor: 'green' }}></div>
                    </div>
                    <button onClick={startRecording} disabled={recording}>Start MIC Test</button>
                    {showPlayButton && (
                        <button onClick={playRecordedAudio}>Play Recorded Audio</button>
                    )}
                    {audioSrc && <audio src={audioSrc} controls />}
                </div>
            ) : micPermission === 'pending' ? (
                <p>Requesting microphone access...</p>
            ) : (
                <p>Microphone access denied. Please grant access to proceed.</p>
            )}
        </div>
    );
};

export default MicTestComponent;





// import React, { useState, useEffect } from 'react';

// const MicTestComponent = ({ onMicTestResult }) => {
//     const [recordedChunks, setRecordedChunks] = useState([]);
//     const [timeoutReached, setTimeoutReached] = useState(false);
//     const [showPlayButton, setShowPlayButton] = useState(false);

//     useEffect(() => {
//         const startRecording = (stream) => {
//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.ondataavailable = event => {
//                 if (event.data.size > 0) {
//                     setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//                 }
//             };
//             mediaRecorder.start();
//             // Stop recording after 5 seconds (for demonstration)
//             setTimeout(() => {
//                 stopRecording(mediaRecorder);
//             }, 5000);
//         };

//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 startRecording(stream);
//             })
//             .catch(err => {
//                 console.error('Failed to start recording', err);
//                 onMicTestResult('denied');
//             });

//         const stopRecording = (mediaRecorder) => {
//             if (mediaRecorder && mediaRecorder.state === 'recording') {
//                 mediaRecorder.stop();
//                 setTimeoutReached(true);
//             }
//         };
//     }, [onMicTestResult]);

//     const playRecordedAudio = () => {
//         const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
//         const audioURL = URL.createObjectURL(blob);
//         // setAudioSrc(audioURL);

//         // Create an audio element and play the recorded audio
//         const audio = new Audio(audioURL);
//         audio.play();
//         audio.addEventListener('ended', () => {
//             // setAudioSrc(null); // Hide audio bar after playback
//             setShowPlayButton(false); // Hide the play button after audio finishes playing
//         });
//     };

//     useEffect(() => {
//         if (timeoutReached && recordedChunks.length > 0) {
//             playRecordedAudio();
//         }
//     }, [timeoutReached, recordedChunks]);

//     return null; // Render nothing, as the component's functionality is automatic
// };

// export default MicTestComponent;
