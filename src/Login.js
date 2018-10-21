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
            });
        }
    }
 
    render() {
        let authed = this.client.auth.isLoggedIn;
        let logout = () => this.client.auth.logout().then();
        return (
        <div className="text-center">
        {authed
            ? <div>
                {this.state.userData && this.state.userData.picture
                    ? <img src={this.state.userData.picture} className="profile-pic" />
                    : null}
                <h1>
                    {this.state.userData && this.state.userData.name ? this.state.userData.name : "?"}
                </h1>
                <h1>
                    <a href="#" className="" onClick={() => logout()}>
                    Sign Out
                    </a>
                </h1>
                <div>
                    <Link to="/plan">Route</Link>
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