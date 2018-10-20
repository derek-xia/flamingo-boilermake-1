import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Plan from './Plan';
import App from './App.js'
import Login from './Login.js'
import * as serviceWorker from './serviceWorker';

import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import {
Stitch,
RemoteMongoClient,
GoogleRedirectCredential,
FacebookRedirectCredential,
AnonymousCredential
} from "mongodb-stitch-browser-sdk";

let appId = "ridepool-scxud";

const client = Stitch.initializeDefaultAppClient(appId);

const db = client.getServiceClient(RemoteMongoClient.factory, 
   "mongodb-atlas").db('rides');

/*client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
    console.log('Logged into stitch with id: ${user.id}');
    const collection = db.collection('routes');
    return collection.insertOne({owner: user.id, names: "Hello!"});
).then(() => console.log("Inserted doc")
}).catch(err => {
    console.error(err)
});*/

ReactDOM.render(
<BrowserRouter>
    <div>
        <Route exact path="/" render={routeProps => <Login client={client}/>}/>
        <Route path="/route" render={routeProps => <Plan client={client}/>}/>
    </div>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
