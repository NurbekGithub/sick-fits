import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {fakeUser} from '../lib/testUtils';
import { PleaseSignin } from '../components/PleaseSignin';
import { CURRENT_USER_QUERY } from '../components/User';

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

describe('<PleaseSignin />', () => {
  it('renders properly and shows loading', () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignin>
          <div>Hey</div>
        </PleaseSignin>
      </MockedProvider>
    );
    expect(wrapper.text()).toBe('Loading...');
  });
  
  it('renders signin component to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignin>
          <div>Hey</div>
        </PleaseSignin>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    expect(wrapper.text()).toContain('Please Sign In before Continuing');
    expect(wrapper.find('Signin').exists()).toBe(true);
  });

  it('renders signin component with children', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignin>
          <div>Hey</div>
        </PleaseSignin>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    expect(wrapper.text()).toContain('Hey');
  })
})

