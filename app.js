  
    function getACValue() {
      var uiAc = document.getElementsByName("uiA.C");
      for(var i in uiAc) {
        if(uiAc[i].checked) {
            return parseInt(i)+1;
        }
      }
      return -1; // Invalid Value
    }
  
    function getWifiValue() {
      var uiWifi = document.getElementsByName("uiWifi");
      for(var i in uiWifi) {
        if(uiWifi[i].checked) {
            return parseInt(i)+1;
        }
      }
      return -1; // Invalid Value
    }
  
    function getLiftValue() {
      var uiLift = document.getElementsByName("uiLift");
      for(var i in uiLift) {
        if(uiLift[i].checked) {
            return parseInt(i)+1;
        }
      }
      return -1; // Invalid Value
    }
  
    function getSecurityValue() {
      var uiSecurity = document.getElementsByName("uiSecurity");
      for(var i in uiSecurity) {
        if(uiSecurity[i].checked) {
            return parseInt(i)+1;
        }
      }
      return -1; // Invalid Value
    }
  function getParkingValue() {
    var uiParking = document.getElementsByName("uiParking");
    for(var i in uiParking) {
      if(uiParking[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var Parking = getParkingValue();
    var AC = getACValue();
    var Wifi = getWifiValue();
    var Lift = getLiftValue();
    var Security = getSecurityValue();
    var location = document.getElementById("uiLocations");
    var area = document.getElementById("uiarea");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
     var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        sqft: parseFloat(sqft.value),
        city: location.value,
        area: area.value,
        bhk: bhk,
        park: Parking,
        ac: AC,
        wifi: Wifi,
        lift: Lift,
        security: Security,



    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
  
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_city_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_city_names request");
        if(data) {
            var locations = data.city;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }

  function onPageLoad1() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_area_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_area_names request");
        if(data) {
            var area = data.city;
            var uiarea = document.getElementById("uiarea");
            $('#uiarea').empty();
            for(var i in area) {
                var opt = new Option(area[i]);
                $('#uiarea').append(opt);
            }
        }
    });
  }
  
  window.onload = function() {
      onPageLoad();
      onPageLoad1();
  }
  