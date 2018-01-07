import React from 'react';
import AddProductForm from './AddProductForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const product = this.props.products[key];
    // take a copy of that product and update it with the new data
    const updatedProduct = {
      ...product,
      [e.target.name]: e.target.value
    }
    this.props.updateProduct(key, updatedProduct);
  }

  renderInventory(key) {
    const product = this.props.products[key];
    return (
      <div className="product-edit" key={key}>
        <input type="text" name="name" value={product.name} placeholder="Product Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={product.price} placeholder="Product Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={product.status} placeholder="Product Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">In Stock!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={product.desc} placeholder="Product Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={product.image} placeholder="Product Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeProduct(key)}>Remove Product</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.products).map(this.renderInventory)}
        <AddProductForm addProduct={this.props.addProduct}/>
        <button onClick={this.props.loadSamples}>Load Sample Products</button>
      </div>
    )
  }
}

export default Inventory;
