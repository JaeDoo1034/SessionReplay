function oh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var va = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fd;
function E0() {
  if (Fd) return Le;
  Fd = 1;
  var t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.iterator;
  function m(_) {
    return _ === null || typeof _ != "object" ? null : (_ = y && _[y] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var x = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, E = {};
  function N(_, F, K) {
    this.props = _, this.context = F, this.refs = E, this.updater = K || x;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(_, F) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, F, "setState");
  }, N.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function M() {
  }
  M.prototype = N.prototype;
  function R(_, F, K) {
    this.props = _, this.context = F, this.refs = E, this.updater = K || x;
  }
  var S = R.prototype = new M();
  S.constructor = R, k(S, N.prototype), S.isPureReactComponent = !0;
  var P = Array.isArray, A = Object.prototype.hasOwnProperty, H = { current: null }, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V(_, F, K) {
    var Y, ue = {}, ce = null, fe = null;
    if (F != null) for (Y in F.ref !== void 0 && (fe = F.ref), F.key !== void 0 && (ce = "" + F.key), F) A.call(F, Y) && !B.hasOwnProperty(Y) && (ue[Y] = F[Y]);
    var se = arguments.length - 2;
    if (se === 1) ue.children = K;
    else if (1 < se) {
      for (var de = Array(se), Ne = 0; Ne < se; Ne++) de[Ne] = arguments[Ne + 2];
      ue.children = de;
    }
    if (_ && _.defaultProps) for (Y in se = _.defaultProps, se) ue[Y] === void 0 && (ue[Y] = se[Y]);
    return { $$typeof: t, type: _, key: ce, ref: fe, props: ue, _owner: H.current };
  }
  function ee(_, F) {
    return { $$typeof: t, type: _.type, key: F, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function oe(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function Z(_) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(K) {
      return F[K];
    });
  }
  var te = /\/+/g;
  function J(_, F) {
    return typeof _ == "object" && _ !== null && _.key != null ? Z("" + _.key) : F.toString(36);
  }
  function C(_, F, K, Y, ue) {
    var ce = typeof _;
    (ce === "undefined" || ce === "boolean") && (_ = null);
    var fe = !1;
    if (_ === null) fe = !0;
    else switch (ce) {
      case "string":
      case "number":
        fe = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case t:
          case r:
            fe = !0;
        }
    }
    if (fe) return fe = _, ue = ue(fe), _ = Y === "" ? "." + J(fe, 0) : Y, P(ue) ? (K = "", _ != null && (K = _.replace(te, "$&/") + "/"), C(ue, F, K, "", function(Ne) {
      return Ne;
    })) : ue != null && (oe(ue) && (ue = ee(ue, K + (!ue.key || fe && fe.key === ue.key ? "" : ("" + ue.key).replace(te, "$&/") + "/") + _)), F.push(ue)), 1;
    if (fe = 0, Y = Y === "" ? "." : Y + ":", P(_)) for (var se = 0; se < _.length; se++) {
      ce = _[se];
      var de = Y + J(ce, se);
      fe += C(ce, F, K, de, ue);
    }
    else if (de = m(_), typeof de == "function") for (_ = de.call(_), se = 0; !(ce = _.next()).done; ) ce = ce.value, de = Y + J(ce, se++), fe += C(ce, F, K, de, ue);
    else if (ce === "object") throw F = String(_), Error("Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead.");
    return fe;
  }
  function b(_, F, K) {
    if (_ == null) return _;
    var Y = [], ue = 0;
    return C(_, Y, "", "", function(ce) {
      return F.call(K, ce, ue++);
    }), Y;
  }
  function D(_) {
    if (_._status === -1) {
      var F = _._result;
      F = F(), F.then(function(K) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = K);
      }, function(K) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = K);
      }), _._status === -1 && (_._status = 0, _._result = F);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var j = { current: null }, z = { transition: null }, L = { ReactCurrentDispatcher: j, ReactCurrentBatchConfig: z, ReactCurrentOwner: H };
  function O() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Le.Children = { map: b, forEach: function(_, F, K) {
    b(_, function() {
      F.apply(this, arguments);
    }, K);
  }, count: function(_) {
    var F = 0;
    return b(_, function() {
      F++;
    }), F;
  }, toArray: function(_) {
    return b(_, function(F) {
      return F;
    }) || [];
  }, only: function(_) {
    if (!oe(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, Le.Component = N, Le.Fragment = i, Le.Profiler = u, Le.PureComponent = R, Le.StrictMode = l, Le.Suspense = h, Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L, Le.act = O, Le.cloneElement = function(_, F, K) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Y = k({}, _.props), ue = _.key, ce = _.ref, fe = _._owner;
    if (F != null) {
      if (F.ref !== void 0 && (ce = F.ref, fe = H.current), F.key !== void 0 && (ue = "" + F.key), _.type && _.type.defaultProps) var se = _.type.defaultProps;
      for (de in F) A.call(F, de) && !B.hasOwnProperty(de) && (Y[de] = F[de] === void 0 && se !== void 0 ? se[de] : F[de]);
    }
    var de = arguments.length - 2;
    if (de === 1) Y.children = K;
    else if (1 < de) {
      se = Array(de);
      for (var Ne = 0; Ne < de; Ne++) se[Ne] = arguments[Ne + 2];
      Y.children = se;
    }
    return { $$typeof: t, type: _.type, key: ue, ref: ce, props: Y, _owner: fe };
  }, Le.createContext = function(_) {
    return _ = { $$typeof: f, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: c, _context: _ }, _.Consumer = _;
  }, Le.createElement = V, Le.createFactory = function(_) {
    var F = V.bind(null, _);
    return F.type = _, F;
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(_) {
    return { $$typeof: p, render: _ };
  }, Le.isValidElement = oe, Le.lazy = function(_) {
    return { $$typeof: g, _payload: { _status: -1, _result: _ }, _init: D };
  }, Le.memo = function(_, F) {
    return { $$typeof: v, type: _, compare: F === void 0 ? null : F };
  }, Le.startTransition = function(_) {
    var F = z.transition;
    z.transition = {};
    try {
      _();
    } finally {
      z.transition = F;
    }
  }, Le.unstable_act = O, Le.useCallback = function(_, F) {
    return j.current.useCallback(_, F);
  }, Le.useContext = function(_) {
    return j.current.useContext(_);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(_) {
    return j.current.useDeferredValue(_);
  }, Le.useEffect = function(_, F) {
    return j.current.useEffect(_, F);
  }, Le.useId = function() {
    return j.current.useId();
  }, Le.useImperativeHandle = function(_, F, K) {
    return j.current.useImperativeHandle(_, F, K);
  }, Le.useInsertionEffect = function(_, F) {
    return j.current.useInsertionEffect(_, F);
  }, Le.useLayoutEffect = function(_, F) {
    return j.current.useLayoutEffect(_, F);
  }, Le.useMemo = function(_, F) {
    return j.current.useMemo(_, F);
  }, Le.useReducer = function(_, F, K) {
    return j.current.useReducer(_, F, K);
  }, Le.useRef = function(_) {
    return j.current.useRef(_);
  }, Le.useState = function(_) {
    return j.current.useState(_);
  }, Le.useSyncExternalStore = function(_, F, K) {
    return j.current.useSyncExternalStore(_, F, K);
  }, Le.useTransition = function() {
    return j.current.useTransition();
  }, Le.version = "18.3.1", Le;
}
var jd;
function Si() {
  return jd || (jd = 1, va.exports = E0()), va.exports;
}
var G = Si();
const W = /* @__PURE__ */ oh(G);
var bs = {}, wa = { exports: {} }, Pt = {}, xa = { exports: {} }, Sa = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hd;
function _0() {
  return Hd || (Hd = 1, (function(t) {
    function r(z, L) {
      var O = z.length;
      z.push(L);
      e: for (; 0 < O; ) {
        var _ = O - 1 >>> 1, F = z[_];
        if (0 < u(F, L)) z[_] = L, z[O] = F, O = _;
        else break e;
      }
    }
    function i(z) {
      return z.length === 0 ? null : z[0];
    }
    function l(z) {
      if (z.length === 0) return null;
      var L = z[0], O = z.pop();
      if (O !== L) {
        z[0] = O;
        e: for (var _ = 0, F = z.length, K = F >>> 1; _ < K; ) {
          var Y = 2 * (_ + 1) - 1, ue = z[Y], ce = Y + 1, fe = z[ce];
          if (0 > u(ue, O)) ce < F && 0 > u(fe, ue) ? (z[_] = fe, z[ce] = O, _ = ce) : (z[_] = ue, z[Y] = O, _ = Y);
          else if (ce < F && 0 > u(fe, O)) z[_] = fe, z[ce] = O, _ = ce;
          else break e;
        }
      }
      return L;
    }
    function u(z, L) {
      var O = z.sortIndex - L.sortIndex;
      return O !== 0 ? O : z.id - L.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      t.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, p = f.now();
      t.unstable_now = function() {
        return f.now() - p;
      };
    }
    var h = [], v = [], g = 1, y = null, m = 3, x = !1, k = !1, E = !1, N = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function S(z) {
      for (var L = i(v); L !== null; ) {
        if (L.callback === null) l(v);
        else if (L.startTime <= z) l(v), L.sortIndex = L.expirationTime, r(h, L);
        else break;
        L = i(v);
      }
    }
    function P(z) {
      if (E = !1, S(z), !k) if (i(h) !== null) k = !0, D(A);
      else {
        var L = i(v);
        L !== null && j(P, L.startTime - z);
      }
    }
    function A(z, L) {
      k = !1, E && (E = !1, M(V), V = -1), x = !0;
      var O = m;
      try {
        for (S(L), y = i(h); y !== null && (!(y.expirationTime > L) || z && !Z()); ) {
          var _ = y.callback;
          if (typeof _ == "function") {
            y.callback = null, m = y.priorityLevel;
            var F = _(y.expirationTime <= L);
            L = t.unstable_now(), typeof F == "function" ? y.callback = F : y === i(h) && l(h), S(L);
          } else l(h);
          y = i(h);
        }
        if (y !== null) var K = !0;
        else {
          var Y = i(v);
          Y !== null && j(P, Y.startTime - L), K = !1;
        }
        return K;
      } finally {
        y = null, m = O, x = !1;
      }
    }
    var H = !1, B = null, V = -1, ee = 5, oe = -1;
    function Z() {
      return !(t.unstable_now() - oe < ee);
    }
    function te() {
      if (B !== null) {
        var z = t.unstable_now();
        oe = z;
        var L = !0;
        try {
          L = B(!0, z);
        } finally {
          L ? J() : (H = !1, B = null);
        }
      } else H = !1;
    }
    var J;
    if (typeof R == "function") J = function() {
      R(te);
    };
    else if (typeof MessageChannel < "u") {
      var C = new MessageChannel(), b = C.port2;
      C.port1.onmessage = te, J = function() {
        b.postMessage(null);
      };
    } else J = function() {
      N(te, 0);
    };
    function D(z) {
      B = z, H || (H = !0, J());
    }
    function j(z, L) {
      V = N(function() {
        z(t.unstable_now());
      }, L);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, t.unstable_continueExecution = function() {
      k || x || (k = !0, D(A));
    }, t.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ee = 0 < z ? Math.floor(1e3 / z) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return m;
    }, t.unstable_getFirstCallbackNode = function() {
      return i(h);
    }, t.unstable_next = function(z) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = m;
      }
      var O = m;
      m = L;
      try {
        return z();
      } finally {
        m = O;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(z, L) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var O = m;
      m = z;
      try {
        return L();
      } finally {
        m = O;
      }
    }, t.unstable_scheduleCallback = function(z, L, O) {
      var _ = t.unstable_now();
      switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? _ + O : _) : O = _, z) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return F = O + F, z = { id: g++, callback: L, priorityLevel: z, startTime: O, expirationTime: F, sortIndex: -1 }, O > _ ? (z.sortIndex = O, r(v, z), i(h) === null && z === i(v) && (E ? (M(V), V = -1) : E = !0, j(P, O - _))) : (z.sortIndex = F, r(h, z), k || x || (k = !0, D(A))), z;
    }, t.unstable_shouldYield = Z, t.unstable_wrapCallback = function(z) {
      var L = m;
      return function() {
        var O = m;
        m = L;
        try {
          return z.apply(this, arguments);
        } finally {
          m = O;
        }
      };
    };
  })(Sa)), Sa;
}
var bd;
function k0() {
  return bd || (bd = 1, xa.exports = _0()), xa.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bd;
function N0() {
  if (Bd) return Pt;
  Bd = 1;
  var t = Si(), r = k0();
  function i(e) {
    for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 1; o < arguments.length; o++) n += "&args[]=" + encodeURIComponent(arguments[o]);
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var l = /* @__PURE__ */ new Set(), u = {};
  function c(e, n) {
    f(e, n), f(e + "Capture", n);
  }
  function f(e, n) {
    for (u[e] = n, e = 0; e < n.length; e++) l.add(n[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), h = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, y = {};
  function m(e) {
    return h.call(y, e) ? !0 : h.call(g, e) ? !1 : v.test(e) ? y[e] = !0 : (g[e] = !0, !1);
  }
  function x(e, n, o, s) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return s ? !1 : o !== null ? !o.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function k(e, n, o, s) {
    if (n === null || typeof n > "u" || x(e, n, o, s)) return !0;
    if (s) return !1;
    if (o !== null) switch (o.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
    return !1;
  }
  function E(e, n, o, s, a, d, w) {
    this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = s, this.attributeNamespace = a, this.mustUseProperty = o, this.propertyName = e, this.type = n, this.sanitizeURL = d, this.removeEmptyString = w;
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    N[e] = new E(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var n = e[0];
    N[n] = new E(n, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    N[e] = new E(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    N[e] = new E(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    N[e] = new E(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    N[e] = new E(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    N[e] = new E(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    N[e] = new E(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    N[e] = new E(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var M = /[\-:]([a-z])/g;
  function R(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var n = e.replace(
      M,
      R
    );
    N[n] = new E(n, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var n = e.replace(M, R);
    N[n] = new E(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var n = e.replace(M, R);
    N[n] = new E(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    N[e] = new E(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), N.xlinkHref = new E("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    N[e] = new E(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function S(e, n, o, s) {
    var a = N.hasOwnProperty(n) ? N[n] : null;
    (a !== null ? a.type !== 0 : s || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (k(n, o, a, s) && (o = null), s || a === null ? m(n) && (o === null ? e.removeAttribute(n) : e.setAttribute(n, "" + o)) : a.mustUseProperty ? e[a.propertyName] = o === null ? a.type === 3 ? !1 : "" : o : (n = a.attributeName, s = a.attributeNamespace, o === null ? e.removeAttribute(n) : (a = a.type, o = a === 3 || a === 4 && o === !0 ? "" : "" + o, s ? e.setAttributeNS(s, n, o) : e.setAttribute(n, o))));
  }
  var P = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, A = Symbol.for("react.element"), H = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), oe = Symbol.for("react.provider"), Z = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), j = Symbol.for("react.offscreen"), z = Symbol.iterator;
  function L(e) {
    return e === null || typeof e != "object" ? null : (e = z && e[z] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var O = Object.assign, _;
  function F(e) {
    if (_ === void 0) try {
      throw Error();
    } catch (o) {
      var n = o.stack.trim().match(/\n( *(at )?)/);
      _ = n && n[1] || "";
    }
    return `
` + _ + e;
  }
  var K = !1;
  function Y(e, n) {
    if (!e || K) return "";
    K = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n) if (n = function() {
        throw Error();
      }, Object.defineProperty(n.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(n, []);
        } catch (Q) {
          var s = Q;
        }
        Reflect.construct(e, [], n);
      } else {
        try {
          n.call();
        } catch (Q) {
          s = Q;
        }
        e.call(n.prototype);
      }
      else {
        try {
          throw Error();
        } catch (Q) {
          s = Q;
        }
        e();
      }
    } catch (Q) {
      if (Q && s && typeof Q.stack == "string") {
        for (var a = Q.stack.split(`
`), d = s.stack.split(`
`), w = a.length - 1, T = d.length - 1; 1 <= w && 0 <= T && a[w] !== d[T]; ) T--;
        for (; 1 <= w && 0 <= T; w--, T--) if (a[w] !== d[T]) {
          if (w !== 1 || T !== 1)
            do
              if (w--, T--, 0 > T || a[w] !== d[T]) {
                var I = `
` + a[w].replace(" at new ", " at ");
                return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), I;
              }
            while (1 <= w && 0 <= T);
          break;
        }
      }
    } finally {
      K = !1, Error.prepareStackTrace = o;
    }
    return (e = e ? e.displayName || e.name : "") ? F(e) : "";
  }
  function ue(e) {
    switch (e.tag) {
      case 5:
        return F(e.type);
      case 16:
        return F("Lazy");
      case 13:
        return F("Suspense");
      case 19:
        return F("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = Y(e.type, !1), e;
      case 11:
        return e = Y(e.type.render, !1), e;
      case 1:
        return e = Y(e.type, !0), e;
      default:
        return "";
    }
  }
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case B:
        return "Fragment";
      case H:
        return "Portal";
      case ee:
        return "Profiler";
      case V:
        return "StrictMode";
      case J:
        return "Suspense";
      case C:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Z:
        return (e.displayName || "Context") + ".Consumer";
      case oe:
        return (e._context.displayName || "Context") + ".Provider";
      case te:
        var n = e.render;
        return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case b:
        return n = e.displayName || null, n !== null ? n : ce(e.type) || "Memo";
      case D:
        n = e._payload, e = e._init;
        try {
          return ce(e(n));
        } catch {
        }
    }
    return null;
  }
  function fe(e) {
    var n = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = n.render, e = e.displayName || e.name || "", n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ce(n);
      case 8:
        return n === V ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function se(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function de(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ne(e) {
    var n = de(e) ? "checked" : "value", o = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), s = "" + e[n];
    if (!e.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var a = o.get, d = o.set;
      return Object.defineProperty(e, n, { configurable: !0, get: function() {
        return a.call(this);
      }, set: function(w) {
        s = "" + w, d.call(this, w);
      } }), Object.defineProperty(e, n, { enumerable: o.enumerable }), { getValue: function() {
        return s;
      }, setValue: function(w) {
        s = "" + w;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[n];
      } };
    }
  }
  function Pe(e) {
    e._valueTracker || (e._valueTracker = Ne(e));
  }
  function Se(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var o = n.getValue(), s = "";
    return e && (s = de(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== o ? (n.setValue(e), !0) : !1;
  }
  function Ee(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function xe(e, n) {
    var o = n.checked;
    return O({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: o ?? e._wrapperState.initialChecked });
  }
  function Ae(e, n) {
    var o = n.defaultValue == null ? "" : n.defaultValue, s = n.checked != null ? n.checked : n.defaultChecked;
    o = se(n.value != null ? n.value : o), e._wrapperState = { initialChecked: s, initialValue: o, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
  }
  function Oe(e, n) {
    n = n.checked, n != null && S(e, "checked", n, !1);
  }
  function vt(e, n) {
    Oe(e, n);
    var o = se(n.value), s = n.type;
    if (o != null) s === "number" ? (o === 0 && e.value === "" || e.value != o) && (e.value = "" + o) : e.value !== "" + o && (e.value = "" + o);
    else if (s === "submit" || s === "reset") {
      e.removeAttribute("value");
      return;
    }
    n.hasOwnProperty("value") ? Lt(e, n.type, o) : n.hasOwnProperty("defaultValue") && Lt(e, n.type, se(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
  }
  function jt(e, n, o) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var s = n.type;
      if (!(s !== "submit" && s !== "reset" || n.value !== void 0 && n.value !== null)) return;
      n = "" + e._wrapperState.initialValue, o || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = e.name, o !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, o !== "" && (e.name = o);
  }
  function Lt(e, n, o) {
    (n !== "number" || Ee(e.ownerDocument) !== e) && (o == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + o && (e.defaultValue = "" + o));
  }
  var ne = Array.isArray;
  function pe(e, n, o, s) {
    if (e = e.options, n) {
      n = {};
      for (var a = 0; a < o.length; a++) n["$" + o[a]] = !0;
      for (o = 0; o < e.length; o++) a = n.hasOwnProperty("$" + e[o].value), e[o].selected !== a && (e[o].selected = a), a && s && (e[o].defaultSelected = !0);
    } else {
      for (o = "" + se(o), n = null, a = 0; a < e.length; a++) {
        if (e[a].value === o) {
          e[a].selected = !0, s && (e[a].defaultSelected = !0);
          return;
        }
        n !== null || e[a].disabled || (n = e[a]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Me(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(i(91));
    return O({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Te(e, n) {
    var o = n.value;
    if (o == null) {
      if (o = n.children, n = n.defaultValue, o != null) {
        if (n != null) throw Error(i(92));
        if (ne(o)) {
          if (1 < o.length) throw Error(i(93));
          o = o[0];
        }
        n = o;
      }
      n == null && (n = ""), o = n;
    }
    e._wrapperState = { initialValue: se(o) };
  }
  function De(e, n) {
    var o = se(n.value), s = se(n.defaultValue);
    o != null && (o = "" + o, o !== e.value && (e.value = o), n.defaultValue == null && e.defaultValue !== o && (e.defaultValue = o)), s != null && (e.defaultValue = "" + s);
  }
  function Fe(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
  }
  function et(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function st(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? et(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var ct, qe = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, o, s, a) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(n, o, s, a);
      });
    } : e;
  })(function(e, n) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
    else {
      for (ct = ct || document.createElement("div"), ct.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = ct.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; n.firstChild; ) e.appendChild(n.firstChild);
    }
  });
  function je(e, n) {
    if (n) {
      var o = e.firstChild;
      if (o && o === e.lastChild && o.nodeType === 3) {
        o.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var It = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Ht = ["Webkit", "ms", "Moz", "O"];
  Object.keys(It).forEach(function(e) {
    Ht.forEach(function(n) {
      n = n + e.charAt(0).toUpperCase() + e.substring(1), It[n] = It[e];
    });
  });
  function tt(e, n, o) {
    return n == null || typeof n == "boolean" || n === "" ? "" : o || typeof n != "number" || n === 0 || It.hasOwnProperty(e) && It[e] ? ("" + n).trim() : n + "px";
  }
  function on(e, n) {
    e = e.style;
    for (var o in n) if (n.hasOwnProperty(o)) {
      var s = o.indexOf("--") === 0, a = tt(o, n[o], s);
      o === "float" && (o = "cssFloat"), s ? e.setProperty(o, a) : e[o] = a;
    }
  }
  var wt = O({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function In(e, n) {
    if (n) {
      if (wt[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(i(60));
        if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(i(62));
    }
  }
  function or(e, n) {
    if (e.indexOf("-") === -1) return typeof n.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var zn = null;
  function Rn(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var xt = null, ft = null, sn = null;
  function Pi(e) {
    if (e = Bo(e)) {
      if (typeof xt != "function") throw Error(i(280));
      var n = e.stateNode;
      n && (n = ns(n), xt(e.stateNode, e.type, n));
    }
  }
  function Ti(e) {
    ft ? sn ? sn.push(e) : sn = [e] : ft = e;
  }
  function vo() {
    if (ft) {
      var e = ft, n = sn;
      if (sn = ft = null, Pi(e), n) for (e = 0; e < n.length; e++) Pi(n[e]);
    }
  }
  function Li(e, n) {
    return e(n);
  }
  function Ii() {
  }
  var wo = !1;
  function zi(e, n, o) {
    if (wo) return e(n, o);
    wo = !0;
    try {
      return Li(e, n, o);
    } finally {
      wo = !1, (ft !== null || sn !== null) && (Ii(), vo());
    }
  }
  function ir(e, n) {
    var o = e.stateNode;
    if (o === null) return null;
    var s = ns(o);
    if (s === null) return null;
    o = s[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (o && typeof o != "function") throw Error(i(231, n, typeof o));
    return o;
  }
  var xo = !1;
  if (p) try {
    var sr = {};
    Object.defineProperty(sr, "passive", { get: function() {
      xo = !0;
    } }), window.addEventListener("test", sr, sr), window.removeEventListener("test", sr, sr);
  } catch {
    xo = !1;
  }
  function Ml(e, n, o, s, a, d, w, T, I) {
    var Q = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(o, Q);
    } catch (ie) {
      this.onError(ie);
    }
  }
  var lr = !1, Lr = null, Ir = !1, So = null, Pl = { onError: function(e) {
    lr = !0, Lr = e;
  } };
  function Tl(e, n, o, s, a, d, w, T, I) {
    lr = !1, Lr = null, Ml.apply(Pl, arguments);
  }
  function Ll(e, n, o, s, a, d, w, T, I) {
    if (Tl.apply(this, arguments), lr) {
      if (lr) {
        var Q = Lr;
        lr = !1, Lr = null;
      } else throw Error(i(198));
      Ir || (Ir = !0, So = Q);
    }
  }
  function ln(e) {
    var n = e, o = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (o = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? o : null;
  }
  function Eo(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function _o(e) {
    if (ln(e) !== e) throw Error(i(188));
  }
  function Il(e) {
    var n = e.alternate;
    if (!n) {
      if (n = ln(e), n === null) throw Error(i(188));
      return n !== e ? null : e;
    }
    for (var o = e, s = n; ; ) {
      var a = o.return;
      if (a === null) break;
      var d = a.alternate;
      if (d === null) {
        if (s = a.return, s !== null) {
          o = s;
          continue;
        }
        break;
      }
      if (a.child === d.child) {
        for (d = a.child; d; ) {
          if (d === o) return _o(a), e;
          if (d === s) return _o(a), n;
          d = d.sibling;
        }
        throw Error(i(188));
      }
      if (o.return !== s.return) o = a, s = d;
      else {
        for (var w = !1, T = a.child; T; ) {
          if (T === o) {
            w = !0, o = a, s = d;
            break;
          }
          if (T === s) {
            w = !0, s = a, o = d;
            break;
          }
          T = T.sibling;
        }
        if (!w) {
          for (T = d.child; T; ) {
            if (T === o) {
              w = !0, o = d, s = a;
              break;
            }
            if (T === s) {
              w = !0, s = d, o = a;
              break;
            }
            T = T.sibling;
          }
          if (!w) throw Error(i(189));
        }
      }
      if (o.alternate !== s) throw Error(i(190));
    }
    if (o.tag !== 3) throw Error(i(188));
    return o.stateNode.current === o ? e : n;
  }
  function Ri(e) {
    return e = Il(e), e !== null ? Ai(e) : null;
  }
  function Ai(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var n = Ai(e);
      if (n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var $i = r.unstable_scheduleCallback, Di = r.unstable_cancelCallback, zl = r.unstable_shouldYield, Oi = r.unstable_requestPaint, Ye = r.unstable_now, Rl = r.unstable_getCurrentPriorityLevel, ko = r.unstable_ImmediatePriority, Fi = r.unstable_UserBlockingPriority, zr = r.unstable_NormalPriority, Al = r.unstable_LowPriority, ji = r.unstable_IdlePriority, ur = null, bt = null;
  function $l(e) {
    if (bt && typeof bt.onCommitFiberRoot == "function") try {
      bt.onCommitFiberRoot(ur, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var zt = Math.clz32 ? Math.clz32 : Fl, Dl = Math.log, Ol = Math.LN2;
  function Fl(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Dl(e) / Ol | 0) | 0;
  }
  var Rr = 64, Ar = 4194304;
  function un(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function $r(e, n) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var s = 0, a = e.suspendedLanes, d = e.pingedLanes, w = o & 268435455;
    if (w !== 0) {
      var T = w & ~a;
      T !== 0 ? s = un(T) : (d &= w, d !== 0 && (s = un(d)));
    } else w = o & ~a, w !== 0 ? s = un(w) : d !== 0 && (s = un(d));
    if (s === 0) return 0;
    if (n !== 0 && n !== s && (n & a) === 0 && (a = s & -s, d = n & -n, a >= d || a === 16 && (d & 4194240) !== 0)) return n;
    if ((s & 4) !== 0 && (s |= o & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= s; 0 < n; ) o = 31 - zt(n), a = 1 << o, s |= e[o], n &= ~a;
    return s;
  }
  function jl(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Hl(e, n) {
    for (var o = e.suspendedLanes, s = e.pingedLanes, a = e.expirationTimes, d = e.pendingLanes; 0 < d; ) {
      var w = 31 - zt(d), T = 1 << w, I = a[w];
      I === -1 ? ((T & o) === 0 || (T & s) !== 0) && (a[w] = jl(T, n)) : I <= n && (e.expiredLanes |= T), d &= ~T;
    }
  }
  function ar(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Hi() {
    var e = Rr;
    return Rr <<= 1, (Rr & 4194240) === 0 && (Rr = 64), e;
  }
  function No(e) {
    for (var n = [], o = 0; 31 > o; o++) n.push(e);
    return n;
  }
  function An(e, n, o) {
    e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - zt(n), e[n] = o;
  }
  function Vm(e, n) {
    var o = e.pendingLanes & ~n;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
    var s = e.eventTimes;
    for (e = e.expirationTimes; 0 < o; ) {
      var a = 31 - zt(o), d = 1 << a;
      n[a] = 0, s[a] = -1, e[a] = -1, o &= ~d;
    }
  }
  function bl(e, n) {
    var o = e.entangledLanes |= n;
    for (e = e.entanglements; o; ) {
      var s = 31 - zt(o), a = 1 << s;
      a & n | e[s] & n && (e[s] |= n), o &= ~a;
    }
  }
  var $e = 0;
  function mc(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var gc, Bl, yc, vc, wc, Vl = !1, bi = [], $n = null, Dn = null, On = null, Co = /* @__PURE__ */ new Map(), Mo = /* @__PURE__ */ new Map(), Fn = [], Um = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function xc(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        $n = null;
        break;
      case "dragenter":
      case "dragleave":
        Dn = null;
        break;
      case "mouseover":
      case "mouseout":
        On = null;
        break;
      case "pointerover":
      case "pointerout":
        Co.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mo.delete(n.pointerId);
    }
  }
  function Po(e, n, o, s, a, d) {
    return e === null || e.nativeEvent !== d ? (e = { blockedOn: n, domEventName: o, eventSystemFlags: s, nativeEvent: d, targetContainers: [a] }, n !== null && (n = Bo(n), n !== null && Bl(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, a !== null && n.indexOf(a) === -1 && n.push(a), e);
  }
  function Wm(e, n, o, s, a) {
    switch (n) {
      case "focusin":
        return $n = Po($n, e, n, o, s, a), !0;
      case "dragenter":
        return Dn = Po(Dn, e, n, o, s, a), !0;
      case "mouseover":
        return On = Po(On, e, n, o, s, a), !0;
      case "pointerover":
        var d = a.pointerId;
        return Co.set(d, Po(Co.get(d) || null, e, n, o, s, a)), !0;
      case "gotpointercapture":
        return d = a.pointerId, Mo.set(d, Po(Mo.get(d) || null, e, n, o, s, a)), !0;
    }
    return !1;
  }
  function Sc(e) {
    var n = cr(e.target);
    if (n !== null) {
      var o = ln(n);
      if (o !== null) {
        if (n = o.tag, n === 13) {
          if (n = Eo(o), n !== null) {
            e.blockedOn = n, wc(e.priority, function() {
              yc(o);
            });
            return;
          }
        } else if (n === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Bi(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var o = Wl(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
      if (o === null) {
        o = e.nativeEvent;
        var s = new o.constructor(o.type, o);
        zn = s, o.target.dispatchEvent(s), zn = null;
      } else return n = Bo(o), n !== null && Bl(n), e.blockedOn = o, !1;
      n.shift();
    }
    return !0;
  }
  function Ec(e, n, o) {
    Bi(e) && o.delete(n);
  }
  function Ym() {
    Vl = !1, $n !== null && Bi($n) && ($n = null), Dn !== null && Bi(Dn) && (Dn = null), On !== null && Bi(On) && (On = null), Co.forEach(Ec), Mo.forEach(Ec);
  }
  function To(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Vl || (Vl = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ym)));
  }
  function Lo(e) {
    function n(a) {
      return To(a, e);
    }
    if (0 < bi.length) {
      To(bi[0], e);
      for (var o = 1; o < bi.length; o++) {
        var s = bi[o];
        s.blockedOn === e && (s.blockedOn = null);
      }
    }
    for ($n !== null && To($n, e), Dn !== null && To(Dn, e), On !== null && To(On, e), Co.forEach(n), Mo.forEach(n), o = 0; o < Fn.length; o++) s = Fn[o], s.blockedOn === e && (s.blockedOn = null);
    for (; 0 < Fn.length && (o = Fn[0], o.blockedOn === null); ) Sc(o), o.blockedOn === null && Fn.shift();
  }
  var Dr = P.ReactCurrentBatchConfig, Vi = !0;
  function Xm(e, n, o, s) {
    var a = $e, d = Dr.transition;
    Dr.transition = null;
    try {
      $e = 1, Ul(e, n, o, s);
    } finally {
      $e = a, Dr.transition = d;
    }
  }
  function Km(e, n, o, s) {
    var a = $e, d = Dr.transition;
    Dr.transition = null;
    try {
      $e = 4, Ul(e, n, o, s);
    } finally {
      $e = a, Dr.transition = d;
    }
  }
  function Ul(e, n, o, s) {
    if (Vi) {
      var a = Wl(e, n, o, s);
      if (a === null) uu(e, n, s, Ui, o), xc(e, s);
      else if (Wm(a, e, n, o, s)) s.stopPropagation();
      else if (xc(e, s), n & 4 && -1 < Um.indexOf(e)) {
        for (; a !== null; ) {
          var d = Bo(a);
          if (d !== null && gc(d), d = Wl(e, n, o, s), d === null && uu(e, n, s, Ui, o), d === a) break;
          a = d;
        }
        a !== null && s.stopPropagation();
      } else uu(e, n, s, null, o);
    }
  }
  var Ui = null;
  function Wl(e, n, o, s) {
    if (Ui = null, e = Rn(s), e = cr(e), e !== null) if (n = ln(e), n === null) e = null;
    else if (o = n.tag, o === 13) {
      if (e = Eo(n), e !== null) return e;
      e = null;
    } else if (o === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
      e = null;
    } else n !== e && (e = null);
    return Ui = e, null;
  }
  function _c(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Rl()) {
          case ko:
            return 1;
          case Fi:
            return 4;
          case zr:
          case Al:
            return 16;
          case ji:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var jn = null, Yl = null, Wi = null;
  function kc() {
    if (Wi) return Wi;
    var e, n = Yl, o = n.length, s, a = "value" in jn ? jn.value : jn.textContent, d = a.length;
    for (e = 0; e < o && n[e] === a[e]; e++) ;
    var w = o - e;
    for (s = 1; s <= w && n[o - s] === a[d - s]; s++) ;
    return Wi = a.slice(e, 1 < s ? 1 - s : void 0);
  }
  function Yi(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Xi() {
    return !0;
  }
  function Nc() {
    return !1;
  }
  function Rt(e) {
    function n(o, s, a, d, w) {
      this._reactName = o, this._targetInst = a, this.type = s, this.nativeEvent = d, this.target = w, this.currentTarget = null;
      for (var T in e) e.hasOwnProperty(T) && (o = e[T], this[T] = o ? o(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Xi : Nc, this.isPropagationStopped = Nc, this;
    }
    return O(n.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var o = this.nativeEvent;
      o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = Xi);
    }, stopPropagation: function() {
      var o = this.nativeEvent;
      o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = Xi);
    }, persist: function() {
    }, isPersistent: Xi }), n;
  }
  var Or = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Xl = Rt(Or), Io = O({}, Or, { view: 0, detail: 0 }), Qm = Rt(Io), Kl, Ql, zo, Ki = O({}, Io, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ql, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== zo && (zo && e.type === "mousemove" ? (Kl = e.screenX - zo.screenX, Ql = e.screenY - zo.screenY) : Ql = Kl = 0, zo = e), Kl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ql;
  } }), Cc = Rt(Ki), Gm = O({}, Ki, { dataTransfer: 0 }), qm = Rt(Gm), Zm = O({}, Io, { relatedTarget: 0 }), Gl = Rt(Zm), Jm = O({}, Or, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), eg = Rt(Jm), tg = O({}, Or, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), ng = Rt(tg), rg = O({}, Or, { data: 0 }), Mc = Rt(rg), og = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, ig = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, sg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function lg(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = sg[e]) ? !!n[e] : !1;
  }
  function ql() {
    return lg;
  }
  var ug = O({}, Io, { key: function(e) {
    if (e.key) {
      var n = og[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = Yi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ig[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ql, charCode: function(e) {
    return e.type === "keypress" ? Yi(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Yi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), ag = Rt(ug), cg = O({}, Ki, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pc = Rt(cg), fg = O({}, Io, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ql }), dg = Rt(fg), pg = O({}, Or, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), hg = Rt(pg), mg = O({}, Ki, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gg = Rt(mg), yg = [9, 13, 27, 32], Zl = p && "CompositionEvent" in window, Ro = null;
  p && "documentMode" in document && (Ro = document.documentMode);
  var vg = p && "TextEvent" in window && !Ro, Tc = p && (!Zl || Ro && 8 < Ro && 11 >= Ro), Lc = " ", Ic = !1;
  function zc(e, n) {
    switch (e) {
      case "keyup":
        return yg.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Fr = !1;
  function wg(e, n) {
    switch (e) {
      case "compositionend":
        return Rc(n);
      case "keypress":
        return n.which !== 32 ? null : (Ic = !0, Lc);
      case "textInput":
        return e = n.data, e === Lc && Ic ? null : e;
      default:
        return null;
    }
  }
  function xg(e, n) {
    if (Fr) return e === "compositionend" || !Zl && zc(e, n) ? (e = kc(), Wi = Yl = jn = null, Fr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Tc && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Sg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Ac(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Sg[e.type] : n === "textarea";
  }
  function $c(e, n, o, s) {
    Ti(s), n = Ji(n, "onChange"), 0 < n.length && (o = new Xl("onChange", "change", null, o, s), e.push({ event: o, listeners: n }));
  }
  var Ao = null, $o = null;
  function Eg(e) {
    Jc(e, 0);
  }
  function Qi(e) {
    var n = Vr(e);
    if (Se(n)) return e;
  }
  function _g(e, n) {
    if (e === "change") return n;
  }
  var Dc = !1;
  if (p) {
    var Jl;
    if (p) {
      var eu = "oninput" in document;
      if (!eu) {
        var Oc = document.createElement("div");
        Oc.setAttribute("oninput", "return;"), eu = typeof Oc.oninput == "function";
      }
      Jl = eu;
    } else Jl = !1;
    Dc = Jl && (!document.documentMode || 9 < document.documentMode);
  }
  function Fc() {
    Ao && (Ao.detachEvent("onpropertychange", jc), $o = Ao = null);
  }
  function jc(e) {
    if (e.propertyName === "value" && Qi($o)) {
      var n = [];
      $c(n, $o, e, Rn(e)), zi(Eg, n);
    }
  }
  function kg(e, n, o) {
    e === "focusin" ? (Fc(), Ao = n, $o = o, Ao.attachEvent("onpropertychange", jc)) : e === "focusout" && Fc();
  }
  function Ng(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qi($o);
  }
  function Cg(e, n) {
    if (e === "click") return Qi(n);
  }
  function Mg(e, n) {
    if (e === "input" || e === "change") return Qi(n);
  }
  function Pg(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Kt = typeof Object.is == "function" ? Object.is : Pg;
  function Do(e, n) {
    if (Kt(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var o = Object.keys(e), s = Object.keys(n);
    if (o.length !== s.length) return !1;
    for (s = 0; s < o.length; s++) {
      var a = o[s];
      if (!h.call(n, a) || !Kt(e[a], n[a])) return !1;
    }
    return !0;
  }
  function Hc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bc(e, n) {
    var o = Hc(e);
    e = 0;
    for (var s; o; ) {
      if (o.nodeType === 3) {
        if (s = e + o.textContent.length, e <= n && s >= n) return { node: o, offset: n - e };
        e = s;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Hc(o);
    }
  }
  function Bc(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Bc(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Vc() {
    for (var e = window, n = Ee(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var o = typeof n.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) e = n.contentWindow;
      else break;
      n = Ee(e.document);
    }
    return n;
  }
  function tu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  function Tg(e) {
    var n = Vc(), o = e.focusedElem, s = e.selectionRange;
    if (n !== o && o && o.ownerDocument && Bc(o.ownerDocument.documentElement, o)) {
      if (s !== null && tu(o)) {
        if (n = s.start, e = s.end, e === void 0 && (e = n), "selectionStart" in o) o.selectionStart = n, o.selectionEnd = Math.min(e, o.value.length);
        else if (e = (n = o.ownerDocument || document) && n.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var a = o.textContent.length, d = Math.min(s.start, a);
          s = s.end === void 0 ? d : Math.min(s.end, a), !e.extend && d > s && (a = s, s = d, d = a), a = bc(o, d);
          var w = bc(
            o,
            s
          );
          a && w && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== w.node || e.focusOffset !== w.offset) && (n = n.createRange(), n.setStart(a.node, a.offset), e.removeAllRanges(), d > s ? (e.addRange(n), e.extend(w.node, w.offset)) : (n.setEnd(w.node, w.offset), e.addRange(n)));
        }
      }
      for (n = [], e = o; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < n.length; o++) e = n[o], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Lg = p && "documentMode" in document && 11 >= document.documentMode, jr = null, nu = null, Oo = null, ru = !1;
  function Uc(e, n, o) {
    var s = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    ru || jr == null || jr !== Ee(s) || (s = jr, "selectionStart" in s && tu(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Oo && Do(Oo, s) || (Oo = s, s = Ji(nu, "onSelect"), 0 < s.length && (n = new Xl("onSelect", "select", null, n, o), e.push({ event: n, listeners: s }), n.target = jr)));
  }
  function Gi(e, n) {
    var o = {};
    return o[e.toLowerCase()] = n.toLowerCase(), o["Webkit" + e] = "webkit" + n, o["Moz" + e] = "moz" + n, o;
  }
  var Hr = { animationend: Gi("Animation", "AnimationEnd"), animationiteration: Gi("Animation", "AnimationIteration"), animationstart: Gi("Animation", "AnimationStart"), transitionend: Gi("Transition", "TransitionEnd") }, ou = {}, Wc = {};
  p && (Wc = document.createElement("div").style, "AnimationEvent" in window || (delete Hr.animationend.animation, delete Hr.animationiteration.animation, delete Hr.animationstart.animation), "TransitionEvent" in window || delete Hr.transitionend.transition);
  function qi(e) {
    if (ou[e]) return ou[e];
    if (!Hr[e]) return e;
    var n = Hr[e], o;
    for (o in n) if (n.hasOwnProperty(o) && o in Wc) return ou[e] = n[o];
    return e;
  }
  var Yc = qi("animationend"), Xc = qi("animationiteration"), Kc = qi("animationstart"), Qc = qi("transitionend"), Gc = /* @__PURE__ */ new Map(), qc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Hn(e, n) {
    Gc.set(e, n), c(n, [e]);
  }
  for (var iu = 0; iu < qc.length; iu++) {
    var su = qc[iu], Ig = su.toLowerCase(), zg = su[0].toUpperCase() + su.slice(1);
    Hn(Ig, "on" + zg);
  }
  Hn(Yc, "onAnimationEnd"), Hn(Xc, "onAnimationIteration"), Hn(Kc, "onAnimationStart"), Hn("dblclick", "onDoubleClick"), Hn("focusin", "onFocus"), Hn("focusout", "onBlur"), Hn(Qc, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), c("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Fo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Rg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Fo));
  function Zc(e, n, o) {
    var s = e.type || "unknown-event";
    e.currentTarget = o, Ll(s, n, void 0, e), e.currentTarget = null;
  }
  function Jc(e, n) {
    n = (n & 4) !== 0;
    for (var o = 0; o < e.length; o++) {
      var s = e[o], a = s.event;
      s = s.listeners;
      e: {
        var d = void 0;
        if (n) for (var w = s.length - 1; 0 <= w; w--) {
          var T = s[w], I = T.instance, Q = T.currentTarget;
          if (T = T.listener, I !== d && a.isPropagationStopped()) break e;
          Zc(a, T, Q), d = I;
        }
        else for (w = 0; w < s.length; w++) {
          if (T = s[w], I = T.instance, Q = T.currentTarget, T = T.listener, I !== d && a.isPropagationStopped()) break e;
          Zc(a, T, Q), d = I;
        }
      }
    }
    if (Ir) throw e = So, Ir = !1, So = null, e;
  }
  function be(e, n) {
    var o = n[hu];
    o === void 0 && (o = n[hu] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    o.has(s) || (ef(n, e, 2, !1), o.add(s));
  }
  function lu(e, n, o) {
    var s = 0;
    n && (s |= 4), ef(o, e, s, n);
  }
  var Zi = "_reactListening" + Math.random().toString(36).slice(2);
  function jo(e) {
    if (!e[Zi]) {
      e[Zi] = !0, l.forEach(function(o) {
        o !== "selectionchange" && (Rg.has(o) || lu(o, !1, e), lu(o, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Zi] || (n[Zi] = !0, lu("selectionchange", !1, n));
    }
  }
  function ef(e, n, o, s) {
    switch (_c(n)) {
      case 1:
        var a = Xm;
        break;
      case 4:
        a = Km;
        break;
      default:
        a = Ul;
    }
    o = a.bind(null, n, o, e), a = void 0, !xo || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (a = !0), s ? a !== void 0 ? e.addEventListener(n, o, { capture: !0, passive: a }) : e.addEventListener(n, o, !0) : a !== void 0 ? e.addEventListener(n, o, { passive: a }) : e.addEventListener(n, o, !1);
  }
  function uu(e, n, o, s, a) {
    var d = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null) e: for (; ; ) {
      if (s === null) return;
      var w = s.tag;
      if (w === 3 || w === 4) {
        var T = s.stateNode.containerInfo;
        if (T === a || T.nodeType === 8 && T.parentNode === a) break;
        if (w === 4) for (w = s.return; w !== null; ) {
          var I = w.tag;
          if ((I === 3 || I === 4) && (I = w.stateNode.containerInfo, I === a || I.nodeType === 8 && I.parentNode === a)) return;
          w = w.return;
        }
        for (; T !== null; ) {
          if (w = cr(T), w === null) return;
          if (I = w.tag, I === 5 || I === 6) {
            s = d = w;
            continue e;
          }
          T = T.parentNode;
        }
      }
      s = s.return;
    }
    zi(function() {
      var Q = d, ie = Rn(o), le = [];
      e: {
        var re = Gc.get(e);
        if (re !== void 0) {
          var he = Xl, ge = e;
          switch (e) {
            case "keypress":
              if (Yi(o) === 0) break e;
            case "keydown":
            case "keyup":
              he = ag;
              break;
            case "focusin":
              ge = "focus", he = Gl;
              break;
            case "focusout":
              ge = "blur", he = Gl;
              break;
            case "beforeblur":
            case "afterblur":
              he = Gl;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              he = Cc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              he = qm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              he = dg;
              break;
            case Yc:
            case Xc:
            case Kc:
              he = eg;
              break;
            case Qc:
              he = hg;
              break;
            case "scroll":
              he = Qm;
              break;
            case "wheel":
              he = gg;
              break;
            case "copy":
            case "cut":
            case "paste":
              he = ng;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              he = Pc;
          }
          var ye = (n & 4) !== 0, Ze = !ye && e === "scroll", U = ye ? re !== null ? re + "Capture" : null : re;
          ye = [];
          for (var $ = Q, X; $ !== null; ) {
            X = $;
            var ae = X.stateNode;
            if (X.tag === 5 && ae !== null && (X = ae, U !== null && (ae = ir($, U), ae != null && ye.push(Ho($, ae, X)))), Ze) break;
            $ = $.return;
          }
          0 < ye.length && (re = new he(re, ge, null, o, ie), le.push({ event: re, listeners: ye }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (re = e === "mouseover" || e === "pointerover", he = e === "mouseout" || e === "pointerout", re && o !== zn && (ge = o.relatedTarget || o.fromElement) && (cr(ge) || ge[vn])) break e;
          if ((he || re) && (re = ie.window === ie ? ie : (re = ie.ownerDocument) ? re.defaultView || re.parentWindow : window, he ? (ge = o.relatedTarget || o.toElement, he = Q, ge = ge ? cr(ge) : null, ge !== null && (Ze = ln(ge), ge !== Ze || ge.tag !== 5 && ge.tag !== 6) && (ge = null)) : (he = null, ge = Q), he !== ge)) {
            if (ye = Cc, ae = "onMouseLeave", U = "onMouseEnter", $ = "mouse", (e === "pointerout" || e === "pointerover") && (ye = Pc, ae = "onPointerLeave", U = "onPointerEnter", $ = "pointer"), Ze = he == null ? re : Vr(he), X = ge == null ? re : Vr(ge), re = new ye(ae, $ + "leave", he, o, ie), re.target = Ze, re.relatedTarget = X, ae = null, cr(ie) === Q && (ye = new ye(U, $ + "enter", ge, o, ie), ye.target = X, ye.relatedTarget = Ze, ae = ye), Ze = ae, he && ge) t: {
              for (ye = he, U = ge, $ = 0, X = ye; X; X = br(X)) $++;
              for (X = 0, ae = U; ae; ae = br(ae)) X++;
              for (; 0 < $ - X; ) ye = br(ye), $--;
              for (; 0 < X - $; ) U = br(U), X--;
              for (; $--; ) {
                if (ye === U || U !== null && ye === U.alternate) break t;
                ye = br(ye), U = br(U);
              }
              ye = null;
            }
            else ye = null;
            he !== null && tf(le, re, he, ye, !1), ge !== null && Ze !== null && tf(le, Ze, ge, ye, !0);
          }
        }
        e: {
          if (re = Q ? Vr(Q) : window, he = re.nodeName && re.nodeName.toLowerCase(), he === "select" || he === "input" && re.type === "file") var ve = _g;
          else if (Ac(re)) if (Dc) ve = Mg;
          else {
            ve = Ng;
            var _e = kg;
          }
          else (he = re.nodeName) && he.toLowerCase() === "input" && (re.type === "checkbox" || re.type === "radio") && (ve = Cg);
          if (ve && (ve = ve(e, Q))) {
            $c(le, ve, o, ie);
            break e;
          }
          _e && _e(e, re, Q), e === "focusout" && (_e = re._wrapperState) && _e.controlled && re.type === "number" && Lt(re, "number", re.value);
        }
        switch (_e = Q ? Vr(Q) : window, e) {
          case "focusin":
            (Ac(_e) || _e.contentEditable === "true") && (jr = _e, nu = Q, Oo = null);
            break;
          case "focusout":
            Oo = nu = jr = null;
            break;
          case "mousedown":
            ru = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ru = !1, Uc(le, o, ie);
            break;
          case "selectionchange":
            if (Lg) break;
          case "keydown":
          case "keyup":
            Uc(le, o, ie);
        }
        var ke;
        if (Zl) e: {
          switch (e) {
            case "compositionstart":
              var Ce = "onCompositionStart";
              break e;
            case "compositionend":
              Ce = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Ce = "onCompositionUpdate";
              break e;
          }
          Ce = void 0;
        }
        else Fr ? zc(e, o) && (Ce = "onCompositionEnd") : e === "keydown" && o.keyCode === 229 && (Ce = "onCompositionStart");
        Ce && (Tc && o.locale !== "ko" && (Fr || Ce !== "onCompositionStart" ? Ce === "onCompositionEnd" && Fr && (ke = kc()) : (jn = ie, Yl = "value" in jn ? jn.value : jn.textContent, Fr = !0)), _e = Ji(Q, Ce), 0 < _e.length && (Ce = new Mc(Ce, e, null, o, ie), le.push({ event: Ce, listeners: _e }), ke ? Ce.data = ke : (ke = Rc(o), ke !== null && (Ce.data = ke)))), (ke = vg ? wg(e, o) : xg(e, o)) && (Q = Ji(Q, "onBeforeInput"), 0 < Q.length && (ie = new Mc("onBeforeInput", "beforeinput", null, o, ie), le.push({ event: ie, listeners: Q }), ie.data = ke));
      }
      Jc(le, n);
    });
  }
  function Ho(e, n, o) {
    return { instance: e, listener: n, currentTarget: o };
  }
  function Ji(e, n) {
    for (var o = n + "Capture", s = []; e !== null; ) {
      var a = e, d = a.stateNode;
      a.tag === 5 && d !== null && (a = d, d = ir(e, o), d != null && s.unshift(Ho(e, d, a)), d = ir(e, n), d != null && s.push(Ho(e, d, a))), e = e.return;
    }
    return s;
  }
  function br(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function tf(e, n, o, s, a) {
    for (var d = n._reactName, w = []; o !== null && o !== s; ) {
      var T = o, I = T.alternate, Q = T.stateNode;
      if (I !== null && I === s) break;
      T.tag === 5 && Q !== null && (T = Q, a ? (I = ir(o, d), I != null && w.unshift(Ho(o, I, T))) : a || (I = ir(o, d), I != null && w.push(Ho(o, I, T)))), o = o.return;
    }
    w.length !== 0 && e.push({ event: n, listeners: w });
  }
  var Ag = /\r\n?/g, $g = /\u0000|\uFFFD/g;
  function nf(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ag, `
`).replace($g, "");
  }
  function es(e, n, o) {
    if (n = nf(n), nf(e) !== n && o) throw Error(i(425));
  }
  function ts() {
  }
  var au = null, cu = null;
  function fu(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var du = typeof setTimeout == "function" ? setTimeout : void 0, Dg = typeof clearTimeout == "function" ? clearTimeout : void 0, rf = typeof Promise == "function" ? Promise : void 0, Og = typeof queueMicrotask == "function" ? queueMicrotask : typeof rf < "u" ? function(e) {
    return rf.resolve(null).then(e).catch(Fg);
  } : du;
  function Fg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function pu(e, n) {
    var o = n, s = 0;
    do {
      var a = o.nextSibling;
      if (e.removeChild(o), a && a.nodeType === 8) if (o = a.data, o === "/$") {
        if (s === 0) {
          e.removeChild(a), Lo(n);
          return;
        }
        s--;
      } else o !== "$" && o !== "$?" && o !== "$!" || s++;
      o = a;
    } while (o);
    Lo(n);
  }
  function bn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?") break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  function of(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var o = e.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (n === 0) return e;
          n--;
        } else o === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Br = Math.random().toString(36).slice(2), an = "__reactFiber$" + Br, bo = "__reactProps$" + Br, vn = "__reactContainer$" + Br, hu = "__reactEvents$" + Br, jg = "__reactListeners$" + Br, Hg = "__reactHandles$" + Br;
  function cr(e) {
    var n = e[an];
    if (n) return n;
    for (var o = e.parentNode; o; ) {
      if (n = o[vn] || o[an]) {
        if (o = n.alternate, n.child !== null || o !== null && o.child !== null) for (e = of(e); e !== null; ) {
          if (o = e[an]) return o;
          e = of(e);
        }
        return n;
      }
      e = o, o = e.parentNode;
    }
    return null;
  }
  function Bo(e) {
    return e = e[an] || e[vn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Vr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function ns(e) {
    return e[bo] || null;
  }
  var mu = [], Ur = -1;
  function Bn(e) {
    return { current: e };
  }
  function Be(e) {
    0 > Ur || (e.current = mu[Ur], mu[Ur] = null, Ur--);
  }
  function He(e, n) {
    Ur++, mu[Ur] = e.current, e.current = n;
  }
  var Vn = {}, ht = Bn(Vn), _t = Bn(!1), fr = Vn;
  function Wr(e, n) {
    var o = e.type.contextTypes;
    if (!o) return Vn;
    var s = e.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === n) return s.__reactInternalMemoizedMaskedChildContext;
    var a = {}, d;
    for (d in o) a[d] = n[d];
    return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }
  function kt(e) {
    return e = e.childContextTypes, e != null;
  }
  function rs() {
    Be(_t), Be(ht);
  }
  function sf(e, n, o) {
    if (ht.current !== Vn) throw Error(i(168));
    He(ht, n), He(_t, o);
  }
  function lf(e, n, o) {
    var s = e.stateNode;
    if (n = n.childContextTypes, typeof s.getChildContext != "function") return o;
    s = s.getChildContext();
    for (var a in s) if (!(a in n)) throw Error(i(108, fe(e) || "Unknown", a));
    return O({}, o, s);
  }
  function os(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Vn, fr = ht.current, He(ht, e), He(_t, _t.current), !0;
  }
  function uf(e, n, o) {
    var s = e.stateNode;
    if (!s) throw Error(i(169));
    o ? (e = lf(e, n, fr), s.__reactInternalMemoizedMergedChildContext = e, Be(_t), Be(ht), He(ht, e)) : Be(_t), He(_t, o);
  }
  var wn = null, is = !1, gu = !1;
  function af(e) {
    wn === null ? wn = [e] : wn.push(e);
  }
  function bg(e) {
    is = !0, af(e);
  }
  function Un() {
    if (!gu && wn !== null) {
      gu = !0;
      var e = 0, n = $e;
      try {
        var o = wn;
        for ($e = 1; e < o.length; e++) {
          var s = o[e];
          do
            s = s(!0);
          while (s !== null);
        }
        wn = null, is = !1;
      } catch (a) {
        throw wn !== null && (wn = wn.slice(e + 1)), $i(ko, Un), a;
      } finally {
        $e = n, gu = !1;
      }
    }
    return null;
  }
  var Yr = [], Xr = 0, ss = null, ls = 0, Bt = [], Vt = 0, dr = null, xn = 1, Sn = "";
  function pr(e, n) {
    Yr[Xr++] = ls, Yr[Xr++] = ss, ss = e, ls = n;
  }
  function cf(e, n, o) {
    Bt[Vt++] = xn, Bt[Vt++] = Sn, Bt[Vt++] = dr, dr = e;
    var s = xn;
    e = Sn;
    var a = 32 - zt(s) - 1;
    s &= ~(1 << a), o += 1;
    var d = 32 - zt(n) + a;
    if (30 < d) {
      var w = a - a % 5;
      d = (s & (1 << w) - 1).toString(32), s >>= w, a -= w, xn = 1 << 32 - zt(n) + a | o << a | s, Sn = d + e;
    } else xn = 1 << d | o << a | s, Sn = e;
  }
  function yu(e) {
    e.return !== null && (pr(e, 1), cf(e, 1, 0));
  }
  function vu(e) {
    for (; e === ss; ) ss = Yr[--Xr], Yr[Xr] = null, ls = Yr[--Xr], Yr[Xr] = null;
    for (; e === dr; ) dr = Bt[--Vt], Bt[Vt] = null, Sn = Bt[--Vt], Bt[Vt] = null, xn = Bt[--Vt], Bt[Vt] = null;
  }
  var At = null, $t = null, Ve = !1, Qt = null;
  function ff(e, n) {
    var o = Xt(5, null, null, 0);
    o.elementType = "DELETED", o.stateNode = n, o.return = e, n = e.deletions, n === null ? (e.deletions = [o], e.flags |= 16) : n.push(o);
  }
  function df(e, n) {
    switch (e.tag) {
      case 5:
        var o = e.type;
        return n = n.nodeType !== 1 || o.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, At = e, $t = bn(n.firstChild), !0) : !1;
      case 6:
        return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, At = e, $t = null, !0) : !1;
      case 13:
        return n = n.nodeType !== 8 ? null : n, n !== null ? (o = dr !== null ? { id: xn, overflow: Sn } : null, e.memoizedState = { dehydrated: n, treeContext: o, retryLane: 1073741824 }, o = Xt(18, null, null, 0), o.stateNode = n, o.return = e, e.child = o, At = e, $t = null, !0) : !1;
      default:
        return !1;
    }
  }
  function wu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function xu(e) {
    if (Ve) {
      var n = $t;
      if (n) {
        var o = n;
        if (!df(e, n)) {
          if (wu(e)) throw Error(i(418));
          n = bn(o.nextSibling);
          var s = At;
          n && df(e, n) ? ff(s, o) : (e.flags = e.flags & -4097 | 2, Ve = !1, At = e);
        }
      } else {
        if (wu(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, Ve = !1, At = e;
      }
    }
  }
  function pf(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    At = e;
  }
  function us(e) {
    if (e !== At) return !1;
    if (!Ve) return pf(e), Ve = !0, !1;
    var n;
    if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !fu(e.type, e.memoizedProps)), n && (n = $t)) {
      if (wu(e)) throw hf(), Error(i(418));
      for (; n; ) ff(e, n), n = bn(n.nextSibling);
    }
    if (pf(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var o = e.data;
            if (o === "/$") {
              if (n === 0) {
                $t = bn(e.nextSibling);
                break e;
              }
              n--;
            } else o !== "$" && o !== "$!" && o !== "$?" || n++;
          }
          e = e.nextSibling;
        }
        $t = null;
      }
    } else $t = At ? bn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function hf() {
    for (var e = $t; e; ) e = bn(e.nextSibling);
  }
  function Kr() {
    $t = At = null, Ve = !1;
  }
  function Su(e) {
    Qt === null ? Qt = [e] : Qt.push(e);
  }
  var Bg = P.ReactCurrentBatchConfig;
  function Vo(e, n, o) {
    if (e = o.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (o._owner) {
        if (o = o._owner, o) {
          if (o.tag !== 1) throw Error(i(309));
          var s = o.stateNode;
        }
        if (!s) throw Error(i(147, e));
        var a = s, d = "" + e;
        return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === d ? n.ref : (n = function(w) {
          var T = a.refs;
          w === null ? delete T[d] : T[d] = w;
        }, n._stringRef = d, n);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!o._owner) throw Error(i(290, e));
    }
    return e;
  }
  function as(e, n) {
    throw e = Object.prototype.toString.call(n), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
  }
  function mf(e) {
    var n = e._init;
    return n(e._payload);
  }
  function gf(e) {
    function n(U, $) {
      if (e) {
        var X = U.deletions;
        X === null ? (U.deletions = [$], U.flags |= 16) : X.push($);
      }
    }
    function o(U, $) {
      if (!e) return null;
      for (; $ !== null; ) n(U, $), $ = $.sibling;
      return null;
    }
    function s(U, $) {
      for (U = /* @__PURE__ */ new Map(); $ !== null; ) $.key !== null ? U.set($.key, $) : U.set($.index, $), $ = $.sibling;
      return U;
    }
    function a(U, $) {
      return U = Zn(U, $), U.index = 0, U.sibling = null, U;
    }
    function d(U, $, X) {
      return U.index = X, e ? (X = U.alternate, X !== null ? (X = X.index, X < $ ? (U.flags |= 2, $) : X) : (U.flags |= 2, $)) : (U.flags |= 1048576, $);
    }
    function w(U) {
      return e && U.alternate === null && (U.flags |= 2), U;
    }
    function T(U, $, X, ae) {
      return $ === null || $.tag !== 6 ? ($ = da(X, U.mode, ae), $.return = U, $) : ($ = a($, X), $.return = U, $);
    }
    function I(U, $, X, ae) {
      var ve = X.type;
      return ve === B ? ie(U, $, X.props.children, ae, X.key) : $ !== null && ($.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === D && mf(ve) === $.type) ? (ae = a($, X.props), ae.ref = Vo(U, $, X), ae.return = U, ae) : (ae = Rs(X.type, X.key, X.props, null, U.mode, ae), ae.ref = Vo(U, $, X), ae.return = U, ae);
    }
    function Q(U, $, X, ae) {
      return $ === null || $.tag !== 4 || $.stateNode.containerInfo !== X.containerInfo || $.stateNode.implementation !== X.implementation ? ($ = pa(X, U.mode, ae), $.return = U, $) : ($ = a($, X.children || []), $.return = U, $);
    }
    function ie(U, $, X, ae, ve) {
      return $ === null || $.tag !== 7 ? ($ = Sr(X, U.mode, ae, ve), $.return = U, $) : ($ = a($, X), $.return = U, $);
    }
    function le(U, $, X) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") return $ = da("" + $, U.mode, X), $.return = U, $;
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case A:
            return X = Rs($.type, $.key, $.props, null, U.mode, X), X.ref = Vo(U, null, $), X.return = U, X;
          case H:
            return $ = pa($, U.mode, X), $.return = U, $;
          case D:
            var ae = $._init;
            return le(U, ae($._payload), X);
        }
        if (ne($) || L($)) return $ = Sr($, U.mode, X, null), $.return = U, $;
        as(U, $);
      }
      return null;
    }
    function re(U, $, X, ae) {
      var ve = $ !== null ? $.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return ve !== null ? null : T(U, $, "" + X, ae);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case A:
            return X.key === ve ? I(U, $, X, ae) : null;
          case H:
            return X.key === ve ? Q(U, $, X, ae) : null;
          case D:
            return ve = X._init, re(
              U,
              $,
              ve(X._payload),
              ae
            );
        }
        if (ne(X) || L(X)) return ve !== null ? null : ie(U, $, X, ae, null);
        as(U, X);
      }
      return null;
    }
    function he(U, $, X, ae, ve) {
      if (typeof ae == "string" && ae !== "" || typeof ae == "number") return U = U.get(X) || null, T($, U, "" + ae, ve);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case A:
            return U = U.get(ae.key === null ? X : ae.key) || null, I($, U, ae, ve);
          case H:
            return U = U.get(ae.key === null ? X : ae.key) || null, Q($, U, ae, ve);
          case D:
            var _e = ae._init;
            return he(U, $, X, _e(ae._payload), ve);
        }
        if (ne(ae) || L(ae)) return U = U.get(X) || null, ie($, U, ae, ve, null);
        as($, ae);
      }
      return null;
    }
    function ge(U, $, X, ae) {
      for (var ve = null, _e = null, ke = $, Ce = $ = 0, at = null; ke !== null && Ce < X.length; Ce++) {
        ke.index > Ce ? (at = ke, ke = null) : at = ke.sibling;
        var Re = re(U, ke, X[Ce], ae);
        if (Re === null) {
          ke === null && (ke = at);
          break;
        }
        e && ke && Re.alternate === null && n(U, ke), $ = d(Re, $, Ce), _e === null ? ve = Re : _e.sibling = Re, _e = Re, ke = at;
      }
      if (Ce === X.length) return o(U, ke), Ve && pr(U, Ce), ve;
      if (ke === null) {
        for (; Ce < X.length; Ce++) ke = le(U, X[Ce], ae), ke !== null && ($ = d(ke, $, Ce), _e === null ? ve = ke : _e.sibling = ke, _e = ke);
        return Ve && pr(U, Ce), ve;
      }
      for (ke = s(U, ke); Ce < X.length; Ce++) at = he(ke, U, Ce, X[Ce], ae), at !== null && (e && at.alternate !== null && ke.delete(at.key === null ? Ce : at.key), $ = d(at, $, Ce), _e === null ? ve = at : _e.sibling = at, _e = at);
      return e && ke.forEach(function(Jn) {
        return n(U, Jn);
      }), Ve && pr(U, Ce), ve;
    }
    function ye(U, $, X, ae) {
      var ve = L(X);
      if (typeof ve != "function") throw Error(i(150));
      if (X = ve.call(X), X == null) throw Error(i(151));
      for (var _e = ve = null, ke = $, Ce = $ = 0, at = null, Re = X.next(); ke !== null && !Re.done; Ce++, Re = X.next()) {
        ke.index > Ce ? (at = ke, ke = null) : at = ke.sibling;
        var Jn = re(U, ke, Re.value, ae);
        if (Jn === null) {
          ke === null && (ke = at);
          break;
        }
        e && ke && Jn.alternate === null && n(U, ke), $ = d(Jn, $, Ce), _e === null ? ve = Jn : _e.sibling = Jn, _e = Jn, ke = at;
      }
      if (Re.done) return o(
        U,
        ke
      ), Ve && pr(U, Ce), ve;
      if (ke === null) {
        for (; !Re.done; Ce++, Re = X.next()) Re = le(U, Re.value, ae), Re !== null && ($ = d(Re, $, Ce), _e === null ? ve = Re : _e.sibling = Re, _e = Re);
        return Ve && pr(U, Ce), ve;
      }
      for (ke = s(U, ke); !Re.done; Ce++, Re = X.next()) Re = he(ke, U, Ce, Re.value, ae), Re !== null && (e && Re.alternate !== null && ke.delete(Re.key === null ? Ce : Re.key), $ = d(Re, $, Ce), _e === null ? ve = Re : _e.sibling = Re, _e = Re);
      return e && ke.forEach(function(S0) {
        return n(U, S0);
      }), Ve && pr(U, Ce), ve;
    }
    function Ze(U, $, X, ae) {
      if (typeof X == "object" && X !== null && X.type === B && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case A:
            e: {
              for (var ve = X.key, _e = $; _e !== null; ) {
                if (_e.key === ve) {
                  if (ve = X.type, ve === B) {
                    if (_e.tag === 7) {
                      o(U, _e.sibling), $ = a(_e, X.props.children), $.return = U, U = $;
                      break e;
                    }
                  } else if (_e.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === D && mf(ve) === _e.type) {
                    o(U, _e.sibling), $ = a(_e, X.props), $.ref = Vo(U, _e, X), $.return = U, U = $;
                    break e;
                  }
                  o(U, _e);
                  break;
                } else n(U, _e);
                _e = _e.sibling;
              }
              X.type === B ? ($ = Sr(X.props.children, U.mode, ae, X.key), $.return = U, U = $) : (ae = Rs(X.type, X.key, X.props, null, U.mode, ae), ae.ref = Vo(U, $, X), ae.return = U, U = ae);
            }
            return w(U);
          case H:
            e: {
              for (_e = X.key; $ !== null; ) {
                if ($.key === _e) if ($.tag === 4 && $.stateNode.containerInfo === X.containerInfo && $.stateNode.implementation === X.implementation) {
                  o(U, $.sibling), $ = a($, X.children || []), $.return = U, U = $;
                  break e;
                } else {
                  o(U, $);
                  break;
                }
                else n(U, $);
                $ = $.sibling;
              }
              $ = pa(X, U.mode, ae), $.return = U, U = $;
            }
            return w(U);
          case D:
            return _e = X._init, Ze(U, $, _e(X._payload), ae);
        }
        if (ne(X)) return ge(U, $, X, ae);
        if (L(X)) return ye(U, $, X, ae);
        as(U, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, $ !== null && $.tag === 6 ? (o(U, $.sibling), $ = a($, X), $.return = U, U = $) : (o(U, $), $ = da(X, U.mode, ae), $.return = U, U = $), w(U)) : o(U, $);
    }
    return Ze;
  }
  var Qr = gf(!0), yf = gf(!1), cs = Bn(null), fs = null, Gr = null, Eu = null;
  function _u() {
    Eu = Gr = fs = null;
  }
  function ku(e) {
    var n = cs.current;
    Be(cs), e._currentValue = n;
  }
  function Nu(e, n, o) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === o) break;
      e = e.return;
    }
  }
  function qr(e, n) {
    fs = e, Eu = Gr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & n) !== 0 && (Nt = !0), e.firstContext = null);
  }
  function Ut(e) {
    var n = e._currentValue;
    if (Eu !== e) if (e = { context: e, memoizedValue: n, next: null }, Gr === null) {
      if (fs === null) throw Error(i(308));
      Gr = e, fs.dependencies = { lanes: 0, firstContext: e };
    } else Gr = Gr.next = e;
    return n;
  }
  var hr = null;
  function Cu(e) {
    hr === null ? hr = [e] : hr.push(e);
  }
  function vf(e, n, o, s) {
    var a = n.interleaved;
    return a === null ? (o.next = o, Cu(n)) : (o.next = a.next, a.next = o), n.interleaved = o, En(e, s);
  }
  function En(e, n) {
    e.lanes |= n;
    var o = e.alternate;
    for (o !== null && (o.lanes |= n), o = e, e = e.return; e !== null; ) e.childLanes |= n, o = e.alternate, o !== null && (o.childLanes |= n), o = e, e = e.return;
    return o.tag === 3 ? o.stateNode : null;
  }
  var Wn = !1;
  function Mu(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function wf(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function _n(e, n) {
    return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function Yn(e, n, o) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (ze & 2) !== 0) {
      var a = s.pending;
      return a === null ? n.next = n : (n.next = a.next, a.next = n), s.pending = n, En(e, o);
    }
    return a = s.interleaved, a === null ? (n.next = n, Cu(s)) : (n.next = a.next, a.next = n), s.interleaved = n, En(e, o);
  }
  function ds(e, n, o) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (o & 4194240) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, o |= s, n.lanes = o, bl(e, o);
    }
  }
  function xf(e, n) {
    var o = e.updateQueue, s = e.alternate;
    if (s !== null && (s = s.updateQueue, o === s)) {
      var a = null, d = null;
      if (o = o.firstBaseUpdate, o !== null) {
        do {
          var w = { eventTime: o.eventTime, lane: o.lane, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
          d === null ? a = d = w : d = d.next = w, o = o.next;
        } while (o !== null);
        d === null ? a = d = n : d = d.next = n;
      } else a = d = n;
      o = { baseState: s.baseState, firstBaseUpdate: a, lastBaseUpdate: d, shared: s.shared, effects: s.effects }, e.updateQueue = o;
      return;
    }
    e = o.lastBaseUpdate, e === null ? o.firstBaseUpdate = n : e.next = n, o.lastBaseUpdate = n;
  }
  function ps(e, n, o, s) {
    var a = e.updateQueue;
    Wn = !1;
    var d = a.firstBaseUpdate, w = a.lastBaseUpdate, T = a.shared.pending;
    if (T !== null) {
      a.shared.pending = null;
      var I = T, Q = I.next;
      I.next = null, w === null ? d = Q : w.next = Q, w = I;
      var ie = e.alternate;
      ie !== null && (ie = ie.updateQueue, T = ie.lastBaseUpdate, T !== w && (T === null ? ie.firstBaseUpdate = Q : T.next = Q, ie.lastBaseUpdate = I));
    }
    if (d !== null) {
      var le = a.baseState;
      w = 0, ie = Q = I = null, T = d;
      do {
        var re = T.lane, he = T.eventTime;
        if ((s & re) === re) {
          ie !== null && (ie = ie.next = {
            eventTime: he,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var ge = e, ye = T;
            switch (re = n, he = o, ye.tag) {
              case 1:
                if (ge = ye.payload, typeof ge == "function") {
                  le = ge.call(he, le, re);
                  break e;
                }
                le = ge;
                break e;
              case 3:
                ge.flags = ge.flags & -65537 | 128;
              case 0:
                if (ge = ye.payload, re = typeof ge == "function" ? ge.call(he, le, re) : ge, re == null) break e;
                le = O({}, le, re);
                break e;
              case 2:
                Wn = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (e.flags |= 64, re = a.effects, re === null ? a.effects = [T] : re.push(T));
        } else he = { eventTime: he, lane: re, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, ie === null ? (Q = ie = he, I = le) : ie = ie.next = he, w |= re;
        if (T = T.next, T === null) {
          if (T = a.shared.pending, T === null) break;
          re = T, T = re.next, re.next = null, a.lastBaseUpdate = re, a.shared.pending = null;
        }
      } while (!0);
      if (ie === null && (I = le), a.baseState = I, a.firstBaseUpdate = Q, a.lastBaseUpdate = ie, n = a.shared.interleaved, n !== null) {
        a = n;
        do
          w |= a.lane, a = a.next;
        while (a !== n);
      } else d === null && (a.shared.lanes = 0);
      yr |= w, e.lanes = w, e.memoizedState = le;
    }
  }
  function Sf(e, n, o) {
    if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
      var s = e[n], a = s.callback;
      if (a !== null) {
        if (s.callback = null, s = o, typeof a != "function") throw Error(i(191, a));
        a.call(s);
      }
    }
  }
  var Uo = {}, cn = Bn(Uo), Wo = Bn(Uo), Yo = Bn(Uo);
  function mr(e) {
    if (e === Uo) throw Error(i(174));
    return e;
  }
  function Pu(e, n) {
    switch (He(Yo, n), He(Wo, e), He(cn, Uo), e = n.nodeType, e) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : st(null, "");
        break;
      default:
        e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = st(n, e);
    }
    Be(cn), He(cn, n);
  }
  function Zr() {
    Be(cn), Be(Wo), Be(Yo);
  }
  function Ef(e) {
    mr(Yo.current);
    var n = mr(cn.current), o = st(n, e.type);
    n !== o && (He(Wo, e), He(cn, o));
  }
  function Tu(e) {
    Wo.current === e && (Be(cn), Be(Wo));
  }
  var Xe = Bn(0);
  function hs(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var o = n.memoizedState;
        if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || o.data === "$!")) return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Lu = [];
  function Iu() {
    for (var e = 0; e < Lu.length; e++) Lu[e]._workInProgressVersionPrimary = null;
    Lu.length = 0;
  }
  var ms = P.ReactCurrentDispatcher, zu = P.ReactCurrentBatchConfig, gr = 0, Ke = null, ot = null, lt = null, gs = !1, Xo = !1, Ko = 0, Vg = 0;
  function mt() {
    throw Error(i(321));
  }
  function Ru(e, n) {
    if (n === null) return !1;
    for (var o = 0; o < n.length && o < e.length; o++) if (!Kt(e[o], n[o])) return !1;
    return !0;
  }
  function Au(e, n, o, s, a, d) {
    if (gr = d, Ke = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, ms.current = e === null || e.memoizedState === null ? Xg : Kg, e = o(s, a), Xo) {
      d = 0;
      do {
        if (Xo = !1, Ko = 0, 25 <= d) throw Error(i(301));
        d += 1, lt = ot = null, n.updateQueue = null, ms.current = Qg, e = o(s, a);
      } while (Xo);
    }
    if (ms.current = ws, n = ot !== null && ot.next !== null, gr = 0, lt = ot = Ke = null, gs = !1, n) throw Error(i(300));
    return e;
  }
  function $u() {
    var e = Ko !== 0;
    return Ko = 0, e;
  }
  function fn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return lt === null ? Ke.memoizedState = lt = e : lt = lt.next = e, lt;
  }
  function Wt() {
    if (ot === null) {
      var e = Ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ot.next;
    var n = lt === null ? Ke.memoizedState : lt.next;
    if (n !== null) lt = n, ot = e;
    else {
      if (e === null) throw Error(i(310));
      ot = e, e = { memoizedState: ot.memoizedState, baseState: ot.baseState, baseQueue: ot.baseQueue, queue: ot.queue, next: null }, lt === null ? Ke.memoizedState = lt = e : lt = lt.next = e;
    }
    return lt;
  }
  function Qo(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Du(e) {
    var n = Wt(), o = n.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = e;
    var s = ot, a = s.baseQueue, d = o.pending;
    if (d !== null) {
      if (a !== null) {
        var w = a.next;
        a.next = d.next, d.next = w;
      }
      s.baseQueue = a = d, o.pending = null;
    }
    if (a !== null) {
      d = a.next, s = s.baseState;
      var T = w = null, I = null, Q = d;
      do {
        var ie = Q.lane;
        if ((gr & ie) === ie) I !== null && (I = I.next = { lane: 0, action: Q.action, hasEagerState: Q.hasEagerState, eagerState: Q.eagerState, next: null }), s = Q.hasEagerState ? Q.eagerState : e(s, Q.action);
        else {
          var le = {
            lane: ie,
            action: Q.action,
            hasEagerState: Q.hasEagerState,
            eagerState: Q.eagerState,
            next: null
          };
          I === null ? (T = I = le, w = s) : I = I.next = le, Ke.lanes |= ie, yr |= ie;
        }
        Q = Q.next;
      } while (Q !== null && Q !== d);
      I === null ? w = s : I.next = T, Kt(s, n.memoizedState) || (Nt = !0), n.memoizedState = s, n.baseState = w, n.baseQueue = I, o.lastRenderedState = s;
    }
    if (e = o.interleaved, e !== null) {
      a = e;
      do
        d = a.lane, Ke.lanes |= d, yr |= d, a = a.next;
      while (a !== e);
    } else a === null && (o.lanes = 0);
    return [n.memoizedState, o.dispatch];
  }
  function Ou(e) {
    var n = Wt(), o = n.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = e;
    var s = o.dispatch, a = o.pending, d = n.memoizedState;
    if (a !== null) {
      o.pending = null;
      var w = a = a.next;
      do
        d = e(d, w.action), w = w.next;
      while (w !== a);
      Kt(d, n.memoizedState) || (Nt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), o.lastRenderedState = d;
    }
    return [d, s];
  }
  function _f() {
  }
  function kf(e, n) {
    var o = Ke, s = Wt(), a = n(), d = !Kt(s.memoizedState, a);
    if (d && (s.memoizedState = a, Nt = !0), s = s.queue, Fu(Mf.bind(null, o, s, e), [e]), s.getSnapshot !== n || d || lt !== null && lt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Go(9, Cf.bind(null, o, s, a, n), void 0, null), ut === null) throw Error(i(349));
      (gr & 30) !== 0 || Nf(o, n, a);
    }
    return a;
  }
  function Nf(e, n, o) {
    e.flags |= 16384, e = { getSnapshot: n, value: o }, n = Ke.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Ke.updateQueue = n, n.stores = [e]) : (o = n.stores, o === null ? n.stores = [e] : o.push(e));
  }
  function Cf(e, n, o, s) {
    n.value = o, n.getSnapshot = s, Pf(n) && Tf(e);
  }
  function Mf(e, n, o) {
    return o(function() {
      Pf(n) && Tf(e);
    });
  }
  function Pf(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var o = n();
      return !Kt(e, o);
    } catch {
      return !0;
    }
  }
  function Tf(e) {
    var n = En(e, 1);
    n !== null && Jt(n, e, 1, -1);
  }
  function Lf(e) {
    var n = fn();
    return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Qo, lastRenderedState: e }, n.queue = e, e = e.dispatch = Yg.bind(null, Ke, e), [n.memoizedState, e];
  }
  function Go(e, n, o, s) {
    return e = { tag: e, create: n, destroy: o, deps: s, next: null }, n = Ke.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Ke.updateQueue = n, n.lastEffect = e.next = e) : (o = n.lastEffect, o === null ? n.lastEffect = e.next = e : (s = o.next, o.next = e, e.next = s, n.lastEffect = e)), e;
  }
  function If() {
    return Wt().memoizedState;
  }
  function ys(e, n, o, s) {
    var a = fn();
    Ke.flags |= e, a.memoizedState = Go(1 | n, o, void 0, s === void 0 ? null : s);
  }
  function vs(e, n, o, s) {
    var a = Wt();
    s = s === void 0 ? null : s;
    var d = void 0;
    if (ot !== null) {
      var w = ot.memoizedState;
      if (d = w.destroy, s !== null && Ru(s, w.deps)) {
        a.memoizedState = Go(n, o, d, s);
        return;
      }
    }
    Ke.flags |= e, a.memoizedState = Go(1 | n, o, d, s);
  }
  function zf(e, n) {
    return ys(8390656, 8, e, n);
  }
  function Fu(e, n) {
    return vs(2048, 8, e, n);
  }
  function Rf(e, n) {
    return vs(4, 2, e, n);
  }
  function Af(e, n) {
    return vs(4, 4, e, n);
  }
  function $f(e, n) {
    if (typeof n == "function") return e = e(), n(e), function() {
      n(null);
    };
    if (n != null) return e = e(), n.current = e, function() {
      n.current = null;
    };
  }
  function Df(e, n, o) {
    return o = o != null ? o.concat([e]) : null, vs(4, 4, $f.bind(null, n, e), o);
  }
  function ju() {
  }
  function Of(e, n) {
    var o = Wt();
    n = n === void 0 ? null : n;
    var s = o.memoizedState;
    return s !== null && n !== null && Ru(n, s[1]) ? s[0] : (o.memoizedState = [e, n], e);
  }
  function Ff(e, n) {
    var o = Wt();
    n = n === void 0 ? null : n;
    var s = o.memoizedState;
    return s !== null && n !== null && Ru(n, s[1]) ? s[0] : (e = e(), o.memoizedState = [e, n], e);
  }
  function jf(e, n, o) {
    return (gr & 21) === 0 ? (e.baseState && (e.baseState = !1, Nt = !0), e.memoizedState = o) : (Kt(o, n) || (o = Hi(), Ke.lanes |= o, yr |= o, e.baseState = !0), n);
  }
  function Ug(e, n) {
    var o = $e;
    $e = o !== 0 && 4 > o ? o : 4, e(!0);
    var s = zu.transition;
    zu.transition = {};
    try {
      e(!1), n();
    } finally {
      $e = o, zu.transition = s;
    }
  }
  function Hf() {
    return Wt().memoizedState;
  }
  function Wg(e, n, o) {
    var s = Gn(e);
    if (o = { lane: s, action: o, hasEagerState: !1, eagerState: null, next: null }, bf(e)) Bf(n, o);
    else if (o = vf(e, n, o, s), o !== null) {
      var a = Et();
      Jt(o, e, s, a), Vf(o, n, s);
    }
  }
  function Yg(e, n, o) {
    var s = Gn(e), a = { lane: s, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (bf(e)) Bf(n, a);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null)) try {
        var w = n.lastRenderedState, T = d(w, o);
        if (a.hasEagerState = !0, a.eagerState = T, Kt(T, w)) {
          var I = n.interleaved;
          I === null ? (a.next = a, Cu(n)) : (a.next = I.next, I.next = a), n.interleaved = a;
          return;
        }
      } catch {
      } finally {
      }
      o = vf(e, n, a, s), o !== null && (a = Et(), Jt(o, e, s, a), Vf(o, n, s));
    }
  }
  function bf(e) {
    var n = e.alternate;
    return e === Ke || n !== null && n === Ke;
  }
  function Bf(e, n) {
    Xo = gs = !0;
    var o = e.pending;
    o === null ? n.next = n : (n.next = o.next, o.next = n), e.pending = n;
  }
  function Vf(e, n, o) {
    if ((o & 4194240) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, o |= s, n.lanes = o, bl(e, o);
    }
  }
  var ws = { readContext: Ut, useCallback: mt, useContext: mt, useEffect: mt, useImperativeHandle: mt, useInsertionEffect: mt, useLayoutEffect: mt, useMemo: mt, useReducer: mt, useRef: mt, useState: mt, useDebugValue: mt, useDeferredValue: mt, useTransition: mt, useMutableSource: mt, useSyncExternalStore: mt, useId: mt, unstable_isNewReconciler: !1 }, Xg = { readContext: Ut, useCallback: function(e, n) {
    return fn().memoizedState = [e, n === void 0 ? null : n], e;
  }, useContext: Ut, useEffect: zf, useImperativeHandle: function(e, n, o) {
    return o = o != null ? o.concat([e]) : null, ys(
      4194308,
      4,
      $f.bind(null, n, e),
      o
    );
  }, useLayoutEffect: function(e, n) {
    return ys(4194308, 4, e, n);
  }, useInsertionEffect: function(e, n) {
    return ys(4, 2, e, n);
  }, useMemo: function(e, n) {
    var o = fn();
    return n = n === void 0 ? null : n, e = e(), o.memoizedState = [e, n], e;
  }, useReducer: function(e, n, o) {
    var s = fn();
    return n = o !== void 0 ? o(n) : n, s.memoizedState = s.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, s.queue = e, e = e.dispatch = Wg.bind(null, Ke, e), [s.memoizedState, e];
  }, useRef: function(e) {
    var n = fn();
    return e = { current: e }, n.memoizedState = e;
  }, useState: Lf, useDebugValue: ju, useDeferredValue: function(e) {
    return fn().memoizedState = e;
  }, useTransition: function() {
    var e = Lf(!1), n = e[0];
    return e = Ug.bind(null, e[1]), fn().memoizedState = e, [n, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, n, o) {
    var s = Ke, a = fn();
    if (Ve) {
      if (o === void 0) throw Error(i(407));
      o = o();
    } else {
      if (o = n(), ut === null) throw Error(i(349));
      (gr & 30) !== 0 || Nf(s, n, o);
    }
    a.memoizedState = o;
    var d = { value: o, getSnapshot: n };
    return a.queue = d, zf(Mf.bind(
      null,
      s,
      d,
      e
    ), [e]), s.flags |= 2048, Go(9, Cf.bind(null, s, d, o, n), void 0, null), o;
  }, useId: function() {
    var e = fn(), n = ut.identifierPrefix;
    if (Ve) {
      var o = Sn, s = xn;
      o = (s & ~(1 << 32 - zt(s) - 1)).toString(32) + o, n = ":" + n + "R" + o, o = Ko++, 0 < o && (n += "H" + o.toString(32)), n += ":";
    } else o = Vg++, n = ":" + n + "r" + o.toString(32) + ":";
    return e.memoizedState = n;
  }, unstable_isNewReconciler: !1 }, Kg = {
    readContext: Ut,
    useCallback: Of,
    useContext: Ut,
    useEffect: Fu,
    useImperativeHandle: Df,
    useInsertionEffect: Rf,
    useLayoutEffect: Af,
    useMemo: Ff,
    useReducer: Du,
    useRef: If,
    useState: function() {
      return Du(Qo);
    },
    useDebugValue: ju,
    useDeferredValue: function(e) {
      var n = Wt();
      return jf(n, ot.memoizedState, e);
    },
    useTransition: function() {
      var e = Du(Qo)[0], n = Wt().memoizedState;
      return [e, n];
    },
    useMutableSource: _f,
    useSyncExternalStore: kf,
    useId: Hf,
    unstable_isNewReconciler: !1
  }, Qg = { readContext: Ut, useCallback: Of, useContext: Ut, useEffect: Fu, useImperativeHandle: Df, useInsertionEffect: Rf, useLayoutEffect: Af, useMemo: Ff, useReducer: Ou, useRef: If, useState: function() {
    return Ou(Qo);
  }, useDebugValue: ju, useDeferredValue: function(e) {
    var n = Wt();
    return ot === null ? n.memoizedState = e : jf(n, ot.memoizedState, e);
  }, useTransition: function() {
    var e = Ou(Qo)[0], n = Wt().memoizedState;
    return [e, n];
  }, useMutableSource: _f, useSyncExternalStore: kf, useId: Hf, unstable_isNewReconciler: !1 };
  function Gt(e, n) {
    if (e && e.defaultProps) {
      n = O({}, n), e = e.defaultProps;
      for (var o in e) n[o] === void 0 && (n[o] = e[o]);
      return n;
    }
    return n;
  }
  function Hu(e, n, o, s) {
    n = e.memoizedState, o = o(s, n), o = o == null ? n : O({}, n, o), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
  }
  var xs = { isMounted: function(e) {
    return (e = e._reactInternals) ? ln(e) === e : !1;
  }, enqueueSetState: function(e, n, o) {
    e = e._reactInternals;
    var s = Et(), a = Gn(e), d = _n(s, a);
    d.payload = n, o != null && (d.callback = o), n = Yn(e, d, a), n !== null && (Jt(n, e, a, s), ds(n, e, a));
  }, enqueueReplaceState: function(e, n, o) {
    e = e._reactInternals;
    var s = Et(), a = Gn(e), d = _n(s, a);
    d.tag = 1, d.payload = n, o != null && (d.callback = o), n = Yn(e, d, a), n !== null && (Jt(n, e, a, s), ds(n, e, a));
  }, enqueueForceUpdate: function(e, n) {
    e = e._reactInternals;
    var o = Et(), s = Gn(e), a = _n(o, s);
    a.tag = 2, n != null && (a.callback = n), n = Yn(e, a, s), n !== null && (Jt(n, e, s, o), ds(n, e, s));
  } };
  function Uf(e, n, o, s, a, d, w) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, d, w) : n.prototype && n.prototype.isPureReactComponent ? !Do(o, s) || !Do(a, d) : !0;
  }
  function Wf(e, n, o) {
    var s = !1, a = Vn, d = n.contextType;
    return typeof d == "object" && d !== null ? d = Ut(d) : (a = kt(n) ? fr : ht.current, s = n.contextTypes, d = (s = s != null) ? Wr(e, a) : Vn), n = new n(o, d), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = xs, e.stateNode = n, n._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = d), n;
  }
  function Yf(e, n, o, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(o, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(o, s), n.state !== e && xs.enqueueReplaceState(n, n.state, null);
  }
  function bu(e, n, o, s) {
    var a = e.stateNode;
    a.props = o, a.state = e.memoizedState, a.refs = {}, Mu(e);
    var d = n.contextType;
    typeof d == "object" && d !== null ? a.context = Ut(d) : (d = kt(n) ? fr : ht.current, a.context = Wr(e, d)), a.state = e.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (Hu(e, n, d, o), a.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (n = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), n !== a.state && xs.enqueueReplaceState(a, a.state, null), ps(e, o, a, s), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Jr(e, n) {
    try {
      var o = "", s = n;
      do
        o += ue(s), s = s.return;
      while (s);
      var a = o;
    } catch (d) {
      a = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: e, source: n, stack: a, digest: null };
  }
  function Bu(e, n, o) {
    return { value: e, source: null, stack: o ?? null, digest: n ?? null };
  }
  function Vu(e, n) {
    try {
      console.error(n.value);
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  var Gg = typeof WeakMap == "function" ? WeakMap : Map;
  function Xf(e, n, o) {
    o = _n(-1, o), o.tag = 3, o.payload = { element: null };
    var s = n.value;
    return o.callback = function() {
      Ms || (Ms = !0, oa = s), Vu(e, n);
    }, o;
  }
  function Kf(e, n, o) {
    o = _n(-1, o), o.tag = 3;
    var s = e.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var a = n.value;
      o.payload = function() {
        return s(a);
      }, o.callback = function() {
        Vu(e, n);
      };
    }
    var d = e.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (o.callback = function() {
      Vu(e, n), typeof s != "function" && (Kn === null ? Kn = /* @__PURE__ */ new Set([this]) : Kn.add(this));
      var w = n.stack;
      this.componentDidCatch(n.value, { componentStack: w !== null ? w : "" });
    }), o;
  }
  function Qf(e, n, o) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Gg();
      var a = /* @__PURE__ */ new Set();
      s.set(n, a);
    } else a = s.get(n), a === void 0 && (a = /* @__PURE__ */ new Set(), s.set(n, a));
    a.has(o) || (a.add(o), e = c0.bind(null, e, n, o), n.then(e, e));
  }
  function Gf(e) {
    do {
      var n;
      if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function qf(e, n, o, s, a) {
    return (e.mode & 1) === 0 ? (e === n ? e.flags |= 65536 : (e.flags |= 128, o.flags |= 131072, o.flags &= -52805, o.tag === 1 && (o.alternate === null ? o.tag = 17 : (n = _n(-1, 1), n.tag = 2, Yn(o, n, 1))), o.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var qg = P.ReactCurrentOwner, Nt = !1;
  function St(e, n, o, s) {
    n.child = e === null ? yf(n, null, o, s) : Qr(n, e.child, o, s);
  }
  function Zf(e, n, o, s, a) {
    o = o.render;
    var d = n.ref;
    return qr(n, a), s = Au(e, n, o, s, d, a), o = $u(), e !== null && !Nt ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~a, kn(e, n, a)) : (Ve && o && yu(n), n.flags |= 1, St(e, n, s, a), n.child);
  }
  function Jf(e, n, o, s, a) {
    if (e === null) {
      var d = o.type;
      return typeof d == "function" && !fa(d) && d.defaultProps === void 0 && o.compare === null && o.defaultProps === void 0 ? (n.tag = 15, n.type = d, ed(e, n, d, s, a)) : (e = Rs(o.type, null, s, n, n.mode, a), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, (e.lanes & a) === 0) {
      var w = d.memoizedProps;
      if (o = o.compare, o = o !== null ? o : Do, o(w, s) && e.ref === n.ref) return kn(e, n, a);
    }
    return n.flags |= 1, e = Zn(d, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function ed(e, n, o, s, a) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (Do(d, s) && e.ref === n.ref) if (Nt = !1, n.pendingProps = s = d, (e.lanes & a) !== 0) (e.flags & 131072) !== 0 && (Nt = !0);
      else return n.lanes = e.lanes, kn(e, n, a);
    }
    return Uu(e, n, o, s, a);
  }
  function td(e, n, o) {
    var s = n.pendingProps, a = s.children, d = e !== null ? e.memoizedState : null;
    if (s.mode === "hidden") if ((n.mode & 1) === 0) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, He(to, Dt), Dt |= o;
    else {
      if ((o & 1073741824) === 0) return e = d !== null ? d.baseLanes | o : o, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, He(to, Dt), Dt |= e, null;
      n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = d !== null ? d.baseLanes : o, He(to, Dt), Dt |= s;
    }
    else d !== null ? (s = d.baseLanes | o, n.memoizedState = null) : s = o, He(to, Dt), Dt |= s;
    return St(e, n, a, o), n.child;
  }
  function nd(e, n) {
    var o = n.ref;
    (e === null && o !== null || e !== null && e.ref !== o) && (n.flags |= 512, n.flags |= 2097152);
  }
  function Uu(e, n, o, s, a) {
    var d = kt(o) ? fr : ht.current;
    return d = Wr(n, d), qr(n, a), o = Au(e, n, o, s, d, a), s = $u(), e !== null && !Nt ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~a, kn(e, n, a)) : (Ve && s && yu(n), n.flags |= 1, St(e, n, o, a), n.child);
  }
  function rd(e, n, o, s, a) {
    if (kt(o)) {
      var d = !0;
      os(n);
    } else d = !1;
    if (qr(n, a), n.stateNode === null) Es(e, n), Wf(n, o, s), bu(n, o, s, a), s = !0;
    else if (e === null) {
      var w = n.stateNode, T = n.memoizedProps;
      w.props = T;
      var I = w.context, Q = o.contextType;
      typeof Q == "object" && Q !== null ? Q = Ut(Q) : (Q = kt(o) ? fr : ht.current, Q = Wr(n, Q));
      var ie = o.getDerivedStateFromProps, le = typeof ie == "function" || typeof w.getSnapshotBeforeUpdate == "function";
      le || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (T !== s || I !== Q) && Yf(n, w, s, Q), Wn = !1;
      var re = n.memoizedState;
      w.state = re, ps(n, s, w, a), I = n.memoizedState, T !== s || re !== I || _t.current || Wn ? (typeof ie == "function" && (Hu(n, o, ie, s), I = n.memoizedState), (T = Wn || Uf(n, o, T, s, re, I, Q)) ? (le || typeof w.UNSAFE_componentWillMount != "function" && typeof w.componentWillMount != "function" || (typeof w.componentWillMount == "function" && w.componentWillMount(), typeof w.UNSAFE_componentWillMount == "function" && w.UNSAFE_componentWillMount()), typeof w.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof w.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = I), w.props = s, w.state = I, w.context = Q, s = T) : (typeof w.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      w = n.stateNode, wf(e, n), T = n.memoizedProps, Q = n.type === n.elementType ? T : Gt(n.type, T), w.props = Q, le = n.pendingProps, re = w.context, I = o.contextType, typeof I == "object" && I !== null ? I = Ut(I) : (I = kt(o) ? fr : ht.current, I = Wr(n, I));
      var he = o.getDerivedStateFromProps;
      (ie = typeof he == "function" || typeof w.getSnapshotBeforeUpdate == "function") || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (T !== le || re !== I) && Yf(n, w, s, I), Wn = !1, re = n.memoizedState, w.state = re, ps(n, s, w, a);
      var ge = n.memoizedState;
      T !== le || re !== ge || _t.current || Wn ? (typeof he == "function" && (Hu(n, o, he, s), ge = n.memoizedState), (Q = Wn || Uf(n, o, Q, s, re, ge, I) || !1) ? (ie || typeof w.UNSAFE_componentWillUpdate != "function" && typeof w.componentWillUpdate != "function" || (typeof w.componentWillUpdate == "function" && w.componentWillUpdate(s, ge, I), typeof w.UNSAFE_componentWillUpdate == "function" && w.UNSAFE_componentWillUpdate(s, ge, I)), typeof w.componentDidUpdate == "function" && (n.flags |= 4), typeof w.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof w.componentDidUpdate != "function" || T === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = ge), w.props = s, w.state = ge, w.context = I, s = Q) : (typeof w.componentDidUpdate != "function" || T === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return Wu(e, n, o, s, d, a);
  }
  function Wu(e, n, o, s, a, d) {
    nd(e, n);
    var w = (n.flags & 128) !== 0;
    if (!s && !w) return a && uf(n, o, !1), kn(e, n, d);
    s = n.stateNode, qg.current = n;
    var T = w && typeof o.getDerivedStateFromError != "function" ? null : s.render();
    return n.flags |= 1, e !== null && w ? (n.child = Qr(n, e.child, null, d), n.child = Qr(n, null, T, d)) : St(e, n, T, d), n.memoizedState = s.state, a && uf(n, o, !0), n.child;
  }
  function od(e) {
    var n = e.stateNode;
    n.pendingContext ? sf(e, n.pendingContext, n.pendingContext !== n.context) : n.context && sf(e, n.context, !1), Pu(e, n.containerInfo);
  }
  function id(e, n, o, s, a) {
    return Kr(), Su(a), n.flags |= 256, St(e, n, o, s), n.child;
  }
  var Yu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Xu(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function sd(e, n, o) {
    var s = n.pendingProps, a = Xe.current, d = !1, w = (n.flags & 128) !== 0, T;
    if ((T = w) || (T = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), T ? (d = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), He(Xe, a & 1), e === null)
      return xu(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((n.mode & 1) === 0 ? n.lanes = 1 : e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824, null) : (w = s.children, e = s.fallback, d ? (s = n.mode, d = n.child, w = { mode: "hidden", children: w }, (s & 1) === 0 && d !== null ? (d.childLanes = 0, d.pendingProps = w) : d = As(w, s, 0, null), e = Sr(e, s, o, null), d.return = n, e.return = n, d.sibling = e, n.child = d, n.child.memoizedState = Xu(o), n.memoizedState = Yu, e) : Ku(n, w));
    if (a = e.memoizedState, a !== null && (T = a.dehydrated, T !== null)) return Zg(e, n, w, s, T, a, o);
    if (d) {
      d = s.fallback, w = n.mode, a = e.child, T = a.sibling;
      var I = { mode: "hidden", children: s.children };
      return (w & 1) === 0 && n.child !== a ? (s = n.child, s.childLanes = 0, s.pendingProps = I, n.deletions = null) : (s = Zn(a, I), s.subtreeFlags = a.subtreeFlags & 14680064), T !== null ? d = Zn(T, d) : (d = Sr(d, w, o, null), d.flags |= 2), d.return = n, s.return = n, s.sibling = d, n.child = s, s = d, d = n.child, w = e.child.memoizedState, w = w === null ? Xu(o) : { baseLanes: w.baseLanes | o, cachePool: null, transitions: w.transitions }, d.memoizedState = w, d.childLanes = e.childLanes & ~o, n.memoizedState = Yu, s;
    }
    return d = e.child, e = d.sibling, s = Zn(d, { mode: "visible", children: s.children }), (n.mode & 1) === 0 && (s.lanes = o), s.return = n, s.sibling = null, e !== null && (o = n.deletions, o === null ? (n.deletions = [e], n.flags |= 16) : o.push(e)), n.child = s, n.memoizedState = null, s;
  }
  function Ku(e, n) {
    return n = As({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
  }
  function Ss(e, n, o, s) {
    return s !== null && Su(s), Qr(n, e.child, null, o), e = Ku(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
  }
  function Zg(e, n, o, s, a, d, w) {
    if (o)
      return n.flags & 256 ? (n.flags &= -257, s = Bu(Error(i(422))), Ss(e, n, w, s)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (d = s.fallback, a = n.mode, s = As({ mode: "visible", children: s.children }, a, 0, null), d = Sr(d, a, w, null), d.flags |= 2, s.return = n, d.return = n, s.sibling = d, n.child = s, (n.mode & 1) !== 0 && Qr(n, e.child, null, w), n.child.memoizedState = Xu(w), n.memoizedState = Yu, d);
    if ((n.mode & 1) === 0) return Ss(e, n, w, null);
    if (a.data === "$!") {
      if (s = a.nextSibling && a.nextSibling.dataset, s) var T = s.dgst;
      return s = T, d = Error(i(419)), s = Bu(d, s, void 0), Ss(e, n, w, s);
    }
    if (T = (w & e.childLanes) !== 0, Nt || T) {
      if (s = ut, s !== null) {
        switch (w & -w) {
          case 4:
            a = 2;
            break;
          case 16:
            a = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            a = 32;
            break;
          case 536870912:
            a = 268435456;
            break;
          default:
            a = 0;
        }
        a = (a & (s.suspendedLanes | w)) !== 0 ? 0 : a, a !== 0 && a !== d.retryLane && (d.retryLane = a, En(e, a), Jt(s, e, a, -1));
      }
      return ca(), s = Bu(Error(i(421))), Ss(e, n, w, s);
    }
    return a.data === "$?" ? (n.flags |= 128, n.child = e.child, n = f0.bind(null, e), a._reactRetry = n, null) : (e = d.treeContext, $t = bn(a.nextSibling), At = n, Ve = !0, Qt = null, e !== null && (Bt[Vt++] = xn, Bt[Vt++] = Sn, Bt[Vt++] = dr, xn = e.id, Sn = e.overflow, dr = n), n = Ku(n, s.children), n.flags |= 4096, n);
  }
  function ld(e, n, o) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), Nu(e.return, n, o);
  }
  function Qu(e, n, o, s, a) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: s, tail: o, tailMode: a } : (d.isBackwards = n, d.rendering = null, d.renderingStartTime = 0, d.last = s, d.tail = o, d.tailMode = a);
  }
  function ud(e, n, o) {
    var s = n.pendingProps, a = s.revealOrder, d = s.tail;
    if (St(e, n, s.children, o), s = Xe.current, (s & 2) !== 0) s = s & 1 | 2, n.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ld(e, o, n);
        else if (e.tag === 19) ld(e, o, n);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      s &= 1;
    }
    if (He(Xe, s), (n.mode & 1) === 0) n.memoizedState = null;
    else switch (a) {
      case "forwards":
        for (o = n.child, a = null; o !== null; ) e = o.alternate, e !== null && hs(e) === null && (a = o), o = o.sibling;
        o = a, o === null ? (a = n.child, n.child = null) : (a = o.sibling, o.sibling = null), Qu(n, !1, a, o, d);
        break;
      case "backwards":
        for (o = null, a = n.child, n.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && hs(e) === null) {
            n.child = a;
            break;
          }
          e = a.sibling, a.sibling = o, o = a, a = e;
        }
        Qu(n, !0, o, null, d);
        break;
      case "together":
        Qu(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Es(e, n) {
    (n.mode & 1) === 0 && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
  }
  function kn(e, n, o) {
    if (e !== null && (n.dependencies = e.dependencies), yr |= n.lanes, (o & n.childLanes) === 0) return null;
    if (e !== null && n.child !== e.child) throw Error(i(153));
    if (n.child !== null) {
      for (e = n.child, o = Zn(e, e.pendingProps), n.child = o, o.return = n; e.sibling !== null; ) e = e.sibling, o = o.sibling = Zn(e, e.pendingProps), o.return = n;
      o.sibling = null;
    }
    return n.child;
  }
  function Jg(e, n, o) {
    switch (n.tag) {
      case 3:
        od(n), Kr();
        break;
      case 5:
        Ef(n);
        break;
      case 1:
        kt(n.type) && os(n);
        break;
      case 4:
        Pu(n, n.stateNode.containerInfo);
        break;
      case 10:
        var s = n.type._context, a = n.memoizedProps.value;
        He(cs, s._currentValue), s._currentValue = a;
        break;
      case 13:
        if (s = n.memoizedState, s !== null)
          return s.dehydrated !== null ? (He(Xe, Xe.current & 1), n.flags |= 128, null) : (o & n.child.childLanes) !== 0 ? sd(e, n, o) : (He(Xe, Xe.current & 1), e = kn(e, n, o), e !== null ? e.sibling : null);
        He(Xe, Xe.current & 1);
        break;
      case 19:
        if (s = (o & n.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (s) return ud(e, n, o);
          n.flags |= 128;
        }
        if (a = n.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), He(Xe, Xe.current), s) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, td(e, n, o);
    }
    return kn(e, n, o);
  }
  var ad, Gu, cd, fd;
  ad = function(e, n) {
    for (var o = n.child; o !== null; ) {
      if (o.tag === 5 || o.tag === 6) e.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        o.child.return = o, o = o.child;
        continue;
      }
      if (o === n) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === n) return;
        o = o.return;
      }
      o.sibling.return = o.return, o = o.sibling;
    }
  }, Gu = function() {
  }, cd = function(e, n, o, s) {
    var a = e.memoizedProps;
    if (a !== s) {
      e = n.stateNode, mr(cn.current);
      var d = null;
      switch (o) {
        case "input":
          a = xe(e, a), s = xe(e, s), d = [];
          break;
        case "select":
          a = O({}, a, { value: void 0 }), s = O({}, s, { value: void 0 }), d = [];
          break;
        case "textarea":
          a = Me(e, a), s = Me(e, s), d = [];
          break;
        default:
          typeof a.onClick != "function" && typeof s.onClick == "function" && (e.onclick = ts);
      }
      In(o, s);
      var w;
      o = null;
      for (Q in a) if (!s.hasOwnProperty(Q) && a.hasOwnProperty(Q) && a[Q] != null) if (Q === "style") {
        var T = a[Q];
        for (w in T) T.hasOwnProperty(w) && (o || (o = {}), o[w] = "");
      } else Q !== "dangerouslySetInnerHTML" && Q !== "children" && Q !== "suppressContentEditableWarning" && Q !== "suppressHydrationWarning" && Q !== "autoFocus" && (u.hasOwnProperty(Q) ? d || (d = []) : (d = d || []).push(Q, null));
      for (Q in s) {
        var I = s[Q];
        if (T = a != null ? a[Q] : void 0, s.hasOwnProperty(Q) && I !== T && (I != null || T != null)) if (Q === "style") if (T) {
          for (w in T) !T.hasOwnProperty(w) || I && I.hasOwnProperty(w) || (o || (o = {}), o[w] = "");
          for (w in I) I.hasOwnProperty(w) && T[w] !== I[w] && (o || (o = {}), o[w] = I[w]);
        } else o || (d || (d = []), d.push(
          Q,
          o
        )), o = I;
        else Q === "dangerouslySetInnerHTML" ? (I = I ? I.__html : void 0, T = T ? T.__html : void 0, I != null && T !== I && (d = d || []).push(Q, I)) : Q === "children" ? typeof I != "string" && typeof I != "number" || (d = d || []).push(Q, "" + I) : Q !== "suppressContentEditableWarning" && Q !== "suppressHydrationWarning" && (u.hasOwnProperty(Q) ? (I != null && Q === "onScroll" && be("scroll", e), d || T === I || (d = [])) : (d = d || []).push(Q, I));
      }
      o && (d = d || []).push("style", o);
      var Q = d;
      (n.updateQueue = Q) && (n.flags |= 4);
    }
  }, fd = function(e, n, o, s) {
    o !== s && (n.flags |= 4);
  };
  function qo(e, n) {
    if (!Ve) switch (e.tailMode) {
      case "hidden":
        n = e.tail;
        for (var o = null; n !== null; ) n.alternate !== null && (o = n), n = n.sibling;
        o === null ? e.tail = null : o.sibling = null;
        break;
      case "collapsed":
        o = e.tail;
        for (var s = null; o !== null; ) o.alternate !== null && (s = o), o = o.sibling;
        s === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null;
    }
  }
  function gt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, o = 0, s = 0;
    if (n) for (var a = e.child; a !== null; ) o |= a.lanes | a.childLanes, s |= a.subtreeFlags & 14680064, s |= a.flags & 14680064, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) o |= a.lanes | a.childLanes, s |= a.subtreeFlags, s |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= s, e.childLanes = o, n;
  }
  function e0(e, n, o) {
    var s = n.pendingProps;
    switch (vu(n), n.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return gt(n), null;
      case 1:
        return kt(n.type) && rs(), gt(n), null;
      case 3:
        return s = n.stateNode, Zr(), Be(_t), Be(ht), Iu(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (us(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Qt !== null && (la(Qt), Qt = null))), Gu(e, n), gt(n), null;
      case 5:
        Tu(n);
        var a = mr(Yo.current);
        if (o = n.type, e !== null && n.stateNode != null) cd(e, n, o, s, a), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(i(166));
            return gt(n), null;
          }
          if (e = mr(cn.current), us(n)) {
            s = n.stateNode, o = n.type;
            var d = n.memoizedProps;
            switch (s[an] = n, s[bo] = d, e = (n.mode & 1) !== 0, o) {
              case "dialog":
                be("cancel", s), be("close", s);
                break;
              case "iframe":
              case "object":
              case "embed":
                be("load", s);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Fo.length; a++) be(Fo[a], s);
                break;
              case "source":
                be("error", s);
                break;
              case "img":
              case "image":
              case "link":
                be(
                  "error",
                  s
                ), be("load", s);
                break;
              case "details":
                be("toggle", s);
                break;
              case "input":
                Ae(s, d), be("invalid", s);
                break;
              case "select":
                s._wrapperState = { wasMultiple: !!d.multiple }, be("invalid", s);
                break;
              case "textarea":
                Te(s, d), be("invalid", s);
            }
            In(o, d), a = null;
            for (var w in d) if (d.hasOwnProperty(w)) {
              var T = d[w];
              w === "children" ? typeof T == "string" ? s.textContent !== T && (d.suppressHydrationWarning !== !0 && es(s.textContent, T, e), a = ["children", T]) : typeof T == "number" && s.textContent !== "" + T && (d.suppressHydrationWarning !== !0 && es(
                s.textContent,
                T,
                e
              ), a = ["children", "" + T]) : u.hasOwnProperty(w) && T != null && w === "onScroll" && be("scroll", s);
            }
            switch (o) {
              case "input":
                Pe(s), jt(s, d, !0);
                break;
              case "textarea":
                Pe(s), Fe(s);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (s.onclick = ts);
            }
            s = a, n.updateQueue = s, s !== null && (n.flags |= 4);
          } else {
            w = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = et(o)), e === "http://www.w3.org/1999/xhtml" ? o === "script" ? (e = w.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = w.createElement(o, { is: s.is }) : (e = w.createElement(o), o === "select" && (w = e, s.multiple ? w.multiple = !0 : s.size && (w.size = s.size))) : e = w.createElementNS(e, o), e[an] = n, e[bo] = s, ad(e, n, !1, !1), n.stateNode = e;
            e: {
              switch (w = or(o, s), o) {
                case "dialog":
                  be("cancel", e), be("close", e), a = s;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  be("load", e), a = s;
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < Fo.length; a++) be(Fo[a], e);
                  a = s;
                  break;
                case "source":
                  be("error", e), a = s;
                  break;
                case "img":
                case "image":
                case "link":
                  be(
                    "error",
                    e
                  ), be("load", e), a = s;
                  break;
                case "details":
                  be("toggle", e), a = s;
                  break;
                case "input":
                  Ae(e, s), a = xe(e, s), be("invalid", e);
                  break;
                case "option":
                  a = s;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!s.multiple }, a = O({}, s, { value: void 0 }), be("invalid", e);
                  break;
                case "textarea":
                  Te(e, s), a = Me(e, s), be("invalid", e);
                  break;
                default:
                  a = s;
              }
              In(o, a), T = a;
              for (d in T) if (T.hasOwnProperty(d)) {
                var I = T[d];
                d === "style" ? on(e, I) : d === "dangerouslySetInnerHTML" ? (I = I ? I.__html : void 0, I != null && qe(e, I)) : d === "children" ? typeof I == "string" ? (o !== "textarea" || I !== "") && je(e, I) : typeof I == "number" && je(e, "" + I) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (u.hasOwnProperty(d) ? I != null && d === "onScroll" && be("scroll", e) : I != null && S(e, d, I, w));
              }
              switch (o) {
                case "input":
                  Pe(e), jt(e, s, !1);
                  break;
                case "textarea":
                  Pe(e), Fe(e);
                  break;
                case "option":
                  s.value != null && e.setAttribute("value", "" + se(s.value));
                  break;
                case "select":
                  e.multiple = !!s.multiple, d = s.value, d != null ? pe(e, !!s.multiple, d, !1) : s.defaultValue != null && pe(
                    e,
                    !!s.multiple,
                    s.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = ts);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s = !!s.autoFocus;
                  break e;
                case "img":
                  s = !0;
                  break e;
                default:
                  s = !1;
              }
            }
            s && (n.flags |= 4);
          }
          n.ref !== null && (n.flags |= 512, n.flags |= 2097152);
        }
        return gt(n), null;
      case 6:
        if (e && n.stateNode != null) fd(e, n, e.memoizedProps, s);
        else {
          if (typeof s != "string" && n.stateNode === null) throw Error(i(166));
          if (o = mr(Yo.current), mr(cn.current), us(n)) {
            if (s = n.stateNode, o = n.memoizedProps, s[an] = n, (d = s.nodeValue !== o) && (e = At, e !== null)) switch (e.tag) {
              case 3:
                es(s.nodeValue, o, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && es(s.nodeValue, o, (e.mode & 1) !== 0);
            }
            d && (n.flags |= 4);
          } else s = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(s), s[an] = n, n.stateNode = s;
        }
        return gt(n), null;
      case 13:
        if (Be(Xe), s = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Ve && $t !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0) hf(), Kr(), n.flags |= 98560, d = !1;
          else if (d = us(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[an] = n;
            } else Kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            gt(n), d = !1;
          } else Qt !== null && (la(Qt), Qt = null), d = !0;
          if (!d) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0 ? (n.lanes = o, n) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (n.child.flags |= 8192, (n.mode & 1) !== 0 && (e === null || (Xe.current & 1) !== 0 ? it === 0 && (it = 3) : ca())), n.updateQueue !== null && (n.flags |= 4), gt(n), null);
      case 4:
        return Zr(), Gu(e, n), e === null && jo(n.stateNode.containerInfo), gt(n), null;
      case 10:
        return ku(n.type._context), gt(n), null;
      case 17:
        return kt(n.type) && rs(), gt(n), null;
      case 19:
        if (Be(Xe), d = n.memoizedState, d === null) return gt(n), null;
        if (s = (n.flags & 128) !== 0, w = d.rendering, w === null) if (s) qo(d, !1);
        else {
          if (it !== 0 || e !== null && (e.flags & 128) !== 0) for (e = n.child; e !== null; ) {
            if (w = hs(e), w !== null) {
              for (n.flags |= 128, qo(d, !1), s = w.updateQueue, s !== null && (n.updateQueue = s, n.flags |= 4), n.subtreeFlags = 0, s = o, o = n.child; o !== null; ) d = o, e = s, d.flags &= 14680066, w = d.alternate, w === null ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = w.childLanes, d.lanes = w.lanes, d.child = w.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = w.memoizedProps, d.memoizedState = w.memoizedState, d.updateQueue = w.updateQueue, d.type = w.type, e = w.dependencies, d.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), o = o.sibling;
              return He(Xe, Xe.current & 1 | 2), n.child;
            }
            e = e.sibling;
          }
          d.tail !== null && Ye() > no && (n.flags |= 128, s = !0, qo(d, !1), n.lanes = 4194304);
        }
        else {
          if (!s) if (e = hs(w), e !== null) {
            if (n.flags |= 128, s = !0, o = e.updateQueue, o !== null && (n.updateQueue = o, n.flags |= 4), qo(d, !0), d.tail === null && d.tailMode === "hidden" && !w.alternate && !Ve) return gt(n), null;
          } else 2 * Ye() - d.renderingStartTime > no && o !== 1073741824 && (n.flags |= 128, s = !0, qo(d, !1), n.lanes = 4194304);
          d.isBackwards ? (w.sibling = n.child, n.child = w) : (o = d.last, o !== null ? o.sibling = w : n.child = w, d.last = w);
        }
        return d.tail !== null ? (n = d.tail, d.rendering = n, d.tail = n.sibling, d.renderingStartTime = Ye(), n.sibling = null, o = Xe.current, He(Xe, s ? o & 1 | 2 : o & 1), n) : (gt(n), null);
      case 22:
      case 23:
        return aa(), s = n.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (n.flags |= 8192), s && (n.mode & 1) !== 0 ? (Dt & 1073741824) !== 0 && (gt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : gt(n), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function t0(e, n) {
    switch (vu(n), n.tag) {
      case 1:
        return kt(n.type) && rs(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Zr(), Be(_t), Be(ht), Iu(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 5:
        return Tu(n), null;
      case 13:
        if (Be(Xe), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null) throw Error(i(340));
          Kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return Be(Xe), null;
      case 4:
        return Zr(), null;
      case 10:
        return ku(n.type._context), null;
      case 22:
      case 23:
        return aa(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var _s = !1, yt = !1, n0 = typeof WeakSet == "function" ? WeakSet : Set, me = null;
  function eo(e, n) {
    var o = e.ref;
    if (o !== null) if (typeof o == "function") try {
      o(null);
    } catch (s) {
      Ge(e, n, s);
    }
    else o.current = null;
  }
  function qu(e, n, o) {
    try {
      o();
    } catch (s) {
      Ge(e, n, s);
    }
  }
  var dd = !1;
  function r0(e, n) {
    if (au = Vi, e = Vc(), tu(e)) {
      if ("selectionStart" in e) var o = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        o = (o = e.ownerDocument) && o.defaultView || window;
        var s = o.getSelection && o.getSelection();
        if (s && s.rangeCount !== 0) {
          o = s.anchorNode;
          var a = s.anchorOffset, d = s.focusNode;
          s = s.focusOffset;
          try {
            o.nodeType, d.nodeType;
          } catch {
            o = null;
            break e;
          }
          var w = 0, T = -1, I = -1, Q = 0, ie = 0, le = e, re = null;
          t: for (; ; ) {
            for (var he; le !== o || a !== 0 && le.nodeType !== 3 || (T = w + a), le !== d || s !== 0 && le.nodeType !== 3 || (I = w + s), le.nodeType === 3 && (w += le.nodeValue.length), (he = le.firstChild) !== null; )
              re = le, le = he;
            for (; ; ) {
              if (le === e) break t;
              if (re === o && ++Q === a && (T = w), re === d && ++ie === s && (I = w), (he = le.nextSibling) !== null) break;
              le = re, re = le.parentNode;
            }
            le = he;
          }
          o = T === -1 || I === -1 ? null : { start: T, end: I };
        } else o = null;
      }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (cu = { focusedElem: e, selectionRange: o }, Vi = !1, me = n; me !== null; ) if (n = me, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, me = e;
    else for (; me !== null; ) {
      n = me;
      try {
        var ge = n.alternate;
        if ((n.flags & 1024) !== 0) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ge !== null) {
              var ye = ge.memoizedProps, Ze = ge.memoizedState, U = n.stateNode, $ = U.getSnapshotBeforeUpdate(n.elementType === n.type ? ye : Gt(n.type, ye), Ze);
              U.__reactInternalSnapshotBeforeUpdate = $;
            }
            break;
          case 3:
            var X = n.stateNode.containerInfo;
            X.nodeType === 1 ? X.textContent = "" : X.nodeType === 9 && X.documentElement && X.removeChild(X.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(i(163));
        }
      } catch (ae) {
        Ge(n, n.return, ae);
      }
      if (e = n.sibling, e !== null) {
        e.return = n.return, me = e;
        break;
      }
      me = n.return;
    }
    return ge = dd, dd = !1, ge;
  }
  function Zo(e, n, o) {
    var s = n.updateQueue;
    if (s = s !== null ? s.lastEffect : null, s !== null) {
      var a = s = s.next;
      do {
        if ((a.tag & e) === e) {
          var d = a.destroy;
          a.destroy = void 0, d !== void 0 && qu(n, o, d);
        }
        a = a.next;
      } while (a !== s);
    }
  }
  function ks(e, n) {
    if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
      var o = n = n.next;
      do {
        if ((o.tag & e) === e) {
          var s = o.create;
          o.destroy = s();
        }
        o = o.next;
      } while (o !== n);
    }
  }
  function Zu(e) {
    var n = e.ref;
    if (n !== null) {
      var o = e.stateNode;
      switch (e.tag) {
        case 5:
          e = o;
          break;
        default:
          e = o;
      }
      typeof n == "function" ? n(e) : n.current = e;
    }
  }
  function pd(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, pd(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[an], delete n[bo], delete n[hu], delete n[jg], delete n[Hg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function hd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function md(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || hd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ju(e, n, o) {
    var s = e.tag;
    if (s === 5 || s === 6) e = e.stateNode, n ? o.nodeType === 8 ? o.parentNode.insertBefore(e, n) : o.insertBefore(e, n) : (o.nodeType === 8 ? (n = o.parentNode, n.insertBefore(e, o)) : (n = o, n.appendChild(e)), o = o._reactRootContainer, o != null || n.onclick !== null || (n.onclick = ts));
    else if (s !== 4 && (e = e.child, e !== null)) for (Ju(e, n, o), e = e.sibling; e !== null; ) Ju(e, n, o), e = e.sibling;
  }
  function ea(e, n, o) {
    var s = e.tag;
    if (s === 5 || s === 6) e = e.stateNode, n ? o.insertBefore(e, n) : o.appendChild(e);
    else if (s !== 4 && (e = e.child, e !== null)) for (ea(e, n, o), e = e.sibling; e !== null; ) ea(e, n, o), e = e.sibling;
  }
  var dt = null, qt = !1;
  function Xn(e, n, o) {
    for (o = o.child; o !== null; ) gd(e, n, o), o = o.sibling;
  }
  function gd(e, n, o) {
    if (bt && typeof bt.onCommitFiberUnmount == "function") try {
      bt.onCommitFiberUnmount(ur, o);
    } catch {
    }
    switch (o.tag) {
      case 5:
        yt || eo(o, n);
      case 6:
        var s = dt, a = qt;
        dt = null, Xn(e, n, o), dt = s, qt = a, dt !== null && (qt ? (e = dt, o = o.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(o) : e.removeChild(o)) : dt.removeChild(o.stateNode));
        break;
      case 18:
        dt !== null && (qt ? (e = dt, o = o.stateNode, e.nodeType === 8 ? pu(e.parentNode, o) : e.nodeType === 1 && pu(e, o), Lo(e)) : pu(dt, o.stateNode));
        break;
      case 4:
        s = dt, a = qt, dt = o.stateNode.containerInfo, qt = !0, Xn(e, n, o), dt = s, qt = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!yt && (s = o.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
          a = s = s.next;
          do {
            var d = a, w = d.destroy;
            d = d.tag, w !== void 0 && ((d & 2) !== 0 || (d & 4) !== 0) && qu(o, n, w), a = a.next;
          } while (a !== s);
        }
        Xn(e, n, o);
        break;
      case 1:
        if (!yt && (eo(o, n), s = o.stateNode, typeof s.componentWillUnmount == "function")) try {
          s.props = o.memoizedProps, s.state = o.memoizedState, s.componentWillUnmount();
        } catch (T) {
          Ge(o, n, T);
        }
        Xn(e, n, o);
        break;
      case 21:
        Xn(e, n, o);
        break;
      case 22:
        o.mode & 1 ? (yt = (s = yt) || o.memoizedState !== null, Xn(e, n, o), yt = s) : Xn(e, n, o);
        break;
      default:
        Xn(e, n, o);
    }
  }
  function yd(e) {
    var n = e.updateQueue;
    if (n !== null) {
      e.updateQueue = null;
      var o = e.stateNode;
      o === null && (o = e.stateNode = new n0()), n.forEach(function(s) {
        var a = d0.bind(null, e, s);
        o.has(s) || (o.add(s), s.then(a, a));
      });
    }
  }
  function Zt(e, n) {
    var o = n.deletions;
    if (o !== null) for (var s = 0; s < o.length; s++) {
      var a = o[s];
      try {
        var d = e, w = n, T = w;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              dt = T.stateNode, qt = !1;
              break e;
            case 3:
              dt = T.stateNode.containerInfo, qt = !0;
              break e;
            case 4:
              dt = T.stateNode.containerInfo, qt = !0;
              break e;
          }
          T = T.return;
        }
        if (dt === null) throw Error(i(160));
        gd(d, w, a), dt = null, qt = !1;
        var I = a.alternate;
        I !== null && (I.return = null), a.return = null;
      } catch (Q) {
        Ge(a, n, Q);
      }
    }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) vd(n, e), n = n.sibling;
  }
  function vd(e, n) {
    var o = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Zt(n, e), dn(e), s & 4) {
          try {
            Zo(3, e, e.return), ks(3, e);
          } catch (ye) {
            Ge(e, e.return, ye);
          }
          try {
            Zo(5, e, e.return);
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        break;
      case 1:
        Zt(n, e), dn(e), s & 512 && o !== null && eo(o, o.return);
        break;
      case 5:
        if (Zt(n, e), dn(e), s & 512 && o !== null && eo(o, o.return), e.flags & 32) {
          var a = e.stateNode;
          try {
            je(a, "");
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        if (s & 4 && (a = e.stateNode, a != null)) {
          var d = e.memoizedProps, w = o !== null ? o.memoizedProps : d, T = e.type, I = e.updateQueue;
          if (e.updateQueue = null, I !== null) try {
            T === "input" && d.type === "radio" && d.name != null && Oe(a, d), or(T, w);
            var Q = or(T, d);
            for (w = 0; w < I.length; w += 2) {
              var ie = I[w], le = I[w + 1];
              ie === "style" ? on(a, le) : ie === "dangerouslySetInnerHTML" ? qe(a, le) : ie === "children" ? je(a, le) : S(a, ie, le, Q);
            }
            switch (T) {
              case "input":
                vt(a, d);
                break;
              case "textarea":
                De(a, d);
                break;
              case "select":
                var re = a._wrapperState.wasMultiple;
                a._wrapperState.wasMultiple = !!d.multiple;
                var he = d.value;
                he != null ? pe(a, !!d.multiple, he, !1) : re !== !!d.multiple && (d.defaultValue != null ? pe(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : pe(a, !!d.multiple, d.multiple ? [] : "", !1));
            }
            a[bo] = d;
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        break;
      case 6:
        if (Zt(n, e), dn(e), s & 4) {
          if (e.stateNode === null) throw Error(i(162));
          a = e.stateNode, d = e.memoizedProps;
          try {
            a.nodeValue = d;
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        break;
      case 3:
        if (Zt(n, e), dn(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
          Lo(n.containerInfo);
        } catch (ye) {
          Ge(e, e.return, ye);
        }
        break;
      case 4:
        Zt(n, e), dn(e);
        break;
      case 13:
        Zt(n, e), dn(e), a = e.child, a.flags & 8192 && (d = a.memoizedState !== null, a.stateNode.isHidden = d, !d || a.alternate !== null && a.alternate.memoizedState !== null || (ra = Ye())), s & 4 && yd(e);
        break;
      case 22:
        if (ie = o !== null && o.memoizedState !== null, e.mode & 1 ? (yt = (Q = yt) || ie, Zt(n, e), yt = Q) : Zt(n, e), dn(e), s & 8192) {
          if (Q = e.memoizedState !== null, (e.stateNode.isHidden = Q) && !ie && (e.mode & 1) !== 0) for (me = e, ie = e.child; ie !== null; ) {
            for (le = me = ie; me !== null; ) {
              switch (re = me, he = re.child, re.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Zo(4, re, re.return);
                  break;
                case 1:
                  eo(re, re.return);
                  var ge = re.stateNode;
                  if (typeof ge.componentWillUnmount == "function") {
                    s = re, o = re.return;
                    try {
                      n = s, ge.props = n.memoizedProps, ge.state = n.memoizedState, ge.componentWillUnmount();
                    } catch (ye) {
                      Ge(s, o, ye);
                    }
                  }
                  break;
                case 5:
                  eo(re, re.return);
                  break;
                case 22:
                  if (re.memoizedState !== null) {
                    Sd(le);
                    continue;
                  }
              }
              he !== null ? (he.return = re, me = he) : Sd(le);
            }
            ie = ie.sibling;
          }
          e: for (ie = null, le = e; ; ) {
            if (le.tag === 5) {
              if (ie === null) {
                ie = le;
                try {
                  a = le.stateNode, Q ? (d = a.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (T = le.stateNode, I = le.memoizedProps.style, w = I != null && I.hasOwnProperty("display") ? I.display : null, T.style.display = tt("display", w));
                } catch (ye) {
                  Ge(e, e.return, ye);
                }
              }
            } else if (le.tag === 6) {
              if (ie === null) try {
                le.stateNode.nodeValue = Q ? "" : le.memoizedProps;
              } catch (ye) {
                Ge(e, e.return, ye);
              }
            } else if ((le.tag !== 22 && le.tag !== 23 || le.memoizedState === null || le === e) && le.child !== null) {
              le.child.return = le, le = le.child;
              continue;
            }
            if (le === e) break e;
            for (; le.sibling === null; ) {
              if (le.return === null || le.return === e) break e;
              ie === le && (ie = null), le = le.return;
            }
            ie === le && (ie = null), le.sibling.return = le.return, le = le.sibling;
          }
        }
        break;
      case 19:
        Zt(n, e), dn(e), s & 4 && yd(e);
        break;
      case 21:
        break;
      default:
        Zt(
          n,
          e
        ), dn(e);
    }
  }
  function dn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        e: {
          for (var o = e.return; o !== null; ) {
            if (hd(o)) {
              var s = o;
              break e;
            }
            o = o.return;
          }
          throw Error(i(160));
        }
        switch (s.tag) {
          case 5:
            var a = s.stateNode;
            s.flags & 32 && (je(a, ""), s.flags &= -33);
            var d = md(e);
            ea(e, d, a);
            break;
          case 3:
          case 4:
            var w = s.stateNode.containerInfo, T = md(e);
            Ju(e, T, w);
            break;
          default:
            throw Error(i(161));
        }
      } catch (I) {
        Ge(e, e.return, I);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function o0(e, n, o) {
    me = e, wd(e);
  }
  function wd(e, n, o) {
    for (var s = (e.mode & 1) !== 0; me !== null; ) {
      var a = me, d = a.child;
      if (a.tag === 22 && s) {
        var w = a.memoizedState !== null || _s;
        if (!w) {
          var T = a.alternate, I = T !== null && T.memoizedState !== null || yt;
          T = _s;
          var Q = yt;
          if (_s = w, (yt = I) && !Q) for (me = a; me !== null; ) w = me, I = w.child, w.tag === 22 && w.memoizedState !== null ? Ed(a) : I !== null ? (I.return = w, me = I) : Ed(a);
          for (; d !== null; ) me = d, wd(d), d = d.sibling;
          me = a, _s = T, yt = Q;
        }
        xd(e);
      } else (a.subtreeFlags & 8772) !== 0 && d !== null ? (d.return = a, me = d) : xd(e);
    }
  }
  function xd(e) {
    for (; me !== null; ) {
      var n = me;
      if ((n.flags & 8772) !== 0) {
        var o = n.alternate;
        try {
          if ((n.flags & 8772) !== 0) switch (n.tag) {
            case 0:
            case 11:
            case 15:
              yt || ks(5, n);
              break;
            case 1:
              var s = n.stateNode;
              if (n.flags & 4 && !yt) if (o === null) s.componentDidMount();
              else {
                var a = n.elementType === n.type ? o.memoizedProps : Gt(n.type, o.memoizedProps);
                s.componentDidUpdate(a, o.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
              }
              var d = n.updateQueue;
              d !== null && Sf(n, d, s);
              break;
            case 3:
              var w = n.updateQueue;
              if (w !== null) {
                if (o = null, n.child !== null) switch (n.child.tag) {
                  case 5:
                    o = n.child.stateNode;
                    break;
                  case 1:
                    o = n.child.stateNode;
                }
                Sf(n, w, o);
              }
              break;
            case 5:
              var T = n.stateNode;
              if (o === null && n.flags & 4) {
                o = T;
                var I = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    I.autoFocus && o.focus();
                    break;
                  case "img":
                    I.src && (o.src = I.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var Q = n.alternate;
                if (Q !== null) {
                  var ie = Q.memoizedState;
                  if (ie !== null) {
                    var le = ie.dehydrated;
                    le !== null && Lo(le);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(i(163));
          }
          yt || n.flags & 512 && Zu(n);
        } catch (re) {
          Ge(n, n.return, re);
        }
      }
      if (n === e) {
        me = null;
        break;
      }
      if (o = n.sibling, o !== null) {
        o.return = n.return, me = o;
        break;
      }
      me = n.return;
    }
  }
  function Sd(e) {
    for (; me !== null; ) {
      var n = me;
      if (n === e) {
        me = null;
        break;
      }
      var o = n.sibling;
      if (o !== null) {
        o.return = n.return, me = o;
        break;
      }
      me = n.return;
    }
  }
  function Ed(e) {
    for (; me !== null; ) {
      var n = me;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var o = n.return;
            try {
              ks(4, n);
            } catch (I) {
              Ge(n, o, I);
            }
            break;
          case 1:
            var s = n.stateNode;
            if (typeof s.componentDidMount == "function") {
              var a = n.return;
              try {
                s.componentDidMount();
              } catch (I) {
                Ge(n, a, I);
              }
            }
            var d = n.return;
            try {
              Zu(n);
            } catch (I) {
              Ge(n, d, I);
            }
            break;
          case 5:
            var w = n.return;
            try {
              Zu(n);
            } catch (I) {
              Ge(n, w, I);
            }
        }
      } catch (I) {
        Ge(n, n.return, I);
      }
      if (n === e) {
        me = null;
        break;
      }
      var T = n.sibling;
      if (T !== null) {
        T.return = n.return, me = T;
        break;
      }
      me = n.return;
    }
  }
  var i0 = Math.ceil, Ns = P.ReactCurrentDispatcher, ta = P.ReactCurrentOwner, Yt = P.ReactCurrentBatchConfig, ze = 0, ut = null, nt = null, pt = 0, Dt = 0, to = Bn(0), it = 0, Jo = null, yr = 0, Cs = 0, na = 0, ei = null, Ct = null, ra = 0, no = 1 / 0, Nn = null, Ms = !1, oa = null, Kn = null, Ps = !1, Qn = null, Ts = 0, ti = 0, ia = null, Ls = -1, Is = 0;
  function Et() {
    return (ze & 6) !== 0 ? Ye() : Ls !== -1 ? Ls : Ls = Ye();
  }
  function Gn(e) {
    return (e.mode & 1) === 0 ? 1 : (ze & 2) !== 0 && pt !== 0 ? pt & -pt : Bg.transition !== null ? (Is === 0 && (Is = Hi()), Is) : (e = $e, e !== 0 || (e = window.event, e = e === void 0 ? 16 : _c(e.type)), e);
  }
  function Jt(e, n, o, s) {
    if (50 < ti) throw ti = 0, ia = null, Error(i(185));
    An(e, o, s), ((ze & 2) === 0 || e !== ut) && (e === ut && ((ze & 2) === 0 && (Cs |= o), it === 4 && qn(e, pt)), Mt(e, s), o === 1 && ze === 0 && (n.mode & 1) === 0 && (no = Ye() + 500, is && Un()));
  }
  function Mt(e, n) {
    var o = e.callbackNode;
    Hl(e, n);
    var s = $r(e, e === ut ? pt : 0);
    if (s === 0) o !== null && Di(o), e.callbackNode = null, e.callbackPriority = 0;
    else if (n = s & -s, e.callbackPriority !== n) {
      if (o != null && Di(o), n === 1) e.tag === 0 ? bg(kd.bind(null, e)) : af(kd.bind(null, e)), Og(function() {
        (ze & 6) === 0 && Un();
      }), o = null;
      else {
        switch (mc(s)) {
          case 1:
            o = ko;
            break;
          case 4:
            o = Fi;
            break;
          case 16:
            o = zr;
            break;
          case 536870912:
            o = ji;
            break;
          default:
            o = zr;
        }
        o = zd(o, _d.bind(null, e));
      }
      e.callbackPriority = n, e.callbackNode = o;
    }
  }
  function _d(e, n) {
    if (Ls = -1, Is = 0, (ze & 6) !== 0) throw Error(i(327));
    var o = e.callbackNode;
    if (ro() && e.callbackNode !== o) return null;
    var s = $r(e, e === ut ? pt : 0);
    if (s === 0) return null;
    if ((s & 30) !== 0 || (s & e.expiredLanes) !== 0 || n) n = zs(e, s);
    else {
      n = s;
      var a = ze;
      ze |= 2;
      var d = Cd();
      (ut !== e || pt !== n) && (Nn = null, no = Ye() + 500, wr(e, n));
      do
        try {
          u0();
          break;
        } catch (T) {
          Nd(e, T);
        }
      while (!0);
      _u(), Ns.current = d, ze = a, nt !== null ? n = 0 : (ut = null, pt = 0, n = it);
    }
    if (n !== 0) {
      if (n === 2 && (a = ar(e), a !== 0 && (s = a, n = sa(e, a))), n === 1) throw o = Jo, wr(e, 0), qn(e, s), Mt(e, Ye()), o;
      if (n === 6) qn(e, s);
      else {
        if (a = e.current.alternate, (s & 30) === 0 && !s0(a) && (n = zs(e, s), n === 2 && (d = ar(e), d !== 0 && (s = d, n = sa(e, d))), n === 1)) throw o = Jo, wr(e, 0), qn(e, s), Mt(e, Ye()), o;
        switch (e.finishedWork = a, e.finishedLanes = s, n) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            xr(e, Ct, Nn);
            break;
          case 3:
            if (qn(e, s), (s & 130023424) === s && (n = ra + 500 - Ye(), 10 < n)) {
              if ($r(e, 0) !== 0) break;
              if (a = e.suspendedLanes, (a & s) !== s) {
                Et(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = du(xr.bind(null, e, Ct, Nn), n);
              break;
            }
            xr(e, Ct, Nn);
            break;
          case 4:
            if (qn(e, s), (s & 4194240) === s) break;
            for (n = e.eventTimes, a = -1; 0 < s; ) {
              var w = 31 - zt(s);
              d = 1 << w, w = n[w], w > a && (a = w), s &= ~d;
            }
            if (s = a, s = Ye() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * i0(s / 1960)) - s, 10 < s) {
              e.timeoutHandle = du(xr.bind(null, e, Ct, Nn), s);
              break;
            }
            xr(e, Ct, Nn);
            break;
          case 5:
            xr(e, Ct, Nn);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return Mt(e, Ye()), e.callbackNode === o ? _d.bind(null, e) : null;
  }
  function sa(e, n) {
    var o = ei;
    return e.current.memoizedState.isDehydrated && (wr(e, n).flags |= 256), e = zs(e, n), e !== 2 && (n = Ct, Ct = o, n !== null && la(n)), e;
  }
  function la(e) {
    Ct === null ? Ct = e : Ct.push.apply(Ct, e);
  }
  function s0(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var o = n.updateQueue;
        if (o !== null && (o = o.stores, o !== null)) for (var s = 0; s < o.length; s++) {
          var a = o[s], d = a.getSnapshot;
          a = a.value;
          try {
            if (!Kt(d(), a)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (o = n.child, n.subtreeFlags & 16384 && o !== null) o.return = n, n = o;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function qn(e, n) {
    for (n &= ~na, n &= ~Cs, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
      var o = 31 - zt(n), s = 1 << o;
      e[o] = -1, n &= ~s;
    }
  }
  function kd(e) {
    if ((ze & 6) !== 0) throw Error(i(327));
    ro();
    var n = $r(e, 0);
    if ((n & 1) === 0) return Mt(e, Ye()), null;
    var o = zs(e, n);
    if (e.tag !== 0 && o === 2) {
      var s = ar(e);
      s !== 0 && (n = s, o = sa(e, s));
    }
    if (o === 1) throw o = Jo, wr(e, 0), qn(e, n), Mt(e, Ye()), o;
    if (o === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = n, xr(e, Ct, Nn), Mt(e, Ye()), null;
  }
  function ua(e, n) {
    var o = ze;
    ze |= 1;
    try {
      return e(n);
    } finally {
      ze = o, ze === 0 && (no = Ye() + 500, is && Un());
    }
  }
  function vr(e) {
    Qn !== null && Qn.tag === 0 && (ze & 6) === 0 && ro();
    var n = ze;
    ze |= 1;
    var o = Yt.transition, s = $e;
    try {
      if (Yt.transition = null, $e = 1, e) return e();
    } finally {
      $e = s, Yt.transition = o, ze = n, (ze & 6) === 0 && Un();
    }
  }
  function aa() {
    Dt = to.current, Be(to);
  }
  function wr(e, n) {
    e.finishedWork = null, e.finishedLanes = 0;
    var o = e.timeoutHandle;
    if (o !== -1 && (e.timeoutHandle = -1, Dg(o)), nt !== null) for (o = nt.return; o !== null; ) {
      var s = o;
      switch (vu(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && rs();
          break;
        case 3:
          Zr(), Be(_t), Be(ht), Iu();
          break;
        case 5:
          Tu(s);
          break;
        case 4:
          Zr();
          break;
        case 13:
          Be(Xe);
          break;
        case 19:
          Be(Xe);
          break;
        case 10:
          ku(s.type._context);
          break;
        case 22:
        case 23:
          aa();
      }
      o = o.return;
    }
    if (ut = e, nt = e = Zn(e.current, null), pt = Dt = n, it = 0, Jo = null, na = Cs = yr = 0, Ct = ei = null, hr !== null) {
      for (n = 0; n < hr.length; n++) if (o = hr[n], s = o.interleaved, s !== null) {
        o.interleaved = null;
        var a = s.next, d = o.pending;
        if (d !== null) {
          var w = d.next;
          d.next = a, s.next = w;
        }
        o.pending = s;
      }
      hr = null;
    }
    return e;
  }
  function Nd(e, n) {
    do {
      var o = nt;
      try {
        if (_u(), ms.current = ws, gs) {
          for (var s = Ke.memoizedState; s !== null; ) {
            var a = s.queue;
            a !== null && (a.pending = null), s = s.next;
          }
          gs = !1;
        }
        if (gr = 0, lt = ot = Ke = null, Xo = !1, Ko = 0, ta.current = null, o === null || o.return === null) {
          it = 1, Jo = n, nt = null;
          break;
        }
        e: {
          var d = e, w = o.return, T = o, I = n;
          if (n = pt, T.flags |= 32768, I !== null && typeof I == "object" && typeof I.then == "function") {
            var Q = I, ie = T, le = ie.tag;
            if ((ie.mode & 1) === 0 && (le === 0 || le === 11 || le === 15)) {
              var re = ie.alternate;
              re ? (ie.updateQueue = re.updateQueue, ie.memoizedState = re.memoizedState, ie.lanes = re.lanes) : (ie.updateQueue = null, ie.memoizedState = null);
            }
            var he = Gf(w);
            if (he !== null) {
              he.flags &= -257, qf(he, w, T, d, n), he.mode & 1 && Qf(d, Q, n), n = he, I = Q;
              var ge = n.updateQueue;
              if (ge === null) {
                var ye = /* @__PURE__ */ new Set();
                ye.add(I), n.updateQueue = ye;
              } else ge.add(I);
              break e;
            } else {
              if ((n & 1) === 0) {
                Qf(d, Q, n), ca();
                break e;
              }
              I = Error(i(426));
            }
          } else if (Ve && T.mode & 1) {
            var Ze = Gf(w);
            if (Ze !== null) {
              (Ze.flags & 65536) === 0 && (Ze.flags |= 256), qf(Ze, w, T, d, n), Su(Jr(I, T));
              break e;
            }
          }
          d = I = Jr(I, T), it !== 4 && (it = 2), ei === null ? ei = [d] : ei.push(d), d = w;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, n &= -n, d.lanes |= n;
                var U = Xf(d, I, n);
                xf(d, U);
                break e;
              case 1:
                T = I;
                var $ = d.type, X = d.stateNode;
                if ((d.flags & 128) === 0 && (typeof $.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (Kn === null || !Kn.has(X)))) {
                  d.flags |= 65536, n &= -n, d.lanes |= n;
                  var ae = Kf(d, T, n);
                  xf(d, ae);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Pd(o);
      } catch (ve) {
        n = ve, nt === o && o !== null && (nt = o = o.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Cd() {
    var e = Ns.current;
    return Ns.current = ws, e === null ? ws : e;
  }
  function ca() {
    (it === 0 || it === 3 || it === 2) && (it = 4), ut === null || (yr & 268435455) === 0 && (Cs & 268435455) === 0 || qn(ut, pt);
  }
  function zs(e, n) {
    var o = ze;
    ze |= 2;
    var s = Cd();
    (ut !== e || pt !== n) && (Nn = null, wr(e, n));
    do
      try {
        l0();
        break;
      } catch (a) {
        Nd(e, a);
      }
    while (!0);
    if (_u(), ze = o, Ns.current = s, nt !== null) throw Error(i(261));
    return ut = null, pt = 0, it;
  }
  function l0() {
    for (; nt !== null; ) Md(nt);
  }
  function u0() {
    for (; nt !== null && !zl(); ) Md(nt);
  }
  function Md(e) {
    var n = Id(e.alternate, e, Dt);
    e.memoizedProps = e.pendingProps, n === null ? Pd(e) : nt = n, ta.current = null;
  }
  function Pd(e) {
    var n = e;
    do {
      var o = n.alternate;
      if (e = n.return, (n.flags & 32768) === 0) {
        if (o = e0(o, n, Dt), o !== null) {
          nt = o;
          return;
        }
      } else {
        if (o = t0(o, n), o !== null) {
          o.flags &= 32767, nt = o;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          it = 6, nt = null;
          return;
        }
      }
      if (n = n.sibling, n !== null) {
        nt = n;
        return;
      }
      nt = n = e;
    } while (n !== null);
    it === 0 && (it = 5);
  }
  function xr(e, n, o) {
    var s = $e, a = Yt.transition;
    try {
      Yt.transition = null, $e = 1, a0(e, n, o, s);
    } finally {
      Yt.transition = a, $e = s;
    }
    return null;
  }
  function a0(e, n, o, s) {
    do
      ro();
    while (Qn !== null);
    if ((ze & 6) !== 0) throw Error(i(327));
    o = e.finishedWork;
    var a = e.finishedLanes;
    if (o === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, o === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var d = o.lanes | o.childLanes;
    if (Vm(e, d), e === ut && (nt = ut = null, pt = 0), (o.subtreeFlags & 2064) === 0 && (o.flags & 2064) === 0 || Ps || (Ps = !0, zd(zr, function() {
      return ro(), null;
    })), d = (o.flags & 15990) !== 0, (o.subtreeFlags & 15990) !== 0 || d) {
      d = Yt.transition, Yt.transition = null;
      var w = $e;
      $e = 1;
      var T = ze;
      ze |= 4, ta.current = null, r0(e, o), vd(o, e), Tg(cu), Vi = !!au, cu = au = null, e.current = o, o0(o), Oi(), ze = T, $e = w, Yt.transition = d;
    } else e.current = o;
    if (Ps && (Ps = !1, Qn = e, Ts = a), d = e.pendingLanes, d === 0 && (Kn = null), $l(o.stateNode), Mt(e, Ye()), n !== null) for (s = e.onRecoverableError, o = 0; o < n.length; o++) a = n[o], s(a.value, { componentStack: a.stack, digest: a.digest });
    if (Ms) throw Ms = !1, e = oa, oa = null, e;
    return (Ts & 1) !== 0 && e.tag !== 0 && ro(), d = e.pendingLanes, (d & 1) !== 0 ? e === ia ? ti++ : (ti = 0, ia = e) : ti = 0, Un(), null;
  }
  function ro() {
    if (Qn !== null) {
      var e = mc(Ts), n = Yt.transition, o = $e;
      try {
        if (Yt.transition = null, $e = 16 > e ? 16 : e, Qn === null) var s = !1;
        else {
          if (e = Qn, Qn = null, Ts = 0, (ze & 6) !== 0) throw Error(i(331));
          var a = ze;
          for (ze |= 4, me = e.current; me !== null; ) {
            var d = me, w = d.child;
            if ((me.flags & 16) !== 0) {
              var T = d.deletions;
              if (T !== null) {
                for (var I = 0; I < T.length; I++) {
                  var Q = T[I];
                  for (me = Q; me !== null; ) {
                    var ie = me;
                    switch (ie.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Zo(8, ie, d);
                    }
                    var le = ie.child;
                    if (le !== null) le.return = ie, me = le;
                    else for (; me !== null; ) {
                      ie = me;
                      var re = ie.sibling, he = ie.return;
                      if (pd(ie), ie === Q) {
                        me = null;
                        break;
                      }
                      if (re !== null) {
                        re.return = he, me = re;
                        break;
                      }
                      me = he;
                    }
                  }
                }
                var ge = d.alternate;
                if (ge !== null) {
                  var ye = ge.child;
                  if (ye !== null) {
                    ge.child = null;
                    do {
                      var Ze = ye.sibling;
                      ye.sibling = null, ye = Ze;
                    } while (ye !== null);
                  }
                }
                me = d;
              }
            }
            if ((d.subtreeFlags & 2064) !== 0 && w !== null) w.return = d, me = w;
            else e: for (; me !== null; ) {
              if (d = me, (d.flags & 2048) !== 0) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Zo(9, d, d.return);
              }
              var U = d.sibling;
              if (U !== null) {
                U.return = d.return, me = U;
                break e;
              }
              me = d.return;
            }
          }
          var $ = e.current;
          for (me = $; me !== null; ) {
            w = me;
            var X = w.child;
            if ((w.subtreeFlags & 2064) !== 0 && X !== null) X.return = w, me = X;
            else e: for (w = $; me !== null; ) {
              if (T = me, (T.flags & 2048) !== 0) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ks(9, T);
                }
              } catch (ve) {
                Ge(T, T.return, ve);
              }
              if (T === w) {
                me = null;
                break e;
              }
              var ae = T.sibling;
              if (ae !== null) {
                ae.return = T.return, me = ae;
                break e;
              }
              me = T.return;
            }
          }
          if (ze = a, Un(), bt && typeof bt.onPostCommitFiberRoot == "function") try {
            bt.onPostCommitFiberRoot(ur, e);
          } catch {
          }
          s = !0;
        }
        return s;
      } finally {
        $e = o, Yt.transition = n;
      }
    }
    return !1;
  }
  function Td(e, n, o) {
    n = Jr(o, n), n = Xf(e, n, 1), e = Yn(e, n, 1), n = Et(), e !== null && (An(e, 1, n), Mt(e, n));
  }
  function Ge(e, n, o) {
    if (e.tag === 3) Td(e, e, o);
    else for (; n !== null; ) {
      if (n.tag === 3) {
        Td(n, e, o);
        break;
      } else if (n.tag === 1) {
        var s = n.stateNode;
        if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Kn === null || !Kn.has(s))) {
          e = Jr(o, e), e = Kf(n, e, 1), n = Yn(n, e, 1), e = Et(), n !== null && (An(n, 1, e), Mt(n, e));
          break;
        }
      }
      n = n.return;
    }
  }
  function c0(e, n, o) {
    var s = e.pingCache;
    s !== null && s.delete(n), n = Et(), e.pingedLanes |= e.suspendedLanes & o, ut === e && (pt & o) === o && (it === 4 || it === 3 && (pt & 130023424) === pt && 500 > Ye() - ra ? wr(e, 0) : na |= o), Mt(e, n);
  }
  function Ld(e, n) {
    n === 0 && ((e.mode & 1) === 0 ? n = 1 : (n = Ar, Ar <<= 1, (Ar & 130023424) === 0 && (Ar = 4194304)));
    var o = Et();
    e = En(e, n), e !== null && (An(e, n, o), Mt(e, o));
  }
  function f0(e) {
    var n = e.memoizedState, o = 0;
    n !== null && (o = n.retryLane), Ld(e, o);
  }
  function d0(e, n) {
    var o = 0;
    switch (e.tag) {
      case 13:
        var s = e.stateNode, a = e.memoizedState;
        a !== null && (o = a.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    s !== null && s.delete(n), Ld(e, o);
  }
  var Id;
  Id = function(e, n, o) {
    if (e !== null) if (e.memoizedProps !== n.pendingProps || _t.current) Nt = !0;
    else {
      if ((e.lanes & o) === 0 && (n.flags & 128) === 0) return Nt = !1, Jg(e, n, o);
      Nt = (e.flags & 131072) !== 0;
    }
    else Nt = !1, Ve && (n.flags & 1048576) !== 0 && cf(n, ls, n.index);
    switch (n.lanes = 0, n.tag) {
      case 2:
        var s = n.type;
        Es(e, n), e = n.pendingProps;
        var a = Wr(n, ht.current);
        qr(n, o), a = Au(null, n, s, e, a, o);
        var d = $u();
        return n.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, kt(s) ? (d = !0, os(n)) : d = !1, n.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Mu(n), a.updater = xs, n.stateNode = a, a._reactInternals = n, bu(n, s, e, o), n = Wu(null, n, s, !0, d, o)) : (n.tag = 0, Ve && d && yu(n), St(null, n, a, o), n = n.child), n;
      case 16:
        s = n.elementType;
        e: {
          switch (Es(e, n), e = n.pendingProps, a = s._init, s = a(s._payload), n.type = s, a = n.tag = h0(s), e = Gt(s, e), a) {
            case 0:
              n = Uu(null, n, s, e, o);
              break e;
            case 1:
              n = rd(null, n, s, e, o);
              break e;
            case 11:
              n = Zf(null, n, s, e, o);
              break e;
            case 14:
              n = Jf(null, n, s, Gt(s.type, e), o);
              break e;
          }
          throw Error(i(
            306,
            s,
            ""
          ));
        }
        return n;
      case 0:
        return s = n.type, a = n.pendingProps, a = n.elementType === s ? a : Gt(s, a), Uu(e, n, s, a, o);
      case 1:
        return s = n.type, a = n.pendingProps, a = n.elementType === s ? a : Gt(s, a), rd(e, n, s, a, o);
      case 3:
        e: {
          if (od(n), e === null) throw Error(i(387));
          s = n.pendingProps, d = n.memoizedState, a = d.element, wf(e, n), ps(n, s, null, o);
          var w = n.memoizedState;
          if (s = w.element, d.isDehydrated) if (d = { element: s, isDehydrated: !1, cache: w.cache, pendingSuspenseBoundaries: w.pendingSuspenseBoundaries, transitions: w.transitions }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
            a = Jr(Error(i(423)), n), n = id(e, n, s, o, a);
            break e;
          } else if (s !== a) {
            a = Jr(Error(i(424)), n), n = id(e, n, s, o, a);
            break e;
          } else for ($t = bn(n.stateNode.containerInfo.firstChild), At = n, Ve = !0, Qt = null, o = yf(n, null, s, o), n.child = o; o; ) o.flags = o.flags & -3 | 4096, o = o.sibling;
          else {
            if (Kr(), s === a) {
              n = kn(e, n, o);
              break e;
            }
            St(e, n, s, o);
          }
          n = n.child;
        }
        return n;
      case 5:
        return Ef(n), e === null && xu(n), s = n.type, a = n.pendingProps, d = e !== null ? e.memoizedProps : null, w = a.children, fu(s, a) ? w = null : d !== null && fu(s, d) && (n.flags |= 32), nd(e, n), St(e, n, w, o), n.child;
      case 6:
        return e === null && xu(n), null;
      case 13:
        return sd(e, n, o);
      case 4:
        return Pu(n, n.stateNode.containerInfo), s = n.pendingProps, e === null ? n.child = Qr(n, null, s, o) : St(e, n, s, o), n.child;
      case 11:
        return s = n.type, a = n.pendingProps, a = n.elementType === s ? a : Gt(s, a), Zf(e, n, s, a, o);
      case 7:
        return St(e, n, n.pendingProps, o), n.child;
      case 8:
        return St(e, n, n.pendingProps.children, o), n.child;
      case 12:
        return St(e, n, n.pendingProps.children, o), n.child;
      case 10:
        e: {
          if (s = n.type._context, a = n.pendingProps, d = n.memoizedProps, w = a.value, He(cs, s._currentValue), s._currentValue = w, d !== null) if (Kt(d.value, w)) {
            if (d.children === a.children && !_t.current) {
              n = kn(e, n, o);
              break e;
            }
          } else for (d = n.child, d !== null && (d.return = n); d !== null; ) {
            var T = d.dependencies;
            if (T !== null) {
              w = d.child;
              for (var I = T.firstContext; I !== null; ) {
                if (I.context === s) {
                  if (d.tag === 1) {
                    I = _n(-1, o & -o), I.tag = 2;
                    var Q = d.updateQueue;
                    if (Q !== null) {
                      Q = Q.shared;
                      var ie = Q.pending;
                      ie === null ? I.next = I : (I.next = ie.next, ie.next = I), Q.pending = I;
                    }
                  }
                  d.lanes |= o, I = d.alternate, I !== null && (I.lanes |= o), Nu(
                    d.return,
                    o,
                    n
                  ), T.lanes |= o;
                  break;
                }
                I = I.next;
              }
            } else if (d.tag === 10) w = d.type === n.type ? null : d.child;
            else if (d.tag === 18) {
              if (w = d.return, w === null) throw Error(i(341));
              w.lanes |= o, T = w.alternate, T !== null && (T.lanes |= o), Nu(w, o, n), w = d.sibling;
            } else w = d.child;
            if (w !== null) w.return = d;
            else for (w = d; w !== null; ) {
              if (w === n) {
                w = null;
                break;
              }
              if (d = w.sibling, d !== null) {
                d.return = w.return, w = d;
                break;
              }
              w = w.return;
            }
            d = w;
          }
          St(e, n, a.children, o), n = n.child;
        }
        return n;
      case 9:
        return a = n.type, s = n.pendingProps.children, qr(n, o), a = Ut(a), s = s(a), n.flags |= 1, St(e, n, s, o), n.child;
      case 14:
        return s = n.type, a = Gt(s, n.pendingProps), a = Gt(s.type, a), Jf(e, n, s, a, o);
      case 15:
        return ed(e, n, n.type, n.pendingProps, o);
      case 17:
        return s = n.type, a = n.pendingProps, a = n.elementType === s ? a : Gt(s, a), Es(e, n), n.tag = 1, kt(s) ? (e = !0, os(n)) : e = !1, qr(n, o), Wf(n, s, a), bu(n, s, a, o), Wu(null, n, s, !0, e, o);
      case 19:
        return ud(e, n, o);
      case 22:
        return td(e, n, o);
    }
    throw Error(i(156, n.tag));
  };
  function zd(e, n) {
    return $i(e, n);
  }
  function p0(e, n, o, s) {
    this.tag = e, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xt(e, n, o, s) {
    return new p0(e, n, o, s);
  }
  function fa(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function h0(e) {
    if (typeof e == "function") return fa(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === te) return 11;
      if (e === b) return 14;
    }
    return 2;
  }
  function Zn(e, n) {
    var o = e.alternate;
    return o === null ? (o = Xt(e.tag, n, e.key, e.mode), o.elementType = e.elementType, o.type = e.type, o.stateNode = e.stateNode, o.alternate = e, e.alternate = o) : (o.pendingProps = n, o.type = e.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = e.flags & 14680064, o.childLanes = e.childLanes, o.lanes = e.lanes, o.child = e.child, o.memoizedProps = e.memoizedProps, o.memoizedState = e.memoizedState, o.updateQueue = e.updateQueue, n = e.dependencies, o.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, o.sibling = e.sibling, o.index = e.index, o.ref = e.ref, o;
  }
  function Rs(e, n, o, s, a, d) {
    var w = 2;
    if (s = e, typeof e == "function") fa(e) && (w = 1);
    else if (typeof e == "string") w = 5;
    else e: switch (e) {
      case B:
        return Sr(o.children, a, d, n);
      case V:
        w = 8, a |= 8;
        break;
      case ee:
        return e = Xt(12, o, n, a | 2), e.elementType = ee, e.lanes = d, e;
      case J:
        return e = Xt(13, o, n, a), e.elementType = J, e.lanes = d, e;
      case C:
        return e = Xt(19, o, n, a), e.elementType = C, e.lanes = d, e;
      case j:
        return As(o, a, d, n);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case oe:
            w = 10;
            break e;
          case Z:
            w = 9;
            break e;
          case te:
            w = 11;
            break e;
          case b:
            w = 14;
            break e;
          case D:
            w = 16, s = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return n = Xt(w, o, n, a), n.elementType = e, n.type = s, n.lanes = d, n;
  }
  function Sr(e, n, o, s) {
    return e = Xt(7, e, s, n), e.lanes = o, e;
  }
  function As(e, n, o, s) {
    return e = Xt(22, e, s, n), e.elementType = j, e.lanes = o, e.stateNode = { isHidden: !1 }, e;
  }
  function da(e, n, o) {
    return e = Xt(6, e, null, n), e.lanes = o, e;
  }
  function pa(e, n, o) {
    return n = Xt(4, e.children !== null ? e.children : [], e.key, n), n.lanes = o, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
  }
  function m0(e, n, o, s, a) {
    this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = No(0), this.expirationTimes = No(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = No(0), this.identifierPrefix = s, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
  }
  function ha(e, n, o, s, a, d, w, T, I) {
    return e = new m0(e, n, o, T, I), n === 1 ? (n = 1, d === !0 && (n |= 8)) : n = 0, d = Xt(3, null, null, n), e.current = d, d.stateNode = e, d.memoizedState = { element: s, isDehydrated: o, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Mu(d), e;
  }
  function g0(e, n, o) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: H, key: s == null ? null : "" + s, children: e, containerInfo: n, implementation: o };
  }
  function Rd(e) {
    if (!e) return Vn;
    e = e._reactInternals;
    e: {
      if (ln(e) !== e || e.tag !== 1) throw Error(i(170));
      var n = e;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (kt(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var o = e.type;
      if (kt(o)) return lf(e, o, n);
    }
    return n;
  }
  function Ad(e, n, o, s, a, d, w, T, I) {
    return e = ha(o, s, !0, e, a, d, w, T, I), e.context = Rd(null), o = e.current, s = Et(), a = Gn(o), d = _n(s, a), d.callback = n ?? null, Yn(o, d, a), e.current.lanes = a, An(e, a, s), Mt(e, s), e;
  }
  function $s(e, n, o, s) {
    var a = n.current, d = Et(), w = Gn(a);
    return o = Rd(o), n.context === null ? n.context = o : n.pendingContext = o, n = _n(d, w), n.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (n.callback = s), e = Yn(a, n, w), e !== null && (Jt(e, a, w, d), ds(e, a, w)), w;
  }
  function Ds(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function $d(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var o = e.retryLane;
      e.retryLane = o !== 0 && o < n ? o : n;
    }
  }
  function ma(e, n) {
    $d(e, n), (e = e.alternate) && $d(e, n);
  }
  function y0() {
    return null;
  }
  var Dd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function ga(e) {
    this._internalRoot = e;
  }
  Os.prototype.render = ga.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    $s(e, n, null, null);
  }, Os.prototype.unmount = ga.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      vr(function() {
        $s(null, e, null, null);
      }), n[vn] = null;
    }
  };
  function Os(e) {
    this._internalRoot = e;
  }
  Os.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = vc();
      e = { blockedOn: null, target: e, priority: n };
      for (var o = 0; o < Fn.length && n !== 0 && n < Fn[o].priority; o++) ;
      Fn.splice(o, 0, e), o === 0 && Sc(e);
    }
  };
  function ya(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Fs(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Od() {
  }
  function v0(e, n, o, s, a) {
    if (a) {
      if (typeof s == "function") {
        var d = s;
        s = function() {
          var Q = Ds(w);
          d.call(Q);
        };
      }
      var w = Ad(n, s, e, 0, null, !1, !1, "", Od);
      return e._reactRootContainer = w, e[vn] = w.current, jo(e.nodeType === 8 ? e.parentNode : e), vr(), w;
    }
    for (; a = e.lastChild; ) e.removeChild(a);
    if (typeof s == "function") {
      var T = s;
      s = function() {
        var Q = Ds(I);
        T.call(Q);
      };
    }
    var I = ha(e, 0, !1, null, null, !1, !1, "", Od);
    return e._reactRootContainer = I, e[vn] = I.current, jo(e.nodeType === 8 ? e.parentNode : e), vr(function() {
      $s(n, I, o, s);
    }), I;
  }
  function js(e, n, o, s, a) {
    var d = o._reactRootContainer;
    if (d) {
      var w = d;
      if (typeof a == "function") {
        var T = a;
        a = function() {
          var I = Ds(w);
          T.call(I);
        };
      }
      $s(n, w, e, a);
    } else w = v0(o, n, e, a, s);
    return Ds(w);
  }
  gc = function(e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var o = un(n.pendingLanes);
          o !== 0 && (bl(n, o | 1), Mt(n, Ye()), (ze & 6) === 0 && (no = Ye() + 500, Un()));
        }
        break;
      case 13:
        vr(function() {
          var s = En(e, 1);
          if (s !== null) {
            var a = Et();
            Jt(s, e, 1, a);
          }
        }), ma(e, 1);
    }
  }, Bl = function(e) {
    if (e.tag === 13) {
      var n = En(e, 134217728);
      if (n !== null) {
        var o = Et();
        Jt(n, e, 134217728, o);
      }
      ma(e, 134217728);
    }
  }, yc = function(e) {
    if (e.tag === 13) {
      var n = Gn(e), o = En(e, n);
      if (o !== null) {
        var s = Et();
        Jt(o, e, n, s);
      }
      ma(e, n);
    }
  }, vc = function() {
    return $e;
  }, wc = function(e, n) {
    var o = $e;
    try {
      return $e = e, n();
    } finally {
      $e = o;
    }
  }, xt = function(e, n, o) {
    switch (n) {
      case "input":
        if (vt(e, o), n = o.name, o.type === "radio" && n != null) {
          for (o = e; o.parentNode; ) o = o.parentNode;
          for (o = o.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < o.length; n++) {
            var s = o[n];
            if (s !== e && s.form === e.form) {
              var a = ns(s);
              if (!a) throw Error(i(90));
              Se(s), vt(s, a);
            }
          }
        }
        break;
      case "textarea":
        De(e, o);
        break;
      case "select":
        n = o.value, n != null && pe(e, !!o.multiple, n, !1);
    }
  }, Li = ua, Ii = vr;
  var w0 = { usingClientEntryPoint: !1, Events: [Bo, Vr, ns, Ti, vo, ua] }, ni = { findFiberByHostInstance: cr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, x0 = { bundleType: ni.bundleType, version: ni.version, rendererPackageName: ni.rendererPackageName, rendererConfig: ni.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: P.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Ri(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ni.findFiberByHostInstance || y0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hs.isDisabled && Hs.supportsFiber) try {
      ur = Hs.inject(x0), bt = Hs;
    } catch {
    }
  }
  return Pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = w0, Pt.createPortal = function(e, n) {
    var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ya(n)) throw Error(i(200));
    return g0(e, n, null, o);
  }, Pt.createRoot = function(e, n) {
    if (!ya(e)) throw Error(i(299));
    var o = !1, s = "", a = Dd;
    return n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), n = ha(e, 1, !1, null, null, o, !1, s, a), e[vn] = n.current, jo(e.nodeType === 8 ? e.parentNode : e), new ga(n);
  }, Pt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = Ri(n), e = e === null ? null : e.stateNode, e;
  }, Pt.flushSync = function(e) {
    return vr(e);
  }, Pt.hydrate = function(e, n, o) {
    if (!Fs(n)) throw Error(i(200));
    return js(null, e, n, !0, o);
  }, Pt.hydrateRoot = function(e, n, o) {
    if (!ya(e)) throw Error(i(405));
    var s = o != null && o.hydratedSources || null, a = !1, d = "", w = Dd;
    if (o != null && (o.unstable_strictMode === !0 && (a = !0), o.identifierPrefix !== void 0 && (d = o.identifierPrefix), o.onRecoverableError !== void 0 && (w = o.onRecoverableError)), n = Ad(n, null, e, 1, o ?? null, a, !1, d, w), e[vn] = n.current, jo(e), s) for (e = 0; e < s.length; e++) o = s[e], a = o._getVersion, a = a(o._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [o, a] : n.mutableSourceEagerHydrationData.push(
      o,
      a
    );
    return new Os(n);
  }, Pt.render = function(e, n, o) {
    if (!Fs(n)) throw Error(i(200));
    return js(null, e, n, !1, o);
  }, Pt.unmountComponentAtNode = function(e) {
    if (!Fs(e)) throw Error(i(40));
    return e._reactRootContainer ? (vr(function() {
      js(null, null, e, !1, function() {
        e._reactRootContainer = null, e[vn] = null;
      });
    }), !0) : !1;
  }, Pt.unstable_batchedUpdates = ua, Pt.unstable_renderSubtreeIntoContainer = function(e, n, o, s) {
    if (!Fs(o)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return js(e, n, o, !1, s);
  }, Pt.version = "18.3.1-next-f1338f8080-20240426", Pt;
}
var Vd;
function ih() {
  if (Vd) return wa.exports;
  Vd = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return t(), wa.exports = N0(), wa.exports;
}
var Ud;
function C0() {
  if (Ud) return bs;
  Ud = 1;
  var t = ih();
  return bs.createRoot = t.createRoot, bs.hydrateRoot = t.hydrateRoot, bs;
}
var M0 = C0(), Wd = ih(), Ea = { exports: {} }, ri = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yd;
function P0() {
  if (Yd) return ri;
  Yd = 1;
  var t = Si(), r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, u = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(p, h, v) {
    var g, y = {}, m = null, x = null;
    v !== void 0 && (m = "" + v), h.key !== void 0 && (m = "" + h.key), h.ref !== void 0 && (x = h.ref);
    for (g in h) l.call(h, g) && !c.hasOwnProperty(g) && (y[g] = h[g]);
    if (p && p.defaultProps) for (g in h = p.defaultProps, h) y[g] === void 0 && (y[g] = h[g]);
    return { $$typeof: r, type: p, key: m, ref: x, props: y, _owner: u.current };
  }
  return ri.Fragment = i, ri.jsx = f, ri.jsxs = f, ri;
}
var Xd;
function T0() {
  return Xd || (Xd = 1, Ea.exports = P0()), Ea.exports;
}
var q = T0();
function rt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let r = "";
  if (Array.isArray(t))
    for (let i = 0, l; i < t.length; i++)
      (l = rt(t[i])) !== "" && (r += (r && " ") + l);
  else
    for (let i in t)
      t[i] && (r += (r && " ") + i);
  return r;
}
var L0 = { value: () => {
} };
function ml() {
  for (var t = 0, r = arguments.length, i = {}, l; t < r; ++t) {
    if (!(l = arguments[t] + "") || l in i || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    i[l] = [];
  }
  return new Zs(i);
}
function Zs(t) {
  this._ = t;
}
function I0(t, r) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var l = "", u = i.indexOf(".");
    if (u >= 0 && (l = i.slice(u + 1), i = i.slice(0, u)), i && !r.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: l };
  });
}
Zs.prototype = ml.prototype = {
  constructor: Zs,
  on: function(t, r) {
    var i = this._, l = I0(t + "", i), u, c = -1, f = l.length;
    if (arguments.length < 2) {
      for (; ++c < f; ) if ((u = (t = l[c]).type) && (u = z0(i[u], t.name))) return u;
      return;
    }
    if (r != null && typeof r != "function") throw new Error("invalid callback: " + r);
    for (; ++c < f; )
      if (u = (t = l[c]).type) i[u] = Kd(i[u], t.name, r);
      else if (r == null) for (u in i) i[u] = Kd(i[u], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, r = this._;
    for (var i in r) t[i] = r[i].slice();
    return new Zs(t);
  },
  call: function(t, r) {
    if ((u = arguments.length - 2) > 0) for (var i = new Array(u), l = 0, u, c; l < u; ++l) i[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (c = this._[t], l = 0, u = c.length; l < u; ++l) c[l].value.apply(r, i);
  },
  apply: function(t, r, i) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var l = this._[t], u = 0, c = l.length; u < c; ++u) l[u].value.apply(r, i);
  }
};
function z0(t, r) {
  for (var i = 0, l = t.length, u; i < l; ++i)
    if ((u = t[i]).name === r)
      return u.value;
}
function Kd(t, r, i) {
  for (var l = 0, u = t.length; l < u; ++l)
    if (t[l].name === r) {
      t[l] = L0, t = t.slice(0, l).concat(t.slice(l + 1));
      break;
    }
  return i != null && t.push({ name: r, value: i }), t;
}
var Da = "http://www.w3.org/1999/xhtml";
const Qd = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Da,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gl(t) {
  var r = t += "", i = r.indexOf(":");
  return i >= 0 && (r = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), Qd.hasOwnProperty(r) ? { space: Qd[r], local: t } : t;
}
function R0(t) {
  return function() {
    var r = this.ownerDocument, i = this.namespaceURI;
    return i === Da && r.documentElement.namespaceURI === Da ? r.createElement(t) : r.createElementNS(i, t);
  };
}
function A0(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function sh(t) {
  var r = gl(t);
  return (r.local ? A0 : R0)(r);
}
function $0() {
}
function qa(t) {
  return t == null ? $0 : function() {
    return this.querySelector(t);
  };
}
function D0(t) {
  typeof t != "function" && (t = qa(t));
  for (var r = this._groups, i = r.length, l = new Array(i), u = 0; u < i; ++u)
    for (var c = r[u], f = c.length, p = l[u] = new Array(f), h, v, g = 0; g < f; ++g)
      (h = c[g]) && (v = t.call(h, h.__data__, g, c)) && ("__data__" in h && (v.__data__ = h.__data__), p[g] = v);
  return new Ft(l, this._parents);
}
function O0(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function F0() {
  return [];
}
function lh(t) {
  return t == null ? F0 : function() {
    return this.querySelectorAll(t);
  };
}
function j0(t) {
  return function() {
    return O0(t.apply(this, arguments));
  };
}
function H0(t) {
  typeof t == "function" ? t = j0(t) : t = lh(t);
  for (var r = this._groups, i = r.length, l = [], u = [], c = 0; c < i; ++c)
    for (var f = r[c], p = f.length, h, v = 0; v < p; ++v)
      (h = f[v]) && (l.push(t.call(h, h.__data__, v, f)), u.push(h));
  return new Ft(l, u);
}
function uh(t) {
  return function() {
    return this.matches(t);
  };
}
function ah(t) {
  return function(r) {
    return r.matches(t);
  };
}
var b0 = Array.prototype.find;
function B0(t) {
  return function() {
    return b0.call(this.children, t);
  };
}
function V0() {
  return this.firstElementChild;
}
function U0(t) {
  return this.select(t == null ? V0 : B0(typeof t == "function" ? t : ah(t)));
}
var W0 = Array.prototype.filter;
function Y0() {
  return Array.from(this.children);
}
function X0(t) {
  return function() {
    return W0.call(this.children, t);
  };
}
function K0(t) {
  return this.selectAll(t == null ? Y0 : X0(typeof t == "function" ? t : ah(t)));
}
function Q0(t) {
  typeof t != "function" && (t = uh(t));
  for (var r = this._groups, i = r.length, l = new Array(i), u = 0; u < i; ++u)
    for (var c = r[u], f = c.length, p = l[u] = [], h, v = 0; v < f; ++v)
      (h = c[v]) && t.call(h, h.__data__, v, c) && p.push(h);
  return new Ft(l, this._parents);
}
function ch(t) {
  return new Array(t.length);
}
function G0() {
  return new Ft(this._enter || this._groups.map(ch), this._parents);
}
function ol(t, r) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = r;
}
ol.prototype = {
  constructor: ol,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, r) {
    return this._parent.insertBefore(t, r);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function q0(t) {
  return function() {
    return t;
  };
}
function Z0(t, r, i, l, u, c) {
  for (var f = 0, p, h = r.length, v = c.length; f < v; ++f)
    (p = r[f]) ? (p.__data__ = c[f], l[f] = p) : i[f] = new ol(t, c[f]);
  for (; f < h; ++f)
    (p = r[f]) && (u[f] = p);
}
function J0(t, r, i, l, u, c, f) {
  var p, h, v = /* @__PURE__ */ new Map(), g = r.length, y = c.length, m = new Array(g), x;
  for (p = 0; p < g; ++p)
    (h = r[p]) && (m[p] = x = f.call(h, h.__data__, p, r) + "", v.has(x) ? u[p] = h : v.set(x, h));
  for (p = 0; p < y; ++p)
    x = f.call(t, c[p], p, c) + "", (h = v.get(x)) ? (l[p] = h, h.__data__ = c[p], v.delete(x)) : i[p] = new ol(t, c[p]);
  for (p = 0; p < g; ++p)
    (h = r[p]) && v.get(m[p]) === h && (u[p] = h);
}
function ey(t) {
  return t.__data__;
}
function ty(t, r) {
  if (!arguments.length) return Array.from(this, ey);
  var i = r ? J0 : Z0, l = this._parents, u = this._groups;
  typeof t != "function" && (t = q0(t));
  for (var c = u.length, f = new Array(c), p = new Array(c), h = new Array(c), v = 0; v < c; ++v) {
    var g = l[v], y = u[v], m = y.length, x = ny(t.call(g, g && g.__data__, v, l)), k = x.length, E = p[v] = new Array(k), N = f[v] = new Array(k), M = h[v] = new Array(m);
    i(g, y, E, N, M, x, r);
    for (var R = 0, S = 0, P, A; R < k; ++R)
      if (P = E[R]) {
        for (R >= S && (S = R + 1); !(A = N[S]) && ++S < k; ) ;
        P._next = A || null;
      }
  }
  return f = new Ft(f, l), f._enter = p, f._exit = h, f;
}
function ny(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ry() {
  return new Ft(this._exit || this._groups.map(ch), this._parents);
}
function oy(t, r, i) {
  var l = this.enter(), u = this, c = this.exit();
  return typeof t == "function" ? (l = t(l), l && (l = l.selection())) : l = l.append(t + ""), r != null && (u = r(u), u && (u = u.selection())), i == null ? c.remove() : i(c), l && u ? l.merge(u).order() : u;
}
function iy(t) {
  for (var r = t.selection ? t.selection() : t, i = this._groups, l = r._groups, u = i.length, c = l.length, f = Math.min(u, c), p = new Array(u), h = 0; h < f; ++h)
    for (var v = i[h], g = l[h], y = v.length, m = p[h] = new Array(y), x, k = 0; k < y; ++k)
      (x = v[k] || g[k]) && (m[k] = x);
  for (; h < u; ++h)
    p[h] = i[h];
  return new Ft(p, this._parents);
}
function sy() {
  for (var t = this._groups, r = -1, i = t.length; ++r < i; )
    for (var l = t[r], u = l.length - 1, c = l[u], f; --u >= 0; )
      (f = l[u]) && (c && f.compareDocumentPosition(c) ^ 4 && c.parentNode.insertBefore(f, c), c = f);
  return this;
}
function ly(t) {
  t || (t = uy);
  function r(y, m) {
    return y && m ? t(y.__data__, m.__data__) : !y - !m;
  }
  for (var i = this._groups, l = i.length, u = new Array(l), c = 0; c < l; ++c) {
    for (var f = i[c], p = f.length, h = u[c] = new Array(p), v, g = 0; g < p; ++g)
      (v = f[g]) && (h[g] = v);
    h.sort(r);
  }
  return new Ft(u, this._parents).order();
}
function uy(t, r) {
  return t < r ? -1 : t > r ? 1 : t >= r ? 0 : NaN;
}
function ay() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function cy() {
  return Array.from(this);
}
function fy() {
  for (var t = this._groups, r = 0, i = t.length; r < i; ++r)
    for (var l = t[r], u = 0, c = l.length; u < c; ++u) {
      var f = l[u];
      if (f) return f;
    }
  return null;
}
function dy() {
  let t = 0;
  for (const r of this) ++t;
  return t;
}
function py() {
  return !this.node();
}
function hy(t) {
  for (var r = this._groups, i = 0, l = r.length; i < l; ++i)
    for (var u = r[i], c = 0, f = u.length, p; c < f; ++c)
      (p = u[c]) && t.call(p, p.__data__, c, u);
  return this;
}
function my(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function gy(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function yy(t, r) {
  return function() {
    this.setAttribute(t, r);
  };
}
function vy(t, r) {
  return function() {
    this.setAttributeNS(t.space, t.local, r);
  };
}
function wy(t, r) {
  return function() {
    var i = r.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function xy(t, r) {
  return function() {
    var i = r.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function Sy(t, r) {
  var i = gl(t);
  if (arguments.length < 2) {
    var l = this.node();
    return i.local ? l.getAttributeNS(i.space, i.local) : l.getAttribute(i);
  }
  return this.each((r == null ? i.local ? gy : my : typeof r == "function" ? i.local ? xy : wy : i.local ? vy : yy)(i, r));
}
function fh(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ey(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _y(t, r, i) {
  return function() {
    this.style.setProperty(t, r, i);
  };
}
function ky(t, r, i) {
  return function() {
    var l = r.apply(this, arguments);
    l == null ? this.style.removeProperty(t) : this.style.setProperty(t, l, i);
  };
}
function Ny(t, r, i) {
  return arguments.length > 1 ? this.each((r == null ? Ey : typeof r == "function" ? ky : _y)(t, r, i ?? "")) : ao(this.node(), t);
}
function ao(t, r) {
  return t.style.getPropertyValue(r) || fh(t).getComputedStyle(t, null).getPropertyValue(r);
}
function Cy(t) {
  return function() {
    delete this[t];
  };
}
function My(t, r) {
  return function() {
    this[t] = r;
  };
}
function Py(t, r) {
  return function() {
    var i = r.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function Ty(t, r) {
  return arguments.length > 1 ? this.each((r == null ? Cy : typeof r == "function" ? Py : My)(t, r)) : this.node()[t];
}
function dh(t) {
  return t.trim().split(/^|\s+/);
}
function Za(t) {
  return t.classList || new ph(t);
}
function ph(t) {
  this._node = t, this._names = dh(t.getAttribute("class") || "");
}
ph.prototype = {
  add: function(t) {
    var r = this._names.indexOf(t);
    r < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var r = this._names.indexOf(t);
    r >= 0 && (this._names.splice(r, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function hh(t, r) {
  for (var i = Za(t), l = -1, u = r.length; ++l < u; ) i.add(r[l]);
}
function mh(t, r) {
  for (var i = Za(t), l = -1, u = r.length; ++l < u; ) i.remove(r[l]);
}
function Ly(t) {
  return function() {
    hh(this, t);
  };
}
function Iy(t) {
  return function() {
    mh(this, t);
  };
}
function zy(t, r) {
  return function() {
    (r.apply(this, arguments) ? hh : mh)(this, t);
  };
}
function Ry(t, r) {
  var i = dh(t + "");
  if (arguments.length < 2) {
    for (var l = Za(this.node()), u = -1, c = i.length; ++u < c; ) if (!l.contains(i[u])) return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? zy : r ? Ly : Iy)(i, r));
}
function Ay() {
  this.textContent = "";
}
function $y(t) {
  return function() {
    this.textContent = t;
  };
}
function Dy(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.textContent = r ?? "";
  };
}
function Oy(t) {
  return arguments.length ? this.each(t == null ? Ay : (typeof t == "function" ? Dy : $y)(t)) : this.node().textContent;
}
function Fy() {
  this.innerHTML = "";
}
function jy(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Hy(t) {
  return function() {
    var r = t.apply(this, arguments);
    this.innerHTML = r ?? "";
  };
}
function by(t) {
  return arguments.length ? this.each(t == null ? Fy : (typeof t == "function" ? Hy : jy)(t)) : this.node().innerHTML;
}
function By() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vy() {
  return this.each(By);
}
function Uy() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wy() {
  return this.each(Uy);
}
function Yy(t) {
  var r = typeof t == "function" ? t : sh(t);
  return this.select(function() {
    return this.appendChild(r.apply(this, arguments));
  });
}
function Xy() {
  return null;
}
function Ky(t, r) {
  var i = typeof t == "function" ? t : sh(t), l = r == null ? Xy : typeof r == "function" ? r : qa(r);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function Qy() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gy() {
  return this.each(Qy);
}
function qy() {
  var t = this.cloneNode(!1), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function Zy() {
  var t = this.cloneNode(!0), r = this.parentNode;
  return r ? r.insertBefore(t, this.nextSibling) : t;
}
function Jy(t) {
  return this.select(t ? Zy : qy);
}
function ev(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function tv(t) {
  return function(r) {
    t.call(this, r, this.__data__);
  };
}
function nv(t) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var i = "", l = r.indexOf(".");
    return l >= 0 && (i = r.slice(l + 1), r = r.slice(0, l)), { type: r, name: i };
  });
}
function rv(t) {
  return function() {
    var r = this.__on;
    if (r) {
      for (var i = 0, l = -1, u = r.length, c; i < u; ++i)
        c = r[i], (!t.type || c.type === t.type) && c.name === t.name ? this.removeEventListener(c.type, c.listener, c.options) : r[++l] = c;
      ++l ? r.length = l : delete this.__on;
    }
  };
}
function ov(t, r, i) {
  return function() {
    var l = this.__on, u, c = tv(r);
    if (l) {
      for (var f = 0, p = l.length; f < p; ++f)
        if ((u = l[f]).type === t.type && u.name === t.name) {
          this.removeEventListener(u.type, u.listener, u.options), this.addEventListener(u.type, u.listener = c, u.options = i), u.value = r;
          return;
        }
    }
    this.addEventListener(t.type, c, i), u = { type: t.type, name: t.name, value: r, listener: c, options: i }, l ? l.push(u) : this.__on = [u];
  };
}
function iv(t, r, i) {
  var l = nv(t + ""), u, c = l.length, f;
  if (arguments.length < 2) {
    var p = this.node().__on;
    if (p) {
      for (var h = 0, v = p.length, g; h < v; ++h)
        for (u = 0, g = p[h]; u < c; ++u)
          if ((f = l[u]).type === g.type && f.name === g.name)
            return g.value;
    }
    return;
  }
  for (p = r ? ov : rv, u = 0; u < c; ++u) this.each(p(l[u], r, i));
  return this;
}
function gh(t, r, i) {
  var l = fh(t), u = l.CustomEvent;
  typeof u == "function" ? u = new u(r, i) : (u = l.document.createEvent("Event"), i ? (u.initEvent(r, i.bubbles, i.cancelable), u.detail = i.detail) : u.initEvent(r, !1, !1)), t.dispatchEvent(u);
}
function sv(t, r) {
  return function() {
    return gh(this, t, r);
  };
}
function lv(t, r) {
  return function() {
    return gh(this, t, r.apply(this, arguments));
  };
}
function uv(t, r) {
  return this.each((typeof r == "function" ? lv : sv)(t, r));
}
function* av() {
  for (var t = this._groups, r = 0, i = t.length; r < i; ++r)
    for (var l = t[r], u = 0, c = l.length, f; u < c; ++u)
      (f = l[u]) && (yield f);
}
var yh = [null];
function Ft(t, r) {
  this._groups = t, this._parents = r;
}
function Ei() {
  return new Ft([[document.documentElement]], yh);
}
function cv() {
  return this;
}
Ft.prototype = Ei.prototype = {
  constructor: Ft,
  select: D0,
  selectAll: H0,
  selectChild: U0,
  selectChildren: K0,
  filter: Q0,
  data: ty,
  enter: G0,
  exit: ry,
  join: oy,
  merge: iy,
  selection: cv,
  order: sy,
  sort: ly,
  call: ay,
  nodes: cy,
  node: fy,
  size: dy,
  empty: py,
  each: hy,
  attr: Sy,
  style: Ny,
  property: Ty,
  classed: Ry,
  text: Oy,
  html: by,
  raise: Vy,
  lower: Wy,
  append: Yy,
  insert: Ky,
  remove: Gy,
  clone: Jy,
  datum: ev,
  on: iv,
  dispatch: uv,
  [Symbol.iterator]: av
};
function Ot(t) {
  return typeof t == "string" ? new Ft([[document.querySelector(t)]], [document.documentElement]) : new Ft([[t]], yh);
}
function fv(t) {
  let r;
  for (; r = t.sourceEvent; ) t = r;
  return t;
}
function en(t, r) {
  if (t = fv(t), r === void 0 && (r = t.currentTarget), r) {
    var i = r.ownerSVGElement || r;
    if (i.createSVGPoint) {
      var l = i.createSVGPoint();
      return l.x = t.clientX, l.y = t.clientY, l = l.matrixTransform(r.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (r.getBoundingClientRect) {
      var u = r.getBoundingClientRect();
      return [t.clientX - u.left - r.clientLeft, t.clientY - u.top - r.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const dv = { passive: !1 }, fi = { capture: !0, passive: !1 };
function _a(t) {
  t.stopImmediatePropagation();
}
function lo(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function vh(t) {
  var r = t.document.documentElement, i = Ot(t).on("dragstart.drag", lo, fi);
  "onselectstart" in r ? i.on("selectstart.drag", lo, fi) : (r.__noselect = r.style.MozUserSelect, r.style.MozUserSelect = "none");
}
function wh(t, r) {
  var i = t.document.documentElement, l = Ot(t).on("dragstart.drag", null);
  r && (l.on("click.drag", lo, fi), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in i ? l.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Bs = (t) => () => t;
function Oa(t, {
  sourceEvent: r,
  subject: i,
  target: l,
  identifier: u,
  active: c,
  x: f,
  y: p,
  dx: h,
  dy: v,
  dispatch: g
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    subject: { value: i, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    identifier: { value: u, enumerable: !0, configurable: !0 },
    active: { value: c, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: p, enumerable: !0, configurable: !0 },
    dx: { value: h, enumerable: !0, configurable: !0 },
    dy: { value: v, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
Oa.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function pv(t) {
  return !t.ctrlKey && !t.button;
}
function hv() {
  return this.parentNode;
}
function mv(t, r) {
  return r ?? { x: t.x, y: t.y };
}
function gv() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function xh() {
  var t = pv, r = hv, i = mv, l = gv, u = {}, c = ml("start", "drag", "end"), f = 0, p, h, v, g, y = 0;
  function m(P) {
    P.on("mousedown.drag", x).filter(l).on("touchstart.drag", N).on("touchmove.drag", M, dv).on("touchend.drag touchcancel.drag", R).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(P, A) {
    if (!(g || !t.call(this, P, A))) {
      var H = S(this, r.call(this, P, A), P, A, "mouse");
      H && (Ot(P.view).on("mousemove.drag", k, fi).on("mouseup.drag", E, fi), vh(P.view), _a(P), v = !1, p = P.clientX, h = P.clientY, H("start", P));
    }
  }
  function k(P) {
    if (lo(P), !v) {
      var A = P.clientX - p, H = P.clientY - h;
      v = A * A + H * H > y;
    }
    u.mouse("drag", P);
  }
  function E(P) {
    Ot(P.view).on("mousemove.drag mouseup.drag", null), wh(P.view, v), lo(P), u.mouse("end", P);
  }
  function N(P, A) {
    if (t.call(this, P, A)) {
      var H = P.changedTouches, B = r.call(this, P, A), V = H.length, ee, oe;
      for (ee = 0; ee < V; ++ee)
        (oe = S(this, B, P, A, H[ee].identifier, H[ee])) && (_a(P), oe("start", P, H[ee]));
    }
  }
  function M(P) {
    var A = P.changedTouches, H = A.length, B, V;
    for (B = 0; B < H; ++B)
      (V = u[A[B].identifier]) && (lo(P), V("drag", P, A[B]));
  }
  function R(P) {
    var A = P.changedTouches, H = A.length, B, V;
    for (g && clearTimeout(g), g = setTimeout(function() {
      g = null;
    }, 500), B = 0; B < H; ++B)
      (V = u[A[B].identifier]) && (_a(P), V("end", P, A[B]));
  }
  function S(P, A, H, B, V, ee) {
    var oe = c.copy(), Z = en(ee || H, A), te, J, C;
    if ((C = i.call(P, new Oa("beforestart", {
      sourceEvent: H,
      target: m,
      identifier: V,
      active: f,
      x: Z[0],
      y: Z[1],
      dx: 0,
      dy: 0,
      dispatch: oe
    }), B)) != null)
      return te = C.x - Z[0] || 0, J = C.y - Z[1] || 0, function b(D, j, z) {
        var L = Z, O;
        switch (D) {
          case "start":
            u[V] = b, O = f++;
            break;
          case "end":
            delete u[V], --f;
          // falls through
          case "drag":
            Z = en(z || j, A), O = f;
            break;
        }
        oe.call(
          D,
          P,
          new Oa(D, {
            sourceEvent: j,
            subject: C,
            target: m,
            identifier: V,
            active: O,
            x: Z[0] + te,
            y: Z[1] + J,
            dx: Z[0] - L[0],
            dy: Z[1] - L[1],
            dispatch: oe
          }),
          B
        );
      };
  }
  return m.filter = function(P) {
    return arguments.length ? (t = typeof P == "function" ? P : Bs(!!P), m) : t;
  }, m.container = function(P) {
    return arguments.length ? (r = typeof P == "function" ? P : Bs(P), m) : r;
  }, m.subject = function(P) {
    return arguments.length ? (i = typeof P == "function" ? P : Bs(P), m) : i;
  }, m.touchable = function(P) {
    return arguments.length ? (l = typeof P == "function" ? P : Bs(!!P), m) : l;
  }, m.on = function() {
    var P = c.on.apply(c, arguments);
    return P === c ? m : P;
  }, m.clickDistance = function(P) {
    return arguments.length ? (y = (P = +P) * P, m) : Math.sqrt(y);
  }, m;
}
function Ja(t, r, i) {
  t.prototype = r.prototype = i, i.constructor = t;
}
function Sh(t, r) {
  var i = Object.create(t.prototype);
  for (var l in r) i[l] = r[l];
  return i;
}
function _i() {
}
var di = 0.7, il = 1 / di, uo = "\\s*([+-]?\\d+)\\s*", pi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", yv = /^#([0-9a-f]{3,8})$/, vv = new RegExp(`^rgb\\(${uo},${uo},${uo}\\)$`), wv = new RegExp(`^rgb\\(${mn},${mn},${mn}\\)$`), xv = new RegExp(`^rgba\\(${uo},${uo},${uo},${pi}\\)$`), Sv = new RegExp(`^rgba\\(${mn},${mn},${mn},${pi}\\)$`), Ev = new RegExp(`^hsl\\(${pi},${mn},${mn}\\)$`), _v = new RegExp(`^hsla\\(${pi},${mn},${mn},${pi}\\)$`), Gd = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ja(_i, Mr, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: qd,
  // Deprecated! Use color.formatHex.
  formatHex: qd,
  formatHex8: kv,
  formatHsl: Nv,
  formatRgb: Zd,
  toString: Zd
});
function qd() {
  return this.rgb().formatHex();
}
function kv() {
  return this.rgb().formatHex8();
}
function Nv() {
  return Eh(this).formatHsl();
}
function Zd() {
  return this.rgb().formatRgb();
}
function Mr(t) {
  var r, i;
  return t = (t + "").trim().toLowerCase(), (r = yv.exec(t)) ? (i = r[1].length, r = parseInt(r[1], 16), i === 6 ? Jd(r) : i === 3 ? new Tt(r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, (r & 15) << 4 | r & 15, 1) : i === 8 ? Vs(r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, (r & 255) / 255) : i === 4 ? Vs(r >> 12 & 15 | r >> 8 & 240, r >> 8 & 15 | r >> 4 & 240, r >> 4 & 15 | r & 240, ((r & 15) << 4 | r & 15) / 255) : null) : (r = vv.exec(t)) ? new Tt(r[1], r[2], r[3], 1) : (r = wv.exec(t)) ? new Tt(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, 1) : (r = xv.exec(t)) ? Vs(r[1], r[2], r[3], r[4]) : (r = Sv.exec(t)) ? Vs(r[1] * 255 / 100, r[2] * 255 / 100, r[3] * 255 / 100, r[4]) : (r = Ev.exec(t)) ? np(r[1], r[2] / 100, r[3] / 100, 1) : (r = _v.exec(t)) ? np(r[1], r[2] / 100, r[3] / 100, r[4]) : Gd.hasOwnProperty(t) ? Jd(Gd[t]) : t === "transparent" ? new Tt(NaN, NaN, NaN, 0) : null;
}
function Jd(t) {
  return new Tt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Vs(t, r, i, l) {
  return l <= 0 && (t = r = i = NaN), new Tt(t, r, i, l);
}
function Cv(t) {
  return t instanceof _i || (t = Mr(t)), t ? (t = t.rgb(), new Tt(t.r, t.g, t.b, t.opacity)) : new Tt();
}
function Fa(t, r, i, l) {
  return arguments.length === 1 ? Cv(t) : new Tt(t, r, i, l ?? 1);
}
function Tt(t, r, i, l) {
  this.r = +t, this.g = +r, this.b = +i, this.opacity = +l;
}
Ja(Tt, Fa, Sh(_i, {
  brighter(t) {
    return t = t == null ? il : Math.pow(il, t), new Tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? di : Math.pow(di, t), new Tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Tt(Nr(this.r), Nr(this.g), Nr(this.b), sl(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ep,
  // Deprecated! Use color.formatHex.
  formatHex: ep,
  formatHex8: Mv,
  formatRgb: tp,
  toString: tp
}));
function ep() {
  return `#${kr(this.r)}${kr(this.g)}${kr(this.b)}`;
}
function Mv() {
  return `#${kr(this.r)}${kr(this.g)}${kr(this.b)}${kr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function tp() {
  const t = sl(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Nr(this.r)}, ${Nr(this.g)}, ${Nr(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function sl(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Nr(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function kr(t) {
  return t = Nr(t), (t < 16 ? "0" : "") + t.toString(16);
}
function np(t, r, i, l) {
  return l <= 0 ? t = r = i = NaN : i <= 0 || i >= 1 ? t = r = NaN : r <= 0 && (t = NaN), new tn(t, r, i, l);
}
function Eh(t) {
  if (t instanceof tn) return new tn(t.h, t.s, t.l, t.opacity);
  if (t instanceof _i || (t = Mr(t)), !t) return new tn();
  if (t instanceof tn) return t;
  t = t.rgb();
  var r = t.r / 255, i = t.g / 255, l = t.b / 255, u = Math.min(r, i, l), c = Math.max(r, i, l), f = NaN, p = c - u, h = (c + u) / 2;
  return p ? (r === c ? f = (i - l) / p + (i < l) * 6 : i === c ? f = (l - r) / p + 2 : f = (r - i) / p + 4, p /= h < 0.5 ? c + u : 2 - c - u, f *= 60) : p = h > 0 && h < 1 ? 0 : f, new tn(f, p, h, t.opacity);
}
function Pv(t, r, i, l) {
  return arguments.length === 1 ? Eh(t) : new tn(t, r, i, l ?? 1);
}
function tn(t, r, i, l) {
  this.h = +t, this.s = +r, this.l = +i, this.opacity = +l;
}
Ja(tn, Pv, Sh(_i, {
  brighter(t) {
    return t = t == null ? il : Math.pow(il, t), new tn(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? di : Math.pow(di, t), new tn(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, r = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, l = i + (i < 0.5 ? i : 1 - i) * r, u = 2 * i - l;
    return new Tt(
      ka(t >= 240 ? t - 240 : t + 120, u, l),
      ka(t, u, l),
      ka(t < 120 ? t + 240 : t - 120, u, l),
      this.opacity
    );
  },
  clamp() {
    return new tn(rp(this.h), Us(this.s), Us(this.l), sl(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = sl(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${rp(this.h)}, ${Us(this.s) * 100}%, ${Us(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function rp(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Us(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ka(t, r, i) {
  return (t < 60 ? r + (i - r) * t / 60 : t < 180 ? i : t < 240 ? r + (i - r) * (240 - t) / 60 : r) * 255;
}
const ec = (t) => () => t;
function Tv(t, r) {
  return function(i) {
    return t + i * r;
  };
}
function Lv(t, r, i) {
  return t = Math.pow(t, i), r = Math.pow(r, i) - t, i = 1 / i, function(l) {
    return Math.pow(t + l * r, i);
  };
}
function Iv(t) {
  return (t = +t) == 1 ? _h : function(r, i) {
    return i - r ? Lv(r, i, t) : ec(isNaN(r) ? i : r);
  };
}
function _h(t, r) {
  var i = r - t;
  return i ? Tv(t, i) : ec(isNaN(t) ? r : t);
}
const ll = (function t(r) {
  var i = Iv(r);
  function l(u, c) {
    var f = i((u = Fa(u)).r, (c = Fa(c)).r), p = i(u.g, c.g), h = i(u.b, c.b), v = _h(u.opacity, c.opacity);
    return function(g) {
      return u.r = f(g), u.g = p(g), u.b = h(g), u.opacity = v(g), u + "";
    };
  }
  return l.gamma = t, l;
})(1);
function zv(t, r) {
  r || (r = []);
  var i = t ? Math.min(r.length, t.length) : 0, l = r.slice(), u;
  return function(c) {
    for (u = 0; u < i; ++u) l[u] = t[u] * (1 - c) + r[u] * c;
    return l;
  };
}
function Rv(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Av(t, r) {
  var i = r ? r.length : 0, l = t ? Math.min(i, t.length) : 0, u = new Array(l), c = new Array(i), f;
  for (f = 0; f < l; ++f) u[f] = ui(t[f], r[f]);
  for (; f < i; ++f) c[f] = r[f];
  return function(p) {
    for (f = 0; f < l; ++f) c[f] = u[f](p);
    return c;
  };
}
function $v(t, r) {
  var i = /* @__PURE__ */ new Date();
  return t = +t, r = +r, function(l) {
    return i.setTime(t * (1 - l) + r * l), i;
  };
}
function pn(t, r) {
  return t = +t, r = +r, function(i) {
    return t * (1 - i) + r * i;
  };
}
function Dv(t, r) {
  var i = {}, l = {}, u;
  (t === null || typeof t != "object") && (t = {}), (r === null || typeof r != "object") && (r = {});
  for (u in r)
    u in t ? i[u] = ui(t[u], r[u]) : l[u] = r[u];
  return function(c) {
    for (u in i) l[u] = i[u](c);
    return l;
  };
}
var ja = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Na = new RegExp(ja.source, "g");
function Ov(t) {
  return function() {
    return t;
  };
}
function Fv(t) {
  return function(r) {
    return t(r) + "";
  };
}
function kh(t, r) {
  var i = ja.lastIndex = Na.lastIndex = 0, l, u, c, f = -1, p = [], h = [];
  for (t = t + "", r = r + ""; (l = ja.exec(t)) && (u = Na.exec(r)); )
    (c = u.index) > i && (c = r.slice(i, c), p[f] ? p[f] += c : p[++f] = c), (l = l[0]) === (u = u[0]) ? p[f] ? p[f] += u : p[++f] = u : (p[++f] = null, h.push({ i: f, x: pn(l, u) })), i = Na.lastIndex;
  return i < r.length && (c = r.slice(i), p[f] ? p[f] += c : p[++f] = c), p.length < 2 ? h[0] ? Fv(h[0].x) : Ov(r) : (r = h.length, function(v) {
    for (var g = 0, y; g < r; ++g) p[(y = h[g]).i] = y.x(v);
    return p.join("");
  });
}
function ui(t, r) {
  var i = typeof r, l;
  return r == null || i === "boolean" ? ec(r) : (i === "number" ? pn : i === "string" ? (l = Mr(r)) ? (r = l, ll) : kh : r instanceof Mr ? ll : r instanceof Date ? $v : Rv(r) ? zv : Array.isArray(r) ? Av : typeof r.valueOf != "function" && typeof r.toString != "function" || isNaN(r) ? Dv : pn)(t, r);
}
var op = 180 / Math.PI, Ha = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Nh(t, r, i, l, u, c) {
  var f, p, h;
  return (f = Math.sqrt(t * t + r * r)) && (t /= f, r /= f), (h = t * i + r * l) && (i -= t * h, l -= r * h), (p = Math.sqrt(i * i + l * l)) && (i /= p, l /= p, h /= p), t * l < r * i && (t = -t, r = -r, h = -h, f = -f), {
    translateX: u,
    translateY: c,
    rotate: Math.atan2(r, t) * op,
    skewX: Math.atan(h) * op,
    scaleX: f,
    scaleY: p
  };
}
var Ws;
function jv(t) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return r.isIdentity ? Ha : Nh(r.a, r.b, r.c, r.d, r.e, r.f);
}
function Hv(t) {
  return t == null || (Ws || (Ws = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ws.setAttribute("transform", t), !(t = Ws.transform.baseVal.consolidate())) ? Ha : (t = t.matrix, Nh(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ch(t, r, i, l) {
  function u(v) {
    return v.length ? v.pop() + " " : "";
  }
  function c(v, g, y, m, x, k) {
    if (v !== y || g !== m) {
      var E = x.push("translate(", null, r, null, i);
      k.push({ i: E - 4, x: pn(v, y) }, { i: E - 2, x: pn(g, m) });
    } else (y || m) && x.push("translate(" + y + r + m + i);
  }
  function f(v, g, y, m) {
    v !== g ? (v - g > 180 ? g += 360 : g - v > 180 && (v += 360), m.push({ i: y.push(u(y) + "rotate(", null, l) - 2, x: pn(v, g) })) : g && y.push(u(y) + "rotate(" + g + l);
  }
  function p(v, g, y, m) {
    v !== g ? m.push({ i: y.push(u(y) + "skewX(", null, l) - 2, x: pn(v, g) }) : g && y.push(u(y) + "skewX(" + g + l);
  }
  function h(v, g, y, m, x, k) {
    if (v !== y || g !== m) {
      var E = x.push(u(x) + "scale(", null, ",", null, ")");
      k.push({ i: E - 4, x: pn(v, y) }, { i: E - 2, x: pn(g, m) });
    } else (y !== 1 || m !== 1) && x.push(u(x) + "scale(" + y + "," + m + ")");
  }
  return function(v, g) {
    var y = [], m = [];
    return v = t(v), g = t(g), c(v.translateX, v.translateY, g.translateX, g.translateY, y, m), f(v.rotate, g.rotate, y, m), p(v.skewX, g.skewX, y, m), h(v.scaleX, v.scaleY, g.scaleX, g.scaleY, y, m), v = g = null, function(x) {
      for (var k = -1, E = m.length, N; ++k < E; ) y[(N = m[k]).i] = N.x(x);
      return y.join("");
    };
  };
}
var bv = Ch(jv, "px, ", "px)", "deg)"), Bv = Ch(Hv, ", ", ")", ")"), Vv = 1e-12;
function ip(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Uv(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Wv(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Js = (function t(r, i, l) {
  function u(c, f) {
    var p = c[0], h = c[1], v = c[2], g = f[0], y = f[1], m = f[2], x = g - p, k = y - h, E = x * x + k * k, N, M;
    if (E < Vv)
      M = Math.log(m / v) / r, N = function(B) {
        return [
          p + B * x,
          h + B * k,
          v * Math.exp(r * B * M)
        ];
      };
    else {
      var R = Math.sqrt(E), S = (m * m - v * v + l * E) / (2 * v * i * R), P = (m * m - v * v - l * E) / (2 * m * i * R), A = Math.log(Math.sqrt(S * S + 1) - S), H = Math.log(Math.sqrt(P * P + 1) - P);
      M = (H - A) / r, N = function(B) {
        var V = B * M, ee = ip(A), oe = v / (i * R) * (ee * Wv(r * V + A) - Uv(A));
        return [
          p + oe * x,
          h + oe * k,
          v * ee / ip(r * V + A)
        ];
      };
    }
    return N.duration = M * 1e3 * r / Math.SQRT2, N;
  }
  return u.rho = function(c) {
    var f = Math.max(1e-3, +c), p = f * f, h = p * p;
    return t(f, p, h);
  }, u;
})(Math.SQRT2, 2, 4);
var co = 0, si = 0, oi = 0, Mh = 1e3, ul, li, al = 0, Pr = 0, yl = 0, hi = typeof performance == "object" && performance.now ? performance : Date, Ph = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function tc() {
  return Pr || (Ph(Yv), Pr = hi.now() + yl);
}
function Yv() {
  Pr = 0;
}
function cl() {
  this._call = this._time = this._next = null;
}
cl.prototype = Th.prototype = {
  constructor: cl,
  restart: function(t, r, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? tc() : +i) + (r == null ? 0 : +r), !this._next && li !== this && (li ? li._next = this : ul = this, li = this), this._call = t, this._time = i, ba();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ba());
  }
};
function Th(t, r, i) {
  var l = new cl();
  return l.restart(t, r, i), l;
}
function Xv() {
  tc(), ++co;
  for (var t = ul, r; t; )
    (r = Pr - t._time) >= 0 && t._call.call(void 0, r), t = t._next;
  --co;
}
function sp() {
  Pr = (al = hi.now()) + yl, co = si = 0;
  try {
    Xv();
  } finally {
    co = 0, Qv(), Pr = 0;
  }
}
function Kv() {
  var t = hi.now(), r = t - al;
  r > Mh && (yl -= r, al = t);
}
function Qv() {
  for (var t, r = ul, i, l = 1 / 0; r; )
    r._call ? (l > r._time && (l = r._time), t = r, r = r._next) : (i = r._next, r._next = null, r = t ? t._next = i : ul = i);
  li = t, ba(l);
}
function ba(t) {
  if (!co) {
    si && (si = clearTimeout(si));
    var r = t - Pr;
    r > 24 ? (t < 1 / 0 && (si = setTimeout(sp, t - hi.now() - yl)), oi && (oi = clearInterval(oi))) : (oi || (al = hi.now(), oi = setInterval(Kv, Mh)), co = 1, Ph(sp));
  }
}
function lp(t, r, i) {
  var l = new cl();
  return r = r == null ? 0 : +r, l.restart((u) => {
    l.stop(), t(u + r);
  }, r, i), l;
}
var Gv = ml("start", "end", "cancel", "interrupt"), qv = [], Lh = 0, up = 1, Ba = 2, el = 3, ap = 4, Va = 5, tl = 6;
function vl(t, r, i, l, u, c) {
  var f = t.__transition;
  if (!f) t.__transition = {};
  else if (i in f) return;
  Zv(t, i, {
    name: r,
    index: l,
    // For context during callback.
    group: u,
    // For context during callback.
    on: Gv,
    tween: qv,
    time: c.time,
    delay: c.delay,
    duration: c.duration,
    ease: c.ease,
    timer: null,
    state: Lh
  });
}
function nc(t, r) {
  var i = rn(t, r);
  if (i.state > Lh) throw new Error("too late; already scheduled");
  return i;
}
function yn(t, r) {
  var i = rn(t, r);
  if (i.state > el) throw new Error("too late; already running");
  return i;
}
function rn(t, r) {
  var i = t.__transition;
  if (!i || !(i = i[r])) throw new Error("transition not found");
  return i;
}
function Zv(t, r, i) {
  var l = t.__transition, u;
  l[r] = i, i.timer = Th(c, 0, i.time);
  function c(v) {
    i.state = up, i.timer.restart(f, i.delay, i.time), i.delay <= v && f(v - i.delay);
  }
  function f(v) {
    var g, y, m, x;
    if (i.state !== up) return h();
    for (g in l)
      if (x = l[g], x.name === i.name) {
        if (x.state === el) return lp(f);
        x.state === ap ? (x.state = tl, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete l[g]) : +g < r && (x.state = tl, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete l[g]);
      }
    if (lp(function() {
      i.state === el && (i.state = ap, i.timer.restart(p, i.delay, i.time), p(v));
    }), i.state = Ba, i.on.call("start", t, t.__data__, i.index, i.group), i.state === Ba) {
      for (i.state = el, u = new Array(m = i.tween.length), g = 0, y = -1; g < m; ++g)
        (x = i.tween[g].value.call(t, t.__data__, i.index, i.group)) && (u[++y] = x);
      u.length = y + 1;
    }
  }
  function p(v) {
    for (var g = v < i.duration ? i.ease.call(null, v / i.duration) : (i.timer.restart(h), i.state = Va, 1), y = -1, m = u.length; ++y < m; )
      u[y].call(t, g);
    i.state === Va && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = tl, i.timer.stop(), delete l[r];
    for (var v in l) return;
    delete t.__transition;
  }
}
function nl(t, r) {
  var i = t.__transition, l, u, c = !0, f;
  if (i) {
    r = r == null ? null : r + "";
    for (f in i) {
      if ((l = i[f]).name !== r) {
        c = !1;
        continue;
      }
      u = l.state > Ba && l.state < Va, l.state = tl, l.timer.stop(), l.on.call(u ? "interrupt" : "cancel", t, t.__data__, l.index, l.group), delete i[f];
    }
    c && delete t.__transition;
  }
}
function Jv(t) {
  return this.each(function() {
    nl(this, t);
  });
}
function ew(t, r) {
  var i, l;
  return function() {
    var u = yn(this, t), c = u.tween;
    if (c !== i) {
      l = i = c;
      for (var f = 0, p = l.length; f < p; ++f)
        if (l[f].name === r) {
          l = l.slice(), l.splice(f, 1);
          break;
        }
    }
    u.tween = l;
  };
}
function tw(t, r, i) {
  var l, u;
  if (typeof i != "function") throw new Error();
  return function() {
    var c = yn(this, t), f = c.tween;
    if (f !== l) {
      u = (l = f).slice();
      for (var p = { name: r, value: i }, h = 0, v = u.length; h < v; ++h)
        if (u[h].name === r) {
          u[h] = p;
          break;
        }
      h === v && u.push(p);
    }
    c.tween = u;
  };
}
function nw(t, r) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var l = rn(this.node(), i).tween, u = 0, c = l.length, f; u < c; ++u)
      if ((f = l[u]).name === t)
        return f.value;
    return null;
  }
  return this.each((r == null ? ew : tw)(i, t, r));
}
function rc(t, r, i) {
  var l = t._id;
  return t.each(function() {
    var u = yn(this, l);
    (u.value || (u.value = {}))[r] = i.apply(this, arguments);
  }), function(u) {
    return rn(u, l).value[r];
  };
}
function Ih(t, r) {
  var i;
  return (typeof r == "number" ? pn : r instanceof Mr ? ll : (i = Mr(r)) ? (r = i, ll) : kh)(t, r);
}
function rw(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ow(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function iw(t, r, i) {
  var l, u = i + "", c;
  return function() {
    var f = this.getAttribute(t);
    return f === u ? null : f === l ? c : c = r(l = f, i);
  };
}
function sw(t, r, i) {
  var l, u = i + "", c;
  return function() {
    var f = this.getAttributeNS(t.space, t.local);
    return f === u ? null : f === l ? c : c = r(l = f, i);
  };
}
function lw(t, r, i) {
  var l, u, c;
  return function() {
    var f, p = i(this), h;
    return p == null ? void this.removeAttribute(t) : (f = this.getAttribute(t), h = p + "", f === h ? null : f === l && h === u ? c : (u = h, c = r(l = f, p)));
  };
}
function uw(t, r, i) {
  var l, u, c;
  return function() {
    var f, p = i(this), h;
    return p == null ? void this.removeAttributeNS(t.space, t.local) : (f = this.getAttributeNS(t.space, t.local), h = p + "", f === h ? null : f === l && h === u ? c : (u = h, c = r(l = f, p)));
  };
}
function aw(t, r) {
  var i = gl(t), l = i === "transform" ? Bv : Ih;
  return this.attrTween(t, typeof r == "function" ? (i.local ? uw : lw)(i, l, rc(this, "attr." + t, r)) : r == null ? (i.local ? ow : rw)(i) : (i.local ? sw : iw)(i, l, r));
}
function cw(t, r) {
  return function(i) {
    this.setAttribute(t, r.call(this, i));
  };
}
function fw(t, r) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, r.call(this, i));
  };
}
function dw(t, r) {
  var i, l;
  function u() {
    var c = r.apply(this, arguments);
    return c !== l && (i = (l = c) && fw(t, c)), i;
  }
  return u._value = r, u;
}
function pw(t, r) {
  var i, l;
  function u() {
    var c = r.apply(this, arguments);
    return c !== l && (i = (l = c) && cw(t, c)), i;
  }
  return u._value = r, u;
}
function hw(t, r) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (r == null) return this.tween(i, null);
  if (typeof r != "function") throw new Error();
  var l = gl(t);
  return this.tween(i, (l.local ? dw : pw)(l, r));
}
function mw(t, r) {
  return function() {
    nc(this, t).delay = +r.apply(this, arguments);
  };
}
function gw(t, r) {
  return r = +r, function() {
    nc(this, t).delay = r;
  };
}
function yw(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? mw : gw)(r, t)) : rn(this.node(), r).delay;
}
function vw(t, r) {
  return function() {
    yn(this, t).duration = +r.apply(this, arguments);
  };
}
function ww(t, r) {
  return r = +r, function() {
    yn(this, t).duration = r;
  };
}
function xw(t) {
  var r = this._id;
  return arguments.length ? this.each((typeof t == "function" ? vw : ww)(r, t)) : rn(this.node(), r).duration;
}
function Sw(t, r) {
  if (typeof r != "function") throw new Error();
  return function() {
    yn(this, t).ease = r;
  };
}
function Ew(t) {
  var r = this._id;
  return arguments.length ? this.each(Sw(r, t)) : rn(this.node(), r).ease;
}
function _w(t, r) {
  return function() {
    var i = r.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    yn(this, t).ease = i;
  };
}
function kw(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_w(this._id, t));
}
function Nw(t) {
  typeof t != "function" && (t = uh(t));
  for (var r = this._groups, i = r.length, l = new Array(i), u = 0; u < i; ++u)
    for (var c = r[u], f = c.length, p = l[u] = [], h, v = 0; v < f; ++v)
      (h = c[v]) && t.call(h, h.__data__, v, c) && p.push(h);
  return new Tn(l, this._parents, this._name, this._id);
}
function Cw(t) {
  if (t._id !== this._id) throw new Error();
  for (var r = this._groups, i = t._groups, l = r.length, u = i.length, c = Math.min(l, u), f = new Array(l), p = 0; p < c; ++p)
    for (var h = r[p], v = i[p], g = h.length, y = f[p] = new Array(g), m, x = 0; x < g; ++x)
      (m = h[x] || v[x]) && (y[x] = m);
  for (; p < l; ++p)
    f[p] = r[p];
  return new Tn(f, this._parents, this._name, this._id);
}
function Mw(t) {
  return (t + "").trim().split(/^|\s+/).every(function(r) {
    var i = r.indexOf(".");
    return i >= 0 && (r = r.slice(0, i)), !r || r === "start";
  });
}
function Pw(t, r, i) {
  var l, u, c = Mw(r) ? nc : yn;
  return function() {
    var f = c(this, t), p = f.on;
    p !== l && (u = (l = p).copy()).on(r, i), f.on = u;
  };
}
function Tw(t, r) {
  var i = this._id;
  return arguments.length < 2 ? rn(this.node(), i).on.on(t) : this.each(Pw(i, t, r));
}
function Lw(t) {
  return function() {
    var r = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    r && r.removeChild(this);
  };
}
function Iw() {
  return this.on("end.remove", Lw(this._id));
}
function zw(t) {
  var r = this._name, i = this._id;
  typeof t != "function" && (t = qa(t));
  for (var l = this._groups, u = l.length, c = new Array(u), f = 0; f < u; ++f)
    for (var p = l[f], h = p.length, v = c[f] = new Array(h), g, y, m = 0; m < h; ++m)
      (g = p[m]) && (y = t.call(g, g.__data__, m, p)) && ("__data__" in g && (y.__data__ = g.__data__), v[m] = y, vl(v[m], r, i, m, v, rn(g, i)));
  return new Tn(c, this._parents, r, i);
}
function Rw(t) {
  var r = this._name, i = this._id;
  typeof t != "function" && (t = lh(t));
  for (var l = this._groups, u = l.length, c = [], f = [], p = 0; p < u; ++p)
    for (var h = l[p], v = h.length, g, y = 0; y < v; ++y)
      if (g = h[y]) {
        for (var m = t.call(g, g.__data__, y, h), x, k = rn(g, i), E = 0, N = m.length; E < N; ++E)
          (x = m[E]) && vl(x, r, i, E, m, k);
        c.push(m), f.push(g);
      }
  return new Tn(c, f, r, i);
}
var Aw = Ei.prototype.constructor;
function $w() {
  return new Aw(this._groups, this._parents);
}
function Dw(t, r) {
  var i, l, u;
  return function() {
    var c = ao(this, t), f = (this.style.removeProperty(t), ao(this, t));
    return c === f ? null : c === i && f === l ? u : u = r(i = c, l = f);
  };
}
function zh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ow(t, r, i) {
  var l, u = i + "", c;
  return function() {
    var f = ao(this, t);
    return f === u ? null : f === l ? c : c = r(l = f, i);
  };
}
function Fw(t, r, i) {
  var l, u, c;
  return function() {
    var f = ao(this, t), p = i(this), h = p + "";
    return p == null && (h = p = (this.style.removeProperty(t), ao(this, t))), f === h ? null : f === l && h === u ? c : (u = h, c = r(l = f, p));
  };
}
function jw(t, r) {
  var i, l, u, c = "style." + r, f = "end." + c, p;
  return function() {
    var h = yn(this, t), v = h.on, g = h.value[c] == null ? p || (p = zh(r)) : void 0;
    (v !== i || u !== g) && (l = (i = v).copy()).on(f, u = g), h.on = l;
  };
}
function Hw(t, r, i) {
  var l = (t += "") == "transform" ? bv : Ih;
  return r == null ? this.styleTween(t, Dw(t, l)).on("end.style." + t, zh(t)) : typeof r == "function" ? this.styleTween(t, Fw(t, l, rc(this, "style." + t, r))).each(jw(this._id, t)) : this.styleTween(t, Ow(t, l, r), i).on("end.style." + t, null);
}
function bw(t, r, i) {
  return function(l) {
    this.style.setProperty(t, r.call(this, l), i);
  };
}
function Bw(t, r, i) {
  var l, u;
  function c() {
    var f = r.apply(this, arguments);
    return f !== u && (l = (u = f) && bw(t, f, i)), l;
  }
  return c._value = r, c;
}
function Vw(t, r, i) {
  var l = "style." + (t += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (r == null) return this.tween(l, null);
  if (typeof r != "function") throw new Error();
  return this.tween(l, Bw(t, r, i ?? ""));
}
function Uw(t) {
  return function() {
    this.textContent = t;
  };
}
function Ww(t) {
  return function() {
    var r = t(this);
    this.textContent = r ?? "";
  };
}
function Yw(t) {
  return this.tween("text", typeof t == "function" ? Ww(rc(this, "text", t)) : Uw(t == null ? "" : t + ""));
}
function Xw(t) {
  return function(r) {
    this.textContent = t.call(this, r);
  };
}
function Kw(t) {
  var r, i;
  function l() {
    var u = t.apply(this, arguments);
    return u !== i && (r = (i = u) && Xw(u)), r;
  }
  return l._value = t, l;
}
function Qw(t) {
  var r = "text";
  if (arguments.length < 1) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, Kw(t));
}
function Gw() {
  for (var t = this._name, r = this._id, i = Rh(), l = this._groups, u = l.length, c = 0; c < u; ++c)
    for (var f = l[c], p = f.length, h, v = 0; v < p; ++v)
      if (h = f[v]) {
        var g = rn(h, r);
        vl(h, t, i, v, f, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Tn(l, this._parents, t, i);
}
function qw() {
  var t, r, i = this, l = i._id, u = i.size();
  return new Promise(function(c, f) {
    var p = { value: f }, h = { value: function() {
      --u === 0 && c();
    } };
    i.each(function() {
      var v = yn(this, l), g = v.on;
      g !== t && (r = (t = g).copy(), r._.cancel.push(p), r._.interrupt.push(p), r._.end.push(h)), v.on = r;
    }), u === 0 && c();
  });
}
var Zw = 0;
function Tn(t, r, i, l) {
  this._groups = t, this._parents = r, this._name = i, this._id = l;
}
function Rh() {
  return ++Zw;
}
var Cn = Ei.prototype;
Tn.prototype = {
  constructor: Tn,
  select: zw,
  selectAll: Rw,
  selectChild: Cn.selectChild,
  selectChildren: Cn.selectChildren,
  filter: Nw,
  merge: Cw,
  selection: $w,
  transition: Gw,
  call: Cn.call,
  nodes: Cn.nodes,
  node: Cn.node,
  size: Cn.size,
  empty: Cn.empty,
  each: Cn.each,
  on: Tw,
  attr: aw,
  attrTween: hw,
  style: Hw,
  styleTween: Vw,
  text: Yw,
  textTween: Qw,
  remove: Iw,
  tween: nw,
  delay: yw,
  duration: xw,
  ease: Ew,
  easeVarying: kw,
  end: qw,
  [Symbol.iterator]: Cn[Symbol.iterator]
};
function Jw(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var e1 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Jw
};
function t1(t, r) {
  for (var i; !(i = t.__transition) || !(i = i[r]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${r} not found`);
  return i;
}
function n1(t) {
  var r, i;
  t instanceof Tn ? (r = t._id, t = t._name) : (r = Rh(), (i = e1).time = tc(), t = t == null ? null : t + "");
  for (var l = this._groups, u = l.length, c = 0; c < u; ++c)
    for (var f = l[c], p = f.length, h, v = 0; v < p; ++v)
      (h = f[v]) && vl(h, t, r, v, f, i || t1(h, r));
  return new Tn(l, this._parents, t, r);
}
Ei.prototype.interrupt = Jv;
Ei.prototype.transition = n1;
const Ys = (t) => () => t;
function r1(t, {
  sourceEvent: r,
  target: i,
  transform: l,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
function Pn(t, r, i) {
  this.k = t, this.x = r, this.y = i;
}
Pn.prototype = {
  constructor: Pn,
  scale: function(t) {
    return t === 1 ? this : new Pn(this.k * t, this.x, this.y);
  },
  translate: function(t, r) {
    return t === 0 & r === 0 ? this : new Pn(this.k, this.x + this.k * t, this.y + this.k * r);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var wl = new Pn(1, 0, 0);
Ah.prototype = Pn.prototype;
function Ah(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return wl;
  return t.__zoom;
}
function Ca(t) {
  t.stopImmediatePropagation();
}
function ii(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function o1(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function i1() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function cp() {
  return this.__zoom || wl;
}
function s1(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function l1() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function u1(t, r, i) {
  var l = t.invertX(r[0][0]) - i[0][0], u = t.invertX(r[1][0]) - i[1][0], c = t.invertY(r[0][1]) - i[0][1], f = t.invertY(r[1][1]) - i[1][1];
  return t.translate(
    u > l ? (l + u) / 2 : Math.min(0, l) || Math.max(0, u),
    f > c ? (c + f) / 2 : Math.min(0, c) || Math.max(0, f)
  );
}
function $h() {
  var t = o1, r = i1, i = u1, l = s1, u = l1, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], p = 250, h = Js, v = ml("start", "zoom", "end"), g, y, m, x = 500, k = 150, E = 0, N = 10;
  function M(C) {
    C.property("__zoom", cp).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", ee).on("dblclick.zoom", oe).filter(u).on("touchstart.zoom", Z).on("touchmove.zoom", te).on("touchend.zoom touchcancel.zoom", J).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(C, b, D, j) {
    var z = C.selection ? C.selection() : C;
    z.property("__zoom", cp), C !== z ? A(C, b, D, j) : z.interrupt().each(function() {
      H(this, arguments).event(j).start().zoom(null, typeof b == "function" ? b.apply(this, arguments) : b).end();
    });
  }, M.scaleBy = function(C, b, D, j) {
    M.scaleTo(C, function() {
      var z = this.__zoom.k, L = typeof b == "function" ? b.apply(this, arguments) : b;
      return z * L;
    }, D, j);
  }, M.scaleTo = function(C, b, D, j) {
    M.transform(C, function() {
      var z = r.apply(this, arguments), L = this.__zoom, O = D == null ? P(z) : typeof D == "function" ? D.apply(this, arguments) : D, _ = L.invert(O), F = typeof b == "function" ? b.apply(this, arguments) : b;
      return i(S(R(L, F), O, _), z, f);
    }, D, j);
  }, M.translateBy = function(C, b, D, j) {
    M.transform(C, function() {
      return i(this.__zoom.translate(
        typeof b == "function" ? b.apply(this, arguments) : b,
        typeof D == "function" ? D.apply(this, arguments) : D
      ), r.apply(this, arguments), f);
    }, null, j);
  }, M.translateTo = function(C, b, D, j, z) {
    M.transform(C, function() {
      var L = r.apply(this, arguments), O = this.__zoom, _ = j == null ? P(L) : typeof j == "function" ? j.apply(this, arguments) : j;
      return i(wl.translate(_[0], _[1]).scale(O.k).translate(
        typeof b == "function" ? -b.apply(this, arguments) : -b,
        typeof D == "function" ? -D.apply(this, arguments) : -D
      ), L, f);
    }, j, z);
  };
  function R(C, b) {
    return b = Math.max(c[0], Math.min(c[1], b)), b === C.k ? C : new Pn(b, C.x, C.y);
  }
  function S(C, b, D) {
    var j = b[0] - D[0] * C.k, z = b[1] - D[1] * C.k;
    return j === C.x && z === C.y ? C : new Pn(C.k, j, z);
  }
  function P(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function A(C, b, D, j) {
    C.on("start.zoom", function() {
      H(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var z = this, L = arguments, O = H(z, L).event(j), _ = r.apply(z, L), F = D == null ? P(_) : typeof D == "function" ? D.apply(z, L) : D, K = Math.max(_[1][0] - _[0][0], _[1][1] - _[0][1]), Y = z.__zoom, ue = typeof b == "function" ? b.apply(z, L) : b, ce = h(Y.invert(F).concat(K / Y.k), ue.invert(F).concat(K / ue.k));
      return function(fe) {
        if (fe === 1) fe = ue;
        else {
          var se = ce(fe), de = K / se[2];
          fe = new Pn(de, F[0] - se[0] * de, F[1] - se[1] * de);
        }
        O.zoom(null, fe);
      };
    });
  }
  function H(C, b, D) {
    return !D && C.__zooming || new B(C, b);
  }
  function B(C, b) {
    this.that = C, this.args = b, this.active = 0, this.sourceEvent = null, this.extent = r.apply(C, b), this.taps = 0;
  }
  B.prototype = {
    event: function(C) {
      return C && (this.sourceEvent = C), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(C, b) {
      return this.mouse && C !== "mouse" && (this.mouse[1] = b.invert(this.mouse[0])), this.touch0 && C !== "touch" && (this.touch0[1] = b.invert(this.touch0[0])), this.touch1 && C !== "touch" && (this.touch1[1] = b.invert(this.touch1[0])), this.that.__zoom = b, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(C) {
      var b = Ot(this.that).datum();
      v.call(
        C,
        this.that,
        new r1(C, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: v
        }),
        b
      );
    }
  };
  function V(C, ...b) {
    if (!t.apply(this, arguments)) return;
    var D = H(this, b).event(C), j = this.__zoom, z = Math.max(c[0], Math.min(c[1], j.k * Math.pow(2, l.apply(this, arguments)))), L = en(C);
    if (D.wheel)
      (D.mouse[0][0] !== L[0] || D.mouse[0][1] !== L[1]) && (D.mouse[1] = j.invert(D.mouse[0] = L)), clearTimeout(D.wheel);
    else {
      if (j.k === z) return;
      D.mouse = [L, j.invert(L)], nl(this), D.start();
    }
    ii(C), D.wheel = setTimeout(O, k), D.zoom("mouse", i(S(R(j, z), D.mouse[0], D.mouse[1]), D.extent, f));
    function O() {
      D.wheel = null, D.end();
    }
  }
  function ee(C, ...b) {
    if (m || !t.apply(this, arguments)) return;
    var D = C.currentTarget, j = H(this, b, !0).event(C), z = Ot(C.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", K, !0), L = en(C, D), O = C.clientX, _ = C.clientY;
    vh(C.view), Ca(C), j.mouse = [L, this.__zoom.invert(L)], nl(this), j.start();
    function F(Y) {
      if (ii(Y), !j.moved) {
        var ue = Y.clientX - O, ce = Y.clientY - _;
        j.moved = ue * ue + ce * ce > E;
      }
      j.event(Y).zoom("mouse", i(S(j.that.__zoom, j.mouse[0] = en(Y, D), j.mouse[1]), j.extent, f));
    }
    function K(Y) {
      z.on("mousemove.zoom mouseup.zoom", null), wh(Y.view, j.moved), ii(Y), j.event(Y).end();
    }
  }
  function oe(C, ...b) {
    if (t.apply(this, arguments)) {
      var D = this.__zoom, j = en(C.changedTouches ? C.changedTouches[0] : C, this), z = D.invert(j), L = D.k * (C.shiftKey ? 0.5 : 2), O = i(S(R(D, L), j, z), r.apply(this, b), f);
      ii(C), p > 0 ? Ot(this).transition().duration(p).call(A, O, j, C) : Ot(this).call(M.transform, O, j, C);
    }
  }
  function Z(C, ...b) {
    if (t.apply(this, arguments)) {
      var D = C.touches, j = D.length, z = H(this, b, C.changedTouches.length === j).event(C), L, O, _, F;
      for (Ca(C), O = 0; O < j; ++O)
        _ = D[O], F = en(_, this), F = [F, this.__zoom.invert(F), _.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== F[2] && (z.touch1 = F, z.taps = 0) : (z.touch0 = F, L = !0, z.taps = 1 + !!g);
      g && (g = clearTimeout(g)), L && (z.taps < 2 && (y = F[0], g = setTimeout(function() {
        g = null;
      }, x)), nl(this), z.start());
    }
  }
  function te(C, ...b) {
    if (this.__zooming) {
      var D = H(this, b).event(C), j = C.changedTouches, z = j.length, L, O, _, F;
      for (ii(C), L = 0; L < z; ++L)
        O = j[L], _ = en(O, this), D.touch0 && D.touch0[2] === O.identifier ? D.touch0[0] = _ : D.touch1 && D.touch1[2] === O.identifier && (D.touch1[0] = _);
      if (O = D.that.__zoom, D.touch1) {
        var K = D.touch0[0], Y = D.touch0[1], ue = D.touch1[0], ce = D.touch1[1], fe = (fe = ue[0] - K[0]) * fe + (fe = ue[1] - K[1]) * fe, se = (se = ce[0] - Y[0]) * se + (se = ce[1] - Y[1]) * se;
        O = R(O, Math.sqrt(fe / se)), _ = [(K[0] + ue[0]) / 2, (K[1] + ue[1]) / 2], F = [(Y[0] + ce[0]) / 2, (Y[1] + ce[1]) / 2];
      } else if (D.touch0) _ = D.touch0[0], F = D.touch0[1];
      else return;
      D.zoom("touch", i(S(O, _, F), D.extent, f));
    }
  }
  function J(C, ...b) {
    if (this.__zooming) {
      var D = H(this, b).event(C), j = C.changedTouches, z = j.length, L, O;
      for (Ca(C), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, x), L = 0; L < z; ++L)
        O = j[L], D.touch0 && D.touch0[2] === O.identifier ? delete D.touch0 : D.touch1 && D.touch1[2] === O.identifier && delete D.touch1;
      if (D.touch1 && !D.touch0 && (D.touch0 = D.touch1, delete D.touch1), D.touch0) D.touch0[1] = this.__zoom.invert(D.touch0[0]);
      else if (D.end(), D.taps === 2 && (O = en(O, this), Math.hypot(y[0] - O[0], y[1] - O[1]) < N)) {
        var _ = Ot(this).on("dblclick.zoom");
        _ && _.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(C) {
    return arguments.length ? (l = typeof C == "function" ? C : Ys(+C), M) : l;
  }, M.filter = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : Ys(!!C), M) : t;
  }, M.touchable = function(C) {
    return arguments.length ? (u = typeof C == "function" ? C : Ys(!!C), M) : u;
  }, M.extent = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : Ys([[+C[0][0], +C[0][1]], [+C[1][0], +C[1][1]]]), M) : r;
  }, M.scaleExtent = function(C) {
    return arguments.length ? (c[0] = +C[0], c[1] = +C[1], M) : [c[0], c[1]];
  }, M.translateExtent = function(C) {
    return arguments.length ? (f[0][0] = +C[0][0], f[1][0] = +C[1][0], f[0][1] = +C[0][1], f[1][1] = +C[1][1], M) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, M.constrain = function(C) {
    return arguments.length ? (i = C, M) : i;
  }, M.duration = function(C) {
    return arguments.length ? (p = +C, M) : p;
  }, M.interpolate = function(C) {
    return arguments.length ? (h = C, M) : h;
  }, M.on = function() {
    var C = v.on.apply(v, arguments);
    return C === v ? M : C;
  }, M.clickDistance = function(C) {
    return arguments.length ? (E = (C = +C) * C, M) : Math.sqrt(E);
  }, M.tapDistance = function(C) {
    return arguments.length ? (N = +C, M) : N;
  }, M;
}
const gn = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (t) => `The old edge with id=${t} does not exist.`,
  error009: (t) => `Marker type "${t}" doesn't exist.`,
  error008: (t, { id: r, sourceHandle: i, targetHandle: l }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? i : l}", edge id: ${r}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."
}, mi = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Dh = ["Enter", " ", "Escape"], Oh = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: t, x: r, y: i }) => `Moved selected node ${t}. New position, x: ${r}, y: ${i}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var fo;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(fo || (fo = {}));
var Cr;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(Cr || (Cr = {}));
var gi;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(gi || (gi = {}));
const Fh = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null
};
var nr;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(nr || (nr = {}));
var yi;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(yi || (yi = {}));
var we;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(we || (we = {}));
const fp = {
  [we.Left]: we.Right,
  [we.Right]: we.Left,
  [we.Top]: we.Bottom,
  [we.Bottom]: we.Top
};
function jh(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const Hh = (t) => "id" in t && "source" in t && "target" in t, a1 = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), oc = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), ki = (t, r = [0, 0]) => {
  const { width: i, height: l } = Ln(t), u = t.origin ?? r, c = i * u[0], f = l * u[1];
  return {
    x: t.position.x - c,
    y: t.position.y - f
  };
}, c1 = (t, r = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = t.reduce((l, u) => {
    const c = typeof u == "string";
    let f = !r.nodeLookup && !c ? u : void 0;
    r.nodeLookup && (f = c ? r.nodeLookup.get(u) : oc(u) ? u : r.nodeLookup.get(u.id));
    const p = f ? fl(f, r.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return xl(l, p);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Sl(i);
}, Ni = (t, r = {}) => {
  if (t.size === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 };
  return t.forEach((l) => {
    if (r.filter === void 0 || r.filter(l)) {
      const u = fl(l);
      i = xl(i, u);
    }
  }), Sl(i);
}, ic = (t, r, [i, l, u] = [0, 0, 1], c = !1, f = !1) => {
  const p = {
    ...Ci(r, [i, l, u]),
    width: r.width / u,
    height: r.height / u
  }, h = [];
  for (const v of t.values()) {
    const { measured: g, selectable: y = !0, hidden: m = !1 } = v;
    if (f && !y || m)
      continue;
    const x = g.width ?? v.width ?? v.initialWidth ?? null, k = g.height ?? v.height ?? v.initialHeight ?? null, E = vi(p, ho(v)), N = (x ?? 0) * (k ?? 0), M = c && E > 0;
    (!v.internals.handleBounds || M || E >= N || v.dragging) && h.push(v);
  }
  return h;
}, f1 = (t, r) => {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((l) => {
    i.add(l.id);
  }), r.filter((l) => i.has(l.source) || i.has(l.target));
};
function d1(t, r) {
  const i = /* @__PURE__ */ new Map(), l = r != null && r.nodes ? new Set(r.nodes.map((u) => u.id)) : null;
  return t.forEach((u) => {
    u.measured.width && u.measured.height && ((r == null ? void 0 : r.includeHiddenNodes) || !u.hidden) && (!l || l.has(u.id)) && i.set(u.id, u);
  }), i;
}
async function p1({ nodes: t, width: r, height: i, panZoom: l, minZoom: u, maxZoom: c }, f) {
  if (t.size === 0)
    return Promise.resolve(!0);
  const p = d1(t, f), h = Ni(p), v = sc(h, r, i, (f == null ? void 0 : f.minZoom) ?? u, (f == null ? void 0 : f.maxZoom) ?? c, (f == null ? void 0 : f.padding) ?? 0.1);
  return await l.setViewport(v, {
    duration: f == null ? void 0 : f.duration,
    ease: f == null ? void 0 : f.ease,
    interpolate: f == null ? void 0 : f.interpolate
  }), Promise.resolve(!0);
}
function bh({ nodeId: t, nextPosition: r, nodeLookup: i, nodeOrigin: l = [0, 0], nodeExtent: u, onError: c }) {
  const f = i.get(t), p = f.parentId ? i.get(f.parentId) : void 0, { x: h, y: v } = p ? p.internals.positionAbsolute : { x: 0, y: 0 }, g = f.origin ?? l;
  let y = u;
  if (f.extent === "parent" && !f.expandParent)
    if (!p)
      c == null || c("005", gn.error005());
    else {
      const x = p.measured.width, k = p.measured.height;
      x && k && (y = [
        [h, v],
        [h + x, v + k]
      ]);
    }
  else p && mo(f.extent) && (y = [
    [f.extent[0][0] + h, f.extent[0][1] + v],
    [f.extent[1][0] + h, f.extent[1][1] + v]
  ]);
  const m = mo(y) ? Tr(r, y, f.measured) : r;
  return (f.measured.width === void 0 || f.measured.height === void 0) && (c == null || c("015", gn.error015())), {
    position: {
      x: m.x - h + (f.measured.width ?? 0) * g[0],
      y: m.y - v + (f.measured.height ?? 0) * g[1]
    },
    positionAbsolute: m
  };
}
async function h1({ nodesToRemove: t = [], edgesToRemove: r = [], nodes: i, edges: l, onBeforeDelete: u }) {
  const c = new Set(t.map((m) => m.id)), f = [];
  for (const m of i) {
    if (m.deletable === !1)
      continue;
    const x = c.has(m.id), k = !x && m.parentId && f.find((E) => E.id === m.parentId);
    (x || k) && f.push(m);
  }
  const p = new Set(r.map((m) => m.id)), h = l.filter((m) => m.deletable !== !1), g = f1(f, h);
  for (const m of h)
    p.has(m.id) && !g.find((k) => k.id === m.id) && g.push(m);
  if (!u)
    return {
      edges: g,
      nodes: f
    };
  const y = await u({
    nodes: f,
    edges: g
  });
  return typeof y == "boolean" ? y ? { edges: g, nodes: f } : { edges: [], nodes: [] } : y;
}
const po = (t, r = 0, i = 1) => Math.min(Math.max(t, r), i), Tr = (t = { x: 0, y: 0 }, r, i) => ({
  x: po(t.x, r[0][0], r[1][0] - ((i == null ? void 0 : i.width) ?? 0)),
  y: po(t.y, r[0][1], r[1][1] - ((i == null ? void 0 : i.height) ?? 0))
});
function Bh(t, r, i) {
  const { width: l, height: u } = Ln(i), { x: c, y: f } = i.internals.positionAbsolute;
  return Tr(t, [
    [c, f],
    [c + l, f + u]
  ], r);
}
const dp = (t, r, i) => t < r ? po(Math.abs(t - r), 1, r) / r : t > i ? -po(Math.abs(t - i), 1, r) / r : 0, Vh = (t, r, i = 15, l = 40) => {
  const u = dp(t.x, l, r.width - l) * i, c = dp(t.y, l, r.height - l) * i;
  return [u, c];
}, xl = (t, r) => ({
  x: Math.min(t.x, r.x),
  y: Math.min(t.y, r.y),
  x2: Math.max(t.x2, r.x2),
  y2: Math.max(t.y2, r.y2)
}), Ua = ({ x: t, y: r, width: i, height: l }) => ({
  x: t,
  y: r,
  x2: t + i,
  y2: r + l
}), Sl = ({ x: t, y: r, x2: i, y2: l }) => ({
  x: t,
  y: r,
  width: i - t,
  height: l - r
}), ho = (t, r = [0, 0]) => {
  var u, c;
  const { x: i, y: l } = oc(t) ? t.internals.positionAbsolute : ki(t, r);
  return {
    x: i,
    y: l,
    width: ((u = t.measured) == null ? void 0 : u.width) ?? t.width ?? t.initialWidth ?? 0,
    height: ((c = t.measured) == null ? void 0 : c.height) ?? t.height ?? t.initialHeight ?? 0
  };
}, fl = (t, r = [0, 0]) => {
  var u, c;
  const { x: i, y: l } = oc(t) ? t.internals.positionAbsolute : ki(t, r);
  return {
    x: i,
    y: l,
    x2: i + (((u = t.measured) == null ? void 0 : u.width) ?? t.width ?? t.initialWidth ?? 0),
    y2: l + (((c = t.measured) == null ? void 0 : c.height) ?? t.height ?? t.initialHeight ?? 0)
  };
}, Uh = (t, r) => Sl(xl(Ua(t), Ua(r))), vi = (t, r) => {
  const i = Math.max(0, Math.min(t.x + t.width, r.x + r.width) - Math.max(t.x, r.x)), l = Math.max(0, Math.min(t.y + t.height, r.y + r.height) - Math.max(t.y, r.y));
  return Math.ceil(i * l);
}, pp = (t) => nn(t.width) && nn(t.height) && nn(t.x) && nn(t.y), nn = (t) => !isNaN(t) && isFinite(t), m1 = (t, r) => {
}, El = (t, r = [1, 1]) => ({
  x: r[0] * Math.round(t.x / r[0]),
  y: r[1] * Math.round(t.y / r[1])
}), Ci = ({ x: t, y: r }, [i, l, u], c = !1, f = [1, 1]) => {
  const p = {
    x: (t - i) / u,
    y: (r - l) / u
  };
  return c ? El(p, f) : p;
}, dl = ({ x: t, y: r }, [i, l, u]) => ({
  x: t * u + i,
  y: r * u + l
});
function oo(t, r) {
  if (typeof t == "number")
    return Math.floor((r - r / (1 + t)) * 0.5);
  if (typeof t == "string" && t.endsWith("px")) {
    const i = parseFloat(t);
    if (!Number.isNaN(i))
      return Math.floor(i);
  }
  if (typeof t == "string" && t.endsWith("%")) {
    const i = parseFloat(t);
    if (!Number.isNaN(i))
      return Math.floor(r * i * 0.01);
  }
  return console.error(`[React Flow] The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function g1(t, r, i) {
  if (typeof t == "string" || typeof t == "number") {
    const l = oo(t, i), u = oo(t, r);
    return {
      top: l,
      right: u,
      bottom: l,
      left: u,
      x: u * 2,
      y: l * 2
    };
  }
  if (typeof t == "object") {
    const l = oo(t.top ?? t.y ?? 0, i), u = oo(t.bottom ?? t.y ?? 0, i), c = oo(t.left ?? t.x ?? 0, r), f = oo(t.right ?? t.x ?? 0, r);
    return { top: l, right: f, bottom: u, left: c, x: c + f, y: l + u };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function y1(t, r, i, l, u, c) {
  const { x: f, y: p } = dl(t, [r, i, l]), { x: h, y: v } = dl({ x: t.x + t.width, y: t.y + t.height }, [r, i, l]), g = u - h, y = c - v;
  return {
    left: Math.floor(f),
    top: Math.floor(p),
    right: Math.floor(g),
    bottom: Math.floor(y)
  };
}
const sc = (t, r, i, l, u, c) => {
  const f = g1(c, r, i), p = (r - f.x) / t.width, h = (i - f.y) / t.height, v = Math.min(p, h), g = po(v, l, u), y = t.x + t.width / 2, m = t.y + t.height / 2, x = r / 2 - y * g, k = i / 2 - m * g, E = y1(t, x, k, g, r, i), N = {
    left: Math.min(E.left - f.left, 0),
    top: Math.min(E.top - f.top, 0),
    right: Math.min(E.right - f.right, 0),
    bottom: Math.min(E.bottom - f.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: k - N.top + N.bottom,
    zoom: g
  };
}, pl = () => {
  var t;
  return typeof navigator < "u" && ((t = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : t.indexOf("Mac")) >= 0;
};
function mo(t) {
  return t !== void 0 && t !== "parent";
}
function Ln(t) {
  var r, i;
  return {
    width: ((r = t.measured) == null ? void 0 : r.width) ?? t.width ?? t.initialWidth ?? 0,
    height: ((i = t.measured) == null ? void 0 : i.height) ?? t.height ?? t.initialHeight ?? 0
  };
}
function Wh(t) {
  var r, i;
  return (((r = t.measured) == null ? void 0 : r.width) ?? t.width ?? t.initialWidth) !== void 0 && (((i = t.measured) == null ? void 0 : i.height) ?? t.height ?? t.initialHeight) !== void 0;
}
function Yh(t, r = { width: 0, height: 0 }, i, l, u) {
  const c = { ...t }, f = l.get(i);
  if (f) {
    const p = f.origin || u;
    c.x += f.internals.positionAbsolute.x - (r.width ?? 0) * p[0], c.y += f.internals.positionAbsolute.y - (r.height ?? 0) * p[1];
  }
  return c;
}
function hp(t, r) {
  if (t.size !== r.size)
    return !1;
  for (const i of t)
    if (!r.has(i))
      return !1;
  return !0;
}
function v1() {
  let t, r;
  return { promise: new Promise((l, u) => {
    t = l, r = u;
  }), resolve: t, reject: r };
}
function w1(t) {
  return { ...Oh, ...t || {} };
}
function ai(t, { snapGrid: r = [0, 0], snapToGrid: i = !1, transform: l, containerBounds: u }) {
  const { x: c, y: f } = hn(t), p = Ci({ x: c - ((u == null ? void 0 : u.left) ?? 0), y: f - ((u == null ? void 0 : u.top) ?? 0) }, l), { x: h, y: v } = i ? El(p, r) : p;
  return {
    xSnapped: h,
    ySnapped: v,
    ...p
  };
}
const lc = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), Xh = (t) => {
  var r;
  return ((r = t == null ? void 0 : t.getRootNode) == null ? void 0 : r.call(t)) || (window == null ? void 0 : window.document);
}, x1 = ["INPUT", "SELECT", "TEXTAREA"];
function Kh(t) {
  var l, u;
  const r = ((u = (l = t.composedPath) == null ? void 0 : l.call(t)) == null ? void 0 : u[0]) || t.target;
  return (r == null ? void 0 : r.nodeType) !== 1 ? !1 : x1.includes(r.nodeName) || r.hasAttribute("contenteditable") || !!r.closest(".nokey");
}
const Qh = (t) => "clientX" in t, hn = (t, r) => {
  var c, f;
  const i = Qh(t), l = i ? t.clientX : (c = t.touches) == null ? void 0 : c[0].clientX, u = i ? t.clientY : (f = t.touches) == null ? void 0 : f[0].clientY;
  return {
    x: l - ((r == null ? void 0 : r.left) ?? 0),
    y: u - ((r == null ? void 0 : r.top) ?? 0)
  };
}, mp = (t, r, i, l, u) => {
  const c = r.querySelectorAll(`.${t}`);
  return !c || !c.length ? null : Array.from(c).map((f) => {
    const p = f.getBoundingClientRect();
    return {
      id: f.getAttribute("data-handleid"),
      type: t,
      nodeId: u,
      position: f.getAttribute("data-handlepos"),
      x: (p.left - i.left) / l,
      y: (p.top - i.top) / l,
      ...lc(f)
    };
  });
};
function Gh({ sourceX: t, sourceY: r, targetX: i, targetY: l, sourceControlX: u, sourceControlY: c, targetControlX: f, targetControlY: p }) {
  const h = t * 0.125 + u * 0.375 + f * 0.375 + i * 0.125, v = r * 0.125 + c * 0.375 + p * 0.375 + l * 0.125, g = Math.abs(h - t), y = Math.abs(v - r);
  return [h, v, g, y];
}
function Xs(t, r) {
  return t >= 0 ? 0.5 * t : r * 25 * Math.sqrt(-t);
}
function gp({ pos: t, x1: r, y1: i, x2: l, y2: u, c }) {
  switch (t) {
    case we.Left:
      return [r - Xs(r - l, c), i];
    case we.Right:
      return [r + Xs(l - r, c), i];
    case we.Top:
      return [r, i - Xs(i - u, c)];
    case we.Bottom:
      return [r, i + Xs(u - i, c)];
  }
}
function uc({ sourceX: t, sourceY: r, sourcePosition: i = we.Bottom, targetX: l, targetY: u, targetPosition: c = we.Top, curvature: f = 0.25 }) {
  const [p, h] = gp({
    pos: i,
    x1: t,
    y1: r,
    x2: l,
    y2: u,
    c: f
  }), [v, g] = gp({
    pos: c,
    x1: l,
    y1: u,
    x2: t,
    y2: r,
    c: f
  }), [y, m, x, k] = Gh({
    sourceX: t,
    sourceY: r,
    targetX: l,
    targetY: u,
    sourceControlX: p,
    sourceControlY: h,
    targetControlX: v,
    targetControlY: g
  });
  return [
    `M${t},${r} C${p},${h} ${v},${g} ${l},${u}`,
    y,
    m,
    x,
    k
  ];
}
function qh({ sourceX: t, sourceY: r, targetX: i, targetY: l }) {
  const u = Math.abs(i - t) / 2, c = i < t ? i + u : i - u, f = Math.abs(l - r) / 2, p = l < r ? l + f : l - f;
  return [c, p, u, f];
}
function S1({ sourceNode: t, targetNode: r, selected: i = !1, zIndex: l, elevateOnSelect: u = !1 }) {
  if (l !== void 0)
    return l;
  const c = u && i ? 1e3 : 0, f = Math.max(t.parentId ? t.internals.z : 0, r.parentId ? r.internals.z : 0);
  return c + f;
}
function E1({ sourceNode: t, targetNode: r, width: i, height: l, transform: u }) {
  const c = xl(fl(t), fl(r));
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const f = {
    x: -u[0] / u[2],
    y: -u[1] / u[2],
    width: i / u[2],
    height: l / u[2]
  };
  return vi(f, Sl(c)) > 0;
}
const _1 = ({ source: t, sourceHandle: r, target: i, targetHandle: l }) => `xy-edge__${t}${r || ""}-${i}${l || ""}`, k1 = (t, r) => r.some((i) => i.source === t.source && i.target === t.target && (i.sourceHandle === t.sourceHandle || !i.sourceHandle && !t.sourceHandle) && (i.targetHandle === t.targetHandle || !i.targetHandle && !t.targetHandle)), N1 = (t, r) => {
  if (!t.source || !t.target)
    return r;
  let i;
  return Hh(t) ? i = { ...t } : i = {
    ...t,
    id: _1(t)
  }, k1(i, r) ? r : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, r.concat(i));
};
function Zh({ sourceX: t, sourceY: r, targetX: i, targetY: l }) {
  const [u, c, f, p] = qh({
    sourceX: t,
    sourceY: r,
    targetX: i,
    targetY: l
  });
  return [`M ${t},${r}L ${i},${l}`, u, c, f, p];
}
const yp = {
  [we.Left]: { x: -1, y: 0 },
  [we.Right]: { x: 1, y: 0 },
  [we.Top]: { x: 0, y: -1 },
  [we.Bottom]: { x: 0, y: 1 }
}, C1 = ({ source: t, sourcePosition: r = we.Bottom, target: i }) => r === we.Left || r === we.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, vp = (t, r) => Math.sqrt(Math.pow(r.x - t.x, 2) + Math.pow(r.y - t.y, 2));
function M1({ source: t, sourcePosition: r = we.Bottom, target: i, targetPosition: l = we.Top, center: u, offset: c }) {
  const f = yp[r], p = yp[l], h = { x: t.x + f.x * c, y: t.y + f.y * c }, v = { x: i.x + p.x * c, y: i.y + p.y * c }, g = C1({
    source: h,
    sourcePosition: r,
    target: v
  }), y = g.x !== 0 ? "x" : "y", m = g[y];
  let x = [], k, E;
  const N = { x: 0, y: 0 }, M = { x: 0, y: 0 }, [R, S, P, A] = qh({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (f[y] * p[y] === -1) {
    k = u.x ?? R, E = u.y ?? S;
    const B = [
      { x: k, y: h.y },
      { x: k, y: v.y }
    ], V = [
      { x: h.x, y: E },
      { x: v.x, y: E }
    ];
    f[y] === m ? x = y === "x" ? B : V : x = y === "x" ? V : B;
  } else {
    const B = [{ x: h.x, y: v.y }], V = [{ x: v.x, y: h.y }];
    if (y === "x" ? x = f.x === m ? V : B : x = f.y === m ? B : V, r === l) {
      const J = Math.abs(t[y] - i[y]);
      if (J <= c) {
        const C = Math.min(c - 1, c - J);
        f[y] === m ? N[y] = (h[y] > t[y] ? -1 : 1) * C : M[y] = (v[y] > i[y] ? -1 : 1) * C;
      }
    }
    if (r !== l) {
      const J = y === "x" ? "y" : "x", C = f[y] === p[J], b = h[J] > v[J], D = h[J] < v[J];
      (f[y] === 1 && (!C && b || C && D) || f[y] !== 1 && (!C && D || C && b)) && (x = y === "x" ? B : V);
    }
    const ee = { x: h.x + N.x, y: h.y + N.y }, oe = { x: v.x + M.x, y: v.y + M.y }, Z = Math.max(Math.abs(ee.x - x[0].x), Math.abs(oe.x - x[0].x)), te = Math.max(Math.abs(ee.y - x[0].y), Math.abs(oe.y - x[0].y));
    Z >= te ? (k = (ee.x + oe.x) / 2, E = x[0].y) : (k = x[0].x, E = (ee.y + oe.y) / 2);
  }
  return [[
    t,
    { x: h.x + N.x, y: h.y + N.y },
    ...x,
    { x: v.x + M.x, y: v.y + M.y },
    i
  ], k, E, P, A];
}
function P1(t, r, i, l) {
  const u = Math.min(vp(t, r) / 2, vp(r, i) / 2, l), { x: c, y: f } = r;
  if (t.x === c && c === i.x || t.y === f && f === i.y)
    return `L${c} ${f}`;
  if (t.y === f) {
    const v = t.x < i.x ? -1 : 1, g = t.y < i.y ? 1 : -1;
    return `L ${c + u * v},${f}Q ${c},${f} ${c},${f + u * g}`;
  }
  const p = t.x < i.x ? 1 : -1, h = t.y < i.y ? -1 : 1;
  return `L ${c},${f + u * h}Q ${c},${f} ${c + u * p},${f}`;
}
function Wa({ sourceX: t, sourceY: r, sourcePosition: i = we.Bottom, targetX: l, targetY: u, targetPosition: c = we.Top, borderRadius: f = 5, centerX: p, centerY: h, offset: v = 20 }) {
  const [g, y, m, x, k] = M1({
    source: { x: t, y: r },
    sourcePosition: i,
    target: { x: l, y: u },
    targetPosition: c,
    center: { x: p, y: h },
    offset: v
  });
  return [g.reduce((N, M, R) => {
    let S = "";
    return R > 0 && R < g.length - 1 ? S = P1(g[R - 1], M, g[R + 1], f) : S = `${R === 0 ? "M" : "L"}${M.x} ${M.y}`, N += S, N;
  }, ""), y, m, x, k];
}
function wp(t) {
  var r;
  return t && !!(t.internals.handleBounds || (r = t.handles) != null && r.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function T1(t) {
  var y;
  const { sourceNode: r, targetNode: i } = t;
  if (!wp(r) || !wp(i))
    return null;
  const l = r.internals.handleBounds || xp(r.handles), u = i.internals.handleBounds || xp(i.handles), c = Sp((l == null ? void 0 : l.source) ?? [], t.sourceHandle), f = Sp(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === fo.Strict ? (u == null ? void 0 : u.target) ?? [] : ((u == null ? void 0 : u.target) ?? []).concat((u == null ? void 0 : u.source) ?? []),
    t.targetHandle
  );
  if (!c || !f)
    return (y = t.onError) == null || y.call(t, "008", gn.error008(c ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const p = (c == null ? void 0 : c.position) || we.Bottom, h = (f == null ? void 0 : f.position) || we.Top, v = wi(r, c, p), g = wi(i, f, h);
  return {
    sourceX: v.x,
    sourceY: v.y,
    targetX: g.x,
    targetY: g.y,
    sourcePosition: p,
    targetPosition: h
  };
}
function xp(t) {
  if (!t)
    return null;
  const r = [], i = [];
  for (const l of t)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? r.push(l) : l.type === "target" && i.push(l);
  return {
    source: r,
    target: i
  };
}
function wi(t, r, i = we.Left, l = !1) {
  const u = ((r == null ? void 0 : r.x) ?? 0) + t.internals.positionAbsolute.x, c = ((r == null ? void 0 : r.y) ?? 0) + t.internals.positionAbsolute.y, { width: f, height: p } = r ?? Ln(t);
  if (l)
    return { x: u + f / 2, y: c + p / 2 };
  switch ((r == null ? void 0 : r.position) ?? i) {
    case we.Top:
      return { x: u + f / 2, y: c };
    case we.Right:
      return { x: u + f, y: c + p / 2 };
    case we.Bottom:
      return { x: u + f / 2, y: c + p };
    case we.Left:
      return { x: u, y: c + p / 2 };
  }
}
function Sp(t, r) {
  return t && (r ? t.find((i) => i.id === r) : t[0]) || null;
}
function Ya(t, r) {
  return t ? typeof t == "string" ? t : `${r ? `${r}__` : ""}${Object.keys(t).sort().map((l) => `${l}=${t[l]}`).join("&")}` : "";
}
function L1(t, { id: r, defaultColor: i, defaultMarkerStart: l, defaultMarkerEnd: u }) {
  const c = /* @__PURE__ */ new Set();
  return t.reduce((f, p) => ([p.markerStart || l, p.markerEnd || u].forEach((h) => {
    if (h && typeof h == "object") {
      const v = Ya(h, r);
      c.has(v) || (f.push({ id: v, color: h.color || i, ...h }), c.add(v));
    }
  }), f), []).sort((f, p) => f.id.localeCompare(p.id));
}
const ac = {
  nodeOrigin: [0, 0],
  nodeExtent: mi,
  elevateNodesOnSelect: !0,
  defaults: {}
}, I1 = {
  ...ac,
  checkEquality: !0
};
function cc(t, r) {
  const i = { ...t };
  for (const l in r)
    r[l] !== void 0 && (i[l] = r[l]);
  return i;
}
function z1(t, r, i) {
  const l = cc(ac, i);
  for (const u of t.values())
    if (u.parentId)
      fc(u, t, r, l);
    else {
      const c = ki(u, l.nodeOrigin), f = mo(u.extent) ? u.extent : l.nodeExtent, p = Tr(c, f, Ln(u));
      u.internals.positionAbsolute = p;
    }
}
function Xa(t, r, i, l) {
  var h, v;
  const u = cc(I1, l);
  let c = t.length > 0;
  const f = new Map(r), p = u != null && u.elevateNodesOnSelect ? 1e3 : 0;
  r.clear(), i.clear();
  for (const g of t) {
    let y = f.get(g.id);
    if (u.checkEquality && g === (y == null ? void 0 : y.internals.userNode))
      r.set(g.id, y);
    else {
      const m = ki(g, u.nodeOrigin), x = mo(g.extent) ? g.extent : u.nodeExtent, k = Tr(m, x, Ln(g));
      y = {
        ...u.defaults,
        ...g,
        measured: {
          width: (h = g.measured) == null ? void 0 : h.width,
          height: (v = g.measured) == null ? void 0 : v.height
        },
        internals: {
          positionAbsolute: k,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: g.measured ? y == null ? void 0 : y.internals.handleBounds : void 0,
          z: Jh(g, p),
          userNode: g
        }
      }, r.set(g.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (c = !1), g.parentId && fc(y, r, i, l);
  }
  return c;
}
function R1(t, r) {
  if (!t.parentId)
    return;
  const i = r.get(t.parentId);
  i ? i.set(t.id, t) : r.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function fc(t, r, i, l) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: f } = cc(ac, l), p = t.parentId, h = r.get(p);
  if (!h) {
    console.warn(`Parent node ${p} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  R1(t, i);
  const v = u ? 1e3 : 0, { x: g, y, z: m } = A1(t, h, c, f, v), { positionAbsolute: x } = t.internals, k = g !== x.x || y !== x.y;
  (k || m !== t.internals.z) && r.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: k ? { x: g, y } : x,
      z: m
    }
  });
}
function Jh(t, r) {
  return (nn(t.zIndex) ? t.zIndex : 0) + (t.selected ? r : 0);
}
function A1(t, r, i, l, u) {
  const { x: c, y: f } = r.internals.positionAbsolute, p = Ln(t), h = ki(t, i), v = mo(t.extent) ? Tr(h, t.extent, p) : h;
  let g = Tr({ x: c + v.x, y: f + v.y }, l, p);
  t.extent === "parent" && (g = Bh(g, p, r));
  const y = Jh(t, u), m = r.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: m >= y ? m + 1 : y
  };
}
function dc(t, r, i, l = [0, 0]) {
  var f;
  const u = [], c = /* @__PURE__ */ new Map();
  for (const p of t) {
    const h = r.get(p.parentId);
    if (!h)
      continue;
    const v = ((f = c.get(p.parentId)) == null ? void 0 : f.expandedRect) ?? ho(h), g = Uh(v, p.rect);
    c.set(p.parentId, { expandedRect: g, parent: h });
  }
  return c.size > 0 && c.forEach(({ expandedRect: p, parent: h }, v) => {
    var S;
    const g = h.internals.positionAbsolute, y = Ln(h), m = h.origin ?? l, x = p.x < g.x ? Math.round(Math.abs(g.x - p.x)) : 0, k = p.y < g.y ? Math.round(Math.abs(g.y - p.y)) : 0, E = Math.max(y.width, Math.round(p.width)), N = Math.max(y.height, Math.round(p.height)), M = (E - y.width) * m[0], R = (N - y.height) * m[1];
    (x > 0 || k > 0 || M || R) && (u.push({
      id: v,
      type: "position",
      position: {
        x: h.position.x - x + M,
        y: h.position.y - k + R
      }
    }), (S = i.get(v)) == null || S.forEach((P) => {
      t.some((A) => A.id === P.id) || u.push({
        id: P.id,
        type: "position",
        position: {
          x: P.position.x + x,
          y: P.position.y + k
        }
      });
    })), (y.width < p.width || y.height < p.height || x || k) && u.push({
      id: v,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: E + (x ? m[0] * x - M : 0),
        height: N + (k ? m[1] * k - R : 0)
      }
    });
  }), u;
}
function $1(t, r, i, l, u, c) {
  const f = l == null ? void 0 : l.querySelector(".xyflow__viewport");
  let p = !1;
  if (!f)
    return { changes: [], updatedInternals: p };
  const h = [], v = window.getComputedStyle(f), { m22: g } = new window.DOMMatrixReadOnly(v.transform), y = [];
  for (const m of t.values()) {
    const x = r.get(m.id);
    if (!x)
      continue;
    if (x.hidden) {
      r.set(x.id, {
        ...x,
        internals: {
          ...x.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const k = lc(m.nodeElement), E = x.measured.width !== k.width || x.measured.height !== k.height;
    if (!!(k.width && k.height && (E || !x.internals.handleBounds || m.force))) {
      const M = m.nodeElement.getBoundingClientRect(), R = mo(x.extent) ? x.extent : c;
      let { positionAbsolute: S } = x.internals;
      x.parentId && x.extent === "parent" ? S = Bh(S, k, r.get(x.parentId)) : R && (S = Tr(S, R, k));
      const P = {
        ...x,
        measured: k,
        internals: {
          ...x.internals,
          positionAbsolute: S,
          handleBounds: {
            source: mp("source", m.nodeElement, M, g, x.id),
            target: mp("target", m.nodeElement, M, g, x.id)
          }
        }
      };
      r.set(x.id, P), x.parentId && fc(P, r, i, { nodeOrigin: u }), p = !0, E && (h.push({
        id: x.id,
        type: "dimensions",
        dimensions: k
      }), x.expandParent && x.parentId && y.push({
        id: x.id,
        parentId: x.parentId,
        rect: ho(P, u)
      }));
    }
  }
  if (y.length > 0) {
    const m = dc(y, r, i, u);
    h.push(...m);
  }
  return { changes: h, updatedInternals: p };
}
async function D1({ delta: t, panZoom: r, transform: i, translateExtent: l, width: u, height: c }) {
  if (!r || !t.x && !t.y)
    return Promise.resolve(!1);
  const f = await r.setViewportConstrained({
    x: i[0] + t.x,
    y: i[1] + t.y,
    zoom: i[2]
  }, [
    [0, 0],
    [u, c]
  ], l), p = !!f && (f.x !== i[0] || f.y !== i[1] || f.k !== i[2]);
  return Promise.resolve(p);
}
function Ep(t, r, i, l, u, c) {
  let f = u;
  const p = l.get(f) || /* @__PURE__ */ new Map();
  l.set(f, p.set(i, r)), f = `${u}-${t}`;
  const h = l.get(f) || /* @__PURE__ */ new Map();
  if (l.set(f, h.set(i, r)), c) {
    f = `${u}-${t}-${c}`;
    const v = l.get(f) || /* @__PURE__ */ new Map();
    l.set(f, v.set(i, r));
  }
}
function em(t, r, i) {
  t.clear(), r.clear();
  for (const l of i) {
    const { source: u, target: c, sourceHandle: f = null, targetHandle: p = null } = l, h = { edgeId: l.id, source: u, target: c, sourceHandle: f, targetHandle: p }, v = `${u}-${f}--${c}-${p}`, g = `${c}-${p}--${u}-${f}`;
    Ep("source", h, g, t, u, f), Ep("target", h, v, t, c, p), r.set(l.id, l);
  }
}
function tm(t, r) {
  if (!t.parentId)
    return !1;
  const i = r.get(t.parentId);
  return i ? i.selected ? !0 : tm(i, r) : !1;
}
function _p(t, r, i) {
  var u;
  let l = t;
  do {
    if ((u = l == null ? void 0 : l.matches) != null && u.call(l, r))
      return !0;
    if (l === i)
      return !1;
    l = l == null ? void 0 : l.parentElement;
  } while (l);
  return !1;
}
function O1(t, r, i, l) {
  const u = /* @__PURE__ */ new Map();
  for (const [c, f] of t)
    if ((f.selected || f.id === l) && (!f.parentId || !tm(f, t)) && (f.draggable || r && typeof f.draggable > "u")) {
      const p = t.get(c);
      p && u.set(c, {
        id: c,
        position: p.position || { x: 0, y: 0 },
        distance: {
          x: i.x - p.internals.positionAbsolute.x,
          y: i.y - p.internals.positionAbsolute.y
        },
        extent: p.extent,
        parentId: p.parentId,
        origin: p.origin,
        expandParent: p.expandParent,
        internals: {
          positionAbsolute: p.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: p.measured.width ?? 0,
          height: p.measured.height ?? 0
        }
      });
    }
  return u;
}
function Ma({ nodeId: t, dragItems: r, nodeLookup: i, dragging: l = !0 }) {
  var f, p, h;
  const u = [];
  for (const [v, g] of r) {
    const y = (f = i.get(v)) == null ? void 0 : f.internals.userNode;
    y && u.push({
      ...y,
      position: g.position,
      dragging: l
    });
  }
  if (!t)
    return [u[0], u];
  const c = (p = i.get(t)) == null ? void 0 : p.internals.userNode;
  return [
    c ? {
      ...c,
      position: ((h = r.get(t)) == null ? void 0 : h.position) || c.position,
      dragging: l
    } : u[0],
    u
  ];
}
function F1({ onNodeMouseDown: t, getStoreItems: r, onDragStart: i, onDrag: l, onDragStop: u }) {
  let c = { x: null, y: null }, f = 0, p = /* @__PURE__ */ new Map(), h = !1, v = { x: 0, y: 0 }, g = null, y = !1, m = null, x = !1, k = !1;
  function E({ noDragClassName: M, handleSelector: R, domNode: S, isSelectable: P, nodeId: A, nodeClickDistance: H = 0 }) {
    m = Ot(S);
    function B({ x: Z, y: te }, J) {
      const { nodeLookup: C, nodeExtent: b, snapGrid: D, snapToGrid: j, nodeOrigin: z, onNodeDrag: L, onSelectionDrag: O, onError: _, updateNodePositions: F } = r();
      c = { x: Z, y: te };
      let K = !1, Y = { x: 0, y: 0, x2: 0, y2: 0 };
      if (p.size > 1 && b) {
        const ue = Ni(p);
        Y = Ua(ue);
      }
      for (const [ue, ce] of p) {
        if (!C.has(ue))
          continue;
        let fe = { x: Z - ce.distance.x, y: te - ce.distance.y };
        j && (fe = El(fe, D));
        let se = [
          [b[0][0], b[0][1]],
          [b[1][0], b[1][1]]
        ];
        if (p.size > 1 && b && !ce.extent) {
          const { positionAbsolute: Pe } = ce.internals, Se = Pe.x - Y.x + b[0][0], Ee = Pe.x + ce.measured.width - Y.x2 + b[1][0], xe = Pe.y - Y.y + b[0][1], Ae = Pe.y + ce.measured.height - Y.y2 + b[1][1];
          se = [
            [Se, xe],
            [Ee, Ae]
          ];
        }
        const { position: de, positionAbsolute: Ne } = bh({
          nodeId: ue,
          nextPosition: fe,
          nodeLookup: C,
          nodeExtent: se,
          nodeOrigin: z,
          onError: _
        });
        K = K || ce.position.x !== de.x || ce.position.y !== de.y, ce.position = de, ce.internals.positionAbsolute = Ne;
      }
      if (k = k || K, !!K && (F(p, !0), J && (l || L || !A && O))) {
        const [ue, ce] = Ma({
          nodeId: A,
          dragItems: p,
          nodeLookup: C
        });
        l == null || l(J, p, ue, ce), L == null || L(J, ue, ce), A || O == null || O(J, ce);
      }
    }
    async function V() {
      if (!g)
        return;
      const { transform: Z, panBy: te, autoPanSpeed: J, autoPanOnNodeDrag: C } = r();
      if (!C) {
        h = !1, cancelAnimationFrame(f);
        return;
      }
      const [b, D] = Vh(v, g, J);
      (b !== 0 || D !== 0) && (c.x = (c.x ?? 0) - b / Z[2], c.y = (c.y ?? 0) - D / Z[2], await te({ x: b, y: D }) && B(c, null)), f = requestAnimationFrame(V);
    }
    function ee(Z) {
      var K;
      const { nodeLookup: te, multiSelectionActive: J, nodesDraggable: C, transform: b, snapGrid: D, snapToGrid: j, selectNodesOnDrag: z, onNodeDragStart: L, onSelectionDragStart: O, unselectNodesAndEdges: _ } = r();
      y = !0, (!z || !P) && !J && A && ((K = te.get(A)) != null && K.selected || _()), P && z && A && (t == null || t(A));
      const F = ai(Z.sourceEvent, { transform: b, snapGrid: D, snapToGrid: j, containerBounds: g });
      if (c = F, p = O1(te, C, F, A), p.size > 0 && (i || L || !A && O)) {
        const [Y, ue] = Ma({
          nodeId: A,
          dragItems: p,
          nodeLookup: te
        });
        i == null || i(Z.sourceEvent, p, Y, ue), L == null || L(Z.sourceEvent, Y, ue), A || O == null || O(Z.sourceEvent, ue);
      }
    }
    const oe = xh().clickDistance(H).on("start", (Z) => {
      const { domNode: te, nodeDragThreshold: J, transform: C, snapGrid: b, snapToGrid: D } = r();
      g = (te == null ? void 0 : te.getBoundingClientRect()) || null, x = !1, k = !1, J === 0 && ee(Z), c = ai(Z.sourceEvent, { transform: C, snapGrid: b, snapToGrid: D, containerBounds: g }), v = hn(Z.sourceEvent, g);
    }).on("drag", (Z) => {
      const { autoPanOnNodeDrag: te, transform: J, snapGrid: C, snapToGrid: b, nodeDragThreshold: D, nodeLookup: j } = r(), z = ai(Z.sourceEvent, { transform: J, snapGrid: C, snapToGrid: b, containerBounds: g });
      if ((Z.sourceEvent.type === "touchmove" && Z.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      A && !j.has(A)) && (x = !0), !x) {
        if (!h && te && y && (h = !0, V()), !y) {
          const L = z.xSnapped - (c.x ?? 0), O = z.ySnapped - (c.y ?? 0);
          Math.sqrt(L * L + O * O) > D && ee(Z);
        }
        (c.x !== z.xSnapped || c.y !== z.ySnapped) && p && y && (v = hn(Z.sourceEvent, g), B(z, Z.sourceEvent));
      }
    }).on("end", (Z) => {
      if (!(!y || x) && (h = !1, y = !1, cancelAnimationFrame(f), p.size > 0)) {
        const { nodeLookup: te, updateNodePositions: J, onNodeDragStop: C, onSelectionDragStop: b } = r();
        if (k && (J(p, !1), k = !1), u || C || !A && b) {
          const [D, j] = Ma({
            nodeId: A,
            dragItems: p,
            nodeLookup: te,
            dragging: !1
          });
          u == null || u(Z.sourceEvent, p, D, j), C == null || C(Z.sourceEvent, D, j), A || b == null || b(Z.sourceEvent, j);
        }
      }
    }).filter((Z) => {
      const te = Z.target;
      return !Z.button && (!M || !_p(te, `.${M}`, S)) && (!R || _p(te, R, S));
    });
    m.call(oe);
  }
  function N() {
    m == null || m.on(".drag", null);
  }
  return {
    update: E,
    destroy: N
  };
}
function j1(t, r, i) {
  const l = [], u = {
    x: t.x - i,
    y: t.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const c of r.values())
    vi(u, ho(c)) > 0 && l.push(c);
  return l;
}
const H1 = 250;
function b1(t, r, i, l) {
  var p, h;
  let u = [], c = 1 / 0;
  const f = j1(t, i, r + H1);
  for (const v of f) {
    const g = [...((p = v.internals.handleBounds) == null ? void 0 : p.source) ?? [], ...((h = v.internals.handleBounds) == null ? void 0 : h.target) ?? []];
    for (const y of g) {
      if (l.nodeId === y.nodeId && l.type === y.type && l.id === y.id)
        continue;
      const { x: m, y: x } = wi(v, y, y.position, !0), k = Math.sqrt(Math.pow(m - t.x, 2) + Math.pow(x - t.y, 2));
      k > r || (k < c ? (u = [{ ...y, x: m, y: x }], c = k) : k === c && u.push({ ...y, x: m, y: x }));
    }
  }
  if (!u.length)
    return null;
  if (u.length > 1) {
    const v = l.type === "source" ? "target" : "source";
    return u.find((g) => g.type === v) ?? u[0];
  }
  return u[0];
}
function nm(t, r, i, l, u, c = !1) {
  var v, g, y;
  const f = l.get(t);
  if (!f)
    return null;
  const p = u === "strict" ? (v = f.internals.handleBounds) == null ? void 0 : v[r] : [...((g = f.internals.handleBounds) == null ? void 0 : g.source) ?? [], ...((y = f.internals.handleBounds) == null ? void 0 : y.target) ?? []], h = (i ? p == null ? void 0 : p.find((m) => m.id === i) : p == null ? void 0 : p[0]) ?? null;
  return h && c ? { ...h, ...wi(f, h, h.position, !0) } : h;
}
function rm(t, r) {
  return t || (r != null && r.classList.contains("target") ? "target" : r != null && r.classList.contains("source") ? "source" : null);
}
function B1(t, r) {
  let i = null;
  return r ? i = !0 : t && !r && (i = !1), i;
}
const om = () => !0;
function V1(t, { connectionMode: r, connectionRadius: i, handleId: l, nodeId: u, edgeUpdaterType: c, isTarget: f, domNode: p, nodeLookup: h, lib: v, autoPanOnConnect: g, flowId: y, panBy: m, cancelConnection: x, onConnectStart: k, onConnect: E, onConnectEnd: N, isValidConnection: M = om, onReconnectEnd: R, updateConnection: S, getTransform: P, getFromHandle: A, autoPanSpeed: H, dragThreshold: B = 1 }) {
  const V = Xh(t.target);
  let ee = 0, oe;
  const { x: Z, y: te } = hn(t), J = V == null ? void 0 : V.elementFromPoint(Z, te), C = rm(c, J), b = p == null ? void 0 : p.getBoundingClientRect();
  let D = !1;
  if (!b || !C)
    return;
  const j = nm(u, C, l, h, r);
  if (!j)
    return;
  let z = hn(t, b), L = !1, O = null, _ = !1, F = null;
  function K() {
    if (!g || !b)
      return;
    const [Pe, Se] = Vh(z, b, H);
    m({ x: Pe, y: Se }), ee = requestAnimationFrame(K);
  }
  const Y = {
    ...j,
    nodeId: u,
    type: C,
    position: j.position
  }, ue = h.get(u);
  let fe = {
    inProgress: !0,
    isValid: null,
    from: wi(ue, Y, we.Left, !0),
    fromHandle: Y,
    fromPosition: Y.position,
    fromNode: ue,
    to: z,
    toHandle: null,
    toPosition: fp[Y.position],
    toNode: null
  };
  function se() {
    S(fe), k == null || k(t, { nodeId: u, handleId: l, handleType: C });
  }
  B === 0 && se();
  function de(Pe) {
    if (!D) {
      const { x: Ae, y: Oe } = hn(Pe), vt = Ae - Z, jt = Oe - te, Lt = vt * vt + jt * jt > B * B;
      if (!Lt)
        return;
      se(), D = Lt;
    }
    if (!A() || !Y) {
      Ne(Pe);
      return;
    }
    const Se = P();
    z = hn(Pe, b), oe = b1(Ci(z, Se, !1, [1, 1]), i, h, Y), L || (K(), L = !0);
    const Ee = im(Pe, {
      handle: oe,
      connectionMode: r,
      fromNodeId: u,
      fromHandleId: l,
      fromType: f ? "target" : "source",
      isValidConnection: M,
      doc: V,
      lib: v,
      flowId: y,
      nodeLookup: h
    });
    F = Ee.handleDomNode, O = Ee.connection, _ = B1(!!oe, Ee.isValid);
    const xe = {
      // from stays the same
      ...fe,
      isValid: _,
      to: Ee.toHandle && _ ? dl({ x: Ee.toHandle.x, y: Ee.toHandle.y }, Se) : z,
      toHandle: Ee.toHandle,
      toPosition: _ && Ee.toHandle ? Ee.toHandle.position : fp[Y.position],
      toNode: Ee.toHandle ? h.get(Ee.toHandle.nodeId) : null
    };
    _ && oe && fe.toHandle && xe.toHandle && fe.toHandle.type === xe.toHandle.type && fe.toHandle.nodeId === xe.toHandle.nodeId && fe.toHandle.id === xe.toHandle.id && fe.to.x === xe.to.x && fe.to.y === xe.to.y || (S(xe), fe = xe);
  }
  function Ne(Pe) {
    (oe || F) && O && _ && (E == null || E(O));
    const { inProgress: Se, ...Ee } = fe, xe = {
      ...Ee,
      toPosition: fe.toHandle ? fe.toPosition : null
    };
    N == null || N(Pe, xe), c && (R == null || R(Pe, xe)), x(), cancelAnimationFrame(ee), L = !1, _ = !1, O = null, F = null, V.removeEventListener("mousemove", de), V.removeEventListener("mouseup", Ne), V.removeEventListener("touchmove", de), V.removeEventListener("touchend", Ne);
  }
  V.addEventListener("mousemove", de), V.addEventListener("mouseup", Ne), V.addEventListener("touchmove", de), V.addEventListener("touchend", Ne);
}
function im(t, { handle: r, connectionMode: i, fromNodeId: l, fromHandleId: u, fromType: c, doc: f, lib: p, flowId: h, isValidConnection: v = om, nodeLookup: g }) {
  const y = c === "target", m = r ? f.querySelector(`.${p}-flow__handle[data-id="${h}-${r == null ? void 0 : r.nodeId}-${r == null ? void 0 : r.id}-${r == null ? void 0 : r.type}"]`) : null, { x, y: k } = hn(t), E = f.elementFromPoint(x, k), N = E != null && E.classList.contains(`${p}-flow__handle`) ? E : m, M = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const R = rm(void 0, N), S = N.getAttribute("data-nodeid"), P = N.getAttribute("data-handleid"), A = N.classList.contains("connectable"), H = N.classList.contains("connectableend");
    if (!S || !R)
      return M;
    const B = {
      source: y ? S : l,
      sourceHandle: y ? P : u,
      target: y ? l : S,
      targetHandle: y ? u : P
    };
    M.connection = B;
    const ee = A && H && (i === fo.Strict ? y && R === "source" || !y && R === "target" : S !== l || P !== u);
    M.isValid = ee && v(B), M.toHandle = nm(S, R, P, g, i, !0);
  }
  return M;
}
const Ka = {
  onPointerDown: V1,
  isValid: im
};
function U1({ domNode: t, panZoom: r, getTransform: i, getViewScale: l }) {
  const u = Ot(t);
  function c({ translateExtent: p, width: h, height: v, zoomStep: g = 10, pannable: y = !0, zoomable: m = !0, inversePan: x = !1 }) {
    const k = (S) => {
      const P = i();
      if (S.sourceEvent.type !== "wheel" || !r)
        return;
      const A = -S.sourceEvent.deltaY * (S.sourceEvent.deltaMode === 1 ? 0.05 : S.sourceEvent.deltaMode ? 1 : 2e-3) * g, H = P[2] * Math.pow(2, A);
      r.scaleTo(H);
    };
    let E = [0, 0];
    const N = (S) => {
      (S.sourceEvent.type === "mousedown" || S.sourceEvent.type === "touchstart") && (E = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ]);
    }, M = (S) => {
      const P = i();
      if (S.sourceEvent.type !== "mousemove" && S.sourceEvent.type !== "touchmove" || !r)
        return;
      const A = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ], H = [A[0] - E[0], A[1] - E[1]];
      E = A;
      const B = l() * Math.max(P[2], Math.log(P[2])) * (x ? -1 : 1), V = {
        x: P[0] - H[0] * B,
        y: P[1] - H[1] * B
      }, ee = [
        [0, 0],
        [h, v]
      ];
      r.setViewportConstrained({
        x: V.x,
        y: V.y,
        zoom: P[2]
      }, ee, p);
    }, R = $h().on("start", N).on("zoom", y ? M : null).on("zoom.wheel", m ? k : null);
    u.call(R, {});
  }
  function f() {
    u.on("zoom", null);
  }
  return {
    update: c,
    destroy: f,
    pointer: en
  };
}
const W1 = (t, r) => t.x !== r.x || t.y !== r.y || t.zoom !== r.k, _l = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Pa = ({ x: t, y: r, zoom: i }) => wl.translate(t, r).scale(i), io = (t, r) => t.target.closest(`.${r}`), sm = (t, r) => r === 2 && Array.isArray(t) && t.includes(2), Y1 = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Ta = (t, r = 0, i = Y1, l = () => {
}) => {
  const u = typeof r == "number" && r > 0;
  return u || l(), u ? t.transition().duration(r).ease(i).on("end", l) : t;
}, lm = (t) => {
  const r = t.ctrlKey && pl() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * r;
};
function X1({ zoomPanValues: t, noWheelClassName: r, d3Selection: i, d3Zoom: l, panOnScrollMode: u, panOnScrollSpeed: c, zoomOnPinch: f, onPanZoomStart: p, onPanZoom: h, onPanZoomEnd: v }) {
  return (g) => {
    if (io(g, r))
      return !1;
    g.preventDefault(), g.stopImmediatePropagation();
    const y = i.property("__zoom").k || 1;
    if (g.ctrlKey && f) {
      const N = en(g), M = lm(g), R = y * Math.pow(2, M);
      l.scaleTo(i, R, N, g);
      return;
    }
    const m = g.deltaMode === 1 ? 20 : 1;
    let x = u === Cr.Vertical ? 0 : g.deltaX * m, k = u === Cr.Horizontal ? 0 : g.deltaY * m;
    !pl() && g.shiftKey && u !== Cr.Vertical && (x = g.deltaY * m, k = 0), l.translateBy(
      i,
      -(x / y) * c,
      -(k / y) * c,
      // @ts-ignore
      { internal: !0 }
    );
    const E = _l(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling || (t.isPanScrolling = !0, p == null || p(g, E)), t.isPanScrolling && (h == null || h(g, E), t.panScrollTimeout = setTimeout(() => {
      v == null || v(g, E), t.isPanScrolling = !1;
    }, 150));
  };
}
function K1({ noWheelClassName: t, preventScrolling: r, d3ZoomHandler: i }) {
  return function(l, u) {
    const c = l.type === "wheel", f = !r && c && !l.ctrlKey, p = io(l, t);
    if (l.ctrlKey && c && p && l.preventDefault(), f || p)
      return null;
    l.preventDefault(), i.call(this, l, u);
  };
}
function Q1({ zoomPanValues: t, onDraggingChange: r, onPanZoomStart: i }) {
  return (l) => {
    var c, f, p;
    if ((c = l.sourceEvent) != null && c.internal)
      return;
    const u = _l(l.transform);
    t.mouseButton = ((f = l.sourceEvent) == null ? void 0 : f.button) || 0, t.isZoomingOrPanning = !0, t.prevViewport = u, ((p = l.sourceEvent) == null ? void 0 : p.type) === "mousedown" && r(!0), i && (i == null || i(l.sourceEvent, u));
  };
}
function G1({ zoomPanValues: t, panOnDrag: r, onPaneContextMenu: i, onTransformChange: l, onPanZoom: u }) {
  return (c) => {
    var f, p;
    t.usedRightMouseButton = !!(i && sm(r, t.mouseButton ?? 0)), (f = c.sourceEvent) != null && f.sync || l([c.transform.x, c.transform.y, c.transform.k]), u && !((p = c.sourceEvent) != null && p.internal) && (u == null || u(c.sourceEvent, _l(c.transform)));
  };
}
function q1({ zoomPanValues: t, panOnDrag: r, panOnScroll: i, onDraggingChange: l, onPanZoomEnd: u, onPaneContextMenu: c }) {
  return (f) => {
    var p;
    if (!((p = f.sourceEvent) != null && p.internal) && (t.isZoomingOrPanning = !1, c && sm(r, t.mouseButton ?? 0) && !t.usedRightMouseButton && f.sourceEvent && c(f.sourceEvent), t.usedRightMouseButton = !1, l(!1), u && W1(t.prevViewport, f.transform))) {
      const h = _l(f.transform);
      t.prevViewport = h, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          u == null || u(f.sourceEvent, h);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function Z1({ zoomActivationKeyPressed: t, zoomOnScroll: r, zoomOnPinch: i, panOnDrag: l, panOnScroll: u, zoomOnDoubleClick: c, userSelectionActive: f, noWheelClassName: p, noPanClassName: h, lib: v }) {
  return (g) => {
    var k;
    const y = t || r, m = i && g.ctrlKey;
    if (g.button === 1 && g.type === "mousedown" && (io(g, `${v}-flow__node`) || io(g, `${v}-flow__edge`)))
      return !0;
    if (!l && !y && !u && !c && !i || f || io(g, p) && g.type === "wheel" || io(g, h) && (g.type !== "wheel" || u && g.type === "wheel" && !t) || !i && g.ctrlKey && g.type === "wheel")
      return !1;
    if (!i && g.type === "touchstart" && ((k = g.touches) == null ? void 0 : k.length) > 1)
      return g.preventDefault(), !1;
    if (!y && !u && !m && g.type === "wheel" || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const x = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || g.type === "wheel") && x;
  };
}
function J1({ domNode: t, minZoom: r, maxZoom: i, paneClickDistance: l, translateExtent: u, viewport: c, onPanZoom: f, onPanZoomStart: p, onPanZoomEnd: h, onDraggingChange: v }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = $h().clickDistance(!nn(l) || l < 0 ? 0 : l).scaleExtent([r, i]).translateExtent(u), x = Ot(t).call(m);
  S({
    x: c.x,
    y: c.y,
    zoom: po(c.zoom, r, i)
  }, [
    [0, 0],
    [y.width, y.height]
  ], u);
  const k = x.on("wheel.zoom"), E = x.on("dblclick.zoom");
  m.wheelDelta(lm);
  function N(te, J) {
    return x ? new Promise((C) => {
      m == null || m.interpolate((J == null ? void 0 : J.interpolate) === "linear" ? ui : Js).transform(Ta(x, J == null ? void 0 : J.duration, J == null ? void 0 : J.ease, () => C(!0)), te);
    }) : Promise.resolve(!1);
  }
  function M({ noWheelClassName: te, noPanClassName: J, onPaneContextMenu: C, userSelectionActive: b, panOnScroll: D, panOnDrag: j, panOnScrollMode: z, panOnScrollSpeed: L, preventScrolling: O, zoomOnPinch: _, zoomOnScroll: F, zoomOnDoubleClick: K, zoomActivationKeyPressed: Y, lib: ue, onTransformChange: ce }) {
    b && !g.isZoomingOrPanning && R();
    const se = D && !Y && !b ? X1({
      zoomPanValues: g,
      noWheelClassName: te,
      d3Selection: x,
      d3Zoom: m,
      panOnScrollMode: z,
      panOnScrollSpeed: L,
      zoomOnPinch: _,
      onPanZoomStart: p,
      onPanZoom: f,
      onPanZoomEnd: h
    }) : K1({
      noWheelClassName: te,
      preventScrolling: O,
      d3ZoomHandler: k
    });
    if (x.on("wheel.zoom", se, { passive: !1 }), !b) {
      const Ne = Q1({
        zoomPanValues: g,
        onDraggingChange: v,
        onPanZoomStart: p
      });
      m.on("start", Ne);
      const Pe = G1({
        zoomPanValues: g,
        panOnDrag: j,
        onPaneContextMenu: !!C,
        onPanZoom: f,
        onTransformChange: ce
      });
      m.on("zoom", Pe);
      const Se = q1({
        zoomPanValues: g,
        panOnDrag: j,
        panOnScroll: D,
        onPaneContextMenu: C,
        onPanZoomEnd: h,
        onDraggingChange: v
      });
      m.on("end", Se);
    }
    const de = Z1({
      zoomActivationKeyPressed: Y,
      panOnDrag: j,
      zoomOnScroll: F,
      panOnScroll: D,
      zoomOnDoubleClick: K,
      zoomOnPinch: _,
      userSelectionActive: b,
      noPanClassName: J,
      noWheelClassName: te,
      lib: ue
    });
    m.filter(de), K ? x.on("dblclick.zoom", E) : x.on("dblclick.zoom", null);
  }
  function R() {
    m.on("zoom", null);
  }
  async function S(te, J, C) {
    const b = Pa(te), D = m == null ? void 0 : m.constrain()(b, J, C);
    return D && await N(D), new Promise((j) => j(D));
  }
  async function P(te, J) {
    const C = Pa(te);
    return await N(C, J), new Promise((b) => b(C));
  }
  function A(te) {
    if (x) {
      const J = Pa(te), C = x.property("__zoom");
      (C.k !== te.zoom || C.x !== te.x || C.y !== te.y) && (m == null || m.transform(x, J, null, { sync: !0 }));
    }
  }
  function H() {
    const te = x ? Ah(x.node()) : { x: 0, y: 0, k: 1 };
    return { x: te.x, y: te.y, zoom: te.k };
  }
  function B(te, J) {
    return x ? new Promise((C) => {
      m == null || m.interpolate((J == null ? void 0 : J.interpolate) === "linear" ? ui : Js).scaleTo(Ta(x, J == null ? void 0 : J.duration, J == null ? void 0 : J.ease, () => C(!0)), te);
    }) : Promise.resolve(!1);
  }
  function V(te, J) {
    return x ? new Promise((C) => {
      m == null || m.interpolate((J == null ? void 0 : J.interpolate) === "linear" ? ui : Js).scaleBy(Ta(x, J == null ? void 0 : J.duration, J == null ? void 0 : J.ease, () => C(!0)), te);
    }) : Promise.resolve(!1);
  }
  function ee(te) {
    m == null || m.scaleExtent(te);
  }
  function oe(te) {
    m == null || m.translateExtent(te);
  }
  function Z(te) {
    const J = !nn(te) || te < 0 ? 0 : te;
    m == null || m.clickDistance(J);
  }
  return {
    update: M,
    destroy: R,
    setViewport: P,
    setViewportConstrained: S,
    getViewport: H,
    scaleTo: B,
    scaleBy: V,
    setScaleExtent: ee,
    setTranslateExtent: oe,
    syncViewport: A,
    setClickDistance: Z
  };
}
var go;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(go || (go = {}));
function ex({ width: t, prevWidth: r, height: i, prevHeight: l, affectsX: u, affectsY: c }) {
  const f = t - r, p = i - l, h = [f > 0 ? 1 : f < 0 ? -1 : 0, p > 0 ? 1 : p < 0 ? -1 : 0];
  return f && u && (h[0] = h[0] * -1), p && c && (h[1] = h[1] * -1), h;
}
function tx(t) {
  const r = t.includes("right") || t.includes("left"), i = t.includes("bottom") || t.includes("top"), l = t.includes("left"), u = t.includes("top");
  return {
    isHorizontal: r,
    isVertical: i,
    affectsX: l,
    affectsY: u
  };
}
function er(t, r) {
  return Math.max(0, r - t);
}
function tr(t, r) {
  return Math.max(0, t - r);
}
function Ks(t, r, i) {
  return Math.max(0, r - t, t - i);
}
function kp(t, r) {
  return t ? !r : r;
}
function nx(t, r, i, l, u, c, f, p) {
  let { affectsX: h, affectsY: v } = r;
  const { isHorizontal: g, isVertical: y } = r, m = g && y, { xSnapped: x, ySnapped: k } = i, { minWidth: E, maxWidth: N, minHeight: M, maxHeight: R } = l, { x: S, y: P, width: A, height: H, aspectRatio: B } = t;
  let V = Math.floor(g ? x - t.pointerX : 0), ee = Math.floor(y ? k - t.pointerY : 0);
  const oe = A + (h ? -V : V), Z = H + (v ? -ee : ee), te = -c[0] * A, J = -c[1] * H;
  let C = Ks(oe, E, N), b = Ks(Z, M, R);
  if (f) {
    let z = 0, L = 0;
    h && V < 0 ? z = er(S + V + te, f[0][0]) : !h && V > 0 && (z = tr(S + oe + te, f[1][0])), v && ee < 0 ? L = er(P + ee + J, f[0][1]) : !v && ee > 0 && (L = tr(P + Z + J, f[1][1])), C = Math.max(C, z), b = Math.max(b, L);
  }
  if (p) {
    let z = 0, L = 0;
    h && V > 0 ? z = tr(S + V, p[0][0]) : !h && V < 0 && (z = er(S + oe, p[1][0])), v && ee > 0 ? L = tr(P + ee, p[0][1]) : !v && ee < 0 && (L = er(P + Z, p[1][1])), C = Math.max(C, z), b = Math.max(b, L);
  }
  if (u) {
    if (g) {
      const z = Ks(oe / B, M, R) * B;
      if (C = Math.max(C, z), f) {
        let L = 0;
        !h && !v || h && !v && m ? L = tr(P + J + oe / B, f[1][1]) * B : L = er(P + J + (h ? V : -V) / B, f[0][1]) * B, C = Math.max(C, L);
      }
      if (p) {
        let L = 0;
        !h && !v || h && !v && m ? L = er(P + oe / B, p[1][1]) * B : L = tr(P + (h ? V : -V) / B, p[0][1]) * B, C = Math.max(C, L);
      }
    }
    if (y) {
      const z = Ks(Z * B, E, N) / B;
      if (b = Math.max(b, z), f) {
        let L = 0;
        !h && !v || v && !h && m ? L = tr(S + Z * B + te, f[1][0]) / B : L = er(S + (v ? ee : -ee) * B + te, f[0][0]) / B, b = Math.max(b, L);
      }
      if (p) {
        let L = 0;
        !h && !v || v && !h && m ? L = er(S + Z * B, p[1][0]) / B : L = tr(S + (v ? ee : -ee) * B, p[0][0]) / B, b = Math.max(b, L);
      }
    }
  }
  ee = ee + (ee < 0 ? b : -b), V = V + (V < 0 ? C : -C), u && (m ? oe > Z * B ? ee = (kp(h, v) ? -V : V) / B : V = (kp(h, v) ? -ee : ee) * B : g ? (ee = V / B, v = h) : (V = ee * B, h = v));
  const D = h ? S + V : S, j = v ? P + ee : P;
  return {
    width: A + (h ? -V : V),
    height: H + (v ? -ee : ee),
    x: c[0] * V * (h ? -1 : 1) + D,
    y: c[1] * ee * (v ? -1 : 1) + j
  };
}
const um = { width: 0, height: 0, x: 0, y: 0 }, rx = {
  ...um,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function ox(t) {
  return [
    [0, 0],
    [t.measured.width, t.measured.height]
  ];
}
function ix(t, r, i) {
  const l = r.position.x + t.position.x, u = r.position.y + t.position.y, c = t.measured.width ?? 0, f = t.measured.height ?? 0, p = i[0] * c, h = i[1] * f;
  return [
    [l - p, u - h],
    [l + c - p, u + f - h]
  ];
}
function sx({ domNode: t, nodeId: r, getStoreItems: i, onChange: l, onEnd: u }) {
  const c = Ot(t);
  function f({ controlPosition: h, boundaries: v, keepAspectRatio: g, resizeDirection: y, onResizeStart: m, onResize: x, onResizeEnd: k, shouldResize: E }) {
    let N = { ...um }, M = { ...rx };
    const R = tx(h);
    let S, P = null, A = [], H, B, V;
    const ee = xh().on("start", (oe) => {
      const { nodeLookup: Z, transform: te, snapGrid: J, snapToGrid: C, nodeOrigin: b, paneDomNode: D } = i();
      if (S = Z.get(r), !S)
        return;
      P = (D == null ? void 0 : D.getBoundingClientRect()) ?? null;
      const { xSnapped: j, ySnapped: z } = ai(oe.sourceEvent, {
        transform: te,
        snapGrid: J,
        snapToGrid: C,
        containerBounds: P
      });
      N = {
        width: S.measured.width ?? 0,
        height: S.measured.height ?? 0,
        x: S.position.x ?? 0,
        y: S.position.y ?? 0
      }, M = {
        ...N,
        pointerX: j,
        pointerY: z,
        aspectRatio: N.width / N.height
      }, H = void 0, S.parentId && (S.extent === "parent" || S.expandParent) && (H = Z.get(S.parentId), B = H && S.extent === "parent" ? ox(H) : void 0), A = [], V = void 0;
      for (const [L, O] of Z)
        if (O.parentId === r && (A.push({
          id: L,
          position: { ...O.position },
          extent: O.extent
        }), O.extent === "parent" || O.expandParent)) {
          const _ = ix(O, S, O.origin ?? b);
          V ? V = [
            [Math.min(_[0][0], V[0][0]), Math.min(_[0][1], V[0][1])],
            [Math.max(_[1][0], V[1][0]), Math.max(_[1][1], V[1][1])]
          ] : V = _;
        }
      m == null || m(oe, { ...N });
    }).on("drag", (oe) => {
      const { transform: Z, snapGrid: te, snapToGrid: J, nodeOrigin: C } = i(), b = ai(oe.sourceEvent, {
        transform: Z,
        snapGrid: te,
        snapToGrid: J,
        containerBounds: P
      }), D = [];
      if (!S)
        return;
      const { x: j, y: z, width: L, height: O } = N, _ = {}, F = S.origin ?? C, { width: K, height: Y, x: ue, y: ce } = nx(M, R, b, v, g, F, B, V), fe = K !== L, se = Y !== O, de = ue !== j && fe, Ne = ce !== z && se;
      if (!de && !Ne && !fe && !se)
        return;
      if ((de || Ne || F[0] === 1 || F[1] === 1) && (_.x = de ? ue : N.x, _.y = Ne ? ce : N.y, N.x = _.x, N.y = _.y, A.length > 0)) {
        const xe = ue - j, Ae = ce - z;
        for (const Oe of A)
          Oe.position = {
            x: Oe.position.x - xe + F[0] * (K - L),
            y: Oe.position.y - Ae + F[1] * (Y - O)
          }, D.push(Oe);
      }
      if ((fe || se) && (_.width = fe && (!y || y === "horizontal") ? K : N.width, _.height = se && (!y || y === "vertical") ? Y : N.height, N.width = _.width, N.height = _.height), H && S.expandParent) {
        const xe = F[0] * (_.width ?? 0);
        _.x && _.x < xe && (N.x = xe, M.x = M.x - (_.x - xe));
        const Ae = F[1] * (_.height ?? 0);
        _.y && _.y < Ae && (N.y = Ae, M.y = M.y - (_.y - Ae));
      }
      const Pe = ex({
        width: N.width,
        prevWidth: L,
        height: N.height,
        prevHeight: O,
        affectsX: R.affectsX,
        affectsY: R.affectsY
      }), Se = { ...N, direction: Pe };
      (E == null ? void 0 : E(oe, Se)) !== !1 && (x == null || x(oe, Se), l(_, D));
    }).on("end", (oe) => {
      k == null || k(oe, { ...N }), u == null || u({ ...N });
    });
    c.call(ee);
  }
  function p() {
    c.on(".drag", null);
  }
  return {
    update: f,
    destroy: p
  };
}
var La = { exports: {} }, Ia = {}, za = { exports: {} }, Ra = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Np;
function lx() {
  if (Np) return Ra;
  Np = 1;
  var t = Si();
  function r(y, m) {
    return y === m && (y !== 0 || 1 / y === 1 / m) || y !== y && m !== m;
  }
  var i = typeof Object.is == "function" ? Object.is : r, l = t.useState, u = t.useEffect, c = t.useLayoutEffect, f = t.useDebugValue;
  function p(y, m) {
    var x = m(), k = l({ inst: { value: x, getSnapshot: m } }), E = k[0].inst, N = k[1];
    return c(
      function() {
        E.value = x, E.getSnapshot = m, h(E) && N({ inst: E });
      },
      [y, x, m]
    ), u(
      function() {
        return h(E) && N({ inst: E }), y(function() {
          h(E) && N({ inst: E });
        });
      },
      [y]
    ), f(x), x;
  }
  function h(y) {
    var m = y.getSnapshot;
    y = y.value;
    try {
      var x = m();
      return !i(y, x);
    } catch {
      return !0;
    }
  }
  function v(y, m) {
    return m();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? v : p;
  return Ra.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : g, Ra;
}
var Cp;
function ux() {
  return Cp || (Cp = 1, za.exports = lx()), za.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mp;
function ax() {
  if (Mp) return Ia;
  Mp = 1;
  var t = Si(), r = ux();
  function i(v, g) {
    return v === g && (v !== 0 || 1 / v === 1 / g) || v !== v && g !== g;
  }
  var l = typeof Object.is == "function" ? Object.is : i, u = r.useSyncExternalStore, c = t.useRef, f = t.useEffect, p = t.useMemo, h = t.useDebugValue;
  return Ia.useSyncExternalStoreWithSelector = function(v, g, y, m, x) {
    var k = c(null);
    if (k.current === null) {
      var E = { hasValue: !1, value: null };
      k.current = E;
    } else E = k.current;
    k = p(
      function() {
        function M(H) {
          if (!R) {
            if (R = !0, S = H, H = m(H), x !== void 0 && E.hasValue) {
              var B = E.value;
              if (x(B, H))
                return P = B;
            }
            return P = H;
          }
          if (B = P, l(S, H)) return B;
          var V = m(H);
          return x !== void 0 && x(B, V) ? (S = H, B) : (S = H, P = V);
        }
        var R = !1, S, P, A = y === void 0 ? null : y;
        return [
          function() {
            return M(g());
          },
          A === null ? void 0 : function() {
            return M(A());
          }
        ];
      },
      [g, y, m, x]
    );
    var N = u(v, k[0], k[1]);
    return f(
      function() {
        E.hasValue = !0, E.value = N;
      },
      [N]
    ), h(N), N;
  }, Ia;
}
var Pp;
function cx() {
  return Pp || (Pp = 1, La.exports = ax()), La.exports;
}
var fx = cx();
const dx = /* @__PURE__ */ oh(fx), px = {}, Tp = (t) => {
  let r;
  const i = /* @__PURE__ */ new Set(), l = (g, y) => {
    const m = typeof g == "function" ? g(r) : g;
    if (!Object.is(m, r)) {
      const x = r;
      r = y ?? (typeof m != "object" || m === null) ? m : Object.assign({}, r, m), i.forEach((k) => k(r, x));
    }
  }, u = () => r, h = { setState: l, getState: u, getInitialState: () => v, subscribe: (g) => (i.add(g), () => i.delete(g)), destroy: () => {
    (px ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, v = r = t(l, u, h);
  return h;
}, hx = (t) => t ? Tp(t) : Tp, { useDebugValue: mx } = W, { useSyncExternalStoreWithSelector: gx } = dx, yx = (t) => t;
function am(t, r = yx, i) {
  const l = gx(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    r,
    i
  );
  return mx(l), l;
}
const Lp = (t, r) => {
  const i = hx(t), l = (u, c = r) => am(i, u, c);
  return Object.assign(l, i), l;
}, vx = (t, r) => t ? Lp(t, r) : Lp;
function Qe(t, r) {
  if (Object.is(t, r))
    return !0;
  if (typeof t != "object" || t === null || typeof r != "object" || r === null)
    return !1;
  if (t instanceof Map && r instanceof Map) {
    if (t.size !== r.size) return !1;
    for (const [l, u] of t)
      if (!Object.is(u, r.get(l)))
        return !1;
    return !0;
  }
  if (t instanceof Set && r instanceof Set) {
    if (t.size !== r.size) return !1;
    for (const l of t)
      if (!r.has(l))
        return !1;
    return !0;
  }
  const i = Object.keys(t);
  if (i.length !== Object.keys(r).length)
    return !1;
  for (const l of i)
    if (!Object.prototype.hasOwnProperty.call(r, l) || !Object.is(t[l], r[l]))
      return !1;
  return !0;
}
const kl = G.createContext(null), wx = kl.Provider, cm = gn.error001();
function Ie(t, r) {
  const i = G.useContext(kl);
  if (i === null)
    throw new Error(cm);
  return am(i, t, r);
}
function We() {
  const t = G.useContext(kl);
  if (t === null)
    throw new Error(cm);
  return G.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const Ip = { display: "none" }, xx = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, fm = "react-flow__node-desc", dm = "react-flow__edge-desc", Sx = "react-flow__aria-live", Ex = (t) => t.ariaLiveMessage, _x = (t) => t.ariaLabelConfig;
function kx({ rfId: t }) {
  const r = Ie(Ex);
  return q.jsx("div", { id: `${Sx}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: xx, children: r });
}
function Nx({ rfId: t, disableKeyboardA11y: r }) {
  const i = Ie(_x);
  return q.jsxs(q.Fragment, { children: [q.jsx("div", { id: `${fm}-${t}`, style: Ip, children: r ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), q.jsx("div", { id: `${dm}-${t}`, style: Ip, children: i["edge.a11yDescription.default"] }), !r && q.jsx(kx, { rfId: t })] });
}
const Nl = G.forwardRef(({ position: t = "top-left", children: r, className: i, style: l, ...u }, c) => {
  const f = `${t}`.split("-");
  return q.jsx("div", { className: rt(["react-flow__panel", i, ...f]), style: l, ref: c, ...u, children: r });
});
Nl.displayName = "Panel";
function Cx({ proOptions: t, position: r = "bottom-right" }) {
  return t != null && t.hideAttribution ? null : q.jsx(Nl, { position: r, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: q.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const Mx = (t) => {
  const r = [], i = [];
  for (const [, l] of t.nodeLookup)
    l.selected && r.push(l.internals.userNode);
  for (const [, l] of t.edgeLookup)
    l.selected && i.push(l);
  return { selectedNodes: r, selectedEdges: i };
}, Qs = (t) => t.id;
function Px(t, r) {
  return Qe(t.selectedNodes.map(Qs), r.selectedNodes.map(Qs)) && Qe(t.selectedEdges.map(Qs), r.selectedEdges.map(Qs));
}
function Tx({ onSelectionChange: t }) {
  const r = We(), { selectedNodes: i, selectedEdges: l } = Ie(Mx, Px);
  return G.useEffect(() => {
    const u = { nodes: i, edges: l };
    t == null || t(u), r.getState().onSelectionChangeHandlers.forEach((c) => c(u));
  }, [i, l, t]), null;
}
const Lx = (t) => !!t.onSelectionChangeHandlers;
function Ix({ onSelectionChange: t }) {
  const r = Ie(Lx);
  return t || r ? q.jsx(Tx, { onSelectionChange: t }) : null;
}
const pm = [0, 0], zx = { x: 0, y: 0, zoom: 1 }, Rx = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "paneClickDistance",
  "ariaLabelConfig"
], zp = [...Rx, "rfId"], Ax = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges,
  setPaneClickDistance: t.setPaneClickDistance
}), Rp = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: mi,
  nodeOrigin: pm,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1",
  paneClickDistance: 0
};
function $x(t) {
  const { setNodes: r, setEdges: i, setMinZoom: l, setMaxZoom: u, setTranslateExtent: c, setNodeExtent: f, reset: p, setDefaultNodesAndEdges: h, setPaneClickDistance: v } = Ie(Ax, Qe), g = We();
  G.useEffect(() => (h(t.defaultNodes, t.defaultEdges), () => {
    y.current = Rp, p();
  }), []);
  const y = G.useRef(Rp);
  return G.useEffect(
    () => {
      for (const m of zp) {
        const x = t[m], k = y.current[m];
        x !== k && (typeof t[m] > "u" || (m === "nodes" ? r(x) : m === "edges" ? i(x) : m === "minZoom" ? l(x) : m === "maxZoom" ? u(x) : m === "translateExtent" ? c(x) : m === "nodeExtent" ? f(x) : m === "paneClickDistance" ? v(x) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: w1(x) }) : m === "fitView" ? g.setState({ fitViewQueued: x }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: x }) : g.setState({ [m]: x })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    zp.map((m) => t[m])
  ), null;
}
function Ap() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function Dx(t) {
  var l;
  const [r, i] = G.useState(t === "system" ? null : t);
  return G.useEffect(() => {
    if (t !== "system") {
      i(t);
      return;
    }
    const u = Ap(), c = () => i(u != null && u.matches ? "dark" : "light");
    return c(), u == null || u.addEventListener("change", c), () => {
      u == null || u.removeEventListener("change", c);
    };
  }, [t]), r !== null ? r : (l = Ap()) != null && l.matches ? "dark" : "light";
}
const $p = typeof document < "u" ? document : null;
function xi(t = null, r = { target: $p, actInsideInputWithModifier: !0 }) {
  const [i, l] = G.useState(!1), u = G.useRef(!1), c = G.useRef(/* @__PURE__ */ new Set([])), [f, p] = G.useMemo(() => {
    if (t !== null) {
      const v = (Array.isArray(t) ? t : [t]).filter((y) => typeof y == "string").map((y) => y.replace("+", `
`).replace(`

`, `
+`).split(`
`)), g = v.reduce((y, m) => y.concat(...m), []);
      return [v, g];
    }
    return [[], []];
  }, [t]);
  return G.useEffect(() => {
    const h = (r == null ? void 0 : r.target) ?? $p, v = (r == null ? void 0 : r.actInsideInputWithModifier) ?? !0;
    if (t !== null) {
      const g = (x) => {
        var N, M;
        if (u.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!u.current || u.current && !v) && Kh(x))
          return !1;
        const E = Op(x.code, p);
        if (c.current.add(x[E]), Dp(f, c.current, !1)) {
          const R = ((M = (N = x.composedPath) == null ? void 0 : N.call(x)) == null ? void 0 : M[0]) || x.target, S = (R == null ? void 0 : R.nodeName) === "BUTTON" || (R == null ? void 0 : R.nodeName) === "A";
          r.preventDefault !== !1 && (u.current || !S) && x.preventDefault(), l(!0);
        }
      }, y = (x) => {
        const k = Op(x.code, p);
        Dp(f, c.current, !0) ? (l(!1), c.current.clear()) : c.current.delete(x[k]), x.key === "Meta" && c.current.clear(), u.current = !1;
      }, m = () => {
        c.current.clear(), l(!1);
      };
      return h == null || h.addEventListener("keydown", g), h == null || h.addEventListener("keyup", y), window.addEventListener("blur", m), window.addEventListener("contextmenu", m), () => {
        h == null || h.removeEventListener("keydown", g), h == null || h.removeEventListener("keyup", y), window.removeEventListener("blur", m), window.removeEventListener("contextmenu", m);
      };
    }
  }, [t, l]), i;
}
function Dp(t, r, i) {
  return t.filter((l) => i || l.length === r.size).some((l) => l.every((u) => r.has(u)));
}
function Op(t, r) {
  return r.includes(t) ? "code" : "key";
}
const Ox = () => {
  const t = We();
  return G.useMemo(() => ({
    zoomIn: (r) => {
      const { panZoom: i } = t.getState();
      return i ? i.scaleBy(1.2, { duration: r == null ? void 0 : r.duration }) : Promise.resolve(!1);
    },
    zoomOut: (r) => {
      const { panZoom: i } = t.getState();
      return i ? i.scaleBy(1 / 1.2, { duration: r == null ? void 0 : r.duration }) : Promise.resolve(!1);
    },
    zoomTo: (r, i) => {
      const { panZoom: l } = t.getState();
      return l ? l.scaleTo(r, { duration: i == null ? void 0 : i.duration }) : Promise.resolve(!1);
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (r, i) => {
      const { transform: [l, u, c], panZoom: f } = t.getState();
      return f ? (await f.setViewport({
        x: r.x ?? l,
        y: r.y ?? u,
        zoom: r.zoom ?? c
      }, i), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    getViewport: () => {
      const [r, i, l] = t.getState().transform;
      return { x: r, y: i, zoom: l };
    },
    setCenter: async (r, i, l) => t.getState().setCenter(r, i, l),
    fitBounds: async (r, i) => {
      const { width: l, height: u, minZoom: c, maxZoom: f, panZoom: p } = t.getState(), h = sc(r, l, u, c, f, (i == null ? void 0 : i.padding) ?? 0.1);
      return p ? (await p.setViewport(h, {
        duration: i == null ? void 0 : i.duration,
        ease: i == null ? void 0 : i.ease,
        interpolate: i == null ? void 0 : i.interpolate
      }), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    screenToFlowPosition: (r, i = {}) => {
      const { transform: l, snapGrid: u, snapToGrid: c, domNode: f } = t.getState();
      if (!f)
        return r;
      const { x: p, y: h } = f.getBoundingClientRect(), v = {
        x: r.x - p,
        y: r.y - h
      }, g = i.snapGrid ?? u, y = i.snapToGrid ?? c;
      return Ci(v, l, y, g);
    },
    flowToScreenPosition: (r) => {
      const { transform: i, domNode: l } = t.getState();
      if (!l)
        return r;
      const { x: u, y: c } = l.getBoundingClientRect(), f = dl(r, i);
      return {
        x: f.x + u,
        y: f.y + c
      };
    }
  }), []);
};
function hm(t, r) {
  const i = [], l = /* @__PURE__ */ new Map(), u = [];
  for (const c of t)
    if (c.type === "add") {
      u.push(c);
      continue;
    } else if (c.type === "remove" || c.type === "replace")
      l.set(c.id, [c]);
    else {
      const f = l.get(c.id);
      f ? f.push(c) : l.set(c.id, [c]);
    }
  for (const c of r) {
    const f = l.get(c.id);
    if (!f) {
      i.push(c);
      continue;
    }
    if (f[0].type === "remove")
      continue;
    if (f[0].type === "replace") {
      i.push({ ...f[0].item });
      continue;
    }
    const p = { ...c };
    for (const h of f)
      Fx(h, p);
    i.push(p);
  }
  return u.length && u.forEach((c) => {
    c.index !== void 0 ? i.splice(c.index, 0, { ...c.item }) : i.push({ ...c.item });
  }), i;
}
function Fx(t, r) {
  switch (t.type) {
    case "select": {
      r.selected = t.selected;
      break;
    }
    case "position": {
      typeof t.position < "u" && (r.position = t.position), typeof t.dragging < "u" && (r.dragging = t.dragging);
      break;
    }
    case "dimensions": {
      typeof t.dimensions < "u" && (r.measured ?? (r.measured = {}), r.measured.width = t.dimensions.width, r.measured.height = t.dimensions.height, t.setAttributes && ((t.setAttributes === !0 || t.setAttributes === "width") && (r.width = t.dimensions.width), (t.setAttributes === !0 || t.setAttributes === "height") && (r.height = t.dimensions.height))), typeof t.resizing == "boolean" && (r.resizing = t.resizing);
      break;
    }
  }
}
function jx(t, r) {
  return hm(t, r);
}
function Hx(t, r) {
  return hm(t, r);
}
function _r(t, r) {
  return {
    id: t,
    type: "select",
    selected: r
  };
}
function so(t, r = /* @__PURE__ */ new Set(), i = !1) {
  const l = [];
  for (const [u, c] of t) {
    const f = r.has(u);
    !(c.selected === void 0 && !f) && c.selected !== f && (i && (c.selected = f), l.push(_r(c.id, f)));
  }
  return l;
}
function Fp({ items: t = [], lookup: r }) {
  var u;
  const i = [], l = new Map(t.map((c) => [c.id, c]));
  for (const [c, f] of t.entries()) {
    const p = r.get(f.id), h = ((u = p == null ? void 0 : p.internals) == null ? void 0 : u.userNode) ?? p;
    h !== void 0 && h !== f && i.push({ id: f.id, item: f, type: "replace" }), h === void 0 && i.push({ item: f, type: "add", index: c });
  }
  for (const [c] of r)
    l.get(c) === void 0 && i.push({ id: c, type: "remove" });
  return i;
}
function jp(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const Hp = (t) => a1(t), bx = (t) => Hh(t);
function mm(t) {
  return G.forwardRef(t);
}
const Bx = typeof window < "u" ? G.useLayoutEffect : G.useEffect;
function bp(t) {
  const [r, i] = G.useState(BigInt(0)), [l] = G.useState(() => Vx(() => i((u) => u + BigInt(1))));
  return Bx(() => {
    const u = l.get();
    u.length && (t(u), l.reset());
  }, [r]), l;
}
function Vx(t) {
  let r = [];
  return {
    get: () => r,
    reset: () => {
      r = [];
    },
    push: (i) => {
      r.push(i), t();
    }
  };
}
const gm = G.createContext(null);
function Ux({ children: t }) {
  const r = We(), i = G.useCallback((p) => {
    const { nodes: h = [], setNodes: v, hasDefaultNodes: g, onNodesChange: y, nodeLookup: m, fitViewQueued: x } = r.getState();
    let k = h;
    for (const N of p)
      k = typeof N == "function" ? N(k) : N;
    const E = Fp({
      items: k,
      lookup: m
    });
    g && v(k), E.length > 0 ? y == null || y(E) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: N, nodes: M, setNodes: R } = r.getState();
      N && R(M);
    });
  }, []), l = bp(i), u = G.useCallback((p) => {
    const { edges: h = [], setEdges: v, hasDefaultEdges: g, onEdgesChange: y, edgeLookup: m } = r.getState();
    let x = h;
    for (const k of p)
      x = typeof k == "function" ? k(x) : k;
    g ? v(x) : y && y(Fp({
      items: x,
      lookup: m
    }));
  }, []), c = bp(u), f = G.useMemo(() => ({ nodeQueue: l, edgeQueue: c }), []);
  return q.jsx(gm.Provider, { value: f, children: t });
}
function Wx() {
  const t = G.useContext(gm);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const Yx = (t) => !!t.panZoom;
function pc() {
  const t = Ox(), r = We(), i = Wx(), l = Ie(Yx), u = G.useMemo(() => {
    const c = (y) => r.getState().nodeLookup.get(y), f = (y) => {
      i.nodeQueue.push(y);
    }, p = (y) => {
      i.edgeQueue.push(y);
    }, h = (y) => {
      var M, R;
      const { nodeLookup: m, nodeOrigin: x } = r.getState(), k = Hp(y) ? y : m.get(y.id), E = k.parentId ? Yh(k.position, k.measured, k.parentId, m, x) : k.position, N = {
        ...k,
        position: E,
        width: ((M = k.measured) == null ? void 0 : M.width) ?? k.width,
        height: ((R = k.measured) == null ? void 0 : R.height) ?? k.height
      };
      return ho(N);
    }, v = (y, m, x = { replace: !1 }) => {
      f((k) => k.map((E) => {
        if (E.id === y) {
          const N = typeof m == "function" ? m(E) : m;
          return x.replace && Hp(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    }, g = (y, m, x = { replace: !1 }) => {
      p((k) => k.map((E) => {
        if (E.id === y) {
          const N = typeof m == "function" ? m(E) : m;
          return x.replace && bx(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    };
    return {
      getNodes: () => r.getState().nodes.map((y) => ({ ...y })),
      getNode: (y) => {
        var m;
        return (m = c(y)) == null ? void 0 : m.internals.userNode;
      },
      getInternalNode: c,
      getEdges: () => {
        const { edges: y = [] } = r.getState();
        return y.map((m) => ({ ...m }));
      },
      getEdge: (y) => r.getState().edgeLookup.get(y),
      setNodes: f,
      setEdges: p,
      addNodes: (y) => {
        const m = Array.isArray(y) ? y : [y];
        i.nodeQueue.push((x) => [...x, ...m]);
      },
      addEdges: (y) => {
        const m = Array.isArray(y) ? y : [y];
        i.edgeQueue.push((x) => [...x, ...m]);
      },
      toObject: () => {
        const { nodes: y = [], edges: m = [], transform: x } = r.getState(), [k, E, N] = x;
        return {
          nodes: y.map((M) => ({ ...M })),
          edges: m.map((M) => ({ ...M })),
          viewport: {
            x: k,
            y: E,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: y = [], edges: m = [] }) => {
        const { nodes: x, edges: k, onNodesDelete: E, onEdgesDelete: N, triggerNodeChanges: M, triggerEdgeChanges: R, onDelete: S, onBeforeDelete: P } = r.getState(), { nodes: A, edges: H } = await h1({
          nodesToRemove: y,
          edgesToRemove: m,
          nodes: x,
          edges: k,
          onBeforeDelete: P
        }), B = H.length > 0, V = A.length > 0;
        if (B) {
          const ee = H.map(jp);
          N == null || N(H), R(ee);
        }
        if (V) {
          const ee = A.map(jp);
          E == null || E(A), M(ee);
        }
        return (V || B) && (S == null || S({ nodes: A, edges: H })), { deletedNodes: A, deletedEdges: H };
      },
      getIntersectingNodes: (y, m = !0, x) => {
        const k = pp(y), E = k ? y : h(y), N = x !== void 0;
        return E ? (x || r.getState().nodes).filter((M) => {
          const R = r.getState().nodeLookup.get(M.id);
          if (R && !k && (M.id === y.id || !R.internals.positionAbsolute))
            return !1;
          const S = ho(N ? M : R), P = vi(S, E);
          return m && P > 0 || P >= E.width * E.height;
        }) : [];
      },
      isNodeIntersecting: (y, m, x = !0) => {
        const E = pp(y) ? y : h(y);
        if (!E)
          return !1;
        const N = vi(E, m);
        return x && N > 0 || N >= E.width * E.height;
      },
      updateNode: v,
      updateNodeData: (y, m, x = { replace: !1 }) => {
        v(y, (k) => {
          const E = typeof m == "function" ? m(k) : m;
          return x.replace ? { ...k, data: E } : { ...k, data: { ...k.data, ...E } };
        }, x);
      },
      updateEdge: g,
      updateEdgeData: (y, m, x = { replace: !1 }) => {
        g(y, (k) => {
          const E = typeof m == "function" ? m(k) : m;
          return x.replace ? { ...k, data: E } : { ...k, data: { ...k.data, ...E } };
        }, x);
      },
      getNodesBounds: (y) => {
        const { nodeLookup: m, nodeOrigin: x } = r.getState();
        return c1(y, { nodeLookup: m, nodeOrigin: x });
      },
      getHandleConnections: ({ type: y, id: m, nodeId: x }) => {
        var k;
        return Array.from(((k = r.getState().connectionLookup.get(`${x}-${y}${m ? `-${m}` : ""}`)) == null ? void 0 : k.values()) ?? []);
      },
      getNodeConnections: ({ type: y, handleId: m, nodeId: x }) => {
        var k;
        return Array.from(((k = r.getState().connectionLookup.get(`${x}${y ? m ? `-${y}-${m}` : `-${y}` : ""}`)) == null ? void 0 : k.values()) ?? []);
      },
      fitView: async (y) => {
        const m = r.getState().fitViewResolver ?? v1();
        return r.setState({ fitViewQueued: !0, fitViewOptions: y, fitViewResolver: m }), i.nodeQueue.push((x) => [...x]), m.promise;
      }
    };
  }, []);
  return G.useMemo(() => ({
    ...u,
    ...t,
    viewportInitialized: l
  }), [l]);
}
const Bp = (t) => t.selected, Xx = typeof window < "u" ? window : void 0;
function Kx({ deleteKeyCode: t, multiSelectionKeyCode: r }) {
  const i = We(), { deleteElements: l } = pc(), u = xi(t, { actInsideInputWithModifier: !1 }), c = xi(r, { target: Xx });
  G.useEffect(() => {
    if (u) {
      const { edges: f, nodes: p } = i.getState();
      l({ nodes: p.filter(Bp), edges: f.filter(Bp) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [u]), G.useEffect(() => {
    i.setState({ multiSelectionActive: c });
  }, [c]);
}
function Qx(t) {
  const r = We();
  G.useEffect(() => {
    const i = () => {
      var u, c;
      if (!t.current)
        return !1;
      const l = lc(t.current);
      (l.height === 0 || l.width === 0) && ((c = (u = r.getState()).onError) == null || c.call(u, "004", gn.error004())), r.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (t.current) {
      i(), window.addEventListener("resize", i);
      const l = new ResizeObserver(() => i());
      return l.observe(t.current), () => {
        window.removeEventListener("resize", i), l && t.current && l.unobserve(t.current);
      };
    }
  }, []);
}
const Cl = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Gx = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib
});
function qx({ onPaneContextMenu: t, zoomOnScroll: r = !0, zoomOnPinch: i = !0, panOnScroll: l = !1, panOnScrollSpeed: u = 0.5, panOnScrollMode: c = Cr.Free, zoomOnDoubleClick: f = !0, panOnDrag: p = !0, defaultViewport: h, translateExtent: v, minZoom: g, maxZoom: y, zoomActivationKeyCode: m, preventScrolling: x = !0, children: k, noWheelClassName: E, noPanClassName: N, onViewportChange: M, isControlledViewport: R, paneClickDistance: S }) {
  const P = We(), A = G.useRef(null), { userSelectionActive: H, lib: B } = Ie(Gx, Qe), V = xi(m), ee = G.useRef();
  Qx(A);
  const oe = G.useCallback((Z) => {
    M == null || M({ x: Z[0], y: Z[1], zoom: Z[2] }), R || P.setState({ transform: Z });
  }, [M, R]);
  return G.useEffect(() => {
    if (A.current) {
      ee.current = J1({
        domNode: A.current,
        minZoom: g,
        maxZoom: y,
        translateExtent: v,
        viewport: h,
        paneClickDistance: S,
        onDraggingChange: (C) => P.setState({ paneDragging: C }),
        onPanZoomStart: (C, b) => {
          const { onViewportChangeStart: D, onMoveStart: j } = P.getState();
          j == null || j(C, b), D == null || D(b);
        },
        onPanZoom: (C, b) => {
          const { onViewportChange: D, onMove: j } = P.getState();
          j == null || j(C, b), D == null || D(b);
        },
        onPanZoomEnd: (C, b) => {
          const { onViewportChangeEnd: D, onMoveEnd: j } = P.getState();
          j == null || j(C, b), D == null || D(b);
        }
      });
      const { x: Z, y: te, zoom: J } = ee.current.getViewport();
      return P.setState({
        panZoom: ee.current,
        transform: [Z, te, J],
        domNode: A.current.closest(".react-flow")
      }), () => {
        var C;
        (C = ee.current) == null || C.destroy();
      };
    }
  }, []), G.useEffect(() => {
    var Z;
    (Z = ee.current) == null || Z.update({
      onPaneContextMenu: t,
      zoomOnScroll: r,
      zoomOnPinch: i,
      panOnScroll: l,
      panOnScrollSpeed: u,
      panOnScrollMode: c,
      zoomOnDoubleClick: f,
      panOnDrag: p,
      zoomActivationKeyPressed: V,
      preventScrolling: x,
      noPanClassName: N,
      userSelectionActive: H,
      noWheelClassName: E,
      lib: B,
      onTransformChange: oe
    });
  }, [
    t,
    r,
    i,
    l,
    u,
    c,
    f,
    p,
    V,
    x,
    N,
    H,
    E,
    B,
    oe
  ]), q.jsx("div", { className: "react-flow__renderer", ref: A, style: Cl, children: k });
}
const Zx = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function Jx() {
  const { userSelectionActive: t, userSelectionRect: r } = Ie(Zx, Qe);
  return t && r ? q.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: r.width,
    height: r.height,
    transform: `translate(${r.x}px, ${r.y}px)`
  } }) : null;
}
const Aa = (t, r) => (i) => {
  i.target === r.current && (t == null || t(i));
}, eS = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging
});
function tS({ isSelecting: t, selectionKeyPressed: r, selectionMode: i = gi.Full, panOnDrag: l, selectionOnDrag: u, onSelectionStart: c, onSelectionEnd: f, onPaneClick: p, onPaneContextMenu: h, onPaneScroll: v, onPaneMouseEnter: g, onPaneMouseMove: y, onPaneMouseLeave: m, children: x }) {
  const k = We(), { userSelectionActive: E, elementsSelectable: N, dragging: M, connectionInProgress: R } = Ie(eS, Qe), S = N && (t || E), P = G.useRef(null), A = G.useRef(), H = G.useRef(/* @__PURE__ */ new Set()), B = G.useRef(/* @__PURE__ */ new Set()), V = G.useRef(!1), ee = G.useRef(!1), oe = (j) => {
    if (V.current || R) {
      V.current = !1;
      return;
    }
    p == null || p(j), k.getState().resetSelectedElements(), k.setState({ nodesSelectionActive: !1 });
  }, Z = (j) => {
    if (Array.isArray(l) && (l != null && l.includes(2))) {
      j.preventDefault();
      return;
    }
    h == null || h(j);
  }, te = v ? (j) => v(j) : void 0, J = (j) => {
    var F, K;
    const { resetSelectedElements: z, domNode: L } = k.getState();
    if (A.current = L == null ? void 0 : L.getBoundingClientRect(), !N || !t || j.button !== 0 || j.target !== P.current || !A.current)
      return;
    (K = (F = j.target) == null ? void 0 : F.setPointerCapture) == null || K.call(F, j.pointerId), ee.current = !0, V.current = !1;
    const { x: O, y: _ } = hn(j.nativeEvent, A.current);
    z(), k.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: O,
        startY: _,
        x: O,
        y: _
      }
    }), c == null || c(j);
  }, C = (j) => {
    const { userSelectionRect: z, transform: L, nodeLookup: O, edgeLookup: _, connectionLookup: F, triggerNodeChanges: K, triggerEdgeChanges: Y, defaultEdgeOptions: ue } = k.getState();
    if (!A.current || !z)
      return;
    V.current = !0;
    const { x: ce, y: fe } = hn(j.nativeEvent, A.current), { startX: se, startY: de } = z, Ne = {
      startX: se,
      startY: de,
      x: ce < se ? ce : se,
      y: fe < de ? fe : de,
      width: Math.abs(ce - se),
      height: Math.abs(fe - de)
    }, Pe = H.current, Se = B.current;
    H.current = new Set(ic(O, Ne, L, i === gi.Partial, !0).map((xe) => xe.id)), B.current = /* @__PURE__ */ new Set();
    const Ee = (ue == null ? void 0 : ue.selectable) ?? !0;
    for (const xe of H.current) {
      const Ae = F.get(xe);
      if (Ae)
        for (const { edgeId: Oe } of Ae.values()) {
          const vt = _.get(Oe);
          vt && (vt.selectable ?? Ee) && B.current.add(Oe);
        }
    }
    if (!hp(Pe, H.current)) {
      const xe = so(O, H.current, !0);
      K(xe);
    }
    if (!hp(Se, B.current)) {
      const xe = so(_, B.current);
      Y(xe);
    }
    k.setState({
      userSelectionRect: Ne,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }, b = (j) => {
    var L, O;
    if (j.button !== 0 || !ee.current)
      return;
    (O = (L = j.target) == null ? void 0 : L.releasePointerCapture) == null || O.call(L, j.pointerId);
    const { userSelectionRect: z } = k.getState();
    !E && z && j.target === P.current && (oe == null || oe(j)), k.setState({
      userSelectionActive: !1,
      userSelectionRect: null,
      nodesSelectionActive: H.current.size > 0
    }), f == null || f(j), (r || u) && (V.current = !1), ee.current = !1;
  }, D = l === !0 || Array.isArray(l) && l.includes(0);
  return q.jsxs("div", { className: rt(["react-flow__pane", { draggable: D, dragging: M, selection: t }]), onClick: S ? void 0 : Aa(oe, P), onContextMenu: Aa(Z, P), onWheel: Aa(te, P), onPointerEnter: S ? void 0 : g, onPointerDown: S ? J : y, onPointerMove: S ? C : y, onPointerUp: S ? b : void 0, onPointerLeave: m, ref: P, style: Cl, children: [x, q.jsx(Jx, {})] });
}
function Qa({ id: t, store: r, unselect: i = !1, nodeRef: l }) {
  const { addSelectedNodes: u, unselectNodesAndEdges: c, multiSelectionActive: f, nodeLookup: p, onError: h } = r.getState(), v = p.get(t);
  if (!v) {
    h == null || h("012", gn.error012(t));
    return;
  }
  r.setState({ nodesSelectionActive: !1 }), v.selected ? (i || v.selected && f) && (c({ nodes: [v], edges: [] }), requestAnimationFrame(() => {
    var g;
    return (g = l == null ? void 0 : l.current) == null ? void 0 : g.blur();
  })) : u([t]);
}
function ym({ nodeRef: t, disabled: r = !1, noDragClassName: i, handleSelector: l, nodeId: u, isSelectable: c, nodeClickDistance: f }) {
  const p = We(), [h, v] = G.useState(!1), g = G.useRef();
  return G.useEffect(() => {
    g.current = F1({
      getStoreItems: () => p.getState(),
      onNodeMouseDown: (y) => {
        Qa({
          id: y,
          store: p,
          nodeRef: t
        });
      },
      onDragStart: () => {
        v(!0);
      },
      onDragStop: () => {
        v(!1);
      }
    });
  }, []), G.useEffect(() => {
    var y, m;
    if (r)
      (y = g.current) == null || y.destroy();
    else if (t.current)
      return (m = g.current) == null || m.update({
        noDragClassName: i,
        handleSelector: l,
        domNode: t.current,
        isSelectable: c,
        nodeId: u,
        nodeClickDistance: f
      }), () => {
        var x;
        (x = g.current) == null || x.destroy();
      };
  }, [i, l, r, c, t, u]), h;
}
const nS = (t) => (r) => r.selected && (r.draggable || t && typeof r.draggable > "u");
function vm() {
  const t = We();
  return G.useCallback((i) => {
    const { nodeExtent: l, snapToGrid: u, snapGrid: c, nodesDraggable: f, onError: p, updateNodePositions: h, nodeLookup: v, nodeOrigin: g } = t.getState(), y = /* @__PURE__ */ new Map(), m = nS(f), x = u ? c[0] : 5, k = u ? c[1] : 5, E = i.direction.x * x * i.factor, N = i.direction.y * k * i.factor;
    for (const [, M] of v) {
      if (!m(M))
        continue;
      let R = {
        x: M.internals.positionAbsolute.x + E,
        y: M.internals.positionAbsolute.y + N
      };
      u && (R = El(R, c));
      const { position: S, positionAbsolute: P } = bh({
        nodeId: M.id,
        nextPosition: R,
        nodeLookup: v,
        nodeExtent: l,
        nodeOrigin: g,
        onError: p
      });
      M.position = S, M.internals.positionAbsolute = P, y.set(M.id, M);
    }
    h(y);
  }, []);
}
const hc = G.createContext(null), rS = hc.Provider;
hc.Consumer;
const wm = () => G.useContext(hc), oS = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), iS = (t, r, i) => (l) => {
  const { connectionClickStartHandle: u, connectionMode: c, connection: f } = l, { fromHandle: p, toHandle: h, isValid: v } = f, g = (h == null ? void 0 : h.nodeId) === t && (h == null ? void 0 : h.id) === r && (h == null ? void 0 : h.type) === i;
  return {
    connectingFrom: (p == null ? void 0 : p.nodeId) === t && (p == null ? void 0 : p.id) === r && (p == null ? void 0 : p.type) === i,
    connectingTo: g,
    clickConnecting: (u == null ? void 0 : u.nodeId) === t && (u == null ? void 0 : u.id) === r && (u == null ? void 0 : u.type) === i,
    isPossibleEndHandle: c === fo.Strict ? (p == null ? void 0 : p.type) !== i : t !== (p == null ? void 0 : p.nodeId) || r !== (p == null ? void 0 : p.id),
    connectionInProcess: !!p,
    clickConnectionInProcess: !!u,
    valid: g && v
  };
};
function sS({ type: t = "source", position: r = we.Top, isValidConnection: i, isConnectable: l = !0, isConnectableStart: u = !0, isConnectableEnd: c = !0, id: f, onConnect: p, children: h, className: v, onMouseDown: g, onTouchStart: y, ...m }, x) {
  var b, D;
  const k = f || null, E = t === "target", N = We(), M = wm(), { connectOnClick: R, noPanClassName: S, rfId: P } = Ie(oS, Qe), { connectingFrom: A, connectingTo: H, clickConnecting: B, isPossibleEndHandle: V, connectionInProcess: ee, clickConnectionInProcess: oe, valid: Z } = Ie(iS(M, k, t), Qe);
  M || (D = (b = N.getState()).onError) == null || D.call(b, "010", gn.error010());
  const te = (j) => {
    const { defaultEdgeOptions: z, onConnect: L, hasDefaultEdges: O } = N.getState(), _ = {
      ...z,
      ...j
    };
    if (O) {
      const { edges: F, setEdges: K } = N.getState();
      K(N1(_, F));
    }
    L == null || L(_), p == null || p(_);
  }, J = (j) => {
    if (!M)
      return;
    const z = Qh(j.nativeEvent);
    if (u && (z && j.button === 0 || !z)) {
      const L = N.getState();
      Ka.onPointerDown(j.nativeEvent, {
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: E,
        handleId: k,
        nodeId: M,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: L.onConnectEnd,
        updateConnection: L.updateConnection,
        onConnect: te,
        isValidConnection: i || L.isValidConnection,
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    z ? g == null || g(j) : y == null || y(j);
  }, C = (j) => {
    const { onClickConnectStart: z, onClickConnectEnd: L, connectionClickStartHandle: O, connectionMode: _, isValidConnection: F, lib: K, rfId: Y, nodeLookup: ue, connection: ce } = N.getState();
    if (!M || !O && !u)
      return;
    if (!O) {
      z == null || z(j.nativeEvent, { nodeId: M, handleId: k, handleType: t }), N.setState({ connectionClickStartHandle: { nodeId: M, type: t, id: k } });
      return;
    }
    const fe = Xh(j.target), se = i || F, { connection: de, isValid: Ne } = Ka.isValid(j.nativeEvent, {
      handle: {
        nodeId: M,
        id: k,
        type: t
      },
      connectionMode: _,
      fromNodeId: O.nodeId,
      fromHandleId: O.id || null,
      fromType: O.type,
      isValidConnection: se,
      flowId: Y,
      doc: fe,
      lib: K,
      nodeLookup: ue
    });
    Ne && de && te(de);
    const Pe = structuredClone(ce);
    delete Pe.inProgress, Pe.toPosition = Pe.toHandle ? Pe.toHandle.position : null, L == null || L(j, Pe), N.setState({ connectionClickStartHandle: null });
  };
  return q.jsx("div", { "data-handleid": k, "data-nodeid": M, "data-handlepos": r, "data-id": `${P}-${M}-${k}-${t}`, className: rt([
    "react-flow__handle",
    `react-flow__handle-${r}`,
    "nodrag",
    S,
    v,
    {
      source: !E,
      target: E,
      connectable: l,
      connectablestart: u,
      connectableend: c,
      clickconnecting: B,
      connectingfrom: A,
      connectingto: H,
      valid: Z,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!ee || V) && (ee || oe ? c : u)
    }
  ]), onMouseDown: J, onTouchStart: J, onClick: R ? C : void 0, ref: x, ...m, children: h });
}
const yo = G.memo(mm(sS));
function lS({ data: t, isConnectable: r, sourcePosition: i = we.Bottom }) {
  return q.jsxs(q.Fragment, { children: [t == null ? void 0 : t.label, q.jsx(yo, { type: "source", position: i, isConnectable: r })] });
}
function uS({ data: t, isConnectable: r, targetPosition: i = we.Top, sourcePosition: l = we.Bottom }) {
  return q.jsxs(q.Fragment, { children: [q.jsx(yo, { type: "target", position: i, isConnectable: r }), t == null ? void 0 : t.label, q.jsx(yo, { type: "source", position: l, isConnectable: r })] });
}
function aS() {
  return null;
}
function cS({ data: t, isConnectable: r, targetPosition: i = we.Top }) {
  return q.jsxs(q.Fragment, { children: [q.jsx(yo, { type: "target", position: i, isConnectable: r }), t == null ? void 0 : t.label] });
}
const hl = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Vp = {
  input: lS,
  default: uS,
  output: cS,
  group: aS
};
function fS(t) {
  var r, i, l, u;
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? ((r = t.style) == null ? void 0 : r.width),
    height: t.height ?? t.initialHeight ?? ((i = t.style) == null ? void 0 : i.height)
  } : {
    width: t.width ?? ((l = t.style) == null ? void 0 : l.width),
    height: t.height ?? ((u = t.style) == null ? void 0 : u.height)
  };
}
const dS = (t) => {
  const { width: r, height: i, x: l, y: u } = Ni(t.nodeLookup, {
    filter: (c) => !!c.selected
  });
  return {
    width: nn(r) ? r : null,
    height: nn(i) ? i : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${l}px,${u}px)`
  };
};
function pS({ onSelectionContextMenu: t, noPanClassName: r, disableKeyboardA11y: i }) {
  const l = We(), { width: u, height: c, transformString: f, userSelectionActive: p } = Ie(dS, Qe), h = vm(), v = G.useRef(null);
  if (G.useEffect(() => {
    var m;
    i || (m = v.current) == null || m.focus({
      preventScroll: !0
    });
  }, [i]), ym({
    nodeRef: v
  }), p || !u || !c)
    return null;
  const g = t ? (m) => {
    const x = l.getState().nodes.filter((k) => k.selected);
    t(m, x);
  } : void 0, y = (m) => {
    Object.prototype.hasOwnProperty.call(hl, m.key) && (m.preventDefault(), h({
      direction: hl[m.key],
      factor: m.shiftKey ? 4 : 1
    }));
  };
  return q.jsx("div", { className: rt(["react-flow__nodesselection", "react-flow__container", r]), style: {
    transform: f
  }, children: q.jsx("div", { ref: v, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: i ? void 0 : -1, onKeyDown: i ? void 0 : y, style: {
    width: u,
    height: c
  } }) });
}
const Up = typeof window < "u" ? window : void 0, hS = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function xm({ children: t, onPaneClick: r, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: u, onPaneContextMenu: c, onPaneScroll: f, paneClickDistance: p, deleteKeyCode: h, selectionKeyCode: v, selectionOnDrag: g, selectionMode: y, onSelectionStart: m, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: E, zoomActivationKeyCode: N, elementsSelectable: M, zoomOnScroll: R, zoomOnPinch: S, panOnScroll: P, panOnScrollSpeed: A, panOnScrollMode: H, zoomOnDoubleClick: B, panOnDrag: V, defaultViewport: ee, translateExtent: oe, minZoom: Z, maxZoom: te, preventScrolling: J, onSelectionContextMenu: C, noWheelClassName: b, noPanClassName: D, disableKeyboardA11y: j, onViewportChange: z, isControlledViewport: L }) {
  const { nodesSelectionActive: O, userSelectionActive: _ } = Ie(hS), F = xi(v, { target: Up }), K = xi(E, { target: Up }), Y = K || V, ue = K || P, ce = g && Y !== !0, fe = F || _ || ce;
  return Kx({ deleteKeyCode: h, multiSelectionKeyCode: k }), q.jsx(qx, { onPaneContextMenu: c, elementsSelectable: M, zoomOnScroll: R, zoomOnPinch: S, panOnScroll: ue, panOnScrollSpeed: A, panOnScrollMode: H, zoomOnDoubleClick: B, panOnDrag: !F && Y, defaultViewport: ee, translateExtent: oe, minZoom: Z, maxZoom: te, zoomActivationKeyCode: N, preventScrolling: J, noWheelClassName: b, noPanClassName: D, onViewportChange: z, isControlledViewport: L, paneClickDistance: p, children: q.jsxs(tS, { onSelectionStart: m, onSelectionEnd: x, onPaneClick: r, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: u, onPaneContextMenu: c, onPaneScroll: f, panOnDrag: Y, isSelecting: !!fe, selectionMode: y, selectionKeyPressed: F, selectionOnDrag: ce, children: [t, O && q.jsx(pS, { onSelectionContextMenu: C, noPanClassName: D, disableKeyboardA11y: j })] }) });
}
xm.displayName = "FlowRenderer";
const mS = G.memo(xm), gS = (t) => (r) => t ? ic(r.nodeLookup, { x: 0, y: 0, width: r.width, height: r.height }, r.transform, !0).map((i) => i.id) : Array.from(r.nodeLookup.keys());
function yS(t) {
  return Ie(G.useCallback(gS(t), [t]), Qe);
}
const vS = (t) => t.updateNodeInternals;
function wS() {
  const t = Ie(vS), [r] = G.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
    const l = /* @__PURE__ */ new Map();
    i.forEach((u) => {
      const c = u.target.getAttribute("data-id");
      l.set(c, {
        id: c,
        nodeElement: u.target,
        force: !0
      });
    }), t(l);
  }));
  return G.useEffect(() => () => {
    r == null || r.disconnect();
  }, [r]), r;
}
function xS({ node: t, nodeType: r, hasDimensions: i, resizeObserver: l }) {
  const u = We(), c = G.useRef(null), f = G.useRef(null), p = G.useRef(t.sourcePosition), h = G.useRef(t.targetPosition), v = G.useRef(r), g = i && !!t.internals.handleBounds;
  return G.useEffect(() => {
    c.current && !t.hidden && (!g || f.current !== c.current) && (f.current && (l == null || l.unobserve(f.current)), l == null || l.observe(c.current), f.current = c.current);
  }, [g, t.hidden]), G.useEffect(() => () => {
    f.current && (l == null || l.unobserve(f.current), f.current = null);
  }, []), G.useEffect(() => {
    if (c.current) {
      const y = v.current !== r, m = p.current !== t.sourcePosition, x = h.current !== t.targetPosition;
      (y || m || x) && (v.current = r, p.current = t.sourcePosition, h.current = t.targetPosition, u.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: c.current, force: !0 }]])));
    }
  }, [t.id, r, t.sourcePosition, t.targetPosition]), c;
}
function SS({ id: t, onClick: r, onMouseEnter: i, onMouseMove: l, onMouseLeave: u, onContextMenu: c, onDoubleClick: f, nodesDraggable: p, elementsSelectable: h, nodesConnectable: v, nodesFocusable: g, resizeObserver: y, noDragClassName: m, noPanClassName: x, disableKeyboardA11y: k, rfId: E, nodeTypes: N, nodeClickDistance: M, onError: R }) {
  const { node: S, internals: P, isParent: A } = Ie((se) => {
    const de = se.nodeLookup.get(t), Ne = se.parentLookup.has(t);
    return {
      node: de,
      internals: de.internals,
      isParent: Ne
    };
  }, Qe);
  let H = S.type || "default", B = (N == null ? void 0 : N[H]) || Vp[H];
  B === void 0 && (R == null || R("003", gn.error003(H)), H = "default", B = Vp.default);
  const V = !!(S.draggable || p && typeof S.draggable > "u"), ee = !!(S.selectable || h && typeof S.selectable > "u"), oe = !!(S.connectable || v && typeof S.connectable > "u"), Z = !!(S.focusable || g && typeof S.focusable > "u"), te = We(), J = Wh(S), C = xS({ node: S, nodeType: H, hasDimensions: J, resizeObserver: y }), b = ym({
    nodeRef: C,
    disabled: S.hidden || !V,
    noDragClassName: m,
    handleSelector: S.dragHandle,
    nodeId: t,
    isSelectable: ee,
    nodeClickDistance: M
  }), D = vm();
  if (S.hidden)
    return null;
  const j = Ln(S), z = fS(S), L = ee || V || r || i || l || u, O = i ? (se) => i(se, { ...P.userNode }) : void 0, _ = l ? (se) => l(se, { ...P.userNode }) : void 0, F = u ? (se) => u(se, { ...P.userNode }) : void 0, K = c ? (se) => c(se, { ...P.userNode }) : void 0, Y = f ? (se) => f(se, { ...P.userNode }) : void 0, ue = (se) => {
    const { selectNodesOnDrag: de, nodeDragThreshold: Ne } = te.getState();
    ee && (!de || !V || Ne > 0) && Qa({
      id: t,
      store: te,
      nodeRef: C
    }), r && r(se, { ...P.userNode });
  }, ce = (se) => {
    if (!(Kh(se.nativeEvent) || k)) {
      if (Dh.includes(se.key) && ee) {
        const de = se.key === "Escape";
        Qa({
          id: t,
          store: te,
          unselect: de,
          nodeRef: C
        });
      } else if (V && S.selected && Object.prototype.hasOwnProperty.call(hl, se.key)) {
        se.preventDefault();
        const { ariaLabelConfig: de } = te.getState();
        te.setState({
          ariaLiveMessage: de["node.a11yDescription.ariaLiveMessage"]({
            direction: se.key.replace("Arrow", "").toLowerCase(),
            x: ~~P.positionAbsolute.x,
            y: ~~P.positionAbsolute.y
          })
        }), D({
          direction: hl[se.key],
          factor: se.shiftKey ? 4 : 1
        });
      }
    }
  }, fe = () => {
    var xe;
    if (k || !((xe = C.current) != null && xe.matches(":focus-visible")))
      return;
    const { transform: se, width: de, height: Ne, autoPanOnNodeFocus: Pe, setCenter: Se } = te.getState();
    if (!Pe)
      return;
    ic(/* @__PURE__ */ new Map([[t, S]]), { x: 0, y: 0, width: de, height: Ne }, se, !0).length > 0 || Se(S.position.x + j.width / 2, S.position.y + j.height / 2, {
      zoom: se[2]
    });
  };
  return q.jsx("div", { className: rt([
    "react-flow__node",
    `react-flow__node-${H}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: V
    },
    S.className,
    {
      selected: S.selected,
      selectable: ee,
      parent: A,
      draggable: V,
      dragging: b
    }
  ]), ref: C, style: {
    zIndex: P.z,
    transform: `translate(${P.positionAbsolute.x}px,${P.positionAbsolute.y}px)`,
    pointerEvents: L ? "all" : "none",
    visibility: J ? "visible" : "hidden",
    ...S.style,
    ...z
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: O, onMouseMove: _, onMouseLeave: F, onContextMenu: K, onClick: ue, onDoubleClick: Y, onKeyDown: Z ? ce : void 0, tabIndex: Z ? 0 : void 0, onFocus: Z ? fe : void 0, role: S.ariaRole ?? (Z ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": k ? void 0 : `${fm}-${E}`, "aria-label": S.ariaLabel, ...S.domAttributes, children: q.jsx(rS, { value: t, children: q.jsx(B, { id: t, data: S.data, type: H, positionAbsoluteX: P.positionAbsolute.x, positionAbsoluteY: P.positionAbsolute.y, selected: S.selected ?? !1, selectable: ee, draggable: V, deletable: S.deletable ?? !0, isConnectable: oe, sourcePosition: S.sourcePosition, targetPosition: S.targetPosition, dragging: b, dragHandle: S.dragHandle, zIndex: P.z, parentId: S.parentId, ...j }) }) });
}
const ES = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function Sm(t) {
  const { nodesDraggable: r, nodesConnectable: i, nodesFocusable: l, elementsSelectable: u, onError: c } = Ie(ES, Qe), f = yS(t.onlyRenderVisibleElements), p = wS();
  return q.jsx("div", { className: "react-flow__nodes", style: Cl, children: f.map((h) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    q.jsx(SS, { id: h, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: p, nodesDraggable: r, nodesConnectable: i, nodesFocusable: l, elementsSelectable: u, nodeClickDistance: t.nodeClickDistance, onError: c }, h)
  )) });
}
Sm.displayName = "NodeRenderer";
const _S = G.memo(Sm);
function kS(t) {
  return Ie(G.useCallback((i) => {
    if (!t)
      return i.edges.map((u) => u.id);
    const l = [];
    if (i.width && i.height)
      for (const u of i.edges) {
        const c = i.nodeLookup.get(u.source), f = i.nodeLookup.get(u.target);
        c && f && E1({
          sourceNode: c,
          targetNode: f,
          width: i.width,
          height: i.height,
          transform: i.transform
        }) && l.push(u.id);
      }
    return l;
  }, [t]), Qe);
}
const NS = ({ color: t = "none", strokeWidth: r = 1 }) => q.jsx("polyline", { style: {
  stroke: t,
  strokeWidth: r
}, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", points: "-5,-4 0,0 -5,4" }), CS = ({ color: t = "none", strokeWidth: r = 1 }) => q.jsx("polyline", { style: {
  stroke: t,
  fill: t,
  strokeWidth: r
}, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" }), Wp = {
  [yi.Arrow]: NS,
  [yi.ArrowClosed]: CS
};
function MS(t) {
  const r = We();
  return G.useMemo(() => {
    var u, c;
    return Object.prototype.hasOwnProperty.call(Wp, t) ? Wp[t] : ((c = (u = r.getState()).onError) == null || c.call(u, "009", gn.error009(t)), null);
  }, [t]);
}
const PS = ({ id: t, type: r, color: i, width: l = 12.5, height: u = 12.5, markerUnits: c = "strokeWidth", strokeWidth: f, orient: p = "auto-start-reverse" }) => {
  const h = MS(r);
  return h ? q.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${l}`, markerHeight: `${u}`, viewBox: "-10 -10 20 20", markerUnits: c, orient: p, refX: "0", refY: "0", children: q.jsx(h, { color: i, strokeWidth: f }) }) : null;
}, Em = ({ defaultColor: t, rfId: r }) => {
  const i = Ie((c) => c.edges), l = Ie((c) => c.defaultEdgeOptions), u = G.useMemo(() => L1(i, {
    id: r,
    defaultColor: t,
    defaultMarkerStart: l == null ? void 0 : l.markerStart,
    defaultMarkerEnd: l == null ? void 0 : l.markerEnd
  }), [i, l, r, t]);
  return u.length ? q.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: q.jsx("defs", { children: u.map((c) => q.jsx(PS, { id: c.id, type: c.type, color: c.color, width: c.width, height: c.height, markerUnits: c.markerUnits, strokeWidth: c.strokeWidth, orient: c.orient }, c.id)) }) }) : null;
};
Em.displayName = "MarkerDefinitions";
var TS = G.memo(Em);
function _m({ x: t, y: r, label: i, labelStyle: l, labelShowBg: u = !0, labelBgStyle: c, labelBgPadding: f = [2, 4], labelBgBorderRadius: p = 2, children: h, className: v, ...g }) {
  const [y, m] = G.useState({ x: 1, y: 0, width: 0, height: 0 }), x = rt(["react-flow__edge-textwrapper", v]), k = G.useRef(null);
  return G.useEffect(() => {
    if (k.current) {
      const E = k.current.getBBox();
      m({
        x: E.x,
        y: E.y,
        width: E.width,
        height: E.height
      });
    }
  }, [i]), i ? q.jsxs("g", { transform: `translate(${t - y.width / 2} ${r - y.height / 2})`, className: x, visibility: y.width ? "visible" : "hidden", ...g, children: [u && q.jsx("rect", { width: y.width + 2 * f[0], x: -f[0], y: -f[1], height: y.height + 2 * f[1], className: "react-flow__edge-textbg", style: c, rx: p, ry: p }), q.jsx("text", { className: "react-flow__edge-text", y: y.height / 2, dy: "0.3em", ref: k, style: l, children: i }), h] }) : null;
}
_m.displayName = "EdgeText";
const LS = G.memo(_m);
function Mi({ path: t, labelX: r, labelY: i, label: l, labelStyle: u, labelShowBg: c, labelBgStyle: f, labelBgPadding: p, labelBgBorderRadius: h, interactionWidth: v = 20, ...g }) {
  return q.jsxs(q.Fragment, { children: [q.jsx("path", { ...g, d: t, fill: "none", className: rt(["react-flow__edge-path", g.className]) }), v && q.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: v, className: "react-flow__edge-interaction" }), l && nn(r) && nn(i) ? q.jsx(LS, { x: r, y: i, label: l, labelStyle: u, labelShowBg: c, labelBgStyle: f, labelBgPadding: p, labelBgBorderRadius: h }) : null] });
}
function Yp({ pos: t, x1: r, y1: i, x2: l, y2: u }) {
  return t === we.Left || t === we.Right ? [0.5 * (r + l), i] : [r, 0.5 * (i + u)];
}
function km({ sourceX: t, sourceY: r, sourcePosition: i = we.Bottom, targetX: l, targetY: u, targetPosition: c = we.Top }) {
  const [f, p] = Yp({
    pos: i,
    x1: t,
    y1: r,
    x2: l,
    y2: u
  }), [h, v] = Yp({
    pos: c,
    x1: l,
    y1: u,
    x2: t,
    y2: r
  }), [g, y, m, x] = Gh({
    sourceX: t,
    sourceY: r,
    targetX: l,
    targetY: u,
    sourceControlX: f,
    sourceControlY: p,
    targetControlX: h,
    targetControlY: v
  });
  return [
    `M${t},${r} C${f},${p} ${h},${v} ${l},${u}`,
    g,
    y,
    m,
    x
  ];
}
function Nm(t) {
  return G.memo(({ id: r, sourceX: i, sourceY: l, targetX: u, targetY: c, sourcePosition: f, targetPosition: p, label: h, labelStyle: v, labelShowBg: g, labelBgStyle: y, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: N, interactionWidth: M }) => {
    const [R, S, P] = km({
      sourceX: i,
      sourceY: l,
      sourcePosition: f,
      targetX: u,
      targetY: c,
      targetPosition: p
    }), A = t.isInternal ? void 0 : r;
    return q.jsx(Mi, { id: A, path: R, labelX: S, labelY: P, label: h, labelStyle: v, labelShowBg: g, labelBgStyle: y, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: N, interactionWidth: M });
  });
}
const IS = Nm({ isInternal: !1 }), Cm = Nm({ isInternal: !0 });
IS.displayName = "SimpleBezierEdge";
Cm.displayName = "SimpleBezierEdgeInternal";
function Mm(t) {
  return G.memo(({ id: r, sourceX: i, sourceY: l, targetX: u, targetY: c, label: f, labelStyle: p, labelShowBg: h, labelBgStyle: v, labelBgPadding: g, labelBgBorderRadius: y, style: m, sourcePosition: x = we.Bottom, targetPosition: k = we.Top, markerEnd: E, markerStart: N, pathOptions: M, interactionWidth: R }) => {
    const [S, P, A] = Wa({
      sourceX: i,
      sourceY: l,
      sourcePosition: x,
      targetX: u,
      targetY: c,
      targetPosition: k,
      borderRadius: M == null ? void 0 : M.borderRadius,
      offset: M == null ? void 0 : M.offset
    }), H = t.isInternal ? void 0 : r;
    return q.jsx(Mi, { id: H, path: S, labelX: P, labelY: A, label: f, labelStyle: p, labelShowBg: h, labelBgStyle: v, labelBgPadding: g, labelBgBorderRadius: y, style: m, markerEnd: E, markerStart: N, interactionWidth: R });
  });
}
const Pm = Mm({ isInternal: !1 }), Tm = Mm({ isInternal: !0 });
Pm.displayName = "SmoothStepEdge";
Tm.displayName = "SmoothStepEdgeInternal";
function Lm(t) {
  return G.memo(({ id: r, ...i }) => {
    var u;
    const l = t.isInternal ? void 0 : r;
    return q.jsx(Pm, { ...i, id: l, pathOptions: G.useMemo(() => {
      var c;
      return { borderRadius: 0, offset: (c = i.pathOptions) == null ? void 0 : c.offset };
    }, [(u = i.pathOptions) == null ? void 0 : u.offset]) });
  });
}
const zS = Lm({ isInternal: !1 }), Im = Lm({ isInternal: !0 });
zS.displayName = "StepEdge";
Im.displayName = "StepEdgeInternal";
function zm(t) {
  return G.memo(({ id: r, sourceX: i, sourceY: l, targetX: u, targetY: c, label: f, labelStyle: p, labelShowBg: h, labelBgStyle: v, labelBgPadding: g, labelBgBorderRadius: y, style: m, markerEnd: x, markerStart: k, interactionWidth: E }) => {
    const [N, M, R] = Zh({ sourceX: i, sourceY: l, targetX: u, targetY: c }), S = t.isInternal ? void 0 : r;
    return q.jsx(Mi, { id: S, path: N, labelX: M, labelY: R, label: f, labelStyle: p, labelShowBg: h, labelBgStyle: v, labelBgPadding: g, labelBgBorderRadius: y, style: m, markerEnd: x, markerStart: k, interactionWidth: E });
  });
}
const RS = zm({ isInternal: !1 }), Rm = zm({ isInternal: !0 });
RS.displayName = "StraightEdge";
Rm.displayName = "StraightEdgeInternal";
function Am(t) {
  return G.memo(({ id: r, sourceX: i, sourceY: l, targetX: u, targetY: c, sourcePosition: f = we.Bottom, targetPosition: p = we.Top, label: h, labelStyle: v, labelShowBg: g, labelBgStyle: y, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: N, pathOptions: M, interactionWidth: R }) => {
    const [S, P, A] = uc({
      sourceX: i,
      sourceY: l,
      sourcePosition: f,
      targetX: u,
      targetY: c,
      targetPosition: p,
      curvature: M == null ? void 0 : M.curvature
    }), H = t.isInternal ? void 0 : r;
    return q.jsx(Mi, { id: H, path: S, labelX: P, labelY: A, label: h, labelStyle: v, labelShowBg: g, labelBgStyle: y, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: N, interactionWidth: R });
  });
}
const AS = Am({ isInternal: !1 }), $m = Am({ isInternal: !0 });
AS.displayName = "BezierEdge";
$m.displayName = "BezierEdgeInternal";
const Xp = {
  default: $m,
  straight: Rm,
  step: Im,
  smoothstep: Tm,
  simplebezier: Cm
}, Kp = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, $S = (t, r, i) => i === we.Left ? t - r : i === we.Right ? t + r : t, DS = (t, r, i) => i === we.Top ? t - r : i === we.Bottom ? t + r : t, Qp = "react-flow__edgeupdater";
function Gp({ position: t, centerX: r, centerY: i, radius: l = 10, onMouseDown: u, onMouseEnter: c, onMouseOut: f, type: p }) {
  return q.jsx("circle", { onMouseDown: u, onMouseEnter: c, onMouseOut: f, className: rt([Qp, `${Qp}-${p}`]), cx: $S(r, l, t), cy: DS(i, l, t), r: l, stroke: "transparent", fill: "transparent" });
}
function OS({ isReconnectable: t, reconnectRadius: r, edge: i, sourceX: l, sourceY: u, targetX: c, targetY: f, sourcePosition: p, targetPosition: h, onReconnect: v, onReconnectStart: g, onReconnectEnd: y, setReconnecting: m, setUpdateHover: x }) {
  const k = We(), E = (P, A) => {
    if (P.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: B, isValidConnection: V, connectionMode: ee, connectionRadius: oe, lib: Z, onConnectStart: te, onConnectEnd: J, cancelConnection: C, nodeLookup: b, rfId: D, panBy: j, updateConnection: z } = k.getState(), L = A.type === "target", O = (K, Y) => {
      m(!1), y == null || y(K, i, A.type, Y);
    }, _ = (K) => v == null ? void 0 : v(i, K), F = (K, Y) => {
      m(!0), g == null || g(P, i, A.type), te == null || te(K, Y);
    };
    Ka.onPointerDown(P.nativeEvent, {
      autoPanOnConnect: H,
      connectionMode: ee,
      connectionRadius: oe,
      domNode: B,
      handleId: A.id,
      nodeId: A.nodeId,
      nodeLookup: b,
      isTarget: L,
      edgeUpdaterType: A.type,
      lib: Z,
      flowId: D,
      cancelConnection: C,
      panBy: j,
      isValidConnection: V,
      onConnect: _,
      onConnectStart: F,
      onConnectEnd: J,
      onReconnectEnd: O,
      updateConnection: z,
      getTransform: () => k.getState().transform,
      getFromHandle: () => k.getState().connection.fromHandle,
      dragThreshold: k.getState().connectionDragThreshold
    });
  }, N = (P) => E(P, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), M = (P) => E(P, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), R = () => x(!0), S = () => x(!1);
  return q.jsxs(q.Fragment, { children: [(t === !0 || t === "source") && q.jsx(Gp, { position: p, centerX: l, centerY: u, radius: r, onMouseDown: N, onMouseEnter: R, onMouseOut: S, type: "source" }), (t === !0 || t === "target") && q.jsx(Gp, { position: h, centerX: c, centerY: f, radius: r, onMouseDown: M, onMouseEnter: R, onMouseOut: S, type: "target" })] });
}
function FS({ id: t, edgesFocusable: r, edgesReconnectable: i, elementsSelectable: l, onClick: u, onDoubleClick: c, onContextMenu: f, onMouseEnter: p, onMouseMove: h, onMouseLeave: v, reconnectRadius: g, onReconnect: y, onReconnectStart: m, onReconnectEnd: x, rfId: k, edgeTypes: E, noPanClassName: N, onError: M, disableKeyboardA11y: R }) {
  let S = Ie((Se) => Se.edgeLookup.get(t));
  const P = Ie((Se) => Se.defaultEdgeOptions);
  S = P ? { ...P, ...S } : S;
  let A = S.type || "default", H = (E == null ? void 0 : E[A]) || Xp[A];
  H === void 0 && (M == null || M("011", gn.error011(A)), A = "default", H = Xp.default);
  const B = !!(S.focusable || r && typeof S.focusable > "u"), V = typeof y < "u" && (S.reconnectable || i && typeof S.reconnectable > "u"), ee = !!(S.selectable || l && typeof S.selectable > "u"), oe = G.useRef(null), [Z, te] = G.useState(!1), [J, C] = G.useState(!1), b = We(), { zIndex: D, sourceX: j, sourceY: z, targetX: L, targetY: O, sourcePosition: _, targetPosition: F } = Ie(G.useCallback((Se) => {
    const Ee = Se.nodeLookup.get(S.source), xe = Se.nodeLookup.get(S.target);
    if (!Ee || !xe)
      return {
        zIndex: S.zIndex,
        ...Kp
      };
    const Ae = T1({
      id: t,
      sourceNode: Ee,
      targetNode: xe,
      sourceHandle: S.sourceHandle || null,
      targetHandle: S.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: M
    });
    return {
      zIndex: S1({
        selected: S.selected,
        zIndex: S.zIndex,
        sourceNode: Ee,
        targetNode: xe,
        elevateOnSelect: Se.elevateEdgesOnSelect
      }),
      ...Ae || Kp
    };
  }, [S.source, S.target, S.sourceHandle, S.targetHandle, S.selected, S.zIndex]), Qe), K = G.useMemo(() => S.markerStart ? `url('#${Ya(S.markerStart, k)}')` : void 0, [S.markerStart, k]), Y = G.useMemo(() => S.markerEnd ? `url('#${Ya(S.markerEnd, k)}')` : void 0, [S.markerEnd, k]);
  if (S.hidden || j === null || z === null || L === null || O === null)
    return null;
  const ue = (Se) => {
    var Oe;
    const { addSelectedEdges: Ee, unselectNodesAndEdges: xe, multiSelectionActive: Ae } = b.getState();
    ee && (b.setState({ nodesSelectionActive: !1 }), S.selected && Ae ? (xe({ nodes: [], edges: [S] }), (Oe = oe.current) == null || Oe.blur()) : Ee([t])), u && u(Se, S);
  }, ce = c ? (Se) => {
    c(Se, { ...S });
  } : void 0, fe = f ? (Se) => {
    f(Se, { ...S });
  } : void 0, se = p ? (Se) => {
    p(Se, { ...S });
  } : void 0, de = h ? (Se) => {
    h(Se, { ...S });
  } : void 0, Ne = v ? (Se) => {
    v(Se, { ...S });
  } : void 0, Pe = (Se) => {
    var Ee;
    if (!R && Dh.includes(Se.key) && ee) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ae } = b.getState();
      Se.key === "Escape" ? ((Ee = oe.current) == null || Ee.blur(), xe({ edges: [S] })) : Ae([t]);
    }
  };
  return q.jsx("svg", { style: { zIndex: D }, children: q.jsxs("g", { className: rt([
    "react-flow__edge",
    `react-flow__edge-${A}`,
    S.className,
    N,
    {
      selected: S.selected,
      animated: S.animated,
      inactive: !ee && !u,
      updating: Z,
      selectable: ee
    }
  ]), onClick: ue, onDoubleClick: ce, onContextMenu: fe, onMouseEnter: se, onMouseMove: de, onMouseLeave: Ne, onKeyDown: B ? Pe : void 0, tabIndex: B ? 0 : void 0, role: S.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": S.ariaLabel === null ? void 0 : S.ariaLabel || `Edge from ${S.source} to ${S.target}`, "aria-describedby": B ? `${dm}-${k}` : void 0, ref: oe, ...S.domAttributes, children: [!J && q.jsx(H, { id: t, source: S.source, target: S.target, type: S.type, selected: S.selected, animated: S.animated, selectable: ee, deletable: S.deletable ?? !0, label: S.label, labelStyle: S.labelStyle, labelShowBg: S.labelShowBg, labelBgStyle: S.labelBgStyle, labelBgPadding: S.labelBgPadding, labelBgBorderRadius: S.labelBgBorderRadius, sourceX: j, sourceY: z, targetX: L, targetY: O, sourcePosition: _, targetPosition: F, data: S.data, style: S.style, sourceHandleId: S.sourceHandle, targetHandleId: S.targetHandle, markerStart: K, markerEnd: Y, pathOptions: "pathOptions" in S ? S.pathOptions : void 0, interactionWidth: S.interactionWidth }), V && q.jsx(OS, { edge: S, isReconnectable: V, reconnectRadius: g, onReconnect: y, onReconnectStart: m, onReconnectEnd: x, sourceX: j, sourceY: z, targetX: L, targetY: O, sourcePosition: _, targetPosition: F, setUpdateHover: te, setReconnecting: C })] }) });
}
const jS = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Dm({ defaultMarkerColor: t, onlyRenderVisibleElements: r, rfId: i, edgeTypes: l, noPanClassName: u, onReconnect: c, onEdgeContextMenu: f, onEdgeMouseEnter: p, onEdgeMouseMove: h, onEdgeMouseLeave: v, onEdgeClick: g, reconnectRadius: y, onEdgeDoubleClick: m, onReconnectStart: x, onReconnectEnd: k, disableKeyboardA11y: E }) {
  const { edgesFocusable: N, edgesReconnectable: M, elementsSelectable: R, onError: S } = Ie(jS, Qe), P = kS(r);
  return q.jsxs("div", { className: "react-flow__edges", children: [q.jsx(TS, { defaultColor: t, rfId: i }), P.map((A) => q.jsx(FS, { id: A, edgesFocusable: N, edgesReconnectable: M, elementsSelectable: R, noPanClassName: u, onReconnect: c, onContextMenu: f, onMouseEnter: p, onMouseMove: h, onMouseLeave: v, onClick: g, reconnectRadius: y, onDoubleClick: m, onReconnectStart: x, onReconnectEnd: k, rfId: i, onError: S, edgeTypes: l, disableKeyboardA11y: E }, A))] });
}
Dm.displayName = "EdgeRenderer";
const HS = G.memo(Dm), bS = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function BS({ children: t }) {
  const r = Ie(bS);
  return q.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: r }, children: t });
}
function VS(t) {
  const r = pc(), i = G.useRef(!1);
  G.useEffect(() => {
    !i.current && r.viewportInitialized && t && (setTimeout(() => t(r), 1), i.current = !0);
  }, [t, r.viewportInitialized]);
}
const US = (t) => {
  var r;
  return (r = t.panZoom) == null ? void 0 : r.syncViewport;
};
function WS(t) {
  const r = Ie(US), i = We();
  return G.useEffect(() => {
    t && (r == null || r(t), i.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, r]), null;
}
function YS(t) {
  return t.connection.inProgress ? { ...t.connection, to: Ci(t.connection.to, t.transform) } : { ...t.connection };
}
function XS(t) {
  return YS;
}
function KS(t) {
  const r = XS();
  return Ie(r, Qe);
}
const QS = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function GS({ containerStyle: t, style: r, type: i, component: l }) {
  const { nodesConnectable: u, width: c, height: f, isValid: p, inProgress: h } = Ie(QS, Qe);
  return !(c && u && h) ? null : q.jsx("svg", { style: t, width: c, height: f, className: "react-flow__connectionline react-flow__container", children: q.jsx("g", { className: rt(["react-flow__connection", jh(p)]), children: q.jsx(Om, { style: r, type: i, CustomComponent: l, isValid: p }) }) });
}
const Om = ({ style: t, type: r = nr.Bezier, CustomComponent: i, isValid: l }) => {
  const { inProgress: u, from: c, fromNode: f, fromHandle: p, fromPosition: h, to: v, toNode: g, toHandle: y, toPosition: m } = KS();
  if (!u)
    return;
  if (i)
    return q.jsx(i, { connectionLineType: r, connectionLineStyle: t, fromNode: f, fromHandle: p, fromX: c.x, fromY: c.y, toX: v.x, toY: v.y, fromPosition: h, toPosition: m, connectionStatus: jh(l), toNode: g, toHandle: y });
  let x = "";
  const k = {
    sourceX: c.x,
    sourceY: c.y,
    sourcePosition: h,
    targetX: v.x,
    targetY: v.y,
    targetPosition: m
  };
  switch (r) {
    case nr.Bezier:
      [x] = uc(k);
      break;
    case nr.SimpleBezier:
      [x] = km(k);
      break;
    case nr.Step:
      [x] = Wa({
        ...k,
        borderRadius: 0
      });
      break;
    case nr.SmoothStep:
      [x] = Wa(k);
      break;
    default:
      [x] = Zh(k);
  }
  return q.jsx("path", { d: x, fill: "none", className: "react-flow__connection-path", style: t });
};
Om.displayName = "ConnectionLine";
const qS = {};
function qp(t = qS) {
  G.useRef(t), We(), G.useEffect(() => {
  }, [t]);
}
function ZS() {
  We(), G.useRef(!1), G.useEffect(() => {
  }, []);
}
function Fm({ nodeTypes: t, edgeTypes: r, onInit: i, onNodeClick: l, onEdgeClick: u, onNodeDoubleClick: c, onEdgeDoubleClick: f, onNodeMouseEnter: p, onNodeMouseMove: h, onNodeMouseLeave: v, onNodeContextMenu: g, onSelectionContextMenu: y, onSelectionStart: m, onSelectionEnd: x, connectionLineType: k, connectionLineStyle: E, connectionLineComponent: N, connectionLineContainerStyle: M, selectionKeyCode: R, selectionOnDrag: S, selectionMode: P, multiSelectionKeyCode: A, panActivationKeyCode: H, zoomActivationKeyCode: B, deleteKeyCode: V, onlyRenderVisibleElements: ee, elementsSelectable: oe, defaultViewport: Z, translateExtent: te, minZoom: J, maxZoom: C, preventScrolling: b, defaultMarkerColor: D, zoomOnScroll: j, zoomOnPinch: z, panOnScroll: L, panOnScrollSpeed: O, panOnScrollMode: _, zoomOnDoubleClick: F, panOnDrag: K, onPaneClick: Y, onPaneMouseEnter: ue, onPaneMouseMove: ce, onPaneMouseLeave: fe, onPaneScroll: se, onPaneContextMenu: de, paneClickDistance: Ne, nodeClickDistance: Pe, onEdgeContextMenu: Se, onEdgeMouseEnter: Ee, onEdgeMouseMove: xe, onEdgeMouseLeave: Ae, reconnectRadius: Oe, onReconnect: vt, onReconnectStart: jt, onReconnectEnd: Lt, noDragClassName: ne, noWheelClassName: pe, noPanClassName: Me, disableKeyboardA11y: Te, nodeExtent: De, rfId: Fe, viewport: et, onViewportChange: st }) {
  return qp(t), qp(r), ZS(), VS(i), WS(et), q.jsx(mS, { onPaneClick: Y, onPaneMouseEnter: ue, onPaneMouseMove: ce, onPaneMouseLeave: fe, onPaneContextMenu: de, onPaneScroll: se, paneClickDistance: Ne, deleteKeyCode: V, selectionKeyCode: R, selectionOnDrag: S, selectionMode: P, onSelectionStart: m, onSelectionEnd: x, multiSelectionKeyCode: A, panActivationKeyCode: H, zoomActivationKeyCode: B, elementsSelectable: oe, zoomOnScroll: j, zoomOnPinch: z, zoomOnDoubleClick: F, panOnScroll: L, panOnScrollSpeed: O, panOnScrollMode: _, panOnDrag: K, defaultViewport: Z, translateExtent: te, minZoom: J, maxZoom: C, onSelectionContextMenu: y, preventScrolling: b, noDragClassName: ne, noWheelClassName: pe, noPanClassName: Me, disableKeyboardA11y: Te, onViewportChange: st, isControlledViewport: !!et, children: q.jsxs(BS, { children: [q.jsx(HS, { edgeTypes: r, onEdgeClick: u, onEdgeDoubleClick: f, onReconnect: vt, onReconnectStart: jt, onReconnectEnd: Lt, onlyRenderVisibleElements: ee, onEdgeContextMenu: Se, onEdgeMouseEnter: Ee, onEdgeMouseMove: xe, onEdgeMouseLeave: Ae, reconnectRadius: Oe, defaultMarkerColor: D, noPanClassName: Me, disableKeyboardA11y: Te, rfId: Fe }), q.jsx(GS, { style: E, type: k, component: N, containerStyle: M }), q.jsx("div", { className: "react-flow__edgelabel-renderer" }), q.jsx(_S, { nodeTypes: t, onNodeClick: l, onNodeDoubleClick: c, onNodeMouseEnter: p, onNodeMouseMove: h, onNodeMouseLeave: v, onNodeContextMenu: g, nodeClickDistance: Pe, onlyRenderVisibleElements: ee, noPanClassName: Me, noDragClassName: ne, disableKeyboardA11y: Te, nodeExtent: De, rfId: Fe }), q.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Fm.displayName = "GraphView";
const JS = G.memo(Fm), Zp = ({ nodes: t, edges: r, defaultNodes: i, defaultEdges: l, width: u, height: c, fitView: f, fitViewOptions: p, minZoom: h = 0.5, maxZoom: v = 2, nodeOrigin: g, nodeExtent: y } = {}) => {
  const m = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), N = l ?? r ?? [], M = i ?? t ?? [], R = g ?? [0, 0], S = y ?? mi;
  em(k, E, N);
  const P = Xa(M, m, x, {
    nodeOrigin: R,
    nodeExtent: S,
    elevateNodesOnSelect: !1
  });
  let A = [0, 0, 1];
  if (f && u && c) {
    const H = Ni(m, {
      filter: (oe) => !!((oe.width || oe.initialWidth) && (oe.height || oe.initialHeight))
    }), { x: B, y: V, zoom: ee } = sc(H, u, c, h, v, (p == null ? void 0 : p.padding) ?? 0.1);
    A = [B, V, ee];
  }
  return {
    rfId: "1",
    width: 0,
    height: 0,
    transform: A,
    nodes: M,
    nodesInitialized: P,
    nodeLookup: m,
    parentLookup: x,
    edges: N,
    edgeLookup: E,
    connectionLookup: k,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: h,
    maxZoom: v,
    translateExtent: mi,
    nodeExtent: S,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: fo.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: R,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !1,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: f ?? !1,
    fitViewOptions: p,
    fitViewResolver: null,
    connection: { ...Fh },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: m1,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Oh
  };
}, eE = ({ nodes: t, edges: r, defaultNodes: i, defaultEdges: l, width: u, height: c, fitView: f, fitViewOptions: p, minZoom: h, maxZoom: v, nodeOrigin: g, nodeExtent: y }) => vx((m, x) => {
  async function k() {
    const { nodeLookup: E, panZoom: N, fitViewOptions: M, fitViewResolver: R, width: S, height: P, minZoom: A, maxZoom: H } = x();
    N && (await p1({
      nodes: E,
      width: S,
      height: P,
      panZoom: N,
      minZoom: A,
      maxZoom: H
    }, M), R == null || R.resolve(!0), m({ fitViewResolver: null }));
  }
  return {
    ...Zp({
      nodes: t,
      edges: r,
      width: u,
      height: c,
      fitView: f,
      fitViewOptions: p,
      minZoom: h,
      maxZoom: v,
      nodeOrigin: g,
      nodeExtent: y,
      defaultNodes: i,
      defaultEdges: l
    }),
    setNodes: (E) => {
      const { nodeLookup: N, parentLookup: M, nodeOrigin: R, elevateNodesOnSelect: S, fitViewQueued: P } = x(), A = Xa(E, N, M, {
        nodeOrigin: R,
        nodeExtent: y,
        elevateNodesOnSelect: S,
        checkEquality: !0
      });
      P && A ? (k(), m({ nodes: E, nodesInitialized: A, fitViewQueued: !1, fitViewOptions: void 0 })) : m({ nodes: E, nodesInitialized: A });
    },
    setEdges: (E) => {
      const { connectionLookup: N, edgeLookup: M } = x();
      em(N, M, E), m({ edges: E });
    },
    setDefaultNodesAndEdges: (E, N) => {
      if (E) {
        const { setNodes: M } = x();
        M(E), m({ hasDefaultNodes: !0 });
      }
      if (N) {
        const { setEdges: M } = x();
        M(N), m({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registerd at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (E) => {
      const { triggerNodeChanges: N, nodeLookup: M, parentLookup: R, domNode: S, nodeOrigin: P, nodeExtent: A, debug: H, fitViewQueued: B } = x(), { changes: V, updatedInternals: ee } = $1(E, M, R, S, P, A);
      ee && (z1(M, R, { nodeOrigin: P, nodeExtent: A }), B ? (k(), m({ fitViewQueued: !1, fitViewOptions: void 0 })) : m({}), (V == null ? void 0 : V.length) > 0 && (H && console.log("React Flow: trigger node changes", V), N == null || N(V)));
    },
    updateNodePositions: (E, N = !1) => {
      const M = [], R = [], { nodeLookup: S, triggerNodeChanges: P } = x();
      for (const [A, H] of E) {
        const B = S.get(A), V = !!(B != null && B.expandParent && (B != null && B.parentId) && (H != null && H.position)), ee = {
          id: A,
          type: "position",
          position: V ? {
            x: Math.max(0, H.position.x),
            y: Math.max(0, H.position.y)
          } : H.position,
          dragging: N
        };
        V && B.parentId && M.push({
          id: A,
          parentId: B.parentId,
          rect: {
            ...H.internals.positionAbsolute,
            width: H.measured.width ?? 0,
            height: H.measured.height ?? 0
          }
        }), R.push(ee);
      }
      if (M.length > 0) {
        const { parentLookup: A, nodeOrigin: H } = x(), B = dc(M, S, A, H);
        R.push(...B);
      }
      P(R);
    },
    triggerNodeChanges: (E) => {
      const { onNodesChange: N, setNodes: M, nodes: R, hasDefaultNodes: S, debug: P } = x();
      if (E != null && E.length) {
        if (S) {
          const A = jx(E, R);
          M(A);
        }
        P && console.log("React Flow: trigger node changes", E), N == null || N(E);
      }
    },
    triggerEdgeChanges: (E) => {
      const { onEdgesChange: N, setEdges: M, edges: R, hasDefaultEdges: S, debug: P } = x();
      if (E != null && E.length) {
        if (S) {
          const A = Hx(E, R);
          M(A);
        }
        P && console.log("React Flow: trigger edge changes", E), N == null || N(E);
      }
    },
    addSelectedNodes: (E) => {
      const { multiSelectionActive: N, edgeLookup: M, nodeLookup: R, triggerNodeChanges: S, triggerEdgeChanges: P } = x();
      if (N) {
        const A = E.map((H) => _r(H, !0));
        S(A);
        return;
      }
      S(so(R, /* @__PURE__ */ new Set([...E]), !0)), P(so(M));
    },
    addSelectedEdges: (E) => {
      const { multiSelectionActive: N, edgeLookup: M, nodeLookup: R, triggerNodeChanges: S, triggerEdgeChanges: P } = x();
      if (N) {
        const A = E.map((H) => _r(H, !0));
        P(A);
        return;
      }
      P(so(M, /* @__PURE__ */ new Set([...E]))), S(so(R, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: E, edges: N } = {}) => {
      const { edges: M, nodes: R, nodeLookup: S, triggerNodeChanges: P, triggerEdgeChanges: A } = x(), H = E || R, B = N || M, V = H.map((oe) => {
        const Z = S.get(oe.id);
        return Z && (Z.selected = !1), _r(oe.id, !1);
      }), ee = B.map((oe) => _r(oe.id, !1));
      P(V), A(ee);
    },
    setMinZoom: (E) => {
      const { panZoom: N, maxZoom: M } = x();
      N == null || N.setScaleExtent([E, M]), m({ minZoom: E });
    },
    setMaxZoom: (E) => {
      const { panZoom: N, minZoom: M } = x();
      N == null || N.setScaleExtent([M, E]), m({ maxZoom: E });
    },
    setTranslateExtent: (E) => {
      var N;
      (N = x().panZoom) == null || N.setTranslateExtent(E), m({ translateExtent: E });
    },
    setPaneClickDistance: (E) => {
      var N;
      (N = x().panZoom) == null || N.setClickDistance(E);
    },
    resetSelectedElements: () => {
      const { edges: E, nodes: N, triggerNodeChanges: M, triggerEdgeChanges: R, elementsSelectable: S } = x();
      if (!S)
        return;
      const P = N.reduce((H, B) => B.selected ? [...H, _r(B.id, !1)] : H, []), A = E.reduce((H, B) => B.selected ? [...H, _r(B.id, !1)] : H, []);
      M(P), R(A);
    },
    setNodeExtent: (E) => {
      const { nodes: N, nodeLookup: M, parentLookup: R, nodeOrigin: S, elevateNodesOnSelect: P, nodeExtent: A } = x();
      E[0][0] === A[0][0] && E[0][1] === A[0][1] && E[1][0] === A[1][0] && E[1][1] === A[1][1] || (Xa(N, M, R, {
        nodeOrigin: S,
        nodeExtent: E,
        elevateNodesOnSelect: P,
        checkEquality: !1
      }), m({ nodeExtent: E }));
    },
    panBy: (E) => {
      const { transform: N, width: M, height: R, panZoom: S, translateExtent: P } = x();
      return D1({ delta: E, panZoom: S, transform: N, translateExtent: P, width: M, height: R });
    },
    setCenter: async (E, N, M) => {
      const { width: R, height: S, maxZoom: P, panZoom: A } = x();
      if (!A)
        return Promise.resolve(!1);
      const H = typeof (M == null ? void 0 : M.zoom) < "u" ? M.zoom : P;
      return await A.setViewport({
        x: R / 2 - E * H,
        y: S / 2 - N * H,
        zoom: H
      }, { duration: M == null ? void 0 : M.duration, ease: M == null ? void 0 : M.ease, interpolate: M == null ? void 0 : M.interpolate }), Promise.resolve(!0);
    },
    cancelConnection: () => {
      m({
        connection: { ...Fh }
      });
    },
    updateConnection: (E) => {
      m({ connection: E });
    },
    reset: () => m({ ...Zp() })
  };
}, Object.is);
function tE({ initialNodes: t, initialEdges: r, defaultNodes: i, defaultEdges: l, initialWidth: u, initialHeight: c, initialMinZoom: f, initialMaxZoom: p, initialFitViewOptions: h, fitView: v, nodeOrigin: g, nodeExtent: y, children: m }) {
  const [x] = G.useState(() => eE({
    nodes: t,
    edges: r,
    defaultNodes: i,
    defaultEdges: l,
    width: u,
    height: c,
    fitView: v,
    minZoom: f,
    maxZoom: p,
    fitViewOptions: h,
    nodeOrigin: g,
    nodeExtent: y
  }));
  return q.jsx(wx, { value: x, children: q.jsx(Ux, { children: m }) });
}
function nE({ children: t, nodes: r, edges: i, defaultNodes: l, defaultEdges: u, width: c, height: f, fitView: p, fitViewOptions: h, minZoom: v, maxZoom: g, nodeOrigin: y, nodeExtent: m }) {
  return G.useContext(kl) ? q.jsx(q.Fragment, { children: t }) : q.jsx(tE, { initialNodes: r, initialEdges: i, defaultNodes: l, defaultEdges: u, initialWidth: c, initialHeight: f, fitView: p, initialFitViewOptions: h, initialMinZoom: v, initialMaxZoom: g, nodeOrigin: y, nodeExtent: m, children: t });
}
const rE = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function oE({ nodes: t, edges: r, defaultNodes: i, defaultEdges: l, className: u, nodeTypes: c, edgeTypes: f, onNodeClick: p, onEdgeClick: h, onInit: v, onMove: g, onMoveStart: y, onMoveEnd: m, onConnect: x, onConnectStart: k, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: M, onNodeMouseEnter: R, onNodeMouseMove: S, onNodeMouseLeave: P, onNodeContextMenu: A, onNodeDoubleClick: H, onNodeDragStart: B, onNodeDrag: V, onNodeDragStop: ee, onNodesDelete: oe, onEdgesDelete: Z, onDelete: te, onSelectionChange: J, onSelectionDragStart: C, onSelectionDrag: b, onSelectionDragStop: D, onSelectionContextMenu: j, onSelectionStart: z, onSelectionEnd: L, onBeforeDelete: O, connectionMode: _, connectionLineType: F = nr.Bezier, connectionLineStyle: K, connectionLineComponent: Y, connectionLineContainerStyle: ue, deleteKeyCode: ce = "Backspace", selectionKeyCode: fe = "Shift", selectionOnDrag: se = !1, selectionMode: de = gi.Full, panActivationKeyCode: Ne = "Space", multiSelectionKeyCode: Pe = pl() ? "Meta" : "Control", zoomActivationKeyCode: Se = pl() ? "Meta" : "Control", snapToGrid: Ee, snapGrid: xe, onlyRenderVisibleElements: Ae = !1, selectNodesOnDrag: Oe, nodesDraggable: vt, autoPanOnNodeFocus: jt, nodesConnectable: Lt, nodesFocusable: ne, nodeOrigin: pe = pm, edgesFocusable: Me, edgesReconnectable: Te, elementsSelectable: De = !0, defaultViewport: Fe = zx, minZoom: et = 0.5, maxZoom: st = 2, translateExtent: ct = mi, preventScrolling: qe = !0, nodeExtent: je, defaultMarkerColor: It = "#b1b1b7", zoomOnScroll: Ht = !0, zoomOnPinch: tt = !0, panOnScroll: on = !1, panOnScrollSpeed: wt = 0.5, panOnScrollMode: In = Cr.Free, zoomOnDoubleClick: or = !0, panOnDrag: zn = !0, onPaneClick: Rn, onPaneMouseEnter: xt, onPaneMouseMove: ft, onPaneMouseLeave: sn, onPaneScroll: Pi, onPaneContextMenu: Ti, paneClickDistance: vo = 0, nodeClickDistance: Li = 0, children: Ii, onReconnect: wo, onReconnectStart: zi, onReconnectEnd: ir, onEdgeContextMenu: xo, onEdgeDoubleClick: sr, onEdgeMouseEnter: Ml, onEdgeMouseMove: lr, onEdgeMouseLeave: Lr, reconnectRadius: Ir = 10, onNodesChange: So, onEdgesChange: Pl, noDragClassName: Tl = "nodrag", noWheelClassName: Ll = "nowheel", noPanClassName: ln = "nopan", fitView: Eo, fitViewOptions: _o, connectOnClick: Il, attributionPosition: Ri, proOptions: Ai, defaultEdgeOptions: $i, elevateNodesOnSelect: Di, elevateEdgesOnSelect: zl, disableKeyboardA11y: Oi = !1, autoPanOnConnect: Ye, autoPanOnNodeDrag: Rl, autoPanSpeed: ko, connectionRadius: Fi, isValidConnection: zr, onError: Al, style: ji, id: ur, nodeDragThreshold: bt, connectionDragThreshold: $l, viewport: zt, onViewportChange: Dl, width: Ol, height: Fl, colorMode: Rr = "light", debug: Ar, onScroll: un, ariaLabelConfig: $r, ...jl }, Hl) {
  const ar = ur || "1", Hi = Dx(Rr), No = G.useCallback((An) => {
    An.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), un == null || un(An);
  }, [un]);
  return q.jsx("div", { "data-testid": "rf__wrapper", ...jl, onScroll: No, style: { ...ji, ...rE }, ref: Hl, className: rt(["react-flow", u, Hi]), id: ur, role: "application", children: q.jsxs(nE, { nodes: t, edges: r, width: Ol, height: Fl, fitView: Eo, fitViewOptions: _o, minZoom: et, maxZoom: st, nodeOrigin: pe, nodeExtent: je, children: [q.jsx(JS, { onInit: v, onNodeClick: p, onEdgeClick: h, onNodeMouseEnter: R, onNodeMouseMove: S, onNodeMouseLeave: P, onNodeContextMenu: A, onNodeDoubleClick: H, nodeTypes: c, edgeTypes: f, connectionLineType: F, connectionLineStyle: K, connectionLineComponent: Y, connectionLineContainerStyle: ue, selectionKeyCode: fe, selectionOnDrag: se, selectionMode: de, deleteKeyCode: ce, multiSelectionKeyCode: Pe, panActivationKeyCode: Ne, zoomActivationKeyCode: Se, onlyRenderVisibleElements: Ae, defaultViewport: Fe, translateExtent: ct, minZoom: et, maxZoom: st, preventScrolling: qe, zoomOnScroll: Ht, zoomOnPinch: tt, zoomOnDoubleClick: or, panOnScroll: on, panOnScrollSpeed: wt, panOnScrollMode: In, panOnDrag: zn, onPaneClick: Rn, onPaneMouseEnter: xt, onPaneMouseMove: ft, onPaneMouseLeave: sn, onPaneScroll: Pi, onPaneContextMenu: Ti, paneClickDistance: vo, nodeClickDistance: Li, onSelectionContextMenu: j, onSelectionStart: z, onSelectionEnd: L, onReconnect: wo, onReconnectStart: zi, onReconnectEnd: ir, onEdgeContextMenu: xo, onEdgeDoubleClick: sr, onEdgeMouseEnter: Ml, onEdgeMouseMove: lr, onEdgeMouseLeave: Lr, reconnectRadius: Ir, defaultMarkerColor: It, noDragClassName: Tl, noWheelClassName: Ll, noPanClassName: ln, rfId: ar, disableKeyboardA11y: Oi, nodeExtent: je, viewport: zt, onViewportChange: Dl }), q.jsx($x, { nodes: t, edges: r, defaultNodes: i, defaultEdges: l, onConnect: x, onConnectStart: k, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: M, nodesDraggable: vt, autoPanOnNodeFocus: jt, nodesConnectable: Lt, nodesFocusable: ne, edgesFocusable: Me, edgesReconnectable: Te, elementsSelectable: De, elevateNodesOnSelect: Di, elevateEdgesOnSelect: zl, minZoom: et, maxZoom: st, nodeExtent: je, onNodesChange: So, onEdgesChange: Pl, snapToGrid: Ee, snapGrid: xe, connectionMode: _, translateExtent: ct, connectOnClick: Il, defaultEdgeOptions: $i, fitView: Eo, fitViewOptions: _o, onNodesDelete: oe, onEdgesDelete: Z, onDelete: te, onNodeDragStart: B, onNodeDrag: V, onNodeDragStop: ee, onSelectionDrag: b, onSelectionDragStart: C, onSelectionDragStop: D, onMove: g, onMoveStart: y, onMoveEnd: m, noPanClassName: ln, nodeOrigin: pe, rfId: ar, autoPanOnConnect: Ye, autoPanOnNodeDrag: Rl, autoPanSpeed: ko, onError: Al, connectionRadius: Fi, isValidConnection: zr, selectNodesOnDrag: Oe, nodeDragThreshold: bt, connectionDragThreshold: $l, onBeforeDelete: O, paneClickDistance: vo, debug: Ar, ariaLabelConfig: $r }), q.jsx(Ix, { onSelectionChange: J }), Ii, q.jsx(Cx, { proOptions: Ai, position: Ri }), q.jsx(Nx, { rfId: ar, disableKeyboardA11y: Oi })] }) });
}
var iE = mm(oE);
function sE({ dimensions: t, lineWidth: r, variant: i, className: l }) {
  return q.jsx("path", { strokeWidth: r, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: rt(["react-flow__background-pattern", i, l]) });
}
function lE({ radius: t, className: r }) {
  return q.jsx("circle", { cx: t, cy: t, r: t, className: rt(["react-flow__background-pattern", "dots", r]) });
}
var rr;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(rr || (rr = {}));
const uE = {
  [rr.Dots]: 1,
  [rr.Lines]: 1,
  [rr.Cross]: 6
}, aE = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function jm({
  id: t,
  variant: r = rr.Dots,
  // only used for dots and cross
  gap: i = 20,
  // only used for lines and cross
  size: l,
  lineWidth: u = 1,
  offset: c = 0,
  color: f,
  bgColor: p,
  style: h,
  className: v,
  patternClassName: g
}) {
  const y = G.useRef(null), { transform: m, patternId: x } = Ie(aE, Qe), k = l || uE[r], E = r === rr.Dots, N = r === rr.Cross, M = Array.isArray(i) ? i : [i, i], R = [M[0] * m[2] || 1, M[1] * m[2] || 1], S = k * m[2], P = Array.isArray(c) ? c : [c, c], A = N ? [S, S] : R, H = [
    P[0] * m[2] || 1 + A[0] / 2,
    P[1] * m[2] || 1 + A[1] / 2
  ], B = `${x}${t || ""}`;
  return q.jsxs("svg", { className: rt(["react-flow__background", v]), style: {
    ...h,
    ...Cl,
    "--xy-background-color-props": p,
    "--xy-background-pattern-color-props": f
  }, ref: y, "data-testid": "rf__background", children: [q.jsx("pattern", { id: B, x: m[0] % R[0], y: m[1] % R[1], width: R[0], height: R[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: E ? q.jsx(lE, { radius: S / 2, className: g }) : q.jsx(sE, { dimensions: A, lineWidth: u, variant: r, className: g }) }), q.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
jm.displayName = "Background";
const cE = G.memo(jm);
function fE() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: q.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function dE() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: q.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function pE() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: q.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function hE() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: q.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function mE() {
  return q.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: q.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Gs({ children: t, className: r, ...i }) {
  return q.jsx("button", { type: "button", className: rt(["react-flow__controls-button", r]), ...i, children: t });
}
const gE = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function Hm({ style: t, showZoom: r = !0, showFitView: i = !0, showInteractive: l = !0, fitViewOptions: u, onZoomIn: c, onZoomOut: f, onFitView: p, onInteractiveChange: h, className: v, children: g, position: y = "bottom-left", orientation: m = "vertical", "aria-label": x }) {
  const k = We(), { isInteractive: E, minZoomReached: N, maxZoomReached: M, ariaLabelConfig: R } = Ie(gE, Qe), { zoomIn: S, zoomOut: P, fitView: A } = pc(), H = () => {
    S(), c == null || c();
  }, B = () => {
    P(), f == null || f();
  }, V = () => {
    A(u), p == null || p();
  }, ee = () => {
    k.setState({
      nodesDraggable: !E,
      nodesConnectable: !E,
      elementsSelectable: !E
    }), h == null || h(!E);
  }, oe = m === "horizontal" ? "horizontal" : "vertical";
  return q.jsxs(Nl, { className: rt(["react-flow__controls", oe, v]), position: y, style: t, "data-testid": "rf__controls", "aria-label": x ?? R["controls.ariaLabel"], children: [r && q.jsxs(q.Fragment, { children: [q.jsx(Gs, { onClick: H, className: "react-flow__controls-zoomin", title: R["controls.zoomIn.ariaLabel"], "aria-label": R["controls.zoomIn.ariaLabel"], disabled: M, children: q.jsx(fE, {}) }), q.jsx(Gs, { onClick: B, className: "react-flow__controls-zoomout", title: R["controls.zoomOut.ariaLabel"], "aria-label": R["controls.zoomOut.ariaLabel"], disabled: N, children: q.jsx(dE, {}) })] }), i && q.jsx(Gs, { className: "react-flow__controls-fitview", onClick: V, title: R["controls.fitView.ariaLabel"], "aria-label": R["controls.fitView.ariaLabel"], children: q.jsx(pE, {}) }), l && q.jsx(Gs, { className: "react-flow__controls-interactive", onClick: ee, title: R["controls.interactive.ariaLabel"], "aria-label": R["controls.interactive.ariaLabel"], children: E ? q.jsx(mE, {}) : q.jsx(hE, {}) }), g] });
}
Hm.displayName = "Controls";
const yE = G.memo(Hm);
function vE({ id: t, x: r, y: i, width: l, height: u, style: c, color: f, strokeColor: p, strokeWidth: h, className: v, borderRadius: g, shapeRendering: y, selected: m, onClick: x }) {
  const { background: k, backgroundColor: E } = c || {}, N = f || k || E;
  return q.jsx("rect", { className: rt(["react-flow__minimap-node", { selected: m }, v]), x: r, y: i, rx: g, ry: g, width: l, height: u, style: {
    fill: N,
    stroke: p,
    strokeWidth: h
  }, shapeRendering: y, onClick: x ? (M) => x(M, t) : void 0 });
}
const wE = G.memo(vE), xE = (t) => t.nodes.map((r) => r.id), $a = (t) => t instanceof Function ? t : () => t;
function SE({
  nodeStrokeColor: t,
  nodeColor: r,
  nodeClassName: i = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: u,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c = wE,
  onClick: f
}) {
  const p = Ie(xE, Qe), h = $a(r), v = $a(t), g = $a(i), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return q.jsx(q.Fragment, { children: p.map((m) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    q.jsx(_E, { id: m, nodeColorFunc: h, nodeStrokeColorFunc: v, nodeClassNameFunc: g, nodeBorderRadius: l, nodeStrokeWidth: u, NodeComponent: c, onClick: f, shapeRendering: y }, m)
  )) });
}
function EE({ id: t, nodeColorFunc: r, nodeStrokeColorFunc: i, nodeClassNameFunc: l, nodeBorderRadius: u, nodeStrokeWidth: c, shapeRendering: f, NodeComponent: p, onClick: h }) {
  const { node: v, x: g, y, width: m, height: x } = Ie((k) => {
    const { internals: E } = k.nodeLookup.get(t), N = E.userNode, { x: M, y: R } = E.positionAbsolute, { width: S, height: P } = Ln(N);
    return {
      node: N,
      x: M,
      y: R,
      width: S,
      height: P
    };
  }, Qe);
  return !v || v.hidden || !Wh(v) ? null : q.jsx(p, { x: g, y, width: m, height: x, style: v.style, selected: !!v.selected, className: l(v), color: r(v), borderRadius: u, strokeColor: i(v), strokeWidth: c, shapeRendering: f, onClick: h, id: v.id });
}
const _E = G.memo(EE);
var kE = G.memo(SE);
const NE = 200, CE = 150, ME = (t) => !t.hidden, PE = (t) => {
  const r = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: r,
    boundingRect: t.nodeLookup.size > 0 ? Uh(Ni(t.nodeLookup, { filter: ME }), r) : r,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, TE = "react-flow__minimap-desc";
function bm({
  style: t,
  className: r,
  nodeStrokeColor: i,
  nodeColor: l,
  nodeClassName: u = "",
  nodeBorderRadius: c = 5,
  nodeStrokeWidth: f,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: p,
  bgColor: h,
  maskColor: v,
  maskStrokeColor: g,
  maskStrokeWidth: y,
  position: m = "bottom-right",
  onClick: x,
  onNodeClick: k,
  pannable: E = !1,
  zoomable: N = !1,
  ariaLabel: M,
  inversePan: R,
  zoomStep: S = 10,
  offsetScale: P = 5
}) {
  const A = We(), H = G.useRef(null), { boundingRect: B, viewBB: V, rfId: ee, panZoom: oe, translateExtent: Z, flowWidth: te, flowHeight: J, ariaLabelConfig: C } = Ie(PE, Qe), b = (t == null ? void 0 : t.width) ?? NE, D = (t == null ? void 0 : t.height) ?? CE, j = B.width / b, z = B.height / D, L = Math.max(j, z), O = L * b, _ = L * D, F = P * L, K = B.x - (O - B.width) / 2 - F, Y = B.y - (_ - B.height) / 2 - F, ue = O + F * 2, ce = _ + F * 2, fe = `${TE}-${ee}`, se = G.useRef(0), de = G.useRef();
  se.current = L, G.useEffect(() => {
    if (H.current && oe)
      return de.current = U1({
        domNode: H.current,
        panZoom: oe,
        getTransform: () => A.getState().transform,
        getViewScale: () => se.current
      }), () => {
        var Ee;
        (Ee = de.current) == null || Ee.destroy();
      };
  }, [oe]), G.useEffect(() => {
    var Ee;
    (Ee = de.current) == null || Ee.update({
      translateExtent: Z,
      width: te,
      height: J,
      inversePan: R,
      pannable: E,
      zoomStep: S,
      zoomable: N
    });
  }, [E, N, R, S, Z, te, J]);
  const Ne = x ? (Ee) => {
    var Oe;
    const [xe, Ae] = ((Oe = de.current) == null ? void 0 : Oe.pointer(Ee)) || [0, 0];
    x(Ee, { x: xe, y: Ae });
  } : void 0, Pe = k ? G.useCallback((Ee, xe) => {
    const Ae = A.getState().nodeLookup.get(xe).internals.userNode;
    k(Ee, Ae);
  }, []) : void 0, Se = M ?? C["minimap.ariaLabel"];
  return q.jsx(Nl, { position: m, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof h == "string" ? h : void 0,
    "--xy-minimap-mask-background-color-props": typeof v == "string" ? v : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof y == "number" ? y * L : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: rt(["react-flow__minimap", r]), "data-testid": "rf__minimap", children: q.jsxs("svg", { width: b, height: D, viewBox: `${K} ${Y} ${ue} ${ce}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": fe, ref: H, onClick: Ne, children: [Se && q.jsx("title", { id: fe, children: Se }), q.jsx(kE, { onClick: Pe, nodeColor: l, nodeStrokeColor: i, nodeBorderRadius: c, nodeClassName: u, nodeStrokeWidth: f, nodeComponent: p }), q.jsx("path", { className: "react-flow__minimap-mask", d: `M${K - F},${Y - F}h${ue + F * 2}v${ce + F * 2}h${-ue - F * 2}z
        M${V.x},${V.y}h${V.width}v${V.height}h${-V.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
bm.displayName = "MiniMap";
G.memo(bm);
const LE = (t) => (r) => t ? `${Math.max(1 / r.transform[2], 1)}` : void 0, IE = {
  [go.Line]: "right",
  [go.Handle]: "bottom-right"
};
function zE({ nodeId: t, position: r, variant: i = go.Handle, className: l, style: u = void 0, children: c, color: f, minWidth: p = 10, minHeight: h = 10, maxWidth: v = Number.MAX_VALUE, maxHeight: g = Number.MAX_VALUE, keepAspectRatio: y = !1, resizeDirection: m, autoScale: x = !0, shouldResize: k, onResizeStart: E, onResize: N, onResizeEnd: M }) {
  const R = wm(), S = typeof t == "string" ? t : R, P = We(), A = G.useRef(null), H = i === go.Handle, B = Ie(G.useCallback(LE(H && x), [H, x]), Qe), V = G.useRef(null), ee = r ?? IE[i];
  G.useEffect(() => {
    if (!(!A.current || !S))
      return V.current || (V.current = sx({
        domNode: A.current,
        nodeId: S,
        getStoreItems: () => {
          const { nodeLookup: Z, transform: te, snapGrid: J, snapToGrid: C, nodeOrigin: b, domNode: D } = P.getState();
          return {
            nodeLookup: Z,
            transform: te,
            snapGrid: J,
            snapToGrid: C,
            nodeOrigin: b,
            paneDomNode: D
          };
        },
        onChange: (Z, te) => {
          const { triggerNodeChanges: J, nodeLookup: C, parentLookup: b, nodeOrigin: D } = P.getState(), j = [], z = { x: Z.x, y: Z.y }, L = C.get(S);
          if (L && L.expandParent && L.parentId) {
            const O = L.origin ?? D, _ = Z.width ?? L.measured.width ?? 0, F = Z.height ?? L.measured.height ?? 0, K = {
              id: L.id,
              parentId: L.parentId,
              rect: {
                width: _,
                height: F,
                ...Yh({
                  x: Z.x ?? L.position.x,
                  y: Z.y ?? L.position.y
                }, { width: _, height: F }, L.parentId, C, O)
              }
            }, Y = dc([K], C, b, D);
            j.push(...Y), z.x = Z.x ? Math.max(O[0] * _, Z.x) : void 0, z.y = Z.y ? Math.max(O[1] * F, Z.y) : void 0;
          }
          if (z.x !== void 0 && z.y !== void 0) {
            const O = {
              id: S,
              type: "position",
              position: { ...z }
            };
            j.push(O);
          }
          if (Z.width !== void 0 && Z.height !== void 0) {
            const _ = {
              id: S,
              type: "dimensions",
              resizing: !0,
              setAttributes: m ? m === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: Z.width,
                height: Z.height
              }
            };
            j.push(_);
          }
          for (const O of te) {
            const _ = {
              ...O,
              type: "position"
            };
            j.push(_);
          }
          J(j);
        },
        onEnd: ({ width: Z, height: te }) => {
          const J = {
            id: S,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: Z,
              height: te
            }
          };
          P.getState().triggerNodeChanges([J]);
        }
      })), V.current.update({
        controlPosition: ee,
        boundaries: {
          minWidth: p,
          minHeight: h,
          maxWidth: v,
          maxHeight: g
        },
        keepAspectRatio: y,
        resizeDirection: m,
        onResizeStart: E,
        onResize: N,
        onResizeEnd: M,
        shouldResize: k
      }), () => {
        var Z;
        (Z = V.current) == null || Z.destroy();
      };
  }, [
    ee,
    p,
    h,
    v,
    g,
    y,
    E,
    N,
    M,
    k
  ]);
  const oe = ee.split("-");
  return q.jsx("div", { className: rt(["react-flow__resize-control", "nodrag", ...oe, i, l]), ref: A, style: {
    ...u,
    scale: B,
    ...f && { [H ? "backgroundColor" : "borderColor"]: f }
  }, children: c });
}
G.memo(zE);
function RE(t) {
  const r = Array.isArray(t == null ? void 0 : t.events) ? t.events : [], i = r.filter((K) => K.type === "event"), l = r.filter((K) => K.type === "mutation"), u = rl(i, (K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) || "unknown";
  }), c = Math.max(0, ...r.map((K) => Number(K.timeOffsetMs) || 0)), f = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "click";
  }), p = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "mousemove";
  }), h = i.filter((K) => {
    var Y, ue;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "input" || ((ue = K.data) == null ? void 0 : ue.eventType) === "change";
  }), v = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "scroll";
  }), g = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "submit";
  }), y = g.filter((K) => {
    var Y;
    return !String(((Y = K.data) == null ? void 0 : Y.target) || "").includes("dialog");
  }), m = f.filter((K) => {
    var Y;
    return /가입하기|이체 확인|이벤트 참여|예상 금액 보기|검색|신청|확인/.test(String(((Y = K.data) == null ? void 0 : Y.text) || ""));
  }), x = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "navigation_intent";
  }), k = i.filter((K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.eventType) === "view_state";
  }), E = BE({ events: r, interactionEvents: i, clicks: f, submits: g, viewStates: k }), N = UE(v, (K) => {
    var Y;
    return Number((Y = K.data) == null ? void 0 : Y.scrollTop) || 0;
  }), M = new Set(i.map((K) => {
    var Y;
    return (Y = K.data) == null ? void 0 : Y.target;
  }).filter(Boolean)).size, R = rl(f, (K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.target) || "unknown";
  }), S = Object.values(R).filter((K) => K >= 3).length, P = rl(h, (K) => {
    var Y;
    return ((Y = K.data) == null ? void 0 : Y.target) || "unknown";
  }), A = Object.entries(P).sort((K, Y) => Y[1] - K[1]).slice(0, 5).map(([K, Y]) => ({ target: K, count: Y })), H = WE(p), B = YE(f, 1400, 3), V = Mn(N / 1800), ee = Mn(c / 9e4), oe = Mn(f.length / 18), Z = Mn(M / 12), te = Mn(l.length / 28), J = Mn(h.length / 8), C = y.length > 0 || m.length > 0 ? 1 : 0, b = Mn(x.length / 3), D = Mn(B * 0.45 + S * 0.25), j = (c < 12e3 ? 1 : 0) * 0.48 + (i.length < 8 ? 1 : 0) * 0.34 + (N < 250 ? 1 : 0) * 0.18, z = {
    engagementScore: Je(ee * 0.28 + oe * 0.24 + V * 0.22 + Z * 0.18 + te * 0.08),
    explorationScore: Je(V * 0.34 + Z * 0.3 + oe * 0.2 + b * 0.16),
    goalIntentScore: Je(J * 0.34 + C * 0.28 + b * 0.14 + oe * 0.14 + te * 0.1),
    purchaseIntentScore: Je(J * 0.34 + C * 0.28 + b * 0.14 + oe * 0.14 + te * 0.1),
    frictionScore: Je(D * 0.44 + (h.length >= 8 && C === 0 ? 1 : 0) * 0.24 + (c > 6e4 && C === 0 ? 1 : 0) * 0.16 + (S > 0 ? 0.16 : 0)),
    formIntentScore: Je(J * 0.72 + C * 0.28),
    conversionScore: Je(C * 0.76 + J * 0.24),
    bounceRiskScore: Je(j * (C ? 0.25 : 1))
  }, L = DE(z, {
    submits: y.length + m.length,
    inputs: h.length,
    rapidClickBursts: B,
    journeyContext: E
  }), O = {
    shortBounce: c < 12e3 && i.length < 8,
    heavyExploration: N > 500 && p.length > 30,
    formIntent: h.length >= 4,
    completion: C > 0,
    hesitation: h.length >= 8 && C === 0,
    frustration: B > 0
  }, _ = AE(O), F = {
    totalEvents: r.length,
    interactionEvents: i.length,
    mutationEvents: l.length,
    durationMs: c,
    durationSec: Jp(c / 1e3),
    byEventType: u,
    uniqueTargets: M,
    maxScrollTop: N,
    totalMouseDistance: Jp(H),
    rapidClickBursts: B,
    repeatedClickTargets: S,
    navigationIntents: x.length,
    journeyContext: E,
    topInputTargets: A,
    submits: g.length,
    meaningfulSubmits: y.length,
    actionClicks: m.length,
    labels: _,
    behaviorSignals: O,
    metrics: z,
    customerType: L
  };
  return {
    summary: F,
    prompt: $E(F)
  };
}
function AE(t) {
  const r = [];
  return t.shortBounce && r.push("short_bounce"), t.heavyExploration && r.push("exploration"), t.formIntent && t.completion ? r.push("goal_completed") : t.formIntent && !t.completion && r.push("goal_attempted_not_completed"), t.hesitation && r.push("hesitation"), t.frustration && r.push("frustration_signal"), r.length || r.push("neutral"), r;
}
function $E(t) {
  return [
    "You are a UX behavior analyst.",
    "Define a precise Korean customer type from this session. Do not choose only from predefined categories.",
    "Avoid abstract labels such as '목적 행동 완료형 고객' or 'goal-directed user'. Name the actual goal shown in the session, such as 이체 완료 고객, 금융상품 가입 검토 고객, 환전 준비 고객, 혜택 이벤트 확인 고객, 카드 사용내역 확인 고객, or 고객센터 문제 해결 고객.",
    "Use marketer-friendly Korean wording. Avoid developer terms unless they are in evidence fields.",
    "Interpret goal intent according to the financial app screen context. For example, transfer form completion is transaction execution intent, not purchase intent.",
    "Use the quantitative metrics, journeyContext, and customerType candidates as strong evidence, but override them if the raw event summary suggests a better interpretation.",
    "Output valid JSON only (no markdown fences).",
    "Schema:",
    '{"customer_type_name":"구체적인 한국어 고객 유형명","customer_type_description":"마케터가 이해할 수 있는 한국어 설명","secondary_traits":["한국어 보조 특성"],"confidence":0-1,"why_this_type":["한국어 판단 이유"],"evidence":["한국어 근거"]}',
    "Session summary:",
    JSON.stringify(t, null, 2)
  ].join(`
`);
}
function DE(t, r) {
  const i = t.goalIntentScore ?? t.purchaseIntentScore, u = [
    jE(t, r, i),
    HE(t, r, i),
    {
      type: "comparison_explorer",
      labelKo: "서비스 비교 탐색 고객",
      score: Je(t.explorationScore * 0.48 + t.engagementScore * 0.28 + (1 - t.conversionScore) * 0.14 + i * 0.1)
    },
    {
      type: "hesitant_form_user",
      labelKo: "입력 후 망설이는 고객",
      score: Je(t.formIntentScore * 0.42 + (1 - t.conversionScore) * 0.26 + t.frictionScore * 0.2 + t.engagementScore * 0.12)
    },
    {
      type: "frustrated_user",
      labelKo: "마찰을 겪는 고객",
      score: Je(t.frictionScore * 0.58 + t.engagementScore * 0.18 + (r.rapidClickBursts > 0 ? 1 : 0) * 0.24)
    },
    {
      type: "low_engagement_bouncer",
      labelKo: "저관여 이탈 위험 고객",
      score: Je(t.bounceRiskScore * 0.62 + (1 - t.engagementScore) * 0.28 + (1 - i) * 0.1)
    }
  ].filter(Boolean).sort((p, h) => h.score - p.score), c = OE(u), f = c[0] || { type: "neutral", labelKo: "중립 고객", score: 0 };
  return {
    primaryType: f.type,
    primaryLabelKo: f.labelKo,
    confidence: Je(f.score),
    candidates: c.slice(0, 5),
    reasonCodes: FE(t, r)
  };
}
function OE(t) {
  const r = /* @__PURE__ */ new Set();
  return t.filter((i) => {
    const l = i.labelKo || i.type;
    return r.has(l) ? !1 : (r.add(l), !0);
  });
}
function FE(t, r) {
  var u, c, f, p, h, v, g;
  const i = [];
  return (t.goalIntentScore ?? t.purchaseIntentScore) >= 0.65 && i.push("goal_intent_high"), t.explorationScore >= 0.65 && i.push("exploration_high"), t.frictionScore >= 0.55 && i.push("friction_detected"), t.bounceRiskScore >= 0.6 && i.push("bounce_risk_high"), r.submits > 0 ? i.push("goal_completed") : r.inputs > 0 && i.push("form_started_without_submit"), (u = r.journeyContext) != null && u.isTransferFlow && i.push("transfer_flow"), (c = r.journeyContext) != null && c.isProductFlow && i.push("product_flow"), (f = r.journeyContext) != null && f.isExchangeFlow && i.push("exchange_flow"), (p = r.journeyContext) != null && p.isSupportFlow && i.push("support_flow"), (h = r.journeyContext) != null && h.isBenefitFlow && i.push("benefit_flow"), (v = r.journeyContext) != null && v.isCardFlow && i.push("card_flow"), (g = r.journeyContext) != null && g.isAssetFlow && i.push("asset_flow"), i.length ? i : ["neutral_behavior"];
}
function jE(t, r, i) {
  const l = r.journeyContext || {}, u = r.submits > 0 ? 1 : 0;
  return l.isTransferFlow ? {
    type: u ? "transaction_executor" : "transaction_intent_user",
    labelKo: u ? "이체 완료 고객" : "이체 준비 고객",
    score: Je(i * 0.34 + t.conversionScore * 0.28 + t.formIntentScore * 0.22 + t.engagementScore * 0.08 + u * 0.08)
  } : l.isExchangeFlow ? {
    type: u ? "exchange_execution_user" : "exchange_planning_user",
    labelKo: u ? "환전 신청 완료 고객" : "환전 준비 고객",
    score: Je(i * 0.36 + t.formIntentScore * 0.24 + t.conversionScore * 0.22 + t.engagementScore * 0.1 + u * 0.08)
  } : l.isSupportFlow ? {
    type: "support_seeking_user",
    labelKo: "고객센터 문제 해결 고객",
    score: Je(t.explorationScore * 0.28 + i * 0.24 + t.formIntentScore * 0.22 + t.engagementScore * 0.16 + u * 0.1)
  } : l.isProductFlow ? {
    type: u ? "product_application_intent_user" : "product_consideration_user",
    labelKo: u ? "상품 가입 버튼 클릭 고객" : "상품 비교 검토 고객",
    score: Je(i * 0.38 + t.explorationScore * 0.22 + t.engagementScore * 0.18 + t.conversionScore * 0.14 + u * 0.08)
  } : l.isBenefitFlow ? {
    type: u ? "benefit_participation_user" : "benefit_event_checking_user",
    labelKo: u ? "이벤트 참여 고객" : "혜택 이벤트 확인 고객",
    score: Je(i * 0.34 + t.explorationScore * 0.26 + t.engagementScore * 0.18 + t.conversionScore * 0.14 + u * 0.08)
  } : l.isCardFlow ? {
    type: "card_usage_checking_user",
    labelKo: "카드 사용내역 확인 고객",
    score: Je(t.explorationScore * 0.3 + i * 0.26 + t.engagementScore * 0.24 + t.conversionScore * 0.12 + u * 0.08)
  } : l.isAssetFlow ? {
    type: "spending_insight_checking_user",
    labelKo: "자산·소비 점검 고객",
    score: Je(t.explorationScore * 0.34 + t.engagementScore * 0.28 + i * 0.2 + t.conversionScore * 0.1 + u * 0.08)
  } : null;
}
function HE(t, r, i) {
  const l = r.submits > 0;
  return {
    type: "goal_directed_completer",
    labelKo: bE(r, l),
    score: Je(i * 0.42 + t.conversionScore * 0.28 + t.engagementScore * 0.18 + (l ? 1 : 0) * 0.12)
  };
}
function bE(t, r) {
  const i = t.journeyContext || {};
  return i.isTransferFlow ? r ? "이체 완료 고객" : "이체 진행 의도 고객" : i.isExchangeFlow ? r ? "환전 신청 완료 고객" : "환전 준비 고객" : i.isSupportFlow ? r ? "고객 문의 접수 고객" : "고객센터 문제 해결 고객" : i.isProductFlow ? r ? "상품 가입 버튼 클릭 고객" : "금융상품 비교 검토 고객" : i.isBenefitFlow ? r ? "이벤트 참여 고객" : "혜택 이벤트 확인 고객" : i.isCardFlow ? "카드 사용내역 확인 고객" : i.isAssetFlow ? "자산·소비 점검 고객" : r ? "서비스 실행 고객" : "서비스 이용 의도 고객";
}
function BE({ events: t, interactionEvents: r, clicks: i, submits: l, viewStates: u }) {
  const c = u.map((y) => {
    var m;
    return String(((m = y.data) == null ? void 0 : m.screenName) || "").trim();
  }).filter(Boolean), f = c[c.length - 1] || VE({ events: t, interactionEvents: r, clicks: i, submits: l }), p = rl(c, (y) => y), h = i.map((y) => {
    var m;
    return String(((m = y.data) == null ? void 0 : m.text) || "").trim();
  }).filter(Boolean).slice(-12), v = l.map((y) => {
    var m;
    return ((m = y.data) == null ? void 0 : m.target) || "";
  }).filter(Boolean), g = [f, ...c, ...h, ...v].join(" ").toLowerCase();
  return {
    screens: c,
    lastScreen: f,
    screenCounts: p,
    clickTexts: h,
    submitTargets: v,
    isTransferFlow: /transfer|이체|송금/.test(g),
    isProductFlow: /products|product-list|상품|예금|적금|대출|펀드|isa|irp|청약/.test(g),
    isExchangeFlow: /exchange|환전|usd|jpy|eur/.test(g),
    isSupportFlow: /support|고객센터|상담|faq|문의/.test(g),
    isBenefitFlow: /benefits|event-detail|혜택|이벤트|포인트/.test(g),
    isCardFlow: /cards|카드|결제|실적/.test(g),
    isAssetFlow: /assets|자산|소비|지출/.test(g)
  };
}
function VE({ events: t, interactionEvents: r, clicks: i, submits: l }) {
  var c, f;
  const u = [
    ...r.map((p) => {
      var h;
      return ((h = p.data) == null ? void 0 : h.target) || "";
    }),
    ...i.map((p) => {
      var h;
      return ((h = p.data) == null ? void 0 : h.text) || "";
    }),
    ...l.map((p) => {
      var h;
      return ((h = p.data) == null ? void 0 : h.target) || "";
    }),
    ((f = (c = t == null ? void 0 : t[0]) == null ? void 0 : c.data) == null ? void 0 : f.url) || ""
  ].join(" ").toLowerCase();
  return /transfer|이체|송금/.test(u) ? "transfer" : /exchange|환전/.test(u) ? "exchange" : /support|고객센터|상담|faq|문의/.test(u) ? "support" : /benefits|event-detail|혜택|이벤트|포인트/.test(u) ? "benefits" : /cards|카드|결제|실적/.test(u) ? "cards" : /assets|자산|소비|지출/.test(u) ? "assets" : /product|상품|예금|적금|대출|펀드|isa|irp|청약/.test(u) ? "products" : "";
}
function rl(t, r) {
  const i = {};
  return t.forEach((l) => {
    const u = r(l);
    i[u] = (i[u] || 0) + 1;
  }), i;
}
function UE(t, r) {
  let i = 0;
  return t.forEach((l) => {
    const u = r(l);
    u > i && (i = u);
  }), i;
}
function WE(t) {
  if (t.length < 2)
    return 0;
  let r = 0;
  for (let i = 1; i < t.length; i += 1) {
    const l = t[i - 1].data || {}, u = t[i].data || {}, c = (Number(u.x) || 0) - (Number(l.x) || 0), f = (Number(u.y) || 0) - (Number(l.y) || 0);
    r += Math.hypot(c, f);
  }
  return r;
}
function YE(t, r, i) {
  if (t.length < i)
    return 0;
  let l = 0, u = 0;
  for (let c = 0; c < t.length; c += 1) {
    const f = Number(t[c].timeOffsetMs) || 0;
    for (; u < c && f - (Number(t[u].timeOffsetMs) || 0) > r; )
      u += 1;
    c - u + 1 >= i && (l += 1, u = c);
  }
  return l;
}
function Jp(t) {
  return Number(Number(t).toFixed(2));
}
function Je(t) {
  return Number(Mn(t).toFixed(2));
}
function Mn(t) {
  const r = Number(t);
  return Number.isFinite(r) ? Math.max(0, Math.min(1, r)) : 0;
}
const Ga = ["기준 설정", "로그 분석", "LLM 분석"], Bm = { waiting: "대기", running: "실행 중", completed: "완료", failed: "실패" };
function XE({ data: t }) {
  return /* @__PURE__ */ W.createElement("div", { className: `analysis-node ${t.status}` }, /* @__PURE__ */ W.createElement(yo, { type: "target", position: we.Left }), /* @__PURE__ */ W.createElement("div", { className: "an-node-top" }, /* @__PURE__ */ W.createElement("span", null, "STEP 0", t.order), /* @__PURE__ */ W.createElement("b", null, Bm[t.status])), /* @__PURE__ */ W.createElement("strong", null, t.label), /* @__PURE__ */ W.createElement("p", null, t.subtitle), /* @__PURE__ */ W.createElement("div", { className: "an-node-bottom" }, t.elapsed ? `${(t.elapsed / 1e3).toFixed(1)}초` : "—", /* @__PURE__ */ W.createElement("span", null, t.status === "completed" ? "✓" : t.status === "running" ? "●" : "○")), /* @__PURE__ */ W.createElement(yo, { type: "source", position: we.Right }));
}
function KE(t) {
  const [r] = uc(t);
  return /* @__PURE__ */ W.createElement(W.Fragment, null, /* @__PURE__ */ W.createElement(Mi, { path: r, markerEnd: t.markerEnd, style: { stroke: t.data.done ? "#28c6a4" : t.data.active ? "#60a5fa" : "#475569", strokeWidth: 2 } }), t.data.active && /* @__PURE__ */ W.createElement(W.Fragment, null, /* @__PURE__ */ W.createElement("path", { d: r, fill: "none", stroke: "#60a5fa", strokeWidth: "3", strokeDasharray: "6 10", className: "analysis-edge" }), /* @__PURE__ */ W.createElement("circle", { r: "4", fill: "#93c5fd" }, /* @__PURE__ */ W.createElement("animateMotion", { dur: "1.4s", repeatCount: "indefinite", path: r }))));
}
const QE = { execution: XE }, GE = { animated: KE }, eh = () => Ga.map(() => ({ status: "waiting", elapsed: 0 })), Er = () => window.ReplayDetailBridge, th = window.SessionReplaySDK.getConfig(), qs = (t) => window.SessionReplaySDK.previewCollection({ eventType: "view_state", data: { screenName: t.screenName, title: t.screenLabel, activeSelector: t.screenName ? `.screen[data-view=${JSON.stringify(t.screenName)}]` : "document", scrollTop: "<화면 진입 시 스크롤 위치>" } }), ci = (t) => {
  try {
    const r = new URL(t, location.href);
    return r.pathname + r.search + r.hash;
  } catch {
    return "";
  }
}, nh = (t) => `${Math.floor(t / 6e4)}:${String(Math.floor(t / 1e3) % 60).padStart(2, "0")}`;
function qE(t) {
  var i;
  if (t.id) return `#${CSS.escape(t.id)}`;
  for (const l of ["data-testid", "data-test", "data-qa", "data-cy", "name", "aria-label"]) {
    const u = t.getAttribute(l);
    if (!u) continue;
    const c = `${t.tagName.toLowerCase()}[${l}=${JSON.stringify(u)}]`;
    if (t.ownerDocument.querySelectorAll(c).length === 1) return c;
  }
  const r = [];
  for (let l = t; l && l !== t.ownerDocument.body; l = l.parentElement) {
    const u = [...((i = l.parentElement) == null ? void 0 : i.children) || []].filter((c) => c.tagName === l.tagName);
    r.unshift(`${l.tagName.toLowerCase()}:nth-of-type(${u.indexOf(l) + 1})`);
  }
  return r.join(" > ");
}
const Ue = (t) => JSON.stringify([t.pagePath, t.screenName || ""]);
function ZE(t) {
  var l, u, c;
  if (!t) return [];
  const r = [];
  let i = ci(((l = t.page) == null ? void 0 : l.href) || location.href);
  for (const f of t.events) {
    const p = f.data || {};
    let h;
    if (f.type === "snapshot") {
      i = ci(p.url || i);
      const v = new DOMParser().parseFromString(p.html || "", "text/html");
      h = { pagePath: i, screenName: ((u = v.querySelector(".screen.active[data-view]")) == null ? void 0 : u.dataset.view) || "", screenLabel: ((c = v.querySelector("#screen-title")) == null ? void 0 : c.textContent) || v.title || i, time: f.timeOffsetMs || 0 };
    } else p.eventType === "view_state" ? h = { pagePath: i, screenName: p.screenName || "", screenLabel: p.title || p.screenName || i, time: f.timeOffsetMs } : ["history_pushstate", "history_replacestate", "popstate", "hashchange"].includes(p.eventType) && p.href && (i = ci(p.href), h = { pagePath: i, screenName: "", screenLabel: i, time: f.timeOffsetMs });
    h && !r.some((v) => Ue(v) === Ue(h)) && r.push(h);
  }
  return r;
}
function rh(t) {
  var u, c, f, p, h, v, g;
  const r = (u = t.frame) == null ? void 0 : u.contentDocument;
  if (!(r != null && r.body) || !t.payload) return null;
  let i = ((f = (c = t.payload.events.find((y) => y.type === "snapshot")) == null ? void 0 : c.data) == null ? void 0 : f.url) || ((p = t.payload.page) == null ? void 0 : p.href);
  const l = Number(document.getElementById("replay-position").value);
  for (const y of t.payload.events)
    y.timeOffsetMs <= l && ["history_pushstate", "history_replacestate", "popstate", "hashchange"].includes((h = y.data) == null ? void 0 : h.eventType) && (i = y.data.href || i);
  return { pagePath: ci(i), screenName: ((v = r.querySelector(".screen.active[data-view]")) == null ? void 0 : v.dataset.view) || "", screenLabel: ((g = r.querySelector("#screen-title")) == null ? void 0 : g.textContent) || r.title || ci(i) };
}
function JE() {
  var Lt;
  const [t, r] = G.useState(() => {
    var ne;
    return ((ne = Er()) == null ? void 0 : ne.getContext()) || {};
  }), [i, l] = G.useState(!1), [u, c] = G.useState("all"), [f, p] = G.useState([]), [h, v] = G.useState(""), [g, y] = G.useState(null), [m, x] = G.useState(!1), [k, E] = G.useState("현재 선택한 세션 전체의 행동을 분석합니다."), [N, M] = G.useState(""), [R, S] = G.useState(eh), [P, A] = G.useState([]), [H, B] = G.useState(null), [V, ee] = G.useState(!1), [oe, Z] = G.useState(!1), [te, J] = G.useState(!1), C = G.useRef(null), b = G.useRef(0), D = G.useRef(!1), j = G.useMemo(() => ZE(t.payload), [t.payload]), z = G.useMemo(() => t.payload ? RE(t.payload).summary : null, [t.payload]), L = f.reduce((ne, pe) => ne + pe.buttons.length, 0), O = !!(t.payload && (!i || f.length)), _ = i ? `${f.length}개 화면 · ${L}개 버튼` : "현재 선택한 세션 전체 행동", F = i && u === "all" ? "전체 세션" : "현재 선택한 세션", K = (ne) => A((pe) => [...pe, { at: (/* @__PURE__ */ new Date()).toLocaleTimeString("ko-KR", { hour12: !1 }), text: ne }]), Y = (ne, pe) => S((Me) => Me.map((Te, De) => De === ne ? { ...Te, ...pe } : Te)), ue = () => {
    B(null), S(eh()), A([]);
  };
  G.useEffect(() => {
    const ne = (pe) => {
      b.current += 1, r({ ...Er().getContext(), ...pe.detail }), p([]), v(""), y(null), x(!1), ue(), E("분석 대상 세션을 불러왔습니다.");
    };
    return window.addEventListener("replay:session", ne), () => window.removeEventListener("replay:session", ne);
  }, []), G.useEffect(() => {
    var ne, pe, Me, Te;
    window.SessionReplaySDK.configure({ ...th, ...(pe = (ne = t.payload) == null ? void 0 : ne.recordingConfig) == null ? void 0 : pe.privacy, enabledEvents: ((Te = (Me = t.payload) == null ? void 0 : Me.recordingConfig) == null ? void 0 : Te.enabledEvents) || th.enabledEvents });
  }, [t.payload]), G.useEffect(() => {
    const ne = t.frame;
    if (!ne) return;
    let pe = () => {
    };
    const Me = () => {
      pe();
      const Te = ne.contentDocument;
      if (!(Te != null && Te.body)) return;
      let De;
      const Fe = Te.createElement("style");
      Fe.textContent = '[data-analysis-hover]{outline:3px solid #4f7cff!important;outline-offset:3px;cursor:crosshair!important}[data-analysis-selected]{outline:3px solid #14b8a6!important;outline-offset:3px;position:relative!important}[data-analysis-selected]::after{content:attr(data-analysis-index) / "";position:absolute;right:-7px;top:-9px;min-width:18px;height:18px;line-height:18px;text-align:center;border-radius:6px;background:#0c9d8c;color:white;font:700 10px/18px sans-serif;z-index:999;pointer-events:none}[data-analysis-screen]{outline:2px dashed #8eb2ff!important;outline-offset:-2px}', Te.head.append(Fe);
      const et = () => {
        var Ht;
        Te.querySelectorAll("[data-analysis-selected],[data-analysis-screen]").forEach((tt) => {
          tt.removeAttribute("data-analysis-selected"), tt.removeAttribute("data-analysis-index"), tt.removeAttribute("data-analysis-screen");
        });
        const qe = rh({ ...t, frame: ne });
        if (!qe) return;
        const je = Ue(qe);
        v(je);
        let It = 0;
        for (const tt of f) {
          i && Ue(tt) === je && tt.screenName && ((Ht = Te.querySelector(".screen.active[data-view]")) == null || Ht.setAttribute("data-analysis-screen", ""));
          for (const on of tt.buttons)
            if (It++, !(!i || Ue(tt) !== je))
              try {
                const wt = Te.querySelector(on.selectors[0]);
                wt == null || wt.setAttribute("data-analysis-selected", ""), wt == null || wt.setAttribute("data-analysis-index", String(It));
              } catch {
              }
        }
      }, st = (qe) => {
        De == null || De.removeAttribute("data-analysis-hover"), De = m ? qe.target.closest('button,a,[role="button"],input[type="submit"]') : null, De == null || De.setAttribute("data-analysis-hover", "");
      }, ct = (qe) => {
        var zn, Rn;
        if (!i || (qe.preventDefault(), qe.stopImmediatePropagation(), !m || D.current)) return;
        const je = qe.target.closest('button,a,[role="button"],input[type="submit"]');
        if (!je) {
          E("버튼 또는 링크를 선택하세요.");
          return;
        }
        const It = rh(t), Ht = It && f.find((xt) => Ue(xt) === Ue(It));
        if (!Ht) {
          E("먼저 화면 조건 목록에서 현재 화면을 선택하세요.");
          return;
        }
        const tt = window.SessionReplaySDK.previewCollection({ eventType: "click", target: je });
        if (y(tt), ue(), !tt.collectible) {
          E(tt.reason);
          return;
        }
        const on = tt.log.data.target, wt = Ht.buttons.some((xt) => xt.selectors.includes(on));
        if (wt && y(qs(Ht)), !wt && Ht.buttons.length >= 50) {
          E("화면당 버튼은 최대 50개까지 선택할 수 있습니다.");
          return;
        }
        const In = /* @__PURE__ */ new Set([on, qE(je)]);
        for (const xt of ((zn = t.payload) == null ? void 0 : zn.events) || [])
          if (((Rn = xt.data) == null ? void 0 : Rn.eventType) === "click")
            try {
              const ft = Te.querySelector(xt.data.target);
              ft && je.contains(ft) && In.add(xt.data.target);
            } catch {
            }
        const or = { label: (tt.log.data.text || je.getAttribute("aria-label") || "선택한 버튼").trim().replace(/\s+/g, " ").slice(0, 100), selectors: [...In].slice(0, 100), preview: tt };
        p((xt) => xt.map((ft) => Ue(ft) !== Ue(Ht) ? ft : { ...ft, buttons: wt ? ft.buttons.filter((sn) => !sn.selectors.includes(on)) : [...ft.buttons, or] })), E(wt ? "버튼 선택을 해제했습니다." : "버튼을 추가했습니다. 다른 버튼도 클릭해 선택한 뒤 선택 완료를 누르세요.");
      };
      et(), Te.addEventListener("pointermove", st, !0), Te.addEventListener("click", ct, !0), window.addEventListener("replay:position", et), pe = () => {
        Te.removeEventListener("pointermove", st, !0), Te.removeEventListener("click", ct, !0), window.removeEventListener("replay:position", et), Fe.remove(), Te.querySelectorAll("[data-analysis-hover],[data-analysis-selected],[data-analysis-screen]").forEach((qe) => {
          qe.removeAttribute("data-analysis-hover"), qe.removeAttribute("data-analysis-selected"), qe.removeAttribute("data-analysis-index"), qe.removeAttribute("data-analysis-screen");
        });
      };
    };
    return Me(), ne.addEventListener("load", Me), () => {
      pe(), ne.removeEventListener("load", Me);
    };
  }, [t, i, m, f]);
  async function ce(ne) {
    Er().pause(), Z(!0), x(!1);
    try {
      await Er().seek(ne.time), v(Ue(ne)), y(qs(ne));
    } catch (pe) {
      E(pe.message);
    } finally {
      Z(!1);
    }
  }
  function fe(ne) {
    ue(), x(!1);
    const pe = f.some((Me) => Ue(Me) === Ue(ne));
    if (!pe && f.length >= 30) {
      E("화면은 최대 30개까지 선택할 수 있습니다.");
      return;
    }
    p((Me) => pe ? Me.filter((Te) => Ue(Te) !== Ue(ne)) : [...Me, { ...ne, buttons: [] }]), y(pe ? null : qs(ne)), E(pe ? "화면과 해당 화면의 버튼 조건을 해제했습니다." : "화면을 추가했습니다. 버튼을 선택하지 않으면 화면 방문 조건으로 분석합니다."), pe || ce(ne);
  }
  function se(ne, pe) {
    p((Me) => Me.map((Te) => Ue(Te) !== Ue(ne) ? Te : { ...Te, buttons: Te.buttons.filter((De) => De.selectors[0] !== pe.selectors[0]) })), y(qs(ne)), ue();
  }
  function de(ne) {
    var pe;
    l(ne), x(!1), ue(), ne ? (pe = Er()) == null || pe.pause() : window.dispatchEvent(new CustomEvent("replay:single-mode")), E(ne ? "화면 조건 목록에서 여러 화면과 버튼을 선택하세요." : "현재 선택한 세션 전체의 행동을 분석합니다.");
  }
  function Ne() {
    return i ? { mode: "detail", scope: u, sessionId: t.sessionId, match: "any", conditions: f.map((ne) => ({ pagePath: ne.pagePath, screenName: ne.screenName, screenLabel: ne.screenLabel, buttons: ne.buttons.map(({ label: pe, selectors: Me }) => ({ label: pe, selectors: Me })) })) } : { mode: "session", scope: "current", sessionId: t.sessionId };
  }
  function Pe() {
    C.current.showModal(), J(!0);
  }
  async function Se(ne) {
    const pe = await fetch("/api/replay/analyze-cohort", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Ne()) });
    if (!pe.ok) {
      const et = await pe.json();
      throw new Error(et.error || "로그 조회 실패");
    }
    const Me = pe.body.getReader(), Te = new TextDecoder();
    let De = "", Fe;
    for (; ; ) {
      const { value: et, done: st } = await Me.read();
      De += Te.decode(et, { stream: !st });
      let ct;
      for (; (ct = De.indexOf(`
`)) !== -1; ) {
        const qe = De.slice(0, ct);
        if (De = De.slice(ct + 1), !qe.trim()) continue;
        const je = JSON.parse(qe);
        if (je.type === "error") throw new Error(je.error);
        je.type === "progress" && ne(je), je.type === "result" && (Fe = je);
      }
      if (st) break;
    }
    if (!Fe) throw new Error("분석 결과를 받지 못했습니다.");
    return Fe;
  }
  async function Ee(ne) {
    if (!O || D.current) return;
    D.current = !0, ee(!0), x(!1), Er().pause();
    const pe = ++b.current, Me = performance.now();
    let Te = 1, De = Me;
    B(null), A([]), S([{ status: "completed", elapsed: 0 }, { status: "running", elapsed: 0 }, { status: "waiting", elapsed: 0 }]), K(`기준 설정 완료 · ${F} · ${_}`);
    try {
      const Fe = await Se((ct) => {
        pe === b.current && Y(1, { subtitle: `${ct.scanned} / ${ct.total}개 세션 확인`, elapsed: performance.now() - Me });
      });
      if (pe !== b.current) return;
      if (B(Fe), Y(1, { status: "completed", elapsed: performance.now() - Me }), K(`로그 분석 완료 · ${Fe.summary.scannedSessions}개 중 ${Fe.summary.matchedSessions}개 세션 일치 · ${Fe.summary.matchedEvents}건`), !Fe.summary.matchedSessions) {
        E("조건에 맞는 세션이 없습니다. 화면 또는 버튼 조건을 변경해보세요."), K("일치 세션이 없어 LLM 분석을 실행하지 않았습니다.");
        return;
      }
      if (!ne) {
        K("로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.");
        return;
      }
      Te = 2, De = performance.now(), Y(2, { status: "running" }), K("선택한 분석 대상의 행동 요약으로 LLM 분석 시작");
      const et = await fetch("/api/llm-analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ summary: Fe.summary, analysisInstructions: `선택한 세션의 행동을 분석하세요. 조건이 여러 개면 화면별 버튼 조건 중 하나라도 일치한 세션입니다. 지표는 세션별 평균이며 세션 수를 고유 고객 수로 해석하지 마세요. 행동은 대상 세션 전체의 행동입니다. ${N}` }) }), st = await et.json();
      if (!et.ok) throw new Error(st.error || "LLM 분석 실패");
      if (pe !== b.current) return;
      Y(2, { status: "completed", elapsed: performance.now() - De }), K("LLM 분석 완료 · 우측 분석 결과에 반영했습니다."), E("분석이 완료되었습니다. 우측 분석 결과를 확인하세요."), window.dispatchEvent(new CustomEvent("replay:cohort-result", { detail: { result: Fe, llm: st } }));
    } catch (Fe) {
      if (pe !== b.current) return;
      Y(Te, { status: "failed", elapsed: performance.now() - De }), K(Fe.message), E(`분석 실패: ${Fe.message}`);
    } finally {
      D.current = !1, ee(!1);
    }
  }
  const xe = [O ? _ : "화면과 버튼 선택", H ? `${H.summary.scannedSessions}개 중 ${H.summary.matchedSessions}개 세션 일치` : i ? "조건에 맞는 행동 추출" : "선택한 세션의 행동 요약", R[2].status === "completed" ? "우측에서 분석 결과 확인" : "고객 행동 유형 해석"], Ae = Ga.map((ne, pe) => ({ id: String(pe), type: "execution", position: { x: pe * 290, y: 30 }, data: { order: pe + 1, label: ne, subtitle: xe[pe], ...R[pe] } })), Oe = [0, 1].map((ne) => ({ id: `e${ne}`, source: String(ne), target: String(ne + 1), type: "animated", data: { active: R[ne].status === "completed" && R[ne + 1].status === "running", done: R[ne + 1].status === "completed" }, markerEnd: { type: yi.ArrowClosed, color: "#64748b" } }));
  let vt = 0;
  const jt = /* @__PURE__ */ W.createElement("details", { className: "detail-prompt" }, /* @__PURE__ */ W.createElement("summary", null, "LLM 분석 기준 추가"), /* @__PURE__ */ W.createElement("textarea", { value: N, disabled: V, onChange: (ne) => M(ne.target.value), maxLength: 1e3, rows: "3", placeholder: "예: 가입 의도와 이탈 징후를 중심으로 분석해줘" }));
  return /* @__PURE__ */ W.createElement("div", { className: "detail-analysis" }, Wd.createPortal(/* @__PURE__ */ W.createElement(W.Fragment, null, /* @__PURE__ */ W.createElement("div", { className: "workflow-heading" }, /* @__PURE__ */ W.createElement("div", null, /* @__PURE__ */ W.createElement("span", { className: "detail-eyebrow" }, "WORKFLOW OVERVIEW"), /* @__PURE__ */ W.createElement("h2", null, "업무 진행 사항")), /* @__PURE__ */ W.createElement("div", { className: "workflow-tools" }, /* @__PURE__ */ W.createElement("span", { className: `workflow-run-state ${V ? "running" : ""}` }, V ? "분석 진행 중" : R[2].status === "completed" ? "분석 완료" : R.some((ne) => ne.status === "failed") ? "작업 실패" : "분석 준비"), /* @__PURE__ */ W.createElement("button", { type: "button", className: "detail-secondary", onClick: Pe }, "상세보기 ↗"))), /* @__PURE__ */ W.createElement("ol", { className: "workflow-sequence", "aria-label": "분석 진행 순서" }, Ga.map((ne, pe) => {
    const Me = pe === 0 && O && R[0].status === "waiting" ? "configured" : R[pe].status;
    return /* @__PURE__ */ W.createElement("li", { key: ne, className: Me, "aria-current": R[pe].status === "running" ? "step" : void 0 }, /* @__PURE__ */ W.createElement("span", { className: "sequence-number" }, R[pe].status === "completed" ? "✓" : `0${pe + 1}`), /* @__PURE__ */ W.createElement("div", null, /* @__PURE__ */ W.createElement("strong", null, ne), /* @__PURE__ */ W.createElement("p", null, xe[pe])), /* @__PURE__ */ W.createElement("span", { className: "sequence-status" }, Me === "configured" ? "설정됨" : Bm[Me]), pe < 2 && /* @__PURE__ */ W.createElement("span", { className: "sequence-arrow", "aria-hidden": "true" }, "→"));
  }))), document.getElementById("workflow-overview-root")), /* @__PURE__ */ W.createElement("div", { className: "detail-toolbar" }, /* @__PURE__ */ W.createElement("div", null, /* @__PURE__ */ W.createElement("span", { className: "detail-eyebrow" }, "02 · ANALYSIS CRITERIA"), /* @__PURE__ */ W.createElement("strong", null, i ? "분석 조건 설정" : "선택한 세션 행동 분석")), /* @__PURE__ */ W.createElement("label", { className: "detail-switch" }, /* @__PURE__ */ W.createElement("input", { type: "checkbox", role: "switch", checked: i, disabled: V, onChange: (ne) => de(ne.target.checked) }), /* @__PURE__ */ W.createElement("span", null), "상세 분석 ", /* @__PURE__ */ W.createElement("b", null, i ? "ON" : "OFF"))), !i && /* @__PURE__ */ W.createElement("section", { className: "single-session-analysis", "aria-label": "선택한 세션 행동 요약" }, z ? /* @__PURE__ */ W.createElement(W.Fragment, null, /* @__PURE__ */ W.createElement("div", { className: "single-session-name" }, /* @__PURE__ */ W.createElement("small", null, "현재 분석 대상 · 1개 세션"), /* @__PURE__ */ W.createElement("strong", null, ((Lt = t.payload.session) == null ? void 0 : Lt.name) || "현재 선택한 세션")), /* @__PURE__ */ W.createElement("div", { className: "single-stats" }, [["체류 시간", `${z.durationSec}초`], ["클릭", `${z.byEventType.click || 0}회`], ["입력·변경", `${(z.byEventType.input || 0) + (z.byEventType.change || 0)}회`], ["제출", `${z.submits}회`]].map(([ne, pe]) => /* @__PURE__ */ W.createElement("div", { key: ne }, /* @__PURE__ */ W.createElement("span", null, ne), /* @__PURE__ */ W.createElement("strong", null, pe)))), /* @__PURE__ */ W.createElement("div", { className: "single-type" }, /* @__PURE__ */ W.createElement("small", null, "행동 기반 요약"), /* @__PURE__ */ W.createElement("strong", null, z.customerType.primaryLabelKo || "행동 탐색 고객"), /* @__PURE__ */ W.createElement("p", null, z.behaviorSignals.frustration ? "반복 클릭 등 이용 과정의 마찰 신호가 있습니다." : z.behaviorSignals.completion ? "제출 또는 실행 버튼을 통한 완료 의도가 관찰되었습니다." : z.behaviorSignals.formIntent ? "정보를 입력하며 다음 행동을 준비한 세션입니다." : "화면 탐색과 상호작용을 중심으로 살펴볼 수 있는 세션입니다.")), /* @__PURE__ */ W.createElement("h3", null, "화면 탐색 흐름"), /* @__PURE__ */ W.createElement("ol", { className: "session-journey" }, j.map((ne) => /* @__PURE__ */ W.createElement("li", { key: Ue(ne) }, /* @__PURE__ */ W.createElement("time", null, nh(ne.time)), /* @__PURE__ */ W.createElement("span", null, ne.screenLabel)))), jt, /* @__PURE__ */ W.createElement("button", { type: "button", className: "single-analyze", disabled: V, onClick: () => Ee(!0) }, V ? "분석 진행 중…" : "선택 세션 정밀 분석 ↗"), /* @__PURE__ */ W.createElement("small", { className: "single-note" }, "화면·버튼 조건 없이 현재 세션 전체의 행동을 분석합니다.")) : /* @__PURE__ */ W.createElement("p", { className: "criteria-empty" }, "세션 목록에서 분석할 세션을 선택하세요.")), i && /* @__PURE__ */ W.createElement("div", { className: "detail-settings" }, /* @__PURE__ */ W.createElement("fieldset", { disabled: V || oe || !t.payload }, /* @__PURE__ */ W.createElement("div", { className: "detail-field" }, /* @__PURE__ */ W.createElement("span", null, "분석 범위"), /* @__PURE__ */ W.createElement("div", { className: "scope-options", role: "group", "aria-label": "분석 범위" }, [["all", "전체 세션"], ["current", "현재 선택한 세션"]].map(([ne, pe]) => /* @__PURE__ */ W.createElement("button", { key: ne, type: "button", "aria-pressed": u === ne, className: u === ne ? "selected" : "", onClick: () => {
    c(ne), ue();
  } }, pe)))), /* @__PURE__ */ W.createElement("section", { className: "screen-conditions", "aria-label": "화면 조건 보기" }, /* @__PURE__ */ W.createElement("div", { className: "condition-section-head" }, /* @__PURE__ */ W.createElement("h3", null, "화면 조건 보기"), /* @__PURE__ */ W.createElement("span", null, f.length, "개 선택")), /* @__PURE__ */ W.createElement("p", null, "체크하면 분석 조건에 추가하고 해당 화면을 표시합니다."), /* @__PURE__ */ W.createElement("ul", { className: "recorded-screen-list" }, j.map((ne) => {
    const pe = f.some((Me) => Ue(Me) === Ue(ne));
    return /* @__PURE__ */ W.createElement("li", { key: Ue(ne), className: `${pe ? "selected" : ""} ${h === Ue(ne) ? "viewing" : ""}` }, /* @__PURE__ */ W.createElement("label", null, /* @__PURE__ */ W.createElement("input", { type: "checkbox", "aria-label": `${ne.screenLabel} 화면 조건`, checked: pe, onChange: () => fe(ne) }), /* @__PURE__ */ W.createElement("span", null, /* @__PURE__ */ W.createElement("strong", null, ne.screenLabel), /* @__PURE__ */ W.createElement("small", null, nh(ne.time), h === Ue(ne) ? " · 보는 중" : ""))), /* @__PURE__ */ W.createElement("button", { type: "button", className: "detail-secondary", "aria-label": `${ne.screenLabel} 화면 보기`, onClick: () => ce(ne) }, "보기"));
  })), !j.length && /* @__PURE__ */ W.createElement("p", null, "이 세션에 기록된 화면이 없습니다.")), /* @__PURE__ */ W.createElement("section", { className: "selected-condition-section", "aria-label": "선택한 화면 및 버튼 조건" }, /* @__PURE__ */ W.createElement("div", { className: "condition-section-head" }, /* @__PURE__ */ W.createElement("h3", null, "선택한 조건"), /* @__PURE__ */ W.createElement("span", null, f.length, "개 화면 · ", L, "개 버튼")), /* @__PURE__ */ W.createElement("p", { className: "condition-match-note" }, "화면별 조건 중 하나라도 일치하면 포함합니다. 버튼이 없는 화면은 방문 조건입니다."), /* @__PURE__ */ W.createElement("button", { type: "button", className: m ? "picking multi-picker" : "multi-picker", disabled: !f.some((ne) => Ue(ne) === h), onClick: () => {
    Er().pause(), x(!m), E(m ? "버튼 선택을 마쳤습니다." : "왼쪽 화면의 버튼을 여러 개 클릭하세요. 다시 클릭하면 선택이 해제됩니다.");
  } }, m ? "버튼 선택 완료" : "화면에서 버튼 복수 선택"), /* @__PURE__ */ W.createElement("ul", { className: "selected-condition-list" }, f.map((ne, pe) => /* @__PURE__ */ W.createElement("li", { key: Ue(ne) }, /* @__PURE__ */ W.createElement("div", { className: "selected-condition-title" }, /* @__PURE__ */ W.createElement("button", { type: "button", className: "condition-view-link", onClick: () => ce(ne) }, pe + 1, ". ", ne.screenLabel), /* @__PURE__ */ W.createElement("button", { type: "button", className: "condition-remove", "aria-label": `${ne.screenLabel} 화면 조건 해제`, onClick: () => fe(ne) }, "×")), /* @__PURE__ */ W.createElement("code", null, ne.pagePath), ne.buttons.length ? /* @__PURE__ */ W.createElement("ul", null, ne.buttons.map((Me) => {
    const Te = ++vt;
    return /* @__PURE__ */ W.createElement("li", { key: Me.selectors[0] }, /* @__PURE__ */ W.createElement("span", { className: "selected-button-number" }, Te), /* @__PURE__ */ W.createElement("button", { type: "button", className: "selected-button-label", onClick: () => y(Me.preview) }, Me.label), /* @__PURE__ */ W.createElement("button", { type: "button", className: "condition-remove", "aria-label": `${ne.screenLabel} ${Me.label} 버튼 해제`, onClick: () => se(ne, Me) }, "×"));
  })) : /* @__PURE__ */ W.createElement("p", { className: "screen-visit-note" }, "화면 방문 · 버튼 조건 없음")))), !f.length && /* @__PURE__ */ W.createElement("p", { className: "condition-empty" }, "위 목록에서 분석할 화면을 선택하세요.")), jt, /* @__PURE__ */ W.createElement("div", { className: "detail-actions" }, /* @__PURE__ */ W.createElement("button", { type: "button", disabled: !O, onClick: () => Ee(!0) }, V ? "분석 진행 중…" : "분석 실행 ↗"), /* @__PURE__ */ W.createElement("button", { type: "button", className: "detail-secondary", disabled: !O, onClick: () => Ee(!1) }, "조건 일치 확인")))), /* @__PURE__ */ W.createElement("p", { className: "detail-message mode-message", role: "status" }, t.payload ? k : "먼저 세션 목록에서 리플레이를 선택하세요."), i && /* @__PURE__ */ W.createElement("section", { className: "collection-preview", "aria-label": "로그 수집 구조" }, /* @__PURE__ */ W.createElement("div", { className: "collection-heading" }, /* @__PURE__ */ W.createElement("div", null, /* @__PURE__ */ W.createElement("span", { className: "detail-eyebrow" }, "COLLECTION PREVIEW"), /* @__PURE__ */ W.createElement("h3", null, "로그 수집 구조")), /* @__PURE__ */ W.createElement("span", { className: "preview-badge" }, "로직 기반")), /* @__PURE__ */ W.createElement("p", { className: "collection-description" }, "선택한 조건의 수집 구조입니다. 목록의 버튼 이름을 누르면 해당 버튼의 구조를 확인합니다."), g ? g.collectible ? /* @__PURE__ */ W.createElement(W.Fragment, null, /* @__PURE__ */ W.createElement("div", { className: "collection-event-label" }, /* @__PURE__ */ W.createElement("span", null, g.log.data.eventType), /* @__PURE__ */ W.createElement("small", null, "선택한 조건의 로그 형태")), /* @__PURE__ */ W.createElement("pre", { "data-testid": "collection-log-structure" }, JSON.stringify(g.log, null, 2))) : /* @__PURE__ */ W.createElement("p", { className: "collection-blocked" }, g.reason) : /* @__PURE__ */ W.createElement("div", { className: "collection-empty" }, /* @__PURE__ */ W.createElement("code", null, "{ eventType, target, … }"), /* @__PURE__ */ W.createElement("p", null, "화면이나 버튼을 선택하면 수집 구조가 표시됩니다.")), /* @__PURE__ */ W.createElement("small", { className: "collection-note" }, "저장된 이벤트 조회나 새 로그 전송 없이 수집 로직으로 생성합니다.")), Wd.createPortal(/* @__PURE__ */ W.createElement("dialog", { ref: C, className: "analysis-dialog", "aria-labelledby": "analysis-dialog-title", onClose: () => J(!1), onCancel: (ne) => {
    V && ne.preventDefault();
  } }, /* @__PURE__ */ W.createElement("div", { className: "analysis-modal-head" }, /* @__PURE__ */ W.createElement("div", null, /* @__PURE__ */ W.createElement("span", { className: "detail-eyebrow" }, "ANALYSIS WORKFLOW"), /* @__PURE__ */ W.createElement("h2", { id: "analysis-dialog-title" }, "조건에서 고객 이해까지"), /* @__PURE__ */ W.createElement("p", null, F, " · ", _)), /* @__PURE__ */ W.createElement("button", { type: "button", "aria-label": "분석 팝업 닫기", className: "detail-secondary", disabled: V, onClick: () => C.current.close() }, "×")), /* @__PURE__ */ W.createElement("div", { className: "analysis-flow" }, te && /* @__PURE__ */ W.createElement(iE, { nodes: Ae, edges: Oe, nodeTypes: QE, edgeTypes: GE, nodesDraggable: !1, nodesConnectable: !1, fitView: !0, fitViewOptions: { padding: 0.18 }, minZoom: 0.3, maxZoom: 1.3 }, /* @__PURE__ */ W.createElement(cE, { color: "#2b3c55", gap: 20 }), /* @__PURE__ */ W.createElement(yE, { showInteractive: !1 }))), /* @__PURE__ */ W.createElement("div", { className: "analysis-modal-body" }, /* @__PURE__ */ W.createElement("div", { className: "analysis-events" }, /* @__PURE__ */ W.createElement("h3", null, "작업 로그"), /* @__PURE__ */ W.createElement("div", { "aria-live": "polite" }, !P.length && /* @__PURE__ */ W.createElement("p", null, "분석을 실행하면 단계별 작업 내역이 표시됩니다."), P.map((ne, pe) => /* @__PURE__ */ W.createElement("p", { key: pe }, /* @__PURE__ */ W.createElement("time", null, ne.at), ne.text)))), H && /* @__PURE__ */ W.createElement("div", { className: "analysis-log-preview" }, /* @__PURE__ */ W.createElement("h3", null, "분석 대상의 실제 로그 ", /* @__PURE__ */ W.createElement("span", null, H.summary.matchedEvents, "건")), /* @__PURE__ */ W.createElement("p", null, H.summary.scannedSessions, "개 중 ", /* @__PURE__ */ W.createElement("b", null, H.summary.matchedSessions, "개 세션"), " · 최대 50건 미리보기"), H.logs.length ? /* @__PURE__ */ W.createElement("pre", null, JSON.stringify(H.logs, null, 2)) : /* @__PURE__ */ W.createElement("p", null, "일치하는 로그가 없습니다."))), /* @__PURE__ */ W.createElement("div", { className: "analysis-modal-footer" }, /* @__PURE__ */ W.createElement("span", null, V ? "실제 분석 응답을 기다리고 있습니다." : "분석 결과와 조건을 확인할 수 있습니다."), /* @__PURE__ */ W.createElement("button", { type: "button", disabled: V, onClick: () => C.current.close() }, R[2].status === "completed" ? "분석 결과 보기" : "닫기"))), document.body));
}
M0.createRoot(document.getElementById("detail-analysis-root")).render(/* @__PURE__ */ W.createElement(JE, null));
