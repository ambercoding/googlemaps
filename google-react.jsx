function GoogleCity(props){
	return(
		<div className="cityName">
			{props.cityObject.city}
		</div>
		)
}

var Cities = React.createClass({
	render: function(){
		var cityRows = [];
		this.props.cities.map(function(currentCity, index){
			console.log(currentCity.city)
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		})
		return(
			<div>
				{cityRows}
			</div>	
		)
	}
})

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)