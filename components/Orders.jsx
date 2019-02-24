import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import OrderItemStyles from './styles/OrderItemStyles';
import { dump } from '../lib/withData';
import { formatDistance } from 'date-fns';
import formatMoney from '../lib/formatMoney';


export const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        price
        title
        description
        quantity
        image
      }
    }
  }
`

const OrdersList = styled.ul`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(40%, 1fr)); */
  grid-gap: 4rem;
`

class Orders extends React.Component {

  render() {
    return (
      <Query query={USER_ORDER_QUERY}>
        {({ loading, error, data: {orders} }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <ErrorMessage error={error} />
          return (
            <div>
              <h2>You have {orders.length} orders</h2>
              <OrdersList>
                {orders.map(
                  order => (
                    <OrderItemStyles key={order.id}>
                      <Link href={`/order?id=${order.id}`}>
                        <a>
                          <div className="order-meta">
                            <p>{order.items.reduce((acc, item) => acc + item.quantity, 0)} Items</p>
                            <p>{order.items.length} Products</p>
                            <p>{formatDistance(order.createdAt, new Date())}</p>
                            <p>{formatMoney(order.total)}</p>
                          </div>
                          <div className="images">
                            {order.items.map(item => (
                              <img id={item.id} src={item.image} alt={item.title} />
                            ))}
                          </div>
                        </a>
                      </Link>
                    </OrderItemStyles>
                  ))}
              </OrdersList>

            </div>
          )
        }}
      </Query>
    );
  }
}

export default Orders;