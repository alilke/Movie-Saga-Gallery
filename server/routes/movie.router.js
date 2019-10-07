const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    // DB call to get title and poster
    let queryText = `SELECT "id", "title", "poster" FROM "movies";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
        // sends movie details 
    }).catch((error) => {
        console.log('error getting movies', error);
        res.sendStatus(500);
    })
})//end GET route

router.get('/details/:id', (req, res) => {
        // DB call to get details for the selected movie 
    let queryText = `SELECT "id", "title", "description" FROM "movies" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows[0]);
        // sends movie details
    }).catch((error) => {
        console.log('error getting movies', error);
        res.sendStatus(500);
    })//end GET route
})

router.get('/genres/:id', (req, res) => {
    // DB call to get genres that go with specific movie for details page
    let queryText = `SELECT "genres".name
    FROM "genres"
    JOIN "movies_genres"
        ON "movies_genres".genre_id = "genres".id
    JOIN "movies"
        ON "movies_genres".movie_id = "movies".id
    WHERE "movies".id = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        //sends back the genre results in an object
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting movies', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    //DB call to make updates for selected movie 
    let updates = req.body;
    let queryText = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE "id" = $3`;
    let queryValues = [
        updates.newTitle,
        updates.newDescription,
        updates.movieId
    ];
    pool.query(queryText, queryValues).then((results) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error updating movie', error);
        res.sendStatus(500);
    })
})

module.exports = router;