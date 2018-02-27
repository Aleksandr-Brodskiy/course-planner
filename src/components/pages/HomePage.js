import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'

class HomePage extends React.Component {
    logout = () => this.props.logout();

    render() {
        return (
            <div>
                <h1>Welcome to CoursePlanner</h1>
                <div><Link to='/login'><Button>Login</Button></Link><Link
                    to='/register'><Button>Register</Button></Link></div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    let user = state.user;
    if (state.user && state.user.api_keys) {
        user.isAuthenticated = !!user.api_keys.access;
    }
    return user;
}

export default connect(mapStateToProps, {logout})(HomePage);