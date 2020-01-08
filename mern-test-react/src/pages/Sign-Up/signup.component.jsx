import React from 'react'
import './signup.styles.scss';
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'
import withSign from '../withSign/withSign'
import Spiner from '../../components/Spinner/spiner.component'
import ErrorMessage from '../../components/Error-Message/error-message.component'
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: ''
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

            <div className='signup'>
                <div className='signup__box'>
                    <div className='signup__box__title'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className='signup__box__credentials'>
                        <input className='signup__box__credentials__input' placeholder='Email' type="text" value={this.state.email} onChange={this.setField.bind(null, 'email')} />
                        <input className='signup__box__credentials__input' placeholder='Password' type="password" value={this.state.password} onChange={this.setField.bind(null, 'password')} />
                    </div>
                    {this.props.showErrorMessage && <ErrorMessage message={this.props.message}></ErrorMessage>}
                    <div className='signup__box__button'>

                        <div className='signup__box__button__signup' onClick={() => this.props.submitHandler('',
                            { email: this.state.email, password: this.state.password, firstName: this.state.firstName })}>
                            {!this.props.showSpiner && <h3>Sign Up</h3>}
                            {this.props.showSpiner && <Spiner color='#4CAF50' size='30' background='white'></Spiner>}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(withSign(Signup))