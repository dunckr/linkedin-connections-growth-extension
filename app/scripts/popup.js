'use strict';

function setLocation(done) {
    chrome.tabs.update(null, {
        url: 'https://www.linkedin.com/people/pymk'
    }, done);
}

function loadScripts() {
    chrome.tabs.executeScript(null, {
        file: 'bower_components/jquery/dist/jquery.min.js'
    });
    chrome.tabs.executeScript(null, {
        file: 'scripts/linkedin.js'
    });
    window.close();
}

function click() {
    setLocation(function() {
        loadScripts();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('run').onclick = click;
});
