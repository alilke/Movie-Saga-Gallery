import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {
    componentDidMount = () => {
        this.getInfo();
    }

    getInfo = () => {
        this.props.dispatch({ type: 'GET_MOVIE', payload: this.props.match.params.id })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    goToEdit = (id) => {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        let movie = this.props.reduxState.selectedMovie;
        return (

            <div className="Details">

                <button onClick={this.goBack}>GO BACK</button>
                <button onClick={() => { this.goToEdit(this.props.match.params.id) }}>EDIT</button>

                <div className="movieDetails">
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>
            </div>

        );
    }
}
const putReduxStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putReduxStateOnProps)(Details);