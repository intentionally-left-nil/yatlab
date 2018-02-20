import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import './FirstPage.css'

class FirstPage extends Component {
  render() {
    const b64 = this.props.staticContext ? 'wait for it' : window.btoa('wait for it')
    return (
      <div className='bold'>
        <h2>First Page</h2>
        <p>{`b64: ${b64}`}</p>
        <Link to={'/second'}>Second</Link>
      </div>
    )
  }
}

export default FirstPage;
