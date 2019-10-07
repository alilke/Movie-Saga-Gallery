const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT "id", "title", "poster" FROM "movies";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting movies', error);
        res.sendStatus(500);
    })
})//end GET route

router.get('/details/:id', (req, res) => {
    let queryText = `SELECT "id", "title", "description" FROM "movies" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows[0]);
    }).catch((error) => {
        console.log('error getting movies', error);
        res.sendStatus(500);
    })//end GET route
})

module.exports = router;