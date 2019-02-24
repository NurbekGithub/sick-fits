import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import ErrorMessage from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

function totalItems(cart) {
  return cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {

  onToken = async (res, createOrder) => {
    Nprogress.start();
    // manually call mutation and pass in token we get from stripe
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    })
    Router.push(`/order?id=${order.data.createOrder.id}`)
  }
  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (!me) return null;
          if (loading) return <p>Loading...</p>
          return (
            <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
              {(createOrder) => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name='Sick Fits'
                  description={`Order of ${totalItems(me.cart)} items`}
                  image={me.cart[0].item && me.cart[0].item.image}
                  stripeKey='pk_test_TD2KRLhEurArwwoVLEG7NoPj'
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {this.props.children}
                </StripeCheckout>

              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
