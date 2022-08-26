const textarea = document.querySelector("textarea"),
    speechBtn = document.querySelector("button"),
    voiceList = document.querySelector("select");

let synth = speechSynthesis;

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
        if (!synth.speaking) {  // if the speech/utternance is not currently in process of speaking
            textToSpeech(textarea.value);
        }
    }
});
