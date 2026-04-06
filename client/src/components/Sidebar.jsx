import { useMusic } from '../MusicContext';
import { Home as HomeIcon, Search, Library, SquarePlus, Heart } from 'lucide-react';

const Sidebar = () => {
  const { playlists, createPlaylist, currentView, setCurrentView, searchQuery, setSearchQuery } = useMusic();

  const handleCreatePlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (name) {
      createPlaylist(name);
    }
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setSearchQuery('');
  };

  const handleSearchClick = () => {
    setCurrentView('home');
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) searchInput.focus();
  };

  const handleLibraryClick = () => {
    setCurrentView('home');
  };

  const handleLikedClick = () => {
    setCurrentView('liked');
  };

  const handlePlaylistClick = (playlist) => {
    setCurrentView('playlist');
    setSearchQuery('');
  };

  return (
    <aside className="sidebar">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">NB</div>
        <span className="logo-text">Papa Niko Bellic</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className={currentView === 'home' && !searchQuery ? 'active' : ''} onClick={handleHomeClick}>
            <HomeIcon size={24} /> <span>Home</span>
          </li>
          <li onClick={handleSearchClick}><Search size={24} /> <span>Search</span></li>
          <li onClick={handleLibraryClick}><Library size={24} /> <span>Your Library</span></li>
        </ul>
      </nav>

      <div className="sidebar-section">
        <h3 className="section-title">Playlists</h3>
        <button className="sidebar-item" onClick={handleCreatePlaylist}><SquarePlus size={24} /> <span>Create Playlist</span></button>
        <button className={`sidebar-item ${currentView === 'liked' ? 'active' : ''}`} onClick={handleLikedClick}>
          <Heart size={24} /> <span>Liked Songs</span>
        </button>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-scrollable">
        <ul className="playlist-list">
          {Array.isArray(playlists) && playlists.map(p => (
            <li key={p.id} onClick={() => handlePlaylistClick(p)}>{p.name}</li>
          ))}
        </ul>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          background-color: var(--bg-base);
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          user-select: none;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 12px;
          margin-bottom: 8px;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--spotify-green);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 800;
          font-size: 14px;
        }
        .logo-text {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -1px;
        }
        .sidebar-nav ul {
          list-style: none;
        }
        .sidebar-nav li, .sidebar-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          color: var(--text-subdued);
          font-weight: 700;
          cursor: pointer;
          border-radius: 4px;
          transition: 0.2s;
          width: 100%;
        }
        .sidebar-nav li:hover, .sidebar-item:hover {
          color: var(--text-base);
        }
        .sidebar-nav li.active, .sidebar-item.active {
          color: var(--text-base);
          background: var(--bg-highlight);
        }
        .section-title {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--text-subdued);
          margin-bottom: 12px;
          padding-left: 12px;
          letter-spacing: 1.5px;
        }
        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 12px;
        }
        .sidebar-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 0 12px;
        }
        .playlist-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14px;
          color: var(--text-subdued);
        }
        .playlist-list li:hover {
          color: var(--text-base);
          cursor: pointer;
        }
      ` }} />
    </aside>
  );
};

export default Sidebar;
