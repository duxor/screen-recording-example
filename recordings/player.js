const url = "manifest.mpd";
const player = dashjs.MediaPlayer().create();
player.updateSettings({
  debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE }
});
player.initialize(document.querySelector("#video"), url, true);
