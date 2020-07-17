import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import "./PizzaForm.css";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field.")
    .min(2, "Name must be at least two characters long."),
  sizes: yup.string().required("You must pick a size."),
  pepperoni: yup.boolean().oneOf([true]),
  jalapenos: yup.boolean().oneOf([true]),
  mushrooms: yup.boolean().oneOf([true]),
  olives: yup.boolean().oneOf([true]),
  instructions: yup.string(),
});

function PizzaForm(props) {
  const [formState, setFormState] = useState({
    name: "",
    sizes: "",
    pepperoni: false,
    jalapenos: false,
    mushrooms: false,
    olives: false,
    instructions: "",
  });
  const [errorState, setErrorState] = useState({
    name: "",
    sizes: "",
    pepperoni: "",
    jalapenos: "",
    mushrooms: "",
    olives: "",
    instructions: "",
  });
  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };
  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    axios
      .post("https://reqres.in/api/pizzas", formState)
      .then((response) => {
        props.addPizza(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="pizza-form" onSubmit={formSubmit}>
      <div className="home-button">
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
      <br></br>
      <label className="name" htmlFor="name">
        Name:
        <br></br>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formState.name}
          onChange={inputChange}
        ></input>
        {errorState.name.length > 2 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
      </label>
      <br></br>
      <label htmlFor="sizes">
        Size:
        <br></br>
        <select name="sizes" id="sizes" onChange={inputChange}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra-Large">Extra Large</option>
        </select>
      </label>
      <br></br>
      <label>Toppings:</label>
      {/* <br></br> */}
      <label htmlFor="pepperoni">
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        Pepperoni
      </label>
      <label htmlFor="jalapenos">
        <input
          type="checkbox"
          id="jalapenos"
          name="jalapenos"
          checked={formState.jalapenos}
          onChange={inputChange}
        />
        Jalapenos
      </label>
      <label htmlFor="mushrooms">
        <input
          type="checkbox"
          id="mushrooms"
          name="mushrooms"
          checked={formState.mushrooms}
          onChange={inputChange}
        />
        Mushrooms
      </label>
      <label htmlFor="olives">
        <input
          type="checkbox"
          id="olives"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
        Olives
      </label>
      <br></br>

      <label htmlFor="instructions">
        Special Instructions?
        <br></br>
        <textarea
          name="instructions"
          id="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errorState.instructions.length > 0 ? (
          <p className="error">{errorState.instructions}</p>
        ) : null}
      </label>
      <br></br>
      <button>Add to Order!</button>
      <pre>{JSON.stringify(props.order, null, 2)}</pre>
    </form>
  );
}

export default PizzaForm;
