'use strict';

var page = 'https://www.linkedin.com/people/pymk',
    connectionPage = 'https://www.linkedin.com/profile/view?id=';

function visit(ids, done) {
    $.each(ids, function(key, id) {
        var url = connectionPage + id;
        chrome.tabs.create({
            active: false,
            url: url
        }, function(tab) {
            //closeTabs(tab.id);
        });
    });
    stopSpinner();
}

function closeTabs(tabs) {
    chrome.tabs.remove(tabs);
}

function start() {
    chrome.tabs.getSelected(null, function(tab) {
        if (tab.url !== page) {
            route();
        } else {
            showSpinner();
            inject();
        }
    });
}

function getOptions() {
    var maxVisits = $('.input select').val();
    return {
        status: 'options',
        maxVisits: maxVisits
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

document.addEventListener('DOMContentLoaded', function() {
    $('.settings').click(function() {
        $('.main').toggle();
        $('.options').toggle();
    });
    animateHover($('.settings'), 'pulse');
    animateHover($('.twitter'), 'pulse');
    visitLinkedin();
});

function visitLinkedin() {
    onLinkedin(function(result) {
        // NOT on LinkedIn
        if (result) {
            $('#route')
                .removeClass('disabled')
                .addClass('animated bounce')
                .click(route);
            animateHover($('#route'), 'pulse');
            $('.status').text('Need to visit the PYMK LinkedIn page');
            // On LinkedIn
        } else {
            $('.spinner').show();
            $('#start span').text('');
            $('.status').text('Loading in files');
            setTimeout(function() {
                $('.spinner').hide();
                $('#start span').text('Grow Connections');
                $('#route')
                    .addClass('disabled')
                    .unbind('click mouseenter mouseleave');
                $('#start')
                    .removeClass('disabled')
                    .addClass('animated bounce')
                    .click(start);
                animateHover($('#start'), 'pulse');
                $('.status').text('Ready when you are');
            }, 2000);
        }
    });
}

function route() {
    chrome.tabs.update(null, {
        url: page
    });
    visitLinkedin();
}

function onLinkedin(done) {
    chrome.tabs.getSelected(null, function(tab) {
        done(tab.url !== page);
    });
}

function showSpinner() {
    $('.spinner').show();
    $('#start span').text('');
    $('.status').text('Visiting new profile pages');
}

function stopSpinner() {
    $('.spinner').hide();
    $('#start span').text('Completed');
    animateHover($('.twitter'), 'shake');
    $('#start').unbind().click(function() {
        $('.main').hide();
        $('.options').show();
    });
    $('.status').text('Done! If you want more you can try scrolling down the page for more users or refreshing.');
}

function animateHover($el, animation) {
    $el.hover(
        function() {
            $el.addClass('animated ' + animation);
        },
        function() {
            window.setTimeout(function() {
                $el.removeClass('animated ' + animation);
            }, 500);
        }
    );
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.status === 'completed') {
            stopSpinner();
        }
        if (request.status === 'visit') {
            visit(request.toVisit, function(tabs) {
                closeTabs(tabs);
            });
        }
    }
);
