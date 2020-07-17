const request = require('request');
const fs = require('fs');
const url = "https://zh.dict.naver.com/api/zhko/getHskInfoList?level=1&pageSize=100&page=";
var level = 0;

parser = (url) => new Promise((resolve) => {
    request(url, function(error, response, body) {
        var list = [];
        var json = JSON.parse(body);
        var searchResult = json["searchResult"];
        var m_items = searchResult["m_items"];
        for (var i = 0; i < m_items.length; i++) {
            list.push({
                단어: `${m_items[i]["entry"]} [${m_items[i]["pron"]}]`,
                뜻: m_items[i]["means"],
                구분: m_items[i]["parts"]
            });
        }
        resolve(list);
    });
});

main = async() => {
    var count = await getPages();
    var list = [];
    for (var i = 0; i < count; i++) {
        var dat = await parser(url + (i + 1));
        if (dat == null) continue;
        list = list.concat(dat);
        console.log((i + 1) + "/" + count);
    }
    //console.log(list);
    fs.writeFileSync(`level_${level}.json`, JSON.stringify(list).replace(/(<([^>]+)>)/ig, ""));
}

getPages = () => new Promise((resolve) => {
    request(url + 1, function(error, response, body) {
        var json = JSON.parse(body);
        level = json["level"]
        resolve(json["searchResult"]["m_totalPage"]);
    });
});

main();