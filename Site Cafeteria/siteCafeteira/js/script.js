function init() {
	map = new OpenLayers.Map('mapa');
	mapnik = new OpenLayers.Layer.OSM(); 
	adicionarMarker("Avenida Brasil, São Paulo", map, mapnik, "blue", "Loja 1"); 
	adicionarMarker("Avenida Vinte e Três de Maio, São Paulo", map, mapnik, "red", "Loja 2");						
}

function adicionarMarker(endereco, map, mapnik, color, nome){
	var geocoder = new google.maps.Geocoder();
	if (geocoder) {
	  geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR'}, function (results, status) { // Função Assíncrona
		 if (status == google.maps.GeocoderStatus.OK) {
		 
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			var loc = new OpenLayers.LonLat(lng, lat).transform('EPSG:4326', 'EPSG:3857');                                                                              
			var markers = new OpenLayers.Layer.Markers('Marcadores'); 
			var marker = new OpenLayers.Marker(loc);
			var zoom = 13;
			
			map.addLayer(mapnik); 					
			map.addLayer(markers);    
			markers.addMarker(marker);    	
			map.setCenter(loc, zoom); 			
			marker.icon.imageDiv.title = nome + "\n" + endereco + "\nLat: " + lat + " \\ Long: " + lng;
			
			switch(color){
				case "red":
					marker.icon.imageDiv.firstChild.setAttribute('src', 'img/marker.png');
					break;
				case "blue":
					marker.icon.imageDiv.firstChild.setAttribute('src', 'img/marker-blue.png');
					break;
				case "yellow":
					marker.icon.imageDiv.firstChild.setAttribute('src', 'img/marker-yellow.png');
					break;
				case "green":
					marker.icon.imageDiv.firstChild.setAttribute('src', 'img/marker-green.png');
					break;
			}
		 }else {
			alert("Geocodificação falhou: " + status);
		 }
	  });
	}
}
