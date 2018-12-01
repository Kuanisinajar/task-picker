import React from 'react';
import { signOut } from '../actions/authAction';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({auth, signOut}) => {

    const authPannel = auth.uid ? (
        <div id='authPannel'>
          <button onClick={() => { signOut() }}>登出</button>
        </div>
      ) : (
          <div id='authPannel'>
            <Link to="/signIn">登入</Link>
            ｜
            <Link to='/signUp'>註冊</Link>
          </div>
        );

    return(
        <div id="header">
            <span id='siteTitle'>任務挑選大師</span>
            { authPannel }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => { dispatch(signOut()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);