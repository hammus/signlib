/**
 * Created by Liam on 26/07/2015.
 */


describe('Person', function() {
   var Person, visitor;

    beforeEach(module('myApp'));

    // Give a test value to the modules so there's something to test
    beforeEach(module(function($provide) {
        visitor = {};
        $provide.value('visitor', visitor);
    }));

    // Get the Service from Angular and store it locally so we can test it
    beforeEach(inject(function(_Person_) {
        Person = _Person_;
    }));

    describe('Constructor', function() {
        it('assigns a name', function() {
           expect(new Person('Liam')).to.have.property('name', 'Liam');
        });
    });

    describe("#greet", function() {
       it('greet AU visitors formally', function() {
           visitor.country = "AU";
           expect(new Person('Leemo').greet()).to.equal('G\'day, Leemo ya cunt.');
       })
    });
});