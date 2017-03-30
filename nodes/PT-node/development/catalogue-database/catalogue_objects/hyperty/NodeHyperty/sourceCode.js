(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("os"));
	else if(typeof define === 'function' && define.amd)
		define("activate", ["os"], factory);
	else if(typeof exports === 'object')
		exports["activate"] = factory(require("os"));
	else
		root["activate"] = factory(root["os"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint undef: true */\n\nexports.divideURL = divideURL;\nexports.default = activate;\n\nvar _os = __webpack_require__(1);\n\nvar _os2 = _interopRequireDefault(_os);\n\nvar _Syncher = __webpack_require__(2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction divideURL(url) {\n\n  // let re = /([a-zA-Z-]*)?:\\/\\/(?:\\.)?([-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b)*(\\/[\\/\\d\\w\\.-]*)*(?:[\\?])*(.+)*/gi;\n  var re = /([a-zA-Z-]*):\\/\\/(?:\\.)?([-a-zA-Z0-9@:%._\\+~#=]{2,256})([-a-zA-Z0-9@:%._\\+~#=\\/]*)/gi;\n  var subst = '$1,$2,$3';\n  var parts = url.replace(re, subst).split(',');\n\n  // If the url has no protocol, the default protocol set is https\n  if (parts[0] === url) {\n    parts[0] = 'https';\n    parts[1] = url;\n  }\n\n  var result = {\n    type: parts[0],\n    domain: parts[1],\n    identity: parts[2]\n  };\n\n  return result;\n}\n\nfunction bytesToSize(bytes) {\n  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];\n  if (bytes == 0) return '0 Byte';\n  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));\n  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];\n};\n\n/**\n* Hyperty Connector;\n* @author Paulo Chainho [paulo-g-chainho@telecom.pt]\n* @version 0.1.0\n*/\n\nvar NodeHyperty = function () {\n\n  /**\n  * Create a new HelloWorldReporter\n  * @param  {Syncher} syncher - Syncher provided from the runtime core\n  */\n  function NodeHyperty(hypertyURL, bus, configuration) {\n    var _this = this;\n\n    _classCallCheck(this, NodeHyperty);\n\n    if (!hypertyURL) throw new Error('The hypertyURL is a needed parameter');\n    if (!bus) throw new Error('The MiniBus is a needed parameter');\n    if (!configuration) throw new Error('The configuration is a needed parameter');\n\n    var domain = divideURL(hypertyURL).domain;\n    this._domain = domain;\n    this._objectDescURL = 'hyperty-catalogue://catalogue.' + domain + '/.well-known/dataschema/Connection';\n\n    this._interval;\n\n    var syncher = new _Syncher.Syncher(hypertyURL, bus, configuration);\n    this.syncher = syncher;\n\n    var mbTotal = bytesToSize(_os2.default.totalmem());\n    var mbFree = bytesToSize(_os2.default.freemem());\n\n    var initialData = {\n      name: 'Node Hyperty',\n      description: 'Should send information related with operating system',\n      time: new Date().toISOString(),\n      os: {\n        arch: _os2.default.arch(),\n        image: 'https://placekitten.com/g/200/300',\n        plataform: _os2.default.platform(),\n        totalMemory: mbTotal,\n        freeMemory: mbFree,\n        hostname: _os2.default.hostname()\n      }\n    };\n\n    syncher.onNotification(function (event) {\n\n      console.log('Notification:', event);\n\n      if (event.type === 'delete') {\n        console.log('Delete: ', event);\n        clearInterval(_this._interval);\n      }\n    });\n\n    syncher.create(this._objectDescURL, [], initialData).then(function (helloObjtReporter) {\n      console.info('1. Return Created Node Hyperty Data Object Reporter', helloObjtReporter);\n\n      helloObjtReporter.onSubscription(function (event) {\n        event.accept();\n      });\n\n      _this.generateData(helloObjtReporter);\n    }).catch(function (error) {\n      console.log('Error: ', error);\n    });\n  }\n\n  _createClass(NodeHyperty, [{\n    key: 'generateData',\n    value: function generateData(dataObjectReporter) {\n\n      this._interval = setInterval(function () {\n\n        dataObjectReporter.data.time = new Date().toISOString();\n        console.log('UPDATE DATA:', dataObjectReporter.data);\n      }, 1000);\n    }\n  }]);\n\n  return NodeHyperty;\n}();\n\nfunction activate(hypertyURL, bus, configuration) {\n\n  return {\n    name: 'NodeHyperty',\n    instance: new NodeHyperty(hypertyURL, bus, configuration)\n  };\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ub2RlLWh5cGVydHkvTm9kZUh5cGVydHkuaHkuanM/M2NkYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7IC8qIGpzaGludCB1bmRlZjogdHJ1ZSAqL1xuXG5leHBvcnRzLmRpdmlkZVVSTCA9IGRpdmlkZVVSTDtcbmV4cG9ydHMuZGVmYXVsdCA9IGFjdGl2YXRlO1xuXG52YXIgX29zID0gcmVxdWlyZSgnb3MnKTtcblxudmFyIF9vczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vcyk7XG5cbnZhciBfU3luY2hlciA9IHJlcXVpcmUoJ3NlcnZpY2UtZnJhbWV3b3JrL2Rpc3QvU3luY2hlcicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBkaXZpZGVVUkwodXJsKSB7XG5cbiAgLy8gbGV0IHJlID0gLyhbYS16QS1aLV0qKT86XFwvXFwvKD86XFwuKT8oWy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw2fVxcYikqKFxcL1tcXC9cXGRcXHdcXC4tXSopKig/OltcXD9dKSooLispKi9naTtcbiAgdmFyIHJlID0gLyhbYS16QS1aLV0qKTpcXC9cXC8oPzpcXC4pPyhbLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn0pKFstYS16QS1aMC05QDolLl9cXCt+Iz1cXC9dKikvZ2k7XG4gIHZhciBzdWJzdCA9ICckMSwkMiwkMyc7XG4gIHZhciBwYXJ0cyA9IHVybC5yZXBsYWNlKHJlLCBzdWJzdCkuc3BsaXQoJywnKTtcblxuICAvLyBJZiB0aGUgdXJsIGhhcyBubyBwcm90b2NvbCwgdGhlIGRlZmF1bHQgcHJvdG9jb2wgc2V0IGlzIGh0dHBzXG4gIGlmIChwYXJ0c1swXSA9PT0gdXJsKSB7XG4gICAgcGFydHNbMF0gPSAnaHR0cHMnO1xuICAgIHBhcnRzWzFdID0gdXJsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB0eXBlOiBwYXJ0c1swXSxcbiAgICBkb21haW46IHBhcnRzWzFdLFxuICAgIGlkZW50aXR5OiBwYXJ0c1syXVxuICB9O1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9TaXplKGJ5dGVzKSB7XG4gIHZhciBzaXplcyA9IFsnQnl0ZXMnLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcbiAgaWYgKGJ5dGVzID09IDApIHJldHVybiAnMCBCeXRlJztcbiAgdmFyIGkgPSBwYXJzZUludChNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpKSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgaSksIDIpICsgJyAnICsgc2l6ZXNbaV07XG59O1xuXG4vKipcbiogSHlwZXJ0eSBDb25uZWN0b3I7XG4qIEBhdXRob3IgUGF1bG8gQ2hhaW5obyBbcGF1bG8tZy1jaGFpbmhvQHRlbGVjb20ucHRdXG4qIEB2ZXJzaW9uIDAuMS4wXG4qL1xuXG52YXIgTm9kZUh5cGVydHkgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICogQ3JlYXRlIGEgbmV3IEhlbGxvV29ybGRSZXBvcnRlclxuICAqIEBwYXJhbSAge1N5bmNoZXJ9IHN5bmNoZXIgLSBTeW5jaGVyIHByb3ZpZGVkIGZyb20gdGhlIHJ1bnRpbWUgY29yZVxuICAqL1xuICBmdW5jdGlvbiBOb2RlSHlwZXJ0eShoeXBlcnR5VVJMLCBidXMsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vZGVIeXBlcnR5KTtcblxuICAgIGlmICghaHlwZXJ0eVVSTCkgdGhyb3cgbmV3IEVycm9yKCdUaGUgaHlwZXJ0eVVSTCBpcyBhIG5lZWRlZCBwYXJhbWV0ZXInKTtcbiAgICBpZiAoIWJ1cykgdGhyb3cgbmV3IEVycm9yKCdUaGUgTWluaUJ1cyBpcyBhIG5lZWRlZCBwYXJhbWV0ZXInKTtcbiAgICBpZiAoIWNvbmZpZ3VyYXRpb24pIHRocm93IG5ldyBFcnJvcignVGhlIGNvbmZpZ3VyYXRpb24gaXMgYSBuZWVkZWQgcGFyYW1ldGVyJyk7XG5cbiAgICB2YXIgZG9tYWluID0gZGl2aWRlVVJMKGh5cGVydHlVUkwpLmRvbWFpbjtcbiAgICB0aGlzLl9kb21haW4gPSBkb21haW47XG4gICAgdGhpcy5fb2JqZWN0RGVzY1VSTCA9ICdoeXBlcnR5LWNhdGFsb2d1ZTovL2NhdGFsb2d1ZS4nICsgZG9tYWluICsgJy8ud2VsbC1rbm93bi9kYXRhc2NoZW1hL0Nvbm5lY3Rpb24nO1xuXG4gICAgdGhpcy5faW50ZXJ2YWw7XG5cbiAgICB2YXIgc3luY2hlciA9IG5ldyBfU3luY2hlci5TeW5jaGVyKGh5cGVydHlVUkwsIGJ1cywgY29uZmlndXJhdGlvbik7XG4gICAgdGhpcy5zeW5jaGVyID0gc3luY2hlcjtcblxuICAgIHZhciBtYlRvdGFsID0gYnl0ZXNUb1NpemUoX29zMi5kZWZhdWx0LnRvdGFsbWVtKCkpO1xuICAgIHZhciBtYkZyZWUgPSBieXRlc1RvU2l6ZShfb3MyLmRlZmF1bHQuZnJlZW1lbSgpKTtcblxuICAgIHZhciBpbml0aWFsRGF0YSA9IHtcbiAgICAgIG5hbWU6ICdOb2RlIEh5cGVydHknLFxuICAgICAgZGVzY3JpcHRpb246ICdTaG91bGQgc2VuZCBpbmZvcm1hdGlvbiByZWxhdGVkIHdpdGggb3BlcmF0aW5nIHN5c3RlbScsXG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBvczoge1xuICAgICAgICBhcmNoOiBfb3MyLmRlZmF1bHQuYXJjaCgpLFxuICAgICAgICBpbWFnZTogJ2h0dHBzOi8vcGxhY2VraXR0ZW4uY29tL2cvMjAwLzMwMCcsXG4gICAgICAgIHBsYXRhZm9ybTogX29zMi5kZWZhdWx0LnBsYXRmb3JtKCksXG4gICAgICAgIHRvdGFsTWVtb3J5OiBtYlRvdGFsLFxuICAgICAgICBmcmVlTWVtb3J5OiBtYkZyZWUsXG4gICAgICAgIGhvc3RuYW1lOiBfb3MyLmRlZmF1bHQuaG9zdG5hbWUoKVxuICAgICAgfVxuICAgIH07XG5cbiAgICBzeW5jaGVyLm9uTm90aWZpY2F0aW9uKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICBjb25zb2xlLmxvZygnTm90aWZpY2F0aW9uOicsIGV2ZW50KTtcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkZWxldGUnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGU6ICcsIGV2ZW50KTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5faW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3luY2hlci5jcmVhdGUodGhpcy5fb2JqZWN0RGVzY1VSTCwgW10sIGluaXRpYWxEYXRhKS50aGVuKGZ1bmN0aW9uIChoZWxsb09ianRSZXBvcnRlcikge1xuICAgICAgY29uc29sZS5pbmZvKCcxLiBSZXR1cm4gQ3JlYXRlZCBOb2RlIEh5cGVydHkgRGF0YSBPYmplY3QgUmVwb3J0ZXInLCBoZWxsb09ianRSZXBvcnRlcik7XG5cbiAgICAgIGhlbGxvT2JqdFJlcG9ydGVyLm9uU3Vic2NyaXB0aW9uKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5hY2NlcHQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfdGhpcy5nZW5lcmF0ZURhdGEoaGVsbG9PYmp0UmVwb3J0ZXIpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTm9kZUh5cGVydHksIFt7XG4gICAga2V5OiAnZ2VuZXJhdGVEYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVEYXRhKGRhdGFPYmplY3RSZXBvcnRlcikge1xuXG4gICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBkYXRhT2JqZWN0UmVwb3J0ZXIuZGF0YS50aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIERBVEE6JywgZGF0YU9iamVjdFJlcG9ydGVyLmRhdGEpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5vZGVIeXBlcnR5O1xufSgpO1xuXG5mdW5jdGlvbiBhY3RpdmF0ZShoeXBlcnR5VVJMLCBidXMsIGNvbmZpZ3VyYXRpb24pIHtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdOb2RlSHlwZXJ0eScsXG4gICAgaW5zdGFuY2U6IG5ldyBOb2RlSHlwZXJ0eShoeXBlcnR5VVJMLCBidXMsIGNvbmZpZ3VyYXRpb24pXG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbm9kZS1oeXBlcnR5L05vZGVIeXBlcnR5Lmh5LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {


/***/ }
/******/ ])
});
;