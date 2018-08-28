const fs = require('fs');
const express = require('express');
const fortunes = require('./data/fortunes.json');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const writeFortune = (json) => {
    fs.writeFile('./data/fortunes.json', JSON.stringify(json), err => console.log(err))
}

app.get('/fortunes', (req, res) => {
    res.json(fortunes)
})

app.get('/fortunes/random', (req, res) => {

    res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
})

app.get('/fortunes/:id', (req, res) => {
    res.json(fortunes.find(f => f.id == req.params.id))
})

app.post('/fortunes', (req, res) => {
    console.log(req.body);

    const { message, lucky_number, spirit_animal } = req.body;
    const fortune_ids = fortunes.map(f => f.id);
    
    const new_fortunes = fortunes.concat({
        id: fortune_ids.length > 0 ? (Math.max(...fortune_ids)) + 1 : 0,
        message, lucky_number,
        spirit_animal
    });

    writeFortune(new_fortunes);
    
    res.json(new_fortunes)
});

app.put('/fortunes/:id', (req, res) => {
    const { id } = req.params;
    //const { message, lucky_number, spirit_animal } = req.body;

    const old_fortune = fortunes.find(f => f.id == id);

    // if (message) old_fortunes.message = message;
    // if (lucky_number) old_fortunes.lucky_number = lucky_number;
    // if (spirit_animal) old_fortunes.spirit_animal = spirit_animal;

    ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
        if (req.body[key]) old_fortune[key] = req.body[key];
    })

    writeFortune(fortunes);

    res.json(fortunes);
})

app.delete('/fortunes/:id', (req, res) => {
    const { id } = req.params;

    const new_fortunes = fortunes.filter( f => f.id != id);

    writeFortune(new_fortunes);
    res.json(new_fortunes);
})

module.exports = app;

app.listen(port, () => console.log(`Listening on port ${port}`));