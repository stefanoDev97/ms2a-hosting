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
})({"../../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js"}],"../../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../../node_modules/axios/lib/core/enhanceError.js"}],"../../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../../node_modules/axios/lib/core/createError.js"}],"../../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../../node_modules/axios/lib/helpers/combineURLs.js"}],"../../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./../core/settle":"../../node_modules/axios/lib/core/settle.js","./../helpers/cookies":"../../node_modules/axios/lib/helpers/cookies.js","./../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../../node_modules/axios/lib/core/createError.js"}],"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../../node_modules/axios/lib/adapters/xhr.js","process":"../../node_modules/process/browser.js"}],"../../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./transformData":"../../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../../node_modules/axios/lib/defaults.js"}],"../../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../../node_modules/axios/lib/utils.js","../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js"}],"../../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../../node_modules/axios/lib/cancel/Cancel.js"}],"../../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../../node_modules/axios/lib/helpers/isAxiosError.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"../../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../../node_modules/axios/lib/helpers/spread.js","./helpers/isAxiosError":"../../node_modules/axios/lib/helpers/isAxiosError.js"}],"../../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../../node_modules/axios/lib/axios.js"}],"../../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"ms2afunny.js":[function(require,module,exports) {
"use strict";

var _axios = _interopRequireDefault(require("axios"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.isMobile = false;

if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  isMobile = true;
}

var video = document.getElementById('video__viewer');
if (video) video.preload = "auto";
var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
var sVideo = document.querySelector('.video');
var header__nav;

if (document.querySelector('.header__nav')) {
  header__nav = document.querySelector('.header__nav').getBoundingClientRect().height;
}

var videoPlayerLandSC = document.querySelector('.video__player-landSC');
var menuBar = document.querySelector('.navigation__rt');
var menu = document.querySelector('.navigation__menuBar .navigation__account');
var menuCat = document.querySelector('.navigation__menuBar-cat');
var menuCatLink = document.querySelector('.navigation__menuBar-cat .navigation__link');
var menuCatUl = document.querySelector('.navigation__menuBar-cat .navigation__items');
var navigation__categories = document.querySelector('.navigation__categories-title');
var navigation__items = document.querySelector('.navigation__items');
var videoResolutionI = document.querySelector('.video__resolutionI');
var i = localStorage.getItem('ms2afunny');
var v = document.getElementById('video');
var playIcon = document.querySelector('.video__playSVG');
var vCT = document.querySelector('.video__length-current');
var vLength = document.querySelector('.video__length-length');
var volumeSlider = document.querySelector('.video__volume--slider');
var volumeProgress = document.querySelector('.video__volume--progress');
var volumeIcon = document.querySelector('.video__volume--icon');
var videoContols = document.querySelector('.video__contols');
var videoPlayC = document.querySelector('.video__playC');
var skipR = document.querySelector('.video__skipping-right');
var skipL = document.querySelector('.video__skipping-left');
var fI = document.querySelector('.video__fullS');
var vReso = document.querySelector('.video__resolution');
var videoSeking = document.querySelector('.video__seking');
var showComments = document.querySelector('.video__comments-show');
var volumeTrue = false;
var blury = true;
var x = false;

(function () {
  try {
    if (!document.querySelector(".main ")) return;

    var Carousel = /*#__PURE__*/function () {
      function Carousel(parentDiv, setting) {
        _classCallCheck(this, Carousel);

        this.parentDiv = parentDiv;
        this.setting = Object.assign({}, {
          slidesVisible: 1,
          moveAmount: 1,
          dotts: true,
          contentAnimation: true,
          responsive: [{
            breakPoint: 500,
            slidesVisible: 1,
            moveAmount: 1
          }, {
            breakPoint: 800,
            slidesVisible: 2,
            moveAmount: 1
          }, {
            breakPoint: 1000,
            slidesVisible: 3,
            moveAmount: 1
          }]
        }, setting);
        this.current = 0;
        this.mylist = this.createElements("ul", "carousel__dotts");
        this.mydotts = [];
        this.build();
        this.size = 100 / this.carousel__items.length;
        this.drag_drop();
      }

      _createClass(Carousel, [{
        key: "build",
        value: function build() {
          var _this = this;

          this.carousel = this.createElements('div', 'carousel');
          this.container = this.createElements('div', 'carousel__container');
          this.carousel.append(this.container);
          this.carousel__items = _toConsumableArray(this.parentDiv.children).map(function (slider) {
            var item = _this.createElements('div', 'carousel__child');

            item.append(slider);

            _this.container.append(item);

            return item;
          });
          this.parentDiv.append(this.carousel);
          this.setWidths();

          if (this.setting.arrow) {
            this.buttons();
          }

          if (this.setting.dotts) {
            this.dotts();
            this.dottActive(0);
          }

          window.addEventListener('resize', this.onResize.bind(this));
          this.toggleClass(0);
        }
      }, {
        key: "onResize",
        value: function onResize() {
          this.setWidths();

          if (this.setting.dotts) {
            this.dotts();
            this.dottActive(0);
          }

          this.move(this.current);
        }
      }, {
        key: "getSetting",
        value: function getSetting() {
          var res = this.setting.responsive.sort(function (a, b) {
            return a.breakPoint - b.breakPoint;
          }).find(function (point) {
            return window.innerWidth <= point.breakPoint;
          });
          return res ? res : this.setting;
        }
      }, {
        key: "createElements",
        value: function createElements(element, clas) {
          var a = document.createElement(element);
          a.setAttribute('class', clas);
          return a;
        }
      }, {
        key: "setWidths",
        value: function setWidths() {
          this.container.style.width = "".concat(this.carousel__items.length / this.getSetting().slidesVisible * 100, "%");

          var _iterator = _createForOfIteratorHelper(this.carousel__items),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var e = _step.value;
              e.style.width = "".concat(100 / this.carousel__items.length, "%");
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "buttons",
        value: function buttons() {
          this.leftButton = this.createElements('button', 'carousel__btn carousel__btn--prev');
          this.leftButton.innerHTML = "<svg viewBox=\"0 0 24 24\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" style=\"pointer-events: none; display: block; width: 100%; height: 100%;\"><g mirror-in-rtl=\"\" >\n                <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n              </g></svg>";
          this.leftButton.setAttribute('aria-pressed', 'false');
          this.RightButton = this.createElements('button', 'carousel__btn carousel__btn--next');
          this.RightButton.innerHTML = "<svg viewBox=\"0 0 24 24\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" style=\"pointer-events: none; display: block; width: 100%; height: 100%;\"><g mirror-in-rtl=\"\" >\n                <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n              </g></svg>";
          this.RightButton.setAttribute('aria-pressed', 'false');
          var carouselControls = this.createElements('div', 'carousel__controls');
          carouselControls.append(this.leftButton);
          carouselControls.append(this.RightButton);
          this.parentDiv.append(carouselControls);
          this.leftButton.addEventListener('click', this.prevSlid.bind(this));
          this.RightButton.addEventListener('click', this.nextSlid.bind(this));
        }
      }, {
        key: "nextSlid",
        value: function nextSlid() {
          this.move(this.current + this.getSetting().moveAmount, this.setting.arrowTran);
        }
      }, {
        key: "prevSlid",
        value: function prevSlid() {
          this.move(this.current - this.getSetting().moveAmount, this.setting.arrowTran);
        }
      }, {
        key: "move",
        value: function move(index, trans) {
          var _this2 = this;

          if (index < 0) {
            if (this.current == 0) {
              this.container.style.transition = '1s';
              index = this.carousel__items.length - this.getSetting().slidesVisible;
            } else {
              this.container.style.transition = '1s';
              index = 0;
            }
          } else if (index > this.carousel__items.length - this.getSetting().slidesVisible && this.current >= this.carousel__items.length - this.getSetting().slidesVisible) {
            this.container.style.transition = '1s';
            index = 0;
          }

          index = this.transX(this.size * index) || index;
          this.container.style.transition = '1s';

          if (!trans) {
            this.container.style.transition = '1s';
          }

          this.container.style.transform = "translateX(".concat(-this.size * index, "%)");
          setTimeout(function () {
            _this2.container.style.transition = '';
          });
          this.current = index;
          if (this.setting.dotts) this.dottActive(index);
          this.toggleClass(index);
        }
      }, {
        key: "transX",
        value: function transX(x) {
          if (x >= (this.container.clientWidth - this.carousel.clientWidth) * 100 / this.container.clientWidth) {
            return this.carousel__items.length - this.getSetting().slidesVisible;
          }

          return null;
        }
      }, {
        key: "dotts",
        value: function dotts() {
          var _this3 = this;

          this.mylist.innerHTML = "";
          var x = Math.ceil((this.carousel__items.length - this.getSetting().slidesVisible) / this.getSetting().moveAmount);

          var _loop = function _loop(_i) {
            var myli = _this3.createElements("li", "carousel__list");

            _this3.mylist.append(myli);

            myli.addEventListener("click", function () {
              _this3.move(_i * _this3.getSetting().moveAmount, _this3.setting.arrowTran);
            });
          };

          for (var _i = 0; _i <= x; _i++) {
            _loop(_i);
          }

          this.parentDiv.append(this.mylist);
          this.mydotts = _toConsumableArray(this.mylist.children);
        }
      }, {
        key: "dottActive",
        value: function dottActive(index) {
          var active_dot = this.mydotts[Math.ceil(index / this.getSetting().moveAmount)];
          this.mydotts.forEach(function (i) {
            return i.classList.remove("carousel__list--active");
          });
          active_dot.classList.add("carousel__list--active");
        }
      }, {
        key: "toggleClass",
        value: function toggleClass(index) {
          try {
            if (!this.setting.contentAnimation || this.getSetting().slidesVisible > 1 || this.scrolAnim) {
              return;
            }

            this.carousel__items.forEach(function (item) {
              item.classList.remove('active');
            });
            this.carousel__items.forEach(function (item) {
              return item.querySelector('.container').classList.remove('active');
            });

            for (var _i2 = index; _i2 < this.getSetting().slidesVisible + index; _i2++) {
              this.carousel__items[_i2].classList.add('active');

              this.carousel__items[_i2].querySelector('.container').classList.add('active');
            }
          } catch (er) {
            return;
          }
        }
      }, {
        key: "drag_drop",
        value: function drag_drop() {
          this.container.addEventListener("mousedown", this.onstart.bind(this));
          window.addEventListener("mousemove", this.onmove.bind(this));
          window.addEventListener("mouseup", this.onend.bind(this));
          this.container.addEventListener("touchstart", this.onstart.bind(this));
          window.addEventListener("touchmove", this.onmove.bind(this));
          window.addEventListener("touchend", this.onend.bind(this));
          this.container.addEventListener("dragstart", function (e) {
            return e.preventDefault();
          });
        }
      }, {
        key: "onstart",
        value: function onstart(e) {
          if (e.touches) {
            if (e.touches.length > 1) return;
            e = e.touches[0];
          }

          this.startx = e.screenX;
        }
      }, {
        key: "onmove",
        value: function onmove(e) {
          if (this.startx) {
            var tranEnd = -(this.current * 100 / this.carousel__items.length) + this.a * 100 / this.container.clientWidth;
            if (this.getSetting().slidesVisible === this.carousel__items.length) return;
            this.scrolAnim = true;
            this.toggleClass(this.current);
            var event = e.touches ? e.touches[0] : e;
            this.a = event.screenX - this.startx;
            this.container.style.transition = "none";
            if (tranEnd >= 10) tranEnd = 10;else if (tranEnd <= -(this.carousel__items.length - this.getSetting().slidesVisible) * this.size - 10) tranEnd = -(this.carousel__items.length - this.getSetting().slidesVisible) * this.size - 10;
            this.container.style.transform = "translateX(".concat(tranEnd, "%)");
          }
        }
      }, {
        key: "onend",
        value: function onend() {
          var _this4 = this;

          if (this.startx) {
            setTimeout(function () {
              _this4.container.style.transition = "1s";
            });
            this.scrolAnim = false;
            this.toggleClass(this.current);

            if (Math.abs(this.a) * 100 / this.carousel.clientWidth > 10) {
              if (this.a > 0) {
                if (-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth >= 0) {
                  this.move(0);
                } else {
                  this.move(Math.floor(Math.abs(-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth) / (100 / this.carousel__items.length)), this.getSetting().slidesVisible != 1);
                }
              } else {
                if (this.current == this.carousel__items.length - this.getSetting().slidesVisible) {
                  this.move(this.current);
                } else {
                  this.move(Math.ceil(Math.abs(-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth) / (100 / this.carousel__items.length)), this.getSetting().slidesVisible != 1);
                }
              }
            } else {
              this.move(this.current, this.getSetting().slidesVisible !== 1);
            }

            this.a = null;
            this.startx = null;
          }
        }
      }]);

      return Carousel;
    }();

    document.querySelectorAll(".carousel__videos").forEach(function (carousel) {
      new Carousel(carousel, {
        slidesVisible: 4,
        moveAmount: 1,
        arrow: 1,
        dotts: 0,
        contentAnimation: 0,
        arrowTran: 0
      });
    });
  } catch (er) {
    return;
  }
})(); //droplist


(function () {
  try {
    if (!navigation__categories) return;
    navigation__categories.addEventListener('click', dropList);

    function dropList() {
      navigation__items.classList.toggle('active');
      return;
    }

    window.addEventListener('click', function (e) {
      if (!e.target.classList.contains('navigation__categories-title')) {
        navigation__items.classList.remove('active');
      }
    });
  } catch (er) {
    console.log(er);
  }
})();

(function () {
  try {
    if (!sVideo) return;

    function setHeight() {
      header__nav = document.querySelector('.header__nav').getBoundingClientRect().height;
      sVideo.style.paddingTop = "".concat(header__nav, "px");

      if (window.screen.width <= 767) {
        if (orientation === "portrait-primary") {
          videoPlayerLandSC.classList.add('stickyV');
          videoPlayerLandSC.style.top = "".concat(header__nav, "px");
          videoPlayerLandSC.style.height = 'inherit';
        }
      }

      return;
    }

    window.addEventListener('resize', setHeight);
    setHeight();
  } catch (er) {
    return;
  }
})();

(function () {
  if (!menuBar) return;
  menuBar.addEventListener('click', toggleMenu);
  menuCatLink.addEventListener('click', toggleCat);

  function toggleMenu() {
    menu.classList.toggle('active');
    document.body.classList.toggle('overflow');
    return;
  }

  function toggleCat() {
    menuCatUl.classList.toggle('active');
    menuCatLink.classList.toggle('active');
    menuCat.classList.toggle('active');
    return;
  }
})(); //ms2a video player


(function () {
  try {
    if (!v) return;
    videoResolutionI.addEventListener('click', function (e) {
      e.preventDefault();
      vReso.classList.toggle('active');
    });

    _toConsumableArray(document.querySelectorAll('input')).forEach(function (input) {
      input.addEventListener('focus', function () {
        blury = false;
      });
      input.addEventListener('blur', function () {
        blury = true;
      });
    });

    function handleVolume(e) {
      if (volumeSlider.offsetWidth <= e.offsetX) return;

      if (e.pageX - volumeSlider.getBoundingClientRect().left <= 0) {
        volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>';
        volumeProgress.style.width = '0%';
        return;
      } else {
        volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>';
        volumeProgress.style.width = e.offsetX + 'px';
        var value = e.offsetX / 100;

        if (value >= 1) {
          value = 1;
          video['volume'] = value;
        } else {
          video['volume'] = e.offsetX / 100;
        }
      }
    } //handleProgress


    function videoRealTime() {
      var percent = video.currentTime / video.duration * 100;
      document.querySelector('.video__progress--filled').style.width = percent + '%';
      videoTimer();
    }

    function videoProgress() {
      var playaa = true;

      if (video.paused) {
        playaa = false;
      }

      if (video.seeking) {
        videoSeking.style.display = 'block';
      } else {
        videoSeking.style.display = 'none';
        if (playaa) video.play();
      }

      if (video.readyState === 4) {
        var loadedPercentage = this.buffered.end(0) / this.duration * 100;
        document.querySelector('.video__progress--p').style.width = loadedPercentage + '%';
      }
    }

    function videoTimer() {
      var ds = parseInt(video.duration % 60);
      var dm = parseInt(video.duration / 60 % 60);
      var s = parseInt(video.currentTime % 60);
      var m = parseInt(video.currentTime / 60 % 60);
      if (String(s).length == 1) s = "0".concat(s);
      if (String(ds).length == 1) ds = "0".concat(ds);

      if (isNaN(ds) || isNaN(dm)) {
        vLength.textContent = "0:00";
        vCT.textContent = "0:00";
      } else {
        vLength.textContent = "".concat(dm, ":").concat(ds);
      }

      vCT.textContent = "".concat(m, ":").concat(s);
    }

    videoTimer();

    function togglePlayButton() {
      var icon = this.paused ? '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" ></path></svg>' : '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" ></path></svg>';
      playIcon.innerHTML = icon;
    }

    function ms2aPlayer(e) {
      if (window.screen.width <= 767) {
        if (e.target.classList.contains('video__play')) {
          e.preventDefault();
          var method = video.paused ? 'play' : 'pause';
          video[method]();
        }

        return;
      }

      if (e.target.classList.contains('video__play') || e.target.classList.contains('video__player') || e.target.classList.contains('video__viewer') || e.keyCode === 32 && blury) {
        e.preventDefault();

        var _method = video.paused ? 'play' : 'pause';

        video[_method]();

        return;
      }

      if (e.keyCode === 39) {
        skipR.click();
        return;
      } else if (e.keyCode === 37) {
        skipL.click();
        return;
      }
    }

    function skip() {
      video.currentTime += parseFloat(this.dataset.skip);
    }

    function videoResolution(e) {
      if (!e.target.classList.contains('active')) {
        document.querySelector('.video__resolution__r.active').classList.remove('active');
        e.target.classList.add('active');
        var resolution = e.target.dataset.r;

        var _v = window.location.pathname.split('/');

        _v = _v[_v.length - 1];
        video.pause();
        setTimeout(function () {
          document.getElementById('video__viewer').src = "/api/v1/videos/video/".concat(_v).concat(resolution);
        }, 0);
      }

      return;
    }

    function fullScreen(e) {
      if (fI.classList.contains('fullS')) {
        fI.classList.toggle('fullS');
        fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" ></path></g><g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" ></path></g><g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" ></path></g><g ><path  d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" ></path></g></svg>';
        var cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

        if (window.screen.width <= 767 && screen.orientation) {
          videoPlayerLandSC.classList.add('stickyV');
          videoPlayerLandSC.style.top = "".concat(header__nav, "px");
          videoPlayerLandSC.style.height = 'inherit';
          videoPlayerLandSC.style.position = 'fixed';
          screen.orientation.lock("portrait-primary");
        }

        cancellFullScreen.call(document);
      } else {
        fI.classList.toggle('fullS');
        fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path></g><g ><path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path></g><g ><path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z" ></path></g><g>></use><path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path></g></svg>';
        var requestFullScreen = v.requestFullscreen || v.webkitRequestFullScreen || v.mozRequestFullScreen || v.msRequestFullScreen;
        requestFullScreen.call(v);

        if (window.screen.width <= 767) {
          videoPlayerLandSC.classList.remove('stickyV');
          videoPlayerLandSC.style.top = "0";
          videoPlayerLandSC.style.height = '100%';
          videoPlayerLandSC.style.position = 'initial';

          if (orientation === "landscape-primary") {
            return;
          } else {
            screen.orientation.lock("landscape-primary");
          }
        }
      }
    }

    function toggleVolume() {
      playIcon.classList.toggle('mute');

      if (playIcon.classList.contains('mute')) {
        video.volume = 0;
        volumeProgress.style.width = '0%';
        volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>';
      } else {
        volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>';
        video.volume = 0.5;
        volumeProgress.style.width = '50%';
      }
    }

    function scrub(e) {
      e.preventDefault();

      if (e.touches) {
        var touchE = e.touches[0];

        var _scrubTime = touchE.clientX / document.querySelector('.video__progress').offsetWidth * video.duration;

        video.currentTime = _scrubTime;
        document.querySelector('.video__progress--filled').style.width = touchE.clientX + 'px';
        return;
      }

      var scrubTime = e.offsetX / document.querySelector('.video__progress').offsetWidth * video.duration;
      video.currentTime = scrubTime;
      document.querySelector('.video__progress--filled').style.width = e.offsetX + 'px';
      return;
    } // async function postComment() {
    //     const commentsContainer = document.querySelector('.video__comments-container');
    //     const dAlert = document.querySelector('.alertEr');
    //     const comment = String(document.querySelector('.video__comments-input input').value);
    //     if (!commentsContainer || !dAlert) return;
    //     try {
    //         if (comment.length < 2) {
    //             dAlert.innerHTML = 'أكتب تعليق...';
    //             dAlert.classList.add('active');
    //             return;
    //         }
    //         if (!i) {
    //             window.open("/ms2a", '_self');
    //         }
    //         dAlert.classList.remove('active');
    //         const res = await axios({
    //             method: "POST",
    //             url: '/api/v1/videos/video/comment',
    //             data: { comment },
    //             withCredentials: true
    //         });
    //         if (res.data.status == 'success') {
    //             const comment = document.createElement('div');
    //             comment.classList.add('video__comment-placeHolder');
    //             comment.innerHTML = `
    //             <div class="video__comment-flexy"><div class="video__user-image video__user"><img class="video__user-image" src='/api/v1/videos/image/${res.data.user.photo}'>
    //             </div><div class="video__user-info"><h4 class="video__user-name"> ${res.data.user.name} <span class="video__user-published-time">${new Date(res.data.comment.dateOfCreation).toLocaleDateString()}</span>
    //             </h4><p class="video__user-comment">${res.data.comment.comment}</p></div></div><div class="video__user-statis"><div class="video__block">
    //             <div class="video__info"><div class="video__info-hor video__like-dislike"><div class="video__container">
    //             <button class="video__button video__like" data-comment='${res.data.comment.id}'><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></svg></button>
    //             <span class="video__span video__likes"></span></div><div class="video__container">
    //             <button class="video__button video__dislike" data-comment='${res.data.comment.id}'>
    //             <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg></button>
    //             <span class="video__span video__dislikes"></span></div></div></div></div></div>`;
    //             commentsContainer.insertAdjacentElement('afterbegin', comment);
    //             let nbrOfC = +document.querySelector('.video__comments-info--inc').textContent + 1;
    //             document.querySelector('.video__comments-info--inc').textContent = nbrOfC;
    //             document.querySelector('.video__comments-input input').value = '';
    //             return;
    //         } else {
    //             dAlert.innerHTML = 'المرجو تسجيل الدخول';
    //             dAlert.classList.add('active');
    //         }
    //     } catch (er) {
    //         dAlert.innerHTML = 'المرجو تسجيل الدخول';
    //         dAlert.classList.add('active');
    //         return;
    //     }
    // }


    function updateComment(_x) {
      return _updateComment.apply(this, arguments);
    }

    function _updateComment() {
      _updateComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var href, commentId, data, Btn, _Btn;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                e.preventDefault();
                href = window.location.href;
                sessionStorage.setItem('content', href);
                commentId = e.target.dataset.comment;
                data = {};

                if (!e.target.classList.contains('video__like')) {
                  _context.next = 26;
                  break;
                }

                if (i) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", window.open("/ms2a?new=true", "_self"));

              case 9:
                if (!e.target.classList.contains('active')) {
                  _context.next = 18;
                  break;
                }

                data = Object.assign({
                  commentId: commentId
                }, {
                  type: 'like'
                }, {
                  c: 'deleteLike'
                });
                e.target.classList.remove('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                _context.next = 15;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/comment',
                  data: data,
                  withCredentials: true
                });

              case 15:
                return _context.abrupt("return");

              case 18:
                Btn = document.querySelector("[data-comment=\"".concat(commentId, "\"].video__dislike"));
                data = Object.assign({
                  commentId: commentId
                }, {
                  type: 'like'
                }, {
                  c: 'addLike'
                });
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;

                if (Btn.classList.contains('active')) {
                  Btn.classList.remove('active');
                  Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                  data = Object.assign({
                    commentId: commentId
                  }, {
                    type: 'like'
                  }, {
                    c: 'addLike'
                  }, {
                    i: 'deleteDislike'
                  });
                }

                _context.next = 25;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/comment',
                  data: data,
                  withCredentials: true
                });

              case 25:
                return _context.abrupt("return");

              case 26:
                if (!e.target.classList.contains('video__dislike')) {
                  _context.next = 46;
                  break;
                }

                if (i) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", window.open("/ms2a?new=true", "_self"));

              case 29:
                if (!e.target.classList.contains('active')) {
                  _context.next = 38;
                  break;
                }

                data = Object.assign({
                  commentId: commentId
                }, {
                  type: 'dislike'
                }, {
                  c: 'deleteDislike'
                });
                e.target.classList.remove('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                _context.next = 35;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/comment',
                  data: data,
                  withCredentials: true
                });

              case 35:
                return _context.abrupt("return");

              case 38:
                _Btn = document.querySelector("[data-comment=\"".concat(commentId, "\"].video__like"));
                data = Object.assign({
                  commentId: commentId
                }, {
                  type: 'dislike'
                }, {
                  c: 'addDislike'
                });
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;

                if (_Btn.classList.contains('active')) {
                  _Btn.classList.remove('active');

                  _Btn.nextElementSibling.textContent = +_Btn.nextElementSibling.textContent - 1;
                  data = Object.assign({
                    commentId: commentId
                  }, {
                    type: 'dislike'
                  }, {
                    c: 'addDislike'
                  }, {
                    i: 'deleteLike'
                  });
                }

                _context.next = 45;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/comment',
                  data: data,
                  withCredentials: true
                });

              case 45:
                return _context.abrupt("return");

              case 46:
                _context.next = 51;
                break;

              case 48:
                _context.prev = 48;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return");

              case 51:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 48]]);
      }));
      return _updateComment.apply(this, arguments);
    }

    function updateV(_x2) {
      return _updateV.apply(this, arguments);
    }

    function _updateV() {
      _updateV = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var href, data, Btn, _Btn2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                e.preventDefault();
                href = window.location.href;
                sessionStorage.setItem('content', href);
                data = {};

                if (!e.target.classList.contains('video__like')) {
                  _context2.next = 25;
                  break;
                }

                if (i) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", window.open("/ms2a?new=true", "_self"));

              case 8:
                if (!e.target.classList.contains('active')) {
                  _context2.next = 17;
                  break;
                }

                data = Object.assign({
                  type: 'like'
                }, {
                  c: 'deleteLike'
                });
                e.target.classList.remove('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                _context2.next = 14;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/updatems2a',
                  data: data,
                  withCredentials: true
                });

              case 14:
                return _context2.abrupt("return");

              case 17:
                Btn = document.querySelector(".video__info .video__dislike");
                data = Object.assign({
                  type: 'like'
                }, {
                  c: 'addLike'
                });
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;

                if (Btn.classList.contains('active')) {
                  Btn.classList.remove('active');
                  Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                  data = Object.assign({
                    type: 'like'
                  }, {
                    c: 'addLike'
                  }, {
                    i: 'deleteDislike'
                  });
                }

                _context2.next = 24;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/updatems2a',
                  data: data,
                  withCredentials: true
                });

              case 24:
                return _context2.abrupt("return");

              case 25:
                if (!e.target.classList.contains('video__dislike')) {
                  _context2.next = 45;
                  break;
                }

                if (i) {
                  _context2.next = 28;
                  break;
                }

                return _context2.abrupt("return", window.open("/ms2a?new=true", "_self"));

              case 28:
                if (!e.target.classList.contains('active')) {
                  _context2.next = 37;
                  break;
                }

                data = Object.assign({
                  type: 'dislike'
                }, {
                  c: 'deleteDislike'
                });
                e.target.classList.remove('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                _context2.next = 34;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/updatems2a',
                  data: data,
                  withCredentials: true
                });

              case 34:
                return _context2.abrupt("return");

              case 37:
                _Btn2 = document.querySelector(".video__info .video__like");
                data = Object.assign({
                  type: 'dislike'
                }, {
                  c: 'addDislike'
                });
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;

                if (_Btn2.classList.contains('active')) {
                  _Btn2.classList.remove('active');

                  _Btn2.nextElementSibling.textContent = +_Btn2.nextElementSibling.textContent - 1;
                  data = Object.assign({
                    type: 'dislike'
                  }, {
                    c: 'addDislike'
                  }, {
                    i: 'deleteLike'
                  });
                }

                _context2.next = 44;
                return (0, _axios.default)({
                  method: "PATCH",
                  url: '/api/v1/videos/video/updatems2a',
                  data: data,
                  withCredentials: true
                });

              case 44:
                return _context2.abrupt("return");

              case 45:
                _context2.next = 50;
                break;

              case 47:
                _context2.prev = 47;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return");

              case 50:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 47]]);
      }));
      return _updateV.apply(this, arguments);
    }

    function showCommentsP() {
      document.querySelector('.video__comments').classList.add('active');
      document.querySelector('.ms2aFooter').style.display = 'none';
      document.querySelector('.video__left').style.display = 'none';
    }

    function hidCommentsP() {
      document.querySelector('.video__comments').classList.remove('active');
      document.querySelector('.ms2aFooter').style.display = 'block';
      document.querySelector('.video__left').style.display = 'block';
    }

    function shareV(e) {
      if (e.target.classList.contains('s')) {
        document.querySelector('.video__share-placeholder').style.display = 'none';
        return;
      }

      if (e.target.classList.contains('video__share-placeholder')) {
        e.target.style.display = 'none';
      }

      var href = window.location.href;
      var image = "https://".concat(window.location.host, "/api/v1/videos/image/").concat(window.location.pathname.split('/')[2]);
      var fLink = "https://www.facebook.com/sharer/sharer.php?u=".concat(href, "&picture=").concat(image);
      var tLink = "http://twitter.com/intent/tweet?url=".concat(href);

      if (e.target.classList.contains('video__share__f')) {
        window.open(fLink);
        return;
      }

      if (e.target.classList.contains('video__share__t')) {
        window.open(tLink);
        return;
      }

      if (e.target.nodeName == "INPUT") {
        var copyText = document.getElementById("shareLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.querySelector('.video__share__lP').style.display = 'block';
        setTimeout(function () {
          document.querySelector('.video__share__lP').style.display = 'none';
        }, 1500);
        return;
      }
    }

    var nextVtoggle = false;
    var nextVB = document.querySelector('.video__auto-play .video__checkbox');
    nextVB.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) return nextVtoggle = true;
      nextVtoggle = false;
    });
    document.querySelector('.video__share-placeholder').addEventListener('click', shareV);
    document.querySelector('.video__share').addEventListener('click', function () {
      document.querySelector('.video__share-placeholder').style.display = 'block';
    });

    if (!isMobile) {
      showComments.style.display = 'none';
      document.querySelector('.video__comments-infoP .video__L').style.display = 'none';
    }

    window.addEventListener('DOMContentLoaded', function () {
      showComments.addEventListener('click', showCommentsP);
      document.querySelector('.video__comments-infoP .video__L').addEventListener('click', hidCommentsP);
    }); //document.querySelector('.video__comments-post').addEventListener('click', postComment);
    //document.querySelector('.video__comments-input input').addEventListener('keydown', (e) => e.keyCode == 13 && postComment(e));

    document.querySelector('.video__comments-container').addEventListener('click', updateComment); //document.querySelector('.video__info').addEventListener('click', updateV);

    document.querySelector('.video__progress').addEventListener('click', scrub);
    document.querySelector('.video__progress').addEventListener('mousemove', function (e) {
      return x && scrub(e);
    });
    document.querySelector('.video__progress').addEventListener('mousedown', function () {
      return x = true;
    });
    window.addEventListener('mouseup', function () {
      return x = false;
    });
    document.querySelector('.video__progress').addEventListener('touchstart', scrub);
    document.querySelector('.video__progress').addEventListener('touchstart', function () {
      return x = true;
    });
    document.querySelector('.video__progress').addEventListener('touchmove', function (e) {
      return x && scrub(e);
    });
    window.addEventListener('touchend', function () {
      return x = false;
    });
    video.addEventListener('timeupdate', videoRealTime);
    video.addEventListener('progress', videoProgress);
    video.addEventListener('play', togglePlayButton);
    video.addEventListener('pause', togglePlayButton);
    video.addEventListener('ended', function () {
      if (nextVtoggle) {
        document.querySelector('#nextVideoC a').click();
      }
    });
    window.addEventListener('keydown', ms2aPlayer);
    v.querySelectorAll('[data-skip]').forEach(function (btn) {
      btn.addEventListener('click', skip);
    });
    document.querySelector('.video__volume--slider').addEventListener('click', handleVolume);
    volumeIcon.addEventListener('click', toggleVolume);
    v.addEventListener('click', ms2aPlayer);

    function doThis() {
      videoContols.style.transform = 'scaleY(1)';
      videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
    }

    v.addEventListener('mousemove', doThis);
    v.addEventListener('dblclick', fullScreen);
    volumeSlider.addEventListener('mousedown', function () {
      return volumeTrue = true;
    });
    volumeSlider.addEventListener('mousemove', function (e) {
      return volumeTrue && handleVolume(e);
    });
    window.addEventListener('mouseup', function () {
      return volumeTrue = false;
    });
    document.querySelector('.video__fullS').addEventListener('click', fullScreen);
    document.querySelectorAll('.video__resolution__r').forEach(function (r) {
      return r.addEventListener('click', videoResolution);
    });
    setInterval(function () {
      if (!video.paused) {
        videoContols.style.transform = 'scaleY(0)';
        videoPlayC.style.transform = 'scaleY(0)';
      } else {
        videoContols.style.transform = 'scaleY(1)';
        videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
      }
    }, 4000);
  } catch (er) {
    console.log(er);
    return;
  }
})(); //login


