import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/authAction';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import closeImg from '../close.svg';

class SignIn extends Component {

    state = {
        email: "",
        password: ""
    }

    redirectToHome = () => {
        return <Redirect to='/' />
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        console.log(this.props);
        if (this.props.auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <div id="signInForm">
                <form onSubmit={this.handleSubmit}>
                    <Link to='/' className='closeBtn'><img src={closeImg} alt="" id='closeImg' /></Link>
                    {/* <div className='authTitle'>登入</div> */}
                    <div className="inputWrapper">
                        <input type="text" id="email" onChange={this.handleChange} value={this.state.email} placeholder="帳號" />
                        <input type="text" id='password' onChange={this.handleChange} value={this.state.password} placeholder="密碼" />
                        <button>登入</button>
                    </div>
                </form>
                {/* <Link onClick={() => { this.props.signOut() }} to='/'>signout</Link> */}
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
        signIn: (creds) => { dispatch(signIn(creds)) },
        signOut: () => { dispatch(signOut()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)