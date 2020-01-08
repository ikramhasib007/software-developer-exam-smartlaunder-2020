import React from 'react'
import './signin.styles.scss';
import axios from 'axios';
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'
import withSign from '../withSign/withSign'
import ErrorMessage from '../../components/Error-Message/error-message.component'
import Spiner from '../../components/Spinner/spiner.component'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: props.currentUser,
            isLogedin: props.isLogedin,
            token: props.token,
            wrondCredentials: false
        };
        this.setField = this.setField.bind(this)
        // this.submitHandler = this.submitHandler.bind(this)
    }

    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }

    render() {
        return (
            <div className='signin'>
                <div className='signin__box'>
                    <div className='signin__box__title'>
                        <h1>Sign In</h1>
                    </div>
                    <div className='signin__box__credentials'>
                        <input className='signin__box__credentials__input' type="text" value={this.state.email} placeholder='Email' onChange={this.setField.bind(null, 'email')} />
                        <input className='signin__box__credentials__input' type="password" placeholder='Password' value={this.state.password} onChange={this.setField.bind(null, 'password')} />
                    </div>
                    {this.state.wrondCredentials && <p className='signin__box__wrong_credentials'>wrong credentials</p>}
                    {this.props.showErrorMessage && <ErrorMessage message={this.props.message}></ErrorMessage>}
                    <div className='signin__box__button'>

                        <div className='signin__box__button__signin' onClick={() => this.props.submitHandler('login', { email: this.state.email, password: this.state.password })}>
                            {!this.props.showSpiner && <h3>Sign In and start bidding</h3>}
                            {this.props.showSpiner && <Spiner color='#4CAF50' size='30' background='white'></Spiner>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    isLogedin: state.user.isLogedin,
    token: state.user.token

});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withSign(Signin))