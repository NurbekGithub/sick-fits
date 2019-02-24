import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
Router.router = {
  push() {},
  prefetch() {}
}

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              __typename: 'count',
              count: length
            }
          }
        }
      }
    }
  ]
}

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1}/>
      </MockedProvider>
    );
    expect(wrapper.text()).toBe('Loading...');
  });

  it('renders pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}/>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    expect(wrapper.find('.totalPages').text()).toBe('5');
    const pagination = wrapper.find('div[data-test="pagination"]');
    expect(toJSON(pagination)).toMatchSnapshot();
  });
  it('disables prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}/>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const prevButton = wrapper.find('a.prev');
    const nextButton = wrapper.find('a.next');
    expect(prevButton.prop('aria-disabled')).toBe(true);
    expect(nextButton.prop('aria-disabled')).toBe(false);
  })
  it('disables next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5}/>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const prevButton = wrapper.find('a.prev');
    const nextButton = wrapper.find('a.next');
    expect(prevButton.prop('aria-disabled')).toBe(false);
    expect(nextButton.prop('aria-disabled')).toBe(true);
  })
  it('enables all buttons on middle pages', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={4}/>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const prevButton = wrapper.find('a.prev');
    const nextButton = wrapper.find('a.next');
    expect(prevButton.prop('aria-disabled')).toBe(false);
    expect(nextButton.prop('aria-disabled')).toBe(false);
  })
})