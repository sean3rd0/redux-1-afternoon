import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, {ADD_INGREDIENT} from "./../../store.js";

class Ingredients extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      ingredients: reduxState.ingredients,
      input: ""
    };
  }

// Now we're really close. At this point we're saving our data on Redux, and we can see it show up, but only if we navigate away from the page and back again. So now we just need to make our list show up without leaving the page.

// First we need to create a componentDidMount method for this component. Inside this method we are going to use another piece that comes from store. This one is called subscribe. subcribe allows us to update our page any time the data on Redux state changes.

// subscribe takes a callback function as its argument that will fire any time there is an update in Redux. So every time this function fires we want to use getState to get an updated version of the Redux state. Then we'll use this.setState to update our component's state with the new values.
  componentDidMount(){
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        ingredients: reduxState.ingredients
      })
    })
  }

  handleChange(val) {
    this.setState({
      input: val
    });
  }
  addIngredient() {
    // Send data to Redux state
    store.dispatch({
      type: ADD_INGREDIENT, 
      payload: this.state.input
    });

    this.setState({
      input: ""
    });
  }
  render() {
    const ingredients = this.state.ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
    return (
      <div className="List forms">
        <h2>Ingredients:</h2>
        <div className="form_items_container">
          <ul className='list'>{ingredients}</ul>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button
            className="add_button"
            onClick={() => this.addIngredient()}
          >
            Add Ingredient
          </button>
        </div>
        <Link to="/add/author">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/add/instructions">
          <button className="right_button">Next</button>
        </Link>
      </div>
    );
  }
}

export default Ingredients;
