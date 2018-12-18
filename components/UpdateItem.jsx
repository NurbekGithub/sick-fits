import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

export const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION (
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem (
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id,
      title,
      description
      price
    }
  }
`

class UpdateItem extends React.Component {

  state = {}

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = value && type === 'number'
      ? parseFloat(value)
      : value;
    this.setState({ [name]: val });
  }

  updateItem = async (updateItemMutation) => {
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    })
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
      {({ data, loading }) => {
        if(loading) return <p>Loading...</p>
        if(!data.item) return <h3>Not fount {this.props.id}</h3>
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
          {(updateItem, { loading, error }) =>
            <Form onSubmit={e => {
              e.preventDefault();
              this.updateItem(updateItem);
            }}>
              <ErrorMessage error={error} />
              <h2>Sell an item!</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    required
                    defaultValue={data.item.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    name='price'
                    placeholder='Price'
                    required
                    defaultValue={data.item.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    type="number"
                    name='description'
                    placeholder='Description'
                    required
                    defaultValue={data.item.description}
                    onChange={this.handleChange}
                  />
                </label>
                <button disabled={loading}>Sav{loading ? 'ing' : 'e'} changes</button>
              </fieldset>
            </Form>
          }
        </Mutation>
        )
      }}
      </Query>
    );
  }
}

export default UpdateItem;