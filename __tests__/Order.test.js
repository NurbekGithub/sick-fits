import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import Order, { SINGLE_ORDER_QUERY } from '../components/Order';
import toJSON from 'enzyme-to-json';
import { fakeOrder } from '../lib/testUtils';

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: 'ord123' } },
    result: { data: { order: fakeOrder() } }
  }
]

describe('<Order />', () => {
  it('renders and matches snap', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id='ord123'/>
      </MockedProvider>
    )
    expect(toJSON(wrapper.find('[data-test="orderLoading"]'))).toMatchSnapshot();
  });
})