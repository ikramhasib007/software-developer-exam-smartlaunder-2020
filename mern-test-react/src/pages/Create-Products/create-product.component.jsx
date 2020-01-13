import React from 'react'
import './create-product.styles.scss';
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'
import ErrorMessage from '../../components/Error-Message/error-message.component'
import { connect } from 'react-redux'

class startfundriser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            goalMoney: '',
            thumbnail: '',
            showSpiner: false,
            showErrorMessage: false,
            errorMessage: '',
            useCredentials: false,
            startingPrice: ''
        };
        this.setField = this.setField.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    
    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }
    onChangeHandler = event => {

        this.setState({
            thumbnail: event.target.files[0]
        })
    }
    clickedCategoy = () => {
        this.setState({
            showCategoryDropDown: !this.state.showCategoryDropDown,
        })
    }
    selectedCategory = (item) => {
        this.setState({
            showCategoryDropDown: !this.state.showCategoryDropDown,
            categoryText: item
        })
    }
    clickedUseCredentials = () => {
        this.setState({
           useCredentials: !this.state.useCredentials,
           organaiser: !this.state.useCredentials ? this.props.currentUser : ''
        })
     }
    submitHandler = async () => {

        const data = new FormData()
        data.append('upload', this.state.thumbnail)
        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('startingPrice', this.state.startingPrice)
       
        this.setState({
            showSpiner: true
        })
        axios.post('http://localhost:3004/products', data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
            .then(res => {
                console.log(res);
                this.setState({
                    token: res.data.token,
                    showSpiner: false
                })
                // this.props.history.push('/fundrisers/'+res.data.fundriser._id)
            })
    }

    render() {
       
        return (

            <div className='startfundriser'>
                <div className='startfundriser__box'>
                    <div className='startfundriser__box__title'>
                        <h1>Start Fundrise</h1>
                    </div>
                    <div className='startfundriser__box__credentials'>
                        <form>
                            <input className='startfundriser__box__credentials__input' placeholder='Title' type="text" value={this.state.city} onChange={this.setField.bind(null, 'title')} />
                            <input className='startfundriser__box__credentials__input' placeholder='Starting Price' type="text" value={this.state.startingPrice} onChange={this.setField.bind(null, 'startingPrice')} />

                            <textarea rows="4" cols="50" placeholder='Description' type="text" value={this.state.description} onChange={this.setField.bind(null, 'description')} />
                            {/* <input className='startfundriser__box__credentials__upload' type="file" onChange={this.onChangeHandler} /> */}
                            <div className="box">
                                <input type="file" name="file-1[]" id="file-1" className="inputfile inputfile-1" onChange={this.onChangeHandler} data-multiple-caption="{count} files selected" multiple />
                                <label className='margin' htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span>Choose a file&hellip;</span></label>
                            </div>

                        </form>
                    </div>

                    {this.state.showErrorMessage && <ErrorMessage message={this.state.errorMessage}></ErrorMessage>}

                    <div className='startfundriser__box__button'>

                        <div className='startfundriser__box__button__startfundriser' onClick={this.submitHandler}>
                            {!this.state.showSpiner && <h3>Start Fundriser</h3>}
                            {this.state.showSpiner && <Spiner color='#4CAF50' size='30' background='white'></Spiner>}
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
export default connect(mapStateToProps, null)(startfundriser)