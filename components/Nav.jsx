import Link from "next/link";
import User from "./User";
import StyledNav from "./styles/NavStyles";
import { Signout } from "./Signout";

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
