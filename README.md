# Screen Recorder App

## Overview

The Screen Recorder App is a simple application built using Electron and FFmpeg to record your screen and audio. It allows you to create recordings in MPEG-DASH format, enabling smooth playback and streaming capabilities.

## Features

- Record your screen and audio simultaneously.
- Save recordings in MPEG-DASH format with segmented files (.m4s).
- Streamlined interface for easy recording control.
- Automatic calculation of media duration for DASH manifest.

## Requirements

- Node.js and npm installed on your system.
- FFmpeg installed and accessible in the command line.
- Compatible audio and video input devices (microphone, screen capture settings).

## Installation

1. Clone the repository: `git clone https://github.com/duxor/screen-recording-example`
2. Navigate to the project directory: `cd screen-recording-example`
3. Install dependencies: `npm install`

## Usage

### Recording
1. Start the application: `npm start`
2. Adjust recording settings:
  - Select screen area to capture.
  - Choose audio input source.
  - Set desired video and audio quality.
3. Click the "Start Recording" button to begin recording your screen and audio.
4. Use the "Stop Recording" button or press the assigned shortcut key to stop recording.
5. Recorded files are saved in the "recordings" directory in MPEG-DASH format.
6. To view recordings, use a compatible media player or provide the generated DASH manifest file (`manifest.mpd`) to a DASH player like Dash.js.

### Player
1. Start the player and watch recording: `npm start:recordings`

## Configuration

- Customize recording settings in `main.js` file.
- Adjust FFmpeg options in `index.js` for advanced configuration.
- Update the interface and styling in `index.html` and `style.css` as needed.

## Support and Issues

- For support or to report issues, please [open an issue](https://github.com/duxor/screen-recording-example/issues) on GitHub.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature_branch`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature_branch`
5. Submit a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
