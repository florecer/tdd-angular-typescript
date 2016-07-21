///<reference path="../typings/index.d.ts"/>

/**
 * app main module
*/
namespace app {
    angular.module('minimalApp', [
        'app.core'
        , 'app.home'
        , 'app.about'
        , 'app.people'
    ]);
}

/** 
 * app core module
*/
namespace app.core {
    angular.module('app.core', ['ui.router']);
}

/**
 * app core routes { 404 }
*/
namespace app.core {
    angular
        .module('app.core')
        .config(route_states);

    function route_states(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        $urlRouterProvider.otherwise('/404');

        var states = [
            {
                state: '404',
                config: {
                    url: '/404',
                    template: `<section id="dashboard-view" class="mainbar">
                        <section class="matter">
                            <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                <ul class="today-datas">
                                    <li class="bred">
                                    <div class="pull-left"><i class="fa fa-warning"></i></div>
                                    <div class="datas-text pull-right">
                                        <a><span class="bold">404</span></a> Page Not Found
                                    </div>
                                    <div class="clearfix"></div>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="widget wblue">
                                <div ht-widget-header title="Page Not Found" allow-collapse="true"></div>
                                <div class="widget-content text-center text-info">
                                    <div class="container">
                                    No soup for you!
                                    </div>
                                </div>
                                <div class="widget-foot">
                                    <div class="clearfix"></div>
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </section>
                    </section>`,
                    title: '404'
                }
            }
        ]

        states.forEach(state => {
            $stateProvider.state(state.state, state.config);
        })
    }
}

namespace app.core {

    type ngPromise = () => ng.IPromise<any>
    type successReturn = (response: any) => Object
    type errorReturn = (error: any) => Object
    export interface IDataService {
        getPeople: ngPromise
    }

    /**
     * DataService
     */
    class DataService implements IDataService {
        static $inject: Array<string> = [
            '$http', '$timeout', '$q' /*, 'exception', 'logger'*/];

        constructor(private $http: ng.IHttpService,
            private $timeout: ng.ITimeoutService,
            private $q: ng.IQService) {
            console.log('data-service');

        }

        getPeople: ngPromise = () => {
            console.log('getting people');

            return this.$timeout(() => {
                console.log('2000 ms end');
                return { data: ['mucha', 'people', '2s'] }
            }, 2000)
                .then(this.happen)
                .catch(this.fail)
        }


        private happen: successReturn = response => {
            console.log('i get people :) after 2sec');
            if (!response.data) {
                return this.$q.reject('no response.data')
            }
            return response.data
        }
        private fail: errorReturn = error => {
            console.log('dataservice people fail');
            return this.$q.reject(error)
        }
    }

    angular
        .module('app.core')
        .service('dataservice', DataService)
}
/**
 * app home module
*/
namespace app.home {
    angular.module('app.home', ['app.core']);
}

/**
 * app home routes
*/
namespace app.home {
    angular
        .module('app.home')
        .config(route_states);

    function route_states(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        var states = [
            {
                state: 'home',
                config: {
                    url: '/home',
                    template: `<div class="jumbotron text-center">
                                    <h1>The Homey Page</h1>
                                    <p>This page demonstrates <span class="text-danger">nested</span> views.</p>  

                                    <a ui-sref=".list" class="btn btn-primary">List</a>
                                    <a ui-sref=".paragraph" class="btn btn-danger">Paragraph</a>
                                </div>

                                <div ui-view></div>`
                }
            }
            , {
                state: 'home.list',
                config: {
                    url: '/list',
                    template: `<ul>
                                <li ng-repeat="dog in dogs">{{ dog }}</li>
                            </ul>`,
                    controller: 'HomeController'
                }
            }
            , {
                state: 'home.paragraph',
                config: {
                    url: '/paragraph',
                    template: 'I could sure use a drink right now.'
                }
            }
        ]

        states.forEach(state => {
            $stateProvider.state(state.state, state.config);
        })
    }
}

