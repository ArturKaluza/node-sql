const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM lives', (err, doc) => {
        if (err) return next(err);

        res.json(doc.rows);
    })
})

router.get('/conditions', (req, res, next) => {
    pool.query('SELECT * FROM lives JOIN habitats ON habitats.name = lives.habitat',
    (err, doc) => {
        if (err) return next(err);

        res.json(doc.rows)
    })
})

module.exports = router;