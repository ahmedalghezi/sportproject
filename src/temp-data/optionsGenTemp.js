import React, { useState, useRef } from 'react';

const VideoPlayer = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const handleSuccess = (stream) => {
        videoRef.current.srcObject = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (event) => {
            setAudioBlob(event.data);
        };
        mediaRecorder.onstop = async () => {
            const formData = new FormData();
            formData.append('audio', new Blob([audioBlob], { type: 'audio/webm' }));
            const res = await fetch('/api/upload-audio', {
                method: 'POST',
                body: formData
            });
            console.log(await res.json());
        };
    };

    const handleError = (error) => {
        console.log(error);
    };

    const handlePlay = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: 'user' }
        });
        handleSuccess(stream);
    };

    return (
        <div>
            <video ref={videoRef} src={"https://inprove-sport.info:8080/videos/op_gen/Abwehr_1_combined.mp4"} autoPlay />
            <audio ref={audioRef} />
            <button onClick={handlePlay}>Play Video</button>
        </div>
    );
};

export default VideoPlayer;
