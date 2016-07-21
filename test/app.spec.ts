///<reference path="../typings/index.d.ts"/>

chai.should();

describe('people controller', () => {

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    })

    it('dummy', () => {
        true.should.equal(false)
    })

    it('should init', () => {
        controller = $controller('PeopleCtrl');
        controller.should.exist
    })
}) 