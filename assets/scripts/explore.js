// explore.js

window.addEventListener('DOMContentLoaded', init);

let voices = [];
window.speechSynthesis.speak(new SpeechSynthesisUtterance("hello"));

const synth = window.speechSynthesis;

function populateVoiceList() {

    // If populated, just return.
    if (voices.length) {
	return;
    }

    // Get all the voices
    voices = synth.getVoices();

    // Add options to the pulldown list
    var voiceSelect = document.getElementById("voice-select");
    for (let i = 0; i < voices.length; i++) {
	const option = document.createElement("option");
	option.textContent = `${voices[i].name}`;
	voiceSelect.appendChild(option);
    }
}


function init() {

    var textarea = document.getElementById("text-to-speak");
    var selection = document.getElementById("voice-select");
    var smileimg = document.querySelector("section#explore img");

    // Load all available voices when synth is ready
    synth.onvoiceschanged = () => {
	populateVoiceList();
    };

    // When user click on "Press To Talk":
    var play = document.querySelector("section#explore button");
    play.addEventListener("click", (event) => {
	populateVoiceList();

	// Create an utterance for the text in the textarea
	var utterance = new SpeechSynthesisUtterance(textarea.value);

	// Set to the desired voice
	for (let i = 0; i < voices.length; i++) {
	    if (voices[i].name == selection.value) {
		utterance.voice = voices[i];
		break;
	    }
	}

	// When talk starts, change to open-mouth image
	utterance.addEventListener("start", () => {
	    smileimg.src = "assets/images/smiling-open.png";
	});

	// When talk ends, change to close-mouth image
	utterance.addEventListener("end", () => {
	    smileimg.src = "assets/images/smiling.png";
	});

	// Start talking
	synth.speak(utterance);
    });
    
}
