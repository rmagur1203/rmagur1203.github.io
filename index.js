const fs = require('fs');

main = async() => {
    var a = await fs.readFileSync("./english/words/1000words.json");
    var b = await fs.readFileSync("./english/words/2000words.json");
    var c = await fs.readFileSync("./english/words/3000words.json");
    var d = await fs.readFileSync("./english/words/4000words.json");
    var e = await fs.readFileSync("./english/words/5000words.json");
    a = JSON.parse(a);
    b = JSON.parse(b);
    c = JSON.parse(c);
    d = JSON.parse(d);
    e = JSON.parse(e);
    output = a.concat(b, c, d, e);
    await fs.writeFileSync('./english/words/wordsa.json', JSON.stringify(output));
}

main();