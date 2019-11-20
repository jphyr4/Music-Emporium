import React from 'react';
import ProductList from './product-list';
import Header from './header';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    const viewState = {
      name: name,
      params: params
    };
    this.setState({ view: viewState });

  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header/>,
          {/* <ProductDetails/> */}
          <ProductList setView={this.setView}/>
        </div>

      );
    } else {
      return <ProductDetails/>;

    }
  }
}
