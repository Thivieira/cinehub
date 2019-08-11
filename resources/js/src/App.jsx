import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './routes/Home.jsx';
import Movie from './routes/Movie.jsx';
import NotFound from './routes/NotFound.jsx';
import store from './store';
import { fetchConfiguration } from './actions/moviesActions';
import '../../vendor/font-awesome/css/font-awesome.min.css';
import '../../sass/app.scss';

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" component={Movie} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