(function () {
  var login = document.getElementById('ms2a__login');
  if (!login) return;
  var loginEmail = document.getElementById('emailL');
  var loginPassword = document.getElementById('passwordL');
  var alertMsg = document.getElementById('login__msg');
  login.addEventListener('click', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
      var data, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              data = {
                email: loginEmail.value,
                password: loginPassword.value
              };
              _context3.prev = 2;
              _context3.next = 5;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/user/login",
                data: data
              });

            case 5:
              res = _context3.sent;

              if (!res.data.token) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", window.location.reload());

            case 8:
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](2);
              alertMsg.innerHTML = "المعلومات غير صحيحة";

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 10]]);
    }));

    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }());
})(); //signup


(function () {
  var signup = document.getElementById('ms2a__signup');
  if (!signup) return;
  var emailS = document.getElementById('email');
  var nameS = document.getElementById('username');
  var passwordS = document.getElementById('password');
  var passwordConfirmS = document.getElementById('confirmpassword');
  var alertMsg = document.getElementById('signup__msg');
  signup.addEventListener('click', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
      var data, res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              e.preventDefault();
              data = {
                name: nameS.value,
                email: emailS.value,
                password: passwordS.value,
                passwordConfirm: passwordConfirmS.value
              };
              _context4.prev = 2;
              _context4.next = 5;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/user/signup",
                data: data
              });

            case 5:
              res = _context4.sent;

              if (!res.data.token) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", window.location.reload());

            case 8:
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](2);
              alertMsg.innerHTML = "المعلومات غير صحيحة";

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 10]]);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }());
})(); //reset password 1


