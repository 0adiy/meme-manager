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

  return (
    <div className='relative w-full h-full'>
      <video
        ref={videoRef}
        className='w-full h-full object-contain'
        loop
        playsInline
        src={src}
      />
      <div className='opacity-0 hover:opacity-100 hover:delay-0 delay-100 transition-opacity duration-300'>
        <div
          onClick={togglePlay}
          className='absolute inset-0 flex flex-col justify-center items-center'
        >
          <button className='p-4 text-6xl text-white bg-black rounded-full'>
            {isPlaying ? (
              <PauseIcon className='size-4' />
            ) : (
              <PlayIcon className='size-4' />
            )}
          </button>
        </div>
        <div className='absolute bottom-2 left-2'>
          <button
            onClick={toggleMute}
            className='p-2 text-6xl text-white bg-black rounded-full'
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
