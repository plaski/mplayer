import Player from './player'
import Store from './store'

const selectors = {
  backgroundContainer: document.querySelector('body'),
  playerContainer: document.querySelector('#playerContainer'),
  listContainer: document.querySelector('#listContainer'),
  songsList: document.querySelector('#songsList'),
  barFill: document.querySelector('#barFill'),
  inputRange: document.querySelector('#inputRange'),
  closeBtn: document.querySelector('#closeBtn'),
  menuBtn: document.querySelector('#menuBtn'),
  nextBtn: document.querySelector('#nextBtn'),
  prevBtn: document.querySelector('#prevBtn'),
  pauseBtn: document.querySelector('#pauseBtn'),
  currentSongTitle: document.querySelector('#currentSongTitle'),
  currentSongArtist: document.querySelector('#currentSongArtist'),
  currentSongTime: document.querySelector('#currentSongTime'),
  rangeTime: document.querySelector('#time'),
  rangeTimeLeft: document.querySelector('#timeLeft')
}

function populateSongsList(songs) {
  let html = '';
  songs.forEach(function(song) {
    html += `<li class="list__item" data-id="${song.id}">
      <span class="song__title">${song.title}</span>
      <span class="song__artist">${song.artist}</span>
    </li>`;
  });
  selectors.songsList.innerHTML = html;
}

function populateCurrentSong (song) {
  updateBarFill(0, 0)
  selectors.currentSongTitle.innerText = song.title;
  selectors.currentSongArtist.innerText = song.artist;
  selectors.currentSongTime.innerText = '0:00';
}

function showList() {
  selectors.playerContainer.classList.add('hide');
  selectors.listContainer.classList.remove('hide');
}

function showPlayer() {
  selectors.playerContainer.classList.remove('hide');
  selectors.listContainer.classList.add('hide');
}

function updateCurrentTime(time, duration) {
  if (isNaN(duration)) {
      duration = 0;
  }
  const timeBackwards = Store.getTimeBackwards();
  const formatedTime = formatTime(time);
  const formatedTimeLeft = formatTime(duration - time);
  selectors.currentSongTime.innerText = (!timeBackwards ? formatedTime : '-' + formatedTimeLeft);
  selectors.rangeTime.innerText = formatedTime;
  selectors.rangeTimeLeft.innerText = '-' + formatedTimeLeft;
}

function updateBarFill(percent, time) {
  selectors.barFill.style.width = percent + '%';
  selectors.inputRange.value = time;
}

function updatePlayedSong(song) {
  const songsInList = [...selectors.songsList.children];
  const id = song.id;
  songsInList.forEach(function(song) {
    song.classList.remove('selected');
    if (song.dataset.id == id) {
      song.classList.add('selected');
    }
  })
}

function formatTime(secs) {
  const hr  = Math.floor(secs / 3600);
  let min = Math.floor((secs - (hr * 3600))/60);
  let sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  if (sec < 10){
    sec  = "0" + sec;
  }
  return min + ':' + sec;
}

const UI = {
  selectors,
  populateSongsList,
  populateCurrentSong,
  showList,
  showPlayer,
  updateCurrentTime,
  updateBarFill,
  updatePlayedSong
}

export default UI;
