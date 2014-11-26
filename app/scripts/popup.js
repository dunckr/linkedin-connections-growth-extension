'use strict';

var page = 'https://www.linkedin.com/people/pymk';

function route() {
    chrome.tabs.update(null, {
        url: page
    });
    enableButton();
}

function start() {
    chrome.tabs.getSelected(null, function(tab) {
        if (tab.url !== page) {
            route();
        } else {
            inject();
        }
    });
}

function inject() {
    chrome.tabs.executeScript(null, {
        file: 'bower_components/jquery/dist/jquery.min.js'
    }, function() {
        chrome.tabs.executeScript(null, {
            file: 'scripts/linkedin.js'
        }, function() {
            // should probably set maxtimes to visit
            //chrome.tabs.sendRequest(tabId, {scriptOptions: {param1:'value1',param2:'value2'}}, function(){
        });
    });
}

function enableButton() {
    // enable the start button
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('route').onclick = route;
    document.getElementById('start').onclick = start;
});
