const textarea = document.querySelector("textarea"),
    speechBtn = document.querySelector("button"),
    voiceList = document.querySelector("select");

let synth = speechSynthesis;
isSpeaking = true;

function voices() {
    for (let voice of synth.getVoices()) {
        //select Google US English voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        // creating an option tag passing voice name and language
        let option = `<option value="${voice.name}" ${selected}>${voice.lang} (${voice.name})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); //insert option tag before end of select tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    // if the available device voice is equal to the user selected voice name
    // then set the speech voice to the user selected voice
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    synth.speak(utternance);
}

speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            // if the speech/utternance is not currently in process of speaking
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            // if isSpeaking is true then change its value to false and resume the speech
            // else change its value to true and pause the speech
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            // checking if the speech is in speaking process or not in every 100 ms
            // if not then set the value of isSpeaking to true and add the change the button text
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            }, 500);
        } else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
