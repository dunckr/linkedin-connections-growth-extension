'use strict';

var Linkedin = function(options) {
    this.maxVisits = options.maxVisits || 2;
};

Linkedin.prototype.run = function() {
    //this.nextUsers();
    var newUsers = this.getNewUsers();
    this.harvesting(newUsers, this.shouldVisit);
};

Linkedin.prototype.harvesting = function(newUsers, done) {
    this.getAll(function(exisitingUsers) {
        var users = $.extend(true, exisitingUsers, newUsers);
        this.save(users, function() {
            done(users);
        });
    });
};

Linkedin.prototype.shouldVisit = function(users) {
    var _this = this,
        toVisit = [];
    $.each(users, function(key, user) {
        if (user.numberOfVisits === undefined) {
            toVisit.push(user.id);
            users[key].numberofvisits = 1;
        } else if (user.numberOfVisits < this.maxVisits) {
            toVisit.push(user.id);
            users[key].numberofvisits += 1;
        }
    });
    this.visit(toVisit);
    this.save(users, function() {
        done(users);
        _this.completed();
    });
};

Linkedin.prototype.userEls = function() {
    return $('.entityblock');
};

Linkedin.prototype.getNewUsers = function() {
    var $els = this.userEls();
    var users = {};
    var _this = this;
    $.each($els, function(key, el) {
        var user = _this.extractUser(el);
        $.extend(users, user);
    });
    return users;
};

Linkedin.prototype.extractUser = function(el) {
    var $el = $(el),
        url = $el.find('.image').attr('href'),
        id = url.match(/[?id]=([^&]*)/)[1];
    var user = {};
    user[id] = {
        name: $el.find('.title').prop('title'),
    };
    return user;
};

Linkedin.prototype.nextUsers = function() {
    $(window).scrollTop($(document).height());
};

Linkedin.prototype.save = function(item, done) {
    chrome.storage.local.set(item, done);
};

Linkedin.prototype.get = function(item, done) {
    chrome.storage.local.get(item, done);
};

Linkedin.prototype.getAll = function(done) {
    this.get(null, done);
};

Linkedin.prototype.visit = function(ids) {
    this.send({
        status: 'visit',
        toVisit: ids
    });
};

Linkedin.prototype.completed = function() {
    this.send({
        status: 'completed'
    });
};

Linkedin.prototype.send = function(message) {
    chrome.runtime.sendMessage(message);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.status === 'options') {
        var linkedin = new Linkedin(request);
        linkedin.run();
    }
});
