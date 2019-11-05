import React from "react";

//Forms what we are filling on our website.
const Form = props => (
    //Stateless functional components here.
	<form onSubmit={props.getWeather}>
        {/* Needed two inputs here */}
		<input type="text" name="city" placeholder="City..."/>
		<input type="text" name="country" placeholder="Country..."/>
		<button>Get Weather</button>
	</form>
);

export default Form;
