///<reference path="../typings/index.d.ts"/>

chai.should();

describe('people controller', () => {

    beforeEach(function() {
        bard.appModule('app.people');
        bard.inject(this, '$controller', '$rootScope');
    })

    it('dummy', () => {
        true.should.equal(true)
    })

    it('should init', () => {
        controller = $controller('PeopleCtrl');
        controller.should.exist
    })
}) 