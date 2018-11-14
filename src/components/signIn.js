import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/authAction';

class SignIn extends Component {

    state = {
        email: "",
        password: ""
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
        return (
            <div id="signInForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="email" onChange={this.handleChange} value={this.state.email} placeholder="email" />
                    <input type="text" id='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                    <button>Submit</button>
                </form>
                <button onClick={() => { this.props.signOut() }}>signout</button>

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