import React from 'react'
import {Form, Dropdown} from 'semantic-ui-react'
import axios from 'axios'

class ClassSearchForm extends React.Component {
    state = {
        query: "",
        loading: false,
        options: [
            {
                key: 1,
                value: 1,
                text: "First Class",
            },
            {
                key: 2,
                value: 7,
                text: "Second Class",
            }
        ],
        classes: {}
    };

    fetchOptions = () => {
        if (!this.state.query)
            return;
        this.setState({
            loading: true
        });
        axios.get('http://127.0.0.1:8000/api/courses/course-search', {params: {course: this.state.query}})
            .then(res => res.data)
            .then(classes => {
                console.log(classes);
                const options = [];
                const classesHash = {};

                classes.forEach(course => {
                    classesHash[course.crn] = course;
                    options.push({
                        key: course.crn,
                        value: course.course_id,
                        text: course.course_id,
                    })
                });
                this.setState({loading: false, options, classes: classesHash})
            });
    };

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data.searchQuery,
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };
    onChange = (e, data)=>{
        this.setState({query:data.value});
        this.props.onCourseSelect(this.state.classes[data.value])
    };

    render() {
        return (
            <Form>
                <Dropdown search fluid placeholder="Search for a class to add" value={this.state.query}
                          onSearchChange={this.onSearchChange} options={this.state.options}
                          loading={this.state.loading} onChange={this.onChange}/>
            </Form>
        )
    }
}

export default ClassSearchForm