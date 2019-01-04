import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import ErrorMessage from "./ErrorMessage";
import User from "./User";

class TakeMyMoney extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout>{this.props.children}</StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
