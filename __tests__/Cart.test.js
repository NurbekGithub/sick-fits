import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import Cart, { LOCAL_STATE_QUERY } from '../components/Cart';
import toJSON from 'enzyme-to-json';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { ApolloConsumer } from 'react-apollo';

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: {
      data: {
        cartOpen: true
      }
    }
  },
];

describe('<Cart />', () => {
  it('renders and matches snap', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Cart />
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    expect(toJSON(wrapper.find('header'))).toMatchSnapshot();
    expect(wrapper.find('CartItem').length).toBe(1);
  })
})