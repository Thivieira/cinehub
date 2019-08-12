import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchMovie, UNFETCH_MOVIE } from '../actions/moviesActions';
import Layout from '../Layout.jsx';
import Loader from '../components/Loader';

const GenresList = props => (
  <>
    <h3>Movie Genres</h3>
    <ul>
      {props.genres.map(genre => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  </>
);

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMovie({ id: this.props.match.params.id });
  }

  componentWillUnmount() {
    this.props.unFetchMovie();
  }

  render() {
    const movie = this.props.movie;
    if (!movie) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }
    return (
      <Layout>
        <Helmet
          bodyAttributes={{
            style: `background-image: url('${this.props.imagePath.images.secure_base_url +
              'original' +
              movie.backdrop_path}');`,
          }}
        >
          <title>{this.props.movie.title} - Cinehub</title>
        </Helmet>
        <Container>
          <Row>
            <Card className="movie-details-card">
              <a
                href={this.props.imagePath.images.secure_base_url + 'original' + movie.poster_path}
              >
                <CardImg
                  top
                  width="100%"
                  src={this.props.imagePath.images.secure_base_url + 'w780' + movie.poster_path}
                  alt={movie.title}
                />
              </a>
              <CardBody className="movie-card-body">
                <CardTitle>
                  <h1>{movie.title}</h1>
                </CardTitle>
                <CardSubtitle>
                  <span>Release Date: {moment(movie.release_date).format('DD/MM/YYYY')}</span>
                </CardSubtitle>
                <CardText>{movie.overview}</CardText>
                <GenresList genres={movie.genres} />
              </CardBody>
            </Card>
          </Row>
          <Row className="justify-content-center">
            <Link to="/" className="back-link text-center">
              Go back now and browse more movies!
            </Link>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.activeMovie,
    imagePath: state.movies.configuration,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: obj => {
      dispatch(fetchMovie(obj));
    },
    unFetchMovie: () => {
      dispatch({ type: UNFETCH_MOVIE });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie);