/**
 * app home controller
*/
namespace app.home {
    /**
     * HomeCtrl
     */
    interface homeScope extends ng.IScope {
        dogs: Array<string>
    }

    class HomeCtrl {
        static $inject = ['$scope']
        constructor($scope: homeScope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    }

    angular
        .module('app.home')
        .controller('HomeController', HomeCtrl);
}

/**
 * app about module
*/
namespace app.about {
    angular
        .module('app.about', ['app.core'])
}

/**
 * app about routes
*/
namespace app.about {
    angular
        .module('app.about')
        .config(route_states)

    function route_states(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        var states = [
            {
                state: 'about',
                config: {
                    url: '/about',
                    views: {

                        // the main template will be placed here (relatively named)
                        '': {
                            template: `<div class="jumbotron text-center">
                                        <h1>The About Page</h1>
                                        <p>This page demonstrates <span class="text-danger">multiple</span> and <span class="text-danger">named</span> views.</p>
                                    </div>

                                    <div class="row">

                                        <!-- COLUMN ONE NAMED VIEW -->
                                        <div class="col-sm-6">
                                            <div ui-view="columnOne"></div>
                                        </div>
                                        
                                        <!-- COLUMN TWO NAMED VIEW -->
                                        <div class="col-sm-6">
                                            <div ui-view="columnTwo"></div>
                                        </div>

                                    </div>`
                        },

                        // the child views will be defined here (absolutely named)
                        'columnOne@about': {
                            template: 'Look I am a column!'
                        },

                        // for column two, we'll define a separate controller 
                        'columnTwo@about': {
                            template: `<table>
                                    <tr>
                                    <td>Name</td>
                                    <td>Price</td>
                                    </tr>
                                    <tr ng-repeat="scotch in scotches">
                                    <td>{{scotch.name}}</td>
                                    <td>{{scotch.price}}</td>
                                    </tr>

                                    </table>`,
                            controller: 'AboutController'
                        }
                    }
                }
            }
        ]

        states.forEach(state => {
            $stateProvider.state(state.state, state.config);
        })
    }
}

/**
 * app about controller
*/
namespace app.about {

    interface aboutScope extends ng.IScope {
        message: string
        , scotches: Array<Object>
    }

    /**
     * AboutCtrl
     */
    export class AboutController {
        static $inject = ['$scope'];
        constructor($scope: aboutScope) {
            $scope.message = 'test'
            $scope.scotches = [
                {
                    name: 'Macallan 12',
                    price: 50
                },
                {
                    name: 'Chivas Regal Royal Salute',
                    price: 10000
                },
                {
                    name: 'Glenfiddich 1937',
                    price: 20000
                }
            ]
        }
    }

    angular
        .module('app.about')
        .controller('AboutController', AboutController);
}

namespace app.people {
    angular.module('app.people', ['app.core'])
}

namespace app.people {

    interface IController {
        title: string,
        people: any[]
        getPeople: () => ng.IPromise<any[]>
    }

    export class Controller implements IController {
        static $inject = ["dataservice", "$q"]

        constructor(private dataservise: app.core.IDataService,
            private $q: ng.IQService) {

            let promises = [this.getPeople()]

            this.$q.all(promises)
                .then(() => {
                    console.log('promises processed!');
                })
        }

        title = 'People'
        people = []
        getPeople() {
            return this.dataservise.getPeople()
                .then((data) => {
                    console.log('i get people :)');

                    this.people = data
                    return this.people
                })
        }
    }

    angular
        .module('app.people')
        .controller('PeopleCtrl', Controller);
}

namespace app.people {
    angular
        .module('app.people')
        .config(route_states)

    function route_states(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        var states = [
            {
                state: 'people',
                config: {
                    url: "/people",
                    template: `
                    waiting for {{ vm.title }}: <br> 
                    <div ng-repeat="p in vm.people">
                        <li>{{ p }}</li>
                    </div>`,
                    controller: "PeopleCtrl",
                    controllerAs: "vm",
                }
            }
        ]

        states.forEach(state => {
            $stateProvider.state(state.state, state.config);
        })
    }
}