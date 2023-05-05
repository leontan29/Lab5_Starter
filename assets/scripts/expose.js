// expose.js
//import JSConfetti from './js-confetti.browser.js';

window.addEventListener('DOMContentLoaded', init);

function init() {
    
    var aud = document.querySelector("section#expose audio");
    var sel = document.getElementById("horn-select");
    var selimg = document.querySelector("section#expose img");

    // On selection change: set horn image and audio source
    sel.addEventListener("change", (event) => {
	if (event.target.value == "air-horn") {
	    selimg.src = "assets/images/air-horn.svg";
	    aud.src = "assets/audio/air-horn.mp3";
	} else if (event.target.value == "car-horn") {
	    selimg.src = "assets/images/car-horn.svg";
	    aud.src = "assets/audio/car-horn.mp3";
	} else if (event.target.value == "party-horn") {
	    selimg.src = "assets/images/party-horn.svg";
	    aud.src = "assets/audio/party-horn.mp3";
	}
    });

    // On change volume: change the audio volume and the volume img
    var vol = document.getElementById("volume");
    var volimg = document.querySelector("div#volume-controls img");
    vol.addEventListener("change", (event) => {
	var value = event.target.value / 100.0;
	aud.volume = value;
	if (value == 0) {
	    volimg.src = "assets/icons/volume-level-0.svg";
	} else if (value < 0.33) {
	    volimg.src = "assets/icons/volume-level-1.svg";
	} else if (value < 0.67) {
	    volimg.src = "assets/icons/volume-level-2.svg";
	} else {
	    volimg.src = "assets/icons/volume-level-3.svg";
	}
    });

    // On click on play button: play audio and optionally add confetti
    var play = document.querySelector("section#expose button");
    play.addEventListener("click", (event) => {
	if (aud.src.endsWith("party-horn.mp3")) {
	    const jsConfetti = new JSConfetti();
	    jsConfetti.addConfetti();
	}
	aud.play();
    });
}
