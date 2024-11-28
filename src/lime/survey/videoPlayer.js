import React, { useEffect } from 'react';

function VideoPlayer({ src, onEnded, onPlay, videoRef }) {
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play(); // Start playing the video
            videoRef.current.requestFullscreen().catch((err) => {
                console.warn("Fullscreen request failed:", err);
            });

            // Handle pause issue
            const handlePause = () => {
                if (videoRef.current) {
                    console.log("Video paused, resuming playback...");
                    videoRef.current.play(); // Resume the video
                }
            };

            videoRef.current.addEventListener("pause", handlePause);

            // Cleanup the event listener on unmount
            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener("pause", handlePause);
                }
            };
        }
    }, [videoRef]);

    const handleEnded = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => {
                console.warn("Exit fullscreen failed:", err);
            });
        }
        if (onEnded) {
            onEnded(); // Call the onEnded callback
        }
    };

    return (
        <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            onEnded={handleEnded} // Use the custom handler
            onPlay={onPlay}
        />
    );
}

export default VideoPlayer;
