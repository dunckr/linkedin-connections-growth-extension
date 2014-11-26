'use strict';

var Linkedin = function() {};

Linkedin.prototype.run = function() {
    this.nextUsers();
    var users = this.getUsers();
    this.harvesting(users);
    // once harvested new users
    // vist the ones that shouldvisit
};

// determining whether should save or not?
Linkedin.prototype.harvesting = function(users) {
    //$.map(users, )
    // check if they exist
    // if not then save them
    this.get(users[0], function(data) {
        if (chrome.extension.lastError) {
            console.warn("lastError:" + chrome.extension.lastError.message);
        } else {
            console.log(data);
        }
    });
};

Linkedin.prototype.shouldVisit = function(users) {
    // if visit < 0
};

Linkedin.prototype.getUsers = function() {
    var $els = $('.entityblock');
    return $.map($els, this.extractUser);
};

Linkedin.prototype.extractUser = function(el) {
    var $el = $(el),
        url = $el.find('.image').attr('href');
    return {
        id: url.match(/[?id]=([^&]*)/)[1],
        name: $el.find('.name').text(),
    };
};

Linkedin.prototype.nextUsers = function() {
    $(window).scrollTop($(document).height());
};

Linkedin.prototype.save = function(item, done) {
    chrome.storage.sync.set(item, done);
};

Linkedin.prototype.get = function(item, done) {
    chrome.storage.sync.get(item, done);
};

Linkedin.prototype.sync = function(item, done) {
    chrome.storage.sync.get(item, done);
};

// chrome.tabs.remove
// chrome.tabs.create(

var linkedin = new Linkedin();
linkedin.run();
