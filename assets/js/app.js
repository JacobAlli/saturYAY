//////////////////////
// Initialize Firebase
//////////////////////
  //https://console.firebase.google.com/project/saturyay-1509769906764/database
  var config = {
    apiKey: "AIzaSyBVetMliqY5SedRbFNEyEebC3azC2A9lLw",
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
  var api="&key=AIzaSyBVetMliqY5SedRbFNEyEebC3azC2A9lLw";
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

///////////////////////////////////
//Click Uber Button in Working Plan
///////////////////////////////////
  //
  var bLatitude="";
  var bLongitude="";
  var uberPrice = $("<div>");
  var ajaxinprocess= false;

  $(document).on("mouseover", ".uberbtn", function(){
    bLatitude = $(this).parent().attr("lat");
    bLongitude = $(this).parent().attr("long");
    
    //////////
    //Uber Pricing
    //////////
    

    uberPrice.attr("style","margin-left:1em; margin-top:-.5em;height: 30px; width: 100px; background-size: cover");
    uberPrice.attr("class"," uberpricing");
          
    $(this).append(uberPrice);
    $(this).attr("id",bLatitude);


    // console.log(bLatitude);
    // console.log(bLongitude);
        
    if(ajaxinprocess === false) {
      ajaxinprocess = true;
      console.log("calling uber api");
        UberAPI();
    }
    else{
      console.log("Not calling uber api");
    }
  });

//////////////////
// Set up Uber API
//////////////////
  //https://www.thinkful.com/learn/uber-api/#Fetching-Time-Estimates-from-Uber
    // create placeholder variables
    var userLatitude;
    var userLongitude;
    var uberX = "uberX " ;
    var uberXL = "uberXL ";
    var uberSELECT = "uberSELECT";
    var uberestimatesDiv = $("<div>");
    var uberxP = $("<p>");
    var uberXLP = $("<p>");
    var uberSELECTP = $("<p>");

  function UberAPI (){

    var clientsecret = "yptEdY-aK8FgXvHh80nId9gTmwCYEqdjcreoIkP0";

    navigator.geolocation.watchPosition(function(position) {
    // Update latitude and longitude
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      // console.log("User Lat: " + userLatitude);
      // console.log("User Long: " + userLongitude);
      // console.log(bLatitude);
      // console.log(bLongitude);
      localStorage.setItem("Lat",userLatitude);
      localStorage.setItem("Long",userLongitude);

    });

    // Uber API Constants
    var uberClientId = "h31bv5vnzVyYRYhojvmy3tZdSd";
    var uberServerToken = "OiTtlcQ2FoqLvXQCCjlVI2Y319KLPoxOBSNFGsf4";
    
    var aLatitude = localStorage.getItem("Lat");
    var aLongitude = localStorage.getItem("Long");
 

    // console.log(bLatitude);
    // console.log(bLongitude);

   
    // Edwards Campus cords // var aLatitude = 38.8996479;  // var aLongitude = -94.7261206;
    // chicken n pickle's cords // var bLatitude = 39.1400216; // var bLongitude = -94.5799362;

    // navigator.geolocation.watchPosition(function(position) {
    // Query Uber API if needed
      getEstimatesForUserLocation(aLatitude, aLongitude);
    // });

    function getEstimatesForUserLocation(latitude,longitude) {
      uberproxy = "https://cors-anywhere.herokuapp.com/";
    uberqueryURL = uberproxy + "https://api.uber.com/v1/estimates/price";
        console.log(bLongitude);
        console.log(bLatitude); 
       

  
       var uberajax = $.ajax({    
          
      
        url: uberqueryURL,
        
        headers: {
            Authorization: "Token " + uberServerToken
        },
        data: {
            start_latitude: localStorage.getItem("Lat"),
            start_longitude: localStorage.getItem("Long"),
            end_latitude: bLatitude,
            end_longitude: bLongitude
        },
        

        success: function(result) {
          uberX = "uberX " + result.prices[0].estimate;
          uberXL = "uberXL " + result.prices[1].estimate;
          // uberSELECT = "uberSELECT " + result.prices[2].estimate;
          uberestimatesDiv = $("<div>");
          uberxP = $("<p>");
          uberxP.text(uberX);
          uberxP.attr("style","color: orange");
          uberXLP = $("<p>");
          uberXLP.text(uberXL);
          uberXLP.attr("style","color: orange");
          // uberSELECTP = $("<p>");
          // uberSELECTP.text(uberSELECT);

          uberestimatesDiv.append(uberxP);
          // uberestimatesDiv.append("<br>");
          uberestimatesDiv.append(uberXLP);
          // uberestimatesDiv.append("<br>");
          // uberestimatesDiv.append(uberSELECTP);
          uberPrice.empty();
          uberPrice.append(uberestimatesDiv);
          uberajax.abort();
        }

      })
       .done(function(){
          ajaxinprocess = false;  
          console.log("false");     
          console.log(ajaxinprocess);  
       })
    };
  }

////////////////////////////
//Add Uber Buttons in Agenda
////////////////////////////
  $(document).on("click", ".calendaradd", function(){ 
    navigator.geolocation.watchPosition(function(position) {
    // Update latitude and longitude
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      console.log("User Lat: " + userLatitude);
      console.log("User Long: " + userLongitude);
      localStorage.setItem("Lat",userLatitude);
      localStorage.setItem("Long",userLongitude);

    });
   
     var itemlat = $(this).parent().attr("lat");
     var itemlong = $(this).parent().attr("long");
     var venue = $(this).parent().attr("venue-name");
     var time = $(this).parent().children(".calinput").val();
     var address = $(this).parent().attr("address");
    database.ref("Voting").push(
      {
      name: venue,
      time: time,
      address: address,
      lat: itemlat,
      long: itemlong,
      upvote: 0,
      downvote: 0,
      counter: 0,
    });
  });

///////////////////
// List API Results
///////////////////
  ///////
  //CORS/
  ///////
    var name = "";
    var actDiv = "";

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

          name = results[i].name;
          actDiv = $("<div>");
          actDiv.addClass("resultDiv");

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
            imgDiv.addClass("wImg");

            //////////
            //add name
            //////////
            var nameDiv = $("<p>");
            nameDiv.text(name);
            nameDiv.attr("style","height: 30px");
            nameDiv.addClass("wName");

            ////////////////
            //button to link
            ////////////////
            var linkInput = $("<button>");
            linkInput.text("view site");
            linkInput.attr("style","height: 30px ; margin-left:.5em");
            linkInput.attr("class","btn btn-primary");
            linkInput.addClass("wWebsite");
            ///////////////////////////
            //button to add to calendar
            ///////////////////////////

            var calendarinpt = $("<input>");
            calendarinpt.attr("placeholder","What time?");
            calendarinpt.attr("style","height: 30px");
            calendarinpt.attr("data-counter", counter);
            calendarinpt.addClass("calinput");
            calendarinpt.addClass("wTime");

            var calendarbtn = $("<button>");
            calendarbtn.text("Add");
            calendarbtn.attr("style","height: 30px; margin-left:.5em");
            calendarbtn.attr("class","btn btn-danger calendaradd");
            calendarbtn.addClass("wAdd");
            //////////
            //Uber API
            //////////
            var uberBtn = $("<button>");

            uberBtn.attr("style","margin-left:.5em; height: 30px; width: 30px; background-size: cover; background: url(assets/images/UberButtons/button2.png) no-repeat");
            uberBtn.attr("class","btn btn-info uberbtn");
            uberBtn.attr("lat", results[i].geometry.location.lat);
            uberBtn.attr("long", results[i].geometry.location.lng);
            uberBtn.addClass("wUber");
          //add child divs to actDiv
          actDiv.prepend("<br>");
          actDiv.append(imgDiv);
          actDiv.append(nameDiv);
          actDiv.append("<br>");
          actDiv.append("<br>");
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
  // $(document).on('click', '.calendaradd', function(){
  //    var tableRow = $("<tr>");
  //    var venue = $("<td>");
  //    var time = $("<td>");
  //    var address = $("<td>");
    
  //    var itemlat = $(this).parent().attr("lat");
  //    var itemlong = $(this).parent().attr("long");

  //    venue.html($(this).parent().attr("venue-name"));
  //    time.html($(this).parent().children(".calinput").val());
  //    time.addClass("item");
  //    address.html($(this).parent().attr("address"));
  //    tableRow.attr("lat",itemlat);
  //    tableRow.attr("long",itemlong);

  //    tableRow.append(venue);
  //    tableRow.append(time);
  //    tableRow.append(address);

  //    $(".calTBody").append(tableRow);

  // })


  var votingRef= database.ref("Voting");
  votingRef.on('value', function(snapshot){
    $(".calTBody").empty();
    snapshot.forEach(function(childSnapshot) {
      
     var tableRow = $("<tr>");
     var venue = $("<td>");
     var time = $("<td>");
     var address = $("<td>");
     var vote = $("<td>");
     var add = $("<td>");

     var yay = $("<button>");
     var yayCount = $("<span>");
     var nay = $("<button>");
     var addBtn = $("<button>");
     var nayCount = $("<span>");

     yay.addClass("btn btn-primary yesBtn");
     nay.addClass("btn btn-danger noBtn");
     addBtn.addClass("btn btn-success agendaButton");

     yayCount.html('&emsp;' + childSnapshot.val().upvote);
     nayCount.html('&emsp;' + childSnapshot.val().downvote);

     addBtn.html("&#9786;")
     yay.html("YES");
     yay.append(yayCount);
     nay.html("NO");
     nay.append(nayCount);
     addBtn.attr("venue",childSnapshot.val().name);
     addBtn.attr("address",childSnapshot.val().address);
     yay.attr("venue",childSnapshot.val().name);
     yay.attr("address",childSnapshot.val().address);
     nay.attr("venue",childSnapshot.val().name);
     nay.attr("address",childSnapshot.val().address);
     var itemlat = childSnapshot.val().lat;
     var itemlong = childSnapshot.val().long;
     venue.html(childSnapshot.val().name);
     time.html(childSnapshot.val().time);
     address.html(childSnapshot.val().address);
     address.addClass('smallAddress');

     vote.append(yay,nay);
     
     tableRow.append(venue);
     tableRow.append(time);
     tableRow.append(address);
     tableRow.append(vote);
     tableRow.append(addBtn);

     $(".calTBody").append(tableRow);
      });
    });

  $(document).on("click", "#clearcom", function(){
    $(".comments").val('');
  });

/////////////////////////////////////////
// Reset "Working Plan" and Search Fields
/////////////////////////////////////////
  $(document).on("click", ".calendaradd", function(){
    $("#workingPlan").empty()
    $("#activity-input").val('');
    $("#location-input").val('');
  });

/////////////////
//COMMENT SECTION
/////////////////
  $(document).on('keyup', function (e) {
    if (e.keyCode == 13 && $("#commdet").val() !== null && $("#commdet").val() !== '') {
          var userN = localStorage.getItem("nameduser");
    var commentN = $("#commdet").val().trim();
    var timeN = Date().trim().split("GMT",1);
    console.log(timeN);
    database.ref("Comments").push(
      {
      user: userN,
      time: timeN,
      comment: commentN,
    });
    }
  });
  $(document).on("click", "#entercom", function(){

    var userN = localStorage.getItem("nameduser");
    var commentN = $("#commdet").val().trim();
    var timeN = Date().trim().split("GMT",1);
    console.log(timeN);
    database.ref("Comments").push(
      {
      user: userN,
      time: timeN,
      comment: commentN,
    });
  });

  var commentRef= database.ref("Comments");
  commentRef.on('value', function(snapshot){
    $(".comment-data-table").empty();
    snapshot.forEach(function(childSnapshot) {
      
      // console.log(childSnapshot.val().Role);
      var newTR = $("<tr>");
      var newuser = $("<td>");
      var newtime = $("<td>");
      var newcomm = $("<td>");
      newcomm.attr("style","width: 70%");

      newuser.text(childSnapshot.val().user);
      newtime.text(childSnapshot.val().time);
      newcomm.text(childSnapshot.val().comment);
      
      newTR.append(newuser);
      newTR.append(newtime);
      newTR.append(newcomm);
      //console.log(newTR);
      newTR.addClass("commentRow");
      newuser.addClass("cUser");
      newtime.addClass("cTime");
      newcomm.addClass("cComm");

     $(".comment-data-table").prepend(newTR);
     $(".comments").val('');
      });
    });

  $(document).on("click", "#clearcom", function(){
    $(".comments").val('');
  });

//////////////
//Add Username
//////////////
  
    if(localStorage.getItem("nameduser") !== null && localStorage.getItem("nameduser") !== '') {
      $("#main-page").attr("style","display: block");
      $("#username-page").attr("style","display: none");
    }
    else {
      $(document).on("click", "#usernamesubmit", function(){
        if($("#username-input").val() !== null && $("#username-input").val() !== '') {
          localStorage.setItem("nameduser",$("#username-input").val());
          $("#main-page").attr("style","display: block");
          $("#username-page").attr("style","display: none");
        }
        else {
          $("#username-input").attr("placeholder","Good try! Enter a name.");
          var philipImg = $("<img>");
          philipImg.attr("src","assets/images/gifs/philip.gif");
          $("#username-page").append(philipImg);
          
        }
      });
    }

////////
//Voting
////////


  var newUpvote;

  var votedVenuesY = [];

  var votedVenuesN = [];

  if(localStorage.getItem('votedVenuesY') !== null && localStorage.getItem('votedVenuesY') !== "" ){
    votedVenuesY = JSON.parse(localStorage.getItem('votedVenuesY'));
  };

  if(localStorage.getItem('votedVenuesN') !== null && localStorage.getItem('votedVenuesN') !== "" ){
    votedVenuesN = JSON.parse(localStorage.getItem('votedVenuesN'));
  };

    $(document).on("click", ".yesBtn", function(){

            votedVenuesY.push($(this).attr("venue"));

            localStorage.setItem("votedVenuesY", JSON.stringify(votedVenuesY) );

            var venueName = $(this).attr("venue");

            var hasVoted = false;

            for(i=0; i<votedVenuesY.length -1; i++){
                var venue = votedVenuesY[i];
                if(venue === venueName){
                  hasVoted = true;
                }
            };

            if(hasVoted === true){

            }
            else{
            
                database.ref().child('Voting').orderByChild("name").equalTo(venueName).once("value", function(snapshot) {
                  console.log(snapshot.val())
                  snapshot.forEach(function(childSnap){
                    
                    console.log(childSnap.val());
                        var childName = childSnap.key;
                        var oldUpvote = childSnap.val().upvote;
                        newUpvote = oldUpvote + 1;
                        console.log(newUpvote);
                        updateVotesY(newUpvote, venueName, childName);

                          function updateVotesY(newUpvote, venueName, childName){
                              
                              var postData = {
                                  upvote: newUpvote,
                              };

                              var venueRef = database.ref().child('Voting').child(childName);

                              venueRef.update(postData);
                          };


                  });
                });
            };  
    });




    $(document).on("click", ".noBtn", function(){

            votedVenuesN.push($(this).attr("venue"));
            console.log("hi");
            localStorage.setItem("votedVenuesN", JSON.stringify(votedVenuesN) );

            var venueName = $(this).attr("venue");

            var hasVoted = false;

            for(i=0; i<votedVenuesN.length -1; i++){
                var venue = votedVenuesN[i];
                if(venue === venueName){
                  hasVoted = true;
                }
            };

            if(hasVoted === true){
                console.log("hi");
            }
            else{
            
                database.ref().child('Voting').orderByChild("name").equalTo(venueName).once("value", function(snapshot) {
                  console.log(snapshot.val())
                  snapshot.forEach(function(childSnap){
                    
                    console.log(childSnap.val());
                        var childName = childSnap.key;
                        var oldDownvote = childSnap.val().downvote;
                        newDownvote = oldDownvote + 1;
                        console.log(newDownvote);
                        updateVotesN(newDownvote, venueName, childName);

                          function updateVotesN(newDownvote, venueName, childName){
                              
                              var postData = {
                                  downvote: newDownvote,
                              };

                              var venueRef = database.ref().child('Voting').child(childName);

                              venueRef.update(postData);
                          };


                  });
                });
            };  
    });

    $(document).on("click", ".agendaButton", function(){

          var venueName = $(this).attr("venue");

          database.ref().child('Voting').orderByChild("name").equalTo(venueName).once("value", function(snapshot) {
                  console.log(snapshot.val());
                  snapshot.forEach(function(childSnap){

                      console.log(childSnap.val());
                      console.log(childSnap.val().name);
                      var childName = childSnap.key;
                      var venueA = childSnap.val().name;
                      var addressA = childSnap.val().address;
                      var timeA = childSnap.val().time;

                      database.ref("Agenda").push({
                        venue: venueA,
                        address: addressA,
                        time: timeA
                      });
                  });
          });
    });

    var agendaRef= database.ref("Agenda");
    agendaRef.on('value', function(snapshot){
          $(".agendaTable").empty();
          snapshot.forEach(function(childSnapshot) {

          var agendaRow = $("<tr>");
          var venue = $("<td>");
          var address = $("<td>");
          var time = $("<td>");
          var deletee = $("<td>");
          var delBtn = $("<button>");

          console.log(childSnapshot.val().venue);

          venue.html(childSnapshot.val().venue);
          address.html(childSnapshot.val().address);
          time.html(childSnapshot.val().time);

          agendaRow.append(venue);
          agendaRow.append(address);
          agendaRow.append(time);

          $(".agendaTable").append(agendaRow);
        });
  });

//////////////////////////////////
// Send text if Firebase changes//
//////////////////////////////////
  //https://dashboard.emailjs.com/
  //https://dashboard.emailjs.com/integration
  var sendText= database.ref("Comments");
   sendText.on("click", "#entercom", function(snapshot){

  (function(){
      emailjs.init("user_VUMzeodvx1oP9NTzNsO7c");
      var service_id = 'gmail';
      var template_id = 'didthiswork';
      var template_id2 = 'renee';
      var template_id3 = 'jacob';
      var template_params = {
      name: 'SaturYAY',
      reply_email: 'ben.m.newell@gmail.com',
      message: 'HAI!'
      };

     emailjs.send(service_id,template_id,template_params);
      emailjs.send(service_id,template_id2,template_params);
      emailjs.send(service_id,template_id3,template_params);
   })();

  });