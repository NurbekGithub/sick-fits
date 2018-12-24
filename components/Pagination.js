import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { dump } from '../lib/withData';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <p>Error</p>;
      if (loading) return <p>Loading...</p>
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head><title>Sick Fits! - Page {page} of {pages}</title></Head>
          <Link prefetch href={`/items?page=${page - 1}`}>
            <a className='prev' aria-disabled={page <= 1}>Prev</a>
          </Link>
          <p>Page {page} of {pages}</p>
          <p>{count} Items</p>
          <Link prefetch href={`/items?page=${page + 1}`}>
            <a className='next' aria-disabled={page >= pages}>Next</a>
          </Link>
        </PaginationStyles>
      )
    }}
  </Query>
)

export default Pagination;