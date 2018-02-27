import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
// import ConfirmEmailMessage from "../messages/ConfirmEmailMessage"
import {logout} from "../../actions/auth";

class DashboardPage extends React.Component {
    logout = () => this.props.logout();

    render() {
        return (
            <div>
                {/*{!this.props.isConfirmed && <ConfirmEmailMessage/>}*/}
                <h1>Dashboard</h1>
                <div>
                    <h2>Name: {this.props.user.name}</h2>
                    <h2>username: {this.props.user.username}</h2>
                    <h2>First Name: {this.props.user.first_name}</h2>
                    <h2>Last Name: {this.props.user.last_name}</h2>
                    <Button onClick={this.logout}>Logout</Button>
                </div>
            </div>

        )
    }

}

function mapStateToProps(state) {
    return {
        isConfirmed: state.user.confirmed,
        user: state.user.user,
    }
}

export default connect(mapStateToProps, {logout})(DashboardPage);