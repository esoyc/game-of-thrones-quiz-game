import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/got-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Ses seviyesi %20

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.log("Müzik çalınamadı.");
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-xl bg-[#14141a]/80 border border-[#3a3a44] text-[#e6b322] hover:border-[#e6b322]/50 transition-all duration-300 backdrop-blur-md cursor-pointer"
      title={isPlaying ? "Müziği Sustur" : "Müziği Başlat"}
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} className="opacity-60" />}
    </button>
  );
}
