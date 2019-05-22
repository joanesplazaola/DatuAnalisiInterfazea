import React, {Component, Fragment} from 'react';
import {withAlert} from "react-alert";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {

        const {error, alert, message} = this.props;
        if (error !== prevProps.error) {

            for (let field in error.msg) {
                alert.error(`${field}: ${error.msg[field]}`)

            }
        }
        if (message !== prevProps.message) {

            for (let msg in message) alert.success(message[msg]);
        }
    }


    render() {
        return <Fragment/>;
    }
}


const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))