(function () {
  var resetPassword = document.getElementById('resetPassword');
  if (!resetPassword) return;
  resetPassword.addEventListener('click', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
      var email, res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              e.preventDefault();
              email = document.getElementById('email').value;
              _context5.prev = 2;
              _context5.next = 5;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/user/forgotPassword",
                data: {
                  email: email
                }
              });

            case 5:
              res = _context5.sent;

              if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'المرجو تفقد بريدك الالكتروني';
                document.getElementById('signup__msg').classList.add('success');
              }

              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              document.getElementById('signup__msg').textContent = 'حدث خطأ';
              document.getElementById('signup__msg').classList.remove('success');

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 9]]);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }());
})(); //reset password 2


(function () {
  var ms2a__resetPassword = document.getElementById('ms2a__resetPassword');
  if (!ms2a__resetPassword) return;
  ms2a__resetPassword.addEventListener('click', /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
      var password, passwordConfirm, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              e.preventDefault();
              password = document.getElementById('password').value;
              passwordConfirm = document.getElementById('passwordConfirm').value;
              _context6.prev = 3;
              _context6.next = 6;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/user/resetPassword/".concat(window.location.pathname.split('/')[2]),
                data: {
                  password: password,
                  passwordConfirm: passwordConfirm
                }
              });

            case 6:
              res = _context6.sent;

              if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تغيير كلمة السر';
                document.getElementById('signup__msg').classList.add('success');
                setTimeout(function () {
                  window.open('/', '_self');
                }, 1000);
              }

              _context6.next = 15;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](3);
              document.getElementById('signup__msg').textContent = 'حدث خطأ';
              document.getElementById('signup__msg').classList.remove('success');
              console.log(_context6.t0.response);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 10]]);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }());
})(); //moreVideos


