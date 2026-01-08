import {D as El} from "./settings.js";
function lc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Ku = {
    exports: {}
}
  , ul = {}
  , Yu = {
    exports: {}
}
  , j = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rr = Symbol.for("react.element")
  , oc = Symbol.for("react.portal")
  , ic = Symbol.for("react.fragment")
  , uc = Symbol.for("react.strict_mode")
  , sc = Symbol.for("react.profiler")
  , ac = Symbol.for("react.provider")
  , cc = Symbol.for("react.context")
  , fc = Symbol.for("react.forward_ref")
  , dc = Symbol.for("react.suspense")
  , pc = Symbol.for("react.memo")
  , mc = Symbol.for("react.lazy")
  , Ai = Symbol.iterator;
function hc(e) {
    return e === null || typeof e != "object" ? null : (e = Ai && e[Ai] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Xu = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , Gu = Object.assign
  , Zu = {};
function vn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Zu,
    this.updater = n || Xu
}
vn.prototype.isReactComponent = {};
vn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
vn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function Ju() {}
Ju.prototype = vn.prototype;
function Ho(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Zu,
    this.updater = n || Xu
}
var Wo = Ho.prototype = new Ju;
Wo.constructor = Ho;
Gu(Wo, vn.prototype);
Wo.isPureReactComponent = !0;
var Fi = Array.isArray
  , qu = Object.prototype.hasOwnProperty
  , Qo = {
    current: null
}
  , bu = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function es(e, t, n) {
    var r, l = {}, o = null, i = null;
    if (t != null)
        for (r in t.ref !== void 0 && (i = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t)
            qu.call(t, r) && !bu.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1)
        l.children = n;
    else if (1 < u) {
        for (var s = Array(u), c = 0; c < u; c++)
            s[c] = arguments[c + 2];
        l.children = s
    }
    if (e && e.defaultProps)
        for (r in u = e.defaultProps,
        u)
            l[r] === void 0 && (l[r] = u[r]);
    return {
        $$typeof: rr,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: Qo.current
    }
}
function vc(e, t) {
    return {
        $$typeof: rr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function Ko(e) {
    return typeof e == "object" && e !== null && e.$$typeof === rr
}
function yc(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var $i = /\/+/g;
function Cl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? yc("" + e.key) : t.toString(36)
}
function _r(e, t, n, r, l) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var i = !1;
    if (e === null)
        i = !0;
    else
        switch (o) {
        case "string":
        case "number":
            i = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case rr:
            case oc:
                i = !0
            }
        }
    if (i)
        return i = e,
        l = l(i),
        e = r === "" ? "." + Cl(i, 0) : r,
        Fi(l) ? (n = "",
        e != null && (n = e.replace($i, "$&/") + "/"),
        _r(l, t, n, "", function(c) {
            return c
        })) : l != null && (Ko(l) && (l = vc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace($i, "$&/") + "/") + e)),
        t.push(l)),
        1;
    if (i = 0,
    r = r === "" ? "." : r + ":",
    Fi(e))
        for (var u = 0; u < e.length; u++) {
            o = e[u];
            var s = r + Cl(o, u);
            i += _r(o, t, n, s, l)
        }
    else if (s = hc(e),
    typeof s == "function")
        for (e = s.call(e),
        u = 0; !(o = e.next()).done; )
            o = o.value,
            s = r + Cl(o, u++),
            i += _r(o, t, n, s, l);
    else if (o === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return i
}
function sr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , l = 0;
    return _r(e, r, "", "", function(o) {
        return t.call(n, o, l++)
    }),
    r
}
function gc(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var ye = {
    current: null
}
  , Nr = {
    transition: null
}
  , wc = {
    ReactCurrentDispatcher: ye,
    ReactCurrentBatchConfig: Nr,
    ReactCurrentOwner: Qo
};
function ts() {
    throw Error("act(...) is not supported in production builds of React.")
}
j.Children = {
    map: sr,
    forEach: function(e, t, n) {
        sr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return sr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return sr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!Ko(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
j.Component = vn;
j.Fragment = ic;
j.Profiler = sc;
j.PureComponent = Ho;
j.StrictMode = uc;
j.Suspense = dc;
j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wc;
j.act = ts;
j.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Gu({}, e.props)
      , l = e.key
      , o = e.ref
      , i = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (o = t.ref,
        i = Qo.current),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
            var u = e.type.defaultProps;
        for (s in t)
            qu.call(t, s) && !bu.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s])
    }
    var s = arguments.length - 2;
    if (s === 1)
        r.children = n;
    else if (1 < s) {
        u = Array(s);
        for (var c = 0; c < s; c++)
            u[c] = arguments[c + 2];
        r.children = u
    }
    return {
        $$typeof: rr,
        type: e.type,
        key: l,
        ref: o,
        props: r,
        _owner: i
    }
}
;
j.createContext = function(e) {
    return e = {
        $$typeof: cc,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: ac,
        _context: e
    },
    e.Consumer = e
}
;
j.createElement = es;
j.createFactory = function(e) {
    var t = es.bind(null, e);
    return t.type = e,
    t
}
;
j.createRef = function() {
    return {
        current: null
    }
}
;
j.forwardRef = function(e) {
    return {
        $$typeof: fc,
        render: e
    }
}
;
j.isValidElement = Ko;
j.lazy = function(e) {
    return {
        $$typeof: mc,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: gc
    }
}
;
j.memo = function(e, t) {
    return {
        $$typeof: pc,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
j.startTransition = function(e) {
    var t = Nr.transition;
    Nr.transition = {};
    try {
        e()
    } finally {
        Nr.transition = t
    }
}
;
j.unstable_act = ts;
j.useCallback = function(e, t) {
    return ye.current.useCallback(e, t)
}
;
j.useContext = function(e) {
    return ye.current.useContext(e)
}
;
j.useDebugValue = function() {}
;
j.useDeferredValue = function(e) {
    return ye.current.useDeferredValue(e)
}
;
j.useEffect = function(e, t) {
    return ye.current.useEffect(e, t)
}
;
j.useId = function() {
    return ye.current.useId()
}
;
j.useImperativeHandle = function(e, t, n) {
    return ye.current.useImperativeHandle(e, t, n)
}
;
j.useInsertionEffect = function(e, t) {
    return ye.current.useInsertionEffect(e, t)
}
;
j.useLayoutEffect = function(e, t) {
    return ye.current.useLayoutEffect(e, t)
}
;
j.useMemo = function(e, t) {
    return ye.current.useMemo(e, t)
}
;
j.useReducer = function(e, t, n) {
    return ye.current.useReducer(e, t, n)
}
;
j.useRef = function(e) {
    return ye.current.useRef(e)
}
;
j.useState = function(e) {
    return ye.current.useState(e)
}
;
j.useSyncExternalStore = function(e, t, n) {
    return ye.current.useSyncExternalStore(e, t, n)
}
;
j.useTransition = function() {
    return ye.current.useTransition()
}
;
j.version = "18.3.1";
Yu.exports = j;
var te = Yu.exports;
const kc = lc(te);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sc = te
  , xc = Symbol.for("react.element")
  , Ec = Symbol.for("react.fragment")
  , Cc = Object.prototype.hasOwnProperty
  , _c = Sc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Nc = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ns(e, t, n) {
    var r, l = {}, o = null, i = null;
    n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
    for (r in t)
        Cc.call(t, r) && !Nc.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: xc,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: _c.current
    }
}
ul.Fragment = Ec;
ul.jsx = ns;
ul.jsxs = ns;
Ku.exports = ul;
var z = Ku.exports
  , rs = {
    exports: {}
}
  , Te = {}
  , ls = {
    exports: {}
}
  , os = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(S, L) {
        var T = S.length;
        S.push(L);
        e: for (; 0 < T; ) {
            var I = T - 1 >>> 1
              , $ = S[I];
            if (0 < l($, L))
                S[I] = L,
                S[T] = $,
                T = I;
            else
                break e
        }
    }
    function n(S) {
        return S.length === 0 ? null : S[0]
    }
    function r(S) {
        if (S.length === 0)
            return null;
        var L = S[0]
          , T = S.pop();
        if (T !== L) {
            S[0] = T;
            e: for (var I = 0, $ = S.length, ce = $ >>> 1; I < ce; ) {
                var b = 2 * (I + 1) - 1
                  , ut = S[b]
                  , Oe = b + 1
                  , Ae = S[Oe];
                if (0 > l(ut, T))
                    Oe < $ && 0 > l(Ae, ut) ? (S[I] = Ae,
                    S[Oe] = T,
                    I = Oe) : (S[I] = ut,
                    S[b] = T,
                    I = b);
                else if (Oe < $ && 0 > l(Ae, T))
                    S[I] = Ae,
                    S[Oe] = T,
                    I = Oe;
                else
                    break e
            }
        }
        return L
    }
    function l(S, L) {
        var T = S.sortIndex - L.sortIndex;
        return T !== 0 ? T : S.id - L.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var o = performance;
        e.unstable_now = function() {
            return o.now()
        }
    } else {
        var i = Date
          , u = i.now();
        e.unstable_now = function() {
            return i.now() - u
        }
    }
    var s = []
      , c = []
      , h = 1
      , m = null
      , p = 3
      , w = !1
      , y = !1
      , k = !1
      , O = typeof setTimeout == "function" ? setTimeout : null
      , f = typeof clearTimeout == "function" ? clearTimeout : null
      , a = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function d(S) {
        for (var L = n(c); L !== null; ) {
            if (L.callback === null)
                r(c);
            else if (L.startTime <= S)
                r(c),
                L.sortIndex = L.expirationTime,
                t(s, L);
            else
                break;
            L = n(c)
        }
    }
    function v(S) {
        if (k = !1,
        d(S),
        !y)
            if (n(s) !== null)
                y = !0,
                D(x);
            else {
                var L = n(c);
                L !== null && M(v, L.startTime - S)
            }
    }
    function x(S, L) {
        y = !1,
        k && (k = !1,
        f(P),
        P = -1),
        w = !0;
        var T = p;
        try {
            for (d(L),
            m = n(s); m !== null && (!(m.expirationTime > L) || S && !A()); ) {
                var I = m.callback;
                if (typeof I == "function") {
                    m.callback = null,
                    p = m.priorityLevel;
                    var $ = I(m.expirationTime <= L);
                    L = e.unstable_now(),
                    typeof $ == "function" ? m.callback = $ : m === n(s) && r(s),
                    d(L)
                } else
                    r(s);
                m = n(s)
            }
            if (m !== null)
                var ce = !0;
            else {
                var b = n(c);
                b !== null && M(v, b.startTime - L),
                ce = !1
            }
            return ce
        } finally {
            m = null,
            p = T,
            w = !1
        }
    }
    var _ = !1
      , C = null
      , P = -1
      , K = 5
      , N = -1;
    function A() {
        return !(e.unstable_now() - N < K)
    }
    function Y() {
        if (C !== null) {
            var S = e.unstable_now();
            N = S;
            var L = !0;
            try {
                L = C(!0, S)
            } finally {
                L ? J() : (_ = !1,
                C = null)
            }
        } else
            _ = !1
    }
    var J;
    if (typeof a == "function")
        J = function() {
            a(Y)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var B = new MessageChannel
          , V = B.port2;
        B.port1.onmessage = Y,
        J = function() {
            V.postMessage(null)
        }
    } else
        J = function() {
            O(Y, 0)
        }
        ;
    function D(S) {
        C = S,
        _ || (_ = !0,
        J())
    }
    function M(S, L) {
        P = O(function() {
            S(e.unstable_now())
        }, L)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(S) {
        S.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        y || w || (y = !0,
        D(x))
    }
    ,
    e.unstable_forceFrameRate = function(S) {
        0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : K = 0 < S ? Math.floor(1e3 / S) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return p
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(s)
    }
    ,
    e.unstable_next = function(S) {
        switch (p) {
        case 1:
        case 2:
        case 3:
            var L = 3;
            break;
        default:
            L = p
        }
        var T = p;
        p = L;
        try {
            return S()
        } finally {
            p = T
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(S, L) {
        switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            S = 3
        }
        var T = p;
        p = S;
        try {
            return L()
        } finally {
            p = T
        }
    }
    ,
    e.unstable_scheduleCallback = function(S, L, T) {
        var I = e.unstable_now();
        switch (typeof T == "object" && T !== null ? (T = T.delay,
        T = typeof T == "number" && 0 < T ? I + T : I) : T = I,
        S) {
        case 1:
            var $ = -1;
            break;
        case 2:
            $ = 250;
            break;
        case 5:
            $ = 1073741823;
            break;
        case 4:
            $ = 1e4;
            break;
        default:
            $ = 5e3
        }
        return $ = T + $,
        S = {
            id: h++,
            callback: L,
            priorityLevel: S,
            startTime: T,
            expirationTime: $,
            sortIndex: -1
        },
        T > I ? (S.sortIndex = T,
        t(c, S),
        n(s) === null && S === n(c) && (k ? (f(P),
        P = -1) : k = !0,
        M(v, T - I))) : (S.sortIndex = $,
        t(s, S),
        y || w || (y = !0,
        D(x))),
        S
    }
    ,
    e.unstable_shouldYield = A,
    e.unstable_wrapCallback = function(S) {
        var L = p;
        return function() {
            var T = p;
            p = L;
            try {
                return S.apply(this, arguments)
            } finally {
                p = T
            }
        }
    }
}
)(os);
ls.exports = os;
var Pc = ls.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc = te
  , Pe = Pc;
function g(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var is = new Set
  , Un = {};
function Bt(e, t) {
    an(e, t),
    an(e + "Capture", t)
}
function an(e, t) {
    for (Un[e] = t,
    e = 0; e < t.length; e++)
        is.add(t[e])
}
var nt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , Zl = Object.prototype.hasOwnProperty
  , zc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , Ui = {}
  , Bi = {};
function Lc(e) {
    return Zl.call(Bi, e) ? !0 : Zl.call(Ui, e) ? !1 : zc.test(e) ? Bi[e] = !0 : (Ui[e] = !0,
    !1)
}
function Dc(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function jc(e, t, n, r) {
    if (t === null || typeof t > "u" || Dc(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function ge(e, t, n, r, l, o, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = l,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = o,
    this.removeEmptyString = i
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ae[e] = new ge(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    ae[t] = new ge(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ae[e] = new ge(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ae[e] = new ge(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ae[e] = new ge(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ae[e] = new ge(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    ae[e] = new ge(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ae[e] = new ge(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    ae[e] = new ge(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var Yo = /[\-:]([a-z])/g;
function Xo(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Yo, Xo);
    ae[t] = new ge(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Yo, Xo);
    ae[t] = new ge(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Yo, Xo);
    ae[t] = new ge(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ae[e] = new ge(e,1,!1,e.toLowerCase(),null,!1,!1)
});
ae.xlinkHref = new ge("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ae[e] = new ge(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function Go(e, t, n, r) {
    var l = ae.hasOwnProperty(t) ? ae[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (jc(t, n, l, r) && (n = null),
    r || l === null ? Lc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
    r = l.attributeNamespace,
    n === null ? e.removeAttribute(t) : (l = l.type,
    n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var it = Tc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , ar = Symbol.for("react.element")
  , Wt = Symbol.for("react.portal")
  , Qt = Symbol.for("react.fragment")
  , Zo = Symbol.for("react.strict_mode")
  , Jl = Symbol.for("react.profiler")
  , us = Symbol.for("react.provider")
  , ss = Symbol.for("react.context")
  , Jo = Symbol.for("react.forward_ref")
  , ql = Symbol.for("react.suspense")
  , bl = Symbol.for("react.suspense_list")
  , qo = Symbol.for("react.memo")
  , at = Symbol.for("react.lazy")
  , as = Symbol.for("react.offscreen")
  , Vi = Symbol.iterator;
function wn(e) {
    return e === null || typeof e != "object" ? null : (e = Vi && e[Vi] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Z = Object.assign, _l;
function Pn(e) {
    if (_l === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            _l = t && t[1] || ""
        }
    return `
` + _l + e
}
var Nl = !1;
function Pl(e, t) {
    if (!e || Nl)
        return "";
    Nl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var l = c.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; )
                u--;
            for (; 1 <= i && 0 <= u; i--,
            u--)
                if (l[i] !== o[u]) {
                    if (i !== 1 || u !== 1)
                        do
                            if (i--,
                            u--,
                            0 > u || l[i] !== o[u]) {
                                var s = `
` + l[i].replace(" at new ", " at ");
                                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)),
                                s
                            }
                        while (1 <= i && 0 <= u);
                    break
                }
        }
    } finally {
        Nl = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Pn(e) : ""
}
function Mc(e) {
    switch (e.tag) {
    case 5:
        return Pn(e.type);
    case 16:
        return Pn("Lazy");
    case 13:
        return Pn("Suspense");
    case 19:
        return Pn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = Pl(e.type, !1),
        e;
    case 11:
        return e = Pl(e.type.render, !1),
        e;
    case 1:
        return e = Pl(e.type, !0),
        e;
    default:
        return ""
    }
}
function eo(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Qt:
        return "Fragment";
    case Wt:
        return "Portal";
    case Jl:
        return "Profiler";
    case Zo:
        return "StrictMode";
    case ql:
        return "Suspense";
    case bl:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case ss:
            return (e.displayName || "Context") + ".Consumer";
        case us:
            return (e._context.displayName || "Context") + ".Provider";
        case Jo:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case qo:
            return t = e.displayName || null,
            t !== null ? t : eo(e.type) || "Memo";
        case at:
            t = e._payload,
            e = e._init;
            try {
                return eo(e(t))
            } catch {}
        }
    return null
}
function Ic(e) {
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
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
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
        return eo(t);
    case 8:
        return t === Zo ? "StrictMode" : "Mode";
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
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function Et(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function cs(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Rc(e) {
    var t = cs(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get
          , o = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(i) {
                r = "" + i,
                o.call(this, i)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(i) {
                r = "" + i
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function cr(e) {
    e._valueTracker || (e._valueTracker = Rc(e))
}
function fs(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = cs(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function Ar(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function to(e, t) {
    var n = t.checked;
    return Z({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function Hi(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = Et(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function ds(e, t) {
    t = t.checked,
    t != null && Go(e, "checked", t, !1)
}
function no(e, t) {
    ds(e, t);
    var n = Et(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? ro(e, t.type, n) : t.hasOwnProperty("defaultValue") && ro(e, t.type, Et(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Wi(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function ro(e, t, n) {
    (t !== "number" || Ar(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Tn = Array.isArray;
function nn(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var l = 0; l < n.length; l++)
            t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            l = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + Et(n),
        t = null,
        l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0,
                r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}
function lo(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(g(91));
    return Z({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Qi(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(g(92));
            if (Tn(n)) {
                if (1 < n.length)
                    throw Error(g(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: Et(n)
    }
}
function ps(e, t) {
    var n = Et(t.value)
      , r = Et(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function Ki(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function ms(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function oo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? ms(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var fr, hs = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (fr = fr || document.createElement("div"),
        fr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = fr.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Bn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Dn = {
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
}
  , Oc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Dn).forEach(function(e) {
    Oc.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Dn[t] = Dn[e]
    })
});
function vs(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Dn.hasOwnProperty(e) && Dn[e] ? ("" + t).trim() : t + "px"
}
function ys(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , l = vs(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, l) : e[n] = l
        }
}
var Ac = Z({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function io(e, t) {
    if (t) {
        if (Ac[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(g(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(g(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(g(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(g(62))
    }
}
function uo(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
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
        return !0
    }
}
var so = null;
function bo(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var ao = null
  , rn = null
  , ln = null;
function Yi(e) {
    if (e = ir(e)) {
        if (typeof ao != "function")
            throw Error(g(280));
        var t = e.stateNode;
        t && (t = dl(t),
        ao(e.stateNode, e.type, t))
    }
}
function gs(e) {
    rn ? ln ? ln.push(e) : ln = [e] : rn = e
}
function ws() {
    if (rn) {
        var e = rn
          , t = ln;
        if (ln = rn = null,
        Yi(e),
        t)
            for (e = 0; e < t.length; e++)
                Yi(t[e])
    }
}
function ks(e, t) {
    return e(t)
}
function Ss() {}
var Tl = !1;
function xs(e, t, n) {
    if (Tl)
        return e(t, n);
    Tl = !0;
    try {
        return ks(e, t, n)
    } finally {
        Tl = !1,
        (rn !== null || ln !== null) && (Ss(),
        ws())
    }
}
function Vn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = dl(n);
    if (r === null)
        return null;
    n = r[t];
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
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(g(231, t, typeof n));
    return n
}
var co = !1;
if (nt)
    try {
        var kn = {};
        Object.defineProperty(kn, "passive", {
            get: function() {
                co = !0
            }
        }),
        window.addEventListener("test", kn, kn),
        window.removeEventListener("test", kn, kn)
    } catch {
        co = !1
    }
function Fc(e, t, n, r, l, o, i, u, s) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (h) {
        this.onError(h)
    }
}
var jn = !1
  , Fr = null
  , $r = !1
  , fo = null
  , $c = {
    onError: function(e) {
        jn = !0,
        Fr = e
    }
};
function Uc(e, t, n, r, l, o, i, u, s) {
    jn = !1,
    Fr = null,
    Fc.apply($c, arguments)
}
function Bc(e, t, n, r, l, o, i, u, s) {
    if (Uc.apply(this, arguments),
    jn) {
        if (jn) {
            var c = Fr;
            jn = !1,
            Fr = null
        } else
            throw Error(g(198));
        $r || ($r = !0,
        fo = c)
    }
}
function Vt(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Es(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function Xi(e) {
    if (Vt(e) !== e)
        throw Error(g(188))
}
function Vc(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Vt(e),
        t === null)
            throw Error(g(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null)
            break;
        var o = l.alternate;
        if (o === null) {
            if (r = l.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n)
                    return Xi(l),
                    e;
                if (o === r)
                    return Xi(l),
                    t;
                o = o.sibling
            }
            throw Error(g(188))
        }
        if (n.return !== r.return)
            n = l,
            r = o;
        else {
            for (var i = !1, u = l.child; u; ) {
                if (u === n) {
                    i = !0,
                    n = l,
                    r = o;
                    break
                }
                if (u === r) {
                    i = !0,
                    r = l,
                    n = o;
                    break
                }
                u = u.sibling
            }
            if (!i) {
                for (u = o.child; u; ) {
                    if (u === n) {
                        i = !0,
                        n = o,
                        r = l;
                        break
                    }
                    if (u === r) {
                        i = !0,
                        r = o,
                        n = l;
                        break
                    }
                    u = u.sibling
                }
                if (!i)
                    throw Error(g(189))
            }
        }
        if (n.alternate !== r)
            throw Error(g(190))
    }
    if (n.tag !== 3)
        throw Error(g(188));
    return n.stateNode.current === n ? e : t
}
function Cs(e) {
    return e = Vc(e),
    e !== null ? _s(e) : null
}
function _s(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = _s(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Ns = Pe.unstable_scheduleCallback
  , Gi = Pe.unstable_cancelCallback
  , Hc = Pe.unstable_shouldYield
  , Wc = Pe.unstable_requestPaint
  , ee = Pe.unstable_now
  , Qc = Pe.unstable_getCurrentPriorityLevel
  , ei = Pe.unstable_ImmediatePriority
  , Ps = Pe.unstable_UserBlockingPriority
  , Ur = Pe.unstable_NormalPriority
  , Kc = Pe.unstable_LowPriority
  , Ts = Pe.unstable_IdlePriority
  , sl = null
  , Xe = null;
function Yc(e) {
    if (Xe && typeof Xe.onCommitFiberRoot == "function")
        try {
            Xe.onCommitFiberRoot(sl, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Ve = Math.clz32 ? Math.clz32 : Zc
  , Xc = Math.log
  , Gc = Math.LN2;
function Zc(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (Xc(e) / Gc | 0) | 0
}
var dr = 64
  , pr = 4194304;
function zn(e) {
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
        return e
    }
}
function Br(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , l = e.suspendedLanes
      , o = e.pingedLanes
      , i = n & 268435455;
    if (i !== 0) {
        var u = i & ~l;
        u !== 0 ? r = zn(u) : (o &= i,
        o !== 0 && (r = zn(o)))
    } else
        i = n & ~l,
        i !== 0 ? r = zn(i) : o !== 0 && (r = zn(o));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
    o = t & -t,
    l >= o || l === 16 && (o & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Ve(t),
            l = 1 << n,
            r |= e[n],
            t &= ~l;
    return r
}
function Jc(e, t) {
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
        return -1
    }
}
function qc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
        var i = 31 - Ve(o)
          , u = 1 << i
          , s = l[i];
        s === -1 ? (!(u & n) || u & r) && (l[i] = Jc(u, t)) : s <= t && (e.expiredLanes |= u),
        o &= ~u
    }
}
function po(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function zs() {
    var e = dr;
    return dr <<= 1,
    !(dr & 4194240) && (dr = 64),
    e
}
function zl(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function lr(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Ve(t),
    e[t] = n
}
function bc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - Ve(n)
          , o = 1 << l;
        t[l] = 0,
        r[l] = -1,
        e[l] = -1,
        n &= ~o
    }
}
function ti(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Ve(n)
          , l = 1 << r;
        l & t | e[r] & t && (e[r] |= t),
        n &= ~l
    }
}
var F = 0;
function Ls(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Ds, ni, js, Ms, Is, mo = !1, mr = [], ht = null, vt = null, yt = null, Hn = new Map, Wn = new Map, ft = [], ef = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Zi(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ht = null;
        break;
    case "dragenter":
    case "dragleave":
        vt = null;
        break;
    case "mouseover":
    case "mouseout":
        yt = null;
        break;
    case "pointerover":
    case "pointerout":
        Hn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Wn.delete(t.pointerId)
    }
}
function Sn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l]
    },
    t !== null && (t = ir(t),
    t !== null && ni(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e)
}
function tf(e, t, n, r, l) {
    switch (t) {
    case "focusin":
        return ht = Sn(ht, e, t, n, r, l),
        !0;
    case "dragenter":
        return vt = Sn(vt, e, t, n, r, l),
        !0;
    case "mouseover":
        return yt = Sn(yt, e, t, n, r, l),
        !0;
    case "pointerover":
        var o = l.pointerId;
        return Hn.set(o, Sn(Hn.get(o) || null, e, t, n, r, l)),
        !0;
    case "gotpointercapture":
        return o = l.pointerId,
        Wn.set(o, Sn(Wn.get(o) || null, e, t, n, r, l)),
        !0
    }
    return !1
}
function Rs(e) {
    var t = Dt(e.target);
    if (t !== null) {
        var n = Vt(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = Es(n),
                t !== null) {
                    e.blockedOn = t,
                    Is(e.priority, function() {
                        js(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Pr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ho(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            so = r,
            n.target.dispatchEvent(r),
            so = null
        } else
            return t = ir(n),
            t !== null && ni(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Ji(e, t, n) {
    Pr(e) && n.delete(t)
}
function nf() {
    mo = !1,
    ht !== null && Pr(ht) && (ht = null),
    vt !== null && Pr(vt) && (vt = null),
    yt !== null && Pr(yt) && (yt = null),
    Hn.forEach(Ji),
    Wn.forEach(Ji)
}
function xn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    mo || (mo = !0,
    Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority, nf)))
}
function Qn(e) {
    function t(l) {
        return xn(l, e)
    }
    if (0 < mr.length) {
        xn(mr[0], e);
        for (var n = 1; n < mr.length; n++) {
            var r = mr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ht !== null && xn(ht, e),
    vt !== null && xn(vt, e),
    yt !== null && xn(yt, e),
    Hn.forEach(t),
    Wn.forEach(t),
    n = 0; n < ft.length; n++)
        r = ft[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ft.length && (n = ft[0],
    n.blockedOn === null); )
        Rs(n),
        n.blockedOn === null && ft.shift()
}
var on = it.ReactCurrentBatchConfig
  , Vr = !0;
function rf(e, t, n, r) {
    var l = F
      , o = on.transition;
    on.transition = null;
    try {
        F = 1,
        ri(e, t, n, r)
    } finally {
        F = l,
        on.transition = o
    }
}
function lf(e, t, n, r) {
    var l = F
      , o = on.transition;
    on.transition = null;
    try {
        F = 4,
        ri(e, t, n, r)
    } finally {
        F = l,
        on.transition = o
    }
}
function ri(e, t, n, r) {
    if (Vr) {
        var l = ho(e, t, n, r);
        if (l === null)
            $l(e, t, r, Hr, n),
            Zi(e, r);
        else if (tf(l, e, t, n, r))
            r.stopPropagation();
        else if (Zi(e, r),
        t & 4 && -1 < ef.indexOf(e)) {
            for (; l !== null; ) {
                var o = ir(l);
                if (o !== null && Ds(o),
                o = ho(e, t, n, r),
                o === null && $l(e, t, r, Hr, n),
                o === l)
                    break;
                l = o
            }
            l !== null && r.stopPropagation()
        } else
            $l(e, t, r, null, n)
    }
}
var Hr = null;
function ho(e, t, n, r) {
    if (Hr = null,
    e = bo(r),
    e = Dt(e),
    e !== null)
        if (t = Vt(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = Es(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return Hr = e,
    null
}
function Os(e) {
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
        switch (Qc()) {
        case ei:
            return 1;
        case Ps:
            return 4;
        case Ur:
        case Kc:
            return 16;
        case Ts:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var pt = null
  , li = null
  , Tr = null;
function As() {
    if (Tr)
        return Tr;
    var e, t = li, n = t.length, r, l = "value"in pt ? pt.value : pt.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++)
        ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++)
        ;
    return Tr = l.slice(e, 1 < r ? 1 - r : void 0)
}
function zr(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function hr() {
    return !0
}
function qi() {
    return !1
}
function ze(e) {
    function t(n, r, l, o, i) {
        this._reactName = n,
        this._targetInst = l,
        this.type = r,
        this.nativeEvent = o,
        this.target = i,
        this.currentTarget = null;
        for (var u in e)
            e.hasOwnProperty(u) && (n = e[u],
            this[u] = n ? n(o) : o[u]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? hr : qi,
        this.isPropagationStopped = qi,
        this
    }
    return Z(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = hr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = hr)
        },
        persist: function() {},
        isPersistent: hr
    }),
    t
}
var yn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, oi = ze(yn), or = Z({}, yn, {
    view: 0,
    detail: 0
}), of = ze(or), Ll, Dl, En, al = Z({}, or, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ii,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== En && (En && e.type === "mousemove" ? (Ll = e.screenX - En.screenX,
        Dl = e.screenY - En.screenY) : Dl = Ll = 0,
        En = e),
        Ll)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : Dl
    }
}), bi = ze(al), uf = Z({}, al, {
    dataTransfer: 0
}), sf = ze(uf), af = Z({}, or, {
    relatedTarget: 0
}), jl = ze(af), cf = Z({}, yn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), ff = ze(cf), df = Z({}, yn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), pf = ze(df), mf = Z({}, yn, {
    data: 0
}), eu = ze(mf), hf = {
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
}, vf = {
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
}, yf = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function gf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = yf[e]) ? !!t[e] : !1
}
function ii() {
    return gf
}
var wf = Z({}, or, {
    key: function(e) {
        if (e.key) {
            var t = hf[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = zr(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? vf[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ii,
    charCode: function(e) {
        return e.type === "keypress" ? zr(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? zr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , kf = ze(wf)
  , Sf = Z({}, al, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , tu = ze(Sf)
  , xf = Z({}, or, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ii
})
  , Ef = ze(xf)
  , Cf = Z({}, yn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , _f = ze(Cf)
  , Nf = Z({}, al, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Pf = ze(Nf)
  , Tf = [9, 13, 27, 32]
  , ui = nt && "CompositionEvent"in window
  , Mn = null;
nt && "documentMode"in document && (Mn = document.documentMode);
var zf = nt && "TextEvent"in window && !Mn
  , Fs = nt && (!ui || Mn && 8 < Mn && 11 >= Mn)
  , nu = String.fromCharCode(32)
  , ru = !1;
function $s(e, t) {
    switch (e) {
    case "keyup":
        return Tf.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function Us(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Kt = !1;
function Lf(e, t) {
    switch (e) {
    case "compositionend":
        return Us(t);
    case "keypress":
        return t.which !== 32 ? null : (ru = !0,
        nu);
    case "textInput":
        return e = t.data,
        e === nu && ru ? null : e;
    default:
        return null
    }
}
function Df(e, t) {
    if (Kt)
        return e === "compositionend" || !ui && $s(e, t) ? (e = As(),
        Tr = li = pt = null,
        Kt = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return Fs && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var jf = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function lu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!jf[e.type] : t === "textarea"
}
function Bs(e, t, n, r) {
    gs(r),
    t = Wr(t, "onChange"),
    0 < t.length && (n = new oi("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var In = null
  , Kn = null;
function Mf(e) {
    qs(e, 0)
}
function cl(e) {
    var t = Gt(e);
    if (fs(t))
        return e
}
function If(e, t) {
    if (e === "change")
        return t
}
var Vs = !1;
if (nt) {
    var Ml;
    if (nt) {
        var Il = "oninput"in document;
        if (!Il) {
            var ou = document.createElement("div");
            ou.setAttribute("oninput", "return;"),
            Il = typeof ou.oninput == "function"
        }
        Ml = Il
    } else
        Ml = !1;
    Vs = Ml && (!document.documentMode || 9 < document.documentMode)
}
function iu() {
    In && (In.detachEvent("onpropertychange", Hs),
    Kn = In = null)
}
function Hs(e) {
    if (e.propertyName === "value" && cl(Kn)) {
        var t = [];
        Bs(t, Kn, e, bo(e)),
        xs(Mf, t)
    }
}
function Rf(e, t, n) {
    e === "focusin" ? (iu(),
    In = t,
    Kn = n,
    In.attachEvent("onpropertychange", Hs)) : e === "focusout" && iu()
}
function Of(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return cl(Kn)
}
function Af(e, t) {
    if (e === "click")
        return cl(t)
}
function Ff(e, t) {
    if (e === "input" || e === "change")
        return cl(t)
}
function $f(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var We = typeof Object.is == "function" ? Object.is : $f;
function Yn(e, t) {
    if (We(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!Zl.call(t, l) || !We(e[l], t[l]))
            return !1
    }
    return !0
}
function uu(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function su(e, t) {
    var n = uu(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = uu(n)
    }
}
function Ws(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ws(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function Qs() {
    for (var e = window, t = Ar(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Ar(e.document)
    }
    return t
}
function si(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Uf(e) {
    var t = Qs()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Ws(n.ownerDocument.documentElement, n)) {
        if (r !== null && si(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length
                  , o = Math.min(r.start, l);
                r = r.end === void 0 ? o : Math.min(r.end, l),
                !e.extend && o > r && (l = r,
                r = o,
                o = l),
                l = su(n, o);
                var i = su(n, r);
                l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(),
                t.setStart(l.node, l.offset),
                e.removeAllRanges(),
                o > r ? (e.addRange(t),
                e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var Bf = nt && "documentMode"in document && 11 >= document.documentMode
  , Yt = null
  , vo = null
  , Rn = null
  , yo = !1;
function au(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    yo || Yt == null || Yt !== Ar(r) || (r = Yt,
    "selectionStart"in r && si(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Rn && Yn(Rn, r) || (Rn = r,
    r = Wr(vo, "onSelect"),
    0 < r.length && (t = new oi("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Yt)))
}
function vr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Xt = {
    animationend: vr("Animation", "AnimationEnd"),
    animationiteration: vr("Animation", "AnimationIteration"),
    animationstart: vr("Animation", "AnimationStart"),
    transitionend: vr("Transition", "TransitionEnd")
}
  , Rl = {}
  , Ks = {};
nt && (Ks = document.createElement("div").style,
"AnimationEvent"in window || (delete Xt.animationend.animation,
delete Xt.animationiteration.animation,
delete Xt.animationstart.animation),
"TransitionEvent"in window || delete Xt.transitionend.transition);
function fl(e) {
    if (Rl[e])
        return Rl[e];
    if (!Xt[e])
        return e;
    var t = Xt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Ks)
            return Rl[e] = t[n];
    return e
}
var Ys = fl("animationend")
  , Xs = fl("animationiteration")
  , Gs = fl("animationstart")
  , Zs = fl("transitionend")
  , Js = new Map
  , cu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function _t(e, t) {
    Js.set(e, t),
    Bt(t, [e])
}
for (var Ol = 0; Ol < cu.length; Ol++) {
    var Al = cu[Ol]
      , Vf = Al.toLowerCase()
      , Hf = Al[0].toUpperCase() + Al.slice(1);
    _t(Vf, "on" + Hf)
}
_t(Ys, "onAnimationEnd");
_t(Xs, "onAnimationIteration");
_t(Gs, "onAnimationStart");
_t("dblclick", "onDoubleClick");
_t("focusin", "onFocus");
_t("focusout", "onBlur");
_t(Zs, "onTransitionEnd");
an("onMouseEnter", ["mouseout", "mouseover"]);
an("onMouseLeave", ["mouseout", "mouseover"]);
an("onPointerEnter", ["pointerout", "pointerover"]);
an("onPointerLeave", ["pointerout", "pointerover"]);
Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Wf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function fu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Bc(r, t, void 0, e),
    e.currentTarget = null
}
function qs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var u = r[i]
                      , s = u.instance
                      , c = u.currentTarget;
                    if (u = u.listener,
                    s !== o && l.isPropagationStopped())
                        break e;
                    fu(l, u, c),
                    o = s
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (u = r[i],
                    s = u.instance,
                    c = u.currentTarget,
                    u = u.listener,
                    s !== o && l.isPropagationStopped())
                        break e;
                    fu(l, u, c),
                    o = s
                }
        }
    }
    if ($r)
        throw e = fo,
        $r = !1,
        fo = null,
        e
}
function H(e, t) {
    var n = t[xo];
    n === void 0 && (n = t[xo] = new Set);
    var r = e + "__bubble";
    n.has(r) || (bs(t, e, 2, !1),
    n.add(r))
}
function Fl(e, t, n) {
    var r = 0;
    t && (r |= 4),
    bs(n, e, r, t)
}
var yr = "_reactListening" + Math.random().toString(36).slice(2);
function Xn(e) {
    if (!e[yr]) {
        e[yr] = !0,
        is.forEach(function(n) {
            n !== "selectionchange" && (Wf.has(n) || Fl(n, !1, e),
            Fl(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[yr] || (t[yr] = !0,
        Fl("selectionchange", !1, t))
    }
}
function bs(e, t, n, r) {
    switch (Os(t)) {
    case 1:
        var l = rf;
        break;
    case 4:
        l = lf;
        break;
    default:
        l = ri
    }
    n = l.bind(null, t, n, e),
    l = void 0,
    !co || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
    r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}
function $l(e, t, n, r, l) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || u.nodeType === 8 && u.parentNode === l)
                    break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var s = i.tag;
                        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo,
                        s === l || s.nodeType === 8 && s.parentNode === l))
                            return;
                        i = i.return
                    }
                for (; u !== null; ) {
                    if (i = Dt(u),
                    i === null)
                        return;
                    if (s = i.tag,
                    s === 5 || s === 6) {
                        r = o = i;
                        continue e
                    }
                    u = u.parentNode
                }
            }
            r = r.return
        }
    xs(function() {
        var c = o
          , h = bo(n)
          , m = [];
        e: {
            var p = Js.get(e);
            if (p !== void 0) {
                var w = oi
                  , y = e;
                switch (e) {
                case "keypress":
                    if (zr(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    w = kf;
                    break;
                case "focusin":
                    y = "focus",
                    w = jl;
                    break;
                case "focusout":
                    y = "blur",
                    w = jl;
                    break;
                case "beforeblur":
                case "afterblur":
                    w = jl;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    w = bi;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    w = sf;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    w = Ef;
                    break;
                case Ys:
                case Xs:
                case Gs:
                    w = ff;
                    break;
                case Zs:
                    w = _f;
                    break;
                case "scroll":
                    w = of;
                    break;
                case "wheel":
                    w = Pf;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    w = pf;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    w = tu
                }
                var k = (t & 4) !== 0
                  , O = !k && e === "scroll"
                  , f = k ? p !== null ? p + "Capture" : null : p;
                k = [];
                for (var a = c, d; a !== null; ) {
                    d = a;
                    var v = d.stateNode;
                    if (d.tag === 5 && v !== null && (d = v,
                    f !== null && (v = Vn(a, f),
                    v != null && k.push(Gn(a, v, d)))),
                    O)
                        break;
                    a = a.return
                }
                0 < k.length && (p = new w(p,y,null,n,h),
                m.push({
                    event: p,
                    listeners: k
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (p = e === "mouseover" || e === "pointerover",
                w = e === "mouseout" || e === "pointerout",
                p && n !== so && (y = n.relatedTarget || n.fromElement) && (Dt(y) || y[rt]))
                    break e;
                if ((w || p) && (p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window,
                w ? (y = n.relatedTarget || n.toElement,
                w = c,
                y = y ? Dt(y) : null,
                y !== null && (O = Vt(y),
                y !== O || y.tag !== 5 && y.tag !== 6) && (y = null)) : (w = null,
                y = c),
                w !== y)) {
                    if (k = bi,
                    v = "onMouseLeave",
                    f = "onMouseEnter",
                    a = "mouse",
                    (e === "pointerout" || e === "pointerover") && (k = tu,
                    v = "onPointerLeave",
                    f = "onPointerEnter",
                    a = "pointer"),
                    O = w == null ? p : Gt(w),
                    d = y == null ? p : Gt(y),
                    p = new k(v,a + "leave",w,n,h),
                    p.target = O,
                    p.relatedTarget = d,
                    v = null,
                    Dt(h) === c && (k = new k(f,a + "enter",y,n,h),
                    k.target = d,
                    k.relatedTarget = O,
                    v = k),
                    O = v,
                    w && y)
                        t: {
                            for (k = w,
                            f = y,
                            a = 0,
                            d = k; d; d = Ht(d))
                                a++;
                            for (d = 0,
                            v = f; v; v = Ht(v))
                                d++;
                            for (; 0 < a - d; )
                                k = Ht(k),
                                a--;
                            for (; 0 < d - a; )
                                f = Ht(f),
                                d--;
                            for (; a--; ) {
                                if (k === f || f !== null && k === f.alternate)
                                    break t;
                                k = Ht(k),
                                f = Ht(f)
                            }
                            k = null
                        }
                    else
                        k = null;
                    w !== null && du(m, p, w, k, !1),
                    y !== null && O !== null && du(m, O, y, k, !0)
                }
            }
            e: {
                if (p = c ? Gt(c) : window,
                w = p.nodeName && p.nodeName.toLowerCase(),
                w === "select" || w === "input" && p.type === "file")
                    var x = If;
                else if (lu(p))
                    if (Vs)
                        x = Ff;
                    else {
                        x = Of;
                        var _ = Rf
                    }
                else
                    (w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (x = Af);
                if (x && (x = x(e, c))) {
                    Bs(m, x, n, h);
                    break e
                }
                _ && _(e, p, c),
                e === "focusout" && (_ = p._wrapperState) && _.controlled && p.type === "number" && ro(p, "number", p.value)
            }
            switch (_ = c ? Gt(c) : window,
            e) {
            case "focusin":
                (lu(_) || _.contentEditable === "true") && (Yt = _,
                vo = c,
                Rn = null);
                break;
            case "focusout":
                Rn = vo = Yt = null;
                break;
            case "mousedown":
                yo = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                yo = !1,
                au(m, n, h);
                break;
            case "selectionchange":
                if (Bf)
                    break;
            case "keydown":
            case "keyup":
                au(m, n, h)
            }
            var C;
            if (ui)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var P = "onCompositionStart";
                        break e;
                    case "compositionend":
                        P = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        P = "onCompositionUpdate";
                        break e
                    }
                    P = void 0
                }
            else
                Kt ? $s(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
            P && (Fs && n.locale !== "ko" && (Kt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Kt && (C = As()) : (pt = h,
            li = "value"in pt ? pt.value : pt.textContent,
            Kt = !0)),
            _ = Wr(c, P),
            0 < _.length && (P = new eu(P,e,null,n,h),
            m.push({
                event: P,
                listeners: _
            }),
            C ? P.data = C : (C = Us(n),
            C !== null && (P.data = C)))),
            (C = zf ? Lf(e, n) : Df(e, n)) && (c = Wr(c, "onBeforeInput"),
            0 < c.length && (h = new eu("onBeforeInput","beforeinput",null,n,h),
            m.push({
                event: h,
                listeners: c
            }),
            h.data = C))
        }
        qs(m, t)
    })
}
function Gn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function Wr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e
          , o = l.stateNode;
        l.tag === 5 && o !== null && (l = o,
        o = Vn(e, n),
        o != null && r.unshift(Gn(e, o, l)),
        o = Vn(e, t),
        o != null && r.push(Gn(e, o, l))),
        e = e.return
    }
    return r
}
function Ht(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function du(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
        var u = n
          , s = u.alternate
          , c = u.stateNode;
        if (s !== null && s === r)
            break;
        u.tag === 5 && c !== null && (u = c,
        l ? (s = Vn(n, o),
        s != null && i.unshift(Gn(n, s, u))) : l || (s = Vn(n, o),
        s != null && i.push(Gn(n, s, u)))),
        n = n.return
    }
    i.length !== 0 && e.push({
        event: t,
        listeners: i
    })
}
var Qf = /\r\n?/g
  , Kf = /\u0000|\uFFFD/g;
function pu(e) {
    return (typeof e == "string" ? e : "" + e).replace(Qf, `
`).replace(Kf, "")
}
function gr(e, t, n) {
    if (t = pu(t),
    pu(e) !== t && n)
        throw Error(g(425))
}
function Qr() {}
var go = null
  , wo = null;
function ko(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var So = typeof setTimeout == "function" ? setTimeout : void 0
  , Yf = typeof clearTimeout == "function" ? clearTimeout : void 0
  , mu = typeof Promise == "function" ? Promise : void 0
  , Xf = typeof queueMicrotask == "function" ? queueMicrotask : typeof mu < "u" ? function(e) {
    return mu.resolve(null).then(e).catch(Gf)
}
: So;
function Gf(e) {
    setTimeout(function() {
        throw e
    })
}
function Ul(e, t) {
    var n = t
      , r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n),
        l && l.nodeType === 8)
            if (n = l.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(l),
                    Qn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Qn(t)
}
function gt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function hu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var gn = Math.random().toString(36).slice(2)
  , Ye = "__reactFiber$" + gn
  , Zn = "__reactProps$" + gn
  , rt = "__reactContainer$" + gn
  , xo = "__reactEvents$" + gn
  , Zf = "__reactListeners$" + gn
  , Jf = "__reactHandles$" + gn;
function Dt(e) {
    var t = e[Ye];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[rt] || n[Ye]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = hu(e); e !== null; ) {
                    if (n = e[Ye])
                        return n;
                    e = hu(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function ir(e) {
    return e = e[Ye] || e[rt],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Gt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(g(33))
}
function dl(e) {
    return e[Zn] || null
}
var Eo = []
  , Zt = -1;
function Nt(e) {
    return {
        current: e
    }
}
function W(e) {
    0 > Zt || (e.current = Eo[Zt],
    Eo[Zt] = null,
    Zt--)
}
function U(e, t) {
    Zt++,
    Eo[Zt] = e.current,
    e.current = t
}
var Ct = {}
  , me = Nt(Ct)
  , Se = Nt(!1)
  , Ot = Ct;
function cn(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return Ct;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n)
        l[o] = t[o];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = l),
    l
}
function xe(e) {
    return e = e.childContextTypes,
    e != null
}
function Kr() {
    W(Se),
    W(me)
}
function vu(e, t, n) {
    if (me.current !== Ct)
        throw Error(g(168));
    U(me, t),
    U(Se, n)
}
function ea(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t))
            throw Error(g(108, Ic(e) || "Unknown", l));
    return Z({}, n, r)
}
function Yr(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ct,
    Ot = me.current,
    U(me, e),
    U(Se, Se.current),
    !0
}
function yu(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(g(169));
    n ? (e = ea(e, t, Ot),
    r.__reactInternalMemoizedMergedChildContext = e,
    W(Se),
    W(me),
    U(me, e)) : W(Se),
    U(Se, n)
}
var qe = null
  , pl = !1
  , Bl = !1;
function ta(e) {
    qe === null ? qe = [e] : qe.push(e)
}
function qf(e) {
    pl = !0,
    ta(e)
}
function Pt() {
    if (!Bl && qe !== null) {
        Bl = !0;
        var e = 0
          , t = F;
        try {
            var n = qe;
            for (F = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            qe = null,
            pl = !1
        } catch (l) {
            throw qe !== null && (qe = qe.slice(e + 1)),
            Ns(ei, Pt),
            l
        } finally {
            F = t,
            Bl = !1
        }
    }
    return null
}
var Jt = []
  , qt = 0
  , Xr = null
  , Gr = 0
  , Le = []
  , De = 0
  , At = null
  , be = 1
  , et = "";
function zt(e, t) {
    Jt[qt++] = Gr,
    Jt[qt++] = Xr,
    Xr = e,
    Gr = t
}
function na(e, t, n) {
    Le[De++] = be,
    Le[De++] = et,
    Le[De++] = At,
    At = e;
    var r = be;
    e = et;
    var l = 32 - Ve(r) - 1;
    r &= ~(1 << l),
    n += 1;
    var o = 32 - Ve(t) + l;
    if (30 < o) {
        var i = l - l % 5;
        o = (r & (1 << i) - 1).toString(32),
        r >>= i,
        l -= i,
        be = 1 << 32 - Ve(t) + l | n << l | r,
        et = o + e
    } else
        be = 1 << o | n << l | r,
        et = e
}
function ai(e) {
    e.return !== null && (zt(e, 1),
    na(e, 1, 0))
}
function ci(e) {
    for (; e === Xr; )
        Xr = Jt[--qt],
        Jt[qt] = null,
        Gr = Jt[--qt],
        Jt[qt] = null;
    for (; e === At; )
        At = Le[--De],
        Le[De] = null,
        et = Le[--De],
        Le[De] = null,
        be = Le[--De],
        Le[De] = null
}
var Ne = null
  , _e = null
  , Q = !1
  , Be = null;
function ra(e, t) {
    var n = je(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function gu(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        Ne = e,
        _e = gt(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        Ne = e,
        _e = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = At !== null ? {
            id: be,
            overflow: et
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = je(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        Ne = e,
        _e = null,
        !0) : !1;
    default:
        return !1
    }
}
function Co(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function _o(e) {
    if (Q) {
        var t = _e;
        if (t) {
            var n = t;
            if (!gu(e, t)) {
                if (Co(e))
                    throw Error(g(418));
                t = gt(n.nextSibling);
                var r = Ne;
                t && gu(e, t) ? ra(r, n) : (e.flags = e.flags & -4097 | 2,
                Q = !1,
                Ne = e)
            }
        } else {
            if (Co(e))
                throw Error(g(418));
            e.flags = e.flags & -4097 | 2,
            Q = !1,
            Ne = e
        }
    }
}
function wu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    Ne = e
}
function wr(e) {
    if (e !== Ne)
        return !1;
    if (!Q)
        return wu(e),
        Q = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !ko(e.type, e.memoizedProps)),
    t && (t = _e)) {
        if (Co(e))
            throw la(),
            Error(g(418));
        for (; t; )
            ra(e, t),
            t = gt(t.nextSibling)
    }
    if (wu(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(g(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            _e = gt(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            _e = null
        }
    } else
        _e = Ne ? gt(e.stateNode.nextSibling) : null;
    return !0
}
function la() {
    for (var e = _e; e; )
        e = gt(e.nextSibling)
}
function fn() {
    _e = Ne = null,
    Q = !1
}
function fi(e) {
    Be === null ? Be = [e] : Be.push(e)
}
var bf = it.ReactCurrentBatchConfig;
function Cn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(g(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(g(147, e));
            var l = r
              , o = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
                var u = l.refs;
                i === null ? delete u[o] : u[o] = i
            }
            ,
            t._stringRef = o,
            t)
        }
        if (typeof e != "string")
            throw Error(g(284));
        if (!n._owner)
            throw Error(g(290, e))
    }
    return e
}
function kr(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(g(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function ku(e) {
    var t = e._init;
    return t(e._payload)
}
function oa(e) {
    function t(f, a) {
        if (e) {
            var d = f.deletions;
            d === null ? (f.deletions = [a],
            f.flags |= 16) : d.push(a)
        }
    }
    function n(f, a) {
        if (!e)
            return null;
        for (; a !== null; )
            t(f, a),
            a = a.sibling;
        return null
    }
    function r(f, a) {
        for (f = new Map; a !== null; )
            a.key !== null ? f.set(a.key, a) : f.set(a.index, a),
            a = a.sibling;
        return f
    }
    function l(f, a) {
        return f = xt(f, a),
        f.index = 0,
        f.sibling = null,
        f
    }
    function o(f, a, d) {
        return f.index = d,
        e ? (d = f.alternate,
        d !== null ? (d = d.index,
        d < a ? (f.flags |= 2,
        a) : d) : (f.flags |= 2,
        a)) : (f.flags |= 1048576,
        a)
    }
    function i(f) {
        return e && f.alternate === null && (f.flags |= 2),
        f
    }
    function u(f, a, d, v) {
        return a === null || a.tag !== 6 ? (a = Xl(d, f.mode, v),
        a.return = f,
        a) : (a = l(a, d),
        a.return = f,
        a)
    }
    function s(f, a, d, v) {
        var x = d.type;
        return x === Qt ? h(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === x || typeof x == "object" && x !== null && x.$$typeof === at && ku(x) === a.type) ? (v = l(a, d.props),
        v.ref = Cn(f, a, d),
        v.return = f,
        v) : (v = Or(d.type, d.key, d.props, null, f.mode, v),
        v.ref = Cn(f, a, d),
        v.return = f,
        v)
    }
    function c(f, a, d, v) {
        return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Gl(d, f.mode, v),
        a.return = f,
        a) : (a = l(a, d.children || []),
        a.return = f,
        a)
    }
    function h(f, a, d, v, x) {
        return a === null || a.tag !== 7 ? (a = Rt(d, f.mode, v, x),
        a.return = f,
        a) : (a = l(a, d),
        a.return = f,
        a)
    }
    function m(f, a, d) {
        if (typeof a == "string" && a !== "" || typeof a == "number")
            return a = Xl("" + a, f.mode, d),
            a.return = f,
            a;
        if (typeof a == "object" && a !== null) {
            switch (a.$$typeof) {
            case ar:
                return d = Or(a.type, a.key, a.props, null, f.mode, d),
                d.ref = Cn(f, null, a),
                d.return = f,
                d;
            case Wt:
                return a = Gl(a, f.mode, d),
                a.return = f,
                a;
            case at:
                var v = a._init;
                return m(f, v(a._payload), d)
            }
            if (Tn(a) || wn(a))
                return a = Rt(a, f.mode, d, null),
                a.return = f,
                a;
            kr(f, a)
        }
        return null
    }
    function p(f, a, d, v) {
        var x = a !== null ? a.key : null;
        if (typeof d == "string" && d !== "" || typeof d == "number")
            return x !== null ? null : u(f, a, "" + d, v);
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
            case ar:
                return d.key === x ? s(f, a, d, v) : null;
            case Wt:
                return d.key === x ? c(f, a, d, v) : null;
            case at:
                return x = d._init,
                p(f, a, x(d._payload), v)
            }
            if (Tn(d) || wn(d))
                return x !== null ? null : h(f, a, d, v, null);
            kr(f, d)
        }
        return null
    }
    function w(f, a, d, v, x) {
        if (typeof v == "string" && v !== "" || typeof v == "number")
            return f = f.get(d) || null,
            u(a, f, "" + v, x);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
            case ar:
                return f = f.get(v.key === null ? d : v.key) || null,
                s(a, f, v, x);
            case Wt:
                return f = f.get(v.key === null ? d : v.key) || null,
                c(a, f, v, x);
            case at:
                var _ = v._init;
                return w(f, a, d, _(v._payload), x)
            }
            if (Tn(v) || wn(v))
                return f = f.get(d) || null,
                h(a, f, v, x, null);
            kr(a, v)
        }
        return null
    }
    function y(f, a, d, v) {
        for (var x = null, _ = null, C = a, P = a = 0, K = null; C !== null && P < d.length; P++) {
            C.index > P ? (K = C,
            C = null) : K = C.sibling;
            var N = p(f, C, d[P], v);
            if (N === null) {
                C === null && (C = K);
                break
            }
            e && C && N.alternate === null && t(f, C),
            a = o(N, a, P),
            _ === null ? x = N : _.sibling = N,
            _ = N,
            C = K
        }
        if (P === d.length)
            return n(f, C),
            Q && zt(f, P),
            x;
        if (C === null) {
            for (; P < d.length; P++)
                C = m(f, d[P], v),
                C !== null && (a = o(C, a, P),
                _ === null ? x = C : _.sibling = C,
                _ = C);
            return Q && zt(f, P),
            x
        }
        for (C = r(f, C); P < d.length; P++)
            K = w(C, f, P, d[P], v),
            K !== null && (e && K.alternate !== null && C.delete(K.key === null ? P : K.key),
            a = o(K, a, P),
            _ === null ? x = K : _.sibling = K,
            _ = K);
        return e && C.forEach(function(A) {
            return t(f, A)
        }),
        Q && zt(f, P),
        x
    }
    function k(f, a, d, v) {
        var x = wn(d);
        if (typeof x != "function")
            throw Error(g(150));
        if (d = x.call(d),
        d == null)
            throw Error(g(151));
        for (var _ = x = null, C = a, P = a = 0, K = null, N = d.next(); C !== null && !N.done; P++,
        N = d.next()) {
            C.index > P ? (K = C,
            C = null) : K = C.sibling;
            var A = p(f, C, N.value, v);
            if (A === null) {
                C === null && (C = K);
                break
            }
            e && C && A.alternate === null && t(f, C),
            a = o(A, a, P),
            _ === null ? x = A : _.sibling = A,
            _ = A,
            C = K
        }
        if (N.done)
            return n(f, C),
            Q && zt(f, P),
            x;
        if (C === null) {
            for (; !N.done; P++,
            N = d.next())
                N = m(f, N.value, v),
                N !== null && (a = o(N, a, P),
                _ === null ? x = N : _.sibling = N,
                _ = N);
            return Q && zt(f, P),
            x
        }
        for (C = r(f, C); !N.done; P++,
        N = d.next())
            N = w(C, f, P, N.value, v),
            N !== null && (e && N.alternate !== null && C.delete(N.key === null ? P : N.key),
            a = o(N, a, P),
            _ === null ? x = N : _.sibling = N,
            _ = N);
        return e && C.forEach(function(Y) {
            return t(f, Y)
        }),
        Q && zt(f, P),
        x
    }
    function O(f, a, d, v) {
        if (typeof d == "object" && d !== null && d.type === Qt && d.key === null && (d = d.props.children),
        typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
            case ar:
                e: {
                    for (var x = d.key, _ = a; _ !== null; ) {
                        if (_.key === x) {
                            if (x = d.type,
                            x === Qt) {
                                if (_.tag === 7) {
                                    n(f, _.sibling),
                                    a = l(_, d.props.children),
                                    a.return = f,
                                    f = a;
                                    break e
                                }
                            } else if (_.elementType === x || typeof x == "object" && x !== null && x.$$typeof === at && ku(x) === _.type) {
                                n(f, _.sibling),
                                a = l(_, d.props),
                                a.ref = Cn(f, _, d),
                                a.return = f,
                                f = a;
                                break e
                            }
                            n(f, _);
                            break
                        } else
                            t(f, _);
                        _ = _.sibling
                    }
                    d.type === Qt ? (a = Rt(d.props.children, f.mode, v, d.key),
                    a.return = f,
                    f = a) : (v = Or(d.type, d.key, d.props, null, f.mode, v),
                    v.ref = Cn(f, a, d),
                    v.return = f,
                    f = v)
                }
                return i(f);
            case Wt:
                e: {
                    for (_ = d.key; a !== null; ) {
                        if (a.key === _)
                            if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                                n(f, a.sibling),
                                a = l(a, d.children || []),
                                a.return = f,
                                f = a;
                                break e
                            } else {
                                n(f, a);
                                break
                            }
                        else
                            t(f, a);
                        a = a.sibling
                    }
                    a = Gl(d, f.mode, v),
                    a.return = f,
                    f = a
                }
                return i(f);
            case at:
                return _ = d._init,
                O(f, a, _(d._payload), v)
            }
            if (Tn(d))
                return y(f, a, d, v);
            if (wn(d))
                return k(f, a, d, v);
            kr(f, d)
        }
        return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d,
        a !== null && a.tag === 6 ? (n(f, a.sibling),
        a = l(a, d),
        a.return = f,
        f = a) : (n(f, a),
        a = Xl(d, f.mode, v),
        a.return = f,
        f = a),
        i(f)) : n(f, a)
    }
    return O
}
var dn = oa(!0)
  , ia = oa(!1)
  , Zr = Nt(null)
  , Jr = null
  , bt = null
  , di = null;
function pi() {
    di = bt = Jr = null
}
function mi(e) {
    var t = Zr.current;
    W(Zr),
    e._currentValue = t
}
function No(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function un(e, t) {
    Jr = e,
    di = bt = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (ke = !0),
    e.firstContext = null)
}
function Ie(e) {
    var t = e._currentValue;
    if (di !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        bt === null) {
            if (Jr === null)
                throw Error(g(308));
            bt = e,
            Jr.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            bt = bt.next = e;
    return t
}
var jt = null;
function hi(e) {
    jt === null ? jt = [e] : jt.push(e)
}
function ua(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n,
    hi(t)) : (n.next = l.next,
    l.next = n),
    t.interleaved = n,
    lt(e, r)
}
function lt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var ct = !1;
function vi(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function sa(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function tt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function wt(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    R & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        r.pending = t,
        lt(e, n)
    }
    return l = r.interleaved,
    l === null ? (t.next = t,
    hi(r)) : (t.next = l.next,
    l.next = t),
    r.interleaved = t,
    lt(e, n)
}
function Lr(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        ti(e, n)
    }
}
function Su(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var l = null
          , o = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                o === null ? l = o = i : o = o.next = i,
                n = n.next
            } while (n !== null);
            o === null ? l = o = t : o = o.next = t
        } else
            l = o = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function qr(e, t, n, r) {
    var l = e.updateQueue;
    ct = !1;
    var o = l.firstBaseUpdate
      , i = l.lastBaseUpdate
      , u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var s = u
          , c = s.next;
        s.next = null,
        i === null ? o = c : i.next = c,
        i = s;
        var h = e.alternate;
        h !== null && (h = h.updateQueue,
        u = h.lastBaseUpdate,
        u !== i && (u === null ? h.firstBaseUpdate = c : u.next = c,
        h.lastBaseUpdate = s))
    }
    if (o !== null) {
        var m = l.baseState;
        i = 0,
        h = c = s = null,
        u = o;
        do {
            var p = u.lane
              , w = u.eventTime;
            if ((r & p) === p) {
                h !== null && (h = h.next = {
                    eventTime: w,
                    lane: 0,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                });
                e: {
                    var y = e
                      , k = u;
                    switch (p = t,
                    w = n,
                    k.tag) {
                    case 1:
                        if (y = k.payload,
                        typeof y == "function") {
                            m = y.call(w, m, p);
                            break e
                        }
                        m = y;
                        break e;
                    case 3:
                        y.flags = y.flags & -65537 | 128;
                    case 0:
                        if (y = k.payload,
                        p = typeof y == "function" ? y.call(w, m, p) : y,
                        p == null)
                            break e;
                        m = Z({}, m, p);
                        break e;
                    case 2:
                        ct = !0
                    }
                }
                u.callback !== null && u.lane !== 0 && (e.flags |= 64,
                p = l.effects,
                p === null ? l.effects = [u] : p.push(u))
            } else
                w = {
                    eventTime: w,
                    lane: p,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                },
                h === null ? (c = h = w,
                s = m) : h = h.next = w,
                i |= p;
            if (u = u.next,
            u === null) {
                if (u = l.shared.pending,
                u === null)
                    break;
                p = u,
                u = p.next,
                p.next = null,
                l.lastBaseUpdate = p,
                l.shared.pending = null
            }
        } while (1);
        if (h === null && (s = m),
        l.baseState = s,
        l.firstBaseUpdate = c,
        l.lastBaseUpdate = h,
        t = l.shared.interleaved,
        t !== null) {
            l = t;
            do
                i |= l.lane,
                l = l.next;
            while (l !== t)
        } else
            o === null && (l.shared.lanes = 0);
        $t |= i,
        e.lanes = i,
        e.memoizedState = m
    }
}
function xu(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , l = r.callback;
            if (l !== null) {
                if (r.callback = null,
                r = n,
                typeof l != "function")
                    throw Error(g(191, l));
                l.call(r)
            }
        }
}
var ur = {}
  , Ge = Nt(ur)
  , Jn = Nt(ur)
  , qn = Nt(ur);
function Mt(e) {
    if (e === ur)
        throw Error(g(174));
    return e
}
function yi(e, t) {
    switch (U(qn, t),
    U(Jn, e),
    U(Ge, ur),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : oo(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = oo(t, e)
    }
    W(Ge),
    U(Ge, t)
}
function pn() {
    W(Ge),
    W(Jn),
    W(qn)
}
function aa(e) {
    Mt(qn.current);
    var t = Mt(Ge.current)
      , n = oo(t, e.type);
    t !== n && (U(Jn, e),
    U(Ge, n))
}
function gi(e) {
    Jn.current === e && (W(Ge),
    W(Jn))
}
var X = Nt(0);
function br(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var Vl = [];
function wi() {
    for (var e = 0; e < Vl.length; e++)
        Vl[e]._workInProgressVersionPrimary = null;
    Vl.length = 0
}
var Dr = it.ReactCurrentDispatcher
  , Hl = it.ReactCurrentBatchConfig
  , Ft = 0
  , G = null
  , re = null
  , oe = null
  , el = !1
  , On = !1
  , bn = 0
  , ed = 0;
function fe() {
    throw Error(g(321))
}
function ki(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!We(e[n], t[n]))
            return !1;
    return !0
}
function Si(e, t, n, r, l, o) {
    if (Ft = o,
    G = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Dr.current = e === null || e.memoizedState === null ? ld : od,
    e = n(r, l),
    On) {
        o = 0;
        do {
            if (On = !1,
            bn = 0,
            25 <= o)
                throw Error(g(301));
            o += 1,
            oe = re = null,
            t.updateQueue = null,
            Dr.current = id,
            e = n(r, l)
        } while (On)
    }
    if (Dr.current = tl,
    t = re !== null && re.next !== null,
    Ft = 0,
    oe = re = G = null,
    el = !1,
    t)
        throw Error(g(300));
    return e
}
function xi() {
    var e = bn !== 0;
    return bn = 0,
    e
}
function Ke() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return oe === null ? G.memoizedState = oe = e : oe = oe.next = e,
    oe
}
function Re() {
    if (re === null) {
        var e = G.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = re.next;
    var t = oe === null ? G.memoizedState : oe.next;
    if (t !== null)
        oe = t,
        re = e;
    else {
        if (e === null)
            throw Error(g(310));
        re = e,
        e = {
            memoizedState: re.memoizedState,
            baseState: re.baseState,
            baseQueue: re.baseQueue,
            queue: re.queue,
            next: null
        },
        oe === null ? G.memoizedState = oe = e : oe = oe.next = e
    }
    return oe
}
function er(e, t) {
    return typeof t == "function" ? t(e) : t
}
function Wl(e) {
    var t = Re()
      , n = t.queue;
    if (n === null)
        throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = re
      , l = r.baseQueue
      , o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var i = l.next;
            l.next = o.next,
            o.next = i
        }
        r.baseQueue = l = o,
        n.pending = null
    }
    if (l !== null) {
        o = l.next,
        r = r.baseState;
        var u = i = null
          , s = null
          , c = o;
        do {
            var h = c.lane;
            if ((Ft & h) === h)
                s !== null && (s = s.next = {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                }),
                r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var m = {
                    lane: h,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                s === null ? (u = s = m,
                i = r) : s = s.next = m,
                G.lanes |= h,
                $t |= h
            }
            c = c.next
        } while (c !== null && c !== o);
        s === null ? i = r : s.next = u,
        We(r, t.memoizedState) || (ke = !0),
        t.memoizedState = r,
        t.baseState = i,
        t.baseQueue = s,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        l = e;
        do
            o = l.lane,
            G.lanes |= o,
            $t |= o,
            l = l.next;
        while (l !== e)
    } else
        l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function Ql(e) {
    var t = Re()
      , n = t.queue;
    if (n === null)
        throw Error(g(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , l = n.pending
      , o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var i = l = l.next;
        do
            o = e(o, i.action),
            i = i.next;
        while (i !== l);
        We(o, t.memoizedState) || (ke = !0),
        t.memoizedState = o,
        t.baseQueue === null && (t.baseState = o),
        n.lastRenderedState = o
    }
    return [o, r]
}
function ca() {}
function fa(e, t) {
    var n = G
      , r = Re()
      , l = t()
      , o = !We(r.memoizedState, l);
    if (o && (r.memoizedState = l,
    ke = !0),
    r = r.queue,
    Ei(ma.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || oe !== null && oe.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        tr(9, pa.bind(null, n, r, l, t), void 0, null),
        ie === null)
            throw Error(g(349));
        Ft & 30 || da(n, t, l)
    }
    return l
}
function da(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = G.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    G.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function pa(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    ha(t) && va(e)
}
function ma(e, t, n) {
    return n(function() {
        ha(t) && va(e)
    })
}
function ha(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !We(e, n)
    } catch {
        return !0
    }
}
function va(e) {
    var t = lt(e, 1);
    t !== null && He(t, e, 1, -1)
}
function Eu(e) {
    var t = Ke();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: er,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = rd.bind(null, G, e),
    [t.memoizedState, e]
}
function tr(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = G.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    G.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function ya() {
    return Re().memoizedState
}
function jr(e, t, n, r) {
    var l = Ke();
    G.flags |= e,
    l.memoizedState = tr(1 | t, n, void 0, r === void 0 ? null : r)
}
function ml(e, t, n, r) {
    var l = Re();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (re !== null) {
        var i = re.memoizedState;
        if (o = i.destroy,
        r !== null && ki(r, i.deps)) {
            l.memoizedState = tr(t, n, o, r);
            return
        }
    }
    G.flags |= e,
    l.memoizedState = tr(1 | t, n, o, r)
}
function Cu(e, t) {
    return jr(8390656, 8, e, t)
}
function Ei(e, t) {
    return ml(2048, 8, e, t)
}
function ga(e, t) {
    return ml(4, 2, e, t)
}
function wa(e, t) {
    return ml(4, 4, e, t)
}
function ka(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function Sa(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    ml(4, 4, ka.bind(null, t, e), n)
}
function Ci() {}
function xa(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ki(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function Ea(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ki(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function Ca(e, t, n) {
    return Ft & 21 ? (We(n, t) || (n = zs(),
    G.lanes |= n,
    $t |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    ke = !0),
    e.memoizedState = n)
}
function td(e, t) {
    var n = F;
    F = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = Hl.transition;
    Hl.transition = {};
    try {
        e(!1),
        t()
    } finally {
        F = n,
        Hl.transition = r
    }
}
function _a() {
    return Re().memoizedState
}
function nd(e, t, n) {
    var r = St(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    Na(e))
        Pa(t, n);
    else if (n = ua(e, t, n, r),
    n !== null) {
        var l = ve();
        He(n, e, r, l),
        Ta(n, t, r)
    }
}
function rd(e, t, n) {
    var r = St(e)
      , l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (Na(e))
        Pa(t, l);
    else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer,
        o !== null))
            try {
                var i = t.lastRenderedState
                  , u = o(i, n);
                if (l.hasEagerState = !0,
                l.eagerState = u,
                We(u, i)) {
                    var s = t.interleaved;
                    s === null ? (l.next = l,
                    hi(t)) : (l.next = s.next,
                    s.next = l),
                    t.interleaved = l;
                    return
                }
            } catch {} finally {}
        n = ua(e, t, l, r),
        n !== null && (l = ve(),
        He(n, e, r, l),
        Ta(n, t, r))
    }
}
function Na(e) {
    var t = e.alternate;
    return e === G || t !== null && t === G
}
function Pa(e, t) {
    On = el = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function Ta(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        ti(e, n)
    }
}
var tl = {
    readContext: Ie,
    useCallback: fe,
    useContext: fe,
    useEffect: fe,
    useImperativeHandle: fe,
    useInsertionEffect: fe,
    useLayoutEffect: fe,
    useMemo: fe,
    useReducer: fe,
    useRef: fe,
    useState: fe,
    useDebugValue: fe,
    useDeferredValue: fe,
    useTransition: fe,
    useMutableSource: fe,
    useSyncExternalStore: fe,
    useId: fe,
    unstable_isNewReconciler: !1
}
  , ld = {
    readContext: Ie,
    useCallback: function(e, t) {
        return Ke().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Ie,
    useEffect: Cu,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        jr(4194308, 4, ka.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return jr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return jr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Ke();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Ke();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = nd.bind(null, G, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Ke();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: Eu,
    useDebugValue: Ci,
    useDeferredValue: function(e) {
        return Ke().memoizedState = e
    },
    useTransition: function() {
        var e = Eu(!1)
          , t = e[0];
        return e = td.bind(null, e[1]),
        Ke().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = G
          , l = Ke();
        if (Q) {
            if (n === void 0)
                throw Error(g(407));
            n = n()
        } else {
            if (n = t(),
            ie === null)
                throw Error(g(349));
            Ft & 30 || da(r, t, n)
        }
        l.memoizedState = n;
        var o = {
            value: n,
            getSnapshot: t
        };
        return l.queue = o,
        Cu(ma.bind(null, r, o, e), [e]),
        r.flags |= 2048,
        tr(9, pa.bind(null, r, o, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Ke()
          , t = ie.identifierPrefix;
        if (Q) {
            var n = et
              , r = be;
            n = (r & ~(1 << 32 - Ve(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = bn++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = ed++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , od = {
    readContext: Ie,
    useCallback: xa,
    useContext: Ie,
    useEffect: Ei,
    useImperativeHandle: Sa,
    useInsertionEffect: ga,
    useLayoutEffect: wa,
    useMemo: Ea,
    useReducer: Wl,
    useRef: ya,
    useState: function() {
        return Wl(er)
    },
    useDebugValue: Ci,
    useDeferredValue: function(e) {
        var t = Re();
        return Ca(t, re.memoizedState, e)
    },
    useTransition: function() {
        var e = Wl(er)[0]
          , t = Re().memoizedState;
        return [e, t]
    },
    useMutableSource: ca,
    useSyncExternalStore: fa,
    useId: _a,
    unstable_isNewReconciler: !1
}
  , id = {
    readContext: Ie,
    useCallback: xa,
    useContext: Ie,
    useEffect: Ei,
    useImperativeHandle: Sa,
    useInsertionEffect: ga,
    useLayoutEffect: wa,
    useMemo: Ea,
    useReducer: Ql,
    useRef: ya,
    useState: function() {
        return Ql(er)
    },
    useDebugValue: Ci,
    useDeferredValue: function(e) {
        var t = Re();
        return re === null ? t.memoizedState = e : Ca(t, re.memoizedState, e)
    },
    useTransition: function() {
        var e = Ql(er)[0]
          , t = Re().memoizedState;
        return [e, t]
    },
    useMutableSource: ca,
    useSyncExternalStore: fa,
    useId: _a,
    unstable_isNewReconciler: !1
};
function $e(e, t) {
    if (e && e.defaultProps) {
        t = Z({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Po(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : Z({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var hl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Vt(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ve()
          , l = St(e)
          , o = tt(r, l);
        o.payload = t,
        n != null && (o.callback = n),
        t = wt(e, o, l),
        t !== null && (He(t, e, l, r),
        Lr(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ve()
          , l = St(e)
          , o = tt(r, l);
        o.tag = 1,
        o.payload = t,
        n != null && (o.callback = n),
        t = wt(e, o, l),
        t !== null && (He(t, e, l, r),
        Lr(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ve()
          , r = St(e)
          , l = tt(n, r);
        l.tag = 2,
        t != null && (l.callback = t),
        t = wt(e, l, r),
        t !== null && (He(t, e, r, n),
        Lr(t, e, r))
    }
};
function _u(e, t, n, r, l, o, i) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Yn(n, r) || !Yn(l, o) : !0
}
function za(e, t, n) {
    var r = !1
      , l = Ct
      , o = t.contextType;
    return typeof o == "object" && o !== null ? o = Ie(o) : (l = xe(t) ? Ot : me.current,
    r = t.contextTypes,
    o = (r = r != null) ? cn(e, l) : Ct),
    t = new t(n,o),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = hl,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = l,
    e.__reactInternalMemoizedMaskedChildContext = o),
    t
}
function Nu(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && hl.enqueueReplaceState(t, t.state, null)
}
function To(e, t, n, r) {
    var l = e.stateNode;
    l.props = n,
    l.state = e.memoizedState,
    l.refs = {},
    vi(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = Ie(o) : (o = xe(t) ? Ot : me.current,
    l.context = cn(e, o)),
    l.state = e.memoizedState,
    o = t.getDerivedStateFromProps,
    typeof o == "function" && (Po(e, t, o, n),
    l.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
    typeof l.componentWillMount == "function" && l.componentWillMount(),
    typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
    t !== l.state && hl.enqueueReplaceState(l, l.state, null),
    qr(e, n, l, r),
    l.state = e.memoizedState),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}
function mn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Mc(r),
            r = r.return;
        while (r);
        var l = n
    } catch (o) {
        l = `
Error generating stack: ` + o.message + `
` + o.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}
function Kl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function zo(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var ud = typeof WeakMap == "function" ? WeakMap : Map;
function La(e, t, n) {
    n = tt(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        rl || (rl = !0,
        $o = r),
        zo(e, t)
    }
    ,
    n
}
function Da(e, t, n) {
    n = tt(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }
        ,
        n.callback = function() {
            zo(e, t)
        }
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
        zo(e, t),
        typeof r != "function" && (kt === null ? kt = new Set([this]) : kt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: i !== null ? i : ""
        })
    }
    ),
    n
}
function Pu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ud;
        var l = new Set;
        r.set(t, l)
    } else
        l = r.get(t),
        l === void 0 && (l = new Set,
        r.set(t, l));
    l.has(n) || (l.add(n),
    e = Sd.bind(null, e, t, n),
    t.then(e, e))
}
function Tu(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function zu(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = l,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = tt(-1, 1),
    t.tag = 2,
    wt(n, t, 1))),
    n.lanes |= 1),
    e)
}
var sd = it.ReactCurrentOwner
  , ke = !1;
function he(e, t, n, r) {
    t.child = e === null ? ia(t, null, n, r) : dn(t, e.child, n, r)
}
function Lu(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return un(t, l),
    r = Si(e, t, n, r, o, l),
    n = xi(),
    e !== null && !ke ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    ot(e, t, l)) : (Q && n && ai(t),
    t.flags |= 1,
    he(e, t, r, l),
    t.child)
}
function Du(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" && !ji(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = o,
        ja(e, t, o, r, l)) : (e = Or(n.type, null, r, t, t.mode, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (o = e.child,
    !(e.lanes & l)) {
        var i = o.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : Yn,
        n(i, r) && e.ref === t.ref)
            return ot(e, t, l)
    }
    return t.flags |= 1,
    e = xt(o, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function ja(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (Yn(o, r) && e.ref === t.ref)
            if (ke = !1,
            t.pendingProps = r = o,
            (e.lanes & l) !== 0)
                e.flags & 131072 && (ke = !0);
            else
                return t.lanes = e.lanes,
                ot(e, t, l)
    }
    return Lo(e, t, n, r, l)
}
function Ma(e, t, n) {
    var r = t.pendingProps
      , l = r.children
      , o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            U(tn, Ce),
            Ce |= n;
        else {
            if (!(n & 1073741824))
                return e = o !== null ? o.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                U(tn, Ce),
                Ce |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = o !== null ? o.baseLanes : n,
            U(tn, Ce),
            Ce |= r
        }
    else
        o !== null ? (r = o.baseLanes | n,
        t.memoizedState = null) : r = n,
        U(tn, Ce),
        Ce |= r;
    return he(e, t, l, n),
    t.child
}
function Ia(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function Lo(e, t, n, r, l) {
    var o = xe(n) ? Ot : me.current;
    return o = cn(t, o),
    un(t, l),
    n = Si(e, t, n, r, o, l),
    r = xi(),
    e !== null && !ke ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    ot(e, t, l)) : (Q && r && ai(t),
    t.flags |= 1,
    he(e, t, n, l),
    t.child)
}
function ju(e, t, n, r, l) {
    if (xe(n)) {
        var o = !0;
        Yr(t)
    } else
        o = !1;
    if (un(t, l),
    t.stateNode === null)
        Mr(e, t),
        za(t, n, r),
        To(t, n, r, l),
        r = !0;
    else if (e === null) {
        var i = t.stateNode
          , u = t.memoizedProps;
        i.props = u;
        var s = i.context
          , c = n.contextType;
        typeof c == "object" && c !== null ? c = Ie(c) : (c = xe(n) ? Ot : me.current,
        c = cn(t, c));
        var h = n.getDerivedStateFromProps
          , m = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function";
        m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && Nu(t, i, r, c),
        ct = !1;
        var p = t.memoizedState;
        i.state = p,
        qr(t, r, i, l),
        s = t.memoizedState,
        u !== r || p !== s || Se.current || ct ? (typeof h == "function" && (Po(t, n, h, r),
        s = t.memoizedState),
        (u = ct || _u(t, n, u, r, p, s, c)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = s),
        i.props = r,
        i.state = s,
        i.context = c,
        r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        i = t.stateNode,
        sa(e, t),
        u = t.memoizedProps,
        c = t.type === t.elementType ? u : $e(t.type, u),
        i.props = c,
        m = t.pendingProps,
        p = i.context,
        s = n.contextType,
        typeof s == "object" && s !== null ? s = Ie(s) : (s = xe(n) ? Ot : me.current,
        s = cn(t, s));
        var w = n.getDerivedStateFromProps;
        (h = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== m || p !== s) && Nu(t, i, r, s),
        ct = !1,
        p = t.memoizedState,
        i.state = p,
        qr(t, r, i, l);
        var y = t.memoizedState;
        u !== m || p !== y || Se.current || ct ? (typeof w == "function" && (Po(t, n, w, r),
        y = t.memoizedState),
        (c = ct || _u(t, n, c, r, p, y, s) || !1) ? (h || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, y, s),
        typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, y, s)),
        typeof i.componentDidUpdate == "function" && (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = y),
        i.props = r,
        i.state = y,
        i.context = s,
        r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return Do(e, t, n, r, o, l)
}
function Do(e, t, n, r, l, o) {
    Ia(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i)
        return l && yu(t, n, !1),
        ot(e, t, o);
    r = t.stateNode,
    sd.current = t;
    var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && i ? (t.child = dn(t, e.child, null, o),
    t.child = dn(t, null, u, o)) : he(e, t, u, o),
    t.memoizedState = r.state,
    l && yu(t, n, !0),
    t.child
}
function Ra(e) {
    var t = e.stateNode;
    t.pendingContext ? vu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vu(e, t.context, !1),
    yi(e, t.containerInfo)
}
function Mu(e, t, n, r, l) {
    return fn(),
    fi(l),
    t.flags |= 256,
    he(e, t, n, r),
    t.child
}
var jo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function Mo(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Oa(e, t, n) {
    var r = t.pendingProps, l = X.current, o = !1, i = (t.flags & 128) !== 0, u;
    if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u ? (o = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
    U(X, l & 1),
    e === null)
        return _o(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (i = r.children,
        e = r.fallback,
        o ? (r = t.mode,
        o = t.child,
        i = {
            mode: "hidden",
            children: i
        },
        !(r & 1) && o !== null ? (o.childLanes = 0,
        o.pendingProps = i) : o = gl(i, r, 0, null),
        e = Rt(e, r, n, null),
        o.return = t,
        e.return = t,
        o.sibling = e,
        t.child = o,
        t.child.memoizedState = Mo(n),
        t.memoizedState = jo,
        e) : _i(t, i));
    if (l = e.memoizedState,
    l !== null && (u = l.dehydrated,
    u !== null))
        return ad(e, t, i, r, u, l, n);
    if (o) {
        o = r.fallback,
        i = t.mode,
        l = e.child,
        u = l.sibling;
        var s = {
            mode: "hidden",
            children: r.children
        };
        return !(i & 1) && t.child !== l ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = s,
        t.deletions = null) : (r = xt(l, s),
        r.subtreeFlags = l.subtreeFlags & 14680064),
        u !== null ? o = xt(u, o) : (o = Rt(o, i, n, null),
        o.flags |= 2),
        o.return = t,
        r.return = t,
        r.sibling = o,
        t.child = r,
        r = o,
        o = t.child,
        i = e.child.memoizedState,
        i = i === null ? Mo(n) : {
            baseLanes: i.baseLanes | n,
            cachePool: null,
            transitions: i.transitions
        },
        o.memoizedState = i,
        o.childLanes = e.childLanes & ~n,
        t.memoizedState = jo,
        r
    }
    return o = e.child,
    e = o.sibling,
    r = xt(o, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function _i(e, t) {
    return t = gl({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function Sr(e, t, n, r) {
    return r !== null && fi(r),
    dn(t, e.child, null, n),
    e = _i(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function ad(e, t, n, r, l, o, i) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = Kl(Error(g(422))),
        Sr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (o = r.fallback,
        l = t.mode,
        r = gl({
            mode: "visible",
            children: r.children
        }, l, 0, null),
        o = Rt(o, l, i, null),
        o.flags |= 2,
        r.return = t,
        o.return = t,
        r.sibling = o,
        t.child = r,
        t.mode & 1 && dn(t, e.child, null, i),
        t.child.memoizedState = Mo(i),
        t.memoizedState = jo,
        o);
    if (!(t.mode & 1))
        return Sr(e, t, i, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset,
        r)
            var u = r.dgst;
        return r = u,
        o = Error(g(419)),
        r = Kl(o, r, void 0),
        Sr(e, t, i, r)
    }
    if (u = (i & e.childLanes) !== 0,
    ke || u) {
        if (r = ie,
        r !== null) {
            switch (i & -i) {
            case 4:
                l = 2;
                break;
            case 16:
                l = 8;
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
                l = 32;
                break;
            case 536870912:
                l = 268435456;
                break;
            default:
                l = 0
            }
            l = l & (r.suspendedLanes | i) ? 0 : l,
            l !== 0 && l !== o.retryLane && (o.retryLane = l,
            lt(e, l),
            He(r, e, l, -1))
        }
        return Di(),
        r = Kl(Error(g(421))),
        Sr(e, t, i, r)
    }
    return l.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = xd.bind(null, e),
    l._reactRetry = t,
    null) : (e = o.treeContext,
    _e = gt(l.nextSibling),
    Ne = t,
    Q = !0,
    Be = null,
    e !== null && (Le[De++] = be,
    Le[De++] = et,
    Le[De++] = At,
    be = e.id,
    et = e.overflow,
    At = t),
    t = _i(t, r.children),
    t.flags |= 4096,
    t)
}
function Iu(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    No(e.return, t, n)
}
function Yl(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (o.isBackwards = t,
    o.rendering = null,
    o.renderingStartTime = 0,
    o.last = r,
    o.tail = n,
    o.tailMode = l)
}
function Aa(e, t, n) {
    var r = t.pendingProps
      , l = r.revealOrder
      , o = r.tail;
    if (he(e, t, r.children, n),
    r = X.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && Iu(e, n, t);
                else if (e.tag === 19)
                    Iu(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (U(X, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (l) {
        case "forwards":
            for (n = t.child,
            l = null; n !== null; )
                e = n.alternate,
                e !== null && br(e) === null && (l = n),
                n = n.sibling;
            n = l,
            n === null ? (l = t.child,
            t.child = null) : (l = n.sibling,
            n.sibling = null),
            Yl(t, !1, l, n, o);
            break;
        case "backwards":
            for (n = null,
            l = t.child,
            t.child = null; l !== null; ) {
                if (e = l.alternate,
                e !== null && br(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling,
                l.sibling = n,
                n = l,
                l = e
            }
            Yl(t, !0, n, null, o);
            break;
        case "together":
            Yl(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Mr(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function ot(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    $t |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(g(153));
    if (t.child !== null) {
        for (e = t.child,
        n = xt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = xt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function cd(e, t, n) {
    switch (t.tag) {
    case 3:
        Ra(t),
        fn();
        break;
    case 5:
        aa(t);
        break;
    case 1:
        xe(t.type) && Yr(t);
        break;
    case 4:
        yi(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , l = t.memoizedProps.value;
        U(Zr, r._currentValue),
        r._currentValue = l;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (U(X, X.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? Oa(e, t, n) : (U(X, X.current & 1),
            e = ot(e, t, n),
            e !== null ? e.sibling : null);
        U(X, X.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return Aa(e, t, n);
            t.flags |= 128
        }
        if (l = t.memoizedState,
        l !== null && (l.rendering = null,
        l.tail = null,
        l.lastEffect = null),
        U(X, X.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        Ma(e, t, n)
    }
    return ot(e, t, n)
}
var Fa, Io, $a, Ua;
Fa = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
Io = function() {}
;
$a = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode,
        Mt(Ge.current);
        var o = null;
        switch (n) {
        case "input":
            l = to(e, l),
            r = to(e, r),
            o = [];
            break;
        case "select":
            l = Z({}, l, {
                value: void 0
            }),
            r = Z({}, r, {
                value: void 0
            }),
            o = [];
            break;
        case "textarea":
            l = lo(e, l),
            r = lo(e, r),
            o = [];
            break;
        default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr)
        }
        io(n, r);
        var i;
        n = null;
        for (c in l)
            if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
                if (c === "style") {
                    var u = l[c];
                    for (i in u)
                        u.hasOwnProperty(i) && (n || (n = {}),
                        n[i] = "")
                } else
                    c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Un.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
        for (c in r) {
            var s = r[c];
            if (u = l != null ? l[c] : void 0,
            r.hasOwnProperty(c) && s !== u && (s != null || u != null))
                if (c === "style")
                    if (u) {
                        for (i in u)
                            !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}),
                            n[i] = "");
                        for (i in s)
                            s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}),
                            n[i] = s[i])
                    } else
                        n || (o || (o = []),
                        o.push(c, n)),
                        n = s;
                else
                    c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                    u = u ? u.__html : void 0,
                    s != null && u !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Un.hasOwnProperty(c) ? (s != null && c === "onScroll" && H("scroll", e),
                    o || u === s || (o = [])) : (o = o || []).push(c, s))
        }
        n && (o = o || []).push("style", n);
        var c = o;
        (t.updateQueue = c) && (t.flags |= 4)
    }
}
;
Ua = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function _n(e, t) {
    if (!Q)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function de(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags & 14680064,
            r |= l.flags & 14680064,
            l.return = e,
            l = l.sibling;
    else
        for (l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags,
            r |= l.flags,
            l.return = e,
            l = l.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function fd(e, t, n) {
    var r = t.pendingProps;
    switch (ci(t),
    t.tag) {
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
        return de(t),
        null;
    case 1:
        return xe(t.type) && Kr(),
        de(t),
        null;
    case 3:
        return r = t.stateNode,
        pn(),
        W(Se),
        W(me),
        wi(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (wr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Be !== null && (Vo(Be),
        Be = null))),
        Io(e, t),
        de(t),
        null;
    case 5:
        gi(t);
        var l = Mt(qn.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            $a(e, t, n, r, l),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(g(166));
                return de(t),
                null
            }
            if (e = Mt(Ge.current),
            wr(t)) {
                r = t.stateNode,
                n = t.type;
                var o = t.memoizedProps;
                switch (r[Ye] = t,
                r[Zn] = o,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    H("cancel", r),
                    H("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    H("load", r);
                    break;
                case "video":
                case "audio":
                    for (l = 0; l < Ln.length; l++)
                        H(Ln[l], r);
                    break;
                case "source":
                    H("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    H("error", r),
                    H("load", r);
                    break;
                case "details":
                    H("toggle", r);
                    break;
                case "input":
                    Hi(r, o),
                    H("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!o.multiple
                    },
                    H("invalid", r);
                    break;
                case "textarea":
                    Qi(r, o),
                    H("invalid", r)
                }
                io(n, o),
                l = null;
                for (var i in o)
                    if (o.hasOwnProperty(i)) {
                        var u = o[i];
                        i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && gr(r.textContent, u, e),
                        l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && gr(r.textContent, u, e),
                        l = ["children", "" + u]) : Un.hasOwnProperty(i) && u != null && i === "onScroll" && H("scroll", r)
                    }
                switch (n) {
                case "input":
                    cr(r),
                    Wi(r, o, !0);
                    break;
                case "textarea":
                    cr(r),
                    Ki(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof o.onClick == "function" && (r.onclick = Qr)
                }
                r = l,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                i = l.nodeType === 9 ? l : l.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = ms(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, {
                    is: r.is
                }) : (e = i.createElement(n),
                n === "select" && (i = e,
                r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n),
                e[Ye] = t,
                e[Zn] = r,
                Fa(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (i = uo(n, r),
                    n) {
                    case "dialog":
                        H("cancel", e),
                        H("close", e),
                        l = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        H("load", e),
                        l = r;
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < Ln.length; l++)
                            H(Ln[l], e);
                        l = r;
                        break;
                    case "source":
                        H("error", e),
                        l = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        H("error", e),
                        H("load", e),
                        l = r;
                        break;
                    case "details":
                        H("toggle", e),
                        l = r;
                        break;
                    case "input":
                        Hi(e, r),
                        l = to(e, r),
                        H("invalid", e);
                        break;
                    case "option":
                        l = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        l = Z({}, r, {
                            value: void 0
                        }),
                        H("invalid", e);
                        break;
                    case "textarea":
                        Qi(e, r),
                        l = lo(e, r),
                        H("invalid", e);
                        break;
                    default:
                        l = r
                    }
                    io(n, l),
                    u = l;
                    for (o in u)
                        if (u.hasOwnProperty(o)) {
                            var s = u[o];
                            o === "style" ? ys(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                            s != null && hs(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Bn(e, s) : typeof s == "number" && Bn(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Un.hasOwnProperty(o) ? s != null && o === "onScroll" && H("scroll", e) : s != null && Go(e, o, s, i))
                        }
                    switch (n) {
                    case "input":
                        cr(e),
                        Wi(e, r, !1);
                        break;
                    case "textarea":
                        cr(e),
                        Ki(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + Et(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        o = r.value,
                        o != null ? nn(e, !!r.multiple, o, !1) : r.defaultValue != null && nn(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof l.onClick == "function" && (e.onclick = Qr)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return de(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            Ua(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(g(166));
            if (n = Mt(qn.current),
            Mt(Ge.current),
            wr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[Ye] = t,
                (o = r.nodeValue !== n) && (e = Ne,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        gr(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && gr(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                o && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[Ye] = t,
                t.stateNode = r
        }
        return de(t),
        null;
    case 13:
        if (W(X),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (Q && _e !== null && t.mode & 1 && !(t.flags & 128))
                la(),
                fn(),
                t.flags |= 98560,
                o = !1;
            else if (o = wr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!o)
                        throw Error(g(318));
                    if (o = t.memoizedState,
                    o = o !== null ? o.dehydrated : null,
                    !o)
                        throw Error(g(317));
                    o[Ye] = t
                } else
                    fn(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                de(t),
                o = !1
            } else
                Be !== null && (Vo(Be),
                Be = null),
                o = !0;
            if (!o)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || X.current & 1 ? le === 0 && (le = 3) : Di())),
        t.updateQueue !== null && (t.flags |= 4),
        de(t),
        null);
    case 4:
        return pn(),
        Io(e, t),
        e === null && Xn(t.stateNode.containerInfo),
        de(t),
        null;
    case 10:
        return mi(t.type._context),
        de(t),
        null;
    case 17:
        return xe(t.type) && Kr(),
        de(t),
        null;
    case 19:
        if (W(X),
        o = t.memoizedState,
        o === null)
            return de(t),
            null;
        if (r = (t.flags & 128) !== 0,
        i = o.rendering,
        i === null)
            if (r)
                _n(o, !1);
            else {
                if (le !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (i = br(e),
                        i !== null) {
                            for (t.flags |= 128,
                            _n(o, !1),
                            r = i.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                o = n,
                                e = r,
                                o.flags &= 14680066,
                                i = o.alternate,
                                i === null ? (o.childLanes = 0,
                                o.lanes = e,
                                o.child = null,
                                o.subtreeFlags = 0,
                                o.memoizedProps = null,
                                o.memoizedState = null,
                                o.updateQueue = null,
                                o.dependencies = null,
                                o.stateNode = null) : (o.childLanes = i.childLanes,
                                o.lanes = i.lanes,
                                o.child = i.child,
                                o.subtreeFlags = 0,
                                o.deletions = null,
                                o.memoizedProps = i.memoizedProps,
                                o.memoizedState = i.memoizedState,
                                o.updateQueue = i.updateQueue,
                                o.type = i.type,
                                e = i.dependencies,
                                o.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return U(X, X.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                o.tail !== null && ee() > hn && (t.flags |= 128,
                r = !0,
                _n(o, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = br(i),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    _n(o, !0),
                    o.tail === null && o.tailMode === "hidden" && !i.alternate && !Q)
                        return de(t),
                        null
                } else
                    2 * ee() - o.renderingStartTime > hn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    _n(o, !1),
                    t.lanes = 4194304);
            o.isBackwards ? (i.sibling = t.child,
            t.child = i) : (n = o.last,
            n !== null ? n.sibling = i : t.child = i,
            o.last = i)
        }
        return o.tail !== null ? (t = o.tail,
        o.rendering = t,
        o.tail = t.sibling,
        o.renderingStartTime = ee(),
        t.sibling = null,
        n = X.current,
        U(X, r ? n & 1 | 2 : n & 1),
        t) : (de(t),
        null);
    case 22:
    case 23:
        return Li(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? Ce & 1073741824 && (de(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : de(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(g(156, t.tag))
}
function dd(e, t) {
    switch (ci(t),
    t.tag) {
    case 1:
        return xe(t.type) && Kr(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return pn(),
        W(Se),
        W(me),
        wi(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return gi(t),
        null;
    case 13:
        if (W(X),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(g(340));
            fn()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return W(X),
        null;
    case 4:
        return pn(),
        null;
    case 10:
        return mi(t.type._context),
        null;
    case 22:
    case 23:
        return Li(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var xr = !1
  , pe = !1
  , pd = typeof WeakSet == "function" ? WeakSet : Set
  , E = null;
function en(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                q(e, t, r)
            }
        else
            n.current = null
}
function Ro(e, t, n) {
    try {
        n()
    } catch (r) {
        q(e, t, r)
    }
}
var Ru = !1;
function md(e, t) {
    if (go = Vr,
    e = Qs(),
    si(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset
                      , o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        o.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var i = 0
                      , u = -1
                      , s = -1
                      , c = 0
                      , h = 0
                      , m = e
                      , p = null;
                    t: for (; ; ) {
                        for (var w; m !== n || l !== 0 && m.nodeType !== 3 || (u = i + l),
                        m !== o || r !== 0 && m.nodeType !== 3 || (s = i + r),
                        m.nodeType === 3 && (i += m.nodeValue.length),
                        (w = m.firstChild) !== null; )
                            p = m,
                            m = w;
                        for (; ; ) {
                            if (m === e)
                                break t;
                            if (p === n && ++c === l && (u = i),
                            p === o && ++h === r && (s = i),
                            (w = m.nextSibling) !== null)
                                break;
                            m = p,
                            p = m.parentNode
                        }
                        m = w
                    }
                    n = u === -1 || s === -1 ? null : {
                        start: u,
                        end: s
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (wo = {
        focusedElem: e,
        selectionRange: n
    },
    Vr = !1,
    E = t; E !== null; )
        if (t = E,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            E = e;
        else
            for (; E !== null; ) {
                t = E;
                try {
                    var y = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (y !== null) {
                                var k = y.memoizedProps
                                  , O = y.memoizedState
                                  , f = t.stateNode
                                  , a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : $e(t.type, k), O);
                                f.__reactInternalSnapshotBeforeUpdate = a
                            }
                            break;
                        case 3:
                            var d = t.stateNode.containerInfo;
                            d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(g(163))
                        }
                } catch (v) {
                    q(t, t.return, v)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    E = e;
                    break
                }
                E = t.return
            }
    return y = Ru,
    Ru = !1,
    y
}
function An(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                l.destroy = void 0,
                o !== void 0 && Ro(t, n, o)
            }
            l = l.next
        } while (l !== r)
    }
}
function vl(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function Oo(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function Ba(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    Ba(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[Ye],
    delete t[Zn],
    delete t[xo],
    delete t[Zf],
    delete t[Jf])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Va(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Ou(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Va(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function Ao(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = Qr));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Ao(e, t, n),
        e = e.sibling; e !== null; )
            Ao(e, t, n),
            e = e.sibling
}
function Fo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Fo(e, t, n),
        e = e.sibling; e !== null; )
            Fo(e, t, n),
            e = e.sibling
}
var ue = null
  , Ue = !1;
function st(e, t, n) {
    for (n = n.child; n !== null; )
        Ha(e, t, n),
        n = n.sibling
}
function Ha(e, t, n) {
    if (Xe && typeof Xe.onCommitFiberUnmount == "function")
        try {
            Xe.onCommitFiberUnmount(sl, n)
        } catch {}
    switch (n.tag) {
    case 5:
        pe || en(n, t);
    case 6:
        var r = ue
          , l = Ue;
        ue = null,
        st(e, t, n),
        ue = r,
        Ue = l,
        ue !== null && (Ue ? (e = ue,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ue.removeChild(n.stateNode));
        break;
    case 18:
        ue !== null && (Ue ? (e = ue,
        n = n.stateNode,
        e.nodeType === 8 ? Ul(e.parentNode, n) : e.nodeType === 1 && Ul(e, n),
        Qn(e)) : Ul(ue, n.stateNode));
        break;
    case 4:
        r = ue,
        l = Ue,
        ue = n.stateNode.containerInfo,
        Ue = !0,
        st(e, t, n),
        ue = r,
        Ue = l;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!pe && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            l = r = r.next;
            do {
                var o = l
                  , i = o.destroy;
                o = o.tag,
                i !== void 0 && (o & 2 || o & 4) && Ro(n, t, i),
                l = l.next
            } while (l !== r)
        }
        st(e, t, n);
        break;
    case 1:
        if (!pe && (en(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (u) {
                q(n, t, u)
            }
        st(e, t, n);
        break;
    case 21:
        st(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (pe = (r = pe) || n.memoizedState !== null,
        st(e, t, n),
        pe = r) : st(e, t, n);
        break;
    default:
        st(e, t, n)
    }
}
function Au(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new pd),
        t.forEach(function(r) {
            var l = Ed.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(l, l))
        })
    }
}
function Fe(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e
                  , i = t
                  , u = i;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                    case 5:
                        ue = u.stateNode,
                        Ue = !1;
                        break e;
                    case 3:
                        ue = u.stateNode.containerInfo,
                        Ue = !0;
                        break e;
                    case 4:
                        ue = u.stateNode.containerInfo,
                        Ue = !0;
                        break e
                    }
                    u = u.return
                }
                if (ue === null)
                    throw Error(g(160));
                Ha(o, i, l),
                ue = null,
                Ue = !1;
                var s = l.alternate;
                s !== null && (s.return = null),
                l.return = null
            } catch (c) {
                q(l, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            Wa(t, e),
            t = t.sibling
}
function Wa(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (Fe(t, e),
        Qe(e),
        r & 4) {
            try {
                An(3, e, e.return),
                vl(3, e)
            } catch (k) {
                q(e, e.return, k)
            }
            try {
                An(5, e, e.return)
            } catch (k) {
                q(e, e.return, k)
            }
        }
        break;
    case 1:
        Fe(t, e),
        Qe(e),
        r & 512 && n !== null && en(n, n.return);
        break;
    case 5:
        if (Fe(t, e),
        Qe(e),
        r & 512 && n !== null && en(n, n.return),
        e.flags & 32) {
            var l = e.stateNode;
            try {
                Bn(l, "")
            } catch (k) {
                q(e, e.return, k)
            }
        }
        if (r & 4 && (l = e.stateNode,
        l != null)) {
            var o = e.memoizedProps
              , i = n !== null ? n.memoizedProps : o
              , u = e.type
              , s = e.updateQueue;
            if (e.updateQueue = null,
            s !== null)
                try {
                    u === "input" && o.type === "radio" && o.name != null && ds(l, o),
                    uo(u, i);
                    var c = uo(u, o);
                    for (i = 0; i < s.length; i += 2) {
                        var h = s[i]
                          , m = s[i + 1];
                        h === "style" ? ys(l, m) : h === "dangerouslySetInnerHTML" ? hs(l, m) : h === "children" ? Bn(l, m) : Go(l, h, m, c)
                    }
                    switch (u) {
                    case "input":
                        no(l, o);
                        break;
                    case "textarea":
                        ps(l, o);
                        break;
                    case "select":
                        var p = l._wrapperState.wasMultiple;
                        l._wrapperState.wasMultiple = !!o.multiple;
                        var w = o.value;
                        w != null ? nn(l, !!o.multiple, w, !1) : p !== !!o.multiple && (o.defaultValue != null ? nn(l, !!o.multiple, o.defaultValue, !0) : nn(l, !!o.multiple, o.multiple ? [] : "", !1))
                    }
                    l[Zn] = o
                } catch (k) {
                    q(e, e.return, k)
                }
        }
        break;
    case 6:
        if (Fe(t, e),
        Qe(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(g(162));
            l = e.stateNode,
            o = e.memoizedProps;
            try {
                l.nodeValue = o
            } catch (k) {
                q(e, e.return, k)
            }
        }
        break;
    case 3:
        if (Fe(t, e),
        Qe(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Qn(t.containerInfo)
            } catch (k) {
                q(e, e.return, k)
            }
        break;
    case 4:
        Fe(t, e),
        Qe(e);
        break;
    case 13:
        Fe(t, e),
        Qe(e),
        l = e.child,
        l.flags & 8192 && (o = l.memoizedState !== null,
        l.stateNode.isHidden = o,
        !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ti = ee())),
        r & 4 && Au(e);
        break;
    case 22:
        if (h = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (pe = (c = pe) || h,
        Fe(t, e),
        pe = c) : Fe(t, e),
        Qe(e),
        r & 8192) {
            if (c = e.memoizedState !== null,
            (e.stateNode.isHidden = c) && !h && e.mode & 1)
                for (E = e,
                h = e.child; h !== null; ) {
                    for (m = E = h; E !== null; ) {
                        switch (p = E,
                        w = p.child,
                        p.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            An(4, p, p.return);
                            break;
                        case 1:
                            en(p, p.return);
                            var y = p.stateNode;
                            if (typeof y.componentWillUnmount == "function") {
                                r = p,
                                n = p.return;
                                try {
                                    t = r,
                                    y.props = t.memoizedProps,
                                    y.state = t.memoizedState,
                                    y.componentWillUnmount()
                                } catch (k) {
                                    q(r, n, k)
                                }
                            }
                            break;
                        case 5:
                            en(p, p.return);
                            break;
                        case 22:
                            if (p.memoizedState !== null) {
                                $u(m);
                                continue
                            }
                        }
                        w !== null ? (w.return = p,
                        E = w) : $u(m)
                    }
                    h = h.sibling
                }
            e: for (h = null,
            m = e; ; ) {
                if (m.tag === 5) {
                    if (h === null) {
                        h = m;
                        try {
                            l = m.stateNode,
                            c ? (o = l.style,
                            typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = m.stateNode,
                            s = m.memoizedProps.style,
                            i = s != null && s.hasOwnProperty("display") ? s.display : null,
                            u.style.display = vs("display", i))
                        } catch (k) {
                            q(e, e.return, k)
                        }
                    }
                } else if (m.tag === 6) {
                    if (h === null)
                        try {
                            m.stateNode.nodeValue = c ? "" : m.memoizedProps
                        } catch (k) {
                            q(e, e.return, k)
                        }
                } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
                    m.child.return = m,
                    m = m.child;
                    continue
                }
                if (m === e)
                    break e;
                for (; m.sibling === null; ) {
                    if (m.return === null || m.return === e)
                        break e;
                    h === m && (h = null),
                    m = m.return
                }
                h === m && (h = null),
                m.sibling.return = m.return,
                m = m.sibling
            }
        }
        break;
    case 19:
        Fe(t, e),
        Qe(e),
        r & 4 && Au(e);
        break;
    case 21:
        break;
    default:
        Fe(t, e),
        Qe(e)
    }
}
function Qe(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Va(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(g(160))
            }
            switch (r.tag) {
            case 5:
                var l = r.stateNode;
                r.flags & 32 && (Bn(l, ""),
                r.flags &= -33);
                var o = Ou(e);
                Fo(e, o, l);
                break;
            case 3:
            case 4:
                var i = r.stateNode.containerInfo
                  , u = Ou(e);
                Ao(e, u, i);
                break;
            default:
                throw Error(g(161))
            }
        } catch (s) {
            q(e, e.return, s)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function hd(e, t, n) {
    E = e,
    Qa(e)
}
function Qa(e, t, n) {
    for (var r = (e.mode & 1) !== 0; E !== null; ) {
        var l = E
          , o = l.child;
        if (l.tag === 22 && r) {
            var i = l.memoizedState !== null || xr;
            if (!i) {
                var u = l.alternate
                  , s = u !== null && u.memoizedState !== null || pe;
                u = xr;
                var c = pe;
                if (xr = i,
                (pe = s) && !c)
                    for (E = l; E !== null; )
                        i = E,
                        s = i.child,
                        i.tag === 22 && i.memoizedState !== null ? Uu(l) : s !== null ? (s.return = i,
                        E = s) : Uu(l);
                for (; o !== null; )
                    E = o,
                    Qa(o),
                    o = o.sibling;
                E = l,
                xr = u,
                pe = c
            }
            Fu(e)
        } else
            l.subtreeFlags & 8772 && o !== null ? (o.return = l,
            E = o) : Fu(e)
    }
}
function Fu(e) {
    for (; E !== null; ) {
        var t = E;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        pe || vl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !pe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : $e(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var o = t.updateQueue;
                        o !== null && xu(t, o, r);
                        break;
                    case 3:
                        var i = t.updateQueue;
                        if (i !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            xu(t, i, n)
                        }
                        break;
                    case 5:
                        var u = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = u;
                            var s = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                s.autoFocus && n.focus();
                                break;
                            case "img":
                                s.src && (n.src = s.src)
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
                            var c = t.alternate;
                            if (c !== null) {
                                var h = c.memoizedState;
                                if (h !== null) {
                                    var m = h.dehydrated;
                                    m !== null && Qn(m)
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
                        throw Error(g(163))
                    }
                pe || t.flags & 512 && Oo(t)
            } catch (p) {
                q(t, t.return, p)
            }
        }
        if (t === e) {
            E = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            E = n;
            break
        }
        E = t.return
    }
}
function $u(e) {
    for (; E !== null; ) {
        var t = E;
        if (t === e) {
            E = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            E = n;
            break
        }
        E = t.return
    }
}
function Uu(e) {
    for (; E !== null; ) {
        var t = E;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    vl(4, t)
                } catch (s) {
                    q(t, n, s)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var l = t.return;
                    try {
                        r.componentDidMount()
                    } catch (s) {
                        q(t, l, s)
                    }
                }
                var o = t.return;
                try {
                    Oo(t)
                } catch (s) {
                    q(t, o, s)
                }
                break;
            case 5:
                var i = t.return;
                try {
                    Oo(t)
                } catch (s) {
                    q(t, i, s)
                }
            }
        } catch (s) {
            q(t, t.return, s)
        }
        if (t === e) {
            E = null;
            break
        }
        var u = t.sibling;
        if (u !== null) {
            u.return = t.return,
            E = u;
            break
        }
        E = t.return
    }
}
var vd = Math.ceil
  , nl = it.ReactCurrentDispatcher
  , Ni = it.ReactCurrentOwner
  , Me = it.ReactCurrentBatchConfig
  , R = 0
  , ie = null
  , ne = null
  , se = 0
  , Ce = 0
  , tn = Nt(0)
  , le = 0
  , nr = null
  , $t = 0
  , yl = 0
  , Pi = 0
  , Fn = null
  , we = null
  , Ti = 0
  , hn = 1 / 0
  , Je = null
  , rl = !1
  , $o = null
  , kt = null
  , Er = !1
  , mt = null
  , ll = 0
  , $n = 0
  , Uo = null
  , Ir = -1
  , Rr = 0;
function ve() {
    return R & 6 ? ee() : Ir !== -1 ? Ir : Ir = ee()
}
function St(e) {
    return e.mode & 1 ? R & 2 && se !== 0 ? se & -se : bf.transition !== null ? (Rr === 0 && (Rr = zs()),
    Rr) : (e = F,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : Os(e.type)),
    e) : 1
}
function He(e, t, n, r) {
    if (50 < $n)
        throw $n = 0,
        Uo = null,
        Error(g(185));
    lr(e, n, r),
    (!(R & 2) || e !== ie) && (e === ie && (!(R & 2) && (yl |= n),
    le === 4 && dt(e, se)),
    Ee(e, r),
    n === 1 && R === 0 && !(t.mode & 1) && (hn = ee() + 500,
    pl && Pt()))
}
function Ee(e, t) {
    var n = e.callbackNode;
    qc(e, t);
    var r = Br(e, e === ie ? se : 0);
    if (r === 0)
        n !== null && Gi(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Gi(n),
        t === 1)
            e.tag === 0 ? qf(Bu.bind(null, e)) : ta(Bu.bind(null, e)),
            Xf(function() {
                !(R & 6) && Pt()
            }),
            n = null;
        else {
            switch (Ls(r)) {
            case 1:
                n = ei;
                break;
            case 4:
                n = Ps;
                break;
            case 16:
                n = Ur;
                break;
            case 536870912:
                n = Ts;
                break;
            default:
                n = Ur
            }
            n = ba(n, Ka.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function Ka(e, t) {
    if (Ir = -1,
    Rr = 0,
    R & 6)
        throw Error(g(327));
    var n = e.callbackNode;
    if (sn() && e.callbackNode !== n)
        return null;
    var r = Br(e, e === ie ? se : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = ol(e, r);
    else {
        t = r;
        var l = R;
        R |= 2;
        var o = Xa();
        (ie !== e || se !== t) && (Je = null,
        hn = ee() + 500,
        It(e, t));
        do
            try {
                wd();
                break
            } catch (u) {
                Ya(e, u)
            }
        while (1);
        pi(),
        nl.current = o,
        R = l,
        ne !== null ? t = 0 : (ie = null,
        se = 0,
        t = le)
    }
    if (t !== 0) {
        if (t === 2 && (l = po(e),
        l !== 0 && (r = l,
        t = Bo(e, l))),
        t === 1)
            throw n = nr,
            It(e, 0),
            dt(e, r),
            Ee(e, ee()),
            n;
        if (t === 6)
            dt(e, r);
        else {
            if (l = e.current.alternate,
            !(r & 30) && !yd(l) && (t = ol(e, r),
            t === 2 && (o = po(e),
            o !== 0 && (r = o,
            t = Bo(e, o))),
            t === 1))
                throw n = nr,
                It(e, 0),
                dt(e, r),
                Ee(e, ee()),
                n;
            switch (e.finishedWork = l,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(g(345));
            case 2:
                Lt(e, we, Je);
                break;
            case 3:
                if (dt(e, r),
                (r & 130023424) === r && (t = Ti + 500 - ee(),
                10 < t)) {
                    if (Br(e, 0) !== 0)
                        break;
                    if (l = e.suspendedLanes,
                    (l & r) !== r) {
                        ve(),
                        e.pingedLanes |= e.suspendedLanes & l;
                        break
                    }
                    e.timeoutHandle = So(Lt.bind(null, e, we, Je), t);
                    break
                }
                Lt(e, we, Je);
                break;
            case 4:
                if (dt(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                l = -1; 0 < r; ) {
                    var i = 31 - Ve(r);
                    o = 1 << i,
                    i = t[i],
                    i > l && (l = i),
                    r &= ~o
                }
                if (r = l,
                r = ee() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * vd(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = So(Lt.bind(null, e, we, Je), r);
                    break
                }
                Lt(e, we, Je);
                break;
            case 5:
                Lt(e, we, Je);
                break;
            default:
                throw Error(g(329))
            }
        }
    }
    return Ee(e, ee()),
    e.callbackNode === n ? Ka.bind(null, e) : null
}
function Bo(e, t) {
    var n = Fn;
    return e.current.memoizedState.isDehydrated && (It(e, t).flags |= 256),
    e = ol(e, t),
    e !== 2 && (t = we,
    we = n,
    t !== null && Vo(t)),
    e
}
function Vo(e) {
    we === null ? we = e : we.push.apply(we, e)
}
function yd(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r]
                      , o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!We(o(), l))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function dt(e, t) {
    for (t &= ~Pi,
    t &= ~yl,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Ve(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Bu(e) {
    if (R & 6)
        throw Error(g(327));
    sn();
    var t = Br(e, 0);
    if (!(t & 1))
        return Ee(e, ee()),
        null;
    var n = ol(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = po(e);
        r !== 0 && (t = r,
        n = Bo(e, r))
    }
    if (n === 1)
        throw n = nr,
        It(e, 0),
        dt(e, t),
        Ee(e, ee()),
        n;
    if (n === 6)
        throw Error(g(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Lt(e, we, Je),
    Ee(e, ee()),
    null
}
function zi(e, t) {
    var n = R;
    R |= 1;
    try {
        return e(t)
    } finally {
        R = n,
        R === 0 && (hn = ee() + 500,
        pl && Pt())
    }
}
function Ut(e) {
    mt !== null && mt.tag === 0 && !(R & 6) && sn();
    var t = R;
    R |= 1;
    var n = Me.transition
      , r = F;
    try {
        if (Me.transition = null,
        F = 1,
        e)
            return e()
    } finally {
        F = r,
        Me.transition = n,
        R = t,
        !(R & 6) && Pt()
    }
}
function Li() {
    Ce = tn.current,
    W(tn)
}
function It(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    Yf(n)),
    ne !== null)
        for (n = ne.return; n !== null; ) {
            var r = n;
            switch (ci(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && Kr();
                break;
            case 3:
                pn(),
                W(Se),
                W(me),
                wi();
                break;
            case 5:
                gi(r);
                break;
            case 4:
                pn();
                break;
            case 13:
                W(X);
                break;
            case 19:
                W(X);
                break;
            case 10:
                mi(r.type._context);
                break;
            case 22:
            case 23:
                Li()
            }
            n = n.return
        }
    if (ie = e,
    ne = e = xt(e.current, null),
    se = Ce = t,
    le = 0,
    nr = null,
    Pi = yl = $t = 0,
    we = Fn = null,
    jt !== null) {
        for (t = 0; t < jt.length; t++)
            if (n = jt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var l = r.next
                  , o = n.pending;
                if (o !== null) {
                    var i = o.next;
                    o.next = l,
                    r.next = i
                }
                n.pending = r
            }
        jt = null
    }
    return e
}
function Ya(e, t) {
    do {
        var n = ne;
        try {
            if (pi(),
            Dr.current = tl,
            el) {
                for (var r = G.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null),
                    r = r.next
                }
                el = !1
            }
            if (Ft = 0,
            oe = re = G = null,
            On = !1,
            bn = 0,
            Ni.current = null,
            n === null || n.return === null) {
                le = 1,
                nr = t,
                ne = null;
                break
            }
            e: {
                var o = e
                  , i = n.return
                  , u = n
                  , s = t;
                if (t = se,
                u.flags |= 32768,
                s !== null && typeof s == "object" && typeof s.then == "function") {
                    var c = s
                      , h = u
                      , m = h.tag;
                    if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var p = h.alternate;
                        p ? (h.updateQueue = p.updateQueue,
                        h.memoizedState = p.memoizedState,
                        h.lanes = p.lanes) : (h.updateQueue = null,
                        h.memoizedState = null)
                    }
                    var w = Tu(i);
                    if (w !== null) {
                        w.flags &= -257,
                        zu(w, i, u, o, t),
                        w.mode & 1 && Pu(o, c, t),
                        t = w,
                        s = c;
                        var y = t.updateQueue;
                        if (y === null) {
                            var k = new Set;
                            k.add(s),
                            t.updateQueue = k
                        } else
                            y.add(s);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Pu(o, c, t),
                            Di();
                            break e
                        }
                        s = Error(g(426))
                    }
                } else if (Q && u.mode & 1) {
                    var O = Tu(i);
                    if (O !== null) {
                        !(O.flags & 65536) && (O.flags |= 256),
                        zu(O, i, u, o, t),
                        fi(mn(s, u));
                        break e
                    }
                }
                o = s = mn(s, u),
                le !== 4 && (le = 2),
                Fn === null ? Fn = [o] : Fn.push(o),
                o = i;
                do {
                    switch (o.tag) {
                    case 3:
                        o.flags |= 65536,
                        t &= -t,
                        o.lanes |= t;
                        var f = La(o, s, t);
                        Su(o, f);
                        break e;
                    case 1:
                        u = s;
                        var a = o.type
                          , d = o.stateNode;
                        if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (kt === null || !kt.has(d)))) {
                            o.flags |= 65536,
                            t &= -t,
                            o.lanes |= t;
                            var v = Da(o, u, t);
                            Su(o, v);
                            break e
                        }
                    }
                    o = o.return
                } while (o !== null)
            }
            Za(n)
        } catch (x) {
            t = x,
            ne === n && n !== null && (ne = n = n.return);
            continue
        }
        break
    } while (1)
}
function Xa() {
    var e = nl.current;
    return nl.current = tl,
    e === null ? tl : e
}
function Di() {
    (le === 0 || le === 3 || le === 2) && (le = 4),
    ie === null || !($t & 268435455) && !(yl & 268435455) || dt(ie, se)
}
function ol(e, t) {
    var n = R;
    R |= 2;
    var r = Xa();
    (ie !== e || se !== t) && (Je = null,
    It(e, t));
    do
        try {
            gd();
            break
        } catch (l) {
            Ya(e, l)
        }
    while (1);
    if (pi(),
    R = n,
    nl.current = r,
    ne !== null)
        throw Error(g(261));
    return ie = null,
    se = 0,
    le
}
function gd() {
    for (; ne !== null; )
        Ga(ne)
}
function wd() {
    for (; ne !== null && !Hc(); )
        Ga(ne)
}
function Ga(e) {
    var t = qa(e.alternate, e, Ce);
    e.memoizedProps = e.pendingProps,
    t === null ? Za(e) : ne = t,
    Ni.current = null
}
function Za(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = dd(n, t),
            n !== null) {
                n.flags &= 32767,
                ne = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                le = 6,
                ne = null;
                return
            }
        } else if (n = fd(n, t, Ce),
        n !== null) {
            ne = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            ne = t;
            return
        }
        ne = t = e
    } while (t !== null);
    le === 0 && (le = 5)
}
function Lt(e, t, n) {
    var r = F
      , l = Me.transition;
    try {
        Me.transition = null,
        F = 1,
        kd(e, t, n, r)
    } finally {
        Me.transition = l,
        F = r
    }
    return null
}
function kd(e, t, n, r) {
    do
        sn();
    while (mt !== null);
    if (R & 6)
        throw Error(g(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(g(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (bc(e, o),
    e === ie && (ne = ie = null,
    se = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Er || (Er = !0,
    ba(Ur, function() {
        return sn(),
        null
    })),
    o = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || o) {
        o = Me.transition,
        Me.transition = null;
        var i = F;
        F = 1;
        var u = R;
        R |= 4,
        Ni.current = null,
        md(e, n),
        Wa(n, e),
        Uf(wo),
        Vr = !!go,
        wo = go = null,
        e.current = n,
        hd(n),
        Wc(),
        R = u,
        F = i,
        Me.transition = o
    } else
        e.current = n;
    if (Er && (Er = !1,
    mt = e,
    ll = l),
    o = e.pendingLanes,
    o === 0 && (kt = null),
    Yc(n.stateNode),
    Ee(e, ee()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            l = t[n],
            r(l.value, {
                componentStack: l.stack,
                digest: l.digest
            });
    if (rl)
        throw rl = !1,
        e = $o,
        $o = null,
        e;
    return ll & 1 && e.tag !== 0 && sn(),
    o = e.pendingLanes,
    o & 1 ? e === Uo ? $n++ : ($n = 0,
    Uo = e) : $n = 0,
    Pt(),
    null
}
function sn() {
    if (mt !== null) {
        var e = Ls(ll)
          , t = Me.transition
          , n = F;
        try {
            if (Me.transition = null,
            F = 16 > e ? 16 : e,
            mt === null)
                var r = !1;
            else {
                if (e = mt,
                mt = null,
                ll = 0,
                R & 6)
                    throw Error(g(331));
                var l = R;
                for (R |= 4,
                E = e.current; E !== null; ) {
                    var o = E
                      , i = o.child;
                    if (E.flags & 16) {
                        var u = o.deletions;
                        if (u !== null) {
                            for (var s = 0; s < u.length; s++) {
                                var c = u[s];
                                for (E = c; E !== null; ) {
                                    var h = E;
                                    switch (h.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        An(8, h, o)
                                    }
                                    var m = h.child;
                                    if (m !== null)
                                        m.return = h,
                                        E = m;
                                    else
                                        for (; E !== null; ) {
                                            h = E;
                                            var p = h.sibling
                                              , w = h.return;
                                            if (Ba(h),
                                            h === c) {
                                                E = null;
                                                break
                                            }
                                            if (p !== null) {
                                                p.return = w,
                                                E = p;
                                                break
                                            }
                                            E = w
                                        }
                                }
                            }
                            var y = o.alternate;
                            if (y !== null) {
                                var k = y.child;
                                if (k !== null) {
                                    y.child = null;
                                    do {
                                        var O = k.sibling;
                                        k.sibling = null,
                                        k = O
                                    } while (k !== null)
                                }
                            }
                            E = o
                        }
                    }
                    if (o.subtreeFlags & 2064 && i !== null)
                        i.return = o,
                        E = i;
                    else
                        e: for (; E !== null; ) {
                            if (o = E,
                            o.flags & 2048)
                                switch (o.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    An(9, o, o.return)
                                }
                            var f = o.sibling;
                            if (f !== null) {
                                f.return = o.return,
                                E = f;
                                break e
                            }
                            E = o.return
                        }
                }
                var a = e.current;
                for (E = a; E !== null; ) {
                    i = E;
                    var d = i.child;
                    if (i.subtreeFlags & 2064 && d !== null)
                        d.return = i,
                        E = d;
                    else
                        e: for (i = a; E !== null; ) {
                            if (u = E,
                            u.flags & 2048)
                                try {
                                    switch (u.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        vl(9, u)
                                    }
                                } catch (x) {
                                    q(u, u.return, x)
                                }
                            if (u === i) {
                                E = null;
                                break e
                            }
                            var v = u.sibling;
                            if (v !== null) {
                                v.return = u.return,
                                E = v;
                                break e
                            }
                            E = u.return
                        }
                }
                if (R = l,
                Pt(),
                Xe && typeof Xe.onPostCommitFiberRoot == "function")
                    try {
                        Xe.onPostCommitFiberRoot(sl, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            F = n,
            Me.transition = t
        }
    }
    return !1
}
function Vu(e, t, n) {
    t = mn(n, t),
    t = La(e, t, 1),
    e = wt(e, t, 1),
    t = ve(),
    e !== null && (lr(e, 1, t),
    Ee(e, t))
}
function q(e, t, n) {
    if (e.tag === 3)
        Vu(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Vu(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (kt === null || !kt.has(r))) {
                    e = mn(n, e),
                    e = Da(t, e, 1),
                    t = wt(t, e, 1),
                    e = ve(),
                    t !== null && (lr(t, 1, e),
                    Ee(t, e));
                    break
                }
            }
            t = t.return
        }
}
function Sd(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ve(),
    e.pingedLanes |= e.suspendedLanes & n,
    ie === e && (se & n) === n && (le === 4 || le === 3 && (se & 130023424) === se && 500 > ee() - Ti ? It(e, 0) : Pi |= n),
    Ee(e, t)
}
function Ja(e, t) {
    t === 0 && (e.mode & 1 ? (t = pr,
    pr <<= 1,
    !(pr & 130023424) && (pr = 4194304)) : t = 1);
    var n = ve();
    e = lt(e, t),
    e !== null && (lr(e, t, n),
    Ee(e, n))
}
function xd(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    Ja(e, n)
}
function Ed(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(g(314))
    }
    r !== null && r.delete(t),
    Ja(e, n)
}
var qa;
qa = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Se.current)
            ke = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return ke = !1,
                cd(e, t, n);
            ke = !!(e.flags & 131072)
        }
    else
        ke = !1,
        Q && t.flags & 1048576 && na(t, Gr, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Mr(e, t),
        e = t.pendingProps;
        var l = cn(t, me.current);
        un(t, n),
        l = Si(null, t, r, e, l, n);
        var o = xi();
        return t.flags |= 1,
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        xe(r) ? (o = !0,
        Yr(t)) : o = !1,
        t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
        vi(t),
        l.updater = hl,
        t.stateNode = l,
        l._reactInternals = t,
        To(t, r, e, n),
        t = Do(null, t, r, !0, o, n)) : (t.tag = 0,
        Q && o && ai(t),
        he(null, t, l, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Mr(e, t),
            e = t.pendingProps,
            l = r._init,
            r = l(r._payload),
            t.type = r,
            l = t.tag = _d(r),
            e = $e(r, e),
            l) {
            case 0:
                t = Lo(null, t, r, e, n);
                break e;
            case 1:
                t = ju(null, t, r, e, n);
                break e;
            case 11:
                t = Lu(null, t, r, e, n);
                break e;
            case 14:
                t = Du(null, t, r, $e(r.type, e), n);
                break e
            }
            throw Error(g(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : $e(r, l),
        Lo(e, t, r, l, n);
    case 1:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : $e(r, l),
        ju(e, t, r, l, n);
    case 3:
        e: {
            if (Ra(t),
            e === null)
                throw Error(g(387));
            r = t.pendingProps,
            o = t.memoizedState,
            l = o.element,
            sa(e, t),
            qr(t, r, null, n);
            var i = t.memoizedState;
            if (r = i.element,
            o.isDehydrated)
                if (o = {
                    element: r,
                    isDehydrated: !1,
                    cache: i.cache,
                    pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                    transitions: i.transitions
                },
                t.updateQueue.baseState = o,
                t.memoizedState = o,
                t.flags & 256) {
                    l = mn(Error(g(423)), t),
                    t = Mu(e, t, r, n, l);
                    break e
                } else if (r !== l) {
                    l = mn(Error(g(424)), t),
                    t = Mu(e, t, r, n, l);
                    break e
                } else
                    for (_e = gt(t.stateNode.containerInfo.firstChild),
                    Ne = t,
                    Q = !0,
                    Be = null,
                    n = ia(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (fn(),
                r === l) {
                    t = ot(e, t, n);
                    break e
                }
                he(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return aa(t),
        e === null && _o(t),
        r = t.type,
        l = t.pendingProps,
        o = e !== null ? e.memoizedProps : null,
        i = l.children,
        ko(r, l) ? i = null : o !== null && ko(r, o) && (t.flags |= 32),
        Ia(e, t),
        he(e, t, i, n),
        t.child;
    case 6:
        return e === null && _o(t),
        null;
    case 13:
        return Oa(e, t, n);
    case 4:
        return yi(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = dn(t, null, r, n) : he(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : $e(r, l),
        Lu(e, t, r, l, n);
    case 7:
        return he(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return he(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return he(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            l = t.pendingProps,
            o = t.memoizedProps,
            i = l.value,
            U(Zr, r._currentValue),
            r._currentValue = i,
            o !== null)
                if (We(o.value, i)) {
                    if (o.children === l.children && !Se.current) {
                        t = ot(e, t, n);
                        break e
                    }
                } else
                    for (o = t.child,
                    o !== null && (o.return = t); o !== null; ) {
                        var u = o.dependencies;
                        if (u !== null) {
                            i = o.child;
                            for (var s = u.firstContext; s !== null; ) {
                                if (s.context === r) {
                                    if (o.tag === 1) {
                                        s = tt(-1, n & -n),
                                        s.tag = 2;
                                        var c = o.updateQueue;
                                        if (c !== null) {
                                            c = c.shared;
                                            var h = c.pending;
                                            h === null ? s.next = s : (s.next = h.next,
                                            h.next = s),
                                            c.pending = s
                                        }
                                    }
                                    o.lanes |= n,
                                    s = o.alternate,
                                    s !== null && (s.lanes |= n),
                                    No(o.return, n, t),
                                    u.lanes |= n;
                                    break
                                }
                                s = s.next
                            }
                        } else if (o.tag === 10)
                            i = o.type === t.type ? null : o.child;
                        else if (o.tag === 18) {
                            if (i = o.return,
                            i === null)
                                throw Error(g(341));
                            i.lanes |= n,
                            u = i.alternate,
                            u !== null && (u.lanes |= n),
                            No(i, n, t),
                            i = o.sibling
                        } else
                            i = o.child;
                        if (i !== null)
                            i.return = o;
                        else
                            for (i = o; i !== null; ) {
                                if (i === t) {
                                    i = null;
                                    break
                                }
                                if (o = i.sibling,
                                o !== null) {
                                    o.return = i.return,
                                    i = o;
                                    break
                                }
                                i = i.return
                            }
                        o = i
                    }
            he(e, t, l.children, n),
            t = t.child
        }
        return t;
    case 9:
        return l = t.type,
        r = t.pendingProps.children,
        un(t, n),
        l = Ie(l),
        r = r(l),
        t.flags |= 1,
        he(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        l = $e(r, t.pendingProps),
        l = $e(r.type, l),
        Du(e, t, r, l, n);
    case 15:
        return ja(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : $e(r, l),
        Mr(e, t),
        t.tag = 1,
        xe(r) ? (e = !0,
        Yr(t)) : e = !1,
        un(t, n),
        za(t, r, l),
        To(t, r, l, n),
        Do(null, t, r, !0, e, n);
    case 19:
        return Aa(e, t, n);
    case 22:
        return Ma(e, t, n)
    }
    throw Error(g(156, t.tag))
}
;
function ba(e, t) {
    return Ns(e, t)
}
function Cd(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function je(e, t, n, r) {
    return new Cd(e,t,n,r)
}
function ji(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function _d(e) {
    if (typeof e == "function")
        return ji(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === Jo)
            return 11;
        if (e === qo)
            return 14
    }
    return 2
}
function xt(e, t) {
    var n = e.alternate;
    return n === null ? (n = je(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Or(e, t, n, r, l, o) {
    var i = 2;
    if (r = e,
    typeof e == "function")
        ji(e) && (i = 1);
    else if (typeof e == "string")
        i = 5;
    else
        e: switch (e) {
        case Qt:
            return Rt(n.children, l, o, t);
        case Zo:
            i = 8,
            l |= 8;
            break;
        case Jl:
            return e = je(12, n, t, l | 2),
            e.elementType = Jl,
            e.lanes = o,
            e;
        case ql:
            return e = je(13, n, t, l),
            e.elementType = ql,
            e.lanes = o,
            e;
        case bl:
            return e = je(19, n, t, l),
            e.elementType = bl,
            e.lanes = o,
            e;
        case as:
            return gl(n, l, o, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case us:
                    i = 10;
                    break e;
                case ss:
                    i = 9;
                    break e;
                case Jo:
                    i = 11;
                    break e;
                case qo:
                    i = 14;
                    break e;
                case at:
                    i = 16,
                    r = null;
                    break e
                }
            throw Error(g(130, e == null ? e : typeof e, ""))
        }
    return t = je(i, n, t, l),
    t.elementType = e,
    t.type = r,
    t.lanes = o,
    t
}
function Rt(e, t, n, r) {
    return e = je(7, e, r, t),
    e.lanes = n,
    e
}
function gl(e, t, n, r) {
    return e = je(22, e, r, t),
    e.elementType = as,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function Xl(e, t, n) {
    return e = je(6, e, null, t),
    e.lanes = n,
    e
}
function Gl(e, t, n) {
    return t = je(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Nd(e, t, n, r, l) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = zl(0),
    this.expirationTimes = zl(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = zl(0),
    this.identifierPrefix = r,
    this.onRecoverableError = l,
    this.mutableSourceEagerHydrationData = null
}
function Mi(e, t, n, r, l, o, i, u, s) {
    return e = new Nd(e,t,n,u,s),
    t === 1 ? (t = 1,
    o === !0 && (t |= 8)) : t = 0,
    o = je(3, null, null, t),
    e.current = o,
    o.stateNode = e,
    o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    vi(o),
    e
}
function Pd(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Wt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function ec(e) {
    if (!e)
        return Ct;
    e = e._reactInternals;
    e: {
        if (Vt(e) !== e || e.tag !== 1)
            throw Error(g(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (xe(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(g(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (xe(n))
            return ea(e, n, t)
    }
    return t
}
function tc(e, t, n, r, l, o, i, u, s) {
    return e = Mi(n, r, !0, e, l, o, i, u, s),
    e.context = ec(null),
    n = e.current,
    r = ve(),
    l = St(n),
    o = tt(r, l),
    o.callback = t ?? null,
    wt(n, o, l),
    e.current.lanes = l,
    lr(e, l, r),
    Ee(e, r),
    e
}
function wl(e, t, n, r) {
    var l = t.current
      , o = ve()
      , i = St(l);
    return n = ec(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = tt(o, i),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = wt(l, t, i),
    e !== null && (He(e, l, i, o),
    Lr(e, l, i)),
    i
}
function il(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function Hu(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function Ii(e, t) {
    Hu(e, t),
    (e = e.alternate) && Hu(e, t)
}
function Td() {
    return null
}
var nc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function Ri(e) {
    this._internalRoot = e
}
kl.prototype.render = Ri.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(g(409));
    wl(e, t, null, null)
}
;
kl.prototype.unmount = Ri.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ut(function() {
            wl(null, e, null, null)
        }),
        t[rt] = null
    }
}
;
function kl(e) {
    this._internalRoot = e
}
kl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Ms();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < ft.length && t !== 0 && t < ft[n].priority; n++)
            ;
        ft.splice(n, 0, e),
        n === 0 && Rs(e)
    }
}
;
function Oi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Sl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Wu() {}
function zd(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var o = r;
            r = function() {
                var c = il(i);
                o.call(c)
            }
        }
        var i = tc(t, r, e, 0, null, !1, !1, "", Wu);
        return e._reactRootContainer = i,
        e[rt] = i.current,
        Xn(e.nodeType === 8 ? e.parentNode : e),
        Ut(),
        i
    }
    for (; l = e.lastChild; )
        e.removeChild(l);
    if (typeof r == "function") {
        var u = r;
        r = function() {
            var c = il(s);
            u.call(c)
        }
    }
    var s = Mi(e, 0, !1, null, null, !1, !1, "", Wu);
    return e._reactRootContainer = s,
    e[rt] = s.current,
    Xn(e.nodeType === 8 ? e.parentNode : e),
    Ut(function() {
        wl(t, s, n, r)
    }),
    s
}
function xl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var i = o;
        if (typeof l == "function") {
            var u = l;
            l = function() {
                var s = il(i);
                u.call(s)
            }
        }
        wl(t, i, e, l)
    } else
        i = zd(n, t, e, l, r);
    return il(i)
}
Ds = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = zn(t.pendingLanes);
            n !== 0 && (ti(t, n | 1),
            Ee(t, ee()),
            !(R & 6) && (hn = ee() + 500,
            Pt()))
        }
        break;
    case 13:
        Ut(function() {
            var r = lt(e, 1);
            if (r !== null) {
                var l = ve();
                He(r, e, 1, l)
            }
        }),
        Ii(e, 1)
    }
}
;
ni = function(e) {
    if (e.tag === 13) {
        var t = lt(e, 134217728);
        if (t !== null) {
            var n = ve();
            He(t, e, 134217728, n)
        }
        Ii(e, 134217728)
    }
}
;
js = function(e) {
    if (e.tag === 13) {
        var t = St(e)
          , n = lt(e, t);
        if (n !== null) {
            var r = ve();
            He(n, e, t, r)
        }
        Ii(e, t)
    }
}
;
Ms = function() {
    return F
}
;
Is = function(e, t) {
    var n = F;
    try {
        return F = e,
        t()
    } finally {
        F = n
    }
}
;
ao = function(e, t, n) {
    switch (t) {
    case "input":
        if (no(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var l = dl(r);
                    if (!l)
                        throw Error(g(90));
                    fs(r),
                    no(r, l)
                }
            }
        }
        break;
    case "textarea":
        ps(e, n);
        break;
    case "select":
        t = n.value,
        t != null && nn(e, !!n.multiple, t, !1)
    }
}
;
ks = zi;
Ss = Ut;
var Ld = {
    usingClientEntryPoint: !1,
    Events: [ir, Gt, dl, gs, ws, zi]
}
  , Nn = {
    findFiberByHostInstance: Dt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Dd = {
    bundleType: Nn.bundleType,
    version: Nn.version,
    rendererPackageName: Nn.rendererPackageName,
    rendererConfig: Nn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: it.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = Cs(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Nn.findFiberByHostInstance || Td,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cr.isDisabled && Cr.supportsFiber)
        try {
            sl = Cr.inject(Dd),
            Xe = Cr
        } catch {}
}
Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ld;
Te.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Oi(t))
        throw Error(g(200));
    return Pd(e, t, null, n)
}
;
Te.createRoot = function(e, t) {
    if (!Oi(e))
        throw Error(g(299));
    var n = !1
      , r = ""
      , l = nc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    t = Mi(e, 1, !1, null, null, n, !1, r, l),
    e[rt] = t.current,
    Xn(e.nodeType === 8 ? e.parentNode : e),
    new Ri(t)
}
;
Te.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(g(188)) : (e = Object.keys(e).join(","),
        Error(g(268, e)));
    return e = Cs(t),
    e = e === null ? null : e.stateNode,
    e
}
;
Te.flushSync = function(e) {
    return Ut(e)
}
;
Te.hydrate = function(e, t, n) {
    if (!Sl(t))
        throw Error(g(200));
    return xl(null, e, t, !0, n)
}
;
Te.hydrateRoot = function(e, t, n) {
    if (!Oi(e))
        throw Error(g(405));
    var r = n != null && n.hydratedSources || null
      , l = !1
      , o = ""
      , i = nc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0),
    n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    t = tc(t, null, e, 1, n ?? null, l, !1, o, i),
    e[rt] = t.current,
    Xn(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            l = n._getVersion,
            l = l(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new kl(t)
}
;
Te.render = function(e, t, n) {
    if (!Sl(t))
        throw Error(g(200));
    return xl(null, e, t, !1, n)
}
;
Te.unmountComponentAtNode = function(e) {
    if (!Sl(e))
        throw Error(g(40));
    return e._reactRootContainer ? (Ut(function() {
        xl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[rt] = null
        })
    }),
    !0) : !1
}
;
Te.unstable_batchedUpdates = zi;
Te.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Sl(n))
        throw Error(g(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(g(38));
    return xl(e, t, n, !1, r)
}
;
Te.version = "18.3.1-next-f1338f8080-20240426";
function rc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rc)
        } catch (e) {
            console.error(e)
        }
}
rc(),
rs.exports = Te;
var jd = rs.exports, Md, Qu = jd;
Md = Qu.createRoot,
Qu.hydrateRoot;
const Id = ({isOpen: e, onClose: t, commentContent: n, onSubmit: r}) => {
    const [l,o] = te.useState("")
      , [i,u] = te.useState("")
      , [s,c] = te.useState("")
      , [h,m] = te.useState("")
      , [p,w] = te.useState(!1)
      , [y,k] = te.useState(!1)
      , [O,f] = te.useState(!1)
      , [a,d] = te.useState(!1);
    te.useEffect( () => {
        e && n && (o(n),
        v(n))
    }
    , [e, n]),
    te.useEffect( () => {
        e || (o(""),
        u(""),
        c(""),
        m(""))
    }
    , [e]),
    te.useEffect( () => {
        const N = () => {
            var B;
            const J = ((B = document.querySelector('faceplate-switch-input[name="darkmode-switch-name"]')) == null ? void 0 : B.hasAttribute("checked")) || document.documentElement.classList.contains("theme-dark") || document.documentElement.getAttribute("data-theme") === "dark" || document.body.classList.contains("dark-mode") || localStorage.getItem("darkMode") === "true";
            d(J)
        }
        ;
        N();
        const A = new MutationObserver(J => {
            for (const B of J) {
                if (B.target instanceof Element && (B.target.matches('faceplate-switch-input[name="darkmode-switch-name"]') || B.target.closest('faceplate-switch-input[name="darkmode-switch-name"]'))) {
                    N();
                    break
                }
                if (B.target instanceof Element && (B.target === document.documentElement || B.target === document.body)) {
                    N();
                    break
                }
            }
        }
        );
        A.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["class", "data-theme"],
            subtree: !0,
            childList: !0
        });
        const Y = J => {
            J.key === "darkMode" && N()
        }
        ;
        return window.addEventListener("storage", Y),
        () => {
            A.disconnect(),
            window.removeEventListener("storage", Y)
        }
    }
    , []);
    const v = async N => {
        var A, Y, J, B;
        try {
            k(!0),
            u("");
            const V = await chrome.storage.sync.get(["settings"]);
            console.log("InteractionModal: settings loaded:", V);
            const D = V.settings || El;
            console.log("InteractionModal: currentSettings:", D);
            const M = D.models.find(b => b.model === D.selectedModel);
            if (!M)
                throw new Error("未选择翻译模型");
            if (M.provider === "openai" && !D.openaiApiKey)
                throw new Error("请先配置 OpenAI API 密钥");
            if (M.provider === "ali" && !D.aliApiKey)
                throw new Error("请先配置阿里通义 API 密钥");
            const S = `你是一个专业的翻译助手，精通中英文互译。请将内容翻译成优质的中文。翻译时请遵循"信达雅"三原则：

      信：
      - 准确传达原文的核心信息和细节
      - 保持专业术语的准确性
      - 不遗漏、不添加、不曲解原意
      
      达：
      - 符合中文的表达习惯和思维方式
      - 让译文流畅自然，易于理解
      - 适当本地化英文俚语和习语
      - 保留 Reddit 社区特有的轻松活泼语气
      
      雅：
      - 选用恰当得体的措辞
      - 根据语境调整表达的格调
      - 在口语化和书面语之间找到平衡
      - 保持文体的连贯性和优美性

      其他注意事项：
      - 保持原文的段落结构和格式
      - 保留表情符号和特殊标记
      - 对于文化相关内容，在准确的基础上做适当调整
      - 避免生硬的直译和机械的对应`
              , T = {
                openai: {
                    url: M.apiUrl || "https://api.openai.com/v1/chat/completions",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${D.openaiApiKey}`
                    },
                    body: {
                        model: M.model,
                        messages: [{
                            role: "system",
                            content: S
                        }, {
                            role: "user",
                            content: N
                        }],
                        temperature: M.temperature || .7,
                        max_tokens: M.maxTokens || 2e3,
                        stream: !0
                    }
                },
                ali: {
                    url: M.apiUrl || "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${D.aliApiKey}`
                    },
                    body: {
                        model: M.model,
                        messages: [{
                            role: "system",
                            content: S
                        }, {
                            role: "user",
                            content: N
                        }],
                        temperature: M.temperature || .7,
                        max_tokens: M.maxTokens || 2e3,
                        stream: !0
                    }
                }
            }[M.provider];
            if (!T)
                throw new Error(`不支持的模型提供商: ${M.provider}`);
            console.log("Translation request config:", T);
            const I = await fetch(T.url, {
                method: "POST",
                headers: {
                    ...T.headers,
                    Accept: "text/event-stream"
                },
                body: JSON.stringify(T.body)
            });
            if (!I.ok) {
                const b = await I.text();
                throw new Error(`翻译请求失败: ${I.status} ${b}`)
            }
            const $ = (A = I.body) == null ? void 0 : A.getReader();
            if (!$)
                throw new Error("无法读取响应流");
            let ce = "";
            for (; ; ) {
                const {done: b, value: ut} = await $.read();
                if (b)
                    break;
                const Ae = new TextDecoder().decode(ut).split(`
`);
                for (const Ze of Ae)
                    if (Ze.startsWith("data: "))
                        try {
                            const Tt = JSON.parse(Ze.slice(5));
                            (B = (J = (Y = Tt.choices) == null ? void 0 : Y[0]) == null ? void 0 : J.delta) != null && B.content && (ce += Tt.choices[0].delta.content,
                            u(ce))
                        } catch {}
            }
        } catch (V) {
            console.error("翻译失败:", V);
            const D = V instanceof Error ? V.message : "未知错误";
            u(`翻译出错: ${D}`)
        } finally {
            k(!1)
        }
    }
      , x = async N => {
        var A, Y, J, B;
        try {
            w(!0),
            m("");
            const V = await chrome.storage.sync.get(["settings"]);
            console.log("InteractionModal: settings loaded:", V);
            const D = V.settings || El;
            console.log("InteractionModal: currentSettings:", D);
            const M = D.models.find(b => b.model === D.selectedModel);
            if (!M)
                throw new Error("未选择翻译模型");
            if (M.provider === "openai" && !D.openaiApiKey)
                throw new Error("请先配置 OpenAI API 密钥");
            if (M.provider === "ali" && !D.aliApiKey)
                throw new Error("请先配置阿里通义 API 密钥");
            const S = `你是一个专业的翻译助手，精通中英文互译。请将中文内容翻译成地道的英文。只输出翻译结果，不要输出任何其他内容。翻译时请遵循以下原则：

      - 完整准确地传达原文的信息和情感
      - 保持专业术语的准确性
      - 忠实原文，不随意增删改
      - 符合英文的表达习惯和思维逻辑
      - 使用地道的英文表达方式
      - 适当使用 Reddit 平台常见的表达方式
      - 根据语境选择合适的口语化程度
      - 适当运用英语中的修辞手法
      - 注意语气和语调的把握
      - 保持文体风格的一致性
      - 适度使用 Reddit 常见的网络用语和缩写
      - 保持评论的结构和格式
      - 对于中国特色的表达，寻找恰当的英文对应
      - 确保译文读起来自然流畅，像 native speaker 的表达

      记住：只输出翻译结果，不要有任何其他解释、说明或备注。`
              , T = {
                openai: {
                    url: M.apiUrl || "https://api.openai.com/v1/chat/completions",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${D.openaiApiKey}`
                    },
                    body: {
                        model: M.model,
                        messages: [{
                            role: "system",
                            content: S
                        }, {
                            role: "user",
                            content: N
                        }],
                        temperature: M.temperature || .7,
                        max_tokens: M.maxTokens || 2e3,
                        stream: !0
                    }
                },
                ali: {
                    url: M.apiUrl || "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${D.aliApiKey}`
                    },
                    body: {
                        model: M.model,
                        messages: [{
                            role: "system",
                            content: S
                        }, {
                            role: "user",
                            content: N
                        }],
                        temperature: M.temperature || .7,
                        max_tokens: M.maxTokens || 2e3,
                        stream: !0
                    }
                }
            }[M.provider];
            if (!T)
                throw new Error(`不支持的模型提供商: ${M.provider}`);
            console.log("Translation request config:", T);
            const I = await fetch(T.url, {
                method: "POST",
                headers: {
                    ...T.headers,
                    Accept: "text/event-stream"
                },
                body: JSON.stringify(T.body)
            });
            if (!I.ok) {
                const b = await I.text();
                throw new Error(`翻译请求失败: ${I.status} ${b}`)
            }
            const $ = (A = I.body) == null ? void 0 : A.getReader();
            if (!$)
                throw new Error("无法读取响应流");
            let ce = "";
            for (; ; ) {
                const {done: b, value: ut} = await $.read();
                if (b)
                    break;
                const Ae = new TextDecoder().decode(ut).split(`
`);
                for (const Ze of Ae)
                    if (Ze.startsWith("data: "))
                        try {
                            const Tt = JSON.parse(Ze.slice(5));
                            (B = (J = (Y = Tt.choices) == null ? void 0 : Y[0]) == null ? void 0 : J.delta) != null && B.content && (ce += Tt.choices[0].delta.content,
                            m(ce))
                        } catch {}
            }
        } catch (V) {
            console.error("翻译失败:", V);
            const D = V instanceof Error ? V.message : "未知错误";
            m(`翻译出错: ${D}`)
        } finally {
            w(!1)
        }
    }
      , C = ( (N, A) => {
        const Y = kc.useRef();
        return te.useEffect( () => () => {
            Y.current && clearTimeout(Y.current)
        }
        , []),
        te.useCallback( (...J) => {
            Y.current && clearTimeout(Y.current),
            Y.current = setTimeout( () => {
                N(...J)
            }
            , A)
        }
        , [N, A])
    }
    )(N => {
        N.trim() ? x(N) : m("")
    }
    , 1e3)
      , P = N => {
        const A = N.target.value;
        c(A),
        C(A)
    }
      , K = async () => {
        var N, A, Y, J;
        try {
            f(!0);
            const B = await chrome.storage.sync.get(["settings"]);
            console.log("InteractionModal: settings loaded:", B);
            const V = B.settings || El;
            console.log("InteractionModal: currentSettings:", V);
            const D = V.models.find(ce => ce.model === V.selectedModel);
            if (!D)
                throw new Error("未选择翻译模型");
            if (D.provider === "openai" && !V.openaiApiKey)
                throw new Error("请先配置 OpenAI API 密钥");
            if (D.provider === "ali" && !V.aliApiKey)
                throw new Error("请先配置阿里通义 API 密钥");
            const M = `你是一个 Reddit 用户。请以一个普通用户的身份，针对内容写一个自然的中文评论。要求：

      - 用口语化的表达，就像在跟朋友随意聊天
      - 可以分享个人经历和感受，但要简短自然
      - 可以开玩笑，但不要太过刻意或夸张
      - 适当表达赞同或质疑，但语气要平和
      - 重点是真实和自然，不要过分修饰
      - 避免说教或过于正式的语气
      - 可以用一些网络用语，但要适度
      - 保持评论简短，不要长篇大论
      
      记住：你就是一个普通用户，用最自然的语气写评论。不要让人感觉这是AI生成的内容。`
              , L = {
                openai: {
                    url: D.apiUrl || "https://api.openai.com/v1/chat/completions",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${V.openaiApiKey}`
                    },
                    body: {
                        model: D.model,
                        messages: [{
                            role: "system",
                            content: M
                        }, {
                            role: "user",
                            content: `请针对以下内容生成一个中文评论：

${l}`
                        }],
                        temperature: D.temperature || .7,
                        max_tokens: D.maxTokens || 2e3,
                        stream: !0
                    }
                },
                ali: {
                    url: D.apiUrl || "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${V.aliApiKey}`
                    },
                    body: {
                        model: D.model,
                        messages: [{
                            role: "system",
                            content: M
                        }, {
                            role: "user",
                            content: `请针对以下内容生成一个中文评论：

${l}`
                        }],
                        temperature: D.temperature || .7,
                        max_tokens: D.maxTokens || 2e3,
                        stream: !0
                    }
                }
            }[D.provider];
            if (!L)
                throw new Error(`不支持的模型提供商: ${D.provider}`);
            console.log("Generate comment request config:", L);
            const T = await fetch(L.url, {
                method: "POST",
                headers: {
                    ...L.headers,
                    Accept: "text/event-stream"
                },
                body: JSON.stringify(L.body)
            });
            if (!T.ok) {
                const ce = await T.text();
                throw new Error(`生成评论失败: ${T.status} ${ce}`)
            }
            const I = (N = T.body) == null ? void 0 : N.getReader();
            if (!I)
                throw new Error("无法读取响应流");
            let $ = "";
            for (; ; ) {
                const {done: ce, value: b} = await I.read();
                if (ce)
                    break;
                const Oe = new TextDecoder().decode(b).split(`
`);
                for (const Ae of Oe)
                    if (Ae.startsWith("data: "))
                        try {
                            const Ze = JSON.parse(Ae.slice(5));
                            (J = (Y = (A = Ze.choices) == null ? void 0 : A[0]) == null ? void 0 : Y.delta) != null && J.content && ($ += Ze.choices[0].delta.content,
                            c($))
                        } catch {}
            }
            x($)
        } catch (B) {
            console.error("生成评论失败:", B);
            const V = B instanceof Error ? B.message : "未知错误";
            c(`生成评论失败: ${V}`)
        } finally {
            f(!1)
        }
    }
    ;
    return e ? z.jsx("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]",
        children: z.jsxs("div", {
            className: `rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar
        ${a ? "bg-[#1A1A1B] text-[#D7DADC] border border-[#343536]" : "bg-white text-[#1A1A1B]"}`,
            children: [z.jsxs("div", {
                className: "flex justify-between items-center mb-4",
                children: [z.jsx("h2", {
                    className: `text-xl font-bold ${a ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
                    children: "互动回复"
                }), z.jsx("button", {
                    onClick: t,
                    className: `hover:bg-opacity-20 rounded p-1 
              ${a ? "text-[#818384] hover:bg-[#D7DADC]" : "text-gray-500 hover:bg-gray-200"}`,
                    children: "✕"
                })]
            }), z.jsxs("div", {
                className: "mb-4",
                children: [z.jsx("h3", {
                    className: `font-bold mb-2 ${a ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
                    children: "原评论"
                }), z.jsx("div", {
                    className: `p-3 rounded ${a ? "bg-[#272729]" : "bg-gray-50"}`,
                    children: l
                })]
            }), z.jsxs("div", {
                className: "mb-4",
                children: [z.jsx("h3", {
                    className: `font-bold mb-2 ${a ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
                    children: "中文翻译"
                }), z.jsx("div", {
                    className: `p-3 rounded ${a ? "bg-[#272729]" : "bg-gray-50"}`,
                    children: y ? z.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [z.jsx("span", {
                            children: i
                        }), z.jsx("span", {
                            className: `inline-block w-2 h-2 rounded-full animate-pulse
                  ${a ? "bg-[#4F88E5]" : "bg-blue-500"}`
                        })]
                    }) : i
                })]
            }), z.jsxs("div", {
                className: "mb-4",
                children: [z.jsxs("div", {
                    className: "flex justify-between items-center mb-2",
                    children: [z.jsx("h3", {
                        className: `font-bold ${a ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
                        children: "你的回复（中文）"
                    }), z.jsx("button", {
                        onClick: K,
                        disabled: O,
                        className: `px-3 py-1 text-sm rounded transition-colors flex items-center space-x-1
                ${a ? "bg-[#4F88E5] hover:bg-[#3F78D5] disabled:bg-[#343536]" : "bg-green-500 hover:bg-green-600 disabled:bg-gray-300"} 
                text-white disabled:cursor-not-allowed`,
                        children: O ? z.jsxs(z.Fragment, {
                            children: [z.jsxs("svg", {
                                className: "animate-spin h-4 w-4 mr-1",
                                viewBox: "0 0 24 24",
                                children: [z.jsx("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                    fill: "none"
                                }), z.jsx("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                })]
                            }), z.jsx("span", {
                                children: "生成中..."
                            })]
                        }) : z.jsxs(z.Fragment, {
                            children: [z.jsx("svg", {
                                className: "w-4 h-4 mr-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: z.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                })
                            }), z.jsx("span", {
                                children: "AI生成"
                            })]
                        })
                    }), z.jsx("div", {
                        className: "absolute right-0 top-full mt-2 w-48 bg-yellow-50 border border-yellow-200 p-2 rounded text-xs text-yellow-700 hidden group-hover:block",
                        children: "AI生成的内容仅供参考，建议根据实际情况修改后再发布"
                    })]
                }), z.jsxs("div", {
                    className: `mb-3 p-3 rounded text-sm
            ${a ? "bg-[#342E1A] border border-[#4D4D1A] text-[#E8B339]" : "bg-yellow-50 border border-yellow-200 text-yellow-700"}`,
                    children: ["⚠️ 请注意：AI生成的评论可能缺乏个性化和真实性。建议：", z.jsxs("ul", {
                        className: "list-disc ml-4 mt-1",
                        children: [z.jsx("li", {
                            children: "仅作为写作灵感和参考"
                        }), z.jsx("li", {
                            children: "根据个人观点和经历修改内容"
                        }), z.jsx("li", {
                            children: "确保评论真实反映您的想法"
                        })]
                    })]
                }), z.jsx("textarea", {
                    className: `w-full p-2 rounded mb-2 
              ${a ? "bg-[#272729] border-[#343536] text-[#D7DADC] focus:border-[#4F88E5]" : "bg-white border-gray-300 focus:border-blue-500"} 
              border focus:ring-1 focus:ring-opacity-50`,
                    rows: 4,
                    value: s,
                    onChange: P,
                    placeholder: "请输入中文回复..."
                })]
            }), z.jsxs("div", {
                className: "mb-4",
                children: [z.jsx("h3", {
                    className: `font-bold mb-2 ${a ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
                    children: "英文预览"
                }), z.jsx("div", {
                    className: `p-3 rounded ${a ? "bg-[#272729]" : "bg-gray-50"}`,
                    children: p ? "翻译中..." : h
                })]
            }), z.jsxs("div", {
                className: "flex justify-end gap-2",
                children: [z.jsx("button", {
                    onClick: t,
                    className: `px-4 py-2 rounded transition-colors
              ${a ? "border-[#343536] hover:bg-[#272729] text-[#D7DADC]" : "border hover:bg-gray-50 text-[#1A1A1B]"}`,
                    children: "取消"
                }), z.jsx("button", {
                    onClick: () => r(h),
                    disabled: !h || p,
                    className: `px-4 py-2 rounded transition-colors
              ${a ? "bg-[#4F88E5] hover:bg-[#3F78D5] disabled:bg-[#343536]" : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"}
              text-white disabled:cursor-not-allowed`,
                    children: "应用翻译"
                })]
            })]
        })
    }) : null
}
  , Od = ({commentId: e, authorName: t}) => {
    const [n,r] = te.useState(!1)
      , [l,o] = te.useState("")
      , [i,u] = te.useState(!1);
    te.useEffect( () => {
        const h = () => {
            var y;
            const w = ((y = document.querySelector('faceplate-switch-input[name="darkmode-switch-name"]')) == null ? void 0 : y.hasAttribute("checked")) || document.documentElement.classList.contains("theme-dark") || document.documentElement.getAttribute("data-theme") === "dark" || document.body.classList.contains("dark-mode") || localStorage.getItem("darkMode") === "true";
            u(w)
        }
        ;
        h();
        const m = new MutationObserver(w => {
            for (const y of w) {
                if (y.target instanceof Element && (y.target.matches('faceplate-switch-input[name="darkmode-switch-name"]') || y.target.closest('faceplate-switch-input[name="darkmode-switch-name"]'))) {
                    h();
                    break
                }
                if (y.target instanceof Element && (y.target === document.documentElement || y.target === document.body)) {
                    h();
                    break
                }
            }
        }
        );
        m.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["class", "data-theme"],
            subtree: !0,
            childList: !0
        });
        const p = w => {
            w.key === "darkMode" && h()
        }
        ;
        return window.addEventListener("storage", p),
        () => {
            m.disconnect(),
            window.removeEventListener("storage", p)
        }
    }
    , []);
    const s = () => {
        var w, y;
        const h = document.querySelector(`shreddit-comment-action-row[comment-id="${e}"]`)
          , m = (w = h == null ? void 0 : h.closest("shreddit-comment")) == null ? void 0 : w.querySelector(".md")
          , p = ((y = m == null ? void 0 : m.textContent) == null ? void 0 : y.trim()) || "";
        p ? (o(p),
        r(!0)) : console.error("无法找到评论内容")
    }
      , c = async h => {
        try {
            const m = document.querySelector(`shreddit-comment-action-row[comment-id="${e}"]`)
              , p = m == null ? void 0 : m.querySelector('[slot="comment-reply"] button');
            if (p && p instanceof HTMLElement) {
                p.click(),
                await new Promise(d => setTimeout(d, 1e3));
                const w = m == null ? void 0 : m.closest("shreddit-comment")
                  , y = w == null ? void 0 : w.querySelector("shreddit-composer");
                if (!y)
                    throw new Error("找不到评论编辑器");
                y.removeAttribute("aria-disabled"),
                y.removeAttribute("aria-readonly");
                const k = y.querySelector('div[slot="rte"][contenteditable="true"]');
                if (!k || !(k instanceof HTMLElement))
                    throw new Error("找不到评论框");
                k.setAttribute("contenteditable", "true"),
                k.setAttribute("aria-disabled", "false"),
                k.removeAttribute("disabled"),
                k.removeAttribute("readonly"),
                k.focus(),
                await new Promise(d => setTimeout(d, 100));
                const O = document.createElement("p");
                O.className = "first:mt-0 last:mb-0",
                O.textContent = h.trim(),
                k.innerHTML = "",
                k.appendChild(O);
                const f = [new FocusEvent("focus",{
                    bubbles: !0
                }), new MouseEvent("click",{
                    bubbles: !0
                }), new InputEvent("beforeinput",{
                    bubbles: !0,
                    cancelable: !0,
                    data: h
                }), new InputEvent("input",{
                    bubbles: !0,
                    cancelable: !0,
                    data: h
                }), new Event("change",{
                    bubbles: !0
                })];
                for (const d of f)
                    k.dispatchEvent(d),
                    await new Promise(v => setTimeout(v, 50));
                k.focus();
                const a = y.querySelector('button[type="submit"]');
                a instanceof HTMLElement && (a.removeAttribute("disabled"),
                a.classList.remove("disabled"))
            }
            r(!1)
        } catch (m) {
            console.error("提交评论失败:", m)
        }
    }
    ;
    return z.jsxs(z.Fragment, {
        children: [z.jsxs("button", {
            className: `interaction-button flex items-center px-2 h-6 rounded transition-colors
          ${i ? "text-[#D7DADC]" : "text-[#1A1A1B]"}`,
            onClick: s,
            style: {
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: "normal",
                background: "transparent"
            },
            children: [z.jsxs("svg", {
                className: "w-4 h-4 mr-1",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg",
                children: [z.jsx("path", {
                    d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                }), z.jsx("path", {
                    d: "M2.5 10a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
                })]
            }), z.jsx("span", {
                className: "text-xs",
                children: "互动"
            })]
        }), z.jsx(Id, {
            isOpen: n,
            onClose: () => r(!1),
            commentContent: l,
            onSubmit: c
        })]
    })
}
;
export {Od as I, Md as c, z as j, te as r};