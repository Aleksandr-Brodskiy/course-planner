import React from 'react'
import {Form, Dropdown} from 'semantic-ui-react'
import axios from 'axios'

class ClassSearchForm extends React.Component {
    state = {
        query: "",
        loading: false,
        options: [],
        classes: {},
        chosen_classes: [],
    };

    fetchOptions = () => {
        if (!this.state.query)
            return;
        this.setState({
            loading: true
        });
        axios.get('https://cse120-course-planner.herokuapp.com/course-search', {params: {course: this.state.query}})
            .then(res => res.data)
            .then(classes => {
                //console.log(classes);
                const options = [];
                const classesHash = {};
                // console.log(this.state.chosen_classes);
                classes.forEach(course => {
                    // if (!(this.state.chosen_classes === undefined || this.state.chosen_classes.length === 0)
                    //     && !!this.state.chosen_classes.filter(course_obj => (course_obj.crn === course.crn)))
                    //     return;
                    let x = this.state.chosen_classes.filter(course_obj => (course_obj.crn === course.crn));
                    if (x.length > 0) {
                        return;
                    }
                    classesHash[course.course_id] = course;
                    options.push({
                        key: course.course_id,
                        value: course.course_id,
                        text: course.course_id,
                    });
                    // console.log(options);
                });
                this.setState({loading: false, options, classes: classesHash})
            });
    };

    onSearchChange = (e, data) => {
        if (data.searchQuery.length >= 3) {
            clearTimeout(this.timer);
            this.setState({
                query: data.searchQuery,
            });
            this.timer = setTimeout(this.fetchOptions, 10);
        }
        // console.log(this.state.query);
    };
    onChange = (e, data) => {
        this.setState({options: []});
        this.setState({query: data.value});
        //console.log(this.state.classes[data.value]);
        const chosen_classes = this.state.chosen_classes;
        chosen_classes.push(this.state.classes[data.value]);
        this.setState({chosen_classes: chosen_classes});
        this.props.onCourseSelect(this.state.classes[data.value]);

        // console.log(this.state.chosen_classes);
    };
    search = (options, query) => {
        return options;
    };

    render() {
        return (
            <Form>
                <Dropdown selection search={this.search} fluid placeholder="Search for a class to add"
                          value={this.state.query}
                          onSearchChange={this.onSearchChange} options={this.state.options}
                          loading={this.state.loading} onChange={this.onChange} selectOnNavigation={false}
                          minCharacters={3}/>
            </Form>
        )
    }
}

export default ClassSearchForm