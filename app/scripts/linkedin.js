'use strict';

var Linkedin = function() {};

Linkedin.prototype.run = function() {
    // add extra ones?
    this.nextUsers();
    // might need to get all and add harvested ones

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
    var _this = this;
    $.each(users, function(key, user) {
        if (user.numberOfVisits === undefined) {
            //
            // _this.viist key
            // users[key] .numberofvisits = 1
        } else if (user.numberOfVisits < MAX_VISITS) {
            // _this.viist key
            // users[key] .numberofvisits = ++
        }
    });
    // completed!
    // send notification that has done
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

Linkedin.prototype.visit = function(id, done) {
    var url = 'https://www.linkedin.com/profile/view?id=' + id;
    // chrome.tabs.create(
    // chrome.tabs.remove
    done();
};

var linkedin = new Linkedin();
linkedin.run();
