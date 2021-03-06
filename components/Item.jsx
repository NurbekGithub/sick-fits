import Link from "next/link";
import React from "react";
import formatMoney from "../lib/formatMoney";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";
import PropTypes, { any } from "prop-types";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: any,
      description: PropTypes.string.isRequired
    })
  };

  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={`/item?id=${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={`/update?id=${item.id}`}>
            <a>Edit</a>
          </Link>
          <AddToCart id={item.id}>Add To Cart 🛒</AddToCart>
          <DeleteItem id={item.id}>Delete item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
