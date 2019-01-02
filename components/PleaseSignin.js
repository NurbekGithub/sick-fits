import React from "react";
import User from "./User";
import Signin from "./Signin";
import PropTypes from "prop-types";

export const PleaseSignin = props => (
  <User>
    {({ data: { me }, loading }) => {
      if (loading) return <p>Loading...</p>;
      return me 
        ? props.children 
        : <div>
            <p>Plaese Sign In before Continuing</p>
            <Signin />
        </div>
    }}
  </User>
);

PleaseSignin.propTypes = {
  children: PropTypes.node.isRequired
};
