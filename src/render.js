const { desktopCapturer, Menu } = require("electron");

const videoSelectBtn = document.getElementById("videoSelectBtn");
const startButton = document.getElementById('startBtn')
const stopButton = document.getElementById('stopBtn')
const video = document.querySelector('video')
videoSelectBtn.onclick = getVideoSources;

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer
    .getSources({ types: ["screen"] })
    .then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: "loopback" });
    });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map((source) => {
      return {
        label: source.name,
        click: () => selectSource(source),
      };
    })
  );

  videoOptionsMenu.popup();
}

startButton.addEventListener('click', () => {
    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        width: 320,
        height: 240,
        frameRate: 30
      }
    }).then(stream => {
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }).catch(e => console.log(e))
  })
  
  stopButton.addEventListener('click', () => {
    video.pause()
  })