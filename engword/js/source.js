answerCount = 0;
$(document).ready(function () {
    LoadWord();
});
function LoadWord() {
    $.getJSON("words.json", function(json) {
        let container = document.getElementsByClassName("container")[0];
        let name = document.getElementsByTagName("h1")[0];
        data = json[getRandomInt(1, 3001)];
        keys = shuffle([
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            json[getRandomInt(1, 3001)],
            data
        ]);
        keys.push({뜻:"모릅니다."});
        container.innerHTML = `<a style="font-size: 2.5rem;font-weight: 500;" data-toggle="tooltip" title="${data.뜻}" >${data.단어}</a>`;
        container.innerHTML += `<h2>맞춘 수: ${answerCount}</h2>`;
        for (let i = 0;i < keys.length;i++){
            container.innerHTML += "<div class=\"form-check\">";
            container.innerHTML += `<label class=\"form-check-label\">`;
            container.innerHTML += `<label class=\"form-check-label\">`;
            container.innerHTML += `<input type="radio" id="${i}" class="form-check-input" onclick="checkAnswer(this);" name="optradio">${keys[i].뜻}`;      
            container.innerHTML += "</label>";
            container.innerHTML += "</div>";
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function checkAnswer(sender){
    let id = sender.id;
    console.log(id);
    if (data == keys[id]) {
        answerCount++;
    }
    else {
        $('[data-toggle="tooltip"]').tooltip("show");
    }
    let container = document.getElementsByClassName("container")[0];
    container.classList.value = "container p-3 " + (data == keys[id] ? "bg-success" : "bg-danger") + " text-white";
    setTimeout(() => {
        let container = document.getElementsByClassName("container")[0];
        container.classList.value = "container p-3 bg-dark text-white";
        $('[data-toggle="tooltip"]').tooltip("hide");
        LoadWord();
    }, 2000);
}