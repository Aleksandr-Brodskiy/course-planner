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
                <h1>Home Page</h1>
                {this.props.isAuthenticated ?
                    <div>
                        <h2>Name: {this.props.user.name}</h2>
                        <h2>username: {this.props.user.username}</h2>
                        <h2>First Name: {this.props.user.first_name}</h2>
                        <h2>Last Name: {this.props.user.last_name}</h2>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                    : <Button><Link to='/login'>Login</Link></Button>}
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