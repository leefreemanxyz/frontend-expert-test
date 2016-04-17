var data;
function onLoad(){
  //to get round CORS errors, I've saved the data to .json file
$.getJSON('data.json', function(json){
data = json;
console.log(data);
initMap();
initList();
});
}
function initMap(){
//function based on this tutorial on map markers: http://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canv"), mapOptions);
    // Display multiple markers on a map
    var markers = [];
    // Loop through our array of markers & place each one on the map
    for( i = 0; i < data.rows.length; i++ ) {
        var position = new google.maps.LatLng(data.rows[i].coordinate[0], data.rows[i].coordinate[1]);
        console.log(position);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: data.rows[i].name
        });
        markers.push(marker);
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
//the MarkerClusterer library groups markers together - I used this because some venues have multiple rooms available for hire, but their coordinates are the same, so different markers wouldn't be visible.
    var mc = new MarkerClusterer(map, markers);
  }
function initList(){
  $('#map-listings').html(function(){
    var listing = "";
    for(i=0; i<data.rows.length; i++){
      var facilities = "";
      //name of space, name of venue, city of venue, price per hour, capacity, image, facilities
      listing += "<div class='space-listing col-sm-6'><div class='image-list-div'><img class='space-listing-image' src='" + data.rows[i].image_urls[0] + "'/><div class='space-listing-price-per-hour'><span>€" + data.rows[i].hour_price + "/hour</span></div><div class='space-listing-capacity'>Capacity: " + data.rows[i].maximum_capacity + "</div></div><h3 class='space-listing-name'>" + data.rows[i].name + "</h3><h4 class='space-listing--location-name'>" + data.rows[i].location_name + "</h4><div class='space-listing-city'>" + data.rows[i].location_city + "</div><div class='space-listing-facilities'><ul class='facilities-list'>";
      for(j=0; j<data.rows[i].facility_icons.length; j++){
        facilities += "<li> <i class='" + data.rows[i].facility_icons[j].icon + "'></i><span> " + data.rows[i].facility_icons[j].name + "</span></li>";
      }
      listing += facilities + "</ul></div><div class='book-now'><a class='btn btn-block btn-primary' href='#'>Book now</a></div></div>";
      if(i%2===1 && i>1){
        listing += "<div class='clearfix'></div>";
      }
    }
    return listing;
  })
}
