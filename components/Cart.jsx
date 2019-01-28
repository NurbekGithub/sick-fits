import React from "react";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import SickButton from "./styles/SickButton";
import CloseButton from "./styles/CloseButton";
import Supreme from "./styles/Supreme";
import CartStyles from "./styles/CartStyles";
import User from "./User";
import CartItem from "./CartItem";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import TakeMyMoney from './TakeMyMoney';

export const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;
export const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggle: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = () => {
  return (
    <Composed>
      {({ user, toggle, localState }) => {
        const me = user.data.me;
        if (!me) return null;
        const data = localState.data;
        const cart = me.cart.filter(cartItem => cartItem.item);
        return (
          <CartStyles open={data.cartOpen}>
            <header>
              <CloseButton onClick={toggle} title="close">
                &times;
              </CloseButton>
              <Supreme>{me.name}'s Cart</Supreme>
              <p>You have {cart.length} items in your cart</p>
            </header>
            <ul>
              {cart.map(item => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(cart))}</p>
              {me.cart.length !== 0 &&
                <TakeMyMoney>
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>}
            </footer>
          </CartStyles>
        );
      }}
    </Composed>
  );
};

export default Cart;
