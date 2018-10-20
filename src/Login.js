import React, { Component } from 'react';
import './bootstrap.css';
import './custom.css';
import * as bs from 'react-bootstrap' 
import {
    Stitch,
    RemoteMongoClient,
    FacebookRedirectCredential,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
       super(props)
       this.state = {userData:null}
       this.client = props.client;
    }

    componentDidMount() {
        if(this.client.auth.hasRedirectResult()){
            this.client.auth.handleRedirectResult().then(user=>{
                this.setState({userData:user.profile.data});
                this.props.callback(user.profile.data);
                alert(user.profile.data);
            });
        }
    }
 
    render() {
        let authed = this.client.auth.isLoggedIn;
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
                    <Link to="/route">Route</Link>
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
                <div className="login-links-panel">
                
                <div
                    onClick={() => this.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
                    alert(`Logged in as anonymous user with id: ${user.id}`);
                    }).catch(console.error)}
                    className="signin-button"
                >
                    <div/>
                    <span className="signin-button-text">
                    Sign in Anonymously
                    </span>
                </div>
                </div>
                </div>
            : null}
        </div>
        );
    }
 };

 export default Login;