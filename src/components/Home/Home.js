import React, { Component } from 'react';
import MovieList from '../MovieList/MovieList'
import './Home.css';
import { connect } from 'react-redux';


class Home extends Component {
    componentDidMount = () => {
        this.getMovies();
    }

    getMovies = () => {
         // SAGA: call to get ALL movie details 
        this.props.dispatch({ type: 'GET_MOVIES' });
    }

    goToDetails = (id) => {
        this.props.history.push(`/details/${id}`)
    }

    render() {
        return (
// this section will map over movie list and put all the results on the dom
            <div>
                <div className="header">
                    <h1>Movies</h1>
                    <h2>click on a movie to view details</h2>
                </div>
                <div className="movieContainer">
                    {this.props.reduxState.movies.map((movie) => {
                        return <MovieList key={movie.id}
                            movie={movie}
                            goToDetails={this.goToDetails} />
                    })}
                </div>
            </div>
        );
    }
}
const putReduxStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putReduxStateOnProps)(Home);