(function () {
  try {
    var moreVideos = document.getElementById('moreVideos');
    if (!moreVideos) return;
    moreVideos.addEventListener('click', getMoreVideos);

    function getMoreVideos(_x7) {
      return _getMoreVideos.apply(this, arguments);
    }

    function _getMoreVideos() {
      _getMoreVideos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(e) {
        var page, videosT, res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                e.preventDefault();
                page = moreVideos.dataset.edi;
                videosT = document.createElement('ul');
                videosT.classList.add('videos__content');
                _context7.next = 6;
                return (0, _axios.default)({
                  method: "GET",
                  url: "/api/videos/more?page=".concat(page)
                });

              case 6:
                res = _context7.sent;

                if (!(res.data.status == 'done')) {
                  _context7.next = 10;
                  break;
                }

                moreVideos.style.display = 'none';
                return _context7.abrupt("return");

              case 10:
                moreVideos.dataset.edi = +page + 1;
                videosT.innerHTML = res.data;
                document.querySelector('.videocontent__conteainer').insertAdjacentElement('beforeend', videosT);

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      return _getMoreVideos.apply(this, arguments);
    }
  } catch (er) {
    console.log(er.response);
    return;
  }
})(); //likes and dislikes


(function () {
  var likeBtn = document.querySelector('.video__like');
  if (!likeBtn) return;
  var disLikeBtn = document.querySelector('.video__dislike');
  var likeBtnComment = document.querySelector('.comment__like');
  var disLikeBtnComment = document.querySelector('.comment__dislike');

  function updateLikeDislike(_x8, _x9, _x10) {
    return _updateLikeDislike.apply(this, arguments);
  } //video


  function _updateLikeDislike() {
    _updateLikeDislike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(e, data, url) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              e.preventDefault();

              if (document.querySelector('.navigation__logout')) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return", window.open('/ms2a', '_self'));

            case 3:
              if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                data[data.type] = -1;
              } else {
                e.target.classList.add('active');
                e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                data[data.type] = 1;
              }

              if (data.btn.classList.contains('active')) {
                data.btn.classList.remove('active');
                data.btn.nextElementSibling.textContent = +data.btn.nextElementSibling.textContent - 1;
                data[data.sType] = -1;
              }

              _context8.prev = 5;
              _context8.next = 8;
              return (0, _axios.default)({
                method: 'patch',
                url: url,
                data: data
              });

            case 8:
              _context8.next = 13;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](5);
              document.querySelectorAll('button').forEach(function (btn) {
                btn.style.pointerEvents = 'none';
              });

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[5, 10]]);
    }));
    return _updateLikeDislike.apply(this, arguments);
  }

  if (likeBtn) likeBtn.addEventListener('click', function (e) {
    var data = {
      type: 'like',
      sType: 'dislike',
      updateLike: true,
      btn: disLikeBtn,
      videoId: window.location.pathname.split("/")[2]
    };
    var url = '/api/videos/likedislikes/update';
    updateLikeDislike(e, data, url);
  });
  if (disLikeBtn) disLikeBtn.addEventListener('click', function (e) {
    var data = {
      type: 'dislike',
      sType: 'like',
      updateDislike: true,
      btn: likeBtn,
      videoId: window.location.pathname.split("/")[2]
    };
    var url = '/api/videos/likedislikes/update';
    updateLikeDislike(e, data, url);
  }); //comment

  if (likeBtnComment) likeBtnComment.addEventListener('click', function (e) {
    var data = {
      type: 'like',
      sType: 'dislike',
      updateLike: true,
      btn: disLikeBtnComment,
      commentId: e.target.dataset.comment
    };
    var url = '/api/comment/likedislikes/update';
    updateLikeDislike(e, data, url);
  });
  if (disLikeBtnComment) disLikeBtnComment.addEventListener('click', function (e) {
    var data = {
      type: 'dislike',
      sType: 'like',
      updateDislike: true,
      btn: likeBtnComment,
      commentId: e.target.dataset.comment
    };
    var url = '/api/comment/likedislikes/update';
    updateLikeDislike(e, data, url);
  });
})(); //postComment


