import React, {useState} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PizzaForm from "./PizzaForm";
import Home from "./Home"



const App = () => {
  const [pizzas, setPizzas] = useState([])
  const addPizza = (pizza) => {
    setPizzas([...pizzas, pizza])
  }
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza">
        <PizzaForm addPizza={addPizza} order={pizzas} />
      </Route>
    </div>
  );
};
export default App;
