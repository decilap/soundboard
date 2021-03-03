// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._addEventClick = _addEventClick;
exports._addEventKeyDown = _addEventKeyDown;
exports._addEventEnded = _addEventEnded;
exports._getSoundByLink = _getSoundByLink;
exports._getById = _getById;
exports._find = _find;
exports._createElement = _createElement;
exports._removeClass = _removeClass;
exports._addClass = _addClass;

function _addEventClick(element, func) {
  element.addEventListener('click', func);
}

function _addEventKeyDown(element, func) {
  element.addEventListener('keydown', func);
}

function _addEventEnded(element, func) {
  element.addEventListener('ended', func);
}

function _getSoundByLink(link) {
  return new Audio(link);
}

function _getById(id) {
  return document.getElementById(id);
}

function _find(selector) {
  return document.querySelector(selector);
}

function _createElement(name) {
  return document.createElement(name);
}

function _removeClass(element, className) {
  return element.classList.remove(className);
}

function _addClass(element, className) {
  return element.classList.add(className);
}
},{}],"js/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Soundboard = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Soundboard = /*#__PURE__*/function () {
  /*
      @param data: sounds[]
  */
  function Soundboard(sounds) {
    _classCallCheck(this, Soundboard);

    _defineProperty(this, "sounds", []);

    this.sounds = sounds;
    (0, _utils._addEventKeyDown)(document, this.handleKeyDown.bind(this));
  }
  /*
      Event keyboard 
  */


  _createClass(Soundboard, [{
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var key = event.key;
      this.play(key);
    }
    /*
        Event button click
    */

  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var key = event.target.getAttribute('id');
      this.play(key);
    }
    /*
        Play sound
        @param code: string
    */

  }, {
    key: "play",
    value: function play(key) {
      var soundByKey = this.sounds.find(function (sound) {
        return sound.key == key;
      });

      if (soundByKey) {
        var sound = (0, _utils._getSoundByLink)(soundByKey.link),
            button = (0, _utils._getById)(key);
        sound.currentTime = 0;
        sound.play();
        (0, _utils._addClass)(button, 'sound-active');
        (0, _utils._addEventEnded)(sound, function () {
          (0, _utils._removeClass)(button, 'sound-active');
        });
      }
    }
    /*
        Create sound list
    */

  }, {
    key: "createListSounds",
    value: function createListSounds() {
      var _this = this;

      var btnSection = (0, _utils._find)('#btn-section');
      this.sounds.map(function (sound) {
        var container = _this.createContainer('div'),
            button = _this.createButton(sound);

        (0, _utils._addEventClick)(button, _this.handleClick.bind(_this));
        container.append(button);
        btnSection.append(container);
      });
    }
    /*
        Create button element 
        @param sound: sound{}
    */

  }, {
    key: "createButton",
    value: function createButton(sound) {
      var button = (0, _utils._createElement)('button');
      button.textContent = "Press \"".concat(sound.key, "\"");
      button.id = sound.key;
      return button;
    }
    /*
        Create container element
    */

  }, {
    key: "createContainer",
    value: function createContainer() {
      var div = (0, _utils._createElement)('div');
      div.className = "btn-container";
      return div;
    }
  }]);

  return Soundboard;
}();

exports.Soundboard = Soundboard;
},{"./utils":"js/utils.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _functions = require("./functions");

//import moment from 'moment' 
var sounds = [{
  id: null,
  key: 'a',
  link: '/sounds/Batterie_de_blague.mp3'
}, {
  id: null,
  key: 'z',
  link: '/sounds/Baguettes_de_batterie_3.mp3'
}, {
  id: null,
  key: 'e',
  link: '/sounds/Caisse_claire_1.mp3'
}, {
  id: null,
  key: 'r',
  link: '/sounds/Charleston_4.mp3'
}, {
  id: null,
  key: 't',
  link: '/sounds/Charleston_fermee_3.mp3'
}, {
  id: null,
  key: 'y',
  link: '/sounds/Cymbale_ride_4.mp3'
}, {
  id: null,
  key: 'u',
  link: '/sounds/Tom_aigu_1.mp3'
}, {
  id: null,
  key: 'i',
  link: '/sounds/Tom_grave_1.mp3'
}, {
  id: null,
  key: 'o',
  link: '/sounds/Tom_grave_4.mp3'
}];
new _functions.Soundboard(sounds).createListSounds();
},{"./functions":"js/functions.js"}],"../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57433" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map