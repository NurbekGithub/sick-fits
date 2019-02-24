import { shallow, mount } from 'enzyme';
import CartCount from '../components/CartCount';
import toJson from 'enzyme-to-json';

describe('<CartCount />', () => {
  const wrapper = shallow(<CartCount count={10}/>)
  it('renders', () => {
    shallow(<CartCount count={10}/>);
  });
  
  it('matches the snap', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={50}/>)
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})