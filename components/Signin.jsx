import React from 'react';
import Form from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_USER_MUTATION = gql`
    mutation SIGNIN_USER_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email,
            name
        }
    }
`

class Signin extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <Mutation
                mutation={SIGNIN_USER_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                update={() => Router.push('/')}
            >
                {(signin, { error, loading }) => {
                    return (
                        <Form method='POST' onSubmit={e => {
                            e.preventDefault();
                            signin();
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Into An Account</h2>
                                <ErrorMessage error={error}/>
                                <label>
                                    Email
                                <input type="email" name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Password
                                <input type="password" name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} />
                                </label>
                                <button type='submit'>Sign In!</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signin;