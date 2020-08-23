import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
      this.state = {
        user: props.userData,
        isLoggedIn: props.userIsLoggedIn
      };
      this.logOut = this.logOut.bind(this);
  }
  // 1.2
  logOut() {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }
  // 1.3
  render() {
    const aStyle = {
      cursor: 'pointer'
    };
    
    return (

      
      // <nav className="navbar">
        //     <ul>
        //         <li><Link to="/">Home</Link></li>
        //         <li><Link to="/post">post</Link> | <Link to="/category">category</Link></li>
        //     </ul>
        // </nav>
        
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a className="navbar-brand" href="/">CRUD</a> */}
  <Link className="navbar-brand" to="/">CRUD</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
        <Link className="nav-link" to="/post">post<span className="sr-only">(current)</span></Link>
        
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/category">category<span className="sr-only">(current)</span></Link>
      </li>
      
    </ul>
  </div>
</nav>
    )
  }
}
export default withRouter(Header)