import React, { Component } from 'react';
import * as bs from 'react-bootstrap' 

class Trip extends Component {
    constructor(props){
        super(props);
        this.state = {routes:[]};
    }

    componentDidMount() {
        const trips = this.props.db.collection("routes").find();//this.props.client.callFunction("friendTrips");//  
        //console.log({db:this.props.db});
        //console.log({db:this.props.db.collection("routes").find()[0]});
        trips.asArray().then(ts => {
            console.log(ts);
            var temp = [];
            ts.reverse().forEach(route => {
                //console.log(route)
            let element = (
                <div>
                    <Route segments={route.segments} key={route._id} client={this.props.client} db={this.props.db}/>
                </div>
            );
                temp.push(element);
            });
            //console.log({routest:temp});
            this.setState({routes:temp});
        });
           
    }

    render() {
        //console.log(this.state.routes);
        if (this.state.routes.length != 0) {
            return(
                <div className="text-center">
                    <h1>Routes</h1>
                    {this.state.routes}
                </div>
            );
        }
        return(<div className="text-center"><h3>Loading...</h3></div>);
    }
}

class Route extends Component {
    constructor(props) {
        super(props);
        this.state = {segments:[]};
    }
    componentDidMount() {
        var temp = [];
        temp = this.props.segments.map((segment)=>
        <div>
            <Segment points={segment.points} key={segment._id} names={segment.names}  client={this.props.client} id={this.props.key} db={this.props.db}/>
            <hr/>
        </div>
        );
        this.setState({segments:temp});
    }
    render() {
        console.log(this.props.segments.points);
        return <bs.Jumbotron>{this.state.segments}</bs.Jumbotron>;
    }
}

class Segment extends Component {
    constructor(props) {
        super(props);
        this.myName = this.props.client.callFunction("getAuthUser");
        let isLit = this.myName in this.props.names;
        this.state = {menuItems:[], isLit: isLit};
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount() {
        var temp = [];
        temp = this.props.names.map((name)=>
            <bs.MenuItem>{name}</bs.MenuItem>
        );
        this.setState({menuItems:temp});
    }
    clickHandler() {
        console.log("is it lit?", this.state.isLit);
        this.setState((isLit) => ({
            isLit: !this.state.isLit
        }));
        /*if (this.state.isLit) {
            let obj = this.props.db.collection("routes").find({_id:this.props.id}).asArray().then(f=> {;
            obj.forEach(function(o){
                if (o.points == this.props.points) {
                    let temp = {}; 
                    temp = obj.names.filter(o=>o==this.myName);
                    obj.names = temp;
                }
            });
            this.props.db.collection("routes").update({_id:this.props.id},{$set : obj});
        });
            
        } else {
            let obj = this.props.db.collection("routes").find({_id:this.props.id}).asArray().then(f=> {
                console.log(f);
                f.forEach(function(o){
                    if (o.points == this.props.points) {
                        f.names.push(this.myName);
                    }
                });
                this.props.db.collection("routes").updateOne({_id:this.props.id},{$set : f});
            });
        }*/    
    }
    render() {
        return (
        <bs.SplitButton title={this.props.points} bsStyle={this.state.isLit ? 'success': 'default'} onClick={this.clickHandler}>
            {this.state.menuItems}
        </bs.SplitButton>
        );
    }
}

export default Trip; 