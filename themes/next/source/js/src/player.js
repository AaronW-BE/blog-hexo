$(document).ready(function () {

  let playList = [
    '/songs/TikTok.mp3'
  ];

  let audio = document.createElement('audio');
  audio.src = playList[0];
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
});