(function () {
  var CommentBtn = document.querySelector('.video__comments-post');
  if (!CommentBtn) return;
  CommentBtn.addEventListener('click', postComment);

  function postComment() {
    return _postComment.apply(this, arguments);
  }

  function _postComment() {
    _postComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var commentsContainer, dAlert, comment, videoId, res, _comment, nbrOfC;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              commentsContainer = document.querySelector('.video__comments-container');
              dAlert = document.querySelector('.alertEr');
              comment = String(document.querySelector('.video__comments-input input').value);

              if (!(!commentsContainer || !dAlert)) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return");

            case 5:
              _context9.prev = 5;

              if (!(comment.length < 2 || comment.length > 200)) {
                _context9.next = 10;
                break;
              }

              dAlert.innerHTML = 'حدث خطأ';
              dAlert.classList.add('active');
              return _context9.abrupt("return");

            case 10:
              if (document.querySelector('.navigation__logout')) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return", window.open('/ms2a', '_self'));

            case 12:
              dAlert.classList.remove('active');
              videoId = window.location.pathname.split("/")[2];
              _context9.next = 16;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/videos/".concat(videoId, "/comment"),
                data: {
                  comment: comment
                }
              });

            case 16:
              res = _context9.sent;

              if (!(res.data.status == 200)) {
                _context9.next = 26;
                break;
              }

              _comment = document.createElement('div');

              _comment.classList.add('video__comment-placeHolder');

              _comment.innerHTML = "\n                <div class=\"video__comment-flexy\"><div class=\"video__user-image video__user\"><img class=\"video__user-image\" src='/api/v1/videos/image/".concat(res.data.userphoto, "'>\n                </div><div class=\"video__user-info\"><h4 class=\"video__user-name\"> ").concat(res.data.username, " <span class=\"video__user-published-time\">").concat(new Date(res.data.comment.dateOfCreation).toLocaleDateString(), "</span>\n                </h4><p class=\"video__user-comment\">").concat(res.data.comment.comment, "</p></div></div><div class=\"video__user-statis\"><div class=\"video__block\">\n                <div class=\"video__info\"><div class=\"video__info-hor video__like-dislike\"><div class=\"video__container\">\n                <button class=\"video__button video__like\" data-comment='").concat(res.data.comment.id, "'><svg viewBox=\"0 0 24 24\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" style=\"pointer-events: none; display: block; width: 100%; height: 100%;\"><path d=\"M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z\"></path></svg></button>\n                <span class=\"video__span video__likes\"></span></div><div class=\"video__container\">\n                <button class=\"video__button video__dislike\" data-comment='").concat(res.data.comment.id, "'>\n                <svg viewBox=\"0 0 24 24\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" style=\"pointer-events: none; display: block; width: 100%; height: 100%;\"><path d=\"M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z\"></path></svg></button>\n                <span class=\"video__span video__dislikes\"></span></div></div></div></div></div>");
              commentsContainer.insertAdjacentElement('afterbegin', _comment);
              nbrOfC = +document.querySelector('.video__comments-info--inc').textContent + 1;
              document.querySelector('.video__comments-info--inc').textContent = nbrOfC;
              document.querySelector('.video__comments-input input').value = '';
              return _context9.abrupt("return");

            case 26:
              _context9.next = 33;
              break;

            case 28:
              _context9.prev = 28;
              _context9.t0 = _context9["catch"](5);
              dAlert.innerHTML = 'حدث خطأ';
              dAlert.classList.add('active');
              return _context9.abrupt("return");

            case 33:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[5, 28]]);
    }));
    return _postComment.apply(this, arguments);
  }
})(); //logout


