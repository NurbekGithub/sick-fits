import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import toJSON from 'enzyme-to-json';
import Router from 'next/router'
import { fakeItem } from '../lib/testUtils';

const dogImage = 'https://dog.com/dog.png'
// mock the global fetch API
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
})

describe('<CreateItem />', () => {
  it('renders and matches snap', () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const createItemForm = wrapper.find('form[data-test="createItem"]');
    expect(toJSON(createItemForm)).toMatchSnapshot();
  });
  it('uploads file when changed', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const input = wrapper.find('input[type="file"]');
    input.simulate('change', { target: { files: ['fakefile.png'] } });
    await waait();
    const component = wrapper.find('CreateItem').instance();
    expect(component.state.image).toBe(dogImage);
    expect(component.state.largeImage).toBe(dogImage);
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockReset();
  });
  it('handles state changing', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const title = wrapper.find('input[name="title"]');
    const price = wrapper.find('input[name="price"]');
    const description = wrapper.find('textarea[name="description"]');
    title.simulate('change', {
      target: {
        name: 'title',
        value: 'doggy'
      }
    });
    price.simulate('change', {
      target: {
        name: 'price',
        value: 1212
      }
    });
    description.simulate('change', {
      target: {
        name: 'description',
        value: 'long long story'
      }
    });
    await waait();
    const component = wrapper.find('CreateItem').instance();
    expect(component.state.title).toBe('doggy');
    expect(component.state.description).toBe('long long story');
    expect(component.state.price).toBe(1212);
  });
  it('creates an item when the form is submitted', async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            price: item.price,
            image: '',
            largeImage: ''
          }
        },
        result: { data: { createItem: { ...item, id: 'abc', __typename: 'Item' } } }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    )
    // simulate filling the form;
    const title = wrapper.find('input[name="title"]');
    const price = wrapper.find('input[name="price"]');
    const description = wrapper.find('textarea[name="description"]');
    title.simulate('change', {
      target: {
        name: 'title',
        value: item.title
      }
    });
    price.simulate('change', {
      target: {
        name: 'price',
        value: item.price
      }
    });
    description.simulate('change', {
      target: {
        name: 'description',
        value: item.description
      }
    });
    // mock the router
    Router.router = { push: jest.fn() };
    wrapper.find('form').simulate('submit');
    await waait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith("/item?id=abc");
  })
});