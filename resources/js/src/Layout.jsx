import React from 'react';
import Header from './components/Header.jsx';
import { connect } from 'react-redux';
import Loader from './components/Loader.jsx';

class ScrollButton extends React.Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0,
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button
        title="Back to top"
        className="scroll"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <i className="arrow-up fa fa-arrow-up"></i>
      </button>
    );
  }
}

function Layout(props) {
  return (
    <div>
      <Header />
      <div className="site-container">
        {!props.loading ? <div className="container">{props.children}</div> : <Loader />}
      </div>
      <ScrollButton scrollStepInPx="50" delayInMs="7" />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.movies.loading,
  };
};

export default connect(mapStateToProps)(Layout);
