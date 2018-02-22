import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';
import './FirstPage.css';

class FirstPage extends PureComponent {
  render() {
    return (
      <div className="bold">
        <h2>First Page</h2>
        <Link to="/second">Second</Link>
      </div>
    );
  }
}

export default FirstPage;
