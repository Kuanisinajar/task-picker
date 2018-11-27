import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signUp } from '../actions/authAction'
import { Redirect, Link } from 'react-router-dom';
import closeImg from '../close.svg';

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        name: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        if (this.props.auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <div id='signUpForm'>
                <form onSubmit={this.handleSubmit}>
                    {/* <div className='authTitle'>加入吧！</div> */}
                    <Link to='/' className='closeBtn'><img src={closeImg} alt="" id='closeImg' /></Link>
                    <div className="inputWrapper">
                        <input type="text" id="email" onChange={this.handleChange} value={this.state.email} placeholder="輸入信箱" />
                        <input type="text" id='password' onChange={this.handleChange} value={this.state.password} placeholder="輸入密碼" />
                        <input type="text" id="name" onChange={this.handleChange} value={this.state.name} placeholder="你的名字" />
                        <button>註冊</button>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => { dispatch(signUp(newUser)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);