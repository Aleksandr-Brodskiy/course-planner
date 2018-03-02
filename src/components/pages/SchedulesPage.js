import React from 'react'
import {Divider, Button, Icon, List, Grid} from 'semantic-ui-react'
import ClassSearchForm from '../forms/ClassSearchForm'
import axios from "axios/index";


const Todo = ({todo, remove}) => {
    return (
        <div><Button icon labelPosition='right'>{todo.text} <Icon
            className='window close icon' onClick={() => {
            remove(todo.id)
        }}/></Button><Divider horizontal/></div>
    );
};


const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });
    return (<div>{todoNode}</div>);
};

class SchedulesPage extends React.Component {
    state = {
        courses: [],
        data: [],
        course_data: [],
    };

    addTodo(course) {
        // Assemble data
        const todo = {text: course, id: course};
        // Update data
        this.state.courses.push(todo);
        // console.log(todo);
        // Update state
        this.setState({courses: this.state.courses});
        // console.log(this.state.courses);
    }

    // Handle remove
    handleRemove(id) {
        const remainder = this.state.courses.filter((todo) => {
            if (todo.id !== id)
                return todo;
            return null;
        });
        this.setState({courses: remainder});
    }

    onCourseSelect = course => {
        // console.log(course);
        this.addTodo(course);
        axios.post('http://127.0.0.1:8000/api/courses/course-match', {course_list: [course]}).then(res => res.data).then(course_data =>
            this.state.course_data.push(course_data)
        )
    };

    render() {
        console.log(this.state.course_data);
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <h2>Search for Classes to add:</h2>
                        <ClassSearchForm onCourseSelect={this.onCourseSelect} courses={this.state.courses}/>
                        <Divider horizontal/>
                        <TodoList
                            todos={this.state.courses}
                            remove={this.handleRemove.bind(this)}
                        />

                    </Grid.Column>
                    <Grid.Column>
                        <Divider vertical/>

                    </Grid.Column>
                    <Grid.Column>
                        <h1>Schedule</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }


}

export default SchedulesPage;