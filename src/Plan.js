import React, { Component } from 'react';
import * as bs from 'react-bootstrap' 
import './bootstrap.css';

var form = []

function Plan(props) {
    return (
        <div>
            <Title/>
            <AppComponent/>
            <Submit/>
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert(form);
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
