import Link from 'next/link';
import User from './User';
import StyledNav from './styles/NavStyles';
import { dump } from '../lib/withData';
export const Nav = props => (
    <StyledNav>
        <User>
            {({data: {me}}) => {
                if(me) return me.name
                return null
            }}
        </User>
        <Link href='/items'>
            <a>Shop</a>
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