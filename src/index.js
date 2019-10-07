import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovieData);
    yield takeEvery('GET_MOVIE', getOneMovie);
    yield takeEvery('GET_GENRES', getGenres);

}

function* getMovieData() {
    try {
        const response = yield axios.get('/movies');
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('error while getting movies', error);
    }
}

function* getOneMovie(action) {
    try {
        const response = yield axios.get(`/movies/details/${action.payload}`);
        yield put({ type: 'SET_MOVIE', payload: response.data });
    } catch (error) {
        console.log('error getting this one movie details', error);
    }
}

function* getGenres(action) {
    try {
        const response = yield axios.get(`/movies/genres/${action.payload}`);
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
        console.log('error getting generes for this movie', error);
    }
}

const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovie = (state = {}, action) => {
    if (action.type === 'SET_MOVIE') {
        return action.payload;
    }
    return state;
}

const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        movies,
        selectedMovie,
        genres
    }),


applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
