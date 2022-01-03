/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

console.log("BACKGROUND SCRIPT CHECK!!!!!")
window.browser = require("webextension-polyfill");

const Rally = require("@mozilla/rally");
const rally = new Rally();

// ... Add more implementation here!

const ExampleModule = require('./ExampleModule');
ExampleModule.initialize();

// rally.initialize(
//   // A sample key id used for encrypting data.
//   "sample-invalid-key-id",
//   // A sample *valid* JWK object for the encryption.
//   {
//     "kty":"EC",
//     "crv":"P-256",
//     "x":"f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
//     "y":"x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
//     "kid":"Public key used in JWS spec Appendix A.3 example"
//   }
// );
rally.initialize(
  // A sample key id used for encrypting data.
  "sample-invalid-key-id",
  // A sample *valid* JWK object for the encryption.
  {
    "kty":"EC",
    "crv":"P-256",
    "x":"f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
    "y":"x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    "kid":"Public key used in JWS spec Appendix A.3 example"
  }
);

const MyClass = require("./geolocation");

function continueExecution() {
  // Let's return a new Promise, promising to eventually return a value
  return new Promise((resolve) => {
      setTimeout(() => {
          if (!rally._initialized) {
              resolve(continueExecution())
          }
          else {
              resolve("initialization complete")
          }
      }, 5000)
  })
}


async function abc(){
  await continueExecution();
  // MyClass.myFunc1()
  // MyClass.myFunc2()
  // console.log( MyClass.myFunc1())
  console.log(await MyClass.main())
  // console.log(geo_value)
  console.log("end")
  // console.log(rally._initialized)
  // rally.sendPing("geolocation", "test string")
  }
  
 abc();
// rally.sendPing("geolocation", MyClass.getGeolocation())

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        console.log('Tab %d got new URL: %s', tabId, changeInfo.url);
    }
});