onspeech = true;
settings = {
    readkr: false
}

answerCount = $.cookie("score");
if (answerCount == undefined) answerCount = 0;
$(document).ready(LoadWord);

wordloc = "words/sn1.json";

function LoadWord() {
    $.getJSON(wordloc, function(json) {
        wordlist = json;
        let container = document.getElementById("container");
        let answers = document.createElement("div");
        answers.id = "answers";
        keys = ArrayRandom(1, json.length, 5);
        var dataindex = keys[0];
        for (var i = 0; i < keys.length; i++) {
            keys[i] = $.extend({}, json[keys[i]]);
        }
        data = keys[0];
        data.index = dataindex;
        keys = shuffle(keys);
        keys.push({
            뜻: [{
                typeko: "",
                typeen: "",
                value: "모릅니다."
            }]
        });
        container.innerHTML = `<div id="wordCard" data-toggle="tooltip" title="">${data.단어}</div>`;
        container.appendChild(answers);
        let answerhtml = "";
        answerhtml = "<center>";
        for (let i = 0; i < keys.length; i++) {
            var means = "";
            var typeen = isNull(keys[i].뜻[0].typeen) ? "" : (keys[i].뜻[0].typeen.substring(0, 1).toLowerCase() + ". ");
            means = typeen + keys[i].뜻[0].value;
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

async function checkAnswer(sender) {
    if (sender.classList.contains("disable")) return;
    let id = sender.id;
    console.clear();
    console.log(wordlist[data.index]);
    writeMeans(wordlist[data.index].뜻);
    if (data == keys[id]) {
        answerCount++;
        $.cookie("score", answerCount);
    } else {
        answerCount = 0;
    }
    if (onspeech && settings.readkr)
        speech(data.뜻);
    $('[data-toggle="tooltip"]').attr("title", data.뜻);
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

function writeMeans(means) {
    for (var i = 0; i < means.length; i++) {
        console.log(means[i].typeko, means[i].value);
    }
}

function isNull(str) {
    return (str == "" || str == null || str == undefined);
}