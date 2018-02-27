import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import RegisterForm from '../forms/RegisterForm'
import {register} from '../../actions/auth';

class RegisterPage extends React.Component {

    submit = data =>
        this.props.register(data).then(
            () => this.props.history.push("/dashboard")
        );

    render() {
        return (
            <div>
                <h1>Register Page</h1>

                <RegisterForm submit={this.submit}/>
            </div>
        )
    }
}

RegisterPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    register: PropTypes.func.isRequired
};

export default connect(null, {register})(RegisterPage);