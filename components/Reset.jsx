import React from "react";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_PASSWORD_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION(
    $password: String!
    $passwordConfirm: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirm: $passwordConfirm
      resetToken: $resetToken
    ) {
      id
      name
      email
    }
  }
`;

class Reset extends React.Component {
  state = {
    password: "",
    passwordConfirm: ""
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation 
        mutation={RESET_PASSWORD_MUTATION}
        variables={{...this.state, resetToken: this.props.token}}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}    
    >
        {(resetPassword, { error, loading }) => {
          return (
            <Form
              method="POST"
              onSubmit={e => {
                e.preventDefault();
                resetPassword();
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset form</h2>
                <ErrorMessage error={error} />
                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  Confirm your password
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="confirm password"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Reset</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;
