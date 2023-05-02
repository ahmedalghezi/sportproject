import React, { useRef, useEffect } from 'react';

function VideoPlayer({ src, onEnded, onPlay }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.requestFullscreen();
        }
    }, []);

    const handleEnded = () => {
        if (videoRef.current) {
            videoRef.current.exitFullscreen();
            onEnded();
        }
    };

    return (
        <video ref={videoRef} src={src} autoplay controls onEnded={onEnded} autoPlay="autoplay"  onPlay={onPlay}/>
    );
}

export default VideoPlayer;
