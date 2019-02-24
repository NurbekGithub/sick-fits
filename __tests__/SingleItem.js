import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {fakeItem} from '../lib/testUtils';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';

describe('<SingleItem />', () => {
  const mocks = [
    {
      // when someone makes the request
      request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
      // they get this response
      result: {
        data: {
          item: fakeItem()
        }
      }
    }
  ]
  it('should render and show loading', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id='123'/>
      </MockedProvider>
    );
    expect(wrapper.text()).toBe('Loading...');
  });
  
  it('should match snap', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id='123'/>
      </MockedProvider>
    );
    await waait();
    wrapper.update(); 
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();  
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();  
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();  
  });

  it('should error with no item found', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: { errors: [{message: 'Items Not Found'}] }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id='123'/>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    const item = wrapper.find('[data-test="graphql-error"]');
    expect(item.text()).toContain('Items Not Found');
    expect(toJSON(item)).toMatchSnapshot();
  })
})