(function () {
  var logout = document.querySelector('.navigation__logout');
  if (!logout) return;
  logout.addEventListener('click', userLogout);

  function userLogout(_x11) {
    return _userLogout.apply(this, arguments);
  }

  function _userLogout() {
    _userLogout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(e) {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              e.preventDefault();
              _context10.prev = 1;
              _context10.next = 4;
              return (0, _axios.default)({
                method: "get",
                url: "/api/user/logout"
              });

            case 4:
              res = _context10.sent;

              if (!(res.data.status == 200)) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return", setTimeout(function () {
                window.location.reload(true);
              }, 1500));

            case 7:
              _context10.next = 12;
              break;

            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](1);
              console.log(_context10.t0.response);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 9]]);
    }));
    return _userLogout.apply(this, arguments);
  }
})(); //UpdateMe


(function () {
  //update User Name
  var updateNameBtn = document.querySelector('.ms2aa__button.cn');
  if (!updateNameBtn) return;
  updateNameBtn.addEventListener('click', updateUserName);

  function updateUserName(_x12) {
    return _updateUserName.apply(this, arguments);
  } //update User Password


  function _updateUserName() {
    _updateUserName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(e) {
      var name, res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              e.preventDefault();
              name = document.getElementById('username').value;
              _context11.prev = 2;
              _context11.next = 5;
              return (0, _axios.default)({
                method: "patch",
                url: "/api/user/updateMe",
                data: {
                  name: name
                }
              });

            case 5:
              res = _context11.sent;

              if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تعيير الاسم';
                document.getElementById('signup__msg').classList.add('success');
              }

              _context11.next = 13;
              break;

            case 9:
              _context11.prev = 9;
              _context11.t0 = _context11["catch"](2);
              document.getElementById('signup__msg').textContent = 'حدث خطأ';
              document.getElementById('signup__msg').classList.remove('success');

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[2, 9]]);
    }));
    return _updateUserName.apply(this, arguments);
  }

  var updatePasswordBtn = document.querySelector('.ms2aa__button.cp');
  updatePasswordBtn.addEventListener('click', updatePassword);

  function updatePassword(_x13) {
    return _updatePassword.apply(this, arguments);
  } //update User Photo


  function _updatePassword() {
    _updatePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(e) {
      var currentPassword, password, passwordConfirm, res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              e.preventDefault();
              currentPassword = document.getElementById('password').value;
              password = document.getElementById('newpassword').value;
              passwordConfirm = document.getElementById('confirmpassword').value;
              _context12.prev = 4;
              _context12.next = 7;
              return (0, _axios.default)({
                method: "patch",
                url: "/api/user/updatePassword",
                data: {
                  currentPassword: currentPassword,
                  password: password,
                  passwordConfirm: passwordConfirm
                }
              });

            case 7:
              res = _context12.sent;

              if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تعيير كلمة السر';
                document.getElementById('signup__msg').classList.add('success');
              }

              _context12.next = 15;
              break;

            case 11:
              _context12.prev = 11;
              _context12.t0 = _context12["catch"](4);
              document.getElementById('signup__msg').textContent = 'حدث خطأ';
              document.getElementById('signup__msg').classList.remove('success');

            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[4, 11]]);
    }));
    return _updatePassword.apply(this, arguments);
  }

  function updatePhoto(_x14) {
    return _updatePhoto.apply(this, arguments);
  }

  function _updatePhoto() {
    _updatePhoto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(e) {
      var form, res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              e.preventDefault();
              _context13.prev = 1;
              form = new FormData();
              form.append('photo', document.getElementById('photo').files[0]);
              _context13.next = 6;
              return (0, _axios.default)({
                method: 'PATCH',
                url: "/api/user/updatePhoto",
                data: form
              });

            case 6:
              res = _context13.sent;

              if (res.data.status == 'succes') {
                window.location.reload();
              }

              _context13.next = 12;
              break;

            case 10:
              _context13.prev = 10;
              _context13.t0 = _context13["catch"](1);

            case 12:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[1, 10]]);
    }));
    return _updatePhoto.apply(this, arguments);
  }

  document.querySelector('.userphoto').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('photo').click();
    return;
  });
  document.getElementById('photo').addEventListener('change', updatePhoto);
})(); //contactUs


