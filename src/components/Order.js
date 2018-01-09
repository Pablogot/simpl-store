import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }
  renderOrder(key) {
    const product = this.props.products[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!product || product.status === 'unavailable') {
      return <li key={key}>Sorry, {product ? product.name : 'product'} is no longer available!{removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {product.name} {removeButton}</span>
        <span className="price">{formatPrice(count * product.price)}</span>

      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const product = this.props.products[key];
      const count = this.props.order[key];
      const isAvailable = product && product.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * product.price || 0)
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>

      </div>
    )
  }
}

Order.PropTypes = {
  products: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}
export default Order;
