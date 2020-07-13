var voices = [];

function setVoiceList() {
    voices = window.speechSynthesis.getVoices();
}
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = setVoiceList;
}

function speech(text, options) {
    //console.log(text, options);
    if (!window.speechSynthesis) {
        alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
        return;
    }
    if (options == null) {
        options = {
            lang: 'ko-KR',
            pitch: 1,
            rate: 1
        };
    }
    if (options.lang == undefined)
        options.lang = 'ko-KR';
    if (options.pitch == undefined)
        options.pitch = 1;
    if (options.rate == undefined)
        options.rate = 1;
    var lang = options.lang;
    var utterThis = new SpeechSynthesisUtterance(text);
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
            utterThis.voice = voices[i];
            utterThis.lang = options.lang;
            utterThis.pitch = options.pitch;
            utterThis.rate = options.rate;
            window.speechSynthesis.speak(utterThis);
            return;
        }
    }
    alert('voice not found');
    return;
}

$(document).ready(setVoiceList);