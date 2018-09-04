import '../scss/main.scss'

import UI from './modules/ui'
import Actions from './modules/actions'
import Store from './modules/store'
import Player from './modules/player'

document.addEventListener('DOMContentLoaded', function() {
  Player.initPlayer();
  const songs = Store.getSongs();
  UI.populateSongsList(songs);
  const song = songs[0];
  UI.updatePlayedSong(song);
  UI.populateCurrentSong(song);
  Store.setCurrentSong(song);
  Player.updateSource(song);
  const player = Player.getPlayer();

  player.addEventListener('durationchange', Actions.updateDuration, false);
  player.addEventListener('canplaythrough', Actions.updatePlayingTime, false);
  player.addEventListener('timeupdate', Actions.updatePlayingTime, false);
  player.addEventListener('ended', Actions.nextSong, false);
})
UI.selectors.menuBtn.addEventListener('click', UI.showList);
UI.selectors.closeBtn.addEventListener('click', UI.showPlayer);
UI.selectors.pauseBtn.addEventListener('click', Actions.playPauseSong);
UI.selectors.nextBtn.addEventListener('click', Actions.nextSong);
UI.selectors.prevBtn.addEventListener('click', Actions.prevSong);
UI.selectors.songsList.addEventListener('click', Actions.diffSong);
UI.selectors.currentSongTime.addEventListener('click', Actions.changeTimeDisplay);
UI.selectors.inputRange.addEventListener('mousedown', Actions.rangeMouseDown);
UI.selectors.inputRange.addEventListener('touchstart', Actions.rangeMouseDown);
UI.selectors.inputRange.addEventListener('mouseup', Actions.rangeMouseUp);
UI.selectors.inputRange.addEventListener('touchend', Actions.rangeMouseUp);
UI.selectors.inputRange.addEventListener('input', Actions.updatePlayingTime);
