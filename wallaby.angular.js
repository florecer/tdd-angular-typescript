module.exports = function () {
    return {
        testFramework: 'mocha',
        debug: true,
        files: [
            {
                pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false
            },
            { 
                pattern: 'node_modules/angular/angular.js', 
                instrument: false
            },
            { 
                pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false 
            },
            { 
                pattern: "node_modules/bardjs/dist/bard.min.js", 
                instrument: false 
            },
            { 
                pattern: 'node_modules/chai/chai.js', 
                instrument: false 
            },
            { 
                pattern: 'node_modules/sinon/pkg/sinon.js', 
                instrument: false 
            },
            { 
                pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', 
                instrument: false 
            },
            { 
                // pattern: 'src/*.js',
                pattern: 'src/*.ts'
            }
        ],
        tests: [
            {
                // pattern: 'test/*.spec.js', 
                pattern: 'test/*.spec.ts'
            }
        ]
    };
};
