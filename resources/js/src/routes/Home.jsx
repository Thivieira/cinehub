import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout.jsx';
import MovieGallery from '../components/Infinite/MovieGallery.jsx';
import InputSection from '../components/InputSection.jsx';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { fetchTrendingMovies } from '../actions/moviesActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.suggestions.length === 0) {
      this.props.fetchTrending();
    }
  }
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Cinehub</title>
        </Helmet>
        <Row className="justify-content-center">
          <InputSection suggestions={this.props.suggestions} />
        </Row>
        <Row>
          <MovieGallery />
        </Row>
      </Layout>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    suggestions: state.movies.suggestions,
  }),
  dispatch => ({
    fetchTrending() {
      dispatch(fetchTrendingMovies());
    },
  }),
)(Home);
