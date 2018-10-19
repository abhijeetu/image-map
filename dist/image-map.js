/**
 * Copyright (c) 2018, Travis Clarke (https://www.travismclarke.com/)
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.ImageMap = factory(global.$));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var name = "image-map";
  var version = "1.1.2";
  var description = "Response, dynamic image maps";
  var main = "dist/image-map.js";
  var module$1 = "dist/image-map.es.js";
  var directories = {
  	example: "example"
  };
  var files = [
  	"dist",
  	"README.md",
  	"LICENSE"
  ];
  var scripts = {
  	build: "yarn build:dist",
  	"build:dist": "shx rm -rf ./dist/* ; yarn bundle:dist ; yarn bundle:es ; yarn stats:dist",
  	"stats:dist": "node ./resources/dist-stats.js",
  	"bundle:dist": "rollup -c ./resources/rollup-config.js",
  	"bundle:es": "rollup -c ./resources/rollup-config-es.js",
  	prettier: "prettier --write './src/*.{js,css,md}'",
  	prep: "yarn prettier && yarn build && yarn test",
  	test: "exit 0",
  	prepublishOnly: "yarn prep && bash ./resources/publish.sh"
  };
  var author = {
  	name: "Travis Clarke",
  	email: "travis.m.clarke@gmail.com",
  	url: "https://www.travismclarke.com/"
  };
  var keywords = [
  	"image",
  	"map",
  	"image map",
  	"image-map",
  	"responsive",
  	"responsive image map",
  	"responsive image-map",
  	"jquery-plugin",
  	"ecosystem:jquery"
  ];
  var repository = {
  	type: "git",
  	url: "https://github.com/clarketm/image-map"
  };
  var bugs = {
  	url: "https://github.com/clarketm/image-map/issues"
  };
  var license = "Apache-2.0";
  var homepage = "https://github.com/clarketm/image-map#readme";
  var ignore = [
  	"**/.*",
  	"node_modules",
  	"test",
  	"tests"
  ];
  var peerDependencies = {
  	jquery: ">= 1.1.2"
  };
  var devDependencies = {
  	"@babel/core": "^7.1.2",
  	"@babel/preset-env": "^7.1.0",
  	"@types/node": "^10.11.5",
  	colors: "^1.3.2",
  	prettier: "^1.14.3",
  	rollup: "^0.66.4",
  	"rollup-plugin-babel": "^4.0.3",
  	"rollup-plugin-commonjs": "^9.1.8",
  	"rollup-plugin-json": "^3.1.0",
  	"rollup-plugin-strip-banner": "^0.2.0",
  	shx: "^0.3.2",
  	"uglify-js": "2.8.11",
  	"uglify-save-license": "^0.4.1"
  };
  var packageJson = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	module: module$1,
  	directories: directories,
  	files: files,
  	scripts: scripts,
  	author: author,
  	keywords: keywords,
  	repository: repository,
  	bugs: bugs,
  	license: license,
  	homepage: homepage,
  	ignore: ignore,
  	peerDependencies: peerDependencies,
  	devDependencies: devDependencies
  };

  var RESIZE = "resize";
  var LOAD = "load";
  var USEMAP = "usemap";
  var SRC = SRC;
  var COORDS = "coords";
  /**
   * ImageMap main library constructor
   *
   * @param selector {string} CSS selector
   * @param wait {number} [wait=500] debounce wait interval
   * @constructor
   */

  var ImageMap =
  /*#__PURE__*/
  function () {
    function ImageMap(selector, wait) {
      _classCallCheck(this, ImageMap);

      this.selector = selector instanceof Array ? selector : _toConsumableArray(document.querySelectorAll(selector));
      this.update();
      window.addEventListener(RESIZE, this.debounce(this.update, wait).bind(this));
    }

    _createClass(ImageMap, [{
      key: "update",

      /**
       * Update
       */
      value: function update() {
        var _this = this;

        this.selector.forEach(function (img) {
          if (img.getAttribute(USEMAP) === undefined) return;
          var newImg = img.cloneNode();
          newImg.addEventListener(LOAD, _this.handleImageLoad(img.offsetWidth, img.offsetHeight));
          newImg.setAttribute(SRC, img.getAttribute(SRC));
        });
      }
      /**
       * Debounce
       *
       * @param {function} func
       * @param {number} [wait=500]
       */

    }, {
      key: "debounce",
      value: function debounce(func) {
        var _this2 = this;

        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
        var timeout;
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          window.clearTimeout(timeout);
          timeout = window.setTimeout(function (ctx) {
            return func.apply(ctx, args);
          }, wait, _this2);
        };
      }
      /**
       * handleImageLoad
       *
       * @param {number} [offsetWidth=0]
       * @param {number} [offsetHeight=0]
       */

    }, {
      key: "handleImageLoad",
      value: function handleImageLoad() {
        var offsetWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return function (e) {
          var w = e.target.width;
          var h = e.target.height;
          var wPercent = offsetWidth / 100;
          var hPercent = offsetHeight / 100;
          var mapName = e.target.getAttribute(USEMAP).replace(/^#/, "");

          _toConsumableArray(document.querySelectorAll(ImageMap.genAreaSelector(mapName))).forEach(function (area) {
            var coordsString = area.dataset[COORDS] = area.dataset[COORDS] || area.getAttribute(COORDS);
            var coordsArrayOld = coordsString.split(",");
            var coordsArrayNew = coordsArrayOld.map(function (_, i) {
              return i % 2 === 0 ? Number(coordsArrayOld[i] / w * 100 * wPercent) : Number(coordsArrayOld[i] / h * 100 * hPercent);
            });
            area.setAttribute(COORDS, coordsArrayNew.toString());
          });
        };
      }
    }], [{
      key: "genAreaSelector",
      value: function genAreaSelector(mapName) {
        return "map[name=\"".concat(mapName, "\"] area");
      }
    }]);

    return ImageMap;
  }();

  if ($ !== undefined && $.fn) {
    $.fn.imageMap = function (wait) {
      return new ImageMap(this.toArray(), wait);
    };
  }

  function _ImageMap(selector, wait) {
    return new ImageMap(selector, wait);
  }

  _ImageMap.VERSION = packageJson.version;

  return _ImageMap;

})));
