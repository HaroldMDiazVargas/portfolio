// Music Player

import { eventHandler } from "../eventHandler";

// Select all the elements in the HTML page
// and assign them to a variable
let player = document.querySelector(".player");
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
// let track_index = 0;
// let isPlaying = false;
// let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

class AudioPlayer {
  constructor(track_list) {
    this.track_index = 0;
    this.track_list = track_list;
    this.isPlaying = false;
    this.updateTimer;
  }

  nextTrack() {
    if (this.track_index < this.track_list.length - 1) this.track_index += 1;
    else this.track_index = 0;

    // Load and play the new track
    // this.loadTrack(this.track_index);
    this.loadTrack();
    this.playTrack();
  }

  prevTrack() {
    if (this.track_index > 0) this.track_index -= 1;
    else this.track_index = this.track_list.length - 1;

    // Load and play the new track
    // this.loadTrack(this.track_index);
    this.loadTrack();
    this.playTrack();
  }

  playPauseTrack() {
    if (!this.isPlaying) this.playTrack();
    else this.pauseTrack();
  }

  loadTrack() {
    clearInterval(this.updateTimer);
    this.resetValues();

    // Load a new track
    curr_track.src = this.track_list[this.track_index].path;
    curr_track.load();

    // Update details of the track
    track_art.style.backgroundImage =
      "url(" + this.track_list[this.track_index].image + ")";
    track_name.textContent = this.track_list[this.track_index].name;
    track_artist.textContent = this.track_list[this.track_index].artist;
    now_playing.textContent =
      "PLAYING " + (this.track_index + 1) + " OF " + this.track_list.length;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    this.updateTimer = setInterval(this.seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", this.nextTrack);

    // Apply a random background color
    this.random_gradient();
  }

  playTrack() {
    curr_track.play();
    this.isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }

  pauseTrack() {
    curr_track.pause();
    this.isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }

  resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  random_gradient() {
    let deg = Math.floor(Math.random() * 360);

    let gradient =
      "linear-gradient(" +
      deg +
      "deg, " +
      "#" +
      this.createHex() +
      ", " +
      "#" +
      this.createHex() +
      ")";
    player.style.background = gradient;
  }

  createHex() {
    let hexCode1 = "";
    let hexValues1 = "0123456789abcdef";

    for (let i = 0; i < 6; i++) {
      hexCode1 += hexValues1.charAt(
        Math.floor(Math.random() * hexValues1.length)
      );
    }
    return hexCode1;
  }

  seekTo() {
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
  }

  setVolume() {
    curr_track.volume = volume_slider.value / 100;
  }

  seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;

      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(
        curr_track.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(
        curr_track.duration - durationMinutes * 60
      );

      // Add a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }

      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
}
let track_list = [
  {
    name: "Ukelele", //ukelele
    artist: "Violett",
    image:
      "https://freemusicarchive.org/image/?file=images%2Falbums%2FVarious_Artists_-_Aires_Buenos_-_2009113014203475.jpg&width=290&height=290&type=image",
    // path: "/assets/audio/violett_-_04_-_ukelele_seph_remix.mp3",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//music//no_curator//violett//Aires_Buenos//violett_-_04_-_ukelele_seph_remix.mp3",
  },
  {
    name: "Equation",
    artist: "The hermit",
    image:
      "https://freemusicarchive.org/image/?file=track_image%2FRsh7OEv17bMsBhJZx3HZiLr1O4dxRxf4nBOzmtww.jpeg&width=290&height=290&type=track",
    // path: "/assets/audio/ggBEwSSzoiiBNwSCrmn49MzfB7NuMloebARGSsGj.mp3",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//tracks//52XGYrH1sFstSczS6T52mpAN4xP2Bg0Ig9A4W2S5.mp3",
  },
  {
    name: "Flat Blue Acid",
    artist: "Simon Mathewson",
    image:
      "https://freemusicarchive.org/image/?file=image%2Fz392j03jzX54ASsJi3Ywig71W3k6fR7jSTX0BbHM.jpeg&width=290&height=290&type=image",
    // path: "/assets/audio/52XGYrH1sFstSczS6T52mpAN4xP2Bg0Ig9A4W2S5.mp3",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//tracks//ggBEwSSzoiiBNwSCrmn49MzfB7NuMloebARGSsGj.mp3",
  },
];

const audioPlayer = new AudioPlayer(track_list);
audioPlayer.loadTrack();

eventHandler(".prev-track", "click", function () {
  audioPlayer.prevTrack();
});

eventHandler(".playpause-track", "click", function () {
  audioPlayer.playPauseTrack();
});

eventHandler(".next-track", "click", function () {
  audioPlayer.nextTrack();
});

eventHandler(".seek_slider", "change", function () {
  audioPlayer.seekTo();
});

eventHandler(".volume_slider", "change", function () {
  audioPlayer.setVolume();
});

// const getAudioNames = () => {
//   const r = require.context("/assets/audio/", false, /\.mp3$/);

//   // return an array list of filenames (with extension)
//   const importAll = (r) => r.keys().map((file) => file.match(/[^\/]+$/)[0]);

//   console.log(importAll(r));
//   return importAll(r);
// };

// const lazyLoadAudio = (audioName, audio) => {
//   import(
//     /* webpackMode: "lazy-once" */
//     `/assets/audio/${audioName}`
//   )
//     .then((src) => (audio = new Audio(src.default)))
//     .catch((err) => console.error(err));
// };

// const audioNames = getAudioNames();
// audios = new Array(audioNames.length);
// audioNames.forEach((audioName, indx) => {
//   lazyLoadAudio(audioName, audios[indx]);
// });

// var audio = new Audio("/assets/audio/violett_-_04_-_ukelele_seph_remix.mp3");
// audio.play();
// audio.pause();