(function () {
  var contactMe = document.getElementById('contactMe');
  if (!contactMe) return;
  contactMe.addEventListener('click', contact);

  function contact(_x15) {
    return _contact.apply(this, arguments);
  }

  function _contact() {
    _contact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(e) {
      var message, res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              e.preventDefault();

              if (document.querySelector('.navigation__logout')) {
                _context14.next = 4;
                break;
              }

              document.getElementById('signup__msg').textContent = 'المرجو تسجيل الدخول';
              return _context14.abrupt("return");

            case 4:
              message = document.getElementById('clientMSH').value;
              _context14.prev = 5;
              _context14.next = 8;
              return (0, _axios.default)({
                method: "POST",
                url: "/api/user/contact",
                data: {
                  message: message
                }
              });

            case 8:
              res = _context14.sent;

              if (res.data.status == 200) {
                document.getElementById('signup__msg').innerHTML = 'شكرا <br> المرجو تفقد بريدك الالكتروني';
                document.getElementById('signup__msg').classList.add('success');
              }

              _context14.next = 16;
              break;

            case 12:
              _context14.prev = 12;
              _context14.t0 = _context14["catch"](5);
              document.getElementById('signup__msg').textContent = 'حدث خطأ';
              document.getElementById('signup__msg').classList.remove('success');

            case 16:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[5, 12]]);
    }));
    return _contact.apply(this, arguments);
  }
})(); //subscribe


