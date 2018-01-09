import React from 'react';
import AddProductForm from './AddProductForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }

  }
  
  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
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
  
  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData)  {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });

  }

  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage store inventory</p>
        <button className="github" onClick={() => this.authenticate('google')}>Log in with Google</button>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with GitHub</button>
      </nav>
    )
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

  render(){ 
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are no logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.products).map(this.renderInventory)}
        <AddProductForm addProduct={this.props.addProduct}/>
        <button onClick={this.props.loadSamples}>Load Sample Products</button>
      </div>
    )
  }
}

Inventory.PropTypes = {
  products: React.PropTypes.object.isRequired,
  updateProduct: React.PropTypes.func.isRequired,
  removeProduct: React.PropTypes.func.isRequired,
  addProduct: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;
