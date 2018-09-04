import Song from './Song'

const data = {
  songs: [
    {
      title: 'Bolero, Op.19',
      artist: 'Frédéric Chopin1',
      link: '../src/songs/song1.mp3',
      id: 1
    },
    {
      title: 'Polonaise in F sharp minor, Op.44',
      artist: 'Frédéric Chopin2',
      link: '../src/songs/song2.mp3',
      id: 2
    },
    {
      title: 'Waltz in A flat major, Op.42',
      artist: 'Frédéric Chopin3',
      link: '../src/songs/song3.mp3',
      id: 3
    },
    {
      title: 'Grande valse brillante in E flat major, Op.18',
      artist: 'Frédéric Chopin4',
      link: '../src/songs/song4.mp3',
      id: 4
    }
  ],
  currentSong: null,
  played: false,
  timeBackwards: false,
  updateTime: false
}

function addSong(title, artist, src, id) {
  const newSong = new Song(title, artist, src, id);
  data.songs.push(newSong);
}

function getUpdateTime() {
  return data.updateTime;
}

function setUpdateTime(set) {
  data.updateTime = set;
}

function getSongs() {
  return data.songs;
}

function setCurrentSong(song) {
  data.currentSong = song;
}

function getPlayed() {
  return data.played;
}

function setPlayed(ifPlayed) {
  data.played = ifPlayed;
}

function getTimeBackwards() {
  return data.timeBackwards;
}

function setTimeBackwards(timeBackwards) {
  data.timeBackwards = timeBackwards;
}

function toggleTimeDisplay() {
  data.timeBackwards = !data.timeBackwards;
}

function getNextSong() {
  const songs = data.songs;
  const index = songs.indexOf(data.currentSong);
  let nextSong;
  if (index === songs.length - 1) {
    nextSong = songs[0];
  } else {
    nextSong = songs[index + 1];
  }
  return nextSong;
}

function getPrevSong() {
  const songs = data.songs;
  const index = songs.indexOf(data.currentSong);
  let nextSong;
  if (index === 0) {
    nextSong = songs[songs.length - 1];
  } else {
    nextSong = songs[index - 1];
  }
  return nextSong;
}

function getSongById(id) {
  const songs = data.songs;
  let songToGet;
  songs.forEach(function(song) {
    if (song.id === id) {
      songToGet = song;
    }
  });
  return songToGet;
}

const Store = {
  addSong,
  getSongs,
  setCurrentSong,
  getPlayed,
  setPlayed,
  getNextSong,
  getPrevSong,
  getSongById,
  getTimeBackwards,
  toggleTimeDisplay,
  getUpdateTime,
  setUpdateTime
}

export default Store;
