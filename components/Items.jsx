import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import Item from './Item';
import styled from 'styled-components';
import Pagination from './Pagination';
import { perPage } from '../config';

export const ALL_ITEM_QUERY = gql`
  query ALL_ITEM_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends React.Component {

  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
          <Query query={ALL_ITEM_QUERY} variables={{ skip: (this.props.page - 1) * perPage, first: 4 }}>
            {({ loading, error, data }) => {
              if(loading) return <p>Loading...</p>
              if(error) return <p>{String(error)}</p>
              return <ItemsList>
                {data.items
                  .map(item => <Item key={item.id} item={item}/>)}
              </ItemsList>
            }}
          </Query>
        <Pagination page={this.props.page} />
      </Center>
    )
  }
}

export default Items;