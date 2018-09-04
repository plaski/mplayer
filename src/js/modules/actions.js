import UI from './ui'
import Player from './player'
import Store from './store'

function playPauseSong() {
  if (Player.player.paused) {
    Store.setPlayed(true);
    UI.selectors.backgroundContainer.classList.remove('darken');
    Player.playSong();
  } else {
    Store.setPlayed(false);
    UI.selectors.backgroundContainer.classList.add('darken');
    Player.pauseSong();
  }
}

function nextSong() {
  const song = Store.getNextSong();
  changeSong(song);
  playIfPlayed();
}

function prevSong() {
  const currentTime = Player.getCurrentTime();
  if (currentTime > 3) {
    Player.setCurrentTime(0);
  } else {
    const song = Store.getPrevSong();
    changeSong(song);
  }
  playIfPlayed();
}

function diffSong(e) {
  const id = getElId(e);
  const song = Store.getSongById(id);
  changeSong(song);
  playIfPlayed();
}

function changeSong(song) {
  Player.pauseSong();
  Store.setCurrentSong(song);
  UI.populateCurrentSong(song);
  Player.updateSource(song);
  UI.updatePlayedSong(song);
}

function playIfPlayed() {
  const ifPlayed = Store.getPlayed();
  if (ifPlayed) {
    Player.playSong();
    updatePlayingTime();
  }
}

function getElId(e) {
  let id;
  const el = e.target;
  if (el.classList.contains('list__item')) {
    id = el.dataset.id
  } else {
    id = el.parentElement.dataset.id;
  }
  return parseInt(id);
}

function changeTimeDisplay() {
  Store.toggleTimeDisplay();
  updatePlayingTime();
}

function updateDuration() {
  const duration = Math.floor(Player.player.duration);
  UI.selectors.inputRange.min = '0';
  UI.selectors.inputRange.max = duration;
}

function updatePlayingTime() {
  const updateTime = Store.getUpdateTime();
  const duration = Player.getSongDuration().toFixed(0);
  let time;
  if (!updateTime) {
    time = Player.getCurrentTime().toFixed(0);
  } else if (updateTime) {
    time = UI.selectors.inputRange.value;
  }
  const percent = ((time / duration) * 100);
  UI.updateBarFill(percent, time);
  UI.updateCurrentTime(time, duration);
}

function rangeMouseDown() {
  Store.setUpdateTime(true);
  UI.selectors.inputRange.classList.add('draged');
}

function rangeMouseUp() {
  const time = Number(this.value);
  Store.setUpdateTime(false);
  Player.setCurrentTime(time);
  UI.selectors.inputRange.classList.remove('draged');
}

const Actions = {
  playPauseSong,
  nextSong,
  prevSong,
  diffSong,
  changeTimeDisplay,
  updateDuration,
  updatePlayingTime,
  rangeMouseUp,
  rangeMouseDown
}

export default Actions;
