const textarea = document.querySelector("textarea"),
speechBtn = document.querySelector("button");


speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        textToSpeech(textarea.value);
    }
});