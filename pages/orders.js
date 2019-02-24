import Orders from '../components/Orders';
import {PleaseSignin} from '../components/PleaseSignin';

export default props => (
  <PleaseSignin>
    <Orders page={parseFloat(props.query.page) || 1} />
  </PleaseSignin>
);