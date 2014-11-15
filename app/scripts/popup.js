'use strict';

function run() {
    chrome.tabs.getSelected(function(tab) {
        var tabUrl = encodeURIComponent(tab.url);
        var tabTitle = encodeURIComponent(tab.title);
        chrome.tabs.update(tab.id, {
            url: 'https://www.linkedin.com/people/pymk'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('run').onclick = run;
});
