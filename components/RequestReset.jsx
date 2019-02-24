import React from 'react';
import Form from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`

class RequestReset extends React.Component {
    state = {
        email: ''
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}
            >
                {(request, { error, loading, called }) => {
                    return (
                        <Form method='POST' data-test='reset' onSubmit={e => {
                            e.preventDefault();
                            request();
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reqest to reset your password</h2>
                                {!error && !loading && called && <p>Your reset token has been sent to your email</p>}
                                <ErrorMessage error={error}/>
                                <label>
                                    Email
                                <input type="email" name='email' placeholder='email' value={this.state.email} onChange={this.handleChange} />
                                </label>
                                <button type='submit'>Reset</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default RequestReset;