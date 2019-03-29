var lat = 18.35827827454; //default latitude
var lng = 121.63744354248; //default longitude
var homeLatlng = new google.maps.LatLng(lat, lng); //set default coordinates

var homeMarker = new google.maps.Marker({ //set marker
  position: homeLatlng, //set marker position equal to the default coordinates
  map: map, //set map to be used by the marker
  draggable: true //make the marker draggable
});

var myOptions = {
  center: new google.maps.LatLng(16.61096000671, 120.31346130371), //set map center
  zoom: 17, //set zoom level to 17
  mapTypeId: google.maps.MapTypeId.ROADMAP //set map type to road map
};
var map = new google.maps.Map($("#map_canvas"),
    myOptions); //initialize the map

    var input = $('#search_new_places'); //get element to use as input for autocomplete
var autocomplete = new google.maps.places.Autocomplete(input); //set it as the input for autocomplete
autocomplete.bindTo('bounds', map); //bias the results to the maps viewport


//executed when a place is selected from the search field
google.maps.event.addListener(autocomplete, 'place_changed', function(){

  //get information about the selected place in the autocomplete text field
  var place = autocomplete.getPlace();

  if (place.geometry.viewport){ //for places within the default view port (continents, countries)
    map.fitBounds(place.geometry.viewport); //set map center to the coordinates of the location
  } else { //for places that are not on the default view port (cities, streets)
    map.setCenter(place.geometry.location);  //set map center to the coordinates of the location
    map.setZoom(17); //set a custom zoom level of 17
  }

  homeMarker.setMap(map); //set the map to be used by the  marker
  homeMarker.setPosition(place.geometry.location); //plot marker into the coordinates of the location

});

$('#plot_marker').click(function(e){ //used for plotting the marker into the map if it doesn't exist already
  e.preventDefault();
  homeMarker.setMap(map); //set the map to be used by marker
  homeMarker.setPosition(map.getCenter()); //set position of marker equal to the current center of the map
  map.setZoom(17);

  $('input[type=text], input[type=hidden]').val('');
});


// Search field
$('#search_ex_places').blur(function(){//once the user has selected an existing place

  var place = $(this).val();
  //initialize values
  var exists = 0;
  var lat = 0;
  var lng = 0;
  $('#saved_places option').each(function(index){ //loop through the save places
    var cur_place = $(this).data('place'); //current place description

    //if current place in the loop is equal to the selected place
    //then set the information to their respected fields
    if(cur_place == place){
      exists = 1;
      $('#place_id').val($(this).data('id'));
      lat = $(this).data('lat');
      lng = $(this).data('lng');
      $('#n_place').val($(this).data('place'));
      $('#n_description').val($(this).data('description'));
    }
  });

  //if the place doesn't exist then empty all the text fields and hidden fields
  if(exists == 0){
    $('input[type=text], input[type=hidden]').val('');

  }else{
    //set the coordinates of the selected place
    var position = new google.maps.LatLng(lat, lng);

    //set marker position
    homeMarker.setMap(map);
    homeMarker.setPosition(position);

    //set the center of the map
    map.setCenter(homeMarker.getPosition());
    map.setZoom(17);

  }
});


// Submit information via AJAX
$('#btn_save').click(function(){
  var place   = $.trim($('#n_place').val());
  var description = $.trim($('#n_description').val());
  var lat = homeMarker.getPosition().lat();
  var lng = homeMarker.getPosition().lng();

  $.post('save_place.php',
    {
        'place' : place, 'description' : description,
        'lat' : lat, 'lng' : lng
    },
    function(data){
      var place_id = data;
      var new_option = $('').attr(
                    {
                    'data-id' : place_id, 'data-place' : place,
                    'data-lat' : lat, 'data-lng' : lng, 'data-description' : description
                    }
                ).text(place);
                
new_option.appendTo($('#saved_places')); //append new option to the datalist      

});

$('input[type=text], input[type=hidden]').val('');
});