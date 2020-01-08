import React from 'react';
import './App.css';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import BrowseFundrisers from './pages/Browse-Products/browse-products'
import Navbar from './components/Navbar/navbar.component'
import Signin from './pages/Sign-In/signin.component'
import Signup from './pages/Sign-Up/signup.component'
import CreateFundriser from './pages/Create-Products/create-product.component'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { setSingleFundriser, setFundrisers } from './redux/fundrisers/fundrisers.actions'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donationFrom: '',
      amount: '',
      showSnackBar: false,
    }
  }
  componentDidMount() {

    const socket = socketIOClient('http://localhost:3004');
    socket.on('newBid', async (obj) => {
      let results = []
      if (this.props.admin)
        results = await axios.get('http://localhost:3004/products/admin', { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      else
        results = await axios.get('http://localhost:3004/products/active', { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      let data = results.data.results
      await this.props.setFundrisers(data)
      console.log('new bid');
    })

  }

  render() {

    return (
      <div className="App">
        <div>
          <Navbar></Navbar>
        </div>
        <Switch>
          <Route exact path='/' component={BrowseFundrisers} />
        </Switch>
        <Switch>
          <Route exact path='/browse' component={BrowseFundrisers} />
        </Switch>
        <Switch>
          <Route exact path='/login' component={Signin} />
        </Switch>
        <Switch>
          <Route exact path='/register' component={Signup} />
        </Switch>
        <Switch>
          <Route exact path='/createfundriser' component={CreateFundriser} />
        </Switch>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  userID: state.user.userID,
  currentUser: state.user.currentUser,
  isLogedin: state.user.isLogedin,
  token: state.user.token,
  fundrisers: state.fundriser.fundrisers,
  admin: state.user.admin
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setFundrisers: fundriser => dispatch(setFundrisers(fundriser)),
  setSingleFundriser: fundriser => dispatch(setSingleFundriser(fundriser))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);