import React from 'react'
import {Segment, Button, Icon} from 'semantic-ui-react'
import ClassSearchForm from '../forms/ClassSearchForm'


const Todo = ({todo, remove}) => {
    return (<Button icon labelPosition='right'>{todo.text}<Icon className='window close icon' onClick={() => {
        remove(todo.id)
    }}/></Button>);
};


const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });
    return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>);
};

class SchedulesPage extends React.Component {
    state = {
        courses: [],
        data: []
    };

    addTodo(course) {
        // Assemble data
        const todo = {text: course.course_id, id: course.crn};
        // Update data
        this.state.courses.push(todo);
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
    };

    render() {
        return (
            <div>
                <Segment>
                    <h2>Search for Classes to add:</h2>
                    <ClassSearchForm onCourseSelect={this.onCourseSelect}/>

                    {this.state.courses && <div>{this.state.courses.course_id}</div>}
                </Segment>
                <Segment>
                    <TodoList
                        todos={this.state.courses}
                        remove={this.handleRemove.bind(this)}
                    />
                </Segment>
            </div>

        )
    }


}

export default SchedulesPage;