import React from 'react';
import FundriserItem from '../../components/Fundriser-Card/fundriser-item.component'
import './browse-products.scss'
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'
import { connect } from 'react-redux'
import { setFundrisers, setSingleFundriser } from '../../redux/fundrisers/fundrisers.actions'
class BrowseFundrisers extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      showModal: false,
      title: '',
      walletAddress: '',
      limit: 4,
      skip: 0,
      showSpiner: false,
      query: '',
      allowNewCall: true,
      renderItems: false
    }
  }
  async componentDidMount() {
    await this.getFundrisers(this.state.query)
  }

  async getFundrisers() {

    let results = []
    if (this.props.admin)
      results = await axios.get('http://localhost:3004/products/admin', { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
    else
      results = await axios.get('http://localhost:3004/products/active', { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
    let data = results.data.results
    await this.props.setFundrisers(data)
    this.setState({
      allowNewCall: results.data.results.length < this.state.limit ? false : true,
      showSpiner: false,
      renderItems: true
    })
  }


  render() {

    return (
      <div id="browse">
        <div className='browse__wrap'>
        </div>
        <div className='browse__wrap'>
          {this.state.renderItems && <div className='browse'>
            {
              this.props.fundrisers.map(el => (
                <FundriserItem history={this.props.history} timeLeft={el.timeleft} item={el.data} key={el.data._id} openModal={this.openModal} ></FundriserItem>
              ))
            }
            {this.state.showSpiner && <Spiner color='#4CAF50' size='90' background='white'></Spiner>}
          </div>}

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userID: state.user.userID,
  fundrisers: state.fundriser.fundrisers,
  admin: state.user.admin,
  token: state.user.token,
});
const mapDispatchToProps = dispatch => ({
  setFundrisers: fundriser => dispatch(setFundrisers(fundriser)),
  setSingleFundriser: fundriser => dispatch(setSingleFundriser(fundriser))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseFundrisers);