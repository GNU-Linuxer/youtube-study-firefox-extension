var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

module.exports = {
    myFunc1() {
      // console.log("Testing!");
      return "Testing"
    },
    myFunc2() {
        return (options);
      },
      getAddress (latitude, longitude) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            var method = 'GET';
            var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+ latitude + '&longitude='+ longitude + '&localityLanguage=en'
    
            var async = true;
            request.open(method, url, async);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    //console.log(request.status)
                    if (request.status == 200) {
                        var data = JSON.parse(request.responseText);
                        //console.log(data)
                        var city = data.city;
                        // console.log("city: " + city);
                        var state = data.principalSubdivision;
                        // console.log("state: " + state);
                        var country = data.countryCode
                        // console.log("country: " + country);
                        return data;
                    }
                    else {
                        reject(request.status);
                    }
                }
            };
            request.send();
        });
    },
    
    success(pos) {
        var crd = pos.coords;
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        //console.log(`More or less ${crd.accuracy} meters.`);
        var lat = crd.latitude
        var lon = crd.longitude
        // b = module.exports.getAddress(lat, lon).then(value=>{return value}).catch(console.error);
        // console.log(b)
        resolve(lat,lon)
      },
      
      error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      
      getGeolocation() {
        return new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(function(pos){
              lat = pos.coords.latitude
              lon = pos.coords.longitude
              resolve({lat,lon});
          }) 
      })
      },

      async main() {
        value = await module.exports.getGeolocation(); // wait for getPosition to complete
        // console.log("hhhhhhhhhhhh")
        // console.log(value)
        return value;
    }
  }

  
