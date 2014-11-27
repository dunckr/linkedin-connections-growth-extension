(function() {
    'use strict';

    describe('linkedin', function() {

        describe('.getUsers', function() {

            beforeEach(function() {


            });
            xit('return object list of users from document', function() {
                expect(1).toBe(1);
            });
        });

        describe('.extractUser', function() {

            it('scrapes user information from element', function() {
                var el = '<div class="entityblock profile"><a href="https://www.linkedin.com/profile/view?id=99999&amp;authType=name&amp;authToken=BCxr&amp;trk=connect_hub_pymk_profile_photo" target="_blank" class="image"><img width="178" height="178" src="https://media.licdn.com/mpr/mpr/shrink_180_180/p/1/000/052/1fd/000009.jpg" alt=""></a><div class="content"><div class="profile-info"><div class="name-wrapper"><h4 class="name"><a class="title" href="https://www.linkedin.com/profile/view?id=99999&amp;authType=name&amp;authToken=BCxr&amp;trk=connect_hub_pymk_profile_name" title="Joe Bloggs">Joe Bloggs<span class="a11y-headline">Managing Director</span></a></h4></div><p class="headline"><span title="Managing Director, at R US</span></p></div><div class="email-confirm"><p class="title">Invite Joe to connect</p><p class="extra">Joe\'s email address:</p><label class="screen-reader-text" for="email-confirm-999999">Confirm your email</label><input type="text" class="email-input" data-firstname="Simon" data-lastname="Bloggs" id="email-confirm-99999"><button class="email-tooltip" data-tooltip="Why do I have to enter an email address when I send an Invitation?"></button></div></div><button class="bt-incommon" data-act="incommon" data-name="Joe Bloggs" title="You share 2 contacts with Joe Bloggs" data-shared-connection-url="https://www.linkedin.com/people/contacts-pymk-shared-conns?_ed=0_eeyKfYBClvSemdnsRp4rGC7Altgm2h39mpMDSbxzQER&amp;csrfToken=ajax%3A0881981182452928747&amp;goback=%2Epyk_*1_*1_*1_*1" data-see-all-url="/profile/connections?id=9999&amp;tab=S"><span aria-hidden="true" class="glyph"></span><span class="glyph-text">2</span><span class="screen-reader-text">You share 2 contacts with Joe Bloggs</span></button></div>';
                var linkedin = new Linkedin();
                expect(linkedin.extractUser(el)).to.eql({
                    id: "99999",
                    name: 'Joe Bloggs'
                });
            });
        });
    });
})();
