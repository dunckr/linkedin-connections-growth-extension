(function() {
    'use strict';

    describe('linkedin', function() {

        var linkedin = new Linkedin();

        beforeEach(function() {;
        });

        describe('.userEls', function() {
            it('lists elements representing the users', function() {
                //expect(linkedin.userEls().length).to.be();
            });
        });

        describe('.extractUser', function() {
            it('scrapes user information from element', function() {
                var el = linkedin.userEls()[0];
                expect(linkedin.extractUser(el)).to.eql({
                    '111111': {
                        name: 'Bob Random'
                    }
                });
                var el = linkedin.userEls()[1];
                expect(linkedin.extractUser(el)).to.eql({
                    '22222': {
                        name: 'Joe Bloggs'
                    }
                });
            });
        });

        describe('.getNewUsers', function() {
            it('scrapes all users from document', function() {
                expect(linkedin.getNewUsers()).to.eql({
                    '111111': {
                        name: 'Bob Random'
                    },
                    '22222': {
                        name: 'Joe Bloggs'
                    }
                });
            });
        });

    });
})();
