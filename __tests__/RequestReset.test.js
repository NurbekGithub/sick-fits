import { MockedProvider } from 'react-apollo/test-utils';
import waait from 'waait';
import { mount } from 'enzyme';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';
import toJSON from 'enzyme-to-json';

const mockRequestReset = [
  {
    request: { query: REQUEST_RESET_MUTATION, variables: { email: 'nurbek-2395@mail.ru' } },
    result: {
      data: {
        requestReset: { message: 'success', __typename: 'Message' }
      }
    }
  }
];

describe('<RequestReset />', () => {
  it('renders properly', () => {
    const wrapper = mount(
      <MockedProvider mocks={mockRequestReset}>
        <RequestReset />
      </MockedProvider>
    );
    const resetForm = wrapper.find('form[data-test="reset"]');
    expect(toJSON(resetForm)).toMatchSnapshot();
  });
  
  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mockRequestReset}>
        <RequestReset />
      </MockedProvider>
    );
    // simulate typing an email
    const input = wrapper.find('input');
    input.simulate('change', {
      target:{
        name: 'email',
        value: 'nurbek-2395@mail.ru'
      }
    })
    // simulate submitting
    const resetForm = wrapper.find('form[data-test="reset"]');
    resetForm.simulate('submit');
    await waait();
    wrapper.update();
    expect(wrapper.find('p').text()).toBe("Your reset token has been sent to your email");
  });
})