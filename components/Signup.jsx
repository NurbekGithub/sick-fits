import React from 'react';
import Form from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

export const SIGNUP_USER_MUTATION = gql`
    mutation SIGNUP_USER_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`

class Signup extends React.Component {
    state = {
        email: '',
        name: '',
        password: '',
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <Mutation mutation={SIGNUP_USER_MUTATION} variables={this.state} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signup, { error, loading }) => {
                    return (
                        <Form method='POST' onSubmit={e => {
                            e.preventDefault();
                            signup();
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Up For An Account</h2>
                                <ErrorMessage error={error}/>
                                <label>
                                    Email
                                <input type="email" name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Name
                                <input type="text" name='name' placeholder='name' value={this.state.name} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Password
                                <input type="password" name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} />
                                </label>
                                <button type='submit'>Sign Up!</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signup; 