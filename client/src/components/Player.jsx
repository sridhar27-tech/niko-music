import { useMusic } from '../MusicContext';
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, Pause } from 'lucide-react';

const Player = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong, progress, volume, setVolume, seek } = useMusic();

  if (!currentSong) return <footer className="player-bar-empty" />;

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <footer className="player-bar">
      <div className="current-track">
        <div className="track-img glass" style={{ backgroundImage: `url(${currentSong.cover})`, backgroundSize: 'cover' }}></div>
        <div className="track-info">
          <div className="track-name">{currentSong.title}</div>
          <div className="track-artist">{currentSong.artist}</div>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button className="btn-secondary"><Shuffle size={18} /></button>
          <button className="btn-secondary" onClick={prevSong}><SkipBack size={20} /></button>
          <button className="btn-primary" onClick={togglePlay}>
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button className="btn-secondary" onClick={nextSong}><SkipForward size={20} /></button>
          <button className="btn-secondary"><Repeat size={18} /></button>
        </div>
        <div className="playback-bar">
          <span className="time">{formatTime((progress / 100) * currentSong.duration)}</span>
          <div className="progress-container" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            seek((x / rect.width) * 100);
          }}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="time">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="extra-controls">
        <button className="btn-secondary"><Volume2 size={20} /></button>
        <div className="volume-bar-container" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setVolume(Math.max(0, Math.min(1, x / rect.width)));
        }}>
            <div className="volume-bar" style={{ width: `${volume * 100}%` }}></div>
        </div>
        <button className="btn-secondary"><Maximize2 size={18} /></button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .player-bar {
          height: var(--player-height);
          background-color: var(--bg-base);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: center;
          padding: 0 16px;
          user-select: none;
          z-index: 100;
        }
        .current-track {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .track-img {
          width: 56px;
          height: 56px;
          border-radius: 4px;
          background: linear-gradient(135deg, #2d2d2d, #000);
        }
        .track-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-base);
        }
        .track-artist {
          font-size: 12px;
          color: var(--text-subdued);
          margin-top: 4px;
        }
        .player-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .control-buttons {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .btn-secondary {
          color: var(--text-subdued);
          transition: 0.2s;
        }
        .btn-secondary:hover {
          color: var(--text-base);
        }
        .btn-primary {
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
          transition: transform 0.2s;
        }
        .btn-primary:hover {
           transform: scale(1.1);
        }
        .playback-bar {
          width: 100%;
          max-width: 500px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .time {
          font-size: 11px;
          color: var(--text-subdued);
          min-width: 30px;
        }
        .progress-container {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          position: relative;
        }
        .progress-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 30%;
          background: white;
          border-radius: 2px;
        }
        .progress-container:hover .progress-bar {
          background: var(--spotify-green);
        }
        .extra-controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        .volume-bar-container {
          width: 100px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .volume-bar {
          height: 100%;
          width: 70%;
          background: white;
          border-radius: 2px;
        }
        .volume-bar-container:hover .volume-bar {
          background: var(--spotify-green);
        }
      ` }} />
    </footer>
  );
};

export default Player;
