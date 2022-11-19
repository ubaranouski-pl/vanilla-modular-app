(function () {
    var App = function () {

        let args = [].slice.call(arguments),
            callback = args.pop(),
            modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
            copyModules = {},
            i;

        if (!(this instanceof App)) {
            return new App(modules, callback);
        }

        function addModuleToCopyObject(module) {
            copyModules[module] = {};

            function copyModule(parent, child) {
                for (i in parent) {
                    if (parent.hasOwnProperty(i)) {
                        child[i] = parent[i]
                    }
                }

                return child;
            }

            copyModule(App.modules[module], copyModules[module]);
        }

        modules.forEach(addModuleToCopyObject);
        callback(copyModules);
    };

    if (typeof window.App === 'undefined') {
        window.App = App;
    }
})();

App.modules = {};

App.modules.module1 = (function(){

    function _doSmth(container) {
        container.innerText = 'It works';
    }

    return {
        doSmth: _doSmth,
    }
})();
