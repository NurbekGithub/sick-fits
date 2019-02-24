import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import {fakeUser} from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { Nav } from '../components/Nav';
import toJSON from 'enzyme-to-json';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
]

describe('<Nav />', () => {
  it('Should render logged out nav', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await waait();
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();
  });
  it('Should render logged in nav', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await waait();
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(6);
  })
});