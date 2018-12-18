import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem (
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends React.Component {

  state = {
    title: 'coctail',
    description: 'really tasty coctail',
    image: '',
    largeImage: '',
    price: 1000
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = value && type === 'number'
      ? parseFloat(value)
      : value;
    this.setState({ [name]: val });
  }

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    
    const res = await fetch('https://api.cloudinary.com/v1_1/dghennoga/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    this.setState({ 
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) =>
          <Form onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            Router.push(`/item${res.data.createItem.id}`)
          }}>
            <ErrorMessage error={error}/>
            <h2>Sell an item!</h2>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  name='image'
                  placeholder='Image'
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && <img src={this.state.image} width='50%' alt='Upload preview' />}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name='title'
                  placeholder='Title'
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button>Submit</button>
            </fieldset>
          </Form>
        }
      </Mutation>
    );
  }
}

export default CreateItem;