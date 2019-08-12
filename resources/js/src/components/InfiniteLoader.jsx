import React from 'react';

export default function InfiniteLoader(props) {
  return (
    <div className="spinner" style={props.suggestionsBox &&{ marginTop: '50px', marginBottom: '50px' }}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}
