import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {

    state = {
        newTitle: '',
        newDescription: '',
        movieId: this.props.match.params.id
    }
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_MOVIE', payload: this.props.match.params.id });
    }


    handleChange = (propertyName, event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    handleSave = () => {
        this.props.dispatch({ type: 'UPDATE_MOVIE', payload: this.state })
        this.props.history.goBack();
    }

    goBack = () => {
        this.props.history.goBack();
    }
    render() {

        return (

            <div className="Edit">

                <button onClick={this.goBack}>CANCEL</button>
                <button onClick={this.handleSave}>SAVE CHANGES</button>
                <br></br>
                <label> Update Movie Title:
          <input className="title" type="text" value={this.state.newTitle}
                        onChange={(event) => { this.handleChange('newTitle', event) }}></input>
                </label>
                <br></br>
                <label>Update Movie Description:
          <br></br>
                    <textarea className="description" rows="6" type="text" value={this.state.newDescription}
                        onChange={(event) => { this.handleChange('newDescription', event) }}></textarea>
                </label>

            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putReduxStateOnProps)(Edit);