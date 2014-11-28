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

function getOptions() {
    return {
        maxVisits: 1
    };
}

function inject() {
    chrome.tabs.executeScript(null, {
        file: 'bower_components/jquery/dist/jquery.min.js'
    }, function() {
        chrome.tabs.executeScript(null, {
            file: 'scripts/linkedin.js'
        }, function() {
            var options = getOptions();
            sendMessage(options);
        });
    });
}

function sendMessage(options) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, options);
    });
}

function enableButton() {
    document.getElementById('start').disabled = true
}

document.addEventListener('DOMContentLoaded', function() {
    $('#route').addClass('animated bounce');
    document.getElementById('route').onclick = route;
    document.getElementById('start').onclick = start;
});
