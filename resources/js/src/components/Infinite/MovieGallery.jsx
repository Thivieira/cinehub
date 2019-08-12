import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPopularMovies } from '../../actions/moviesActions';
import MovieItem from './MovieItem.jsx';
import InfiniteLoader from '../InfiniteLoader.jsx';

class MovieGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.fetchNext = this.fetchNext.bind(this);
  }

  fetchNext() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.props.fetchPopularMovies({ page: this.state.page, infinite: true });
  }

  render() {
    const items = this.props.movies;

    if (!items) {
      return null;
    }

    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.fetchNext}
        hasMore={true}
        loader={<InfiniteLoader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {this.props.movies.map(movie => (
          <MovieItem
            key={movie.id}
            id={movie.id}
            item={movie}
            url={this.props.imagePath.images.secure_base_url + 'w342' + movie.poster_path}
            altText={movie.title}
            title={movie.title}
            subtitle={movie.release_date}
            text={movie.overview}
          />
        ))}
      </InfiniteScroll>
    );
  }

  componentDidMount() {
    if (this.props.movies.length === 0) {
      this.props.fetchPopularMovies();
    }
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    imagePath: state.movies.configuration,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPopularMovies: obj => {
      dispatch(fetchPopularMovies(obj));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieGallery);
