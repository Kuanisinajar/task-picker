import React, { Component } from 'react';
import ProfilePic from '../profile.svg';
import SignIn from './signIn';
import SignUp from './signUp';


class PersonalPanel extends Component {

    render() {
        //const content = this.props.auth.uid ? (<p>Sign Out</p>) : (<p>Log In</p>);
        return (
            <div id="personal-panel">
                <img id='profile-pic' src={ProfilePic} alt=""/>
                <div id="login-panel">
                    <SignIn />
                    <SignUp />
                    {/* <input type="text" id="email" onChange={this.handleChange} value={this.state.email} placeholder="email" />
                    <input type="text" id='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                    <button onClick={this.handleSubmit}>submit</button>
                    <div>{this.props.authError ? this.props.authError : null}</div>
                    <button onClick={() => { this.props.signOut() }}>signout</button>
                    <div>{content}</div> */}
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         auth: state.firebase.auth,
//         authError: state.auth.authError
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signIn: (creds) => { dispatch(signIn(creds)) },
//         signOut: () => { dispatch(signOut()) }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PersonalPanel)

export default PersonalPanel