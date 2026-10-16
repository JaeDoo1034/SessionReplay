function bh(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ha = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Id;
function f0() {
  if (Id) return Me;
  Id = 1;
  var n = Symbol.for("react.element"), o = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.iterator;
  function m(_) {
    return _ === null || typeof _ != "object" ? null : (_ = v && _[v] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var x = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, E = {};
  function C(_, F, ne) {
    this.props = _, this.context = F, this.refs = E, this.updater = ne || x;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(_, F) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, F, "setState");
  }, C.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function N() {
  }
  N.prototype = C.prototype;
  function O(_, F, ne) {
    this.props = _, this.context = F, this.refs = E, this.updater = ne || x;
  }
  var S = O.prototype = new N();
  S.constructor = O, k(S, C.prototype), S.isPureReactComponent = !0;
  var M = Array.isArray, I = Object.prototype.hasOwnProperty, j = { current: null }, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function W(_, F, ne) {
    var ee, ae = {}, fe = null, de = null;
    if (F != null) for (ee in F.ref !== void 0 && (de = F.ref), F.key !== void 0 && (fe = "" + F.key), F) I.call(F, ee) && !B.hasOwnProperty(ee) && (ae[ee] = F[ee]);
    var oe = arguments.length - 2;
    if (oe === 1) ae.children = ne;
    else if (1 < oe) {
      for (var b = Array(oe), ce = 0; ce < oe; ce++) b[ce] = arguments[ce + 2];
      ae.children = b;
    }
    if (_ && _.defaultProps) for (ee in oe = _.defaultProps, oe) ae[ee] === void 0 && (ae[ee] = oe[ee]);
    return { $$typeof: n, type: _, key: fe, ref: de, props: ae, _owner: j.current };
  }
  function Z(_, F) {
    return { $$typeof: n, type: _.type, key: F, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function ie(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === n;
  }
  function G(_) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(ne) {
      return F[ne];
    });
  }
  var J = /\/+/g;
  function q(_, F) {
    return typeof _ == "object" && _ !== null && _.key != null ? G("" + _.key) : F.toString(36);
  }
  function P(_, F, ne, ee, ae) {
    var fe = typeof _;
    (fe === "undefined" || fe === "boolean") && (_ = null);
    var de = !1;
    if (_ === null) de = !0;
    else switch (fe) {
      case "string":
      case "number":
        de = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case n:
          case o:
            de = !0;
        }
    }
    if (de) return de = _, ae = ae(de), _ = ee === "" ? "." + q(de, 0) : ee, M(ae) ? (ne = "", _ != null && (ne = _.replace(J, "$&/") + "/"), P(ae, F, ne, "", function(ce) {
      return ce;
    })) : ae != null && (ie(ae) && (ae = Z(ae, ne + (!ae.key || de && de.key === ae.key ? "" : ("" + ae.key).replace(J, "$&/") + "/") + _)), F.push(ae)), 1;
    if (de = 0, ee = ee === "" ? "." : ee + ":", M(_)) for (var oe = 0; oe < _.length; oe++) {
      fe = _[oe];
      var b = ee + q(fe, oe);
      de += P(fe, F, ne, b, ae);
    }
    else if (b = m(_), typeof b == "function") for (_ = b.call(_), oe = 0; !(fe = _.next()).done; ) fe = fe.value, b = ee + q(fe, oe++), de += P(fe, F, ne, b, ae);
    else if (fe === "object") throw F = String(_), Error("Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead.");
    return de;
  }
  function V(_, F, ne) {
    if (_ == null) return _;
    var ee = [], ae = 0;
    return P(_, ee, "", "", function(fe) {
      return F.call(ne, fe, ae++);
    }), ee;
  }
  function $(_) {
    if (_._status === -1) {
      var F = _._result;
      F = F(), F.then(function(ne) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = ne);
      }, function(ne) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = ne);
      }), _._status === -1 && (_._status = 0, _._result = F);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var H = { current: null }, R = { transition: null }, L = { ReactCurrentDispatcher: H, ReactCurrentBatchConfig: R, ReactCurrentOwner: j };
  function D() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Me.Children = { map: V, forEach: function(_, F, ne) {
    V(_, function() {
      F.apply(this, arguments);
    }, ne);
  }, count: function(_) {
    var F = 0;
    return V(_, function() {
      F++;
    }), F;
  }, toArray: function(_) {
    return V(_, function(F) {
      return F;
    }) || [];
  }, only: function(_) {
    if (!ie(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, Me.Component = C, Me.Fragment = i, Me.Profiler = u, Me.PureComponent = O, Me.StrictMode = s, Me.Suspense = p, Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L, Me.act = D, Me.cloneElement = function(_, F, ne) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var ee = k({}, _.props), ae = _.key, fe = _.ref, de = _._owner;
    if (F != null) {
      if (F.ref !== void 0 && (fe = F.ref, de = j.current), F.key !== void 0 && (ae = "" + F.key), _.type && _.type.defaultProps) var oe = _.type.defaultProps;
      for (b in F) I.call(F, b) && !B.hasOwnProperty(b) && (ee[b] = F[b] === void 0 && oe !== void 0 ? oe[b] : F[b]);
    }
    var b = arguments.length - 2;
    if (b === 1) ee.children = ne;
    else if (1 < b) {
      oe = Array(b);
      for (var ce = 0; ce < b; ce++) oe[ce] = arguments[ce + 2];
      ee.children = oe;
    }
    return { $$typeof: n, type: _.type, key: ae, ref: fe, props: ee, _owner: de };
  }, Me.createContext = function(_) {
    return _ = { $$typeof: f, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: c, _context: _ }, _.Consumer = _;
  }, Me.createElement = W, Me.createFactory = function(_) {
    var F = W.bind(null, _);
    return F.type = _, F;
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(_) {
    return { $$typeof: h, render: _ };
  }, Me.isValidElement = ie, Me.lazy = function(_) {
    return { $$typeof: g, _payload: { _status: -1, _result: _ }, _init: $ };
  }, Me.memo = function(_, F) {
    return { $$typeof: y, type: _, compare: F === void 0 ? null : F };
  }, Me.startTransition = function(_) {
    var F = R.transition;
    R.transition = {};
    try {
      _();
    } finally {
      R.transition = F;
    }
  }, Me.unstable_act = D, Me.useCallback = function(_, F) {
    return H.current.useCallback(_, F);
  }, Me.useContext = function(_) {
    return H.current.useContext(_);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(_) {
    return H.current.useDeferredValue(_);
  }, Me.useEffect = function(_, F) {
    return H.current.useEffect(_, F);
  }, Me.useId = function() {
    return H.current.useId();
  }, Me.useImperativeHandle = function(_, F, ne) {
    return H.current.useImperativeHandle(_, F, ne);
  }, Me.useInsertionEffect = function(_, F) {
    return H.current.useInsertionEffect(_, F);
  }, Me.useLayoutEffect = function(_, F) {
    return H.current.useLayoutEffect(_, F);
  }, Me.useMemo = function(_, F) {
    return H.current.useMemo(_, F);
  }, Me.useReducer = function(_, F, ne) {
    return H.current.useReducer(_, F, ne);
  }, Me.useRef = function(_) {
    return H.current.useRef(_);
  }, Me.useState = function(_) {
    return H.current.useState(_);
  }, Me.useSyncExternalStore = function(_, F, ne) {
    return H.current.useSyncExternalStore(_, F, ne);
  }, Me.useTransition = function() {
    return H.current.useTransition();
  }, Me.version = "18.3.1", Me;
}
var Rd;
function di() {
  return Rd || (Rd = 1, ha.exports = f0()), ha.exports;
}
var Q = di();
const le = /* @__PURE__ */ bh(Q);
var $l = {}, pa = { exports: {} }, pt = {}, ma = { exports: {} }, ga = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ad;
function d0() {
  return Ad || (Ad = 1, (function(n) {
    function o(R, L) {
      var D = R.length;
      R.push(L);
      e: for (; 0 < D; ) {
        var _ = D - 1 >>> 1, F = R[_];
        if (0 < u(F, L)) R[_] = L, R[D] = F, D = _;
        else break e;
      }
    }
    function i(R) {
      return R.length === 0 ? null : R[0];
    }
    function s(R) {
      if (R.length === 0) return null;
      var L = R[0], D = R.pop();
      if (D !== L) {
        R[0] = D;
        e: for (var _ = 0, F = R.length, ne = F >>> 1; _ < ne; ) {
          var ee = 2 * (_ + 1) - 1, ae = R[ee], fe = ee + 1, de = R[fe];
          if (0 > u(ae, D)) fe < F && 0 > u(de, ae) ? (R[_] = de, R[fe] = D, _ = fe) : (R[_] = ae, R[ee] = D, _ = ee);
          else if (fe < F && 0 > u(de, D)) R[_] = de, R[fe] = D, _ = fe;
          else break e;
        }
      }
      return L;
    }
    function u(R, L) {
      var D = R.sortIndex - L.sortIndex;
      return D !== 0 ? D : R.id - L.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, h = f.now();
      n.unstable_now = function() {
        return f.now() - h;
      };
    }
    var p = [], y = [], g = 1, v = null, m = 3, x = !1, k = !1, E = !1, C = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function S(R) {
      for (var L = i(y); L !== null; ) {
        if (L.callback === null) s(y);
        else if (L.startTime <= R) s(y), L.sortIndex = L.expirationTime, o(p, L);
        else break;
        L = i(y);
      }
    }
    function M(R) {
      if (E = !1, S(R), !k) if (i(p) !== null) k = !0, $(I);
      else {
        var L = i(y);
        L !== null && H(M, L.startTime - R);
      }
    }
    function I(R, L) {
      k = !1, E && (E = !1, N(W), W = -1), x = !0;
      var D = m;
      try {
        for (S(L), v = i(p); v !== null && (!(v.expirationTime > L) || R && !G()); ) {
          var _ = v.callback;
          if (typeof _ == "function") {
            v.callback = null, m = v.priorityLevel;
            var F = _(v.expirationTime <= L);
            L = n.unstable_now(), typeof F == "function" ? v.callback = F : v === i(p) && s(p), S(L);
          } else s(p);
          v = i(p);
        }
        if (v !== null) var ne = !0;
        else {
          var ee = i(y);
          ee !== null && H(M, ee.startTime - L), ne = !1;
        }
        return ne;
      } finally {
        v = null, m = D, x = !1;
      }
    }
    var j = !1, B = null, W = -1, Z = 5, ie = -1;
    function G() {
      return !(n.unstable_now() - ie < Z);
    }
    function J() {
      if (B !== null) {
        var R = n.unstable_now();
        ie = R;
        var L = !0;
        try {
          L = B(!0, R);
        } finally {
          L ? q() : (j = !1, B = null);
        }
      } else j = !1;
    }
    var q;
    if (typeof O == "function") q = function() {
      O(J);
    };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), V = P.port2;
      P.port1.onmessage = J, q = function() {
        V.postMessage(null);
      };
    } else q = function() {
      C(J, 0);
    };
    function $(R) {
      B = R, j || (j = !0, q());
    }
    function H(R, L) {
      W = C(function() {
        R(n.unstable_now());
      }, L);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(R) {
      R.callback = null;
    }, n.unstable_continueExecution = function() {
      k || x || (k = !0, $(I));
    }, n.unstable_forceFrameRate = function(R) {
      0 > R || 125 < R ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Z = 0 < R ? Math.floor(1e3 / R) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return m;
    }, n.unstable_getFirstCallbackNode = function() {
      return i(p);
    }, n.unstable_next = function(R) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = m;
      }
      var D = m;
      m = L;
      try {
        return R();
      } finally {
        m = D;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(R, L) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var D = m;
      m = R;
      try {
        return L();
      } finally {
        m = D;
      }
    }, n.unstable_scheduleCallback = function(R, L, D) {
      var _ = n.unstable_now();
      switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? _ + D : _) : D = _, R) {
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
      return F = D + F, R = { id: g++, callback: L, priorityLevel: R, startTime: D, expirationTime: F, sortIndex: -1 }, D > _ ? (R.sortIndex = D, o(y, R), i(p) === null && R === i(y) && (E ? (N(W), W = -1) : E = !0, H(M, D - _))) : (R.sortIndex = F, o(p, R), k || x || (k = !0, $(I))), R;
    }, n.unstable_shouldYield = G, n.unstable_wrapCallback = function(R) {
      var L = m;
      return function() {
        var D = m;
        m = L;
        try {
          return R.apply(this, arguments);
        } finally {
          m = D;
        }
      };
    };
  })(ga)), ga;
}
var $d;
function h0() {
  return $d || ($d = 1, ma.exports = d0()), ma.exports;
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
var Dd;
function p0() {
  if (Dd) return pt;
  Dd = 1;
  var n = di(), o = h0();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var s = /* @__PURE__ */ new Set(), u = {};
  function c(e, t) {
    f(e, t), f(e + "Capture", t);
  }
  function f(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) s.add(t[e]);
  }
  var h = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), p = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, v = {};
  function m(e) {
    return p.call(v, e) ? !0 : p.call(g, e) ? !1 : y.test(e) ? v[e] = !0 : (g[e] = !0, !1);
  }
  function x(e, t, r, l) {
    if (r !== null && r.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return l ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function k(e, t, r, l) {
    if (t === null || typeof t > "u" || x(e, t, r, l)) return !0;
    if (l) return !1;
    if (r !== null) switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function E(e, t, r, l, a, d, w) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = l, this.attributeNamespace = a, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = w;
  }
  var C = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    C[e] = new E(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    C[t] = new E(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    C[e] = new E(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    C[e] = new E(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    C[e] = new E(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    C[e] = new E(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    C[e] = new E(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    C[e] = new E(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    C[e] = new E(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var N = /[\-:]([a-z])/g;
  function O(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      N,
      O
    );
    C[t] = new E(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(N, O);
    C[t] = new E(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(N, O);
    C[t] = new E(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    C[e] = new E(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), C.xlinkHref = new E("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    C[e] = new E(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function S(e, t, r, l) {
    var a = C.hasOwnProperty(t) ? C[t] : null;
    (a !== null ? a.type !== 0 : l || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (k(t, r, a, l) && (r = null), l || a === null ? m(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : a.mustUseProperty ? e[a.propertyName] = r === null ? a.type === 3 ? !1 : "" : r : (t = a.attributeName, l = a.attributeNamespace, r === null ? e.removeAttribute(t) : (a = a.type, r = a === 3 || a === 4 && r === !0 ? "" : "" + r, l ? e.setAttributeNS(l, t, r) : e.setAttribute(t, r))));
  }
  var M = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, I = Symbol.for("react.element"), j = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), ie = Symbol.for("react.provider"), G = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), R = Symbol.iterator;
  function L(e) {
    return e === null || typeof e != "object" ? null : (e = R && e[R] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var D = Object.assign, _;
  function F(e) {
    if (_ === void 0) try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      _ = t && t[1] || "";
    }
    return `
` + _ + e;
  }
  var ne = !1;
  function ee(e, t) {
    if (!e || ne) return "";
    ne = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (X) {
          var l = X;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (X) {
          l = X;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (X) {
          l = X;
        }
        e();
      }
    } catch (X) {
      if (X && l && typeof X.stack == "string") {
        for (var a = X.stack.split(`
`), d = l.stack.split(`
`), w = a.length - 1, T = d.length - 1; 1 <= w && 0 <= T && a[w] !== d[T]; ) T--;
        for (; 1 <= w && 0 <= T; w--, T--) if (a[w] !== d[T]) {
          if (w !== 1 || T !== 1)
            do
              if (w--, T--, 0 > T || a[w] !== d[T]) {
                var z = `
` + a[w].replace(" at new ", " at ");
                return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), z;
              }
            while (1 <= w && 0 <= T);
          break;
        }
      }
    } finally {
      ne = !1, Error.prepareStackTrace = r;
    }
    return (e = e ? e.displayName || e.name : "") ? F(e) : "";
  }
  function ae(e) {
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
        return e = ee(e.type, !1), e;
      case 11:
        return e = ee(e.type.render, !1), e;
      case 1:
        return e = ee(e.type, !0), e;
      default:
        return "";
    }
  }
  function fe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case B:
        return "Fragment";
      case j:
        return "Portal";
      case Z:
        return "Profiler";
      case W:
        return "StrictMode";
      case q:
        return "Suspense";
      case P:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case G:
        return (e.displayName || "Context") + ".Consumer";
      case ie:
        return (e._context.displayName || "Context") + ".Provider";
      case J:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case V:
        return t = e.displayName || null, t !== null ? t : fe(e.type) || "Memo";
      case $:
        t = e._payload, e = e._init;
        try {
          return fe(e(t));
        } catch {
        }
    }
    return null;
  }
  function de(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return fe(t);
      case 8:
        return t === W ? "StrictMode" : "Mode";
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
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function oe(e) {
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
  function b(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ce(e) {
    var t = b(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), l = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var a = r.get, d = r.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return a.call(this);
      }, set: function(w) {
        l = "" + w, d.call(this, w);
      } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
        return l;
      }, setValue: function(w) {
        l = "" + w;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Se(e) {
    e._valueTracker || (e._valueTracker = ce(e));
  }
  function he(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), l = "";
    return e && (l = b(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (t.setValue(e), !0) : !1;
  }
  function me(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function pe(e, t) {
    var r = t.checked;
    return D({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function Ne(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, l = t.checked != null ? t.checked : t.defaultChecked;
    r = oe(t.value != null ? t.value : r), e._wrapperState = { initialChecked: l, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Pe(e, t) {
    t = t.checked, t != null && S(e, "checked", t, !1);
  }
  function Ae(e, t) {
    Pe(e, t);
    var r = oe(t.value), l = t.type;
    if (r != null) l === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (l === "submit" || l === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? De(e, t.type, r) : t.hasOwnProperty("defaultValue") && De(e, t.type, oe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Re(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var l = t.type;
      if (!(l !== "submit" && l !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function De(e, t, r) {
    (t !== "number" || me(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Rt = Array.isArray;
  function gt(e, t, r, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < r.length; a++) t["$" + r[a]] = !0;
      for (r = 0; r < e.length; r++) a = t.hasOwnProperty("$" + e[r].value), e[r].selected !== a && (e[r].selected = a), a && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + oe(r), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === r) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function kt(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return D({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function At(e, t) {
    var r = t.value;
    if (r == null) {
      if (r = t.children, t = t.defaultValue, r != null) {
        if (t != null) throw Error(i(92));
        if (Rt(r)) {
          if (1 < r.length) throw Error(i(93));
          r = r[0];
        }
        t = r;
      }
      t == null && (t = ""), r = t;
    }
    e._wrapperState = { initialValue: oe(r) };
  }
  function rn(e, t) {
    var r = oe(t.value), l = oe(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), l != null && (e.defaultValue = "" + l);
  }
  function Yt(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function lt(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ct(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? lt(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Wn, wi = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, l, a) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, l, a);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Wn = Wn || document.createElement("div"), Wn.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Wn.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function on(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Yn = {
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
  }, xs = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Yn).forEach(function(e) {
    xs.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Yn[t] = Yn[e];
    });
  });
  function xi(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Yn.hasOwnProperty(e) && Yn[e] ? ("" + t).trim() : t + "px";
  }
  function Si(e, t) {
    e = e.style;
    for (var r in t) if (t.hasOwnProperty(r)) {
      var l = r.indexOf("--") === 0, a = xi(r, t[r], l);
      r === "float" && (r = "cssFloat"), l ? e.setProperty(r, a) : e[r] = a;
    }
  }
  var Ss = D({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function oo(e, t) {
    if (t) {
      if (Ss[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function io(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
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
  var lo = null;
  function so(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var uo = null, vn = null, wn = null;
  function Ei(e) {
    if (e = Ao(e)) {
      if (typeof uo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Gi(t), uo(e.stateNode, e.type, t));
    }
  }
  function _i(e) {
    vn ? wn ? wn.push(e) : wn = [e] : vn = e;
  }
  function ao() {
    if (vn) {
      var e = vn, t = wn;
      if (wn = vn = null, Ei(e), t) for (e = 0; e < t.length; e++) Ei(t[e]);
    }
  }
  function ki(e, t) {
    return e(t);
  }
  function Ci() {
  }
  var co = !1;
  function Ni(e, t, r) {
    if (co) return e(t, r);
    co = !0;
    try {
      return ki(e, t, r);
    } finally {
      co = !1, (vn !== null || wn !== null) && (Ci(), ao());
    }
  }
  function Xn(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = Gi(r);
    if (l === null) return null;
    r = l[t];
    e: switch (t) {
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(i(231, t, typeof r));
    return r;
  }
  var fo = !1;
  if (h) try {
    var bn = {};
    Object.defineProperty(bn, "passive", { get: function() {
      fo = !0;
    } }), window.addEventListener("test", bn, bn), window.removeEventListener("test", bn, bn);
  } catch {
    fo = !1;
  }
  function Es(e, t, r, l, a, d, w, T, z) {
    var X = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, X);
    } catch (re) {
      this.onError(re);
    }
  }
  var Qn = !1, yr = null, vr = !1, ho = null, _s = { onError: function(e) {
    Qn = !0, yr = e;
  } };
  function ks(e, t, r, l, a, d, w, T, z) {
    Qn = !1, yr = null, Es.apply(_s, arguments);
  }
  function Cs(e, t, r, l, a, d, w, T, z) {
    if (ks.apply(this, arguments), Qn) {
      if (Qn) {
        var X = yr;
        Qn = !1, yr = null;
      } else throw Error(i(198));
      vr || (vr = !0, ho = X);
    }
  }
  function Xt(e) {
    var t = e, r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (r = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function po(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function mo(e) {
    if (Xt(e) !== e) throw Error(i(188));
  }
  function Ns(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Xt(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var r = e, l = t; ; ) {
      var a = r.return;
      if (a === null) break;
      var d = a.alternate;
      if (d === null) {
        if (l = a.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (a.child === d.child) {
        for (d = a.child; d; ) {
          if (d === r) return mo(a), e;
          if (d === l) return mo(a), t;
          d = d.sibling;
        }
        throw Error(i(188));
      }
      if (r.return !== l.return) r = a, l = d;
      else {
        for (var w = !1, T = a.child; T; ) {
          if (T === r) {
            w = !0, r = a, l = d;
            break;
          }
          if (T === l) {
            w = !0, l = a, r = d;
            break;
          }
          T = T.sibling;
        }
        if (!w) {
          for (T = d.child; T; ) {
            if (T === r) {
              w = !0, r = d, l = a;
              break;
            }
            if (T === l) {
              w = !0, l = d, r = a;
              break;
            }
            T = T.sibling;
          }
          if (!w) throw Error(i(189));
        }
      }
      if (r.alternate !== l) throw Error(i(190));
    }
    if (r.tag !== 3) throw Error(i(188));
    return r.stateNode.current === r ? e : t;
  }
  function Mi(e) {
    return e = Ns(e), e !== null ? Pi(e) : null;
  }
  function Pi(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Pi(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ti = o.unstable_scheduleCallback, Li = o.unstable_cancelCallback, Ms = o.unstable_shouldYield, zi = o.unstable_requestPaint, Ve = o.unstable_now, Ps = o.unstable_getCurrentPriorityLevel, go = o.unstable_ImmediatePriority, Ii = o.unstable_UserBlockingPriority, wr = o.unstable_NormalPriority, Ts = o.unstable_LowPriority, Ri = o.unstable_IdlePriority, Kn = null, Nt = null;
  function Ls(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(Kn, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var yt = Math.clz32 ? Math.clz32 : Rs, zs = Math.log, Is = Math.LN2;
  function Rs(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (zs(e) / Is | 0) | 0;
  }
  var xr = 64, Sr = 4194304;
  function bt(e) {
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
  function Er(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var l = 0, a = e.suspendedLanes, d = e.pingedLanes, w = r & 268435455;
    if (w !== 0) {
      var T = w & ~a;
      T !== 0 ? l = bt(T) : (d &= w, d !== 0 && (l = bt(d)));
    } else w = r & ~a, w !== 0 ? l = bt(w) : d !== 0 && (l = bt(d));
    if (l === 0) return 0;
    if (t !== 0 && t !== l && (t & a) === 0 && (a = l & -l, d = t & -t, a >= d || a === 16 && (d & 4194240) !== 0)) return t;
    if ((l & 4) !== 0 && (l |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= l; 0 < t; ) r = 31 - yt(t), a = 1 << r, l |= e[r], t &= ~a;
    return l;
  }
  function As(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
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
        return t + 5e3;
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
  function $s(e, t) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, d = e.pendingLanes; 0 < d; ) {
      var w = 31 - yt(d), T = 1 << w, z = a[w];
      z === -1 ? ((T & r) === 0 || (T & l) !== 0) && (a[w] = As(T, t)) : z <= t && (e.expiredLanes |= T), d &= ~T;
    }
  }
  function Gn(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Ai() {
    var e = xr;
    return xr <<= 1, (xr & 4194240) === 0 && (xr = 64), e;
  }
  function yo(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function xn(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - yt(t), e[t] = r;
  }
  function Im(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var l = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var a = 31 - yt(r), d = 1 << a;
      t[a] = 0, l[a] = -1, e[a] = -1, r &= ~d;
    }
  }
  function Ds(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var l = 31 - yt(r), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), r &= ~a;
    }
  }
  var Ie = 0;
  function ac(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var cc, Os, fc, dc, hc, Fs = !1, $i = [], Sn = null, En = null, _n = null, vo = /* @__PURE__ */ new Map(), wo = /* @__PURE__ */ new Map(), kn = [], Rm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function pc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Sn = null;
        break;
      case "dragenter":
      case "dragleave":
        En = null;
        break;
      case "mouseover":
      case "mouseout":
        _n = null;
        break;
      case "pointerover":
      case "pointerout":
        vo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wo.delete(t.pointerId);
    }
  }
  function xo(e, t, r, l, a, d) {
    return e === null || e.nativeEvent !== d ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: l, nativeEvent: d, targetContainers: [a] }, t !== null && (t = Ao(t), t !== null && Os(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Am(e, t, r, l, a) {
    switch (t) {
      case "focusin":
        return Sn = xo(Sn, e, t, r, l, a), !0;
      case "dragenter":
        return En = xo(En, e, t, r, l, a), !0;
      case "mouseover":
        return _n = xo(_n, e, t, r, l, a), !0;
      case "pointerover":
        var d = a.pointerId;
        return vo.set(d, xo(vo.get(d) || null, e, t, r, l, a)), !0;
      case "gotpointercapture":
        return d = a.pointerId, wo.set(d, xo(wo.get(d) || null, e, t, r, l, a)), !0;
    }
    return !1;
  }
  function mc(e) {
    var t = qn(e.target);
    if (t !== null) {
      var r = Xt(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = po(r), t !== null) {
            e.blockedOn = t, hc(e.priority, function() {
              fc(r);
            });
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Di(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = js(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(r.type, r);
        lo = l, r.target.dispatchEvent(l), lo = null;
      } else return t = Ao(r), t !== null && Os(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function gc(e, t, r) {
    Di(e) && r.delete(t);
  }
  function $m() {
    Fs = !1, Sn !== null && Di(Sn) && (Sn = null), En !== null && Di(En) && (En = null), _n !== null && Di(_n) && (_n = null), vo.forEach(gc), wo.forEach(gc);
  }
  function So(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Fs || (Fs = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, $m)));
  }
  function Eo(e) {
    function t(a) {
      return So(a, e);
    }
    if (0 < $i.length) {
      So($i[0], e);
      for (var r = 1; r < $i.length; r++) {
        var l = $i[r];
        l.blockedOn === e && (l.blockedOn = null);
      }
    }
    for (Sn !== null && So(Sn, e), En !== null && So(En, e), _n !== null && So(_n, e), vo.forEach(t), wo.forEach(t), r = 0; r < kn.length; r++) l = kn[r], l.blockedOn === e && (l.blockedOn = null);
    for (; 0 < kn.length && (r = kn[0], r.blockedOn === null); ) mc(r), r.blockedOn === null && kn.shift();
  }
  var _r = M.ReactCurrentBatchConfig, Oi = !0;
  function Dm(e, t, r, l) {
    var a = Ie, d = _r.transition;
    _r.transition = null;
    try {
      Ie = 1, Hs(e, t, r, l);
    } finally {
      Ie = a, _r.transition = d;
    }
  }
  function Om(e, t, r, l) {
    var a = Ie, d = _r.transition;
    _r.transition = null;
    try {
      Ie = 4, Hs(e, t, r, l);
    } finally {
      Ie = a, _r.transition = d;
    }
  }
  function Hs(e, t, r, l) {
    if (Oi) {
      var a = js(e, t, r, l);
      if (a === null) ru(e, t, l, Fi, r), pc(e, l);
      else if (Am(a, e, t, r, l)) l.stopPropagation();
      else if (pc(e, l), t & 4 && -1 < Rm.indexOf(e)) {
        for (; a !== null; ) {
          var d = Ao(a);
          if (d !== null && cc(d), d = js(e, t, r, l), d === null && ru(e, t, l, Fi, r), d === a) break;
          a = d;
        }
        a !== null && l.stopPropagation();
      } else ru(e, t, l, null, r);
    }
  }
  var Fi = null;
  function js(e, t, r, l) {
    if (Fi = null, e = so(l), e = qn(e), e !== null) if (t = Xt(e), t === null) e = null;
    else if (r = t.tag, r === 13) {
      if (e = po(t), e !== null) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Fi = e, null;
  }
  function yc(e) {
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
        switch (Ps()) {
          case go:
            return 1;
          case Ii:
            return 4;
          case wr:
          case Ts:
            return 16;
          case Ri:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Cn = null, Vs = null, Hi = null;
  function vc() {
    if (Hi) return Hi;
    var e, t = Vs, r = t.length, l, a = "value" in Cn ? Cn.value : Cn.textContent, d = a.length;
    for (e = 0; e < r && t[e] === a[e]; e++) ;
    var w = r - e;
    for (l = 1; l <= w && t[r - l] === a[d - l]; l++) ;
    return Hi = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function ji(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Vi() {
    return !0;
  }
  function wc() {
    return !1;
  }
  function vt(e) {
    function t(r, l, a, d, w) {
      this._reactName = r, this._targetInst = a, this.type = l, this.nativeEvent = d, this.target = w, this.currentTarget = null;
      for (var T in e) e.hasOwnProperty(T) && (r = e[T], this[T] = r ? r(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Vi : wc, this.isPropagationStopped = wc, this;
    }
    return D(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Vi);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Vi);
    }, persist: function() {
    }, isPersistent: Vi }), t;
  }
  var kr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Bs = vt(kr), _o = D({}, kr, { view: 0, detail: 0 }), Fm = vt(_o), Us, Ws, ko, Bi = D({}, _o, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Xs, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== ko && (ko && e.type === "mousemove" ? (Us = e.screenX - ko.screenX, Ws = e.screenY - ko.screenY) : Ws = Us = 0, ko = e), Us);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ws;
  } }), xc = vt(Bi), Hm = D({}, Bi, { dataTransfer: 0 }), jm = vt(Hm), Vm = D({}, _o, { relatedTarget: 0 }), Ys = vt(Vm), Bm = D({}, kr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Um = vt(Bm), Wm = D({}, kr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Ym = vt(Wm), Xm = D({}, kr, { data: 0 }), Sc = vt(Xm), bm = {
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
  }, Qm = {
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
  }, Km = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Gm(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Km[e]) ? !!t[e] : !1;
  }
  function Xs() {
    return Gm;
  }
  var qm = D({}, _o, { key: function(e) {
    if (e.key) {
      var t = bm[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = ji(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Qm[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Xs, charCode: function(e) {
    return e.type === "keypress" ? ji(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ji(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Zm = vt(qm), Jm = D({}, Bi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ec = vt(Jm), eg = D({}, _o, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Xs }), tg = vt(eg), ng = D({}, kr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), rg = vt(ng), og = D({}, Bi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ig = vt(og), lg = [9, 13, 27, 32], bs = h && "CompositionEvent" in window, Co = null;
  h && "documentMode" in document && (Co = document.documentMode);
  var sg = h && "TextEvent" in window && !Co, _c = h && (!bs || Co && 8 < Co && 11 >= Co), kc = " ", Cc = !1;
  function Nc(e, t) {
    switch (e) {
      case "keyup":
        return lg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Mc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Cr = !1;
  function ug(e, t) {
    switch (e) {
      case "compositionend":
        return Mc(t);
      case "keypress":
        return t.which !== 32 ? null : (Cc = !0, kc);
      case "textInput":
        return e = t.data, e === kc && Cc ? null : e;
      default:
        return null;
    }
  }
  function ag(e, t) {
    if (Cr) return e === "compositionend" || !bs && Nc(e, t) ? (e = vc(), Hi = Vs = Cn = null, Cr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return _c && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var cg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Pc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!cg[e.type] : t === "textarea";
  }
  function Tc(e, t, r, l) {
    _i(l), t = bi(t, "onChange"), 0 < t.length && (r = new Bs("onChange", "change", null, r, l), e.push({ event: r, listeners: t }));
  }
  var No = null, Mo = null;
  function fg(e) {
    bc(e, 0);
  }
  function Ui(e) {
    var t = Lr(e);
    if (he(t)) return e;
  }
  function dg(e, t) {
    if (e === "change") return t;
  }
  var Lc = !1;
  if (h) {
    var Qs;
    if (h) {
      var Ks = "oninput" in document;
      if (!Ks) {
        var zc = document.createElement("div");
        zc.setAttribute("oninput", "return;"), Ks = typeof zc.oninput == "function";
      }
      Qs = Ks;
    } else Qs = !1;
    Lc = Qs && (!document.documentMode || 9 < document.documentMode);
  }
  function Ic() {
    No && (No.detachEvent("onpropertychange", Rc), Mo = No = null);
  }
  function Rc(e) {
    if (e.propertyName === "value" && Ui(Mo)) {
      var t = [];
      Tc(t, Mo, e, so(e)), Ni(fg, t);
    }
  }
  function hg(e, t, r) {
    e === "focusin" ? (Ic(), No = t, Mo = r, No.attachEvent("onpropertychange", Rc)) : e === "focusout" && Ic();
  }
  function pg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ui(Mo);
  }
  function mg(e, t) {
    if (e === "click") return Ui(t);
  }
  function gg(e, t) {
    if (e === "input" || e === "change") return Ui(t);
  }
  function yg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var $t = typeof Object.is == "function" ? Object.is : yg;
  function Po(e, t) {
    if ($t(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var r = Object.keys(e), l = Object.keys(t);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var a = r[l];
      if (!p.call(t, a) || !$t(e[a], t[a])) return !1;
    }
    return !0;
  }
  function Ac(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $c(e, t) {
    var r = Ac(e);
    e = 0;
    for (var l; r; ) {
      if (r.nodeType === 3) {
        if (l = e + r.textContent.length, e <= t && l >= t) return { node: r, offset: t - e };
        e = l;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Ac(r);
    }
  }
  function Dc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Dc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Oc() {
    for (var e = window, t = me(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = me(e.document);
    }
    return t;
  }
  function Gs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function vg(e) {
    var t = Oc(), r = e.focusedElem, l = e.selectionRange;
    if (t !== r && r && r.ownerDocument && Dc(r.ownerDocument.documentElement, r)) {
      if (l !== null && Gs(r)) {
        if (t = l.start, e = l.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var a = r.textContent.length, d = Math.min(l.start, a);
          l = l.end === void 0 ? d : Math.min(l.end, a), !e.extend && d > l && (a = l, l = d, d = a), a = $c(r, d);
          var w = $c(
            r,
            l
          );
          a && w && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== w.node || e.focusOffset !== w.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), d > l ? (e.addRange(t), e.extend(w.node, w.offset)) : (t.setEnd(w.node, w.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var wg = h && "documentMode" in document && 11 >= document.documentMode, Nr = null, qs = null, To = null, Zs = !1;
  function Fc(e, t, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Zs || Nr == null || Nr !== me(l) || (l = Nr, "selectionStart" in l && Gs(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = { anchorNode: l.anchorNode, anchorOffset: l.anchorOffset, focusNode: l.focusNode, focusOffset: l.focusOffset }), To && Po(To, l) || (To = l, l = bi(qs, "onSelect"), 0 < l.length && (t = new Bs("onSelect", "select", null, t, r), e.push({ event: t, listeners: l }), t.target = Nr)));
  }
  function Wi(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var Mr = { animationend: Wi("Animation", "AnimationEnd"), animationiteration: Wi("Animation", "AnimationIteration"), animationstart: Wi("Animation", "AnimationStart"), transitionend: Wi("Transition", "TransitionEnd") }, Js = {}, Hc = {};
  h && (Hc = document.createElement("div").style, "AnimationEvent" in window || (delete Mr.animationend.animation, delete Mr.animationiteration.animation, delete Mr.animationstart.animation), "TransitionEvent" in window || delete Mr.transitionend.transition);
  function Yi(e) {
    if (Js[e]) return Js[e];
    if (!Mr[e]) return e;
    var t = Mr[e], r;
    for (r in t) if (t.hasOwnProperty(r) && r in Hc) return Js[e] = t[r];
    return e;
  }
  var jc = Yi("animationend"), Vc = Yi("animationiteration"), Bc = Yi("animationstart"), Uc = Yi("transitionend"), Wc = /* @__PURE__ */ new Map(), Yc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Nn(e, t) {
    Wc.set(e, t), c(t, [e]);
  }
  for (var eu = 0; eu < Yc.length; eu++) {
    var tu = Yc[eu], xg = tu.toLowerCase(), Sg = tu[0].toUpperCase() + tu.slice(1);
    Nn(xg, "on" + Sg);
  }
  Nn(jc, "onAnimationEnd"), Nn(Vc, "onAnimationIteration"), Nn(Bc, "onAnimationStart"), Nn("dblclick", "onDoubleClick"), Nn("focusin", "onFocus"), Nn("focusout", "onBlur"), Nn(Uc, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), c("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Lo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Eg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Lo));
  function Xc(e, t, r) {
    var l = e.type || "unknown-event";
    e.currentTarget = r, Cs(l, t, void 0, e), e.currentTarget = null;
  }
  function bc(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], a = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (t) for (var w = l.length - 1; 0 <= w; w--) {
          var T = l[w], z = T.instance, X = T.currentTarget;
          if (T = T.listener, z !== d && a.isPropagationStopped()) break e;
          Xc(a, T, X), d = z;
        }
        else for (w = 0; w < l.length; w++) {
          if (T = l[w], z = T.instance, X = T.currentTarget, T = T.listener, z !== d && a.isPropagationStopped()) break e;
          Xc(a, T, X), d = z;
        }
      }
    }
    if (vr) throw e = ho, vr = !1, ho = null, e;
  }
  function Oe(e, t) {
    var r = t[au];
    r === void 0 && (r = t[au] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (Qc(t, e, 2, !1), r.add(l));
  }
  function nu(e, t, r) {
    var l = 0;
    t && (l |= 4), Qc(r, e, l, t);
  }
  var Xi = "_reactListening" + Math.random().toString(36).slice(2);
  function zo(e) {
    if (!e[Xi]) {
      e[Xi] = !0, s.forEach(function(r) {
        r !== "selectionchange" && (Eg.has(r) || nu(r, !1, e), nu(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xi] || (t[Xi] = !0, nu("selectionchange", !1, t));
    }
  }
  function Qc(e, t, r, l) {
    switch (yc(t)) {
      case 1:
        var a = Dm;
        break;
      case 4:
        a = Om;
        break;
      default:
        a = Hs;
    }
    r = a.bind(null, t, r, e), a = void 0, !fo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: a }) : e.addEventListener(t, r, !0) : a !== void 0 ? e.addEventListener(t, r, { passive: a }) : e.addEventListener(t, r, !1);
  }
  function ru(e, t, r, l, a) {
    var d = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null) e: for (; ; ) {
      if (l === null) return;
      var w = l.tag;
      if (w === 3 || w === 4) {
        var T = l.stateNode.containerInfo;
        if (T === a || T.nodeType === 8 && T.parentNode === a) break;
        if (w === 4) for (w = l.return; w !== null; ) {
          var z = w.tag;
          if ((z === 3 || z === 4) && (z = w.stateNode.containerInfo, z === a || z.nodeType === 8 && z.parentNode === a)) return;
          w = w.return;
        }
        for (; T !== null; ) {
          if (w = qn(T), w === null) return;
          if (z = w.tag, z === 5 || z === 6) {
            l = d = w;
            continue e;
          }
          T = T.parentNode;
        }
      }
      l = l.return;
    }
    Ni(function() {
      var X = d, re = so(r), se = [];
      e: {
        var te = Wc.get(e);
        if (te !== void 0) {
          var ge = Bs, ve = e;
          switch (e) {
            case "keypress":
              if (ji(r) === 0) break e;
            case "keydown":
            case "keyup":
              ge = Zm;
              break;
            case "focusin":
              ve = "focus", ge = Ys;
              break;
            case "focusout":
              ve = "blur", ge = Ys;
              break;
            case "beforeblur":
            case "afterblur":
              ge = Ys;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ge = xc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ge = jm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ge = tg;
              break;
            case jc:
            case Vc:
            case Bc:
              ge = Um;
              break;
            case Uc:
              ge = rg;
              break;
            case "scroll":
              ge = Fm;
              break;
            case "wheel":
              ge = ig;
              break;
            case "copy":
            case "cut":
            case "paste":
              ge = Ym;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ge = Ec;
          }
          var we = (t & 4) !== 0, Xe = !we && e === "scroll", U = we ? te !== null ? te + "Capture" : null : te;
          we = [];
          for (var A = X, Y; A !== null; ) {
            Y = A;
            var ue = Y.stateNode;
            if (Y.tag === 5 && ue !== null && (Y = ue, U !== null && (ue = Xn(A, U), ue != null && we.push(Io(A, ue, Y)))), Xe) break;
            A = A.return;
          }
          0 < we.length && (te = new ge(te, ve, null, r, re), se.push({ event: te, listeners: we }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (te = e === "mouseover" || e === "pointerover", ge = e === "mouseout" || e === "pointerout", te && r !== lo && (ve = r.relatedTarget || r.fromElement) && (qn(ve) || ve[ln])) break e;
          if ((ge || te) && (te = re.window === re ? re : (te = re.ownerDocument) ? te.defaultView || te.parentWindow : window, ge ? (ve = r.relatedTarget || r.toElement, ge = X, ve = ve ? qn(ve) : null, ve !== null && (Xe = Xt(ve), ve !== Xe || ve.tag !== 5 && ve.tag !== 6) && (ve = null)) : (ge = null, ve = X), ge !== ve)) {
            if (we = xc, ue = "onMouseLeave", U = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (we = Ec, ue = "onPointerLeave", U = "onPointerEnter", A = "pointer"), Xe = ge == null ? te : Lr(ge), Y = ve == null ? te : Lr(ve), te = new we(ue, A + "leave", ge, r, re), te.target = Xe, te.relatedTarget = Y, ue = null, qn(re) === X && (we = new we(U, A + "enter", ve, r, re), we.target = Y, we.relatedTarget = Xe, ue = we), Xe = ue, ge && ve) t: {
              for (we = ge, U = ve, A = 0, Y = we; Y; Y = Pr(Y)) A++;
              for (Y = 0, ue = U; ue; ue = Pr(ue)) Y++;
              for (; 0 < A - Y; ) we = Pr(we), A--;
              for (; 0 < Y - A; ) U = Pr(U), Y--;
              for (; A--; ) {
                if (we === U || U !== null && we === U.alternate) break t;
                we = Pr(we), U = Pr(U);
              }
              we = null;
            }
            else we = null;
            ge !== null && Kc(se, te, ge, we, !1), ve !== null && Xe !== null && Kc(se, Xe, ve, we, !0);
          }
        }
        e: {
          if (te = X ? Lr(X) : window, ge = te.nodeName && te.nodeName.toLowerCase(), ge === "select" || ge === "input" && te.type === "file") var xe = dg;
          else if (Pc(te)) if (Lc) xe = gg;
          else {
            xe = pg;
            var _e = hg;
          }
          else (ge = te.nodeName) && ge.toLowerCase() === "input" && (te.type === "checkbox" || te.type === "radio") && (xe = mg);
          if (xe && (xe = xe(e, X))) {
            Tc(se, xe, r, re);
            break e;
          }
          _e && _e(e, te, X), e === "focusout" && (_e = te._wrapperState) && _e.controlled && te.type === "number" && De(te, "number", te.value);
        }
        switch (_e = X ? Lr(X) : window, e) {
          case "focusin":
            (Pc(_e) || _e.contentEditable === "true") && (Nr = _e, qs = X, To = null);
            break;
          case "focusout":
            To = qs = Nr = null;
            break;
          case "mousedown":
            Zs = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Zs = !1, Fc(se, r, re);
            break;
          case "selectionchange":
            if (wg) break;
          case "keydown":
          case "keyup":
            Fc(se, r, re);
        }
        var ke;
        if (bs) e: {
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
        else Cr ? Nc(e, r) && (Ce = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Ce = "onCompositionStart");
        Ce && (_c && r.locale !== "ko" && (Cr || Ce !== "onCompositionStart" ? Ce === "onCompositionEnd" && Cr && (ke = vc()) : (Cn = re, Vs = "value" in Cn ? Cn.value : Cn.textContent, Cr = !0)), _e = bi(X, Ce), 0 < _e.length && (Ce = new Sc(Ce, e, null, r, re), se.push({ event: Ce, listeners: _e }), ke ? Ce.data = ke : (ke = Mc(r), ke !== null && (Ce.data = ke)))), (ke = sg ? ug(e, r) : ag(e, r)) && (X = bi(X, "onBeforeInput"), 0 < X.length && (re = new Sc("onBeforeInput", "beforeinput", null, r, re), se.push({ event: re, listeners: X }), re.data = ke));
      }
      bc(se, t);
    });
  }
  function Io(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function bi(e, t) {
    for (var r = t + "Capture", l = []; e !== null; ) {
      var a = e, d = a.stateNode;
      a.tag === 5 && d !== null && (a = d, d = Xn(e, r), d != null && l.unshift(Io(e, d, a)), d = Xn(e, t), d != null && l.push(Io(e, d, a))), e = e.return;
    }
    return l;
  }
  function Pr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Kc(e, t, r, l, a) {
    for (var d = t._reactName, w = []; r !== null && r !== l; ) {
      var T = r, z = T.alternate, X = T.stateNode;
      if (z !== null && z === l) break;
      T.tag === 5 && X !== null && (T = X, a ? (z = Xn(r, d), z != null && w.unshift(Io(r, z, T))) : a || (z = Xn(r, d), z != null && w.push(Io(r, z, T)))), r = r.return;
    }
    w.length !== 0 && e.push({ event: t, listeners: w });
  }
  var _g = /\r\n?/g, kg = /\u0000|\uFFFD/g;
  function Gc(e) {
    return (typeof e == "string" ? e : "" + e).replace(_g, `
`).replace(kg, "");
  }
  function Qi(e, t, r) {
    if (t = Gc(t), Gc(e) !== t && r) throw Error(i(425));
  }
  function Ki() {
  }
  var ou = null, iu = null;
  function lu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var su = typeof setTimeout == "function" ? setTimeout : void 0, Cg = typeof clearTimeout == "function" ? clearTimeout : void 0, qc = typeof Promise == "function" ? Promise : void 0, Ng = typeof queueMicrotask == "function" ? queueMicrotask : typeof qc < "u" ? function(e) {
    return qc.resolve(null).then(e).catch(Mg);
  } : su;
  function Mg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function uu(e, t) {
    var r = t, l = 0;
    do {
      var a = r.nextSibling;
      if (e.removeChild(r), a && a.nodeType === 8) if (r = a.data, r === "/$") {
        if (l === 0) {
          e.removeChild(a), Eo(t);
          return;
        }
        l--;
      } else r !== "$" && r !== "$?" && r !== "$!" || l++;
      r = a;
    } while (r);
    Eo(t);
  }
  function Mn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Zc(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0) return e;
          t--;
        } else r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Tr = Math.random().toString(36).slice(2), Qt = "__reactFiber$" + Tr, Ro = "__reactProps$" + Tr, ln = "__reactContainer$" + Tr, au = "__reactEvents$" + Tr, Pg = "__reactListeners$" + Tr, Tg = "__reactHandles$" + Tr;
  function qn(e) {
    var t = e[Qt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[ln] || r[Qt]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Zc(e); e !== null; ) {
          if (r = e[Qt]) return r;
          e = Zc(e);
        }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Ao(e) {
    return e = e[Qt] || e[ln], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Lr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Gi(e) {
    return e[Ro] || null;
  }
  var cu = [], zr = -1;
  function Pn(e) {
    return { current: e };
  }
  function Fe(e) {
    0 > zr || (e.current = cu[zr], cu[zr] = null, zr--);
  }
  function $e(e, t) {
    zr++, cu[zr] = e.current, e.current = t;
  }
  var Tn = {}, nt = Pn(Tn), at = Pn(!1), Zn = Tn;
  function Ir(e, t) {
    var r = e.type.contextTypes;
    if (!r) return Tn;
    var l = e.stateNode;
    if (l && l.__reactInternalMemoizedUnmaskedChildContext === t) return l.__reactInternalMemoizedMaskedChildContext;
    var a = {}, d;
    for (d in r) a[d] = t[d];
    return l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }
  function ct(e) {
    return e = e.childContextTypes, e != null;
  }
  function qi() {
    Fe(at), Fe(nt);
  }
  function Jc(e, t, r) {
    if (nt.current !== Tn) throw Error(i(168));
    $e(nt, t), $e(at, r);
  }
  function ef(e, t, r) {
    var l = e.stateNode;
    if (t = t.childContextTypes, typeof l.getChildContext != "function") return r;
    l = l.getChildContext();
    for (var a in l) if (!(a in t)) throw Error(i(108, de(e) || "Unknown", a));
    return D({}, r, l);
  }
  function Zi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Tn, Zn = nt.current, $e(nt, e), $e(at, at.current), !0;
  }
  function tf(e, t, r) {
    var l = e.stateNode;
    if (!l) throw Error(i(169));
    r ? (e = ef(e, t, Zn), l.__reactInternalMemoizedMergedChildContext = e, Fe(at), Fe(nt), $e(nt, e)) : Fe(at), $e(at, r);
  }
  var sn = null, Ji = !1, fu = !1;
  function nf(e) {
    sn === null ? sn = [e] : sn.push(e);
  }
  function Lg(e) {
    Ji = !0, nf(e);
  }
  function Ln() {
    if (!fu && sn !== null) {
      fu = !0;
      var e = 0, t = Ie;
      try {
        var r = sn;
        for (Ie = 1; e < r.length; e++) {
          var l = r[e];
          do
            l = l(!0);
          while (l !== null);
        }
        sn = null, Ji = !1;
      } catch (a) {
        throw sn !== null && (sn = sn.slice(e + 1)), Ti(go, Ln), a;
      } finally {
        Ie = t, fu = !1;
      }
    }
    return null;
  }
  var Rr = [], Ar = 0, el = null, tl = 0, Mt = [], Pt = 0, Jn = null, un = 1, an = "";
  function er(e, t) {
    Rr[Ar++] = tl, Rr[Ar++] = el, el = e, tl = t;
  }
  function rf(e, t, r) {
    Mt[Pt++] = un, Mt[Pt++] = an, Mt[Pt++] = Jn, Jn = e;
    var l = un;
    e = an;
    var a = 32 - yt(l) - 1;
    l &= ~(1 << a), r += 1;
    var d = 32 - yt(t) + a;
    if (30 < d) {
      var w = a - a % 5;
      d = (l & (1 << w) - 1).toString(32), l >>= w, a -= w, un = 1 << 32 - yt(t) + a | r << a | l, an = d + e;
    } else un = 1 << d | r << a | l, an = e;
  }
  function du(e) {
    e.return !== null && (er(e, 1), rf(e, 1, 0));
  }
  function hu(e) {
    for (; e === el; ) el = Rr[--Ar], Rr[Ar] = null, tl = Rr[--Ar], Rr[Ar] = null;
    for (; e === Jn; ) Jn = Mt[--Pt], Mt[Pt] = null, an = Mt[--Pt], Mt[Pt] = null, un = Mt[--Pt], Mt[Pt] = null;
  }
  var wt = null, xt = null, He = !1, Dt = null;
  function of(e, t) {
    var r = It(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function lf(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, wt = e, xt = Mn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, wt = e, xt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Jn !== null ? { id: un, overflow: an } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = It(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, wt = e, xt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function pu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function mu(e) {
    if (He) {
      var t = xt;
      if (t) {
        var r = t;
        if (!lf(e, t)) {
          if (pu(e)) throw Error(i(418));
          t = Mn(r.nextSibling);
          var l = wt;
          t && lf(e, t) ? of(l, r) : (e.flags = e.flags & -4097 | 2, He = !1, wt = e);
        }
      } else {
        if (pu(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, He = !1, wt = e;
      }
    }
  }
  function sf(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    wt = e;
  }
  function nl(e) {
    if (e !== wt) return !1;
    if (!He) return sf(e), He = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !lu(e.type, e.memoizedProps)), t && (t = xt)) {
      if (pu(e)) throw uf(), Error(i(418));
      for (; t; ) of(e, t), t = Mn(t.nextSibling);
    }
    if (sf(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                xt = Mn(e.nextSibling);
                break e;
              }
              t--;
            } else r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        xt = null;
      }
    } else xt = wt ? Mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function uf() {
    for (var e = xt; e; ) e = Mn(e.nextSibling);
  }
  function $r() {
    xt = wt = null, He = !1;
  }
  function gu(e) {
    Dt === null ? Dt = [e] : Dt.push(e);
  }
  var zg = M.ReactCurrentBatchConfig;
  function $o(e, t, r) {
    if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (r._owner) {
        if (r = r._owner, r) {
          if (r.tag !== 1) throw Error(i(309));
          var l = r.stateNode;
        }
        if (!l) throw Error(i(147, e));
        var a = l, d = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === d ? t.ref : (t = function(w) {
          var T = a.refs;
          w === null ? delete T[d] : T[d] = w;
        }, t._stringRef = d, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!r._owner) throw Error(i(290, e));
    }
    return e;
  }
  function rl(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function af(e) {
    var t = e._init;
    return t(e._payload);
  }
  function cf(e) {
    function t(U, A) {
      if (e) {
        var Y = U.deletions;
        Y === null ? (U.deletions = [A], U.flags |= 16) : Y.push(A);
      }
    }
    function r(U, A) {
      if (!e) return null;
      for (; A !== null; ) t(U, A), A = A.sibling;
      return null;
    }
    function l(U, A) {
      for (U = /* @__PURE__ */ new Map(); A !== null; ) A.key !== null ? U.set(A.key, A) : U.set(A.index, A), A = A.sibling;
      return U;
    }
    function a(U, A) {
      return U = Fn(U, A), U.index = 0, U.sibling = null, U;
    }
    function d(U, A, Y) {
      return U.index = Y, e ? (Y = U.alternate, Y !== null ? (Y = Y.index, Y < A ? (U.flags |= 2, A) : Y) : (U.flags |= 2, A)) : (U.flags |= 1048576, A);
    }
    function w(U) {
      return e && U.alternate === null && (U.flags |= 2), U;
    }
    function T(U, A, Y, ue) {
      return A === null || A.tag !== 6 ? (A = sa(Y, U.mode, ue), A.return = U, A) : (A = a(A, Y), A.return = U, A);
    }
    function z(U, A, Y, ue) {
      var xe = Y.type;
      return xe === B ? re(U, A, Y.props.children, ue, Y.key) : A !== null && (A.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === $ && af(xe) === A.type) ? (ue = a(A, Y.props), ue.ref = $o(U, A, Y), ue.return = U, ue) : (ue = Ml(Y.type, Y.key, Y.props, null, U.mode, ue), ue.ref = $o(U, A, Y), ue.return = U, ue);
    }
    function X(U, A, Y, ue) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== Y.containerInfo || A.stateNode.implementation !== Y.implementation ? (A = ua(Y, U.mode, ue), A.return = U, A) : (A = a(A, Y.children || []), A.return = U, A);
    }
    function re(U, A, Y, ue, xe) {
      return A === null || A.tag !== 7 ? (A = ur(Y, U.mode, ue, xe), A.return = U, A) : (A = a(A, Y), A.return = U, A);
    }
    function se(U, A, Y) {
      if (typeof A == "string" && A !== "" || typeof A == "number") return A = sa("" + A, U.mode, Y), A.return = U, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case I:
            return Y = Ml(A.type, A.key, A.props, null, U.mode, Y), Y.ref = $o(U, null, A), Y.return = U, Y;
          case j:
            return A = ua(A, U.mode, Y), A.return = U, A;
          case $:
            var ue = A._init;
            return se(U, ue(A._payload), Y);
        }
        if (Rt(A) || L(A)) return A = ur(A, U.mode, Y, null), A.return = U, A;
        rl(U, A);
      }
      return null;
    }
    function te(U, A, Y, ue) {
      var xe = A !== null ? A.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number") return xe !== null ? null : T(U, A, "" + Y, ue);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case I:
            return Y.key === xe ? z(U, A, Y, ue) : null;
          case j:
            return Y.key === xe ? X(U, A, Y, ue) : null;
          case $:
            return xe = Y._init, te(
              U,
              A,
              xe(Y._payload),
              ue
            );
        }
        if (Rt(Y) || L(Y)) return xe !== null ? null : re(U, A, Y, ue, null);
        rl(U, Y);
      }
      return null;
    }
    function ge(U, A, Y, ue, xe) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return U = U.get(Y) || null, T(A, U, "" + ue, xe);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case I:
            return U = U.get(ue.key === null ? Y : ue.key) || null, z(A, U, ue, xe);
          case j:
            return U = U.get(ue.key === null ? Y : ue.key) || null, X(A, U, ue, xe);
          case $:
            var _e = ue._init;
            return ge(U, A, Y, _e(ue._payload), xe);
        }
        if (Rt(ue) || L(ue)) return U = U.get(Y) || null, re(A, U, ue, xe, null);
        rl(A, ue);
      }
      return null;
    }
    function ve(U, A, Y, ue) {
      for (var xe = null, _e = null, ke = A, Ce = A = 0, Je = null; ke !== null && Ce < Y.length; Ce++) {
        ke.index > Ce ? (Je = ke, ke = null) : Je = ke.sibling;
        var ze = te(U, ke, Y[Ce], ue);
        if (ze === null) {
          ke === null && (ke = Je);
          break;
        }
        e && ke && ze.alternate === null && t(U, ke), A = d(ze, A, Ce), _e === null ? xe = ze : _e.sibling = ze, _e = ze, ke = Je;
      }
      if (Ce === Y.length) return r(U, ke), He && er(U, Ce), xe;
      if (ke === null) {
        for (; Ce < Y.length; Ce++) ke = se(U, Y[Ce], ue), ke !== null && (A = d(ke, A, Ce), _e === null ? xe = ke : _e.sibling = ke, _e = ke);
        return He && er(U, Ce), xe;
      }
      for (ke = l(U, ke); Ce < Y.length; Ce++) Je = ge(ke, U, Ce, Y[Ce], ue), Je !== null && (e && Je.alternate !== null && ke.delete(Je.key === null ? Ce : Je.key), A = d(Je, A, Ce), _e === null ? xe = Je : _e.sibling = Je, _e = Je);
      return e && ke.forEach(function(Hn) {
        return t(U, Hn);
      }), He && er(U, Ce), xe;
    }
    function we(U, A, Y, ue) {
      var xe = L(Y);
      if (typeof xe != "function") throw Error(i(150));
      if (Y = xe.call(Y), Y == null) throw Error(i(151));
      for (var _e = xe = null, ke = A, Ce = A = 0, Je = null, ze = Y.next(); ke !== null && !ze.done; Ce++, ze = Y.next()) {
        ke.index > Ce ? (Je = ke, ke = null) : Je = ke.sibling;
        var Hn = te(U, ke, ze.value, ue);
        if (Hn === null) {
          ke === null && (ke = Je);
          break;
        }
        e && ke && Hn.alternate === null && t(U, ke), A = d(Hn, A, Ce), _e === null ? xe = Hn : _e.sibling = Hn, _e = Hn, ke = Je;
      }
      if (ze.done) return r(
        U,
        ke
      ), He && er(U, Ce), xe;
      if (ke === null) {
        for (; !ze.done; Ce++, ze = Y.next()) ze = se(U, ze.value, ue), ze !== null && (A = d(ze, A, Ce), _e === null ? xe = ze : _e.sibling = ze, _e = ze);
        return He && er(U, Ce), xe;
      }
      for (ke = l(U, ke); !ze.done; Ce++, ze = Y.next()) ze = ge(ke, U, Ce, ze.value, ue), ze !== null && (e && ze.alternate !== null && ke.delete(ze.key === null ? Ce : ze.key), A = d(ze, A, Ce), _e === null ? xe = ze : _e.sibling = ze, _e = ze);
      return e && ke.forEach(function(c0) {
        return t(U, c0);
      }), He && er(U, Ce), xe;
    }
    function Xe(U, A, Y, ue) {
      if (typeof Y == "object" && Y !== null && Y.type === B && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case I:
            e: {
              for (var xe = Y.key, _e = A; _e !== null; ) {
                if (_e.key === xe) {
                  if (xe = Y.type, xe === B) {
                    if (_e.tag === 7) {
                      r(U, _e.sibling), A = a(_e, Y.props.children), A.return = U, U = A;
                      break e;
                    }
                  } else if (_e.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === $ && af(xe) === _e.type) {
                    r(U, _e.sibling), A = a(_e, Y.props), A.ref = $o(U, _e, Y), A.return = U, U = A;
                    break e;
                  }
                  r(U, _e);
                  break;
                } else t(U, _e);
                _e = _e.sibling;
              }
              Y.type === B ? (A = ur(Y.props.children, U.mode, ue, Y.key), A.return = U, U = A) : (ue = Ml(Y.type, Y.key, Y.props, null, U.mode, ue), ue.ref = $o(U, A, Y), ue.return = U, U = ue);
            }
            return w(U);
          case j:
            e: {
              for (_e = Y.key; A !== null; ) {
                if (A.key === _e) if (A.tag === 4 && A.stateNode.containerInfo === Y.containerInfo && A.stateNode.implementation === Y.implementation) {
                  r(U, A.sibling), A = a(A, Y.children || []), A.return = U, U = A;
                  break e;
                } else {
                  r(U, A);
                  break;
                }
                else t(U, A);
                A = A.sibling;
              }
              A = ua(Y, U.mode, ue), A.return = U, U = A;
            }
            return w(U);
          case $:
            return _e = Y._init, Xe(U, A, _e(Y._payload), ue);
        }
        if (Rt(Y)) return ve(U, A, Y, ue);
        if (L(Y)) return we(U, A, Y, ue);
        rl(U, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" ? (Y = "" + Y, A !== null && A.tag === 6 ? (r(U, A.sibling), A = a(A, Y), A.return = U, U = A) : (r(U, A), A = sa(Y, U.mode, ue), A.return = U, U = A), w(U)) : r(U, A);
    }
    return Xe;
  }
  var Dr = cf(!0), ff = cf(!1), ol = Pn(null), il = null, Or = null, yu = null;
  function vu() {
    yu = Or = il = null;
  }
  function wu(e) {
    var t = ol.current;
    Fe(ol), e._currentValue = t;
  }
  function xu(e, t, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function Fr(e, t) {
    il = e, yu = Or = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (ft = !0), e.firstContext = null);
  }
  function Tt(e) {
    var t = e._currentValue;
    if (yu !== e) if (e = { context: e, memoizedValue: t, next: null }, Or === null) {
      if (il === null) throw Error(i(308));
      Or = e, il.dependencies = { lanes: 0, firstContext: e };
    } else Or = Or.next = e;
    return t;
  }
  var tr = null;
  function Su(e) {
    tr === null ? tr = [e] : tr.push(e);
  }
  function df(e, t, r, l) {
    var a = t.interleaved;
    return a === null ? (r.next = r, Su(t)) : (r.next = a.next, a.next = r), t.interleaved = r, cn(e, l);
  }
  function cn(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var zn = !1;
  function Eu(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function hf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function fn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function In(e, t, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Le & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, cn(e, r);
    }
    return a = l.interleaved, a === null ? (t.next = t, Su(l)) : (t.next = a.next, a.next = t), l.interleaved = t, cn(e, r);
  }
  function ll(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, Ds(e, r);
    }
  }
  function pf(e, t) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var a = null, d = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var w = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
          d === null ? a = d = w : d = d.next = w, r = r.next;
        } while (r !== null);
        d === null ? a = d = t : d = d.next = t;
      } else a = d = t;
      r = { baseState: l.baseState, firstBaseUpdate: a, lastBaseUpdate: d, shared: l.shared, effects: l.effects }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  function sl(e, t, r, l) {
    var a = e.updateQueue;
    zn = !1;
    var d = a.firstBaseUpdate, w = a.lastBaseUpdate, T = a.shared.pending;
    if (T !== null) {
      a.shared.pending = null;
      var z = T, X = z.next;
      z.next = null, w === null ? d = X : w.next = X, w = z;
      var re = e.alternate;
      re !== null && (re = re.updateQueue, T = re.lastBaseUpdate, T !== w && (T === null ? re.firstBaseUpdate = X : T.next = X, re.lastBaseUpdate = z));
    }
    if (d !== null) {
      var se = a.baseState;
      w = 0, re = X = z = null, T = d;
      do {
        var te = T.lane, ge = T.eventTime;
        if ((l & te) === te) {
          re !== null && (re = re.next = {
            eventTime: ge,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var ve = e, we = T;
            switch (te = t, ge = r, we.tag) {
              case 1:
                if (ve = we.payload, typeof ve == "function") {
                  se = ve.call(ge, se, te);
                  break e;
                }
                se = ve;
                break e;
              case 3:
                ve.flags = ve.flags & -65537 | 128;
              case 0:
                if (ve = we.payload, te = typeof ve == "function" ? ve.call(ge, se, te) : ve, te == null) break e;
                se = D({}, se, te);
                break e;
              case 2:
                zn = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (e.flags |= 64, te = a.effects, te === null ? a.effects = [T] : te.push(T));
        } else ge = { eventTime: ge, lane: te, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, re === null ? (X = re = ge, z = se) : re = re.next = ge, w |= te;
        if (T = T.next, T === null) {
          if (T = a.shared.pending, T === null) break;
          te = T, T = te.next, te.next = null, a.lastBaseUpdate = te, a.shared.pending = null;
        }
      } while (!0);
      if (re === null && (z = se), a.baseState = z, a.firstBaseUpdate = X, a.lastBaseUpdate = re, t = a.shared.interleaved, t !== null) {
        a = t;
        do
          w |= a.lane, a = a.next;
        while (a !== t);
      } else d === null && (a.shared.lanes = 0);
      or |= w, e.lanes = w, e.memoizedState = se;
    }
  }
  function mf(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var l = e[t], a = l.callback;
      if (a !== null) {
        if (l.callback = null, l = r, typeof a != "function") throw Error(i(191, a));
        a.call(l);
      }
    }
  }
  var Do = {}, Kt = Pn(Do), Oo = Pn(Do), Fo = Pn(Do);
  function nr(e) {
    if (e === Do) throw Error(i(174));
    return e;
  }
  function _u(e, t) {
    switch ($e(Fo, t), $e(Oo, e), $e(Kt, Do), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ct(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ct(t, e);
    }
    Fe(Kt), $e(Kt, t);
  }
  function Hr() {
    Fe(Kt), Fe(Oo), Fe(Fo);
  }
  function gf(e) {
    nr(Fo.current);
    var t = nr(Kt.current), r = Ct(t, e.type);
    t !== r && ($e(Oo, e), $e(Kt, r));
  }
  function ku(e) {
    Oo.current === e && (Fe(Kt), Fe(Oo));
  }
  var Be = Pn(0);
  function ul(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Cu = [];
  function Nu() {
    for (var e = 0; e < Cu.length; e++) Cu[e]._workInProgressVersionPrimary = null;
    Cu.length = 0;
  }
  var al = M.ReactCurrentDispatcher, Mu = M.ReactCurrentBatchConfig, rr = 0, Ue = null, Ke = null, qe = null, cl = !1, Ho = !1, jo = 0, Ig = 0;
  function rt() {
    throw Error(i(321));
  }
  function Pu(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++) if (!$t(e[r], t[r])) return !1;
    return !0;
  }
  function Tu(e, t, r, l, a, d) {
    if (rr = d, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, al.current = e === null || e.memoizedState === null ? Dg : Og, e = r(l, a), Ho) {
      d = 0;
      do {
        if (Ho = !1, jo = 0, 25 <= d) throw Error(i(301));
        d += 1, qe = Ke = null, t.updateQueue = null, al.current = Fg, e = r(l, a);
      } while (Ho);
    }
    if (al.current = hl, t = Ke !== null && Ke.next !== null, rr = 0, qe = Ke = Ue = null, cl = !1, t) throw Error(i(300));
    return e;
  }
  function Lu() {
    var e = jo !== 0;
    return jo = 0, e;
  }
  function Gt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return qe === null ? Ue.memoizedState = qe = e : qe = qe.next = e, qe;
  }
  function Lt() {
    if (Ke === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var t = qe === null ? Ue.memoizedState : qe.next;
    if (t !== null) qe = t, Ke = e;
    else {
      if (e === null) throw Error(i(310));
      Ke = e, e = { memoizedState: Ke.memoizedState, baseState: Ke.baseState, baseQueue: Ke.baseQueue, queue: Ke.queue, next: null }, qe === null ? Ue.memoizedState = qe = e : qe = qe.next = e;
    }
    return qe;
  }
  function Vo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function zu(e) {
    var t = Lt(), r = t.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = Ke, a = l.baseQueue, d = r.pending;
    if (d !== null) {
      if (a !== null) {
        var w = a.next;
        a.next = d.next, d.next = w;
      }
      l.baseQueue = a = d, r.pending = null;
    }
    if (a !== null) {
      d = a.next, l = l.baseState;
      var T = w = null, z = null, X = d;
      do {
        var re = X.lane;
        if ((rr & re) === re) z !== null && (z = z.next = { lane: 0, action: X.action, hasEagerState: X.hasEagerState, eagerState: X.eagerState, next: null }), l = X.hasEagerState ? X.eagerState : e(l, X.action);
        else {
          var se = {
            lane: re,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          };
          z === null ? (T = z = se, w = l) : z = z.next = se, Ue.lanes |= re, or |= re;
        }
        X = X.next;
      } while (X !== null && X !== d);
      z === null ? w = l : z.next = T, $t(l, t.memoizedState) || (ft = !0), t.memoizedState = l, t.baseState = w, t.baseQueue = z, r.lastRenderedState = l;
    }
    if (e = r.interleaved, e !== null) {
      a = e;
      do
        d = a.lane, Ue.lanes |= d, or |= d, a = a.next;
      while (a !== e);
    } else a === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function Iu(e) {
    var t = Lt(), r = t.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, a = r.pending, d = t.memoizedState;
    if (a !== null) {
      r.pending = null;
      var w = a = a.next;
      do
        d = e(d, w.action), w = w.next;
      while (w !== a);
      $t(d, t.memoizedState) || (ft = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), r.lastRenderedState = d;
    }
    return [d, l];
  }
  function yf() {
  }
  function vf(e, t) {
    var r = Ue, l = Lt(), a = t(), d = !$t(l.memoizedState, a);
    if (d && (l.memoizedState = a, ft = !0), l = l.queue, Ru(Sf.bind(null, r, l, e), [e]), l.getSnapshot !== t || d || qe !== null && qe.memoizedState.tag & 1) {
      if (r.flags |= 2048, Bo(9, xf.bind(null, r, l, a, t), void 0, null), Ze === null) throw Error(i(349));
      (rr & 30) !== 0 || wf(r, t, a);
    }
    return a;
  }
  function wf(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function xf(e, t, r, l) {
    t.value = r, t.getSnapshot = l, Ef(t) && _f(e);
  }
  function Sf(e, t, r) {
    return r(function() {
      Ef(t) && _f(e);
    });
  }
  function Ef(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !$t(e, r);
    } catch {
      return !0;
    }
  }
  function _f(e) {
    var t = cn(e, 1);
    t !== null && jt(t, e, 1, -1);
  }
  function kf(e) {
    var t = Gt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vo, lastRenderedState: e }, t.queue = e, e = e.dispatch = $g.bind(null, Ue, e), [t.memoizedState, e];
  }
  function Bo(e, t, r, l) {
    return e = { tag: e, create: t, destroy: r, deps: l, next: null }, t = Ue.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ue.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, t.lastEffect = e)), e;
  }
  function Cf() {
    return Lt().memoizedState;
  }
  function fl(e, t, r, l) {
    var a = Gt();
    Ue.flags |= e, a.memoizedState = Bo(1 | t, r, void 0, l === void 0 ? null : l);
  }
  function dl(e, t, r, l) {
    var a = Lt();
    l = l === void 0 ? null : l;
    var d = void 0;
    if (Ke !== null) {
      var w = Ke.memoizedState;
      if (d = w.destroy, l !== null && Pu(l, w.deps)) {
        a.memoizedState = Bo(t, r, d, l);
        return;
      }
    }
    Ue.flags |= e, a.memoizedState = Bo(1 | t, r, d, l);
  }
  function Nf(e, t) {
    return fl(8390656, 8, e, t);
  }
  function Ru(e, t) {
    return dl(2048, 8, e, t);
  }
  function Mf(e, t) {
    return dl(4, 2, e, t);
  }
  function Pf(e, t) {
    return dl(4, 4, e, t);
  }
  function Tf(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Lf(e, t, r) {
    return r = r != null ? r.concat([e]) : null, dl(4, 4, Tf.bind(null, t, e), r);
  }
  function Au() {
  }
  function zf(e, t) {
    var r = Lt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    return l !== null && t !== null && Pu(t, l[1]) ? l[0] : (r.memoizedState = [e, t], e);
  }
  function If(e, t) {
    var r = Lt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    return l !== null && t !== null && Pu(t, l[1]) ? l[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function Rf(e, t, r) {
    return (rr & 21) === 0 ? (e.baseState && (e.baseState = !1, ft = !0), e.memoizedState = r) : ($t(r, t) || (r = Ai(), Ue.lanes |= r, or |= r, e.baseState = !0), t);
  }
  function Rg(e, t) {
    var r = Ie;
    Ie = r !== 0 && 4 > r ? r : 4, e(!0);
    var l = Mu.transition;
    Mu.transition = {};
    try {
      e(!1), t();
    } finally {
      Ie = r, Mu.transition = l;
    }
  }
  function Af() {
    return Lt().memoizedState;
  }
  function Ag(e, t, r) {
    var l = Dn(e);
    if (r = { lane: l, action: r, hasEagerState: !1, eagerState: null, next: null }, $f(e)) Df(t, r);
    else if (r = df(e, t, r, l), r !== null) {
      var a = ut();
      jt(r, e, l, a), Of(r, t, l);
    }
  }
  function $g(e, t, r) {
    var l = Dn(e), a = { lane: l, action: r, hasEagerState: !1, eagerState: null, next: null };
    if ($f(e)) Df(t, a);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null)) try {
        var w = t.lastRenderedState, T = d(w, r);
        if (a.hasEagerState = !0, a.eagerState = T, $t(T, w)) {
          var z = t.interleaved;
          z === null ? (a.next = a, Su(t)) : (a.next = z.next, z.next = a), t.interleaved = a;
          return;
        }
      } catch {
      } finally {
      }
      r = df(e, t, a, l), r !== null && (a = ut(), jt(r, e, l, a), Of(r, t, l));
    }
  }
  function $f(e) {
    var t = e.alternate;
    return e === Ue || t !== null && t === Ue;
  }
  function Df(e, t) {
    Ho = cl = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Of(e, t, r) {
    if ((r & 4194240) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, Ds(e, r);
    }
  }
  var hl = { readContext: Tt, useCallback: rt, useContext: rt, useEffect: rt, useImperativeHandle: rt, useInsertionEffect: rt, useLayoutEffect: rt, useMemo: rt, useReducer: rt, useRef: rt, useState: rt, useDebugValue: rt, useDeferredValue: rt, useTransition: rt, useMutableSource: rt, useSyncExternalStore: rt, useId: rt, unstable_isNewReconciler: !1 }, Dg = { readContext: Tt, useCallback: function(e, t) {
    return Gt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Tt, useEffect: Nf, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, fl(
      4194308,
      4,
      Tf.bind(null, t, e),
      r
    );
  }, useLayoutEffect: function(e, t) {
    return fl(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return fl(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = Gt();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var l = Gt();
    return t = r !== void 0 ? r(t) : t, l.memoizedState = l.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, l.queue = e, e = e.dispatch = Ag.bind(null, Ue, e), [l.memoizedState, e];
  }, useRef: function(e) {
    var t = Gt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: kf, useDebugValue: Au, useDeferredValue: function(e) {
    return Gt().memoizedState = e;
  }, useTransition: function() {
    var e = kf(!1), t = e[0];
    return e = Rg.bind(null, e[1]), Gt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var l = Ue, a = Gt();
    if (He) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else {
      if (r = t(), Ze === null) throw Error(i(349));
      (rr & 30) !== 0 || wf(l, t, r);
    }
    a.memoizedState = r;
    var d = { value: r, getSnapshot: t };
    return a.queue = d, Nf(Sf.bind(
      null,
      l,
      d,
      e
    ), [e]), l.flags |= 2048, Bo(9, xf.bind(null, l, d, r, t), void 0, null), r;
  }, useId: function() {
    var e = Gt(), t = Ze.identifierPrefix;
    if (He) {
      var r = an, l = un;
      r = (l & ~(1 << 32 - yt(l) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = jo++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else r = Ig++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Og = {
    readContext: Tt,
    useCallback: zf,
    useContext: Tt,
    useEffect: Ru,
    useImperativeHandle: Lf,
    useInsertionEffect: Mf,
    useLayoutEffect: Pf,
    useMemo: If,
    useReducer: zu,
    useRef: Cf,
    useState: function() {
      return zu(Vo);
    },
    useDebugValue: Au,
    useDeferredValue: function(e) {
      var t = Lt();
      return Rf(t, Ke.memoizedState, e);
    },
    useTransition: function() {
      var e = zu(Vo)[0], t = Lt().memoizedState;
      return [e, t];
    },
    useMutableSource: yf,
    useSyncExternalStore: vf,
    useId: Af,
    unstable_isNewReconciler: !1
  }, Fg = { readContext: Tt, useCallback: zf, useContext: Tt, useEffect: Ru, useImperativeHandle: Lf, useInsertionEffect: Mf, useLayoutEffect: Pf, useMemo: If, useReducer: Iu, useRef: Cf, useState: function() {
    return Iu(Vo);
  }, useDebugValue: Au, useDeferredValue: function(e) {
    var t = Lt();
    return Ke === null ? t.memoizedState = e : Rf(t, Ke.memoizedState, e);
  }, useTransition: function() {
    var e = Iu(Vo)[0], t = Lt().memoizedState;
    return [e, t];
  }, useMutableSource: yf, useSyncExternalStore: vf, useId: Af, unstable_isNewReconciler: !1 };
  function Ot(e, t) {
    if (e && e.defaultProps) {
      t = D({}, t), e = e.defaultProps;
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function $u(e, t, r, l) {
    t = e.memoizedState, r = r(l, t), r = r == null ? t : D({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var pl = { isMounted: function(e) {
    return (e = e._reactInternals) ? Xt(e) === e : !1;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var l = ut(), a = Dn(e), d = fn(l, a);
    d.payload = t, r != null && (d.callback = r), t = In(e, d, a), t !== null && (jt(t, e, a, l), ll(t, e, a));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var l = ut(), a = Dn(e), d = fn(l, a);
    d.tag = 1, d.payload = t, r != null && (d.callback = r), t = In(e, d, a), t !== null && (jt(t, e, a, l), ll(t, e, a));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = ut(), l = Dn(e), a = fn(r, l);
    a.tag = 2, t != null && (a.callback = t), t = In(e, a, l), t !== null && (jt(t, e, l, r), ll(t, e, l));
  } };
  function Ff(e, t, r, l, a, d, w) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, w) : t.prototype && t.prototype.isPureReactComponent ? !Po(r, l) || !Po(a, d) : !0;
  }
  function Hf(e, t, r) {
    var l = !1, a = Tn, d = t.contextType;
    return typeof d == "object" && d !== null ? d = Tt(d) : (a = ct(t) ? Zn : nt.current, l = t.contextTypes, d = (l = l != null) ? Ir(e, a) : Tn), t = new t(r, d), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = pl, e.stateNode = t, t._reactInternals = e, l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = d), t;
  }
  function jf(e, t, r, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, l), t.state !== e && pl.enqueueReplaceState(t, t.state, null);
  }
  function Du(e, t, r, l) {
    var a = e.stateNode;
    a.props = r, a.state = e.memoizedState, a.refs = {}, Eu(e);
    var d = t.contextType;
    typeof d == "object" && d !== null ? a.context = Tt(d) : (d = ct(t) ? Zn : nt.current, a.context = Ir(e, d)), a.state = e.memoizedState, d = t.getDerivedStateFromProps, typeof d == "function" && ($u(e, t, d, r), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && pl.enqueueReplaceState(a, a.state, null), sl(e, r, a, l), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function jr(e, t) {
    try {
      var r = "", l = t;
      do
        r += ae(l), l = l.return;
      while (l);
      var a = r;
    } catch (d) {
      a = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function Ou(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function Fu(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var Hg = typeof WeakMap == "function" ? WeakMap : Map;
  function Vf(e, t, r) {
    r = fn(-1, r), r.tag = 3, r.payload = { element: null };
    var l = t.value;
    return r.callback = function() {
      Sl || (Sl = !0, Ju = l), Fu(e, t);
    }, r;
  }
  function Bf(e, t, r) {
    r = fn(-1, r), r.tag = 3;
    var l = e.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var a = t.value;
      r.payload = function() {
        return l(a);
      }, r.callback = function() {
        Fu(e, t);
      };
    }
    var d = e.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (r.callback = function() {
      Fu(e, t), typeof l != "function" && (An === null ? An = /* @__PURE__ */ new Set([this]) : An.add(this));
      var w = t.stack;
      this.componentDidCatch(t.value, { componentStack: w !== null ? w : "" });
    }), r;
  }
  function Uf(e, t, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Hg();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(r) || (a.add(r), e = Jg.bind(null, e, t, r), t.then(e, e));
  }
  function Wf(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Yf(e, t, r, l, a) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = fn(-1, 1), t.tag = 2, In(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var jg = M.ReactCurrentOwner, ft = !1;
  function st(e, t, r, l) {
    t.child = e === null ? ff(t, null, r, l) : Dr(t, e.child, r, l);
  }
  function Xf(e, t, r, l, a) {
    r = r.render;
    var d = t.ref;
    return Fr(t, a), l = Tu(e, t, r, l, d, a), r = Lu(), e !== null && !ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, dn(e, t, a)) : (He && r && du(t), t.flags |= 1, st(e, t, l, a), t.child);
  }
  function bf(e, t, r, l, a) {
    if (e === null) {
      var d = r.type;
      return typeof d == "function" && !la(d) && d.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = d, Qf(e, t, d, l, a)) : (e = Ml(r.type, null, l, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, (e.lanes & a) === 0) {
      var w = d.memoizedProps;
      if (r = r.compare, r = r !== null ? r : Po, r(w, l) && e.ref === t.ref) return dn(e, t, a);
    }
    return t.flags |= 1, e = Fn(d, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Qf(e, t, r, l, a) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (Po(d, l) && e.ref === t.ref) if (ft = !1, t.pendingProps = l = d, (e.lanes & a) !== 0) (e.flags & 131072) !== 0 && (ft = !0);
      else return t.lanes = e.lanes, dn(e, t, a);
    }
    return Hu(e, t, r, l, a);
  }
  function Kf(e, t, r) {
    var l = t.pendingProps, a = l.children, d = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $e(Br, St), St |= r;
    else {
      if ((r & 1073741824) === 0) return e = d !== null ? d.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $e(Br, St), St |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, l = d !== null ? d.baseLanes : r, $e(Br, St), St |= l;
    }
    else d !== null ? (l = d.baseLanes | r, t.memoizedState = null) : l = r, $e(Br, St), St |= l;
    return st(e, t, a, r), t.child;
  }
  function Gf(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Hu(e, t, r, l, a) {
    var d = ct(r) ? Zn : nt.current;
    return d = Ir(t, d), Fr(t, a), r = Tu(e, t, r, l, d, a), l = Lu(), e !== null && !ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, dn(e, t, a)) : (He && l && du(t), t.flags |= 1, st(e, t, r, a), t.child);
  }
  function qf(e, t, r, l, a) {
    if (ct(r)) {
      var d = !0;
      Zi(t);
    } else d = !1;
    if (Fr(t, a), t.stateNode === null) gl(e, t), Hf(t, r, l), Du(t, r, l, a), l = !0;
    else if (e === null) {
      var w = t.stateNode, T = t.memoizedProps;
      w.props = T;
      var z = w.context, X = r.contextType;
      typeof X == "object" && X !== null ? X = Tt(X) : (X = ct(r) ? Zn : nt.current, X = Ir(t, X));
      var re = r.getDerivedStateFromProps, se = typeof re == "function" || typeof w.getSnapshotBeforeUpdate == "function";
      se || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (T !== l || z !== X) && jf(t, w, l, X), zn = !1;
      var te = t.memoizedState;
      w.state = te, sl(t, l, w, a), z = t.memoizedState, T !== l || te !== z || at.current || zn ? (typeof re == "function" && ($u(t, r, re, l), z = t.memoizedState), (T = zn || Ff(t, r, T, l, te, z, X)) ? (se || typeof w.UNSAFE_componentWillMount != "function" && typeof w.componentWillMount != "function" || (typeof w.componentWillMount == "function" && w.componentWillMount(), typeof w.UNSAFE_componentWillMount == "function" && w.UNSAFE_componentWillMount()), typeof w.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof w.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = z), w.props = l, w.state = z, w.context = X, l = T) : (typeof w.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      w = t.stateNode, hf(e, t), T = t.memoizedProps, X = t.type === t.elementType ? T : Ot(t.type, T), w.props = X, se = t.pendingProps, te = w.context, z = r.contextType, typeof z == "object" && z !== null ? z = Tt(z) : (z = ct(r) ? Zn : nt.current, z = Ir(t, z));
      var ge = r.getDerivedStateFromProps;
      (re = typeof ge == "function" || typeof w.getSnapshotBeforeUpdate == "function") || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (T !== se || te !== z) && jf(t, w, l, z), zn = !1, te = t.memoizedState, w.state = te, sl(t, l, w, a);
      var ve = t.memoizedState;
      T !== se || te !== ve || at.current || zn ? (typeof ge == "function" && ($u(t, r, ge, l), ve = t.memoizedState), (X = zn || Ff(t, r, X, l, te, ve, z) || !1) ? (re || typeof w.UNSAFE_componentWillUpdate != "function" && typeof w.componentWillUpdate != "function" || (typeof w.componentWillUpdate == "function" && w.componentWillUpdate(l, ve, z), typeof w.UNSAFE_componentWillUpdate == "function" && w.UNSAFE_componentWillUpdate(l, ve, z)), typeof w.componentDidUpdate == "function" && (t.flags |= 4), typeof w.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof w.componentDidUpdate != "function" || T === e.memoizedProps && te === e.memoizedState || (t.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && te === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = ve), w.props = l, w.state = ve, w.context = z, l = X) : (typeof w.componentDidUpdate != "function" || T === e.memoizedProps && te === e.memoizedState || (t.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || T === e.memoizedProps && te === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return ju(e, t, r, l, d, a);
  }
  function ju(e, t, r, l, a, d) {
    Gf(e, t);
    var w = (t.flags & 128) !== 0;
    if (!l && !w) return a && tf(t, r, !1), dn(e, t, d);
    l = t.stateNode, jg.current = t;
    var T = w && typeof r.getDerivedStateFromError != "function" ? null : l.render();
    return t.flags |= 1, e !== null && w ? (t.child = Dr(t, e.child, null, d), t.child = Dr(t, null, T, d)) : st(e, t, T, d), t.memoizedState = l.state, a && tf(t, r, !0), t.child;
  }
  function Zf(e) {
    var t = e.stateNode;
    t.pendingContext ? Jc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Jc(e, t.context, !1), _u(e, t.containerInfo);
  }
  function Jf(e, t, r, l, a) {
    return $r(), gu(a), t.flags |= 256, st(e, t, r, l), t.child;
  }
  var Vu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Bu(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ed(e, t, r) {
    var l = t.pendingProps, a = Be.current, d = !1, w = (t.flags & 128) !== 0, T;
    if ((T = w) || (T = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), T ? (d = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), $e(Be, a & 1), e === null)
      return mu(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (w = l.children, e = l.fallback, d ? (l = t.mode, d = t.child, w = { mode: "hidden", children: w }, (l & 1) === 0 && d !== null ? (d.childLanes = 0, d.pendingProps = w) : d = Pl(w, l, 0, null), e = ur(e, l, r, null), d.return = t, e.return = t, d.sibling = e, t.child = d, t.child.memoizedState = Bu(r), t.memoizedState = Vu, e) : Uu(t, w));
    if (a = e.memoizedState, a !== null && (T = a.dehydrated, T !== null)) return Vg(e, t, w, l, T, a, r);
    if (d) {
      d = l.fallback, w = t.mode, a = e.child, T = a.sibling;
      var z = { mode: "hidden", children: l.children };
      return (w & 1) === 0 && t.child !== a ? (l = t.child, l.childLanes = 0, l.pendingProps = z, t.deletions = null) : (l = Fn(a, z), l.subtreeFlags = a.subtreeFlags & 14680064), T !== null ? d = Fn(T, d) : (d = ur(d, w, r, null), d.flags |= 2), d.return = t, l.return = t, l.sibling = d, t.child = l, l = d, d = t.child, w = e.child.memoizedState, w = w === null ? Bu(r) : { baseLanes: w.baseLanes | r, cachePool: null, transitions: w.transitions }, d.memoizedState = w, d.childLanes = e.childLanes & ~r, t.memoizedState = Vu, l;
    }
    return d = e.child, e = d.sibling, l = Fn(d, { mode: "visible", children: l.children }), (t.mode & 1) === 0 && (l.lanes = r), l.return = t, l.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = l, t.memoizedState = null, l;
  }
  function Uu(e, t) {
    return t = Pl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function ml(e, t, r, l) {
    return l !== null && gu(l), Dr(t, e.child, null, r), e = Uu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Vg(e, t, r, l, a, d, w) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, l = Ou(Error(i(422))), ml(e, t, w, l)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (d = l.fallback, a = t.mode, l = Pl({ mode: "visible", children: l.children }, a, 0, null), d = ur(d, a, w, null), d.flags |= 2, l.return = t, d.return = t, l.sibling = d, t.child = l, (t.mode & 1) !== 0 && Dr(t, e.child, null, w), t.child.memoizedState = Bu(w), t.memoizedState = Vu, d);
    if ((t.mode & 1) === 0) return ml(e, t, w, null);
    if (a.data === "$!") {
      if (l = a.nextSibling && a.nextSibling.dataset, l) var T = l.dgst;
      return l = T, d = Error(i(419)), l = Ou(d, l, void 0), ml(e, t, w, l);
    }
    if (T = (w & e.childLanes) !== 0, ft || T) {
      if (l = Ze, l !== null) {
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
        a = (a & (l.suspendedLanes | w)) !== 0 ? 0 : a, a !== 0 && a !== d.retryLane && (d.retryLane = a, cn(e, a), jt(l, e, a, -1));
      }
      return ia(), l = Ou(Error(i(421))), ml(e, t, w, l);
    }
    return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = e0.bind(null, e), a._reactRetry = t, null) : (e = d.treeContext, xt = Mn(a.nextSibling), wt = t, He = !0, Dt = null, e !== null && (Mt[Pt++] = un, Mt[Pt++] = an, Mt[Pt++] = Jn, un = e.id, an = e.overflow, Jn = t), t = Uu(t, l.children), t.flags |= 4096, t);
  }
  function td(e, t, r) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), xu(e.return, t, r);
  }
  function Wu(e, t, r, l, a) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: l, tail: r, tailMode: a } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = l, d.tail = r, d.tailMode = a);
  }
  function nd(e, t, r) {
    var l = t.pendingProps, a = l.revealOrder, d = l.tail;
    if (st(e, t, l.children, r), l = Be.current, (l & 2) !== 0) l = l & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && td(e, r, t);
        else if (e.tag === 19) td(e, r, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      l &= 1;
    }
    if ($e(Be, l), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (a) {
      case "forwards":
        for (r = t.child, a = null; r !== null; ) e = r.alternate, e !== null && ul(e) === null && (a = r), r = r.sibling;
        r = a, r === null ? (a = t.child, t.child = null) : (a = r.sibling, r.sibling = null), Wu(t, !1, a, r, d);
        break;
      case "backwards":
        for (r = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && ul(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = r, r = a, a = e;
        }
        Wu(t, !0, r, null, d);
        break;
      case "together":
        Wu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function gl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function dn(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), or |= t.lanes, (r & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, r = Fn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Fn(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function Bg(e, t, r) {
    switch (t.tag) {
      case 3:
        Zf(t), $r();
        break;
      case 5:
        gf(t);
        break;
      case 1:
        ct(t.type) && Zi(t);
        break;
      case 4:
        _u(t, t.stateNode.containerInfo);
        break;
      case 10:
        var l = t.type._context, a = t.memoizedProps.value;
        $e(ol, l._currentValue), l._currentValue = a;
        break;
      case 13:
        if (l = t.memoizedState, l !== null)
          return l.dehydrated !== null ? ($e(Be, Be.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? ed(e, t, r) : ($e(Be, Be.current & 1), e = dn(e, t, r), e !== null ? e.sibling : null);
        $e(Be, Be.current & 1);
        break;
      case 19:
        if (l = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (l) return nd(e, t, r);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), $e(Be, Be.current), l) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Kf(e, t, r);
    }
    return dn(e, t, r);
  }
  var rd, Yu, od, id;
  rd = function(e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Yu = function() {
  }, od = function(e, t, r, l) {
    var a = e.memoizedProps;
    if (a !== l) {
      e = t.stateNode, nr(Kt.current);
      var d = null;
      switch (r) {
        case "input":
          a = pe(e, a), l = pe(e, l), d = [];
          break;
        case "select":
          a = D({}, a, { value: void 0 }), l = D({}, l, { value: void 0 }), d = [];
          break;
        case "textarea":
          a = kt(e, a), l = kt(e, l), d = [];
          break;
        default:
          typeof a.onClick != "function" && typeof l.onClick == "function" && (e.onclick = Ki);
      }
      oo(r, l);
      var w;
      r = null;
      for (X in a) if (!l.hasOwnProperty(X) && a.hasOwnProperty(X) && a[X] != null) if (X === "style") {
        var T = a[X];
        for (w in T) T.hasOwnProperty(w) && (r || (r = {}), r[w] = "");
      } else X !== "dangerouslySetInnerHTML" && X !== "children" && X !== "suppressContentEditableWarning" && X !== "suppressHydrationWarning" && X !== "autoFocus" && (u.hasOwnProperty(X) ? d || (d = []) : (d = d || []).push(X, null));
      for (X in l) {
        var z = l[X];
        if (T = a != null ? a[X] : void 0, l.hasOwnProperty(X) && z !== T && (z != null || T != null)) if (X === "style") if (T) {
          for (w in T) !T.hasOwnProperty(w) || z && z.hasOwnProperty(w) || (r || (r = {}), r[w] = "");
          for (w in z) z.hasOwnProperty(w) && T[w] !== z[w] && (r || (r = {}), r[w] = z[w]);
        } else r || (d || (d = []), d.push(
          X,
          r
        )), r = z;
        else X === "dangerouslySetInnerHTML" ? (z = z ? z.__html : void 0, T = T ? T.__html : void 0, z != null && T !== z && (d = d || []).push(X, z)) : X === "children" ? typeof z != "string" && typeof z != "number" || (d = d || []).push(X, "" + z) : X !== "suppressContentEditableWarning" && X !== "suppressHydrationWarning" && (u.hasOwnProperty(X) ? (z != null && X === "onScroll" && Oe("scroll", e), d || T === z || (d = [])) : (d = d || []).push(X, z));
      }
      r && (d = d || []).push("style", r);
      var X = d;
      (t.updateQueue = X) && (t.flags |= 4);
    }
  }, id = function(e, t, r, l) {
    r !== l && (t.flags |= 4);
  };
  function Uo(e, t) {
    if (!He) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
        r === null ? e.tail = null : r.sibling = null;
        break;
      case "collapsed":
        r = e.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
    }
  }
  function ot(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (t) for (var a = e.child; a !== null; ) r |= a.lanes | a.childLanes, l |= a.subtreeFlags & 14680064, l |= a.flags & 14680064, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) r |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, t;
  }
  function Ug(e, t, r) {
    var l = t.pendingProps;
    switch (hu(t), t.tag) {
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
        return ot(t), null;
      case 1:
        return ct(t.type) && qi(), ot(t), null;
      case 3:
        return l = t.stateNode, Hr(), Fe(at), Fe(nt), Nu(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (nl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Dt !== null && (na(Dt), Dt = null))), Yu(e, t), ot(t), null;
      case 5:
        ku(t);
        var a = nr(Fo.current);
        if (r = t.type, e !== null && t.stateNode != null) od(e, t, r, l, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(i(166));
            return ot(t), null;
          }
          if (e = nr(Kt.current), nl(t)) {
            l = t.stateNode, r = t.type;
            var d = t.memoizedProps;
            switch (l[Qt] = t, l[Ro] = d, e = (t.mode & 1) !== 0, r) {
              case "dialog":
                Oe("cancel", l), Oe("close", l);
                break;
              case "iframe":
              case "object":
              case "embed":
                Oe("load", l);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Lo.length; a++) Oe(Lo[a], l);
                break;
              case "source":
                Oe("error", l);
                break;
              case "img":
              case "image":
              case "link":
                Oe(
                  "error",
                  l
                ), Oe("load", l);
                break;
              case "details":
                Oe("toggle", l);
                break;
              case "input":
                Ne(l, d), Oe("invalid", l);
                break;
              case "select":
                l._wrapperState = { wasMultiple: !!d.multiple }, Oe("invalid", l);
                break;
              case "textarea":
                At(l, d), Oe("invalid", l);
            }
            oo(r, d), a = null;
            for (var w in d) if (d.hasOwnProperty(w)) {
              var T = d[w];
              w === "children" ? typeof T == "string" ? l.textContent !== T && (d.suppressHydrationWarning !== !0 && Qi(l.textContent, T, e), a = ["children", T]) : typeof T == "number" && l.textContent !== "" + T && (d.suppressHydrationWarning !== !0 && Qi(
                l.textContent,
                T,
                e
              ), a = ["children", "" + T]) : u.hasOwnProperty(w) && T != null && w === "onScroll" && Oe("scroll", l);
            }
            switch (r) {
              case "input":
                Se(l), Re(l, d, !0);
                break;
              case "textarea":
                Se(l), Yt(l);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (l.onclick = Ki);
            }
            l = a, t.updateQueue = l, l !== null && (t.flags |= 4);
          } else {
            w = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = lt(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = w.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof l.is == "string" ? e = w.createElement(r, { is: l.is }) : (e = w.createElement(r), r === "select" && (w = e, l.multiple ? w.multiple = !0 : l.size && (w.size = l.size))) : e = w.createElementNS(e, r), e[Qt] = t, e[Ro] = l, rd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (w = io(r, l), r) {
                case "dialog":
                  Oe("cancel", e), Oe("close", e), a = l;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Oe("load", e), a = l;
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < Lo.length; a++) Oe(Lo[a], e);
                  a = l;
                  break;
                case "source":
                  Oe("error", e), a = l;
                  break;
                case "img":
                case "image":
                case "link":
                  Oe(
                    "error",
                    e
                  ), Oe("load", e), a = l;
                  break;
                case "details":
                  Oe("toggle", e), a = l;
                  break;
                case "input":
                  Ne(e, l), a = pe(e, l), Oe("invalid", e);
                  break;
                case "option":
                  a = l;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!l.multiple }, a = D({}, l, { value: void 0 }), Oe("invalid", e);
                  break;
                case "textarea":
                  At(e, l), a = kt(e, l), Oe("invalid", e);
                  break;
                default:
                  a = l;
              }
              oo(r, a), T = a;
              for (d in T) if (T.hasOwnProperty(d)) {
                var z = T[d];
                d === "style" ? Si(e, z) : d === "dangerouslySetInnerHTML" ? (z = z ? z.__html : void 0, z != null && wi(e, z)) : d === "children" ? typeof z == "string" ? (r !== "textarea" || z !== "") && on(e, z) : typeof z == "number" && on(e, "" + z) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (u.hasOwnProperty(d) ? z != null && d === "onScroll" && Oe("scroll", e) : z != null && S(e, d, z, w));
              }
              switch (r) {
                case "input":
                  Se(e), Re(e, l, !1);
                  break;
                case "textarea":
                  Se(e), Yt(e);
                  break;
                case "option":
                  l.value != null && e.setAttribute("value", "" + oe(l.value));
                  break;
                case "select":
                  e.multiple = !!l.multiple, d = l.value, d != null ? gt(e, !!l.multiple, d, !1) : l.defaultValue != null && gt(
                    e,
                    !!l.multiple,
                    l.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = Ki);
              }
              switch (r) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l = !!l.autoFocus;
                  break e;
                case "img":
                  l = !0;
                  break e;
                default:
                  l = !1;
              }
            }
            l && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return ot(t), null;
      case 6:
        if (e && t.stateNode != null) id(e, t, e.memoizedProps, l);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(i(166));
          if (r = nr(Fo.current), nr(Kt.current), nl(t)) {
            if (l = t.stateNode, r = t.memoizedProps, l[Qt] = t, (d = l.nodeValue !== r) && (e = wt, e !== null)) switch (e.tag) {
              case 3:
                Qi(l.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Qi(l.nodeValue, r, (e.mode & 1) !== 0);
            }
            d && (t.flags |= 4);
          } else l = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(l), l[Qt] = t, t.stateNode = l;
        }
        return ot(t), null;
      case 13:
        if (Fe(Be), l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (He && xt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) uf(), $r(), t.flags |= 98560, d = !1;
          else if (d = nl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = t.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Qt] = t;
            } else $r(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ot(t), d = !1;
          } else Dt !== null && (na(Dt), Dt = null), d = !0;
          if (!d) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (l = l !== null, l !== (e !== null && e.memoizedState !== null) && l && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Be.current & 1) !== 0 ? Ge === 0 && (Ge = 3) : ia())), t.updateQueue !== null && (t.flags |= 4), ot(t), null);
      case 4:
        return Hr(), Yu(e, t), e === null && zo(t.stateNode.containerInfo), ot(t), null;
      case 10:
        return wu(t.type._context), ot(t), null;
      case 17:
        return ct(t.type) && qi(), ot(t), null;
      case 19:
        if (Fe(Be), d = t.memoizedState, d === null) return ot(t), null;
        if (l = (t.flags & 128) !== 0, w = d.rendering, w === null) if (l) Uo(d, !1);
        else {
          if (Ge !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (w = ul(e), w !== null) {
              for (t.flags |= 128, Uo(d, !1), l = w.updateQueue, l !== null && (t.updateQueue = l, t.flags |= 4), t.subtreeFlags = 0, l = r, r = t.child; r !== null; ) d = r, e = l, d.flags &= 14680066, w = d.alternate, w === null ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = w.childLanes, d.lanes = w.lanes, d.child = w.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = w.memoizedProps, d.memoizedState = w.memoizedState, d.updateQueue = w.updateQueue, d.type = w.type, e = w.dependencies, d.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
              return $e(Be, Be.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          d.tail !== null && Ve() > Ur && (t.flags |= 128, l = !0, Uo(d, !1), t.lanes = 4194304);
        }
        else {
          if (!l) if (e = ul(w), e !== null) {
            if (t.flags |= 128, l = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Uo(d, !0), d.tail === null && d.tailMode === "hidden" && !w.alternate && !He) return ot(t), null;
          } else 2 * Ve() - d.renderingStartTime > Ur && r !== 1073741824 && (t.flags |= 128, l = !0, Uo(d, !1), t.lanes = 4194304);
          d.isBackwards ? (w.sibling = t.child, t.child = w) : (r = d.last, r !== null ? r.sibling = w : t.child = w, d.last = w);
        }
        return d.tail !== null ? (t = d.tail, d.rendering = t, d.tail = t.sibling, d.renderingStartTime = Ve(), t.sibling = null, r = Be.current, $e(Be, l ? r & 1 | 2 : r & 1), t) : (ot(t), null);
      case 22:
      case 23:
        return oa(), l = t.memoizedState !== null, e !== null && e.memoizedState !== null !== l && (t.flags |= 8192), l && (t.mode & 1) !== 0 ? (St & 1073741824) !== 0 && (ot(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ot(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Wg(e, t) {
    switch (hu(t), t.tag) {
      case 1:
        return ct(t.type) && qi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Hr(), Fe(at), Fe(nt), Nu(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ku(t), null;
      case 13:
        if (Fe(Be), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          $r();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Fe(Be), null;
      case 4:
        return Hr(), null;
      case 10:
        return wu(t.type._context), null;
      case 22:
      case 23:
        return oa(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var yl = !1, it = !1, Yg = typeof WeakSet == "function" ? WeakSet : Set, ye = null;
  function Vr(e, t) {
    var r = e.ref;
    if (r !== null) if (typeof r == "function") try {
      r(null);
    } catch (l) {
      Ye(e, t, l);
    }
    else r.current = null;
  }
  function Xu(e, t, r) {
    try {
      r();
    } catch (l) {
      Ye(e, t, l);
    }
  }
  var ld = !1;
  function Xg(e, t) {
    if (ou = Oi, e = Oc(), Gs(e)) {
      if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        r = (r = e.ownerDocument) && r.defaultView || window;
        var l = r.getSelection && r.getSelection();
        if (l && l.rangeCount !== 0) {
          r = l.anchorNode;
          var a = l.anchorOffset, d = l.focusNode;
          l = l.focusOffset;
          try {
            r.nodeType, d.nodeType;
          } catch {
            r = null;
            break e;
          }
          var w = 0, T = -1, z = -1, X = 0, re = 0, se = e, te = null;
          t: for (; ; ) {
            for (var ge; se !== r || a !== 0 && se.nodeType !== 3 || (T = w + a), se !== d || l !== 0 && se.nodeType !== 3 || (z = w + l), se.nodeType === 3 && (w += se.nodeValue.length), (ge = se.firstChild) !== null; )
              te = se, se = ge;
            for (; ; ) {
              if (se === e) break t;
              if (te === r && ++X === a && (T = w), te === d && ++re === l && (z = w), (ge = se.nextSibling) !== null) break;
              se = te, te = se.parentNode;
            }
            se = ge;
          }
          r = T === -1 || z === -1 ? null : { start: T, end: z };
        } else r = null;
      }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (iu = { focusedElem: e, selectionRange: r }, Oi = !1, ye = t; ye !== null; ) if (t = ye, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, ye = e;
    else for (; ye !== null; ) {
      t = ye;
      try {
        var ve = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ve !== null) {
              var we = ve.memoizedProps, Xe = ve.memoizedState, U = t.stateNode, A = U.getSnapshotBeforeUpdate(t.elementType === t.type ? we : Ot(t.type, we), Xe);
              U.__reactInternalSnapshotBeforeUpdate = A;
            }
            break;
          case 3:
            var Y = t.stateNode.containerInfo;
            Y.nodeType === 1 ? Y.textContent = "" : Y.nodeType === 9 && Y.documentElement && Y.removeChild(Y.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(i(163));
        }
      } catch (ue) {
        Ye(t, t.return, ue);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, ye = e;
        break;
      }
      ye = t.return;
    }
    return ve = ld, ld = !1, ve;
  }
  function Wo(e, t, r) {
    var l = t.updateQueue;
    if (l = l !== null ? l.lastEffect : null, l !== null) {
      var a = l = l.next;
      do {
        if ((a.tag & e) === e) {
          var d = a.destroy;
          a.destroy = void 0, d !== void 0 && Xu(t, r, d);
        }
        a = a.next;
      } while (a !== l);
    }
  }
  function vl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var r = t = t.next;
      do {
        if ((r.tag & e) === e) {
          var l = r.create;
          r.destroy = l();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function bu(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      switch (e.tag) {
        case 5:
          e = r;
          break;
        default:
          e = r;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function sd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qt], delete t[Ro], delete t[au], delete t[Pg], delete t[Tg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ud(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ad(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ud(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qu(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Ki));
    else if (l !== 4 && (e = e.child, e !== null)) for (Qu(e, t, r), e = e.sibling; e !== null; ) Qu(e, t, r), e = e.sibling;
  }
  function Ku(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (l !== 4 && (e = e.child, e !== null)) for (Ku(e, t, r), e = e.sibling; e !== null; ) Ku(e, t, r), e = e.sibling;
  }
  var et = null, Ft = !1;
  function Rn(e, t, r) {
    for (r = r.child; r !== null; ) cd(e, t, r), r = r.sibling;
  }
  function cd(e, t, r) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(Kn, r);
    } catch {
    }
    switch (r.tag) {
      case 5:
        it || Vr(r, t);
      case 6:
        var l = et, a = Ft;
        et = null, Rn(e, t, r), et = l, Ft = a, et !== null && (Ft ? (e = et, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : et.removeChild(r.stateNode));
        break;
      case 18:
        et !== null && (Ft ? (e = et, r = r.stateNode, e.nodeType === 8 ? uu(e.parentNode, r) : e.nodeType === 1 && uu(e, r), Eo(e)) : uu(et, r.stateNode));
        break;
      case 4:
        l = et, a = Ft, et = r.stateNode.containerInfo, Ft = !0, Rn(e, t, r), et = l, Ft = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!it && (l = r.updateQueue, l !== null && (l = l.lastEffect, l !== null))) {
          a = l = l.next;
          do {
            var d = a, w = d.destroy;
            d = d.tag, w !== void 0 && ((d & 2) !== 0 || (d & 4) !== 0) && Xu(r, t, w), a = a.next;
          } while (a !== l);
        }
        Rn(e, t, r);
        break;
      case 1:
        if (!it && (Vr(r, t), l = r.stateNode, typeof l.componentWillUnmount == "function")) try {
          l.props = r.memoizedProps, l.state = r.memoizedState, l.componentWillUnmount();
        } catch (T) {
          Ye(r, t, T);
        }
        Rn(e, t, r);
        break;
      case 21:
        Rn(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (it = (l = it) || r.memoizedState !== null, Rn(e, t, r), it = l) : Rn(e, t, r);
        break;
      default:
        Rn(e, t, r);
    }
  }
  function fd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new Yg()), t.forEach(function(l) {
        var a = t0.bind(null, e, l);
        r.has(l) || (r.add(l), l.then(a, a));
      });
    }
  }
  function Ht(e, t) {
    var r = t.deletions;
    if (r !== null) for (var l = 0; l < r.length; l++) {
      var a = r[l];
      try {
        var d = e, w = t, T = w;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              et = T.stateNode, Ft = !1;
              break e;
            case 3:
              et = T.stateNode.containerInfo, Ft = !0;
              break e;
            case 4:
              et = T.stateNode.containerInfo, Ft = !0;
              break e;
          }
          T = T.return;
        }
        if (et === null) throw Error(i(160));
        cd(d, w, a), et = null, Ft = !1;
        var z = a.alternate;
        z !== null && (z.return = null), a.return = null;
      } catch (X) {
        Ye(a, t, X);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dd(t, e), t = t.sibling;
  }
  function dd(e, t) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ht(t, e), qt(e), l & 4) {
          try {
            Wo(3, e, e.return), vl(3, e);
          } catch (we) {
            Ye(e, e.return, we);
          }
          try {
            Wo(5, e, e.return);
          } catch (we) {
            Ye(e, e.return, we);
          }
        }
        break;
      case 1:
        Ht(t, e), qt(e), l & 512 && r !== null && Vr(r, r.return);
        break;
      case 5:
        if (Ht(t, e), qt(e), l & 512 && r !== null && Vr(r, r.return), e.flags & 32) {
          var a = e.stateNode;
          try {
            on(a, "");
          } catch (we) {
            Ye(e, e.return, we);
          }
        }
        if (l & 4 && (a = e.stateNode, a != null)) {
          var d = e.memoizedProps, w = r !== null ? r.memoizedProps : d, T = e.type, z = e.updateQueue;
          if (e.updateQueue = null, z !== null) try {
            T === "input" && d.type === "radio" && d.name != null && Pe(a, d), io(T, w);
            var X = io(T, d);
            for (w = 0; w < z.length; w += 2) {
              var re = z[w], se = z[w + 1];
              re === "style" ? Si(a, se) : re === "dangerouslySetInnerHTML" ? wi(a, se) : re === "children" ? on(a, se) : S(a, re, se, X);
            }
            switch (T) {
              case "input":
                Ae(a, d);
                break;
              case "textarea":
                rn(a, d);
                break;
              case "select":
                var te = a._wrapperState.wasMultiple;
                a._wrapperState.wasMultiple = !!d.multiple;
                var ge = d.value;
                ge != null ? gt(a, !!d.multiple, ge, !1) : te !== !!d.multiple && (d.defaultValue != null ? gt(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : gt(a, !!d.multiple, d.multiple ? [] : "", !1));
            }
            a[Ro] = d;
          } catch (we) {
            Ye(e, e.return, we);
          }
        }
        break;
      case 6:
        if (Ht(t, e), qt(e), l & 4) {
          if (e.stateNode === null) throw Error(i(162));
          a = e.stateNode, d = e.memoizedProps;
          try {
            a.nodeValue = d;
          } catch (we) {
            Ye(e, e.return, we);
          }
        }
        break;
      case 3:
        if (Ht(t, e), qt(e), l & 4 && r !== null && r.memoizedState.isDehydrated) try {
          Eo(t.containerInfo);
        } catch (we) {
          Ye(e, e.return, we);
        }
        break;
      case 4:
        Ht(t, e), qt(e);
        break;
      case 13:
        Ht(t, e), qt(e), a = e.child, a.flags & 8192 && (d = a.memoizedState !== null, a.stateNode.isHidden = d, !d || a.alternate !== null && a.alternate.memoizedState !== null || (Zu = Ve())), l & 4 && fd(e);
        break;
      case 22:
        if (re = r !== null && r.memoizedState !== null, e.mode & 1 ? (it = (X = it) || re, Ht(t, e), it = X) : Ht(t, e), qt(e), l & 8192) {
          if (X = e.memoizedState !== null, (e.stateNode.isHidden = X) && !re && (e.mode & 1) !== 0) for (ye = e, re = e.child; re !== null; ) {
            for (se = ye = re; ye !== null; ) {
              switch (te = ye, ge = te.child, te.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Wo(4, te, te.return);
                  break;
                case 1:
                  Vr(te, te.return);
                  var ve = te.stateNode;
                  if (typeof ve.componentWillUnmount == "function") {
                    l = te, r = te.return;
                    try {
                      t = l, ve.props = t.memoizedProps, ve.state = t.memoizedState, ve.componentWillUnmount();
                    } catch (we) {
                      Ye(l, r, we);
                    }
                  }
                  break;
                case 5:
                  Vr(te, te.return);
                  break;
                case 22:
                  if (te.memoizedState !== null) {
                    md(se);
                    continue;
                  }
              }
              ge !== null ? (ge.return = te, ye = ge) : md(se);
            }
            re = re.sibling;
          }
          e: for (re = null, se = e; ; ) {
            if (se.tag === 5) {
              if (re === null) {
                re = se;
                try {
                  a = se.stateNode, X ? (d = a.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (T = se.stateNode, z = se.memoizedProps.style, w = z != null && z.hasOwnProperty("display") ? z.display : null, T.style.display = xi("display", w));
                } catch (we) {
                  Ye(e, e.return, we);
                }
              }
            } else if (se.tag === 6) {
              if (re === null) try {
                se.stateNode.nodeValue = X ? "" : se.memoizedProps;
              } catch (we) {
                Ye(e, e.return, we);
              }
            } else if ((se.tag !== 22 && se.tag !== 23 || se.memoizedState === null || se === e) && se.child !== null) {
              se.child.return = se, se = se.child;
              continue;
            }
            if (se === e) break e;
            for (; se.sibling === null; ) {
              if (se.return === null || se.return === e) break e;
              re === se && (re = null), se = se.return;
            }
            re === se && (re = null), se.sibling.return = se.return, se = se.sibling;
          }
        }
        break;
      case 19:
        Ht(t, e), qt(e), l & 4 && fd(e);
        break;
      case 21:
        break;
      default:
        Ht(
          t,
          e
        ), qt(e);
    }
  }
  function qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (ud(r)) {
              var l = r;
              break e;
            }
            r = r.return;
          }
          throw Error(i(160));
        }
        switch (l.tag) {
          case 5:
            var a = l.stateNode;
            l.flags & 32 && (on(a, ""), l.flags &= -33);
            var d = ad(e);
            Ku(e, d, a);
            break;
          case 3:
          case 4:
            var w = l.stateNode.containerInfo, T = ad(e);
            Qu(e, T, w);
            break;
          default:
            throw Error(i(161));
        }
      } catch (z) {
        Ye(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function bg(e, t, r) {
    ye = e, hd(e);
  }
  function hd(e, t, r) {
    for (var l = (e.mode & 1) !== 0; ye !== null; ) {
      var a = ye, d = a.child;
      if (a.tag === 22 && l) {
        var w = a.memoizedState !== null || yl;
        if (!w) {
          var T = a.alternate, z = T !== null && T.memoizedState !== null || it;
          T = yl;
          var X = it;
          if (yl = w, (it = z) && !X) for (ye = a; ye !== null; ) w = ye, z = w.child, w.tag === 22 && w.memoizedState !== null ? gd(a) : z !== null ? (z.return = w, ye = z) : gd(a);
          for (; d !== null; ) ye = d, hd(d), d = d.sibling;
          ye = a, yl = T, it = X;
        }
        pd(e);
      } else (a.subtreeFlags & 8772) !== 0 && d !== null ? (d.return = a, ye = d) : pd(e);
    }
  }
  function pd(e) {
    for (; ye !== null; ) {
      var t = ye;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              it || vl(5, t);
              break;
            case 1:
              var l = t.stateNode;
              if (t.flags & 4 && !it) if (r === null) l.componentDidMount();
              else {
                var a = t.elementType === t.type ? r.memoizedProps : Ot(t.type, r.memoizedProps);
                l.componentDidUpdate(a, r.memoizedState, l.__reactInternalSnapshotBeforeUpdate);
              }
              var d = t.updateQueue;
              d !== null && mf(t, d, l);
              break;
            case 3:
              var w = t.updateQueue;
              if (w !== null) {
                if (r = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    r = t.child.stateNode;
                    break;
                  case 1:
                    r = t.child.stateNode;
                }
                mf(t, w, r);
              }
              break;
            case 5:
              var T = t.stateNode;
              if (r === null && t.flags & 4) {
                r = T;
                var z = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    z.autoFocus && r.focus();
                    break;
                  case "img":
                    z.src && (r.src = z.src);
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
              if (t.memoizedState === null) {
                var X = t.alternate;
                if (X !== null) {
                  var re = X.memoizedState;
                  if (re !== null) {
                    var se = re.dehydrated;
                    se !== null && Eo(se);
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
          it || t.flags & 512 && bu(t);
        } catch (te) {
          Ye(t, t.return, te);
        }
      }
      if (t === e) {
        ye = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, ye = r;
        break;
      }
      ye = t.return;
    }
  }
  function md(e) {
    for (; ye !== null; ) {
      var t = ye;
      if (t === e) {
        ye = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, ye = r;
        break;
      }
      ye = t.return;
    }
  }
  function gd(e) {
    for (; ye !== null; ) {
      var t = ye;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              vl(4, t);
            } catch (z) {
              Ye(t, r, z);
            }
            break;
          case 1:
            var l = t.stateNode;
            if (typeof l.componentDidMount == "function") {
              var a = t.return;
              try {
                l.componentDidMount();
              } catch (z) {
                Ye(t, a, z);
              }
            }
            var d = t.return;
            try {
              bu(t);
            } catch (z) {
              Ye(t, d, z);
            }
            break;
          case 5:
            var w = t.return;
            try {
              bu(t);
            } catch (z) {
              Ye(t, w, z);
            }
        }
      } catch (z) {
        Ye(t, t.return, z);
      }
      if (t === e) {
        ye = null;
        break;
      }
      var T = t.sibling;
      if (T !== null) {
        T.return = t.return, ye = T;
        break;
      }
      ye = t.return;
    }
  }
  var Qg = Math.ceil, wl = M.ReactCurrentDispatcher, Gu = M.ReactCurrentOwner, zt = M.ReactCurrentBatchConfig, Le = 0, Ze = null, be = null, tt = 0, St = 0, Br = Pn(0), Ge = 0, Yo = null, or = 0, xl = 0, qu = 0, Xo = null, dt = null, Zu = 0, Ur = 1 / 0, hn = null, Sl = !1, Ju = null, An = null, El = !1, $n = null, _l = 0, bo = 0, ea = null, kl = -1, Cl = 0;
  function ut() {
    return (Le & 6) !== 0 ? Ve() : kl !== -1 ? kl : kl = Ve();
  }
  function Dn(e) {
    return (e.mode & 1) === 0 ? 1 : (Le & 2) !== 0 && tt !== 0 ? tt & -tt : zg.transition !== null ? (Cl === 0 && (Cl = Ai()), Cl) : (e = Ie, e !== 0 || (e = window.event, e = e === void 0 ? 16 : yc(e.type)), e);
  }
  function jt(e, t, r, l) {
    if (50 < bo) throw bo = 0, ea = null, Error(i(185));
    xn(e, r, l), ((Le & 2) === 0 || e !== Ze) && (e === Ze && ((Le & 2) === 0 && (xl |= r), Ge === 4 && On(e, tt)), ht(e, l), r === 1 && Le === 0 && (t.mode & 1) === 0 && (Ur = Ve() + 500, Ji && Ln()));
  }
  function ht(e, t) {
    var r = e.callbackNode;
    $s(e, t);
    var l = Er(e, e === Ze ? tt : 0);
    if (l === 0) r !== null && Li(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = l & -l, e.callbackPriority !== t) {
      if (r != null && Li(r), t === 1) e.tag === 0 ? Lg(vd.bind(null, e)) : nf(vd.bind(null, e)), Ng(function() {
        (Le & 6) === 0 && Ln();
      }), r = null;
      else {
        switch (ac(l)) {
          case 1:
            r = go;
            break;
          case 4:
            r = Ii;
            break;
          case 16:
            r = wr;
            break;
          case 536870912:
            r = Ri;
            break;
          default:
            r = wr;
        }
        r = Nd(r, yd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function yd(e, t) {
    if (kl = -1, Cl = 0, (Le & 6) !== 0) throw Error(i(327));
    var r = e.callbackNode;
    if (Wr() && e.callbackNode !== r) return null;
    var l = Er(e, e === Ze ? tt : 0);
    if (l === 0) return null;
    if ((l & 30) !== 0 || (l & e.expiredLanes) !== 0 || t) t = Nl(e, l);
    else {
      t = l;
      var a = Le;
      Le |= 2;
      var d = xd();
      (Ze !== e || tt !== t) && (hn = null, Ur = Ve() + 500, lr(e, t));
      do
        try {
          qg();
          break;
        } catch (T) {
          wd(e, T);
        }
      while (!0);
      vu(), wl.current = d, Le = a, be !== null ? t = 0 : (Ze = null, tt = 0, t = Ge);
    }
    if (t !== 0) {
      if (t === 2 && (a = Gn(e), a !== 0 && (l = a, t = ta(e, a))), t === 1) throw r = Yo, lr(e, 0), On(e, l), ht(e, Ve()), r;
      if (t === 6) On(e, l);
      else {
        if (a = e.current.alternate, (l & 30) === 0 && !Kg(a) && (t = Nl(e, l), t === 2 && (d = Gn(e), d !== 0 && (l = d, t = ta(e, d))), t === 1)) throw r = Yo, lr(e, 0), On(e, l), ht(e, Ve()), r;
        switch (e.finishedWork = a, e.finishedLanes = l, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            sr(e, dt, hn);
            break;
          case 3:
            if (On(e, l), (l & 130023424) === l && (t = Zu + 500 - Ve(), 10 < t)) {
              if (Er(e, 0) !== 0) break;
              if (a = e.suspendedLanes, (a & l) !== l) {
                ut(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = su(sr.bind(null, e, dt, hn), t);
              break;
            }
            sr(e, dt, hn);
            break;
          case 4:
            if (On(e, l), (l & 4194240) === l) break;
            for (t = e.eventTimes, a = -1; 0 < l; ) {
              var w = 31 - yt(l);
              d = 1 << w, w = t[w], w > a && (a = w), l &= ~d;
            }
            if (l = a, l = Ve() - l, l = (120 > l ? 120 : 480 > l ? 480 : 1080 > l ? 1080 : 1920 > l ? 1920 : 3e3 > l ? 3e3 : 4320 > l ? 4320 : 1960 * Qg(l / 1960)) - l, 10 < l) {
              e.timeoutHandle = su(sr.bind(null, e, dt, hn), l);
              break;
            }
            sr(e, dt, hn);
            break;
          case 5:
            sr(e, dt, hn);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return ht(e, Ve()), e.callbackNode === r ? yd.bind(null, e) : null;
  }
  function ta(e, t) {
    var r = Xo;
    return e.current.memoizedState.isDehydrated && (lr(e, t).flags |= 256), e = Nl(e, t), e !== 2 && (t = dt, dt = r, t !== null && na(t)), e;
  }
  function na(e) {
    dt === null ? dt = e : dt.push.apply(dt, e);
  }
  function Kg(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null)) for (var l = 0; l < r.length; l++) {
          var a = r[l], d = a.getSnapshot;
          a = a.value;
          try {
            if (!$t(d(), a)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function On(e, t) {
    for (t &= ~qu, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - yt(t), l = 1 << r;
      e[r] = -1, t &= ~l;
    }
  }
  function vd(e) {
    if ((Le & 6) !== 0) throw Error(i(327));
    Wr();
    var t = Er(e, 0);
    if ((t & 1) === 0) return ht(e, Ve()), null;
    var r = Nl(e, t);
    if (e.tag !== 0 && r === 2) {
      var l = Gn(e);
      l !== 0 && (t = l, r = ta(e, l));
    }
    if (r === 1) throw r = Yo, lr(e, 0), On(e, t), ht(e, Ve()), r;
    if (r === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, sr(e, dt, hn), ht(e, Ve()), null;
  }
  function ra(e, t) {
    var r = Le;
    Le |= 1;
    try {
      return e(t);
    } finally {
      Le = r, Le === 0 && (Ur = Ve() + 500, Ji && Ln());
    }
  }
  function ir(e) {
    $n !== null && $n.tag === 0 && (Le & 6) === 0 && Wr();
    var t = Le;
    Le |= 1;
    var r = zt.transition, l = Ie;
    try {
      if (zt.transition = null, Ie = 1, e) return e();
    } finally {
      Ie = l, zt.transition = r, Le = t, (Le & 6) === 0 && Ln();
    }
  }
  function oa() {
    St = Br.current, Fe(Br);
  }
  function lr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, Cg(r)), be !== null) for (r = be.return; r !== null; ) {
      var l = r;
      switch (hu(l), l.tag) {
        case 1:
          l = l.type.childContextTypes, l != null && qi();
          break;
        case 3:
          Hr(), Fe(at), Fe(nt), Nu();
          break;
        case 5:
          ku(l);
          break;
        case 4:
          Hr();
          break;
        case 13:
          Fe(Be);
          break;
        case 19:
          Fe(Be);
          break;
        case 10:
          wu(l.type._context);
          break;
        case 22:
        case 23:
          oa();
      }
      r = r.return;
    }
    if (Ze = e, be = e = Fn(e.current, null), tt = St = t, Ge = 0, Yo = null, qu = xl = or = 0, dt = Xo = null, tr !== null) {
      for (t = 0; t < tr.length; t++) if (r = tr[t], l = r.interleaved, l !== null) {
        r.interleaved = null;
        var a = l.next, d = r.pending;
        if (d !== null) {
          var w = d.next;
          d.next = a, l.next = w;
        }
        r.pending = l;
      }
      tr = null;
    }
    return e;
  }
  function wd(e, t) {
    do {
      var r = be;
      try {
        if (vu(), al.current = hl, cl) {
          for (var l = Ue.memoizedState; l !== null; ) {
            var a = l.queue;
            a !== null && (a.pending = null), l = l.next;
          }
          cl = !1;
        }
        if (rr = 0, qe = Ke = Ue = null, Ho = !1, jo = 0, Gu.current = null, r === null || r.return === null) {
          Ge = 1, Yo = t, be = null;
          break;
        }
        e: {
          var d = e, w = r.return, T = r, z = t;
          if (t = tt, T.flags |= 32768, z !== null && typeof z == "object" && typeof z.then == "function") {
            var X = z, re = T, se = re.tag;
            if ((re.mode & 1) === 0 && (se === 0 || se === 11 || se === 15)) {
              var te = re.alternate;
              te ? (re.updateQueue = te.updateQueue, re.memoizedState = te.memoizedState, re.lanes = te.lanes) : (re.updateQueue = null, re.memoizedState = null);
            }
            var ge = Wf(w);
            if (ge !== null) {
              ge.flags &= -257, Yf(ge, w, T, d, t), ge.mode & 1 && Uf(d, X, t), t = ge, z = X;
              var ve = t.updateQueue;
              if (ve === null) {
                var we = /* @__PURE__ */ new Set();
                we.add(z), t.updateQueue = we;
              } else ve.add(z);
              break e;
            } else {
              if ((t & 1) === 0) {
                Uf(d, X, t), ia();
                break e;
              }
              z = Error(i(426));
            }
          } else if (He && T.mode & 1) {
            var Xe = Wf(w);
            if (Xe !== null) {
              (Xe.flags & 65536) === 0 && (Xe.flags |= 256), Yf(Xe, w, T, d, t), gu(jr(z, T));
              break e;
            }
          }
          d = z = jr(z, T), Ge !== 4 && (Ge = 2), Xo === null ? Xo = [d] : Xo.push(d), d = w;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, t &= -t, d.lanes |= t;
                var U = Vf(d, z, t);
                pf(d, U);
                break e;
              case 1:
                T = z;
                var A = d.type, Y = d.stateNode;
                if ((d.flags & 128) === 0 && (typeof A.getDerivedStateFromError == "function" || Y !== null && typeof Y.componentDidCatch == "function" && (An === null || !An.has(Y)))) {
                  d.flags |= 65536, t &= -t, d.lanes |= t;
                  var ue = Bf(d, T, t);
                  pf(d, ue);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Ed(r);
      } catch (xe) {
        t = xe, be === r && r !== null && (be = r = r.return);
        continue;
      }
      break;
    } while (!0);
  }
  function xd() {
    var e = wl.current;
    return wl.current = hl, e === null ? hl : e;
  }
  function ia() {
    (Ge === 0 || Ge === 3 || Ge === 2) && (Ge = 4), Ze === null || (or & 268435455) === 0 && (xl & 268435455) === 0 || On(Ze, tt);
  }
  function Nl(e, t) {
    var r = Le;
    Le |= 2;
    var l = xd();
    (Ze !== e || tt !== t) && (hn = null, lr(e, t));
    do
      try {
        Gg();
        break;
      } catch (a) {
        wd(e, a);
      }
    while (!0);
    if (vu(), Le = r, wl.current = l, be !== null) throw Error(i(261));
    return Ze = null, tt = 0, Ge;
  }
  function Gg() {
    for (; be !== null; ) Sd(be);
  }
  function qg() {
    for (; be !== null && !Ms(); ) Sd(be);
  }
  function Sd(e) {
    var t = Cd(e.alternate, e, St);
    e.memoizedProps = e.pendingProps, t === null ? Ed(e) : be = t, Gu.current = null;
  }
  function Ed(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (r = Ug(r, t, St), r !== null) {
          be = r;
          return;
        }
      } else {
        if (r = Wg(r, t), r !== null) {
          r.flags &= 32767, be = r;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Ge = 6, be = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        be = t;
        return;
      }
      be = t = e;
    } while (t !== null);
    Ge === 0 && (Ge = 5);
  }
  function sr(e, t, r) {
    var l = Ie, a = zt.transition;
    try {
      zt.transition = null, Ie = 1, Zg(e, t, r, l);
    } finally {
      zt.transition = a, Ie = l;
    }
    return null;
  }
  function Zg(e, t, r, l) {
    do
      Wr();
    while ($n !== null);
    if ((Le & 6) !== 0) throw Error(i(327));
    r = e.finishedWork;
    var a = e.finishedLanes;
    if (r === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var d = r.lanes | r.childLanes;
    if (Im(e, d), e === Ze && (be = Ze = null, tt = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || El || (El = !0, Nd(wr, function() {
      return Wr(), null;
    })), d = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || d) {
      d = zt.transition, zt.transition = null;
      var w = Ie;
      Ie = 1;
      var T = Le;
      Le |= 4, Gu.current = null, Xg(e, r), dd(r, e), vg(iu), Oi = !!ou, iu = ou = null, e.current = r, bg(r), zi(), Le = T, Ie = w, zt.transition = d;
    } else e.current = r;
    if (El && (El = !1, $n = e, _l = a), d = e.pendingLanes, d === 0 && (An = null), Ls(r.stateNode), ht(e, Ve()), t !== null) for (l = e.onRecoverableError, r = 0; r < t.length; r++) a = t[r], l(a.value, { componentStack: a.stack, digest: a.digest });
    if (Sl) throw Sl = !1, e = Ju, Ju = null, e;
    return (_l & 1) !== 0 && e.tag !== 0 && Wr(), d = e.pendingLanes, (d & 1) !== 0 ? e === ea ? bo++ : (bo = 0, ea = e) : bo = 0, Ln(), null;
  }
  function Wr() {
    if ($n !== null) {
      var e = ac(_l), t = zt.transition, r = Ie;
      try {
        if (zt.transition = null, Ie = 16 > e ? 16 : e, $n === null) var l = !1;
        else {
          if (e = $n, $n = null, _l = 0, (Le & 6) !== 0) throw Error(i(331));
          var a = Le;
          for (Le |= 4, ye = e.current; ye !== null; ) {
            var d = ye, w = d.child;
            if ((ye.flags & 16) !== 0) {
              var T = d.deletions;
              if (T !== null) {
                for (var z = 0; z < T.length; z++) {
                  var X = T[z];
                  for (ye = X; ye !== null; ) {
                    var re = ye;
                    switch (re.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Wo(8, re, d);
                    }
                    var se = re.child;
                    if (se !== null) se.return = re, ye = se;
                    else for (; ye !== null; ) {
                      re = ye;
                      var te = re.sibling, ge = re.return;
                      if (sd(re), re === X) {
                        ye = null;
                        break;
                      }
                      if (te !== null) {
                        te.return = ge, ye = te;
                        break;
                      }
                      ye = ge;
                    }
                  }
                }
                var ve = d.alternate;
                if (ve !== null) {
                  var we = ve.child;
                  if (we !== null) {
                    ve.child = null;
                    do {
                      var Xe = we.sibling;
                      we.sibling = null, we = Xe;
                    } while (we !== null);
                  }
                }
                ye = d;
              }
            }
            if ((d.subtreeFlags & 2064) !== 0 && w !== null) w.return = d, ye = w;
            else e: for (; ye !== null; ) {
              if (d = ye, (d.flags & 2048) !== 0) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Wo(9, d, d.return);
              }
              var U = d.sibling;
              if (U !== null) {
                U.return = d.return, ye = U;
                break e;
              }
              ye = d.return;
            }
          }
          var A = e.current;
          for (ye = A; ye !== null; ) {
            w = ye;
            var Y = w.child;
            if ((w.subtreeFlags & 2064) !== 0 && Y !== null) Y.return = w, ye = Y;
            else e: for (w = A; ye !== null; ) {
              if (T = ye, (T.flags & 2048) !== 0) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    vl(9, T);
                }
              } catch (xe) {
                Ye(T, T.return, xe);
              }
              if (T === w) {
                ye = null;
                break e;
              }
              var ue = T.sibling;
              if (ue !== null) {
                ue.return = T.return, ye = ue;
                break e;
              }
              ye = T.return;
            }
          }
          if (Le = a, Ln(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(Kn, e);
          } catch {
          }
          l = !0;
        }
        return l;
      } finally {
        Ie = r, zt.transition = t;
      }
    }
    return !1;
  }
  function _d(e, t, r) {
    t = jr(r, t), t = Vf(e, t, 1), e = In(e, t, 1), t = ut(), e !== null && (xn(e, 1, t), ht(e, t));
  }
  function Ye(e, t, r) {
    if (e.tag === 3) _d(e, e, r);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        _d(t, e, r);
        break;
      } else if (t.tag === 1) {
        var l = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (An === null || !An.has(l))) {
          e = jr(r, e), e = Bf(t, e, 1), t = In(t, e, 1), e = ut(), t !== null && (xn(t, 1, e), ht(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Jg(e, t, r) {
    var l = e.pingCache;
    l !== null && l.delete(t), t = ut(), e.pingedLanes |= e.suspendedLanes & r, Ze === e && (tt & r) === r && (Ge === 4 || Ge === 3 && (tt & 130023424) === tt && 500 > Ve() - Zu ? lr(e, 0) : qu |= r), ht(e, t);
  }
  function kd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Sr, Sr <<= 1, (Sr & 130023424) === 0 && (Sr = 4194304)));
    var r = ut();
    e = cn(e, t), e !== null && (xn(e, t, r), ht(e, r));
  }
  function e0(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), kd(e, r);
  }
  function t0(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode, a = e.memoizedState;
        a !== null && (r = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    l !== null && l.delete(t), kd(e, r);
  }
  var Cd;
  Cd = function(e, t, r) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || at.current) ft = !0;
    else {
      if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return ft = !1, Bg(e, t, r);
      ft = (e.flags & 131072) !== 0;
    }
    else ft = !1, He && (t.flags & 1048576) !== 0 && rf(t, tl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var l = t.type;
        gl(e, t), e = t.pendingProps;
        var a = Ir(t, nt.current);
        Fr(t, r), a = Tu(null, t, l, e, a, r);
        var d = Lu();
        return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ct(l) ? (d = !0, Zi(t)) : d = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Eu(t), a.updater = pl, t.stateNode = a, a._reactInternals = t, Du(t, l, e, r), t = ju(null, t, l, !0, d, r)) : (t.tag = 0, He && d && du(t), st(null, t, a, r), t = t.child), t;
      case 16:
        l = t.elementType;
        e: {
          switch (gl(e, t), e = t.pendingProps, a = l._init, l = a(l._payload), t.type = l, a = t.tag = r0(l), e = Ot(l, e), a) {
            case 0:
              t = Hu(null, t, l, e, r);
              break e;
            case 1:
              t = qf(null, t, l, e, r);
              break e;
            case 11:
              t = Xf(null, t, l, e, r);
              break e;
            case 14:
              t = bf(null, t, l, Ot(l.type, e), r);
              break e;
          }
          throw Error(i(
            306,
            l,
            ""
          ));
        }
        return t;
      case 0:
        return l = t.type, a = t.pendingProps, a = t.elementType === l ? a : Ot(l, a), Hu(e, t, l, a, r);
      case 1:
        return l = t.type, a = t.pendingProps, a = t.elementType === l ? a : Ot(l, a), qf(e, t, l, a, r);
      case 3:
        e: {
          if (Zf(t), e === null) throw Error(i(387));
          l = t.pendingProps, d = t.memoizedState, a = d.element, hf(e, t), sl(t, l, null, r);
          var w = t.memoizedState;
          if (l = w.element, d.isDehydrated) if (d = { element: l, isDehydrated: !1, cache: w.cache, pendingSuspenseBoundaries: w.pendingSuspenseBoundaries, transitions: w.transitions }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
            a = jr(Error(i(423)), t), t = Jf(e, t, l, r, a);
            break e;
          } else if (l !== a) {
            a = jr(Error(i(424)), t), t = Jf(e, t, l, r, a);
            break e;
          } else for (xt = Mn(t.stateNode.containerInfo.firstChild), wt = t, He = !0, Dt = null, r = ff(t, null, l, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if ($r(), l === a) {
              t = dn(e, t, r);
              break e;
            }
            st(e, t, l, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return gf(t), e === null && mu(t), l = t.type, a = t.pendingProps, d = e !== null ? e.memoizedProps : null, w = a.children, lu(l, a) ? w = null : d !== null && lu(l, d) && (t.flags |= 32), Gf(e, t), st(e, t, w, r), t.child;
      case 6:
        return e === null && mu(t), null;
      case 13:
        return ed(e, t, r);
      case 4:
        return _u(t, t.stateNode.containerInfo), l = t.pendingProps, e === null ? t.child = Dr(t, null, l, r) : st(e, t, l, r), t.child;
      case 11:
        return l = t.type, a = t.pendingProps, a = t.elementType === l ? a : Ot(l, a), Xf(e, t, l, a, r);
      case 7:
        return st(e, t, t.pendingProps, r), t.child;
      case 8:
        return st(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return st(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (l = t.type._context, a = t.pendingProps, d = t.memoizedProps, w = a.value, $e(ol, l._currentValue), l._currentValue = w, d !== null) if ($t(d.value, w)) {
            if (d.children === a.children && !at.current) {
              t = dn(e, t, r);
              break e;
            }
          } else for (d = t.child, d !== null && (d.return = t); d !== null; ) {
            var T = d.dependencies;
            if (T !== null) {
              w = d.child;
              for (var z = T.firstContext; z !== null; ) {
                if (z.context === l) {
                  if (d.tag === 1) {
                    z = fn(-1, r & -r), z.tag = 2;
                    var X = d.updateQueue;
                    if (X !== null) {
                      X = X.shared;
                      var re = X.pending;
                      re === null ? z.next = z : (z.next = re.next, re.next = z), X.pending = z;
                    }
                  }
                  d.lanes |= r, z = d.alternate, z !== null && (z.lanes |= r), xu(
                    d.return,
                    r,
                    t
                  ), T.lanes |= r;
                  break;
                }
                z = z.next;
              }
            } else if (d.tag === 10) w = d.type === t.type ? null : d.child;
            else if (d.tag === 18) {
              if (w = d.return, w === null) throw Error(i(341));
              w.lanes |= r, T = w.alternate, T !== null && (T.lanes |= r), xu(w, r, t), w = d.sibling;
            } else w = d.child;
            if (w !== null) w.return = d;
            else for (w = d; w !== null; ) {
              if (w === t) {
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
          st(e, t, a.children, r), t = t.child;
        }
        return t;
      case 9:
        return a = t.type, l = t.pendingProps.children, Fr(t, r), a = Tt(a), l = l(a), t.flags |= 1, st(e, t, l, r), t.child;
      case 14:
        return l = t.type, a = Ot(l, t.pendingProps), a = Ot(l.type, a), bf(e, t, l, a, r);
      case 15:
        return Qf(e, t, t.type, t.pendingProps, r);
      case 17:
        return l = t.type, a = t.pendingProps, a = t.elementType === l ? a : Ot(l, a), gl(e, t), t.tag = 1, ct(l) ? (e = !0, Zi(t)) : e = !1, Fr(t, r), Hf(t, l, a), Du(t, l, a, r), ju(null, t, l, !0, e, r);
      case 19:
        return nd(e, t, r);
      case 22:
        return Kf(e, t, r);
    }
    throw Error(i(156, t.tag));
  };
  function Nd(e, t) {
    return Ti(e, t);
  }
  function n0(e, t, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function It(e, t, r, l) {
    return new n0(e, t, r, l);
  }
  function la(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function r0(e) {
    if (typeof e == "function") return la(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === J) return 11;
      if (e === V) return 14;
    }
    return 2;
  }
  function Fn(e, t) {
    var r = e.alternate;
    return r === null ? (r = It(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function Ml(e, t, r, l, a, d) {
    var w = 2;
    if (l = e, typeof e == "function") la(e) && (w = 1);
    else if (typeof e == "string") w = 5;
    else e: switch (e) {
      case B:
        return ur(r.children, a, d, t);
      case W:
        w = 8, a |= 8;
        break;
      case Z:
        return e = It(12, r, t, a | 2), e.elementType = Z, e.lanes = d, e;
      case q:
        return e = It(13, r, t, a), e.elementType = q, e.lanes = d, e;
      case P:
        return e = It(19, r, t, a), e.elementType = P, e.lanes = d, e;
      case H:
        return Pl(r, a, d, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ie:
            w = 10;
            break e;
          case G:
            w = 9;
            break e;
          case J:
            w = 11;
            break e;
          case V:
            w = 14;
            break e;
          case $:
            w = 16, l = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = It(w, r, t, a), t.elementType = e, t.type = l, t.lanes = d, t;
  }
  function ur(e, t, r, l) {
    return e = It(7, e, l, t), e.lanes = r, e;
  }
  function Pl(e, t, r, l) {
    return e = It(22, e, l, t), e.elementType = H, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
  }
  function sa(e, t, r) {
    return e = It(6, e, null, t), e.lanes = r, e;
  }
  function ua(e, t, r) {
    return t = It(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function o0(e, t, r, l, a) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = yo(0), this.expirationTimes = yo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yo(0), this.identifierPrefix = l, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
  }
  function aa(e, t, r, l, a, d, w, T, z) {
    return e = new o0(e, t, r, T, z), t === 1 ? (t = 1, d === !0 && (t |= 8)) : t = 0, d = It(3, null, null, t), e.current = d, d.stateNode = e, d.memoizedState = { element: l, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Eu(d), e;
  }
  function i0(e, t, r) {
    var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: j, key: l == null ? null : "" + l, children: e, containerInfo: t, implementation: r };
  }
  function Md(e) {
    if (!e) return Tn;
    e = e._reactInternals;
    e: {
      if (Xt(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ct(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (ct(r)) return ef(e, r, t);
    }
    return t;
  }
  function Pd(e, t, r, l, a, d, w, T, z) {
    return e = aa(r, l, !0, e, a, d, w, T, z), e.context = Md(null), r = e.current, l = ut(), a = Dn(r), d = fn(l, a), d.callback = t ?? null, In(r, d, a), e.current.lanes = a, xn(e, a, l), ht(e, l), e;
  }
  function Tl(e, t, r, l) {
    var a = t.current, d = ut(), w = Dn(a);
    return r = Md(r), t.context === null ? t.context = r : t.pendingContext = r, t = fn(d, w), t.payload = { element: e }, l = l === void 0 ? null : l, l !== null && (t.callback = l), e = In(a, t, w), e !== null && (jt(e, a, w, d), ll(e, a, w)), w;
  }
  function Ll(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Td(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function ca(e, t) {
    Td(e, t), (e = e.alternate) && Td(e, t);
  }
  function l0() {
    return null;
  }
  var Ld = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function fa(e) {
    this._internalRoot = e;
  }
  zl.prototype.render = fa.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Tl(e, t, null, null);
  }, zl.prototype.unmount = fa.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ir(function() {
        Tl(null, e, null, null);
      }), t[ln] = null;
    }
  };
  function zl(e) {
    this._internalRoot = e;
  }
  zl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = dc();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < kn.length && t !== 0 && t < kn[r].priority; r++) ;
      kn.splice(r, 0, e), r === 0 && mc(e);
    }
  };
  function da(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Il(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function zd() {
  }
  function s0(e, t, r, l, a) {
    if (a) {
      if (typeof l == "function") {
        var d = l;
        l = function() {
          var X = Ll(w);
          d.call(X);
        };
      }
      var w = Pd(t, l, e, 0, null, !1, !1, "", zd);
      return e._reactRootContainer = w, e[ln] = w.current, zo(e.nodeType === 8 ? e.parentNode : e), ir(), w;
    }
    for (; a = e.lastChild; ) e.removeChild(a);
    if (typeof l == "function") {
      var T = l;
      l = function() {
        var X = Ll(z);
        T.call(X);
      };
    }
    var z = aa(e, 0, !1, null, null, !1, !1, "", zd);
    return e._reactRootContainer = z, e[ln] = z.current, zo(e.nodeType === 8 ? e.parentNode : e), ir(function() {
      Tl(t, z, r, l);
    }), z;
  }
  function Rl(e, t, r, l, a) {
    var d = r._reactRootContainer;
    if (d) {
      var w = d;
      if (typeof a == "function") {
        var T = a;
        a = function() {
          var z = Ll(w);
          T.call(z);
        };
      }
      Tl(t, w, e, a);
    } else w = s0(r, t, e, a, l);
    return Ll(w);
  }
  cc = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = bt(t.pendingLanes);
          r !== 0 && (Ds(t, r | 1), ht(t, Ve()), (Le & 6) === 0 && (Ur = Ve() + 500, Ln()));
        }
        break;
      case 13:
        ir(function() {
          var l = cn(e, 1);
          if (l !== null) {
            var a = ut();
            jt(l, e, 1, a);
          }
        }), ca(e, 1);
    }
  }, Os = function(e) {
    if (e.tag === 13) {
      var t = cn(e, 134217728);
      if (t !== null) {
        var r = ut();
        jt(t, e, 134217728, r);
      }
      ca(e, 134217728);
    }
  }, fc = function(e) {
    if (e.tag === 13) {
      var t = Dn(e), r = cn(e, t);
      if (r !== null) {
        var l = ut();
        jt(r, e, t, l);
      }
      ca(e, t);
    }
  }, dc = function() {
    return Ie;
  }, hc = function(e, t) {
    var r = Ie;
    try {
      return Ie = e, t();
    } finally {
      Ie = r;
    }
  }, uo = function(e, t, r) {
    switch (t) {
      case "input":
        if (Ae(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; ) r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var l = r[t];
            if (l !== e && l.form === e.form) {
              var a = Gi(l);
              if (!a) throw Error(i(90));
              he(l), Ae(l, a);
            }
          }
        }
        break;
      case "textarea":
        rn(e, r);
        break;
      case "select":
        t = r.value, t != null && gt(e, !!r.multiple, t, !1);
    }
  }, ki = ra, Ci = ir;
  var u0 = { usingClientEntryPoint: !1, Events: [Ao, Lr, Gi, _i, ao, ra] }, Qo = { findFiberByHostInstance: qn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, a0 = { bundleType: Qo.bundleType, version: Qo.version, rendererPackageName: Qo.rendererPackageName, rendererConfig: Qo.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: M.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Mi(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Qo.findFiberByHostInstance || l0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Al = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Al.isDisabled && Al.supportsFiber) try {
      Kn = Al.inject(a0), Nt = Al;
    } catch {
    }
  }
  return pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = u0, pt.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!da(t)) throw Error(i(200));
    return i0(e, t, null, r);
  }, pt.createRoot = function(e, t) {
    if (!da(e)) throw Error(i(299));
    var r = !1, l = "", a = Ld;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = aa(e, 1, !1, null, null, r, !1, l, a), e[ln] = t.current, zo(e.nodeType === 8 ? e.parentNode : e), new fa(t);
  }, pt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = Mi(t), e = e === null ? null : e.stateNode, e;
  }, pt.flushSync = function(e) {
    return ir(e);
  }, pt.hydrate = function(e, t, r) {
    if (!Il(t)) throw Error(i(200));
    return Rl(null, e, t, !0, r);
  }, pt.hydrateRoot = function(e, t, r) {
    if (!da(e)) throw Error(i(405));
    var l = r != null && r.hydratedSources || null, a = !1, d = "", w = Ld;
    if (r != null && (r.unstable_strictMode === !0 && (a = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onRecoverableError !== void 0 && (w = r.onRecoverableError)), t = Pd(t, null, e, 1, r ?? null, a, !1, d, w), e[ln] = t.current, zo(e), l) for (e = 0; e < l.length; e++) r = l[e], a = r._getVersion, a = a(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, a] : t.mutableSourceEagerHydrationData.push(
      r,
      a
    );
    return new zl(t);
  }, pt.render = function(e, t, r) {
    if (!Il(t)) throw Error(i(200));
    return Rl(null, e, t, !1, r);
  }, pt.unmountComponentAtNode = function(e) {
    if (!Il(e)) throw Error(i(40));
    return e._reactRootContainer ? (ir(function() {
      Rl(null, null, e, !1, function() {
        e._reactRootContainer = null, e[ln] = null;
      });
    }), !0) : !1;
  }, pt.unstable_batchedUpdates = ra, pt.unstable_renderSubtreeIntoContainer = function(e, t, r, l) {
    if (!Il(r)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Rl(e, t, r, !1, l);
  }, pt.version = "18.3.1-next-f1338f8080-20240426", pt;
}
var Od;
function Qh() {
  if (Od) return pa.exports;
  Od = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), pa.exports = p0(), pa.exports;
}
var Fd;
function m0() {
  if (Fd) return $l;
  Fd = 1;
  var n = Qh();
  return $l.createRoot = n.createRoot, $l.hydrateRoot = n.hydrateRoot, $l;
}
var g0 = m0(), ya = { exports: {} }, Ko = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hd;
function y0() {
  if (Hd) return Ko;
  Hd = 1;
  var n = di(), o = Symbol.for("react.element"), i = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(h, p, y) {
    var g, v = {}, m = null, x = null;
    y !== void 0 && (m = "" + y), p.key !== void 0 && (m = "" + p.key), p.ref !== void 0 && (x = p.ref);
    for (g in p) s.call(p, g) && !c.hasOwnProperty(g) && (v[g] = p[g]);
    if (h && h.defaultProps) for (g in p = h.defaultProps, p) v[g] === void 0 && (v[g] = p[g]);
    return { $$typeof: o, type: h, key: m, ref: x, props: v, _owner: u.current };
  }
  return Ko.Fragment = i, Ko.jsx = f, Ko.jsxs = f, Ko;
}
var jd;
function v0() {
  return jd || (jd = 1, ya.exports = y0()), ya.exports;
}
var K = v0();
function Qe(n) {
  if (typeof n == "string" || typeof n == "number") return "" + n;
  let o = "";
  if (Array.isArray(n))
    for (let i = 0, s; i < n.length; i++)
      (s = Qe(n[i])) !== "" && (o += (o && " ") + s);
  else
    for (let i in n)
      n[i] && (o += (o && " ") + i);
  return o;
}
var w0 = { value: () => {
} };
function us() {
  for (var n = 0, o = arguments.length, i = {}, s; n < o; ++n) {
    if (!(s = arguments[n] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new Xl(i);
}
function Xl(n) {
  this._ = n;
}
function x0(n, o) {
  return n.trim().split(/^|\s+/).map(function(i) {
    var s = "", u = i.indexOf(".");
    if (u >= 0 && (s = i.slice(u + 1), i = i.slice(0, u)), i && !o.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Xl.prototype = us.prototype = {
  constructor: Xl,
  on: function(n, o) {
    var i = this._, s = x0(n + "", i), u, c = -1, f = s.length;
    if (arguments.length < 2) {
      for (; ++c < f; ) if ((u = (n = s[c]).type) && (u = S0(i[u], n.name))) return u;
      return;
    }
    if (o != null && typeof o != "function") throw new Error("invalid callback: " + o);
    for (; ++c < f; )
      if (u = (n = s[c]).type) i[u] = Vd(i[u], n.name, o);
      else if (o == null) for (u in i) i[u] = Vd(i[u], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, o = this._;
    for (var i in o) n[i] = o[i].slice();
    return new Xl(n);
  },
  call: function(n, o) {
    if ((u = arguments.length - 2) > 0) for (var i = new Array(u), s = 0, u, c; s < u; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (c = this._[n], s = 0, u = c.length; s < u; ++s) c[s].value.apply(o, i);
  },
  apply: function(n, o, i) {
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (var s = this._[n], u = 0, c = s.length; u < c; ++u) s[u].value.apply(o, i);
  }
};
function S0(n, o) {
  for (var i = 0, s = n.length, u; i < s; ++i)
    if ((u = n[i]).name === o)
      return u.value;
}
function Vd(n, o, i) {
  for (var s = 0, u = n.length; s < u; ++s)
    if (n[s].name === o) {
      n[s] = w0, n = n.slice(0, s).concat(n.slice(s + 1));
      break;
    }
  return i != null && n.push({ name: o, value: i }), n;
}
var za = "http://www.w3.org/1999/xhtml";
const Bd = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: za,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function as(n) {
  var o = n += "", i = o.indexOf(":");
  return i >= 0 && (o = n.slice(0, i)) !== "xmlns" && (n = n.slice(i + 1)), Bd.hasOwnProperty(o) ? { space: Bd[o], local: n } : n;
}
function E0(n) {
  return function() {
    var o = this.ownerDocument, i = this.namespaceURI;
    return i === za && o.documentElement.namespaceURI === za ? o.createElement(n) : o.createElementNS(i, n);
  };
}
function _0(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Kh(n) {
  var o = as(n);
  return (o.local ? _0 : E0)(o);
}
function k0() {
}
function Ya(n) {
  return n == null ? k0 : function() {
    return this.querySelector(n);
  };
}
function C0(n) {
  typeof n != "function" && (n = Ya(n));
  for (var o = this._groups, i = o.length, s = new Array(i), u = 0; u < i; ++u)
    for (var c = o[u], f = c.length, h = s[u] = new Array(f), p, y, g = 0; g < f; ++g)
      (p = c[g]) && (y = n.call(p, p.__data__, g, c)) && ("__data__" in p && (y.__data__ = p.__data__), h[g] = y);
  return new _t(s, this._parents);
}
function N0(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function M0() {
  return [];
}
function Gh(n) {
  return n == null ? M0 : function() {
    return this.querySelectorAll(n);
  };
}
function P0(n) {
  return function() {
    return N0(n.apply(this, arguments));
  };
}
function T0(n) {
  typeof n == "function" ? n = P0(n) : n = Gh(n);
  for (var o = this._groups, i = o.length, s = [], u = [], c = 0; c < i; ++c)
    for (var f = o[c], h = f.length, p, y = 0; y < h; ++y)
      (p = f[y]) && (s.push(n.call(p, p.__data__, y, f)), u.push(p));
  return new _t(s, u);
}
function qh(n) {
  return function() {
    return this.matches(n);
  };
}
function Zh(n) {
  return function(o) {
    return o.matches(n);
  };
}
var L0 = Array.prototype.find;
function z0(n) {
  return function() {
    return L0.call(this.children, n);
  };
}
function I0() {
  return this.firstElementChild;
}
function R0(n) {
  return this.select(n == null ? I0 : z0(typeof n == "function" ? n : Zh(n)));
}
var A0 = Array.prototype.filter;
function $0() {
  return Array.from(this.children);
}
function D0(n) {
  return function() {
    return A0.call(this.children, n);
  };
}
function O0(n) {
  return this.selectAll(n == null ? $0 : D0(typeof n == "function" ? n : Zh(n)));
}
function F0(n) {
  typeof n != "function" && (n = qh(n));
  for (var o = this._groups, i = o.length, s = new Array(i), u = 0; u < i; ++u)
    for (var c = o[u], f = c.length, h = s[u] = [], p, y = 0; y < f; ++y)
      (p = c[y]) && n.call(p, p.__data__, y, c) && h.push(p);
  return new _t(s, this._parents);
}
function Jh(n) {
  return new Array(n.length);
}
function H0() {
  return new _t(this._enter || this._groups.map(Jh), this._parents);
}
function ql(n, o) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = o;
}
ql.prototype = {
  constructor: ql,
  appendChild: function(n) {
    return this._parent.insertBefore(n, this._next);
  },
  insertBefore: function(n, o) {
    return this._parent.insertBefore(n, o);
  },
  querySelector: function(n) {
    return this._parent.querySelector(n);
  },
  querySelectorAll: function(n) {
    return this._parent.querySelectorAll(n);
  }
};
function j0(n) {
  return function() {
    return n;
  };
}
function V0(n, o, i, s, u, c) {
  for (var f = 0, h, p = o.length, y = c.length; f < y; ++f)
    (h = o[f]) ? (h.__data__ = c[f], s[f] = h) : i[f] = new ql(n, c[f]);
  for (; f < p; ++f)
    (h = o[f]) && (u[f] = h);
}
function B0(n, o, i, s, u, c, f) {
  var h, p, y = /* @__PURE__ */ new Map(), g = o.length, v = c.length, m = new Array(g), x;
  for (h = 0; h < g; ++h)
    (p = o[h]) && (m[h] = x = f.call(p, p.__data__, h, o) + "", y.has(x) ? u[h] = p : y.set(x, p));
  for (h = 0; h < v; ++h)
    x = f.call(n, c[h], h, c) + "", (p = y.get(x)) ? (s[h] = p, p.__data__ = c[h], y.delete(x)) : i[h] = new ql(n, c[h]);
  for (h = 0; h < g; ++h)
    (p = o[h]) && y.get(m[h]) === p && (u[h] = p);
}
function U0(n) {
  return n.__data__;
}
function W0(n, o) {
  if (!arguments.length) return Array.from(this, U0);
  var i = o ? B0 : V0, s = this._parents, u = this._groups;
  typeof n != "function" && (n = j0(n));
  for (var c = u.length, f = new Array(c), h = new Array(c), p = new Array(c), y = 0; y < c; ++y) {
    var g = s[y], v = u[y], m = v.length, x = Y0(n.call(g, g && g.__data__, y, s)), k = x.length, E = h[y] = new Array(k), C = f[y] = new Array(k), N = p[y] = new Array(m);
    i(g, v, E, C, N, x, o);
    for (var O = 0, S = 0, M, I; O < k; ++O)
      if (M = E[O]) {
        for (O >= S && (S = O + 1); !(I = C[S]) && ++S < k; ) ;
        M._next = I || null;
      }
  }
  return f = new _t(f, s), f._enter = h, f._exit = p, f;
}
function Y0(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function X0() {
  return new _t(this._exit || this._groups.map(Jh), this._parents);
}
function b0(n, o, i) {
  var s = this.enter(), u = this, c = this.exit();
  return typeof n == "function" ? (s = n(s), s && (s = s.selection())) : s = s.append(n + ""), o != null && (u = o(u), u && (u = u.selection())), i == null ? c.remove() : i(c), s && u ? s.merge(u).order() : u;
}
function Q0(n) {
  for (var o = n.selection ? n.selection() : n, i = this._groups, s = o._groups, u = i.length, c = s.length, f = Math.min(u, c), h = new Array(u), p = 0; p < f; ++p)
    for (var y = i[p], g = s[p], v = y.length, m = h[p] = new Array(v), x, k = 0; k < v; ++k)
      (x = y[k] || g[k]) && (m[k] = x);
  for (; p < u; ++p)
    h[p] = i[p];
  return new _t(h, this._parents);
}
function K0() {
  for (var n = this._groups, o = -1, i = n.length; ++o < i; )
    for (var s = n[o], u = s.length - 1, c = s[u], f; --u >= 0; )
      (f = s[u]) && (c && f.compareDocumentPosition(c) ^ 4 && c.parentNode.insertBefore(f, c), c = f);
  return this;
}
function G0(n) {
  n || (n = q0);
  function o(v, m) {
    return v && m ? n(v.__data__, m.__data__) : !v - !m;
  }
  for (var i = this._groups, s = i.length, u = new Array(s), c = 0; c < s; ++c) {
    for (var f = i[c], h = f.length, p = u[c] = new Array(h), y, g = 0; g < h; ++g)
      (y = f[g]) && (p[g] = y);
    p.sort(o);
  }
  return new _t(u, this._parents).order();
}
function q0(n, o) {
  return n < o ? -1 : n > o ? 1 : n >= o ? 0 : NaN;
}
function Z0() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function J0() {
  return Array.from(this);
}
function ey() {
  for (var n = this._groups, o = 0, i = n.length; o < i; ++o)
    for (var s = n[o], u = 0, c = s.length; u < c; ++u) {
      var f = s[u];
      if (f) return f;
    }
  return null;
}
function ty() {
  let n = 0;
  for (const o of this) ++n;
  return n;
}
function ny() {
  return !this.node();
}
function ry(n) {
  for (var o = this._groups, i = 0, s = o.length; i < s; ++i)
    for (var u = o[i], c = 0, f = u.length, h; c < f; ++c)
      (h = u[c]) && n.call(h, h.__data__, c, u);
  return this;
}
function oy(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function iy(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function ly(n, o) {
  return function() {
    this.setAttribute(n, o);
  };
}
function sy(n, o) {
  return function() {
    this.setAttributeNS(n.space, n.local, o);
  };
}
function uy(n, o) {
  return function() {
    var i = o.apply(this, arguments);
    i == null ? this.removeAttribute(n) : this.setAttribute(n, i);
  };
}
function ay(n, o) {
  return function() {
    var i = o.apply(this, arguments);
    i == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, i);
  };
}
function cy(n, o) {
  var i = as(n);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((o == null ? i.local ? iy : oy : typeof o == "function" ? i.local ? ay : uy : i.local ? sy : ly)(i, o));
}
function ep(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function fy(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function dy(n, o, i) {
  return function() {
    this.style.setProperty(n, o, i);
  };
}
function hy(n, o, i) {
  return function() {
    var s = o.apply(this, arguments);
    s == null ? this.style.removeProperty(n) : this.style.setProperty(n, s, i);
  };
}
function py(n, o, i) {
  return arguments.length > 1 ? this.each((o == null ? fy : typeof o == "function" ? hy : dy)(n, o, i ?? "")) : Gr(this.node(), n);
}
function Gr(n, o) {
  return n.style.getPropertyValue(o) || ep(n).getComputedStyle(n, null).getPropertyValue(o);
}
function my(n) {
  return function() {
    delete this[n];
  };
}
function gy(n, o) {
  return function() {
    this[n] = o;
  };
}
function yy(n, o) {
  return function() {
    var i = o.apply(this, arguments);
    i == null ? delete this[n] : this[n] = i;
  };
}
function vy(n, o) {
  return arguments.length > 1 ? this.each((o == null ? my : typeof o == "function" ? yy : gy)(n, o)) : this.node()[n];
}
function tp(n) {
  return n.trim().split(/^|\s+/);
}
function Xa(n) {
  return n.classList || new np(n);
}
function np(n) {
  this._node = n, this._names = tp(n.getAttribute("class") || "");
}
np.prototype = {
  add: function(n) {
    var o = this._names.indexOf(n);
    o < 0 && (this._names.push(n), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(n) {
    var o = this._names.indexOf(n);
    o >= 0 && (this._names.splice(o, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(n) {
    return this._names.indexOf(n) >= 0;
  }
};
function rp(n, o) {
  for (var i = Xa(n), s = -1, u = o.length; ++s < u; ) i.add(o[s]);
}
function op(n, o) {
  for (var i = Xa(n), s = -1, u = o.length; ++s < u; ) i.remove(o[s]);
}
function wy(n) {
  return function() {
    rp(this, n);
  };
}
function xy(n) {
  return function() {
    op(this, n);
  };
}
function Sy(n, o) {
  return function() {
    (o.apply(this, arguments) ? rp : op)(this, n);
  };
}
function Ey(n, o) {
  var i = tp(n + "");
  if (arguments.length < 2) {
    for (var s = Xa(this.node()), u = -1, c = i.length; ++u < c; ) if (!s.contains(i[u])) return !1;
    return !0;
  }
  return this.each((typeof o == "function" ? Sy : o ? wy : xy)(i, o));
}
function _y() {
  this.textContent = "";
}
function ky(n) {
  return function() {
    this.textContent = n;
  };
}
function Cy(n) {
  return function() {
    var o = n.apply(this, arguments);
    this.textContent = o ?? "";
  };
}
function Ny(n) {
  return arguments.length ? this.each(n == null ? _y : (typeof n == "function" ? Cy : ky)(n)) : this.node().textContent;
}
function My() {
  this.innerHTML = "";
}
function Py(n) {
  return function() {
    this.innerHTML = n;
  };
}
function Ty(n) {
  return function() {
    var o = n.apply(this, arguments);
    this.innerHTML = o ?? "";
  };
}
function Ly(n) {
  return arguments.length ? this.each(n == null ? My : (typeof n == "function" ? Ty : Py)(n)) : this.node().innerHTML;
}
function zy() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Iy() {
  return this.each(zy);
}
function Ry() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ay() {
  return this.each(Ry);
}
function $y(n) {
  var o = typeof n == "function" ? n : Kh(n);
  return this.select(function() {
    return this.appendChild(o.apply(this, arguments));
  });
}
function Dy() {
  return null;
}
function Oy(n, o) {
  var i = typeof n == "function" ? n : Kh(n), s = o == null ? Dy : typeof o == "function" ? o : Ya(o);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Fy() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function Hy() {
  return this.each(Fy);
}
function jy() {
  var n = this.cloneNode(!1), o = this.parentNode;
  return o ? o.insertBefore(n, this.nextSibling) : n;
}
function Vy() {
  var n = this.cloneNode(!0), o = this.parentNode;
  return o ? o.insertBefore(n, this.nextSibling) : n;
}
function By(n) {
  return this.select(n ? Vy : jy);
}
function Uy(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function Wy(n) {
  return function(o) {
    n.call(this, o, this.__data__);
  };
}
function Yy(n) {
  return n.trim().split(/^|\s+/).map(function(o) {
    var i = "", s = o.indexOf(".");
    return s >= 0 && (i = o.slice(s + 1), o = o.slice(0, s)), { type: o, name: i };
  });
}
function Xy(n) {
  return function() {
    var o = this.__on;
    if (o) {
      for (var i = 0, s = -1, u = o.length, c; i < u; ++i)
        c = o[i], (!n.type || c.type === n.type) && c.name === n.name ? this.removeEventListener(c.type, c.listener, c.options) : o[++s] = c;
      ++s ? o.length = s : delete this.__on;
    }
  };
}
function by(n, o, i) {
  return function() {
    var s = this.__on, u, c = Wy(o);
    if (s) {
      for (var f = 0, h = s.length; f < h; ++f)
        if ((u = s[f]).type === n.type && u.name === n.name) {
          this.removeEventListener(u.type, u.listener, u.options), this.addEventListener(u.type, u.listener = c, u.options = i), u.value = o;
          return;
        }
    }
    this.addEventListener(n.type, c, i), u = { type: n.type, name: n.name, value: o, listener: c, options: i }, s ? s.push(u) : this.__on = [u];
  };
}
function Qy(n, o, i) {
  var s = Yy(n + ""), u, c = s.length, f;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var p = 0, y = h.length, g; p < y; ++p)
        for (u = 0, g = h[p]; u < c; ++u)
          if ((f = s[u]).type === g.type && f.name === g.name)
            return g.value;
    }
    return;
  }
  for (h = o ? by : Xy, u = 0; u < c; ++u) this.each(h(s[u], o, i));
  return this;
}
function ip(n, o, i) {
  var s = ep(n), u = s.CustomEvent;
  typeof u == "function" ? u = new u(o, i) : (u = s.document.createEvent("Event"), i ? (u.initEvent(o, i.bubbles, i.cancelable), u.detail = i.detail) : u.initEvent(o, !1, !1)), n.dispatchEvent(u);
}
function Ky(n, o) {
  return function() {
    return ip(this, n, o);
  };
}
function Gy(n, o) {
  return function() {
    return ip(this, n, o.apply(this, arguments));
  };
}
function qy(n, o) {
  return this.each((typeof o == "function" ? Gy : Ky)(n, o));
}
function* Zy() {
  for (var n = this._groups, o = 0, i = n.length; o < i; ++o)
    for (var s = n[o], u = 0, c = s.length, f; u < c; ++u)
      (f = s[u]) && (yield f);
}
var lp = [null];
function _t(n, o) {
  this._groups = n, this._parents = o;
}
function hi() {
  return new _t([[document.documentElement]], lp);
}
function Jy() {
  return this;
}
_t.prototype = hi.prototype = {
  constructor: _t,
  select: C0,
  selectAll: T0,
  selectChild: R0,
  selectChildren: O0,
  filter: F0,
  data: W0,
  enter: H0,
  exit: X0,
  join: b0,
  merge: Q0,
  selection: Jy,
  order: K0,
  sort: G0,
  call: Z0,
  nodes: J0,
  node: ey,
  size: ty,
  empty: ny,
  each: ry,
  attr: cy,
  style: py,
  property: vy,
  classed: Ey,
  text: Ny,
  html: Ly,
  raise: Iy,
  lower: Ay,
  append: $y,
  insert: Oy,
  remove: Hy,
  clone: By,
  datum: Uy,
  on: Qy,
  dispatch: qy,
  [Symbol.iterator]: Zy
};
function Et(n) {
  return typeof n == "string" ? new _t([[document.querySelector(n)]], [document.documentElement]) : new _t([[n]], lp);
}
function ev(n) {
  let o;
  for (; o = n.sourceEvent; ) n = o;
  return n;
}
function Vt(n, o) {
  if (n = ev(n), o === void 0 && (o = n.currentTarget), o) {
    var i = o.ownerSVGElement || o;
    if (i.createSVGPoint) {
      var s = i.createSVGPoint();
      return s.x = n.clientX, s.y = n.clientY, s = s.matrixTransform(o.getScreenCTM().inverse()), [s.x, s.y];
    }
    if (o.getBoundingClientRect) {
      var u = o.getBoundingClientRect();
      return [n.clientX - u.left - o.clientLeft, n.clientY - u.top - o.clientTop];
    }
  }
  return [n.pageX, n.pageY];
}
const tv = { passive: !1 }, ni = { capture: !0, passive: !1 };
function va(n) {
  n.stopImmediatePropagation();
}
function Qr(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function sp(n) {
  var o = n.document.documentElement, i = Et(n).on("dragstart.drag", Qr, ni);
  "onselectstart" in o ? i.on("selectstart.drag", Qr, ni) : (o.__noselect = o.style.MozUserSelect, o.style.MozUserSelect = "none");
}
function up(n, o) {
  var i = n.document.documentElement, s = Et(n).on("dragstart.drag", null);
  o && (s.on("click.drag", Qr, ni), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Dl = (n) => () => n;
function Ia(n, {
  sourceEvent: o,
  subject: i,
  target: s,
  identifier: u,
  active: c,
  x: f,
  y: h,
  dx: p,
  dy: y,
  dispatch: g
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: o, enumerable: !0, configurable: !0 },
    subject: { value: i, enumerable: !0, configurable: !0 },
    target: { value: s, enumerable: !0, configurable: !0 },
    identifier: { value: u, enumerable: !0, configurable: !0 },
    active: { value: c, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: y, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
Ia.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function nv(n) {
  return !n.ctrlKey && !n.button;
}
function rv() {
  return this.parentNode;
}
function ov(n, o) {
  return o ?? { x: n.x, y: n.y };
}
function iv() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ap() {
  var n = nv, o = rv, i = ov, s = iv, u = {}, c = us("start", "drag", "end"), f = 0, h, p, y, g, v = 0;
  function m(M) {
    M.on("mousedown.drag", x).filter(s).on("touchstart.drag", C).on("touchmove.drag", N, tv).on("touchend.drag touchcancel.drag", O).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(M, I) {
    if (!(g || !n.call(this, M, I))) {
      var j = S(this, o.call(this, M, I), M, I, "mouse");
      j && (Et(M.view).on("mousemove.drag", k, ni).on("mouseup.drag", E, ni), sp(M.view), va(M), y = !1, h = M.clientX, p = M.clientY, j("start", M));
    }
  }
  function k(M) {
    if (Qr(M), !y) {
      var I = M.clientX - h, j = M.clientY - p;
      y = I * I + j * j > v;
    }
    u.mouse("drag", M);
  }
  function E(M) {
    Et(M.view).on("mousemove.drag mouseup.drag", null), up(M.view, y), Qr(M), u.mouse("end", M);
  }
  function C(M, I) {
    if (n.call(this, M, I)) {
      var j = M.changedTouches, B = o.call(this, M, I), W = j.length, Z, ie;
      for (Z = 0; Z < W; ++Z)
        (ie = S(this, B, M, I, j[Z].identifier, j[Z])) && (va(M), ie("start", M, j[Z]));
    }
  }
  function N(M) {
    var I = M.changedTouches, j = I.length, B, W;
    for (B = 0; B < j; ++B)
      (W = u[I[B].identifier]) && (Qr(M), W("drag", M, I[B]));
  }
  function O(M) {
    var I = M.changedTouches, j = I.length, B, W;
    for (g && clearTimeout(g), g = setTimeout(function() {
      g = null;
    }, 500), B = 0; B < j; ++B)
      (W = u[I[B].identifier]) && (va(M), W("end", M, I[B]));
  }
  function S(M, I, j, B, W, Z) {
    var ie = c.copy(), G = Vt(Z || j, I), J, q, P;
    if ((P = i.call(M, new Ia("beforestart", {
      sourceEvent: j,
      target: m,
      identifier: W,
      active: f,
      x: G[0],
      y: G[1],
      dx: 0,
      dy: 0,
      dispatch: ie
    }), B)) != null)
      return J = P.x - G[0] || 0, q = P.y - G[1] || 0, function V($, H, R) {
        var L = G, D;
        switch ($) {
          case "start":
            u[W] = V, D = f++;
            break;
          case "end":
            delete u[W], --f;
          // falls through
          case "drag":
            G = Vt(R || H, I), D = f;
            break;
        }
        ie.call(
          $,
          M,
          new Ia($, {
            sourceEvent: H,
            subject: P,
            target: m,
            identifier: W,
            active: D,
            x: G[0] + J,
            y: G[1] + q,
            dx: G[0] - L[0],
            dy: G[1] - L[1],
            dispatch: ie
          }),
          B
        );
      };
  }
  return m.filter = function(M) {
    return arguments.length ? (n = typeof M == "function" ? M : Dl(!!M), m) : n;
  }, m.container = function(M) {
    return arguments.length ? (o = typeof M == "function" ? M : Dl(M), m) : o;
  }, m.subject = function(M) {
    return arguments.length ? (i = typeof M == "function" ? M : Dl(M), m) : i;
  }, m.touchable = function(M) {
    return arguments.length ? (s = typeof M == "function" ? M : Dl(!!M), m) : s;
  }, m.on = function() {
    var M = c.on.apply(c, arguments);
    return M === c ? m : M;
  }, m.clickDistance = function(M) {
    return arguments.length ? (v = (M = +M) * M, m) : Math.sqrt(v);
  }, m;
}
function ba(n, o, i) {
  n.prototype = o.prototype = i, i.constructor = n;
}
function cp(n, o) {
  var i = Object.create(n.prototype);
  for (var s in o) i[s] = o[s];
  return i;
}
function pi() {
}
var ri = 0.7, Zl = 1 / ri, Kr = "\\s*([+-]?\\d+)\\s*", oi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", en = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lv = /^#([0-9a-f]{3,8})$/, sv = new RegExp(`^rgb\\(${Kr},${Kr},${Kr}\\)$`), uv = new RegExp(`^rgb\\(${en},${en},${en}\\)$`), av = new RegExp(`^rgba\\(${Kr},${Kr},${Kr},${oi}\\)$`), cv = new RegExp(`^rgba\\(${en},${en},${en},${oi}\\)$`), fv = new RegExp(`^hsl\\(${oi},${en},${en}\\)$`), dv = new RegExp(`^hsla\\(${oi},${en},${en},${oi}\\)$`), Ud = {
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
ba(pi, pr, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Wd,
  // Deprecated! Use color.formatHex.
  formatHex: Wd,
  formatHex8: hv,
  formatHsl: pv,
  formatRgb: Yd,
  toString: Yd
});
function Wd() {
  return this.rgb().formatHex();
}
function hv() {
  return this.rgb().formatHex8();
}
function pv() {
  return fp(this).formatHsl();
}
function Yd() {
  return this.rgb().formatRgb();
}
function pr(n) {
  var o, i;
  return n = (n + "").trim().toLowerCase(), (o = lv.exec(n)) ? (i = o[1].length, o = parseInt(o[1], 16), i === 6 ? Xd(o) : i === 3 ? new mt(o >> 8 & 15 | o >> 4 & 240, o >> 4 & 15 | o & 240, (o & 15) << 4 | o & 15, 1) : i === 8 ? Ol(o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, (o & 255) / 255) : i === 4 ? Ol(o >> 12 & 15 | o >> 8 & 240, o >> 8 & 15 | o >> 4 & 240, o >> 4 & 15 | o & 240, ((o & 15) << 4 | o & 15) / 255) : null) : (o = sv.exec(n)) ? new mt(o[1], o[2], o[3], 1) : (o = uv.exec(n)) ? new mt(o[1] * 255 / 100, o[2] * 255 / 100, o[3] * 255 / 100, 1) : (o = av.exec(n)) ? Ol(o[1], o[2], o[3], o[4]) : (o = cv.exec(n)) ? Ol(o[1] * 255 / 100, o[2] * 255 / 100, o[3] * 255 / 100, o[4]) : (o = fv.exec(n)) ? Kd(o[1], o[2] / 100, o[3] / 100, 1) : (o = dv.exec(n)) ? Kd(o[1], o[2] / 100, o[3] / 100, o[4]) : Ud.hasOwnProperty(n) ? Xd(Ud[n]) : n === "transparent" ? new mt(NaN, NaN, NaN, 0) : null;
}
function Xd(n) {
  return new mt(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function Ol(n, o, i, s) {
  return s <= 0 && (n = o = i = NaN), new mt(n, o, i, s);
}
function mv(n) {
  return n instanceof pi || (n = pr(n)), n ? (n = n.rgb(), new mt(n.r, n.g, n.b, n.opacity)) : new mt();
}
function Ra(n, o, i, s) {
  return arguments.length === 1 ? mv(n) : new mt(n, o, i, s ?? 1);
}
function mt(n, o, i, s) {
  this.r = +n, this.g = +o, this.b = +i, this.opacity = +s;
}
ba(mt, Ra, cp(pi, {
  brighter(n) {
    return n = n == null ? Zl : Math.pow(Zl, n), new mt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? ri : Math.pow(ri, n), new mt(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new mt(dr(this.r), dr(this.g), dr(this.b), Jl(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bd,
  // Deprecated! Use color.formatHex.
  formatHex: bd,
  formatHex8: gv,
  formatRgb: Qd,
  toString: Qd
}));
function bd() {
  return `#${fr(this.r)}${fr(this.g)}${fr(this.b)}`;
}
function gv() {
  return `#${fr(this.r)}${fr(this.g)}${fr(this.b)}${fr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Qd() {
  const n = Jl(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${dr(this.r)}, ${dr(this.g)}, ${dr(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function Jl(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function dr(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function fr(n) {
  return n = dr(n), (n < 16 ? "0" : "") + n.toString(16);
}
function Kd(n, o, i, s) {
  return s <= 0 ? n = o = i = NaN : i <= 0 || i >= 1 ? n = o = NaN : o <= 0 && (n = NaN), new Bt(n, o, i, s);
}
function fp(n) {
  if (n instanceof Bt) return new Bt(n.h, n.s, n.l, n.opacity);
  if (n instanceof pi || (n = pr(n)), !n) return new Bt();
  if (n instanceof Bt) return n;
  n = n.rgb();
  var o = n.r / 255, i = n.g / 255, s = n.b / 255, u = Math.min(o, i, s), c = Math.max(o, i, s), f = NaN, h = c - u, p = (c + u) / 2;
  return h ? (o === c ? f = (i - s) / h + (i < s) * 6 : i === c ? f = (s - o) / h + 2 : f = (o - i) / h + 4, h /= p < 0.5 ? c + u : 2 - c - u, f *= 60) : h = p > 0 && p < 1 ? 0 : f, new Bt(f, h, p, n.opacity);
}
function yv(n, o, i, s) {
  return arguments.length === 1 ? fp(n) : new Bt(n, o, i, s ?? 1);
}
function Bt(n, o, i, s) {
  this.h = +n, this.s = +o, this.l = +i, this.opacity = +s;
}
ba(Bt, yv, cp(pi, {
  brighter(n) {
    return n = n == null ? Zl : Math.pow(Zl, n), new Bt(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? ri : Math.pow(ri, n), new Bt(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, o = isNaN(n) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * o, u = 2 * i - s;
    return new mt(
      wa(n >= 240 ? n - 240 : n + 120, u, s),
      wa(n, u, s),
      wa(n < 120 ? n + 240 : n - 120, u, s),
      this.opacity
    );
  },
  clamp() {
    return new Bt(Gd(this.h), Fl(this.s), Fl(this.l), Jl(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = Jl(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${Gd(this.h)}, ${Fl(this.s) * 100}%, ${Fl(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function Gd(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function Fl(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function wa(n, o, i) {
  return (n < 60 ? o + (i - o) * n / 60 : n < 180 ? i : n < 240 ? o + (i - o) * (240 - n) / 60 : o) * 255;
}
const Qa = (n) => () => n;
function vv(n, o) {
  return function(i) {
    return n + i * o;
  };
}
function wv(n, o, i) {
  return n = Math.pow(n, i), o = Math.pow(o, i) - n, i = 1 / i, function(s) {
    return Math.pow(n + s * o, i);
  };
}
function xv(n) {
  return (n = +n) == 1 ? dp : function(o, i) {
    return i - o ? wv(o, i, n) : Qa(isNaN(o) ? i : o);
  };
}
function dp(n, o) {
  var i = o - n;
  return i ? vv(n, i) : Qa(isNaN(n) ? o : n);
}
const es = (function n(o) {
  var i = xv(o);
  function s(u, c) {
    var f = i((u = Ra(u)).r, (c = Ra(c)).r), h = i(u.g, c.g), p = i(u.b, c.b), y = dp(u.opacity, c.opacity);
    return function(g) {
      return u.r = f(g), u.g = h(g), u.b = p(g), u.opacity = y(g), u + "";
    };
  }
  return s.gamma = n, s;
})(1);
function Sv(n, o) {
  o || (o = []);
  var i = n ? Math.min(o.length, n.length) : 0, s = o.slice(), u;
  return function(c) {
    for (u = 0; u < i; ++u) s[u] = n[u] * (1 - c) + o[u] * c;
    return s;
  };
}
function Ev(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function _v(n, o) {
  var i = o ? o.length : 0, s = n ? Math.min(i, n.length) : 0, u = new Array(s), c = new Array(i), f;
  for (f = 0; f < s; ++f) u[f] = ei(n[f], o[f]);
  for (; f < i; ++f) c[f] = o[f];
  return function(h) {
    for (f = 0; f < s; ++f) c[f] = u[f](h);
    return c;
  };
}
function kv(n, o) {
  var i = /* @__PURE__ */ new Date();
  return n = +n, o = +o, function(s) {
    return i.setTime(n * (1 - s) + o * s), i;
  };
}
function Zt(n, o) {
  return n = +n, o = +o, function(i) {
    return n * (1 - i) + o * i;
  };
}
function Cv(n, o) {
  var i = {}, s = {}, u;
  (n === null || typeof n != "object") && (n = {}), (o === null || typeof o != "object") && (o = {});
  for (u in o)
    u in n ? i[u] = ei(n[u], o[u]) : s[u] = o[u];
  return function(c) {
    for (u in i) s[u] = i[u](c);
    return s;
  };
}
var Aa = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xa = new RegExp(Aa.source, "g");
function Nv(n) {
  return function() {
    return n;
  };
}
function Mv(n) {
  return function(o) {
    return n(o) + "";
  };
}
function hp(n, o) {
  var i = Aa.lastIndex = xa.lastIndex = 0, s, u, c, f = -1, h = [], p = [];
  for (n = n + "", o = o + ""; (s = Aa.exec(n)) && (u = xa.exec(o)); )
    (c = u.index) > i && (c = o.slice(i, c), h[f] ? h[f] += c : h[++f] = c), (s = s[0]) === (u = u[0]) ? h[f] ? h[f] += u : h[++f] = u : (h[++f] = null, p.push({ i: f, x: Zt(s, u) })), i = xa.lastIndex;
  return i < o.length && (c = o.slice(i), h[f] ? h[f] += c : h[++f] = c), h.length < 2 ? p[0] ? Mv(p[0].x) : Nv(o) : (o = p.length, function(y) {
    for (var g = 0, v; g < o; ++g) h[(v = p[g]).i] = v.x(y);
    return h.join("");
  });
}
function ei(n, o) {
  var i = typeof o, s;
  return o == null || i === "boolean" ? Qa(o) : (i === "number" ? Zt : i === "string" ? (s = pr(o)) ? (o = s, es) : hp : o instanceof pr ? es : o instanceof Date ? kv : Ev(o) ? Sv : Array.isArray(o) ? _v : typeof o.valueOf != "function" && typeof o.toString != "function" || isNaN(o) ? Cv : Zt)(n, o);
}
var qd = 180 / Math.PI, $a = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function pp(n, o, i, s, u, c) {
  var f, h, p;
  return (f = Math.sqrt(n * n + o * o)) && (n /= f, o /= f), (p = n * i + o * s) && (i -= n * p, s -= o * p), (h = Math.sqrt(i * i + s * s)) && (i /= h, s /= h, p /= h), n * s < o * i && (n = -n, o = -o, p = -p, f = -f), {
    translateX: u,
    translateY: c,
    rotate: Math.atan2(o, n) * qd,
    skewX: Math.atan(p) * qd,
    scaleX: f,
    scaleY: h
  };
}
var Hl;
function Pv(n) {
  const o = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return o.isIdentity ? $a : pp(o.a, o.b, o.c, o.d, o.e, o.f);
}
function Tv(n) {
  return n == null || (Hl || (Hl = document.createElementNS("http://www.w3.org/2000/svg", "g")), Hl.setAttribute("transform", n), !(n = Hl.transform.baseVal.consolidate())) ? $a : (n = n.matrix, pp(n.a, n.b, n.c, n.d, n.e, n.f));
}
function mp(n, o, i, s) {
  function u(y) {
    return y.length ? y.pop() + " " : "";
  }
  function c(y, g, v, m, x, k) {
    if (y !== v || g !== m) {
      var E = x.push("translate(", null, o, null, i);
      k.push({ i: E - 4, x: Zt(y, v) }, { i: E - 2, x: Zt(g, m) });
    } else (v || m) && x.push("translate(" + v + o + m + i);
  }
  function f(y, g, v, m) {
    y !== g ? (y - g > 180 ? g += 360 : g - y > 180 && (y += 360), m.push({ i: v.push(u(v) + "rotate(", null, s) - 2, x: Zt(y, g) })) : g && v.push(u(v) + "rotate(" + g + s);
  }
  function h(y, g, v, m) {
    y !== g ? m.push({ i: v.push(u(v) + "skewX(", null, s) - 2, x: Zt(y, g) }) : g && v.push(u(v) + "skewX(" + g + s);
  }
  function p(y, g, v, m, x, k) {
    if (y !== v || g !== m) {
      var E = x.push(u(x) + "scale(", null, ",", null, ")");
      k.push({ i: E - 4, x: Zt(y, v) }, { i: E - 2, x: Zt(g, m) });
    } else (v !== 1 || m !== 1) && x.push(u(x) + "scale(" + v + "," + m + ")");
  }
  return function(y, g) {
    var v = [], m = [];
    return y = n(y), g = n(g), c(y.translateX, y.translateY, g.translateX, g.translateY, v, m), f(y.rotate, g.rotate, v, m), h(y.skewX, g.skewX, v, m), p(y.scaleX, y.scaleY, g.scaleX, g.scaleY, v, m), y = g = null, function(x) {
      for (var k = -1, E = m.length, C; ++k < E; ) v[(C = m[k]).i] = C.x(x);
      return v.join("");
    };
  };
}
var Lv = mp(Pv, "px, ", "px)", "deg)"), zv = mp(Tv, ", ", ")", ")"), Iv = 1e-12;
function Zd(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function Rv(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function Av(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const bl = (function n(o, i, s) {
  function u(c, f) {
    var h = c[0], p = c[1], y = c[2], g = f[0], v = f[1], m = f[2], x = g - h, k = v - p, E = x * x + k * k, C, N;
    if (E < Iv)
      N = Math.log(m / y) / o, C = function(B) {
        return [
          h + B * x,
          p + B * k,
          y * Math.exp(o * B * N)
        ];
      };
    else {
      var O = Math.sqrt(E), S = (m * m - y * y + s * E) / (2 * y * i * O), M = (m * m - y * y - s * E) / (2 * m * i * O), I = Math.log(Math.sqrt(S * S + 1) - S), j = Math.log(Math.sqrt(M * M + 1) - M);
      N = (j - I) / o, C = function(B) {
        var W = B * N, Z = Zd(I), ie = y / (i * O) * (Z * Av(o * W + I) - Rv(I));
        return [
          h + ie * x,
          p + ie * k,
          y * Z / Zd(o * W + I)
        ];
      };
    }
    return C.duration = N * 1e3 * o / Math.SQRT2, C;
  }
  return u.rho = function(c) {
    var f = Math.max(1e-3, +c), h = f * f, p = h * h;
    return n(f, h, p);
  }, u;
})(Math.SQRT2, 2, 4);
var qr = 0, Zo = 0, Go = 0, gp = 1e3, ts, Jo, ns = 0, mr = 0, cs = 0, ii = typeof performance == "object" && performance.now ? performance : Date, yp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Ka() {
  return mr || (yp($v), mr = ii.now() + cs);
}
function $v() {
  mr = 0;
}
function rs() {
  this._call = this._time = this._next = null;
}
rs.prototype = vp.prototype = {
  constructor: rs,
  restart: function(n, o, i) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Ka() : +i) + (o == null ? 0 : +o), !this._next && Jo !== this && (Jo ? Jo._next = this : ts = this, Jo = this), this._call = n, this._time = i, Da();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Da());
  }
};
function vp(n, o, i) {
  var s = new rs();
  return s.restart(n, o, i), s;
}
function Dv() {
  Ka(), ++qr;
  for (var n = ts, o; n; )
    (o = mr - n._time) >= 0 && n._call.call(void 0, o), n = n._next;
  --qr;
}
function Jd() {
  mr = (ns = ii.now()) + cs, qr = Zo = 0;
  try {
    Dv();
  } finally {
    qr = 0, Fv(), mr = 0;
  }
}
function Ov() {
  var n = ii.now(), o = n - ns;
  o > gp && (cs -= o, ns = n);
}
function Fv() {
  for (var n, o = ts, i, s = 1 / 0; o; )
    o._call ? (s > o._time && (s = o._time), n = o, o = o._next) : (i = o._next, o._next = null, o = n ? n._next = i : ts = i);
  Jo = n, Da(s);
}
function Da(n) {
  if (!qr) {
    Zo && (Zo = clearTimeout(Zo));
    var o = n - mr;
    o > 24 ? (n < 1 / 0 && (Zo = setTimeout(Jd, n - ii.now() - cs)), Go && (Go = clearInterval(Go))) : (Go || (ns = ii.now(), Go = setInterval(Ov, gp)), qr = 1, yp(Jd));
  }
}
function eh(n, o, i) {
  var s = new rs();
  return o = o == null ? 0 : +o, s.restart((u) => {
    s.stop(), n(u + o);
  }, o, i), s;
}
var Hv = us("start", "end", "cancel", "interrupt"), jv = [], wp = 0, th = 1, Oa = 2, Ql = 3, nh = 4, Fa = 5, Kl = 6;
function fs(n, o, i, s, u, c) {
  var f = n.__transition;
  if (!f) n.__transition = {};
  else if (i in f) return;
  Vv(n, i, {
    name: o,
    index: s,
    // For context during callback.
    group: u,
    // For context during callback.
    on: Hv,
    tween: jv,
    time: c.time,
    delay: c.delay,
    duration: c.duration,
    ease: c.ease,
    timer: null,
    state: wp
  });
}
function Ga(n, o) {
  var i = Wt(n, o);
  if (i.state > wp) throw new Error("too late; already scheduled");
  return i;
}
function nn(n, o) {
  var i = Wt(n, o);
  if (i.state > Ql) throw new Error("too late; already running");
  return i;
}
function Wt(n, o) {
  var i = n.__transition;
  if (!i || !(i = i[o])) throw new Error("transition not found");
  return i;
}
function Vv(n, o, i) {
  var s = n.__transition, u;
  s[o] = i, i.timer = vp(c, 0, i.time);
  function c(y) {
    i.state = th, i.timer.restart(f, i.delay, i.time), i.delay <= y && f(y - i.delay);
  }
  function f(y) {
    var g, v, m, x;
    if (i.state !== th) return p();
    for (g in s)
      if (x = s[g], x.name === i.name) {
        if (x.state === Ql) return eh(f);
        x.state === nh ? (x.state = Kl, x.timer.stop(), x.on.call("interrupt", n, n.__data__, x.index, x.group), delete s[g]) : +g < o && (x.state = Kl, x.timer.stop(), x.on.call("cancel", n, n.__data__, x.index, x.group), delete s[g]);
      }
    if (eh(function() {
      i.state === Ql && (i.state = nh, i.timer.restart(h, i.delay, i.time), h(y));
    }), i.state = Oa, i.on.call("start", n, n.__data__, i.index, i.group), i.state === Oa) {
      for (i.state = Ql, u = new Array(m = i.tween.length), g = 0, v = -1; g < m; ++g)
        (x = i.tween[g].value.call(n, n.__data__, i.index, i.group)) && (u[++v] = x);
      u.length = v + 1;
    }
  }
  function h(y) {
    for (var g = y < i.duration ? i.ease.call(null, y / i.duration) : (i.timer.restart(p), i.state = Fa, 1), v = -1, m = u.length; ++v < m; )
      u[v].call(n, g);
    i.state === Fa && (i.on.call("end", n, n.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = Kl, i.timer.stop(), delete s[o];
    for (var y in s) return;
    delete n.__transition;
  }
}
function Gl(n, o) {
  var i = n.__transition, s, u, c = !0, f;
  if (i) {
    o = o == null ? null : o + "";
    for (f in i) {
      if ((s = i[f]).name !== o) {
        c = !1;
        continue;
      }
      u = s.state > Oa && s.state < Fa, s.state = Kl, s.timer.stop(), s.on.call(u ? "interrupt" : "cancel", n, n.__data__, s.index, s.group), delete i[f];
    }
    c && delete n.__transition;
  }
}
function Bv(n) {
  return this.each(function() {
    Gl(this, n);
  });
}
function Uv(n, o) {
  var i, s;
  return function() {
    var u = nn(this, n), c = u.tween;
    if (c !== i) {
      s = i = c;
      for (var f = 0, h = s.length; f < h; ++f)
        if (s[f].name === o) {
          s = s.slice(), s.splice(f, 1);
          break;
        }
    }
    u.tween = s;
  };
}
function Wv(n, o, i) {
  var s, u;
  if (typeof i != "function") throw new Error();
  return function() {
    var c = nn(this, n), f = c.tween;
    if (f !== s) {
      u = (s = f).slice();
      for (var h = { name: o, value: i }, p = 0, y = u.length; p < y; ++p)
        if (u[p].name === o) {
          u[p] = h;
          break;
        }
      p === y && u.push(h);
    }
    c.tween = u;
  };
}
function Yv(n, o) {
  var i = this._id;
  if (n += "", arguments.length < 2) {
    for (var s = Wt(this.node(), i).tween, u = 0, c = s.length, f; u < c; ++u)
      if ((f = s[u]).name === n)
        return f.value;
    return null;
  }
  return this.each((o == null ? Uv : Wv)(i, n, o));
}
function qa(n, o, i) {
  var s = n._id;
  return n.each(function() {
    var u = nn(this, s);
    (u.value || (u.value = {}))[o] = i.apply(this, arguments);
  }), function(u) {
    return Wt(u, s).value[o];
  };
}
function xp(n, o) {
  var i;
  return (typeof o == "number" ? Zt : o instanceof pr ? es : (i = pr(o)) ? (o = i, es) : hp)(n, o);
}
function Xv(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function bv(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Qv(n, o, i) {
  var s, u = i + "", c;
  return function() {
    var f = this.getAttribute(n);
    return f === u ? null : f === s ? c : c = o(s = f, i);
  };
}
function Kv(n, o, i) {
  var s, u = i + "", c;
  return function() {
    var f = this.getAttributeNS(n.space, n.local);
    return f === u ? null : f === s ? c : c = o(s = f, i);
  };
}
function Gv(n, o, i) {
  var s, u, c;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttribute(n) : (f = this.getAttribute(n), p = h + "", f === p ? null : f === s && p === u ? c : (u = p, c = o(s = f, h)));
  };
}
function qv(n, o, i) {
  var s, u, c;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttributeNS(n.space, n.local) : (f = this.getAttributeNS(n.space, n.local), p = h + "", f === p ? null : f === s && p === u ? c : (u = p, c = o(s = f, h)));
  };
}
function Zv(n, o) {
  var i = as(n), s = i === "transform" ? zv : xp;
  return this.attrTween(n, typeof o == "function" ? (i.local ? qv : Gv)(i, s, qa(this, "attr." + n, o)) : o == null ? (i.local ? bv : Xv)(i) : (i.local ? Kv : Qv)(i, s, o));
}
function Jv(n, o) {
  return function(i) {
    this.setAttribute(n, o.call(this, i));
  };
}
function ew(n, o) {
  return function(i) {
    this.setAttributeNS(n.space, n.local, o.call(this, i));
  };
}
function tw(n, o) {
  var i, s;
  function u() {
    var c = o.apply(this, arguments);
    return c !== s && (i = (s = c) && ew(n, c)), i;
  }
  return u._value = o, u;
}
function nw(n, o) {
  var i, s;
  function u() {
    var c = o.apply(this, arguments);
    return c !== s && (i = (s = c) && Jv(n, c)), i;
  }
  return u._value = o, u;
}
function rw(n, o) {
  var i = "attr." + n;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (o == null) return this.tween(i, null);
  if (typeof o != "function") throw new Error();
  var s = as(n);
  return this.tween(i, (s.local ? tw : nw)(s, o));
}
function ow(n, o) {
  return function() {
    Ga(this, n).delay = +o.apply(this, arguments);
  };
}
function iw(n, o) {
  return o = +o, function() {
    Ga(this, n).delay = o;
  };
}
function lw(n) {
  var o = this._id;
  return arguments.length ? this.each((typeof n == "function" ? ow : iw)(o, n)) : Wt(this.node(), o).delay;
}
function sw(n, o) {
  return function() {
    nn(this, n).duration = +o.apply(this, arguments);
  };
}
function uw(n, o) {
  return o = +o, function() {
    nn(this, n).duration = o;
  };
}
function aw(n) {
  var o = this._id;
  return arguments.length ? this.each((typeof n == "function" ? sw : uw)(o, n)) : Wt(this.node(), o).duration;
}
function cw(n, o) {
  if (typeof o != "function") throw new Error();
  return function() {
    nn(this, n).ease = o;
  };
}
function fw(n) {
  var o = this._id;
  return arguments.length ? this.each(cw(o, n)) : Wt(this.node(), o).ease;
}
function dw(n, o) {
  return function() {
    var i = o.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    nn(this, n).ease = i;
  };
}
function hw(n) {
  if (typeof n != "function") throw new Error();
  return this.each(dw(this._id, n));
}
function pw(n) {
  typeof n != "function" && (n = qh(n));
  for (var o = this._groups, i = o.length, s = new Array(i), u = 0; u < i; ++u)
    for (var c = o[u], f = c.length, h = s[u] = [], p, y = 0; y < f; ++y)
      (p = c[y]) && n.call(p, p.__data__, y, c) && h.push(p);
  return new gn(s, this._parents, this._name, this._id);
}
function mw(n) {
  if (n._id !== this._id) throw new Error();
  for (var o = this._groups, i = n._groups, s = o.length, u = i.length, c = Math.min(s, u), f = new Array(s), h = 0; h < c; ++h)
    for (var p = o[h], y = i[h], g = p.length, v = f[h] = new Array(g), m, x = 0; x < g; ++x)
      (m = p[x] || y[x]) && (v[x] = m);
  for (; h < s; ++h)
    f[h] = o[h];
  return new gn(f, this._parents, this._name, this._id);
}
function gw(n) {
  return (n + "").trim().split(/^|\s+/).every(function(o) {
    var i = o.indexOf(".");
    return i >= 0 && (o = o.slice(0, i)), !o || o === "start";
  });
}
function yw(n, o, i) {
  var s, u, c = gw(o) ? Ga : nn;
  return function() {
    var f = c(this, n), h = f.on;
    h !== s && (u = (s = h).copy()).on(o, i), f.on = u;
  };
}
function vw(n, o) {
  var i = this._id;
  return arguments.length < 2 ? Wt(this.node(), i).on.on(n) : this.each(yw(i, n, o));
}
function ww(n) {
  return function() {
    var o = this.parentNode;
    for (var i in this.__transition) if (+i !== n) return;
    o && o.removeChild(this);
  };
}
function xw() {
  return this.on("end.remove", ww(this._id));
}
function Sw(n) {
  var o = this._name, i = this._id;
  typeof n != "function" && (n = Ya(n));
  for (var s = this._groups, u = s.length, c = new Array(u), f = 0; f < u; ++f)
    for (var h = s[f], p = h.length, y = c[f] = new Array(p), g, v, m = 0; m < p; ++m)
      (g = h[m]) && (v = n.call(g, g.__data__, m, h)) && ("__data__" in g && (v.__data__ = g.__data__), y[m] = v, fs(y[m], o, i, m, y, Wt(g, i)));
  return new gn(c, this._parents, o, i);
}
function Ew(n) {
  var o = this._name, i = this._id;
  typeof n != "function" && (n = Gh(n));
  for (var s = this._groups, u = s.length, c = [], f = [], h = 0; h < u; ++h)
    for (var p = s[h], y = p.length, g, v = 0; v < y; ++v)
      if (g = p[v]) {
        for (var m = n.call(g, g.__data__, v, p), x, k = Wt(g, i), E = 0, C = m.length; E < C; ++E)
          (x = m[E]) && fs(x, o, i, E, m, k);
        c.push(m), f.push(g);
      }
  return new gn(c, f, o, i);
}
var _w = hi.prototype.constructor;
function kw() {
  return new _w(this._groups, this._parents);
}
function Cw(n, o) {
  var i, s, u;
  return function() {
    var c = Gr(this, n), f = (this.style.removeProperty(n), Gr(this, n));
    return c === f ? null : c === i && f === s ? u : u = o(i = c, s = f);
  };
}
function Sp(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Nw(n, o, i) {
  var s, u = i + "", c;
  return function() {
    var f = Gr(this, n);
    return f === u ? null : f === s ? c : c = o(s = f, i);
  };
}
function Mw(n, o, i) {
  var s, u, c;
  return function() {
    var f = Gr(this, n), h = i(this), p = h + "";
    return h == null && (p = h = (this.style.removeProperty(n), Gr(this, n))), f === p ? null : f === s && p === u ? c : (u = p, c = o(s = f, h));
  };
}
function Pw(n, o) {
  var i, s, u, c = "style." + o, f = "end." + c, h;
  return function() {
    var p = nn(this, n), y = p.on, g = p.value[c] == null ? h || (h = Sp(o)) : void 0;
    (y !== i || u !== g) && (s = (i = y).copy()).on(f, u = g), p.on = s;
  };
}
function Tw(n, o, i) {
  var s = (n += "") == "transform" ? Lv : xp;
  return o == null ? this.styleTween(n, Cw(n, s)).on("end.style." + n, Sp(n)) : typeof o == "function" ? this.styleTween(n, Mw(n, s, qa(this, "style." + n, o))).each(Pw(this._id, n)) : this.styleTween(n, Nw(n, s, o), i).on("end.style." + n, null);
}
function Lw(n, o, i) {
  return function(s) {
    this.style.setProperty(n, o.call(this, s), i);
  };
}
function zw(n, o, i) {
  var s, u;
  function c() {
    var f = o.apply(this, arguments);
    return f !== u && (s = (u = f) && Lw(n, f, i)), s;
  }
  return c._value = o, c;
}
function Iw(n, o, i) {
  var s = "style." + (n += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (o == null) return this.tween(s, null);
  if (typeof o != "function") throw new Error();
  return this.tween(s, zw(n, o, i ?? ""));
}
function Rw(n) {
  return function() {
    this.textContent = n;
  };
}
function Aw(n) {
  return function() {
    var o = n(this);
    this.textContent = o ?? "";
  };
}
function $w(n) {
  return this.tween("text", typeof n == "function" ? Aw(qa(this, "text", n)) : Rw(n == null ? "" : n + ""));
}
function Dw(n) {
  return function(o) {
    this.textContent = n.call(this, o);
  };
}
function Ow(n) {
  var o, i;
  function s() {
    var u = n.apply(this, arguments);
    return u !== i && (o = (i = u) && Dw(u)), o;
  }
  return s._value = n, s;
}
function Fw(n) {
  var o = "text";
  if (arguments.length < 1) return (o = this.tween(o)) && o._value;
  if (n == null) return this.tween(o, null);
  if (typeof n != "function") throw new Error();
  return this.tween(o, Ow(n));
}
function Hw() {
  for (var n = this._name, o = this._id, i = Ep(), s = this._groups, u = s.length, c = 0; c < u; ++c)
    for (var f = s[c], h = f.length, p, y = 0; y < h; ++y)
      if (p = f[y]) {
        var g = Wt(p, o);
        fs(p, n, i, y, f, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new gn(s, this._parents, n, i);
}
function jw() {
  var n, o, i = this, s = i._id, u = i.size();
  return new Promise(function(c, f) {
    var h = { value: f }, p = { value: function() {
      --u === 0 && c();
    } };
    i.each(function() {
      var y = nn(this, s), g = y.on;
      g !== n && (o = (n = g).copy(), o._.cancel.push(h), o._.interrupt.push(h), o._.end.push(p)), y.on = o;
    }), u === 0 && c();
  });
}
var Vw = 0;
function gn(n, o, i, s) {
  this._groups = n, this._parents = o, this._name = i, this._id = s;
}
function Ep() {
  return ++Vw;
}
var pn = hi.prototype;
gn.prototype = {
  constructor: gn,
  select: Sw,
  selectAll: Ew,
  selectChild: pn.selectChild,
  selectChildren: pn.selectChildren,
  filter: pw,
  merge: mw,
  selection: kw,
  transition: Hw,
  call: pn.call,
  nodes: pn.nodes,
  node: pn.node,
  size: pn.size,
  empty: pn.empty,
  each: pn.each,
  on: vw,
  attr: Zv,
  attrTween: rw,
  style: Tw,
  styleTween: Iw,
  text: $w,
  textTween: Fw,
  remove: xw,
  tween: Yv,
  delay: lw,
  duration: aw,
  ease: fw,
  easeVarying: hw,
  end: jw,
  [Symbol.iterator]: pn[Symbol.iterator]
};
function Bw(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var Uw = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Bw
};
function Ww(n, o) {
  for (var i; !(i = n.__transition) || !(i = i[o]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${o} not found`);
  return i;
}
function Yw(n) {
  var o, i;
  n instanceof gn ? (o = n._id, n = n._name) : (o = Ep(), (i = Uw).time = Ka(), n = n == null ? null : n + "");
  for (var s = this._groups, u = s.length, c = 0; c < u; ++c)
    for (var f = s[c], h = f.length, p, y = 0; y < h; ++y)
      (p = f[y]) && fs(p, n, o, y, f, i || Ww(p, o));
  return new gn(s, this._parents, n, o);
}
hi.prototype.interrupt = Bv;
hi.prototype.transition = Yw;
const jl = (n) => () => n;
function Xw(n, {
  sourceEvent: o,
  target: i,
  transform: s,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: o, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: s, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
function mn(n, o, i) {
  this.k = n, this.x = o, this.y = i;
}
mn.prototype = {
  constructor: mn,
  scale: function(n) {
    return n === 1 ? this : new mn(this.k * n, this.x, this.y);
  },
  translate: function(n, o) {
    return n === 0 & o === 0 ? this : new mn(this.k, this.x + this.k * n, this.y + this.k * o);
  },
  apply: function(n) {
    return [n[0] * this.k + this.x, n[1] * this.k + this.y];
  },
  applyX: function(n) {
    return n * this.k + this.x;
  },
  applyY: function(n) {
    return n * this.k + this.y;
  },
  invert: function(n) {
    return [(n[0] - this.x) / this.k, (n[1] - this.y) / this.k];
  },
  invertX: function(n) {
    return (n - this.x) / this.k;
  },
  invertY: function(n) {
    return (n - this.y) / this.k;
  },
  rescaleX: function(n) {
    return n.copy().domain(n.range().map(this.invertX, this).map(n.invert, n));
  },
  rescaleY: function(n) {
    return n.copy().domain(n.range().map(this.invertY, this).map(n.invert, n));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var ds = new mn(1, 0, 0);
_p.prototype = mn.prototype;
function _p(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return ds;
  return n.__zoom;
}
function Sa(n) {
  n.stopImmediatePropagation();
}
function qo(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function bw(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function Qw() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function rh() {
  return this.__zoom || ds;
}
function Kw(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function Gw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function qw(n, o, i) {
  var s = n.invertX(o[0][0]) - i[0][0], u = n.invertX(o[1][0]) - i[1][0], c = n.invertY(o[0][1]) - i[0][1], f = n.invertY(o[1][1]) - i[1][1];
  return n.translate(
    u > s ? (s + u) / 2 : Math.min(0, s) || Math.max(0, u),
    f > c ? (c + f) / 2 : Math.min(0, c) || Math.max(0, f)
  );
}
function kp() {
  var n = bw, o = Qw, i = qw, s = Kw, u = Gw, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, p = bl, y = us("start", "zoom", "end"), g, v, m, x = 500, k = 150, E = 0, C = 10;
  function N(P) {
    P.property("__zoom", rh).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", Z).on("dblclick.zoom", ie).filter(u).on("touchstart.zoom", G).on("touchmove.zoom", J).on("touchend.zoom touchcancel.zoom", q).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(P, V, $, H) {
    var R = P.selection ? P.selection() : P;
    R.property("__zoom", rh), P !== R ? I(P, V, $, H) : R.interrupt().each(function() {
      j(this, arguments).event(H).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, N.scaleBy = function(P, V, $, H) {
    N.scaleTo(P, function() {
      var R = this.__zoom.k, L = typeof V == "function" ? V.apply(this, arguments) : V;
      return R * L;
    }, $, H);
  }, N.scaleTo = function(P, V, $, H) {
    N.transform(P, function() {
      var R = o.apply(this, arguments), L = this.__zoom, D = $ == null ? M(R) : typeof $ == "function" ? $.apply(this, arguments) : $, _ = L.invert(D), F = typeof V == "function" ? V.apply(this, arguments) : V;
      return i(S(O(L, F), D, _), R, f);
    }, $, H);
  }, N.translateBy = function(P, V, $, H) {
    N.transform(P, function() {
      return i(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof $ == "function" ? $.apply(this, arguments) : $
      ), o.apply(this, arguments), f);
    }, null, H);
  }, N.translateTo = function(P, V, $, H, R) {
    N.transform(P, function() {
      var L = o.apply(this, arguments), D = this.__zoom, _ = H == null ? M(L) : typeof H == "function" ? H.apply(this, arguments) : H;
      return i(ds.translate(_[0], _[1]).scale(D.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof $ == "function" ? -$.apply(this, arguments) : -$
      ), L, f);
    }, H, R);
  };
  function O(P, V) {
    return V = Math.max(c[0], Math.min(c[1], V)), V === P.k ? P : new mn(V, P.x, P.y);
  }
  function S(P, V, $) {
    var H = V[0] - $[0] * P.k, R = V[1] - $[1] * P.k;
    return H === P.x && R === P.y ? P : new mn(P.k, H, R);
  }
  function M(P) {
    return [(+P[0][0] + +P[1][0]) / 2, (+P[0][1] + +P[1][1]) / 2];
  }
  function I(P, V, $, H) {
    P.on("start.zoom", function() {
      j(this, arguments).event(H).start();
    }).on("interrupt.zoom end.zoom", function() {
      j(this, arguments).event(H).end();
    }).tween("zoom", function() {
      var R = this, L = arguments, D = j(R, L).event(H), _ = o.apply(R, L), F = $ == null ? M(_) : typeof $ == "function" ? $.apply(R, L) : $, ne = Math.max(_[1][0] - _[0][0], _[1][1] - _[0][1]), ee = R.__zoom, ae = typeof V == "function" ? V.apply(R, L) : V, fe = p(ee.invert(F).concat(ne / ee.k), ae.invert(F).concat(ne / ae.k));
      return function(de) {
        if (de === 1) de = ae;
        else {
          var oe = fe(de), b = ne / oe[2];
          de = new mn(b, F[0] - oe[0] * b, F[1] - oe[1] * b);
        }
        D.zoom(null, de);
      };
    });
  }
  function j(P, V, $) {
    return !$ && P.__zooming || new B(P, V);
  }
  function B(P, V) {
    this.that = P, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = o.apply(P, V), this.taps = 0;
  }
  B.prototype = {
    event: function(P) {
      return P && (this.sourceEvent = P), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(P, V) {
      return this.mouse && P !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && P !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && P !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(P) {
      var V = Et(this.that).datum();
      y.call(
        P,
        this.that,
        new Xw(P, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: y
        }),
        V
      );
    }
  };
  function W(P, ...V) {
    if (!n.apply(this, arguments)) return;
    var $ = j(this, V).event(P), H = this.__zoom, R = Math.max(c[0], Math.min(c[1], H.k * Math.pow(2, s.apply(this, arguments)))), L = Vt(P);
    if ($.wheel)
      ($.mouse[0][0] !== L[0] || $.mouse[0][1] !== L[1]) && ($.mouse[1] = H.invert($.mouse[0] = L)), clearTimeout($.wheel);
    else {
      if (H.k === R) return;
      $.mouse = [L, H.invert(L)], Gl(this), $.start();
    }
    qo(P), $.wheel = setTimeout(D, k), $.zoom("mouse", i(S(O(H, R), $.mouse[0], $.mouse[1]), $.extent, f));
    function D() {
      $.wheel = null, $.end();
    }
  }
  function Z(P, ...V) {
    if (m || !n.apply(this, arguments)) return;
    var $ = P.currentTarget, H = j(this, V, !0).event(P), R = Et(P.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", ne, !0), L = Vt(P, $), D = P.clientX, _ = P.clientY;
    sp(P.view), Sa(P), H.mouse = [L, this.__zoom.invert(L)], Gl(this), H.start();
    function F(ee) {
      if (qo(ee), !H.moved) {
        var ae = ee.clientX - D, fe = ee.clientY - _;
        H.moved = ae * ae + fe * fe > E;
      }
      H.event(ee).zoom("mouse", i(S(H.that.__zoom, H.mouse[0] = Vt(ee, $), H.mouse[1]), H.extent, f));
    }
    function ne(ee) {
      R.on("mousemove.zoom mouseup.zoom", null), up(ee.view, H.moved), qo(ee), H.event(ee).end();
    }
  }
  function ie(P, ...V) {
    if (n.apply(this, arguments)) {
      var $ = this.__zoom, H = Vt(P.changedTouches ? P.changedTouches[0] : P, this), R = $.invert(H), L = $.k * (P.shiftKey ? 0.5 : 2), D = i(S(O($, L), H, R), o.apply(this, V), f);
      qo(P), h > 0 ? Et(this).transition().duration(h).call(I, D, H, P) : Et(this).call(N.transform, D, H, P);
    }
  }
  function G(P, ...V) {
    if (n.apply(this, arguments)) {
      var $ = P.touches, H = $.length, R = j(this, V, P.changedTouches.length === H).event(P), L, D, _, F;
      for (Sa(P), D = 0; D < H; ++D)
        _ = $[D], F = Vt(_, this), F = [F, this.__zoom.invert(F), _.identifier], R.touch0 ? !R.touch1 && R.touch0[2] !== F[2] && (R.touch1 = F, R.taps = 0) : (R.touch0 = F, L = !0, R.taps = 1 + !!g);
      g && (g = clearTimeout(g)), L && (R.taps < 2 && (v = F[0], g = setTimeout(function() {
        g = null;
      }, x)), Gl(this), R.start());
    }
  }
  function J(P, ...V) {
    if (this.__zooming) {
      var $ = j(this, V).event(P), H = P.changedTouches, R = H.length, L, D, _, F;
      for (qo(P), L = 0; L < R; ++L)
        D = H[L], _ = Vt(D, this), $.touch0 && $.touch0[2] === D.identifier ? $.touch0[0] = _ : $.touch1 && $.touch1[2] === D.identifier && ($.touch1[0] = _);
      if (D = $.that.__zoom, $.touch1) {
        var ne = $.touch0[0], ee = $.touch0[1], ae = $.touch1[0], fe = $.touch1[1], de = (de = ae[0] - ne[0]) * de + (de = ae[1] - ne[1]) * de, oe = (oe = fe[0] - ee[0]) * oe + (oe = fe[1] - ee[1]) * oe;
        D = O(D, Math.sqrt(de / oe)), _ = [(ne[0] + ae[0]) / 2, (ne[1] + ae[1]) / 2], F = [(ee[0] + fe[0]) / 2, (ee[1] + fe[1]) / 2];
      } else if ($.touch0) _ = $.touch0[0], F = $.touch0[1];
      else return;
      $.zoom("touch", i(S(D, _, F), $.extent, f));
    }
  }
  function q(P, ...V) {
    if (this.__zooming) {
      var $ = j(this, V).event(P), H = P.changedTouches, R = H.length, L, D;
      for (Sa(P), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, x), L = 0; L < R; ++L)
        D = H[L], $.touch0 && $.touch0[2] === D.identifier ? delete $.touch0 : $.touch1 && $.touch1[2] === D.identifier && delete $.touch1;
      if ($.touch1 && !$.touch0 && ($.touch0 = $.touch1, delete $.touch1), $.touch0) $.touch0[1] = this.__zoom.invert($.touch0[0]);
      else if ($.end(), $.taps === 2 && (D = Vt(D, this), Math.hypot(v[0] - D[0], v[1] - D[1]) < C)) {
        var _ = Et(this).on("dblclick.zoom");
        _ && _.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(P) {
    return arguments.length ? (s = typeof P == "function" ? P : jl(+P), N) : s;
  }, N.filter = function(P) {
    return arguments.length ? (n = typeof P == "function" ? P : jl(!!P), N) : n;
  }, N.touchable = function(P) {
    return arguments.length ? (u = typeof P == "function" ? P : jl(!!P), N) : u;
  }, N.extent = function(P) {
    return arguments.length ? (o = typeof P == "function" ? P : jl([[+P[0][0], +P[0][1]], [+P[1][0], +P[1][1]]]), N) : o;
  }, N.scaleExtent = function(P) {
    return arguments.length ? (c[0] = +P[0], c[1] = +P[1], N) : [c[0], c[1]];
  }, N.translateExtent = function(P) {
    return arguments.length ? (f[0][0] = +P[0][0], f[1][0] = +P[1][0], f[0][1] = +P[0][1], f[1][1] = +P[1][1], N) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, N.constrain = function(P) {
    return arguments.length ? (i = P, N) : i;
  }, N.duration = function(P) {
    return arguments.length ? (h = +P, N) : h;
  }, N.interpolate = function(P) {
    return arguments.length ? (p = P, N) : p;
  }, N.on = function() {
    var P = y.on.apply(y, arguments);
    return P === y ? N : P;
  }, N.clickDistance = function(P) {
    return arguments.length ? (E = (P = +P) * P, N) : Math.sqrt(E);
  }, N.tapDistance = function(P) {
    return arguments.length ? (C = +P, N) : C;
  }, N;
}
const tn = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (n) => `Node type "${n}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (n) => `The old edge with id=${n} does not exist.`,
  error009: (n) => `Marker type "${n}" doesn't exist.`,
  error008: (n, { id: o, sourceHandle: i, targetHandle: s }) => `Couldn't create edge for ${n} handle id: "${n === "source" ? i : s}", edge id: ${o}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (n) => `Edge type "${n}" not found. Using fallback type "default".`,
  error012: (n) => `Node with id "${n}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (n = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${n}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."
}, li = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Cp = ["Enter", " ", "Escape"], Np = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: n, x: o, y: i }) => `Moved selected node ${n}. New position, x: ${o}, y: ${i}`,
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
var Zr;
(function(n) {
  n.Strict = "strict", n.Loose = "loose";
})(Zr || (Zr = {}));
var hr;
(function(n) {
  n.Free = "free", n.Vertical = "vertical", n.Horizontal = "horizontal";
})(hr || (hr = {}));
var si;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(si || (si = {}));
const Mp = {
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
var Bn;
(function(n) {
  n.Bezier = "default", n.Straight = "straight", n.Step = "step", n.SmoothStep = "smoothstep", n.SimpleBezier = "simplebezier";
})(Bn || (Bn = {}));
var ui;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})(ui || (ui = {}));
var Ee;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(Ee || (Ee = {}));
const oh = {
  [Ee.Left]: Ee.Right,
  [Ee.Right]: Ee.Left,
  [Ee.Top]: Ee.Bottom,
  [Ee.Bottom]: Ee.Top
};
function Pp(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const Tp = (n) => "id" in n && "source" in n && "target" in n, Zw = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), Za = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), mi = (n, o = [0, 0]) => {
  const { width: i, height: s } = yn(n), u = n.origin ?? o, c = i * u[0], f = s * u[1];
  return {
    x: n.position.x - c,
    y: n.position.y - f
  };
}, Jw = (n, o = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = n.reduce((s, u) => {
    const c = typeof u == "string";
    let f = !o.nodeLookup && !c ? u : void 0;
    o.nodeLookup && (f = c ? o.nodeLookup.get(u) : Za(u) ? u : o.nodeLookup.get(u.id));
    const h = f ? os(f, o.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return hs(s, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return ps(i);
}, gi = (n, o = {}) => {
  if (n.size === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 };
  return n.forEach((s) => {
    if (o.filter === void 0 || o.filter(s)) {
      const u = os(s);
      i = hs(i, u);
    }
  }), ps(i);
}, Ja = (n, o, [i, s, u] = [0, 0, 1], c = !1, f = !1) => {
  const h = {
    ...yi(o, [i, s, u]),
    width: o.width / u,
    height: o.height / u
  }, p = [];
  for (const y of n.values()) {
    const { measured: g, selectable: v = !0, hidden: m = !1 } = y;
    if (f && !v || m)
      continue;
    const x = g.width ?? y.width ?? y.initialWidth ?? null, k = g.height ?? y.height ?? y.initialHeight ?? null, E = ai(h, eo(y)), C = (x ?? 0) * (k ?? 0), N = c && E > 0;
    (!y.internals.handleBounds || N || E >= C || y.dragging) && p.push(y);
  }
  return p;
}, e1 = (n, o) => {
  const i = /* @__PURE__ */ new Set();
  return n.forEach((s) => {
    i.add(s.id);
  }), o.filter((s) => i.has(s.source) || i.has(s.target));
};
function t1(n, o) {
  const i = /* @__PURE__ */ new Map(), s = o != null && o.nodes ? new Set(o.nodes.map((u) => u.id)) : null;
  return n.forEach((u) => {
    u.measured.width && u.measured.height && ((o == null ? void 0 : o.includeHiddenNodes) || !u.hidden) && (!s || s.has(u.id)) && i.set(u.id, u);
  }), i;
}
async function n1({ nodes: n, width: o, height: i, panZoom: s, minZoom: u, maxZoom: c }, f) {
  if (n.size === 0)
    return Promise.resolve(!0);
  const h = t1(n, f), p = gi(h), y = ec(p, o, i, (f == null ? void 0 : f.minZoom) ?? u, (f == null ? void 0 : f.maxZoom) ?? c, (f == null ? void 0 : f.padding) ?? 0.1);
  return await s.setViewport(y, {
    duration: f == null ? void 0 : f.duration,
    ease: f == null ? void 0 : f.ease,
    interpolate: f == null ? void 0 : f.interpolate
  }), Promise.resolve(!0);
}
function Lp({ nodeId: n, nextPosition: o, nodeLookup: i, nodeOrigin: s = [0, 0], nodeExtent: u, onError: c }) {
  const f = i.get(n), h = f.parentId ? i.get(f.parentId) : void 0, { x: p, y } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, g = f.origin ?? s;
  let v = u;
  if (f.extent === "parent" && !f.expandParent)
    if (!h)
      c == null || c("005", tn.error005());
    else {
      const x = h.measured.width, k = h.measured.height;
      x && k && (v = [
        [p, y],
        [p + x, y + k]
      ]);
    }
  else h && to(f.extent) && (v = [
    [f.extent[0][0] + p, f.extent[0][1] + y],
    [f.extent[1][0] + p, f.extent[1][1] + y]
  ]);
  const m = to(v) ? gr(o, v, f.measured) : o;
  return (f.measured.width === void 0 || f.measured.height === void 0) && (c == null || c("015", tn.error015())), {
    position: {
      x: m.x - p + (f.measured.width ?? 0) * g[0],
      y: m.y - y + (f.measured.height ?? 0) * g[1]
    },
    positionAbsolute: m
  };
}
async function r1({ nodesToRemove: n = [], edgesToRemove: o = [], nodes: i, edges: s, onBeforeDelete: u }) {
  const c = new Set(n.map((m) => m.id)), f = [];
  for (const m of i) {
    if (m.deletable === !1)
      continue;
    const x = c.has(m.id), k = !x && m.parentId && f.find((E) => E.id === m.parentId);
    (x || k) && f.push(m);
  }
  const h = new Set(o.map((m) => m.id)), p = s.filter((m) => m.deletable !== !1), g = e1(f, p);
  for (const m of p)
    h.has(m.id) && !g.find((k) => k.id === m.id) && g.push(m);
  if (!u)
    return {
      edges: g,
      nodes: f
    };
  const v = await u({
    nodes: f,
    edges: g
  });
  return typeof v == "boolean" ? v ? { edges: g, nodes: f } : { edges: [], nodes: [] } : v;
}
const Jr = (n, o = 0, i = 1) => Math.min(Math.max(n, o), i), gr = (n = { x: 0, y: 0 }, o, i) => ({
  x: Jr(n.x, o[0][0], o[1][0] - ((i == null ? void 0 : i.width) ?? 0)),
  y: Jr(n.y, o[0][1], o[1][1] - ((i == null ? void 0 : i.height) ?? 0))
});
function zp(n, o, i) {
  const { width: s, height: u } = yn(i), { x: c, y: f } = i.internals.positionAbsolute;
  return gr(n, [
    [c, f],
    [c + s, f + u]
  ], o);
}
const ih = (n, o, i) => n < o ? Jr(Math.abs(n - o), 1, o) / o : n > i ? -Jr(Math.abs(n - i), 1, o) / o : 0, Ip = (n, o, i = 15, s = 40) => {
  const u = ih(n.x, s, o.width - s) * i, c = ih(n.y, s, o.height - s) * i;
  return [u, c];
}, hs = (n, o) => ({
  x: Math.min(n.x, o.x),
  y: Math.min(n.y, o.y),
  x2: Math.max(n.x2, o.x2),
  y2: Math.max(n.y2, o.y2)
}), Ha = ({ x: n, y: o, width: i, height: s }) => ({
  x: n,
  y: o,
  x2: n + i,
  y2: o + s
}), ps = ({ x: n, y: o, x2: i, y2: s }) => ({
  x: n,
  y: o,
  width: i - n,
  height: s - o
}), eo = (n, o = [0, 0]) => {
  var u, c;
  const { x: i, y: s } = Za(n) ? n.internals.positionAbsolute : mi(n, o);
  return {
    x: i,
    y: s,
    width: ((u = n.measured) == null ? void 0 : u.width) ?? n.width ?? n.initialWidth ?? 0,
    height: ((c = n.measured) == null ? void 0 : c.height) ?? n.height ?? n.initialHeight ?? 0
  };
}, os = (n, o = [0, 0]) => {
  var u, c;
  const { x: i, y: s } = Za(n) ? n.internals.positionAbsolute : mi(n, o);
  return {
    x: i,
    y: s,
    x2: i + (((u = n.measured) == null ? void 0 : u.width) ?? n.width ?? n.initialWidth ?? 0),
    y2: s + (((c = n.measured) == null ? void 0 : c.height) ?? n.height ?? n.initialHeight ?? 0)
  };
}, Rp = (n, o) => ps(hs(Ha(n), Ha(o))), ai = (n, o) => {
  const i = Math.max(0, Math.min(n.x + n.width, o.x + o.width) - Math.max(n.x, o.x)), s = Math.max(0, Math.min(n.y + n.height, o.y + o.height) - Math.max(n.y, o.y));
  return Math.ceil(i * s);
}, lh = (n) => Ut(n.width) && Ut(n.height) && Ut(n.x) && Ut(n.y), Ut = (n) => !isNaN(n) && isFinite(n), o1 = (n, o) => {
}, ms = (n, o = [1, 1]) => ({
  x: o[0] * Math.round(n.x / o[0]),
  y: o[1] * Math.round(n.y / o[1])
}), yi = ({ x: n, y: o }, [i, s, u], c = !1, f = [1, 1]) => {
  const h = {
    x: (n - i) / u,
    y: (o - s) / u
  };
  return c ? ms(h, f) : h;
}, is = ({ x: n, y: o }, [i, s, u]) => ({
  x: n * u + i,
  y: o * u + s
});
function Yr(n, o) {
  if (typeof n == "number")
    return Math.floor((o - o / (1 + n)) * 0.5);
  if (typeof n == "string" && n.endsWith("px")) {
    const i = parseFloat(n);
    if (!Number.isNaN(i))
      return Math.floor(i);
  }
  if (typeof n == "string" && n.endsWith("%")) {
    const i = parseFloat(n);
    if (!Number.isNaN(i))
      return Math.floor(o * i * 0.01);
  }
  return console.error(`[React Flow] The padding value "${n}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function i1(n, o, i) {
  if (typeof n == "string" || typeof n == "number") {
    const s = Yr(n, i), u = Yr(n, o);
    return {
      top: s,
      right: u,
      bottom: s,
      left: u,
      x: u * 2,
      y: s * 2
    };
  }
  if (typeof n == "object") {
    const s = Yr(n.top ?? n.y ?? 0, i), u = Yr(n.bottom ?? n.y ?? 0, i), c = Yr(n.left ?? n.x ?? 0, o), f = Yr(n.right ?? n.x ?? 0, o);
    return { top: s, right: f, bottom: u, left: c, x: c + f, y: s + u };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function l1(n, o, i, s, u, c) {
  const { x: f, y: h } = is(n, [o, i, s]), { x: p, y } = is({ x: n.x + n.width, y: n.y + n.height }, [o, i, s]), g = u - p, v = c - y;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(g),
    bottom: Math.floor(v)
  };
}
const ec = (n, o, i, s, u, c) => {
  const f = i1(c, o, i), h = (o - f.x) / n.width, p = (i - f.y) / n.height, y = Math.min(h, p), g = Jr(y, s, u), v = n.x + n.width / 2, m = n.y + n.height / 2, x = o / 2 - v * g, k = i / 2 - m * g, E = l1(n, x, k, g, o, i), C = {
    left: Math.min(E.left - f.left, 0),
    top: Math.min(E.top - f.top, 0),
    right: Math.min(E.right - f.right, 0),
    bottom: Math.min(E.bottom - f.bottom, 0)
  };
  return {
    x: x - C.left + C.right,
    y: k - C.top + C.bottom,
    zoom: g
  };
}, ls = () => {
  var n;
  return typeof navigator < "u" && ((n = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : n.indexOf("Mac")) >= 0;
};
function to(n) {
  return n !== void 0 && n !== "parent";
}
function yn(n) {
  var o, i;
  return {
    width: ((o = n.measured) == null ? void 0 : o.width) ?? n.width ?? n.initialWidth ?? 0,
    height: ((i = n.measured) == null ? void 0 : i.height) ?? n.height ?? n.initialHeight ?? 0
  };
}
function Ap(n) {
  var o, i;
  return (((o = n.measured) == null ? void 0 : o.width) ?? n.width ?? n.initialWidth) !== void 0 && (((i = n.measured) == null ? void 0 : i.height) ?? n.height ?? n.initialHeight) !== void 0;
}
function $p(n, o = { width: 0, height: 0 }, i, s, u) {
  const c = { ...n }, f = s.get(i);
  if (f) {
    const h = f.origin || u;
    c.x += f.internals.positionAbsolute.x - (o.width ?? 0) * h[0], c.y += f.internals.positionAbsolute.y - (o.height ?? 0) * h[1];
  }
  return c;
}
function sh(n, o) {
  if (n.size !== o.size)
    return !1;
  for (const i of n)
    if (!o.has(i))
      return !1;
  return !0;
}
function s1() {
  let n, o;
  return { promise: new Promise((s, u) => {
    n = s, o = u;
  }), resolve: n, reject: o };
}
function u1(n) {
  return { ...Np, ...n || {} };
}
function ti(n, { snapGrid: o = [0, 0], snapToGrid: i = !1, transform: s, containerBounds: u }) {
  const { x: c, y: f } = Jt(n), h = yi({ x: c - ((u == null ? void 0 : u.left) ?? 0), y: f - ((u == null ? void 0 : u.top) ?? 0) }, s), { x: p, y } = i ? ms(h, o) : h;
  return {
    xSnapped: p,
    ySnapped: y,
    ...h
  };
}
const tc = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), Dp = (n) => {
  var o;
  return ((o = n == null ? void 0 : n.getRootNode) == null ? void 0 : o.call(n)) || (window == null ? void 0 : window.document);
}, a1 = ["INPUT", "SELECT", "TEXTAREA"];
function Op(n) {
  var s, u;
  const o = ((u = (s = n.composedPath) == null ? void 0 : s.call(n)) == null ? void 0 : u[0]) || n.target;
  return (o == null ? void 0 : o.nodeType) !== 1 ? !1 : a1.includes(o.nodeName) || o.hasAttribute("contenteditable") || !!o.closest(".nokey");
}
const Fp = (n) => "clientX" in n, Jt = (n, o) => {
  var c, f;
  const i = Fp(n), s = i ? n.clientX : (c = n.touches) == null ? void 0 : c[0].clientX, u = i ? n.clientY : (f = n.touches) == null ? void 0 : f[0].clientY;
  return {
    x: s - ((o == null ? void 0 : o.left) ?? 0),
    y: u - ((o == null ? void 0 : o.top) ?? 0)
  };
}, uh = (n, o, i, s, u) => {
  const c = o.querySelectorAll(`.${n}`);
  return !c || !c.length ? null : Array.from(c).map((f) => {
    const h = f.getBoundingClientRect();
    return {
      id: f.getAttribute("data-handleid"),
      type: n,
      nodeId: u,
      position: f.getAttribute("data-handlepos"),
      x: (h.left - i.left) / s,
      y: (h.top - i.top) / s,
      ...tc(f)
    };
  });
};
function Hp({ sourceX: n, sourceY: o, targetX: i, targetY: s, sourceControlX: u, sourceControlY: c, targetControlX: f, targetControlY: h }) {
  const p = n * 0.125 + u * 0.375 + f * 0.375 + i * 0.125, y = o * 0.125 + c * 0.375 + h * 0.375 + s * 0.125, g = Math.abs(p - n), v = Math.abs(y - o);
  return [p, y, g, v];
}
function Vl(n, o) {
  return n >= 0 ? 0.5 * n : o * 25 * Math.sqrt(-n);
}
function ah({ pos: n, x1: o, y1: i, x2: s, y2: u, c }) {
  switch (n) {
    case Ee.Left:
      return [o - Vl(o - s, c), i];
    case Ee.Right:
      return [o + Vl(s - o, c), i];
    case Ee.Top:
      return [o, i - Vl(i - u, c)];
    case Ee.Bottom:
      return [o, i + Vl(u - i, c)];
  }
}
function nc({ sourceX: n, sourceY: o, sourcePosition: i = Ee.Bottom, targetX: s, targetY: u, targetPosition: c = Ee.Top, curvature: f = 0.25 }) {
  const [h, p] = ah({
    pos: i,
    x1: n,
    y1: o,
    x2: s,
    y2: u,
    c: f
  }), [y, g] = ah({
    pos: c,
    x1: s,
    y1: u,
    x2: n,
    y2: o,
    c: f
  }), [v, m, x, k] = Hp({
    sourceX: n,
    sourceY: o,
    targetX: s,
    targetY: u,
    sourceControlX: h,
    sourceControlY: p,
    targetControlX: y,
    targetControlY: g
  });
  return [
    `M${n},${o} C${h},${p} ${y},${g} ${s},${u}`,
    v,
    m,
    x,
    k
  ];
}
function jp({ sourceX: n, sourceY: o, targetX: i, targetY: s }) {
  const u = Math.abs(i - n) / 2, c = i < n ? i + u : i - u, f = Math.abs(s - o) / 2, h = s < o ? s + f : s - f;
  return [c, h, u, f];
}
function c1({ sourceNode: n, targetNode: o, selected: i = !1, zIndex: s, elevateOnSelect: u = !1 }) {
  if (s !== void 0)
    return s;
  const c = u && i ? 1e3 : 0, f = Math.max(n.parentId ? n.internals.z : 0, o.parentId ? o.internals.z : 0);
  return c + f;
}
function f1({ sourceNode: n, targetNode: o, width: i, height: s, transform: u }) {
  const c = hs(os(n), os(o));
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const f = {
    x: -u[0] / u[2],
    y: -u[1] / u[2],
    width: i / u[2],
    height: s / u[2]
  };
  return ai(f, ps(c)) > 0;
}
const d1 = ({ source: n, sourceHandle: o, target: i, targetHandle: s }) => `xy-edge__${n}${o || ""}-${i}${s || ""}`, h1 = (n, o) => o.some((i) => i.source === n.source && i.target === n.target && (i.sourceHandle === n.sourceHandle || !i.sourceHandle && !n.sourceHandle) && (i.targetHandle === n.targetHandle || !i.targetHandle && !n.targetHandle)), p1 = (n, o) => {
  if (!n.source || !n.target)
    return o;
  let i;
  return Tp(n) ? i = { ...n } : i = {
    ...n,
    id: d1(n)
  }, h1(i, o) ? o : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, o.concat(i));
};
function Vp({ sourceX: n, sourceY: o, targetX: i, targetY: s }) {
  const [u, c, f, h] = jp({
    sourceX: n,
    sourceY: o,
    targetX: i,
    targetY: s
  });
  return [`M ${n},${o}L ${i},${s}`, u, c, f, h];
}
const ch = {
  [Ee.Left]: { x: -1, y: 0 },
  [Ee.Right]: { x: 1, y: 0 },
  [Ee.Top]: { x: 0, y: -1 },
  [Ee.Bottom]: { x: 0, y: 1 }
}, m1 = ({ source: n, sourcePosition: o = Ee.Bottom, target: i }) => o === Ee.Left || o === Ee.Right ? n.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, fh = (n, o) => Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2));
function g1({ source: n, sourcePosition: o = Ee.Bottom, target: i, targetPosition: s = Ee.Top, center: u, offset: c }) {
  const f = ch[o], h = ch[s], p = { x: n.x + f.x * c, y: n.y + f.y * c }, y = { x: i.x + h.x * c, y: i.y + h.y * c }, g = m1({
    source: p,
    sourcePosition: o,
    target: y
  }), v = g.x !== 0 ? "x" : "y", m = g[v];
  let x = [], k, E;
  const C = { x: 0, y: 0 }, N = { x: 0, y: 0 }, [O, S, M, I] = jp({
    sourceX: n.x,
    sourceY: n.y,
    targetX: i.x,
    targetY: i.y
  });
  if (f[v] * h[v] === -1) {
    k = u.x ?? O, E = u.y ?? S;
    const B = [
      { x: k, y: p.y },
      { x: k, y: y.y }
    ], W = [
      { x: p.x, y: E },
      { x: y.x, y: E }
    ];
    f[v] === m ? x = v === "x" ? B : W : x = v === "x" ? W : B;
  } else {
    const B = [{ x: p.x, y: y.y }], W = [{ x: y.x, y: p.y }];
    if (v === "x" ? x = f.x === m ? W : B : x = f.y === m ? B : W, o === s) {
      const q = Math.abs(n[v] - i[v]);
      if (q <= c) {
        const P = Math.min(c - 1, c - q);
        f[v] === m ? C[v] = (p[v] > n[v] ? -1 : 1) * P : N[v] = (y[v] > i[v] ? -1 : 1) * P;
      }
    }
    if (o !== s) {
      const q = v === "x" ? "y" : "x", P = f[v] === h[q], V = p[q] > y[q], $ = p[q] < y[q];
      (f[v] === 1 && (!P && V || P && $) || f[v] !== 1 && (!P && $ || P && V)) && (x = v === "x" ? B : W);
    }
    const Z = { x: p.x + C.x, y: p.y + C.y }, ie = { x: y.x + N.x, y: y.y + N.y }, G = Math.max(Math.abs(Z.x - x[0].x), Math.abs(ie.x - x[0].x)), J = Math.max(Math.abs(Z.y - x[0].y), Math.abs(ie.y - x[0].y));
    G >= J ? (k = (Z.x + ie.x) / 2, E = x[0].y) : (k = x[0].x, E = (Z.y + ie.y) / 2);
  }
  return [[
    n,
    { x: p.x + C.x, y: p.y + C.y },
    ...x,
    { x: y.x + N.x, y: y.y + N.y },
    i
  ], k, E, M, I];
}
function y1(n, o, i, s) {
  const u = Math.min(fh(n, o) / 2, fh(o, i) / 2, s), { x: c, y: f } = o;
  if (n.x === c && c === i.x || n.y === f && f === i.y)
    return `L${c} ${f}`;
  if (n.y === f) {
    const y = n.x < i.x ? -1 : 1, g = n.y < i.y ? 1 : -1;
    return `L ${c + u * y},${f}Q ${c},${f} ${c},${f + u * g}`;
  }
  const h = n.x < i.x ? 1 : -1, p = n.y < i.y ? -1 : 1;
  return `L ${c},${f + u * p}Q ${c},${f} ${c + u * h},${f}`;
}
function ja({ sourceX: n, sourceY: o, sourcePosition: i = Ee.Bottom, targetX: s, targetY: u, targetPosition: c = Ee.Top, borderRadius: f = 5, centerX: h, centerY: p, offset: y = 20 }) {
  const [g, v, m, x, k] = g1({
    source: { x: n, y: o },
    sourcePosition: i,
    target: { x: s, y: u },
    targetPosition: c,
    center: { x: h, y: p },
    offset: y
  });
  return [g.reduce((C, N, O) => {
    let S = "";
    return O > 0 && O < g.length - 1 ? S = y1(g[O - 1], N, g[O + 1], f) : S = `${O === 0 ? "M" : "L"}${N.x} ${N.y}`, C += S, C;
  }, ""), v, m, x, k];
}
function dh(n) {
  var o;
  return n && !!(n.internals.handleBounds || (o = n.handles) != null && o.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function v1(n) {
  var v;
  const { sourceNode: o, targetNode: i } = n;
  if (!dh(o) || !dh(i))
    return null;
  const s = o.internals.handleBounds || hh(o.handles), u = i.internals.handleBounds || hh(i.handles), c = ph((s == null ? void 0 : s.source) ?? [], n.sourceHandle), f = ph(
    // when connection type is loose we can define all handles as sources and connect source -> source
    n.connectionMode === Zr.Strict ? (u == null ? void 0 : u.target) ?? [] : ((u == null ? void 0 : u.target) ?? []).concat((u == null ? void 0 : u.source) ?? []),
    n.targetHandle
  );
  if (!c || !f)
    return (v = n.onError) == null || v.call(n, "008", tn.error008(c ? "target" : "source", {
      id: n.id,
      sourceHandle: n.sourceHandle,
      targetHandle: n.targetHandle
    })), null;
  const h = (c == null ? void 0 : c.position) || Ee.Bottom, p = (f == null ? void 0 : f.position) || Ee.Top, y = ci(o, c, h), g = ci(i, f, p);
  return {
    sourceX: y.x,
    sourceY: y.y,
    targetX: g.x,
    targetY: g.y,
    sourcePosition: h,
    targetPosition: p
  };
}
function hh(n) {
  if (!n)
    return null;
  const o = [], i = [];
  for (const s of n)
    s.width = s.width ?? 1, s.height = s.height ?? 1, s.type === "source" ? o.push(s) : s.type === "target" && i.push(s);
  return {
    source: o,
    target: i
  };
}
function ci(n, o, i = Ee.Left, s = !1) {
  const u = ((o == null ? void 0 : o.x) ?? 0) + n.internals.positionAbsolute.x, c = ((o == null ? void 0 : o.y) ?? 0) + n.internals.positionAbsolute.y, { width: f, height: h } = o ?? yn(n);
  if (s)
    return { x: u + f / 2, y: c + h / 2 };
  switch ((o == null ? void 0 : o.position) ?? i) {
    case Ee.Top:
      return { x: u + f / 2, y: c };
    case Ee.Right:
      return { x: u + f, y: c + h / 2 };
    case Ee.Bottom:
      return { x: u + f / 2, y: c + h };
    case Ee.Left:
      return { x: u, y: c + h / 2 };
  }
}
function ph(n, o) {
  return n && (o ? n.find((i) => i.id === o) : n[0]) || null;
}
function Va(n, o) {
  return n ? typeof n == "string" ? n : `${o ? `${o}__` : ""}${Object.keys(n).sort().map((s) => `${s}=${n[s]}`).join("&")}` : "";
}
function w1(n, { id: o, defaultColor: i, defaultMarkerStart: s, defaultMarkerEnd: u }) {
  const c = /* @__PURE__ */ new Set();
  return n.reduce((f, h) => ([h.markerStart || s, h.markerEnd || u].forEach((p) => {
    if (p && typeof p == "object") {
      const y = Va(p, o);
      c.has(y) || (f.push({ id: y, color: p.color || i, ...p }), c.add(y));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const rc = {
  nodeOrigin: [0, 0],
  nodeExtent: li,
  elevateNodesOnSelect: !0,
  defaults: {}
}, x1 = {
  ...rc,
  checkEquality: !0
};
function oc(n, o) {
  const i = { ...n };
  for (const s in o)
    o[s] !== void 0 && (i[s] = o[s]);
  return i;
}
function S1(n, o, i) {
  const s = oc(rc, i);
  for (const u of n.values())
    if (u.parentId)
      ic(u, n, o, s);
    else {
      const c = mi(u, s.nodeOrigin), f = to(u.extent) ? u.extent : s.nodeExtent, h = gr(c, f, yn(u));
      u.internals.positionAbsolute = h;
    }
}
function Ba(n, o, i, s) {
  var p, y;
  const u = oc(x1, s);
  let c = n.length > 0;
  const f = new Map(o), h = u != null && u.elevateNodesOnSelect ? 1e3 : 0;
  o.clear(), i.clear();
  for (const g of n) {
    let v = f.get(g.id);
    if (u.checkEquality && g === (v == null ? void 0 : v.internals.userNode))
      o.set(g.id, v);
    else {
      const m = mi(g, u.nodeOrigin), x = to(g.extent) ? g.extent : u.nodeExtent, k = gr(m, x, yn(g));
      v = {
        ...u.defaults,
        ...g,
        measured: {
          width: (p = g.measured) == null ? void 0 : p.width,
          height: (y = g.measured) == null ? void 0 : y.height
        },
        internals: {
          positionAbsolute: k,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: g.measured ? v == null ? void 0 : v.internals.handleBounds : void 0,
          z: Bp(g, h),
          userNode: g
        }
      }, o.set(g.id, v);
    }
    (v.measured === void 0 || v.measured.width === void 0 || v.measured.height === void 0) && !v.hidden && (c = !1), g.parentId && ic(v, o, i, s);
  }
  return c;
}
function E1(n, o) {
  if (!n.parentId)
    return;
  const i = o.get(n.parentId);
  i ? i.set(n.id, n) : o.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function ic(n, o, i, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: f } = oc(rc, s), h = n.parentId, p = o.get(h);
  if (!p) {
    console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  E1(n, i);
  const y = u ? 1e3 : 0, { x: g, y: v, z: m } = _1(n, p, c, f, y), { positionAbsolute: x } = n.internals, k = g !== x.x || v !== x.y;
  (k || m !== n.internals.z) && o.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: k ? { x: g, y: v } : x,
      z: m
    }
  });
}
function Bp(n, o) {
  return (Ut(n.zIndex) ? n.zIndex : 0) + (n.selected ? o : 0);
}
function _1(n, o, i, s, u) {
  const { x: c, y: f } = o.internals.positionAbsolute, h = yn(n), p = mi(n, i), y = to(n.extent) ? gr(p, n.extent, h) : p;
  let g = gr({ x: c + y.x, y: f + y.y }, s, h);
  n.extent === "parent" && (g = zp(g, h, o));
  const v = Bp(n, u), m = o.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: m >= v ? m + 1 : v
  };
}
function lc(n, o, i, s = [0, 0]) {
  var f;
  const u = [], c = /* @__PURE__ */ new Map();
  for (const h of n) {
    const p = o.get(h.parentId);
    if (!p)
      continue;
    const y = ((f = c.get(h.parentId)) == null ? void 0 : f.expandedRect) ?? eo(p), g = Rp(y, h.rect);
    c.set(h.parentId, { expandedRect: g, parent: p });
  }
  return c.size > 0 && c.forEach(({ expandedRect: h, parent: p }, y) => {
    var S;
    const g = p.internals.positionAbsolute, v = yn(p), m = p.origin ?? s, x = h.x < g.x ? Math.round(Math.abs(g.x - h.x)) : 0, k = h.y < g.y ? Math.round(Math.abs(g.y - h.y)) : 0, E = Math.max(v.width, Math.round(h.width)), C = Math.max(v.height, Math.round(h.height)), N = (E - v.width) * m[0], O = (C - v.height) * m[1];
    (x > 0 || k > 0 || N || O) && (u.push({
      id: y,
      type: "position",
      position: {
        x: p.position.x - x + N,
        y: p.position.y - k + O
      }
    }), (S = i.get(y)) == null || S.forEach((M) => {
      n.some((I) => I.id === M.id) || u.push({
        id: M.id,
        type: "position",
        position: {
          x: M.position.x + x,
          y: M.position.y + k
        }
      });
    })), (v.width < h.width || v.height < h.height || x || k) && u.push({
      id: y,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: E + (x ? m[0] * x - N : 0),
        height: C + (k ? m[1] * k - O : 0)
      }
    });
  }), u;
}
function k1(n, o, i, s, u, c) {
  const f = s == null ? void 0 : s.querySelector(".xyflow__viewport");
  let h = !1;
  if (!f)
    return { changes: [], updatedInternals: h };
  const p = [], y = window.getComputedStyle(f), { m22: g } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const m of n.values()) {
    const x = o.get(m.id);
    if (!x)
      continue;
    if (x.hidden) {
      o.set(x.id, {
        ...x,
        internals: {
          ...x.internals,
          handleBounds: void 0
        }
      }), h = !0;
      continue;
    }
    const k = tc(m.nodeElement), E = x.measured.width !== k.width || x.measured.height !== k.height;
    if (!!(k.width && k.height && (E || !x.internals.handleBounds || m.force))) {
      const N = m.nodeElement.getBoundingClientRect(), O = to(x.extent) ? x.extent : c;
      let { positionAbsolute: S } = x.internals;
      x.parentId && x.extent === "parent" ? S = zp(S, k, o.get(x.parentId)) : O && (S = gr(S, O, k));
      const M = {
        ...x,
        measured: k,
        internals: {
          ...x.internals,
          positionAbsolute: S,
          handleBounds: {
            source: uh("source", m.nodeElement, N, g, x.id),
            target: uh("target", m.nodeElement, N, g, x.id)
          }
        }
      };
      o.set(x.id, M), x.parentId && ic(M, o, i, { nodeOrigin: u }), h = !0, E && (p.push({
        id: x.id,
        type: "dimensions",
        dimensions: k
      }), x.expandParent && x.parentId && v.push({
        id: x.id,
        parentId: x.parentId,
        rect: eo(M, u)
      }));
    }
  }
  if (v.length > 0) {
    const m = lc(v, o, i, u);
    p.push(...m);
  }
  return { changes: p, updatedInternals: h };
}
async function C1({ delta: n, panZoom: o, transform: i, translateExtent: s, width: u, height: c }) {
  if (!o || !n.x && !n.y)
    return Promise.resolve(!1);
  const f = await o.setViewportConstrained({
    x: i[0] + n.x,
    y: i[1] + n.y,
    zoom: i[2]
  }, [
    [0, 0],
    [u, c]
  ], s), h = !!f && (f.x !== i[0] || f.y !== i[1] || f.k !== i[2]);
  return Promise.resolve(h);
}
function mh(n, o, i, s, u, c) {
  let f = u;
  const h = s.get(f) || /* @__PURE__ */ new Map();
  s.set(f, h.set(i, o)), f = `${u}-${n}`;
  const p = s.get(f) || /* @__PURE__ */ new Map();
  if (s.set(f, p.set(i, o)), c) {
    f = `${u}-${n}-${c}`;
    const y = s.get(f) || /* @__PURE__ */ new Map();
    s.set(f, y.set(i, o));
  }
}
function Up(n, o, i) {
  n.clear(), o.clear();
  for (const s of i) {
    const { source: u, target: c, sourceHandle: f = null, targetHandle: h = null } = s, p = { edgeId: s.id, source: u, target: c, sourceHandle: f, targetHandle: h }, y = `${u}-${f}--${c}-${h}`, g = `${c}-${h}--${u}-${f}`;
    mh("source", p, g, n, u, f), mh("target", p, y, n, c, h), o.set(s.id, s);
  }
}
function Wp(n, o) {
  if (!n.parentId)
    return !1;
  const i = o.get(n.parentId);
  return i ? i.selected ? !0 : Wp(i, o) : !1;
}
function gh(n, o, i) {
  var u;
  let s = n;
  do {
    if ((u = s == null ? void 0 : s.matches) != null && u.call(s, o))
      return !0;
    if (s === i)
      return !1;
    s = s == null ? void 0 : s.parentElement;
  } while (s);
  return !1;
}
function N1(n, o, i, s) {
  const u = /* @__PURE__ */ new Map();
  for (const [c, f] of n)
    if ((f.selected || f.id === s) && (!f.parentId || !Wp(f, n)) && (f.draggable || o && typeof f.draggable > "u")) {
      const h = n.get(c);
      h && u.set(c, {
        id: c,
        position: h.position || { x: 0, y: 0 },
        distance: {
          x: i.x - h.internals.positionAbsolute.x,
          y: i.y - h.internals.positionAbsolute.y
        },
        extent: h.extent,
        parentId: h.parentId,
        origin: h.origin,
        expandParent: h.expandParent,
        internals: {
          positionAbsolute: h.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: h.measured.width ?? 0,
          height: h.measured.height ?? 0
        }
      });
    }
  return u;
}
function Ea({ nodeId: n, dragItems: o, nodeLookup: i, dragging: s = !0 }) {
  var f, h, p;
  const u = [];
  for (const [y, g] of o) {
    const v = (f = i.get(y)) == null ? void 0 : f.internals.userNode;
    v && u.push({
      ...v,
      position: g.position,
      dragging: s
    });
  }
  if (!n)
    return [u[0], u];
  const c = (h = i.get(n)) == null ? void 0 : h.internals.userNode;
  return [
    c ? {
      ...c,
      position: ((p = o.get(n)) == null ? void 0 : p.position) || c.position,
      dragging: s
    } : u[0],
    u
  ];
}
function M1({ onNodeMouseDown: n, getStoreItems: o, onDragStart: i, onDrag: s, onDragStop: u }) {
  let c = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), p = !1, y = { x: 0, y: 0 }, g = null, v = !1, m = null, x = !1, k = !1;
  function E({ noDragClassName: N, handleSelector: O, domNode: S, isSelectable: M, nodeId: I, nodeClickDistance: j = 0 }) {
    m = Et(S);
    function B({ x: G, y: J }, q) {
      const { nodeLookup: P, nodeExtent: V, snapGrid: $, snapToGrid: H, nodeOrigin: R, onNodeDrag: L, onSelectionDrag: D, onError: _, updateNodePositions: F } = o();
      c = { x: G, y: J };
      let ne = !1, ee = { x: 0, y: 0, x2: 0, y2: 0 };
      if (h.size > 1 && V) {
        const ae = gi(h);
        ee = Ha(ae);
      }
      for (const [ae, fe] of h) {
        if (!P.has(ae))
          continue;
        let de = { x: G - fe.distance.x, y: J - fe.distance.y };
        H && (de = ms(de, $));
        let oe = [
          [V[0][0], V[0][1]],
          [V[1][0], V[1][1]]
        ];
        if (h.size > 1 && V && !fe.extent) {
          const { positionAbsolute: Se } = fe.internals, he = Se.x - ee.x + V[0][0], me = Se.x + fe.measured.width - ee.x2 + V[1][0], pe = Se.y - ee.y + V[0][1], Ne = Se.y + fe.measured.height - ee.y2 + V[1][1];
          oe = [
            [he, pe],
            [me, Ne]
          ];
        }
        const { position: b, positionAbsolute: ce } = Lp({
          nodeId: ae,
          nextPosition: de,
          nodeLookup: P,
          nodeExtent: oe,
          nodeOrigin: R,
          onError: _
        });
        ne = ne || fe.position.x !== b.x || fe.position.y !== b.y, fe.position = b, fe.internals.positionAbsolute = ce;
      }
      if (k = k || ne, !!ne && (F(h, !0), q && (s || L || !I && D))) {
        const [ae, fe] = Ea({
          nodeId: I,
          dragItems: h,
          nodeLookup: P
        });
        s == null || s(q, h, ae, fe), L == null || L(q, ae, fe), I || D == null || D(q, fe);
      }
    }
    async function W() {
      if (!g)
        return;
      const { transform: G, panBy: J, autoPanSpeed: q, autoPanOnNodeDrag: P } = o();
      if (!P) {
        p = !1, cancelAnimationFrame(f);
        return;
      }
      const [V, $] = Ip(y, g, q);
      (V !== 0 || $ !== 0) && (c.x = (c.x ?? 0) - V / G[2], c.y = (c.y ?? 0) - $ / G[2], await J({ x: V, y: $ }) && B(c, null)), f = requestAnimationFrame(W);
    }
    function Z(G) {
      var ne;
      const { nodeLookup: J, multiSelectionActive: q, nodesDraggable: P, transform: V, snapGrid: $, snapToGrid: H, selectNodesOnDrag: R, onNodeDragStart: L, onSelectionDragStart: D, unselectNodesAndEdges: _ } = o();
      v = !0, (!R || !M) && !q && I && ((ne = J.get(I)) != null && ne.selected || _()), M && R && I && (n == null || n(I));
      const F = ti(G.sourceEvent, { transform: V, snapGrid: $, snapToGrid: H, containerBounds: g });
      if (c = F, h = N1(J, P, F, I), h.size > 0 && (i || L || !I && D)) {
        const [ee, ae] = Ea({
          nodeId: I,
          dragItems: h,
          nodeLookup: J
        });
        i == null || i(G.sourceEvent, h, ee, ae), L == null || L(G.sourceEvent, ee, ae), I || D == null || D(G.sourceEvent, ae);
      }
    }
    const ie = ap().clickDistance(j).on("start", (G) => {
      const { domNode: J, nodeDragThreshold: q, transform: P, snapGrid: V, snapToGrid: $ } = o();
      g = (J == null ? void 0 : J.getBoundingClientRect()) || null, x = !1, k = !1, q === 0 && Z(G), c = ti(G.sourceEvent, { transform: P, snapGrid: V, snapToGrid: $, containerBounds: g }), y = Jt(G.sourceEvent, g);
    }).on("drag", (G) => {
      const { autoPanOnNodeDrag: J, transform: q, snapGrid: P, snapToGrid: V, nodeDragThreshold: $, nodeLookup: H } = o(), R = ti(G.sourceEvent, { transform: q, snapGrid: P, snapToGrid: V, containerBounds: g });
      if ((G.sourceEvent.type === "touchmove" && G.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      I && !H.has(I)) && (x = !0), !x) {
        if (!p && J && v && (p = !0, W()), !v) {
          const L = R.xSnapped - (c.x ?? 0), D = R.ySnapped - (c.y ?? 0);
          Math.sqrt(L * L + D * D) > $ && Z(G);
        }
        (c.x !== R.xSnapped || c.y !== R.ySnapped) && h && v && (y = Jt(G.sourceEvent, g), B(R, G.sourceEvent));
      }
    }).on("end", (G) => {
      if (!(!v || x) && (p = !1, v = !1, cancelAnimationFrame(f), h.size > 0)) {
        const { nodeLookup: J, updateNodePositions: q, onNodeDragStop: P, onSelectionDragStop: V } = o();
        if (k && (q(h, !1), k = !1), u || P || !I && V) {
          const [$, H] = Ea({
            nodeId: I,
            dragItems: h,
            nodeLookup: J,
            dragging: !1
          });
          u == null || u(G.sourceEvent, h, $, H), P == null || P(G.sourceEvent, $, H), I || V == null || V(G.sourceEvent, H);
        }
      }
    }).filter((G) => {
      const J = G.target;
      return !G.button && (!N || !gh(J, `.${N}`, S)) && (!O || gh(J, O, S));
    });
    m.call(ie);
  }
  function C() {
    m == null || m.on(".drag", null);
  }
  return {
    update: E,
    destroy: C
  };
}
function P1(n, o, i) {
  const s = [], u = {
    x: n.x - i,
    y: n.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const c of o.values())
    ai(u, eo(c)) > 0 && s.push(c);
  return s;
}
const T1 = 250;
function L1(n, o, i, s) {
  var h, p;
  let u = [], c = 1 / 0;
  const f = P1(n, i, o + T1);
  for (const y of f) {
    const g = [...((h = y.internals.handleBounds) == null ? void 0 : h.source) ?? [], ...((p = y.internals.handleBounds) == null ? void 0 : p.target) ?? []];
    for (const v of g) {
      if (s.nodeId === v.nodeId && s.type === v.type && s.id === v.id)
        continue;
      const { x: m, y: x } = ci(y, v, v.position, !0), k = Math.sqrt(Math.pow(m - n.x, 2) + Math.pow(x - n.y, 2));
      k > o || (k < c ? (u = [{ ...v, x: m, y: x }], c = k) : k === c && u.push({ ...v, x: m, y: x }));
    }
  }
  if (!u.length)
    return null;
  if (u.length > 1) {
    const y = s.type === "source" ? "target" : "source";
    return u.find((g) => g.type === y) ?? u[0];
  }
  return u[0];
}
function Yp(n, o, i, s, u, c = !1) {
  var y, g, v;
  const f = s.get(n);
  if (!f)
    return null;
  const h = u === "strict" ? (y = f.internals.handleBounds) == null ? void 0 : y[o] : [...((g = f.internals.handleBounds) == null ? void 0 : g.source) ?? [], ...((v = f.internals.handleBounds) == null ? void 0 : v.target) ?? []], p = (i ? h == null ? void 0 : h.find((m) => m.id === i) : h == null ? void 0 : h[0]) ?? null;
  return p && c ? { ...p, ...ci(f, p, p.position, !0) } : p;
}
function Xp(n, o) {
  return n || (o != null && o.classList.contains("target") ? "target" : o != null && o.classList.contains("source") ? "source" : null);
}
function z1(n, o) {
  let i = null;
  return o ? i = !0 : n && !o && (i = !1), i;
}
const bp = () => !0;
function I1(n, { connectionMode: o, connectionRadius: i, handleId: s, nodeId: u, edgeUpdaterType: c, isTarget: f, domNode: h, nodeLookup: p, lib: y, autoPanOnConnect: g, flowId: v, panBy: m, cancelConnection: x, onConnectStart: k, onConnect: E, onConnectEnd: C, isValidConnection: N = bp, onReconnectEnd: O, updateConnection: S, getTransform: M, getFromHandle: I, autoPanSpeed: j, dragThreshold: B = 1 }) {
  const W = Dp(n.target);
  let Z = 0, ie;
  const { x: G, y: J } = Jt(n), q = W == null ? void 0 : W.elementFromPoint(G, J), P = Xp(c, q), V = h == null ? void 0 : h.getBoundingClientRect();
  let $ = !1;
  if (!V || !P)
    return;
  const H = Yp(u, P, s, p, o);
  if (!H)
    return;
  let R = Jt(n, V), L = !1, D = null, _ = !1, F = null;
  function ne() {
    if (!g || !V)
      return;
    const [Se, he] = Ip(R, V, j);
    m({ x: Se, y: he }), Z = requestAnimationFrame(ne);
  }
  const ee = {
    ...H,
    nodeId: u,
    type: P,
    position: H.position
  }, ae = p.get(u);
  let de = {
    inProgress: !0,
    isValid: null,
    from: ci(ae, ee, Ee.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: ae,
    to: R,
    toHandle: null,
    toPosition: oh[ee.position],
    toNode: null
  };
  function oe() {
    S(de), k == null || k(n, { nodeId: u, handleId: s, handleType: P });
  }
  B === 0 && oe();
  function b(Se) {
    if (!$) {
      const { x: Ne, y: Pe } = Jt(Se), Ae = Ne - G, Re = Pe - J, De = Ae * Ae + Re * Re > B * B;
      if (!De)
        return;
      oe(), $ = De;
    }
    if (!I() || !ee) {
      ce(Se);
      return;
    }
    const he = M();
    R = Jt(Se, V), ie = L1(yi(R, he, !1, [1, 1]), i, p, ee), L || (ne(), L = !0);
    const me = Qp(Se, {
      handle: ie,
      connectionMode: o,
      fromNodeId: u,
      fromHandleId: s,
      fromType: f ? "target" : "source",
      isValidConnection: N,
      doc: W,
      lib: y,
      flowId: v,
      nodeLookup: p
    });
    F = me.handleDomNode, D = me.connection, _ = z1(!!ie, me.isValid);
    const pe = {
      // from stays the same
      ...de,
      isValid: _,
      to: me.toHandle && _ ? is({ x: me.toHandle.x, y: me.toHandle.y }, he) : R,
      toHandle: me.toHandle,
      toPosition: _ && me.toHandle ? me.toHandle.position : oh[ee.position],
      toNode: me.toHandle ? p.get(me.toHandle.nodeId) : null
    };
    _ && ie && de.toHandle && pe.toHandle && de.toHandle.type === pe.toHandle.type && de.toHandle.nodeId === pe.toHandle.nodeId && de.toHandle.id === pe.toHandle.id && de.to.x === pe.to.x && de.to.y === pe.to.y || (S(pe), de = pe);
  }
  function ce(Se) {
    (ie || F) && D && _ && (E == null || E(D));
    const { inProgress: he, ...me } = de, pe = {
      ...me,
      toPosition: de.toHandle ? de.toPosition : null
    };
    C == null || C(Se, pe), c && (O == null || O(Se, pe)), x(), cancelAnimationFrame(Z), L = !1, _ = !1, D = null, F = null, W.removeEventListener("mousemove", b), W.removeEventListener("mouseup", ce), W.removeEventListener("touchmove", b), W.removeEventListener("touchend", ce);
  }
  W.addEventListener("mousemove", b), W.addEventListener("mouseup", ce), W.addEventListener("touchmove", b), W.addEventListener("touchend", ce);
}
function Qp(n, { handle: o, connectionMode: i, fromNodeId: s, fromHandleId: u, fromType: c, doc: f, lib: h, flowId: p, isValidConnection: y = bp, nodeLookup: g }) {
  const v = c === "target", m = o ? f.querySelector(`.${h}-flow__handle[data-id="${p}-${o == null ? void 0 : o.nodeId}-${o == null ? void 0 : o.id}-${o == null ? void 0 : o.type}"]`) : null, { x, y: k } = Jt(n), E = f.elementFromPoint(x, k), C = E != null && E.classList.contains(`${h}-flow__handle`) ? E : m, N = {
    handleDomNode: C,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (C) {
    const O = Xp(void 0, C), S = C.getAttribute("data-nodeid"), M = C.getAttribute("data-handleid"), I = C.classList.contains("connectable"), j = C.classList.contains("connectableend");
    if (!S || !O)
      return N;
    const B = {
      source: v ? S : s,
      sourceHandle: v ? M : u,
      target: v ? s : S,
      targetHandle: v ? u : M
    };
    N.connection = B;
    const Z = I && j && (i === Zr.Strict ? v && O === "source" || !v && O === "target" : S !== s || M !== u);
    N.isValid = Z && y(B), N.toHandle = Yp(S, O, M, g, i, !0);
  }
  return N;
}
const Ua = {
  onPointerDown: I1,
  isValid: Qp
};
function R1({ domNode: n, panZoom: o, getTransform: i, getViewScale: s }) {
  const u = Et(n);
  function c({ translateExtent: h, width: p, height: y, zoomStep: g = 10, pannable: v = !0, zoomable: m = !0, inversePan: x = !1 }) {
    const k = (S) => {
      const M = i();
      if (S.sourceEvent.type !== "wheel" || !o)
        return;
      const I = -S.sourceEvent.deltaY * (S.sourceEvent.deltaMode === 1 ? 0.05 : S.sourceEvent.deltaMode ? 1 : 2e-3) * g, j = M[2] * Math.pow(2, I);
      o.scaleTo(j);
    };
    let E = [0, 0];
    const C = (S) => {
      (S.sourceEvent.type === "mousedown" || S.sourceEvent.type === "touchstart") && (E = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ]);
    }, N = (S) => {
      const M = i();
      if (S.sourceEvent.type !== "mousemove" && S.sourceEvent.type !== "touchmove" || !o)
        return;
      const I = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ], j = [I[0] - E[0], I[1] - E[1]];
      E = I;
      const B = s() * Math.max(M[2], Math.log(M[2])) * (x ? -1 : 1), W = {
        x: M[0] - j[0] * B,
        y: M[1] - j[1] * B
      }, Z = [
        [0, 0],
        [p, y]
      ];
      o.setViewportConstrained({
        x: W.x,
        y: W.y,
        zoom: M[2]
      }, Z, h);
    }, O = kp().on("start", C).on("zoom", v ? N : null).on("zoom.wheel", m ? k : null);
    u.call(O, {});
  }
  function f() {
    u.on("zoom", null);
  }
  return {
    update: c,
    destroy: f,
    pointer: Vt
  };
}
const A1 = (n, o) => n.x !== o.x || n.y !== o.y || n.zoom !== o.k, gs = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), _a = ({ x: n, y: o, zoom: i }) => ds.translate(n, o).scale(i), Xr = (n, o) => n.target.closest(`.${o}`), Kp = (n, o) => o === 2 && Array.isArray(n) && n.includes(2), $1 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, ka = (n, o = 0, i = $1, s = () => {
}) => {
  const u = typeof o == "number" && o > 0;
  return u || s(), u ? n.transition().duration(o).ease(i).on("end", s) : n;
}, Gp = (n) => {
  const o = n.ctrlKey && ls() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * o;
};
function D1({ zoomPanValues: n, noWheelClassName: o, d3Selection: i, d3Zoom: s, panOnScrollMode: u, panOnScrollSpeed: c, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: p, onPanZoomEnd: y }) {
  return (g) => {
    if (Xr(g, o))
      return !1;
    g.preventDefault(), g.stopImmediatePropagation();
    const v = i.property("__zoom").k || 1;
    if (g.ctrlKey && f) {
      const C = Vt(g), N = Gp(g), O = v * Math.pow(2, N);
      s.scaleTo(i, O, C, g);
      return;
    }
    const m = g.deltaMode === 1 ? 20 : 1;
    let x = u === hr.Vertical ? 0 : g.deltaX * m, k = u === hr.Horizontal ? 0 : g.deltaY * m;
    !ls() && g.shiftKey && u !== hr.Vertical && (x = g.deltaY * m, k = 0), s.translateBy(
      i,
      -(x / v) * c,
      -(k / v) * c,
      // @ts-ignore
      { internal: !0 }
    );
    const E = gs(i.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling || (n.isPanScrolling = !0, h == null || h(g, E)), n.isPanScrolling && (p == null || p(g, E), n.panScrollTimeout = setTimeout(() => {
      y == null || y(g, E), n.isPanScrolling = !1;
    }, 150));
  };
}
function O1({ noWheelClassName: n, preventScrolling: o, d3ZoomHandler: i }) {
  return function(s, u) {
    const c = s.type === "wheel", f = !o && c && !s.ctrlKey, h = Xr(s, n);
    if (s.ctrlKey && c && h && s.preventDefault(), f || h)
      return null;
    s.preventDefault(), i.call(this, s, u);
  };
}
function F1({ zoomPanValues: n, onDraggingChange: o, onPanZoomStart: i }) {
  return (s) => {
    var c, f, h;
    if ((c = s.sourceEvent) != null && c.internal)
      return;
    const u = gs(s.transform);
    n.mouseButton = ((f = s.sourceEvent) == null ? void 0 : f.button) || 0, n.isZoomingOrPanning = !0, n.prevViewport = u, ((h = s.sourceEvent) == null ? void 0 : h.type) === "mousedown" && o(!0), i && (i == null || i(s.sourceEvent, u));
  };
}
function H1({ zoomPanValues: n, panOnDrag: o, onPaneContextMenu: i, onTransformChange: s, onPanZoom: u }) {
  return (c) => {
    var f, h;
    n.usedRightMouseButton = !!(i && Kp(o, n.mouseButton ?? 0)), (f = c.sourceEvent) != null && f.sync || s([c.transform.x, c.transform.y, c.transform.k]), u && !((h = c.sourceEvent) != null && h.internal) && (u == null || u(c.sourceEvent, gs(c.transform)));
  };
}
function j1({ zoomPanValues: n, panOnDrag: o, panOnScroll: i, onDraggingChange: s, onPanZoomEnd: u, onPaneContextMenu: c }) {
  return (f) => {
    var h;
    if (!((h = f.sourceEvent) != null && h.internal) && (n.isZoomingOrPanning = !1, c && Kp(o, n.mouseButton ?? 0) && !n.usedRightMouseButton && f.sourceEvent && c(f.sourceEvent), n.usedRightMouseButton = !1, s(!1), u && A1(n.prevViewport, f.transform))) {
      const p = gs(f.transform);
      n.prevViewport = p, clearTimeout(n.timerId), n.timerId = setTimeout(
        () => {
          u == null || u(f.sourceEvent, p);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function V1({ zoomActivationKeyPressed: n, zoomOnScroll: o, zoomOnPinch: i, panOnDrag: s, panOnScroll: u, zoomOnDoubleClick: c, userSelectionActive: f, noWheelClassName: h, noPanClassName: p, lib: y }) {
  return (g) => {
    var k;
    const v = n || o, m = i && g.ctrlKey;
    if (g.button === 1 && g.type === "mousedown" && (Xr(g, `${y}-flow__node`) || Xr(g, `${y}-flow__edge`)))
      return !0;
    if (!s && !v && !u && !c && !i || f || Xr(g, h) && g.type === "wheel" || Xr(g, p) && (g.type !== "wheel" || u && g.type === "wheel" && !n) || !i && g.ctrlKey && g.type === "wheel")
      return !1;
    if (!i && g.type === "touchstart" && ((k = g.touches) == null ? void 0 : k.length) > 1)
      return g.preventDefault(), !1;
    if (!v && !u && !m && g.type === "wheel" || !s && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(s) && !s.includes(g.button) && g.type === "mousedown")
      return !1;
    const x = Array.isArray(s) && s.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || g.type === "wheel") && x;
  };
}
function B1({ domNode: n, minZoom: o, maxZoom: i, paneClickDistance: s, translateExtent: u, viewport: c, onPanZoom: f, onPanZoomStart: h, onPanZoomEnd: p, onDraggingChange: y }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, v = n.getBoundingClientRect(), m = kp().clickDistance(!Ut(s) || s < 0 ? 0 : s).scaleExtent([o, i]).translateExtent(u), x = Et(n).call(m);
  S({
    x: c.x,
    y: c.y,
    zoom: Jr(c.zoom, o, i)
  }, [
    [0, 0],
    [v.width, v.height]
  ], u);
  const k = x.on("wheel.zoom"), E = x.on("dblclick.zoom");
  m.wheelDelta(Gp);
  function C(J, q) {
    return x ? new Promise((P) => {
      m == null || m.interpolate((q == null ? void 0 : q.interpolate) === "linear" ? ei : bl).transform(ka(x, q == null ? void 0 : q.duration, q == null ? void 0 : q.ease, () => P(!0)), J);
    }) : Promise.resolve(!1);
  }
  function N({ noWheelClassName: J, noPanClassName: q, onPaneContextMenu: P, userSelectionActive: V, panOnScroll: $, panOnDrag: H, panOnScrollMode: R, panOnScrollSpeed: L, preventScrolling: D, zoomOnPinch: _, zoomOnScroll: F, zoomOnDoubleClick: ne, zoomActivationKeyPressed: ee, lib: ae, onTransformChange: fe }) {
    V && !g.isZoomingOrPanning && O();
    const oe = $ && !ee && !V ? D1({
      zoomPanValues: g,
      noWheelClassName: J,
      d3Selection: x,
      d3Zoom: m,
      panOnScrollMode: R,
      panOnScrollSpeed: L,
      zoomOnPinch: _,
      onPanZoomStart: h,
      onPanZoom: f,
      onPanZoomEnd: p
    }) : O1({
      noWheelClassName: J,
      preventScrolling: D,
      d3ZoomHandler: k
    });
    if (x.on("wheel.zoom", oe, { passive: !1 }), !V) {
      const ce = F1({
        zoomPanValues: g,
        onDraggingChange: y,
        onPanZoomStart: h
      });
      m.on("start", ce);
      const Se = H1({
        zoomPanValues: g,
        panOnDrag: H,
        onPaneContextMenu: !!P,
        onPanZoom: f,
        onTransformChange: fe
      });
      m.on("zoom", Se);
      const he = j1({
        zoomPanValues: g,
        panOnDrag: H,
        panOnScroll: $,
        onPaneContextMenu: P,
        onPanZoomEnd: p,
        onDraggingChange: y
      });
      m.on("end", he);
    }
    const b = V1({
      zoomActivationKeyPressed: ee,
      panOnDrag: H,
      zoomOnScroll: F,
      panOnScroll: $,
      zoomOnDoubleClick: ne,
      zoomOnPinch: _,
      userSelectionActive: V,
      noPanClassName: q,
      noWheelClassName: J,
      lib: ae
    });
    m.filter(b), ne ? x.on("dblclick.zoom", E) : x.on("dblclick.zoom", null);
  }
  function O() {
    m.on("zoom", null);
  }
  async function S(J, q, P) {
    const V = _a(J), $ = m == null ? void 0 : m.constrain()(V, q, P);
    return $ && await C($), new Promise((H) => H($));
  }
  async function M(J, q) {
    const P = _a(J);
    return await C(P, q), new Promise((V) => V(P));
  }
  function I(J) {
    if (x) {
      const q = _a(J), P = x.property("__zoom");
      (P.k !== J.zoom || P.x !== J.x || P.y !== J.y) && (m == null || m.transform(x, q, null, { sync: !0 }));
    }
  }
  function j() {
    const J = x ? _p(x.node()) : { x: 0, y: 0, k: 1 };
    return { x: J.x, y: J.y, zoom: J.k };
  }
  function B(J, q) {
    return x ? new Promise((P) => {
      m == null || m.interpolate((q == null ? void 0 : q.interpolate) === "linear" ? ei : bl).scaleTo(ka(x, q == null ? void 0 : q.duration, q == null ? void 0 : q.ease, () => P(!0)), J);
    }) : Promise.resolve(!1);
  }
  function W(J, q) {
    return x ? new Promise((P) => {
      m == null || m.interpolate((q == null ? void 0 : q.interpolate) === "linear" ? ei : bl).scaleBy(ka(x, q == null ? void 0 : q.duration, q == null ? void 0 : q.ease, () => P(!0)), J);
    }) : Promise.resolve(!1);
  }
  function Z(J) {
    m == null || m.scaleExtent(J);
  }
  function ie(J) {
    m == null || m.translateExtent(J);
  }
  function G(J) {
    const q = !Ut(J) || J < 0 ? 0 : J;
    m == null || m.clickDistance(q);
  }
  return {
    update: N,
    destroy: O,
    setViewport: M,
    setViewportConstrained: S,
    getViewport: j,
    scaleTo: B,
    scaleBy: W,
    setScaleExtent: Z,
    setTranslateExtent: ie,
    syncViewport: I,
    setClickDistance: G
  };
}
var no;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(no || (no = {}));
function U1({ width: n, prevWidth: o, height: i, prevHeight: s, affectsX: u, affectsY: c }) {
  const f = n - o, h = i - s, p = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && u && (p[0] = p[0] * -1), h && c && (p[1] = p[1] * -1), p;
}
function W1(n) {
  const o = n.includes("right") || n.includes("left"), i = n.includes("bottom") || n.includes("top"), s = n.includes("left"), u = n.includes("top");
  return {
    isHorizontal: o,
    isVertical: i,
    affectsX: s,
    affectsY: u
  };
}
function jn(n, o) {
  return Math.max(0, o - n);
}
function Vn(n, o) {
  return Math.max(0, n - o);
}
function Bl(n, o, i) {
  return Math.max(0, o - n, n - i);
}
function yh(n, o) {
  return n ? !o : o;
}
function Y1(n, o, i, s, u, c, f, h) {
  let { affectsX: p, affectsY: y } = o;
  const { isHorizontal: g, isVertical: v } = o, m = g && v, { xSnapped: x, ySnapped: k } = i, { minWidth: E, maxWidth: C, minHeight: N, maxHeight: O } = s, { x: S, y: M, width: I, height: j, aspectRatio: B } = n;
  let W = Math.floor(g ? x - n.pointerX : 0), Z = Math.floor(v ? k - n.pointerY : 0);
  const ie = I + (p ? -W : W), G = j + (y ? -Z : Z), J = -c[0] * I, q = -c[1] * j;
  let P = Bl(ie, E, C), V = Bl(G, N, O);
  if (f) {
    let R = 0, L = 0;
    p && W < 0 ? R = jn(S + W + J, f[0][0]) : !p && W > 0 && (R = Vn(S + ie + J, f[1][0])), y && Z < 0 ? L = jn(M + Z + q, f[0][1]) : !y && Z > 0 && (L = Vn(M + G + q, f[1][1])), P = Math.max(P, R), V = Math.max(V, L);
  }
  if (h) {
    let R = 0, L = 0;
    p && W > 0 ? R = Vn(S + W, h[0][0]) : !p && W < 0 && (R = jn(S + ie, h[1][0])), y && Z > 0 ? L = Vn(M + Z, h[0][1]) : !y && Z < 0 && (L = jn(M + G, h[1][1])), P = Math.max(P, R), V = Math.max(V, L);
  }
  if (u) {
    if (g) {
      const R = Bl(ie / B, N, O) * B;
      if (P = Math.max(P, R), f) {
        let L = 0;
        !p && !y || p && !y && m ? L = Vn(M + q + ie / B, f[1][1]) * B : L = jn(M + q + (p ? W : -W) / B, f[0][1]) * B, P = Math.max(P, L);
      }
      if (h) {
        let L = 0;
        !p && !y || p && !y && m ? L = jn(M + ie / B, h[1][1]) * B : L = Vn(M + (p ? W : -W) / B, h[0][1]) * B, P = Math.max(P, L);
      }
    }
    if (v) {
      const R = Bl(G * B, E, C) / B;
      if (V = Math.max(V, R), f) {
        let L = 0;
        !p && !y || y && !p && m ? L = Vn(S + G * B + J, f[1][0]) / B : L = jn(S + (y ? Z : -Z) * B + J, f[0][0]) / B, V = Math.max(V, L);
      }
      if (h) {
        let L = 0;
        !p && !y || y && !p && m ? L = jn(S + G * B, h[1][0]) / B : L = Vn(S + (y ? Z : -Z) * B, h[0][0]) / B, V = Math.max(V, L);
      }
    }
  }
  Z = Z + (Z < 0 ? V : -V), W = W + (W < 0 ? P : -P), u && (m ? ie > G * B ? Z = (yh(p, y) ? -W : W) / B : W = (yh(p, y) ? -Z : Z) * B : g ? (Z = W / B, y = p) : (W = Z * B, p = y));
  const $ = p ? S + W : S, H = y ? M + Z : M;
  return {
    width: I + (p ? -W : W),
    height: j + (y ? -Z : Z),
    x: c[0] * W * (p ? -1 : 1) + $,
    y: c[1] * Z * (y ? -1 : 1) + H
  };
}
const qp = { width: 0, height: 0, x: 0, y: 0 }, X1 = {
  ...qp,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function b1(n) {
  return [
    [0, 0],
    [n.measured.width, n.measured.height]
  ];
}
function Q1(n, o, i) {
  const s = o.position.x + n.position.x, u = o.position.y + n.position.y, c = n.measured.width ?? 0, f = n.measured.height ?? 0, h = i[0] * c, p = i[1] * f;
  return [
    [s - h, u - p],
    [s + c - h, u + f - p]
  ];
}
function K1({ domNode: n, nodeId: o, getStoreItems: i, onChange: s, onEnd: u }) {
  const c = Et(n);
  function f({ controlPosition: p, boundaries: y, keepAspectRatio: g, resizeDirection: v, onResizeStart: m, onResize: x, onResizeEnd: k, shouldResize: E }) {
    let C = { ...qp }, N = { ...X1 };
    const O = W1(p);
    let S, M = null, I = [], j, B, W;
    const Z = ap().on("start", (ie) => {
      const { nodeLookup: G, transform: J, snapGrid: q, snapToGrid: P, nodeOrigin: V, paneDomNode: $ } = i();
      if (S = G.get(o), !S)
        return;
      M = ($ == null ? void 0 : $.getBoundingClientRect()) ?? null;
      const { xSnapped: H, ySnapped: R } = ti(ie.sourceEvent, {
        transform: J,
        snapGrid: q,
        snapToGrid: P,
        containerBounds: M
      });
      C = {
        width: S.measured.width ?? 0,
        height: S.measured.height ?? 0,
        x: S.position.x ?? 0,
        y: S.position.y ?? 0
      }, N = {
        ...C,
        pointerX: H,
        pointerY: R,
        aspectRatio: C.width / C.height
      }, j = void 0, S.parentId && (S.extent === "parent" || S.expandParent) && (j = G.get(S.parentId), B = j && S.extent === "parent" ? b1(j) : void 0), I = [], W = void 0;
      for (const [L, D] of G)
        if (D.parentId === o && (I.push({
          id: L,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const _ = Q1(D, S, D.origin ?? V);
          W ? W = [
            [Math.min(_[0][0], W[0][0]), Math.min(_[0][1], W[0][1])],
            [Math.max(_[1][0], W[1][0]), Math.max(_[1][1], W[1][1])]
          ] : W = _;
        }
      m == null || m(ie, { ...C });
    }).on("drag", (ie) => {
      const { transform: G, snapGrid: J, snapToGrid: q, nodeOrigin: P } = i(), V = ti(ie.sourceEvent, {
        transform: G,
        snapGrid: J,
        snapToGrid: q,
        containerBounds: M
      }), $ = [];
      if (!S)
        return;
      const { x: H, y: R, width: L, height: D } = C, _ = {}, F = S.origin ?? P, { width: ne, height: ee, x: ae, y: fe } = Y1(N, O, V, y, g, F, B, W), de = ne !== L, oe = ee !== D, b = ae !== H && de, ce = fe !== R && oe;
      if (!b && !ce && !de && !oe)
        return;
      if ((b || ce || F[0] === 1 || F[1] === 1) && (_.x = b ? ae : C.x, _.y = ce ? fe : C.y, C.x = _.x, C.y = _.y, I.length > 0)) {
        const pe = ae - H, Ne = fe - R;
        for (const Pe of I)
          Pe.position = {
            x: Pe.position.x - pe + F[0] * (ne - L),
            y: Pe.position.y - Ne + F[1] * (ee - D)
          }, $.push(Pe);
      }
      if ((de || oe) && (_.width = de && (!v || v === "horizontal") ? ne : C.width, _.height = oe && (!v || v === "vertical") ? ee : C.height, C.width = _.width, C.height = _.height), j && S.expandParent) {
        const pe = F[0] * (_.width ?? 0);
        _.x && _.x < pe && (C.x = pe, N.x = N.x - (_.x - pe));
        const Ne = F[1] * (_.height ?? 0);
        _.y && _.y < Ne && (C.y = Ne, N.y = N.y - (_.y - Ne));
      }
      const Se = U1({
        width: C.width,
        prevWidth: L,
        height: C.height,
        prevHeight: D,
        affectsX: O.affectsX,
        affectsY: O.affectsY
      }), he = { ...C, direction: Se };
      (E == null ? void 0 : E(ie, he)) !== !1 && (x == null || x(ie, he), s(_, $));
    }).on("end", (ie) => {
      k == null || k(ie, { ...C }), u == null || u({ ...C });
    });
    c.call(Z);
  }
  function h() {
    c.on(".drag", null);
  }
  return {
    update: f,
    destroy: h
  };
}
var Ca = { exports: {} }, Na = {}, Ma = { exports: {} }, Pa = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vh;
function G1() {
  if (vh) return Pa;
  vh = 1;
  var n = di();
  function o(v, m) {
    return v === m && (v !== 0 || 1 / v === 1 / m) || v !== v && m !== m;
  }
  var i = typeof Object.is == "function" ? Object.is : o, s = n.useState, u = n.useEffect, c = n.useLayoutEffect, f = n.useDebugValue;
  function h(v, m) {
    var x = m(), k = s({ inst: { value: x, getSnapshot: m } }), E = k[0].inst, C = k[1];
    return c(
      function() {
        E.value = x, E.getSnapshot = m, p(E) && C({ inst: E });
      },
      [v, x, m]
    ), u(
      function() {
        return p(E) && C({ inst: E }), v(function() {
          p(E) && C({ inst: E });
        });
      },
      [v]
    ), f(x), x;
  }
  function p(v) {
    var m = v.getSnapshot;
    v = v.value;
    try {
      var x = m();
      return !i(v, x);
    } catch {
      return !0;
    }
  }
  function y(v, m) {
    return m();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : h;
  return Pa.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : g, Pa;
}
var wh;
function q1() {
  return wh || (wh = 1, Ma.exports = G1()), Ma.exports;
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
var xh;
function Z1() {
  if (xh) return Na;
  xh = 1;
  var n = di(), o = q1();
  function i(y, g) {
    return y === g && (y !== 0 || 1 / y === 1 / g) || y !== y && g !== g;
  }
  var s = typeof Object.is == "function" ? Object.is : i, u = o.useSyncExternalStore, c = n.useRef, f = n.useEffect, h = n.useMemo, p = n.useDebugValue;
  return Na.useSyncExternalStoreWithSelector = function(y, g, v, m, x) {
    var k = c(null);
    if (k.current === null) {
      var E = { hasValue: !1, value: null };
      k.current = E;
    } else E = k.current;
    k = h(
      function() {
        function N(j) {
          if (!O) {
            if (O = !0, S = j, j = m(j), x !== void 0 && E.hasValue) {
              var B = E.value;
              if (x(B, j))
                return M = B;
            }
            return M = j;
          }
          if (B = M, s(S, j)) return B;
          var W = m(j);
          return x !== void 0 && x(B, W) ? (S = j, B) : (S = j, M = W);
        }
        var O = !1, S, M, I = v === void 0 ? null : v;
        return [
          function() {
            return N(g());
          },
          I === null ? void 0 : function() {
            return N(I());
          }
        ];
      },
      [g, v, m, x]
    );
    var C = u(y, k[0], k[1]);
    return f(
      function() {
        E.hasValue = !0, E.value = C;
      },
      [C]
    ), p(C), C;
  }, Na;
}
var Sh;
function J1() {
  return Sh || (Sh = 1, Ca.exports = Z1()), Ca.exports;
}
var ex = J1();
const tx = /* @__PURE__ */ bh(ex), nx = {}, Eh = (n) => {
  let o;
  const i = /* @__PURE__ */ new Set(), s = (g, v) => {
    const m = typeof g == "function" ? g(o) : g;
    if (!Object.is(m, o)) {
      const x = o;
      o = v ?? (typeof m != "object" || m === null) ? m : Object.assign({}, o, m), i.forEach((k) => k(o, x));
    }
  }, u = () => o, p = { setState: s, getState: u, getInitialState: () => y, subscribe: (g) => (i.add(g), () => i.delete(g)), destroy: () => {
    (nx ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, y = o = n(s, u, p);
  return p;
}, rx = (n) => n ? Eh(n) : Eh, { useDebugValue: ox } = le, { useSyncExternalStoreWithSelector: ix } = tx, lx = (n) => n;
function Zp(n, o = lx, i) {
  const s = ix(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    o,
    i
  );
  return ox(s), s;
}
const _h = (n, o) => {
  const i = rx(n), s = (u, c = o) => Zp(i, u, c);
  return Object.assign(s, i), s;
}, sx = (n, o) => n ? _h(n, o) : _h;
function We(n, o) {
  if (Object.is(n, o))
    return !0;
  if (typeof n != "object" || n === null || typeof o != "object" || o === null)
    return !1;
  if (n instanceof Map && o instanceof Map) {
    if (n.size !== o.size) return !1;
    for (const [s, u] of n)
      if (!Object.is(u, o.get(s)))
        return !1;
    return !0;
  }
  if (n instanceof Set && o instanceof Set) {
    if (n.size !== o.size) return !1;
    for (const s of n)
      if (!o.has(s))
        return !1;
    return !0;
  }
  const i = Object.keys(n);
  if (i.length !== Object.keys(o).length)
    return !1;
  for (const s of i)
    if (!Object.prototype.hasOwnProperty.call(o, s) || !Object.is(n[s], o[s]))
      return !1;
  return !0;
}
Qh();
const ys = Q.createContext(null), ux = ys.Provider, Jp = tn.error001();
function Te(n, o) {
  const i = Q.useContext(ys);
  if (i === null)
    throw new Error(Jp);
  return Zp(i, n, o);
}
function je() {
  const n = Q.useContext(ys);
  if (n === null)
    throw new Error(Jp);
  return Q.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const kh = { display: "none" }, ax = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, em = "react-flow__node-desc", tm = "react-flow__edge-desc", cx = "react-flow__aria-live", fx = (n) => n.ariaLiveMessage, dx = (n) => n.ariaLabelConfig;
function hx({ rfId: n }) {
  const o = Te(fx);
  return K.jsx("div", { id: `${cx}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: ax, children: o });
}
function px({ rfId: n, disableKeyboardA11y: o }) {
  const i = Te(dx);
  return K.jsxs(K.Fragment, { children: [K.jsx("div", { id: `${em}-${n}`, style: kh, children: o ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), K.jsx("div", { id: `${tm}-${n}`, style: kh, children: i["edge.a11yDescription.default"] }), !o && K.jsx(hx, { rfId: n })] });
}
const vs = Q.forwardRef(({ position: n = "top-left", children: o, className: i, style: s, ...u }, c) => {
  const f = `${n}`.split("-");
  return K.jsx("div", { className: Qe(["react-flow__panel", i, ...f]), style: s, ref: c, ...u, children: o });
});
vs.displayName = "Panel";
function mx({ proOptions: n, position: o = "bottom-right" }) {
  return n != null && n.hideAttribution ? null : K.jsx(vs, { position: o, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: K.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const gx = (n) => {
  const o = [], i = [];
  for (const [, s] of n.nodeLookup)
    s.selected && o.push(s.internals.userNode);
  for (const [, s] of n.edgeLookup)
    s.selected && i.push(s);
  return { selectedNodes: o, selectedEdges: i };
}, Ul = (n) => n.id;
function yx(n, o) {
  return We(n.selectedNodes.map(Ul), o.selectedNodes.map(Ul)) && We(n.selectedEdges.map(Ul), o.selectedEdges.map(Ul));
}
function vx({ onSelectionChange: n }) {
  const o = je(), { selectedNodes: i, selectedEdges: s } = Te(gx, yx);
  return Q.useEffect(() => {
    const u = { nodes: i, edges: s };
    n == null || n(u), o.getState().onSelectionChangeHandlers.forEach((c) => c(u));
  }, [i, s, n]), null;
}
const wx = (n) => !!n.onSelectionChangeHandlers;
function xx({ onSelectionChange: n }) {
  const o = Te(wx);
  return n || o ? K.jsx(vx, { onSelectionChange: n }) : null;
}
const nm = [0, 0], Sx = { x: 0, y: 0, zoom: 1 }, Ex = [
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
], Ch = [...Ex, "rfId"], _x = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges,
  setPaneClickDistance: n.setPaneClickDistance
}), Nh = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: li,
  nodeOrigin: nm,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1",
  paneClickDistance: 0
};
function kx(n) {
  const { setNodes: o, setEdges: i, setMinZoom: s, setMaxZoom: u, setTranslateExtent: c, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: p, setPaneClickDistance: y } = Te(_x, We), g = je();
  Q.useEffect(() => (p(n.defaultNodes, n.defaultEdges), () => {
    v.current = Nh, h();
  }), []);
  const v = Q.useRef(Nh);
  return Q.useEffect(
    () => {
      for (const m of Ch) {
        const x = n[m], k = v.current[m];
        x !== k && (typeof n[m] > "u" || (m === "nodes" ? o(x) : m === "edges" ? i(x) : m === "minZoom" ? s(x) : m === "maxZoom" ? u(x) : m === "translateExtent" ? c(x) : m === "nodeExtent" ? f(x) : m === "paneClickDistance" ? y(x) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: u1(x) }) : m === "fitView" ? g.setState({ fitViewQueued: x }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: x }) : g.setState({ [m]: x })));
      }
      v.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    Ch.map((m) => n[m])
  ), null;
}
function Mh() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function Cx(n) {
  var s;
  const [o, i] = Q.useState(n === "system" ? null : n);
  return Q.useEffect(() => {
    if (n !== "system") {
      i(n);
      return;
    }
    const u = Mh(), c = () => i(u != null && u.matches ? "dark" : "light");
    return c(), u == null || u.addEventListener("change", c), () => {
      u == null || u.removeEventListener("change", c);
    };
  }, [n]), o !== null ? o : (s = Mh()) != null && s.matches ? "dark" : "light";
}
const Ph = typeof document < "u" ? document : null;
function fi(n = null, o = { target: Ph, actInsideInputWithModifier: !0 }) {
  const [i, s] = Q.useState(!1), u = Q.useRef(!1), c = Q.useRef(/* @__PURE__ */ new Set([])), [f, h] = Q.useMemo(() => {
    if (n !== null) {
      const y = (Array.isArray(n) ? n : [n]).filter((v) => typeof v == "string").map((v) => v.replace("+", `
`).replace(`

`, `
+`).split(`
`)), g = y.reduce((v, m) => v.concat(...m), []);
      return [y, g];
    }
    return [[], []];
  }, [n]);
  return Q.useEffect(() => {
    const p = (o == null ? void 0 : o.target) ?? Ph, y = (o == null ? void 0 : o.actInsideInputWithModifier) ?? !0;
    if (n !== null) {
      const g = (x) => {
        var C, N;
        if (u.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!u.current || u.current && !y) && Op(x))
          return !1;
        const E = Lh(x.code, h);
        if (c.current.add(x[E]), Th(f, c.current, !1)) {
          const O = ((N = (C = x.composedPath) == null ? void 0 : C.call(x)) == null ? void 0 : N[0]) || x.target, S = (O == null ? void 0 : O.nodeName) === "BUTTON" || (O == null ? void 0 : O.nodeName) === "A";
          o.preventDefault !== !1 && (u.current || !S) && x.preventDefault(), s(!0);
        }
      }, v = (x) => {
        const k = Lh(x.code, h);
        Th(f, c.current, !0) ? (s(!1), c.current.clear()) : c.current.delete(x[k]), x.key === "Meta" && c.current.clear(), u.current = !1;
      }, m = () => {
        c.current.clear(), s(!1);
      };
      return p == null || p.addEventListener("keydown", g), p == null || p.addEventListener("keyup", v), window.addEventListener("blur", m), window.addEventListener("contextmenu", m), () => {
        p == null || p.removeEventListener("keydown", g), p == null || p.removeEventListener("keyup", v), window.removeEventListener("blur", m), window.removeEventListener("contextmenu", m);
      };
    }
  }, [n, s]), i;
}
function Th(n, o, i) {
  return n.filter((s) => i || s.length === o.size).some((s) => s.every((u) => o.has(u)));
}
function Lh(n, o) {
  return o.includes(n) ? "code" : "key";
}
const Nx = () => {
  const n = je();
  return Q.useMemo(() => ({
    zoomIn: (o) => {
      const { panZoom: i } = n.getState();
      return i ? i.scaleBy(1.2, { duration: o == null ? void 0 : o.duration }) : Promise.resolve(!1);
    },
    zoomOut: (o) => {
      const { panZoom: i } = n.getState();
      return i ? i.scaleBy(1 / 1.2, { duration: o == null ? void 0 : o.duration }) : Promise.resolve(!1);
    },
    zoomTo: (o, i) => {
      const { panZoom: s } = n.getState();
      return s ? s.scaleTo(o, { duration: i == null ? void 0 : i.duration }) : Promise.resolve(!1);
    },
    getZoom: () => n.getState().transform[2],
    setViewport: async (o, i) => {
      const { transform: [s, u, c], panZoom: f } = n.getState();
      return f ? (await f.setViewport({
        x: o.x ?? s,
        y: o.y ?? u,
        zoom: o.zoom ?? c
      }, i), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    getViewport: () => {
      const [o, i, s] = n.getState().transform;
      return { x: o, y: i, zoom: s };
    },
    setCenter: async (o, i, s) => n.getState().setCenter(o, i, s),
    fitBounds: async (o, i) => {
      const { width: s, height: u, minZoom: c, maxZoom: f, panZoom: h } = n.getState(), p = ec(o, s, u, c, f, (i == null ? void 0 : i.padding) ?? 0.1);
      return h ? (await h.setViewport(p, {
        duration: i == null ? void 0 : i.duration,
        ease: i == null ? void 0 : i.ease,
        interpolate: i == null ? void 0 : i.interpolate
      }), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    screenToFlowPosition: (o, i = {}) => {
      const { transform: s, snapGrid: u, snapToGrid: c, domNode: f } = n.getState();
      if (!f)
        return o;
      const { x: h, y: p } = f.getBoundingClientRect(), y = {
        x: o.x - h,
        y: o.y - p
      }, g = i.snapGrid ?? u, v = i.snapToGrid ?? c;
      return yi(y, s, v, g);
    },
    flowToScreenPosition: (o) => {
      const { transform: i, domNode: s } = n.getState();
      if (!s)
        return o;
      const { x: u, y: c } = s.getBoundingClientRect(), f = is(o, i);
      return {
        x: f.x + u,
        y: f.y + c
      };
    }
  }), []);
};
function rm(n, o) {
  const i = [], s = /* @__PURE__ */ new Map(), u = [];
  for (const c of n)
    if (c.type === "add") {
      u.push(c);
      continue;
    } else if (c.type === "remove" || c.type === "replace")
      s.set(c.id, [c]);
    else {
      const f = s.get(c.id);
      f ? f.push(c) : s.set(c.id, [c]);
    }
  for (const c of o) {
    const f = s.get(c.id);
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
    const h = { ...c };
    for (const p of f)
      Mx(p, h);
    i.push(h);
  }
  return u.length && u.forEach((c) => {
    c.index !== void 0 ? i.splice(c.index, 0, { ...c.item }) : i.push({ ...c.item });
  }), i;
}
function Mx(n, o) {
  switch (n.type) {
    case "select": {
      o.selected = n.selected;
      break;
    }
    case "position": {
      typeof n.position < "u" && (o.position = n.position), typeof n.dragging < "u" && (o.dragging = n.dragging);
      break;
    }
    case "dimensions": {
      typeof n.dimensions < "u" && (o.measured ?? (o.measured = {}), o.measured.width = n.dimensions.width, o.measured.height = n.dimensions.height, n.setAttributes && ((n.setAttributes === !0 || n.setAttributes === "width") && (o.width = n.dimensions.width), (n.setAttributes === !0 || n.setAttributes === "height") && (o.height = n.dimensions.height))), typeof n.resizing == "boolean" && (o.resizing = n.resizing);
      break;
    }
  }
}
function Px(n, o) {
  return rm(n, o);
}
function Tx(n, o) {
  return rm(n, o);
}
function cr(n, o) {
  return {
    id: n,
    type: "select",
    selected: o
  };
}
function br(n, o = /* @__PURE__ */ new Set(), i = !1) {
  const s = [];
  for (const [u, c] of n) {
    const f = o.has(u);
    !(c.selected === void 0 && !f) && c.selected !== f && (i && (c.selected = f), s.push(cr(c.id, f)));
  }
  return s;
}
function zh({ items: n = [], lookup: o }) {
  var u;
  const i = [], s = new Map(n.map((c) => [c.id, c]));
  for (const [c, f] of n.entries()) {
    const h = o.get(f.id), p = ((u = h == null ? void 0 : h.internals) == null ? void 0 : u.userNode) ?? h;
    p !== void 0 && p !== f && i.push({ id: f.id, item: f, type: "replace" }), p === void 0 && i.push({ item: f, type: "add", index: c });
  }
  for (const [c] of o)
    s.get(c) === void 0 && i.push({ id: c, type: "remove" });
  return i;
}
function Ih(n) {
  return {
    id: n.id,
    type: "remove"
  };
}
const Rh = (n) => Zw(n), Lx = (n) => Tp(n);
function om(n) {
  return Q.forwardRef(n);
}
const zx = typeof window < "u" ? Q.useLayoutEffect : Q.useEffect;
function Ah(n) {
  const [o, i] = Q.useState(BigInt(0)), [s] = Q.useState(() => Ix(() => i((u) => u + BigInt(1))));
  return zx(() => {
    const u = s.get();
    u.length && (n(u), s.reset());
  }, [o]), s;
}
function Ix(n) {
  let o = [];
  return {
    get: () => o,
    reset: () => {
      o = [];
    },
    push: (i) => {
      o.push(i), n();
    }
  };
}
const im = Q.createContext(null);
function Rx({ children: n }) {
  const o = je(), i = Q.useCallback((h) => {
    const { nodes: p = [], setNodes: y, hasDefaultNodes: g, onNodesChange: v, nodeLookup: m, fitViewQueued: x } = o.getState();
    let k = p;
    for (const C of h)
      k = typeof C == "function" ? C(k) : C;
    const E = zh({
      items: k,
      lookup: m
    });
    g && y(k), E.length > 0 ? v == null || v(E) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: C, nodes: N, setNodes: O } = o.getState();
      C && O(N);
    });
  }, []), s = Ah(i), u = Q.useCallback((h) => {
    const { edges: p = [], setEdges: y, hasDefaultEdges: g, onEdgesChange: v, edgeLookup: m } = o.getState();
    let x = p;
    for (const k of h)
      x = typeof k == "function" ? k(x) : k;
    g ? y(x) : v && v(zh({
      items: x,
      lookup: m
    }));
  }, []), c = Ah(u), f = Q.useMemo(() => ({ nodeQueue: s, edgeQueue: c }), []);
  return K.jsx(im.Provider, { value: f, children: n });
}
function Ax() {
  const n = Q.useContext(im);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const $x = (n) => !!n.panZoom;
function sc() {
  const n = Nx(), o = je(), i = Ax(), s = Te($x), u = Q.useMemo(() => {
    const c = (v) => o.getState().nodeLookup.get(v), f = (v) => {
      i.nodeQueue.push(v);
    }, h = (v) => {
      i.edgeQueue.push(v);
    }, p = (v) => {
      var N, O;
      const { nodeLookup: m, nodeOrigin: x } = o.getState(), k = Rh(v) ? v : m.get(v.id), E = k.parentId ? $p(k.position, k.measured, k.parentId, m, x) : k.position, C = {
        ...k,
        position: E,
        width: ((N = k.measured) == null ? void 0 : N.width) ?? k.width,
        height: ((O = k.measured) == null ? void 0 : O.height) ?? k.height
      };
      return eo(C);
    }, y = (v, m, x = { replace: !1 }) => {
      f((k) => k.map((E) => {
        if (E.id === v) {
          const C = typeof m == "function" ? m(E) : m;
          return x.replace && Rh(C) ? C : { ...E, ...C };
        }
        return E;
      }));
    }, g = (v, m, x = { replace: !1 }) => {
      h((k) => k.map((E) => {
        if (E.id === v) {
          const C = typeof m == "function" ? m(E) : m;
          return x.replace && Lx(C) ? C : { ...E, ...C };
        }
        return E;
      }));
    };
    return {
      getNodes: () => o.getState().nodes.map((v) => ({ ...v })),
      getNode: (v) => {
        var m;
        return (m = c(v)) == null ? void 0 : m.internals.userNode;
      },
      getInternalNode: c,
      getEdges: () => {
        const { edges: v = [] } = o.getState();
        return v.map((m) => ({ ...m }));
      },
      getEdge: (v) => o.getState().edgeLookup.get(v),
      setNodes: f,
      setEdges: h,
      addNodes: (v) => {
        const m = Array.isArray(v) ? v : [v];
        i.nodeQueue.push((x) => [...x, ...m]);
      },
      addEdges: (v) => {
        const m = Array.isArray(v) ? v : [v];
        i.edgeQueue.push((x) => [...x, ...m]);
      },
      toObject: () => {
        const { nodes: v = [], edges: m = [], transform: x } = o.getState(), [k, E, C] = x;
        return {
          nodes: v.map((N) => ({ ...N })),
          edges: m.map((N) => ({ ...N })),
          viewport: {
            x: k,
            y: E,
            zoom: C
          }
        };
      },
      deleteElements: async ({ nodes: v = [], edges: m = [] }) => {
        const { nodes: x, edges: k, onNodesDelete: E, onEdgesDelete: C, triggerNodeChanges: N, triggerEdgeChanges: O, onDelete: S, onBeforeDelete: M } = o.getState(), { nodes: I, edges: j } = await r1({
          nodesToRemove: v,
          edgesToRemove: m,
          nodes: x,
          edges: k,
          onBeforeDelete: M
        }), B = j.length > 0, W = I.length > 0;
        if (B) {
          const Z = j.map(Ih);
          C == null || C(j), O(Z);
        }
        if (W) {
          const Z = I.map(Ih);
          E == null || E(I), N(Z);
        }
        return (W || B) && (S == null || S({ nodes: I, edges: j })), { deletedNodes: I, deletedEdges: j };
      },
      getIntersectingNodes: (v, m = !0, x) => {
        const k = lh(v), E = k ? v : p(v), C = x !== void 0;
        return E ? (x || o.getState().nodes).filter((N) => {
          const O = o.getState().nodeLookup.get(N.id);
          if (O && !k && (N.id === v.id || !O.internals.positionAbsolute))
            return !1;
          const S = eo(C ? N : O), M = ai(S, E);
          return m && M > 0 || M >= E.width * E.height;
        }) : [];
      },
      isNodeIntersecting: (v, m, x = !0) => {
        const E = lh(v) ? v : p(v);
        if (!E)
          return !1;
        const C = ai(E, m);
        return x && C > 0 || C >= E.width * E.height;
      },
      updateNode: y,
      updateNodeData: (v, m, x = { replace: !1 }) => {
        y(v, (k) => {
          const E = typeof m == "function" ? m(k) : m;
          return x.replace ? { ...k, data: E } : { ...k, data: { ...k.data, ...E } };
        }, x);
      },
      updateEdge: g,
      updateEdgeData: (v, m, x = { replace: !1 }) => {
        g(v, (k) => {
          const E = typeof m == "function" ? m(k) : m;
          return x.replace ? { ...k, data: E } : { ...k, data: { ...k.data, ...E } };
        }, x);
      },
      getNodesBounds: (v) => {
        const { nodeLookup: m, nodeOrigin: x } = o.getState();
        return Jw(v, { nodeLookup: m, nodeOrigin: x });
      },
      getHandleConnections: ({ type: v, id: m, nodeId: x }) => {
        var k;
        return Array.from(((k = o.getState().connectionLookup.get(`${x}-${v}${m ? `-${m}` : ""}`)) == null ? void 0 : k.values()) ?? []);
      },
      getNodeConnections: ({ type: v, handleId: m, nodeId: x }) => {
        var k;
        return Array.from(((k = o.getState().connectionLookup.get(`${x}${v ? m ? `-${v}-${m}` : `-${v}` : ""}`)) == null ? void 0 : k.values()) ?? []);
      },
      fitView: async (v) => {
        const m = o.getState().fitViewResolver ?? s1();
        return o.setState({ fitViewQueued: !0, fitViewOptions: v, fitViewResolver: m }), i.nodeQueue.push((x) => [...x]), m.promise;
      }
    };
  }, []);
  return Q.useMemo(() => ({
    ...u,
    ...n,
    viewportInitialized: s
  }), [s]);
}
const $h = (n) => n.selected, Dx = typeof window < "u" ? window : void 0;
function Ox({ deleteKeyCode: n, multiSelectionKeyCode: o }) {
  const i = je(), { deleteElements: s } = sc(), u = fi(n, { actInsideInputWithModifier: !1 }), c = fi(o, { target: Dx });
  Q.useEffect(() => {
    if (u) {
      const { edges: f, nodes: h } = i.getState();
      s({ nodes: h.filter($h), edges: f.filter($h) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [u]), Q.useEffect(() => {
    i.setState({ multiSelectionActive: c });
  }, [c]);
}
function Fx(n) {
  const o = je();
  Q.useEffect(() => {
    const i = () => {
      var u, c;
      if (!n.current)
        return !1;
      const s = tc(n.current);
      (s.height === 0 || s.width === 0) && ((c = (u = o.getState()).onError) == null || c.call(u, "004", tn.error004())), o.setState({ width: s.width || 500, height: s.height || 500 });
    };
    if (n.current) {
      i(), window.addEventListener("resize", i);
      const s = new ResizeObserver(() => i());
      return s.observe(n.current), () => {
        window.removeEventListener("resize", i), s && n.current && s.unobserve(n.current);
      };
    }
  }, []);
}
const ws = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Hx = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib
});
function jx({ onPaneContextMenu: n, zoomOnScroll: o = !0, zoomOnPinch: i = !0, panOnScroll: s = !1, panOnScrollSpeed: u = 0.5, panOnScrollMode: c = hr.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: p, translateExtent: y, minZoom: g, maxZoom: v, zoomActivationKeyCode: m, preventScrolling: x = !0, children: k, noWheelClassName: E, noPanClassName: C, onViewportChange: N, isControlledViewport: O, paneClickDistance: S }) {
  const M = je(), I = Q.useRef(null), { userSelectionActive: j, lib: B } = Te(Hx, We), W = fi(m), Z = Q.useRef();
  Fx(I);
  const ie = Q.useCallback((G) => {
    N == null || N({ x: G[0], y: G[1], zoom: G[2] }), O || M.setState({ transform: G });
  }, [N, O]);
  return Q.useEffect(() => {
    if (I.current) {
      Z.current = B1({
        domNode: I.current,
        minZoom: g,
        maxZoom: v,
        translateExtent: y,
        viewport: p,
        paneClickDistance: S,
        onDraggingChange: (P) => M.setState({ paneDragging: P }),
        onPanZoomStart: (P, V) => {
          const { onViewportChangeStart: $, onMoveStart: H } = M.getState();
          H == null || H(P, V), $ == null || $(V);
        },
        onPanZoom: (P, V) => {
          const { onViewportChange: $, onMove: H } = M.getState();
          H == null || H(P, V), $ == null || $(V);
        },
        onPanZoomEnd: (P, V) => {
          const { onViewportChangeEnd: $, onMoveEnd: H } = M.getState();
          H == null || H(P, V), $ == null || $(V);
        }
      });
      const { x: G, y: J, zoom: q } = Z.current.getViewport();
      return M.setState({
        panZoom: Z.current,
        transform: [G, J, q],
        domNode: I.current.closest(".react-flow")
      }), () => {
        var P;
        (P = Z.current) == null || P.destroy();
      };
    }
  }, []), Q.useEffect(() => {
    var G;
    (G = Z.current) == null || G.update({
      onPaneContextMenu: n,
      zoomOnScroll: o,
      zoomOnPinch: i,
      panOnScroll: s,
      panOnScrollSpeed: u,
      panOnScrollMode: c,
      zoomOnDoubleClick: f,
      panOnDrag: h,
      zoomActivationKeyPressed: W,
      preventScrolling: x,
      noPanClassName: C,
      userSelectionActive: j,
      noWheelClassName: E,
      lib: B,
      onTransformChange: ie
    });
  }, [
    n,
    o,
    i,
    s,
    u,
    c,
    f,
    h,
    W,
    x,
    C,
    j,
    E,
    B,
    ie
  ]), K.jsx("div", { className: "react-flow__renderer", ref: I, style: ws, children: k });
}
const Vx = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function Bx() {
  const { userSelectionActive: n, userSelectionRect: o } = Te(Vx, We);
  return n && o ? K.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: o.width,
    height: o.height,
    transform: `translate(${o.x}px, ${o.y}px)`
  } }) : null;
}
const Ta = (n, o) => (i) => {
  i.target === o.current && (n == null || n(i));
}, Ux = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  connectionInProgress: n.connection.inProgress,
  dragging: n.paneDragging
});
function Wx({ isSelecting: n, selectionKeyPressed: o, selectionMode: i = si.Full, panOnDrag: s, selectionOnDrag: u, onSelectionStart: c, onSelectionEnd: f, onPaneClick: h, onPaneContextMenu: p, onPaneScroll: y, onPaneMouseEnter: g, onPaneMouseMove: v, onPaneMouseLeave: m, children: x }) {
  const k = je(), { userSelectionActive: E, elementsSelectable: C, dragging: N, connectionInProgress: O } = Te(Ux, We), S = C && (n || E), M = Q.useRef(null), I = Q.useRef(), j = Q.useRef(/* @__PURE__ */ new Set()), B = Q.useRef(/* @__PURE__ */ new Set()), W = Q.useRef(!1), Z = Q.useRef(!1), ie = (H) => {
    if (W.current || O) {
      W.current = !1;
      return;
    }
    h == null || h(H), k.getState().resetSelectedElements(), k.setState({ nodesSelectionActive: !1 });
  }, G = (H) => {
    if (Array.isArray(s) && (s != null && s.includes(2))) {
      H.preventDefault();
      return;
    }
    p == null || p(H);
  }, J = y ? (H) => y(H) : void 0, q = (H) => {
    var F, ne;
    const { resetSelectedElements: R, domNode: L } = k.getState();
    if (I.current = L == null ? void 0 : L.getBoundingClientRect(), !C || !n || H.button !== 0 || H.target !== M.current || !I.current)
      return;
    (ne = (F = H.target) == null ? void 0 : F.setPointerCapture) == null || ne.call(F, H.pointerId), Z.current = !0, W.current = !1;
    const { x: D, y: _ } = Jt(H.nativeEvent, I.current);
    R(), k.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: D,
        startY: _,
        x: D,
        y: _
      }
    }), c == null || c(H);
  }, P = (H) => {
    const { userSelectionRect: R, transform: L, nodeLookup: D, edgeLookup: _, connectionLookup: F, triggerNodeChanges: ne, triggerEdgeChanges: ee, defaultEdgeOptions: ae } = k.getState();
    if (!I.current || !R)
      return;
    W.current = !0;
    const { x: fe, y: de } = Jt(H.nativeEvent, I.current), { startX: oe, startY: b } = R, ce = {
      startX: oe,
      startY: b,
      x: fe < oe ? fe : oe,
      y: de < b ? de : b,
      width: Math.abs(fe - oe),
      height: Math.abs(de - b)
    }, Se = j.current, he = B.current;
    j.current = new Set(Ja(D, ce, L, i === si.Partial, !0).map((pe) => pe.id)), B.current = /* @__PURE__ */ new Set();
    const me = (ae == null ? void 0 : ae.selectable) ?? !0;
    for (const pe of j.current) {
      const Ne = F.get(pe);
      if (Ne)
        for (const { edgeId: Pe } of Ne.values()) {
          const Ae = _.get(Pe);
          Ae && (Ae.selectable ?? me) && B.current.add(Pe);
        }
    }
    if (!sh(Se, j.current)) {
      const pe = br(D, j.current, !0);
      ne(pe);
    }
    if (!sh(he, B.current)) {
      const pe = br(_, B.current);
      ee(pe);
    }
    k.setState({
      userSelectionRect: ce,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }, V = (H) => {
    var L, D;
    if (H.button !== 0 || !Z.current)
      return;
    (D = (L = H.target) == null ? void 0 : L.releasePointerCapture) == null || D.call(L, H.pointerId);
    const { userSelectionRect: R } = k.getState();
    !E && R && H.target === M.current && (ie == null || ie(H)), k.setState({
      userSelectionActive: !1,
      userSelectionRect: null,
      nodesSelectionActive: j.current.size > 0
    }), f == null || f(H), (o || u) && (W.current = !1), Z.current = !1;
  }, $ = s === !0 || Array.isArray(s) && s.includes(0);
  return K.jsxs("div", { className: Qe(["react-flow__pane", { draggable: $, dragging: N, selection: n }]), onClick: S ? void 0 : Ta(ie, M), onContextMenu: Ta(G, M), onWheel: Ta(J, M), onPointerEnter: S ? void 0 : g, onPointerDown: S ? q : v, onPointerMove: S ? P : v, onPointerUp: S ? V : void 0, onPointerLeave: m, ref: M, style: ws, children: [x, K.jsx(Bx, {})] });
}
function Wa({ id: n, store: o, unselect: i = !1, nodeRef: s }) {
  const { addSelectedNodes: u, unselectNodesAndEdges: c, multiSelectionActive: f, nodeLookup: h, onError: p } = o.getState(), y = h.get(n);
  if (!y) {
    p == null || p("012", tn.error012(n));
    return;
  }
  o.setState({ nodesSelectionActive: !1 }), y.selected ? (i || y.selected && f) && (c({ nodes: [y], edges: [] }), requestAnimationFrame(() => {
    var g;
    return (g = s == null ? void 0 : s.current) == null ? void 0 : g.blur();
  })) : u([n]);
}
function lm({ nodeRef: n, disabled: o = !1, noDragClassName: i, handleSelector: s, nodeId: u, isSelectable: c, nodeClickDistance: f }) {
  const h = je(), [p, y] = Q.useState(!1), g = Q.useRef();
  return Q.useEffect(() => {
    g.current = M1({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (v) => {
        Wa({
          id: v,
          store: h,
          nodeRef: n
        });
      },
      onDragStart: () => {
        y(!0);
      },
      onDragStop: () => {
        y(!1);
      }
    });
  }, []), Q.useEffect(() => {
    var v, m;
    if (o)
      (v = g.current) == null || v.destroy();
    else if (n.current)
      return (m = g.current) == null || m.update({
        noDragClassName: i,
        handleSelector: s,
        domNode: n.current,
        isSelectable: c,
        nodeId: u,
        nodeClickDistance: f
      }), () => {
        var x;
        (x = g.current) == null || x.destroy();
      };
  }, [i, s, o, c, n, u]), p;
}
const Yx = (n) => (o) => o.selected && (o.draggable || n && typeof o.draggable > "u");
function sm() {
  const n = je();
  return Q.useCallback((i) => {
    const { nodeExtent: s, snapToGrid: u, snapGrid: c, nodesDraggable: f, onError: h, updateNodePositions: p, nodeLookup: y, nodeOrigin: g } = n.getState(), v = /* @__PURE__ */ new Map(), m = Yx(f), x = u ? c[0] : 5, k = u ? c[1] : 5, E = i.direction.x * x * i.factor, C = i.direction.y * k * i.factor;
    for (const [, N] of y) {
      if (!m(N))
        continue;
      let O = {
        x: N.internals.positionAbsolute.x + E,
        y: N.internals.positionAbsolute.y + C
      };
      u && (O = ms(O, c));
      const { position: S, positionAbsolute: M } = Lp({
        nodeId: N.id,
        nextPosition: O,
        nodeLookup: y,
        nodeExtent: s,
        nodeOrigin: g,
        onError: h
      });
      N.position = S, N.internals.positionAbsolute = M, v.set(N.id, N);
    }
    p(v);
  }, []);
}
const uc = Q.createContext(null), Xx = uc.Provider;
uc.Consumer;
const um = () => Q.useContext(uc), bx = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), Qx = (n, o, i) => (s) => {
  const { connectionClickStartHandle: u, connectionMode: c, connection: f } = s, { fromHandle: h, toHandle: p, isValid: y } = f, g = (p == null ? void 0 : p.nodeId) === n && (p == null ? void 0 : p.id) === o && (p == null ? void 0 : p.type) === i;
  return {
    connectingFrom: (h == null ? void 0 : h.nodeId) === n && (h == null ? void 0 : h.id) === o && (h == null ? void 0 : h.type) === i,
    connectingTo: g,
    clickConnecting: (u == null ? void 0 : u.nodeId) === n && (u == null ? void 0 : u.id) === o && (u == null ? void 0 : u.type) === i,
    isPossibleEndHandle: c === Zr.Strict ? (h == null ? void 0 : h.type) !== i : n !== (h == null ? void 0 : h.nodeId) || o !== (h == null ? void 0 : h.id),
    connectionInProcess: !!h,
    clickConnectionInProcess: !!u,
    valid: g && y
  };
};
function Kx({ type: n = "source", position: o = Ee.Top, isValidConnection: i, isConnectable: s = !0, isConnectableStart: u = !0, isConnectableEnd: c = !0, id: f, onConnect: h, children: p, className: y, onMouseDown: g, onTouchStart: v, ...m }, x) {
  var V, $;
  const k = f || null, E = n === "target", C = je(), N = um(), { connectOnClick: O, noPanClassName: S, rfId: M } = Te(bx, We), { connectingFrom: I, connectingTo: j, clickConnecting: B, isPossibleEndHandle: W, connectionInProcess: Z, clickConnectionInProcess: ie, valid: G } = Te(Qx(N, k, n), We);
  N || ($ = (V = C.getState()).onError) == null || $.call(V, "010", tn.error010());
  const J = (H) => {
    const { defaultEdgeOptions: R, onConnect: L, hasDefaultEdges: D } = C.getState(), _ = {
      ...R,
      ...H
    };
    if (D) {
      const { edges: F, setEdges: ne } = C.getState();
      ne(p1(_, F));
    }
    L == null || L(_), h == null || h(_);
  }, q = (H) => {
    if (!N)
      return;
    const R = Fp(H.nativeEvent);
    if (u && (R && H.button === 0 || !R)) {
      const L = C.getState();
      Ua.onPointerDown(H.nativeEvent, {
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: E,
        handleId: k,
        nodeId: N,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: L.onConnectEnd,
        updateConnection: L.updateConnection,
        onConnect: J,
        isValidConnection: i || L.isValidConnection,
        getTransform: () => C.getState().transform,
        getFromHandle: () => C.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    R ? g == null || g(H) : v == null || v(H);
  }, P = (H) => {
    const { onClickConnectStart: R, onClickConnectEnd: L, connectionClickStartHandle: D, connectionMode: _, isValidConnection: F, lib: ne, rfId: ee, nodeLookup: ae, connection: fe } = C.getState();
    if (!N || !D && !u)
      return;
    if (!D) {
      R == null || R(H.nativeEvent, { nodeId: N, handleId: k, handleType: n }), C.setState({ connectionClickStartHandle: { nodeId: N, type: n, id: k } });
      return;
    }
    const de = Dp(H.target), oe = i || F, { connection: b, isValid: ce } = Ua.isValid(H.nativeEvent, {
      handle: {
        nodeId: N,
        id: k,
        type: n
      },
      connectionMode: _,
      fromNodeId: D.nodeId,
      fromHandleId: D.id || null,
      fromType: D.type,
      isValidConnection: oe,
      flowId: ee,
      doc: de,
      lib: ne,
      nodeLookup: ae
    });
    ce && b && J(b);
    const Se = structuredClone(fe);
    delete Se.inProgress, Se.toPosition = Se.toHandle ? Se.toHandle.position : null, L == null || L(H, Se), C.setState({ connectionClickStartHandle: null });
  };
  return K.jsx("div", { "data-handleid": k, "data-nodeid": N, "data-handlepos": o, "data-id": `${M}-${N}-${k}-${n}`, className: Qe([
    "react-flow__handle",
    `react-flow__handle-${o}`,
    "nodrag",
    S,
    y,
    {
      source: !E,
      target: E,
      connectable: s,
      connectablestart: u,
      connectableend: c,
      clickconnecting: B,
      connectingfrom: I,
      connectingto: j,
      valid: G,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: s && (!Z || W) && (Z || ie ? c : u)
    }
  ]), onMouseDown: q, onTouchStart: q, onClick: O ? P : void 0, ref: x, ...m, children: p });
}
const ro = Q.memo(om(Kx));
function Gx({ data: n, isConnectable: o, sourcePosition: i = Ee.Bottom }) {
  return K.jsxs(K.Fragment, { children: [n == null ? void 0 : n.label, K.jsx(ro, { type: "source", position: i, isConnectable: o })] });
}
function qx({ data: n, isConnectable: o, targetPosition: i = Ee.Top, sourcePosition: s = Ee.Bottom }) {
  return K.jsxs(K.Fragment, { children: [K.jsx(ro, { type: "target", position: i, isConnectable: o }), n == null ? void 0 : n.label, K.jsx(ro, { type: "source", position: s, isConnectable: o })] });
}
function Zx() {
  return null;
}
function Jx({ data: n, isConnectable: o, targetPosition: i = Ee.Top }) {
  return K.jsxs(K.Fragment, { children: [K.jsx(ro, { type: "target", position: i, isConnectable: o }), n == null ? void 0 : n.label] });
}
const ss = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Dh = {
  input: Gx,
  default: qx,
  output: Jx,
  group: Zx
};
function eS(n) {
  var o, i, s, u;
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? ((o = n.style) == null ? void 0 : o.width),
    height: n.height ?? n.initialHeight ?? ((i = n.style) == null ? void 0 : i.height)
  } : {
    width: n.width ?? ((s = n.style) == null ? void 0 : s.width),
    height: n.height ?? ((u = n.style) == null ? void 0 : u.height)
  };
}
const tS = (n) => {
  const { width: o, height: i, x: s, y: u } = gi(n.nodeLookup, {
    filter: (c) => !!c.selected
  });
  return {
    width: Ut(o) ? o : null,
    height: Ut(i) ? i : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${s}px,${u}px)`
  };
};
function nS({ onSelectionContextMenu: n, noPanClassName: o, disableKeyboardA11y: i }) {
  const s = je(), { width: u, height: c, transformString: f, userSelectionActive: h } = Te(tS, We), p = sm(), y = Q.useRef(null);
  if (Q.useEffect(() => {
    var m;
    i || (m = y.current) == null || m.focus({
      preventScroll: !0
    });
  }, [i]), lm({
    nodeRef: y
  }), h || !u || !c)
    return null;
  const g = n ? (m) => {
    const x = s.getState().nodes.filter((k) => k.selected);
    n(m, x);
  } : void 0, v = (m) => {
    Object.prototype.hasOwnProperty.call(ss, m.key) && (m.preventDefault(), p({
      direction: ss[m.key],
      factor: m.shiftKey ? 4 : 1
    }));
  };
  return K.jsx("div", { className: Qe(["react-flow__nodesselection", "react-flow__container", o]), style: {
    transform: f
  }, children: K.jsx("div", { ref: y, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: i ? void 0 : -1, onKeyDown: i ? void 0 : v, style: {
    width: u,
    height: c
  } }) });
}
const Oh = typeof window < "u" ? window : void 0, rS = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function am({ children: n, onPaneClick: o, onPaneMouseEnter: i, onPaneMouseMove: s, onPaneMouseLeave: u, onPaneContextMenu: c, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: p, selectionKeyCode: y, selectionOnDrag: g, selectionMode: v, onSelectionStart: m, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: E, zoomActivationKeyCode: C, elementsSelectable: N, zoomOnScroll: O, zoomOnPinch: S, panOnScroll: M, panOnScrollSpeed: I, panOnScrollMode: j, zoomOnDoubleClick: B, panOnDrag: W, defaultViewport: Z, translateExtent: ie, minZoom: G, maxZoom: J, preventScrolling: q, onSelectionContextMenu: P, noWheelClassName: V, noPanClassName: $, disableKeyboardA11y: H, onViewportChange: R, isControlledViewport: L }) {
  const { nodesSelectionActive: D, userSelectionActive: _ } = Te(rS), F = fi(y, { target: Oh }), ne = fi(E, { target: Oh }), ee = ne || W, ae = ne || M, fe = g && ee !== !0, de = F || _ || fe;
  return Ox({ deleteKeyCode: p, multiSelectionKeyCode: k }), K.jsx(jx, { onPaneContextMenu: c, elementsSelectable: N, zoomOnScroll: O, zoomOnPinch: S, panOnScroll: ae, panOnScrollSpeed: I, panOnScrollMode: j, zoomOnDoubleClick: B, panOnDrag: !F && ee, defaultViewport: Z, translateExtent: ie, minZoom: G, maxZoom: J, zoomActivationKeyCode: C, preventScrolling: q, noWheelClassName: V, noPanClassName: $, onViewportChange: R, isControlledViewport: L, paneClickDistance: h, children: K.jsxs(Wx, { onSelectionStart: m, onSelectionEnd: x, onPaneClick: o, onPaneMouseEnter: i, onPaneMouseMove: s, onPaneMouseLeave: u, onPaneContextMenu: c, onPaneScroll: f, panOnDrag: ee, isSelecting: !!de, selectionMode: v, selectionKeyPressed: F, selectionOnDrag: fe, children: [n, D && K.jsx(nS, { onSelectionContextMenu: P, noPanClassName: $, disableKeyboardA11y: H })] }) });
}
am.displayName = "FlowRenderer";
const oS = Q.memo(am), iS = (n) => (o) => n ? Ja(o.nodeLookup, { x: 0, y: 0, width: o.width, height: o.height }, o.transform, !0).map((i) => i.id) : Array.from(o.nodeLookup.keys());
function lS(n) {
  return Te(Q.useCallback(iS(n), [n]), We);
}
const sS = (n) => n.updateNodeInternals;
function uS() {
  const n = Te(sS), [o] = Q.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
    const s = /* @__PURE__ */ new Map();
    i.forEach((u) => {
      const c = u.target.getAttribute("data-id");
      s.set(c, {
        id: c,
        nodeElement: u.target,
        force: !0
      });
    }), n(s);
  }));
  return Q.useEffect(() => () => {
    o == null || o.disconnect();
  }, [o]), o;
}
function aS({ node: n, nodeType: o, hasDimensions: i, resizeObserver: s }) {
  const u = je(), c = Q.useRef(null), f = Q.useRef(null), h = Q.useRef(n.sourcePosition), p = Q.useRef(n.targetPosition), y = Q.useRef(o), g = i && !!n.internals.handleBounds;
  return Q.useEffect(() => {
    c.current && !n.hidden && (!g || f.current !== c.current) && (f.current && (s == null || s.unobserve(f.current)), s == null || s.observe(c.current), f.current = c.current);
  }, [g, n.hidden]), Q.useEffect(() => () => {
    f.current && (s == null || s.unobserve(f.current), f.current = null);
  }, []), Q.useEffect(() => {
    if (c.current) {
      const v = y.current !== o, m = h.current !== n.sourcePosition, x = p.current !== n.targetPosition;
      (v || m || x) && (y.current = o, h.current = n.sourcePosition, p.current = n.targetPosition, u.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: c.current, force: !0 }]])));
    }
  }, [n.id, o, n.sourcePosition, n.targetPosition]), c;
}
function cS({ id: n, onClick: o, onMouseEnter: i, onMouseMove: s, onMouseLeave: u, onContextMenu: c, onDoubleClick: f, nodesDraggable: h, elementsSelectable: p, nodesConnectable: y, nodesFocusable: g, resizeObserver: v, noDragClassName: m, noPanClassName: x, disableKeyboardA11y: k, rfId: E, nodeTypes: C, nodeClickDistance: N, onError: O }) {
  const { node: S, internals: M, isParent: I } = Te((oe) => {
    const b = oe.nodeLookup.get(n), ce = oe.parentLookup.has(n);
    return {
      node: b,
      internals: b.internals,
      isParent: ce
    };
  }, We);
  let j = S.type || "default", B = (C == null ? void 0 : C[j]) || Dh[j];
  B === void 0 && (O == null || O("003", tn.error003(j)), j = "default", B = Dh.default);
  const W = !!(S.draggable || h && typeof S.draggable > "u"), Z = !!(S.selectable || p && typeof S.selectable > "u"), ie = !!(S.connectable || y && typeof S.connectable > "u"), G = !!(S.focusable || g && typeof S.focusable > "u"), J = je(), q = Ap(S), P = aS({ node: S, nodeType: j, hasDimensions: q, resizeObserver: v }), V = lm({
    nodeRef: P,
    disabled: S.hidden || !W,
    noDragClassName: m,
    handleSelector: S.dragHandle,
    nodeId: n,
    isSelectable: Z,
    nodeClickDistance: N
  }), $ = sm();
  if (S.hidden)
    return null;
  const H = yn(S), R = eS(S), L = Z || W || o || i || s || u, D = i ? (oe) => i(oe, { ...M.userNode }) : void 0, _ = s ? (oe) => s(oe, { ...M.userNode }) : void 0, F = u ? (oe) => u(oe, { ...M.userNode }) : void 0, ne = c ? (oe) => c(oe, { ...M.userNode }) : void 0, ee = f ? (oe) => f(oe, { ...M.userNode }) : void 0, ae = (oe) => {
    const { selectNodesOnDrag: b, nodeDragThreshold: ce } = J.getState();
    Z && (!b || !W || ce > 0) && Wa({
      id: n,
      store: J,
      nodeRef: P
    }), o && o(oe, { ...M.userNode });
  }, fe = (oe) => {
    if (!(Op(oe.nativeEvent) || k)) {
      if (Cp.includes(oe.key) && Z) {
        const b = oe.key === "Escape";
        Wa({
          id: n,
          store: J,
          unselect: b,
          nodeRef: P
        });
      } else if (W && S.selected && Object.prototype.hasOwnProperty.call(ss, oe.key)) {
        oe.preventDefault();
        const { ariaLabelConfig: b } = J.getState();
        J.setState({
          ariaLiveMessage: b["node.a11yDescription.ariaLiveMessage"]({
            direction: oe.key.replace("Arrow", "").toLowerCase(),
            x: ~~M.positionAbsolute.x,
            y: ~~M.positionAbsolute.y
          })
        }), $({
          direction: ss[oe.key],
          factor: oe.shiftKey ? 4 : 1
        });
      }
    }
  }, de = () => {
    var pe;
    if (k || !((pe = P.current) != null && pe.matches(":focus-visible")))
      return;
    const { transform: oe, width: b, height: ce, autoPanOnNodeFocus: Se, setCenter: he } = J.getState();
    if (!Se)
      return;
    Ja(/* @__PURE__ */ new Map([[n, S]]), { x: 0, y: 0, width: b, height: ce }, oe, !0).length > 0 || he(S.position.x + H.width / 2, S.position.y + H.height / 2, {
      zoom: oe[2]
    });
  };
  return K.jsx("div", { className: Qe([
    "react-flow__node",
    `react-flow__node-${j}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: W
    },
    S.className,
    {
      selected: S.selected,
      selectable: Z,
      parent: I,
      draggable: W,
      dragging: V
    }
  ]), ref: P, style: {
    zIndex: M.z,
    transform: `translate(${M.positionAbsolute.x}px,${M.positionAbsolute.y}px)`,
    pointerEvents: L ? "all" : "none",
    visibility: q ? "visible" : "hidden",
    ...S.style,
    ...R
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: D, onMouseMove: _, onMouseLeave: F, onContextMenu: ne, onClick: ae, onDoubleClick: ee, onKeyDown: G ? fe : void 0, tabIndex: G ? 0 : void 0, onFocus: G ? de : void 0, role: S.ariaRole ?? (G ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": k ? void 0 : `${em}-${E}`, "aria-label": S.ariaLabel, ...S.domAttributes, children: K.jsx(Xx, { value: n, children: K.jsx(B, { id: n, data: S.data, type: j, positionAbsoluteX: M.positionAbsolute.x, positionAbsoluteY: M.positionAbsolute.y, selected: S.selected ?? !1, selectable: Z, draggable: W, deletable: S.deletable ?? !0, isConnectable: ie, sourcePosition: S.sourcePosition, targetPosition: S.targetPosition, dragging: V, dragHandle: S.dragHandle, zIndex: M.z, parentId: S.parentId, ...H }) }) });
}
const fS = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function cm(n) {
  const { nodesDraggable: o, nodesConnectable: i, nodesFocusable: s, elementsSelectable: u, onError: c } = Te(fS, We), f = lS(n.onlyRenderVisibleElements), h = uS();
  return K.jsx("div", { className: "react-flow__nodes", style: ws, children: f.map((p) => (
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
    K.jsx(cS, { id: p, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: h, nodesDraggable: o, nodesConnectable: i, nodesFocusable: s, elementsSelectable: u, nodeClickDistance: n.nodeClickDistance, onError: c }, p)
  )) });
}
cm.displayName = "NodeRenderer";
const dS = Q.memo(cm);
function hS(n) {
  return Te(Q.useCallback((i) => {
    if (!n)
      return i.edges.map((u) => u.id);
    const s = [];
    if (i.width && i.height)
      for (const u of i.edges) {
        const c = i.nodeLookup.get(u.source), f = i.nodeLookup.get(u.target);
        c && f && f1({
          sourceNode: c,
          targetNode: f,
          width: i.width,
          height: i.height,
          transform: i.transform
        }) && s.push(u.id);
      }
    return s;
  }, [n]), We);
}
const pS = ({ color: n = "none", strokeWidth: o = 1 }) => K.jsx("polyline", { style: {
  stroke: n,
  strokeWidth: o
}, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", points: "-5,-4 0,0 -5,4" }), mS = ({ color: n = "none", strokeWidth: o = 1 }) => K.jsx("polyline", { style: {
  stroke: n,
  fill: n,
  strokeWidth: o
}, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" }), Fh = {
  [ui.Arrow]: pS,
  [ui.ArrowClosed]: mS
};
function gS(n) {
  const o = je();
  return Q.useMemo(() => {
    var u, c;
    return Object.prototype.hasOwnProperty.call(Fh, n) ? Fh[n] : ((c = (u = o.getState()).onError) == null || c.call(u, "009", tn.error009(n)), null);
  }, [n]);
}
const yS = ({ id: n, type: o, color: i, width: s = 12.5, height: u = 12.5, markerUnits: c = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const p = gS(o);
  return p ? K.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${s}`, markerHeight: `${u}`, viewBox: "-10 -10 20 20", markerUnits: c, orient: h, refX: "0", refY: "0", children: K.jsx(p, { color: i, strokeWidth: f }) }) : null;
}, fm = ({ defaultColor: n, rfId: o }) => {
  const i = Te((c) => c.edges), s = Te((c) => c.defaultEdgeOptions), u = Q.useMemo(() => w1(i, {
    id: o,
    defaultColor: n,
    defaultMarkerStart: s == null ? void 0 : s.markerStart,
    defaultMarkerEnd: s == null ? void 0 : s.markerEnd
  }), [i, s, o, n]);
  return u.length ? K.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: K.jsx("defs", { children: u.map((c) => K.jsx(yS, { id: c.id, type: c.type, color: c.color, width: c.width, height: c.height, markerUnits: c.markerUnits, strokeWidth: c.strokeWidth, orient: c.orient }, c.id)) }) }) : null;
};
fm.displayName = "MarkerDefinitions";
var vS = Q.memo(fm);
function dm({ x: n, y: o, label: i, labelStyle: s, labelShowBg: u = !0, labelBgStyle: c, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: p, className: y, ...g }) {
  const [v, m] = Q.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Qe(["react-flow__edge-textwrapper", y]), k = Q.useRef(null);
  return Q.useEffect(() => {
    if (k.current) {
      const E = k.current.getBBox();
      m({
        x: E.x,
        y: E.y,
        width: E.width,
        height: E.height
      });
    }
  }, [i]), i ? K.jsxs("g", { transform: `translate(${n - v.width / 2} ${o - v.height / 2})`, className: x, visibility: v.width ? "visible" : "hidden", ...g, children: [u && K.jsx("rect", { width: v.width + 2 * f[0], x: -f[0], y: -f[1], height: v.height + 2 * f[1], className: "react-flow__edge-textbg", style: c, rx: h, ry: h }), K.jsx("text", { className: "react-flow__edge-text", y: v.height / 2, dy: "0.3em", ref: k, style: s, children: i }), p] }) : null;
}
dm.displayName = "EdgeText";
const wS = Q.memo(dm);
function vi({ path: n, labelX: o, labelY: i, label: s, labelStyle: u, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, interactionWidth: y = 20, ...g }) {
  return K.jsxs(K.Fragment, { children: [K.jsx("path", { ...g, d: n, fill: "none", className: Qe(["react-flow__edge-path", g.className]) }), y && K.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: y, className: "react-flow__edge-interaction" }), s && Ut(o) && Ut(i) ? K.jsx(wS, { x: o, y: i, label: s, labelStyle: u, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p }) : null] });
}
function Hh({ pos: n, x1: o, y1: i, x2: s, y2: u }) {
  return n === Ee.Left || n === Ee.Right ? [0.5 * (o + s), i] : [o, 0.5 * (i + u)];
}
function hm({ sourceX: n, sourceY: o, sourcePosition: i = Ee.Bottom, targetX: s, targetY: u, targetPosition: c = Ee.Top }) {
  const [f, h] = Hh({
    pos: i,
    x1: n,
    y1: o,
    x2: s,
    y2: u
  }), [p, y] = Hh({
    pos: c,
    x1: s,
    y1: u,
    x2: n,
    y2: o
  }), [g, v, m, x] = Hp({
    sourceX: n,
    sourceY: o,
    targetX: s,
    targetY: u,
    sourceControlX: f,
    sourceControlY: h,
    targetControlX: p,
    targetControlY: y
  });
  return [
    `M${n},${o} C${f},${h} ${p},${y} ${s},${u}`,
    g,
    v,
    m,
    x
  ];
}
function pm(n) {
  return Q.memo(({ id: o, sourceX: i, sourceY: s, targetX: u, targetY: c, sourcePosition: f, targetPosition: h, label: p, labelStyle: y, labelShowBg: g, labelBgStyle: v, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: C, interactionWidth: N }) => {
    const [O, S, M] = hm({
      sourceX: i,
      sourceY: s,
      sourcePosition: f,
      targetX: u,
      targetY: c,
      targetPosition: h
    }), I = n.isInternal ? void 0 : o;
    return K.jsx(vi, { id: I, path: O, labelX: S, labelY: M, label: p, labelStyle: y, labelShowBg: g, labelBgStyle: v, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: C, interactionWidth: N });
  });
}
const xS = pm({ isInternal: !1 }), mm = pm({ isInternal: !0 });
xS.displayName = "SimpleBezierEdge";
mm.displayName = "SimpleBezierEdgeInternal";
function gm(n) {
  return Q.memo(({ id: o, sourceX: i, sourceY: s, targetX: u, targetY: c, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: v, style: m, sourcePosition: x = Ee.Bottom, targetPosition: k = Ee.Top, markerEnd: E, markerStart: C, pathOptions: N, interactionWidth: O }) => {
    const [S, M, I] = ja({
      sourceX: i,
      sourceY: s,
      sourcePosition: x,
      targetX: u,
      targetY: c,
      targetPosition: k,
      borderRadius: N == null ? void 0 : N.borderRadius,
      offset: N == null ? void 0 : N.offset
    }), j = n.isInternal ? void 0 : o;
    return K.jsx(vi, { id: j, path: S, labelX: M, labelY: I, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: v, style: m, markerEnd: E, markerStart: C, interactionWidth: O });
  });
}
const ym = gm({ isInternal: !1 }), vm = gm({ isInternal: !0 });
ym.displayName = "SmoothStepEdge";
vm.displayName = "SmoothStepEdgeInternal";
function wm(n) {
  return Q.memo(({ id: o, ...i }) => {
    var u;
    const s = n.isInternal ? void 0 : o;
    return K.jsx(ym, { ...i, id: s, pathOptions: Q.useMemo(() => {
      var c;
      return { borderRadius: 0, offset: (c = i.pathOptions) == null ? void 0 : c.offset };
    }, [(u = i.pathOptions) == null ? void 0 : u.offset]) });
  });
}
const SS = wm({ isInternal: !1 }), xm = wm({ isInternal: !0 });
SS.displayName = "StepEdge";
xm.displayName = "StepEdgeInternal";
function Sm(n) {
  return Q.memo(({ id: o, sourceX: i, sourceY: s, targetX: u, targetY: c, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: v, style: m, markerEnd: x, markerStart: k, interactionWidth: E }) => {
    const [C, N, O] = Vp({ sourceX: i, sourceY: s, targetX: u, targetY: c }), S = n.isInternal ? void 0 : o;
    return K.jsx(vi, { id: S, path: C, labelX: N, labelY: O, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: v, style: m, markerEnd: x, markerStart: k, interactionWidth: E });
  });
}
const ES = Sm({ isInternal: !1 }), Em = Sm({ isInternal: !0 });
ES.displayName = "StraightEdge";
Em.displayName = "StraightEdgeInternal";
function _m(n) {
  return Q.memo(({ id: o, sourceX: i, sourceY: s, targetX: u, targetY: c, sourcePosition: f = Ee.Bottom, targetPosition: h = Ee.Top, label: p, labelStyle: y, labelShowBg: g, labelBgStyle: v, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: C, pathOptions: N, interactionWidth: O }) => {
    const [S, M, I] = nc({
      sourceX: i,
      sourceY: s,
      sourcePosition: f,
      targetX: u,
      targetY: c,
      targetPosition: h,
      curvature: N == null ? void 0 : N.curvature
    }), j = n.isInternal ? void 0 : o;
    return K.jsx(vi, { id: j, path: S, labelX: M, labelY: I, label: p, labelStyle: y, labelShowBg: g, labelBgStyle: v, labelBgPadding: m, labelBgBorderRadius: x, style: k, markerEnd: E, markerStart: C, interactionWidth: O });
  });
}
const _S = _m({ isInternal: !1 }), km = _m({ isInternal: !0 });
_S.displayName = "BezierEdge";
km.displayName = "BezierEdgeInternal";
const jh = {
  default: km,
  straight: Em,
  step: xm,
  smoothstep: vm,
  simplebezier: mm
}, Vh = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, kS = (n, o, i) => i === Ee.Left ? n - o : i === Ee.Right ? n + o : n, CS = (n, o, i) => i === Ee.Top ? n - o : i === Ee.Bottom ? n + o : n, Bh = "react-flow__edgeupdater";
function Uh({ position: n, centerX: o, centerY: i, radius: s = 10, onMouseDown: u, onMouseEnter: c, onMouseOut: f, type: h }) {
  return K.jsx("circle", { onMouseDown: u, onMouseEnter: c, onMouseOut: f, className: Qe([Bh, `${Bh}-${h}`]), cx: kS(o, s, n), cy: CS(i, s, n), r: s, stroke: "transparent", fill: "transparent" });
}
function NS({ isReconnectable: n, reconnectRadius: o, edge: i, sourceX: s, sourceY: u, targetX: c, targetY: f, sourcePosition: h, targetPosition: p, onReconnect: y, onReconnectStart: g, onReconnectEnd: v, setReconnecting: m, setUpdateHover: x }) {
  const k = je(), E = (M, I) => {
    if (M.button !== 0)
      return;
    const { autoPanOnConnect: j, domNode: B, isValidConnection: W, connectionMode: Z, connectionRadius: ie, lib: G, onConnectStart: J, onConnectEnd: q, cancelConnection: P, nodeLookup: V, rfId: $, panBy: H, updateConnection: R } = k.getState(), L = I.type === "target", D = (ne, ee) => {
      m(!1), v == null || v(ne, i, I.type, ee);
    }, _ = (ne) => y == null ? void 0 : y(i, ne), F = (ne, ee) => {
      m(!0), g == null || g(M, i, I.type), J == null || J(ne, ee);
    };
    Ua.onPointerDown(M.nativeEvent, {
      autoPanOnConnect: j,
      connectionMode: Z,
      connectionRadius: ie,
      domNode: B,
      handleId: I.id,
      nodeId: I.nodeId,
      nodeLookup: V,
      isTarget: L,
      edgeUpdaterType: I.type,
      lib: G,
      flowId: $,
      cancelConnection: P,
      panBy: H,
      isValidConnection: W,
      onConnect: _,
      onConnectStart: F,
      onConnectEnd: q,
      onReconnectEnd: D,
      updateConnection: R,
      getTransform: () => k.getState().transform,
      getFromHandle: () => k.getState().connection.fromHandle,
      dragThreshold: k.getState().connectionDragThreshold
    });
  }, C = (M) => E(M, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), N = (M) => E(M, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), O = () => x(!0), S = () => x(!1);
  return K.jsxs(K.Fragment, { children: [(n === !0 || n === "source") && K.jsx(Uh, { position: h, centerX: s, centerY: u, radius: o, onMouseDown: C, onMouseEnter: O, onMouseOut: S, type: "source" }), (n === !0 || n === "target") && K.jsx(Uh, { position: p, centerX: c, centerY: f, radius: o, onMouseDown: N, onMouseEnter: O, onMouseOut: S, type: "target" })] });
}
function MS({ id: n, edgesFocusable: o, edgesReconnectable: i, elementsSelectable: s, onClick: u, onDoubleClick: c, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: y, reconnectRadius: g, onReconnect: v, onReconnectStart: m, onReconnectEnd: x, rfId: k, edgeTypes: E, noPanClassName: C, onError: N, disableKeyboardA11y: O }) {
  let S = Te((he) => he.edgeLookup.get(n));
  const M = Te((he) => he.defaultEdgeOptions);
  S = M ? { ...M, ...S } : S;
  let I = S.type || "default", j = (E == null ? void 0 : E[I]) || jh[I];
  j === void 0 && (N == null || N("011", tn.error011(I)), I = "default", j = jh.default);
  const B = !!(S.focusable || o && typeof S.focusable > "u"), W = typeof v < "u" && (S.reconnectable || i && typeof S.reconnectable > "u"), Z = !!(S.selectable || s && typeof S.selectable > "u"), ie = Q.useRef(null), [G, J] = Q.useState(!1), [q, P] = Q.useState(!1), V = je(), { zIndex: $, sourceX: H, sourceY: R, targetX: L, targetY: D, sourcePosition: _, targetPosition: F } = Te(Q.useCallback((he) => {
    const me = he.nodeLookup.get(S.source), pe = he.nodeLookup.get(S.target);
    if (!me || !pe)
      return {
        zIndex: S.zIndex,
        ...Vh
      };
    const Ne = v1({
      id: n,
      sourceNode: me,
      targetNode: pe,
      sourceHandle: S.sourceHandle || null,
      targetHandle: S.targetHandle || null,
      connectionMode: he.connectionMode,
      onError: N
    });
    return {
      zIndex: c1({
        selected: S.selected,
        zIndex: S.zIndex,
        sourceNode: me,
        targetNode: pe,
        elevateOnSelect: he.elevateEdgesOnSelect
      }),
      ...Ne || Vh
    };
  }, [S.source, S.target, S.sourceHandle, S.targetHandle, S.selected, S.zIndex]), We), ne = Q.useMemo(() => S.markerStart ? `url('#${Va(S.markerStart, k)}')` : void 0, [S.markerStart, k]), ee = Q.useMemo(() => S.markerEnd ? `url('#${Va(S.markerEnd, k)}')` : void 0, [S.markerEnd, k]);
  if (S.hidden || H === null || R === null || L === null || D === null)
    return null;
  const ae = (he) => {
    var Pe;
    const { addSelectedEdges: me, unselectNodesAndEdges: pe, multiSelectionActive: Ne } = V.getState();
    Z && (V.setState({ nodesSelectionActive: !1 }), S.selected && Ne ? (pe({ nodes: [], edges: [S] }), (Pe = ie.current) == null || Pe.blur()) : me([n])), u && u(he, S);
  }, fe = c ? (he) => {
    c(he, { ...S });
  } : void 0, de = f ? (he) => {
    f(he, { ...S });
  } : void 0, oe = h ? (he) => {
    h(he, { ...S });
  } : void 0, b = p ? (he) => {
    p(he, { ...S });
  } : void 0, ce = y ? (he) => {
    y(he, { ...S });
  } : void 0, Se = (he) => {
    var me;
    if (!O && Cp.includes(he.key) && Z) {
      const { unselectNodesAndEdges: pe, addSelectedEdges: Ne } = V.getState();
      he.key === "Escape" ? ((me = ie.current) == null || me.blur(), pe({ edges: [S] })) : Ne([n]);
    }
  };
  return K.jsx("svg", { style: { zIndex: $ }, children: K.jsxs("g", { className: Qe([
    "react-flow__edge",
    `react-flow__edge-${I}`,
    S.className,
    C,
    {
      selected: S.selected,
      animated: S.animated,
      inactive: !Z && !u,
      updating: G,
      selectable: Z
    }
  ]), onClick: ae, onDoubleClick: fe, onContextMenu: de, onMouseEnter: oe, onMouseMove: b, onMouseLeave: ce, onKeyDown: B ? Se : void 0, tabIndex: B ? 0 : void 0, role: S.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": S.ariaLabel === null ? void 0 : S.ariaLabel || `Edge from ${S.source} to ${S.target}`, "aria-describedby": B ? `${tm}-${k}` : void 0, ref: ie, ...S.domAttributes, children: [!q && K.jsx(j, { id: n, source: S.source, target: S.target, type: S.type, selected: S.selected, animated: S.animated, selectable: Z, deletable: S.deletable ?? !0, label: S.label, labelStyle: S.labelStyle, labelShowBg: S.labelShowBg, labelBgStyle: S.labelBgStyle, labelBgPadding: S.labelBgPadding, labelBgBorderRadius: S.labelBgBorderRadius, sourceX: H, sourceY: R, targetX: L, targetY: D, sourcePosition: _, targetPosition: F, data: S.data, style: S.style, sourceHandleId: S.sourceHandle, targetHandleId: S.targetHandle, markerStart: ne, markerEnd: ee, pathOptions: "pathOptions" in S ? S.pathOptions : void 0, interactionWidth: S.interactionWidth }), W && K.jsx(NS, { edge: S, isReconnectable: W, reconnectRadius: g, onReconnect: v, onReconnectStart: m, onReconnectEnd: x, sourceX: H, sourceY: R, targetX: L, targetY: D, sourcePosition: _, targetPosition: F, setUpdateHover: J, setReconnecting: P })] }) });
}
const PS = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function Cm({ defaultMarkerColor: n, onlyRenderVisibleElements: o, rfId: i, edgeTypes: s, noPanClassName: u, onReconnect: c, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: p, onEdgeMouseLeave: y, onEdgeClick: g, reconnectRadius: v, onEdgeDoubleClick: m, onReconnectStart: x, onReconnectEnd: k, disableKeyboardA11y: E }) {
  const { edgesFocusable: C, edgesReconnectable: N, elementsSelectable: O, onError: S } = Te(PS, We), M = hS(o);
  return K.jsxs("div", { className: "react-flow__edges", children: [K.jsx(vS, { defaultColor: n, rfId: i }), M.map((I) => K.jsx(MS, { id: I, edgesFocusable: C, edgesReconnectable: N, elementsSelectable: O, noPanClassName: u, onReconnect: c, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: y, onClick: g, reconnectRadius: v, onDoubleClick: m, onReconnectStart: x, onReconnectEnd: k, rfId: i, onError: S, edgeTypes: s, disableKeyboardA11y: E }, I))] });
}
Cm.displayName = "EdgeRenderer";
const TS = Q.memo(Cm), LS = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function zS({ children: n }) {
  const o = Te(LS);
  return K.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: o }, children: n });
}
function IS(n) {
  const o = sc(), i = Q.useRef(!1);
  Q.useEffect(() => {
    !i.current && o.viewportInitialized && n && (setTimeout(() => n(o), 1), i.current = !0);
  }, [n, o.viewportInitialized]);
}
const RS = (n) => {
  var o;
  return (o = n.panZoom) == null ? void 0 : o.syncViewport;
};
function AS(n) {
  const o = Te(RS), i = je();
  return Q.useEffect(() => {
    n && (o == null || o(n), i.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, o]), null;
}
function $S(n) {
  return n.connection.inProgress ? { ...n.connection, to: yi(n.connection.to, n.transform) } : { ...n.connection };
}
function DS(n) {
  return $S;
}
function OS(n) {
  const o = DS();
  return Te(o, We);
}
const FS = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function HS({ containerStyle: n, style: o, type: i, component: s }) {
  const { nodesConnectable: u, width: c, height: f, isValid: h, inProgress: p } = Te(FS, We);
  return !(c && u && p) ? null : K.jsx("svg", { style: n, width: c, height: f, className: "react-flow__connectionline react-flow__container", children: K.jsx("g", { className: Qe(["react-flow__connection", Pp(h)]), children: K.jsx(Nm, { style: o, type: i, CustomComponent: s, isValid: h }) }) });
}
const Nm = ({ style: n, type: o = Bn.Bezier, CustomComponent: i, isValid: s }) => {
  const { inProgress: u, from: c, fromNode: f, fromHandle: h, fromPosition: p, to: y, toNode: g, toHandle: v, toPosition: m } = OS();
  if (!u)
    return;
  if (i)
    return K.jsx(i, { connectionLineType: o, connectionLineStyle: n, fromNode: f, fromHandle: h, fromX: c.x, fromY: c.y, toX: y.x, toY: y.y, fromPosition: p, toPosition: m, connectionStatus: Pp(s), toNode: g, toHandle: v });
  let x = "";
  const k = {
    sourceX: c.x,
    sourceY: c.y,
    sourcePosition: p,
    targetX: y.x,
    targetY: y.y,
    targetPosition: m
  };
  switch (o) {
    case Bn.Bezier:
      [x] = nc(k);
      break;
    case Bn.SimpleBezier:
      [x] = hm(k);
      break;
    case Bn.Step:
      [x] = ja({
        ...k,
        borderRadius: 0
      });
      break;
    case Bn.SmoothStep:
      [x] = ja(k);
      break;
    default:
      [x] = Vp(k);
  }
  return K.jsx("path", { d: x, fill: "none", className: "react-flow__connection-path", style: n });
};
Nm.displayName = "ConnectionLine";
const jS = {};
function Wh(n = jS) {
  Q.useRef(n), je(), Q.useEffect(() => {
  }, [n]);
}
function VS() {
  je(), Q.useRef(!1), Q.useEffect(() => {
  }, []);
}
function Mm({ nodeTypes: n, edgeTypes: o, onInit: i, onNodeClick: s, onEdgeClick: u, onNodeDoubleClick: c, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: y, onNodeContextMenu: g, onSelectionContextMenu: v, onSelectionStart: m, onSelectionEnd: x, connectionLineType: k, connectionLineStyle: E, connectionLineComponent: C, connectionLineContainerStyle: N, selectionKeyCode: O, selectionOnDrag: S, selectionMode: M, multiSelectionKeyCode: I, panActivationKeyCode: j, zoomActivationKeyCode: B, deleteKeyCode: W, onlyRenderVisibleElements: Z, elementsSelectable: ie, defaultViewport: G, translateExtent: J, minZoom: q, maxZoom: P, preventScrolling: V, defaultMarkerColor: $, zoomOnScroll: H, zoomOnPinch: R, panOnScroll: L, panOnScrollSpeed: D, panOnScrollMode: _, zoomOnDoubleClick: F, panOnDrag: ne, onPaneClick: ee, onPaneMouseEnter: ae, onPaneMouseMove: fe, onPaneMouseLeave: de, onPaneScroll: oe, onPaneContextMenu: b, paneClickDistance: ce, nodeClickDistance: Se, onEdgeContextMenu: he, onEdgeMouseEnter: me, onEdgeMouseMove: pe, onEdgeMouseLeave: Ne, reconnectRadius: Pe, onReconnect: Ae, onReconnectStart: Re, onReconnectEnd: De, noDragClassName: Rt, noWheelClassName: gt, noPanClassName: kt, disableKeyboardA11y: At, nodeExtent: rn, rfId: Yt, viewport: lt, onViewportChange: Ct }) {
  return Wh(n), Wh(o), VS(), IS(i), AS(lt), K.jsx(oS, { onPaneClick: ee, onPaneMouseEnter: ae, onPaneMouseMove: fe, onPaneMouseLeave: de, onPaneContextMenu: b, onPaneScroll: oe, paneClickDistance: ce, deleteKeyCode: W, selectionKeyCode: O, selectionOnDrag: S, selectionMode: M, onSelectionStart: m, onSelectionEnd: x, multiSelectionKeyCode: I, panActivationKeyCode: j, zoomActivationKeyCode: B, elementsSelectable: ie, zoomOnScroll: H, zoomOnPinch: R, zoomOnDoubleClick: F, panOnScroll: L, panOnScrollSpeed: D, panOnScrollMode: _, panOnDrag: ne, defaultViewport: G, translateExtent: J, minZoom: q, maxZoom: P, onSelectionContextMenu: v, preventScrolling: V, noDragClassName: Rt, noWheelClassName: gt, noPanClassName: kt, disableKeyboardA11y: At, onViewportChange: Ct, isControlledViewport: !!lt, children: K.jsxs(zS, { children: [K.jsx(TS, { edgeTypes: o, onEdgeClick: u, onEdgeDoubleClick: f, onReconnect: Ae, onReconnectStart: Re, onReconnectEnd: De, onlyRenderVisibleElements: Z, onEdgeContextMenu: he, onEdgeMouseEnter: me, onEdgeMouseMove: pe, onEdgeMouseLeave: Ne, reconnectRadius: Pe, defaultMarkerColor: $, noPanClassName: kt, disableKeyboardA11y: At, rfId: Yt }), K.jsx(HS, { style: E, type: k, component: C, containerStyle: N }), K.jsx("div", { className: "react-flow__edgelabel-renderer" }), K.jsx(dS, { nodeTypes: n, onNodeClick: s, onNodeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: y, onNodeContextMenu: g, nodeClickDistance: Se, onlyRenderVisibleElements: Z, noPanClassName: kt, noDragClassName: Rt, disableKeyboardA11y: At, nodeExtent: rn, rfId: Yt }), K.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Mm.displayName = "GraphView";
const BS = Q.memo(Mm), Yh = ({ nodes: n, edges: o, defaultNodes: i, defaultEdges: s, width: u, height: c, fitView: f, fitViewOptions: h, minZoom: p = 0.5, maxZoom: y = 2, nodeOrigin: g, nodeExtent: v } = {}) => {
  const m = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), C = s ?? o ?? [], N = i ?? n ?? [], O = g ?? [0, 0], S = v ?? li;
  Up(k, E, C);
  const M = Ba(N, m, x, {
    nodeOrigin: O,
    nodeExtent: S,
    elevateNodesOnSelect: !1
  });
  let I = [0, 0, 1];
  if (f && u && c) {
    const j = gi(m, {
      filter: (ie) => !!((ie.width || ie.initialWidth) && (ie.height || ie.initialHeight))
    }), { x: B, y: W, zoom: Z } = ec(j, u, c, p, y, (h == null ? void 0 : h.padding) ?? 0.1);
    I = [B, W, Z];
  }
  return {
    rfId: "1",
    width: 0,
    height: 0,
    transform: I,
    nodes: N,
    nodesInitialized: M,
    nodeLookup: m,
    parentLookup: x,
    edges: C,
    edgeLookup: E,
    connectionLookup: k,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: s !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: y,
    translateExtent: li,
    nodeExtent: S,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Zr.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: O,
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
    fitViewOptions: h,
    fitViewResolver: null,
    connection: { ...Mp },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: o1,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Np
  };
}, US = ({ nodes: n, edges: o, defaultNodes: i, defaultEdges: s, width: u, height: c, fitView: f, fitViewOptions: h, minZoom: p, maxZoom: y, nodeOrigin: g, nodeExtent: v }) => sx((m, x) => {
  async function k() {
    const { nodeLookup: E, panZoom: C, fitViewOptions: N, fitViewResolver: O, width: S, height: M, minZoom: I, maxZoom: j } = x();
    C && (await n1({
      nodes: E,
      width: S,
      height: M,
      panZoom: C,
      minZoom: I,
      maxZoom: j
    }, N), O == null || O.resolve(!0), m({ fitViewResolver: null }));
  }
  return {
    ...Yh({
      nodes: n,
      edges: o,
      width: u,
      height: c,
      fitView: f,
      fitViewOptions: h,
      minZoom: p,
      maxZoom: y,
      nodeOrigin: g,
      nodeExtent: v,
      defaultNodes: i,
      defaultEdges: s
    }),
    setNodes: (E) => {
      const { nodeLookup: C, parentLookup: N, nodeOrigin: O, elevateNodesOnSelect: S, fitViewQueued: M } = x(), I = Ba(E, C, N, {
        nodeOrigin: O,
        nodeExtent: v,
        elevateNodesOnSelect: S,
        checkEquality: !0
      });
      M && I ? (k(), m({ nodes: E, nodesInitialized: I, fitViewQueued: !1, fitViewOptions: void 0 })) : m({ nodes: E, nodesInitialized: I });
    },
    setEdges: (E) => {
      const { connectionLookup: C, edgeLookup: N } = x();
      Up(C, N, E), m({ edges: E });
    },
    setDefaultNodesAndEdges: (E, C) => {
      if (E) {
        const { setNodes: N } = x();
        N(E), m({ hasDefaultNodes: !0 });
      }
      if (C) {
        const { setEdges: N } = x();
        N(C), m({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registerd at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (E) => {
      const { triggerNodeChanges: C, nodeLookup: N, parentLookup: O, domNode: S, nodeOrigin: M, nodeExtent: I, debug: j, fitViewQueued: B } = x(), { changes: W, updatedInternals: Z } = k1(E, N, O, S, M, I);
      Z && (S1(N, O, { nodeOrigin: M, nodeExtent: I }), B ? (k(), m({ fitViewQueued: !1, fitViewOptions: void 0 })) : m({}), (W == null ? void 0 : W.length) > 0 && (j && console.log("React Flow: trigger node changes", W), C == null || C(W)));
    },
    updateNodePositions: (E, C = !1) => {
      const N = [], O = [], { nodeLookup: S, triggerNodeChanges: M } = x();
      for (const [I, j] of E) {
        const B = S.get(I), W = !!(B != null && B.expandParent && (B != null && B.parentId) && (j != null && j.position)), Z = {
          id: I,
          type: "position",
          position: W ? {
            x: Math.max(0, j.position.x),
            y: Math.max(0, j.position.y)
          } : j.position,
          dragging: C
        };
        W && B.parentId && N.push({
          id: I,
          parentId: B.parentId,
          rect: {
            ...j.internals.positionAbsolute,
            width: j.measured.width ?? 0,
            height: j.measured.height ?? 0
          }
        }), O.push(Z);
      }
      if (N.length > 0) {
        const { parentLookup: I, nodeOrigin: j } = x(), B = lc(N, S, I, j);
        O.push(...B);
      }
      M(O);
    },
    triggerNodeChanges: (E) => {
      const { onNodesChange: C, setNodes: N, nodes: O, hasDefaultNodes: S, debug: M } = x();
      if (E != null && E.length) {
        if (S) {
          const I = Px(E, O);
          N(I);
        }
        M && console.log("React Flow: trigger node changes", E), C == null || C(E);
      }
    },
    triggerEdgeChanges: (E) => {
      const { onEdgesChange: C, setEdges: N, edges: O, hasDefaultEdges: S, debug: M } = x();
      if (E != null && E.length) {
        if (S) {
          const I = Tx(E, O);
          N(I);
        }
        M && console.log("React Flow: trigger edge changes", E), C == null || C(E);
      }
    },
    addSelectedNodes: (E) => {
      const { multiSelectionActive: C, edgeLookup: N, nodeLookup: O, triggerNodeChanges: S, triggerEdgeChanges: M } = x();
      if (C) {
        const I = E.map((j) => cr(j, !0));
        S(I);
        return;
      }
      S(br(O, /* @__PURE__ */ new Set([...E]), !0)), M(br(N));
    },
    addSelectedEdges: (E) => {
      const { multiSelectionActive: C, edgeLookup: N, nodeLookup: O, triggerNodeChanges: S, triggerEdgeChanges: M } = x();
      if (C) {
        const I = E.map((j) => cr(j, !0));
        M(I);
        return;
      }
      M(br(N, /* @__PURE__ */ new Set([...E]))), S(br(O, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: E, edges: C } = {}) => {
      const { edges: N, nodes: O, nodeLookup: S, triggerNodeChanges: M, triggerEdgeChanges: I } = x(), j = E || O, B = C || N, W = j.map((ie) => {
        const G = S.get(ie.id);
        return G && (G.selected = !1), cr(ie.id, !1);
      }), Z = B.map((ie) => cr(ie.id, !1));
      M(W), I(Z);
    },
    setMinZoom: (E) => {
      const { panZoom: C, maxZoom: N } = x();
      C == null || C.setScaleExtent([E, N]), m({ minZoom: E });
    },
    setMaxZoom: (E) => {
      const { panZoom: C, minZoom: N } = x();
      C == null || C.setScaleExtent([N, E]), m({ maxZoom: E });
    },
    setTranslateExtent: (E) => {
      var C;
      (C = x().panZoom) == null || C.setTranslateExtent(E), m({ translateExtent: E });
    },
    setPaneClickDistance: (E) => {
      var C;
      (C = x().panZoom) == null || C.setClickDistance(E);
    },
    resetSelectedElements: () => {
      const { edges: E, nodes: C, triggerNodeChanges: N, triggerEdgeChanges: O, elementsSelectable: S } = x();
      if (!S)
        return;
      const M = C.reduce((j, B) => B.selected ? [...j, cr(B.id, !1)] : j, []), I = E.reduce((j, B) => B.selected ? [...j, cr(B.id, !1)] : j, []);
      N(M), O(I);
    },
    setNodeExtent: (E) => {
      const { nodes: C, nodeLookup: N, parentLookup: O, nodeOrigin: S, elevateNodesOnSelect: M, nodeExtent: I } = x();
      E[0][0] === I[0][0] && E[0][1] === I[0][1] && E[1][0] === I[1][0] && E[1][1] === I[1][1] || (Ba(C, N, O, {
        nodeOrigin: S,
        nodeExtent: E,
        elevateNodesOnSelect: M,
        checkEquality: !1
      }), m({ nodeExtent: E }));
    },
    panBy: (E) => {
      const { transform: C, width: N, height: O, panZoom: S, translateExtent: M } = x();
      return C1({ delta: E, panZoom: S, transform: C, translateExtent: M, width: N, height: O });
    },
    setCenter: async (E, C, N) => {
      const { width: O, height: S, maxZoom: M, panZoom: I } = x();
      if (!I)
        return Promise.resolve(!1);
      const j = typeof (N == null ? void 0 : N.zoom) < "u" ? N.zoom : M;
      return await I.setViewport({
        x: O / 2 - E * j,
        y: S / 2 - C * j,
        zoom: j
      }, { duration: N == null ? void 0 : N.duration, ease: N == null ? void 0 : N.ease, interpolate: N == null ? void 0 : N.interpolate }), Promise.resolve(!0);
    },
    cancelConnection: () => {
      m({
        connection: { ...Mp }
      });
    },
    updateConnection: (E) => {
      m({ connection: E });
    },
    reset: () => m({ ...Yh() })
  };
}, Object.is);
function WS({ initialNodes: n, initialEdges: o, defaultNodes: i, defaultEdges: s, initialWidth: u, initialHeight: c, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: p, fitView: y, nodeOrigin: g, nodeExtent: v, children: m }) {
  const [x] = Q.useState(() => US({
    nodes: n,
    edges: o,
    defaultNodes: i,
    defaultEdges: s,
    width: u,
    height: c,
    fitView: y,
    minZoom: f,
    maxZoom: h,
    fitViewOptions: p,
    nodeOrigin: g,
    nodeExtent: v
  }));
  return K.jsx(ux, { value: x, children: K.jsx(Rx, { children: m }) });
}
function YS({ children: n, nodes: o, edges: i, defaultNodes: s, defaultEdges: u, width: c, height: f, fitView: h, fitViewOptions: p, minZoom: y, maxZoom: g, nodeOrigin: v, nodeExtent: m }) {
  return Q.useContext(ys) ? K.jsx(K.Fragment, { children: n }) : K.jsx(WS, { initialNodes: o, initialEdges: i, defaultNodes: s, defaultEdges: u, initialWidth: c, initialHeight: f, fitView: h, initialFitViewOptions: p, initialMinZoom: y, initialMaxZoom: g, nodeOrigin: v, nodeExtent: m, children: n });
}
const XS = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function bS({ nodes: n, edges: o, defaultNodes: i, defaultEdges: s, className: u, nodeTypes: c, edgeTypes: f, onNodeClick: h, onEdgeClick: p, onInit: y, onMove: g, onMoveStart: v, onMoveEnd: m, onConnect: x, onConnectStart: k, onConnectEnd: E, onClickConnectStart: C, onClickConnectEnd: N, onNodeMouseEnter: O, onNodeMouseMove: S, onNodeMouseLeave: M, onNodeContextMenu: I, onNodeDoubleClick: j, onNodeDragStart: B, onNodeDrag: W, onNodeDragStop: Z, onNodesDelete: ie, onEdgesDelete: G, onDelete: J, onSelectionChange: q, onSelectionDragStart: P, onSelectionDrag: V, onSelectionDragStop: $, onSelectionContextMenu: H, onSelectionStart: R, onSelectionEnd: L, onBeforeDelete: D, connectionMode: _, connectionLineType: F = Bn.Bezier, connectionLineStyle: ne, connectionLineComponent: ee, connectionLineContainerStyle: ae, deleteKeyCode: fe = "Backspace", selectionKeyCode: de = "Shift", selectionOnDrag: oe = !1, selectionMode: b = si.Full, panActivationKeyCode: ce = "Space", multiSelectionKeyCode: Se = ls() ? "Meta" : "Control", zoomActivationKeyCode: he = ls() ? "Meta" : "Control", snapToGrid: me, snapGrid: pe, onlyRenderVisibleElements: Ne = !1, selectNodesOnDrag: Pe, nodesDraggable: Ae, autoPanOnNodeFocus: Re, nodesConnectable: De, nodesFocusable: Rt, nodeOrigin: gt = nm, edgesFocusable: kt, edgesReconnectable: At, elementsSelectable: rn = !0, defaultViewport: Yt = Sx, minZoom: lt = 0.5, maxZoom: Ct = 2, translateExtent: Wn = li, preventScrolling: wi = !0, nodeExtent: on, defaultMarkerColor: Yn = "#b1b1b7", zoomOnScroll: xs = !0, zoomOnPinch: xi = !0, panOnScroll: Si = !1, panOnScrollSpeed: Ss = 0.5, panOnScrollMode: oo = hr.Free, zoomOnDoubleClick: io = !0, panOnDrag: lo = !0, onPaneClick: so, onPaneMouseEnter: uo, onPaneMouseMove: vn, onPaneMouseLeave: wn, onPaneScroll: Ei, onPaneContextMenu: _i, paneClickDistance: ao = 0, nodeClickDistance: ki = 0, children: Ci, onReconnect: co, onReconnectStart: Ni, onReconnectEnd: Xn, onEdgeContextMenu: fo, onEdgeDoubleClick: bn, onEdgeMouseEnter: Es, onEdgeMouseMove: Qn, onEdgeMouseLeave: yr, reconnectRadius: vr = 10, onNodesChange: ho, onEdgesChange: _s, noDragClassName: ks = "nodrag", noWheelClassName: Cs = "nowheel", noPanClassName: Xt = "nopan", fitView: po, fitViewOptions: mo, connectOnClick: Ns, attributionPosition: Mi, proOptions: Pi, defaultEdgeOptions: Ti, elevateNodesOnSelect: Li, elevateEdgesOnSelect: Ms, disableKeyboardA11y: zi = !1, autoPanOnConnect: Ve, autoPanOnNodeDrag: Ps, autoPanSpeed: go, connectionRadius: Ii, isValidConnection: wr, onError: Ts, style: Ri, id: Kn, nodeDragThreshold: Nt, connectionDragThreshold: Ls, viewport: yt, onViewportChange: zs, width: Is, height: Rs, colorMode: xr = "light", debug: Sr, onScroll: bt, ariaLabelConfig: Er, ...As }, $s) {
  const Gn = Kn || "1", Ai = Cx(xr), yo = Q.useCallback((xn) => {
    xn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), bt == null || bt(xn);
  }, [bt]);
  return K.jsx("div", { "data-testid": "rf__wrapper", ...As, onScroll: yo, style: { ...Ri, ...XS }, ref: $s, className: Qe(["react-flow", u, Ai]), id: Kn, role: "application", children: K.jsxs(YS, { nodes: n, edges: o, width: Is, height: Rs, fitView: po, fitViewOptions: mo, minZoom: lt, maxZoom: Ct, nodeOrigin: gt, nodeExtent: on, children: [K.jsx(BS, { onInit: y, onNodeClick: h, onEdgeClick: p, onNodeMouseEnter: O, onNodeMouseMove: S, onNodeMouseLeave: M, onNodeContextMenu: I, onNodeDoubleClick: j, nodeTypes: c, edgeTypes: f, connectionLineType: F, connectionLineStyle: ne, connectionLineComponent: ee, connectionLineContainerStyle: ae, selectionKeyCode: de, selectionOnDrag: oe, selectionMode: b, deleteKeyCode: fe, multiSelectionKeyCode: Se, panActivationKeyCode: ce, zoomActivationKeyCode: he, onlyRenderVisibleElements: Ne, defaultViewport: Yt, translateExtent: Wn, minZoom: lt, maxZoom: Ct, preventScrolling: wi, zoomOnScroll: xs, zoomOnPinch: xi, zoomOnDoubleClick: io, panOnScroll: Si, panOnScrollSpeed: Ss, panOnScrollMode: oo, panOnDrag: lo, onPaneClick: so, onPaneMouseEnter: uo, onPaneMouseMove: vn, onPaneMouseLeave: wn, onPaneScroll: Ei, onPaneContextMenu: _i, paneClickDistance: ao, nodeClickDistance: ki, onSelectionContextMenu: H, onSelectionStart: R, onSelectionEnd: L, onReconnect: co, onReconnectStart: Ni, onReconnectEnd: Xn, onEdgeContextMenu: fo, onEdgeDoubleClick: bn, onEdgeMouseEnter: Es, onEdgeMouseMove: Qn, onEdgeMouseLeave: yr, reconnectRadius: vr, defaultMarkerColor: Yn, noDragClassName: ks, noWheelClassName: Cs, noPanClassName: Xt, rfId: Gn, disableKeyboardA11y: zi, nodeExtent: on, viewport: yt, onViewportChange: zs }), K.jsx(kx, { nodes: n, edges: o, defaultNodes: i, defaultEdges: s, onConnect: x, onConnectStart: k, onConnectEnd: E, onClickConnectStart: C, onClickConnectEnd: N, nodesDraggable: Ae, autoPanOnNodeFocus: Re, nodesConnectable: De, nodesFocusable: Rt, edgesFocusable: kt, edgesReconnectable: At, elementsSelectable: rn, elevateNodesOnSelect: Li, elevateEdgesOnSelect: Ms, minZoom: lt, maxZoom: Ct, nodeExtent: on, onNodesChange: ho, onEdgesChange: _s, snapToGrid: me, snapGrid: pe, connectionMode: _, translateExtent: Wn, connectOnClick: Ns, defaultEdgeOptions: Ti, fitView: po, fitViewOptions: mo, onNodesDelete: ie, onEdgesDelete: G, onDelete: J, onNodeDragStart: B, onNodeDrag: W, onNodeDragStop: Z, onSelectionDrag: V, onSelectionDragStart: P, onSelectionDragStop: $, onMove: g, onMoveStart: v, onMoveEnd: m, noPanClassName: Xt, nodeOrigin: gt, rfId: Gn, autoPanOnConnect: Ve, autoPanOnNodeDrag: Ps, autoPanSpeed: go, onError: Ts, connectionRadius: Ii, isValidConnection: wr, selectNodesOnDrag: Pe, nodeDragThreshold: Nt, connectionDragThreshold: Ls, onBeforeDelete: D, paneClickDistance: ao, debug: Sr, ariaLabelConfig: Er }), K.jsx(xx, { onSelectionChange: q }), Ci, K.jsx(mx, { proOptions: Pi, position: Mi }), K.jsx(px, { rfId: Gn, disableKeyboardA11y: zi })] }) });
}
var QS = om(bS);
function KS({ dimensions: n, lineWidth: o, variant: i, className: s }) {
  return K.jsx("path", { strokeWidth: o, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: Qe(["react-flow__background-pattern", i, s]) });
}
function GS({ radius: n, className: o }) {
  return K.jsx("circle", { cx: n, cy: n, r: n, className: Qe(["react-flow__background-pattern", "dots", o]) });
}
var Un;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(Un || (Un = {}));
const qS = {
  [Un.Dots]: 1,
  [Un.Lines]: 1,
  [Un.Cross]: 6
}, ZS = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function Pm({
  id: n,
  variant: o = Un.Dots,
  // only used for dots and cross
  gap: i = 20,
  // only used for lines and cross
  size: s,
  lineWidth: u = 1,
  offset: c = 0,
  color: f,
  bgColor: h,
  style: p,
  className: y,
  patternClassName: g
}) {
  const v = Q.useRef(null), { transform: m, patternId: x } = Te(ZS, We), k = s || qS[o], E = o === Un.Dots, C = o === Un.Cross, N = Array.isArray(i) ? i : [i, i], O = [N[0] * m[2] || 1, N[1] * m[2] || 1], S = k * m[2], M = Array.isArray(c) ? c : [c, c], I = C ? [S, S] : O, j = [
    M[0] * m[2] || 1 + I[0] / 2,
    M[1] * m[2] || 1 + I[1] / 2
  ], B = `${x}${n || ""}`;
  return K.jsxs("svg", { className: Qe(["react-flow__background", y]), style: {
    ...p,
    ...ws,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: v, "data-testid": "rf__background", children: [K.jsx("pattern", { id: B, x: m[0] % O[0], y: m[1] % O[1], width: O[0], height: O[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${j[0]},-${j[1]})`, children: E ? K.jsx(GS, { radius: S / 2, className: g }) : K.jsx(KS, { dimensions: I, lineWidth: u, variant: o, className: g }) }), K.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
Pm.displayName = "Background";
const JS = Q.memo(Pm);
function eE() {
  return K.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: K.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function tE() {
  return K.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: K.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function nE() {
  return K.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: K.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function rE() {
  return K.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: K.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function oE() {
  return K.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: K.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Wl({ children: n, className: o, ...i }) {
  return K.jsx("button", { type: "button", className: Qe(["react-flow__controls-button", o]), ...i, children: n });
}
const iE = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function Tm({ style: n, showZoom: o = !0, showFitView: i = !0, showInteractive: s = !0, fitViewOptions: u, onZoomIn: c, onZoomOut: f, onFitView: h, onInteractiveChange: p, className: y, children: g, position: v = "bottom-left", orientation: m = "vertical", "aria-label": x }) {
  const k = je(), { isInteractive: E, minZoomReached: C, maxZoomReached: N, ariaLabelConfig: O } = Te(iE, We), { zoomIn: S, zoomOut: M, fitView: I } = sc(), j = () => {
    S(), c == null || c();
  }, B = () => {
    M(), f == null || f();
  }, W = () => {
    I(u), h == null || h();
  }, Z = () => {
    k.setState({
      nodesDraggable: !E,
      nodesConnectable: !E,
      elementsSelectable: !E
    }), p == null || p(!E);
  }, ie = m === "horizontal" ? "horizontal" : "vertical";
  return K.jsxs(vs, { className: Qe(["react-flow__controls", ie, y]), position: v, style: n, "data-testid": "rf__controls", "aria-label": x ?? O["controls.ariaLabel"], children: [o && K.jsxs(K.Fragment, { children: [K.jsx(Wl, { onClick: j, className: "react-flow__controls-zoomin", title: O["controls.zoomIn.ariaLabel"], "aria-label": O["controls.zoomIn.ariaLabel"], disabled: N, children: K.jsx(eE, {}) }), K.jsx(Wl, { onClick: B, className: "react-flow__controls-zoomout", title: O["controls.zoomOut.ariaLabel"], "aria-label": O["controls.zoomOut.ariaLabel"], disabled: C, children: K.jsx(tE, {}) })] }), i && K.jsx(Wl, { className: "react-flow__controls-fitview", onClick: W, title: O["controls.fitView.ariaLabel"], "aria-label": O["controls.fitView.ariaLabel"], children: K.jsx(nE, {}) }), s && K.jsx(Wl, { className: "react-flow__controls-interactive", onClick: Z, title: O["controls.interactive.ariaLabel"], "aria-label": O["controls.interactive.ariaLabel"], children: E ? K.jsx(oE, {}) : K.jsx(rE, {}) }), g] });
}
Tm.displayName = "Controls";
const lE = Q.memo(Tm);
function sE({ id: n, x: o, y: i, width: s, height: u, style: c, color: f, strokeColor: h, strokeWidth: p, className: y, borderRadius: g, shapeRendering: v, selected: m, onClick: x }) {
  const { background: k, backgroundColor: E } = c || {}, C = f || k || E;
  return K.jsx("rect", { className: Qe(["react-flow__minimap-node", { selected: m }, y]), x: o, y: i, rx: g, ry: g, width: s, height: u, style: {
    fill: C,
    stroke: h,
    strokeWidth: p
  }, shapeRendering: v, onClick: x ? (N) => x(N, n) : void 0 });
}
const uE = Q.memo(sE), aE = (n) => n.nodes.map((o) => o.id), La = (n) => n instanceof Function ? n : () => n;
function cE({
  nodeStrokeColor: n,
  nodeColor: o,
  nodeClassName: i = "",
  nodeBorderRadius: s = 5,
  nodeStrokeWidth: u,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c = uE,
  onClick: f
}) {
  const h = Te(aE, We), p = La(o), y = La(n), g = La(i), v = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return K.jsx(K.Fragment, { children: h.map((m) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    K.jsx(dE, { id: m, nodeColorFunc: p, nodeStrokeColorFunc: y, nodeClassNameFunc: g, nodeBorderRadius: s, nodeStrokeWidth: u, NodeComponent: c, onClick: f, shapeRendering: v }, m)
  )) });
}
function fE({ id: n, nodeColorFunc: o, nodeStrokeColorFunc: i, nodeClassNameFunc: s, nodeBorderRadius: u, nodeStrokeWidth: c, shapeRendering: f, NodeComponent: h, onClick: p }) {
  const { node: y, x: g, y: v, width: m, height: x } = Te((k) => {
    const { internals: E } = k.nodeLookup.get(n), C = E.userNode, { x: N, y: O } = E.positionAbsolute, { width: S, height: M } = yn(C);
    return {
      node: C,
      x: N,
      y: O,
      width: S,
      height: M
    };
  }, We);
  return !y || y.hidden || !Ap(y) ? null : K.jsx(h, { x: g, y: v, width: m, height: x, style: y.style, selected: !!y.selected, className: s(y), color: o(y), borderRadius: u, strokeColor: i(y), strokeWidth: c, shapeRendering: f, onClick: p, id: y.id });
}
const dE = Q.memo(fE);
var hE = Q.memo(cE);
const pE = 200, mE = 150, gE = (n) => !n.hidden, yE = (n) => {
  const o = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: o,
    boundingRect: n.nodeLookup.size > 0 ? Rp(gi(n.nodeLookup, { filter: gE }), o) : o,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, vE = "react-flow__minimap-desc";
function Lm({
  style: n,
  className: o,
  nodeStrokeColor: i,
  nodeColor: s,
  nodeClassName: u = "",
  nodeBorderRadius: c = 5,
  nodeStrokeWidth: f,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: h,
  bgColor: p,
  maskColor: y,
  maskStrokeColor: g,
  maskStrokeWidth: v,
  position: m = "bottom-right",
  onClick: x,
  onNodeClick: k,
  pannable: E = !1,
  zoomable: C = !1,
  ariaLabel: N,
  inversePan: O,
  zoomStep: S = 10,
  offsetScale: M = 5
}) {
  const I = je(), j = Q.useRef(null), { boundingRect: B, viewBB: W, rfId: Z, panZoom: ie, translateExtent: G, flowWidth: J, flowHeight: q, ariaLabelConfig: P } = Te(yE, We), V = (n == null ? void 0 : n.width) ?? pE, $ = (n == null ? void 0 : n.height) ?? mE, H = B.width / V, R = B.height / $, L = Math.max(H, R), D = L * V, _ = L * $, F = M * L, ne = B.x - (D - B.width) / 2 - F, ee = B.y - (_ - B.height) / 2 - F, ae = D + F * 2, fe = _ + F * 2, de = `${vE}-${Z}`, oe = Q.useRef(0), b = Q.useRef();
  oe.current = L, Q.useEffect(() => {
    if (j.current && ie)
      return b.current = R1({
        domNode: j.current,
        panZoom: ie,
        getTransform: () => I.getState().transform,
        getViewScale: () => oe.current
      }), () => {
        var me;
        (me = b.current) == null || me.destroy();
      };
  }, [ie]), Q.useEffect(() => {
    var me;
    (me = b.current) == null || me.update({
      translateExtent: G,
      width: J,
      height: q,
      inversePan: O,
      pannable: E,
      zoomStep: S,
      zoomable: C
    });
  }, [E, C, O, S, G, J, q]);
  const ce = x ? (me) => {
    var Pe;
    const [pe, Ne] = ((Pe = b.current) == null ? void 0 : Pe.pointer(me)) || [0, 0];
    x(me, { x: pe, y: Ne });
  } : void 0, Se = k ? Q.useCallback((me, pe) => {
    const Ne = I.getState().nodeLookup.get(pe).internals.userNode;
    k(me, Ne);
  }, []) : void 0, he = N ?? P["minimap.ariaLabel"];
  return K.jsx(vs, { position: m, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof v == "number" ? v * L : void 0,
    "--xy-minimap-node-background-color-props": typeof s == "string" ? s : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: Qe(["react-flow__minimap", o]), "data-testid": "rf__minimap", children: K.jsxs("svg", { width: V, height: $, viewBox: `${ne} ${ee} ${ae} ${fe}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": de, ref: j, onClick: ce, children: [he && K.jsx("title", { id: de, children: he }), K.jsx(hE, { onClick: Se, nodeColor: s, nodeStrokeColor: i, nodeBorderRadius: c, nodeClassName: u, nodeStrokeWidth: f, nodeComponent: h }), K.jsx("path", { className: "react-flow__minimap-mask", d: `M${ne - F},${ee - F}h${ae + F * 2}v${fe + F * 2}h${-ae - F * 2}z
        M${W.x},${W.y}h${W.width}v${W.height}h${-W.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Lm.displayName = "MiniMap";
Q.memo(Lm);
const wE = (n) => (o) => n ? `${Math.max(1 / o.transform[2], 1)}` : void 0, xE = {
  [no.Line]: "right",
  [no.Handle]: "bottom-right"
};
function SE({ nodeId: n, position: o, variant: i = no.Handle, className: s, style: u = void 0, children: c, color: f, minWidth: h = 10, minHeight: p = 10, maxWidth: y = Number.MAX_VALUE, maxHeight: g = Number.MAX_VALUE, keepAspectRatio: v = !1, resizeDirection: m, autoScale: x = !0, shouldResize: k, onResizeStart: E, onResize: C, onResizeEnd: N }) {
  const O = um(), S = typeof n == "string" ? n : O, M = je(), I = Q.useRef(null), j = i === no.Handle, B = Te(Q.useCallback(wE(j && x), [j, x]), We), W = Q.useRef(null), Z = o ?? xE[i];
  Q.useEffect(() => {
    if (!(!I.current || !S))
      return W.current || (W.current = K1({
        domNode: I.current,
        nodeId: S,
        getStoreItems: () => {
          const { nodeLookup: G, transform: J, snapGrid: q, snapToGrid: P, nodeOrigin: V, domNode: $ } = M.getState();
          return {
            nodeLookup: G,
            transform: J,
            snapGrid: q,
            snapToGrid: P,
            nodeOrigin: V,
            paneDomNode: $
          };
        },
        onChange: (G, J) => {
          const { triggerNodeChanges: q, nodeLookup: P, parentLookup: V, nodeOrigin: $ } = M.getState(), H = [], R = { x: G.x, y: G.y }, L = P.get(S);
          if (L && L.expandParent && L.parentId) {
            const D = L.origin ?? $, _ = G.width ?? L.measured.width ?? 0, F = G.height ?? L.measured.height ?? 0, ne = {
              id: L.id,
              parentId: L.parentId,
              rect: {
                width: _,
                height: F,
                ...$p({
                  x: G.x ?? L.position.x,
                  y: G.y ?? L.position.y
                }, { width: _, height: F }, L.parentId, P, D)
              }
            }, ee = lc([ne], P, V, $);
            H.push(...ee), R.x = G.x ? Math.max(D[0] * _, G.x) : void 0, R.y = G.y ? Math.max(D[1] * F, G.y) : void 0;
          }
          if (R.x !== void 0 && R.y !== void 0) {
            const D = {
              id: S,
              type: "position",
              position: { ...R }
            };
            H.push(D);
          }
          if (G.width !== void 0 && G.height !== void 0) {
            const _ = {
              id: S,
              type: "dimensions",
              resizing: !0,
              setAttributes: m ? m === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: G.width,
                height: G.height
              }
            };
            H.push(_);
          }
          for (const D of J) {
            const _ = {
              ...D,
              type: "position"
            };
            H.push(_);
          }
          q(H);
        },
        onEnd: ({ width: G, height: J }) => {
          const q = {
            id: S,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: G,
              height: J
            }
          };
          M.getState().triggerNodeChanges([q]);
        }
      })), W.current.update({
        controlPosition: Z,
        boundaries: {
          minWidth: h,
          minHeight: p,
          maxWidth: y,
          maxHeight: g
        },
        keepAspectRatio: v,
        resizeDirection: m,
        onResizeStart: E,
        onResize: C,
        onResizeEnd: N,
        shouldResize: k
      }), () => {
        var G;
        (G = W.current) == null || G.destroy();
      };
  }, [
    Z,
    h,
    p,
    y,
    g,
    v,
    E,
    C,
    N,
    k
  ]);
  const ie = Z.split("-");
  return K.jsx("div", { className: Qe(["react-flow__resize-control", "nodrag", ...ie, i, s]), ref: I, style: {
    ...u,
    scale: B,
    ...f && { [j ? "backgroundColor" : "borderColor"]: f }
  }, children: c });
}
Q.memo(SE);
const zm = ["기준 설정", "로그 분석", "LLM 분석"], EE = { waiting: "대기", running: "실행 중", completed: "완료", failed: "실패" };
function _E({ data: n }) {
  return /* @__PURE__ */ le.createElement("div", { className: `analysis-node ${n.status}` }, /* @__PURE__ */ le.createElement(ro, { type: "target", position: Ee.Left }), /* @__PURE__ */ le.createElement("div", { className: "an-node-top" }, /* @__PURE__ */ le.createElement("span", null, "STEP 0", n.order), /* @__PURE__ */ le.createElement("b", null, EE[n.status])), /* @__PURE__ */ le.createElement("strong", null, n.label), /* @__PURE__ */ le.createElement("p", null, n.subtitle), /* @__PURE__ */ le.createElement("div", { className: "an-node-bottom" }, n.elapsed ? `${(n.elapsed / 1e3).toFixed(1)}초` : "—", /* @__PURE__ */ le.createElement("span", null, n.status === "completed" ? "✓" : n.status === "running" ? "●" : "○")), /* @__PURE__ */ le.createElement(ro, { type: "source", position: Ee.Right }));
}
function kE(n) {
  const [o] = nc(n);
  return /* @__PURE__ */ le.createElement(le.Fragment, null, /* @__PURE__ */ le.createElement(vi, { path: o, markerEnd: n.markerEnd, style: { stroke: n.data.done ? "#28c6a4" : n.data.active ? "#60a5fa" : "#475569", strokeWidth: 2 } }), n.data.active && /* @__PURE__ */ le.createElement(le.Fragment, null, /* @__PURE__ */ le.createElement("path", { d: o, fill: "none", stroke: "#60a5fa", strokeWidth: "3", strokeDasharray: "6 10", className: "analysis-edge" }), /* @__PURE__ */ le.createElement("circle", { r: "4", fill: "#93c5fd" }, /* @__PURE__ */ le.createElement("animateMotion", { dur: "1.4s", repeatCount: "indefinite", path: o }))));
}
const CE = { execution: _E }, NE = { animated: kE }, Yl = () => zm.map(() => ({ status: "waiting", elapsed: 0 })), ar = () => window.ReplayDetailBridge, Xh = (n) => {
  try {
    const o = new URL(n, location.href);
    return o.pathname + o.search + o.hash;
  } catch {
    return "";
  }
}, ME = (n) => `${Math.floor(n / 6e4)}:${String(Math.floor(n / 1e3) % 60).padStart(2, "0")}`;
function PE(n) {
  var i;
  if (n.id) return `#${CSS.escape(n.id)}`;
  for (const s of ["data-testid", "data-test", "data-qa", "data-cy", "name", "aria-label"]) {
    const u = n.getAttribute(s);
    if (!u) continue;
    const c = `${n.tagName.toLowerCase()}[${s}=${JSON.stringify(u)}]`;
    if (n.ownerDocument.querySelectorAll(c).length === 1) return c;
  }
  const o = [];
  for (let s = n; s && s !== n.ownerDocument.body; s = s.parentElement) {
    const u = [...((i = s.parentElement) == null ? void 0 : i.children) || []].filter((c) => c.tagName === s.tagName);
    o.unshift(`${s.tagName.toLowerCase()}:nth-of-type(${u.indexOf(s) + 1})`);
  }
  return o.join(" > ");
}
function TE(n) {
  var c, f, h;
  if (!n) return [];
  const o = n.events.find((p) => p.type === "snapshot"), i = new DOMParser().parseFromString(((c = o == null ? void 0 : o.data) == null ? void 0 : c.html) || "", "text/html"), s = i.querySelector(".screen.active[data-view]"), u = [{ name: (s == null ? void 0 : s.dataset.view) || "", label: ((f = i.querySelector("#screen-title")) == null ? void 0 : f.textContent) || i.title || "시작 화면", time: 0 }];
  for (const p of n.events)
    ((h = p.data) == null ? void 0 : h.eventType) === "view_state" && !u.some((y) => y.name === p.data.screenName) && u.push({ name: p.data.screenName, label: p.data.title || p.data.screenName, time: p.timeOffsetMs });
  return u;
}
function LE() {
  var oe;
  const [n, o] = Q.useState(() => {
    var b;
    return ((b = ar()) == null ? void 0 : b.getContext()) || {};
  }), [i, s] = Q.useState(!1), [u, c] = Q.useState("all"), [f, h] = Q.useState(null), [p, y] = Q.useState(null), [g, v] = Q.useState(!1), [m, x] = Q.useState("리플레이를 원하는 화면에서 멈춘 뒤 분석 기준을 선택하세요."), [k, E] = Q.useState(""), [C, N] = Q.useState(Yl), [O, S] = Q.useState([]), [M, I] = Q.useState(null), [j, B] = Q.useState(!1), [W, Z] = Q.useState(!1), [ie, G] = Q.useState(!1), [J, q] = Q.useState("0"), P = Q.useRef(null), V = Q.useRef(0), $ = Q.useRef(!1), H = TE(n.payload), R = p ? (((oe = n.payload) == null ? void 0 : oe.events) || []).filter((b) => {
    var ce;
    return ((ce = b.data) == null ? void 0 : ce.eventType) === "click" && p.selectors.includes(b.data.target);
  }).slice(0, 3).map((b) => ({
    timeOffsetMs: b.timeOffsetMs,
    type: b.type,
    data: { eventType: b.data.eventType, target: b.data.target }
  })) : [], L = (b) => S((ce) => [...ce, { at: (/* @__PURE__ */ new Date()).toLocaleTimeString("ko-KR", { hour12: !1 }), text: b }]), D = (b, ce) => N((Se) => Se.map((he, me) => me === b ? { ...he, ...ce } : he));
  Q.useEffect(() => {
    const b = (ce) => {
      V.current += 1, o({ ...ar().getContext(), ...ce.detail }), h(null), y(null), v(!1), I(null), N(Yl()), S([]), q("0");
    };
    return window.addEventListener("replay:session", b), () => window.removeEventListener("replay:session", b);
  }, []), Q.useEffect(() => {
    const b = n.frame;
    if (!b) return;
    let ce = () => {
    };
    const Se = () => {
      var Ae;
      ce();
      const he = b.contentDocument;
      if (!(he != null && he.body)) return;
      let me;
      const pe = he.createElement("style");
      pe.textContent = "[data-analysis-hover]{outline:3px solid #4f7cff!important;outline-offset:3px;cursor:crosshair!important}[data-analysis-selected]{outline:3px solid #14b8a6!important;outline-offset:3px}", he.head.append(pe);
      const Ne = (Re) => {
        me == null || me.removeAttribute("data-analysis-hover"), me = g ? Re.target.closest('button,a,[role="button"],input[type="submit"]') : null, me == null || me.setAttribute("data-analysis-hover", "");
      }, Pe = (Re) => {
        var At, rn, Yt;
        if (!i || (Re.preventDefault(), Re.stopImmediatePropagation(), !g)) return;
        const De = Re.target.closest('button,a,[role="button"],input[type="submit"]');
        if (!De) {
          x("버튼 또는 링크를 선택하세요.");
          return;
        }
        if ((((At = he.querySelector(".screen.active[data-view]")) == null ? void 0 : At.dataset.view) || "") !== (f == null ? void 0 : f.screenName)) {
          x("화면이 변경되었습니다. 먼저 이 화면을 다시 선택하세요."), v(!1);
          return;
        }
        const gt = PE(De), kt = /* @__PURE__ */ new Set([gt]);
        for (const lt of ((rn = n.payload) == null ? void 0 : rn.events) || [])
          if (((Yt = lt.data) == null ? void 0 : Yt.eventType) === "click")
            try {
              const Ct = he.querySelector(lt.data.target);
              Ct && De.contains(Ct) && kt.add(lt.data.target);
            } catch {
            }
        y({ label: (De.getAttribute("aria-label") || De.textContent || De.value || "선택한 버튼").trim().replace(/\s+/g, " ").slice(0, 100), selectors: [...kt].slice(0, 100) }), he.querySelectorAll("[data-analysis-selected]").forEach((lt) => lt.removeAttribute("data-analysis-selected")), De.setAttribute("data-analysis-selected", ""), v(!1), x("버튼을 선택했습니다. 로그를 확인하거나 분석을 실행하세요.");
      };
      if (he.addEventListener("pointermove", Ne, !0), he.addEventListener("click", Pe, !0), i && p)
        try {
          (Ae = he.querySelector(p.selectors[0])) == null || Ae.setAttribute("data-analysis-selected", "");
        } catch {
        }
      ce = () => {
        he.removeEventListener("pointermove", Ne, !0), he.removeEventListener("click", Pe, !0), pe.remove(), he.querySelectorAll("[data-analysis-hover],[data-analysis-selected]").forEach((Re) => {
          Re.removeAttribute("data-analysis-hover"), Re.removeAttribute("data-analysis-selected");
        });
      };
    };
    return Se(), b.addEventListener("load", Se), () => {
      ce(), b.removeEventListener("load", Se);
    };
  }, [n, i, g, f, p]);
  function _() {
    var pe, Ne, Pe, Ae;
    ar().pause();
    const b = (pe = n.frame) == null ? void 0 : pe.contentDocument;
    if (!(b != null && b.body)) return;
    const ce = b.querySelector(".screen.active[data-view]"), Se = n.payload.events.find((Re) => Re.type === "snapshot");
    let he = ((Ne = Se == null ? void 0 : Se.data) == null ? void 0 : Ne.url) || n.payload.pageUrl;
    const me = Number(document.getElementById("replay-position").value);
    for (const Re of n.payload.events)
      Re.timeOffsetMs <= me && ["history_pushstate", "history_replacestate", "popstate", "hashchange"].includes((Pe = Re.data) == null ? void 0 : Pe.eventType) && (he = Re.data.href || he);
    h({ pagePath: Xh(he), screenName: (ce == null ? void 0 : ce.dataset.view) || "", screenLabel: ((Ae = b.querySelector("#screen-title")) == null ? void 0 : Ae.textContent) || b.title || Xh(he) }), y(null), I(null), v(!1), x("화면을 선택했습니다. 화면 방문자를 분석하거나 버튼 조건을 추가하세요."), N(Yl()), S([]);
  }
  function F() {
    return { scope: u, sessionId: n.sessionId, ...f, button: p };
  }
  function ne() {
    P.current.showModal(), G(!0);
  }
  async function ee(b) {
    const ce = await fetch("/api/replay/analyze-cohort", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(F()) });
    if (!ce.ok) {
      const Ne = await ce.json();
      throw new Error(Ne.error || "로그 조회 실패");
    }
    const Se = ce.body.getReader(), he = new TextDecoder();
    let me = "", pe;
    for (; ; ) {
      const { value: Ne, done: Pe } = await Se.read();
      me += he.decode(Ne, { stream: !Pe });
      let Ae;
      for (; (Ae = me.indexOf(`
`)) !== -1; ) {
        const Re = me.slice(0, Ae);
        if (me = me.slice(Ae + 1), !Re.trim()) continue;
        const De = JSON.parse(Re);
        if (De.type === "error") throw new Error(De.error);
        De.type === "progress" && b(De), De.type === "result" && (pe = De);
      }
      if (Pe) break;
    }
    if (!pe) throw new Error("분석 결과를 받지 못했습니다.");
    return pe;
  }
  async function ae(b) {
    if (!f || $.current) return;
    $.current = !0, B(!0), v(!1), ar().pause();
    const ce = ++V.current, Se = performance.now();
    let he = 1, me = Se;
    I(null), S([]), N([{ status: "completed", elapsed: 0 }, { status: "running", elapsed: 0 }, { status: "waiting", elapsed: 0 }]), ne(), L(`기준 설정 완료 · ${u === "all" ? "전체 세션" : "현재 세션"} · ${f.screenLabel}${p ? ` / ${p.label} 클릭` : " 방문"}`);
    try {
      const pe = await ee((Ae) => {
        ce === V.current && D(1, { subtitle: `${Ae.scanned} / ${Ae.total}개 세션 확인`, elapsed: performance.now() - Se });
      });
      if (ce !== V.current) return;
      if (I(pe), D(1, { status: "completed", elapsed: performance.now() - Se }), L(`로그 분석 완료 · ${pe.summary.scannedSessions}개 중 ${pe.summary.matchedSessions}개 세션 일치 · ${pe.summary.matchedEvents}건`), !pe.summary.matchedSessions) {
        x("조건에 맞는 세션이 없습니다. 화면 또는 버튼 조건을 변경해보세요."), L("일치 세션이 없어 LLM 분석을 실행하지 않았습니다.");
        return;
      }
      if (!b) {
        L("로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.");
        return;
      }
      he = 2, me = performance.now(), D(2, { status: "running" }), L("조건을 충족한 세션들의 행동 요약으로 LLM 분석 시작");
      const Ne = await fetch("/api/llm-analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ summary: pe.summary, analysisInstructions: `조건을 충족한 세션 집단을 분석하세요. 집계 지표는 세션별 평균이며 고객 수로 해석하지 마세요. 행동은 일치한 세션 전체의 행동입니다. ${k}` }) }), Pe = await Ne.json();
      if (!Ne.ok) throw new Error(Pe.error || "LLM 분석 실패");
      if (ce !== V.current) return;
      D(2, { status: "completed", elapsed: performance.now() - me }), L("LLM 분석 완료 · 좌측 분석 메뉴에 결과를 반영했습니다."), x("분석이 완료되었습니다. 좌측 분석 메뉴에서 결과를 확인하세요."), window.dispatchEvent(new CustomEvent("replay:cohort-result", { detail: { result: pe, llm: Pe } }));
    } catch (pe) {
      if (ce !== V.current) return;
      D(he, { status: "failed", elapsed: performance.now() - me }), L(pe.message), x(`분석 실패: ${pe.message}`);
    } finally {
      $.current = !1, B(!1);
    }
  }
  const fe = zm.map((b, ce) => ({ id: String(ce), type: "execution", position: { x: ce * 290, y: 30 }, data: { order: ce + 1, label: b, subtitle: [f ? `${f.screenLabel}${p ? " · 버튼 클릭" : " · 화면 방문"}` : "화면과 버튼 선택", M ? `${M.summary.matchedSessions} / ${M.summary.scannedSessions}개 세션 일치` : "조건에 맞는 세션 필터링", "고객 행동 유형 해석"][ce], ...C[ce] } })), de = [0, 1].map((b) => ({ id: `e${b}`, source: String(b), target: String(b + 1), type: "animated", data: { active: C[b].status === "completed" && C[b + 1].status === "running", done: C[b + 1].status === "completed" }, markerEnd: { type: ui.ArrowClosed, color: "#64748b" } }));
  return /* @__PURE__ */ le.createElement("div", { className: "detail-analysis" }, /* @__PURE__ */ le.createElement("div", { className: "detail-toolbar" }, /* @__PURE__ */ le.createElement("div", null, /* @__PURE__ */ le.createElement("span", { className: "detail-eyebrow" }, "BEHAVIOR WORKSPACE"), /* @__PURE__ */ le.createElement("strong", null, "리플레이에서 분석 조건 찾기")), /* @__PURE__ */ le.createElement("label", { className: "detail-switch" }, /* @__PURE__ */ le.createElement("input", { type: "checkbox", role: "switch", checked: i, disabled: j, onChange: (b) => {
    var ce;
    s(b.target.checked), v(!1), b.target.checked && ((ce = ar()) == null || ce.pause());
  } }), /* @__PURE__ */ le.createElement("span", null), "상세 분석 ", /* @__PURE__ */ le.createElement("b", null, i ? "ON" : "OFF"))), i && /* @__PURE__ */ le.createElement("div", { className: "detail-settings" }, /* @__PURE__ */ le.createElement("div", { className: "detail-intro" }, /* @__PURE__ */ le.createElement("span", null, "01 — 분석 기준"), /* @__PURE__ */ le.createElement("p", null, "화면을 선택하고, 원하는 버튼을 누른 세션만 모아 분석하세요.")), /* @__PURE__ */ le.createElement("fieldset", { disabled: j || W || !n.payload }, /* @__PURE__ */ le.createElement("div", { className: "detail-field" }, /* @__PURE__ */ le.createElement("span", null, "분석 범위"), /* @__PURE__ */ le.createElement("div", { className: "scope-options", role: "group", "aria-label": "분석 범위" }, [["all", "전체 세션"], ["current", "현재 선택한 세션"]].map(([b, ce]) => /* @__PURE__ */ le.createElement("button", { key: b, type: "button", "aria-pressed": u === b, className: u === b ? "selected" : "", onClick: () => {
    c(b), I(null), N(Yl());
  } }, ce)))), /* @__PURE__ */ le.createElement("div", { className: "screen-navigator" }, /* @__PURE__ */ le.createElement("label", null, "기록된 화면", /* @__PURE__ */ le.createElement("select", { "aria-label": "기록된 화면", value: J, onChange: (b) => q(b.target.value) }, H.map((b, ce) => /* @__PURE__ */ le.createElement("option", { key: ce, value: ce }, b.label, " · ", ME(b.time))))), /* @__PURE__ */ le.createElement("button", { type: "button", className: "detail-secondary", onClick: async () => {
    Z(!0), v(!1);
    try {
      await ar().seek(H[Number(J)].time), x("화면으로 이동했습니다. 이 화면 선택을 눌러 기준을 지정하세요.");
    } catch (b) {
      x(b.message);
    } finally {
      Z(!1);
    }
  } }, "화면으로 이동")), /* @__PURE__ */ le.createElement("div", { className: "criteria-cards" }, /* @__PURE__ */ le.createElement("div", null, /* @__PURE__ */ le.createElement("small", null, "화면 조건"), /* @__PURE__ */ le.createElement("strong", null, (f == null ? void 0 : f.screenLabel) || "선택한 화면 없음"), /* @__PURE__ */ le.createElement("code", null, (f == null ? void 0 : f.pagePath) || "리플레이를 멈추고 선택하세요"), /* @__PURE__ */ le.createElement("button", { type: "button", onClick: _ }, "이 화면 선택")), /* @__PURE__ */ le.createElement("div", null, /* @__PURE__ */ le.createElement("small", null, "버튼 조건 · 선택 사항"), /* @__PURE__ */ le.createElement("strong", null, (p == null ? void 0 : p.label) || "화면 방문 세션 전체"), /* @__PURE__ */ le.createElement("code", null, (p == null ? void 0 : p.selectors[0]) || "특정 버튼 클릭 조건을 추가할 수 있어요"), /* @__PURE__ */ le.createElement("div", { className: "detail-buttons" }, /* @__PURE__ */ le.createElement("button", { type: "button", disabled: !f, className: g ? "picking" : "", onClick: () => {
    ar().pause(), v(!g), x(g ? "버튼 선택을 취소했습니다." : "리플레이 화면 속 버튼을 클릭하세요.");
  } }, g ? "선택 취소" : "화면에서 버튼 선택"), p && /* @__PURE__ */ le.createElement("button", { type: "button", className: "detail-secondary", onClick: () => {
    y(null), I(null);
  } }, "해제")))), /* @__PURE__ */ le.createElement("details", { className: "detail-prompt" }, /* @__PURE__ */ le.createElement("summary", null, "LLM 분석 기준 추가"), /* @__PURE__ */ le.createElement("textarea", { value: k, onChange: (b) => E(b.target.value), maxLength: 1e3, rows: "3", placeholder: "예: 가입 의도와 이탈 징후를 중심으로 분석해줘" })), p && /* @__PURE__ */ le.createElement("details", { className: "selected-log-sample", open: !0 }, /* @__PURE__ */ le.createElement("summary", null, "선택한 버튼의 실제 기록 예시 · 현재 세션"), R.length ? /* @__PURE__ */ le.createElement("pre", null, JSON.stringify(R, null, 2)) : /* @__PURE__ */ le.createElement("p", null, "현재 세션에 이 버튼의 클릭 기록이 없습니다. ‘실제 로그 확인’으로 선택한 분석 범위에서 찾아보세요."), /* @__PURE__ */ le.createElement("small", null, "화면 조건까지 적용한 결과는 ‘실제 로그 확인’에서 확인할 수 있습니다.")), /* @__PURE__ */ le.createElement("div", { className: "detail-actions" }, /* @__PURE__ */ le.createElement("button", { type: "button", className: "detail-secondary", disabled: !f, onClick: () => ae(!1) }, "실제 로그 확인"), /* @__PURE__ */ le.createElement("button", { type: "button", disabled: !f, onClick: () => ae(!0) }, "분석 실행 ↗"), /* @__PURE__ */ le.createElement("small", null, "일치한 세션 전체의 행동을 분석합니다."))), /* @__PURE__ */ le.createElement("p", { className: "detail-message", role: "status" }, n.payload ? m : "먼저 세션 목록에서 리플레이를 선택하세요.")), /* @__PURE__ */ le.createElement("dialog", { ref: P, className: "analysis-dialog", "aria-labelledby": "analysis-dialog-title", onClose: () => G(!1), onCancel: (b) => {
    j && b.preventDefault();
  } }, /* @__PURE__ */ le.createElement("div", { className: "analysis-modal-head" }, /* @__PURE__ */ le.createElement("div", null, /* @__PURE__ */ le.createElement("span", { className: "detail-eyebrow" }, "ANALYSIS WORKFLOW"), /* @__PURE__ */ le.createElement("h2", { id: "analysis-dialog-title" }, "조건에서 고객 이해까지"), /* @__PURE__ */ le.createElement("p", null, u === "all" ? "전체 세션" : "현재 선택한 세션", " · ", f == null ? void 0 : f.screenLabel, p ? ` → ${p.label} 클릭` : " 방문")), /* @__PURE__ */ le.createElement("button", { type: "button", "aria-label": "분석 팝업 닫기", className: "detail-secondary", disabled: j, onClick: () => P.current.close() }, "×")), /* @__PURE__ */ le.createElement("div", { className: "analysis-flow" }, ie && /* @__PURE__ */ le.createElement(QS, { nodes: fe, edges: de, nodeTypes: CE, edgeTypes: NE, nodesDraggable: !1, nodesConnectable: !1, fitView: !0, fitViewOptions: { padding: 0.18 }, minZoom: 0.3, maxZoom: 1.3 }, /* @__PURE__ */ le.createElement(JS, { color: "#2b3c55", gap: 20 }), /* @__PURE__ */ le.createElement(lE, { showInteractive: !1 }))), /* @__PURE__ */ le.createElement("div", { className: "analysis-modal-body" }, /* @__PURE__ */ le.createElement("div", { className: "analysis-events" }, /* @__PURE__ */ le.createElement("h3", null, "작업 로그 ", /* @__PURE__ */ le.createElement("span", null, j ? "실행 중" : "대기 또는 완료")), /* @__PURE__ */ le.createElement("div", { "aria-live": "polite" }, O.map((b, ce) => /* @__PURE__ */ le.createElement("p", { key: ce }, /* @__PURE__ */ le.createElement("time", null, b.at), b.text)))), M && /* @__PURE__ */ le.createElement("div", { className: "analysis-log-preview" }, /* @__PURE__ */ le.createElement("h3", null, "조건에 맞는 실제 로그 ", /* @__PURE__ */ le.createElement("span", null, M.summary.matchedEvents, "건")), /* @__PURE__ */ le.createElement("p", null, M.summary.scannedSessions, "개 중 ", /* @__PURE__ */ le.createElement("b", null, M.summary.matchedSessions, "개 세션"), " · 최대 50건 미리보기"), M.logs.length ? /* @__PURE__ */ le.createElement("pre", null, JSON.stringify(M.logs, null, 2)) : /* @__PURE__ */ le.createElement("p", null, "일치하는 로그가 없습니다. 조건을 변경해보세요."))), /* @__PURE__ */ le.createElement("div", { className: "analysis-modal-footer" }, /* @__PURE__ */ le.createElement("span", null, j ? "실제 분석 응답을 기다리고 있습니다." : "로그를 확인한 뒤 팝업을 닫아 기준을 수정할 수 있습니다."), /* @__PURE__ */ le.createElement("button", { type: "button", disabled: j, onClick: () => P.current.close() }, C[2].status === "completed" ? "분석 결과 보기" : "닫기"))));
}
g0.createRoot(document.getElementById("detail-analysis-root")).render(/* @__PURE__ */ le.createElement(LE, null));
