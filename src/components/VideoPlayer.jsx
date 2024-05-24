import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleUpdateProgress = () => {
    if (videoRef.current && isPlaying) {
      const currentTime = videoRef.current.currentTime;
      const progress = Math.floor((currentTime / duration) * 100);
      setProgress(progress);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setDuration(duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = e => {
    if (videoRef.current) {
      const progress = e.nativeEvent.offsetX / e.target.offsetWidth;
      videoRef.current.currentTime = progress * duration;
    }
  };

  return (
    <div className='relative w-full h-full'>
      <video
        ref={videoRef}
        className='w-full h-full object-contain'
        loop
        playsInline
        src={src}
        onTimeUpdate={handleUpdateProgress}
        onDurationChange={handleDurationChange}
      />
      <div className='opacity-0 hover:opacity-100 hover:delay-0 delay-100 transition-opacity duration-300'>
        <div
          onClick={togglePlay}
          className='absolute inset-0 flex flex-col justify-center items-center'
        >
          {!isPlaying && (
            <button className='p-4 text-6xl text-white bg-base-300 rounded-full'>
              <PlayIcon className='size-4' />
            </button>
          )}
        </div>

        <div className='bg-base-100/50 absolute bottom-0 right-0 left-0 h-8 flex gap-1 justify-around items-center p-1'>
          <button
            className='p-1 m-0 text-4xl text-white bg-base-300 rounded-full'
            onClick={togglePlay}
          >
            {isPlaying ? (
              <PauseIcon className='size-4' />
            ) : (
              <PlayIcon className='size-4' />
            )}
          </button>
          <progress
            className='h-2 flex-1 progress progress-primary'
            value={progress}
            max={100}
            onClick={handleProgressClick}
          ></progress>
          <button
            onClick={toggleMute}
            className='p-1 m-0 text-4xl text-white bg-base-300 rounded-full'
          >
            {isMuted ? (
              <SpeakerXMarkIcon className='size-4' />
            ) : (
              <SpeakerWaveIcon className='size-4' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
