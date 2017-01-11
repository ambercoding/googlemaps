// Two utility functions to convert c->f, and f->c
function toCelcius(f){
	return (f - 32) * 5 / 9;
}
function toFahrenheit(c){
	return(c * 9 / 5) + 32;
}
// function toKelvin(k){
// 	return(c + 273);
// }

// Make another utility function that tries the conversion.
// If it can, it returns the conversion rounded.
// If it can't it returns an empty string
function tryConvert(value,tUnit){
	var tryNumber = Number(value);
	if(isNaN(tryNumber)){
		//this is !!!!NOT!!!! a valid number. What is your problem user?
		return '';
	}else{
		//this is a valid number (isNAN returned false) We can convert!
		if(tUnit == 'c'){
			var convertedNumber = toFahrenheit(tryNumber);
		}else{
			var convertedNumber = toCelcius(tryNumber);
		}
		return convertedNumber;
	}
}



function BoilingVerdict(props){
	console.log(props.celcius)
	if(props.celcius >= 100){
		return(
			<p>The water would boil at {props.celcius} Celcius</p>
		)
	}else{
		return(
			<p>The water would NOT boil at {props.celcius} Celcius</p>
		)		
	}
}

var TemperatureInput = React.createClass({
	// getInitialState: function() {
	// 	return{value: ''}
	// },	
	handleChange: function(event){
		// console.log(event.target.value);
		// this.setState({
		// 	value: event.target.value
		// })

		this.props.onChange(event.target.value);
	},
	render: function(){
		var value = this.props.value;
		var tUnits = this.props.tUnits;
		return(
			<div>
				<label>Enter temperature in question in {tUnits}</label>
				<input placeholder="Temp" value={value} onChange={this.handleChange} />			
			</div>
		)
	}
})

var Calculator = React.createClass({

	getInitialState: function() {
		return{
			value: 0,
			scale: 'c'
		}
	},

	handleCelciusChange: function(value){
		this.setState({
			scale: 'c', 
			value: value
		})
	},

	handleFahrenheitChange: function(value){
		this.setState({
			scale: 'f', 
			value: value
		})
	},
	handleKelvinChange: function(value){
		this.setState({
			scale: 'k', 
			value: value
		})
	},

	render: function(){
		var scale = this.state.scale;
		var value = this.state.value;
		if(this.state.scale == 'c'){
			var fTemp = tryConvert(value,'c');
			var cTemp = value;
		}else if(this.state.scale == 'f'){
			var fTemp = value;
			var cTemp = tryConvert(value,'f');
		}
	    
		// var userEnteredTemp = this.state.value;
		// if(userEnteredTemp >= 100){
		// 	var text = "Would boil"
		// }else{
		// 	var text = "Would not voil"
		// }

		return(
			<div>
				{ /* <p>{text}</p> */}
				<TemperatureInput 
					tUnits="Celcius" 
					value={cTemp} 
					onChange={this.handleCelciusChange} 
				/>
				<TemperatureInput tUnits="Fahrenheit" value={fTemp} onChange={this.handleFahrenheitChange} />
				
				{/*// <TemperatureInput tUnits="Kelvin" value={kTemp} onChange={this.handleKelvinChange} />*/}
				<BoilingVerdict celcius={Number(cTemp)} />
			</div>
		)
	}
})


ReactDOM.render(
	<Calculator />,
	document.getElementById('boiling')
)