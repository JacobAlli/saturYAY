  // Initialize Firebase
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
//List API Results
//////////////////
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

      // grab the returned image url
       for (i=0; i<results.length; i++) {



          //create a new activity element with jquery
          var name = results[i].name;
          var actDiv = $("<div>");
          
          //add attributes
          actDiv.attr("address", results[i].formatated_address);
          actDiv.attr("cords", results[i].geometry.location);
          actDiv.attr("alt", results[i].geometry.icon);
          
            //button to link          
            var linkInput = $("<button>");
            linkInput.text("view site");

            //button to add to calendar
            var calendarbtn = $("<button>");
            var calendarinpt = $("<input>");
            calendarinpt.attr("placeholder","What time?");
            calendarbtn.text("Add");
            calendarbtn.attr("class","calendaradd");

          //add child divs to actDiv
          actDiv.text(name);
          actDiv.append(linkInput);
          actDiv.append(calendarinpt);
          actDiv.append(calendarbtn);


          //in the images id, add cat images
          $("#workingPlan").append(actDiv);
          };
      })

  });

//////////////////////////
//Submit event to calendar
//////////////////////////


////////////////////////////////////////
//Reset "Working Plan" and Search Fields
////////////////////////////////////////

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
