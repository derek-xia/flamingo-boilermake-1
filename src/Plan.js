import React, { Component } from 'react';
import * as bs from 'react-bootstrap' 
import './bootstrap.css';

var form = []

function Plan(props) {
    console.log('Plan', props.user);
    return (
        <div>
            <Title/>
            <AppComponent/>
            <Submit db={props.db} user={props.user} client={props.client}/>
        </div>
    );
}

class Title extends Component {
    render () {
        return <h1 className="text-center">Routes</h1>;
    }
}

class AppComponent extends Component {
    state = {
      numChildren: 0
    }
  
    render () {
      const children = [];
  
      for (var i = 0; i < this.state.numChildren; i += 1) {
        children.push(<LocationForm key={i} number={i} />);
      };
  
      return (
        <ParentComponent addChild={this.onAddChild}>
          {children}
        </ParentComponent>
      );
    }
  
    onAddChild = () => {
        if (this.state.numChildren <= 8) {
            this.setState({
                numChildren: this.state.numChildren + 1
            });
        }        
    }
}

const ParentComponent = props => (
    <div>
        <div>
            {props.children}
        </div>
        <p className="text-center"><a href="#" onClick={props.addChild}>Add a location.</a></p>
    </div>
);

class LocationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value, inputClicked: false});
    }
  
    handleSubmit(event) {
        form.push(this.state.value);
        event.preventDefault();
    }
  
    render() {
        return (
            <div>
                <form className="text-center" onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                </form>
            </div>
        );
    }
  }

class Submit extends Component {
    constructor(props) {
        super(props);
        this.db = props.db;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        //this.props.client.callFunction("pushRoute", form).then(()=>console.log("done"));
        let segments = [];
        let names = [];
        for (const loc in form) {
            if (form.hasOwnProperty(loc)) {
                segments.push({
                    points: form[loc],
                    names: [this.props.user.name]
                });
            }
        }
        let route = {
            owner : this.props.user.email,
            segments : segments
        }
        this.db.collection('routes').insertOne(route);
    }

    render() {
        return (
            <div className="text-center">
                <bs.Button onClick={this.handleSubmit}>Go!</bs.Button>
            </div>
        );
    }
}

export default Plan;
