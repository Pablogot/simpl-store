import React from 'react';

class AddProductForm extends React.Component {
  createProduct(event) {
    event.preventDefault();
    console.log('GOnna make some product! 🎣');
    const product = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    }
    this.props.addProduct(product);
    this.productForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.productForm = input} className="product-edit" onSubmit={(e) => this.createProduct(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Product Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Product Price" />
        <select ref={(input) => this.status = input}>
          <option value="available">In Stock!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder="Product Desc" ></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Product Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddProductForm;
