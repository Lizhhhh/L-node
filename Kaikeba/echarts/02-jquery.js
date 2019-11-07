(function(global, factory) {
    "usr strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}) ( typeof window !== "undefined" ? window : this, function(window, noGlobal){
  "use strict";

  var arr = [];

  var document =  window.document;

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var concat = arr.concat;

  var indexOf = arr.indexOf;

  var calss2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString  = hasOwn.toString;

  var ObjectFunctionString = fnToString.call(Object);

  var support = {};

  var isFunction = function isFunction(obj){
    return typeof obj === 'function' && typeof obj.nodeType !== 'number';
  };

  var isWindow  = function isWindow (obj) {
    return obj !==null && obj === obj.window;
  };

  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval( code, node, doc){
    doc = doc || document;

    var i, val,
    script = doc.createElement("script");

    script.text = code;
    if(node) {
      for( i in)
    }
  }

})