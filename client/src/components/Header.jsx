import { useMusic } from '../MusicContext';
import { ChevronLeft, ChevronRight, Search, User } from 'lucide-react';

const Header = () => {
  const { searchQuery, setSearchQuery } = useMusic();

  return (
    <header className="header">
      <div className="nav-controls">
        <button className="nav-btn"><ChevronLeft size={24} /></button>
        <button className="nav-btn"><ChevronRight size={24} /></button>
        
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="What do you want to play?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="user-controls">
        <button className="premium-btn">Explore Premium</button>
        <button className="install-btn">Install App</button>
        <div className="profile-btn">
          <User size={20} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          height: var(--header-height);
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        .search-container {
          position: relative;
          width: 100%;
          max-width: 364px;
        }
        .search-icon {
           position: absolute;
           left: 12px;
           top: 50%;
           transform: translateY(-50%);
           color: var(--text-subdued);
        }
        .search-container input {
          width: 100%;
          background: var(--bg-highlight);
          border: none;
          border-radius: 500px;
          padding: 12px 12px 12px 48px;
          color: white;
          font-size: 14px;
          outline: none;
        }
        .search-container input:focus {
           box-shadow: 0 0 0 2px white;
        }
        .nav-btn {
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .user-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .premium-btn {
          background: white;
          color: black;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 14px;
        }
        .install-btn {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .profile-btn {
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      ` }} />
    </header>
  );
};

export default Header;
