(function () {
    var App = function () {

        let args = [].slice.call(arguments), // 5, 7
            callback = args.pop(),
            modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
            copyModules = {},
            i;

        if (!(this instanceof App)) {
            return new App(modules, callback); // 6
        }

        function addModuleToCopyObject(module) {
            copyModules[module] = {}; // 9

            function copyModule(parent, child) {
                for (i in parent) { // 11
                    if (parent.hasOwnProperty(i)) {
                        child[i] = parent[i]
                    }
                }

                return child;
            }

            copyModule(App.modules[module], copyModules[module]); // 10
        }

        modules.forEach(addModuleToCopyObject); // 8
        callback(copyModules); // 12
    };

    if (typeof window.App === 'undefined') {
        window.App = App; // 1
    }
})();

App.modules = {}; // 2

App.modules.module1 = (function(){ // 3

    function _doSmth(container) {
        container.innerText = 'It works'; // 14
    }

    return {
        doSmth: _doSmth,
    }
})();

// Usage
(function(){
    App(['module1'], function (Modules) {
        let container = document.getElementById('container'); // 13
        Modules['module1'].doSmth(container);
    });
})(); // 4
