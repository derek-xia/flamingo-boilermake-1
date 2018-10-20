import React, { Component } from 'react';
import './bootstrap.css';
import './custom.css';
import * as bs from 'react-bootstrap' 
import {
    Stitch,
    RemoteMongoClient,
    GoogleRedirectCredential,
    FacebookRedirectCredential,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";

class Login extends React.Component {
    constructor(props){
       super(props)
       this.state = {userData:null}
       this.client = props.client;
    }
 
 render() {
 
    let authed = this.client.auth.isLoggedIn;
 
    if(this.client.auth.hasRedirectResult()){
       this.client.auth.handleRedirectResult().then(user=>{
          this.setState({userData:user.profile.data})
       });
    }
    let logout = () => this.client.auth.logout().then();
    return (
       <div className="text-center">
       {authed
          ? <div className="login-header">
             {this.state.userData && this.state.userData.picture
                ? <img src={this.state.userData.picture} className="profile-pic" />
                : null}
             <span className="login-text">
                <span className="username">
                   {this.state.userData && this.state.userData.name ? this.state.userData.name : "?"}
                </span>
             </span>
             <div>
                <a href="#" onClick={() => logout()}>
                   sign out
                </a>
             </div>
             <div>
                <a href="/route">Route</a>
             </div>
             </div>
          : null}
       {!authed
          ? <div className="login-links-panel">
             <h2>Routes</h2>
             <div
                onClick={() => this.client.auth.loginWithRedirect(new FacebookRedirectCredential())}
                className="signin-button"
             >
                <div className="facebook-signin-logo" />
                <span className="signin-button-text">
                   Sign in with Facebook
                </span>
             </div>
             </div>
          : null}
       </div>
    );
 }
 };

 export default Login;