// create the google map
/****Google****/
var map = new google.maps.Map(
	document.getElementById('map'),
	{
		center:{lat: 39.8282, lng: -98.5795},
		zoom: 4
	}
);

var infoWindow = new google.maps.InfoWindow({});

var markers = [];

// var gdir, fromAddress, toAddress;

// function overlayDirections()
// {
//     fromAddress =
//       document.getElementById("street").value
//       + " " + document.getElementById("city").value
//       + " " + document.getElementById("state").options[document.getElementById("state").selectedIndex].value
//       + " " + document.getElementById("zip").value;
 
//     gdir.load("from: " + fromAddress + " to: " + toAddress);
// }

// function handleErrors(){
//    if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
//      alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
//    else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
//      alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);
//    else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
//      alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);
//    else if (gdir.getStatus().code == G_GEO_BAD_KEY)
//      alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);
//    else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
//      alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);
//    else alert("An unknown error occurred.");
// }

function createMarker(city){
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569'
	var cityLL = {
		lat: city.lat,
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	})
	// we only want one info window
	google.maps.event.addListener(marker, 'click', function(event){
		infoWindow.setContent(`<h2> ${city.city}</h2><div>${city.state}</div><div>${city.yearEstimate}</div>`)
		infoWindow.open(map, marker);
	});
	markers.push(marker);
}

/*******Reac*****/
var GoogleCity = React.createClass({
	handleClickedCity: function(event){
		console.log("someone clicked");
		google.maps.event.trigger(markers[this.props.cityObject.yearRank-1],"click")
	},
	render: function(){
	return(
		<tr>
			<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
			<td className="city-rank">{this.props.cityObject.yearRank}</td>
		</tr>
		)
	}
});

var Cities = React.createClass({

	getInitialState: function() {
		return{
			currCities: this.props.cities
		}
		
	},
	handleInputChange: function(event){
		var newFilterValue = event.target.value;
		var filteredCitiesArray = [];
		// loop through the list of cities 
		this.props.cities.map(function(currCity, index){
			if(currCity.city.indexOf(newFilterValue) !== -1){
				//hit! i dont care where its at but its in the word
				filteredCitiesArray.push(currCity);
			}

		});
		this.setState({
			currCities: filteredCitiesArray
		})
		
	},
	updateMarkers: function(event){
				event.preventDefault();
				console.log("Update Markers!");
				markers.map(function(marker, index){
					marker.setMap(null);

				});
				this.state.currCities.map(function(city, index){
					createMarker(city)
				})
	},

	render: function(){
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity)
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return(
			<div>
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange}/>
					<input type="submit" value="Update Markers" />
				</form>	
				<table>
					<thead>
						<tr>
						<th>City Name</th>
						<th>City Rank</th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>	
				</table>
			</div>
			
		)
	}
});
ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)