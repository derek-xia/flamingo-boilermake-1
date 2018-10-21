import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Plan from './Plan';
import Login from './Login.js';
import Trip from './Trip';
import * as serviceWorker from './serviceWorker';

import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import {
Stitch,
RemoteMongoClient,
FacebookRedirectCredential,
AnonymousCredential
} from "mongodb-stitch-browser-sdk";

let appId = "ridepool-scxud";

const client = Stitch.initializeDefaultAppClient(appId);

const db = client.getServiceClient(RemoteMongoClient.factory, 
   "mongodb-atlas").db('rides');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:null};
        this.setUser = this.setUser.bind(this);
    }

    setUser(userData) {
        console.log('setUser', userData);
        this.setState({user:userData}, ()=>console.log('finished updating state'));
    }

    componentWillUnmount() {
        console.log("Oh no, we are going to lose state");
    }

    render() {
        console.log('index', this.state.user);
        return (
        <BrowserRouter>
            <div>
            <Route exact path="/" render={
                routeProps => <Login client={client} db={db} user={this.state.user} callback={this.setUser}/>
            }/>
            <Route path="/plan" key={this.state.user} render={
                routeProps => <Plan client={client} db={db} user={this.state.user}/>
            }/>
            <Route path="/trip" render={
                routeProps => <Trip client={client} db={db} user={this.state.user}/>
            }/>
            </div>
        </BrowserRouter>
        );
    }

}
ReactDOM.render(
    <App/>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
