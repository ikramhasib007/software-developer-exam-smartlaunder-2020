import React from 'react';
import './navbar.style.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import { setCurrentUser, logoutUser } from '../../redux/user/user.actions'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isLogedin: props.isLogedin,
      token: props.token,
    };

  }

  async logOut() {
    let res = await axios.post('http://localhost:3004/users/logout', null,
      {
        headers: { 'Content-Type': 'application/json', 'token': this.props.token }
      })
    let { data } = res
    console.log(data);
    if (data.success)
      this.props.logoutUser()

  }

  render() {
    return (
      <div className='navbar__wrap'>
        <div className='navbar'>
          <div className="navbar__discover">
            <Link to={'/browse'} className='navbar__link'>
              <h1>Store</h1>
            </Link>
          </div>
          {this.props.admin && <div className="navbar__start">
            <Link to={'/createFundriser'} className='navbar__link'>
              <h1>Upload</h1>
            </Link>
          </div>
          }
          {!this.props.isLogedin &&
            <div className="navbar__register">
              <Link to={'/register'} className='navbar__link'>
                <h1>Register</h1>
              </Link>
            </div>
          }
          {!this.props.isLogedin &&
            <div className="navbar__login">
              <Link to={'/login'} className='navbar__link'>
                <h1>Log in</h1>
              </Link>
            </div>
          }

          {this.props.isLogedin &&
            <div className="navbar__login " onClick={this.logOut.bind(this, 2)}>
              <Link to={'/login'} className='navbar__link'>
                <h1>Log out</h1>
              </Link>

            </div>
          }


        </div>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLogedin: state.user.isLogedin,
  token: state.user.token,
  admin: state.user.admin
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  logoutUser: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

