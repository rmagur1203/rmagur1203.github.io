onspeech = false;

answerCount = $.cookie("score");
if (answerCount == undefined) answerCount = 0;
$(document).ready(function() {
    LoadWord();
});

function LoadWord() {
    $.getJSON("words.json", function(json) {
        let container = document.getElementById("container");
        let answers = document.createElement("div");
        answers.id = "answers";
        data = json[getRandomInt(1, 3001)];
        keys = shuffle([
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            data
        ]);
        keys.push({ 뜻: "모릅니다." });
        container.innerHTML = `<div id="wordCard" data-toggle="tooltip" title="[${data.등급}] ${data.뜻}">${data.단어}</div>`;
        container.appendChild(answers);
        let answerhtml = "";
        answerhtml = "<center>";
        for (let i = 0; i < keys.length; i++) {
            answerhtml += "<br/>";
            answerhtml += "<br/>";
            answerhtml += `<a class="button" id="${i}" onclick="checkAnswer(this);">${keys[i].뜻}</a>`;
        }
        answers.innerHTML = answerhtml + "</center>";
        container.innerHTML += `<div id="Correct">${answerCount}</div>`;
        if (onspeech)
            speech(data.단어, { lang: "en-US" });
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function checkAnswer(sender) {
    if (sender.classList.contains("disable")) return;
    let id = sender.id;
    console.log(id);
    if (data == keys[id]) {
        answerCount++;
        $.cookie("score", answerCount);
    } else {
        answerCount = 0;
    }
    if (onspeech)
        speech(data.뜻);
    $('[data-toggle="tooltip"]').tooltip("show");
    let container = document.getElementById("container");
    container.style.backgroundColor = (data == keys[id] ? "#28a745" : "#dc3545");
    $("a.button").addClass("disable");
    setTimeout(() => {
        let container = document.getElementById("container");
        container.style.backgroundColor = "";
        $('[data-toggle="tooltip"]').tooltip("hide");
        LoadWord();
    }, 2000);
}