'use strict';

var a = 0;

function count() {
    a = a + 2;
    document.getElementById('demo').textContent = a;
    chrome.tabs.getSelected(function(tab) {
        //Your code below...
        var tabUrl = encodeURIComponent(tab.url);
        var tabTitle = encodeURIComponent(tab.title);
        chrome.tabs.update(tab.id, {
            url: "https://www.google.com"
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('dom content loaded!');
    //document.getElementById('begin').addEventListener('click', clickHandler);
    document.getElementById('do-count').onclick = count;
});


//function click(e) {
//chrome.tabs.executeScript(null, {
//code: "document.body.style.backgroundColor='" + e.target.id + "'"
//});
//window.close();
//}

//document.addEventListener('DOMContentLoaded', function() {
//console.log('loaded...');
//var divs = document.querySelectorAll('div');
//for (var i = 0; i < divs.length; i++) {
//divs[i].addEventListener('click', click);
//}
//});

//console.log('this has loaded i recon...');

//function clickHandler(e) {
//console.log('we have clicked the button!');
////chrome.extension.sendMessage({
////directive: "popup-click"
////}, function(response) {
////this.close(); // close the popup when the background finishes processing request
////});
//}

//document.addEventListener('DOMContentLoaded', function() {
//console.log('dom content loaded!');
//document.getElementById('begin').addEventListener('click', clickHandler);
//});

//document.getElementById("begin").addEventListener('click', clickHandler);
