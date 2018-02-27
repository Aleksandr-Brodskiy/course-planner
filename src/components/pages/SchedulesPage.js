import React from 'react'
import {Segment} from 'semantic-ui-react'
import ClassSearchForm from '../forms/ClassSearchForm'

class SchedulesPage extends React.Component {
    state = {
        course: null
    };
    onCourseSelect = course => this.setState({course});

    render() {
        return (
            <Segment>
                <h2>Search for Classes to add</h2>
                <ClassSearchForm onCourseSelect={this.onCourseSelect}/>

                {this.state.course && <div>{this.state.course}</div>}
            </Segment>
        )
    }


}

export default SchedulesPage;