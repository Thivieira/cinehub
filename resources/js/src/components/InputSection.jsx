import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteLoader from '../components/InfiniteLoader.jsx';
import { toggleSuggestions, searchMovies } from '../actions/moviesActions';
import store from '../store';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const mapDispatchToProps = dispatch => {
  return {
    toggleSuggestions: bool => {
      dispatch(toggleSuggestions(bool));
    },
    searchMovies: obj => {
      dispatch(searchMovies(obj));
    },
  };
};

function mapStateToProps(state, ownProps) {
  return {
    isSuggestionsOpen: state.movies.isSuggestionsOpen,
    suggestions: state.movies.suggestions,
  };
}

function useOutsideToggle(ref) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      store.dispatch(toggleSuggestions(false));
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

const SuggestionsList = props => {
  const wrapperRef = useRef(null);
  useOutsideToggle(wrapperRef);

  if (props.filtered.length === 0) {
    return (
      <ul className="suggestions-list" ref={wrapperRef}>
        <InfiniteLoader suggestionsBox={true} />
      </ul>
    );
  }
  return (
    <ul className="suggestions-list" ref={wrapperRef}>
      {props.filtered.map((item, key) => {
        if (key < 10) {
          return (
            <li key={key}>
              <Link to={`/movie/${item.id}`}>{item.title}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

const SuggestionsListConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestionsList);

class InputSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      value: '',
    };

    this.openSuggestions = this.openSuggestions.bind(this);
    this.closeSuggestions = this.closeSuggestions.bind(this);
  }

  componentDidMount() {
    this.setState({ filtered: this.props.suggestions });
  }

  componentWillUnmount() {
    this.debouncedEvent.cancel();
  }

  openSuggestions() {
    this.props.toggleSuggestions(true);
  }

  closeSuggestions() {
    this.props.toggleSuggestions(false);
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  handleChange(event) {
    const { suggestions } = this.props;
    const value = event.target.value;
    this.setState({ value });

    let currentList = [];
    let newList = [];

    if (value !== '') {
      this.props.searchMovies({ query: this.state.value, infinite: true });
      currentList = suggestions;

      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();

        const filter = value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      newList = suggestions;
    }

    this.setState({ filtered: newList });
  }

  render() {
    return (
      <div className="input-section">
        <div className="input-container">
          <div className="form-group">
            <input
              type="text"
              className="search-input form-control"
              placeholder="Start typing to search for a movie..."
              onClick={this.openSuggestions}
              onChange={this.debounceEvent(this.handleChange, 500)}
            />
            <span className="search-icon fa fa-search"></span>
          </div>
        </div>
        {this.props.isSuggestionsOpen && (
          <SuggestionsListConnected filtered={this.state.filtered} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSection);
