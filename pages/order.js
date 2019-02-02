import { PleaseSignin } from '../components/PleaseSignin';
import Order from '../components/Order';

export default ({query: {id}}) => {
  return (<PleaseSignin>
    <Order id={id}/>
  </PleaseSignin>);
}