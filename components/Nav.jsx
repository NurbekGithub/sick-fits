import Link from "next/link";
import User from "./User";
import StyledNav from "./styles/NavStyles";
import { Signout } from "./Signout";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

export const Nav = props => (
  <User>
    {({ data: { me } }) => {
      return (
        <StyledNav>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me ? (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Accound</a>
              </Link>
              <Signout />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggle => (
                  <button onClick={toggle}>
                    My Cart
                    <CartCount
                      count={me.cart
                        .filter(cartItem => cartItem.item)
                        .reduce(
                          (tally, cartItem) => tally + cartItem.quantity,
                          0
                        )}
                    />
                  </button>
                )}
              </Mutation>
            </>
          ) : (
            <>
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            </>
          )}
        </StyledNav>
      );
    }}
  </User>
);
