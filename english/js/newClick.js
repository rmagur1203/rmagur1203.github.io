onspeech = true;

answerCount = $.cookie("score");
if (answerCount == undefined) answerCount = 0;
$(document).ready(LoadWord);

const URLSearch = new URLSearchParams(window.location.search);
wordloc = URLSearch.get("words");
if (wordloc == null)
    wordloc = "words.json";

function LoadWord() {
    $.getJSON(wordloc, function(json) {
        let container = document.getElementById("container");
        let answers = document.createElement("div");
        answers.id = "answers";
        keys = ArrayRandom(1, json.length, 5);
        for (var i = 0; i < keys.length; i++) {
            keys[i] = $.extend({}, json[keys[i]]);
        }
        data = keys[0];
        keys = shuffle(keys);
        keys.push({
            뜻: [{
                typeko: "",
                typeen: "",
                value: "모릅니다."
            }]
        });
        //console.log(keys);
        //var datarndk = getRandomInt(0, data.뜻.length);
        //console.log(data.뜻[0]);
        var datatypeen = data.뜻[0].typeen == null ? "" : data.뜻[0].typeen.substring(0, 1).toLowerCase();
        container.innerHTML = `<div id="wordCard" data-toggle="tooltip" title="${datatypeen + ". " + data.뜻[0].value}">${data.단어}</div>`;
        container.appendChild(answers);
        let answerhtml = "";
        answerhtml = "<center>";
        for (let i = 0; i < keys.length; i++) {
            var means = "";
            var typeen = keys[i].뜻[0].typeen == null ? "" : (keys[i].뜻[0].typeen.substring(0, 1).toLowerCase() + ". ");
            means = typeen + keys[i].뜻[0].value;
            /*
            var rndk = getRandomInt(0, keys[i].뜻.length);
            console.log(rndk);
            if (keys[i].단어 == data.단어) {
                rndk = datarndk;
            }
            var typeen = keys[i].뜻[rndk].typeen == null ? "" : keys[i].뜻[rndk].typeen.substring(0, 1).toLowerCase();
            console.log(rndk);
            console.log(typeen, keys[i].뜻[rndk].value);
            if (keys[i].뜻[rndk].value == "모릅니다.") {
                means = keys[i].뜻[rndk].value;
            } else {
                means = typeen.substring(0, 1).toLowerCase() + ". " + keys[i].뜻[rndk].value;
            }
            */
            /*
            for (let j = 0; j < keys[i].뜻.length; j++) {
                console.log(keys[i].뜻[j]);
                means += keys[i].뜻[j].typeen.substring(0, 1) + keys[i].뜻[j].value;
            }
            */
            answerhtml += "<br/>";
            answerhtml += "<br/>";
            answerhtml += `<a class="button" id="${i}" onclick="checkAnswer(this);">${means}</a>`;
            keys[i].뜻 = means;
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

function ArrayRandom(min, max, count) {
    var list = [];
    while (list.length != count) {
        var rndkey = getRandomInt(min, max);
        if (!list.includes(rndkey))
            list.push(rndkey);
    }
    return list;
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
    }, 4000);
}