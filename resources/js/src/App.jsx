import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './routes/Home.jsx';
import store from './store';
import { fetchConfiguration } from './actions/moviesActions';
import '../../vendor/font-awesome/css/font-awesome.min.css';
import '../../sass/argon-design-system-react.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(fetchConfiguration());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
        </BrowserRouter>
      </Provider>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
