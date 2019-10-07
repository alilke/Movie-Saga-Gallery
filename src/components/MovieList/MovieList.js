import React, { Component } from 'react';


class MovieList extends Component {
    render() {
        let movie = this.props.movie;
        return (
            // this section will display the selected movie 
            <div className="MovieItem">
                <div className="movieImage" onClick={() => { this.props.goToDetails(movie.id) }}>
                    <img src={movie.poster} alt={movie.title}></img>
                </div>
                <h2>{movie.title}</h2>
            </div>

        );
    }
}

export default MovieList;