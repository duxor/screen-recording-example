const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const outputDir = 'recordings';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

let ffmpegCommand;
let startTime;
let timerInterval;

function updateElapsedTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  document.getElementById('time-display').innerText = `${minutes}:${seconds}`;
}

function startRecording() {
  const manifestFile = path.join(outputDir, 'manifest.mpd');

  ffmpegCommand = ffmpeg()
    .input(':0.0+0,0')
    .inputFormat('x11grab')
    .input('default')
    .inputFormat('pulse')
    .videoCodec('libx264') // H.264 video codec for compatibility
    .audioCodec('aac') // AAC audio codec for compatibility
    .outputOptions([
      '-framerate 25', // Set framerate
      '-pix_fmt yuv420p', // Set pixel format
      '-use_timeline 1', // Enable timeline mode
      '-use_template 1', // Enable template mode
      '-f dash', // Use DASH format
      '-seg_duration 1', // Segment duration in seconds
      '-streaming 1', // Enable streaming mode
      '-init_seg_name', 'init-$RepresentationID$.m4s', // Initialization segment naming
      '-media_seg_name', 'chunk-$RepresentationID$-$Number$.m4s', // Media segment naming
      '-dash_segment_type mp4' // DASH segment type (mp4 for .m4s files)
    ])
    .output(manifestFile)
    .on('start', commandLine => {
      console.log('Spawned FFmpeg with command: ' + commandLine);
      startTime = Date.now();
      timerInterval = setInterval(updateElapsedTime, 1000);
    })
    .on('error', (err, stdout, stderr) => {
      console.error('Error: ' + err.message);
      console.error('FFmpeg stderr: ' + stderr);
    })
    .on('end', () => {
      console.log('Recording finished!');
      clearInterval(timerInterval);
    });

  ffmpegCommand.run();
}

function stopRecording() {
  if (ffmpegCommand) {
    ffmpegCommand.kill('SIGINT');
    console.log('Recording stopped.');
    clearInterval(timerInterval);
  }
}

document.getElementById('start-btn').addEventListener('click', startRecording);
document.getElementById('stop-btn').addEventListener('click', stopRecording);
