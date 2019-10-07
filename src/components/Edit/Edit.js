import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {
    render() {
        return (

            <div className="Edit">

            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putReduxStateOnProps)(Edit);