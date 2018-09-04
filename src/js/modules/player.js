let player;

function initPlayer() {
  this.player = new Audio();
  this.player.preload = 'metadata';
}

function updateSource(song) {
  this.player.src = song.link;
}

function playSong() {
  this.player.play();
}

function pauseSong() {
  this.player.pause();
}

function getCurrentTime() {
  return this.player.currentTime;
}

function setCurrentTime(time) {
  this.player.currentTime = time;
}

function getSongDuration() {
  return this.player.duration;
}

function getPlayer() {
  return this.player;
}

const Player = {
  initPlayer,
  updateSource,
  playSong,
  pauseSong,
  getCurrentTime,
  setCurrentTime,
  getSongDuration,
  getPlayer
}

export default Player;
