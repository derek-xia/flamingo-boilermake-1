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
            ? <bs.Jumbotron>
                <h1>
                    Routes
                </h1>
                <h1>
                    <bs.Button bsSize="large" onClick={() => logout()}>
                    Sign Out
                    </bs.Button>
                </h1>
                <bs.Button>
                    <Link to="/plan">Route</Link>
                </bs.Button>
                <bs.Button>
                    <Link to="/trip">Trips</Link>
                </bs.Button>
                </bs.Jumbotron>
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