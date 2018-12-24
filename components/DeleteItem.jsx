import React from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { ALL_ITEM_QUERY } from './Items';

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION (
    $id: ID!
  ) {
    deleteItem (
        id: $id
    ) {
        id,
        title
    }
  }
`

export default class DeleteItem extends React.Component {
    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for items
        const data = cache.readQuery({ query: ALL_ITEM_QUERY });
        // 2. Filter the deleted items out
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // 3. Put updated items back 
        cache.writeQuery({ query: ALL_ITEM_QUERY, data });
    }
    render() {
        const { id, children } = this.props;
        return <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
            {(deleteItem, { loading, error }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>{String(error)}</p>
                return <button onClick={() => {
                    if (window.confirm()) {
                        deleteItem()
                    }
                }}>{children}</button>
            }}
        </Mutation>
    }
}