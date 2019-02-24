import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney';
import toJSON from 'enzyme-to-json';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { ApolloConsumer } from 'react-apollo';
import Nprogress from 'nprogress';
import Router from 'next/router'

Router.router = { push() {} };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {...fakeUser(), cart: [fakeCartItem()]}
      }
    }
  }
];

describe('<TakeMyMoney />', () => {
  it('renders and matches snap', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const button = wrapper.find('ReactStripeCheckout');
    expect(toJSON(button)).toMatchSnapshot();
  });

  it('creates an order ontoken', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz123' } }
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    const component = wrapper.find('TakeMyMoney').instance();
    // manually call ontoken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({"variables": {"token": "abc123"}});
    await waait();
    wrapper.update();
  });

  it('turn the progress bar on', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz123' } }
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    Nprogress.start = jest.fn();
    const component = wrapper.find('TakeMyMoney').instance();
    // manually call ontoken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(Nprogress.start).toHaveBeenCalled();
  });

  it('Routes to ', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz123' } }
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const component = wrapper.find('TakeMyMoney').instance();
    Router.router = {push: jest.fn()}
    // manually call ontoken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    await waait();
    expect(Router.router.push).toHaveBeenCalledWith("/order?id=xyz123");
  });

})