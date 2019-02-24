import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import Signup, { SIGNUP_USER_MUTATION } from '../components/Signup';
import toJSON from 'enzyme-to-json';
import { fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import { ApolloConsumer } from 'react-apollo';

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value }
  });
}

const me = fakeUser();
const mocks = [
  // signup mock mutation
  {
    request: {
      query: SIGNUP_USER_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: '123'
      }
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name
        }
      }
    }
  },
  // current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
]


describe('<Signup />', () => {
  it('renders and matches snap', () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    const form = wrapper.find('form')
    expect(toJSON(form)).toMatchSnapshot();
  });
  
  it('calls mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await waait();
    wrapper.update();
    type(wrapper, 'name', me.name);
    type(wrapper, 'email', me.email);
    type(wrapper, 'password', '123');
    wrapper.update();
    wrapper.find('form').simulate('submit');
    await waait();
    // query the user out of the apollo client
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  })
})