import { MusicProvider } from './MusicContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import Player from './components/Player';
import './index.css';

function App() {
  return (
    <MusicProvider>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <Home />
        </main>
      </div>
      <Player />
    </MusicProvider>
  );
}

export default App;
