import React from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../actions/auth";
import {login} from "../../actions/auth";

const TopNavigation = ({user, api_keys, logout}) => (
    <Menu secondary pointing>
        {/*<Menu.Item>*/}
        {/*<img src={require('../../images/logo.png')} />*/}
        {/*</Menu.Item>*/}
        {(!!api_keys && !!api_keys.access) && <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>}
        {(!!api_keys && !!api_keys.access) && <Menu.Item as={Link} to="/schedules">Create Schedule</Menu.Item>}

        {(!(!!api_keys) || !(!!api_keys.access)) && <Menu.Item position="left">Please Login/Register</Menu.Item>}

        {(!!api_keys && !!api_keys.access) &&
        <Menu.Item position="right" onClick={logout}><Button secondary>Logout</Button></Menu.Item>}

        {(!(!!api_keys) || !(!!api_keys.access)) &&
        <Menu.Menu>
            <Menu.Item position="right" as={Link} to="/login"><Button primary>Login</Button></Menu.Item>
            <Menu.Item position="right" as={Link} to="/register"><Button>Register</Button></Menu.Item>
        </Menu.Menu>
        }


    </Menu>
);

function mapStateToProps(state) {
    return {
        user: state.user.user,
        api_keys: state.user.api_keys
    }
}

export default connect(mapStateToProps, {logout, login})(TopNavigation);