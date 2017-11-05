//////////////////////
// Initialize Firebase
//////////////////////
  var config = {
    apiKey: "AIzaSyBlA3lvNcU3AmMH-FOs_1d_mJn5J1TfE8o",
    authDomain: "saturyay-1509769906764.firebaseapp.com",
    databaseURL: "https://saturyay-1509769906764.firebaseio.com",
    projectId: "saturyay-1509769906764",
    storageBucket: "",
    messagingSenderId: "714390122085"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

////////////////////
// Set up Google API
////////////////////
  //Google Places API Key AIzaSyBqPqKqVgR6ng2_NNHhNqV4nX7LbbHJbqc;
  var api="&key=AIzaSyBqPqKqVgR6ng2_NNHhNqV4nX7LbbHJbqc";
  var event = "";
  var elocation = "";
  var searchurl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+event+elocation+api;
  var proxy = "";
  var queryURL = "";

  $(document).on("click", "#add-activity", function(){
    elocation = "+in+" + $("#location-input").val().trim().replace(" ","+");
    console.log(elocation);
    event = $("#activity-input").val().trim().replace(" ","+");
    searchurl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+event+elocation+api;

    proxy = "https://cors-anywhere.herokuapp.com/";
    queryURL = proxy + searchurl;

  });

//////////////////
// Set up Uber API
//////////////////
  //https://www.thinkful.com/learn/uber-api/#Fetching-Time-Estimates-from-Uber
  function UberAPI (){
    var clientsecret = "yptEdY-aK8FgXvHh80nId9gTmwCYEqdjcreoIkP0";

    // create placeholder variables
    var userLatitude;
    var userLongitude;

    navigator.geolocation.watchPosition(function(position) {
    // Update latitude and longitude
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      console.log("User Lat: " + userLatitude);
    console.log("User Long: " + userLongitude);

    });
    
    
    // Uber API Constants
    var uberClientId = "h31bv5vnzVyYRYhojvmy3tZdSd";
    var uberServerToken = "OiTtlcQ2FoqLvXQCCjlVI2Y319KLPoxOBSNFGsf4";
    
    
    var aLatitude = 38.8996479;
    var aLongitude = -94.7261206;
    var bLatitude = 39.1400216;
    var bLongitude = -94.5799362;

    // var bLatitude = JSON.stringify($(this).attr("lat"));
    // var bLongitude = JSON.stringify($(this).attr("long"));
    // console.log($(this).parent().attr("lat"));
    // console.log("Dest Lat: " + bLatitude);
    // console.log("Dest Long: " + bLongitude);
    
    // Edwards Campus cords
    // var aLatitude = 38.8996479;
    // var aLongitude = -94.7261206;
    
    //chicken n pickle's cords
    // var bLatitude = 39.1400216;
    // var bLongitude = -94.5799362;    

    navigator.geolocation.watchPosition(function(position) {
    // Update latitude and longitude
      //userLatitude = position.coords.latitude;
      //userLongitude = position.coords.longitude;

    // Query Uber API if needed
      getEstimatesForUserLocation(aLatitude, aLongitude);
    });

    function getEstimatesForUserLocation(latitude,longitude) {
      uberproxy = "https://cors-anywhere.herokuapp.com/";
    uberqueryURL = uberproxy + "https://api.uber.com/v1/estimates/price";
      $.ajax({
        url: uberqueryURL,
        headers: {
            Authorization: "Token " + uberServerToken
        },
        data: {
            start_latitude: aLatitude,
            start_longitude: aLongitude,
            end_latitude: bLatitude,
            end_longitude: bLongitude
        },
        success: function(result) {
            console.log(result);
        }
      });
    }
  }

///////////////////////////////////
//Click Uber Button in Working Plan
///////////////////////////////////
  $(document).on("click", ".uberbtn", function(){
    UberAPI(); 
  });

/////////////////////////////
//Click Uber Button in Agenda
/////////////////////////////

///////////////////
// List API Results
///////////////////
  ///////
  //CORS/
  ///////


  $(document).on("click", "#add-activity", function(){
  console.log(searchurl);
  console.log(queryURL);
    //make an ajax call to grab API
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //When request is complete, run function
    .done(function(response) {
      console.log(response.results);
      var results=response.results;


      // counter for input targeting
      var counter = 0;
      $("#workingPlan").empty();

      // grab the returned image url
       for (i=0; i<results.length; i++) {



          //create a new activity element with jquery
          var name = results[i].name;
          var actDiv = $("<div>");
          
          //add attributes
          actDiv.attr("address", results[i].formatted_address);
          actDiv.attr("lat", results[i].geometry.location.lat);
          actDiv.attr("long", results[i].geometry.location.lng);
          actDiv.attr("alt", results[i].icon);
          actDiv.attr("venue-name", name);
          
            ///////////
            //add image
            ///////////
            var imgDiv = $("<img>");
            imgDiv.attr("src",results[i].icon);
            imgDiv.attr("style","height: 20px");

            //////////
            //add name
            //////////
            var nameDiv = $("<p>");
            nameDiv.text(name);
            nameDiv.attr("style","height: 30px");
          

            ////////////////
            //button to link
            ////////////////         
            var linkInput = $("<button>");
            linkInput.text("view site");
            linkInput.attr("style","height: 30px ; margin-left:.5em");
            linkInput.attr("class","btn btn-primary");

            ///////////////////////////
            //button to add to calendar
            ///////////////////////////
            
            var calendarinpt = $("<input>");
            calendarinpt.attr("placeholder","What time?");
            calendarinpt.attr("style","height: 30px");
            calendarinpt.attr("data-counter", counter);
            calendarinpt.addClass("calinput");
            
            var calendarbtn = $("<button>");
            calendarbtn.text("Add");
            calendarbtn.attr("style","height: 30px; margin-left:.5em");
            calendarbtn.attr("class","btn btn-danger calendaradd");

            //////////
            //Uber API
            //////////
            var uberBtn = $("<button>");
            
            uberBtn.attr("style","margin-left:.5em; height: 30px; width: 100px; background-size: cover;; background: url(assets/images/UberButtons/button.png) no-repeat");
            uberBtn.attr("class","btn btn-info uberbtn");
            uberBtn.attr("lat", results[i].geometry.location.lat);
            uberBtn.attr("long", results[i].geometry.location.lng);

          //add child divs to actDiv
          actDiv.prepend("<br>");
          actDiv.append(imgDiv);
          actDiv.append(nameDiv);
          actDiv.append(calendarinpt);
          actDiv.append(calendarbtn);
          actDiv.append(linkInput);
          actDiv.append(uberBtn);
          actDiv.append("<br>");


          //in the images id, add cat images
          $("#workingPlan").append(actDiv);
          };
      })

  });

///////////////////////////
// Submit event to calendar
///////////////////////////
  $(document).on('click', '.calendaradd', function(){
     var tableRow = $("<tr>");
     var venue = $("<td>");
     var time = $("<td>");
     var address = $("<td>");


     venue.html($(this).parent().attr("venue-name"));
     time.html($(this).parent().children(".calinput").val());
     time.addClass("item");
     address.html($(this).parent().attr("address"));

     tableRow.append(venue);
     tableRow.append(time);
     tableRow.append(address);

     $(".calTBody").append(tableRow);


  })

/////////////////////////////////////////
// Reset "Working Plan" and Search Fields
/////////////////////////////////////////
  $(document).on("click", ".calendaradd", function(){
    $("#workingPlan").empty()
    $("#activity-input").val('');
    $("#location-input").val('');
  });






///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

////////
// Notes
////////
  ////////////////
  //near by search
  ////////////////
    //https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters

    //required
      //key
      //location - latitude,longitude.
      //radius

    //Optional
      //rankby
      //language
      //minprice
      //maxprice
      //name
      //opennow
      //type
      //pagetoken

  /////////////
  //Text Search
  /////////////
    //https://maps.googleapis.com/maps/api/place/textsearch/json?parameters
    //ex: https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=
    //Required
      //query
      //key

    //Optional
      //location
      //radius
      //language
      //minprice
      //opennow
      //pagetoken
      //type
        //Here is a complete list of types, we can have it in a list for them.
          // accounting
          // airport
          // amusement_park
          // aquarium
          // art_gallery
          // atm
          // bakery
          // bank
          // bar
          // beauty_salon
          // bicycle_store
          // book_store
          // bowling_alley
          // bus_station
          // cafe
          // campground
          // car_dealer
          // car_rental
          // car_repair
          // car_wash
          // casino
          // cemetery
          // church
          // city_hall
          // clothing_store
          // convenience_store
          // courthouse
          // dentist
          // department_store
          // doctor
          // electrician
          // electronics_store
          // embassy
          // establishment (deprecated)
          // finance (deprecated)
          // fire_station
          // florist
          // food (deprecated)
          // funeral_home
          // furniture_store
          // gas_station
          // general_contractor (deprecated)
          // grocery_or_supermarket (deprecated)
          // gym
          // hair_care
          // hardware_store
          // health (deprecated)
          // hindu_temple
          // home_goods_store
          // hospital
          // insurance_agency
          // jewelry_store
          // laundry
          // lawyer
          // library
          // liquor_store
          // local_government_office
          // locksmith
          // lodging
          // meal_delivery
          // meal_takeaway
          // mosque
          // movie_rental
          // movie_theater
          // moving_company
          // museum
          // night_club
          // painter
          // park
          // parking
          // pet_store
          // pharmacy
          // physiotherapist
          // place_of_worship (deprecated)
          // plumber
          // police
          // post_office
          // real_estate_agency
          // restaurant
          // roofing_contractor
          // rv_park
          // school
          // shoe_store
          // shopping_mall
          // spa
          // stadium
          // storage
          // store
          // subway_station
          // synagogue
          // taxi_stand
          // train_station
          // transit_station
          // travel_agency
          // university
          // veterinary_care
          // zoo
