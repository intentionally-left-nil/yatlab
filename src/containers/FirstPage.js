import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './FirstPage.css';

class FirstPage extends PureComponent {
  render() {
    const b64 = this.props.staticContext ? 'wait for it' : btoa('wait for it');
    return (
      <div className="bold">
        <h2>First Page</h2>
        <p>{`b64: ${b64}`}</p>
        <Link to="/second">Second</Link>
      </div>
    );
  }
}

FirstPage.propTypes = {
  staticContext: PropTypes.bool.isRequired,
};

export default FirstPage;
