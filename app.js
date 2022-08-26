const textarea = document.querySelector("textarea"),
speechBtn = document.querySelector("button"),
voiceList = document.querySelector("select")

let synth = speechSynthesis

function voices(){
    for(let voice of synth.getVoices()){
        //select Google US English voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        // creating an option tag passing voice name and language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); //insert option tag before end of select tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)

    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    
    speechSynthesis.speak(utternance)
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        textToSpeech(textarea.value)
    }
});