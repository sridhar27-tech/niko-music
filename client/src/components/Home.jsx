import { useMusic } from '../MusicContext';
import { Play, Pause, Heart } from 'lucide-react';

const SongCard = ({ song }) => {
  const { currentSong, isPlaying, togglePlay, playSong, likedSongs, toggleLike } = useMusic();
  const isActive = currentSong?.id === song.id;
  const isLiked = likedSongs.includes(song.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isActive) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(song.id);
  };

  return (
    <div className={`song-card ${isActive ? 'active' : ''}`} onClick={() => playSong(song)}>
      <div className="card-img-container">
        <div className="card-img glass" style={{ backgroundImage: `url(${song.cover})`, backgroundSize: 'cover' }}></div>
        <button className={`card-heart-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          <Heart size={20} fill={isLiked ? "var(--spotify-green)" : "none"} stroke={isLiked ? "var(--spotify-green)" : "currentColor"} />
        </button>
        <button className="card-play-btn" onClick={handlePlay} style={{ opacity: isActive && isPlaying ? 1 : '' }}>
          {isActive && isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
        </button>
      </div>
      <div className="card-info">
        <h4 className="card-title">{song.title}</h4>
        <p className="card-artist">{song.artist}</p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .song-card.active .card-title {
           color: var(--spotify-green);
        }
        .song-card {
          background: var(--card-bg);
          padding: 16px;
          border-radius: 8px;
          transition: background 0.3s ease;
          cursor: pointer;
          flex: 1;
          min-width: 180px;
          max-width: 200px;
        }
        .song-card:hover {
          background: var(--card-bg-hover);
        }
        .card-img-container {
          position: relative;
          aspect-ratio: 1;
          margin-bottom: 16px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.5);
        }
        .card-img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(45deg, #1a1a1a, #333);
        }
        .card-play-btn {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 48px;
          height: 48px;
          background: var(--spotify-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }
        .card-img-container:hover .card-play-btn {
          opacity: 1 !important;
          transform: translateY(0);
        }
        .card-heart-btn {
          position: absolute;
          right: 8px;
          top: 8px;
          color: var(--text-subdued);
          opacity: 0;
          transition: 0.3s;
        }
        .song-card:hover .card-heart-btn, .card-heart-btn.liked {
          opacity: 1;
        }
        .card-heart-btn:hover {
          color: white;
          transform: scale(1.1);
        }
        .card-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-artist {
          font-size: 14px;
          color: var(--text-subdued);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` }} />
    </div>
  );
};

const Home = () => {
  const { songs, currentView, searchQuery } = useMusic();
  
  let mainTitle = "Trending Now";
  if (currentView === 'liked') mainTitle = "Liked Songs";
  if (currentView === 'playlist') mainTitle = "My Playlist";
  if (searchQuery) mainTitle = `Search results for "${searchQuery}"`;

  const sections = [
    {
      title: mainTitle,
      songs: songs
    }
  ];

  if (currentView === 'home' && !searchQuery) {
    sections.push({
      title: "Recently Played",
      songs: songs.slice(1, 5)
    });
  }

  return (
    <div className="home-content">
      <div className="gradient-overlay" style={{ background: currentView === 'liked' ? 'linear-gradient(rgba(80, 56, 160, 0.5), transparent)' : '' }}></div>
      
      {sections.map((section, idx) => (
        <section key={idx} className="home-section">
          <div className="section-header">
            <h3>{section.title}</h3>
            {section.songs.length > 4 && <button className="show-all">Show all</button>}
          </div>
          <div className="song-grid">
            {section.songs.length > 0 ? (
              section.songs.map((song, sIdx) => (
                <SongCard key={sIdx} song={song} />
              ))
            ) : (
                <p className="no-songs">No songs found.</p>
            )}
          </div>
        </section>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-songs {
          color: var(--text-subdued);
          font-style: italic;
        }
      ` }} />

      <style dangerouslySetInnerHTML={{ __html: `
        .home-content {
          padding: 24px 32px;
          flex: 1;
          overflow-y: auto;
          background: linear-gradient(transparent, var(--bg-base) 400px), var(--bg-elevated);
          position: relative;
        }
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 300px;
            background: linear-gradient(rgba(29, 185, 84, 0.2), transparent);
            pointer-events: none;
        }
        .home-section {
          margin-bottom: 40px;
          position: relative;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .section-header h3 {
          font-size: 24px;
          font-weight: 700;
        }
        .show-all {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-subdued);
        }
        .show-all:hover {
          text-decoration: underline;
        }
        .song-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
      ` }} />
    </div>
  );
};

export default Home;
