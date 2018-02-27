import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import InlineError from '../messages/InlineError'
import isEmail from 'validator/lib/isEmail'

class RegisterForm extends React.Component {
    state = {
        data: {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
        },
        loading: false,
        errors: {},
    };

    onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch(err => {
                    console.log(err.response.data);
                    this.setState({errors: {register: err.response.data.error}}, this.setState({loading: false}))
                });
        }
    };

    validate = (data) => {
        const errors = {};
        if (!data.password)
            errors.password = "Enter a Password";
        if (data.password.length < 5)
            errors.password = "Enter a longer Password :*(";
        if (!data.username)
            errors.username = "Enter a Username";
        if (!isEmail(data.email))
            errors.email = "Enter an Email";
        return errors
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.register && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.register}</p>
                    </Message>
                )}
                <Form.Group widths='equal'>
                    <Form.Input required fluid label="First Name" type="text" name="first_name" id="first_name"
                                placeholder="First Name" value={data.first_name} onChange={this.onChange}/>
                    <Form.Input required fluid label="Last Name" type="text" name="last_name" id="last_name"
                                placeholder="Last Name" value={data.last_name} onChange={this.onChange}/>
                </Form.Group>
                <Form.Group widths='equal'>

                    <Form.Input required error={!!errors.email} fluid
                                label={(errors.email && <InlineError text={errors.email}/>) || "Email"} type="email"
                                name="email" id="email"
                                placeholder="jsmith@gmail.com" value={data.email} onChange={this.onChange}/>
                    <Form.Input required error={!!errors.username} fluid
                                label={(errors.username && <InlineError text={errors.username}/>) || "Username"}
                                type="text" name="username"
                                id="username"
                                placeholder="example_user" value={data.username} onChange={this.onChange}/>
                </Form.Group>
                <Form.Field required error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="*****"
                           value={data.password} onChange={this.onChange}/>
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Register</Button>
            </Form>
        )
    }
}

RegisterForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default RegisterForm