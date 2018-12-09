import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import Item from './Item';
import styled from 'styled-components';

const ALL_ITEM_QUERY = gql`
  query ALL_ITEM_QUERY {
    items {
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
        <Query query={ALL_ITEM_QUERY}>
          {({ loading, error, data }) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>{error}</p>
            return <ItemsList>
              {data.items
                .map(item => <Item key={item.id} item={item}/>)}
            </ItemsList>
          }}
        </Query>
      </Center>
    )
  }
}

export default Items;