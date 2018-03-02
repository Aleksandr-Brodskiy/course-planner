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
        axios.get('https://cse120-course-planner.herokuapp.com/api/courses/course-search', {params: {course: this.state.query}})
            .then(res => res.data)
            .then(classes => {
                //console.log(classes);
                const options = [];
                const classesHash = {};
                // console.log(this.state.chosen_classes);
                // let y = this.state.chosen_cla
                /*sses.filter(course_obj => {
                                    if (!!this.props.courses.filter(course => course.crn === course_obj.id)) {
                                        return course_obj;
                                    }
                                    return null;

                                });*/
                // let y = this.props.courses.filter(course_obj => (this.state.chosen_classes.some(course => course_obj.id !== course.crn)));
                // console.log(y);
                // this.setState({chosen_classes: y});
                // this.props.courses.forEach(course=>{
                //     let found = this.state.chosen_classes.some(function (el) {
                //         return el.username === name;
                //     });
                // });
                let x = [];
                this.state.chosen_classes.forEach(course => {
                    let found = this.props.courses.some(function (el) {
                        return el.id === course;
                    });
                    if (found)
                        x.push(course);
                });

                // console.log(x);
                this.setState({chosen_classes: x});
                classes.forEach(course => {

                    let x = this.state.chosen_classes.filter(course_obj => (course_obj === course));
                    if (x.length > 0) {
                        return;
                    }
                    classesHash[course] = course;
                    options.push({
                        key: course,
                        value: course,
                        text: course,
                    });
                    // console.log(options);
                });
                this.setState({loading: false, options, classes: classesHash})
            });
    };

    onSearchChange = (e, data) => {
        // console.log(this.state.chosen_classes);
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