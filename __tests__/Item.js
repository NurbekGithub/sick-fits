import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is soo cool',
  image: 'dog.png',
  largeImage: 'largeDog.png'
};

describe('<Item />', () => {
  const wrapper = shallow(<ItemComponent item={fakeItem} />);
  it('renders and matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  // it('renders and displays properly', () => {
  //   const PriceTag = wrapper.find('PriceTag');
  //   expect(PriceTag.children().text()).toBe('$50');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  // });
  // it('renders img properly', () => {
  //   expect(wrapper.find('img').props()).toEqual({src: fakeItem.image, alt: fakeItem.title})
  // });

  // it('renders out the buttons properly', () => {
  //   const buttonList = wrapper.find('.buttonList');
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('AddToCart')).toHaveLength(1);
  //   expect(buttonList.find('DeleteItem').exists()).toBe(true);
  //   console.log(buttonList.debug())
  // })
});