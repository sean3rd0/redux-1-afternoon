import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, {ADD_INSTRUCTION, ADD_RECIPE} from "./../../store";

class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      instructions: reduxState.instructions, 
      input: ""
    };
  }

// Now we're really close. At this point we're saving our data on Redux, and we can see it show up, but only if we navigate away from the page and back again. So now we just need to make our list show up without leaving the page.

// First we need to create a componentDidMount method for this component. Inside this method we are going to use another piece that comes from store. This one is called subscribe. subcribe allows us to update our page any time the data on Redux state changes.

// subscribe takes a callback function as its argument that will fire any time there is an update in Redux. So every time this function fires we want to use getState to get an updated version of the Redux state. Then we'll use this.setState to update our component's state with the new values.
  componentDidMount() {
    const reduxState = store.getState();
    this.setState({
      instructions: reduxState.instructions
    })
  }

  handleChange(val) {
    this.setState({
      input: val
    });
  }
  addInstruction() {
    // Send data to Redux state
    store.dispatch({
      type: ADD_INSTRUCTION, 
      payload: this.state.input
    })
    this.setState({
      input: ""
    });
  }
  create() {
    // Create new recipe in Redux state
    store.dispatch({
      type: ADD_RECIPE
    });
  }
  render() {
    const instructions = this.state.instructions.map((instruction, i) => {
      return <li key={i}>{instruction}</li>;
    });
    return (
      <div className="List forms">
        <h2>Instructions:</h2>
        <div className="form_items_container">
          <ol className='list'>{instructions}</ol>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addInstruction()}>
            Add Instruction
          </button>
        </div>
        <Link to="/add/ingredients">
          <button className='left_button'>Previous</button>
        </Link>
        <Link to="/">
          <button className='right_button' onClick={() => this.create()}>Create</button>
        </Link>
      </div>
    );
  }
}

export default Instructions;
