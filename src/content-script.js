/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

window.browser = require("webextension-polyfill");
// console.log("checking demo");
// ... Add more implementation here!

// console.debug("Running content script");

function parseHomePage()
{
        //console.log("in homepage object")
    
        var homepage = {}
        //console.log("4444");
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        //console.log("7777777777");
        //console.log(document.all[0].outerHTML);
        /*var sections = document.querySelector("ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer")
        //console.log("sections")
        //console.log(sections)
        //title = document.querySelector("#title-text > span").textContent
        //console.log("title")
        //console.log(title)*/

        var sections = document.querySelectorAll("ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer")
        //console.log("len of sections: " + sections.length)
        for (var i = 0; i < sections.length; i++) {
            //console.log(i)
            title1 = sections[i].querySelector("#title").textContent
            //console.log(title1)
            var videos_in_pannel = sections[i].querySelectorAll("#video-title-link")
            if (videos_in_pannel.length == 0)
              continue
                // videos_in_pannel = sections[i].querySelectorAll("a.yt-simple-endpoint.style-scope.ytd-rich-grid-movie")
            //console.log("len of videos: " + videos_in_pannel.length)
            // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            var pannel_dict = {}
            if (videos_in_pannel.length != 0)
               for (var j = 0; j < videos_in_pannel.length; j++) {
                   var tmp = {};
                   tmp['title'] = videos_in_pannel[j].getAttribute("title")
                   tmp['url'] = videos_in_pannel[j].getAttribute("href")
                   pannel_dict[j] = tmp
               }
           //console.log(pannel_dict)
           homepage[title1] = pannel_dict


        }
        //console.log(homepage)
        // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        var videos= document.querySelectorAll("ytd-rich-item-renderer.style-scope.ytd-rich-grid-renderer")
        //console.log("len of videos: " + videos.length)
        var videos_dict = {};
        for (var i = 0; i < videos.length; i++) {
            if(!videos[i].querySelector("#video-title-link"))
              continue
            // console.log(videos[i].querySelector("#video-title-link"))
            title_v = videos[i].querySelector("#video-title-link").getAttribute("title")
            // console.log(title_v)
            url_v = videos[i].querySelector("#video-title-link").getAttribute("href")
            // console.log(url_v)
            var tmp = {};
            tmp['title'] = title_v
            tmp['url'] = url_v
            videos_dict[i] = tmp
        }
  

        //console.log(videos_dict)
        homepage["videos"] =  videos_dict
        console.log("Homepage object")
        console.log(homepage)
}


function parseSearchResults()
{
    var videos = document.querySelectorAll("a#video-title")
    console.log("number of videos: " + videos.length)
    var search_results = {};
    for (var j = 0; j < videos.length; j++) {
        var tmp = {};
        //console.log(videos[j])
        //console.log("bb "+ videos[j].getAttribute("title"))
        tmp['title'] = videos[j].getAttribute("title")
        tmp['url'] = videos[j].getAttribute("href")
        search_results[j] = tmp
    }
    console.log(search_results)
}


function parseVideoPage() {
  console.log("title: " + document.querySelectorAll("h1.style-scope.ytd-video-primary-info-renderer")[0].querySelector("yt-formatted-string.style-scope.ytd-video-primary-info-renderer").textContent)
}

function youtubeNavigation()
{
    var queryString = window.location.search;
    var currentUrl = window.location.href;
    var timeStamp = new Date();
    console.log("\n")
    console.log("Page information:");
    console.log("URL: " + currentUrl);
    console.log("Timestamp: " + timeStamp.toString());
    //console.log(window.location.pathname)
    // getGeolocation()
    switch(window.location.pathname)
    {
        case "/watch":
            console.log("Video playback page")
            parseVideoPage()
            break;
        case "/results":
            //Search results page
            var urlParams = new URLSearchParams(queryString);
            console.log("Search Reults Page Information")
            console.log(urlParams.toString());

            //Search results loaded
            //var searchResultsClassElements = document.getElementsByClassName("ytd-item-section-renderer");
            //var searchResultsHead = searchResultsClassElements.namedItem("contents");
            //var searchResults = searchResultsHead.getElementsByTagName("ytd-video-renderer");
            //var searchResultsArray = Array.prototype.slice.call(searchResults);
            // console.log("Search Results Object");
            parseSearchResults()

            break;
        case "/":
            //Homepage, no extension
            //console.log("Homepage");
            parseHomePage();    
            break;
        default:
            //treat same as homepage
            break;

    }
}


//Adds event listener to youtube page since youtube uses a push model
//and content scripts will not run on repeat navigation within youtube
(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'transform' && event.target.id === 'progress') {
        //console.log(document)
        //youtubeNavigation();
    }
}, true);

// After page load
//youtubeNavigation();


window.addEventListener('load', function () {
    // console.log('load');
    //async wait (function triggered after couple of seconds)
    youtubeNavigation();
});

window.addEventListener('yt-page-data-updated', function () {
    // console.log('url change');
    youtubeNavigation();
});

/*Notes
tab id

*/

