/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

// Distribution file for Runtime.js 
// version: 0.6.0
// Last build: Thu Oct 13 2016 11:15:37 GMT+0100 (WEST)

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Runtime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

/* eslint max-len: 0 */

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

// Should be removed in the next major release:

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/fn/regexp/escape":2,"core-js/shim":295,"regenerator-runtime/runtime":296}],2:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":23,"../../modules/core.regexp.escape":119}],3:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":18}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":40,"./_wks":117}],6:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":49}],8:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":105,"./_to-length":108,"./_to-object":109}],9:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":105,"./_to-length":108,"./_to-object":109}],10:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":37}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":105,"./_to-iobject":107,"./_to-length":108}],12:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":15,"./_ctx":25,"./_iobject":45,"./_to-length":108,"./_to-object":109}],13:[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":3,"./_iobject":45,"./_to-length":108,"./_to-object":109}],14:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":47,"./_is-object":49,"./_wks":117}],15:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":14}],16:[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":3,"./_invoke":44,"./_is-object":49}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":18,"./_wks":117}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":6,"./_ctx":25,"./_defined":27,"./_descriptors":28,"./_for-of":37,"./_iter-define":53,"./_iter-step":55,"./_meta":62,"./_object-create":66,"./_object-dp":67,"./_redefine-all":86,"./_set-species":91}],20:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":10,"./_classof":17}],21:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":6,"./_an-object":7,"./_array-methods":12,"./_for-of":37,"./_has":39,"./_is-object":49,"./_meta":62,"./_redefine-all":86}],22:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":6,"./_export":32,"./_fails":34,"./_for-of":37,"./_global":38,"./_inherit-if-required":43,"./_is-object":49,"./_iter-detect":54,"./_meta":62,"./_redefine":87,"./_redefine-all":86,"./_set-to-string-tag":92}],23:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],24:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":67,"./_property-desc":85}],25:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":3}],26:[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":7,"./_to-primitive":110}],27:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":34}],29:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":38,"./_is-object":49}],30:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],31:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":73,"./_object-keys":76,"./_object-pie":77}],32:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":23,"./_ctx":25,"./_global":38,"./_hide":40,"./_redefine":87}],33:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":117}],34:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],35:[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":27,"./_fails":34,"./_hide":40,"./_redefine":87,"./_wks":117}],36:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":7}],37:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":7,"./_ctx":25,"./_is-array-iter":46,"./_iter-call":51,"./_to-length":108,"./core.get-iterator-method":118}],38:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],39:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],40:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":28,"./_object-dp":67,"./_property-desc":85}],41:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":38}],42:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":28,"./_dom-create":29,"./_fails":34}],43:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":49,"./_set-proto":90}],44:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],45:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":18}],46:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":56,"./_wks":117}],47:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":18}],48:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":49}],49:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],50:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":18,"./_is-object":49,"./_wks":117}],51:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":7}],52:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":40,"./_object-create":66,"./_property-desc":85,"./_set-to-string-tag":92,"./_wks":117}],53:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":32,"./_has":39,"./_hide":40,"./_iter-create":52,"./_iterators":56,"./_library":58,"./_object-gpo":74,"./_redefine":87,"./_set-to-string-tag":92,"./_wks":117}],54:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":117}],55:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],56:[function(require,module,exports){
module.exports = {};
},{}],57:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":76,"./_to-iobject":107}],58:[function(require,module,exports){
module.exports = false;
},{}],59:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],60:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],61:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],62:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":34,"./_has":39,"./_is-object":49,"./_object-dp":67,"./_uid":114}],63:[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":32,"./_shared":94,"./es6.map":149,"./es6.weak-map":255}],64:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":18,"./_global":38,"./_task":104}],65:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":34,"./_iobject":45,"./_object-gops":73,"./_object-keys":76,"./_object-pie":77,"./_to-object":109}],66:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":7,"./_dom-create":29,"./_enum-bug-keys":30,"./_html":41,"./_object-dps":68,"./_shared-key":93}],67:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":7,"./_descriptors":28,"./_ie8-dom-define":42,"./_to-primitive":110}],68:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":7,"./_descriptors":28,"./_object-dp":67,"./_object-keys":76}],69:[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":34,"./_global":38,"./_library":58}],70:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":28,"./_has":39,"./_ie8-dom-define":42,"./_object-pie":77,"./_property-desc":85,"./_to-iobject":107,"./_to-primitive":110}],71:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":72,"./_to-iobject":107}],72:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":30,"./_object-keys-internal":75}],73:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],74:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":39,"./_shared-key":93,"./_to-object":109}],75:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":11,"./_has":39,"./_shared-key":93,"./_to-iobject":107}],76:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":30,"./_object-keys-internal":75}],77:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],78:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":23,"./_export":32,"./_fails":34}],79:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":76,"./_object-pie":77,"./_to-iobject":107}],80:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":7,"./_global":38,"./_object-gopn":72,"./_object-gops":73}],81:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":38,"./_string-trim":102,"./_string-ws":103}],82:[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":38,"./_string-trim":102,"./_string-ws":103}],83:[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":3,"./_invoke":44,"./_path":84}],84:[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":38}],85:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],86:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":87}],87:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":23,"./_global":38,"./_has":39,"./_hide":40,"./_uid":114}],88:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],89:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],90:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":7,"./_ctx":25,"./_is-object":49,"./_object-gopd":70}],91:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":28,"./_global":38,"./_object-dp":67,"./_wks":117}],92:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":39,"./_object-dp":67,"./_wks":117}],93:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":94,"./_uid":114}],94:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":38}],95:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":3,"./_an-object":7,"./_wks":117}],96:[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":34}],97:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":27,"./_to-integer":106}],98:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":27,"./_is-regexp":50}],99:[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":27,"./_export":32,"./_fails":34}],100:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":27,"./_string-repeat":101,"./_to-length":108}],101:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":27,"./_to-integer":106}],102:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":27,"./_export":32,"./_fails":34,"./_string-ws":103}],103:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],104:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":18,"./_ctx":25,"./_dom-create":29,"./_global":38,"./_html":41,"./_invoke":44}],105:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":106}],106:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],107:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":27,"./_iobject":45}],108:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":106}],109:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":27}],110:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":49}],111:[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":6,"./_array-copy-within":8,"./_array-fill":9,"./_array-includes":11,"./_array-methods":12,"./_classof":17,"./_ctx":25,"./_descriptors":28,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array-iter":46,"./_is-object":49,"./_iter-detect":54,"./_iterators":56,"./_library":58,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_object-gpo":74,"./_property-desc":85,"./_redefine-all":86,"./_same-value":89,"./_set-species":91,"./_species-constructor":95,"./_to-index":105,"./_to-integer":106,"./_to-length":108,"./_to-object":109,"./_to-primitive":110,"./_typed":113,"./_typed-buffer":112,"./_uid":114,"./_wks":117,"./core.get-iterator-method":118,"./es6.array.iterator":130}],112:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":6,"./_array-fill":9,"./_descriptors":28,"./_fails":34,"./_global":38,"./_hide":40,"./_library":58,"./_object-dp":67,"./_object-gopn":72,"./_redefine-all":86,"./_set-to-string-tag":92,"./_to-integer":106,"./_to-length":108,"./_typed":113}],113:[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":38,"./_hide":40,"./_uid":114}],114:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],115:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":23,"./_global":38,"./_library":58,"./_object-dp":67,"./_wks-ext":116}],116:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":117}],117:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":38,"./_shared":94,"./_uid":114}],118:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":17,"./_core":23,"./_iterators":56,"./_wks":117}],119:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":32,"./_replacer":88}],120:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":5,"./_array-copy-within":8,"./_export":32}],121:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],122:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":5,"./_array-fill":9,"./_export":32}],123:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],124:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":32}],125:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":32}],126:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],127:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":24,"./_ctx":25,"./_export":32,"./_is-array-iter":46,"./_iter-call":51,"./_iter-detect":54,"./_to-length":108,"./_to-object":109,"./core.get-iterator-method":118}],128:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , $indexOf      = require('./_array-includes')(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":11,"./_export":32,"./_strict-method":96}],129:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":32,"./_is-array":47}],130:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":5,"./_iter-define":53,"./_iter-step":55,"./_iterators":56,"./_to-iobject":107}],131:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":32,"./_iobject":45,"./_strict-method":96,"./_to-iobject":107}],132:[function(require,module,exports){
'use strict';
var $export       = require('./_export')
  , toIObject     = require('./_to-iobject')
  , toInteger     = require('./_to-integer')
  , toLength      = require('./_to-length')
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"./_export":32,"./_strict-method":96,"./_to-integer":106,"./_to-iobject":107,"./_to-length":108}],133:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],134:[function(require,module,exports){
'use strict';
var $export        = require('./_export')
  , createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"./_create-property":24,"./_export":32,"./_fails":34}],135:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":13,"./_export":32,"./_strict-method":96}],136:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":13,"./_export":32,"./_strict-method":96}],137:[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":18,"./_export":32,"./_fails":34,"./_html":41,"./_to-index":105,"./_to-length":108}],138:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":32,"./_strict-method":96}],139:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":3,"./_export":32,"./_fails":34,"./_strict-method":96,"./_to-object":109}],140:[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":91}],141:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":32}],142:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":32,"./_fails":34}],143:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":32,"./_fails":34,"./_to-object":109,"./_to-primitive":110}],144:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":26,"./_hide":40,"./_wks":117}],145:[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":87}],146:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":16,"./_export":32}],147:[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":49,"./_object-dp":67,"./_object-gpo":74,"./_wks":117}],148:[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"./_descriptors":28,"./_has":39,"./_object-dp":67,"./_property-desc":85}],149:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":22,"./_collection-strong":19}],150:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":32,"./_math-log1p":60}],151:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export')
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"./_export":32}],152:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export')
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":32}],153:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":32,"./_math-sign":61}],154:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":32}],155:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":32}],156:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export')
  , $expm1  = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"./_export":32,"./_math-expm1":59}],157:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":32,"./_math-sign":61}],158:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":32}],159:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":32,"./_fails":34}],160:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":32}],161:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":32,"./_math-log1p":60}],162:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":32}],163:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":32,"./_math-sign":61}],164:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":32,"./_fails":34,"./_math-expm1":59}],165:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":32,"./_math-expm1":59}],166:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":32}],167:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":18,"./_descriptors":28,"./_fails":34,"./_global":38,"./_has":39,"./_inherit-if-required":43,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_redefine":87,"./_string-trim":102,"./_to-primitive":110}],168:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":32}],169:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":32,"./_global":38}],170:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":32,"./_is-integer":48}],171:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":32}],172:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":32,"./_is-integer":48}],173:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":32}],174:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":32}],175:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":32,"./_parse-float":81}],176:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":32,"./_parse-int":82}],177:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":4,"./_export":32,"./_fails":34,"./_string-repeat":101,"./_to-integer":106}],178:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":4,"./_export":32,"./_fails":34}],179:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":32,"./_object-assign":65}],180:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":32,"./_object-create":66}],181:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":28,"./_export":32,"./_object-dps":68}],182:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":28,"./_export":32,"./_object-dp":67}],183:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],184:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":70,"./_object-sap":78,"./_to-iobject":107}],185:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":71,"./_object-sap":78}],186:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":74,"./_object-sap":78,"./_to-object":109}],187:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":49,"./_object-sap":78}],188:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":49,"./_object-sap":78}],189:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":49,"./_object-sap":78}],190:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":32,"./_same-value":89}],191:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":76,"./_object-sap":78,"./_to-object":109}],192:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],193:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":49,"./_meta":62,"./_object-sap":78}],194:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":32,"./_set-proto":90}],195:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":17,"./_redefine":87,"./_wks":117}],196:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":32,"./_parse-float":81}],197:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":32,"./_parse-int":82}],198:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":3,"./_an-instance":6,"./_classof":17,"./_core":23,"./_ctx":25,"./_export":32,"./_for-of":37,"./_global":38,"./_is-object":49,"./_iter-detect":54,"./_library":58,"./_microtask":64,"./_redefine-all":86,"./_set-species":91,"./_set-to-string-tag":92,"./_species-constructor":95,"./_task":104,"./_wks":117}],199:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , rApply    = (require('./_global').Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
},{"./_a-function":3,"./_an-object":7,"./_export":32,"./_fails":34,"./_global":38}],200:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = require('./_export')
  , create     = require('./_object-create')
  , aFunction  = require('./_a-function')
  , anObject   = require('./_an-object')
  , isObject   = require('./_is-object')
  , fails      = require('./_fails')
  , bind       = require('./_bind')
  , rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":3,"./_an-object":7,"./_bind":16,"./_export":32,"./_fails":34,"./_global":38,"./_is-object":49,"./_object-create":66}],201:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":32,"./_fails":34,"./_object-dp":67,"./_to-primitive":110}],202:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gopd":70}],203:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":7,"./_export":32,"./_iter-create":52}],204:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gopd":70}],205:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":7,"./_export":32,"./_object-gpo":74}],206:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":7,"./_export":32,"./_has":39,"./_is-object":49,"./_object-gopd":70,"./_object-gpo":74}],207:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":32}],208:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":7,"./_export":32}],209:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":32,"./_own-keys":80}],210:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":32}],211:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":32,"./_set-proto":90}],212:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":7,"./_export":32,"./_has":39,"./_is-object":49,"./_object-dp":67,"./_object-gopd":70,"./_object-gpo":74,"./_property-desc":85}],213:[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":28,"./_fails":34,"./_flags":36,"./_global":38,"./_inherit-if-required":43,"./_is-regexp":50,"./_object-dp":67,"./_object-gopn":72,"./_redefine":87,"./_set-species":91,"./_wks":117}],214:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":28,"./_flags":36,"./_object-dp":67}],215:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":35}],216:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":35}],217:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":35}],218:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":35,"./_is-regexp":50}],219:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":7,"./_descriptors":28,"./_fails":34,"./_flags":36,"./_redefine":87,"./es6.regexp.flags":214}],220:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":22,"./_collection-strong":19}],221:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":99}],222:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":99}],223:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":99}],224:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":99}],225:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":32,"./_string-at":97}],226:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98,"./_to-length":108}],227:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":99}],228:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":99}],229:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":99}],230:[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":32,"./_to-index":105}],231:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98}],232:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":99}],233:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":53,"./_string-at":97}],234:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":99}],235:[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":32,"./_to-iobject":107,"./_to-length":108}],236:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":32,"./_string-repeat":101}],237:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":99}],238:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":98,"./_to-length":108}],239:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":99}],240:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":99}],241:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":99}],242:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":102}],243:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":7,"./_descriptors":28,"./_enum-keys":31,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array":47,"./_keyof":57,"./_library":58,"./_meta":62,"./_object-create":66,"./_object-dp":67,"./_object-gopd":70,"./_object-gopn":72,"./_object-gopn-ext":71,"./_object-gops":73,"./_object-keys":76,"./_object-pie":77,"./_property-desc":85,"./_redefine":87,"./_set-to-string-tag":92,"./_shared":94,"./_to-iobject":107,"./_to-primitive":110,"./_uid":114,"./_wks":117,"./_wks-define":115,"./_wks-ext":116}],244:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":7,"./_export":32,"./_fails":34,"./_global":38,"./_is-object":49,"./_set-species":91,"./_species-constructor":95,"./_to-index":105,"./_to-length":108,"./_typed":113,"./_typed-buffer":112}],245:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":32,"./_typed":113,"./_typed-buffer":112}],246:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],247:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],248:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],249:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],250:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],251:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],252:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],253:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":111}],254:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":111}],255:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":12,"./_collection":22,"./_collection-weak":21,"./_is-object":49,"./_meta":62,"./_object-assign":65,"./_redefine":87}],256:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":22,"./_collection-weak":21}],257:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":5,"./_array-includes":11,"./_export":32}],258:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = require('./_export')
  , microtask = require('./_microtask')()
  , process   = require('./_global').process
  , isNode    = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"./_cof":18,"./_export":32,"./_global":38,"./_microtask":64}],259:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":18,"./_export":32}],260:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":20,"./_export":32}],261:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":32}],262:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":32}],263:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":32}],264:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":32}],265:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":28,"./_export":32,"./_object-dp":67,"./_object-forced-pam":69,"./_to-object":109}],266:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":28,"./_export":32,"./_object-dp":67,"./_object-forced-pam":69,"./_to-object":109}],267:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":32,"./_object-to-array":79}],268:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = require('./_export')
  , ownKeys        = require('./_own-keys')
  , toIObject      = require('./_to-iobject')
  , gOPD           = require('./_object-gopd')
  , createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"./_create-property":24,"./_export":32,"./_object-gopd":70,"./_own-keys":80,"./_to-iobject":107}],269:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":28,"./_export":32,"./_object-forced-pam":69,"./_object-gopd":70,"./_object-gpo":74,"./_to-object":109,"./_to-primitive":110}],270:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":28,"./_export":32,"./_object-forced-pam":69,"./_object-gopd":70,"./_object-gpo":74,"./_to-object":109,"./_to-primitive":110}],271:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":32,"./_object-to-array":79}],272:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = require('./_export')
  , global      = require('./_global')
  , core        = require('./_core')
  , microtask   = require('./_microtask')()
  , OBSERVABLE  = require('./_wks')('observable')
  , aFunction   = require('./_a-function')
  , anObject    = require('./_an-object')
  , anInstance  = require('./_an-instance')
  , redefineAll = require('./_redefine-all')
  , hide        = require('./_hide')
  , forOf       = require('./_for-of')
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

require('./_set-species')('Observable');
},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_core":23,"./_export":32,"./_for-of":37,"./_global":38,"./_hide":40,"./_microtask":64,"./_redefine-all":86,"./_set-species":91,"./_wks":117}],273:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":7,"./_metadata":63}],274:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":7,"./_metadata":63}],275:[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_array-from-iterable":10,"./_metadata":63,"./_object-gpo":74,"./es6.set":220}],276:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63,"./_object-gpo":74}],277:[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_metadata":63}],278:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63}],279:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63,"./_object-gpo":74}],280:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":63}],281:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":3,"./_an-object":7,"./_metadata":63}],282:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":20,"./_export":32}],283:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":32,"./_string-at":97}],284:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":27,"./_export":32,"./_flags":36,"./_is-regexp":50,"./_iter-create":52,"./_to-length":108}],285:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":32,"./_string-pad":100}],286:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":32,"./_string-pad":100}],287:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":102}],288:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":102}],289:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":115}],290:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":115}],291:[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":32,"./_global":38}],292:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":38,"./_hide":40,"./_iterators":56,"./_redefine":87,"./_wks":117,"./es6.array.iterator":130}],293:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":32,"./_task":104}],294:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":32,"./_global":38,"./_invoke":44,"./_partial":83}],295:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":23,"./modules/es6.array.copy-within":120,"./modules/es6.array.every":121,"./modules/es6.array.fill":122,"./modules/es6.array.filter":123,"./modules/es6.array.find":125,"./modules/es6.array.find-index":124,"./modules/es6.array.for-each":126,"./modules/es6.array.from":127,"./modules/es6.array.index-of":128,"./modules/es6.array.is-array":129,"./modules/es6.array.iterator":130,"./modules/es6.array.join":131,"./modules/es6.array.last-index-of":132,"./modules/es6.array.map":133,"./modules/es6.array.of":134,"./modules/es6.array.reduce":136,"./modules/es6.array.reduce-right":135,"./modules/es6.array.slice":137,"./modules/es6.array.some":138,"./modules/es6.array.sort":139,"./modules/es6.array.species":140,"./modules/es6.date.now":141,"./modules/es6.date.to-iso-string":142,"./modules/es6.date.to-json":143,"./modules/es6.date.to-primitive":144,"./modules/es6.date.to-string":145,"./modules/es6.function.bind":146,"./modules/es6.function.has-instance":147,"./modules/es6.function.name":148,"./modules/es6.map":149,"./modules/es6.math.acosh":150,"./modules/es6.math.asinh":151,"./modules/es6.math.atanh":152,"./modules/es6.math.cbrt":153,"./modules/es6.math.clz32":154,"./modules/es6.math.cosh":155,"./modules/es6.math.expm1":156,"./modules/es6.math.fround":157,"./modules/es6.math.hypot":158,"./modules/es6.math.imul":159,"./modules/es6.math.log10":160,"./modules/es6.math.log1p":161,"./modules/es6.math.log2":162,"./modules/es6.math.sign":163,"./modules/es6.math.sinh":164,"./modules/es6.math.tanh":165,"./modules/es6.math.trunc":166,"./modules/es6.number.constructor":167,"./modules/es6.number.epsilon":168,"./modules/es6.number.is-finite":169,"./modules/es6.number.is-integer":170,"./modules/es6.number.is-nan":171,"./modules/es6.number.is-safe-integer":172,"./modules/es6.number.max-safe-integer":173,"./modules/es6.number.min-safe-integer":174,"./modules/es6.number.parse-float":175,"./modules/es6.number.parse-int":176,"./modules/es6.number.to-fixed":177,"./modules/es6.number.to-precision":178,"./modules/es6.object.assign":179,"./modules/es6.object.create":180,"./modules/es6.object.define-properties":181,"./modules/es6.object.define-property":182,"./modules/es6.object.freeze":183,"./modules/es6.object.get-own-property-descriptor":184,"./modules/es6.object.get-own-property-names":185,"./modules/es6.object.get-prototype-of":186,"./modules/es6.object.is":190,"./modules/es6.object.is-extensible":187,"./modules/es6.object.is-frozen":188,"./modules/es6.object.is-sealed":189,"./modules/es6.object.keys":191,"./modules/es6.object.prevent-extensions":192,"./modules/es6.object.seal":193,"./modules/es6.object.set-prototype-of":194,"./modules/es6.object.to-string":195,"./modules/es6.parse-float":196,"./modules/es6.parse-int":197,"./modules/es6.promise":198,"./modules/es6.reflect.apply":199,"./modules/es6.reflect.construct":200,"./modules/es6.reflect.define-property":201,"./modules/es6.reflect.delete-property":202,"./modules/es6.reflect.enumerate":203,"./modules/es6.reflect.get":206,"./modules/es6.reflect.get-own-property-descriptor":204,"./modules/es6.reflect.get-prototype-of":205,"./modules/es6.reflect.has":207,"./modules/es6.reflect.is-extensible":208,"./modules/es6.reflect.own-keys":209,"./modules/es6.reflect.prevent-extensions":210,"./modules/es6.reflect.set":212,"./modules/es6.reflect.set-prototype-of":211,"./modules/es6.regexp.constructor":213,"./modules/es6.regexp.flags":214,"./modules/es6.regexp.match":215,"./modules/es6.regexp.replace":216,"./modules/es6.regexp.search":217,"./modules/es6.regexp.split":218,"./modules/es6.regexp.to-string":219,"./modules/es6.set":220,"./modules/es6.string.anchor":221,"./modules/es6.string.big":222,"./modules/es6.string.blink":223,"./modules/es6.string.bold":224,"./modules/es6.string.code-point-at":225,"./modules/es6.string.ends-with":226,"./modules/es6.string.fixed":227,"./modules/es6.string.fontcolor":228,"./modules/es6.string.fontsize":229,"./modules/es6.string.from-code-point":230,"./modules/es6.string.includes":231,"./modules/es6.string.italics":232,"./modules/es6.string.iterator":233,"./modules/es6.string.link":234,"./modules/es6.string.raw":235,"./modules/es6.string.repeat":236,"./modules/es6.string.small":237,"./modules/es6.string.starts-with":238,"./modules/es6.string.strike":239,"./modules/es6.string.sub":240,"./modules/es6.string.sup":241,"./modules/es6.string.trim":242,"./modules/es6.symbol":243,"./modules/es6.typed.array-buffer":244,"./modules/es6.typed.data-view":245,"./modules/es6.typed.float32-array":246,"./modules/es6.typed.float64-array":247,"./modules/es6.typed.int16-array":248,"./modules/es6.typed.int32-array":249,"./modules/es6.typed.int8-array":250,"./modules/es6.typed.uint16-array":251,"./modules/es6.typed.uint32-array":252,"./modules/es6.typed.uint8-array":253,"./modules/es6.typed.uint8-clamped-array":254,"./modules/es6.weak-map":255,"./modules/es6.weak-set":256,"./modules/es7.array.includes":257,"./modules/es7.asap":258,"./modules/es7.error.is-error":259,"./modules/es7.map.to-json":260,"./modules/es7.math.iaddh":261,"./modules/es7.math.imulh":262,"./modules/es7.math.isubh":263,"./modules/es7.math.umulh":264,"./modules/es7.object.define-getter":265,"./modules/es7.object.define-setter":266,"./modules/es7.object.entries":267,"./modules/es7.object.get-own-property-descriptors":268,"./modules/es7.object.lookup-getter":269,"./modules/es7.object.lookup-setter":270,"./modules/es7.object.values":271,"./modules/es7.observable":272,"./modules/es7.reflect.define-metadata":273,"./modules/es7.reflect.delete-metadata":274,"./modules/es7.reflect.get-metadata":276,"./modules/es7.reflect.get-metadata-keys":275,"./modules/es7.reflect.get-own-metadata":278,"./modules/es7.reflect.get-own-metadata-keys":277,"./modules/es7.reflect.has-metadata":279,"./modules/es7.reflect.has-own-metadata":280,"./modules/es7.reflect.metadata":281,"./modules/es7.set.to-json":282,"./modules/es7.string.at":283,"./modules/es7.string.match-all":284,"./modules/es7.string.pad-end":285,"./modules/es7.string.pad-start":286,"./modules/es7.string.trim-left":287,"./modules/es7.string.trim-right":288,"./modules/es7.symbol.async-iterator":289,"./modules/es7.symbol.observable":290,"./modules/es7.system.global":291,"./modules/web.dom.iterable":292,"./modules/web.immediate":293,"./modules/web.timers":294}],296:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

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

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
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

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
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

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

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

  runtime.keys = function(object) {
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
  runtime.values = values;

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
        return !!caught;
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
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
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

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":415}],297:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":315}],298:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":316}],299:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":317}],300:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":318}],301:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":319}],302:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":320}],303:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/is-frozen"), __esModule: true };
},{"core-js/library/fn/object/is-frozen":321}],304:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":322}],305:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":323}],306:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":324}],307:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":325}],308:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":326}],309:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],310:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":300}],311:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":301,"../core-js/object/get-prototype-of":302}],312:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":299,"../core-js/object/set-prototype-of":305,"../helpers/typeof":314}],313:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":314}],314:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":307,"../core-js/symbol/iterator":308}],315:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":334}],316:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":334,"../../modules/es6.object.assign":400}],317:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":334,"../../modules/es6.object.create":401}],318:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":334,"../../modules/es6.object.define-property":402}],319:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":334,"../../modules/es6.object.get-own-property-descriptor":403}],320:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":334,"../../modules/es6.object.get-prototype-of":404}],321:[function(require,module,exports){
require('../../modules/es6.object.is-frozen');
module.exports = require('../../modules/_core').Object.isFrozen;
},{"../../modules/_core":334,"../../modules/es6.object.is-frozen":405}],322:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":334,"../../modules/es6.object.keys":406}],323:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":334,"../../modules/es6.object.set-prototype-of":407}],324:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":334,"../modules/es6.object.to-string":408,"../modules/es6.promise":409,"../modules/es6.string.iterator":410,"../modules/web.dom.iterable":414}],325:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":334,"../../modules/es6.object.to-string":408,"../../modules/es6.symbol":411,"../../modules/es7.symbol.async-iterator":412,"../../modules/es7.symbol.observable":413}],326:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":396,"../../modules/es6.string.iterator":410,"../../modules/web.dom.iterable":414}],327:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],328:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],329:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],330:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./_is-object":353,"dup":7}],331:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./_to-index":388,"./_to-iobject":390,"./_to-length":391,"dup":11}],332:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./_cof":333,"./_wks":397,"dup":17}],333:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],334:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],335:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"./_a-function":327,"dup":25}],336:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],337:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./_fails":342,"dup":28}],338:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./_global":344,"./_is-object":353,"dup":29}],339:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],340:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./_object-gops":371,"./_object-keys":374,"./_object-pie":375,"dup":31}],341:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":334,"./_ctx":335,"./_global":344,"./_hide":346}],342:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],343:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"./_an-object":330,"./_ctx":335,"./_is-array-iter":351,"./_iter-call":354,"./_to-length":391,"./core.get-iterator-method":398,"dup":37}],344:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],345:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39}],346:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./_descriptors":337,"./_object-dp":366,"./_property-desc":377,"dup":40}],347:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"./_global":344,"dup":41}],348:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./_descriptors":337,"./_dom-create":338,"./_fails":342,"dup":42}],349:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],350:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"./_cof":333,"dup":45}],351:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./_iterators":359,"./_wks":397,"dup":46}],352:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"./_cof":333,"dup":47}],353:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],354:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"./_an-object":330,"dup":51}],355:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"./_hide":346,"./_object-create":365,"./_property-desc":377,"./_set-to-string-tag":382,"./_wks":397,"dup":52}],356:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"./_export":341,"./_has":345,"./_hide":346,"./_iter-create":355,"./_iterators":359,"./_library":361,"./_object-gpo":372,"./_redefine":379,"./_set-to-string-tag":382,"./_wks":397,"dup":53}],357:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"./_wks":397,"dup":54}],358:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],359:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],360:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"./_object-keys":374,"./_to-iobject":390,"dup":57}],361:[function(require,module,exports){
module.exports = true;
},{}],362:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./_fails":342,"./_has":345,"./_is-object":353,"./_object-dp":366,"./_uid":394,"dup":62}],363:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./_cof":333,"./_global":344,"./_task":387,"dup":64}],364:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./_fails":342,"./_iobject":350,"./_object-gops":371,"./_object-keys":374,"./_object-pie":375,"./_to-object":392,"dup":65}],365:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./_an-object":330,"./_dom-create":338,"./_enum-bug-keys":339,"./_html":347,"./_object-dps":367,"./_shared-key":383,"dup":66}],366:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./_an-object":330,"./_descriptors":337,"./_ie8-dom-define":348,"./_to-primitive":393,"dup":67}],367:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"./_an-object":330,"./_descriptors":337,"./_object-dp":366,"./_object-keys":374,"dup":68}],368:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"./_descriptors":337,"./_has":345,"./_ie8-dom-define":348,"./_object-pie":375,"./_property-desc":377,"./_to-iobject":390,"./_to-primitive":393,"dup":70}],369:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_object-gopn":370,"./_to-iobject":390,"dup":71}],370:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"./_enum-bug-keys":339,"./_object-keys-internal":373,"dup":72}],371:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"dup":73}],372:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"./_has":345,"./_shared-key":383,"./_to-object":392,"dup":74}],373:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./_array-includes":331,"./_has":345,"./_shared-key":383,"./_to-iobject":390,"dup":75}],374:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"./_enum-bug-keys":339,"./_object-keys-internal":373,"dup":76}],375:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"dup":77}],376:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"./_core":334,"./_export":341,"./_fails":342,"dup":78}],377:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],378:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":346}],379:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":346}],380:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./_an-object":330,"./_ctx":335,"./_is-object":353,"./_object-gopd":368,"dup":90}],381:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":334,"./_descriptors":337,"./_global":344,"./_object-dp":366,"./_wks":397}],382:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"./_has":345,"./_object-dp":366,"./_wks":397,"dup":92}],383:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"./_shared":384,"./_uid":394,"dup":93}],384:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"./_global":344,"dup":94}],385:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./_a-function":327,"./_an-object":330,"./_wks":397,"dup":95}],386:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"./_defined":336,"./_to-integer":389,"dup":97}],387:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"./_cof":333,"./_ctx":335,"./_dom-create":338,"./_global":344,"./_html":347,"./_invoke":349,"dup":104}],388:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"./_to-integer":389,"dup":105}],389:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],390:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"./_defined":336,"./_iobject":350,"dup":107}],391:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"./_to-integer":389,"dup":108}],392:[function(require,module,exports){
arguments[4][109][0].apply(exports,arguments)
},{"./_defined":336,"dup":109}],393:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"./_is-object":353,"dup":110}],394:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"dup":114}],395:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./_core":334,"./_global":344,"./_library":361,"./_object-dp":366,"./_wks-ext":396,"dup":115}],396:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"./_wks":397,"dup":116}],397:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"./_global":344,"./_shared":384,"./_uid":394,"dup":117}],398:[function(require,module,exports){
arguments[4][118][0].apply(exports,arguments)
},{"./_classof":332,"./_core":334,"./_iterators":359,"./_wks":397,"dup":118}],399:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"./_add-to-unscopables":328,"./_iter-define":356,"./_iter-step":358,"./_iterators":359,"./_to-iobject":390,"dup":130}],400:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"./_export":341,"./_object-assign":364,"dup":179}],401:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"./_export":341,"./_object-create":365,"dup":180}],402:[function(require,module,exports){
arguments[4][182][0].apply(exports,arguments)
},{"./_descriptors":337,"./_export":341,"./_object-dp":366,"dup":182}],403:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"./_object-gopd":368,"./_object-sap":376,"./_to-iobject":390,"dup":184}],404:[function(require,module,exports){
arguments[4][186][0].apply(exports,arguments)
},{"./_object-gpo":372,"./_object-sap":376,"./_to-object":392,"dup":186}],405:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"./_is-object":353,"./_object-sap":376,"dup":188}],406:[function(require,module,exports){
arguments[4][191][0].apply(exports,arguments)
},{"./_object-keys":374,"./_object-sap":376,"./_to-object":392,"dup":191}],407:[function(require,module,exports){
arguments[4][194][0].apply(exports,arguments)
},{"./_export":341,"./_set-proto":380,"dup":194}],408:[function(require,module,exports){

},{}],409:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"./_a-function":327,"./_an-instance":329,"./_classof":332,"./_core":334,"./_ctx":335,"./_export":341,"./_for-of":343,"./_global":344,"./_is-object":353,"./_iter-detect":357,"./_library":361,"./_microtask":363,"./_redefine-all":378,"./_set-species":381,"./_set-to-string-tag":382,"./_species-constructor":385,"./_task":387,"./_wks":397,"dup":198}],410:[function(require,module,exports){
arguments[4][233][0].apply(exports,arguments)
},{"./_iter-define":356,"./_string-at":386,"dup":233}],411:[function(require,module,exports){
arguments[4][243][0].apply(exports,arguments)
},{"./_an-object":330,"./_descriptors":337,"./_enum-keys":340,"./_export":341,"./_fails":342,"./_global":344,"./_has":345,"./_hide":346,"./_is-array":352,"./_keyof":360,"./_library":361,"./_meta":362,"./_object-create":365,"./_object-dp":366,"./_object-gopd":368,"./_object-gopn":370,"./_object-gopn-ext":369,"./_object-gops":371,"./_object-keys":374,"./_object-pie":375,"./_property-desc":377,"./_redefine":379,"./_set-to-string-tag":382,"./_shared":384,"./_to-iobject":390,"./_to-primitive":393,"./_uid":394,"./_wks":397,"./_wks-define":395,"./_wks-ext":396,"dup":243}],412:[function(require,module,exports){
arguments[4][289][0].apply(exports,arguments)
},{"./_wks-define":395,"dup":289}],413:[function(require,module,exports){
arguments[4][290][0].apply(exports,arguments)
},{"./_wks-define":395,"dup":290}],414:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":344,"./_hide":346,"./_iterators":359,"./_wks":397,"./es6.array.iterator":399}],415:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],416:[function(require,module,exports){
(function (global){
/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

// Distribution file for MessageFactory.js 
// version: 0.4.0
// Last build: Mon Sep 26 2016 18:30:51 GMT+0100 (WEST)

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.MessageFactory=e()}}(function(){var e;return function t(e,r,n){function o(a,s){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(t){var r=e[a][1][t];return o(r?r:t)},l,l.exports,t,e,r,n)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,t,r){t.exports={"default":e("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":16}],2:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/create"),__esModule:!0}},{"core-js/library/fn/object/create":17}],3:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":18}],4:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/freeze"),__esModule:!0}},{"core-js/library/fn/object/freeze":19}],5:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/get-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/get-prototype-of":20}],6:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/keys"),__esModule:!0}},{"core-js/library/fn/object/keys":21}],7:[function(e,t,r){t.exports={"default":e("core-js/library/fn/object/set-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/set-prototype-of":22}],8:[function(e,t,r){t.exports={"default":e("core-js/library/fn/symbol"),__esModule:!0}},{"core-js/library/fn/symbol":23}],9:[function(e,t,r){t.exports={"default":e("core-js/library/fn/symbol/iterator"),__esModule:!0}},{"core-js/library/fn/symbol/iterator":24}],10:[function(e,t,r){"use strict";r.__esModule=!0,r["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],11:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}r.__esModule=!0;var o=e("../core-js/object/define-property"),i=n(o);r["default"]=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,i["default"])(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()},{"../core-js/object/define-property":3}],12:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}r.__esModule=!0;var o=e("../core-js/object/set-prototype-of"),i=n(o),a=e("../core-js/object/create"),s=n(a),u=e("../helpers/typeof"),c=n(u);r["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,c["default"])(t)));e.prototype=(0,s["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(i["default"]?(0,i["default"])(e,t):e.__proto__=t)}},{"../core-js/object/create":2,"../core-js/object/set-prototype-of":7,"../helpers/typeof":14}],13:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}r.__esModule=!0;var o=e("../helpers/typeof"),i=n(o);r["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,i["default"])(t))&&"function"!=typeof t?e:t}},{"../helpers/typeof":14}],14:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}r.__esModule=!0;var o=e("../core-js/symbol/iterator"),i=n(o),a=e("../core-js/symbol"),s=n(a),u="function"==typeof s["default"]&&"symbol"==typeof i["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":typeof e};r["default"]="function"==typeof s["default"]&&"symbol"===u(i["default"])?function(e){return"undefined"==typeof e?"undefined":u(e)}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":"undefined"==typeof e?"undefined":u(e)}},{"../core-js/symbol":8,"../core-js/symbol/iterator":9}],15:[function(e,t,r){t.exports=e("regenerator-runtime")},{"regenerator-runtime":97}],16:[function(e,t,r){var n=e("../../modules/_core"),o=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(e){return o.stringify.apply(o,arguments)}},{"../../modules/_core":30}],17:[function(e,t,r){e("../../modules/es6.object.create");var n=e("../../modules/_core").Object;t.exports=function(e,t){return n.create(e,t)}},{"../../modules/_core":30,"../../modules/es6.object.create":84}],18:[function(e,t,r){e("../../modules/es6.object.define-property");var n=e("../../modules/_core").Object;t.exports=function(e,t,r){return n.defineProperty(e,t,r)}},{"../../modules/_core":30,"../../modules/es6.object.define-property":85}],19:[function(e,t,r){e("../../modules/es6.object.freeze"),t.exports=e("../../modules/_core").Object.freeze},{"../../modules/_core":30,"../../modules/es6.object.freeze":86}],20:[function(e,t,r){e("../../modules/es6.object.get-prototype-of"),t.exports=e("../../modules/_core").Object.getPrototypeOf},{"../../modules/_core":30,"../../modules/es6.object.get-prototype-of":87}],21:[function(e,t,r){e("../../modules/es6.object.keys"),t.exports=e("../../modules/_core").Object.keys},{"../../modules/_core":30,"../../modules/es6.object.keys":88}],22:[function(e,t,r){e("../../modules/es6.object.set-prototype-of"),t.exports=e("../../modules/_core").Object.setPrototypeOf},{"../../modules/_core":30,"../../modules/es6.object.set-prototype-of":89}],23:[function(e,t,r){e("../../modules/es6.symbol"),e("../../modules/es6.object.to-string"),e("../../modules/es7.symbol.async-iterator"),e("../../modules/es7.symbol.observable"),t.exports=e("../../modules/_core").Symbol},{"../../modules/_core":30,"../../modules/es6.object.to-string":90,"../../modules/es6.symbol":92,"../../modules/es7.symbol.async-iterator":93,"../../modules/es7.symbol.observable":94}],24:[function(e,t,r){e("../../modules/es6.string.iterator"),e("../../modules/web.dom.iterable"),t.exports=e("../../modules/_wks-ext").f("iterator")},{"../../modules/_wks-ext":81,"../../modules/es6.string.iterator":91,"../../modules/web.dom.iterable":95}],25:[function(e,t,r){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],26:[function(e,t,r){t.exports=function(){}},{}],27:[function(e,t,r){var n=e("./_is-object");t.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":46}],28:[function(e,t,r){var n=e("./_to-iobject"),o=e("./_to-length"),i=e("./_to-index");t.exports=function(e){return function(t,r,a){var s,u=n(t),c=o(u.length),l=i(a,c);if(e&&r!=r){for(;c>l;)if(s=u[l++],s!=s)return!0}else for(;c>l;l++)if((e||l in u)&&u[l]===r)return e||l||0;return!e&&-1}}},{"./_to-index":73,"./_to-iobject":75,"./_to-length":76}],29:[function(e,t,r){var n={}.toString;t.exports=function(e){return n.call(e).slice(8,-1)}},{}],30:[function(e,t,r){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},{}],31:[function(e,t,r){var n=e("./_a-function");t.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,o){return e.call(t,r,n,o)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":25}],32:[function(e,t,r){t.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},{}],33:[function(e,t,r){t.exports=!e("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":38}],34:[function(e,t,r){var n=e("./_is-object"),o=e("./_global").document,i=n(o)&&n(o.createElement);t.exports=function(e){return i?o.createElement(e):{}}},{"./_global":39,"./_is-object":46}],35:[function(e,t,r){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],36:[function(e,t,r){var n=e("./_object-keys"),o=e("./_object-gops"),i=e("./_object-pie");t.exports=function(e){var t=n(e),r=o.f;if(r)for(var a,s=r(e),u=i.f,c=0;s.length>c;)u.call(e,a=s[c++])&&t.push(a);return t}},{"./_object-gops":60,"./_object-keys":63,"./_object-pie":64}],37:[function(e,t,r){var n=e("./_global"),o=e("./_core"),i=e("./_ctx"),a=e("./_hide"),s="prototype",u=function(e,t,r){var c,l,f,d=e&u.F,p=e&u.G,h=e&u.S,y=e&u.P,m=e&u.B,v=e&u.W,_=p?o:o[t]||(o[t]={}),b=_[s],g=p?n:h?n[t]:(n[t]||{})[s];p&&(r=t);for(c in r)l=!d&&g&&void 0!==g[c],l&&c in _||(f=l?g[c]:r[c],_[c]=p&&"function"!=typeof g[c]?r[c]:m&&l?i(f,n):v&&g[c]==f?function(e){var t=function(t,r,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,n)}return e.apply(this,arguments)};return t[s]=e[s],t}(f):y&&"function"==typeof f?i(Function.call,f):f,y&&((_.virtual||(_.virtual={}))[c]=f,e&u.R&&b&&!b[c]&&a(b,c,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},{"./_core":30,"./_ctx":31,"./_global":39,"./_hide":41}],38:[function(e,t,r){t.exports=function(e){try{return!!e()}catch(t){return!0}}},{}],39:[function(e,t,r){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},{}],40:[function(e,t,r){var n={}.hasOwnProperty;t.exports=function(e,t){return n.call(e,t)}},{}],41:[function(e,t,r){var n=e("./_object-dp"),o=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,r){return n.f(e,t,o(1,r))}:function(e,t,r){return e[t]=r,e}},{"./_descriptors":33,"./_object-dp":55,"./_property-desc":66}],42:[function(e,t,r){t.exports=e("./_global").document&&document.documentElement},{"./_global":39}],43:[function(e,t,r){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return 7!=Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":33,"./_dom-create":34,"./_fails":38}],44:[function(e,t,r){var n=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==n(e)?e.split(""):Object(e)}},{"./_cof":29}],45:[function(e,t,r){var n=e("./_cof");t.exports=Array.isArray||function(e){return"Array"==n(e)}},{"./_cof":29}],46:[function(e,t,r){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],47:[function(e,t,r){"use strict";var n=e("./_object-create"),o=e("./_property-desc"),i=e("./_set-to-string-tag"),a={};e("./_hide")(a,e("./_wks")("iterator"),function(){return this}),t.exports=function(e,t,r){e.prototype=n(a,{next:o(1,r)}),i(e,t+" Iterator")}},{"./_hide":41,"./_object-create":54,"./_property-desc":66,"./_set-to-string-tag":69,"./_wks":82}],48:[function(e,t,r){"use strict";var n=e("./_library"),o=e("./_export"),i=e("./_redefine"),a=e("./_hide"),s=e("./_has"),u=e("./_iterators"),c=e("./_iter-create"),l=e("./_set-to-string-tag"),f=e("./_object-gpo"),d=e("./_wks")("iterator"),p=!([].keys&&"next"in[].keys()),h="@@iterator",y="keys",m="values",v=function(){return this};t.exports=function(e,t,r,_,b,g,E){c(r,t,_);var j,w,O,M=function(e){if(!p&&e in R)return R[e];switch(e){case y:return function(){return new r(this,e)};case m:return function(){return new r(this,e)}}return function(){return new r(this,e)}},x=t+" Iterator",P=b==m,k=!1,R=e.prototype,S=R[d]||R[h]||b&&R[b],A=S||M(b),T=b?P?M("entries"):A:void 0,N="Array"==t?R.entries||S:S;if(N&&(O=f(N.call(new e)),O!==Object.prototype&&(l(O,x,!0),n||s(O,d)||a(O,d,v))),P&&S&&S.name!==m&&(k=!0,A=function(){return S.call(this)}),n&&!E||!p&&!k&&R[d]||a(R,d,A),u[t]=A,u[x]=v,b)if(j={values:P?A:M(m),keys:g?A:M(y),entries:T},E)for(w in j)w in R||i(R,w,j[w]);else o(o.P+o.F*(p||k),t,j);return j}},{"./_export":37,"./_has":40,"./_hide":41,"./_iter-create":47,"./_iterators":50,"./_library":52,"./_object-gpo":61,"./_redefine":67,"./_set-to-string-tag":69,"./_wks":82}],49:[function(e,t,r){t.exports=function(e,t){return{value:t,done:!!e}}},{}],50:[function(e,t,r){t.exports={}},{}],51:[function(e,t,r){var n=e("./_object-keys"),o=e("./_to-iobject");t.exports=function(e,t){for(var r,i=o(e),a=n(i),s=a.length,u=0;s>u;)if(i[r=a[u++]]===t)return r}},{"./_object-keys":63,"./_to-iobject":75}],52:[function(e,t,r){t.exports=!0},{}],53:[function(e,t,r){var n=e("./_uid")("meta"),o=e("./_is-object"),i=e("./_has"),a=e("./_object-dp").f,s=0,u=Object.isExtensible||function(){return!0},c=!e("./_fails")(function(){return u(Object.preventExtensions({}))}),l=function(e){a(e,n,{value:{i:"O"+ ++s,w:{}}})},f=function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,n)){if(!u(e))return"F";if(!t)return"E";l(e)}return e[n].i},d=function(e,t){if(!i(e,n)){if(!u(e))return!0;if(!t)return!1;l(e)}return e[n].w},p=function(e){return c&&h.NEED&&u(e)&&!i(e,n)&&l(e),e},h=t.exports={KEY:n,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},{"./_fails":38,"./_has":40,"./_is-object":46,"./_object-dp":55,"./_uid":79}],54:[function(e,t,r){var n=e("./_an-object"),o=e("./_object-dps"),i=e("./_enum-bug-keys"),a=e("./_shared-key")("IE_PROTO"),s=function(){},u="prototype",c=function(){var t,r=e("./_dom-create")("iframe"),n=i.length,o=">";for(r.style.display="none",e("./_html").appendChild(r),r.src="javascript:",t=r.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),c=t.F;n--;)delete c[u][i[n]];return c()};t.exports=Object.create||function(e,t){var r;return null!==e?(s[u]=n(e),r=new s,s[u]=null,r[a]=e):r=c(),void 0===t?r:o(r,t)}},{"./_an-object":27,"./_dom-create":34,"./_enum-bug-keys":35,"./_html":42,"./_object-dps":56,"./_shared-key":70}],55:[function(e,t,r){var n=e("./_an-object"),o=e("./_ie8-dom-define"),i=e("./_to-primitive"),a=Object.defineProperty;r.f=e("./_descriptors")?Object.defineProperty:function(e,t,r){if(n(e),t=i(t,!0),n(r),o)try{return a(e,t,r)}catch(s){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},{"./_an-object":27,"./_descriptors":33,"./_ie8-dom-define":43,"./_to-primitive":78}],56:[function(e,t,r){var n=e("./_object-dp"),o=e("./_an-object"),i=e("./_object-keys");t.exports=e("./_descriptors")?Object.defineProperties:function(e,t){o(e);for(var r,a=i(t),s=a.length,u=0;s>u;)n.f(e,r=a[u++],t[r]);return e}},{"./_an-object":27,"./_descriptors":33,"./_object-dp":55,"./_object-keys":63}],57:[function(e,t,r){var n=e("./_object-pie"),o=e("./_property-desc"),i=e("./_to-iobject"),a=e("./_to-primitive"),s=e("./_has"),u=e("./_ie8-dom-define"),c=Object.getOwnPropertyDescriptor;r.f=e("./_descriptors")?c:function(e,t){if(e=i(e),t=a(t,!0),u)try{return c(e,t)}catch(r){}if(s(e,t))return o(!n.f.call(e,t),e[t])}},{"./_descriptors":33,"./_has":40,"./_ie8-dom-define":43,"./_object-pie":64,"./_property-desc":66,"./_to-iobject":75,"./_to-primitive":78}],58:[function(e,t,r){var n=e("./_to-iobject"),o=e("./_object-gopn").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return o(e)}catch(t){return a.slice()}};t.exports.f=function(e){return a&&"[object Window]"==i.call(e)?s(e):o(n(e))}},{"./_object-gopn":59,"./_to-iobject":75}],59:[function(e,t,r){var n=e("./_object-keys-internal"),o=e("./_enum-bug-keys").concat("length","prototype");r.f=Object.getOwnPropertyNames||function(e){return n(e,o)}},{"./_enum-bug-keys":35,"./_object-keys-internal":62}],60:[function(e,t,r){r.f=Object.getOwnPropertySymbols},{}],61:[function(e,t,r){var n=e("./_has"),o=e("./_to-object"),i=e("./_shared-key")("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(e){return e=o(e),n(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},{"./_has":40,"./_shared-key":70,"./_to-object":77}],62:[function(e,t,r){var n=e("./_has"),o=e("./_to-iobject"),i=e("./_array-includes")(!1),a=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var r,s=o(e),u=0,c=[];for(r in s)r!=a&&n(s,r)&&c.push(r);for(;t.length>u;)n(s,r=t[u++])&&(~i(c,r)||c.push(r));return c}},{"./_array-includes":28,"./_has":40,"./_shared-key":70,"./_to-iobject":75}],63:[function(e,t,r){var n=e("./_object-keys-internal"),o=e("./_enum-bug-keys");t.exports=Object.keys||function(e){return n(e,o)}},{"./_enum-bug-keys":35,"./_object-keys-internal":62}],64:[function(e,t,r){r.f={}.propertyIsEnumerable},{}],65:[function(e,t,r){var n=e("./_export"),o=e("./_core"),i=e("./_fails");t.exports=function(e,t){var r=(o.Object||{})[e]||Object[e],a={};a[e]=t(r),n(n.S+n.F*i(function(){r(1)}),"Object",a)}},{"./_core":30,"./_export":37,"./_fails":38}],66:[function(e,t,r){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],67:[function(e,t,r){t.exports=e("./_hide")},{"./_hide":41}],68:[function(e,t,r){var n=e("./_is-object"),o=e("./_an-object"),i=function(e,t){if(o(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,r,n){try{n=e("./_ctx")(Function.call,e("./_object-gopd").f(Object.prototype,"__proto__").set,2),n(t,[]),r=!(t instanceof Array)}catch(o){r=!0}return function(e,t){return i(e,t),r?e.__proto__=t:n(e,t),e}}({},!1):void 0),check:i}},{"./_an-object":27,"./_ctx":31,"./_is-object":46,"./_object-gopd":57}],69:[function(e,t,r){var n=e("./_object-dp").f,o=e("./_has"),i=e("./_wks")("toStringTag");t.exports=function(e,t,r){e&&!o(e=r?e:e.prototype,i)&&n(e,i,{configurable:!0,value:t})}},{"./_has":40,"./_object-dp":55,"./_wks":82}],70:[function(e,t,r){var n=e("./_shared")("keys"),o=e("./_uid");t.exports=function(e){return n[e]||(n[e]=o(e))}},{"./_shared":71,"./_uid":79}],71:[function(e,t,r){var n=e("./_global"),o="__core-js_shared__",i=n[o]||(n[o]={});t.exports=function(e){return i[e]||(i[e]={})}},{"./_global":39}],72:[function(e,t,r){var n=e("./_to-integer"),o=e("./_defined");t.exports=function(e){return function(t,r){var i,a,s=String(o(t)),u=n(r),c=s.length;return u<0||u>=c?e?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===c||(a=s.charCodeAt(u+1))<56320||a>57343?e?s.charAt(u):i:e?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},{"./_defined":32,"./_to-integer":74}],73:[function(e,t,r){var n=e("./_to-integer"),o=Math.max,i=Math.min;t.exports=function(e,t){return e=n(e),e<0?o(e+t,0):i(e,t)}},{"./_to-integer":74}],74:[function(e,t,r){var n=Math.ceil,o=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e)}},{}],75:[function(e,t,r){var n=e("./_iobject"),o=e("./_defined");t.exports=function(e){return n(o(e))}},{"./_defined":32,"./_iobject":44}],76:[function(e,t,r){var n=e("./_to-integer"),o=Math.min;t.exports=function(e){return e>0?o(n(e),9007199254740991):0}},{"./_to-integer":74}],77:[function(e,t,r){var n=e("./_defined");t.exports=function(e){return Object(n(e))}},{"./_defined":32}],78:[function(e,t,r){var n=e("./_is-object");t.exports=function(e,t){if(!n(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!n(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":46}],79:[function(e,t,r){var n=0,o=Math.random();t.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+o).toString(36))}},{}],80:[function(e,t,r){var n=e("./_global"),o=e("./_core"),i=e("./_library"),a=e("./_wks-ext"),s=e("./_object-dp").f;t.exports=function(e){var t=o.Symbol||(o.Symbol=i?{}:n.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:a.f(e)})}},{"./_core":30,"./_global":39,"./_library":52,"./_object-dp":55,"./_wks-ext":81}],81:[function(e,t,r){r.f=e("./_wks")},{"./_wks":82}],82:[function(e,t,r){var n=e("./_shared")("wks"),o=e("./_uid"),i=e("./_global").Symbol,a="function"==typeof i,s=t.exports=function(e){return n[e]||(n[e]=a&&i[e]||(a?i:o)("Symbol."+e))};s.store=n},{"./_global":39,"./_shared":71,"./_uid":79}],83:[function(e,t,r){"use strict";var n=e("./_add-to-unscopables"),o=e("./_iter-step"),i=e("./_iterators"),a=e("./_to-iobject");t.exports=e("./_iter-define")(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,r=this._i++;return!e||r>=e.length?(this._t=void 0,o(1)):"keys"==t?o(0,r):"values"==t?o(0,e[r]):o(0,[r,e[r]])},"values"),i.Arguments=i.Array,n("keys"),n("values"),n("entries")},{"./_add-to-unscopables":26,"./_iter-define":48,"./_iter-step":49,"./_iterators":50,"./_to-iobject":75}],84:[function(e,t,r){var n=e("./_export");n(n.S,"Object",{create:e("./_object-create")})},{"./_export":37,"./_object-create":54}],85:[function(e,t,r){var n=e("./_export");n(n.S+n.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":33,"./_export":37,"./_object-dp":55}],86:[function(e,t,r){var n=e("./_is-object"),o=e("./_meta").onFreeze;e("./_object-sap")("freeze",function(e){return function(t){return e&&n(t)?e(o(t)):t}})},{"./_is-object":46,"./_meta":53,"./_object-sap":65}],87:[function(e,t,r){var n=e("./_to-object"),o=e("./_object-gpo");e("./_object-sap")("getPrototypeOf",function(){return function(e){return o(n(e))}})},{"./_object-gpo":61,"./_object-sap":65,"./_to-object":77}],88:[function(e,t,r){var n=e("./_to-object"),o=e("./_object-keys");e("./_object-sap")("keys",function(){return function(e){return o(n(e))}})},{"./_object-keys":63,"./_object-sap":65,"./_to-object":77}],89:[function(e,t,r){var n=e("./_export");n(n.S,"Object",{setPrototypeOf:e("./_set-proto").set})},{"./_export":37,"./_set-proto":68}],90:[function(e,t,r){},{}],91:[function(e,t,r){"use strict";var n=e("./_string-at")(!0);e("./_iter-define")(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=n(t,r),this._i+=e.length,{value:e,done:!1})})},{"./_iter-define":48,"./_string-at":72}],92:[function(e,t,r){"use strict";var n=e("./_global"),o=e("./_has"),i=e("./_descriptors"),a=e("./_export"),s=e("./_redefine"),u=e("./_meta").KEY,c=e("./_fails"),l=e("./_shared"),f=e("./_set-to-string-tag"),d=e("./_uid"),p=e("./_wks"),h=e("./_wks-ext"),y=e("./_wks-define"),m=e("./_keyof"),v=e("./_enum-keys"),_=e("./_is-array"),b=e("./_an-object"),g=e("./_to-iobject"),E=e("./_to-primitive"),j=e("./_property-desc"),w=e("./_object-create"),O=e("./_object-gopn-ext"),M=e("./_object-gopd"),x=e("./_object-dp"),P=e("./_object-keys"),k=M.f,R=x.f,S=O.f,A=n.Symbol,T=n.JSON,N=T&&T.stringify,I="prototype",U=p("_hidden"),C=p("toPrimitive"),L={}.propertyIsEnumerable,F=l("symbol-registry"),B=l("symbols"),D=l("op-symbols"),G=Object[I],K="function"==typeof A,Y=n.QObject,q=!Y||!Y[I]||!Y[I].findChild,z=i&&c(function(){return 7!=w(R({},"a",{get:function(){return R(this,"a",{value:7}).a}})).a})?function(e,t,r){var n=k(G,t);n&&delete G[t],R(e,t,r),n&&e!==G&&R(G,t,n)}:R,H=function(e){var t=B[e]=w(A[I]);return t._k=e,t},W=K&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},J=function(e,t,r){return e===G&&J(D,t,r),b(e),t=E(t,!0),b(r),o(B,t)?(r.enumerable?(o(e,U)&&e[U][t]&&(e[U][t]=!1),r=w(r,{enumerable:j(0,!1)})):(o(e,U)||R(e,U,j(1,{})),e[U][t]=!0),z(e,t,r)):R(e,t,r)},V=function(e,t){b(e);for(var r,n=v(t=g(t)),o=0,i=n.length;i>o;)J(e,r=n[o++],t[r]);return e},$=function(e,t){return void 0===t?w(e):V(w(e),t)},X=function(e){var t=L.call(this,e=E(e,!0));return!(this===G&&o(B,e)&&!o(D,e))&&(!(t||!o(this,e)||!o(B,e)||o(this,U)&&this[U][e])||t)},Q=function(e,t){if(e=g(e),t=E(t,!0),e!==G||!o(B,t)||o(D,t)){var r=k(e,t);return!r||!o(B,t)||o(e,U)&&e[U][t]||(r.enumerable=!0),r}},Z=function(e){for(var t,r=S(g(e)),n=[],i=0;r.length>i;)o(B,t=r[i++])||t==U||t==u||n.push(t);return n},ee=function(e){for(var t,r=e===G,n=S(r?D:g(e)),i=[],a=0;n.length>a;)!o(B,t=n[a++])||r&&!o(G,t)||i.push(B[t]);return i};K||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(r){this===G&&t.call(D,r),o(this,U)&&o(this[U],e)&&(this[U][e]=!1),z(this,e,j(1,r))};return i&&q&&z(G,e,{configurable:!0,set:t}),H(e)},s(A[I],"toString",function(){return this._k}),M.f=Q,x.f=J,e("./_object-gopn").f=O.f=Z,e("./_object-pie").f=X,e("./_object-gops").f=ee,i&&!e("./_library")&&s(G,"propertyIsEnumerable",X,!0),h.f=function(e){return H(p(e))}),a(a.G+a.W+a.F*!K,{Symbol:A});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),re=0;te.length>re;)p(te[re++]);for(var te=P(p.store),re=0;te.length>re;)y(te[re++]);a(a.S+a.F*!K,"Symbol",{"for":function(e){return o(F,e+="")?F[e]:F[e]=A(e)},keyFor:function(e){if(W(e))return m(F,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){q=!0},useSimple:function(){q=!1}}),a(a.S+a.F*!K,"Object",{create:$,defineProperty:J,defineProperties:V,getOwnPropertyDescriptor:Q,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),T&&a(a.S+a.F*(!K||c(function(){var e=A();return"[null]"!=N([e])||"{}"!=N({a:e})||"{}"!=N(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!W(e)){for(var t,r,n=[e],o=1;arguments.length>o;)n.push(arguments[o++]);return t=n[1],"function"==typeof t&&(r=t),!r&&_(t)||(t=function(e,t){if(r&&(t=r.call(this,e,t)),!W(t))return t}),n[1]=t,N.apply(T,n)}}}),A[I][C]||e("./_hide")(A[I],C,A[I].valueOf),f(A,"Symbol"),f(Math,"Math",!0),f(n.JSON,"JSON",!0)},{"./_an-object":27,"./_descriptors":33,"./_enum-keys":36,"./_export":37,"./_fails":38,"./_global":39,"./_has":40,"./_hide":41,"./_is-array":45,"./_keyof":51,"./_library":52,"./_meta":53,"./_object-create":54,"./_object-dp":55,"./_object-gopd":57,"./_object-gopn":59,"./_object-gopn-ext":58,"./_object-gops":60,"./_object-keys":63,"./_object-pie":64,"./_property-desc":66,"./_redefine":67,"./_set-to-string-tag":69,"./_shared":71,"./_to-iobject":75,"./_to-primitive":78,"./_uid":79,"./_wks":82,"./_wks-define":80,"./_wks-ext":81}],93:[function(e,t,r){e("./_wks-define")("asyncIterator")},{"./_wks-define":80}],94:[function(e,t,r){e("./_wks-define")("observable")},{"./_wks-define":80}],95:[function(e,t,r){e("./es6.array.iterator");for(var n=e("./_global"),o=e("./_hide"),i=e("./_iterators"),a=e("./_wks")("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var c=s[u],l=n[c],f=l&&l.prototype;f&&!f[a]&&o(f,a,c),i[c]=i.Array}},{"./_global":39,"./_hide":41,"./_iterators":50,"./_wks":82,"./es6.array.iterator":83}],96:[function(e,t,r){function n(){d&&l&&(d=!1,l.length?f=l.concat(f):p=-1,f.length&&o())}function o(){if(!d){var e=s(n);d=!0;for(var t=f.length;t;){for(l=f,f=[];++p<t;)l&&l[p].run();p=-1,t=f.length}l=null,d=!1,u(e)}}function i(e,t){this.fun=e,this.array=t}function a(){}var s,u,c=t.exports={};!function(){try{s=setTimeout}catch(e){s=function(){throw new Error("setTimeout is not defined")}}try{u=clearTimeout}catch(e){u=function(){throw new Error("clearTimeout is not defined")}}}();var l,f=[],d=!1,p=-1;c.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];f.push(new i(e,t)),1!==f.length||d||s(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=a,c.addListener=a,c.once=a,c.off=a,c.removeListener=a,c.removeAllListeners=a,c.emit=a,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],97:[function(e,t,r){(function(r){var n="object"==typeof r?r:"object"==typeof window?window:"object"==typeof self?self:this,o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=e("./runtime"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(a){n.regeneratorRuntime=void 0}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./runtime":98}],98:[function(e,t,r){(function(e,r){!function(r){"use strict";function n(e,t,r,n){var o=Object.create((t||i).prototype),a=new h(n||[]);return o._invoke=f(e,r,a),o}function o(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function i(){}function a(){}function s(){}function u(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function c(e){this.arg=e}function l(t){function r(e,n,i,a){var s=o(t[e],t,n);if("throw"!==s.type){var u=s.arg,l=u.value;return l instanceof c?Promise.resolve(l.arg).then(function(e){r("next",e,i,a)},function(e){r("throw",e,i,a)}):Promise.resolve(l).then(function(e){u.value=e,i(u)},a)}a(s.arg)}function n(e,t){function n(){return new Promise(function(n,o){r(e,t,n,o)})}return i=i?i.then(n,n):n()}"object"==typeof e&&e.domain&&(r=e.domain.bind(r));var i;this._invoke=n}function f(e,t,r){var n=O;return function(i,a){if(n===x)throw new Error("Generator is already running");if(n===P){if("throw"===i)throw a;return m()}for(;;){var s=r.delegate;if(s){if("return"===i||"throw"===i&&s.iterator[i]===v){r.delegate=null;var u=s.iterator["return"];if(u){var c=o(u,s.iterator,a);if("throw"===c.type){i="throw",a=c.arg;continue}}if("return"===i)continue}var c=o(s.iterator[i],s.iterator,a);if("throw"===c.type){r.delegate=null,i="throw",a=c.arg;continue}i="next",a=v;var l=c.arg;if(!l.done)return n=M,l;r[s.resultName]=l.value,r.next=s.nextLoc,r.delegate=null}if("next"===i)r.sent=r._sent=a;else if("throw"===i){if(n===O)throw n=P,a;r.dispatchException(a)&&(i="next",a=v)}else"return"===i&&r.abrupt("return",a);n=x;var c=o(e,t,r);if("normal"===c.type){n=r.done?P:M;var l={value:c.arg,done:r.done};if(c.arg!==k)return l;r.delegate&&"next"===i&&(a=v)}else"throw"===c.type&&(n=P,i="throw",a=c.arg)}}}function d(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function p(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function h(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(d,this),this.reset(!0)}function y(e){if(e){var t=e[g];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,n=function o(){for(;++r<e.length;)if(_.call(e,r))return o.value=e[r],o.done=!1,o;return o.value=v,o.done=!0,o};return n.next=n}}return{next:m}}function m(){return{value:v,done:!0}}var v,_=Object.prototype.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},g=b.iterator||"@@iterator",E=b.toStringTag||"@@toStringTag",j="object"==typeof t,w=r.regeneratorRuntime;if(w)return void(j&&(t.exports=w));w=r.regeneratorRuntime=j?t.exports:{},w.wrap=n;var O="suspendedStart",M="suspendedYield",x="executing",P="completed",k={},R=s.prototype=i.prototype;a.prototype=R.constructor=s,s.constructor=a,s[E]=a.displayName="GeneratorFunction",w.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===a||"GeneratorFunction"===(t.displayName||t.name))},w.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,s):(e.__proto__=s,E in e||(e[E]="GeneratorFunction")),e.prototype=Object.create(R),e},w.awrap=function(e){return new c(e)},u(l.prototype),w.async=function(e,t,r,o){var i=new l(n(e,t,r,o));return w.isGeneratorFunction(t)?i:i.next().then(function(e){return e.done?e.value:i.next()})},u(R),R[g]=function(){return this},R[E]="Generator",R.toString=function(){return"[object Generator]"},w.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},w.values=y,h.prototype={constructor:h,reset:function(e){
if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.tryEntries.forEach(p),!e)for(var t in this)"t"===t.charAt(0)&&_.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=v)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){function t(t,n){return i.type="throw",i.arg=e,r.next=t,!!n}if(this.done)throw e;for(var r=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=_.call(o,"catchLoc"),s=_.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&_.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?this.next=o.finallyLoc:this.complete(i),k},complete:function(e,t){if("throw"===e.type)throw e.arg;"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=e.arg,this.next="end"):"normal"===e.type&&t&&(this.next=t)},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),p(r),k}},"catch":function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;p(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:y(e),resultName:t,nextLoc:r},k}}}("object"==typeof r?r:"object"==typeof window?window:"object"==typeof self?self:this)}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:96}],99:[function(t,r,n){!function(t,n){"function"==typeof e&&e.amd?e([],n):"undefined"!=typeof r&&r.exports?r.exports=n():t.tv4=n()}(this,function(){function e(e){return encodeURI(e).replace(/%25[0-9][0-9]/g,function(e){return"%"+e.substring(3)})}function t(t){var r="";d[t.charAt(0)]&&(r=t.charAt(0),t=t.substring(1));var n="",o="",i=!0,a=!1,s=!1;"+"===r?i=!1:"."===r?(o=".",n="."):"/"===r?(o="/",n="/"):"#"===r?(o="#",i=!1):";"===r?(o=";",n=";",a=!0,s=!0):"?"===r?(o="?",n="&",a=!0):"&"===r&&(o="&",n="&",a=!0);for(var u=[],c=t.split(","),l=[],f={},h=0;h<c.length;h++){var y=c[h],m=null;if(y.indexOf(":")!==-1){var v=y.split(":");y=v[0],m=parseInt(v[1],10)}for(var _={};p[y.charAt(y.length-1)];)_[y.charAt(y.length-1)]=!0,y=y.substring(0,y.length-1);var b={truncate:m,name:y,suffices:_};l.push(b),f[y]=b,u.push(y)}var g=function(t){for(var r="",u=0,c=0;c<l.length;c++){var f=l[c],d=t(f.name);if(null===d||void 0===d||Array.isArray(d)&&0===d.length||"object"==typeof d&&0===Object.keys(d).length)u++;else if(r+=c===u?o:n||",",Array.isArray(d)){a&&(r+=f.name+"=");for(var p=0;p<d.length;p++)p>0&&(r+=f.suffices["*"]?n||",":",",f.suffices["*"]&&a&&(r+=f.name+"=")),r+=i?encodeURIComponent(d[p]).replace(/!/g,"%21"):e(d[p])}else if("object"==typeof d){a&&!f.suffices["*"]&&(r+=f.name+"=");var h=!0;for(var y in d)h||(r+=f.suffices["*"]?n||",":","),h=!1,r+=i?encodeURIComponent(y).replace(/!/g,"%21"):e(y),r+=f.suffices["*"]?"=":",",r+=i?encodeURIComponent(d[y]).replace(/!/g,"%21"):e(d[y])}else a&&(r+=f.name,s&&""===d||(r+="=")),null!=f.truncate&&(d=d.substring(0,f.truncate)),r+=i?encodeURIComponent(d).replace(/!/g,"%21"):e(d)}return r};return g.varNames=u,{prefix:o,substitution:g}}function r(e){if(!(this instanceof r))return new r(e);for(var n=e.split("{"),o=[n.shift()],i=[],a=[],s=[];n.length>0;){var u=n.shift(),c=u.split("}")[0],l=u.substring(c.length+1),f=t(c);a.push(f.substitution),i.push(f.prefix),o.push(l),s=s.concat(f.substitution.varNames)}this.fill=function(e){for(var t=o[0],r=0;r<a.length;r++){var n=a[r];t+=n(e),t+=o[r+1]}return t},this.varNames=s,this.template=e}function n(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(Array.isArray(e)!==Array.isArray(t))return!1;if(Array.isArray(e)){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!n(e[r],t[r]))return!1}else{var o;for(o in e)if(void 0===t[o]&&void 0!==e[o])return!1;for(o in t)if(void 0===e[o]&&void 0!==t[o])return!1;for(o in e)if(!n(e[o],t[o]))return!1}return!0}return!1}function o(e){var t=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return t?{href:t[0]||"",protocol:t[1]||"",authority:t[2]||"",host:t[3]||"",hostname:t[4]||"",port:t[5]||"",pathname:t[6]||"",search:t[7]||"",hash:t[8]||""}:null}function i(e,t){function r(e){var t=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?t.pop():t.push(e)}),t.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}return t=o(t||""),e=o(e||""),t&&e?(t.protocol||e.protocol)+(t.protocol||t.authority?t.authority:e.authority)+r(t.protocol||t.authority||"/"===t.pathname.charAt(0)?t.pathname:t.pathname?(e.authority&&!e.pathname?"/":"")+e.pathname.slice(0,e.pathname.lastIndexOf("/")+1)+t.pathname:e.pathname)+(t.protocol||t.authority||t.pathname?t.search:t.search||e.search)+t.hash:null}function a(e){return e.split("#")[0]}function s(e,t){if(e&&"object"==typeof e)if(void 0===t?t=e.id:"string"==typeof e.id&&(t=i(t,e.id),e.id=t),Array.isArray(e))for(var r=0;r<e.length;r++)s(e[r],t);else{"string"==typeof e.$ref&&(e.$ref=i(t,e.$ref));for(var n in e)"enum"!==n&&s(e[n],t)}}function u(e){e=e||"en";var t=E[e];return function(e){var r=t[e.code]||g[e.code];if("string"!=typeof r)return"Unknown error code "+e.code+": "+JSON.stringify(e.messageParams);var n=e.params;return r.replace(/\{([^{}]*)\}/g,function(e,t){var r=n[t];return"string"==typeof r||"number"==typeof r?r:e})}}function c(e,t,r,n,o){if(Error.call(this),void 0===e)throw new Error("No error code supplied: "+n);this.message="",this.params=t,this.code=e,this.dataPath=r||"",this.schemaPath=n||"",this.subErrors=o||null;var i=new Error(this.message);if(this.stack=i.stack||i.stacktrace,!this.stack)try{throw i}catch(i){this.stack=i.stack||i.stacktrace}}function l(e,t){if(t.substring(0,e.length)===e){var r=t.substring(e.length);if(t.length>0&&"/"===t.charAt(e.length-1)||"#"===r.charAt(0)||"?"===r.charAt(0))return!0}return!1}function f(e){var t,r,n=new h,o={setErrorReporter:function(e){return"string"==typeof e?this.language(e):(r=e,!0)},addFormat:function(){n.addFormat.apply(n,arguments)},language:function(e){return e?(E[e]||(e=e.split("-")[0]),!!E[e]&&(t=e,e)):t},addLanguage:function(e,t){var r;for(r in v)t[r]&&!t[v[r]]&&(t[v[r]]=t[r]);var n=e.split("-")[0];if(E[n]){E[e]=Object.create(E[n]);for(r in t)"undefined"==typeof E[n][r]&&(E[n][r]=t[r]),E[e][r]=t[r]}else E[e]=t,E[n]=t;return this},freshApi:function(e){var t=f();return e&&t.language(e),t},validate:function(e,o,i,a){var s=u(t),c=r?function(e,t,n){return r(e,t,n)||s(e,t,n)}:s,l=new h(n,(!1),c,i,a);"string"==typeof o&&(o={$ref:o}),l.addSchema("",o);var f=l.validateAll(e,o,null,null,"");return!f&&a&&(f=l.banUnknownProperties(e,o)),this.error=f,this.missing=l.missing,this.valid=null===f,this.valid},validateResult:function(){var e={};return this.validate.apply(e,arguments),e},validateMultiple:function(e,o,i,a){var s=u(t),c=r?function(e,t,n){return r(e,t,n)||s(e,t,n)}:s,l=new h(n,(!0),c,i,a);"string"==typeof o&&(o={$ref:o}),l.addSchema("",o),l.validateAll(e,o,null,null,""),a&&l.banUnknownProperties(e,o);var f={};return f.errors=l.errors,f.missing=l.missing,f.valid=0===f.errors.length,f},addSchema:function(){return n.addSchema.apply(n,arguments)},getSchema:function(){return n.getSchema.apply(n,arguments)},getSchemaMap:function(){return n.getSchemaMap.apply(n,arguments)},getSchemaUris:function(){return n.getSchemaUris.apply(n,arguments)},getMissingUris:function(){return n.getMissingUris.apply(n,arguments)},dropSchemas:function(){n.dropSchemas.apply(n,arguments)},defineKeyword:function(){n.defineKeyword.apply(n,arguments)},defineError:function(e,t,r){if("string"!=typeof e||!/^[A-Z]+(_[A-Z]+)*$/.test(e))throw new Error("Code name must be a string in UPPER_CASE_WITH_UNDERSCORES");if("number"!=typeof t||t%1!==0||t<1e4)throw new Error("Code number must be an integer > 10000");if("undefined"!=typeof v[e])throw new Error("Error already defined: "+e+" as "+v[e]);if("undefined"!=typeof _[t])throw new Error("Error code already used: "+_[t]+" as "+t);v[e]=t,_[t]=e,g[e]=g[t]=r;for(var n in E){var o=E[n];o[e]&&(o[t]=o[t]||o[e])}},reset:function(){n.reset(),this.error=null,this.missing=[],this.valid=!0},missing:[],error:null,valid:!0,normSchema:s,resolveUrl:i,getDocumentUri:a,errorCodes:v};return o.language(e||"en"),o}Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),r=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=r.length;return function(o){if("object"!=typeof o&&"function"!=typeof o||null===o)throw new TypeError("Object.keys called on non-object");var i=[];for(var a in o)e.call(o,a)&&i.push(a);if(t)for(var s=0;s<n;s++)e.call(o,r[s])&&i.push(r[s]);return i}}()),Object.create||(Object.create=function(){function e(){}return function(t){if(1!==arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=t,new e}}()),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var t=Object(this),r=t.length>>>0;if(0===r)return-1;var n=0;if(arguments.length>1&&(n=Number(arguments[1]),n!==n?n=0:0!==n&&n!==1/0&&n!==-(1/0)&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=r)return-1;for(var o=n>=0?n:Math.max(r-Math.abs(n),0);o<r;o++)if(o in t&&t[o]===e)return o;return-1}),Object.isFrozen||(Object.isFrozen=function(e){for(var t="tv4_test_frozen_key";e.hasOwnProperty(t);)t+=Math.random();try{return e[t]=!0,delete e[t],!1}catch(r){return!0}});var d={"+":!0,"#":!0,".":!0,"/":!0,";":!0,"?":!0,"&":!0},p={"*":!0};r.prototype={toString:function(){return this.template},fillFromObject:function(e){return this.fill(function(t){return e[t]})}};var h=function(e,t,r,n,o){if(this.missing=[],this.missingMap={},this.formatValidators=e?Object.create(e.formatValidators):{},this.schemas=e?Object.create(e.schemas):{},this.collectMultiple=t,this.errors=[],this.handleError=t?this.collectError:this.returnError,n&&(this.checkRecursive=!0,this.scanned=[],this.scannedFrozen=[],this.scannedFrozenSchemas=[],this.scannedFrozenValidationErrors=[],this.validatedSchemasKey="tv4_validation_id",this.validationErrorsKey="tv4_validation_errors_id"),o&&(this.trackUnknownProperties=!0,this.knownPropertyPaths={},this.unknownPropertyPaths={}),this.errorReporter=r||u("en"),"string"==typeof this.errorReporter)throw new Error("debug");if(this.definedKeywords={},e)for(var i in e.definedKeywords)this.definedKeywords[i]=e.definedKeywords[i].slice(0)};h.prototype.defineKeyword=function(e,t){this.definedKeywords[e]=this.definedKeywords[e]||[],this.definedKeywords[e].push(t)},h.prototype.createError=function(e,t,r,n,o,i,a){var s=new c(e,t,r,n,o);return s.message=this.errorReporter(s,i,a),s},h.prototype.returnError=function(e){return e},h.prototype.collectError=function(e){return e&&this.errors.push(e),null},h.prototype.prefixErrors=function(e,t,r){for(var n=e;n<this.errors.length;n++)this.errors[n]=this.errors[n].prefixWith(t,r);return this},h.prototype.banUnknownProperties=function(e,t){for(var r in this.unknownPropertyPaths){var n=this.createError(v.UNKNOWN_PROPERTY,{path:r},r,"",null,e,t),o=this.handleError(n);if(o)return o}return null},h.prototype.addFormat=function(e,t){if("object"==typeof e){for(var r in e)this.addFormat(r,e[r]);return this}this.formatValidators[e]=t},h.prototype.resolveRefs=function(e,t){if(void 0!==e.$ref){if(t=t||{},t[e.$ref])return this.createError(v.CIRCULAR_REFERENCE,{urls:Object.keys(t).join(", ")},"","",null,void 0,e);t[e.$ref]=!0,e=this.getSchema(e.$ref,t)}return e},h.prototype.getSchema=function(e,t){var r;if(void 0!==this.schemas[e])return r=this.schemas[e],this.resolveRefs(r,t);var n=e,o="";if(e.indexOf("#")!==-1&&(o=e.substring(e.indexOf("#")+1),n=e.substring(0,e.indexOf("#"))),"object"==typeof this.schemas[n]){r=this.schemas[n];var i=decodeURIComponent(o);if(""===i)return this.resolveRefs(r,t);if("/"!==i.charAt(0))return;for(var a=i.split("/").slice(1),s=0;s<a.length;s++){var u=a[s].replace(/~1/g,"/").replace(/~0/g,"~");if(void 0===r[u]){r=void 0;break}r=r[u]}if(void 0!==r)return this.resolveRefs(r,t)}void 0===this.missing[n]&&(this.missing.push(n),this.missing[n]=n,this.missingMap[n]=n)},h.prototype.searchSchemas=function(e,t){if(Array.isArray(e))for(var r=0;r<e.length;r++)this.searchSchemas(e[r],t);else if(e&&"object"==typeof e){"string"==typeof e.id&&l(t,e.id)&&void 0===this.schemas[e.id]&&(this.schemas[e.id]=e);for(var n in e)if("enum"!==n)if("object"==typeof e[n])this.searchSchemas(e[n],t);else if("$ref"===n){var o=a(e[n]);o&&void 0===this.schemas[o]&&void 0===this.missingMap[o]&&(this.missingMap[o]=o)}}},h.prototype.addSchema=function(e,t){if("string"!=typeof e||"undefined"==typeof t){if("object"!=typeof e||"string"!=typeof e.id)return;t=e,e=t.id}e===a(e)+"#"&&(e=a(e)),this.schemas[e]=t,delete this.missingMap[e],s(t,e),this.searchSchemas(t,e)},h.prototype.getSchemaMap=function(){var e={};for(var t in this.schemas)e[t]=this.schemas[t];return e},h.prototype.getSchemaUris=function(e){var t=[];for(var r in this.schemas)e&&!e.test(r)||t.push(r);return t},h.prototype.getMissingUris=function(e){var t=[];for(var r in this.missingMap)e&&!e.test(r)||t.push(r);return t},h.prototype.dropSchemas=function(){this.schemas={},this.reset()},h.prototype.reset=function(){this.missing=[],this.missingMap={},this.errors=[]},h.prototype.validateAll=function(e,t,r,n,o){var i;if(t=this.resolveRefs(t),!t)return null;if(t instanceof c)return this.errors.push(t),t;var a,s=this.errors.length,u=null,l=null;if(this.checkRecursive&&e&&"object"==typeof e){if(i=!this.scanned.length,e[this.validatedSchemasKey]){var f=e[this.validatedSchemasKey].indexOf(t);if(f!==-1)return this.errors=this.errors.concat(e[this.validationErrorsKey][f]),null}if(Object.isFrozen(e)&&(a=this.scannedFrozen.indexOf(e),a!==-1)){var d=this.scannedFrozenSchemas[a].indexOf(t);if(d!==-1)return this.errors=this.errors.concat(this.scannedFrozenValidationErrors[a][d]),null}if(this.scanned.push(e),Object.isFrozen(e))a===-1&&(a=this.scannedFrozen.length,this.scannedFrozen.push(e),this.scannedFrozenSchemas.push([])),u=this.scannedFrozenSchemas[a].length,this.scannedFrozenSchemas[a][u]=t,this.scannedFrozenValidationErrors[a][u]=[];else{if(!e[this.validatedSchemasKey])try{Object.defineProperty(e,this.validatedSchemasKey,{value:[],configurable:!0}),Object.defineProperty(e,this.validationErrorsKey,{value:[],configurable:!0})}catch(p){e[this.validatedSchemasKey]=[],e[this.validationErrorsKey]=[]}l=e[this.validatedSchemasKey].length,e[this.validatedSchemasKey][l]=t,e[this.validationErrorsKey][l]=[]}}var h=this.errors.length,y=this.validateBasic(e,t,o)||this.validateNumeric(e,t,o)||this.validateString(e,t,o)||this.validateArray(e,t,o)||this.validateObject(e,t,o)||this.validateCombinations(e,t,o)||this.validateHypermedia(e,t,o)||this.validateFormat(e,t,o)||this.validateDefinedKeywords(e,t,o)||null;if(i){for(;this.scanned.length;){var m=this.scanned.pop();delete m[this.validatedSchemasKey]}this.scannedFrozen=[],this.scannedFrozenSchemas=[]}if(y||h!==this.errors.length)for(;r&&r.length||n&&n.length;){var v=r&&r.length?""+r.pop():null,_=n&&n.length?""+n.pop():null;y&&(y=y.prefixWith(v,_)),this.prefixErrors(h,v,_)}return null!==u?this.scannedFrozenValidationErrors[a][u]=this.errors.slice(s):null!==l&&(e[this.validationErrorsKey][l]=this.errors.slice(s)),this.handleError(y)},h.prototype.validateFormat=function(e,t){if("string"!=typeof t.format||!this.formatValidators[t.format])return null;var r=this.formatValidators[t.format].call(null,e,t);return"string"==typeof r||"number"==typeof r?this.createError(v.FORMAT_CUSTOM,{message:r},"","/format",null,e,t):r&&"object"==typeof r?this.createError(v.FORMAT_CUSTOM,{message:r.message||"?"},r.dataPath||"",r.schemaPath||"/format",null,e,t):null},h.prototype.validateDefinedKeywords=function(e,t,r){for(var n in this.definedKeywords)if("undefined"!=typeof t[n])for(var o=this.definedKeywords[n],i=0;i<o.length;i++){var a=o[i],s=a(e,t[n],t,r);if("string"==typeof s||"number"==typeof s)return this.createError(v.KEYWORD_CUSTOM,{key:n,message:s},"","",null,e,t).prefixWith(null,n);if(s&&"object"==typeof s){var u=s.code;if("string"==typeof u){if(!v[u])throw new Error("Undefined error code (use defineError): "+u);u=v[u]}else"number"!=typeof u&&(u=v.KEYWORD_CUSTOM);var c="object"==typeof s.message?s.message:{key:n,message:s.message||"?"},l=s.schemaPath||"/"+n.replace(/~/g,"~0").replace(/\//g,"~1");return this.createError(u,c,s.dataPath||null,l,null,e,t)}}return null},h.prototype.validateBasic=function(e,t,r){var n;return(n=this.validateType(e,t,r))?n.prefixWith(null,"type"):(n=this.validateEnum(e,t,r))?n.prefixWith(null,"type"):null},h.prototype.validateType=function(e,t){if(void 0===t.type)return null;var r=typeof e;null===e?r="null":Array.isArray(e)&&(r="array");var n=t.type;Array.isArray(n)||(n=[n]);for(var o=0;o<n.length;o++){var i=n[o];if(i===r||"integer"===i&&"number"===r&&e%1===0)return null}return this.createError(v.INVALID_TYPE,{type:r,expected:n.join("/")},"","",null,e,t)},h.prototype.validateEnum=function(e,t){if(void 0===t["enum"])return null;for(var r=0;r<t["enum"].length;r++){var o=t["enum"][r];if(n(e,o))return null}return this.createError(v.ENUM_MISMATCH,{value:"undefined"!=typeof JSON?JSON.stringify(e):e},"","",null,e,t)},h.prototype.validateNumeric=function(e,t,r){return this.validateMultipleOf(e,t,r)||this.validateMinMax(e,t,r)||this.validateNaN(e,t,r)||null};var y=Math.pow(2,-51),m=1-y;h.prototype.validateMultipleOf=function(e,t){var r=t.multipleOf||t.divisibleBy;if(void 0===r)return null;if("number"==typeof e){var n=e/r%1;if(n>=y&&n<m)return this.createError(v.NUMBER_MULTIPLE_OF,{value:e,multipleOf:r},"","",null,e,t)}return null},h.prototype.validateMinMax=function(e,t){if("number"!=typeof e)return null;if(void 0!==t.minimum){if(e<t.minimum)return this.createError(v.NUMBER_MINIMUM,{value:e,minimum:t.minimum},"","/minimum",null,e,t);if(t.exclusiveMinimum&&e===t.minimum)return this.createError(v.NUMBER_MINIMUM_EXCLUSIVE,{value:e,minimum:t.minimum},"","/exclusiveMinimum",null,e,t)}if(void 0!==t.maximum){if(e>t.maximum)return this.createError(v.NUMBER_MAXIMUM,{value:e,maximum:t.maximum},"","/maximum",null,e,t);if(t.exclusiveMaximum&&e===t.maximum)return this.createError(v.NUMBER_MAXIMUM_EXCLUSIVE,{value:e,maximum:t.maximum},"","/exclusiveMaximum",null,e,t)}return null},h.prototype.validateNaN=function(e,t){return"number"!=typeof e?null:isNaN(e)===!0||e===1/0||e===-(1/0)?this.createError(v.NUMBER_NOT_A_NUMBER,{value:e},"","/type",null,e,t):null},h.prototype.validateString=function(e,t,r){return this.validateStringLength(e,t,r)||this.validateStringPattern(e,t,r)||null},h.prototype.validateStringLength=function(e,t){return"string"!=typeof e?null:void 0!==t.minLength&&e.length<t.minLength?this.createError(v.STRING_LENGTH_SHORT,{length:e.length,minimum:t.minLength},"","/minLength",null,e,t):void 0!==t.maxLength&&e.length>t.maxLength?this.createError(v.STRING_LENGTH_LONG,{length:e.length,maximum:t.maxLength},"","/maxLength",null,e,t):null},h.prototype.validateStringPattern=function(e,t){if("string"!=typeof e||"string"!=typeof t.pattern&&!(t.pattern instanceof RegExp))return null;var r;if(t.pattern instanceof RegExp)r=t.pattern;else{var n,o="",i=t.pattern.match(/^\/(.+)\/([img]*)$/);i?(n=i[1],o=i[2]):n=t.pattern,r=new RegExp(n,o)}return r.test(e)?null:this.createError(v.STRING_PATTERN,{pattern:t.pattern},"","/pattern",null,e,t)},h.prototype.validateArray=function(e,t,r){return Array.isArray(e)?this.validateArrayLength(e,t,r)||this.validateArrayUniqueItems(e,t,r)||this.validateArrayItems(e,t,r)||null:null},h.prototype.validateArrayLength=function(e,t){var r;return void 0!==t.minItems&&e.length<t.minItems&&(r=this.createError(v.ARRAY_LENGTH_SHORT,{length:e.length,minimum:t.minItems},"","/minItems",null,e,t),this.handleError(r))?r:void 0!==t.maxItems&&e.length>t.maxItems&&(r=this.createError(v.ARRAY_LENGTH_LONG,{length:e.length,maximum:t.maxItems},"","/maxItems",null,e,t),this.handleError(r))?r:null},h.prototype.validateArrayUniqueItems=function(e,t){if(t.uniqueItems)for(var r=0;r<e.length;r++)for(var o=r+1;o<e.length;o++)if(n(e[r],e[o])){var i=this.createError(v.ARRAY_UNIQUE,{match1:r,match2:o},"","/uniqueItems",null,e,t);if(this.handleError(i))return i}return null},h.prototype.validateArrayItems=function(e,t,r){if(void 0===t.items)return null;var n,o;if(Array.isArray(t.items)){for(o=0;o<e.length;o++)if(o<t.items.length){if(n=this.validateAll(e[o],t.items[o],[o],["items",o],r+"/"+o))return n}else if(void 0!==t.additionalItems)if("boolean"==typeof t.additionalItems){if(!t.additionalItems&&(n=this.createError(v.ARRAY_ADDITIONAL_ITEMS,{},"/"+o,"/additionalItems",null,e,t),this.handleError(n)))return n}else if(n=this.validateAll(e[o],t.additionalItems,[o],["additionalItems"],r+"/"+o))return n}else for(o=0;o<e.length;o++)if(n=this.validateAll(e[o],t.items,[o],["items"],r+"/"+o))return n;return null},h.prototype.validateObject=function(e,t,r){return"object"!=typeof e||null===e||Array.isArray(e)?null:this.validateObjectMinMaxProperties(e,t,r)||this.validateObjectRequiredProperties(e,t,r)||this.validateObjectProperties(e,t,r)||this.validateObjectDependencies(e,t,r)||null},h.prototype.validateObjectMinMaxProperties=function(e,t){var r,n=Object.keys(e);return void 0!==t.minProperties&&n.length<t.minProperties&&(r=this.createError(v.OBJECT_PROPERTIES_MINIMUM,{propertyCount:n.length,minimum:t.minProperties},"","/minProperties",null,e,t),this.handleError(r))?r:void 0!==t.maxProperties&&n.length>t.maxProperties&&(r=this.createError(v.OBJECT_PROPERTIES_MAXIMUM,{propertyCount:n.length,maximum:t.maxProperties},"","/maxProperties",null,e,t),this.handleError(r))?r:null},h.prototype.validateObjectRequiredProperties=function(e,t){if(void 0!==t.required)for(var r=0;r<t.required.length;r++){var n=t.required[r];if(void 0===e[n]){var o=this.createError(v.OBJECT_REQUIRED,{key:n},"","/required/"+r,null,e,t);if(this.handleError(o))return o}}return null},h.prototype.validateObjectProperties=function(e,t,r){var n;for(var o in e){var i=r+"/"+o.replace(/~/g,"~0").replace(/\//g,"~1"),a=!1;if(void 0!==t.properties&&void 0!==t.properties[o]&&(a=!0,n=this.validateAll(e[o],t.properties[o],[o],["properties",o],i)))return n;if(void 0!==t.patternProperties)for(var s in t.patternProperties){var u=new RegExp(s);if(u.test(o)&&(a=!0,n=this.validateAll(e[o],t.patternProperties[s],[o],["patternProperties",s],i)))return n}if(a)this.trackUnknownProperties&&(this.knownPropertyPaths[i]=!0,delete this.unknownPropertyPaths[i]);else if(void 0!==t.additionalProperties){if(this.trackUnknownProperties&&(this.knownPropertyPaths[i]=!0,delete this.unknownPropertyPaths[i]),"boolean"==typeof t.additionalProperties){if(!t.additionalProperties&&(n=this.createError(v.OBJECT_ADDITIONAL_PROPERTIES,{key:o},"","/additionalProperties",null,e,t).prefixWith(o,null),this.handleError(n)))return n}else if(n=this.validateAll(e[o],t.additionalProperties,[o],["additionalProperties"],i))return n}else this.trackUnknownProperties&&!this.knownPropertyPaths[i]&&(this.unknownPropertyPaths[i]=!0)}return null},h.prototype.validateObjectDependencies=function(e,t,r){var n;if(void 0!==t.dependencies)for(var o in t.dependencies)if(void 0!==e[o]){var i=t.dependencies[o];if("string"==typeof i){if(void 0===e[i]&&(n=this.createError(v.OBJECT_DEPENDENCY_KEY,{key:o,missing:i},"","",null,e,t).prefixWith(null,o).prefixWith(null,"dependencies"),this.handleError(n)))return n}else if(Array.isArray(i))for(var a=0;a<i.length;a++){var s=i[a];if(void 0===e[s]&&(n=this.createError(v.OBJECT_DEPENDENCY_KEY,{key:o,missing:s},"","/"+a,null,e,t).prefixWith(null,o).prefixWith(null,"dependencies"),this.handleError(n)))return n}else if(n=this.validateAll(e,i,[],["dependencies",o],r))return n}return null},h.prototype.validateCombinations=function(e,t,r){return this.validateAllOf(e,t,r)||this.validateAnyOf(e,t,r)||this.validateOneOf(e,t,r)||this.validateNot(e,t,r)||null},h.prototype.validateAllOf=function(e,t,r){if(void 0===t.allOf)return null;for(var n,o=0;o<t.allOf.length;o++){var i=t.allOf[o];if(n=this.validateAll(e,i,[],["allOf",o],r))return n}return null},h.prototype.validateAnyOf=function(e,t,r){if(void 0===t.anyOf)return null;var n,o,i=[],a=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,o=this.knownPropertyPaths);for(var s=!0,u=0;u<t.anyOf.length;u++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var c=t.anyOf[u],l=this.errors.length,f=this.validateAll(e,c,[],["anyOf",u],r);if(null===f&&l===this.errors.length){if(this.errors=this.errors.slice(0,a),this.trackUnknownProperties){for(var d in this.knownPropertyPaths)o[d]=!0,delete n[d];for(var p in this.unknownPropertyPaths)o[p]||(n[p]=!0);s=!1;continue}return null}f&&i.push(f.prefixWith(null,""+u).prefixWith(null,"anyOf"))}return this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=o),s?(i=i.concat(this.errors.slice(a)),this.errors=this.errors.slice(0,a),this.createError(v.ANY_OF_MISSING,{},"","/anyOf",i,e,t)):void 0},h.prototype.validateOneOf=function(e,t,r){if(void 0===t.oneOf)return null;var n,o,i=null,a=[],s=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,o=this.knownPropertyPaths);for(var u=0;u<t.oneOf.length;u++){this.trackUnknownProperties&&(this.unknownPropertyPaths={},this.knownPropertyPaths={});var c=t.oneOf[u],l=this.errors.length,f=this.validateAll(e,c,[],["oneOf",u],r);if(null===f&&l===this.errors.length){if(null!==i)return this.errors=this.errors.slice(0,s),this.createError(v.ONE_OF_MULTIPLE,{index1:i,index2:u},"","/oneOf",null,e,t);if(i=u,this.trackUnknownProperties){for(var d in this.knownPropertyPaths)o[d]=!0,delete n[d];for(var p in this.unknownPropertyPaths)o[p]||(n[p]=!0)}}else f&&a.push(f)}return this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=o),null===i?(a=a.concat(this.errors.slice(s)),this.errors=this.errors.slice(0,s),this.createError(v.ONE_OF_MISSING,{},"","/oneOf",a,e,t)):(this.errors=this.errors.slice(0,s),null)},h.prototype.validateNot=function(e,t,r){if(void 0===t.not)return null;var n,o,i=this.errors.length;this.trackUnknownProperties&&(n=this.unknownPropertyPaths,o=this.knownPropertyPaths,this.unknownPropertyPaths={},this.knownPropertyPaths={});var a=this.validateAll(e,t.not,null,null,r),s=this.errors.slice(i);return this.errors=this.errors.slice(0,i),this.trackUnknownProperties&&(this.unknownPropertyPaths=n,this.knownPropertyPaths=o),null===a&&0===s.length?this.createError(v.NOT_PASSED,{},"","/not",null,e,t):null},h.prototype.validateHypermedia=function(e,t,n){if(!t.links)return null;for(var o,i=0;i<t.links.length;i++){var a=t.links[i];if("describedby"===a.rel){for(var s=new r(a.href),u=!0,c=0;c<s.varNames.length;c++)if(!(s.varNames[c]in e)){u=!1;break}if(u){var l=s.fillFromObject(e),f={$ref:l};if(o=this.validateAll(e,f,[],["links",i],n))return o}}}};var v={INVALID_TYPE:0,ENUM_MISMATCH:1,ANY_OF_MISSING:10,ONE_OF_MISSING:11,ONE_OF_MULTIPLE:12,NOT_PASSED:13,NUMBER_MULTIPLE_OF:100,NUMBER_MINIMUM:101,NUMBER_MINIMUM_EXCLUSIVE:102,NUMBER_MAXIMUM:103,NUMBER_MAXIMUM_EXCLUSIVE:104,NUMBER_NOT_A_NUMBER:105,STRING_LENGTH_SHORT:200,STRING_LENGTH_LONG:201,STRING_PATTERN:202,OBJECT_PROPERTIES_MINIMUM:300,OBJECT_PROPERTIES_MAXIMUM:301,OBJECT_REQUIRED:302,OBJECT_ADDITIONAL_PROPERTIES:303,OBJECT_DEPENDENCY_KEY:304,ARRAY_LENGTH_SHORT:400,ARRAY_LENGTH_LONG:401,ARRAY_UNIQUE:402,ARRAY_ADDITIONAL_ITEMS:403,FORMAT_CUSTOM:500,KEYWORD_CUSTOM:501,CIRCULAR_REFERENCE:600,UNKNOWN_PROPERTY:1e3},_={};for(var b in v)_[v[b]]=b;var g={INVALID_TYPE:"Invalid type: {type} (expected {expected})",ENUM_MISMATCH:"No enum match for: {value}",ANY_OF_MISSING:'Data does not match any schemas from "anyOf"',ONE_OF_MISSING:'Data does not match any schemas from "oneOf"',ONE_OF_MULTIPLE:'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',NOT_PASSED:'Data matches schema from "not"',NUMBER_MULTIPLE_OF:"Value {value} is not a multiple of {multipleOf}",NUMBER_MINIMUM:"Value {value} is less than minimum {minimum}",NUMBER_MINIMUM_EXCLUSIVE:"Value {value} is equal to exclusive minimum {minimum}",NUMBER_MAXIMUM:"Value {value} is greater than maximum {maximum}",NUMBER_MAXIMUM_EXCLUSIVE:"Value {value} is equal to exclusive maximum {maximum}",NUMBER_NOT_A_NUMBER:"Value {value} is not a valid number",STRING_LENGTH_SHORT:"String is too short ({length} chars), minimum {minimum}",STRING_LENGTH_LONG:"String is too long ({length} chars), maximum {maximum}",STRING_PATTERN:"String does not match pattern: {pattern}",OBJECT_PROPERTIES_MINIMUM:"Too few properties defined ({propertyCount}), minimum {minimum}",OBJECT_PROPERTIES_MAXIMUM:"Too many properties defined ({propertyCount}), maximum {maximum}",OBJECT_REQUIRED:"Missing required property: {key}",OBJECT_ADDITIONAL_PROPERTIES:"Additional properties not allowed",OBJECT_DEPENDENCY_KEY:"Dependency failed - key must exist: {missing} (due to key: {key})",ARRAY_LENGTH_SHORT:"Array is too short ({length}), minimum {minimum}",ARRAY_LENGTH_LONG:"Array is too long ({length}), maximum {maximum}",ARRAY_UNIQUE:"Array items are not unique (indices {match1} and {match2})",ARRAY_ADDITIONAL_ITEMS:"Additional items not allowed",FORMAT_CUSTOM:"Format validation failed ({message})",KEYWORD_CUSTOM:"Keyword failed: {key} ({message})",CIRCULAR_REFERENCE:"Circular $refs: {urls}",UNKNOWN_PROPERTY:"Unknown property (not in schema)"};c.prototype=Object.create(Error.prototype),c.prototype.constructor=c,c.prototype.name="ValidationError",c.prototype.prefixWith=function(e,t){if(null!==e&&(e=e.replace(/~/g,"~0").replace(/\//g,"~1"),this.dataPath="/"+e+this.dataPath),null!==t&&(t=t.replace(/~/g,"~0").replace(/\//g,"~1"),this.schemaPath="/"+t+this.schemaPath),null!==this.subErrors)for(var r=0;r<this.subErrors.length;r++)this.subErrors[r].prefixWith(e,t);return this};var E={},j=f();return j.addLanguage("en-gb",g),j.tv4=j,j})},{}],100:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0}),r.MessageFactory=void 0;var o=e("./message-factory/MessageFactory"),i=n(o);r.MessageFactory=i["default"]},{"./message-factory/MessageFactory":103}],101:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0}),r.MessageType=r.Message=void 0;var o=e("babel-runtime/core-js/object/get-prototype-of"),i=n(o),a=e("babel-runtime/helpers/classCallCheck"),s=n(a),u=e("babel-runtime/helpers/createClass"),c=n(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=n(l),d=e("babel-runtime/helpers/inherits"),p=n(d),h=e("../reTHINKObject/RethinkObject.js"),y=n(h),m=r.Message=function(e){function t(e,r,n,o,a){(0,s["default"])(this,t);var u=(0,f["default"])(this,(t.__proto__||(0,i["default"])(t)).call(this));return u.id=e,u.from=r,u.to=n,u.type=o,u.body=a,u}return(0,p["default"])(t,e),(0,c["default"])(t,[{key:"assertIdentity",value:function(e,t){if(!e||!t)throw new Error("message, token to be removed, and assertedIdentity must be provided");
var r=this.body;return r.idToken=null,r.assertedIdentity=t,this.body=r,this}},{key:"addIdToken",value:function(e){if(!e)throw new Error("message, token to be added, must be provided");var t=this.body;return t.idToken=e,this.body=t,this}},{key:"addAccessToken",value:function(e){if(!e)throw new Error("message, token to be added, must be provided");var t=this.body;return t.accessToken=e,this.body=t,this}}]),t}(y["default"]);r.MessageType={CREATE:"create",READ:"read",UPDATE:"update",DELETE:"delete",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",RESPONSE:"response",FORWARD:"forward",EXECUTE:"execute"};r["default"]=m},{"../reTHINKObject/RethinkObject.js":104,"babel-runtime/core-js/object/get-prototype-of":5,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/helpers/inherits":12,"babel-runtime/helpers/possibleConstructorReturn":13}],102:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=(0,u["default"])(e).reduce(function(t,r){return t[e[r]]=r,t},{});return(0,a["default"])((0,u["default"])(e).reduce(function(t,r){return t[r]=e[r],t},function(e){return t[e]}))}Object.defineProperty(r,"__esModule",{value:!0}),r.UPDATE_OPERATION=r.ATTRIBUTE_TYPE=r.REASON_PHRASE=r.RESPONSE_CODE=r.ExecuteMessageBody=r.ResponseMessageBody=r.ForwardMessageBody=r.UpdateMessageBody=r.DeleteMessageBody=r.ReadMessageBody=r.CreateMessageBody=r.MessageBody=void 0;var i=e("babel-runtime/core-js/object/freeze"),a=n(i),s=e("babel-runtime/core-js/object/keys"),u=n(s),c=e("babel-runtime/core-js/object/get-prototype-of"),l=n(c),f=e("babel-runtime/helpers/classCallCheck"),d=n(f),p=e("babel-runtime/helpers/createClass"),h=n(p),y=e("babel-runtime/helpers/possibleConstructorReturn"),m=n(y),v=e("babel-runtime/helpers/inherits"),_=n(v);r.Enum=o;var b=e("../reTHINKObject/RethinkObject.js"),g=n(b),E=r.MessageBody=function(e){function t(e,r,n,o,i){(0,d["default"])(this,t);var a=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this));return a.idToken=e,a.accessToken=r,a.resource=n,a.schema=o,a.assertedIdentity=i,a}return(0,_["default"])(t,e),(0,h["default"])(t,[{key:"addVia",value:function(e){if(!e)throw new Error("via URL to be added, must be provided");return this.via=e,this}}]),t}(g["default"]),j=(r.CreateMessageBody=function(e){function t(e,r,n,o,i,a,s){if((0,d["default"])(this,t),!e)throw new Error("The value parameter is null");var u=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,n,o,i,a,s,a,s));return u.value=e,r&&(u.policy=r),u}return(0,_["default"])(t,e),t}(E),r.ReadMessageBody=function(e){function t(e,r,n,o,i,a,s,u){(0,d["default"])(this,t);var c=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n,o,i));return a&&(c.attribute=a),s&&(c.criteriaSyntax=s),u&&(c.criteria=u),c}return(0,_["default"])(t,e),t}(E),r.DeleteMessageBody=function(e){function t(e,r,n,o,i,a){if((0,d["default"])(this,t),n instanceof Array){var s=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,null,o,i));s.childrenResources=n}else var s=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n,o,i));return a&&(s.attribute=a),(0,m["default"])(s)}return(0,_["default"])(t,e),t}(E),r.UpdateMessageBody=function(e){function t(e,r,n,o,i,a,s){(0,d["default"])(this,t);var u=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n,o,i));return u.attribute=a,u.value=s,u}return(0,_["default"])(t,e),(0,h["default"])(t,[{key:"addAttributeType",value:function(e){e&&(this.attributeType=e)}},{key:"addOperation",value:function(e){e&&(this.operation=e)}}]),t}(E),r.ForwardMessageBody=function(e){function t(e,r,n,o,i,a){(0,d["default"])(this,t);var s=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n,o,i));return s.message=a,s}return(0,_["default"])(t,e),t}(E),r.ResponseMessageBody=function(e){function t(e,r,n,o,i){(0,d["default"])(this,t);var a=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n));return o&&(a.code=o,a.description=j[o]),i&&(a.value=i),a}return(0,_["default"])(t,e),t}(E),r.ExecuteMessageBody=function(e){function t(e,r,n,o,i,a,s){(0,d["default"])(this,t);var u=(0,m["default"])(this,(t.__proto__||(0,l["default"])(t)).call(this,e,r,n,o,i));return u.method=a,s&&(s instanceof Array?u.params=s:u.params=[s]),u}return(0,_["default"])(t,e),t}(E),r.RESPONSE_CODE=o({100:"100",101:"101",200:"200",201:"201",202:"202",203:"203",204:"204",205:"205",206:"206",300:"300",301:"301",302:"302",303:"303",304:"304",305:"305",307:"307",400:"400",401:"401",402:"402",403:"403",404:"404",405:"405",406:"406",407:"407",408:"408",409:"409",410:"410",411:"411",412:"412",413:"413",414:"414",415:"415",416:"416",417:"417",426:"426",500:"500",501:"501",502:"502",503:"503",504:"504",505:"505"}),r.REASON_PHRASE=o({100:"Continue",101:"Switching Protocols",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",426:"Upgrade Required",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Time-out",505:"HTTP Version Not Supported"}));r.ATTRIBUTE_TYPE=o({OBJECT:"OBJECT",ARRAY:"ARRAY"}),r.UPDATE_OPERATION=o({ADD:"ADD",REMOVE:"REMOVE"});r["default"]=E},{"../reTHINKObject/RethinkObject.js":104,"babel-runtime/core-js/object/freeze":4,"babel-runtime/core-js/object/get-prototype-of":5,"babel-runtime/core-js/object/keys":6,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/helpers/inherits":12,"babel-runtime/helpers/possibleConstructorReturn":13}],103:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0}),r.IdGenerator=void 0;var o=e("babel-runtime/regenerator"),i=n(o),a=e("babel-runtime/helpers/classCallCheck"),s=n(a),u=e("babel-runtime/helpers/createClass"),c=n(u),l=e("./Message.js"),f=n(l),d=e("./MessageBody.js"),p=function(){function e(){(0,s["default"])(this,e),this.myGenerator=(new h).idMaker()}return(0,c["default"])(e,[{key:"createCreateMessageRequest",value:function(e,t,r,n){if(!e||!t||!r)throw new Error("from, to, and value of object to be created MUST be specified");var o=""+this.myGenerator.next().value,i=new d.CreateMessageBody(r,n,(void 0),(void 0),(void 0),(void 0),(void 0)),a=new f["default"](o,e,t,l.MessageType.CREATE,i);return a}},{key:"createForwardMessageRequest",value:function(e,t,r){if(!e||!t||!r)throw new Error("from, to, and message to forward MUST be specified");var n=""+this.myGenerator.next().value,o=new d.ForwardMessageBody((void 0),(void 0),(void 0),(void 0),(void 0),r),i=new f["default"](n,e,t,l.MessageType.FORWARD,o);return i}},{key:"createDeleteMessageRequest",value:function(e,t,r,n){if(!e||!t)throw new Error("from and to parameters MUST be specified");var o=""+this.myGenerator.next().value,i=new d.DeleteMessageBody((void 0),(void 0),r,n,(void 0),(void 0)),a=new f["default"](o,e,t,l.MessageType.DELETE,i);return a}},{key:"createUpdateMessageRequest",value:function(e,t,r,n,o){if(!e||!t||!r)throw new Error("from, and to and value MUST be specified");var i=""+this.myGenerator.next().value,a=new d.UpdateMessageBody((void 0),(void 0),n,(void 0),(void 0),o,r),s=new f["default"](i,e,t,l.MessageType.UPDATE,a);return s}},{key:"createReadMessageRequest",value:function(e,t,r,n){if(!e||!t||!r)throw new Error("from, to and the resource to read from MUST be specified");var o=""+this.myGenerator.next().value,i=new d.ReadMessageBody((void 0),(void 0),r,(void 0),(void 0),n,(void 0),(void 0)),a=new f["default"](o,e,t,l.MessageType.READ,i);return a}},{key:"createSubscribeMessageRequest",value:function(e,t,r){if(!e||!t||!r)throw new Error("from, to and the resource to subscribe to MUST be specified");var n=""+this.myGenerator.next().value,o=new d.MessageBody((void 0),(void 0),r,(void 0),(void 0)),i=new f["default"](n,e,t,l.MessageType.SUBSCRIBE,o);return i}},{key:"createUnsubscribeMessageRequest",value:function(e,t,r){if(!e||!t||!r)throw new Error("from, to and the resource to subscribe to MUST be specified");var n=""+this.myGenerator.next().value,o=new d.MessageBody((void 0),(void 0),r,(void 0),(void 0)),i=new f["default"](n,e,t,l.MessageType.UNSUBSCRIBE,o);return i}},{key:"createExecuteMessageRequest",value:function(e,t,r,n){if(!e||!t||!r)throw new Error("from, to and the method to execute MUST be specified");var o=""+this.myGenerator.next().value,i=new d.ExecuteMessageBody((void 0),(void 0),(void 0),(void 0),(void 0),r,n),a=new f["default"](o,e,t,l.MessageType.EXECUTE,i);return a}},{key:"createMessageResponse",value:function(e,t,r,n){if(!t)throw new Error("response Code MUST be specified");var o=new d.ResponseMessageBody((void 0),(void 0),(void 0),t,r,n);return new f["default"](e.id,e.to,e.from,l.MessageType.RESPONSE,o)}},{key:"generateMessageResponse",value:function(e,t,r){if(!e||!t)throw new Error("message and response code MUST be specified");var n=e.body,o=n.idToken,i=n.accessToken,a=n.resource,s=new d.ResponseMessageBody(o,i,a,t,r),u=this.myGenerator.next().value;return new f["default"](u,e.to,e.from,l.MessageType.RESPONSE,s)}}]),e}(),h=r.IdGenerator=function(){function e(){(0,s["default"])(this,e)}return(0,c["default"])(e,[{key:"idMaker",value:i["default"].mark(function t(){var e;return i["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=1;case 1:if(!(e<1e6)){t.next=6;break}return t.next=4,e++;case 4:t.next=1;break;case 6:case"end":return t.stop()}},t,this)})}]),e}();r["default"]=p},{"./Message.js":101,"./MessageBody.js":102,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":15}],104:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0}),r.RethinkObject=void 0;var o=e("babel-runtime/core-js/json/stringify"),i=n(o),a=e("babel-runtime/helpers/classCallCheck"),s=n(a),u=e("babel-runtime/helpers/createClass"),c=n(u),l=e("tv4"),f=n(l),d=r.RethinkObject=function(){function e(){(0,s["default"])(this,e)}return(0,c["default"])(e,[{key:"validate",value:function(e){f["default"].addSchema(e.id,e);var t=f["default"].validateMultiple(JSON.parse((0,i["default"])(this)),e);return t.errors.forEach(function(e){delete e.stack}),(!t.valid||t.missing.length>0)&&(console.warn("Object validation "+(t.valid?"succeeded, but schema contained references:":"failed:"),(0,i["default"])(t,null,2)),console.debug("Object:",(0,i["default"])(this,null,2))),t.valid}}]),e}();r["default"]=d},{"babel-runtime/core-js/json/stringify":1,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,tv4:99}]},{},[100])(100)});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],417:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @author micaelpedrosa@gmail.com
* Minimal interface and implementation to send and receive messages. It can be reused in many type of components.
* Components that need a message system should receive this class as a dependency or extend it.
* Extensions should implement the following private methods: _onPostMessage and _registerExternalListener
*/
var Bus = function () {
  /* private
  _msgId: number;
  _subscriptions: <url: MsgListener[]>
   _responseTimeOut: number
  _responseCallbacks: <url+id: (msg) => void>
   */

  function Bus() {
    (0, _classCallCheck3.default)(this, Bus);

    var _this = this;
    _this._msgId = 0;
    _this._subscriptions = {};

    _this._responseTimeOut = 5000; //default to 3s
    _this._responseCallbacks = {};

    _this._registerExternalListener();
  }

  /**
  * Register listener to receive message when "msg.to === url".
  * Special url "*" for default listener is accepted to intercept all messages.
  * @param {URL} url Address to intercept, tha is in the message "to"
  * @param {Listener} listener listener
  * @return {MsgListener} instance of MsgListener
  */


  (0, _createClass3.default)(Bus, [{
    key: 'addListener',
    value: function addListener(url, listener) {
      var _this = this;

      var item = new MsgListener(_this._subscriptions, url, listener);
      var itemList = _this._subscriptions[url];
      if (!itemList) {
        itemList = [];
        _this._subscriptions[url] = itemList;
      }

      itemList.push(item);
      return item;
    }

    /**
     * Manually add a response listener. Only one listener per message ID should exist.
     * ATENTION, there is no timeout for this listener.
     * The listener should be removed with a removeResponseListener, failing to do this will result in a unreleased memory problem.
     * @param {URL} url Origin address of the message sent, "msg.from".
     * @param {number} msgId Message ID that is returned from the postMessage.
     * @param {Function} responseListener Callback function for the response
     */

  }, {
    key: 'addResponseListener',
    value: function addResponseListener(url, msgId, responseListener) {
      this._responseCallbacks[url + msgId] = responseListener;
    }

    /**
     * Remove the response listener.
     * @param {URL} url Origin address of the message sent, "msg.from".
     * @param {number} msgId  Message ID that is returned from the postMessage
     */

  }, {
    key: 'removeResponseListener',
    value: function removeResponseListener(url, msgId) {
      delete this._responseCallbacks[url + msgId];
    }

    /**
     * Remove all existent listeners for the URL
     * @param  {URL} url Address registered
     */

  }, {
    key: 'removeAllListenersOf',
    value: function removeAllListenersOf(url) {
      delete this._subscriptions[url];
    }

    /**
     * Helper method to bind listeners (in both directions) into other MiniBus target.
     * @param  {URL} outUrl Outbound URL, register listener for url in direction "this -> target"
     * @param  {URL} inUrl Inbound URL, register listener for url in direction "target -> this"
     * @param  {MiniBus} target The other target MiniBus
     * @return {Bound} an object that contains the properties [thisListener, targetListener] and the unbind method.
     */

  }, {
    key: 'bind',
    value: function bind(outUrl, inUrl, target) {
      var _this2 = this;

      var _this = this;

      var thisListn = _this.addListener(outUrl, function (msg) {
        target.postMessage(msg);
      });

      var targetListn = target.addListener(inUrl, function (msg) {
        _this.postMessage(msg);
      });

      return {
        thisListener: thisListn,
        targetListener: targetListn,
        unbind: function unbind() {
          _this2.thisListener.remove();
          _this2.targetListener.remove();
        }
      };
    }

    //publish on default listeners

  }, {
    key: '_publishOnDefault',
    value: function _publishOnDefault(msg) {
      //is there any "*" (default) listeners?
      var itemList = this._subscriptions['*'];
      if (itemList) {
        this._publishOn(itemList, msg);
      }
    }

    //publish on a subscription list.

  }, {
    key: '_publishOn',
    value: function _publishOn(itemList, msg) {
      itemList.forEach(function (sub) {
        sub._callback(msg);
      });
    }
  }, {
    key: '_responseCallback',
    value: function _responseCallback(inMsg, responseCallback) {
      var _this = this;

      //automatic management of response handlers
      if (responseCallback) {
        (function () {
          var responseId = inMsg.from + inMsg.id;
          _this._responseCallbacks[responseId] = responseCallback;

          setTimeout(function () {
            var responseFun = _this._responseCallbacks[responseId];
            delete _this._responseCallbacks[responseId];

            if (responseFun) {
              var errorMsg = {
                id: inMsg.id, type: 'response',
                body: { code: 408, desc: 'Response timeout!', value: inMsg }
              };

              responseFun(errorMsg);
            }
          }, _this._responseTimeOut);
        })();
      }
    }
  }, {
    key: '_onResponse',
    value: function _onResponse(msg) {
      var _this = this;

      if (msg.type === 'response') {
        var responseId = msg.to + msg.id;
        var responseFun = _this._responseCallbacks[responseId];

        //if it's a provisional response, don't delete response listener
        if (msg.body.code >= 200) {
          delete _this._responseCallbacks[responseId];
        }

        if (responseFun) {
          responseFun(msg);
          return true;
        }
      }

      return false;
    }

    //receive messages from external interface

  }, {
    key: '_onMessage',
    value: function _onMessage(msg) {
      var _this = this;

      if (!_this._onResponse(msg)) {
        var itemList = _this._subscriptions[msg.to];
        if (itemList) {
          _this._publishOn(itemList, msg);
        } else {
          _this._publishOnDefault(msg);
        }
      }
    }
  }, {
    key: '_genId',
    value: function _genId(inMsg) {
      //TODO: how do we manage message ID's? Should it be a global runtime counter, or per URL address?
      //Global counter will not work, because there will be multiple MiniBus instances!
      //Per URL, can be a lot of data to maintain!
      //Maybe a counter per MiniBus instance. This is the assumed solution for now.
      if (!inMsg.id || inMsg.id === 0) {
        this._msgId++;
        inMsg.id = this._msgId;
      }
    }

    /**
    * Send messages to local listeners, or if not exists to external listeners.
    * It's has an optional mechanism for automatic management of response handlers.
    * The response handler will be unregistered after receiving the response, or after response timeout (default to 3s).
    * @param  {Message} msg Message to send. Message ID is automatically added to the message.
    * @param  {Function} responseCallback Optional parameter, if the developer what's automatic response management.
    * @return {number} Returns the message ID, in case it should be needed for manual management of the response handler.
    */

  }, {
    key: 'postMessage',
    value: function postMessage(inMsg, responseCallback) {}

    /**
     * Not public available, used by the class extension implementation, to process messages from the public "postMessage" without a registered listener.
     * Used to send the message to an external interface, like a WebWorker, IFrame, etc.
     * @param  {Message.Message} msg Message
     */

  }, {
    key: '_onPostMessage',
    value: function _onPostMessage(msg) {} /*implementation will send message to external system*/

    /**
     * Not public available, used by the class extension implementation, to process all messages that enter the MiniBus from an external interface, like a WebWorker, IFrame, etc.
     * This method is called one time in the constructor to register external listeners.
     * The implementation will probably call the "_onMessage" method to publish in the local listeners.
     * DO NOT call "postMessage", there is a danger that the message enters in a cycle!
     */

  }, {
    key: '_registerExternalListener',
    value: function _registerExternalListener() {/*implementation will register external listener and call "this._onMessage(msg)" */}
  }]);
  return Bus;
}();

var MsgListener = function () {
  /* private
  _subscriptions: <string: MsgListener[]>;
  _url: string;
  _callback: (msg) => void;
  */

  function MsgListener(subscriptions, url, callback) {
    (0, _classCallCheck3.default)(this, MsgListener);

    var _this = this;

    _this._subscriptions = subscriptions;
    _this._url = url;
    _this._callback = callback;
  }

  (0, _createClass3.default)(MsgListener, [{
    key: 'remove',


    /**
     * Remove this listener from the Bus
     */
    value: function remove() {
      var _this = this;

      var subs = _this._subscriptions[_this._url];
      if (subs) {
        var index = subs.indexOf(_this);
        subs.splice(index, 1);

        //if there are no listeners, remove the subscription entirely.
        if (subs.length === 0) {
          delete _this._subscriptions[_this._url];
        }
      }
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }
  }]);
  return MsgListener;
}();

exports.default = Bus;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],418:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Bus2 = require('./Bus');

var _Bus3 = _interopRequireDefault(_Bus2);

var _Pipeline = require('./Pipeline');

var _Pipeline2 = _interopRequireDefault(_Pipeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @author micaelpedrosa@gmail.com
* Message BUS Interface is an extension of the Bus
* It doesn't support the default '*' listener, instead it uses the registry.resolve(..)
*/
/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
var MessageBus = function (_Bus) {
  (0, _inherits3.default)(MessageBus, _Bus);

  /* private
  _registry: Registry
  _forwards: { <from-url>: { fl: MsgListener, sandboxToUrls: Map(Sandbox, [to-url]), urlToSandbox: { to-url: Sandbox } } }
   _pipeline: Pipeline
  */

  //TODO: future optimization
  //1. message batch processing with setInterval
  //2. resolve default gateway/protostub with register.resolve

  function MessageBus(registry) {
    (0, _classCallCheck3.default)(this, MessageBus);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (MessageBus.__proto__ || (0, _getPrototypeOf2.default)(MessageBus)).call(this));

    _this2._registry = registry;
    _this2._forwards = {};

    _this2._pipeline = new _Pipeline2.default(function (error) {
      console.log('PIPELINE-ERROR: ', (0, _stringify2.default)(error));
    });
    return _this2;
  }

  (0, _createClass3.default)(MessageBus, [{
    key: 'postMessage',


    /**
     * Post a message for routing. It will first search for a listener, if there is no one, it sends to a external routing using the _onPostMessage.
     * External routing use the registry.resolve(..) method to decide the destination sandbox.
     * @param  {Message} inMsg            JSON with mandatory Message structure {id, type, from, to}
     * @param  {Callback} responseCallback Optional callback if a response is expected from the request. A response will be always sent, even if it is a "Timeout".
     * @return {number}                  the Message id
     */
    value: function postMessage(inMsg, responseCallback) {
      var _this = this;

      _this._genId(inMsg);

      _this._pipeline.process(inMsg, function (msg) {

        _this._responseCallback(inMsg, responseCallback);

        if (!_this._onResponse(msg)) {
          var itemList = _this._subscriptions[msg.to];
          if (itemList) {
            //do not publish on default address, because of loopback cycle
            _this._publishOn(itemList, msg);
          } else {
            //if there is no listener, send to external interface
            _this._onPostMessage(msg);
          }
        }
      });

      return inMsg.id;
    }

    /**
     * Adds an external publish address listener. Every message for the address will be forwarded to the external routing by _onPostMessage.
     * This means, even if there is a listener for the address, it will also send the message to the external routing.
     * @param {URL} from Publish address.
     */

  }, {
    key: 'addPublish',
    value: function addPublish(from) {
      var _this3 = this;

      var _this = this;

      //verify if forward exist
      var refCount = _this._forwards[from];
      if (!refCount) {
        var forwardListener = _this.addListener(from, function (msg) {
          console.log('MB-PUBLISH: ( ' + from + ' )');
          _this._onPostMessage(msg);
        });

        refCount = {
          counter: 0,
          fl: forwardListener,
          remove: function remove() {
            _this3.counter--;
            if (_this3.counter === 0) {
              _this3.fl.remove();
              delete _this._forwards[from];
            }
          }
        };

        _this._forwards[from] = refCount;
      }

      refCount.counter++;
      return refCount;
    }

    /**
     * Adds a forward listener for a message destination. Every message reaching an address will be also sent to the forward address.
     * @param {URL} from Message destination, it's actually the field "to" of the message.
     * @param {URL} to   Forward address.
     */

  }, {
    key: 'addForward',
    value: function addForward(from, to) {
      var _this = this;

      return _this.addListener(from, function (msg) {
        console.log('MB-FORWARD: ( ' + from + ' to ' + to + ' )');
        _this.forward(to, msg);
      });
    }

    /**
     * Just forward's a message to the forward address. Listeners should be available for the forward address.
     * @param  {URL} url Forward address.
     * @param  {Message} msg Message to forward
     */

  }, {
    key: 'forward',
    value: function forward(url, msg) {
      var _this = this;

      var itemList = _this._subscriptions[url];
      if (itemList) {
        _this._publishOn(itemList, msg);
      }
    }

    //default route, if there are no listeners available for a message destination.

  }, {
    key: '_onPostMessage',
    value: function _onPostMessage(msg) {
      var _this = this;

      //resolve external protostub...
      _this._registry.resolve(msg.to).then(function (route) {
        _this.forward(route, msg);
      }).catch(function (e) {
        console.log('RESOLVE-ERROR: ', e);
      });
    }
  }, {
    key: 'pipeline',
    get: function get() {
      return this._pipeline;
    }
  }]);
  return MessageBus;
}(_Bus3.default);

exports.default = MessageBus;
module.exports = exports['default'];

},{"./Bus":417,"./Pipeline":419,"babel-runtime/core-js/json/stringify":297,"babel-runtime/core-js/object/get-prototype-of":302,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"babel-runtime/helpers/inherits":312,"babel-runtime/helpers/possibleConstructorReturn":313}],419:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @author micaelpedrosa@gmail.com
* Sequencial processor of methods. Similar to how Sequential Promise's work, but better fit for message processing.
* Normal use for this, is to intercept all messages with configured handlers, and act accordingly.
*/
var Pipeline = function () {
  /* public
    handlers: ((PipeContext) => void)[]
    onFail: (error) => void
  */

  function Pipeline(_onFail) {
    (0, _classCallCheck3.default)(this, Pipeline);

    var _this = this;

    _this.handlers = [];
    _this.onFail = _onFail;
  }

  /**
   * Insert a message in the pipeline queue. All messages are wrapped with a PipeContext.
   * @param  {Message} msg       Message for the queue
   * @param  {Callback} onDeliver When message is finished processing from all handlers, it will be delivered in this callback.
   */


  (0, _createClass3.default)(Pipeline, [{
    key: "process",
    value: function process(msg, onDeliver) {
      var _this = this;

      if (_this.handlers.length > 0) {
        var iter = new Iterator(_this.handlers);
        iter.next(new PipeContext(_this, iter, msg, onDeliver));
      } else {
        onDeliver(msg);
      }
    }
  }]);
  return Pipeline;
}();

/**
* @author micaelpedrosa@gmail.com
* Wrapper around a message that adds actions that can be fired by any interceptor handler.
* The Pipeline is asynchronous, so an handler should always call an action, the default one is "next()"
*/


var PipeContext = function () {
  /* private
    _inStop: boolean
     _pipeline: Pipeline
    _iter: Iterator
    _msg: Message
  */

  function PipeContext(pipeline, iter, msg, onDeliver) {
    (0, _classCallCheck3.default)(this, PipeContext);

    var _this = this;

    _this._inStop = false;

    _this._pipeline = pipeline;
    _this._iter = iter;
    _this._msg = msg;
    _this._onDeliver = onDeliver;
  }

  (0, _createClass3.default)(PipeContext, [{
    key: "next",


    /**
     * Proceed to the next interceptor handler, unless there was an error. If it's the last one, proceed to onDeliver handler.
     */
    value: function next() {
      var _this = this;

      if (!_this._inStop) {
        if (_this._iter.hasNext) {
          _this._iter.next(_this);
        } else {
          _this._onDeliver(_this._msg);
        }
      }
    }

    /**
     * Proceed directly to the onDeliver handler, unless there was an error.
     */

  }, {
    key: "deliver",
    value: function deliver() {
      var _this = this;
      if (!_this._inStop) {
        _this._inStop = true;
        _this._onDeliver(_this._msg);
      }
    }

    /**
     * Mark the context with an error and proceed to the onFail handler.
     * @param  {[type]} error [description]
     */

  }, {
    key: "fail",
    value: function fail(error) {
      var _this = this;

      if (!_this._inStop) {
        _this._inStop = true;
        if (_this._pipeline.onFail) {
          _this._pipeline.onFail(error);
        }
      }
    }
  }, {
    key: "pipeline",
    get: function get() {
      return this._pipeline;
    }
  }, {
    key: "msg",
    get: function get() {
      return this._msg;
    },
    set: function set(inMsg) {
      this._msg = inMsg;
    }
  }]);
  return PipeContext;
}();

var Iterator = function () {
  /* private
    _index: number
    _array: []
  */

  function Iterator(array) {
    (0, _classCallCheck3.default)(this, Iterator);

    this._index = -1;
    this._array = array;
  }

  (0, _createClass3.default)(Iterator, [{
    key: "hasNext",
    get: function get() {
      return this._index < this._array.length - 1;
    }
  }, {
    key: "next",
    get: function get() {
      this._index++;
      return this._array[this._index];
    }
  }]);
  return Iterator;
}();

exports.default = Pipeline;
module.exports = exports["default"];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],420:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Class with the cryptographic functions for the authentication protocol
*
*/
var Crypto = function () {
  function Crypto() {
    (0, _classCallCheck3.default)(this, Crypto);

    var _this = this;
  }

  /**
  * encode a byteArray value in base 64 encode
  * @param   {byteArray}    value    byteArray value
  * @return  {string}   encoded value
  */


  (0, _createClass3.default)(Crypto, [{
    key: 'encode',
    value: function encode(value) {
      return btoa(value);
    }

    /**
    * decode a base64 value in a new Uint8Array
    * @param   {string}    value    value encoded in base 64
    * @return  {byteArray} decodedValue
    */

  }, {
    key: 'decode',
    value: function decode(value) {
      return new Uint8Array(JSON.parse('[' + atob(value) + ']'));
    }
  }, {
    key: 'encryptRSA',
    value: function encryptRSA(pubKey, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importRSAencryptKey(new Uint8Array(pubKey)).then(function (publicKey) {

          crypto.subtle.encrypt({
            name: 'RSA-OAEP'
          }, publicKey, //from generateKey or importKey above
          data //ArrayBuffer of data you want to encrypt
          ).then(function (encrypted) {
            //returns an ArrayBuffer containing the encrypted data
            //console.log('crypto-encryptRSA', new Uint8Array(encrypted));
            resolve(new Uint8Array(encrypted));
          }).catch(function (err) {
            console.log('crypto-encryptRSA', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'decryptRSA',
    value: function decryptRSA(privKey, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importRSAdecryptKey(privKey).then(function (privateKey) {

          crypto.subtle.decrypt({
            name: 'RSA-OAEP'
          }, privateKey, //from generateKey or importKey above
          data //ArrayBuffer of the data
          ).then(function (decrypted) {

            var decryptedData = new Uint8Array(decrypted);

            //console.log('crypto-decryptRSA', decryptedData);
            resolve(decryptedData);
          }).catch(function (err) {
            console.log('crypto-decryptRSA', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'signRSA',
    value: function signRSA(privKey, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importRSAsignKey(privKey).then(function (privateKey) {

          crypto.subtle.sign({
            name: 'RSASSA-PKCS1-v1_5'
          }, privateKey, //from generateKey or importKey above
          _this._utf8Encode(data) //ArrayBuffer of data you want to sign
          ).then(function (signature) {
            //returns an ArrayBuffer containing the signature
            //console.log('crypto-signRSA', new Uint8Array(signature));
            resolve(new Uint8Array(signature));
          }).catch(function (err) {
            console.log('crypto-signRSA', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'verifyRSA',
    value: function verifyRSA(pubKey, data, signature) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importRSAverifyKey(pubKey).then(function (publicKey) {

          crypto.subtle.verify({
            name: 'RSASSA-PKCS1-v1_5'
          }, publicKey, //from generateKey or importKey above
          signature, //ArrayBuffer of the signature
          _this._utf8Encode(data) //ArrayBuffer of the data
          ).then(function (isvalid) {
            //returns a boolean on whether the signature is true or not
            //console.log('crypto-verifyRSA', isvalid);
            resolve(isvalid);
          }).catch(function (err) {
            console.log('crypto-verifyRSA', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'encryptAES',
    value: function encryptAES(key, data, iv) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importAESkey(key).then(function (aesKey) {

          crypto.subtle.encrypt({
            name: 'AES-CBC',
            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            iv: iv
          }, aesKey, //from generateKey or importKey above
          _this._utf8Encode(data) //ArrayBuffer of data you want to encrypt
          ).then(function (encrypted) {
            //returns an ArrayBuffer containing the encrypted data
            //console.log('crypto-encryptAES', new Uint8Array(encrypted));
            resolve(new Uint8Array(encrypted));
          }).catch(function (err) {
            console.log('crypto-encryptAES', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'decryptAES',
    value: function decryptAES(key, data, iv) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this._importAESkey(key).then(function (aesKey) {

          crypto.subtle.decrypt({
            name: 'AES-CBC',
            iv: iv
          }, aesKey, //from generateKey or importKey above
          data //ArrayBuffer of the data
          ).then(function (decrypted) {

            var decodedData = _this._utf8Decode(new Uint8Array(decrypted));
            //console.log('crypto-decryptAES', decodedData);
            resolve(decodedData);
          }).catch(function (err) {
            console.log('crypto-decryptAES', err);
            reject(err);
          });
        });
      });
    }

    /**
    * creates a hash using the HMAC algorithm
    * @param  {byteArray}    key       key to be used in the hmac
    * @param  {string}      data       information to be hashed
    * @return  {byteArray}   signature  resulting hash
    */

  }, {
    key: 'hashHMAC',
    value: function hashHMAC(key, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        _this._importHMACkey(key).then(function (hmacKey) {

          crypto.subtle.sign({
            name: 'HMAC'
          }, hmacKey, //from generateKey or importKey above
          _this._utf8Encode(data) //ArrayBuffer of data you want to sign
          ).then(function (signature) {
            //console.log('crypto-hashHMAC', signature);

            //returns an ArrayBuffer containing the signature
            resolve(new Uint8Array(signature));
          }).catch(function (err) {
            console.log('crypto-hashHMAC', err);
            reject(err);
          });
        });
      });
    }

    /**
    * verifies an hash using the HMAC algorithm
    * @param  {byteArray}    key       key to be used in the hmac
    * @param  {string}      data       information to be hashed to compare
    * @param  {byteArray}  signature   hash to compare with the received data
    * @return  {boolean}   isvalid     boolean saying if the data corresponds to the hash received
    */

  }, {
    key: 'verifyHMAC',
    value: function verifyHMAC(key, data, signature) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        _this._importHMACkey(key).then(function (hmacKey) {

          crypto.subtle.verify({
            name: 'HMAC'
          }, hmacKey, //from generateKey or importKey above
          signature, //ArrayBuffer of the signature
          _this._utf8Encode(data) //ArrayBuffer of the data
          ).then(function (isvalid) {
            //returns a boolean on whether the signature is true or not
            //console.log('crypto-verifyHMAC', isvalid);
            isvalid ? resolve(isvalid) : reject(isvalid);
          }).catch(function (err) {
            console.error('crypto-verifyHMAC', err);
            reject(err);
          });
        });
      });
    }

    /**
    * generates a RSA public/private key pair with a modulus length of 2048 bits
    * @return  {JSON}   keyPair    json containing the public and private keys
    */

  }, {
    key: 'generateRSAKeyPair',
    value: function generateRSAKeyPair() {
      var _this = this;
      var keyPair = {};

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.generateKey({
          name: 'RSA-PSS',
          modulusLength: 2048, //can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: { name: 'SHA-256' } //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['sign', 'verify'] //can be any combination of 'sign' and 'verify'

        ).then(function (key) {
          //returns a keypair object
          //console.log(key);

          crypto.subtle.exportKey('spki', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
          key.publicKey //can be a publicKey or privateKey, as long as extractable was true
          ).then(function (publicKey) {
            //returns the exported key data
            keyPair.public = new Uint8Array(publicKey);
            return crypto.subtle.exportKey('pkcs8', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
            key.privateKey //can be a publicKey or privateKey, as long as extractable was true
            );
          }).then(function (privateKey) {
            keyPair.private = new Uint8Array(privateKey);
            //console.log('crypto-generateRSAKeyPair', keyPair);

            resolve(keyPair);
          }).catch(function (err) {
            console.error(err);
            reject(err);
          });
        }).catch(function (err) {
          console.error(err);
          reject(err);
        });
      });
    }

    /**
    * Generates a 128 bit random value.
    * @return {byteArray}  array    random value
    */

  }, {
    key: 'generateIV',
    value: function generateIV() {
      var _this = this;

      var array = new Uint8Array(16);
      crypto.getRandomValues(array);

      return array;
    }

    /**
    * Generates a 256 bit random value. 32 bits are extrated from the machine time,
    * the remaining are generated randomly
    * @return {byteArray}  array    random value
    */

  }, {
    key: 'generateRandom',
    value: function generateRandom() {
      var _this = this;

      var array = new Uint8Array(32);
      crypto.getRandomValues(array);

      var date = Date.now();
      var dateEncoded = _this._utf8Encode(date);

      //extract the least significant 4 bytes in the date
      var finalDate = dateEncoded.slice(dateEncoded.length - 4, dateEncoded.length);

      // add in the first 4 bytes of the array the bytes extracted previously;
      for (var i = 0; i < 4; i++) {
        array[i] = finalDate[i];
      }
      return array;
    }

    /**
    * generates a premaster secret (PMS) of 48 bytes (384 bits) randomly
    * @return {byteArray}  array    premaster secret key
    */

  }, {
    key: 'generatePMS',
    value: function generatePMS() {
      var _this = this;

      var array = new Uint8Array(48);
      crypto.getRandomValues(array);
      return array;
    }

    /**
    * generates a masterKey secret (PMS) of 48 bytes (384 bits) using the premaster secret and
    * two randoms
    * @return {byteArray}  array    master secret key with 48 bytes
    */

  }, {
    key: 'generateMasterSecret',
    value: function generateMasterSecret(hmacKey, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var key = new Uint8Array(48);
        var seed = data;

        _this._digest(hmacKey).then(function (digestedKey) {

          _this.hashHMAC(digestedKey, seed).then(function (keypart0) {

            //copy the first 32 bytes into the key
            for (var i = 0; i < 32; i++) {
              key[i] = keypart0[i];
            }
            return _this.hashHMAC(digestedKey, seed + keypart0);
          }).then(function (keypart1) {

            //copy the first 16 bytes to the key remaining 16 bytes
            for (var i = 0; i < 16; i++) {
              key[i + 32] = keypart1[i];
            }
            //console.log('crypto-generateMasterSecret', key);
            resolve(key);
          }).catch(function (err) {
            console.log('crypto-generateMasterSecret', err);
            reject(err);
          });
        });
      });
    }

    /**
    * generates both users MAC and encryption keys. generate as output an array
    * with 4 byteArray each with 32 bytes
    * @param  {byteArray}        secret       secret to be used in the HMAC function
    * @param  {String}           data         information to be used as seed
    * @return {Array<byteArray>} key          array with the information to generate keys
    */

  }, {
    key: 'generateKeys',
    value: function generateKeys(hmacKey, data) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var key = [];
        var seed = data;

        // iterate 4 times to obtain a 1024 key size
        _this.hashHMAC(hmacKey, seed).then(function (keypart0) {
          key.push(keypart0);
          return _this.hashHMAC(hmacKey, seed + keypart0);
        }).then(function (keypart1) {
          key.push(keypart1);
          return _this.hashHMAC(hmacKey, seed + keypart1);
        }).then(function (keypart2) {
          key.push(keypart2);
          return _this.hashHMAC(hmacKey, seed + keypart2);
        }).then(function (keypart3) {
          key.push(keypart3);

          //console.log('crypto-generateKeys', key);
          resolve(key);
        }).catch(function (err) {
          //console.log('crypto-generateKeys', err);
          reject(err);
        });

        //console.log(hmacKey, data);
      });
    }
  }, {
    key: '_importRSAsignKey',
    value: function _importRSAsignKey(privKey) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.importKey('pkcs8', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
        privKey, { //these are the algorithm options
          name: 'RSASSA-PKCS1-v1_5',
          hash: { name: 'SHA-256' } //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['sign'] //'verify' for public key import, 'sign' for private key imports
        ).then(function (privateKey) {
          //returns a publicKey (or privateKey if you are importing a private key)
          //console.log('crypto-_importRSAsignKey', privateKey);
          resolve(privateKey);
        }).catch(function (err) {
          console.error('crypto-_importRSAsignKey', err);
          reject(err);
        });
      });
    }
  }, {
    key: '_importRSAverifyKey',
    value: function _importRSAverifyKey(pubKey) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.importKey('spki', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
        pubKey, { //these are the algorithm options
          name: 'RSASSA-PKCS1-v1_5',
          hash: { name: 'SHA-256' } //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['verify'] //'verify' for public key import, 'sign' for private key imports
        ).then(function (publicKey) {
          //returns a publicKey (or privateKey if you are importing a private key)
          //console.log('crypto-_importRSAverifyKey', publicKey);
          resolve(publicKey);
        }).catch(function (err) {
          console.error('crypto-_importRSAverifyKey', err);
          reject(err);
        });
      });
    }
  }, {
    key: '_importRSAencryptKey',
    value: function _importRSAencryptKey(pubKey) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.importKey('spki', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
        pubKey, { //these are the algorithm options
          name: 'RSA-OAEP',
          hash: { name: 'SHA-256' } //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['encrypt'] //'encrypt' or 'wrapKey' for public key import or
        //'decrypt' or 'unwrapKey' for private key imports
        ).then(function (publicKey) {
          //returns a publicKey (or privateKey if you are importing a private key)
          //console.log('crypto-_importRSAencryptKey', publicKey);
          resolve(publicKey);
        }).catch(function (err) {
          console.error('crypto-_importRSAencryptKey', err);
          reject(err);
        });
      });
    }
  }, {
    key: '_importRSAdecryptKey',
    value: function _importRSAdecryptKey(privKey) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.importKey('pkcs8', //can be 'jwk' (public or private), 'spki' (public only), or 'pkcs8' (private only)
        privKey, { //these are the algorithm options
          name: 'RSA-OAEP',
          hash: { name: 'SHA-256' } //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['decrypt'] //'encrypt' or 'wrapKey' for public key import or
        //'decrypt' or 'unwrapKey' for private key imports
        ).then(function (privateKey) {
          //returns a publicKey (or privateKey if you are importing a private key)
          //console.log('crypto-_importRSAdecryptKey', privateKey);
          resolve(privateKey);
        }).catch(function (err) {
          console.error('crypto-_importRSAdecryptKey', err);
          reject(err);
        });
      });
    }
  }, {
    key: 'concatPMSwithRandoms',
    value: function concatPMSwithRandoms(pms, toRandom, fromRandom) {
      var _this = this;

      var finalKey = new Uint8Array(pms.length + toRandom.length + fromRandom.length);

      // add PremasterKey
      for (var i = 0; i < pms.length; i++) {
        finalKey[i] = pms[i];
      }

      //add to random
      for (var _i = 0; _i < toRandom.length; _i++) {
        finalKey[_i + pms.length] = pms[_i];
      }

      //add from random
      for (var _i2 = 0; _i2 < fromRandom.length; _i2++) {
        finalKey[_i2 + pms.length + toRandom.length] = pms[_i2];
      }

      return finalKey;
    }
  }, {
    key: '_generate256bitKey',
    value: function _generate256bitKey() {
      var array = new Uint8Array(32);
      crypto.getRandomValues(array);

      return array;
    }

    /**
    * imports the secret to the HMAC function
    * @param  {byteArray}   arrayBuffer     bytes to import as key
    * @return {JSON}       key              key ready to be used in the HMAC cryptographic function
    */

  }, {
    key: '_importHMACkey',
    value: function _importHMACkey(arrayBuffer) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        _this._digest(arrayBuffer).then(function (key) {

          crypto.subtle.importKey('raw', //can be 'jwk' or 'raw'
          key, { //this is the algorithm options
            name: 'HMAC',
            hash: { name: 'SHA-256' }, //can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'
            length: 256 //optional, if you want your key length to differ from the hash function's block length
          }, true, //whether the key is extractable (i.e. can be used in exportKey)
          ['sign', 'verify'] //can be any combination of 'sign' and 'verify'
          ).then(function (key) {
            //returns the symmetric key
            //console.log('crypto-_importHMACkey', key);
            resolve(key);
          }).catch(function (err) {
            reject(err);
          });
        });
      });
    }
  }, {
    key: '_digest',
    value: function _digest(value) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.digest({
          name: 'SHA-256'
        }, value //The data you want to hash as an ArrayBuffer
        ).then(function (hash) {
          //returns the hash as an ArrayBuffer
          //console.log('crypto-digest', new Uint8Array(hash));
          resolve(new Uint8Array(hash));
        }).catch(function (err) {
          console.error(err);
          reject(err);
        });
      });
    }
  }, {
    key: '_importAESkey',
    value: function _importAESkey(arrayBuffer) {
      return new _promise2.default(function (resolve, reject) {
        crypto.subtle.importKey('raw', //can be 'jwk' or 'raw'
        arrayBuffer, { //this is the algorithm options
          name: 'AES-CBC'
        }, true, //whether the key is extractable (i.e. can be used in exportKey)
        ['encrypt', 'decrypt'] //can be 'encrypt', 'decrypt', 'wrapKey', or 'unwrapKey'
        ).then(function (key) {
          //returns the symmetric key
          //console.log('crypto-importAESkey', key);
          resolve(key);
        }).catch(function (err) {
          console.error('crypto-importAESkey', err);
          reject(err);
        });
      });
    }
  }, {
    key: '_utf8Encode',
    value: function _utf8Encode(s) {
      return new TextEncoder('utf-8').encode(s);
    }
  }, {
    key: '_utf8Decode',
    value: function _utf8Decode(s) {
      return new TextDecoder('utf-8').decode(s);
    }
  }]);
  return Crypto;
}();

exports.default = Crypto;
module.exports = exports['default'];

},{"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],421:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* fake class for the gui to select the identity,
* TODO replace with the proper identity GUI
*
*/
var GuiFake = function GuiFake(url, messageBus) {
  (0, _classCallCheck3.default)(this, GuiFake);

  var _this = this;

  _this._url = url;
  _this._waitTime = 10000;
  _this._messageBus = messageBus;

  _this._messageBus.addListener(_this._url, function (msg) {

    var identities = msg.body.value.identities;
    var idps = msg.body.value.idps;

    var value = void 0;

    if (identities[0] !== undefined) {
      value = { type: 'identity', value: identities[0], code: 200 };
    } else {
      value = { type: 'idp', value: idps[0], code: 200 };
    }

    var replyMsg = { id: msg.id, type: 'response', to: msg.from, from: msg.to, body: value };

    // to test on the identity side the listener without the timeout
    // can represent the time the user takes to choose and identity
    if (msg.body.value === 'wait') {

      setTimeout(function () {
        _this._messageBus.postMessage(replyMsg);
      }, _this._waitTime);
    } else {
      _this._messageBus.postMessage(replyMsg);
    }
  });
};

exports.default = GuiFake;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309}],422:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* The Identity Data Model is used to model the reTHINK User entity. The Identity data model is handled by Identity Management functionality.
*
*/
var Identity = function () {
  function Identity(guid, type) {
    (0, _classCallCheck3.default)(this, Identity);

    var _this = this;

    _this.guid = guid;
    _this.type = type;
    _this.identifiersList = {};
  }

  (0, _createClass3.default)(Identity, [{
    key: 'addIdentity',
    value: function addIdentity(identifier) {
      var _this = this;
      var identityInformation = {
        idAssertion: '',
        serviceAddress: '',
        authenticationData: '',
        authorisationData: '',
        userProfile: ''
      };
      _this.identifiersList[identifier] = identityInformation;
    }
  }, {
    key: 'addIdAssertion',
    value: function addIdAssertion(identifier, assertion, idp, scope) {
      var _this = this;

      var newIdAssertion = new IdAssertion(assertion, idp, scope);

      _this.idAssertionList.push(newIdAssertion);
    }
  }]);
  return Identity;
}();

var IdAssertion = function IdAssertion(assertion, idp, scope) {
  (0, _classCallCheck3.default)(this, IdAssertion);

  var _this = this;

  _this.assertion = assertion;
  _this.idp = idp;
  _this.scope = scope;
};

var IdValidation = function () {
  function IdValidation(identity, contents) {
    (0, _classCallCheck3.default)(this, IdValidation);

    var _this = this;
    _this.identity = identity;
    _this.contents = contents;
  }

  (0, _createClass3.default)(IdValidation, [{
    key: 'validates',
    value: function validates(identity, contents) {
      //TODO implement the logic

    }
  }]);
  return IdValidation;
}();

exports.default = Identity;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],423:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils.js');

var _Identity = require('./Identity');

var _Identity2 = _interopRequireDefault(_Identity);

var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _GuiFake = require('./GuiFake');

var _GuiFake2 = _interopRequireDefault(_GuiFake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* The Identity Module (Id Module) is the component responsible for handling the
* user identity and the association of this identity with the Hyperty instances,
* in order to make Hyperty instances identifiable. The identity in the reTHINK project
* is not fixed to a unique Identity Service Provider, but obtained through several
* different Identity sources. With this approach, the Id Module provides to the user the
* option to choose the preferred method for authentication.
* This module will thus able to support multiple Identity acquisition methods,
* such as OpenID connect 1.0, Kerberos System, or authentication through smart cards.
* For example, a user with a Google account can use the Google as an Identity Provider to provide Identity Tokens,
*  which can be used by the Identity Module to associate it with a Hyperty instance.
*
* The Identity Module uses a node package, the HelloJS, which is a client-side JavaScript API for authentication
* that facilitates the requests for the OpenID connect protocol. This method allows for some abstraction
* when making requests for different Identity Providers, such as OpenID connect used by Google, Facebook, Microsoft, for example.
*
* When a request for a user identity is made using the method loginWithRP(identifier, scope),
* this method will analyse the Identity Provider chosen to obtain an identity and will use the HelloJS node package
* with the selected Identity Provider and identity scope. After the HelloJS request for an Access Token
* to the Identity Providers, the user will be prompted to authenticate towards the Identity Provider.
* Upon receiving the Access Token, this token is validated with a RESTful web service request to an endpoint
* on the Identity Provider Authorization Server, and after the validation is done,
* an ID token is obtained with the information according to the scope required.
* This ID token is then preserved in this module that can obtained through the getIdentities()
* and is passed as return value of the loginWithRP function. The methods generateAssertion and validateAssertion have not yet been developed.
*
*/
var IdentityModule = function () {

  /**
  * This is the constructor to initialise the Identity Module it does not require any input.
  */
  function IdentityModule(runtimeURL) {
    (0, _classCallCheck3.default)(this, IdentityModule);

    var _this = this;

    if (!runtimeURL) throw new Error('runtimeURL is missing.');

    _this._runtimeURL = runtimeURL;
    _this._idmURL = _this._runtimeURL + '/idm';
    _this._guiURL = _this._runtimeURL + '/identity-gui';

    _this._domain = (0, _utils.divideURL)(_this._runtimeURL).domain;

    //to store items with this format: {identity: identityURL, token: tokenID}
    _this.identities = [];
    _this.emailsList = [];
    var newIdentity = new _Identity2.default('guid', 'HUMAN');
    _this.identity = newIdentity;
    _this.crypto = new _Crypto2.default();

    //stores the association of the dataObject and the Hyperty registered within
    _this.dataObjectsIdentity = {};

    // hashTable to store all the crypto information between two hyperties
    _this.chatKeys = {};

    // hashTable to store the symmetric keys to be used in the chat group
    _this.dataObjectSessionKeys = {};

    //failsafe to enable/disable all the criptographic functions
    _this.isToUseEncryption = true;

    // variable to know if the GUI is deployed to choose the identity. if the real GUI is not deployed, a fake gui is deployed instead.
    _this.guiDeployed = false;

    // verification of nodeJS, and in case it is nodeJS then disable encryption
    // TODO improve later, this exists because the crypto lib uses browser cryptographic methods
    //_this.isToUseEncryption = (window) ? true : false;
  }

  /**
  * return the messageBus in this Registry
  * @param {MessageBus}           messageBus
  */


  (0, _createClass3.default)(IdentityModule, [{
    key: 'getIdentities',


    /**
    * Function to return all the identities registered within a session by a user.
    * These identities are returned in an array containing a JSON package for each user identity.
    * @return {Array<Identities>}         Identities
    */
    value: function getIdentities() {
      var _this = this;
      return _this.identities;
    }

    /**
    * gets all the information from a given userURL
    * @param  {String}  userURL     user url
    * @return {JSON}    identity    identity bundle from the userURL
    */

  }, {
    key: 'getIdentity',
    value: function getIdentity(userURL) {
      var _this = this;

      for (var index in _this.identities) {

        var identity = _this.identities[index];
        if (identity.identity === userURL) {
          return identity;
        }
      }

      throw 'identity not found';
    }
  }, {
    key: 'deployGUI',
    value: function deployGUI() {
      var _this = this;
      _this.guiDeployed = true;
    }
  }, {
    key: 'getIdentityOfHyperty',
    value: function getIdentityOfHyperty(hypertyURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var splitURL = hypertyURL.split('://');
        if (splitURL[0] !== 'hyperty') {
          _this._getHypertyFromDataObject(hypertyURL).then(function (returnedHypertyURL) {
            var userURL = _this.registry.getHypertyOwner(returnedHypertyURL);
            if (userURL) {

              for (var index in _this.identities) {
                var identity = _this.identities[index];
                if (identity.identity === userURL) {
                  return resolve(identity.messageInfo);
                }
              }
            } else {
              return reject('no identity was found ');
            }
          });
        } else {
          var userURL = _this.registry.getHypertyOwner(hypertyURL);
          if (userURL) {

            for (var index in _this.identities) {
              var identity = _this.identities[index];
              if (identity.identity === userURL) {
                return resolve(identity.messageInfo);
              }
            }
          } else {
            return reject('no identity was found.');
          }
        }
      });
    }
  }, {
    key: 'getIdentitiesToChoose',
    value: function getIdentitiesToChoose() {
      var _this = this;
      var identities = _this.emailsList;
      var idps = ['google.com', 'microsoft.com'];

      return { identities: identities, idps: idps };
    }

    /**
    * Function to return all the users URLs registered within a session
    * These users URLs are returned in an array of strings.
    * @param  {Boolean}  emailFormat (Optional)   boolean to indicate to return in email format
    * @return {Array<String>}         users
    */

  }, {
    key: 'getUsersIDs',
    value: function getUsersIDs(emailFormat) {
      var _this = this;
      var users = [];

      //if request comes with the emailFormat option, then convert url to email format
      var converter = emailFormat ? _utils.getUserEmailFromURL : function (value) {
        return value;
      };

      for (var index in _this.identities) {
        var identity = _this.identities[index];
        users.push(converter(identity.identity));
      }
      return users;
    }

    /**
    * Function to return the selected Identity within a session
    * @return {Identity}        identity         identity
    */

  }, {
    key: 'getCurrentIdentity',
    value: function getCurrentIdentity() {
      var _this = this;
      return _this.currentIdentity;
    }

    /**
    * Function to set the current Identity with a given Identity
    * @param {Identity}        identity         identity
    */

  }, {
    key: 'setCurrentIdentity',
    value: function setCurrentIdentity(identity) {
      var _this = this;
      _this.currentIdentity = identity;
    }

    /**
    * Function to remove an identity from the Identities array
    * @param {String}    userID      userID
    */

  }, {
    key: 'deleteIdentity',
    value: function deleteIdentity(userID) {
      var _this = this;

      var userURL = (0, _utils.convertToUserURL)(userID);

      for (var identity in _this.identities) {
        if (_this.identities[identity].identity === userURL) {
          _this.identities.splice(identity, 1);
        }
      }
    }

    /**
    * Function to unregister an identity from the emailsList array and not show in to the GUI
    * @param {String}    email      email
    */

  }, {
    key: 'unregisterIdentity',
    value: function unregisterIdentity(email) {
      var _this = this;

      for (var e in _this.emailsList) {
        if (_this.emailsList[e] === email) {
          _this.emailsList.splice(e, 1);
        }
      }
    }

    /**
    * Function that resolve and create the domainURL in case it is provided one. If not, resolve the default domainURL
    * @param {String}     idpDomain     idpDomain (Optional)
    */

  }, {
    key: '_resolveDomain',
    value: function _resolveDomain(idpDomain) {
      if (!idpDomain) {
        return 'domain-idp://google.com';
      } else {
        return 'domain-idp://' + idpDomain;
      }
    }

    /**
    * Function to login a user within the session, it will start the process to obtain an Identity from a user, including the request for an identity Assertion. The function returns a promise with the token received by the idpProxy.
    *
    * @param  {Identifier}      identifier      identifier
    * @param  {Scope}           scope           scope
    * @return {Promise}         Promise         IDToken containing the user information
    */

  }, {
    key: 'loginWithRP',
    value: function loginWithRP(identifier, scope) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //TODO remove this verification and refactor this part
        _this.currentIdentity = undefined;
        _this.getIdentityAssertion('identifier', 'origin', 'hint', identifier).then(function (value) {
          console.log('loginWithRP');
          resolve(value);
        }, function (err) {
          console.log('loginWithRP err');
          reject(err);
        });
      });
    }

    /**
    * Function that sends a request to the GUI using messages. Sends all identities registered and
    * the Idps supported, and return the identity/idp received by the GUI
    * @param {Array<identity>}  identities      list of identitiies
    * @param {Array<String>}    idps            list of idps to authenticate
    * @return {Promise}         returns a chosen identity or idp
    */

  }, {
    key: 'requestIdentityToGUI',
    value: function requestIdentityToGUI(identities, idps) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //condition to check if the real GUI is deployed. If not, deploys a fake gui
        if (_this.guiDeployed === false) {

          var guiFake = new _GuiFake2.default(_this._guiURL, _this._messageBus);
          _this.guiFake = guiFake;
          _this.guiDeployed = true;
        }

        var message = { type: 'create', to: _this._guiURL, from: _this._idmURL,
          body: { value: { identities: identities, idps: idps } } };

        var id = _this._messageBus.postMessage(message);

        //add listener without timout
        _this._messageBus.addResponseListener(_this._idmURL, id, function (msg) {
          _this._messageBus.removeResponseListener(_this._idmURL, id);

          if (msg.body.code === 200) {
            var selectedIdentity = msg.body;

            console.log('selectedIdentity: ', selectedIdentity.value);
            resolve(selectedIdentity);
          } else {
            reject('error on requesting an identity to the GUI');
          }
        });
      });
    }
  }, {
    key: 'openPopup',
    value: function openPopup(urlreceived) {

      return new _promise2.default(function (resolve, reject) {

        var win = window.open(urlreceived, 'openIDrequest', 'width=800, height=600');
        if (window.cordova) {
          win.addEventListener('loadstart', function (e) {
            var url = e.url;
            var code = /\&code=(.+)$/.exec(url);
            var error = /\&error=(.+)$/.exec(url);

            if (code || error) {
              win.close();
              resolve(url);
            }
          });
        } else {
          (function () {
            var pollTimer = setInterval(function () {
              try {
                if (win.closed) {
                  reject('Some error occured when trying to get identity.');
                  clearInterval(pollTimer);
                }

                if (win.document.URL.indexOf('id_token') !== -1 || win.document.URL.indexOf(location.origin) !== -1) {
                  window.clearInterval(pollTimer);
                  var url = win.document.URL;

                  win.close();
                  resolve(url);
                }
              } catch (e) {
                //console.log(e);
              }
            }, 500);
          })();
        }
      });
    }

    /**
    * Function that fetch an identityAssertion from a user.
    *
    * @return {IdAssertion}              IdAssertion
    */

  }, {
    key: 'getIdentityAssertion',
    value: function getIdentityAssertion(identifier, origin, usernameHint, idpDomain) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //CHECK whether is browser environment or nodejs
        //if it is browser, then create a fake identity

        try {
          if (window) {

            var identitiesInfo = _this.getIdentitiesToChoose();

            _this.requestIdentityToGUI(identitiesInfo.identities, identitiesInfo.idps).then(function (value) {

              if (value.type === 'identity') {

                var chosenID = (0, _utils.getUserURLFromEmail)(value.value);

                // returns the identity info from the chosen id
                for (var i in _this.identities) {
                  if (_this.identities[i].identity === chosenID) {
                    return resolve(_this.identities[i].messageInfo);
                  }
                }
                reject('no identity was found .');
              } else if (value.type === 'idp') {

                _this.callGenerateMethods(value.value, origin).then(function (value) {
                  resolve(value);
                }, function (err) {
                  reject(err);
                });
              } else {
                reject('error on GUI received message.');
              }
            });
          }
        } catch (error) {

          if (_this.currentIdentity !== undefined) {
            //TODO verify whether the token is still valid or not.
            // should be needed to make further requests, to obtain a valid token
            return resolve(_this.currentIdentity);
          } else {
            console.log('getIdentityAssertion for nodejs');
            var randomNumber = Math.floor(Math.random() * 10000 + 1);
            var identityBundle = {
              assertion: 'assertion',
              idp: 'nodejs',
              userProfile: {
                avatar: 'https://lh3.googleusercontent.com/-WaCrjVMMV-Q/AAAAAAAAAAI/AAAAAAAAAAs/8OlVqCpSB9c/photo.jpg',
                cn: 'test nodejs',
                username: 'nodejs-' + randomNumber + '@nodejs.com',
                userURL: 'user://nodejs.com/nodejs-' + randomNumber
              } };
            _this.currentIdentity = identityBundle;
            _this.identities.push(identityBundle);
            return resolve(identityBundle);
          }
        }
      });
    }
  }, {
    key: 'callGenerateMethods',
    value: function callGenerateMethods(idp, origin) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var publicKey = void 0;
        var userkeyPair = void 0;

        //generates the RSA key pair
        _this.crypto.generateRSAKeyPair().then(function (keyPair) {

          publicKey = btoa(keyPair.public);
          userkeyPair = keyPair;
          return _this.generateAssertion(publicKey, origin, '', userkeyPair, idp);
        }).then(function (url) {
          return _this.generateAssertion(publicKey, origin, url, userkeyPair, idp);
        }).then(function (value) {
          if (value) {
            resolve(value);
          } else {
            reject('Error on obtaining Identity');
          }
        }).catch(function (err) {
          console.log(err);
          reject(err);
        });
      });
    }
  }, {
    key: 'sendGenerateMessage',
    value: function sendGenerateMessage(contents, origin, usernameHint, idpDomain) {
      var _this = this;
      var domain = _this._resolveDomain(idpDomain);
      var message = void 0;

      return new _promise2.default(function (resolve, reject) {
        message = { type: 'execute', to: domain, from: _this._idmURL, body: { resource: 'identity', method: 'generateAssertion', params: { contents: contents, origin: origin, usernameHint: usernameHint } } };
        _this._messageBus.postMessage(message, function (res) {
          var result = res.body.value;

          resolve(result);
        });
      });
    }
  }, {
    key: 'storeIdentity',
    value: function storeIdentity(result, keyPair) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var assertionParsed = JSON.parse(atob(result.assertion));
        var idToken = void 0;

        //TODO remove the verification and remove the tokenIDJSON from the google idpProxy;
        if (assertionParsed.tokenIDJSON) {
          idToken = assertionParsed.tokenIDJSON;
        } else {
          idToken = assertionParsed;
        }

        result.identity = (0, _utils.getUserURLFromEmail)(idToken.email);

        _this.identity.addIdentity(result);

        // check if exists any infoToken in the result received
        var infoToken = result.infoToken ? result.infoToken : {};
        var userProfileBundle = { username: idToken.email, cn: idToken.name, avatar: infoToken.picture, locale: infoToken.locale, userURL: (0, _utils.getUserURLFromEmail)(idToken.email) };

        //creation of a new JSON with the identity to send via messages
        var newIdentity = { userProfile: userProfileBundle, idp: result.idp.domain, assertion: result.assertion };
        result.messageInfo = newIdentity;
        result.keyPair = keyPair;

        _this.currentIdentity = newIdentity;

        //verify if the id already exists. If already exists then do not add to the identities list;
        var idAlreadyExists = false;
        var oldId = void 0;
        for (var identity in _this.identities) {
          if (_this.identities[identity].identity === result.identity) {
            idAlreadyExists = true;
            oldId = _this.identities[identity].messageInfo;
          }
        }

        if (idAlreadyExists) {
          resolve(oldId);
          var exists = false;

          //check if the identity exists in emailList, if not add it
          //This is useful if an identity was previously registered but was later unregistered
          for (var i in _this.emailsList) {
            if (_this.emailsList[i] === idToken.email) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            _this.emailsList.push(idToken.email);
          }
        } else {
          _this.emailsList.push(idToken.email);
          _this.identities.push(result);
          resolve(newIdentity);
        }
      });
    }

    /**
    * Requests the IdpProxy from a given Domain for an identityAssertion
    *
    * @param  {DOMString} contents     contents
    * @param  {DOMString} origin       origin
    * @param  {DOMString} usernameHint usernameHint
    * @param  {JSON}      keyPair       user keyPair
    * @return {IdAssertion}              IdAssertion
    */

  }, {
    key: 'generateAssertion',
    value: function generateAssertion(contents, origin, usernameHint, keyPair, idpDomain) {
      var _this = this;

      console.log('generateAssertion');

      return new _promise2.default(function (resolve, reject) {

        _this.sendGenerateMessage(contents, origin, usernameHint, idpDomain).then(function (result) {

          if (result.loginUrl) {

            _this.openPopup(result.loginUrl).then(function (value) {
              resolve(value);
            }, function (err) {
              reject(err);
            });
          } else if (result) {

            _this.storeIdentity(result, keyPair).then(function (value) {
              resolve(value);
            }, function (err) {
              reject(err);
            });
          } else {
            reject('error on obtaining identity information');
          }
        });
      });
    }

    /**
    * OTHER USER'S IDENTITY
    */

    /**
    * Requests the IdpProxy from a given Domain to validate an IdentityAssertion
    * Returns a promise with the result from the validation.
    * @param  {DOMString} assertion
    * @param  {DOMString} origin       origin
    * @return {Promise}         Promise         promise with the result from the validation
    */

  }, {
    key: 'validateAssertion',
    value: function validateAssertion(assertion, origin, idpDomain) {
      var _this = this;

      var domain = _this._resolveDomain(idpDomain);

      var message = { type: 'execute', to: domain, from: _this._idmURL, body: { resource: 'identity', method: 'validateAssertion',
          params: { assertion: assertion, origin: origin } } };

      return new _promise2.default(function (resolve, reject) {
        _this._messageBus.postMessage(message, function (result) {
          if (result.body.code === 200) {
            resolve(result.body.value);
          } else {
            reject('error', result.body.code);
          }
        });
      });
    }
  }, {
    key: 'encryptMessage',
    value: function encryptMessage(message) {
      var _this = this;

      console.log('encrypt message ');

      return new _promise2.default(function (resolve, reject) {
        var isHandShakeType = message.type === 'handshake';

        //if is not to apply encryption, then returns resolve
        if (!_this.isToUseEncryption && !isHandShakeType) {
          console.log('encryption disabled');
          return resolve(message);
        }

        //TODO remove this logic and move it to a util function
        var splitedToURL = message.to.split('/');
        var dataObjectURL = splitedToURL[0] + '//' + splitedToURL[2] + '/' + splitedToURL[3];
        if (splitedToURL.length > 6) {
          dataObjectURL = splitedToURL[0] + '//' + splitedToURL[2] + '/' + splitedToURL[3] + '/' + splitedToURL[4];
        }

        var isToDataObject = (0, _utils.isDataObjectURL)(dataObjectURL);
        var isFromHyperty = (0, _utils.divideURL)(message.from).type === 'hyperty';
        var isToHyperty = (0, _utils.divideURL)(message.to).type === 'hyperty';

        if (message.type === 'update') {
          resolve(message);
        }

        if (isFromHyperty && isToHyperty) {
          var userURL = _this._registry.getHypertyOwner(message.from);
          if (userURL) {
            (function () {

              // check if exists any keys between two users
              var chatKeys = _this.chatKeys[message.from + '<->' + message.to];
              if (!chatKeys) {
                chatKeys = _this._newChatCrypto(message, userURL);
                console.log('createChatKey encrypt', message.from + message.to);
                _this.chatKeys[message.from + '<->' + message.to] = chatKeys;
                message.body.handshakePhase = 'startHandShake';
              }

              if (chatKeys.authenticated && !isHandShakeType) {
                (function () {

                  var iv = _this.crypto.generateIV();
                  _this.crypto.encryptAES(chatKeys.keys.hypertyFromSessionKey, message.body.value, iv).then(function (encryptedValue) {

                    var filteredMessage = _this._filterMessageToHash(message, message.body.value + iv, chatKeys.hypertyFrom.messageInfo);

                    _this.crypto.hashHMAC(chatKeys.keys.hypertyFromHashKey, filteredMessage).then(function (hash) {
                      //console.log('result of hash ', hash);
                      var value = { iv: _this.crypto.encode(iv), value: _this.crypto.encode(encryptedValue), hash: _this.crypto.encode(hash) };
                      message.body.value = (0, _stringify2.default)(value);

                      resolve(message);
                    });
                  });

                  // if is a handshake message, just resolve it
                })();
              } else if (isHandShakeType) {
                resolve(message);

                // else, starts a new handshake protocol
              } else {
                _this._doHandShakePhase(message, chatKeys).then(function (value) {
                  _this.chatKeys[message.from + '<->' + message.to] = value.chatKeys;

                  _this._messageBus.postMessage(value.message);
                  reject('encrypt handshake protocol phase ');
                });
              }
            })();
          }

          //if from hyperty to a dataObjectURL
        } else if (isFromHyperty && isToDataObject) {
          (function () {
            console.log('dataObject value to encrypt: ', message.body.value);

            var dataObjectKey = _this.dataObjectSessionKeys[dataObjectURL];

            //if no key exists, create a new one if is the reporter of dataObject
            if (!dataObjectKey) {
              var isHypertyReporter = _this.registry.getReporterURLSynchonous(dataObjectURL);

              // if the hyperty is the reporter of the dataObject then generates a session key
              if (isHypertyReporter && isHypertyReporter === message.from) {

                var sessionKey = _this.crypto.generateRandom();
                _this.dataObjectSessionKeys[dataObjectURL] = { sessionKey: sessionKey, isToEncrypt: true };

                dataObjectKey = _this.dataObjectSessionKeys[dataObjectURL];
              }
            }

            //check if there is already a session key for the chat room
            if (dataObjectKey) {

              // and if is to apply encryption, encrypt the messages
              if (dataObjectKey.isToEncrypt) {
                (function () {
                  var iv = _this.crypto.generateIV();

                  _this.crypto.encryptAES(dataObjectKey.sessionKey, _this.crypto.encode((0, _stringify2.default)(message.body.value)), iv).then(function (encryptedValue) {

                    var filteredMessage = _this._filterMessageToHash(message, message.body.value + iv, dataObjectKey.sessionKey);

                    _this.crypto.hashHMAC(dataObjectKey.sessionKey, filteredMessage).then(function (hash) {
                      //console.log('hash ', hash);

                      var newValue = { value: _this.crypto.encode(encryptedValue), iv: _this.crypto.encode(iv), hash: _this.crypto.encode(hash) };

                      message.body.value = (0, _stringify2.default)(newValue);
                      resolve(message);
                    });
                  });

                  // if not, just send the message
                })();
              } else {
                resolve(message);
              }

              // start the generation of a new session Key
            } else {
              reject('failed to decrypt message');
            }
          })();
        }
      });
    }
  }, {
    key: 'decryptMessage',
    value: function decryptMessage(message) {
      var _this = this;

      console.log('decrypt message ');

      return new _promise2.default(function (resolve, reject) {
        var isHandShakeType = message.type === 'handshake';

        //if is not to apply encryption, then returns resolve
        if (!_this.isToUseEncryption && !isHandShakeType) {
          console.log('decryption disabled');
          return resolve(message);
        }

        //TODO remove this logic and move it to a util function

        var splitedToURL = message.to.split('/');
        var dataObjectURL = splitedToURL[0] + '//' + splitedToURL[2] + '/' + splitedToURL[3];
        if (splitedToURL.length > 6) {
          dataObjectURL = splitedToURL[0] + '//' + splitedToURL[2] + '/' + splitedToURL[3] + '/' + splitedToURL[4];
        }

        var isToDataObject = (0, _utils.isDataObjectURL)(dataObjectURL);
        var isFromHyperty = (0, _utils.divideURL)(message.from).type === 'hyperty';
        var isToHyperty = (0, _utils.divideURL)(message.to).type === 'hyperty';

        if (message.type === 'update') {
          resolve(message);
        }

        //is is hyperty to hyperty communication
        if (isFromHyperty && isToHyperty) {
          //console.log('decrypt hyperty to hyperty');
          var userURL = _this._registry.getHypertyOwner(message.to);
          if (userURL) {
            (function () {

              var chatKeys = _this.chatKeys[message.to + '<->' + message.from];
              if (!chatKeys) {
                chatKeys = _this._newChatCrypto(message, userURL, 'decrypt');
                _this.chatKeys[message.to + '<->' + message.from] = chatKeys;
              }

              if (chatKeys.authenticated && !isHandShakeType) {
                (function () {
                  var value = JSON.parse(message.body.value);
                  var iv = _this.crypto.decode(value.iv);
                  var data = _this.crypto.decode(value.value);
                  var hash = _this.crypto.decode(value.hash);
                  _this.crypto.decryptAES(chatKeys.keys.hypertyToSessionKey, data, iv).then(function (decryptedData) {
                    console.log('decrypted value ', decryptedData);
                    message.body.value = decryptedData;

                    var filteredMessage = _this._filterMessageToHash(message, decryptedData + iv);

                    _this.crypto.verifyHMAC(chatKeys.keys.hypertyToHashKey, filteredMessage, hash).then(function (result) {
                      //console.log('result of hash verification! ', result);
                      message.body.assertedIdentity = true;
                      resolve(message);
                    });
                  });
                })();
              } else if (isHandShakeType) {
                _this._doHandShakePhase(message, chatKeys).then(function (value) {

                  //if it was started by doMutualAuthentication then ends the protocol
                  if (value === 'handShakeEnd') {
                    reject('decrypt handshake protocol phase ');

                    // if was started by a message, then resend that message
                  } else {
                    _this.chatKeys[message.to + '<->' + message.from] = value.chatKeys;
                    _this._messageBus.postMessage(value.message);
                    reject('decrypt handshake protocol phase ');
                  }
                });
              } else {
                reject('wrong message do decrypt');
              }
            })();
          } else {
            reject('error on decrypt message');
          }

          //if from hyperty to a dataObjectURL
        } else if (isFromHyperty && isToDataObject) {
          (function () {
            console.log('dataObject value to decrypt: ', message.body);

            var dataObjectKey = _this.dataObjectSessionKeys[dataObjectURL];

            if (dataObjectKey) {

              //check if is to apply encryption
              if (dataObjectKey.isToEncrypt) {
                (function () {
                  var parsedValue = JSON.parse(message.body.value);
                  var iv = _this.crypto.decode(parsedValue.iv);
                  var encryptedValue = _this.crypto.decode(parsedValue.value);
                  var hash = _this.crypto.decode(parsedValue.hash);

                  _this.crypto.decryptAES(dataObjectKey.sessionKey, encryptedValue, iv).then(function (decryptedValue) {
                    var parsedValue = JSON.parse(atob(decryptedValue));
                    console.log('decrypted Value,', parsedValue);
                    message.body.value = parsedValue;

                    var filteredMessage = _this._filterMessageToHash(message, parsedValue + iv);

                    _this.crypto.verifyHMAC(dataObjectKey.sessionKey, filteredMessage, hash).then(function (result) {
                      //console.log('result of hash verification! ', result);

                      message.body.assertedIdentity = true;
                      resolve(message);
                    });
                  });

                  //if not, just return the message
                })();
              } else {
                message.body.assertedIdentity = true;
                resolve(message);
              }
            } else {
              message.body.assertedIdentity = true;
              resolve(message);

              //reject('no sessionKey for chat room found');
            }
          })();
        } else {
          reject('wrong message to decrypt');
        }
      });
    }
  }, {
    key: 'doMutualAuthentication',
    value: function doMutualAuthentication(sender, receiver) {
      console.log('doMutualAuthentication: ', sender, receiver);
      var _this = this;
      var dataObjectURL = void 0;

      // check if the sender is a dataObject and if so stores that value
      var reporterURL = _this.registry.getReporterURLSynchonous(sender);
      if (reporterURL) {
        dataObjectURL = sender;
        sender = reporterURL;
      }

      var msg = {
        to: receiver,
        from: sender,
        callback: undefined,
        body: { handshakePhase: 'startHandShake', ignore: 'ignoreMessage' }
      };

      return new _promise2.default(function (resolve, reject) {

        if (!sender || !receiver) {
          return reject('sender or receiver missing on doMutualAuthentication');
        }

        var chatKeys = _this.chatKeys[sender + '<->' + receiver];
        var userURL = _this._registry.getHypertyOwner(sender);

        if (userURL) {

          if (!chatKeys) {
            // callback to resolve when finish the mutual authentication
            var resolved = function resolved(value) {
              console.log('callback value:', value);
              resolve(value);
            };
            msg.callback = resolved;
            msg.dataObjectURL = dataObjectURL;

            chatKeys = _this._newChatCrypto(msg, userURL);
            _this.chatKeys[sender + '<->' + receiver] = chatKeys;
          }

          if (chatKeys.authenticated) {

            var startSessionKeyExchange = {
              to: sender,
              from: receiver
            };
            chatKeys.dataObjectURL = dataObjectURL;
            _this._sendReporterSessionKey(startSessionKeyExchange, chatKeys).then(function (value) {

              _this._messageBus.postMessage(value.message);
              resolve('exchange of chat sessionKey initiated');
            });
          } else {

            _this._doHandShakePhase(msg, chatKeys);
          }
        } else {
          reject('error on doMutualAuthentication');
        }
      });
    }
  }, {
    key: '_doHandShakePhase',
    value: function _doHandShakePhase(message, chatKeys) {
      var _this = this;

      //console.log('handshakeType');

      return new _promise2.default(function (resolve, reject) {

        var handshakeType = message.body.handshakePhase;
        var iv = void 0;
        var hash = void 0;
        var value = {};
        var filteredMessage = void 0;

        (function () {
          switch (handshakeType) {

            case 'startHandShake':
              chatKeys.keys.fromRandom = _this.crypto.generateRandom();

              var startHandShakeMsg = {
                type: 'handshake',
                to: message.to,
                from: message.from,
                body: {
                  handshakePhase: 'senderHello',
                  value: _this.crypto.encode(chatKeys.keys.fromRandom)
                }
              };
              chatKeys.handshakeHistory.senderHello = _this._filterMessageToHash(startHandShakeMsg, undefined, chatKeys.hypertyFrom.messageInfo);

              // check if was the encrypt function or the mutual authentication that request the
              // start of the handShakePhase.
              if (chatKeys.initialMessage) {
                resolve({ message: startHandShakeMsg, chatKeys: chatKeys });
              } else {
                _this.chatKeys[message.from + '<->' + message.to] = chatKeys;
                _this._messageBus.postMessage(startHandShakeMsg);
              }

              break;
            case 'senderHello':

              console.log('senderHello');
              chatKeys.handshakeHistory.senderHello = _this._filterMessageToHash(message);
              chatKeys.keys.fromRandom = _this.crypto.decode(message.body.value);
              chatKeys.keys.toRandom = _this.crypto.generateRandom();

              var senderHelloMsg = {
                type: 'handshake',
                to: message.from,
                from: message.to,
                body: {
                  handshakePhase: 'receiverHello',
                  value: _this.crypto.encode(chatKeys.keys.toRandom)
                }
              };
              chatKeys.handshakeHistory.receiverHello = _this._filterMessageToHash(senderHelloMsg, undefined, chatKeys.hypertyFrom.messageInfo);
              resolve({ message: senderHelloMsg, chatKeys: chatKeys });

              break;
            case 'receiverHello':

              console.log('receiverHello');
              chatKeys.handshakeHistory.receiverHello = _this._filterMessageToHash(message);

              _this.validateAssertion(message.body.identity.assertion, undefined, message.body.identity.idp).then(function (value) {

                var receiverPublicKey = _this.crypto.decode(value.contents.nonce);
                var premasterSecret = _this.crypto.generatePMS();
                var toRandom = message.body.value;
                chatKeys.hypertyTo.assertion = message.body.identity.assertion;
                chatKeys.hypertyTo.publicKey = receiverPublicKey;
                chatKeys.hypertyTo.userID = value.contents.email;
                chatKeys.keys.toRandom = _this.crypto.decode(toRandom);
                chatKeys.keys.premasterKey = premasterSecret;

                var concatKey = _this.crypto.concatPMSwithRandoms(premasterSecret, chatKeys.keys.toRandom, chatKeys.keys.fromRandom);

                return _this.crypto.generateMasterSecret(concatKey, 'messageHistoric' + chatKeys.keys.toRandom + chatKeys.keys.fromRandom);

                //generate the master key
              }).then(function (masterKey) {
                chatKeys.keys.masterKey = masterKey;

                return _this.crypto.generateKeys(masterKey, 'key expansion' + chatKeys.keys.toRandom + chatKeys.keys.fromRandom);

                //generate the symmetric and hash keys
              }).then(function (keys) {

                chatKeys.keys.hypertyToSessionKey = new Uint8Array(keys[0]);
                chatKeys.keys.hypertyFromSessionKey = new Uint8Array(keys[1]);
                chatKeys.keys.hypertyToHashKey = new Uint8Array(keys[2]);
                chatKeys.keys.hypertyFromHashKey = new Uint8Array(keys[3]);
                iv = _this.crypto.generateIV();
                value.iv = _this.crypto.encode(iv);

                var messageStructure = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'senderCertificate'
                  }
                };

                // hash the value and the iv
                filteredMessage = _this._filterMessageToHash(messageStructure, 'ok' + iv, chatKeys.hypertyFrom.messageInfo);
                return _this.crypto.hashHMAC(chatKeys.keys.hypertyFromHashKey, filteredMessage);
              }).then(function (hash) {
                value.hash = _this.crypto.encode(hash);

                //encrypt the data
                return _this.crypto.encryptAES(chatKeys.keys.hypertyFromSessionKey, 'ok', iv);
              }).then(function (encryptedData) {
                value.symetricEncryption = _this.crypto.encode(encryptedData);

                return _this.crypto.encryptRSA(chatKeys.hypertyTo.publicKey, chatKeys.keys.premasterKey);
              }).then(function (encryptedValue) {

                value.assymetricEncryption = _this.crypto.encode(encryptedValue);

                var messageStructure = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'senderCertificate'
                  }
                };

                var messageToHash = _this._filterMessageToHash(messageStructure, chatKeys.keys.premasterKey, chatKeys.hypertyFrom.messageInfo);

                return _this.crypto.signRSA(chatKeys.hypertyFrom.privateKey, (0, _stringify2.default)(chatKeys.handshakeHistory) + (0, _stringify2.default)(messageToHash));
              }).then(function (signature) {

                value.signature = _this.crypto.encode(signature);

                var receiverHelloMsg = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'senderCertificate',
                    value: btoa((0, _stringify2.default)(value))
                  }
                };
                chatKeys.handshakeHistory.senderCertificate = _this._filterMessageToHash(receiverHelloMsg, 'ok' + iv, chatKeys.hypertyFrom.messageInfo);

                resolve({ message: receiverHelloMsg, chatKeys: chatKeys });
              }, function (error) {
                return reject(error);
              });

              break;
            case 'senderCertificate':

              console.log('senderCertificate');
              var receivedValue = JSON.parse(atob(message.body.value));

              _this.validateAssertion(message.body.identity.assertion, undefined, message.body.identity.idp).then(function (value) {
                var encryptedPMS = _this.crypto.decode(receivedValue.assymetricEncryption);
                var senderPublicKey = _this.crypto.decode(value.contents.nonce);
                chatKeys.hypertyTo.assertion = message.body.identity.assertion;
                chatKeys.hypertyTo.publicKey = senderPublicKey;
                chatKeys.hypertyTo.userID = value.contents.email;

                return _this.crypto.decryptRSA(chatKeys.hypertyFrom.privateKey, encryptedPMS);
              }, function (error) {
                console.log(error);
                reject('Error during authentication of identity');

                //obtain the PremasterKey using the private key
              }).then(function (pms) {

                chatKeys.keys.premasterKey = new Uint8Array(pms);

                var signature = _this.crypto.decode(receivedValue.signature);

                var receivedmsgToHash = _this._filterMessageToHash(message, chatKeys.keys.premasterKey);

                return _this.crypto.verifyRSA(chatKeys.hypertyTo.publicKey, (0, _stringify2.default)(chatKeys.handshakeHistory) + (0, _stringify2.default)(receivedmsgToHash), signature);

                // validates the signature received
              }).then(function (signValidationResult) {

                console.log('signature validation result ', signValidationResult);
                var concatKey = _this.crypto.concatPMSwithRandoms(chatKeys.keys.premasterKey, chatKeys.keys.toRandom, chatKeys.keys.fromRandom);

                return _this.crypto.generateMasterSecret(concatKey, 'messageHistoric' + chatKeys.keys.toRandom + chatKeys.keys.fromRandom);

                // generates the master keys from the Premaster key and the randoms
              }).then(function (masterKey) {
                chatKeys.keys.masterKey = masterKey;

                return _this.crypto.generateKeys(masterKey, 'key expansion' + chatKeys.keys.toRandom + chatKeys.keys.fromRandom);

                // generates the symmetric keys to be used in the symmetric encryption
              }).then(function (keys) {
                chatKeys.keys.hypertyFromSessionKey = new Uint8Array(keys[0]);
                chatKeys.keys.hypertyToSessionKey = new Uint8Array(keys[1]);
                chatKeys.keys.hypertyFromHashKey = new Uint8Array(keys[2]);
                chatKeys.keys.hypertyToHashKey = new Uint8Array(keys[3]);
                iv = _this.crypto.decode(receivedValue.iv);
                var data = _this.crypto.decode(receivedValue.symetricEncryption);

                return _this.crypto.decryptAES(chatKeys.keys.hypertyToSessionKey, data, iv);
              }).then(function (decryptedData) {
                //console.log('decryptedData', decryptedData);

                chatKeys.handshakeHistory.senderCertificate = _this._filterMessageToHash(message, decryptedData + iv);

                var hashReceived = _this.crypto.decode(receivedValue.hash);

                filteredMessage = _this._filterMessageToHash(message, decryptedData + iv);

                return _this.crypto.verifyHMAC(chatKeys.keys.hypertyToHashKey, filteredMessage, hashReceived);
              }).then(function (verifiedHash) {

                //console.log('result of hash verification ', verifiedHash);
                var receiverFinishedMessage = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'receiverFinishedMessage'
                  }
                };
                iv = _this.crypto.generateIV();
                value.iv = _this.crypto.encode(iv);

                filteredMessage = _this._filterMessageToHash(receiverFinishedMessage, 'ok!' + iv, chatKeys.hypertyFrom.messageInfo);

                return _this.crypto.hashHMAC(chatKeys.keys.hypertyFromHashKey, receiverFinishedMessage);
              }).then(function (hash) {

                value.hash = _this.crypto.encode(hash);
                return _this.crypto.encryptAES(chatKeys.keys.hypertyFromSessionKey, 'ok!', iv);
              }).then(function (encryptedValue) {
                value.value = _this.crypto.encode(encryptedValue);
                var receiverFinishedMessage = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'receiverFinishedMessage',
                    value: btoa((0, _stringify2.default)(value))
                  }
                };

                chatKeys.handshakeHistory.receiverFinishedMessage = _this._filterMessageToHash(receiverFinishedMessage, 'ok!' + iv, chatKeys.hypertyFrom.messageInfo);
                chatKeys.authenticated = true;
                resolve({ message: receiverFinishedMessage, chatKeys: chatKeys });
              });

              break;
            case 'receiverFinishedMessage':

              console.log('receiverFinishedMessage');
              chatKeys.authenticated = true;

              value = JSON.parse(atob(message.body.value));

              iv = _this.crypto.decode(value.iv);
              var data = _this.crypto.decode(value.value);
              hash = _this.crypto.decode(value.hash);

              _this.crypto.decryptAES(chatKeys.keys.hypertyToSessionKey, data, iv).then(function (decryptedData) {
                console.log('decryptedData', decryptedData);
                chatKeys.handshakeHistory.receiverFinishedMessage = _this._filterMessageToHash(message, decryptedData + iv);

                var filteredMessage = _this._filterMessageToHash(message, data + iv);
                _this.crypto.verifyHMAC(chatKeys.keys.hypertyToHashKey, filteredMessage, hash).then(function (result) {
                  console.log('hash result', result);

                  // check if there was an initial message that was blocked and send it
                  if (chatKeys.initialMessage) {
                    var initialMessage = {
                      type: 'create',
                      to: message.from,
                      from: message.to,
                      body: {
                        value: chatKeys.initialMessage.body.value
                      }
                    };

                    resolve({ message: initialMessage, chatKeys: chatKeys });

                    //sends the sessionKey to the subscriber hyperty
                  } else {
                    _this._sendReporterSessionKey(message, chatKeys).then(function (value) {
                      resolve(value);
                    });
                  }
                });
              });

              break;
            case 'reporterSessionKey':

              console.log('reporterSessionKey');

              var valueIVandHash = JSON.parse(atob(message.body.value));
              hash = _this.crypto.decode(valueIVandHash.hash);
              iv = _this.crypto.decode(valueIVandHash.iv);
              var encryptedValue = _this.crypto.decode(valueIVandHash.value);
              var parsedValue = void 0;
              var sessionKey = void 0;
              var dataObjectURL = void 0;
              var receiverAcknowledgeMsg = void 0;

              _this.crypto.decryptAES(chatKeys.keys.hypertyToSessionKey, encryptedValue, iv).then(function (decryptedValue) {

                parsedValue = JSON.parse(decryptedValue);
                sessionKey = _this.crypto.decode(parsedValue.value);
                dataObjectURL = parsedValue.dataObjectURL;

                var messageToHash = _this._filterMessageToHash(message, decryptedValue + iv);

                return _this.crypto.verifyHMAC(chatKeys.keys.hypertyToHashKey, messageToHash, hash);
              }).then(function (hashResult) {

                //console.log('hash successfully validated ', hashResult);

                _this.dataObjectSessionKeys[dataObjectURL] = { sessionKey: sessionKey, isToEncrypt: true };

                iv = _this.crypto.generateIV();
                value.iv = _this.crypto.encode(iv);

                return _this.crypto.encryptAES(chatKeys.keys.hypertyFromSessionKey, 'ok!!', iv);
              }).then(function (encryptedValue) {

                receiverAcknowledgeMsg = {
                  type: 'handshake',
                  to: message.from,
                  from: message.to,
                  body: {
                    handshakePhase: 'receiverAcknowledge'
                  }
                };

                value.value = _this.crypto.encode(encryptedValue);
                var messageToHash = _this._filterMessageToHash(receiverAcknowledgeMsg, 'ok!!' + iv, chatKeys.hypertyFrom.messageInfo);

                return _this.crypto.hashHMAC(chatKeys.keys.hypertyFromHashKey, messageToHash);
              }).then(function (hashedMessage) {
                var finalValue = btoa((0, _stringify2.default)({ value: value.value, hash: _this.crypto.encode(hashedMessage), iv: value.iv }));

                receiverAcknowledgeMsg.body.value = finalValue;
                resolve({ message: receiverAcknowledgeMsg, chatKeys: chatKeys });
              });

              break;
            case 'receiverAcknowledge':

              console.log('receiverAcknowledge');

              var receivedvalueIVandHash = JSON.parse(atob(message.body.value));
              var receivedHash = _this.crypto.decode(receivedvalueIVandHash.hash);
              iv = _this.crypto.decode(receivedvalueIVandHash.iv);
              var receivedEncryptedValue = _this.crypto.decode(receivedvalueIVandHash.value);

              _this.crypto.decryptAES(chatKeys.keys.hypertyToSessionKey, receivedEncryptedValue, iv).then(function (decryptedValue) {

                var filteredMessage = _this._filterMessageToHash(message, decryptedValue + iv);
                return _this.crypto.verifyHMAC(chatKeys.keys.hypertyToHashKey, filteredMessage, receivedHash);
              }).then(function (hashResult) {
                //console.log('hashResult ', hashResult);

                var callback = chatKeys.callback;

                if (callback) {
                  callback('handShakeEnd');
                }
                resolve('handShakeEnd');
              });

              break;
            default:
              reject(message);
          }
        })();
      });
    }
  }, {
    key: '_sendReporterSessionKey',
    value: function _sendReporterSessionKey(message, chatKeys) {
      var _this = this;
      var sessionKeyBundle = _this.dataObjectSessionKeys[chatKeys.dataObjectURL];
      var reporterSessionKeyMsg = void 0;
      var valueToEncrypt = void 0;
      var sessionKey = void 0;
      var iv = void 0;
      var value = {};

      return new _promise2.default(function (resolve, reject) {

        //if there is not yet a session Key, generates a new one
        if (!sessionKeyBundle) {
          sessionKey = _this.crypto.generateRandom();
          _this.dataObjectSessionKeys[chatKeys.dataObjectURL] = { sessionKey: sessionKey, isToEncrypt: true };
        } else {
          sessionKey = sessionKeyBundle.sessionKey;
        }

        valueToEncrypt = (0, _stringify2.default)({ value: _this.crypto.encode(sessionKey), dataObjectURL: chatKeys.dataObjectURL });

        iv = _this.crypto.generateIV();
        value.iv = _this.crypto.encode(iv);
        _this.crypto.encryptAES(chatKeys.keys.hypertyFromSessionKey, valueToEncrypt, iv).then(function (encryptedValue) {

          reporterSessionKeyMsg = {
            type: 'handshake',
            to: message.from,
            from: message.to,
            body: {
              handshakePhase: 'reporterSessionKey',
              value: _this.crypto.encode(encryptedValue)
            }
          };

          var filteredMessage = _this._filterMessageToHash(reporterSessionKeyMsg, valueToEncrypt + iv, chatKeys.hypertyFrom.messageInfo);

          return _this.crypto.hashHMAC(chatKeys.keys.hypertyFromHashKey, filteredMessage);
        }).then(function (hashedMessage) {

          var valueWithHash = btoa((0, _stringify2.default)({ value: reporterSessionKeyMsg.body.value, hash: _this.crypto.encode(hashedMessage), iv: value.iv }));

          reporterSessionKeyMsg.body.value = valueWithHash;
          resolve({ message: reporterSessionKeyMsg, chatKeys: chatKeys });
        });
      });
    }

    /**
    * returns the reporter associated to the dataObject URL
    * @param   {String}   dataObjectURL         dataObject url
    * @return   {String}  reporter              dataObject url reporter
    */

  }, {
    key: '_getHypertyFromDataObject',
    value: function _getHypertyFromDataObject(dataObjectURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //TODO remove this logic and move it to a util function

        var splitedURL = dataObjectURL.split('/');
        var finalURL = splitedURL[0] + '//' + splitedURL[2] + '/' + splitedURL[3];
        if (splitedURL.length > 6) {
          finalURL = splitedURL[0] + '//' + splitedURL[2] + '/' + splitedURL[3] + '/' + splitedURL[4];
        }

        // check if is the creator of the hyperty
        var reporterURL = _this.registry.getReporterURLSynchonous(finalURL);

        if (reporterURL) {
          resolve(reporterURL);
        } else {
          // check if there is already an association from an hypertyURL to the dataObject
          var storedReporterURL = _this.dataObjectsIdentity[finalURL];

          if (storedReporterURL) {
            resolve(storedReporterURL);
          } else {
            // check if there is any hyperty that subscribed the dataObjectURL
            var subscriberHyperty = _this.registry.getDataObjectSubscriberHyperty(dataObjectURL);

            if (subscriberHyperty) {
              resolve(subscriberHyperty);
            } else {

              // search in domain registry for the hyperty associated to the dataObject
              // search in case is a subscriber who wants to know the reporter
              _this.registry.discoverDataObjectPerURL(finalURL, splitedURL[2]).then(function (dataObject) {
                _this.dataObjectsIdentity[finalURL] = dataObject.reporter;
                resolve(dataObject.reporter);
              }, function (err) {
                reject(err);
              });
            }
          }
        }
      });
    }

    /**
    * filter the messages to hash, by removing some fields not generated by the runtime core
    * @param {Message}  message                     message
    * @param {String}  decryptedValue (Optional)    value from body.value in case it originally comes encrypted
    * @param {JSON}  identity(Optional)    add the hyperty identity associated in case is not added to the initial message
    * @return {Message}  new message filtered
    */

  }, {
    key: '_filterMessageToHash',
    value: function _filterMessageToHash(message, decryptedValue, identity) {

      return {
        type: message.type,
        from: message.from,
        to: message.to,
        body: {
          identity: identity || message.body.identity,
          value: decryptedValue || message.body.value,
          handshakePhase: message.body.handshakePhase
        }
      };
    }

    /**
    * generates the initial structure for the keys between two users
    * @param {JSON}    message              initial message that triggers the mutual authentication
    * @param {String}  userURL              userURL
    * @param {boolean} receiver(Optional)  indicates if is the sender or the receiver that creates a new chat crypto
    * @return {JSON} newChatCrypto  new JSON structure for the chat crypto
    */

  }, {
    key: '_newChatCrypto',
    value: function _newChatCrypto(message, userURL, receiver) {
      var _this = this;

      //check whether is the sender or the receiver to create a new chatCrypto
      //to mantain consistency on the keys if the receiver create a new chatCrypto,
      //then invert the fields
      var from = receiver ? message.to : message.from;
      var to = receiver ? message.from : message.to;

      var userInfo = _this.getIdentity(userURL);

      var newChatCrypto = {
        hypertyFrom: {
          hyperty: from,
          userID: userInfo.messageInfo.userProfile.username,
          privateKey: userInfo.keyPair.private,
          publicKey: userInfo.keyPair.public,
          assertion: userInfo.assertion,
          messageInfo: userInfo.messageInfo
        },
        hypertyTo: {
          hyperty: to,
          userID: undefined,
          publicKey: undefined,
          assertion: undefined
        },
        keys: {
          hypertyToSessionKey: undefined,
          hypertyFromSessionKey: undefined,
          hypertyToHashKey: undefined,
          hypertyFromHashKey: undefined,
          toRandom: undefined,
          fromRandom: undefined,
          premasterKey: undefined,
          masterKey: undefined
        },
        handshakeHistory: {
          senderHello: undefined,
          receiverHello: undefined,
          senderCertificate: undefined,
          receiverFinishedMessage: undefined
        },
        initialMessage: message.body.ignore ? undefined : message,
        callback: message.callback,
        authenticated: false,
        dataObjectURL: message.dataObjectURL
      };

      return newChatCrypto;
    }
  }, {
    key: 'messageBus',
    get: function get() {
      var _this = this;
      return _this._messageBus;
    }

    /**
    * Set the messageBus in this Registry
    * @param {MessageBus}           messageBus
    */
    ,
    set: function set(messageBus) {
      var _this = this;
      _this._messageBus = messageBus;
    }

    /**
    * return the registry in this idModule
    * @param {registry}           registry
    */

  }, {
    key: 'registry',
    get: function get() {
      var _this = this;
      return _this._registry;
    }

    /**
    * Set the registry in this idModule
    * @param {registry}     reg
    */
    ,
    set: function set(registry) {
      var _this = this;
      _this._registry = registry;
    }
  }]);
  return IdentityModule;
}();

exports.default = IdentityModule;
module.exports = exports['default'];

},{"../utils/utils.js":452,"./Crypto":420,"./GuiFake":421,"./Identity":422,"babel-runtime/core-js/json/stringify":297,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],424:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionsService = function () {
  function ActionsService(context) {
    (0, _classCallCheck3.default)(this, ActionsService);

    this.context = context;
  }

  (0, _createClass3.default)(ActionsService, [{
    key: 'enforcePolicies',
    value: function enforcePolicies(message, isIncomingMessage) {
      var _this = this;
      return new _promise2.default(function (resolve, reject) {

        var policies = _this.context.getPolicies(message, isIncomingMessage);

        if (policies !== undefined) {
          if (policies.serviceProviderPolicy !== undefined) {
            policies.serviceProviderPolicy.enforceActions(_this.context, message).then(function (messages) {
              resolve(messages);
            }, function (error) {
              reject(error);
            });
          } else {
            if (policies.userPolicy !== undefined) {
              policies.userPolicy.enforceActions(_this.context, message).then(function (messages) {
                resolve(messages);
              }, function (error) {
                reject(error);
              });
            } else {
              resolve([message]);
            }
          }
        } else {
          resolve([message]);
        }
      });
    }
  }, {
    key: 'forwardToID',
    value: function forwardToID(message, email) {
      var _this = this;
      if (!_this.context.runtimeRegistry) throw new Error('forward message to given ID is unsupported in this environment');

      return new _promise2.default(function (resolve, reject) {
        if (_this.context.runtimeRegistry.hypertiesList[0].hypertyURL === message.to) {
          var splitTo = message.to.split('://');
          if (splitTo[0] !== 'runtime') {
            _this.context.runtimeRegistry.discoverHypertyPerUser(email).then(function (result) {
              message.to = result.hypertyURL;
              message.body.via = undefined;
              resolve(message);
              _this.context.runtimeRegistry._messageBus.postMessage(message);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(message);
          }
        } else {
          resolve(message);
        }
      });
    }
  }, {
    key: 'forwardToHyperty',
    value: function forwardToHyperty(message, hypertyURL) {
      var _this = this;
      if (!_this.context.runtimeRegistry) throw new Error('forward message to given ID is unsupported in this environment');

      return new _promise2.default(function (resolve) {
        if (_this.context.runtimeRegistry.hypertiesList[0].hypertyURL === message.to) {
          var splitTo = message.to.split('://');
          if (splitTo[0] !== 'runtime') {
            message.to = hypertyURL;
            message.body.via = undefined;
            resolve(message);
            _this.context.runtimeRegistry._messageBus.postMessage(message);
          } else {
            resolve(message);
          }
        } else {
          resolve(message);
        }
      });
    }
  }, {
    key: 'sendAutomaticMessage',
    value: function sendAutomaticMessage(message, text) {
      var _this = this;
      return new _promise2.default(function (resolve) {
        var automaticMessage = {
          from: message.to,
          to: message.from,
          body: {
            value: text
          },
          type: message.type
        };
        resolve(message);
        _this.context.runtimeRegistry._messageBus.postMessage(automaticMessage);
      });
    }
  }]);
  return ActionsService;
}();

exports.default = ActionsService;
module.exports = exports['default'];

},{"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],425:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Operators = function () {
  function Operators() {
    (0, _classCallCheck3.default)(this, Operators);
  }

  (0, _createClass3.default)(Operators, [{
    key: 'and',
    value: function and(params) {
      return params[0] && params[1];
    }
  }, {
    key: 'between',
    value: function between(params) {
      var start = parseInt(params[0][0]);
      var end = parseInt(params[0][1]);
      var now = params[1];

      if (end < start) {
        now = now < start ? now += 2400 : now;
        end += 2400;
      }

      return now > start && now < end;
    }
  }, {
    key: 'equals',
    value: function equals(params) {
      return String(params[0]) === '*' || String(params[0]) === String(params[1]);
    }
  }, {
    key: 'greaterThan',
    value: function greaterThan(params) {
      return params[1] > params[0];
    }
  }, {
    key: 'in',
    value: function _in(params) {
      return params[0].indexOf(params[1]) > -1;
    }
  }, {
    key: 'lessThan',
    value: function lessThan(params) {
      return params[1] < params[0];
    }
  }, {
    key: 'not',
    value: function not(params) {
      return !params[0];
    }
  }, {
    key: 'or',
    value: function or(params) {
      return params[0] || params[1];
    }
  }]);
  return Operators;
}();

exports.default = Operators;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],426:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Operators = require('./Operators');

var _Operators2 = _interopRequireDefault(_Operators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* The Policy Decision Point (PDP) decides if a message is to be authorised by checking a set of
* policies. The resource to be verified is specified in the first word of the 'condition' field of
* a Policy object. The implementation that verifies if the message is compliant with a policy is
* specified in a hashtable to allow dynamic definition of the implementation, providing
* extensibility to the Policy Engine functionalities.
*/
var PDP = function () {
  function PDP(context) {
    (0, _classCallCheck3.default)(this, PDP);

    this.context = context;
    this.operators = new _Operators2.default();
  }

  (0, _createClass3.default)(PDP, [{
    key: 'evaluatePolicies',
    value: function evaluatePolicies(message, isIncomingMessage) {
      var policies = this.context.getPolicies(message, isIncomingMessage);
      var result = 'Not Applicable';

      if (policies !== undefined) {
        result = this.evaluatePolicy(message, policies.serviceProviderPolicy, isIncomingMessage);
        if (result || result === 'Not Applicable') {
          var userResult = this.evaluatePolicy(message, policies.userPolicy, isIncomingMessage);
          if (userResult !== 'Not Applicable') {
            result = userResult;
          }
        }
      }

      return result;
    }
  }, {
    key: 'evaluatePolicy',
    value: function evaluatePolicy(message, policy, isIncoming) {
      var result = 'Not Applicable';
      if (policy) {
        result = policy.evaluateRules(this.context, message, isIncoming);
      }

      return result;
    }
  }]);
  return PDP;
}();

exports.default = PDP;
module.exports = exports['default'];

},{"./Operators":425,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],427:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ActionsService = require('./ActionsService');

var _ActionsService2 = _interopRequireDefault(_ActionsService);

var _PDP = require('./PDP');

var _PDP2 = _interopRequireDefault(_PDP);

var _Policy = require('./Policy');

var _Policy2 = _interopRequireDefault(_Policy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PEP = function () {

  /**
  * Creates a Policy Enforcement Point (PEP) instance
  * @param    {Object}    context
  */
  function PEP(context) {
    (0, _classCallCheck3.default)(this, PEP);

    this.pdp = new _PDP2.default(context);
    this.actionsService = new _ActionsService2.default(context);
    this.context = context;
    context.pep = this;
    context.loadConfigurations();
  }

  /**
  * Adds a policy to the Policy Enforcement Point (PEP). The policy can be created by the service
  * provider or by the user.
  * @param    {String}    source
  * @param    {String}    key
  * @param    {Object}    policy
  */


  (0, _createClass3.default)(PEP, [{
    key: 'addPolicy',
    value: function addPolicy(source, key, policy, combiningAlgorithm) {
      if (!source) throw new Error('source is not defined');
      if (!key) throw new Error('key is not defined');

      if (policy === undefined) {
        policy = new _Policy2.default(key, [], [], combiningAlgorithm);
      } else {
        if (!(policy instanceof _Policy2.default)) {
          policy = new _Policy2.default(policy.key, policy.rules, policy.actions, policy.combiningAlgorithm);
        }
      }

      switch (source) {
        case 'SERVICE_PROVIDER':
          this.context.savePolicies(source, policy, key);
          break;
        case 'USER':
          this.context.userPolicies[key] = policy;
          this.context.savePolicies(source);
          break;
        default:
          throw Error('Unknown policy source: ' + source);
      }
    }
  }, {
    key: 'authorise',
    value: function authorise(message) {
      var _this2 = this;

      console.log('--- Policy Engine ---');
      console.log(message);
      if (!message) throw new Error('message is not defined');
      if (!message.from) throw new Error('message.from is not defined');
      if (!message.to) throw new Error('message.to is not defined');
      if (!message.type) throw new Error('message.type is not defined');
      message.body = message.body || {};

      return new _promise2.default(function (resolve, reject) {

        message.body = message.body || {};
        var _this = _this2;
        var result = void 0;
        if (_this._isToVerify(message)) {
          (function () {
            var isIncoming = _this._isIncomingMessage(message);
            _this.context.prepareForEvaluation(message, isIncoming).then(function (message) {
              result = _this.pdp.evaluatePolicies(message, isIncoming);
              if (result === 'Not Applicable') {
                result = _this.context.defaultBehaviour;
                message.body.auth = false;
              }
              _this.actionsService.enforcePolicies(message, isIncoming).then(function (messages) {
                for (var i in messages) {
                  message = messages[i];
                  _this.context.prepareToForward(message, isIncoming, result).then(function (message) {
                    if (result) {
                      message.body.auth = message.body.auth === undefined ? true : message.body.auth;
                      resolve(message);
                    } else {
                      var errorMessage = { body: { code: 403, description: 'Blocked by policy' }, from: message.to, to: message.from, type: 'response' };
                      reject(errorMessage);
                    }
                  }, function (error) {
                    reject(error);
                  });
                }
              }, function (error) {
                reject(error);
              });
            }, function (error) {
              reject(error);
            });
          })();
        } else {
          result = _this.context.defaultBehaviour;
          if (result) {
            message.body.auth = false;
            resolve(message);
          } else {
            var errorMessage = { body: { code: 403, description: 'Blocked by policy' }, from: message.to, to: message.from, type: 'response' };
            reject(errorMessage);
          }
        }
      });
    }
  }, {
    key: 'authoriseSync',
    value: function authoriseSync(message) {
      var result = void 0;
      message.body = message.body || {};
      if (this._isToVerify(message)) {
        var isIncoming = this._isIncomingMessage(message);
        message = this.context.prepareForEvaluation(message, isIncoming);
        result = this.pdp.evaluatePolicies(message, isIncoming);
        if (result === 'Not Applicable') {
          result = this.context.defaultBehaviour;
          message.body.auth = false;
        }
        this.actionsService.enforcePolicies(message, isIncoming);
        message = this.context.prepareToForward(message, isIncoming, result);
        if (result) {
          message.body.auth = message.body.auth === undefined ? true : message.body.auth;
          return true;
        } else {
          return false;
        }
      } else {
        result = this.context.defaultBehaviour;
        if (result) {
          message.body.auth = false;
          return true;
        } else {
          return false;
        }
      }
    }
  }, {
    key: '_isIncomingMessage',
    value: function _isIncomingMessage(message) {
      return message.body !== undefined && message.body.identity !== undefined ? true : false;
    }

    /**
    * Identifies the messages to be verified by the Policy Engine
    * @param    {Message}   message
    * @returns  {boolean}   returns true if the message requires encryption/decryption
    *                       or if its type equals 'handshake'; false otherwise
    */

  }, {
    key: '_isToVerify',
    value: function _isToVerify(message) {
      var schemasToIgnore = ['domain', 'domain-idp', 'global', 'hyperty-runtime', 'runtime'];
      var splitFrom = message.from.split('://');
      var fromSchema = splitFrom[0];
      var splitTo = message.to.split('://');
      var toSchema = splitTo[0];

      if (message.from === fromSchema || message.to === toSchema || message.type === 'read' || message.type === 'response') {
        return false;
      } else {
        return schemasToIgnore.indexOf(fromSchema) === -1 || schemasToIgnore.indexOf(toSchema) === -1;
      }
    }
  }, {
    key: 'removePolicy',
    value: function removePolicy(source, key) {
      if (!source) throw new Error('source is not defined');
      if (source !== '*' && !key) throw new Error('key is not defined');

      switch (source) {
        case '*':
          this.context.serviceProviderPolicy = {};
          this.context.userPolicies = {};
          this.context.activeUserPolicy = undefined;
          this.context.savePolicies('USER');
          this.context.savePolicies('SERVICE_PROVIDER');
          this.context.saveActivePolicy();
          break;
        case 'SERVICE_PROVIDER':
          delete this.context.serviceProviderPolicy[key];
          this.context.savePolicies();
          break;
        case 'USER':
          delete this.context.userPolicies[key];
          if (key === this.context.activeUserPolicy) {
            this.context.activeUserPolicy = undefined;
            this.context.saveActivePolicy();
          }
          this.context.savePolicies('USER');
          break;
        default:
          throw Error('Unknown policy source: ' + source);
      }
    }
  }]);
  return PEP;
}();

exports.default = PEP;
module.exports = exports['default'];

},{"./ActionsService":424,"./PDP":426,"./Policy":428,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],428:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AllowOverrides = require('./combiningAlgorithms/AllowOverrides');

var _AllowOverrides2 = _interopRequireDefault(_AllowOverrides);

var _BlockOverrides = require('./combiningAlgorithms/BlockOverrides');

var _BlockOverrides2 = _interopRequireDefault(_BlockOverrides);

var _FirstApplicable = require('./combiningAlgorithms/FirstApplicable');

var _FirstApplicable2 = _interopRequireDefault(_FirstApplicable);

var _Rule = require('./Rule');

var _Rule2 = _interopRequireDefault(_Rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Policy = function () {
  function Policy(key, rules, actions, combiningAlgorithm) {
    (0, _classCallCheck3.default)(this, Policy);

    if (!key) throw new Error('key is not defined');
    if (!actions) throw new Error('actions are not defined');

    this.actions = actions;
    this.key = key;
    this._setRules(rules);
    this._setCombiningAlgorithm(combiningAlgorithm);
  }

  (0, _createClass3.default)(Policy, [{
    key: 'addAction',
    value: function addAction(method, param) {
      this.actions.push({ method: method, param: param });
    }
  }, {
    key: 'createRule',
    value: function createRule(decision, condition, scope, target, priority) {
      if (priority === undefined) {
        priority = this.getLastPriority() + 1;
      }
      var rule = new _Rule2.default(decision, condition, scope, target, priority);
      this.rules.push(rule);
    }
  }, {
    key: 'deleteRule',
    value: function deleteRule(rule) {
      var indexToRemove = this.rules.indexOf(rule);
      this.rules.splice(indexToRemove, 1);
    }
  }, {
    key: 'enforceActions',
    value: function enforceActions(context, message) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var results = [];
        if (_this.actions.length !== 0) {
          for (var i in _this.actions) {
            var result = context.pep.actionsService[_this.actions[i].method](message, _this.actions[i].param);
            results.push(result);
          }
          _promise2.default.all(results).then(function (messages) {
            resolve(messages);
          }, function (error) {
            reject(error);
          });
        } else {
          resolve([message]);
        }
      });
    }
  }, {
    key: 'evaluateRules',
    value: function evaluateRules(context, message, isIncoming) {
      var results = [];
      for (var i in this.rules) {
        results.push(this.rules[i].evaluate(context, message, isIncoming));
      }

      return this.combiningAlgorithm.combine(results);
    }
  }, {
    key: 'getLastPriority',
    value: function getLastPriority() {
      var priorities = [];

      if (this.rules.length !== 0) {
        for (var i in this.rules) {
          priorities.push(this.rules[i].priority);
        }
        return Math.max.apply(Math, priorities);
      } else {
        return -1;
      }
    }
  }, {
    key: 'getRuleByPriority',
    value: function getRuleByPriority(priority) {
      for (var i in this.rules) {
        if (String(this.rules[i].priority) === String(priority)) {
          return this.rules[i];
        }
      }
      throw Error('Rule with priority ' + priority + ' does not exist!');
    }
  }, {
    key: '_setCombiningAlgorithm',
    value: function _setCombiningAlgorithm(combiningAlgorithm) {
      if (!combiningAlgorithm) {
        combiningAlgorithm = 'blockOverrides';
      }
      switch (combiningAlgorithm) {
        case 'blockOverrides':
          this.combiningAlgorithm = new _BlockOverrides2.default();
          break;
        case 'allowOverrides':
          this.combiningAlgorithm = new _AllowOverrides2.default();
          break;
        case 'firstApplicable':
          this.combiningAlgorithm = new _FirstApplicable2.default();
          break;
        default:
          throw Error('Unknown algorithm: ' + combiningAlgorithm);
      }
    }
  }, {
    key: '_setRules',
    value: function _setRules(rules) {
      this.rules = [];

      for (var i in rules) {
        var rule = rules[i];
        if (rule.priority === undefined) {
          rule.priority = this.getLastPriority() + 1;
        }
        if (!(rule instanceof _Rule2.default)) {
          rule = new _Rule2.default(rule.decision, rule.condition, rule.scope, rule.target, rule.priority);
        }
        this.rules.push(rule);
      }
    }
  }, {
    key: 'sortRules',
    value: function sortRules() {
      return this.rules.sort(function (a, b) {
        var x = a.priority;var y = b.priority;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  }]);
  return Policy;
}();

exports.default = Policy;
module.exports = exports['default'];

},{"./Rule":430,"./combiningAlgorithms/AllowOverrides":431,"./combiningAlgorithms/BlockOverrides":432,"./combiningAlgorithms/FirstApplicable":433,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],429:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReThinkCtx = function () {
  function ReThinkCtx() {
    (0, _classCallCheck3.default)(this, ReThinkCtx);

    this.defaultBehaviour = true;
    this.groups = {};
  }

  (0, _createClass3.default)(ReThinkCtx, [{
    key: 'scheme',
    get: function get() {
      return this._scheme;
    },
    set: function set(params) {
      var from = params.message.from;
      if ((0, _utils.isDataObjectURL)(from)) {
        this._scheme = (0, _utils.divideURL)(from).type;
      } else {
        this._scheme = undefined;
      }
    }
  }, {
    key: 'date',
    get: function get() {
      return this._date;
    },
    set: function set(now) {
      var date = new Date();
      var day = String(date.getDate());
      if (day.length === 1) {
        day = '0' + day;
      }
      var month = String(date.getMonth() + 1);
      if (month.length === 1) {
        month = '0' + month;
      }
      this._date = day + '/' + month + '/' + date.getFullYear();
    }
  }, {
    key: 'domain',
    get: function get() {
      return this._domain;
    },
    set: function set(params) {
      if (params.message.body.identity !== undefined) {
        this._domain = (0, _utils.divideEmail)(params.message.body.identity.userProfile.username).domain;
      }
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    },
    set: function set(params) {
      var message = params.message;
      if (message.body.value !== undefined) {
        this._type = message.body.value.resourceType;
      }
    }
  }, {
    key: 'source',
    get: function get() {
      return this._source;
    },
    set: function set(params) {
      if (params.message.body.identity !== undefined) {
        this._source = params.message.body.identity.userProfile.username;
      }
    }
  }, {
    key: 'time',
    get: function get() {
      return this._time;
    },
    set: function set(now) {
      now = new Date();
      var minutes = String(now.getMinutes());
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      this._time = parseInt(String(now.getHours()) + minutes);
    }
  }, {
    key: 'weekday',
    get: function get() {
      return this._weekday;
    },
    set: function set(now) {
      this._weekday = String(new Date().getDay());
    }
  }]);
  return ReThinkCtx;
}();

exports.default = ReThinkCtx;
module.exports = exports['default'];

},{"../utils/utils":452,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],430:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AdvancedCondition = require('./conditions/AdvancedCondition');

var _AdvancedCondition2 = _interopRequireDefault(_AdvancedCondition);

var _Condition = require('./conditions/Condition');

var _Condition2 = _interopRequireDefault(_Condition);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rule = function () {
  function Rule(decision, condition, scope, target, priority) {
    (0, _classCallCheck3.default)(this, Rule);

    this.decision = decision;
    this.setCondition(condition);
    this.priority = priority;
    this.scope = scope;
    this.target = target;
  }

  (0, _createClass3.default)(Rule, [{
    key: 'setCondition',
    value: function setCondition(condition) {
      if (!(condition instanceof _Condition2.default || condition instanceof _AdvancedCondition2.default || condition instanceof _AdvancedCondition2.default)) {
        var attribute = condition.attribute;
        switch (attribute) {
          case 'subscription':
            this.condition = new _AdvancedCondition2.default(condition.attribute, condition.operator, condition.params);
            break;
          case undefined:
            this.condition = new _AdvancedCondition2.default(condition);
            break;
          default:
            this.condition = new _Condition2.default(condition.attribute, condition.operator, condition.params);
        }
      } else {
        this.condition = condition;
      }
    }
  }, {
    key: 'evaluate',
    value: function evaluate(context, message, isIncoming) {
      var field = isIncoming ? message.to : message.from;
      var hypertyName = void 0;
      switch (this.scope) {
        case 'global':
          break;

        case 'hyperty':
          if ((0, _utils.isDataObjectURL)(field)) {
            var reporter = context.runtimeRegistry.getReporterURLSynchonous((0, _utils.removePathFromURL)(field));
            if (reporter !== undefined) {
              hypertyName = context.runtimeRegistry.getHypertyName(reporter);
            }
          } else {
            if (field.split('://')[0] === 'hyperty') {
              hypertyName = context.runtimeRegistry.getHypertyName((0, _utils.removePathFromURL)(field));
            }
          }
          if (hypertyName === this.target) {
            break;
          }

          return 'Not Applicable';

        case 'identity':
          var owner = void 0;

          if ((0, _utils.isDataObjectURL)(field)) {
            var _reporter = context.runtimeRegistry.getReporterURLSynchonous((0, _utils.removePathFromURL)(field));
            owner = context.runtimeRegistry.getHypertyOwner(_reporter);
          } else {
            if (field.split('://')[0] === 'hyperty') {
              owner = context.runtimeRegistry.getHypertyOwner((0, _utils.removePathFromURL)(field));
            }
          }
          if (owner !== undefined) {
            owner = (0, _utils.getUserEmailFromURL)(owner);
          }
          if (owner === this.target) {
            break;
          }

          return 'Not Applicable';
      }

      if (this.condition.isApplicable(context, message, this.scope, this.target)) {
        return this.decision;
      } else {
        return 'Not Applicable';
      }
    }
  }]);
  return Rule;
}();

exports.default = Rule;
module.exports = exports['default'];

},{"../utils/utils":452,"./conditions/AdvancedCondition":434,"./conditions/Condition":435,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],431:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
* @classdesc Class to combine the authorization decisions that result from rules evaluation.
*/
var AllowOverrides = function () {
  function AllowOverrides() {
    (0, _classCallCheck3.default)(this, AllowOverrides);
  }

  (0, _createClass3.default)(AllowOverrides, [{
    key: 'combine',


    /**
    * Given an array of individual authorization decisions, prioritizes a positive one.
    * @param    {boolean[]}   decisions
    * @returns  {boolean}
    */
    value: function combine(decisions) {
      if (decisions.indexOf(true) !== -1) {
        return true;
      } else {
        if (decisions.indexOf(false) !== -1) {
          return false;
        } else {
          return 'Not Applicable';
        }
      }
    }
  }]);
  return AllowOverrides;
}();

exports.default = AllowOverrides;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],432:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
* @classdesc Class to combine the authorization decisions that result from rules evaluation.
*/
var BlockOverrides = function () {
  function BlockOverrides() {
    (0, _classCallCheck3.default)(this, BlockOverrides);
  }

  (0, _createClass3.default)(BlockOverrides, [{
    key: 'combine',


    /**
    * Given an array of individual authorisation decisions, prioritises a negative one.
    * @param    {boolean[]}   decisions
    * @returns  {boolean}
    */
    value: function combine(decisions) {
      if (decisions.indexOf(false) !== -1) {
        return false;
      } else {
        if (decisions.indexOf(true) !== -1) {
          return true;
        } else {
          return 'Not Applicable';
        }
      }
    }
  }]);
  return BlockOverrides;
}();

exports.default = BlockOverrides;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],433:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/**
* @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
* @classdesc Class to combine the authorization decisions that result from rules evaluation.
*/
var FirstApplicable = function () {
  function FirstApplicable() {
    (0, _classCallCheck3.default)(this, FirstApplicable);
  }

  (0, _createClass3.default)(FirstApplicable, [{
    key: 'combine',


    /**
    * Given an array of individual authorisation decisions, returns the first one different from 'Not Applicable', either positive or negative.
    * @param    {boolean[]}     decisions
    * @returns  {boolean}
    */
    value: function combine(decisions) {
      for (var i in decisions) {
        if (decisions[i] !== 'Not Applicable') {
          return decisions[i];
        }
      }
      return 'Not Applicable';
    }
  }]);
  return FirstApplicable;
}();

exports.default = FirstApplicable;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],434:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Condition = require('./Condition');

var _Condition2 = _interopRequireDefault(_Condition);

var _Operators = require('../Operators');

var _Operators2 = _interopRequireDefault(_Operators);

var _SubscriptionCondition = require('./SubscriptionCondition');

var _SubscriptionCondition2 = _interopRequireDefault(_SubscriptionCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdvancedCondition = function () {
  function AdvancedCondition(condition) {
    (0, _classCallCheck3.default)(this, AdvancedCondition);

    this.operators = new _Operators2.default();
    if (condition.operators !== undefined) {
      condition = condition.condition;
    }
    condition = this.buildCondition(condition);
    this.condition = condition;
  }

  (0, _createClass3.default)(AdvancedCondition, [{
    key: 'buildCondition',
    value: function buildCondition(condition) {
      if (Array.isArray(condition[1])) {
        condition[1] = this.buildCondition(condition[1]);
      } else {
        if (condition[1].attribute === 'subscription') {
          condition[1] = new _SubscriptionCondition2.default(condition[1].attribute, condition[1].operator, condition[1].params);
        } else {
          condition[1] = new _Condition2.default(condition[1].attribute, condition[1].operator, condition[1].params);
        }
      }

      if (condition[2] !== undefined) {
        if (Array.isArray(condition[2])) {
          condition[2] = this.buildCondition(condition[2]);
        } else {
          if (condition[2].attribute === 'subscription') {
            condition[2] = new _SubscriptionCondition2.default(condition[2].attribute, condition[2].operator, condition[2].params);
          } else {
            condition[2] = new _Condition2.default(condition[2].attribute, condition[2].operator, condition[2].params);
          }
        }
      }
      return condition;
    }
  }, {
    key: 'isApplicable',
    value: function isApplicable(context, message, scope, target, operator, left, right) {
      if (!operator) {
        operator = this.condition[0];
        left = this.condition[1];
        right = this.condition[2];
      }

      while (!(left instanceof _Condition2.default) & !(left instanceof _SubscriptionCondition2.default) & typeof left !== 'boolean') {
        left = this.isApplicable(context, message, scope, target, left[0], left[1], left[2]);
      }
      if (right !== undefined) {
        while (!(right instanceof _Condition2.default) & !(right instanceof _SubscriptionCondition2.default) & typeof right !== 'boolean') {
          right = this.isApplicable(context, message, scope, target, right[0], right[1], right[2]);
        }
      }

      var resultLeft = typeof left === 'boolean' ? left : left.isApplicable(context, message, scope, target);
      var resultRight = void 0;
      if (right !== undefined) {
        resultRight = typeof right === 'boolean' ? right : right.isApplicable(context, message, scope, target);
      }
      return this.operators[operator]([resultLeft, resultRight]);
    }
  }]);
  return AdvancedCondition;
}();

exports.default = AdvancedCondition;
module.exports = exports['default'];

},{"../Operators":425,"./Condition":435,"./SubscriptionCondition":436,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],435:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Operators = require('../Operators');

var _Operators2 = _interopRequireDefault(_Operators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
* @classdesc Class to represent a condition and evaluate its applicability.
*/
var Condition = function () {

  /**
  * Creates a new Condition.
  * @class
  * @param  {string}  attribute
  * @param  {string}  operator
  * @param  {*}       params
  */
  function Condition(attribute, operator, params) {
    (0, _classCallCheck3.default)(this, Condition);

    this.attribute = attribute;
    this.operator = operator;
    this.params = params;
    this.operators = new _Operators2.default();
  }

  /**
  * Verifies if the condition is applicable to the message. First, the system value that corresponds to the attribute is retrieved; then, that value is compared with the parameter specified in the condition by executing the operator implementation. If the operator is 'in' and the name of a group is given, then the array holding the members of the group is retrieved before the comparison.
  * @param  {Object}    context   environment where the Policy Engine is being used
  * @param  {Object}    message
  */


  (0, _createClass3.default)(Condition, [{
    key: 'isApplicable',
    value: function isApplicable(context, message) {
      context[this.attribute] = { message: message };
      var value = context[this.attribute];
      var tempParam = void 0;

      if (this.operator === 'in') {
        if (!Array.isArray(this.params)) {
          tempParam = context.getGroup(this.params, message.to);
          return this.operators[this.operator]([tempParam, value]);
        }
      }

      return this.operators[this.operator]([this.params, value]);
    }
  }]);
  return Condition;
}(); /**
     * Copyright 2016 PT Inovação e Sistemas SA
     * Copyright 2016 INESC-ID
     * Copyright 2016 QUOBIS NETWORKS SL
     * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
     * Copyright 2016 ORANGE SA
     * Copyright 2016 Deutsche Telekom AG
     * Copyright 2016 Apizee
     * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     **/

exports.default = Condition;
module.exports = exports['default'];

},{"../Operators":425,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],436:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Condition2 = require('./Condition');

var _Condition3 = _interopRequireDefault(_Condition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
* @classdesc Class to represent a subscription condition and evaluate its applicability.
*/
var SubscriptionCondition = function (_Condition) {
  (0, _inherits3.default)(SubscriptionCondition, _Condition);

  /**
  * Creates a new SubscriptionCondition.
  * @class
  * @param  {string}  attribute
  * @param  {string}  operator
  * @param  {*}       params
  */
  function SubscriptionCondition(attribute, operator, params) {
    (0, _classCallCheck3.default)(this, SubscriptionCondition);
    return (0, _possibleConstructorReturn3.default)(this, (SubscriptionCondition.__proto__ || (0, _getPrototypeOf2.default)(SubscriptionCondition)).call(this, attribute, operator, params));
  }

  /**
  * Verifies if the subscription condition is applicable to the message. First, verifies if the message is of the subscription type; second, verifies if the message is from a remote runtime to guarantee that the subscription is being validated in the destination runtime; third, verifies if the subscription preference is met.
  * @param  {Object}    context   environment where the Policy Engine is being used
  * @param  {Object}    message
  */


  (0, _createClass3.default)(SubscriptionCondition, [{
    key: 'isApplicable',
    value: function isApplicable(context, message) {
      var isSubscription = message.type === 'subscribe';
      var isFromRemoteSM = context.isFromRemoteSM(message.from);
      if (isSubscription & isFromRemoteSM) {
        return (0, _get3.default)(SubscriptionCondition.prototype.__proto__ || (0, _getPrototypeOf2.default)(SubscriptionCondition.prototype), 'isApplicable', this).call(this, context, message);
      } else {
        return false;
      }
    }
  }]);
  return SubscriptionCondition;
}(_Condition3.default); /**
                        * Copyright 2016 PT Inovação e Sistemas SA
                        * Copyright 2016 INESC-ID
                        * Copyright 2016 QUOBIS NETWORKS SL
                        * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
                        * Copyright 2016 ORANGE SA
                        * Copyright 2016 Deutsche Telekom AG
                        * Copyright 2016 Apizee
                        * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
                        *
                        * Licensed under the Apache License, Version 2.0 (the "License");
                        * you may not use this file except in compliance with the License.
                        * You may obtain a copy of the License at
                        *
                        *   http://www.apache.org/licenses/LICENSE-2.0
                        *
                        * Unless required by applicable law or agreed to in writing, software
                        * distributed under the License is distributed on an "AS IS" BASIS,
                        * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        * See the License for the specific language governing permissions and
                        * limitations under the License.
                        **/

exports.default = SubscriptionCondition;
module.exports = exports['default'];

},{"./Condition":435,"babel-runtime/core-js/object/get-prototype-of":302,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"babel-runtime/helpers/get":311,"babel-runtime/helpers/inherits":312,"babel-runtime/helpers/possibleConstructorReturn":313}],437:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AllowOverrides = require('../combiningAlgorithms/AllowOverrides');

var _AllowOverrides2 = _interopRequireDefault(_AllowOverrides);

var _BlockOverrides = require('../combiningAlgorithms/BlockOverrides');

var _BlockOverrides2 = _interopRequireDefault(_BlockOverrides);

var _utils = require('../../utils/utils');

var _FirstApplicable = require('../combiningAlgorithms/FirstApplicable');

var _FirstApplicable2 = _interopRequireDefault(_FirstApplicable);

var _ReThinkCtx2 = require('../ReThinkCtx');

var _ReThinkCtx3 = _interopRequireDefault(_ReThinkCtx2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RuntimeCoreCtx = function (_ReThinkCtx) {
  (0, _inherits3.default)(RuntimeCoreCtx, _ReThinkCtx);

  function RuntimeCoreCtx(idModule, runtimeRegistry, persistenceManager) {
    (0, _classCallCheck3.default)(this, RuntimeCoreCtx);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (RuntimeCoreCtx.__proto__ || (0, _getPrototypeOf2.default)(RuntimeCoreCtx)).call(this));

    _this2.idModule = idModule;
    _this2.runtimeRegistry = runtimeRegistry;
    _this2.activeUserPolicy = undefined;
    _this2.serviceProviderPolicy = {};
    _this2.userPolicies = {};
    _this2.persistenceManager = persistenceManager;
    return _this2;
  }

  (0, _createClass3.default)(RuntimeCoreCtx, [{
    key: 'loadConfigurations',
    value: function loadConfigurations() {
      this.activeUserPolicy = this.persistenceManager.get('rethink:activePolicy');

      var groups = this.persistenceManager.get('rethink:groups');
      this.groups = groups === undefined ? {} : groups;

      var spPolicies = this.persistenceManager.get('rethink:spPolicies');
      this.serviceProviderPolicy = spPolicies === undefined ? {} : spPolicies;

      this._loadUserPolicies();
    }
  }, {
    key: 'prepareForEvaluation',
    value: function prepareForEvaluation(message, isIncoming) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {

        var _this = _this3;
        if (isIncoming) {
          if (_this._isToCypherModule(message)) {
            _this.idModule.decryptMessage(message).then(function (message) {
              /*if (message.type === 'update') {
                _this._isValidUpdate(message).then(message => {*/
              resolve(message);
            }, function (error) {
              reject(error);
              /*});
              } else {
              resolve(message);
              }*/
            });
          } else {
            resolve(message);
          }
        } else {
          if (_this._isToSetID(message)) {
            _this._getIdentity(message).then(function (identity) {
              message.body.identity = identity;
              resolve(message);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(message);
          }
        }
      });
    }
  }, {
    key: 'getPolicies',
    value: function getPolicies(message, isIncomingMessage) {
      var policies = {};

      if (this.activeUserPolicy !== undefined) {
        policies.userPolicy = this.userPolicies[this.activeUserPolicy];
      }

      policies.serviceProviderPolicy = this.getServiceProviderPolicy(message, isIncomingMessage);

      return policies;
    }
  }, {
    key: '_isValidUpdate',
    value: function _isValidUpdate(message) {
      var _this = this;
      return new _promise2.default(function (resolve, reject) {
        if (message.from.split('://').length > 1) {
          _this.idModule._getHypertyFromDataObject(message.from).then(function (hypertyURL) {
            if (hypertyURL === message.body.source) {
              resolve(message);
            } else {
              reject('The source of the message is not valid.');
            }
          }, function (error) {
            reject(error);
          });
        } else {
          resolve(message);
        }
      });
    }
  }, {
    key: 'prepareToForward',
    value: function prepareToForward(message, isIncoming, result) {
      var _this = this;
      return new _promise2.default(function (resolve, reject) {
        if (isIncoming & result) {
          var isSubscription = message.type === 'subscribe';
          var isFromRemoteSM = _this.isFromRemoteSM(message.from);
          if (isSubscription & isFromRemoteSM) {
            _this.doMutualAuthentication(message).then(function () {
              resolve(message);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(message);
          }
        } else {
          if (_this._isToCypherModule(message)) {
            _this.idModule.encryptMessage(message).then(function (message) {
              resolve(message);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(message);
          }
        }
      });
    }
  }, {
    key: 'doMutualAuthentication',
    value: function doMutualAuthentication(message) {
      var _this = this;
      return new _promise2.default(function (resolve, reject) {
        var to = message.to.split('/');
        var subsIndex = to.indexOf('subscription');
        var isDataObjectSubscription = subsIndex !== -1;
        var isFromRemoteSM = _this.isFromRemoteSM(message.from);
        if (isDataObjectSubscription & isFromRemoteSM) {
          (function () {
            to.pop();
            var dataObjectURL = to[0] + '//' + to[2] + '/' + to[3];
            _this.idModule.doMutualAuthentication(dataObjectURL, message.body.subscriber).then(function () {
              _this.runtimeRegistry.registerSubscriber(dataObjectURL, message.body.subscriber);
              resolve();
            }, function (error) {
              reject(error);
            });
          })();
        }
      });
    }
  }, {
    key: 'getMyEmails',
    value: function getMyEmails() {
      var identities = this.idModule.getIdentities();
      var emails = [];

      for (var i in identities) {
        emails.push((0, _utils.getUserEmailFromURL)(identities[i].identity));
      }

      return emails;
    }
  }, {
    key: 'getMyHyperties',
    value: function getMyHyperties() {
      var hyperties = this.runtimeRegistry.hypertiesList;
      var hypertiesNames = [];

      for (var i in hyperties) {
        var hypertyName = hyperties[i].objectName;
        if (hypertiesNames.indexOf(hypertyName) === -1) {
          hypertiesNames.push(hypertyName);
        }
      }

      return hypertiesNames;
    }
  }, {
    key: 'getServiceProviderPolicy',
    value: function getServiceProviderPolicy(message, isIncoming) {
      var policy = void 0;

      if (isIncoming) {
        var toHyperty = this.runtimeRegistry.getHypertyName(message.to);
        policy = this.serviceProviderPolicy[toHyperty];
      } else {
        var fromHyperty = this.runtimeRegistry.getHypertyName(message.from);
        policy = this.serviceProviderPolicy[fromHyperty];
      }
      return policy;
    }
  }, {
    key: 'isFromRemoteSM',
    value: function isFromRemoteSM(from) {
      var splitFrom = from.split('://');
      return splitFrom[0] === 'runtime' && from !== this.runtimeRegistry.runtimeURL + '/sm';
    }
  }, {
    key: '_isToSetID',
    value: function _isToSetID(message) {
      var schemasToIgnore = ['domain-idp', 'runtime', 'domain'];
      var splitFrom = message.from.split('://');
      var fromSchema = splitFrom[0];

      return schemasToIgnore.indexOf(fromSchema) === -1;
    }
  }, {
    key: 'getURL',
    value: function getURL(url) {
      var splitURL = url.split('/');
      return splitURL[0] + '//' + splitURL[2] + '/' + splitURL[3];
    }
  }, {
    key: '_getIdentity',
    value: function _getIdentity(message) {
      if (message.type === 'update') {
        return this.idModule.getIdentityOfHyperty(message.body.source);
      }

      if (message.type === 'response' && message.body.source !== undefined) {
        return this.idModule.getIdentityOfHyperty(message.body.source);
      }

      if ((0, _utils.divideURL)(message.from).type === 'hyperty') {
        return this.idModule.getIdentityOfHyperty(message.from);
      } else {
        return this.idModule.getIdentityOfHyperty(this.getURL(message.from));
      }
    }

    /**
    * Identifies the messages to be forwarded to the Identity Module for
    * encryption/decryption and integrity validation.
    * @param {Message}    message
    * @returns {boolean}  returns true if the message requires encryption/decryption
    *                     or if its type equals 'handshake'; false otherwise
    */

  }, {
    key: '_isToCypherModule',
    value: function _isToCypherModule(message) {
      var isCreate = message.type === 'create';
      var isFromHyperty = (0, _utils.divideURL)(message.from).type === 'hyperty';
      var isToHyperty = (0, _utils.divideURL)(message.to).type === 'hyperty';
      var isToDataObject = (0, _utils.isDataObjectURL)(message.to);

      return isCreate && isFromHyperty && isToHyperty || isCreate && isFromHyperty && isToDataObject || message.type === 'handshake' || message.type === 'update';
    }

    /**
    * Creates a group with the given name.
    * @param  {String}  groupName
    */

  }, {
    key: '_loadUserPolicies',
    value: function _loadUserPolicies() {
      var policies = this.persistenceManager.get('rethink:userPolicies');
      if (policies !== undefined) {
        for (var i in policies) {
          this.pep.addPolicy('USER', i, policies[i]);
        }
      }
    }
  }, {
    key: '_getLastComponentOfURL',
    value: function _getLastComponentOfURL(url) {
      var split = url.split('/');
      return split[split.length - 1];
    }
  }, {
    key: '_getPoliciesJSON',
    value: function _getPoliciesJSON(policies) {
      for (var i in policies) {
        var combiningAlgorithm = policies[i].combiningAlgorithm;
        if (combiningAlgorithm instanceof _BlockOverrides2.default) {
          policies[i].combiningAlgorithm = 'blockOverrides';
        } else {
          if (combiningAlgorithm instanceof _AllowOverrides2.default) {
            policies[i].combiningAlgorithm = 'allowOverrides';
          } else {
            if (combiningAlgorithm instanceof _FirstApplicable2.default) {
              policies[i].combiningAlgorithm = 'firstApplicable';
            } else {
              policies[i].combiningAlgorithm = undefined;
            }
          }
        }
      }

      return policies;
    }
  }, {
    key: 'saveActivePolicy',
    value: function saveActivePolicy() {
      this.persistenceManager.set('rethink:activePolicy', 0, this.activeUserPolicy);
    }
  }, {
    key: 'saveGroups',
    value: function saveGroups() {
      this.persistenceManager.set('rethink:groups', 0, this.groups);
    }
  }, {
    key: 'savePolicies',
    value: function savePolicies(source, policy, key) {
      var policiesJson = void 0;

      switch (source) {
        case 'USER':
          policiesJson = (0, _stringify2.default)(this.userPolicies);
          policiesJson = this._getPoliciesJSON(JSON.parse(policiesJson));
          this.persistenceManager.set('rethink:userPolicies', 0, policiesJson);
          break;
        case 'SERVICE_PROVIDER':
          if (policy !== undefined & key !== undefined) {
            this.serviceProviderPolicy[key] = policy;
          }
          policiesJson = (0, _stringify2.default)(this.serviceProviderPolicy);
          policiesJson = this._getPoliciesJSON(JSON.parse(policiesJson));
          this.persistenceManager.set('rethink:spPolicies', 0, policiesJson);
          break;
        default:
          throw Error('Unknown policy source: ' + source);
      }
    }
  }, {
    key: 'getGroupsNames',
    value: function getGroupsNames() {
      var myGroups = this.groups;
      var groupsNames = [];
      if (myGroups !== undefined) {
        for (var groupName in myGroups) {
          groupsNames.push(groupName);
        }
      }
      return groupsNames;
    }
  }, {
    key: 'getGroup',
    value: function getGroup(groupName, destination) {
      var members = [];

      if (groupName === 'preauthorised') {
        var dataObjectURL = destination.split('/');
        dataObjectURL.pop();
        dataObjectURL = dataObjectURL[0] + '//' + dataObjectURL[2];
        members = this.runtimeRegistry.getPreAuthSubscribers(dataObjectURL);
      } else {
        if (this.groups[groupName] !== undefined) {
          members = this.groups[groupName];
        }
      }

      return members;
    }

    /**
    * Creates a group with the given name.
    * @param  {String}  groupName
    */

  }, {
    key: 'createGroup',
    value: function createGroup(groupName) {
      this.groups[groupName] = [];
      this.saveGroups();
    }
  }, {
    key: 'deleteGroup',
    value: function deleteGroup(groupName) {
      delete this.groups[groupName];
      this.saveGroups();
    }

    /**
    * Adds the given user email to the group with the given name.
    * @param  {String}  userEmail
    * @param  {String}  groupName
    */

  }, {
    key: 'addToGroup',
    value: function addToGroup(groupName, userEmail) {
      var myGroups = this.groups;
      if (myGroups[groupName] !== undefined) {
        if (myGroups[groupName].indexOf(userEmail) === -1) {
          myGroups[groupName].push(userEmail);
          this.saveGroups();
        }
      } else {
        throw Error('Group "' + groupName + '" does not exist!');
      }
    }
  }, {
    key: 'removeFromGroup',
    value: function removeFromGroup(groupName, userEmail) {
      var group = this.groups[groupName];

      group.splice(group.indexOf(userEmail), 1);
      this.saveGroups();
    }
  }, {
    key: 'subscription',
    get: function get() {
      return this._subscription;
    },
    set: function set(params) {
      this._subscription = params.message.body.subscriber;
    }
  }]);
  return RuntimeCoreCtx;
}(_ReThinkCtx3.default);

exports.default = RuntimeCoreCtx;
module.exports = exports['default'];

},{"../../utils/utils":452,"../ReThinkCtx":429,"../combiningAlgorithms/AllowOverrides":431,"../combiningAlgorithms/BlockOverrides":432,"../combiningAlgorithms/FirstApplicable":433,"babel-runtime/core-js/json/stringify":297,"babel-runtime/core-js/object/get-prototype-of":302,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"babel-runtime/helpers/inherits":312,"babel-runtime/helpers/possibleConstructorReturn":313}],438:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
// import MessageFactory from '../../resources/MessageFactory';

/**
 * Class will ask to the message node for addresses
 */
var AddressAllocation = function () {
  /* private
  _url: URL
  _bus: MiniBus
  */

  /**
   * Create an Address Allocation
   * @param  {URL.URL}      url - url from who is sending the message
   * @param  {MiniBus}      bus - MiniBus used for address allocation
   */
  function AddressAllocation(url, bus) {
    (0, _classCallCheck3.default)(this, AddressAllocation);

    var _this = this;

    // let messageFactory = new MessageFactory();
    //
    // _this._messageFactory = messageFactory;
    _this._url = url;
    _this._bus = bus;
  }

  /**
   * get the URL value
   * @return {string} The url value;
   */


  (0, _createClass3.default)(AddressAllocation, [{
    key: 'create',


    /**
     * Ask for creation of a number of Hyperty addresses, to the domain message node.
     * @param  {Domain} domain - Domain of the message node.
     * @param  {number} number - Number of addresses to request
     * @returns {Promise<HypertyURL>}  A list of HypertyURL's
     */
    value: function create(domain, number) {
      var _this = this;

      // let messageFactory = _this._messageFactory;

      var msg = {
        type: 'create', from: _this._url, to: 'domain://msg-node.' + domain + '/hyperty-address-allocation',
        body: { value: { number: number } }
      };

      // TODO: Apply the message factory
      // The msg-node-vertx should be changed the body field to receive
      // the following format body: {value: {number: number}} because
      // the message is generated in that way by the message factory;
      // let msg = messageFactory.createMessageRequest(_this._url, 'domain://msg-node.' + domain + '/hyperty-address-allocation', '', {number: number});

      return new _promise2.default(function (resolve, reject) {

        // TODO: change this response Message using the MessageFactory
        _this._bus.postMessage(msg, function (reply) {
          if (reply.body.code === 200) {
            resolve(reply.body.value.allocated);
          } else {
            reject(reply.body.desc);
          }
        });
      });
    }

    /**
    * Send a request to the domain message node, to deallocate one or more addresses
    * @param  {Domain} domain - Domain of the message node.
    * @param  {addresses} addresses to request the deallocation
    * @returns {Promise}  the response by the message node
    */

  }, {
    key: 'delete',
    value: function _delete(domain, addresses) {
      var _this = this;

      var message = {
        type: 'delete', from: _this._url, to: 'domain://msg-node.' + domain + '/hyperty-address-allocation',
        body: { childrenResources: addresses }
      };

      return new _promise2.default(function (resolve, reject) {

        _this._bus.postMessage(message, function (reply) {
          console.log('reply', reply);
          if (reply.body.code === 200) {
            resolve(reply.body.code);
          } else {
            reject(reply.body.desc);
          }
        });
      });
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }
  }]);
  return AddressAllocation;
}();

exports.default = AddressAllocation;
module.exports = exports['default'];

},{"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],439:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _RegistryDataModel2 = require('./RegistryDataModel');

var _RegistryDataModel3 = _interopRequireDefault(_RegistryDataModel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*   @author: Gil Dias (gil.dias@tecnico.ulisboa.pt)
*   HypertyInstance Data Model used to model instances of Hyperties running in devices and servers.
*/
var HypertyInstance = function (_RegistryDataModel) {
  (0, _inherits3.default)(HypertyInstance, _RegistryDataModel);

  function HypertyInstance(id, url, descriptorURL, descriptor, hypertyURL, user, guid, runtime, context) {
    (0, _classCallCheck3.default)(this, HypertyInstance);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (HypertyInstance.__proto__ || (0, _getPrototypeOf2.default)(HypertyInstance)).call(this, id, url, descriptorURL));

    var _this = _this2;
    _this._descriptor = descriptor;
    _this._hypertyURL = hypertyURL;
    _this._user = user;
    _this._guid = guid;
    _this._runtime = runtime;
    _this._context = context;
    return _this2;
  }

  (0, _createClass3.default)(HypertyInstance, [{
    key: 'user',
    set: function set(identity) {
      var _this = this;
      _this.user = identity;
    },
    get: function get() {
      var _this = this;
      return _this._user;
    }
  }, {
    key: 'hypertyURL',
    get: function get() {
      var _this = this;
      return _this._hypertyURL;
    }
  }, {
    key: 'descriptor',
    get: function get() {
      var _this = this;
      return _this._descriptor;
    }
  }, {
    key: 'objectName',
    get: function get() {
      var _this = this;
      return _this._descriptor._objectName;
    }
  }]);
  return HypertyInstance;
}(_RegistryDataModel3.default); /**
                                * Copyright 2016 PT Inovação e Sistemas SA
                                * Copyright 2016 INESC-ID
                                * Copyright 2016 QUOBIS NETWORKS SL
                                * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
                                * Copyright 2016 ORANGE SA
                                * Copyright 2016 Deutsche Telekom AG
                                * Copyright 2016 Apizee
                                * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
                                *
                                * Licensed under the Apache License, Version 2.0 (the "License");
                                * you may not use this file except in compliance with the License.
                                * You may obtain a copy of the License at
                                *
                                *   http://www.apache.org/licenses/LICENSE-2.0
                                *
                                * Unless required by applicable law or agreed to in writing, software
                                * distributed under the License is distributed on an "AS IS" BASIS,
                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                * See the License for the specific language governing permissions and
                                * limitations under the License.
                                **/


exports.default = HypertyInstance;
module.exports = exports['default'];

},{"./RegistryDataModel":441,"babel-runtime/core-js/object/get-prototype-of":302,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"babel-runtime/helpers/inherits":312,"babel-runtime/helpers/possibleConstructorReturn":313}],440:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AddressAllocation = require('./AddressAllocation');

var _AddressAllocation2 = _interopRequireDefault(_AddressAllocation);

var _ObjectAllocation = require('../syncher/ObjectAllocation');

var _ObjectAllocation2 = _interopRequireDefault(_ObjectAllocation);

var _HypertyInstance = require('./HypertyInstance');

var _HypertyInstance2 = _interopRequireDefault(_HypertyInstance);

var _MessageFactory = require('service-framework/dist/MessageFactory');

var _utils = require('../utils/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS = { DEPLOYED: 'deployed', PROGRESS: 'in-progress' };

/*import IdentityManager from './IdentityManager';
import Discovery from './Discovery';*/

/**
* Runtime Registry Interface
*/
/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

var Registry = function () {

  /**
  * To initialise the Runtime Registry with the RuntimeURL that will be the basis to derive the internal runtime addresses when allocating addresses to internal runtime component. In addition, the Registry domain back-end to be used to remotely register Runtime components, is also passed as input parameter.
  * @param  {MessageBus}          msgbus                msgbus
  * @param  {HypertyRuntimeURL}   runtimeURL            runtimeURL
  * @param  {AppSandbox}          appSandbox            appSandbox
  * @param  {runtimeCatalogue}    runtimeCatalogue      runtimeCatalogue
  * @param  {DomainURL}           remoteRegistry        remoteRegistry
  */
  function Registry(runtimeURL, appSandbox, identityModule, runtimeCatalogue, remoteRegistry) {
    (0, _classCallCheck3.default)(this, Registry);


    // how some functions receive the parameters for example:
    // new Registry('hyperty-runtime://sp1/123', appSandbox, idModule, remoteRegistry);
    // registry.registerStub(sandbox, 'sp1');
    // registry.registerHyperty(sandBox, 'hyperty-runtime://sp1/123');
    // registry.resolve('hyperty-runtime://sp1/123');

    if (!runtimeURL) throw new Error('runtimeURL is missing.');
    /*if (!remoteRegistry) throw new Error('remoteRegistry is missing');*/

    var _this = this;

    _this.registryURL = runtimeURL + '/registry/';
    _this.appSandbox = appSandbox;
    _this.runtimeURL = runtimeURL;
    _this.runtimeCatalogue = runtimeCatalogue;
    _this.remoteRegistry = remoteRegistry;
    _this.idModule = identityModule;
    _this.identifier = Math.floor(Math.random() * 10000 + 1);

    // the expires in 3600, represents 1 hour
    //the expires is in seconds, unit of measure received by the domain registry
    _this.expiresTime = 3600;

    _this.hypertiesListToRemove = {};
    _this.hypertiesList = [];
    _this.protostubsList = {};
    _this.idpProxyList = {};
    _this.dataObjectList = {};
    _this.subscribedDataObjectList = {};
    _this.sandboxesList = { sandbox: {}, appSandbox: {} };
    _this.pepList = {};

    _this._domain = (0, _utils.divideURL)(_this.registryURL).domain;
    _this.sandboxesList.appSandbox[runtimeURL] = appSandbox;
    var msgFactory = new _MessageFactory.MessageFactory('false', '{}');
    _this.messageFactory = msgFactory;
  }

  (0, _createClass3.default)(Registry, [{
    key: 'discoverHypertyPerUser',


    /**
    * function to request about users registered in domain registry, and
    * return the last hyperty instance registered by the user.
    * @param  {email}              email
    * @param  {domain}            domain (Optional)
    * @return {Promise}          Promise
    */

    // TODO: implement a cache system
    value: function discoverHypertyPerUser(email, domain) {
      var _this = this;
      var activeDomain = void 0;

      if (!domain) {
        activeDomain = _this._domain;
      } else {
        activeDomain = domain;
      }

      var identityURL = 'user://' + email.substring(email.indexOf('@') + 1, email.length) + '/' + email.substring(0, email.indexOf('@'));

      // message to query domain registry, asking for a user hyperty.
      var message = {
        type: 'read', from: _this.registryURL, to: 'domain://registry.' + activeDomain + '/', body: { resource: identityURL }
      };

      console.log('Message: ', message, activeDomain, identityURL);

      //console.log('message READ', message);
      return new _promise2.default(function (resolve, reject) {

        _this._messageBus.postMessage(message, function (reply) {
          console.log('message reply', reply);

          var hyperty = void 0;
          var mostRecent = void 0;
          var lastHyperty = void 0;
          var value = reply.body.value;

          for (hyperty in value) {
            if (value[hyperty].lastModified !== undefined) {
              if (mostRecent === undefined) {
                mostRecent = new Date(value[hyperty].lastModified);
                lastHyperty = hyperty;
              } else {
                var hypertyDate = new Date(value[hyperty].lastModified);
                if (mostRecent.getTime() < hypertyDate.getTime()) {
                  mostRecent = hypertyDate;
                  lastHyperty = hyperty;
                }
              }
            }
          }

          console.log('Last Hyperty: ', lastHyperty, mostRecent);

          var hypertyURL = lastHyperty;

          if (hypertyURL === undefined) {
            return reject('User Hyperty not found');
          }

          var idPackage = {
            id: email,
            descriptor: value[hypertyURL].descriptor,
            hypertyURL: hypertyURL
          };

          console.log('===> hypertyDiscovery messageBundle: ', idPackage);
          resolve(idPackage);
        });
      });
    }
  }, {
    key: '_getIdentityAssociated',
    value: function _getIdentityAssociated(type, hypertyURL) {
      var _this = this;

      for (var hyperty in _this.hypertiesList) {
        var value = _this.hypertiesList[hyperty];
        if (value._hypertyURL === hypertyURL) {
          switch (type) {
            case 'username':
              return value._user.username;
            case 'cn':
              return value._user.cn;
            case 'locale':
              return value._user.locale;
            case 'avatar':
              return value._user.avatar;
            case 'userURL':
              return value._user.userURL;
            case '.':
              return value._user;
            default:
              return '';
          }
        }
      }
      return '';
    }

    /**
    * query the domain registry for information from a dataObject URL
    * @param  {String}   url            dataObject URL
    * @return {JSON}     dataObject     data object
    */

  }, {
    key: 'discoverDataObjectPerURL',
    value: function discoverDataObjectPerURL(url, domain) {

      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var activeDomain = void 0;

        if (!domain) {
          activeDomain = _this._domain;
        } else {
          activeDomain = domain;
        }

        var msg = {
          type: 'read', from: _this.registryURL, to: 'domain://registry.' + activeDomain + '/', body: { resource: url, search: 'dataObjectPerURL' }
        };

        _this._messageBus.postMessage(msg, function (reply) {

          var dataObject = reply.body.value;

          if (dataObject) {
            resolve(dataObject);
          } else {
            reject('DataObject not found');
          }
        });
      });
    }

    /**
    * This function is used to return the sandbox instance where the Application is executing. It is assumed there is just one App per Runtime instance.
    */

  }, {
    key: 'getAppSandbox',
    value: function getAppSandbox() {
      var _this = this;
      return _this.appSandbox;
    }

    /**
    * This function returns the user associated to the hyperty URL
    * @param    {String}    hypertyURL      hyperty URL
    * @return   {String}    userURL         user URL
    */

  }, {
    key: 'getHypertyOwner',
    value: function getHypertyOwner(hypertyURL) {

      var _this = this;
      var userURL = void 0;

      for (var index in _this.hypertiesList) {
        var hyperty = _this.hypertiesList[index];
        if (hyperty.hypertyURL === hypertyURL) {
          userURL = hyperty.user.userURL;
        }
      }
      return userURL;
    }

    /**
    * returns the hyperty Name from a given url. This url could be from a dataObject or hyperty
    * @param    {String}    url      hyperty or dataObject URL
    * @return   {String}    hypertyName     hyperty Name
    */

  }, {
    key: 'getHypertyName',
    value: function getHypertyName(url) {
      var _this = this;

      var isHypertyURL = (0, _utils.divideURL)(url).type === 'hyperty';

      //value to be returned in the end
      var hypertyName = void 0;

      //if is not an hyperty, check if is a dataObject and obtain his reporter
      var hypertyURL = isHypertyURL ? hypertyURL = url : _this.getReporterURLSynchonous(url);

      for (var index in _this.hypertiesList) {
        var hyperty = _this.hypertiesList[index];
        if (hyperty.hypertyURL === hypertyURL) {
          hypertyName = hyperty.objectName;
          break;
        }
      }
      return hypertyName;
    }

    /**
    * function to return the reporterURL associated with the dataobject URL
    * @param    {String}     dataObjectURL    dataObjectURL
    * @return   {String}     reporterURL      reporterURL
    */

  }, {
    key: 'getReporterURL',
    value: function getReporterURL(dataObjectURL) {
      var _this = this;

      var dataObject = _this.dataObjectList[dataObjectURL];

      return new _promise2.default(function (resolve, reject) {
        if (dataObject) {
          resolve(dataObject.reporter);
        } else {
          reject('No reporter was found');
        }
      });
    }

    /**
    * function to return the reporterURL associated with the dataobject URL. no promise returned
    * @param    {String}     dataObjectURL    dataObjectURL
    * @return   {String}     reporterURL      reporterURL
    */

  }, {
    key: 'getReporterURLSynchonous',
    value: function getReporterURLSynchonous(dataObjectURL) {
      var _this = this;

      var dataObject = _this.dataObjectList[dataObjectURL];

      return dataObject ? dataObject.reporter : undefined;
    }

    /**
    * returns the hyperty URL that subscribed the dataObject
    * @param    {String}     url            url format
    * @return   {String}    Hyperty URL subscribed to the URL
    */

  }, {
    key: 'getDataObjectSubscriberHyperty',
    value: function getDataObjectSubscriberHyperty(url) {
      var _this = this;

      return _this.subscribedDataObjectList[url];
    }

    /**
    * register a desired dataObject to subscribe
    * @param    {String}    dataObjectURL      dataObject URL
    */

  }, {
    key: 'registerSubscribedDataObject',
    value: function registerSubscribedDataObject(dataObjectURL, hypertyURL) {
      var _this = this;
      if (_this.subscribedDataObjectList[dataObjectURL] === undefined) {
        _this.subscribedDataObjectList[dataObjectURL] = hypertyURL;
      }
    }

    /**
    * Function to return the list of pre authorised users received in the creation of a data object
    * @param    {String}            dataObjectURL    dataObjectURL
    * @return   {Array<String>}     preAuth         List of pre authorised users
    */

  }, {
    key: 'getPreAuthSubscribers',
    value: function getPreAuthSubscribers(dataObjectURL) {
      var _this = this;
      var dataObject = _this.dataObjectList[dataObjectURL];
      var preAuth = [];

      if (dataObject) {
        preAuth = dataObject.preAuth;
      }
      return preAuth;
    }

    /**
    * send requests to unregister all hyperties registered in domain registry
    * @return   {Promise}     return a promise if the result of unregistration all hyperties
    */

  }, {
    key: 'unregisterAllHyperties',
    value: function unregisterAllHyperties() {
      var _this = this;

      var unregisterResults = [];

      return new _promise2.default(function (resolve, reject) {

        for (var index in _this.hypertiesList) {
          var hyperty = _this.hypertiesList[index];
          var result = _this.unregisterHypertyInstance(hyperty.user.userURL, hyperty.hypertyURL);
          unregisterResults.push(result);
        }

        _promise2.default.all(unregisterResults).then(function () {

          resolve('successfully unregistered all hyperties');
        }, function (error) {
          reject(error);
        });
      });
    }

    /**
    *  function to unregister an hypertyInstance in the Domain Registry
    *  @param   {String}      user        user url
    *  @param   {String}      hypertyInstance   HypertyInsntance url
    *
    */

  }, {
    key: 'unregisterHypertyInstance',
    value: function unregisterHypertyInstance(user, hypertyInstance) {
      //TODO working but the user
      var _this = this;

      var message = { type: 'delete', from: _this.registryURL,
        to: 'domain://registry.' + _this._domain + '/',
        body: { value: { user: user, url: hypertyInstance } } };

      _this._messageBus.postMessage(message, function (reply) {
        console.log('unregister hyperty Reply', reply);
      });
    }

    /**
    *  function to delete an dataObjectInstance in the Domain Registry
    *  @param   {String}    name      DataObjectName
    */

  }, {
    key: 'deleteDataObjectInstance',
    value: function deleteDataObjectInstance(name) {
      var _this = this;

      var message = { type: 'delete', from: _this.registryURL,
        to: 'domain://registry.' + _this._domain + '/',
        body: { value: { name: name } } };

      _this._messageBus.postMessage(message, function (reply) {
        console.log('unregister dataObject Reply', reply);
      });
    }

    /**
    * Function to update an Hyperty
    */

  }, {
    key: 'updateHypertyInstance',
    value: function updateHypertyInstance(resource, value) {
      var _this = this;

      var message = { type: 'UPDATE', from: _this.registryURL,
        to: 'domain://registry.' + _this._domain + '/',
        body: { resource: resource, value: value } };

      _this._messageBus.post.postMessage(message, function (reply) {
        console.log('Updated hyperty reply', reply);
      });
    }

    /**
    * register a new subscriber in the dataObject registered
    * @param  {String}   dataObjectURL    dataObject URL
    * @param  {String}   subscriberURL    subscriber URL
    */

  }, {
    key: 'registerSubscriber',
    value: function registerSubscriber(dataObjectURL, subscriberURL) {
      var _this = this;
      var dataObject = _this.dataObjectList[dataObjectURL];

      if (dataObject) {
        dataObject.subscribers.push(subscriberURL);
        _this.dataObjectList[dataObjectURL] = dataObject;
      }
    }

    /**
    * get the subscribers registered within a dataObject
    * @param  {String}          dataObjectURL    dataObject URL
    * @param  {Array<String>}   Substribers List
    */

  }, {
    key: 'getDataObjectSubscribers',
    value: function getDataObjectSubscribers(dataObjectURL) {
      var _this = this;
      var dataObject = _this.dataObjectList[dataObjectURL];

      if (dataObject) {
        return dataObject.subscribers;
      } else {
        throw 'No dataObject was found';
      }
    }

    /**
    * To register a new Data Object in the runtime which returns the dataObjectURL allocated to the new Data Object.
    * @param  {String}      identifier                  identifier
    * @param  {String}      dataObjectschema            dataObjectschema
    * @param  {String}      dataObjectUrl               dataObjectUrl
    * @param {String}      dataObjectReporter           dataObjectReporter
    * @param  {Array}     resources                     dataObject resources
    * @param  {Array}     authorise                     list of pre authorised authorised IDs
    */

  }, {
    key: 'registerDataObject',
    value: function registerDataObject(identifier, dataObjectschema, dataObjectUrl, dataObjectReporter, resources, authorise) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var dataScheme = [];
        var filteredDataScheme = dataObjectUrl.split(':');
        dataScheme.push(filteredDataScheme[0]);

        //message to register the new hyperty, within the domain registry
        var messageValue = { name: identifier, resources: resources, dataSchemes: dataScheme, schema: dataObjectschema, url: dataObjectUrl, expires: _this.expiresTime, reporter: dataObjectReporter, preAuth: authorise, subscribers: [] };

        _this.dataObjectList[dataObjectUrl] = messageValue;

        /*let message = _this.messageFactory.createCreateMessageRequest(
          _this.registryURL,
          'domain://registry.' + _this.registryDomain + '/',
          messageValue,
          'policy'
        );*/

        var message = { type: 'create', from: _this.registryURL, to: 'domain://registry.' + _this.registryDomain + '/', body: { value: messageValue, policy: 'policy' } };

        _this._messageBus.postMessage(message, function (reply) {
          console.log('===> registerDataObject Reply: ', reply);
          if (reply.body.code === 200) {
            resolve('ok');
          } else {
            reject('error on register DataObject');
          }
        });
      });
    }

    /**
    * To register a new Hyperty in the runtime which returns the HypertyURL allocated to the new Hyperty.
    * @param  {Sandbox}             sandbox               sandbox
    * @param  {HypertyCatalogueURL} HypertyCatalogueURL   descriptor
    * @return {HypertyURL}          HypertyURL
    */

  }, {
    key: 'registerHyperty',
    value: function registerHyperty(sandbox, descriptorURL, descriptor) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //assuming descriptor come in this format, the service-provider-domain url is retrieved by a split instruction
        //hyperty-catalogue://<service-provider-domain>/<catalogue-object-identifier>
        var domainUrl = (0, _utils.divideURL)(descriptorURL).domain;

        if (domainUrl.includes('catalogue')) {
          domainUrl = domainUrl.replace('catalogue.', '');
        }

        _this.idModule.getIdentityAssertion().then(function (result) {
          var userProfile = result.userProfile;
          var identityURL = userProfile.userURL;

          if (_this._messageBus === undefined) {
            reject('MessageBus not found on registerStub');
          } else {
            //call check if the protostub exist
            _this.resolve('hyperty-runtime://' + domainUrl).then(function () {

              _this.registryDomain = domainUrl;

              // TODO: should be implemented with addresses poll
              // In this case we will request and return only one
              // address
              var numberOfAddresses = 1;
              _this.addressAllocation.create(domainUrl, numberOfAddresses).then(function (adderessList) {

                adderessList.forEach(function (address) {

                  _this._messageBus.addListener(address + '/status', function (msg) {
                    console.log('Message addListener for : ', address + '/status -> ' + msg);
                  });
                });

                //check whether the received sanbox e ApplicationSandbox or a normal sandbox
                if (sandbox.type === 'app') {
                  _this.sandboxesList.appSandbox[adderessList[0]] = sandbox;
                } else if (sandbox.type === 'normal') {
                  _this.sandboxesList.sandbox[adderessList[0]] = sandbox;
                } else {
                  reject('Wrong SandboxType');
                }

                var resources = void 0;

                // check if the hyperty resources is a vector or a string
                // TODO delete later when catalogue is fixed
                if (typeof descriptor.hypertyType === 'string') {
                  resources = [];
                  resources.push(descriptor.hypertyType);
                } else {
                  resources = descriptor.hypertyType;
                }

                var descriptorDataSchema = descriptor.dataObjects;
                var dataSchemasArray = [];

                //this will create a array with a Promise in each position
                for (var index in descriptorDataSchema) {
                  dataSchemasArray.push(_this.runtimeCatalogue.getDataSchemaDescriptor(descriptorDataSchema[index]));
                }

                // as soon as the previous array is completed, this will wait for the resolve of all promises in the array
                _promise2.default.all(dataSchemasArray).then(function (dataSchemas) {

                  var filteredDataSchemas = [];
                  for (var _index in dataSchemas) {
                    var dataSchema = dataSchemas[_index];
                    filteredDataSchemas.push(dataSchema.sourcePackage.sourceCode.properties.scheme.constant);
                  }

                  var hyperty = new _HypertyInstance2.default(_this.identifier, _this.registryURL, descriptorURL, descriptor, adderessList[0], userProfile);

                  hyperty._resources = resources;
                  hyperty._dataSchemes = filteredDataSchemas;
                  _this.hypertiesList.push(hyperty);

                  //message to register the new hyperty, within the domain registry
                  var messageValue = { user: identityURL, descriptor: descriptorURL, url: adderessList[0], expires: _this.expiresTime, resources: resources, dataSchemes: filteredDataSchemas };

                  /*let message = _this.messageFactory.createCreateMessageRequest(
                    _this.registryURL,
                    'domain://registry.' + _this.registryDomain + '/',
                    messageValue,
                    'policy'
                  );*/

                  var message = { type: 'create', from: _this.registryURL, to: 'domain://registry.' + _this.registryDomain + '/', body: { value: messageValue, policy: 'policy' } };

                  _this._messageBus.postMessage(message, function (reply) {
                    console.log('===> RegisterHyperty Reply: ', reply);

                    if (reply.body.code === 200) {
                      resolve(adderessList[0]);
                    } else {
                      reject('Failed to register an Hyperty');
                    }
                  });

                  //timer to keep the registration alive
                  // the time is defined by a little less than half of the expires time defined
                  var keepAliveTimer = setInterval(function () {

                    /*let message = _this.messageFactory.createCreateMessageRequest(
                      _this.registryURL,
                      'domain://registry.' + _this.registryDomain + '/',
                      messageValue,
                      'policy'
                    );*/
                    var message = { type: 'create', from: _this.registryURL, to: 'domain://registry.' + _this.registryDomain + '/', body: { value: messageValue, policy: 'policy' } };

                    _this._messageBus.postMessage(message, function (reply) {
                      console.log('===> KeepAlive Reply: ', reply);
                    });
                  }, _this.expiresTime / 1.1 / 2 * 1000);

                  console.log('Hyperty Schemas', filteredDataSchemas);
                  console.log('Hyperty resources', resources);
                });
              }).catch(function (reason) {
                console.log('Address Reason: ', reason);
                reject(reason);
              });
            });
          }
        }, function (err) {
          reject('Failed to obtain an identity');
        });
      });
    }

    /**
    * To unregister a previously registered Hyperty
    * @param  {HypertyURL}          HypertyURL url        url
    */

  }, {
    key: 'unregisterHyperty',
    value: function unregisterHyperty(url) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var found = false;
        var index = 0;

        for (index = 0; index < _this.hypertiesList.length; index++) {
          var hyperty = _this.hypertiesList[index];
          if (hyperty !== undefined) {
            if (hyperty.hypertyURL === url) {
              found = true;
              break;
            }
          }
        }

        if (found === false) {
          reject('Hyperty not found');
        } else {
          delete _this.hypertiesList[index];
          resolve('Hyperty successfully deleted');
        }
      });
    }

    /**
    * To discover protocol stubs available in the runtime for a certain domain. If available, it returns the runtime url for the protocol stub that connects to the requested domain. Required by the runtime BUS to route messages to remote servers or peers (do we need something similar for Hyperties?).
    * @param  {DomainURL}           DomainURL            url
    * @return {RuntimeURL}           RuntimeURL
    */

  }, {
    key: 'discoverProtostub',
    value: function discoverProtostub(url) {
      if (!url) throw new Error('Parameter url needed');
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var dividedURL = (0, _utils.divideURL)(url);
        var domainURL = dividedURL.domain;

        if (_this.protostubsList.hasOwnProperty(domainURL) && _this.protostubsList[domainURL].status === STATUS.DEPLOYED) {
          resolve(_this.protostubsList[domainURL]);
        } else {
          _this.protostubsList[domainURL] = {
            status: STATUS.PROGRESS
          };

          reject('requestUpdate couldn\'t get the ProtostubURL');
        }
      });
    }

    /**
     * To register a new Protocol Stub in the runtime including as input parameters the function to postMessage, the DomainURL that is connected with the stub, which returns the RuntimeURL allocated to the new ProtocolStub.
     * @param {Sandbox}        Sandbox
     * @param  {DomainURL}     DomainURL service provider domain
     * @return {RuntimeProtoStubURL}
     */

  }, {
    key: 'registerStub',
    value: function registerStub(sandbox, domainURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var runtimeProtoStubURL = void 0;

        //check if messageBus is registered in registry or not
        if (_this._messageBus === undefined) {
          reject('MessageBus not found on registerStub');
        }

        //TODO implement a unique number for the protostubURL
        if (!domainURL.indexOf('msg-node.')) {
          domainURL = domainURL.substring(domainURL.indexOf('.') + 1);
        }

        runtimeProtoStubURL = 'msg-node.' + domainURL + '/protostub/' + Math.floor(Math.random() * 10000 + 1);

        // TODO: Optimize this
        // Proxy;
        _this.protostubsList[domainURL] = {
          url: runtimeProtoStubURL,
          status: STATUS.DEPLOYED
        };

        // _this.protostubsList[domainURL] = runtimeProtoStubURL;
        _this.sandboxesList.sandbox[runtimeProtoStubURL] = sandbox;

        // sandbox.addListener('*', function(msg) {
        //   _this._messageBus.postMessage(msg);
        // });

        resolve(runtimeProtoStubURL);

        _this._messageBus.addListener(runtimeProtoStubURL + '/status', function (msg) {
          if (msg.resource === msg.to + '/status') {
            console.log('RuntimeProtostubURL/status message: ', msg.body.value);
          }
        });
      });
    }

    /**
    * To unregister a previously registered protocol stub
    * @param  {HypertyRuntimeURL}   HypertyRuntimeURL     hypertyRuntimeURL
    */

  }, {
    key: 'unregisterStub',
    value: function unregisterStub(hypertyRuntimeURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        if (_this.protostubsList.hasOwnProperty(hypertyRuntimeURL)) {
          delete _this.protostubsList[hypertyRuntimeURL];
          resolve('ProtostubURL removed');
        } else {
          reject('Error on unregisterStub: Hyperty not found');
        }
      });
    }

    /**
     * To register a new Identity Provider proxy in the runtime including as input parameters the function to postMessage, the DomainURL that is connected with the stub, which returns the RuntimeURL allocated to the new ProtocolStub.
     * @param {Sandbox}        Sandbox
     * @param  {DomainURL}     DomainURL service provider domain
     * @return {RuntimeIdpProxyURL}
     */

  }, {
    key: 'registerIdpProxy',
    value: function registerIdpProxy(sandbox, domainURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var idpProxyStubURL = void 0;

        //check if messageBus is registered in registry or not
        if (_this._messageBus === undefined) {
          reject('MessageBus not found on registerStub');
        }

        idpProxyStubURL = 'domain-idp://' + domainURL + '/stub/' + Math.floor(Math.random() * 10000 + 1);

        // TODO: Optimize this
        _this.idpProxyList[domainURL] = {
          url: idpProxyStubURL,
          status: STATUS.PROGRESS
        };

        _this.sandboxesList.sandbox[idpProxyStubURL] = sandbox;

        // sandbox.addListener('*', function(msg) {
        //   _this._messageBus.postMessage(msg);
        // });

        resolve(idpProxyStubURL);

        _this._messageBus.addListener(idpProxyStubURL + '/status', function (msg) {
          if (msg.resource === msg.to + '/status') {
            console.log('idpProxyStubURL/status message: ', msg.body.value);
          }
        });
      });
    }

    /**
    * To discover idpProxy stubs available in the runtime for a certain domain. If available, it returns the runtime url for the idpProxy stub that connects to the requested domain. Required by the runtime BUS to route messages to remote servers or peers
    * @param  {DomainURL}           DomainURL            url
    * @return {RuntimeURL}           RuntimeURL         idpProxyUrl
    */

  }, {
    key: 'discoverIdpProxy',
    value: function discoverIdpProxy(url) {
      if (!url) throw new Error('Parameter url needed');
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var dividedURL = (0, _utils.divideURL)(url);
        var domainURL = dividedURL.domain;

        if (_this.idpProxyList.hasOwnProperty(domainURL) && _this.idpProxyList[domainURL].status === STATUS.DEPLOYED) {
          resolve(_this.idpProxyList[domainURL]);
        } else {
          // TODO: Optimize this
          _this.idpProxyList[domainURL] = {
            status: STATUS.PROGRESS
          };
          reject('requestUpdate couldn\'t get the idpProxyURL');
        }
      });
    }

    /**
    * To register a new Policy Enforcer in the runtime including as input parameters the function to postMessage, the HypertyURL associated with the PEP, which returns the RuntimeURL allocated to the new Policy Enforcer component.
    * @param  {Message.Message} postMessage postMessage
    * @param  {HypertyURL}          HypertyURL            hyperty
    * @return {HypertyRuntimeURL}   HypertyRuntimeURL
    */

  }, {
    key: 'registerPEP',
    value: function registerPEP(postMessage, hyperty) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        //TODO check what parameter in the postMessage the pep is.
        _this.pepList[hyperty] = postMessage;
        resolve('PEP registered with success');
      });
    }

    /**
    * To unregister a previously registered protocol stub
    * @param  {HypertyRuntimeURL}   HypertyRuntimeURL     HypertyRuntimeURL
    */

  }, {
    key: 'unregisterPEP',
    value: function unregisterPEP(HypertyRuntimeURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var result = _this.pepList[HypertyRuntimeURL];

        if (result === undefined) {
          reject('Pep Not found.');
        } else {
          resolve('PEP successfully removed.');
        }
      });
    }

    /**
    * To receive status events from components registered in the Registry.
    * @param  {Message.Message}     Message.Message       event
    */

  }, {
    key: 'onEvent',
    value: function onEvent(event) {
      // TODO body...
      console.log('onEvent');
    }

    /**
    * To discover sandboxes available in the runtime for a certain domain. Required by the runtime UA to avoid more than one sandbox for the same domain.
    * @param  {DomainURL} DomainURL url
    * @return {RuntimeSandbox}           RuntimeSandbox
    */

  }, {
    key: 'getSandbox',
    value: function getSandbox(url) {
      if (!url) throw new Error('Parameter url needed');
      console.log('getSandbox: ', url);

      var _this = this;
      return new _promise2.default(function (resolve, reject) {

        var request = void 0;

        //first try to find the url in the appSandbox list
        request = _this.sandboxesList.appSandbox[url];

        //if no appSandbox was found, try to search in the normal sandboxes list
        if (!request) {
          request = _this.sandboxesList.sandbox[url];

          if (!request) {

            var domain = (0, _utils.divideURL)(url).domain;

            // search in the sandboxes list for a entry containing the domain given
            for (var sandbox in _this.sandboxesList.sandbox) {
              if (sandbox.includes(domain)) {
                request = _this.sandboxesList.sandbox[sandbox];
                break;
              }
            }
          }
        }

        if (!request) {
          reject('no sandbox found for: ' + url);
        } else {
          resolve(request);
        }
      });
    }

    /**
    * To verify if source is valid and to resolve target runtime url address if needed (eg protostub runtime url in case the message is to be dispatched to a remote endpoint).
    * @param  {URL.URL}  url       url
    * @return {Promise<URL.URL>}                 Promise <URL.URL>
    */

  }, {
    key: 'resolve',
    value: function resolve(url) {
      console.log('resolve ' + url);
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        //split the url to find the domainURL. deals with the url for example as:
        //"hyperty-runtime://sp1/protostub/123",
        var dividedURL = (0, _utils.divideURL)(url);
        var domainUrl = dividedURL.domain;
        var type = dividedURL.type;

        // resolve the domain protostub in case of a message to global registry
        if (url.includes('global://registry')) {
          domainUrl = _this._domain;
        }

        if (!domainUrl.indexOf('msg-node.') || !domainUrl.indexOf('registry.')) {
          domainUrl = domainUrl.substring(domainUrl.indexOf('.') + 1);
        }

        var registredComponent = void 0;
        if (type === 'domain-idp') {
          registredComponent = _this.idpProxyList.hasOwnProperty(domainUrl) ? _this.idpProxyList[domainUrl] : false;
        } else {
          registredComponent = _this.protostubsList.hasOwnProperty(domainUrl) ? _this.protostubsList[domainUrl] : false;
        }

        if (registredComponent && registredComponent.hasOwnProperty('status') && registredComponent.status === STATUS.DEPLOYED) {
          console.info('Resolved: ', registredComponent.url);
          resolve(registredComponent.url);
        } else {
          if (type === 'domain-idp') {
            // _this.trigger('runtime:loadIdpProxy', domainUrl);

            _this._loader.loadIdpProxy(domainUrl).then(function (result) {
              registredComponent = _this.idpProxyList[domainUrl];
              console.info('Resolved IDPProxy: ', registredComponent, result);
              _this.idpProxyList[domainUrl].status = STATUS.DEPLOYED;
              resolve(registredComponent.url);
            }).catch(function (reason) {
              console.error('Error resolving IDPProxy: ', reason);
              reject(reason);
            });
          } else {
            // _this.trigger('runtime:loadStub', domainUrl);

            _this._loader.loadStub(domainUrl).then(function (result) {
              registredComponent = _this.protostubsList[domainUrl];
              console.info('Resolved Protostub: ', registredComponent, result);
              _this.protostubsList[domainUrl].status = STATUS.DEPLOYED;
              resolve(registredComponent.url);
            }).catch(function (reason) {
              console.error('Error resolving Protostub: ', reason);
              reject(reason);
            });
          }
        }
      });
    }
  }, {
    key: 'loader',
    set: function set(loader) {
      var _this = this;
      _this._loader = loader;
    },
    get: function get() {
      var _this = this;
      return _this._loader;
    }

    /**
    * return the messageBus in this Registry
    * @param {MessageBus}           messageBus
    */

  }, {
    key: 'messageBus',
    get: function get() {
      var _this = this;
      return _this._messageBus;
    }

    /**
    * Set the messageBus in this Registry
    * @param {MessageBus}           messageBus
    */
    ,
    set: function set(messageBus) {
      var _this = this;
      _this._messageBus = messageBus;

      _this._messageBus.addListener(_this.registryURL, function (msg) {

        var userUrl = _this._getIdentityAssociated(msg.body.resource, msg.body.criteria);

        var reply = { id: msg.id, type: 'response', to: msg.from, from: msg.to, body: { resource: userUrl } };
        reply.body.code = userUrl ? 200 : 404;

        _this._messageBus.postMessage(reply);
      });

      // also set up messageBus in the IdentityModule component
      // TODO redefine a better way to add the messageBus in the IdModule
      _this.idModule.messageBus = messageBus;

      // Install AddressAllocation
      var addressAllocation = new _AddressAllocation2.default(_this.registryURL, messageBus);
      _this.addressAllocation = addressAllocation;

      //Install ObjectAllocation
      var objectAllocation = new _ObjectAllocation2.default(_this.registryURL + '/object-allocation', messageBus);
      _this.objectAllocation = objectAllocation;

      /*let discovery = new Discovery(_this.registryURL, messageBus);
      _this.discovery = discovery;
       let identityManager = new IdentityManager('hyperty://localhost/833a6e52-515b-498b-a57b-e3daeece48d2', _this.runtimeURL, messageBus);
      _this.identityManager = identityManager;*/
    }
  }]);
  return Registry;
}();

exports.default = Registry;
module.exports = exports['default'];

},{"../syncher/ObjectAllocation":446,"../utils/utils.js":452,"./AddressAllocation":438,"./HypertyInstance":439,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"service-framework/dist/MessageFactory":416}],441:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
/**
*   @author: Gil Dias (gil.dias@tecnico.ulisboa.pt)
*   Registry Data Model includes all Objects to be handled by the Registry functionality including
*/
var RegistryDataModel = function () {
  function RegistryDataModel(id, url, descriptorURL, startingTime, lastModified, status, stubs, stubsConfiguration) {
    (0, _classCallCheck3.default)(this, RegistryDataModel);

    var _this = this;

    _this._id = id;
    _this._url = url;
    _this._descriptorURL = descriptorURL;
    _this._startingTime = startingTime;
    _this._lastModified = lastModified;
    _this._status = status;
    _this._stubs = stubs;
    _this._stubsConfiguration = stubsConfiguration;
  }

  (0, _createClass3.default)(RegistryDataModel, [{
    key: "id",
    get: function get() {
      var _this = this;
      return _this._id;
    }
  }, {
    key: "url",
    get: function get() {
      var _this = this;
      return _this._url;
    }
  }, {
    key: "descriptor",
    get: function get() {
      var _this = this;
      return _this._descriptorURL;
    }
  }]);
  return RegistryDataModel;
}();

exports.default = RegistryDataModel;
module.exports = exports["default"];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],442:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Descriptors = function () {
  function Descriptors(runtimeURL, catalogue, runtimeConfiguration) {
    (0, _classCallCheck3.default)(this, Descriptors);

    if (!runtimeURL) throw Error('The descriptor need to know the runtime url to be used');
    if (!catalogue) throw Error('The descriptor needs the catalogue instance');
    if (!runtimeConfiguration) throw Error('The descriptor needs the runtime configuration');

    this.runtimeConfiguration = runtimeConfiguration;
    this.runtimeURL = runtimeURL;
    this.catalogue = catalogue;
  }

  (0, _createClass3.default)(Descriptors, [{
    key: 'getHypertyDescriptor',
    value: function getHypertyDescriptor(hypertyURL) {
      return this.catalogue.getHypertyDescriptor(hypertyURL);
    }
  }, {
    key: 'getStubDescriptor',
    value: function getStubDescriptor(stubURL) {
      var dividedURL = (0, _utils.divideURL)(stubURL);
      var domain = dividedURL.domain;
      var protostub = dividedURL.identity;
      var protoStubURL = void 0;

      if (!protostub) {
        protostub = 'default';
      } else {
        protostub = protostub.substring(protostub.lastIndexOf('/') + 1);
      }

      protoStubURL = (0, _utils.buildURL)(this.runtimeConfiguration, 'catalogueURLs', 'protocolstub', protostub);
      if (domain !== this.runtimeConfiguration.domain) {
        if (!stubURL.indexOf('https') || !stubURL.indexOf('hyperty-catalogue')) {
          protoStubURL = stubURL;
        } else {

          // TODO: check how to load form different configuration domain
          var resource = (0, _utils.getConfigurationResources)(this.runtimeConfiguration, 'catalogueURLs', 'protocolstub');
          protoStubURL = resource.prefix + domain + resource.suffix + protostub;
        }
      }
      console.log('Load ProtocolStub for domain, ' + domain + ' : ', protoStubURL);
      return this.catalogue.getStubDescriptor(protoStubURL);
    }
  }, {
    key: 'getIdpProxyDescriptor',
    value: function getIdpProxyDescriptor(idpProxyURL) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        var dividedURL = (0, _utils.divideURL)(idpProxyURL);
        var domain = dividedURL.domain;
        var idpproxy = dividedURL.identity;

        var originDividedURL = (0, _utils.divideURL)(_this.runtimeURL);
        var originDomain = originDividedURL.domain;

        if (!domain) {
          domain = idpProxyURL;
        }

        if (domain === originDomain || !idpproxy) {
          idpproxy = 'default';
        } else {
          idpproxy = idpproxy.substring(idpproxy.lastIndexOf('/') + 1);
        }

        var resource = (0, _utils.getConfigurationResources)(_this.runtimeConfiguration, 'catalogueURLs', 'idpProxy');

        idpProxyURL = resource.prefix + domain + resource.suffix + idpproxy;
        console.log('Load Idp Proxy for domain, ' + domain + ' : ', idpProxyURL);
        return _this.catalogue.getIdpProxyDescriptor(idpProxyURL).then(function (result) {

          resolve(result);
        }).catch(function () {

          idpproxy = domain;
          domain = originDomain;

          idpProxyURL = (0, _utils.buildURL)(_this.runtimeConfiguration, 'catalogueURLs', 'idpProxy', idpproxy);

          console.log('Load Idp Proxy for domain, ' + domain + ' : ', idpProxyURL);
          return _this.catalogue.getIdpProxyDescriptor(idpProxyURL);
        }).then(function (result) {
          resolve(result);
        }).catch(function (reason) {
          reject(reason);
        });
      });
    }
  }]);
  return Descriptors;
}();

exports.default = Descriptors;
module.exports = exports['default'];

},{"../utils/utils":452,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],443:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

var _Descriptors = require('./Descriptors');

var _Descriptors2 = _interopRequireDefault(_Descriptors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function () {
  function Loader(runtimeConfiguration) {
    (0, _classCallCheck3.default)(this, Loader);

    if (!runtimeConfiguration) throw Error('The descriptor need to know the runtime configuration');
    this.runtimeConfiguration = runtimeConfiguration;
  }

  /**
   * Set runtime url
   * @param  {string} value runtimeURL
   */


  (0, _createClass3.default)(Loader, [{
    key: 'loadHyperty',


    /**
    * Deploy Hyperty from Catalogue URL
    * @param  {URL.HypertyCatalogueURL}    hyperty hypertyDescriptor url;
    */
    value: function loadHyperty(hypertyDescriptorURL) {
      var _this = this;

      if (!this._readyToUse()) return false;
      if (!hypertyDescriptorURL) throw new Error('Hyperty descriptor url parameter is needed');

      return new _promise2.default(function (resolve, reject) {

        var _hypertyURL = void 0;
        var _hypertySandbox = void 0;
        var _hypertyDescriptor = void 0;
        var _hypertySourcePackage = void 0;
        var haveError = false;

        var errorReason = function errorReason(reason) {
          console.error('Something failed on the deploy hyperty: ', reason);
          reject(reason);
        };

        var handleError = function handleError(reason) {
          haveError = true;
          reject(reason);
        };

        // Get Hyperty descriptor
        // TODO: the request Module should be changed,
        // because at this moment it is incompatible with nodejs;
        // Probably we need to pass a factory like we do for sandboxes;
        console.info('------------------ Hyperty ------------------------');
        console.info('Get hyperty descriptor for :', hypertyDescriptorURL);
        return _this.descriptors.getHypertyDescriptor(hypertyDescriptorURL).then(function (hypertyDescriptor) {
          // at this point, we have completed "step 2 and 3" as shown in https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md
          console.info('1: return hyperty descriptor');

          // hyperty contains the full path of the catalogue URL, e.g.
          // catalogue.rethink.eu/.well-known/..........
          _hypertyDescriptor = hypertyDescriptor;

          var sourcePackageURL = hypertyDescriptor.sourcePackageURL;

          if (sourcePackageURL === '/sourcePackage') {
            return hypertyDescriptor.sourcePackage;
          }

          // Get the hyperty source code
          return _this.runtimeCatalogue.getSourcePackageFromURL(sourcePackageURL);
        }, handleError).then(function (sourcePackage) {
          if (haveError) return false;

          console.info('2: return hyperty source code');

          // at this point, we have completed "step 4 and 5" as shown in https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md

          _hypertySourcePackage = sourcePackage;

          //
          // steps 6 -- 9 are skipped.
          // TODO: on release of core 0.2;
          // TODO: Promise to check the policy engine

          // mock-up code;
          // temporary code, only
          var policy = true;

          return policy;
        }, handleError).then(function (policyResult) {
          if (haveError) return false;
          console.info('3: return policy engine result' + policyResult);

          // we have completed step 6 to 9 of https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.
          //
          // Steps 6 -- 9
          // As a result of the sipped steps, we know at this point if we execute
          // inSameSandbox or not.
          //

          // For testing, just assume we execute in same Sandbox.
          var inSameSandbox = true;
          var sandbox = void 0;

          if (inSameSandbox) {

            // this don't need be a Promise;
            sandbox = _this.registry.getAppSandbox();

            // we have completed step 11 here.
          } else {

            var domain = (0, _utils.divideURL)(hypertyDescriptorURL).domain;

            // getSandbox, this will return a promise;
            sandbox = _this.registry.getSandbox(domain);
          }

          // this will return the sandbox or one promise to getSandbox;
          return sandbox;
        }, handleError).then(function (sandbox) {
          if (haveError) return false;
          console.info('4: return the sandbox', sandbox);

          // Return the sandbox indepentely if it running in the same sandbox or not
          // we have completed step 14 here.
          return sandbox;
        }, function (reason) {
          if (haveError) return false;
          console.error('4.1: Try to register a new sandbox');

          // check if the sandbox is registed for this hyperty descriptor url;
          // Make Steps xxx --- xxx
          // Instantiate the Sandbox
          var sandbox = _this._runtimeFactory.createSandbox();

          sandbox.addListener('*', function (msg) {
            _this.messageBus.postMessage(msg);
          });

          return sandbox;
        }, handleError).then(function (sandbox) {
          if (haveError) return false;
          console.info('5: return sandbox and register');

          _hypertySandbox = sandbox;

          // Register hyperty
          return _this.registry.registerHyperty(sandbox, hypertyDescriptorURL, _hypertyDescriptor);
        }, handleError).then(function (hypertyURL) {
          if (haveError) return false;
          console.info('6: Hyperty url, after register hyperty', hypertyURL);

          // we have completed step 16 of https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.
          _hypertyURL = hypertyURL;

          // Extend original hyperty configuration;
          var configuration = {};
          if (!(0, _utils.emptyObject)(_hypertyDescriptor.configuration)) {
            try {
              configuration = (0, _assign2.default)({}, JSON.parse(_hypertyDescriptor.configuration));
            } catch (e) {
              configuration = _hypertyDescriptor.configuration;
            }
          }
          configuration.runtimeURL = _this._runtimeURL;

          // We will deploy the component - step 17 of https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.

          try {
            return _hypertySandbox.deployComponent(_hypertySourcePackage.sourceCode, _hypertyURL, configuration);
          } catch (e) {
            console.error('Error on deploy component:', e);
            reject(e);
          }
        }, handleError).then(function (deployComponentStatus) {
          if (haveError) return false;
          console.info('7: Deploy component status for hyperty: ', deployComponentStatus);

          // we have completed step 19 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.

          // Add the message bus listener to the appSandbox or hypertSandbox;
          _this.messageBus.addListener(_hypertyURL, function (msg) {
            _hypertySandbox.postMessage(msg);
          });

          // we have completed step 20 of https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.
          var hyperty = {
            runtimeHypertyURL: _hypertyURL,
            status: deployComponentStatus
          };

          resolve(hyperty);

          // we have completed step 21 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-hyperty.md right now.
          console.info('------------------ END ------------------------');
        }, handleError).catch(errorReason);
      });
    }

    /**
    * Deploy Stub from Catalogue URL or domain url
    * @param  {URL.URL}     domain          domain
    */

  }, {
    key: 'loadStub',
    value: function loadStub(protostubURL) {
      var _this2 = this;

      if (!this._readyToUse()) return false;
      if (!protostubURL) throw new Error('ProtoStub descriptor url parameter is needed');

      return new _promise2.default(function (resolve, reject) {

        var domain = (0, _utils.divideURL)(protostubURL).domain;

        if (!domain) {
          domain = protostubURL;
        }

        var _stubSandbox = void 0;
        var _stubDescriptor = void 0;
        var _runtimeProtoStubURL = void 0;
        var _stubSourcePackage = void 0;
        var haveError = false;

        var errorReason = function errorReason(reason) {
          console.error('Something failed on the deploy of protocolstub: ', reason);
          reject(reason);
        };

        var handleError = function handleError(reason) {
          haveError = true;
          reject(reason);
        };

        // Discover Protocol Stub
        console.info('------------------- ProtoStub ---------------------------\n');
        console.info('Discover or Create a new ProtoStub for domain: ', domain);
        _this2.registry.discoverProtostub(domain).then(function (runtimeProtoStubURL) {
          // Is registed?
          console.info('1. Proto Stub Discovered for ', domain, ': ', runtimeProtoStubURL);

          // we have completed step 2 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

          // TODO: Check if the status is saved in the status of sandbox;
          // let stub = {
          //   runtimeProtoStubURL: runtimeProtoStubURL,
          //   status: 'deployed'
          // };
          var stub = _this2.registry.protostubsList[domain];
          resolve(stub);
          console.info('------------------- END ---------------------------\n');
        }).catch(function (reason) {

          // is not registed?
          console.info('1. Proto Stub not found ' + reason);

          // we have completed step 3 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

          // we need to get ProtoStub descriptor step 4 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
          _this2.descriptors.getStubDescriptor(protostubURL).then(function (stubDescriptor) {
            if (haveError) return false;
            console.info('2. return the ProtoStub descriptor');

            // we have completed step 5 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            _stubDescriptor = stubDescriptor;

            var sourcePackageURL = stubDescriptor.sourcePackageURL;

            if (sourcePackageURL === '/sourcePackage') {
              return stubDescriptor.sourcePackage;
            }

            // we need to get ProtoStub Source code from descriptor - step 6 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            return _this2.runtimeCatalogue.getSourcePackageFromURL(sourcePackageURL);
          }, handleError).catch(errorReason).then(function (stubSourcePackage) {
            if (haveError) return false;
            console.info('3. return the ProtoStub Source Code');

            // we have completed step 7 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            _stubSourcePackage = stubSourcePackage;

            // TODO: Check on PEP (policy Engine) if we need the sandbox and check if the Sandbox Factory have the context sandbox;
            var policy = true;
            return policy;
          }, handleError).then(function (policy) {
            if (haveError) return false;

            // this will return the sandbox or one promise to getSandbox;
            return _this2.registry.getSandbox(domain);
          }).then(function (stubSandbox) {
            if (haveError) return false;
            console.info('4. if the sandbox is registered then return the sandbox ', stubSandbox);

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            _stubSandbox = stubSandbox;
            return stubSandbox;
          }).catch(function (reason) {
            if (haveError) return false;
            console.info('5. Sandbox was not found, creating a new one ', reason);

            // check if the sandbox is registed for this stub descriptor url;
            // Make Steps xxx --- xxx
            // Instantiate the Sandbox
            var sandbox = _this2._runtimeFactory.createSandbox();
            sandbox.addListener('*', function (msg) {
              _this2.messageBus.postMessage(msg);
            });

            return sandbox;
          }).then(function (sandbox) {
            if (haveError) return false;
            console.info('6. return the sandbox instance and register', sandbox, 'to domain ', domain);

            _stubSandbox = sandbox;

            // we need register stub on registry - step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            return _this2.registry.registerStub(_stubSandbox, domain);
          }, handleError).then(function (runtimeProtoStubURL) {
            if (haveError) return false;
            console.info('7. return the runtime protostub url: ', runtimeProtoStubURL);

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            _runtimeProtoStubURL = runtimeProtoStubURL;

            // Extend original hyperty configuration;
            var configuration = {};
            if (!(0, _utils.emptyObject)(_stubDescriptor.configuration)) {
              try {
                configuration = (0, _assign2.default)({}, JSON.parse(_stubDescriptor.configuration));
              } catch (e) {
                configuration = _stubDescriptor.configuration;
              }
            }

            configuration.runtimeURL = _this2._runtimeURL;

            // Deploy Component step xxx
            try {
              return _stubSandbox.deployComponent(_stubSourcePackage.sourceCode, runtimeProtoStubURL, configuration);
            } catch (e) {
              console.error('Error on deploy component:', e);
              reject(e);
            }
          }, handleError).then(function (deployComponentStatus) {
            if (haveError) return false;
            console.info('8: return deploy component for sandbox status: ', deployComponentStatus);

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            // Add the message bus listener
            _this2.messageBus.addListener(_runtimeProtoStubURL, function (msg) {
              _stubSandbox.postMessage(msg);
            });

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            var stub = _this2.registry.protostubsList[domain];

            // // Load Stub function resolved with success;
            // let stub = {
            //   runtimeProtoStubURL: _runtimeProtoStubURL,
            //   status: deployComponentStatus
            // };

            console.log('Deployed: ', stub, domain, _this2.registry.protostubsList);

            resolve(stub);
            console.info('------------------- END ---------------------------\n');
          }, handleError).catch(errorReason);
        });
      });
    }

    /**
    * Deploy idpProxy from Catalogue URL or domain url
    * @param  {URL.URL}     domain          domain
    */

  }, {
    key: 'loadIdpProxy',
    value: function loadIdpProxy(idpProxyURL) {
      var _this3 = this;

      if (!this._readyToUse()) return false;
      if (!idpProxyURL) throw new Error('IdpProxy descriptor url parameter is needed');

      return new _promise2.default(function (resolve, reject) {

        var domain = (0, _utils.divideURL)(idpProxyURL).domain;

        if (!domain) {
          domain = idpProxyURL;
        }

        var _proxySandbox = void 0;
        var _proxyDescriptor = void 0;
        var _runtimeIdpProxyURL = void 0;
        var _proxySourcePackage = void 0;
        var haveError = false;

        var errorReason = function errorReason(reason) {
          console.error('Something failed on the deploy of IdpProxy: ', reason);
          reject(reason);
        };

        var handleError = function handleError(reason) {
          haveError = true;
          reject(reason);
        };

        // Discover IDPProxy
        console.info('------------------- IDP Proxy Deploy ---------------------------\n');
        console.info('Discover or Create a new IdpProxy for domain/URL: ', domain);
        return _this3.registry.discoverIdpProxy(domain).then(function (runtimeIdpProxyURL) {
          // Is registed?
          console.info('1. IDPProxy Discovered: ', runtimeIdpProxyURL);

          // we have completed step 2 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

          var idpProxy = _this3.registry.idpProxyList[domain];
          console.log('Deployed: ', idpProxy);

          resolve(idpProxy);
          console.info('------------------- END ---------------------------\n');
        }).catch(function (reason) {

          // is not registed?
          console.info('1. IdpProxy not found:', reason);

          // we have completed step 3 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

          // we need to get ProtoStub descriptor step 4 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
          _this3.descriptors.getIdpProxyDescriptor(idpProxyURL).then(function (proxyDescriptor) {

            console.info('2. Return the IDPProxy descriptor');

            // we have completed step 5 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            _proxyDescriptor = proxyDescriptor;

            var sourcePackageURL = proxyDescriptor.sourcePackageURL;

            if (sourcePackageURL === '/sourcePackage') {
              return proxyDescriptor.sourcePackage;
            }

            // we need to get ProtoStub Source code from descriptor - step 6 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            return _this3.runtimeCatalogue.getSourcePackageFromURL(sourcePackageURL);
          }, handleError).then(function (sourcePackage) {
            if (haveError) return false;
            console.info('3. return the IDPProxy source package');

            // we have completed step 7 https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            _proxySourcePackage = sourcePackage;

            // TODO: Check on PEP (policy Engine) if we need the sandbox and check if the Sandbox Factory have the context sandbox;
            var policy = true;
            return policy;
          }, handleError).then(function (policy) {
            if (haveError) return false;

            // this will return the sandbox or one promise to getSandbox;
            return _this3.registry.getSandbox(domain);
          }).then(function (proxySandbox) {
            if (haveError) return false;
            console.info('4. if the sandbox is registered then return the sandbox', proxySandbox);

            _proxySandbox = proxySandbox;
            return proxySandbox;
          }).catch(function (reason) {
            if (haveError) return false;
            console.info('5. Sandbox was not found, creating a new one', reason);

            // check if the sandbox is registed for this proxy descriptor url;
            // Make Steps xxx --- xxx
            // Instantiate the Sandbox
            var sandbox = _this3._runtimeFactory.createSandbox();
            sandbox.addListener('*', function (msg) {
              _this3.messageBus.postMessage(msg);
            });

            return sandbox;
          }).then(function (sandbox) {
            if (haveError) return false;
            console.info('6. return the sandbox instance and register', sandbox, 'to domain ', domain);

            _proxySandbox = sandbox;

            // we need register stub on registry - step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md
            return _this3.registry.registerIdpProxy(sandbox, domain);
          }, handleError).then(function (runtimeIdpProxyURL) {
            if (haveError) return false;
            console.info('7. Return the runtime Idp Proxy URL: ', runtimeIdpProxyURL);

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            _runtimeIdpProxyURL = runtimeIdpProxyURL;

            // Extend original hyperty configuration;
            var configuration = {};
            if (!(0, _utils.emptyObject)(_proxyDescriptor.configuration)) {
              try {
                configuration = (0, _assign2.default)({}, JSON.parse(_proxyDescriptor.configuration));
              } catch (e) {
                configuration = _proxyDescriptor.configuration;
              }
            }
            configuration.runtimeURL = _this3._runtimeURL;

            // Deploy Component step xxx
            try {
              return _proxySandbox.deployComponent(_proxySourcePackage.sourceCode, runtimeIdpProxyURL, configuration);
            } catch (e) {
              console.error('Error on deploy component:', e);
              reject(e);
            }
          }, handleError).then(function (deployComponentStatus) {
            if (haveError) return false;
            console.info('8: return deploy component for sandbox status: ', deployComponentStatus);

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            // Add the message bus listener
            _this3.messageBus.addListener(_runtimeIdpProxyURL, function (msg) {
              _proxySandbox.postMessage(msg);
            });

            // we have completed step xxx https://github.com/reTHINK-project/core-framework/blob/master/docs/specs/runtime/dynamic-view/basics/deploy-protostub.md

            // Load Stub function resolved with success;
            // let idpProxy = {
            //   runtimeIdpProxyURL: _runtimeIdpProxyURL,
            //   status: deployComponentStatus
            // };

            _this3.registry.idpProxyList[domain].status = 'deployed';
            var idpProxy = _this3.registry.idpProxyList[domain];

            console.log('Deployed: ', idpProxy);

            resolve(idpProxy);
            console.info('------------------- END ---------------------------\n');
          }, handleError).catch(errorReason);
        });
      });
    }

    // Check if the loader is ready to load all components

  }, {
    key: '_readyToUse',
    value: function _readyToUse() {

      var status = false;

      if (!this._runtimeURL) throw new Error('The loader need the runtime url address');
      if (!this._messagesBus) throw new Error('The loader need the messageBus component');
      if (!this._runtimeCatalogue) throw new Error('The loader need the runtimeCatalogue component');
      if (!this._registry) throw new Error('The loader need the registry component');
      if (!this._runtimeFactory) throw new Error('The loader need the runtime factory component');

      status = true;
      return status;
    }
  }, {
    key: 'runtimeURL',
    set: function set(value) {
      this._runtimeURL = value;
    }

    /**
     * Get runtime url
     * @return {string} value runtimeURL
     */
    ,
    get: function get() {
      return this._runtimeURL;
    }

    /**
     * Set Registry component
     * @param  {Registry} value Registry Component
     */

  }, {
    key: 'registry',
    set: function set(value) {
      this._registry = value;
    }

    /**
     * Get Registry component
     * @return {Registry} Registry component
     */
    ,
    get: function get() {
      return this._registry;
    }

    /**
     * Set Runtime Catalogue Component
     * @param  {RuntimeCatalogue} value runtime catalogue component
     */

  }, {
    key: 'runtimeCatalogue',
    set: function set(value) {
      this._runtimeCatalogue = value;

      this.descriptors = new _Descriptors2.default(this._runtimeURL, value, this.runtimeConfiguration);
    }

    /**
     * Get Runtime Catalogue component
     * @return {RuntimeCatalogue} Runtime Catalogue component
     */
    ,
    get: function get() {
      return this._runtimeCatalogue;
    }

    /**
     * Set Message Bus component
     * @param  {MessageBus} value Message bus component
     */

  }, {
    key: 'messageBus',
    set: function set(value) {
      this._messagesBus = value;
    }

    /**
     * Get Message Bus component
     * @return {MessageBus} Message Bus component
     */
    ,
    get: function get() {
      return this._messagesBus;
    }

    /**
     * Set Runtime Factory component
     * @param  {runtimeFactory} value Factory includes the specific implementations for each environment
     */

  }, {
    key: 'runtimeFactory',
    set: function set(value) {
      this._runtimeFactory = value;
    }

    /**
     * Get Runtime Factory component
     * @return {runtimeFactory} Runtime Factory component
     */
    ,
    get: function get() {
      return this._runtimeFactory;
    }
  }]);
  return Loader;
}();

exports.default = Loader;
module.exports = exports['default'];

},{"../utils/utils":452,"./Descriptors":442,"babel-runtime/core-js/object/assign":298,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],444:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('babel-polyfill');

var _Registry = require('../registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _IdentityModule = require('../identity/IdentityModule');

var _IdentityModule2 = _interopRequireDefault(_IdentityModule);

var _PEP = require('../policy/PEP');

var _PEP2 = _interopRequireDefault(_PEP);

var _MessageBus = require('../bus/MessageBus');

var _MessageBus2 = _interopRequireDefault(_MessageBus);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _runtimeConfiguration = require('./runtimeConfiguration');

var _SyncherManager = require('../syncher/SyncherManager');

var _SyncherManager2 = _interopRequireDefault(_SyncherManager);

var _RuntimeCoreCtx = require('../policy/context/RuntimeCoreCtx');

var _RuntimeCoreCtx2 = _interopRequireDefault(_RuntimeCoreCtx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runtime User Agent Interface will process all the dependecies of the core runtime;
 * @author Vitor Silva [vitor-t-silva@telecom.pt]
 * @version 0.4.0
 *
 * @property {runtimeFactory} runtimeFactory - Specific implementation for all environments;
 * @property {RuntimeCatalogue} runtimeCatalogue - Catalogue of components can be installed;
 * @property {runtimeURL} runtimeURL - This identify the core runtime, should be unique;
 * @property {IdentityModule} identityModule - Identity Module;
 * @property {PEP} policyEngine - Policy Engine Module;
 * @property {Registry} registry - Registry Module;
 * @property {MessageBus} messageBus - Message Bus is used like a router to redirect the messages from one component to other(s)
 * @property {GraphConnector} graphConnector - Graph Connector handling GUID and contacts
 */

// import GraphConnector from '../graphconnector/GraphConnector';

//Main dependecies
var RuntimeUA = function () {

  /**
   * Create a new instance of Runtime User Agent
   * @param {runtimeFactory} runtimeFactory - Specific implementation for the environment where the core runtime will run;
   * @param {domain} domainURL - specify the domain base for the runtime;
   */
  function RuntimeUA(runtimeFactory, domain) {
    (0, _classCallCheck3.default)(this, RuntimeUA);


    if (!runtimeFactory) throw new Error('The sandbox factory is a needed parameter');
    if (!domain) throw new Error('You need the domain of runtime');

    var _this = this;

    // Configuration object with information related with servers
    _this.runtimeConfiguration = (0, _assign2.default)({ domain: domain }, _runtimeConfiguration.runtimeConfiguration);

    _this.runtimeFactory = runtimeFactory;
    _this.runtimeCatalogue = runtimeFactory.createRuntimeCatalogue();
    _this.persistenceManager = runtimeFactory.persistenceManager();

    // Prepare the loader to load the hyperties, protostubs and idpproxy;
    _this.loader = new _Loader2.default(_this.runtimeConfiguration);

    // TODO: post and return registry/hypertyRuntimeInstance to and from Back-end Service
    // the response is like: runtime://sp1/123

    var runtimeURL = 'runtime://' + domain + '/' + Math.floor(Math.random() * 10000 + 1);
    _this.runtimeURL = runtimeURL;
    _this.domain = domain;

    // TODO: check if runtime catalogue need the runtimeURL;
    _this.runtimeCatalogue.runtimeURL = runtimeURL;

    // Instantiate the identity Module
    _this.identityModule = new _IdentityModule2.default(runtimeURL);

    // Use the sandbox factory to create an AppSandbox;
    // In the future can be decided by policyEngine if we need
    // create a AppSandbox or not;
    var appSandbox = runtimeFactory.createAppSandbox();

    // Instantiate the Registry Module
    _this.registry = new _Registry2.default(runtimeURL, appSandbox, _this.identityModule, _this.runtimeCatalogue);

    // Set the loader to load Hyperties, Stubs and IdpProxies
    _this.registry.loader = _this.loader;

    // Instantiate the Message Bus
    _this.messageBus = new _MessageBus2.default(_this.registry);

    // Instantiate the Policy Engine
    _this.policyEngine = new _PEP2.default(new _RuntimeCoreCtx2.default(_this.identityModule, _this.registry, _this.persistenceManager));

    _this.messageBus.pipeline.handlers = [

    // Policy message authorise
    function (ctx) {
      _this.policyEngine.authorise(ctx.msg).then(function (changedMgs) {
        ctx.msg = changedMgs;
        ctx.next();
      }).catch(function (reason) {
        console.error(reason);
        ctx.fail(reason);
      });
    }];

    // Add to App Sandbox the listener;
    appSandbox.addListener('*', function (msg) {
      _this.messageBus.postMessage(msg);
    });

    // Register messageBus on Registry
    _this.registry.messageBus = _this.messageBus;

    // Register registry on IdentityModule
    _this.identityModule.registry = _this.registry;

    // Use sandbox factory to use specific methods
    // and set the message bus to the factory
    runtimeFactory.messageBus = _this.messageBus;

    // Instanciate the SyncherManager;
    _this.syncherManager = new _SyncherManager2.default(_this.runtimeURL, _this.messageBus, _this.registry, _this.runtimeCatalogue);

    // Set into loader the needed components;
    _this.loader.registry = _this.registry;
    _this.loader.runtimeURL = _this.runtimeURL;
    _this.loader.messageBus = _this.messageBus;
    _this.loader.runtimeCatalogue = _this.runtimeCatalogue;
    _this.loader.runtimeFactory = _this.runtimeFactory;

    // Instantiate the Graph Connector
    // _this.graphConnector = new GraphConnector(_this.runtimeURL, _this.messageBus);
  }

  /**
  * Accomodate interoperability in H2H and proto on the fly for newly discovered devices in M2M
  * @param  {CatalogueDataObject.HypertyDescriptor}   descriptor    descriptor
  */


  (0, _createClass3.default)(RuntimeUA, [{
    key: 'discoverHiperty',
    value: function discoverHiperty(descriptor) {}
    // Body...


    /**
    * Register Hyperty deployed by the App that is passed as input parameter. To be used when App and Hyperties are from the same domain otherwise the RuntimeUA will raise an exception and the App has to use the loadHyperty(..) function.
    * @param  {Object} Object                   hypertyInstance
    * @param  {URL.HypertyCatalogueURL}         descriptor      descriptor
    */

  }, {
    key: 'registerHyperty',
    value: function registerHyperty(hypertyInstance, descriptor) {}
    // Body...


    /**
    * Deploy Hyperty from Catalogue URL
    * @param  {URL.HypertyCatalogueURL}    hyperty hypertyDescriptor url;
    */

  }, {
    key: 'loadHyperty',
    value: function loadHyperty(hypertyDescriptorURL) {
      var _this2 = this;

      if (!hypertyDescriptorURL) throw new Error('Hyperty descriptor url parameter is needed');

      return new _promise2.default(function (resolve, reject) {

        _this2.loader.loadHyperty(hypertyDescriptorURL).then(function (result) {
          resolve(result);
        }).catch(function (reason) {
          reject(reason);
        });
      });
    }

    /**
    * Deploy Stub from Catalogue URL or domain url
    * @param  {URL.URL}     domain          domain
    */

  }, {
    key: 'loadStub',
    value: function loadStub(protostubURL) {
      var _this3 = this;

      if (!protostubURL) throw new Error('ProtoStub descriptor url parameter is needed');

      return new _promise2.default(function (resolve, reject) {

        _this3.loader.loadStub(protostubURL).then(function (result) {
          resolve(result);
        }).catch(function (reason) {
          reject(reason);
        });
      });
    }

    /**
    * Deploy idpProxy from Catalogue URL or domain url
    * @param  {URL.URL}     domain          domain
    */

  }, {
    key: 'loadIdpProxy',
    value: function loadIdpProxy(idpProxyURL) {
      var _this4 = this;

      if (!idpProxyURL) throw new Error('The IDP Proxy URL is a needed parameter, could be a DOMAIN or a URL');

      return new _promise2.default(function (resolve, reject) {
        _this4.loader.loadIdpProxy(idpProxyURL).then(function (result) {
          resolve(result);
        }).catch(function (reason) {
          reject(reason);
        });
      });
    }

    /**
     * Used to close all the runtime; Unregister all hyperties;
     * @return {Promise<Boolean>} result of the close method, with true or false to the operation success;
     */

  }, {
    key: 'close',
    value: function close() {
      var _this = this;

      console.info('Unregister all hyperties');
      return new _promise2.default(function (resolve, reject) {

        _this.registry.unregisterAllHyperties().then(function (result) {
          console.info('All the hyperties are unregisted with Success:', result);
          resolve(true);
        }).catch(function (reason) {
          console.error('Failed to unregister the hyperties', reason);
          reject(false);
        });
      });
    }

    /**
    * Used to check for updates about components handled in the Catalogue including protocol stubs and Hyperties. check relationship with lifecycle management provided by Service Workers
    * @param  {CatalogueURL}       url url
    */

  }, {
    key: 'checkForUpdate',
    value: function checkForUpdate(url) {
      // Body...
    }
  }]);
  return RuntimeUA;
}(); /**
     * Copyright 2016 PT Inovação e Sistemas SA
     * Copyright 2016 INESC-ID
     * Copyright 2016 QUOBIS NETWORKS SL
     * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
     * Copyright 2016 ORANGE SA
     * Copyright 2016 Deutsche Telekom AG
     * Copyright 2016 Apizee
     * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     **/

exports.default = RuntimeUA;
module.exports = exports['default'];

},{"../bus/MessageBus":418,"../identity/IdentityModule":423,"../policy/PEP":427,"../policy/context/RuntimeCoreCtx":437,"../registry/Registry":440,"../syncher/SyncherManager":450,"./Loader":443,"./runtimeConfiguration":445,"babel-polyfill":1,"babel-runtime/core-js/object/assign":298,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],445:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var runtimeConfiguration = exports.runtimeConfiguration = {

  runtimeURLS: {
    registry: {
      prefix: 'hyperty-runtime://',
      suffix: 'registry'
    },
    identityModule: {
      prefix: 'hyperty-runtime://',
      suffix: '/idm'
    },
    runtimeUA: {
      prefix: 'hyperty-runtime://',
      suffix: '/ua'
    },
    catalogue: {
      prefix: 'hyperty-runtime://',
      suffix: '/catalogue'
    },
    graphConnector: {
      prefix: 'hyperty-runtime://',
      suffix: '/graph'
    },
    syncManager: {
      prefix: 'hyperty-runtime://',
      suffix: '/sm'
    }
  },
  catalogueURLs: {
    protocolstub: {
      prefix: 'hyperty-catalogue://catalogue.',
      suffix: '/.well-known/protocolstub/',
      fallback: 'hyperty-catalogue://catalogue.%domain%/.well-known/protocolstub/'
    },
    idpProxy: {
      prefix: 'hyperty-catalogue://catalogue.',
      suffix: '/.well-known/idp-proxy/',
      fallback: 'hyperty-catalogue://catalogue.%domain%/.well-known/idp-proxy/'
    }
  },
  msgNodeURL: {
    prefix: 'domain://msg-node.',
    suffix: '',
    hypertyAddressAllocation: '/hyperty-address-allocation',
    objectAddressAllocation: '/object-address-allocation',
    subscriptionManagement: '/sm'
  },
  domainRegistryURL: {
    prefix: 'domain://registry.',
    suffix: ''
  },
  globalRegistryURL: 'global://registry.'
};

},{}],446:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
var ObjectAllocation = function () {
  /* private
  _url: URL
  _bus: MiniBus
  */

  /**
   * Create an Object Allocation
   * @param  {URL.URL}      url - url from who is sending the message
   * @param  {MiniBus}      bus - MiniBus used for address allocation
   */
  function ObjectAllocation(url, bus) {
    (0, _classCallCheck3.default)(this, ObjectAllocation);

    var _this = this;

    _this._url = url;
    _this._bus = bus;
  }

  /**
   * get the URL value
   * @return {string} The url value;
   */


  (0, _createClass3.default)(ObjectAllocation, [{
    key: 'create',


    /**
     * Ask for creation of a number of Object addresses, to the domain message node.
     * @param  {Domain} domain - Domain of the message node.
     * @param  {number} number - Number of addresses to request
     * @returns {Promise<ObjectURL>}  A list of ObjectURL's
     */
    value: function create(domain, scheme, number) {
      var _this = this;

      //FLOW-OUT: message sent to msg-node ObjectAllocationManager component
      var msg = {
        type: 'create', from: _this._url, to: 'domain://msg-node.' + domain + '/object-address-allocation',
        body: { scheme: scheme, value: { number: number } }
      };

      return new _promise2.default(function (resolve, reject) {
        _this._bus.postMessage(msg, function (reply) {
          if (reply.body.code === 200) {
            resolve(reply.body.value.allocated);
          } else {
            reject(reply.body.desc);
          }
        });
      });
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }
  }]);
  return ObjectAllocation;
}();

exports.default = ObjectAllocation;
module.exports = exports['default'];

},{"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],447:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObserverObject = function () {
  function ObserverObject(parent, url, childrens) {
    (0, _classCallCheck3.default)(this, ObserverObject);

    var _this = this;

    _this._parent = parent;
    _this._url = url;
    _this._childrens = childrens;

    _this._bus = parent._bus;
    _this._subscriptions = {};
  }

  (0, _createClass3.default)(ObserverObject, [{
    key: 'addSubscription',
    value: function addSubscription(hyperty) {
      var _this = this;

      _this._subscriptions[hyperty] = new _Subscription2.default(_this._bus, hyperty, _this._url, _this._childrens, false);
    }
  }, {
    key: 'removeSubscription',
    value: function removeSubscription(hyperty) {
      var _this = this;

      var domain = (0, _utils.divideURL)(hyperty).domain;
      var objURLSubscription = _this._url + '/subscription';

      var subscription = _this._subscriptions[hyperty];
      if (subscription) {
        //FLOW-OUT: message sent to remote ReporterObject -> _onRemoteUnSubscribe
        _this._bus.postMessage({
          type: 'unsubscribe', from: _this._parent._url, to: objURLSubscription,
          body: { resource: _this._url }
        });

        //TODO: should I wait for response before unsubscribe on msg-node
        //FLOW-OUT: message sent to msg-node SubscriptionManager component
        _this._bus.postMessage({
          type: 'unsubscribe', from: _this._parent._url, to: 'domain://msg-node.' + domain + '/sm',
          body: { resource: _this._url, childrenResources: _this._childrens }
        });

        subscription._releaseListeners();
        delete _this._subscriptions[hyperty];
      }
    }
  }]);
  return ObserverObject;
}();

exports.default = ObserverObject;
module.exports = exports['default'];

},{"../utils/utils":452,"./Subscription":449,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],448:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReporterObject = function () {
  function ReporterObject(parent, owner, url) {
    (0, _classCallCheck3.default)(this, ReporterObject);

    var _this = this;

    _this._parent = parent;
    _this._owner = owner;
    _this._url = url;

    _this._bus = parent._bus;

    _this._domain = (0, _utils.divideURL)(owner).domain;
    _this._objSubscriptorURL = _this._url + '/subscription';

    _this._subscriptions = {};
    _this._childrens = [];
    _this._childrenListeners = [];

    _this._forwards = {};

    _this._allocateListeners();
  }

  (0, _createClass3.default)(ReporterObject, [{
    key: '_allocateListeners',
    value: function _allocateListeners() {
      var _this = this;

      //add subscription listener...
      _this._subscriptionListener = _this._bus.addListener(_this._objSubscriptorURL, function (msg) {
        console.log(_this._objSubscriptorURL + '-RCV: ', msg);
        switch (msg.type) {
          case 'subscribe':
            _this._onRemoteSubscribe(msg);break;
          case 'unsubscribe':
            _this._onRemoteUnSubscribe(msg);break;
          case 'response':
            _this._onRemoteResponse(msg);break;
        }
      });

      var changeURL = _this._url + '/changes';
      _this._changeListener = _this._bus.addListener(changeURL, function (msg) {
        //TODO: what todo here? Save changes?
        console.log('SyncherManager-' + changeURL + '-RCV: ', msg);
      });
    }
  }, {
    key: '_releaseListeners',
    value: function _releaseListeners() {
      var _this = this;

      _this._subscriptionListener.remove();

      _this._changeListener.remove();

      _this._childrenListeners.forEach(function (cl) {
        cl.remove();
      });

      (0, _keys2.default)(_this._forwards).forEach(function (key) {
        _this.forwardUnSubscribe(key);
      });

      //remove all subscriptions
      (0, _keys2.default)(_this._subscriptions).forEach(function (key) {
        _this._subscriptions[key]._releaseListeners();
      });
    }

    /**
     * Register a listener in the msg-node and in the local MessageBus, so that messages on this address are forwarded to the reporter object
     * @param  {string} address - URL to register the listeners
     * @return {Promise} Return Promise OK or error
     */

  }, {
    key: 'forwardSubscribe',
    value: function forwardSubscribe(addresses) {
      var _this = this;

      //FLOW-OUT: message sent to the msg-node SubscriptionManager component
      var nodeSubscribeMsg = {
        type: 'subscribe', from: _this._parent._url, to: 'domain://msg-node.' + _this._domain + '/sm',
        body: { subscribe: addresses, source: _this._owner }
      };

      return new _promise2.default(function (resolve, reject) {
        _this._bus.postMessage(nodeSubscribeMsg, function (reply) {
          console.log('forward-subscribe-response(reporter): ', reply);
          if (reply.body.code === 200) {
            var newForward = _this._bus.addForward(_this._url, _this._owner);
            _this._forwards[addresses[0]] = newForward;
            resolve();
          } else {
            reject('Error on msg-node subscription: ' + reply.body.desc);
          }
        });
      });
    }

    /**
     * UnRegister a listener in the msg-node and in the local MessageBus, so that messages on this address are removed from forward
     * @param  {string} address - URL to un-register the listeners
     */

  }, {
    key: 'forwardUnSubscribe',
    value: function forwardUnSubscribe(address) {
      var _this = this;

      _this._forwards[address].remove();
      delete _this._forwards[address];

      //FLOW-OUT: message sent to the msg-node SubscriptionManager component
      var nodeUnSubscribeMsg = {
        type: 'unsubscribe', from: _this._parent._url, to: 'domain://msg-node.' + _this._domain + '/sm',
        body: { subscribe: [address], source: _this._owner }
      };

      _this._bus.postMessage(nodeUnSubscribeMsg);
    }

    /**
     * Register listeners for a list of childrens. Public channels used to transmit messages.
     * @param  {string[]} childrens - channels to register
     * @return {Promise} Return Promise OK or error
     */

  }, {
    key: 'addChildrens',
    value: function addChildrens(childrens) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        if (childrens.length === 0) {
          resolve();
          return;
        }

        var childBaseURL = _this._url + '/children/';
        _this._childrens.push(childrens);

        /*
        _this._childrens.forEach((child) => {
          let childId = childBaseURL + child;
           let selfForward = _this._bus.addForward(childId, owner);
          _this._childrenListeners.push(selfForward);
        });*/

        var subscriptions = [];
        childrens.forEach(function (child) {
          return subscriptions.push(childBaseURL + child);
        });

        //FLOW-OUT: message sent to the msg-node SubscriptionManager component
        var nodeSubscribeMsg = {
          type: 'subscribe', from: _this._parent._url, to: 'domain://msg-node.' + _this._domain + '/sm',
          body: { subscribe: subscriptions, source: _this._owner }
        };

        _this._bus.postMessage(nodeSubscribeMsg, function (reply) {
          console.log('node-subscribe-response(reporter): ', reply);
          if (reply.body.code === 200) {

            //add children listeners on local ...
            subscriptions.forEach(function (childURL) {
              var childListener = _this._bus.addListener(childURL, function (msg) {
                //TODO: what todo here? Save childrens?
                console.log('SyncherManager-' + childURL + '-RCV: ', msg);
              });
              _this._childrenListeners.push(childListener);

              var selfForward = _this._bus.addForward(childURL, _this._owner);
              _this._childrenListeners.push(selfForward);
            });

            resolve();
          } else {
            reject('Error on msg-node subscription: ' + reply.body.desc);
          }
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this = this;
      var domain = (0, _utils.divideURL)(_this._owner).domain;

      //FLOW-OUT: message sent directly to all subscribers of the reporter
      _this._bus.postMessage({
        type: 'delete', from: _this._objSubscriptorURL, to: _this._url + '/changes'
      });

      //FLOW-OUT: message sent to the msg-node ObjectAllocationManager component
      _this._bus.postMessage({
        type: 'delete', from: _this._parent._url, to: 'domain://msg-node.' + domain + '/object-address-allocation',
        body: { resource: _this._url, childrenResources: _this._childrens }
      });

      _this._releaseListeners();
      delete _this._parent._reporters[_this._url];
    }
  }, {
    key: '_onRemoteResponse',
    value: function _onRemoteResponse(msg) {
      var _this = this;

      _this._bus.postMessage({
        id: msg.id, type: 'response', from: msg.to, to: _this._url,
        body: { code: msg.body.code, identity: msg.body.identity, source: msg.from }
      });
    }

    //FLOW-IN: message received from Syncher -> subscribe

  }, {
    key: '_onRemoteSubscribe',
    value: function _onRemoteSubscribe(msg) {
      var _this = this;
      var hypertyURL = msg.body.subscriber;

      //validate if subscription already exists?
      if (_this._subscriptions[hypertyURL]) {
        var errorMsg = {
          id: msg.id, type: 'response', from: msg.to, to: hypertyURL,
          body: { code: 500, desc: 'Subscription for (' + _this._url + ' : ' + hypertyURL + ') already exists!' }
        };

        _this._bus.postMessage(errorMsg);
        return;
      }

      //ask to subscribe to Syncher? (depends on the operation mode)
      //TODO: get mode from object!
      var mode = 'sub/pub';

      if (mode === 'sub/pub') {
        //FLOW-OUT: message sent to local hyperty address Syncher -> _onForward
        var forwardMsg = {
          type: 'forward', from: _this._url, to: _this._owner,
          body: { type: msg.type, from: hypertyURL, to: _this._url, identity: msg.body.identity }
        };

        _this._bus.postMessage(forwardMsg, function (reply) {
          console.log('forward-reply: ', reply);
          if (reply.body.code === 200) {
            _this._subscriptions[hypertyURL] = new _Subscription2.default(_this._bus, _this._owner, _this._url, _this._childrens, true);
          }

          //FLOW-OUT: subscription response sent (forward from internal Hyperty)
          _this._bus.postMessage({
            id: msg.id, type: 'response', from: msg.to, to: msg.from,
            body: reply.body
          });
        });
      }
    }

    //FLOW-IN: message received from remote ObserverObject -> removeSubscription

  }, {
    key: '_onRemoteUnSubscribe',
    value: function _onRemoteUnSubscribe(msg) {
      var _this = this;
      var hypertyURL = msg.body.subscriber;

      var subscription = _this._subscriptions[hypertyURL];
      if (subscription) {
        subscription._releaseListeners();
        delete _this._subscriptions[hypertyURL];

        //TODO: send un-subscribe message to Syncher? (depends on the operation mode)
      }
    }
  }]);
  return ReporterObject;
}();

exports.default = ReporterObject;
module.exports = exports['default'];

},{"../utils/utils":452,"./Subscription":449,"babel-runtime/core-js/object/keys":304,"babel-runtime/core-js/promise":306,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],449:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = function () {
  function Subscription(bus, owner, url, childrens, isReporter) {
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = this;
    var childBaseURL = url + '/children/';
    var changeURL = url + '/changes';

    //process delete message
    _this._deleteListener = bus.addListener(changeURL, function (msg) {
      if (msg.type === 'delete') {
        console.log('Subscription-DELETE: ', msg);

        //FLOW-OUT: message sent to all subscribers
        var deleteMessageToHyperty = {
          type: 'delete', from: msg.from, to: owner,
          body: { identity: msg.body.identity, resource: url }
        };

        //send delete to hyperty
        bus.postMessage(deleteMessageToHyperty, function (reply) {
          console.log('Subscription-DELETE-REPLY: ', reply);
          if (reply.body.code === 200) {
            _this._releaseListeners();
          }
        });
      }
    });

    //add change publish address or forward
    if (isReporter) {
      _this._changeListener = bus.addPublish(changeURL);
    } else {
      _this._changeListener = bus.addForward(changeURL, owner);
    }

    _this._childrenListeners = [];
    childrens.forEach(function (child) {
      var childId = childBaseURL + child;

      //add children publish address
      var childrenForward = bus.addPublish(childId);
      _this._childrenListeners.push(childrenForward);

      //add self forward if an observer
      if (!isReporter) {
        var selfForward = bus.addForward(childId, owner);
        _this._childrenListeners.push(selfForward);
      }
    });
  }

  (0, _createClass3.default)(Subscription, [{
    key: '_releaseListeners',
    value: function _releaseListeners() {
      var _this = this;

      _this._deleteListener.remove();

      _this._changeListener.remove();

      _this._childrenListeners.forEach(function (forward) {
        forward.remove();
      });
    }
  }]);
  return Subscription;
}();

exports.default = Subscription;
module.exports = exports['default'];

},{"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310}],450:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils/utils');

var _ObjectAllocation = require('./ObjectAllocation');

var _ObjectAllocation2 = _interopRequireDefault(_ObjectAllocation);

var _ReporterObject = require('./ReporterObject');

var _ReporterObject2 = _interopRequireDefault(_ReporterObject);

var _ObserverObject = require('./ObserverObject');

var _ObserverObject2 = _interopRequireDefault(_ObserverObject);

var _tv = require('../utils/tv4');

var _tv2 = _interopRequireDefault(_tv);

var _MessageFactory = require('service-framework/dist/MessageFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author micaelpedrosa@gmail.com
 * Core Syncronization system.
 */
/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
var SyncherManager = function () {
  /* private
  _url: URL
  _bus: MiniBus
  _registry: Registry
  _allocator: ObjectAllocation
   _reporters: { ObjectURL: ReporterObject }
  _observers: { ObjectURL: ObserverObject }
  */

  function SyncherManager(runtimeURL, bus, registry, catalog, allocator) {
    (0, _classCallCheck3.default)(this, SyncherManager);

    var _this = this;

    _this._bus = bus;
    _this._registry = registry;
    _this._catalog = catalog;

    //TODO: these should be saved in persistence engine?
    _this._url = runtimeURL + '/sm';
    _this._objectURL = runtimeURL + '/object-allocation';

    _this._reporters = {};
    _this._observers = {};

    //TODO: this should not be hardcoded!
    _this._domain = (0, _utils.divideURL)(runtimeURL).domain;

    _this._mf = new _MessageFactory.MessageFactory(false, {});

    if (allocator) {
      _this._allocator = allocator;
    } else {
      _this._allocator = new _ObjectAllocation2.default(_this._objectURL, bus);
    }

    bus.addListener(_this._url, function (msg) {
      console.log('SyncherManager-RCV: ', msg);
      switch (msg.type) {
        case 'create':
          _this._onCreate(msg);break;
        case 'delete':
          _this._onDelete(msg);break;
        case 'subscribe':
          _this._onLocalSubscribe(msg);break;
        case 'unsubscribe':
          _this._onLocalUnSubscribe(msg);break;
      }
    });
  }

  (0, _createClass3.default)(SyncherManager, [{
    key: '_onCreate',


    //FLOW-IN: message received from Syncher -> create
    value: function _onCreate(msg) {

      var _this = this;
      var owner = msg.from;
      var domain = (0, _utils.divideURL)(msg.from).domain;

      if (msg.body.resource) {
        _this._authorise(msg, msg.body.resource);
        return;
      }

      //get schema from catalogue and parse -> (scheme, children)
      _this._catalog.getDataSchemaDescriptor(msg.body.schema).then(function (descriptor) {

        var properties = descriptor.sourcePackage.sourceCode.properties;
        var scheme = properties.scheme ? properties.scheme.constant : 'resource';
        var childrens = properties.children ? properties.children.constant : [];

        console.log('Scheme: ', scheme);

        // schema validation
        console.log('Running object validation...');
        try {
          var obj = msg.body.value;
          var schema = descriptor.sourcePackage.sourceCode;

          // add support for schema referencing itself
          _tv2.default.addSchema(schema.id, schema);

          // validate
          var result = _tv2.default.validateMultiple(obj, schema);

          // delete error stacks to improve logging
          result.errors.forEach(function (error) {
            delete error.stack;
          });

          // print more details about validation if it fails or schema contains $refs
          if (!result.valid || result.missing.length > 0) {
            console.warn('Object validation ' + (result.valid ? 'succeeded, but schema contained references:' : 'failed:'), (0, _stringify2.default)(result, null, 2));
            console.debug('Object:', (0, _stringify2.default)(obj, null, 2), '\r\nSchema:', (0, _stringify2.default)(schema, null, 2));
          } else {
            console.log('Object validation succeeded');
          }
        } catch (e) {
          console.warn('Error during object validation:', e);
        }

        //request address allocation of a new object from the msg-node
        _this._allocator.create(domain, scheme, 1).then(function (allocated) {
          var objURL = allocated[0];

          console.log('ALLOCATOR CREATE:', allocated);

          var subscriptionURL = objURL + '/subscription';

          console.log('Subscription URL', subscriptionURL);

          //To register the dataObject in the runtimeRegistry
          console.info('Register Object: ', msg.body.value.name, msg.body.value.schema, objURL, msg.body.value.reporter, msg.body.value.resources);
          _this._registry.registerDataObject(msg.body.value.name, msg.body.value.schema, objURL, msg.body.value.reporter, msg.body.value.resources, msg.body.authorise).then(function (resolve) {
            console.log('DataObject successfully registered', resolve);

            //all OK -> create reporter and register listeners
            var reporter = new _ReporterObject2.default(_this, owner, objURL);
            reporter.forwardSubscribe([objURL, subscriptionURL]).then(function () {
              reporter.addChildrens(childrens).then(function () {
                _this._reporters[objURL] = reporter;

                //FLOW-OUT: message response to Syncher -> create
                _this._bus.postMessage({
                  id: msg.id, type: 'response', from: msg.to, to: owner,
                  body: { code: 200, resource: objURL, childrenResources: childrens }
                });

                //send create to all observers, responses will be deliver to the Hyperty owner?
                //schedule for next cycle needed, because the Reporter should be available.
                setTimeout(function () {
                  //will invite other hyperties
                  _this._authorise(msg, objURL);
                });
              });
            });
          }, function (error) {
            console.error(error);
          });
        });
      }).catch(function (reason) {
        //FLOW-OUT: error message response to Syncher -> create
        var responseMsg = {
          id: msg.id, type: 'response', from: msg.to, to: owner,
          body: { code: 500, desc: reason }
        };

        _this._bus.postMessage(responseMsg);
      });
    }
  }, {
    key: '_authorise',
    value: function _authorise(msg, objURL) {
      var _this = this;
      var objSubscriptorURL = objURL + '/subscription';

      msg.body.authorise.forEach(function (hypertyURL) {
        //FLOW-OUT: send invites to list of remote Syncher -> _onRemoteCreate -> onNotification
        _this._bus.postMessage({
          type: 'create', from: objSubscriptorURL, to: hypertyURL,
          body: { identity: msg.body.identity, source: msg.from, value: msg.body.value, schema: msg.body.schema }
        });
      });
    }

    //FLOW-IN: message received from DataObjectReporter -> delete

  }, {
    key: '_onDelete',
    value: function _onDelete(msg) {
      var _this = this;

      var objURL = msg.body.resource;

      var object = _this._reporters[objURL];
      if (object) {
        //TODO: is there any policy verification before delete?
        object.delete();

        //TODO: unregister object?
        _this._bus.postMessage({
          id: msg.id, type: 'response', from: msg.to, to: msg.from,
          body: { code: 200 }
        });
      }
    }

    //FLOW-IN: message received from local Syncher -> subscribe

  }, {
    key: '_onLocalSubscribe',
    value: function _onLocalSubscribe(msg) {
      var _this2 = this;

      var _this = this;

      var hypertyURL = msg.from;
      var objURL = msg.body.resource;
      var objURLSubscription = objURL + '/subscription';
      var childBaseURL = objURL + '/children/';

      var domain = (0, _utils.divideURL)(objURL).domain;

      //get schema from catalogue and parse -> (children)
      _this._catalog.getDataSchemaDescriptor(msg.body.schema).then(function (descriptor) {
        var properties = descriptor.sourcePackage.sourceCode.properties;
        var childrens = properties.children ? properties.children.constant : [];

        //children addresses
        var subscriptions = [];
        subscriptions.push(objURL + '/changes');
        childrens.forEach(function (child) {
          return subscriptions.push(childBaseURL + child);
        });

        //FLOW-OUT: subscribe message to the msg-node, registering listeners on the broker
        var nodeSubscribeMsg = {
          type: 'subscribe', from: _this._url, to: 'domain://msg-node.' + domain + '/sm',
          body: { identity: msg.body.identity, subscribe: subscriptions, source: hypertyURL }
        };

        //subscribe in msg-node
        _this._bus.postMessage(nodeSubscribeMsg, function (reply) {
          console.log('node-subscribe-response(observer): ', reply);
          if (reply.body.code === 200) {

            //FLOW-OUT: reply with provisional response
            _this._bus.postMessage({
              id: msg.id, type: 'response', from: msg.to, to: hypertyURL,
              body: { code: 100, childrenResources: childrens }
            });

            //FLOW-OUT: subscribe message to remote ReporterObject -> _onRemoteSubscribe
            var objSubscribeMsg = {
              type: 'subscribe', from: _this._url, to: objURLSubscription,
              body: { identity: nodeSubscribeMsg.body.identity, subscriber: hypertyURL }
            };

            //subscribe to reporter SM
            _this._bus.postMessage(objSubscribeMsg, function (reply) {
              console.log('reporter-subscribe-response: ', reply);
              if (reply.body.code === 200) {

                var observer = _this._observers[objURL];
                if (!observer) {
                  observer = new _ObserverObject2.default(_this, objURL, childrens);
                  _this._observers[objURL] = observer;
                }

                //register hyperty subscription
                observer.addSubscription(hypertyURL);

                //forward to hyperty:
                reply.id = msg.id;
                reply.from = _this._url;
                reply.to = hypertyURL;
                _this2._bus.postMessage(reply);
              }
            });
          } else {
            //listener rejected
            _this._bus.postMessage({
              id: msg.id, type: 'response', from: msg.to, to: hypertyURL,
              body: reply.body
            });
          }
        });
      });
    }

    //FLOW-IN: message received from local DataObjectObserver -> unsubscribe

  }, {
    key: '_onLocalUnSubscribe',
    value: function _onLocalUnSubscribe(msg) {
      var _this = this;

      var hypertyURL = msg.from;
      var objURL = msg.body.resource;

      var observer = _this._observers[objURL];
      if (observer) {
        //TODO: is there any policy verification before delete?
        observer.removeSubscription(hypertyURL);

        //TODO: destroy object in the registry?
        _this._bus.postMessage({
          id: msg.id, type: 'response', from: msg.to, to: msg.from,
          body: { code: 200 }
        });

        //TODO: remove Object if no more subscription?
        //delete _this._observers[objURL];
      }
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }
  }]);
  return SyncherManager;
}();

exports.default = SyncherManager;
module.exports = exports['default'];

},{"../utils/tv4":451,"../utils/utils":452,"./ObjectAllocation":446,"./ObserverObject":447,"./ReporterObject":448,"babel-runtime/core-js/json/stringify":297,"babel-runtime/helpers/classCallCheck":309,"babel-runtime/helpers/createClass":310,"service-framework/dist/MessageFactory":416}],451:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _isFrozen = require('babel-runtime/core-js/object/is-frozen');

var _isFrozen2 = _interopRequireDefault(_isFrozen);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Author: Geraint Luff and others
 Year: 2013

 This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.

 If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
 */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fkeys
if (!_keys2.default) {
    Object.keys = function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' && typeof obj !== 'function' || obj === null) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [];

            for (var prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (var i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (!_create2.default) {
    Object.create = function () {
        function F() {}

        return function (o) {
            if (arguments.length !== 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }
            F.prototype = o;
            return new F();
        };
    }();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FisArray
if (!Array.isArray) {
    Array.isArray = function (vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    };
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FindexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
        if (this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n !== n) {
                // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

// Grungey Object.isFrozen hack
if (!_isFrozen2.default) {
    Object.isFrozen = function (obj) {
        var key = "tv4_test_frozen_key";
        while (obj.hasOwnProperty(key)) {
            key += Math.random();
        }
        try {
            obj[key] = true;
            delete obj[key];
            return false;
        } catch (e) {
            return true;
        }
    };
}
// Based on: https://github.com/geraintluff/uri-templates, but with all the de-substitution stuff removed

var uriTemplateGlobalModifiers = {
    "+": true,
    "#": true,
    ".": true,
    "/": true,
    ";": true,
    "?": true,
    "&": true
};
var uriTemplateSuffices = {
    "*": true
};

function notReallyPercentEncode(string) {
    return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
        return "%" + doubleEncoded.substring(3);
    });
}

function uriTemplateSubstitution(spec) {
    var modifier = "";
    if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
        modifier = spec.charAt(0);
        spec = spec.substring(1);
    }
    var separator = "";
    var prefix = "";
    var shouldEscape = true;
    var showVariables = false;
    var trimEmptyString = false;
    if (modifier === '+') {
        shouldEscape = false;
    } else if (modifier === ".") {
        prefix = ".";
        separator = ".";
    } else if (modifier === "/") {
        prefix = "/";
        separator = "/";
    } else if (modifier === '#') {
        prefix = "#";
        shouldEscape = false;
    } else if (modifier === ';') {
        prefix = ";";
        separator = ";";
        showVariables = true;
        trimEmptyString = true;
    } else if (modifier === '?') {
        prefix = "?";
        separator = "&";
        showVariables = true;
    } else if (modifier === '&') {
        prefix = "&";
        separator = "&";
        showVariables = true;
    }

    var varNames = [];
    var varList = spec.split(",");
    var varSpecs = [];
    var varSpecMap = {};
    for (var i = 0; i < varList.length; i++) {
        var varName = varList[i];
        var truncate = null;
        if (varName.indexOf(":") !== -1) {
            var parts = varName.split(":");
            varName = parts[0];
            truncate = parseInt(parts[1], 10);
        }
        var suffices = {};
        while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
            suffices[varName.charAt(varName.length - 1)] = true;
            varName = varName.substring(0, varName.length - 1);
        }
        var varSpec = {
            truncate: truncate,
            name: varName,
            suffices: suffices
        };
        varSpecs.push(varSpec);
        varSpecMap[varName] = varSpec;
        varNames.push(varName);
    }
    var subFunction = function subFunction(valueFunction) {
        var result = "";
        var startIndex = 0;
        for (var i = 0; i < varSpecs.length; i++) {
            var varSpec = varSpecs[i];
            var value = valueFunction(varSpec.name);
            if (value === null || value === undefined || Array.isArray(value) && value.length === 0 || (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && (0, _keys2.default)(value).length === 0) {
                startIndex++;
                continue;
            }
            if (i === startIndex) {
                result += prefix;
            } else {
                result += separator || ",";
            }
            if (Array.isArray(value)) {
                if (showVariables) {
                    result += varSpec.name + "=";
                }
                for (var j = 0; j < value.length; j++) {
                    if (j > 0) {
                        result += varSpec.suffices['*'] ? separator || "," : ",";
                        if (varSpec.suffices['*'] && showVariables) {
                            result += varSpec.name + "=";
                        }
                    }
                    result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
                }
            } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === "object") {
                if (showVariables && !varSpec.suffices['*']) {
                    result += varSpec.name + "=";
                }
                var first = true;
                for (var key in value) {
                    if (!first) {
                        result += varSpec.suffices['*'] ? separator || "," : ",";
                    }
                    first = false;
                    result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
                    result += varSpec.suffices['*'] ? '=' : ",";
                    result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
                }
            } else {
                if (showVariables) {
                    result += varSpec.name;
                    if (!trimEmptyString || value !== "") {
                        result += "=";
                    }
                }
                if (varSpec.truncate != null) {
                    value = value.substring(0, varSpec.truncate);
                }
                result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21") : notReallyPercentEncode(value);
            }
        }
        return result;
    };
    subFunction.varNames = varNames;
    return {
        prefix: prefix,
        substitution: subFunction
    };
}

function UriTemplate(template) {
    if (!(this instanceof UriTemplate)) {
        return new UriTemplate(template);
    }
    var parts = template.split("{");
    var textParts = [parts.shift()];
    var prefixes = [];
    var substitutions = [];
    var varNames = [];
    while (parts.length > 0) {
        var part = parts.shift();
        var spec = part.split("}")[0];
        var remainder = part.substring(spec.length + 1);
        var funcs = uriTemplateSubstitution(spec);
        substitutions.push(funcs.substitution);
        prefixes.push(funcs.prefix);
        textParts.push(remainder);
        varNames = varNames.concat(funcs.substitution.varNames);
    }
    this.fill = function (valueFunction) {
        var result = textParts[0];
        for (var i = 0; i < substitutions.length; i++) {
            var substitution = substitutions[i];
            result += substitution(valueFunction);
            result += textParts[i + 1];
        }
        return result;
    };
    this.varNames = varNames;
    this.template = template;
}

UriTemplate.prototype = {
    toString: function toString() {
        return this.template;
    },
    fillFromObject: function fillFromObject(obj) {
        return this.fill(function (varName) {
            return obj[varName];
        });
    }
};
var ValidatorContext = function ValidatorContext(parent, collectMultiple, errorReporter, checkRecursive, trackUnknownProperties) {
    this.missing = [];
    this.missingMap = {};
    this.formatValidators = parent ? (0, _create2.default)(parent.formatValidators) : {};
    this.schemas = parent ? (0, _create2.default)(parent.schemas) : {};
    this.collectMultiple = collectMultiple;
    this.errors = [];
    this.handleError = collectMultiple ? this.collectError : this.returnError;
    if (checkRecursive) {
        this.checkRecursive = true;
        this.scanned = [];
        this.scannedFrozen = [];
        this.scannedFrozenSchemas = [];
        this.scannedFrozenValidationErrors = [];
        this.validatedSchemasKey = 'tv4_validation_id';
        this.validationErrorsKey = 'tv4_validation_errors_id';
    }
    if (trackUnknownProperties) {
        this.trackUnknownProperties = true;
        this.knownPropertyPaths = {};
        this.unknownPropertyPaths = {};
    }
    this.errorReporter = errorReporter || defaultErrorReporter('en');
    if (typeof this.errorReporter === 'string') {
        throw new Error('debug');
    }
    this.definedKeywords = {};
    if (parent) {
        for (var key in parent.definedKeywords) {
            this.definedKeywords[key] = parent.definedKeywords[key].slice(0);
        }
    }
};
ValidatorContext.prototype.defineKeyword = function (keyword, keywordFunction) {
    this.definedKeywords[keyword] = this.definedKeywords[keyword] || [];
    this.definedKeywords[keyword].push(keywordFunction);
};
ValidatorContext.prototype.createError = function (code, messageParams, dataPath, schemaPath, subErrors, data, schema) {
    var error = new ValidationError(code, messageParams, dataPath, schemaPath, subErrors);
    error.message = this.errorReporter(error, data, schema);
    return error;
};
ValidatorContext.prototype.returnError = function (error) {
    return error;
};
ValidatorContext.prototype.collectError = function (error) {
    if (error) {
        this.errors.push(error);
    }
    return null;
};
ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
    for (var i = startIndex; i < this.errors.length; i++) {
        this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
    }
    return this;
};
ValidatorContext.prototype.banUnknownProperties = function (data, schema) {
    for (var unknownPath in this.unknownPropertyPaths) {
        var error = this.createError(ErrorCodes.UNKNOWN_PROPERTY, { path: unknownPath }, unknownPath, "", null, data, schema);
        var result = this.handleError(error);
        if (result) {
            return result;
        }
    }
    return null;
};

ValidatorContext.prototype.addFormat = function (format, validator) {
    if ((typeof format === 'undefined' ? 'undefined' : (0, _typeof3.default)(format)) === 'object') {
        for (var key in format) {
            this.addFormat(key, format[key]);
        }
        return this;
    }
    this.formatValidators[format] = validator;
};
ValidatorContext.prototype.resolveRefs = function (schema, urlHistory) {
    if (schema['$ref'] !== undefined) {
        urlHistory = urlHistory || {};
        if (urlHistory[schema['$ref']]) {
            return this.createError(ErrorCodes.CIRCULAR_REFERENCE, { urls: (0, _keys2.default)(urlHistory).join(', ') }, '', '', null, undefined, schema);
        }
        urlHistory[schema['$ref']] = true;
        schema = this.getSchema(schema['$ref'], urlHistory);
    }
    return schema;
};
ValidatorContext.prototype.getSchema = function (url, urlHistory) {
    var schema;
    if (this.schemas[url] !== undefined) {
        schema = this.schemas[url];
        return this.resolveRefs(schema, urlHistory);
    }
    var baseUrl = url;
    var fragment = "";
    if (url.indexOf('#') !== -1) {
        fragment = url.substring(url.indexOf("#") + 1);
        baseUrl = url.substring(0, url.indexOf("#"));
    }
    if ((0, _typeof3.default)(this.schemas[baseUrl]) === 'object') {
        schema = this.schemas[baseUrl];
        var pointerPath = decodeURIComponent(fragment);
        if (pointerPath === "") {
            return this.resolveRefs(schema, urlHistory);
        } else if (pointerPath.charAt(0) !== "/") {
            return undefined;
        }
        var parts = pointerPath.split("/").slice(1);
        for (var i = 0; i < parts.length; i++) {
            var component = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
            if (schema[component] === undefined) {
                schema = undefined;
                break;
            }
            schema = schema[component];
        }
        if (schema !== undefined) {
            return this.resolveRefs(schema, urlHistory);
        }
    }
    if (this.missing[baseUrl] === undefined) {
        this.missing.push(baseUrl);
        this.missing[baseUrl] = baseUrl;
        this.missingMap[baseUrl] = baseUrl;
    }
};
ValidatorContext.prototype.searchSchemas = function (schema, url) {
    if (Array.isArray(schema)) {
        for (var i = 0; i < schema.length; i++) {
            this.searchSchemas(schema[i], url);
        }
    } else if (schema && (typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === "object") {
        if (typeof schema.id === "string") {
            if (isTrustedUrl(url, schema.id)) {
                if (this.schemas[schema.id] === undefined) {
                    this.schemas[schema.id] = schema;
                }
            }
        }
        for (var key in schema) {
            if (key !== "enum") {
                if ((0, _typeof3.default)(schema[key]) === "object") {
                    this.searchSchemas(schema[key], url);
                } else if (key === "$ref") {
                    var uri = getDocumentUri(schema[key]);
                    if (uri && this.schemas[uri] === undefined && this.missingMap[uri] === undefined) {
                        this.missingMap[uri] = uri;
                    }
                }
            }
        }
    }
};
ValidatorContext.prototype.addSchema = function (url, schema) {
    //overload
    if (typeof url !== 'string' || typeof schema === 'undefined') {
        if ((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object' && typeof url.id === 'string') {
            schema = url;
            url = schema.id;
        } else {
            return;
        }
    }
    if (url === getDocumentUri(url) + "#") {
        // Remove empty fragment
        url = getDocumentUri(url);
    }
    this.schemas[url] = schema;
    delete this.missingMap[url];
    normSchema(schema, url);
    this.searchSchemas(schema, url);
};

ValidatorContext.prototype.getSchemaMap = function () {
    var map = {};
    for (var key in this.schemas) {
        map[key] = this.schemas[key];
    }
    return map;
};

ValidatorContext.prototype.getSchemaUris = function (filterRegExp) {
    var list = [];
    for (var key in this.schemas) {
        if (!filterRegExp || filterRegExp.test(key)) {
            list.push(key);
        }
    }
    return list;
};

ValidatorContext.prototype.getMissingUris = function (filterRegExp) {
    var list = [];
    for (var key in this.missingMap) {
        if (!filterRegExp || filterRegExp.test(key)) {
            list.push(key);
        }
    }
    return list;
};

ValidatorContext.prototype.dropSchemas = function () {
    this.schemas = {};
    this.reset();
};
ValidatorContext.prototype.reset = function () {
    this.missing = [];
    this.missingMap = {};
    this.errors = [];
};

ValidatorContext.prototype.validateAll = function (data, schema, dataPathParts, schemaPathParts, dataPointerPath) {
    var topLevel;
    schema = this.resolveRefs(schema);
    if (!schema) {
        return null;
    } else if (schema instanceof ValidationError) {
        this.errors.push(schema);
        return schema;
    }

    var startErrorCount = this.errors.length;
    var frozenIndex,
        scannedFrozenSchemaIndex = null,
        scannedSchemasIndex = null;
    if (this.checkRecursive && data && (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
        topLevel = !this.scanned.length;
        if (data[this.validatedSchemasKey]) {
            var schemaIndex = data[this.validatedSchemasKey].indexOf(schema);
            if (schemaIndex !== -1) {
                this.errors = this.errors.concat(data[this.validationErrorsKey][schemaIndex]);
                return null;
            }
        }
        if ((0, _isFrozen2.default)(data)) {
            frozenIndex = this.scannedFrozen.indexOf(data);
            if (frozenIndex !== -1) {
                var frozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].indexOf(schema);
                if (frozenSchemaIndex !== -1) {
                    this.errors = this.errors.concat(this.scannedFrozenValidationErrors[frozenIndex][frozenSchemaIndex]);
                    return null;
                }
            }
        }
        this.scanned.push(data);
        if ((0, _isFrozen2.default)(data)) {
            if (frozenIndex === -1) {
                frozenIndex = this.scannedFrozen.length;
                this.scannedFrozen.push(data);
                this.scannedFrozenSchemas.push([]);
            }
            scannedFrozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].length;
            this.scannedFrozenSchemas[frozenIndex][scannedFrozenSchemaIndex] = schema;
            this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = [];
        } else {
            if (!data[this.validatedSchemasKey]) {
                try {
                    (0, _defineProperty2.default)(data, this.validatedSchemasKey, {
                        value: [],
                        configurable: true
                    });
                    (0, _defineProperty2.default)(data, this.validationErrorsKey, {
                        value: [],
                        configurable: true
                    });
                } catch (e) {
                    //IE 7/8 workaround
                    data[this.validatedSchemasKey] = [];
                    data[this.validationErrorsKey] = [];
                }
            }
            scannedSchemasIndex = data[this.validatedSchemasKey].length;
            data[this.validatedSchemasKey][scannedSchemasIndex] = schema;
            data[this.validationErrorsKey][scannedSchemasIndex] = [];
        }
    }

    var errorCount = this.errors.length;
    var error = this.validateBasic(data, schema, dataPointerPath) || this.validateNumeric(data, schema, dataPointerPath) || this.validateString(data, schema, dataPointerPath) || this.validateArray(data, schema, dataPointerPath) || this.validateObject(data, schema, dataPointerPath) || this.validateCombinations(data, schema, dataPointerPath) || this.validateHypermedia(data, schema, dataPointerPath) || this.validateFormat(data, schema, dataPointerPath) || this.validateDefinedKeywords(data, schema, dataPointerPath) || null;

    if (topLevel) {
        while (this.scanned.length) {
            var item = this.scanned.pop();
            delete item[this.validatedSchemasKey];
        }
        this.scannedFrozen = [];
        this.scannedFrozenSchemas = [];
    }

    if (error || errorCount !== this.errors.length) {
        while (dataPathParts && dataPathParts.length || schemaPathParts && schemaPathParts.length) {
            var dataPart = dataPathParts && dataPathParts.length ? "" + dataPathParts.pop() : null;
            var schemaPart = schemaPathParts && schemaPathParts.length ? "" + schemaPathParts.pop() : null;
            if (error) {
                error = error.prefixWith(dataPart, schemaPart);
            }
            this.prefixErrors(errorCount, dataPart, schemaPart);
        }
    }

    if (scannedFrozenSchemaIndex !== null) {
        this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = this.errors.slice(startErrorCount);
    } else if (scannedSchemasIndex !== null) {
        data[this.validationErrorsKey][scannedSchemasIndex] = this.errors.slice(startErrorCount);
    }

    return this.handleError(error);
};
ValidatorContext.prototype.validateFormat = function (data, schema) {
    if (typeof schema.format !== 'string' || !this.formatValidators[schema.format]) {
        return null;
    }
    var errorMessage = this.formatValidators[schema.format].call(null, data, schema);
    if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
        return this.createError(ErrorCodes.FORMAT_CUSTOM, { message: errorMessage }, '', '/format', null, data, schema);
    } else if (errorMessage && (typeof errorMessage === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorMessage)) === 'object') {
        return this.createError(ErrorCodes.FORMAT_CUSTOM, { message: errorMessage.message || "?" }, errorMessage.dataPath || '', errorMessage.schemaPath || "/format", null, data, schema);
    }
    return null;
};
ValidatorContext.prototype.validateDefinedKeywords = function (data, schema, dataPointerPath) {
    for (var key in this.definedKeywords) {
        if (typeof schema[key] === 'undefined') {
            continue;
        }
        var validationFunctions = this.definedKeywords[key];
        for (var i = 0; i < validationFunctions.length; i++) {
            var func = validationFunctions[i];
            var result = func(data, schema[key], schema, dataPointerPath);
            if (typeof result === 'string' || typeof result === 'number') {
                return this.createError(ErrorCodes.KEYWORD_CUSTOM, {
                    key: key,
                    message: result
                }, '', '', null, data, schema).prefixWith(null, key);
            } else if (result && (typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) === 'object') {
                var code = result.code;
                if (typeof code === 'string') {
                    if (!ErrorCodes[code]) {
                        throw new Error('Undefined error code (use defineError): ' + code);
                    }
                    code = ErrorCodes[code];
                } else if (typeof code !== 'number') {
                    code = ErrorCodes.KEYWORD_CUSTOM;
                }
                var messageParams = (0, _typeof3.default)(result.message) === 'object' ? result.message : {
                    key: key,
                    message: result.message || "?"
                };
                var schemaPath = result.schemaPath || "/" + key.replace(/~/g, '~0').replace(/\//g, '~1');
                return this.createError(code, messageParams, result.dataPath || null, schemaPath, null, data, schema);
            }
        }
    }
    return null;
};

function recursiveCompare(A, B) {
    if (A === B) {
        return true;
    }
    if (A && B && (typeof A === 'undefined' ? 'undefined' : (0, _typeof3.default)(A)) === "object" && (typeof B === 'undefined' ? 'undefined' : (0, _typeof3.default)(B)) === "object") {
        if (Array.isArray(A) !== Array.isArray(B)) {
            return false;
        } else if (Array.isArray(A)) {
            if (A.length !== B.length) {
                return false;
            }
            for (var i = 0; i < A.length; i++) {
                if (!recursiveCompare(A[i], B[i])) {
                    return false;
                }
            }
        } else {
            var key;
            for (key in A) {
                if (B[key] === undefined && A[key] !== undefined) {
                    return false;
                }
            }
            for (key in B) {
                if (A[key] === undefined && B[key] !== undefined) {
                    return false;
                }
            }
            for (key in A) {
                if (!recursiveCompare(A[key], B[key])) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}

ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataPointerPath) {
    var error;
    if (error = this.validateType(data, schema, dataPointerPath)) {
        return error.prefixWith(null, "type");
    }
    if (error = this.validateEnum(data, schema, dataPointerPath)) {
        return error.prefixWith(null, "type");
    }
    return null;
};

ValidatorContext.prototype.validateType = function validateType(data, schema) {
    if (schema.type === undefined) {
        return null;
    }
    var dataType = typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data);
    if (data === null) {
        dataType = "null";
    } else if (Array.isArray(data)) {
        dataType = "array";
    }
    var allowedTypes = schema.type;
    if (!Array.isArray(allowedTypes)) {
        allowedTypes = [allowedTypes];
    }

    for (var i = 0; i < allowedTypes.length; i++) {
        var type = allowedTypes[i];
        if (type === dataType || type === "integer" && dataType === "number" && data % 1 === 0) {
            return null;
        }
    }
    return this.createError(ErrorCodes.INVALID_TYPE, {
        type: dataType,
        expected: allowedTypes.join("/")
    }, '', '', null, data, schema);
};

ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
    if (schema["enum"] === undefined) {
        return null;
    }
    for (var i = 0; i < schema["enum"].length; i++) {
        var enumVal = schema["enum"][i];
        if (recursiveCompare(data, enumVal)) {
            return null;
        }
    }
    return this.createError(ErrorCodes.ENUM_MISMATCH, { value: typeof JSON !== 'undefined' ? (0, _stringify2.default)(data) : data }, '', '', null, data, schema);
};

ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataPointerPath) {
    return this.validateMultipleOf(data, schema, dataPointerPath) || this.validateMinMax(data, schema, dataPointerPath) || this.validateNaN(data, schema, dataPointerPath) || null;
};

var CLOSE_ENOUGH_LOW = Math.pow(2, -51);
var CLOSE_ENOUGH_HIGH = 1 - CLOSE_ENOUGH_LOW;
ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
    var multipleOf = schema.multipleOf || schema.divisibleBy;
    if (multipleOf === undefined) {
        return null;
    }
    if (typeof data === "number") {
        var remainder = data / multipleOf % 1;
        if (remainder >= CLOSE_ENOUGH_LOW && remainder < CLOSE_ENOUGH_HIGH) {
            return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {
                value: data,
                multipleOf: multipleOf
            }, '', '', null, data, schema);
        }
    }
    return null;
};

ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
    if (typeof data !== "number") {
        return null;
    }
    if (schema.minimum !== undefined) {
        if (data < schema.minimum) {
            return this.createError(ErrorCodes.NUMBER_MINIMUM, {
                value: data,
                minimum: schema.minimum
            }, '', '/minimum', null, data, schema);
        }
        if (schema.exclusiveMinimum && data === schema.minimum) {
            return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {
                value: data,
                minimum: schema.minimum
            }, '', '/exclusiveMinimum', null, data, schema);
        }
    }
    if (schema.maximum !== undefined) {
        if (data > schema.maximum) {
            return this.createError(ErrorCodes.NUMBER_MAXIMUM, {
                value: data,
                maximum: schema.maximum
            }, '', '/maximum', null, data, schema);
        }
        if (schema.exclusiveMaximum && data === schema.maximum) {
            return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {
                value: data,
                maximum: schema.maximum
            }, '', '/exclusiveMaximum', null, data, schema);
        }
    }
    return null;
};

ValidatorContext.prototype.validateNaN = function validateNaN(data, schema) {
    if (typeof data !== "number") {
        return null;
    }
    if (isNaN(data) === true || data === Infinity || data === -Infinity) {
        return this.createError(ErrorCodes.NUMBER_NOT_A_NUMBER, { value: data }, '', '/type', null, data, schema);
    }
    return null;
};

ValidatorContext.prototype.validateString = function validateString(data, schema, dataPointerPath) {
    return this.validateStringLength(data, schema, dataPointerPath) || this.validateStringPattern(data, schema, dataPointerPath) || null;
};

ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
    if (typeof data !== "string") {
        return null;
    }
    if (schema.minLength !== undefined) {
        if (data.length < schema.minLength) {
            return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {
                length: data.length,
                minimum: schema.minLength
            }, '', '/minLength', null, data, schema);
        }
    }
    if (schema.maxLength !== undefined) {
        if (data.length > schema.maxLength) {
            return this.createError(ErrorCodes.STRING_LENGTH_LONG, {
                length: data.length,
                maximum: schema.maxLength
            }, '', '/maxLength', null, data, schema);
        }
    }
    return null;
};

ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
    if (typeof data !== "string" || typeof schema.pattern !== "string" && !(schema.pattern instanceof RegExp)) {
        return null;
    }
    var regexp;
    if (schema.pattern instanceof RegExp) {
        regexp = schema.pattern;
    } else {
        var body,
            flags = '';
        // Check for regular expression literals
        // @see http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5
        var literal = schema.pattern.match(/^\/(.+)\/([img]*)$/);
        if (literal) {
            body = literal[1];
            flags = literal[2];
        } else {
            body = schema.pattern;
        }
        regexp = new RegExp(body, flags);
    }
    if (!regexp.test(data)) {
        return this.createError(ErrorCodes.STRING_PATTERN, { pattern: schema.pattern }, '', '/pattern', null, data, schema);
    }
    return null;
};

ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataPointerPath) {
    if (!Array.isArray(data)) {
        return null;
    }
    return this.validateArrayLength(data, schema, dataPointerPath) || this.validateArrayUniqueItems(data, schema, dataPointerPath) || this.validateArrayItems(data, schema, dataPointerPath) || null;
};

ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
    var error;
    if (schema.minItems !== undefined) {
        if (data.length < schema.minItems) {
            error = this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {
                length: data.length,
                minimum: schema.minItems
            }, '', '/minItems', null, data, schema);
            if (this.handleError(error)) {
                return error;
            }
        }
    }
    if (schema.maxItems !== undefined) {
        if (data.length > schema.maxItems) {
            error = this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {
                length: data.length,
                maximum: schema.maxItems
            }, '', '/maxItems', null, data, schema);
            if (this.handleError(error)) {
                return error;
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
    if (schema.uniqueItems) {
        for (var i = 0; i < data.length; i++) {
            for (var j = i + 1; j < data.length; j++) {
                if (recursiveCompare(data[i], data[j])) {
                    var error = this.createError(ErrorCodes.ARRAY_UNIQUE, {
                        match1: i,
                        match2: j
                    }, '', '/uniqueItems', null, data, schema);
                    if (this.handleError(error)) {
                        return error;
                    }
                }
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataPointerPath) {
    if (schema.items === undefined) {
        return null;
    }
    var error, i;
    if (Array.isArray(schema.items)) {
        for (i = 0; i < data.length; i++) {
            if (i < schema.items.length) {
                if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i], dataPointerPath + "/" + i)) {
                    return error;
                }
            } else if (schema.additionalItems !== undefined) {
                if (typeof schema.additionalItems === "boolean") {
                    if (!schema.additionalItems) {
                        error = this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {}, '/' + i, '/additionalItems', null, data, schema);
                        if (this.handleError(error)) {
                            return error;
                        }
                    }
                } else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"], dataPointerPath + "/" + i)) {
                    return error;
                }
            }
        }
    } else {
        for (i = 0; i < data.length; i++) {
            if (error = this.validateAll(data[i], schema.items, [i], ["items"], dataPointerPath + "/" + i)) {
                return error;
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateObject = function validateObject(data, schema, dataPointerPath) {
    if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== "object" || data === null || Array.isArray(data)) {
        return null;
    }
    return this.validateObjectMinMaxProperties(data, schema, dataPointerPath) || this.validateObjectRequiredProperties(data, schema, dataPointerPath) || this.validateObjectProperties(data, schema, dataPointerPath) || this.validateObjectDependencies(data, schema, dataPointerPath) || null;
};

ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
    var keys = (0, _keys2.default)(data);
    var error;
    if (schema.minProperties !== undefined) {
        if (keys.length < schema.minProperties) {
            error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, {
                propertyCount: keys.length,
                minimum: schema.minProperties
            }, '', '/minProperties', null, data, schema);
            if (this.handleError(error)) {
                return error;
            }
        }
    }
    if (schema.maxProperties !== undefined) {
        if (keys.length > schema.maxProperties) {
            error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, {
                propertyCount: keys.length,
                maximum: schema.maxProperties
            }, '', '/maxProperties', null, data, schema);
            if (this.handleError(error)) {
                return error;
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
    if (schema.required !== undefined) {
        for (var i = 0; i < schema.required.length; i++) {
            var key = schema.required[i];
            if (data[key] === undefined) {
                var error = this.createError(ErrorCodes.OBJECT_REQUIRED, { key: key }, '', '/required/' + i, null, data, schema);
                if (this.handleError(error)) {
                    return error;
                }
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema, dataPointerPath) {
    var error;
    for (var key in data) {
        var keyPointerPath = dataPointerPath + "/" + key.replace(/~/g, '~0').replace(/\//g, '~1');
        var foundMatch = false;
        if (schema.properties !== undefined && schema.properties[key] !== undefined) {
            foundMatch = true;
            if (error = this.validateAll(data[key], schema.properties[key], [key], ["properties", key], keyPointerPath)) {
                return error;
            }
        }
        if (schema.patternProperties !== undefined) {
            for (var patternKey in schema.patternProperties) {
                var regexp = new RegExp(patternKey);
                if (regexp.test(key)) {
                    foundMatch = true;
                    if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], ["patternProperties", patternKey], keyPointerPath)) {
                        return error;
                    }
                }
            }
        }
        if (!foundMatch) {
            if (schema.additionalProperties !== undefined) {
                if (this.trackUnknownProperties) {
                    this.knownPropertyPaths[keyPointerPath] = true;
                    delete this.unknownPropertyPaths[keyPointerPath];
                }
                if (typeof schema.additionalProperties === "boolean") {
                    if (!schema.additionalProperties) {
                        error = this.createError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, { key: key }, '', '/additionalProperties', null, data, schema).prefixWith(key, null);
                        if (this.handleError(error)) {
                            return error;
                        }
                    }
                } else {
                    if (error = this.validateAll(data[key], schema.additionalProperties, [key], ["additionalProperties"], keyPointerPath)) {
                        return error;
                    }
                }
            } else if (this.trackUnknownProperties && !this.knownPropertyPaths[keyPointerPath]) {
                this.unknownPropertyPaths[keyPointerPath] = true;
            }
        } else if (this.trackUnknownProperties) {
            this.knownPropertyPaths[keyPointerPath] = true;
            delete this.unknownPropertyPaths[keyPointerPath];
        }
    }
    return null;
};

ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema, dataPointerPath) {
    var error;
    if (schema.dependencies !== undefined) {
        for (var depKey in schema.dependencies) {
            if (data[depKey] !== undefined) {
                var dep = schema.dependencies[depKey];
                if (typeof dep === "string") {
                    if (data[dep] === undefined) {
                        error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {
                            key: depKey,
                            missing: dep
                        }, '', '', null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
                        if (this.handleError(error)) {
                            return error;
                        }
                    }
                } else if (Array.isArray(dep)) {
                    for (var i = 0; i < dep.length; i++) {
                        var requiredKey = dep[i];
                        if (data[requiredKey] === undefined) {
                            error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {
                                key: depKey,
                                missing: requiredKey
                            }, '', '/' + i, null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
                            if (this.handleError(error)) {
                                return error;
                            }
                        }
                    }
                } else {
                    if (error = this.validateAll(data, dep, [], ["dependencies", depKey], dataPointerPath)) {
                        return error;
                    }
                }
            }
        }
    }
    return null;
};

ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema, dataPointerPath) {
    return this.validateAllOf(data, schema, dataPointerPath) || this.validateAnyOf(data, schema, dataPointerPath) || this.validateOneOf(data, schema, dataPointerPath) || this.validateNot(data, schema, dataPointerPath) || null;
};

ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema, dataPointerPath) {
    if (schema.allOf === undefined) {
        return null;
    }
    var error;
    for (var i = 0; i < schema.allOf.length; i++) {
        var subSchema = schema.allOf[i];
        if (error = this.validateAll(data, subSchema, [], ["allOf", i], dataPointerPath)) {
            return error;
        }
    }
    return null;
};

ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema, dataPointerPath) {
    if (schema.anyOf === undefined) {
        return null;
    }
    var errors = [];
    var startErrorCount = this.errors.length;
    var oldUnknownPropertyPaths, oldKnownPropertyPaths;
    if (this.trackUnknownProperties) {
        oldUnknownPropertyPaths = this.unknownPropertyPaths;
        oldKnownPropertyPaths = this.knownPropertyPaths;
    }
    var errorAtEnd = true;
    for (var i = 0; i < schema.anyOf.length; i++) {
        if (this.trackUnknownProperties) {
            this.unknownPropertyPaths = {};
            this.knownPropertyPaths = {};
        }
        var subSchema = schema.anyOf[i];

        var errorCount = this.errors.length;
        var error = this.validateAll(data, subSchema, [], ["anyOf", i], dataPointerPath);

        if (error === null && errorCount === this.errors.length) {
            this.errors = this.errors.slice(0, startErrorCount);

            if (this.trackUnknownProperties) {
                for (var knownKey in this.knownPropertyPaths) {
                    oldKnownPropertyPaths[knownKey] = true;
                    delete oldUnknownPropertyPaths[knownKey];
                }
                for (var unknownKey in this.unknownPropertyPaths) {
                    if (!oldKnownPropertyPaths[unknownKey]) {
                        oldUnknownPropertyPaths[unknownKey] = true;
                    }
                }
                // We need to continue looping so we catch all the property definitions, but we don't want to return an error
                errorAtEnd = false;
                continue;
            }

            return null;
        }
        if (error) {
            errors.push(error.prefixWith(null, "" + i).prefixWith(null, "anyOf"));
        }
    }
    if (this.trackUnknownProperties) {
        this.unknownPropertyPaths = oldUnknownPropertyPaths;
        this.knownPropertyPaths = oldKnownPropertyPaths;
    }
    if (errorAtEnd) {
        errors = errors.concat(this.errors.slice(startErrorCount));
        this.errors = this.errors.slice(0, startErrorCount);
        return this.createError(ErrorCodes.ANY_OF_MISSING, {}, "", "/anyOf", errors, data, schema);
    }
};

ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema, dataPointerPath) {
    if (schema.oneOf === undefined) {
        return null;
    }
    var validIndex = null;
    var errors = [];
    var startErrorCount = this.errors.length;
    var oldUnknownPropertyPaths, oldKnownPropertyPaths;
    if (this.trackUnknownProperties) {
        oldUnknownPropertyPaths = this.unknownPropertyPaths;
        oldKnownPropertyPaths = this.knownPropertyPaths;
    }
    for (var i = 0; i < schema.oneOf.length; i++) {
        if (this.trackUnknownProperties) {
            this.unknownPropertyPaths = {};
            this.knownPropertyPaths = {};
        }
        var subSchema = schema.oneOf[i];

        var errorCount = this.errors.length;
        var error = this.validateAll(data, subSchema, [], ["oneOf", i], dataPointerPath);

        if (error === null && errorCount === this.errors.length) {
            if (validIndex === null) {
                validIndex = i;
            } else {
                this.errors = this.errors.slice(0, startErrorCount);
                return this.createError(ErrorCodes.ONE_OF_MULTIPLE, {
                    index1: validIndex,
                    index2: i
                }, "", "/oneOf", null, data, schema);
            }
            if (this.trackUnknownProperties) {
                for (var knownKey in this.knownPropertyPaths) {
                    oldKnownPropertyPaths[knownKey] = true;
                    delete oldUnknownPropertyPaths[knownKey];
                }
                for (var unknownKey in this.unknownPropertyPaths) {
                    if (!oldKnownPropertyPaths[unknownKey]) {
                        oldUnknownPropertyPaths[unknownKey] = true;
                    }
                }
            }
        } else if (error) {
            errors.push(error);
        }
    }
    if (this.trackUnknownProperties) {
        this.unknownPropertyPaths = oldUnknownPropertyPaths;
        this.knownPropertyPaths = oldKnownPropertyPaths;
    }
    if (validIndex === null) {
        errors = errors.concat(this.errors.slice(startErrorCount));
        this.errors = this.errors.slice(0, startErrorCount);
        return this.createError(ErrorCodes.ONE_OF_MISSING, {}, "", "/oneOf", errors, data, schema);
    } else {
        this.errors = this.errors.slice(0, startErrorCount);
    }
    return null;
};

ValidatorContext.prototype.validateNot = function validateNot(data, schema, dataPointerPath) {
    if (schema.not === undefined) {
        return null;
    }
    var oldErrorCount = this.errors.length;
    var oldUnknownPropertyPaths, oldKnownPropertyPaths;
    if (this.trackUnknownProperties) {
        oldUnknownPropertyPaths = this.unknownPropertyPaths;
        oldKnownPropertyPaths = this.knownPropertyPaths;
        this.unknownPropertyPaths = {};
        this.knownPropertyPaths = {};
    }
    var error = this.validateAll(data, schema.not, null, null, dataPointerPath);
    var notErrors = this.errors.slice(oldErrorCount);
    this.errors = this.errors.slice(0, oldErrorCount);
    if (this.trackUnknownProperties) {
        this.unknownPropertyPaths = oldUnknownPropertyPaths;
        this.knownPropertyPaths = oldKnownPropertyPaths;
    }
    if (error === null && notErrors.length === 0) {
        return this.createError(ErrorCodes.NOT_PASSED, {}, "", "/not", null, data, schema);
    }
    return null;
};

ValidatorContext.prototype.validateHypermedia = function validateCombinations(data, schema, dataPointerPath) {
    if (!schema.links) {
        return null;
    }
    var error;
    for (var i = 0; i < schema.links.length; i++) {
        var ldo = schema.links[i];
        if (ldo.rel === "describedby") {
            var template = new UriTemplate(ldo.href);
            var allPresent = true;
            for (var j = 0; j < template.varNames.length; j++) {
                if (!(template.varNames[j] in data)) {
                    allPresent = false;
                    break;
                }
            }
            if (allPresent) {
                var schemaUrl = template.fillFromObject(data);
                var subSchema = { "$ref": schemaUrl };
                if (error = this.validateAll(data, subSchema, [], ["links", i], dataPointerPath)) {
                    return error;
                }
            }
        }
    }
};

// parseURI() and resolveUrl() are from https://gist.github.com/1088850
//   -  released as public domain by author ("Yaffle") - see comments on gist

function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    // authority = '//' + user + ':' + pass '@' + hostname + ':' port
    return m ? {
        href: m[0] || '',
        protocol: m[1] || '',
        authority: m[2] || '',
        host: m[3] || '',
        hostname: m[4] || '',
        port: m[5] || '',
        pathname: m[6] || '',
        search: m[7] || '',
        hash: m[8] || ''
    } : null;
}

function resolveUrl(base, href) {
    // RFC 3986

    function removeDotSegments(input) {
        var output = [];
        input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
            if (p === '/..') {
                output.pop();
            } else {
                output.push(p);
            }
        });
        return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
    }

    href = parseURI(href || '');
    base = parseURI(base || '');

    return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
}

function getDocumentUri(uri) {
    return uri.split('#')[0];
}

function normSchema(schema, baseUri) {
    if (schema && (typeof schema === 'undefined' ? 'undefined' : (0, _typeof3.default)(schema)) === "object") {
        if (baseUri === undefined) {
            baseUri = schema.id;
        } else if (typeof schema.id === "string") {
            baseUri = resolveUrl(baseUri, schema.id);
            schema.id = baseUri;
        }
        if (Array.isArray(schema)) {
            for (var i = 0; i < schema.length; i++) {
                normSchema(schema[i], baseUri);
            }
        } else {
            if (typeof schema['$ref'] === "string") {
                schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
            }
            for (var key in schema) {
                if (key !== "enum") {
                    normSchema(schema[key], baseUri);
                }
            }
        }
    }
}

function defaultErrorReporter(language) {
    language = language || 'en';

    var errorMessages = languages[language];

    return function (error) {
        var messageTemplate = errorMessages[error.code] || ErrorMessagesDefault[error.code];
        if (typeof messageTemplate !== 'string') {
            return "Unknown error code " + error.code + ": " + (0, _stringify2.default)(error.messageParams);
        }
        var messageParams = error.params;
        // Adapted from Crockford's supplant()
        return messageTemplate.replace(/\{([^{}]*)\}/g, function (whole, varName) {
            var subValue = messageParams[varName];
            return typeof subValue === 'string' || typeof subValue === 'number' ? subValue : whole;
        });
    };
}

var ErrorCodes = {
    INVALID_TYPE: 0,
    ENUM_MISMATCH: 1,
    ANY_OF_MISSING: 10,
    ONE_OF_MISSING: 11,
    ONE_OF_MULTIPLE: 12,
    NOT_PASSED: 13,
    // Numeric errors
    NUMBER_MULTIPLE_OF: 100,
    NUMBER_MINIMUM: 101,
    NUMBER_MINIMUM_EXCLUSIVE: 102,
    NUMBER_MAXIMUM: 103,
    NUMBER_MAXIMUM_EXCLUSIVE: 104,
    NUMBER_NOT_A_NUMBER: 105,
    // String errors
    STRING_LENGTH_SHORT: 200,
    STRING_LENGTH_LONG: 201,
    STRING_PATTERN: 202,
    // Object errors
    OBJECT_PROPERTIES_MINIMUM: 300,
    OBJECT_PROPERTIES_MAXIMUM: 301,
    OBJECT_REQUIRED: 302,
    OBJECT_ADDITIONAL_PROPERTIES: 303,
    OBJECT_DEPENDENCY_KEY: 304,
    // Array errors
    ARRAY_LENGTH_SHORT: 400,
    ARRAY_LENGTH_LONG: 401,
    ARRAY_UNIQUE: 402,
    ARRAY_ADDITIONAL_ITEMS: 403,
    // Custom/user-defined errors
    FORMAT_CUSTOM: 500,
    KEYWORD_CUSTOM: 501,
    // Schema structure
    CIRCULAR_REFERENCE: 600,
    // Non-standard validation options
    UNKNOWN_PROPERTY: 1000
};
var ErrorCodeLookup = {};
for (var key in ErrorCodes) {
    ErrorCodeLookup[ErrorCodes[key]] = key;
}
var ErrorMessagesDefault = {
    INVALID_TYPE: "Invalid type: {type} (expected {expected})",
    ENUM_MISMATCH: "No enum match for: {value}",
    ANY_OF_MISSING: "Data does not match any schemas from \"anyOf\"",
    ONE_OF_MISSING: "Data does not match any schemas from \"oneOf\"",
    ONE_OF_MULTIPLE: "Data is valid against more than one schema from \"oneOf\": indices {index1} and {index2}",
    NOT_PASSED: "Data matches schema from \"not\"",
    // Numeric errors
    NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
    NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
    NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
    NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
    NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
    NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
    // String errors
    STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
    STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
    STRING_PATTERN: "String does not match pattern: {pattern}",
    // Object errors
    OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
    OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
    OBJECT_REQUIRED: "Missing required property: {key}",
    OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
    OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
    // Array errors
    ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
    ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
    ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
    ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
    // Format errors
    FORMAT_CUSTOM: "Format validation failed ({message})",
    KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
    // Schema structure
    CIRCULAR_REFERENCE: "Circular $refs: {urls}",
    // Non-standard validation options
    UNKNOWN_PROPERTY: "Unknown property (not in schema)"
};

function ValidationError(code, params, dataPath, schemaPath, subErrors) {
    Error.call(this);
    if (code === undefined) {
        throw new Error("No error code supplied: " + schemaPath);
    }
    this.message = '';
    this.params = params;
    this.code = code;
    this.dataPath = dataPath || "";
    this.schemaPath = schemaPath || "";
    this.subErrors = subErrors || null;

    var err = new Error(this.message);
    this.stack = err.stack || err.stacktrace;
    if (!this.stack) {
        try {
            throw err;
        } catch (err) {
            this.stack = err.stack || err.stacktrace;
        }
    }
}

ValidationError.prototype = (0, _create2.default)(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
ValidationError.prototype.name = 'ValidationError';

ValidationError.prototype.prefixWith = function (dataPrefix, schemaPrefix) {
    if (dataPrefix !== null) {
        dataPrefix = dataPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
        this.dataPath = "/" + dataPrefix + this.dataPath;
    }
    if (schemaPrefix !== null) {
        schemaPrefix = schemaPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
        this.schemaPath = "/" + schemaPrefix + this.schemaPath;
    }
    if (this.subErrors !== null) {
        for (var i = 0; i < this.subErrors.length; i++) {
            this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
        }
    }
    return this;
};

function isTrustedUrl(baseUrl, testUrl) {
    if (testUrl.substring(0, baseUrl.length) === baseUrl) {
        var remainder = testUrl.substring(baseUrl.length);
        if (testUrl.length > 0 && testUrl.charAt(baseUrl.length - 1) === "/" || remainder.charAt(0) === "#" || remainder.charAt(0) === "?") {
            return true;
        }
    }
    return false;
}

var languages = {};

function createApi(language) {
    var globalContext = new ValidatorContext();
    var currentLanguage;
    var customErrorReporter;
    var api = {
        setErrorReporter: function setErrorReporter(reporter) {
            if (typeof reporter === 'string') {
                return this.language(reporter);
            }
            customErrorReporter = reporter;
            return true;
        },
        addFormat: function addFormat() {
            globalContext.addFormat.apply(globalContext, arguments);
        },
        language: function language(code) {
            if (!code) {
                return currentLanguage;
            }
            if (!languages[code]) {
                code = code.split('-')[0]; // fall back to base language
            }
            if (languages[code]) {
                currentLanguage = code;
                return code; // so you can tell if fall-back has happened
            }
            return false;
        },
        addLanguage: function addLanguage(code, messageMap) {
            var key;
            for (key in ErrorCodes) {
                if (messageMap[key] && !messageMap[ErrorCodes[key]]) {
                    messageMap[ErrorCodes[key]] = messageMap[key];
                }
            }
            var rootCode = code.split('-')[0];
            if (!languages[rootCode]) {
                // use for base language if not yet defined
                languages[code] = messageMap;
                languages[rootCode] = messageMap;
            } else {
                languages[code] = (0, _create2.default)(languages[rootCode]);
                for (key in messageMap) {
                    if (typeof languages[rootCode][key] === 'undefined') {
                        languages[rootCode][key] = messageMap[key];
                    }
                    languages[code][key] = messageMap[key];
                }
            }
            return this;
        },
        freshApi: function freshApi(language) {
            var result = createApi();
            if (language) {
                result.language(language);
            }
            return result;
        },
        validate: function validate(data, schema, checkRecursive, banUnknownProperties) {
            var def = defaultErrorReporter(currentLanguage);
            var errorReporter = customErrorReporter ? function (error, data, schema) {
                return customErrorReporter(error, data, schema) || def(error, data, schema);
            } : def;
            var context = new ValidatorContext(globalContext, false, errorReporter, checkRecursive, banUnknownProperties);
            if (typeof schema === "string") {
                schema = { "$ref": schema };
            }
            context.addSchema("", schema);
            var error = context.validateAll(data, schema, null, null, "");
            if (!error && banUnknownProperties) {
                error = context.banUnknownProperties(data, schema);
            }
            this.error = error;
            this.missing = context.missing;
            this.valid = error === null;
            return this.valid;
        },
        validateResult: function validateResult() {
            var result = {};
            this.validate.apply(result, arguments);
            return result;
        },
        validateMultiple: function validateMultiple(data, schema, checkRecursive, banUnknownProperties) {
            var def = defaultErrorReporter(currentLanguage);
            var errorReporter = customErrorReporter ? function (error, data, schema) {
                return customErrorReporter(error, data, schema) || def(error, data, schema);
            } : def;
            var context = new ValidatorContext(globalContext, true, errorReporter, checkRecursive, banUnknownProperties);
            if (typeof schema === "string") {
                schema = { "$ref": schema };
            }
            context.addSchema("", schema);
            context.validateAll(data, schema, null, null, "");
            if (banUnknownProperties) {
                context.banUnknownProperties(data, schema);
            }
            var result = {};
            result.errors = context.errors;
            result.missing = context.missing;
            result.valid = result.errors.length === 0;
            return result;
        },
        addSchema: function addSchema() {
            return globalContext.addSchema.apply(globalContext, arguments);
        },
        getSchema: function getSchema() {
            return globalContext.getSchema.apply(globalContext, arguments);
        },
        getSchemaMap: function getSchemaMap() {
            return globalContext.getSchemaMap.apply(globalContext, arguments);
        },
        getSchemaUris: function getSchemaUris() {
            return globalContext.getSchemaUris.apply(globalContext, arguments);
        },
        getMissingUris: function getMissingUris() {
            return globalContext.getMissingUris.apply(globalContext, arguments);
        },
        dropSchemas: function dropSchemas() {
            globalContext.dropSchemas.apply(globalContext, arguments);
        },
        defineKeyword: function defineKeyword() {
            globalContext.defineKeyword.apply(globalContext, arguments);
        },
        defineError: function defineError(codeName, codeNumber, defaultMessage) {
            if (typeof codeName !== 'string' || !/^[A-Z]+(_[A-Z]+)*$/.test(codeName)) {
                throw new Error('Code name must be a string in UPPER_CASE_WITH_UNDERSCORES');
            }
            if (typeof codeNumber !== 'number' || codeNumber % 1 !== 0 || codeNumber < 10000) {
                throw new Error('Code number must be an integer > 10000');
            }
            if (typeof ErrorCodes[codeName] !== 'undefined') {
                throw new Error('Error already defined: ' + codeName + ' as ' + ErrorCodes[codeName]);
            }
            if (typeof ErrorCodeLookup[codeNumber] !== 'undefined') {
                throw new Error('Error code already used: ' + ErrorCodeLookup[codeNumber] + ' as ' + codeNumber);
            }
            ErrorCodes[codeName] = codeNumber;
            ErrorCodeLookup[codeNumber] = codeName;
            ErrorMessagesDefault[codeName] = ErrorMessagesDefault[codeNumber] = defaultMessage;
            for (var langCode in languages) {
                var language = languages[langCode];
                if (language[codeName]) {
                    language[codeNumber] = language[codeNumber] || language[codeName];
                }
            }
        },
        reset: function reset() {
            globalContext.reset();
            this.error = null;
            this.missing = [];
            this.valid = true;
        },
        missing: [],
        error: null,
        valid: true,
        normSchema: normSchema,
        resolveUrl: resolveUrl,
        getDocumentUri: getDocumentUri,
        errorCodes: ErrorCodes
    };
    api.language(language || 'en');
    return api;
}

//export function validator() {
var tv4 = createApi();
tv4.addLanguage('en-gb', ErrorMessagesDefault);

//legacy property
tv4.tv4 = tv4;
//return tv4;
exports.default = tv4;
//}

module.exports = exports['default'];

},{"babel-runtime/core-js/json/stringify":297,"babel-runtime/core-js/object/create":299,"babel-runtime/core-js/object/define-property":300,"babel-runtime/core-js/object/is-frozen":303,"babel-runtime/core-js/object/keys":304,"babel-runtime/helpers/typeof":314}],452:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.divideURL = divideURL;
exports.divideEmail = divideEmail;
exports.emptyObject = emptyObject;
exports.deepClone = deepClone;
exports.removePathFromURL = removePathFromURL;
exports.getUserURLFromEmail = getUserURLFromEmail;
exports.getUserEmailFromURL = getUserEmailFromURL;
exports.convertToUserURL = convertToUserURL;
exports.isDataObjectURL = isDataObjectURL;
exports.getConfigurationResources = getConfigurationResources;
exports.buildURL = buildURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
/**
 * Support module with some functions will be useful
 * @module utils
 */

/**
 * @typedef divideURL
 * @type Object
 * @property {string} type The type of URL
 * @property {string} domain The domain of URL
 * @property {string} identity The identity of URL
 */

/**
 * Divide an url in type, domain and identity
 * @param  {URL.URL} url - url address
 * @return {divideURL} the result of divideURL
 */
function divideURL(url) {

  if (!url) throw Error('URL is needed to split');

  // let re = /([a-zA-Z-]*)?:\/\/(?:\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi;
  var re = /([a-zA-Z-]*):\/\/(?:\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256})([-a-zA-Z0-9@:%._\+~#=\/]*)/gi;
  var subst = '$1,$2,$3';
  var parts = url.replace(re, subst).split(',');

  // If the url has no protocol, the default protocol set is https
  if (parts[0] === url) {
    parts[0] = 'https';
    parts[1] = url;
  }

  var result = {
    type: parts[0],
    domain: parts[1],
    identity: parts[2]
  };

  return result;
}

function divideEmail(email) {
  var indexOfAt = email.indexOf('@');

  var result = {
    username: email.substring(0, indexOfAt),
    domain: email.substring(indexOfAt + 1, email.length)
  };

  return result;
}

/**
 * Check if an Object is empty
 * @param  {Object} object Object to be checked
 * @return {Boolean}       status of Object, empty or not (true|false);
 */
function emptyObject(object) {
  return (0, _keys2.default)(object).length > 0 ? false : true;
}

/**
 * Make a COPY of the original data
 * @param  {Object}  obj - object to be cloned
 * @return {Object}
 */
function deepClone(obj) {
  //TODO: simple but inefficient JSON deep clone...
  if (obj) return JSON.parse((0, _stringify2.default)(obj));
}

function removePathFromURL(url) {
  var splitURL = url.split('/');
  return splitURL[0] + '//' + splitURL[2] + '/' + splitURL[3];
}

/**
 * Obtains the user URL that corresponds to a given email
 * @param  {string} userEmail The user email
 * @return {URL.URL} userURL The user URL
 */
function getUserURLFromEmail(userEmail) {
  var indexOfAt = userEmail.indexOf('@');
  return 'user://' + userEmail.substring(indexOfAt + 1, userEmail.length) + '/' + userEmail.substring(0, indexOfAt);
}

/**
 * Obtains the user email that corresponds to a given URL
 * @param  {URL.URL} userURL The user URL
 * @return {string} userEmail The user email
 */
function getUserEmailFromURL(userURL) {
  var url = divideURL(userURL);
  return url.identity.replace('/', '') + '@' + url.domain; // identity field has '/exampleID' instead of 'exampleID'
}

/**
 * Check if the user identifier is already in the URL format, if not, convert to URL format
 * @param  {string}   identifier  user identifier
 * @return {string}   userURL    the user URL
 */
function convertToUserURL(identifier) {

  // check if the identifier is already in the url format
  if (identifier.substring(0, 7) === 'user://') {
    var dividedURL = divideURL(identifier);

    //check if the url is well formated
    if (dividedURL.domain && dividedURL.identity) {
      return identifier;
    } else {
      throw 'userURL with wrong format';
    }

    //if not, convert the user email to URL format
  } else {
    return getUserURLFromEmail(identifier);
  }
}

function isDataObjectURL(url) {
  var schemasToIgnore = ['domain-idp', 'runtime', 'domain', 'hyperty'];
  var splitURL = url.split('://');
  var urlSchema = splitURL[0];

  return schemasToIgnore.indexOf(urlSchema) === -1;
}

/**
 * get information relative each component configured on runtime configuration;
 * @param  {object} configuration object with all configuration
 * @param  {string} component     string with the component to get the configuration, like, runtimeURLS, catalogueURLs, msgNodeURL, domainRegistryURL;
 * @param  {string} resource      type of resource to get, like, catalogue, runtimeUA, protocolstub, idpProxy
 * @return {object}               return an object with all configurations;
 */
function getConfigurationResources(configuration, component, resource) {
  var objectResource = configuration[component];
  var resourceType = objectResource[resource];

  return resourceType;
}

/**
 * Build a full url with the runtime configuration;
 * @param  {object} configuration object with all configuration
 * @param  {string} component     string with the component to get the configuration, like, runtimeURLS, catalogueURLs, msgNodeURL, domainRegistryURL;
 * @param  {string} resource      type of resource to get, like, catalogue, runtimeUA, protocolstub, idpProxy
 * @param  {string} type          resource to get, like a hyperty name or protocolstub name;
 * @param  {boolean} useFallback  if true the function will check if have a fallback url;
 * @return {string}               partial url to contact the resource;
 */
function buildURL(configuration, component, resource, type) {
  var useFallback = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

  var objectResource = configuration[component];
  var url = void 0;

  if (!objectResource.hasOwnProperty(resource)) {
    throw Error('The configuration ' + (0, _stringify2.default)(objectResource, '', 2) + ' don\'t have the ' + resource + ' resource you are looking for');
  }

  var resourceType = objectResource[resource];

  if (type) {
    url = resourceType.prefix + configuration.domain + resourceType.suffix + type;
    if (resourceType.hasOwnProperty('fallback') && useFallback) {
      if (resourceType.fallback.indexOf('%domain%')) {
        url = resourceType.fallback.replace(/(%domain%)/g, configuration.domain) + type;
      } else {
        url = resourceType.fallback + type;
      }
    }
  } else {
    url = resourceType.prefix + configuration.domain + resourceType.suffix;
  }

  // console.log(url);

  return url;
}

},{"babel-runtime/core-js/json/stringify":297,"babel-runtime/core-js/object/keys":304}]},{},[444])(444)
});

//# sourceMappingURL=Runtime.js.map