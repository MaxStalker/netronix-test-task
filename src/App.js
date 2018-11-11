import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Dashboard } from './containers';
import './index.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

export default App;
