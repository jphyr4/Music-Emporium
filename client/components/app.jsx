import React from 'react';
import ProductList from './product-list';
import Header from './header';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';
// import CartSummary from './cartSummary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },

      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCart();
  }

  setView(name, params) {
    const viewState = {
      name: name,
      params: params
    };
    this.setState({ view: viewState });
  }

  getCart() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error('Fetch failed!', err));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => this.setState({ cart: this.state.cart.concat(data) }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {

    if (this.state.view.name === 'catalog') {
      return (
        <div>

          {/* <CartSummary cartItemProp={this.state.cart}/> */}
          <Header cartItemCount={this.state.cart.length} clickCart={this.setView}/>,
          <ProductList setView={this.setView}/>
        </div>

      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} clickCart={this.setView}/>,
          <ProductDetails setView={this.setView} stateProp={this.state.view.params} addToCart={this.addToCart}/>
        </div>
      );

    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} clickCart={this.setView}/>,
          <CartSummary cartItemProp={this.state.cart} backToCat={this.setView}/>

        </div>
      );
    }
  }
}
