import React from 'react';
import {Route} from "react-router-dom"
import PropTypes from 'prop-types'
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage"
import RegisterPage from "./components/pages/RegisterPage"
import SchedulesPage from "./components/pages/SchedulesPage"
import DashboardPage from "./components/pages/DashboardPage"
import TopNavigation from "./components/navigation/TopNavigation"
import UserRoute from './components/routes/UserRoute'
import GuestRoute from './components/routes/GuestRoute'

const App = ({location}) => (
    <div className="ui container">
        <TopNavigation/>
        <Route location={location} path="/" exact component={HomePage}/>
        <GuestRoute location={location} path="/login" exact component={LoginPage}/>
        <GuestRoute location={location} path="/register" exact component={RegisterPage}/>
        <UserRoute location={location} path="/dashboard" exact component={DashboardPage}/>
        <UserRoute location={location} path="/schedules" exact component={SchedulesPage}/>
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;