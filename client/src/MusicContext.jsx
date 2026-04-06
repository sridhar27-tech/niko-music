import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, playlistsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/songs'),
          axios.get('http://localhost:3001/api/playlists')
        ]);
        setSongs(songsRes.data);
        setPlaylists(playlistsRes.data);
        if (songsRes.data.length > 0) {
          setCurrentSong(songsRes.data[0]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const createPlaylist = async (name) => {
    try {
      const response = await axios.post('http://localhost:3001/api/playlists', { name });
      setPlaylists([...playlists, response.data]);
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [songs]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const nextSong = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const prevSong = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const seek = (val) => {
    const time = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(val);
  };

  const toggleLike = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter(id => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const filteredSongs = Array.isArray(songs) ? songs.filter(song => {
    const title = song?.title?.toLowerCase() || '';
    const artist = song?.artist?.toLowerCase() || '';
    const query = searchQuery?.toLowerCase() || '';
    const matchesSearch = title.includes(query) || artist.includes(query);
    
    if (currentView === 'liked') {
      return matchesSearch && likedSongs.includes(song.id);
    }
    return matchesSearch;
  }) : [];

  return (
    <MusicContext.Provider value={{
      songs: filteredSongs,
      playlists,
      likedSongs,
      searchQuery,
      setSearchQuery,
      currentView,
      setCurrentView,
      toggleLike,
      currentSong,
      isPlaying,
      volume,
      progress,
      duration,
      togglePlay,
      playSong,
      nextSong,
      prevSong,
      setVolume,
      seek,
      createPlaylist
    }}>
      {children}
    </MusicContext.Provider>
  );
};
