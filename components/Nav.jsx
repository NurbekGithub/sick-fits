import Link from 'next/link';
import StyledNav from './styles/NavStyles';
export const Nav = props => (
    <StyledNav>
        <Link href='/items'>
            <a>Items</a>
        </Link>
        <Link href='/sell'>
            <a>Sell</a>
        </Link>
        <Link href='/signup'>
            <a>Signup</a>
        </Link>
        <Link href='/orders'>
            <a>Orders</a>
        </Link>
        <Link href='/me'>
            <a>Accound</a>
        </Link>
    </StyledNav>
)