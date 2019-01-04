import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEM_QUERY } from "./Items";
import { CURRENT_USER_QUERY } from "./User";

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

export default class AddToCart extends React.Component {
  // update = (cache, payload) => {
  //   // manually update the cache on the client, so it matches the server
  //   // 1. Read the cache for items
  //   const data = cache.readQuery({ query: ALL_ITEM_QUERY });
  //   // 2. Filter the deleted items out
  //   data.items = data.items.filter(
  //     item => item.id !== payload.data.addToCart.id
  //   );
  //   // 3. Put updated items back
  //   cache.writeQuery({ query: ALL_ITEM_QUERY, data });
  // };
  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        // update={this.update}
      >
        {(addToCart, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{String(error)}</p>;
          return <button onClick={addToCart}>{children}</button>;
        }}
      </Mutation>
    );
  }
}
