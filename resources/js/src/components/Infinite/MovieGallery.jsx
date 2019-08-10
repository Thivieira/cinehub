import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPopularMovies } from '../../actions/moviesActions';
import MovieItem from './MovieItem.jsx';

class MovieGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.fetchNext = this.fetchNext.bind(this);
  }

  fetchNext() {
    this.props.fetchPopularMovies({ page: this.state.page + 1 });
  }

  render() {
    const items = this.props.movies;
    console.log('items', items);
    if (!items) {
      return null;
    }

    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.fetchNext}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {this.props.movies.map(movie => (
          <MovieItem
            key={movie.id}
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
    this.props.fetchPopularMovies();
  }
}

const mapStateToProps = state => {
  console.log(state);
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
