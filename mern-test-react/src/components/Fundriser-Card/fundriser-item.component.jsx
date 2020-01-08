import React from 'react';
import { Link } from 'react-router-dom';
import './fundriser-item.styles.scss'
import axios from 'axios';
import { connect } from 'react-redux'
import Spinner from '../Spinner/spiner.component'
// import { getBallance } from '../../helpers/web3'
class FundriserItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         deleted: false,
         showFeaturedSpinner: false,
         showDeleteSpinner: false,
         showRemoveFeatured: false,
         featured: false,
         raisedMoney: 0,
         widthStyle: {
            width: '0%'
         },
         time: '',
         nextBid: '',
         minLeft: 0,
         secLeft: 0
      }
      this.setField = this.setField.bind(this)
   }
   adminActivate = async (condition) => {
      this.setState({
         showFeaturedSpinner: true
      })
      let dt = new Date()
      dt.setMinutes(dt.getMinutes() + this.state.time);
      let data = {
         active: true,
         bidingPrice: this.state.nextBid,
         finishTime: this.state.time
      }
      let res = await axios.put('http://localhost:3004/products/' + this.props.item._id, data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      console.log(res);
      this.setState({
         showFeaturedSpinner: false,
         showRemoveFeatured: condition,
         featured: condition,
      })
   }
   setField(field, e) {
      this.setState({
         [field]: e.target.value
      })
   }
   clickedBid = async () => {
      let data = {
         email: 'asd@as'
      }
      console.log(this.props.token);
      let res = await axios.put('http://localhost:3004/products/bid/' + this.props.item._id, data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      console.log(res);
   }
   async componentDidMount() {
      console.log(this.props.item);
      this.setState({
         minLeft: Math.floor(this.props.timeLeft),
         secLeft: Math.round((this.props.timeLeft - Math.floor(this.props.timeLeft)) * 60)
      })
      if (this.props.timeLeft >= 0) {
         this.interval = setInterval(() => {
            this.state.secLeft--
            this.setState({
               secLeft: this.state.secLeft--
            })
            if (this.state.secLeft < 1) {
               this.state.minLeft--
               this.setState({
                  minLeft: this.state.minLeft--,
                  secLeft: 59
               })
            }
         }, 1000)
      }
   }

   render() {
      return (
         <div className='item' >
            <div className='item__image_div'>
               <img src={this.props.item.image == undefined ? "https://via.placeholder.com/350x200" : "http://localhost:3004" + this.props.item.image} alt="" />
            </div>
            <div className='item__location'>
            </div>
            <div className='item__title'>
               <h3 className='item__title__text'>{this.props.item.title} </h3>
            </div>
            <div className='item__content'>
               {this.props.item.description !== undefined && <p className='item__content__text'>{this.props.item.description.slice(0, 105) + '...'}</p>}
            </div>
            <div className='item__content'>
               <p className='item__content__text'>Starting price {this.props.item.startingPrice}</p>
            </div>
            <div className='item__content'>
               <p className='item__content__text'> price {this.props.item.price}</p>
            </div>
            <div className='item__content'>
               <p className='item__content__text'> next bid {this.props.item.price + this.props.item.bidingPrice}</p>
            </div>
            <div className='item__raised'>
               {this.props.timeLeft != null && this.props.timeLeft >= 0 && <p className='item__raised__text'>Time Left: {this.state.minLeft} min {this.state.secLeft} sec </p>}
            </div>
            {this.props.admin && <input className='signin__box__credentials__input' type="text" value={this.state.time} placeholder='time in minutes' onChange={this.setField.bind(null, 'time')} />}
            {this.props.admin && <input className='signin__box__credentials__input' type="text" placeholder='Bid Value' value={this.state.nextBid} onChange={this.setField.bind(null, 'nextBid')} />}


            {!this.props.admin && (this.props.timeLeft != null && this.props.timeLeft >= 0) && <div className='item__buttons'>
               {this.props.history.location.pathname != '/user-fundrisers' && <div className='item__buttons__donate' onClick={this.clickedBid}  >
                  <h3>Bid</h3>
               </div>}
            </div>}

            {!this.props.admin && this.props.timeLeft <= 0 && <div className='item__buttons'>
               {this.props.history.location.pathname != '/user-fundrisers' && <div className='item__buttons__donate'>
                  <h3>Sold Out</h3>
               </div>}
            </div>}
            {this.props.admin && <div className='item__buttons'>
               {
                  <div className='item__buttons__view' onClick={() => { this.adminActivate(!this.state.featured) }}  >
                     {!this.state.showFeaturedSpinner && <h3>Activate</h3>}
                     {this.state.showFeaturedSpinner && <Spinner color='#4CAF50' size='30' background='white'></Spinner>}
                  </div>

               }

            </div>}
         </div>
      )
   }
}
const mapStateToProps = state => ({
   currentUser: state.user.currentUser,
   isLogedin: state.user.isLogedin,
   token: state.user.token,
   admin: state.user.admin,
   fundrisers: state.fundriser.fundrisers
});
export default connect(mapStateToProps, null)(FundriserItem);