(function () {
  var noAds = document.querySelector('.noAds');
  if (!noAds) return;
  var stripe = Stripe("pk_test_51IRvEdIPX65KpOPVjDxwIXQpm7AdyAFlQXtXlRr1mdMFesjM5TvJiNzZXC5rQooim98YNbuemROaTNwnZMjQFnws00DuREInfM");
  if (!noAds) return;
  noAds.addEventListener('click', subscribe);

  function subscribe(_x16) {
    return _subscribe.apply(this, arguments);
  }

  function _subscribe() {
    _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(e) {
      var session;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              e.preventDefault();

              if (document.querySelector('.navigation__logout')) {
                _context15.next = 3;
                break;
              }

              return _context15.abrupt("return", window.open('/ms2a', '_self'));

            case 3:
              _context15.prev = 3;
              _context15.next = 6;
              return (0, _axios.default)('/api/subscribe/checkout-session');

            case 6:
              session = _context15.sent;

              if (session.data.session.id) {
                console.log(session);
                stripe.redirectToCheckout({
                  sessionId: session.data.session.id
                });
              }

              _context15.next = 13;
              break;

            case 10:
              _context15.prev = 10;
              _context15.t0 = _context15["catch"](3);
              console.log(_context15.t0.response);

            case 13:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[3, 10]]);
    }));
    return _subscribe.apply(this, arguments);
  }
})();

(function () {
  var searchBtn = document.querySelector('.navigation__searchSubmit');
  var searchInput = document.querySelector('.navigation__searchBar');
  searchBtn.addEventListener('click', sendSearch.bind(searchInput));
  searchInput.addEventListener('keydown', function (e) {
    return e.keyCode == 13 && sendSearch.bind(searchInput)(e);
  });

  function sendSearch(e) {
    e.preventDefault();
    if (this.value.length == 0) return;
    window.open("/search/".concat(this.value), '_self');
  }
})();
},{"axios":"../../node_modules/axios/index.js","regenerator-runtime/runtime":"../../node_modules/regenerator-runtime/runtime.js"}]},{},["ms2afunny.js"], null)
//# sourceMappingURL=/ms2a.js.map