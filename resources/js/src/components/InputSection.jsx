import React from 'react';
import { connect } from 'react-redux';
import { toggleSuggestions, fetchTrendingMovies } from '../actions/moviesActions';

class InputSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.openSuggestions = this.openSuggestions.bind(this);
    this.closeSuggestions = this.closeSuggestions.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.suggestions,
    });
  }

  openSuggestions() {
    this.props.toggleSuggestions(true);
  }

  closeSuggestions() {
    this.props.toggleSuggestions(false);
  }

  handleChange(e) {
    this.openSuggestions();
    this.props.fetchTrending();

    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== '') {
      // Assign the original list to currentList
      currentList = this.state.filtered;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.capitais;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }

  searchMovies(param) {
    this.setState(prevState => ({ ...prevState, value: param }));
    this.props.fetchMovies(param);
  }

  render() {
    return (
      <React.Fragment>
        <div className="input-section">
          <div className="form-group">
            <input
              type="text"
              className="search-input form-control"
              placeholder="Start typing to search a movie..."
              value={this.state.value}
              onClick={this.openSuggestions}
              onChange={this.handleChange}
            />
            <span className="form-control-feedback fa fa-search"></span>
          </div>
        </div>
        {this.props.isSuggestionsOpen && (
          <ul ref={node => (this.node = node)}>
            {this.state.filtered.map((item, key) => (
              <li key={key} onClick={this.searchMovies(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSuggestions: bool => {
      dispatch(toggleSuggestions(bool));
    },
    fetchTrending() {
      dispatch(fetchTrendingMovies());
    },
    fetchMovies: location => {
      // dispatch(fetchCity(location));
    },
  };
};

function mapStateToProps(state, ownProps) {
  return {
    isSuggestionsOpen: state.movies.isSuggestionsOpen,
    suggestions: state.movies.suggestions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSection);
