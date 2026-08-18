
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.0";globalThis.nextVersion = "14.2.35";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o](i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], f = true, u = 0; u < o.length; u++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (f = false, i < a && (a = i));
            if (f) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, f] = o2, u = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (f) var s = f(t);
          }
          for (r3 && r3(o2); u < l.length; u++) i = l[u], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 67: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 468: () => {
    }, 713: (e, t, r) => {
      "use strict";
      let n, i, o, a, s, c, l;
      r.r(t), r.d(t, { default: () => cT });
      var u, d, p = {};
      r.r(p), r.d(p, { parse: () => n_, serialize: () => nk });
      var h = {};
      async function f() {
        let e10 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e10) try {
          await e10();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      r.r(h), r.d(h, { config: () => ck, default: () => cx });
      let g = null;
      function m() {
        return g || (g = f()), g;
      }
      function y(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Error(y(e10));
        }, construct() {
          throw Error(y(e10));
        }, apply(r10, n10, i10) {
          if ("function" == typeof i10[0]) return i10[0](t10);
          throw Error(y(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), m();
      class w extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class b extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class v extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let _ = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      function S(e10) {
        var t10, r10, n10, i10, o10, a10 = [], s10 = 0;
        function c2() {
          for (; s10 < e10.length && /\s/.test(e10.charAt(s10)); ) s10 += 1;
          return s10 < e10.length;
        }
        for (; s10 < e10.length; ) {
          for (t10 = s10, o10 = false; c2(); ) if ("," === (r10 = e10.charAt(s10))) {
            for (n10 = s10, s10 += 1, c2(), i10 = s10; s10 < e10.length && "=" !== (r10 = e10.charAt(s10)) && ";" !== r10 && "," !== r10; ) s10 += 1;
            s10 < e10.length && "=" === e10.charAt(s10) ? (o10 = true, s10 = i10, a10.push(e10.substring(t10, n10)), t10 = s10) : s10 = n10 + 1;
          } else s10 += 1;
          (!o10 || s10 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function x(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...S(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function k(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ..._, GROUP: { serverOnly: [_.reactServerComponents, _.actionBrowser, _.appMetadataRoute, _.appRouteHandler, _.instrument], clientOnly: [_.serverSideRendering, _.appPagesBrowser], nonClientServerTarget: [_.middleware, _.api], app: [_.reactServerComponents, _.actionBrowser, _.appMetadataRoute, _.appRouteHandler, _.serverSideRendering, _.appPagesBrowser, _.shared, _.instrument] } });
      let E = Symbol("response"), A = Symbol("passThrough"), P = Symbol("waitUntil");
      class T {
        constructor(e10) {
          this[P] = [], this[A] = false;
        }
        respondWith(e10) {
          this[E] || (this[E] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[A] = true;
        }
        waitUntil(e10) {
          this[P].push(e10);
        }
      }
      class C extends T {
        constructor(e10) {
          super(e10.request), this.sourcePage = e10.page;
        }
        get request() {
          throw new w({ page: this.sourcePage });
        }
        respondWith() {
          throw new w({ page: this.sourcePage });
        }
      }
      function R(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function O(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function N(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = O(e10);
        return "" + t10 + r10 + n10 + i10;
      }
      function I(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = O(e10);
        return "" + r10 + t10 + n10 + i10;
      }
      function U(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = O(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function L(e10, t10) {
        let r10;
        let n10 = e10.split("/");
        return (t10 || []).some((t11) => !!n10[1] && n10[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, n10.splice(1, 1), e10 = n10.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let $ = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function M(e10, t10) {
        return new URL(String(e10).replace($, "localhost"), t10 && String(t10).replace($, "localhost"));
      }
      let D = Symbol("NextURLInternal");
      class j {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[D] = { url: M(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let o10 = function(e11, t11) {
            var r11, n11;
            let { basePath: i11, i18n: o11, trailingSlash: a11 } = null != (r11 = t11.nextConfig) ? r11 : {}, s11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a11 };
            i11 && U(s11.pathname, i11) && (s11.pathname = function(e12, t12) {
              if (!U(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(s11.pathname, i11), s11.basePath = i11);
            let c2 = s11.pathname;
            if (s11.pathname.startsWith("/_next/data/") && s11.pathname.endsWith(".json")) {
              let e12 = s11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              s11.buildId = r12, c2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (s11.pathname = c2);
            }
            if (o11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(s11.pathname) : L(s11.pathname, o11.locales);
              s11.locale = e12.detectedLocale, s11.pathname = null != (n11 = e12.pathname) ? n11 : s11.pathname, !e12.detectedLocale && s11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(c2) : L(c2, o11.locales)).detectedLocale && (s11.locale = e12.detectedLocale);
            }
            return s11;
          }(this[D].url.pathname, { nextConfig: this[D].options.nextConfig, parseData: true, i18nProvider: this[D].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[D].url, this[D].options.headers);
          this[D].domainLocale = this[D].options.i18nProvider ? this[D].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) for (let o11 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, i11;
              if (t11 === (null == (n11 = o11.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === o11.defaultLocale.toLowerCase() || (null == (i11 = o11.locales) ? void 0 : i11.some((e12) => e12.toLowerCase() === r11))) return o11;
            }
          }(null == (t10 = this[D].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let s10 = (null == (r10 = this[D].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[D].options.nextConfig) ? void 0 : null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[D].url.pathname = o10.pathname, this[D].defaultLocale = s10, this[D].basePath = o10.basePath ?? "", this[D].buildId = o10.buildId, this[D].locale = o10.locale ?? s10, this[D].trailingSlash = o10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (U(i10, "/api") || U(i10, "/" + t11.toLowerCase())) ? e11 : N(e11, "/" + t11);
          }((e10 = { basePath: this[D].basePath, buildId: this[D].buildId, defaultLocale: this[D].options.forceLocale ? void 0 : this[D].defaultLocale, locale: this[D].locale, pathname: this[D].url.pathname, trailingSlash: this[D].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = R(t10)), e10.buildId && (t10 = I(N(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = N(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : I(t10, "/") : R(t10);
        }
        formatSearch() {
          return this[D].url.search;
        }
        get buildId() {
          return this[D].buildId;
        }
        set buildId(e10) {
          this[D].buildId = e10;
        }
        get locale() {
          return this[D].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[D].locale || !(null == (r10 = this[D].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[D].locale = e10;
        }
        get defaultLocale() {
          return this[D].defaultLocale;
        }
        get domainLocale() {
          return this[D].domainLocale;
        }
        get searchParams() {
          return this[D].url.searchParams;
        }
        get host() {
          return this[D].url.host;
        }
        set host(e10) {
          this[D].url.host = e10;
        }
        get hostname() {
          return this[D].url.hostname;
        }
        set hostname(e10) {
          this[D].url.hostname = e10;
        }
        get port() {
          return this[D].url.port;
        }
        set port(e10) {
          this[D].url.port = e10;
        }
        get protocol() {
          return this[D].url.protocol;
        }
        set protocol(e10) {
          this[D].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[D].url = M(e10), this.analyze();
        }
        get origin() {
          return this[D].url.origin;
        }
        get pathname() {
          return this[D].url.pathname;
        }
        set pathname(e10) {
          this[D].url.pathname = e10;
        }
        get hash() {
          return this[D].url.hash;
        }
        set hash(e10) {
          this[D].url.hash = e10;
        }
        get search() {
          return this[D].url.search;
        }
        set search(e10) {
          this[D].url.search = e10;
        }
        get password() {
          return this[D].url.password;
        }
        set password(e10) {
          this[D].url.password = e10;
        }
        get username() {
          return this[D].url.username;
        }
        set username(e10) {
          this[D].url.username = e10;
        }
        get basePath() {
          return this[D].basePath;
        }
        set basePath(e10) {
          this[D].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new j(String(this), this[D].options);
        }
      }
      var H = r(945);
      let W = Symbol("internal request");
      class B extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          k(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new j(r10, { headers: x(this.headers), nextConfig: t10.nextConfig });
          this[W] = { cookies: new H.RequestCookies(this.headers), geo: t10.geo || {}, ip: t10.ip, nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[W].cookies;
        }
        get geo() {
          return this[W].geo;
        }
        get ip() {
          return this[W].ip;
        }
        get nextUrl() {
          return this[W].nextUrl;
        }
        get page() {
          throw new b();
        }
        get ua() {
          throw new v();
        }
        get url() {
          return this[W].url;
        }
      }
      class q {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let K = Symbol("internal response"), V = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function J(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class F extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n10 = new Proxy(new H.ResponseCookies(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let o10 = Reflect.apply(e11[n11], e11, i11), a10 = new Headers(r10);
                  return o10 instanceof H.ResponseCookies && r10.set("x-middleware-set-cookie", o10.getAll().map((e12) => (0, H.stringifyCookie)(e12)).join(",")), J(t10, a10), o10;
                };
              default:
                return q.get(e11, n11, i10);
            }
          } });
          this[K] = { cookies: n10, url: t10.url ? new j(t10.url, { headers: x(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[K].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new F(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!V.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", k(e10)), new F(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", k(e10)), J(t10, r10), new F(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), J(e10, t10), new F(null, { ...e10, headers: t10 });
        }
      }
      function z(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = r10.protocol + "//" + r10.host;
        return n10.protocol + "//" + n10.host === i10 ? n10.toString().replace(i10, "") : n10.toString();
      }
      let G = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], X = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], Z = ["__nextDataReq"];
      class Y extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new Y();
        }
      }
      class Q extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return q.get(t10, r10, n10);
            let i10 = r10.toLowerCase(), o10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            if (void 0 !== o10) return q.get(t10, o10, n10);
          }, set(t10, r10, n10, i10) {
            if ("symbol" == typeof r10) return q.set(t10, r10, n10, i10);
            let o10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === o10);
            return q.set(t10, a10 ?? r10, n10, i10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return q.has(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== i10 && q.has(t10, i10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return q.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === i10 || q.deleteProperty(t10, i10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return Y.callable;
              default:
                return q.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new Q(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var ee = r(452);
      class et extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new et();
        }
      }
      class er {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return et.callable;
              default:
                return q.get(e11, t10, r10);
            }
          } });
        }
      }
      let en = Symbol.for("next.mutated.cookies");
      class ei {
        static wrap(e10, t10) {
          let r10 = new H.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], i10 = /* @__PURE__ */ new Set(), o10 = () => {
            let e11 = ee.A.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n10 = r10.getAll().filter((e12) => i10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new H.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          };
          return new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case en:
                return n10;
              case "delete":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    e11.delete(...t12);
                  } finally {
                    o10();
                  }
                };
              case "set":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12);
                  } finally {
                    o10();
                  }
                };
              default:
                return q.get(e11, t11, r11);
            }
          } });
        }
      }
      !function(e10) {
        e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404";
      }(n4 || (n4 = {})), function(e10) {
        e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents";
      }(n6 || (n6 = {})), function(e10) {
        e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer";
      }(n7 || (n7 = {})), function(e10) {
        e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch";
      }(n9 || (n9 = {})), (n8 || (n8 = {})).startServer = "startServer.startServer", function(e10) {
        e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult";
      }(ie || (ie = {})), function(e10) {
        e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch";
      }(it || (it = {})), (ir || (ir = {})).executeRoute = "Router.executeRoute", (ii || (ii = {})).runHandler = "Node.runHandler", (io || (io = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e10) {
        e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport";
      }(ia || (ia = {})), (is || (is = {})).execute = "Middleware.execute";
      let eo = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ea = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: es, propagation: ec, trace: el, SpanStatusCode: eu, SpanKind: ed, ROOT_CONTEXT: ep } = n = r(439), eh = (e10) => null !== e10 && "object" == typeof e10 && "function" == typeof e10.then, ef = (e10, t10) => {
        (null == t10 ? void 0 : t10.bubble) === true ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eu.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eg = /* @__PURE__ */ new Map(), em = n.createContextKey("next.rootSpanId"), ey = 0, ew = () => ey++;
      class eb {
        getTracerInstance() {
          return el.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return es;
        }
        getActiveScopeSpan() {
          return el.getSpan(null == es ? void 0 : es.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = es.active();
          if (el.getSpanContext(n10)) return t10();
          let i10 = ec.extract(n10, e10, r10);
          return es.with(i10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, i10] = e10, { fn: o10, options: a10 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: i10, options: { ...n10 } }, s10 = a10.spanName ?? r10;
          if (!eo.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return o10();
          let c2 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan()), l2 = false;
          c2 ? (null == (t10 = el.getSpanContext(c2)) ? void 0 : t10.isRemote) && (l2 = true) : (c2 = (null == es ? void 0 : es.active()) ?? ep, l2 = true);
          let u2 = ew();
          return a10.attributes = { "next.span_name": s10, "next.span_type": r10, ...a10.attributes }, es.with(c2.setValue(em, u2), () => this.getTracerInstance().startActiveSpan(s10, a10, (e11) => {
            let t11 = "performance" in globalThis ? globalThis.performance.now() : void 0, n11 = () => {
              eg.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ea.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            l2 && eg.set(u2, new Map(Object.entries(a10.attributes ?? {})));
            try {
              if (o10.length > 1) return o10(e11, (t13) => ef(e11, t13));
              let t12 = o10(e11);
              if (eh(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw ef(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw ef(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eo.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let o10 = arguments.length - 1, a10 = arguments[o10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(es.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[o10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? el.setSpan(es.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = es.active().getValue(em);
          return eg.get(e10);
        }
      }
      let ev = (() => {
        let e10 = new eb();
        return () => e10;
      })(), e_ = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e_);
      class eS {
        constructor(e10, t10, r10, n10) {
          var i10;
          let o10 = e10 && function(e11, t11) {
            let r11 = Q.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (i10 = r10.get(e_)) ? void 0 : i10.value;
          this.isEnabled = !!(!o10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: e_, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: e_, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function ex(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of S(r10)) n10.append("set-cookie", e11);
          for (let e11 of new H.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      let ek = { wrap(e10, { req: t10, res: r10, renderOpts: n10 }, i10) {
        let o10;
        function a10(e11) {
          r10 && r10.setHeader("Set-Cookie", e11);
        }
        n10 && "previewProps" in n10 && (o10 = n10.previewProps);
        let s10 = {}, c2 = { get headers() {
          return s10.headers || (s10.headers = function(e11) {
            let t11 = Q.from(e11);
            for (let e12 of G) t11.delete(e12.toString().toLowerCase());
            return Q.seal(t11);
          }(t10.headers)), s10.headers;
        }, get cookies() {
          if (!s10.cookies) {
            let e11 = new H.RequestCookies(Q.from(t10.headers));
            ex(t10, e11), s10.cookies = er.seal(e11);
          }
          return s10.cookies;
        }, get mutableCookies() {
          if (!s10.mutableCookies) {
            let e11 = function(e12, t11) {
              let r11 = new H.RequestCookies(Q.from(e12));
              return ei.wrap(r11, t11);
            }(t10.headers, (null == n10 ? void 0 : n10.onUpdateCookies) || (r10 ? a10 : void 0));
            ex(t10, e11), s10.mutableCookies = e11;
          }
          return s10.mutableCookies;
        }, get draftMode() {
          return s10.draftMode || (s10.draftMode = new eS(o10, t10, this.cookies, this.mutableCookies)), s10.draftMode;
        }, reactLoadableManifest: (null == n10 ? void 0 : n10.reactLoadableManifest) || {}, assetPrefix: (null == n10 ? void 0 : n10.assetPrefix) || "" };
        return e10.run(c2, i10, c2);
      } };
      var eE = r(228);
      let eA = (0, eE.P)();
      function eP(e10) {
        let t10 = eA.getStore();
        if (t10) return t10;
        throw Error("`" + e10 + "` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
      }
      function eT() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class eC extends B {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new w({ page: this.sourcePage });
        }
        respondWith() {
          throw new w({ page: this.sourcePage });
        }
        waitUntil() {
          throw new w({ page: this.sourcePage });
        }
      }
      let eR = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, eO = (e10, t10) => ev().withPropagatedContext(e10.headers, t10, eR), eN = false;
      async function eI(e10) {
        let t10, n10;
        !function() {
          if (!eN && (eN = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(177);
            e11(), eO = t11(eO);
          }
        }(), await m();
        let i10 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let o10 = new j(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...o10.searchParams.keys()]) {
          let t11 = o10.searchParams.getAll(e11);
          !function(e12, t12) {
            for (let r10 of ["nxtP", "nxtI"]) e12 !== r10 && e12.startsWith(r10) && t12(e12.substring(r10.length));
          }(e11, (r10) => {
            for (let e12 of (o10.searchParams.delete(r10), t11)) o10.searchParams.append(r10, e12);
            o10.searchParams.delete(e11);
          });
        }
        let a10 = o10.buildId;
        o10.buildId = "";
        let s10 = e10.request.headers["x-nextjs-data"];
        s10 && "/index" === o10.pathname && (o10.pathname = "/");
        let c2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), l2 = /* @__PURE__ */ new Map();
        if (!i10) for (let e11 of G) {
          let t11 = e11.toString().toLowerCase();
          c2.get(t11) && (l2.set(t11, c2.get(t11)), c2.delete(t11));
        }
        let u2 = new eC({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, n11 = r10 ? new URL(e11) : e11;
          for (let e12 of X) n11.searchParams.delete(e12);
          if (t11) for (let e12 of Z) n11.searchParams.delete(e12);
          return r10 ? n11.toString() : n11;
        }(o10, true).toString(), init: { body: e10.request.body, geo: e10.request.geo, headers: c2, ip: e10.request.ip, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        s10 && Object.defineProperty(u2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eT() }) }));
        let d2 = new C({ request: u2, page: e10.page });
        if ((t10 = await eO(u2, () => "/middleware" === e10.page || "/src/middleware" === e10.page ? ev().trace(is.execute, { spanName: `middleware ${u2.method} ${u2.nextUrl.pathname}`, attributes: { "http.target": u2.nextUrl.pathname, "http.method": u2.method } }, () => ek.wrap(eA, { req: u2, renderOpts: { onUpdateCookies: (e11) => {
          n10 = e11;
        }, previewProps: eT() } }, () => e10.handler(u2, d2))) : e10.handler(u2, d2))) && !(t10 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t10 && n10 && t10.headers.set("set-cookie", n10);
        let p2 = null == t10 ? void 0 : t10.headers.get("x-middleware-rewrite");
        if (t10 && p2 && !i10) {
          let r10 = new j(p2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          r10.host === u2.nextUrl.host && (r10.buildId = a10 || r10.buildId, t10.headers.set("x-middleware-rewrite", String(r10)));
          let n11 = z(String(r10), String(o10));
          s10 && t10.headers.set("x-nextjs-rewrite", n11);
        }
        let h2 = null == t10 ? void 0 : t10.headers.get("Location");
        if (t10 && h2 && !i10) {
          let r10 = new j(h2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t10 = new Response(t10.body, t10), r10.host === u2.nextUrl.host && (r10.buildId = a10 || r10.buildId, t10.headers.set("Location", String(r10))), s10 && (t10.headers.delete("Location"), t10.headers.set("x-nextjs-redirect", z(String(r10), String(o10))));
        }
        let f2 = t10 || F.next(), g2 = f2.headers.get("x-middleware-override-headers"), y2 = [];
        if (g2) {
          for (let [e11, t11] of l2) f2.headers.set(`x-middleware-request-${e11}`, t11), y2.push(e11);
          y2.length > 0 && f2.headers.set("x-middleware-override-headers", g2 + "," + y2.join(","));
        }
        return { response: f2, waitUntil: Promise.all(d2[P]), fetchMetrics: u2.fetchMetrics };
      }
      var eU = function(e10, t10, r10, n10, i10) {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !i10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !i10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? i10.call(e10, r10) : i10 ? i10.value = r10 : t10.set(e10, r10), r10;
      }, eL = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      function e$(e10) {
        let t10 = e10 ? "__Secure-" : "";
        return { sessionToken: { name: `${t10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, callbackUrl: { name: `${t10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, csrfToken: { name: `${e10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, pkceCodeVerifier: { name: `${t10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, state: { name: `${t10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, nonce: { name: `${t10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, webauthnChallenge: { name: `${t10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } } };
      }
      class eM {
        constructor(e10, t10, r10) {
          if (ic.add(this), il.set(this, {}), iu.set(this, void 0), id.set(this, void 0), eU(this, id, r10, "f"), eU(this, iu, e10, "f"), !t10) return;
          let { name: n10 } = e10;
          for (let [e11, r11] of Object.entries(t10)) e11.startsWith(n10) && r11 && (eL(this, il, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(eL(this, il, "f")).sort((e10, t10) => parseInt(e10.split(".").pop() || "0") - parseInt(t10.split(".").pop() || "0")).map((e10) => eL(this, il, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          let r10 = eL(this, ic, "m", ih).call(this);
          for (let n10 of eL(this, ic, "m", ip).call(this, { name: eL(this, iu, "f").name, value: e10, options: { ...eL(this, iu, "f").options, ...t10 } })) r10[n10.name] = n10;
          return Object.values(r10);
        }
        clean() {
          return Object.values(eL(this, ic, "m", ih).call(this));
        }
      }
      il = /* @__PURE__ */ new WeakMap(), iu = /* @__PURE__ */ new WeakMap(), id = /* @__PURE__ */ new WeakMap(), ic = /* @__PURE__ */ new WeakSet(), ip = function(e10) {
        let t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return eL(this, il, "f")[e10.name] = e10.value, [e10];
        let r10 = [];
        for (let n10 = 0; n10 < t10; n10++) {
          let t11 = `${e10.name}.${n10}`, i10 = e10.value.substr(3936 * n10, 3936);
          r10.push({ ...e10, name: t11, value: i10 }), eL(this, il, "f")[t11] = i10;
        }
        return eL(this, id, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, ih = function() {
        let e10 = {};
        for (let t10 in eL(this, il, "f")) delete eL(this, il, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...eL(this, iu, "f").options, maxAge: 0 } };
        return e10;
      };
      class eD extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" == typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          let r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class ej extends eD {
      }
      ej.kind = "signIn";
      class eH extends eD {
      }
      eH.type = "AdapterError";
      class eW extends eD {
      }
      eW.type = "AccessDenied";
      class eB extends eD {
      }
      eB.type = "CallbackRouteError";
      class eq extends eD {
      }
      eq.type = "ErrorPageLoop";
      class eK extends eD {
      }
      eK.type = "EventError";
      class eV extends eD {
      }
      eV.type = "InvalidCallbackUrl";
      class eJ extends ej {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      eJ.type = "CredentialsSignin";
      class eF extends eD {
      }
      eF.type = "InvalidEndpoints";
      class ez extends eD {
      }
      ez.type = "InvalidCheck";
      class eG extends eD {
      }
      eG.type = "JWTSessionError";
      class eX extends eD {
      }
      eX.type = "MissingAdapter";
      class eZ extends eD {
      }
      eZ.type = "MissingAdapterMethods";
      class eY extends eD {
      }
      eY.type = "MissingAuthorize";
      class eQ extends eD {
      }
      eQ.type = "MissingSecret";
      class e0 extends ej {
      }
      e0.type = "OAuthAccountNotLinked";
      class e1 extends ej {
      }
      e1.type = "OAuthCallbackError";
      class e2 extends eD {
      }
      e2.type = "OAuthProfileParseError";
      class e3 extends eD {
      }
      e3.type = "SessionTokenError";
      class e5 extends ej {
      }
      e5.type = "OAuthSignInError";
      class e4 extends ej {
      }
      e4.type = "EmailSignInError";
      class e6 extends eD {
      }
      e6.type = "SignOutError";
      class e7 extends eD {
      }
      e7.type = "UnknownAction";
      class e9 extends eD {
      }
      e9.type = "UnsupportedStrategy";
      class e8 extends eD {
      }
      e8.type = "InvalidProvider";
      class te extends eD {
      }
      te.type = "UntrustedHost";
      class tt extends eD {
      }
      tt.type = "Verification";
      class tr extends ej {
      }
      tr.type = "MissingCSRF";
      let tn = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class ti extends eD {
      }
      ti.type = "DuplicateConditionalUI";
      class to extends eD {
      }
      to.type = "MissingWebAuthnAutocomplete";
      class ta extends eD {
      }
      ta.type = "WebAuthnVerificationError";
      class ts extends ej {
      }
      ts.type = "AccountNotLinked";
      class tc extends eD {
      }
      tc.type = "ExperimentalFeatureNotEnabled";
      let tl = false;
      function tu(e10, t10) {
        try {
          return /^https?:/.test(new URL(e10, e10.startsWith("/") ? t10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let td = false, tp = false, th = false, tf = ["createVerificationToken", "useVerificationToken", "getUserByEmail"], tg = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"], tm = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"], ty = () => {
        if ("undefined" != typeof globalThis) return globalThis;
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        throw Error("unable to locate global object");
      }, tw = async (e10, t10, r10, n10, i10) => {
        let { crypto: { subtle: o10 } } = ty();
        return new Uint8Array(await o10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await o10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), i10 << 3));
      };
      function tb(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function tv(e10, t10, r10, n10, i10) {
        return tw(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = tb(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), tb(r10, "salt"), function(e11) {
          let t11 = tb(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(i10, e10));
      }
      let t_ = new TextEncoder(), tS = new TextDecoder(), tx = new TextDecoder("utf-8", { fatal: true });
      function tk(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function tE(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function tA(e10) {
        let t10 = new Uint8Array(8);
        return tE(t10, Math.floor(e10 / 4294967296), 0), tE(t10, e10 % 4294967296, 4), t10;
      }
      function tP(e10) {
        let t10 = new Uint8Array(4);
        return tE(t10, e10), t10;
      }
      function tT(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n10 = e10.charCodeAt(r10);
          if (n10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n10;
        }
        return t10;
      }
      let tC = "The input to be decoded is not correctly encoded.";
      function tR(e10) {
        if (Uint8Array.fromBase64) try {
          return Uint8Array.fromBase64("string" == typeof e10 ? e10 : tS.decode(e10), { alphabet: "base64url" });
        } catch (e11) {
          throw TypeError(tC, { cause: e11 });
        }
        let t10 = e10;
        if (t10 instanceof Uint8Array && (t10 = tS.decode(t10)), t10.includes("+") || t10.includes("/")) throw TypeError(tC);
        t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          return function(e11) {
            if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e11);
            let t11 = atob(e11), r10 = new Uint8Array(t11.length);
            for (let e12 = 0; e12 < t11.length; e12++) r10[e12] = t11.charCodeAt(e12);
            return r10;
          }(t10);
        } catch {
          throw TypeError(tC);
        }
      }
      function tO(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = t_.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function tN(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        let t10 = Object.getPrototypeOf(e10);
        if (null === t10) return true;
        let r10 = t10;
        for (; null !== Object.getPrototypeOf(r10); ) r10 = Object.getPrototypeOf(r10);
        return t10 === r10;
      }
      function tI(...e10) {
        let t10 = /* @__PURE__ */ new Set();
        for (let r10 of e10) if (r10) for (let e11 of Object.keys(r10)) {
          if (t10.has(e11)) return false;
          t10.add(e11);
        }
        return true;
      }
      let tU = (e10) => tN(e10) && "string" == typeof e10.kty, tL = (e10) => "oct" !== e10.kty && ("AKP" === e10.kty && "string" == typeof e10.priv || "string" == typeof e10.d), t$ = (e10) => "oct" !== e10.kty && void 0 === e10.d && void 0 === e10.priv, tM = (e10) => "oct" === e10.kty && "string" == typeof e10.k, tD = Symbol();
      function tj(e10, t10) {
        if (e10) throw TypeError(`${t10} can only be called once`);
      }
      function tH(e10, t10, r10) {
        try {
          return tR(e10);
        } catch {
          throw new r10(`Failed to base64url decode the ${t10}`);
        }
      }
      async function tW(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      class tB extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class tq extends tB {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class tK extends tB {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class tV extends tB {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class tJ extends tB {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class tF extends tB {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class tz extends tB {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class tG extends tB {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class tX extends tB {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class tZ extends tB {
        [Symbol.asyncIterator] = async function* () {
        };
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      function tY(e10) {
        if (!tQ(e10)) throw Error("CryptoKey instance expected");
      }
      let tQ = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, t0 = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", t1 = (e10) => tQ(e10) || t0(e10);
      function t2(e10, t10, ...r10) {
        if (r10.length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let t3 = (e10, ...t10) => t2("Key must be ", e10, ...t10), t5 = (e10, t10, ...r10) => t2(`Key for the ${e10} algorithm must be `, t10, ...r10);
      async function t4(e10) {
        if (t0(e10)) {
          if ("secret" !== e10.type) return e10.export({ format: "jwk" });
          e10 = e10.export();
        }
        if (e10 instanceof Uint8Array) return { kty: "oct", k: tO(e10) };
        if (!tQ(e10)) throw TypeError(t3(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n10, use: i10, ...o10 } = Object.fromEntries(Object.entries(await crypto.subtle.exportKey("jwk", e10)).filter(([, e11]) => void 0 !== e11));
        return "AKP" === o10.kty && (o10.alg = n10), o10;
      }
      let t6 = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new tX(`${t10} missing or invalid`);
      };
      async function t7(e10, t10) {
        let r10, n10;
        if (tU(e10)) r10 = e10;
        else if (t1(e10)) r10 = await t4(e10);
        else throw TypeError(t3(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            t6(r10.alg, '"alg" (Algorithm) Parameter'), t6(r10.pub, '"pub" (Public key) Parameter'), n10 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            t6(r10.crv, '"crv" (Curve) Parameter'), t6(r10.x, '"x" (X Coordinate) Parameter'), t6(r10.y, '"y" (Y Coordinate) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            t6(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), t6(r10.x, '"x" (Public Key) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            t6(r10.e, '"e" (Exponent) Parameter'), t6(r10.n, '"n" (Modulus) Parameter'), n10 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            t6(r10.k, '"k" (Key Value) Parameter'), n10 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new tJ('"kty" (Key Type) Parameter missing or unsupported');
        }
        let i10 = tT(JSON.stringify(n10));
        return tO(await tW(t10, i10));
      }
      let t9 = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function t8(e10, t10) {
        if (t10 && !e10.usages.includes(t10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t10}.`);
      }
      function re(e10, t10, r10) {
        let n10 = e10.algorithm;
        if (n10.name !== t10.name) throw t9(t10.name);
        if (t10.hash && n10.hash?.name !== t10.hash) throw t9(t10.hash, "algorithm.hash");
        if (t10.namedCurve && n10.namedCurve !== t10.namedCurve) throw t9(t10.namedCurve, "algorithm.namedCurve");
        if (void 0 !== t10.length && n10.length !== t10.length) throw t9(t10.length, "algorithm.length");
        t8(e10, r10);
      }
      let rt = (e10) => crypto.getRandomValues(new Uint8Array(e10.cekBits >> 3));
      function rr(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new tz(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      let rn = (e10) => crypto.getRandomValues(new Uint8Array(e10.ivBits >> 3));
      function ri(e10, t10) {
        if (t10.length << 3 !== e10.ivBits) throw new tz("Invalid Initialization Vector length");
      }
      async function ro(e10, t10, r10) {
        if (!(t10 instanceof Uint8Array)) throw TypeError(t3(t10, "Uint8Array"));
        let n10 = e10.cekBits >> 1;
        return [await crypto.subtle.importKey("raw", t10.subarray(n10 >> 3), "AES-CBC", false, [r10]), await crypto.subtle.importKey("raw", t10.subarray(0, n10 >> 3), { hash: `SHA-${n10 << 1}`, name: "HMAC" }, false, ["sign"]), n10];
      }
      async function ra(e10, t10, r10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", e10, t10)).slice(0, r10 >> 3));
      }
      async function rs(e10, t10, r10, n10, i10) {
        let [o10, a10, s10] = await ro(e10, r10, "encrypt"), c2 = new Uint8Array(await crypto.subtle.encrypt({ iv: n10, name: "AES-CBC" }, o10, t10)), l2 = tk(i10, n10, c2, tA(8 * i10.length));
        return { ciphertext: c2, tag: await ra(a10, l2, s10), iv: n10 };
      }
      async function rc(e10, t10) {
        let r10 = { name: "HMAC", hash: "SHA-256" }, n10 = await crypto.subtle.generateKey(r10, false, ["sign", "verify"]), i10 = await crypto.subtle.sign(r10, n10, e10);
        return crypto.subtle.verify(r10, n10, i10, t10);
      }
      async function rl(e10, t10, r10, n10, i10, o10) {
        let a10, s10;
        let [c2, l2, u2] = await ro(e10, t10, "decrypt"), d2 = tk(o10, n10, r10, tA(8 * o10.length)), p2 = await ra(l2, d2, u2);
        try {
          a10 = await rc(i10, p2);
        } catch {
        }
        if (!a10) throw new tF();
        try {
          s10 = new Uint8Array(await crypto.subtle.decrypt({ iv: n10, name: "AES-CBC" }, c2, r10));
        } catch {
        }
        if (!s10) throw new tF();
        return s10;
      }
      async function ru(e10, t10, r10, n10, i10) {
        let o10 = r10 instanceof Uint8Array ? await crypto.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (re(r10, e10.subtle, "encrypt"), r10), a10 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, o10, t10)), s10 = a10.slice(-16);
        return { ciphertext: a10.slice(0, -16), tag: s10, iv: n10 };
      }
      async function rd(e10, t10, r10, n10, i10, o10) {
        let a10 = t10 instanceof Uint8Array ? await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (re(t10, e10.subtle, "decrypt"), t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: o10, iv: n10, name: "AES-GCM", tagLength: 128 }, a10, tk(r10, i10)));
        } catch {
          throw new tF();
        }
      }
      async function rp(e10, t10, r10, n10, i10) {
        if (!tQ(r10) && !(r10 instanceof Uint8Array)) throw TypeError(t3(r10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        return n10 ? ri(e10, n10) : n10 = rn(e10), r10 instanceof Uint8Array && rr(r10, e10.cekBits), e10.cbc ? rs(e10, t10, r10, n10, i10) : ru(e10, t10, r10, n10, i10);
      }
      async function rh(e10, t10, r10, n10, i10, o10) {
        if (!tQ(t10) && !(t10 instanceof Uint8Array)) throw TypeError(t3(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!n10) throw new tz("JWE Initialization Vector missing");
        if (!i10) throw new tz("JWE Authentication Tag missing");
        return ri(e10, n10), t10 instanceof Uint8Array && rr(t10, e10.cekBits), e10.cbc ? rl(e10, t10, r10, n10, i10, o10) : rd(e10, t10, r10, n10, i10, o10);
      }
      async function rf(e10, t10) {
        if ("RSA" === t10.kty && "oth" in t10 && void 0 !== t10.oth) throw new tJ('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        if (!e10.kty.includes(t10.kty)) throw new tJ('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        let r10 = e10.resolve?.({ kty: t10.kty, crv: t10.crv }) ?? e10.subtle, n10 = !!(t10.d || t10.priv), i10 = { ...t10 };
        return "AKP" !== i10.kty && delete i10.alg, delete i10.use, crypto.subtle.importKey("jwk", i10, r10, t10.ext ?? !n10, t10.key_ops ?? e10.usages[n10 ? 1 : 0]);
      }
      let rg = (e10) => e10[Symbol.toStringTag], rm = (e10, t10, r10) => {
        let { alg: n10 } = e10;
        if (void 0 !== t10.use) {
          let e11 = "sign" === r10 || "verify" === r10 ? "sig" : "enc";
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== n10) throw TypeError(`Invalid key for this operation, its "alg" must be "${n10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let n11 = "encrypt" === r10 || "decrypt" === r10 ? e10.ops?.["encrypt" === r10 ? 0 : 1] : r10;
          if (n11 && !t10.key_ops.includes(n11)) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n11}" when present`);
        }
      }, ry = { __proto__: null, prime256v1: "P-256", secp384r1: "P-384", secp521r1: "P-521" };
      function rw(e10, t10, r10) {
        let n10 = (i ||= /* @__PURE__ */ new WeakMap()).get(e10);
        return r10 && (n10 ? n10[t10] = r10 : i.set(e10, { __proto__: null, [t10]: r10 })), r10 ?? n10?.[t10];
      }
      let rb = async (e10, t10, r10) => rw(e10, r10.alg) ?? rw(e10, r10.alg, await rf(r10, { ...t10, alg: r10.alg })), rv = (e10, t10) => {
        let r10 = rw(e10, t10.alg);
        if (r10) return r10;
        let n10 = "public" === e10.type, i10 = t10.usages[n10 ? 0 : 1], { asymmetricKeyType: o10 } = e10, a10 = ry[e10.asymmetricKeyDetails?.namedCurve], s10 = t10.resolve?.({ crv: a10, asymmetricKeyType: o10 }) ?? t10.subtle;
        return rw(e10, t10.alg, e10.toCryptoKey(s10, n10, i10));
      };
      async function r_(e10, t10, r10) {
        let n10 = function(e11, t11, r11) {
          let { alg: n11, secret: i10 } = e11, o10 = "decrypt" === r11 || "sign" === r11;
          if (i10 && t11 instanceof Uint8Array) return [0, t11];
          if (tU(t11)) {
            if (i10 ? !tM(t11) : !(o10 ? tL(t11) : t$(t11))) throw TypeError(i10 ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${o10 ? "private" : "public"} JWK`);
            return rm(e11, t11, r11), [3, t11];
          }
          if (!t1(t11)) throw TypeError(i10 ? t5(n11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array") : t5(n11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
          if (i10) {
            if ("secret" !== t11.type) throw TypeError(`${rg(t11)} instances for symmetric algorithms must be of type "secret"`);
          } else {
            if ("secret" === t11.type) throw TypeError(`${rg(t11)} instances for asymmetric algorithms must not be of type "secret"`);
            let e12 = o10 ? "private" : "public";
            if (("public" === t11.type || "private" === t11.type) && t11.type !== e12) {
              let n12 = "sign" === r11 ? "signing" : "verify" === r11 ? "verifying" : `${r11.slice(0, -1)}tion`;
              throw TypeError(`${rg(t11)} instances for asymmetric algorithm ${n12} must be of type "${e12}"`);
            }
          }
          return tQ(t11) ? [1, t11] : [2, t11];
        }(e10, t10, r10);
        switch (n10[0]) {
          case 0:
          case 1:
            return n10[1];
          case 3: {
            let t11 = n10[1];
            if (t11.k) return tR(t11.k);
            if (!Object.isFrozen(t11)) {
              let { key_ops: e11 } = t11;
              Array.isArray(e11) && Object.freeze(e11), Object.freeze(t11);
            }
            return rb(t11, t11, e10);
          }
          case 2: {
            let t11 = n10[1];
            if ("secret" === t11.type) return t11.export();
            if ("toCryptoKey" in t11 && "function" == typeof t11.toCryptoKey) return rv(t11, e10);
            return rb(t11, t11.export({ format: "jwk" }), e10);
          }
        }
      }
      function rS(e10) {
        let t10 = { __proto__: null };
        for (let r10 in e10) t10[r10] = { ...e10[r10], alg: r10 };
        return t10;
      }
      let rx = [["encrypt", "wrapKey"], ["decrypt", "unwrapKey"]], rk = [[], ["deriveBits"]], rE = [[], []];
      function rA(e10) {
        return { kty: ["RSA"], subtle: { name: "RSA-OAEP", hash: `SHA-${e10}` }, usages: rx, ops: ["wrapKey", "unwrapKey"] };
      }
      function rP() {
        return { kty: ["EC", "OKP"], subtle: { name: "ECDH" }, resolve: ({ kty: e10, crv: t10, asymmetricKeyType: r10 }) => {
          if ("X25519" === t10 || "x25519" === r10) return { name: "X25519" };
          if ("OKP" === e10) throw new tJ('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
          return { name: "ECDH", namedCurve: t10 };
        }, usages: rk, ops: [void 0, "deriveBits"] };
      }
      function rT(e10, t10 = false) {
        return { kty: ["oct"], secret: true, subtle: { name: t10 ? "AES-GCM" : "AES-KW", length: e10 }, usages: rE, ops: t10 ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"] };
      }
      function rC() {
        return { kty: ["oct"], secret: true, subtle: { name: "PBKDF2" }, usages: rE, ops: ["deriveBits", "deriveBits"] };
      }
      let rR = rS({ dir: { kty: ["oct"], secret: true, subtle: { name: "AES-GCM" }, usages: rE, ops: ["encrypt", "decrypt"] }, "RSA-OAEP": rA(1), "RSA-OAEP-256": rA(256), "RSA-OAEP-384": rA(384), "RSA-OAEP-512": rA(512), "ECDH-ES": rP(), "ECDH-ES+A128KW": rP(), "ECDH-ES+A192KW": rP(), "ECDH-ES+A256KW": rP(), A128KW: rT(128), A192KW: rT(192), A256KW: rT(256), A128GCMKW: rT(128, true), A192GCMKW: rT(192, true), A256GCMKW: rT(256, true), "PBES2-HS256+A128KW": rC(), "PBES2-HS384+A192KW": rC(), "PBES2-HS512+A256KW": rC() }), rO = ["encrypt", "decrypt"];
      function rN(e10, t10 = false) {
        return { kty: ["oct"], secret: true, subtle: { name: t10 ? "AES-CBC" : "AES-GCM", length: e10 }, usages: rE, ops: rO, cekBits: e10, ivBits: t10 ? 128 : 96, cbc: t10 };
      }
      let rI = rS({ A128GCM: rN(128), A192GCM: rN(192), A256GCM: rN(256), "A128CBC-HS256": rN(256, true), "A192CBC-HS384": rN(384, true), "A256CBC-HS512": rN(512, true) });
      function rU(e10, t10) {
        throw new tJ(`Invalid or unsupported "${e10}" (JWE ${t10}) header value`);
      }
      function rL(e10) {
        return ("string" == typeof e10 ? rR[e10] : void 0) ?? rU("alg", "Algorithm");
      }
      function r$(e10) {
        return ("string" == typeof e10 ? rI[e10] : void 0) ?? rU("enc", "Encryption Algorithm");
      }
      function rM(e10, t10) {
        if ("ECDH" !== e10.algorithm.name && "X25519" !== e10.algorithm.name) throw TypeError("CryptoKey does not support this operation, its algorithm.name must be ECDH or X25519");
        t8(e10, t10);
      }
      async function rD(e10, t10, r10) {
        let n10 = rL(t10).subtle, i10 = e10 instanceof Uint8Array ? await crypto.subtle.importKey("raw", e10, "AES-KW", true, [r10]) : e10;
        return re(i10, n10, r10), i10;
      }
      async function rj(e10, t10, r10) {
        let n10 = await rD(t10, e10, "wrapKey"), i10 = await crypto.subtle.importKey("raw", r10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", i10, n10, "AES-KW"));
      }
      async function rH(e10, t10, r10) {
        let n10 = await rD(t10, e10, "unwrapKey"), i10 = await crypto.subtle.unwrapKey("raw", r10, n10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", i10));
      }
      function rW(e10, t10, r10) {
        re(t10, rL(e10).subtle, r10), function(e11, t11) {
          let { modulusLength: r11 } = t11.algorithm;
          if ("number" != typeof r11 || r11 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
        }(e10, t10);
      }
      async function rB(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new tz("PBES2 Salt Input must be 8 or more octets");
        if (!Number.isSafeInteger(r10) || 1 !== Math.sign(r10)) throw new tz("PBES2 Count Input must be a positive integer");
        let i10 = tk(tT(t10), Uint8Array.of(0), e10), o10 = parseInt(t10.slice(13, 16), 10), a10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: i10 }, s10 = await (n10 instanceof Uint8Array ? crypto.subtle.importKey("raw", n10, "PBKDF2", false, ["deriveBits"]) : (re(n10, rL(t10).subtle, "deriveBits"), n10));
        return new Uint8Array(await crypto.subtle.deriveBits(a10, s10, o10));
      }
      function rq(e10) {
        return tk(tP(e10.length), e10);
      }
      async function rK(e10, t10, r10) {
        let n10 = t10 >> 3, i10 = Math.ceil(n10 / 32), o10 = new Uint8Array(32 * i10);
        for (let t11 = 1; t11 <= i10; t11++) {
          let n11 = await tW("sha256", tk(tP(t11), e10, r10));
          o10.set(n11, (t11 - 1) * 32);
        }
        return o10.slice(0, n10);
      }
      async function rV(e10, t10, r10, n10, i10 = new Uint8Array(), o10 = new Uint8Array()) {
        rM(e10), rM(t10, "deriveBits");
        let a10 = tk(rq(tT(r10)), rq(i10), rq(o10), tP(n10));
        return rK(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === e10.algorithm.name ? 256 : Math.ceil(parseInt(e10.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), n10, a10);
      }
      function rJ(e10) {
        tY(e10);
        let t10 = e10.algorithm.namedCurve;
        if ("P-256" !== t10 && "P-384" !== t10 && "P-521" !== t10 && "X25519" !== e10.algorithm.name) throw new tJ("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      }
      function rF(e10) {
        if (void 0 === e10) throw new tz("JWE Encrypted Key missing");
      }
      function rz(e10) {
        if (void 0 !== e10) throw new tz("Encountered unexpected JWE Encrypted Key");
      }
      async function rG(e10, t10, r10, n10, i10, o10) {
        let a10 = rL(e10);
        if ("dir" === e10) return rz(n10), r10;
        switch (a10.subtle.name) {
          case "ECDH": {
            let o11, s10;
            if ("ECDH-ES" === e10 && rz(n10), !tN(i10.epk)) throw new tz('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            rJ(r10);
            let c2 = await rf(a10, i10.epk);
            if (void 0 !== i10.apu) {
              if ("string" != typeof i10.apu) throw new tz('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              o11 = tH(i10.apu, "apu", tz);
            }
            if (void 0 !== i10.apv) {
              if ("string" != typeof i10.apv) throw new tz('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              s10 = tH(i10.apv, "apv", tz);
            }
            let l2 = await rV(c2, r10, "ECDH-ES" === e10 ? t10.alg : e10, "ECDH-ES" === e10 ? t10.cekBits : parseInt(e10.slice(-5, -2), 10), o11, s10);
            if ("ECDH-ES" === e10) return l2;
            return rF(n10), rH(e10.slice(-6), l2, n10);
          }
          case "RSA-OAEP":
            return rF(n10), tY(r10), rW(e10, r10, "decrypt"), new Uint8Array(await crypto.subtle.decrypt("RSA-OAEP", r10, n10));
          case "PBKDF2": {
            if (rF(n10), "number" != typeof i10.p2c) throw new tz('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let t11 = o10?.maxPBES2Count || 1e4;
            if (i10.p2c > t11) throw new tz('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof i10.p2s) throw new tz('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            let a11 = tH(i10.p2s, "p2s", tz), s10 = await rB(a11, e10, i10.p2c, r10);
            return rH(e10.slice(-6), s10, n10);
          }
          case "AES-KW":
            return rF(n10), rH(e10, r10, n10);
          case "AES-GCM": {
            let t11, o11;
            if (rF(n10), "string" != typeof i10.iv) throw new tz('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof i10.tag) throw new tz('JOSE Header "tag" (Authentication Tag) missing or invalid');
            return t11 = tH(i10.iv, "iv", tz), o11 = tH(i10.tag, "tag", tz), rh(r$(e10.slice(0, -2)), r10, n10, t11, o11, new Uint8Array());
          }
        }
      }
      async function rX(e10, t10, r10, n10, i10 = {}) {
        let o10, a10, s10;
        let c2 = rL(e10);
        if ("dir" === e10) return [r10, void 0, void 0];
        switch (c2.subtle.name) {
          case "ECDH": {
            let l2;
            rJ(r10);
            let { apu: u2, apv: d2 } = i10;
            l2 = i10.epk ? await r_(c2, i10.epk, "decrypt") : (await crypto.subtle.generateKey(r10.algorithm, true, ["deriveBits"])).privateKey;
            let p2 = crypto.subtle, h2 = l2;
            if (!h2.extractable) {
              if ("function" != typeof p2.getPublicKey) throw TypeError('CryptoKey for "epk" must be extractable');
              h2 = await p2.getPublicKey(l2, []);
            }
            let { x: f2, y: g2, crv: m2, kty: y2 } = await p2.exportKey("jwk", h2), w2 = await rV(r10, l2, "ECDH-ES" === e10 ? t10.alg : e10, "ECDH-ES" === e10 ? t10.cekBits : parseInt(e10.slice(-5, -2), 10), u2, d2);
            if (a10 = { epk: { x: f2, crv: m2, kty: y2 } }, "EC" === y2 && (a10.epk.y = g2), u2 && (a10.apu = tO(u2)), d2 && (a10.apv = tO(d2)), "ECDH-ES" === e10) {
              s10 = w2;
              break;
            }
            s10 = n10 || rt(t10);
            let b2 = e10.slice(-6);
            o10 = await rj(b2, w2, s10);
            break;
          }
          case "RSA-OAEP":
            s10 = n10 || rt(t10), tY(r10), rW(e10, r10, "encrypt"), o10 = new Uint8Array(await crypto.subtle.encrypt("RSA-OAEP", r10, s10));
            break;
          case "PBKDF2": {
            s10 = n10 || rt(t10);
            let { p2c: c3 = 2048, p2s: l2 = crypto.getRandomValues(new Uint8Array(16)) } = i10, u2 = await rB(l2, e10, c3, r10);
            o10 = await rj(e10.slice(-6), u2, s10), a10 = { p2c: c3, p2s: tO(l2) };
            break;
          }
          case "AES-KW":
            s10 = n10 || rt(t10), o10 = await rj(e10, r10, s10);
            break;
          case "AES-GCM": {
            s10 = n10 || rt(t10);
            let { iv: c3 } = i10, l2 = await rp(r$(e10.slice(0, -2)), s10, r10, c3, new Uint8Array());
            o10 = l2.ciphertext, a10 = { iv: tO(l2.iv), tag: tO(l2.tag) };
          }
        }
        return [s10, o10, a10];
      }
      let rZ = { __proto__: null };
      function rY(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      function rQ(e10, t10, r10, n10, i10) {
        if (void 0 !== i10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return [];
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        let o10 = void 0 === r10 ? t10 : { __proto__: null, ...r10, ...t10 };
        for (let t11 of n10.crit) {
          if (!(t11 in o10)) throw new tJ(`Extension Header Parameter "${t11}" is not recognized`);
          if (!Object.hasOwn(i10, t11) || void 0 === i10[t11]) throw new e10(`Extension Header Parameter "${t11}" is missing`);
          if (o10[t11] && (!Object.hasOwn(n10, t11) || void 0 === n10[t11])) throw new e10(`Extension Header Parameter "${t11}" MUST be integrity protected`);
        }
        return n10.crit;
      }
      function r0(e10) {
        if (void 0 === globalThis[e10]) throw new tJ(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${e10} API.`);
      }
      async function r1(e10) {
        r0("CompressionStream");
        let t10 = new CompressionStream("deflate-raw"), r10 = t10.writable.getWriter();
        r10.write(e10).catch(() => {
        }), r10.close().catch(() => {
        });
        let n10 = [], i10 = t10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: t11 } = await i10.read();
          if (t11) break;
          n10.push(e11);
        }
        return tk(...n10);
      }
      async function r2(e10, t10) {
        r0("DecompressionStream");
        let r10 = new DecompressionStream("deflate-raw"), n10 = r10.writable.getWriter();
        n10.write(e10).catch(() => {
        }), n10.close().catch(() => {
        });
        let i10 = [], o10 = 0, a10 = r10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: r11 } = await a10.read();
          if (r11) break;
          if (i10.push(e11), o10 += e11.byteLength, t10 !== 1 / 0 && o10 > t10) throw new tz("Decompressed plaintext exceeded the configured limit");
        }
        return tk(...i10);
      }
      function r3(e10, t10, r10) {
        if (!tI(e10, t10, r10)) throw new tz("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
      }
      async function r5(e10, t10, r10) {
        let n10, i10, o10, a10;
        let [s10, c2, , l2] = t10, [u2, d2, p2, h2, f2, g2, m2, y2, , w2] = e10, b2 = d2, v2 = p2;
        if (g2 && ("dir" === c2 || "ECDH-ES" === c2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${c2}`);
        let _2 = rL(c2), S2 = await r_("dir" === c2 ? l2 : _2, r10, "encrypt"), [x2, k2, E2] = await rX(c2, l2, S2, g2, y2);
        E2 && (w2 ? v2 = v2 ? { ...v2, ...E2 } : E2 : b2 = b2 ? { ...b2, ...E2 } : E2, r3(b2, v2, h2)), b2 ? i10 = tT(n10 = tO(JSON.stringify(b2))) : (n10 = "", i10 = new Uint8Array()), f2?.byteLength ? (a10 = tO(f2), o10 = tk(i10, tT("."), tT(a10))) : o10 = i10;
        let A2 = u2;
        "DEF" === s10.zip && (A2 = await r1(A2).catch((e11) => {
          throw new tz("Failed to compress plaintext", { cause: e11 });
        }));
        let { ciphertext: P2, tag: T2, iv: C2 } = await rp(l2, A2, x2, m2, o10), R2 = { ciphertext: tO(P2) };
        return C2 && (R2.iv = tO(C2)), T2 && (R2.tag = tO(T2)), k2 && (R2.encrypted_key = tO(k2)), a10 && (R2.aad = a10), b2 && (R2.protected = n10), h2 && (R2.unprotected = h2), v2 && (R2.header = v2), R2;
      }
      async function r4(e10, t10) {
        return r5(e10, function(e11) {
          let [, t11, r10, n10, , , , , i10] = e11;
          r3(t11, r10, n10);
          let o10 = { ...t11, ...r10, ...n10 };
          if (rQ(tz, rZ, i10, t11, o10), void 0 !== o10.zip && "DEF" !== o10.zip) throw new tJ('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
          if (void 0 !== o10.zip && !t11?.zip) throw new tz('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
          let { alg: a10, enc: s10 } = o10;
          if ("string" != typeof a10 || !a10) throw new tz('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof s10 || !s10) throw new tz('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          return [o10, a10, s10, r$(s10)];
        }(e10), t10);
      }
      class r6 {
        #e;
        #t;
        #r;
        #n;
        #i;
        #o;
        #a;
        #s;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#e = e10;
        }
        setKeyManagementParameters(e10) {
          return tj(this.#s, "setKeyManagementParameters"), this.#s = e10, this;
        }
        setProtectedHeader(e10) {
          return tj(this.#t, "setProtectedHeader"), this.#t = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          return tj(this.#r, "setSharedUnprotectedHeader"), this.#r = e10, this;
        }
        setUnprotectedHeader(e10) {
          return tj(this.#n, "setUnprotectedHeader"), this.#n = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this.#i = e10, this;
        }
        setContentEncryptionKey(e10) {
          return tj(this.#o, "setContentEncryptionKey"), this.#o = e10, this;
        }
        setInitializationVector(e10) {
          return tj(this.#a, "setInitializationVector"), this.#a = e10, this;
        }
        async encrypt(e10, t10) {
          if (!this.#t && !this.#n && !this.#r) throw new tz("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          return !function(e11, t11) {
            let { crit: r10 } = t11 ?? {};
            if (Array.isArray(r10) && new Set(r10).size !== r10.length) throw new e11('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
          }(tz, this.#t), r4([this.#e, this.#t, this.#n, this.#r, this.#i, this.#o, this.#a, this.#s, t10?.crit, !!t10 && tD in t10], e10);
        }
      }
      class r7 {
        #c;
        constructor(e10) {
          this.#c = new r6(e10);
        }
        setContentEncryptionKey(e10) {
          return this.#c.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this.#c.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this.#c.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this.#c.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this.#c.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      let r9 = (e10) => Math.floor(e10.getTime() / 1e3), r8 = { s: 1, m: 60, h: 3600, d: 86400, w: 604800, y: 31557600 }, ne = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, nt = "check_failed";
      function nr(e10) {
        let t10 = ne.exec(e10);
        if (!t10 || t10[4] && t10[1]) throw TypeError("Invalid time period format");
        let r10 = Math.round(parseFloat(t10[2]) * r8[t10[3][0].toLowerCase()]);
        return "-" === t10[1] || "ago" === t10[4] ? -r10 : r10;
      }
      function nn(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      function ni(e10, t10) {
        return "number" == typeof e10 ? nn(t10, e10) : e10 instanceof Date ? nn(t10, r9(e10)) : r9(/* @__PURE__ */ new Date()) + nr(e10);
      }
      let no = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`, na = (e10, t10) => "string" == typeof e10 ? t10.includes(e10) : !!Array.isArray(e10) && t10.some((t11) => e10.includes(t11));
      function ns(e10, t10, r10 = false) {
        let n10 = e10[t10];
        if (void 0 !== n10 || r10) {
          if ("number" != typeof n10) throw new tq(`"${t10}" claim must be a number`, e10, t10, "invalid");
          return n10;
        }
      }
      function nc(e10, t10) {
        throw new tq(`unexpected "${t10}" claim value`, e10, t10, nt);
      }
      class nl {
        #l;
        constructor(e10) {
          if (!tN(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#l = structuredClone(e10);
        }
        data() {
          return t_.encode(JSON.stringify(this.#l));
        }
        get iss() {
          return this.#l.iss;
        }
        set iss(e10) {
          this.#l.iss = e10;
        }
        get sub() {
          return this.#l.sub;
        }
        set sub(e10) {
          this.#l.sub = e10;
        }
        get aud() {
          return this.#l.aud;
        }
        set aud(e10) {
          this.#l.aud = e10;
        }
        set jti(e10) {
          this.#l.jti = e10;
        }
        set nbf(e10) {
          this.#l.nbf = ni(e10, "setNotBefore");
        }
        set exp(e10) {
          this.#l.exp = ni(e10, "setExpirationTime");
        }
        set iat(e10) {
          void 0 === e10 ? this.#l.iat = r9(/* @__PURE__ */ new Date()) : "string" == typeof e10 ? this.#l.iat = nn("setIssuedAt", r9(/* @__PURE__ */ new Date()) + nr(e10)) : this.#l.iat = ni(e10, "setIssuedAt");
        }
      }
      class nu {
        #o;
        #a;
        #s;
        #t;
        #u;
        #d;
        #p;
        #h;
        constructor(e10 = {}) {
          this.#h = new nl(e10);
        }
        setIssuer(e10) {
          return this.#h.iss = e10, this;
        }
        setSubject(e10) {
          return this.#h.sub = e10, this;
        }
        setAudience(e10) {
          return this.#h.aud = e10, this;
        }
        setJti(e10) {
          return this.#h.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#h.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#h.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#h.iat = e10, this;
        }
        setProtectedHeader(e10) {
          return tj(this.#t, "setProtectedHeader"), this.#t = e10, this;
        }
        setKeyManagementParameters(e10) {
          return tj(this.#s, "setKeyManagementParameters"), this.#s = e10, this;
        }
        setContentEncryptionKey(e10) {
          return tj(this.#o, "setContentEncryptionKey"), this.#o = e10, this;
        }
        setInitializationVector(e10) {
          return tj(this.#a, "setInitializationVector"), this.#a = e10, this;
        }
        replicateIssuerAsHeader() {
          return this.#u = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#d = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#p = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new r7(this.#h.data());
          return this.#t && (this.#u || this.#d || this.#p) && (this.#t = { ...this.#t, iss: this.#u ? this.#h.iss : void 0, sub: this.#d ? this.#h.sub : void 0, aud: this.#p ? this.#h.aud : void 0 }), r10.setProtectedHeader(this.#t), this.#a && r10.setInitializationVector(this.#a), this.#o && r10.setContentEncryptionKey(this.#o), this.#s && r10.setKeyManagementParameters(this.#s), r10.encrypt(e10, t10);
        }
      }
      async function nd(e10, t10, r10, n10) {
        let i10, o10, a10;
        let [s10, c2, l2] = r10, [u2, d2, p2, h2, f2] = t10, { encrypted_key: g2, header: m2, unprotected: y2 } = e10;
        if (void 0 !== m2 || void 0 !== y2) {
          if (!tI(u2, m2, y2)) throw new tz("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
          i10 = { ...u2, ...m2, ...y2 };
        } else i10 = u2 ?? {};
        if (rQ(tz, rZ, l2?.crit, u2, i10), void 0 !== i10.zip && "DEF" !== i10.zip) throw new tJ('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== i10.zip && !u2?.zip) throw new tz('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
        let { alg: w2, enc: b2 } = i10;
        if ("string" != typeof w2 || !w2) throw new tz("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof b2 || !b2) throw new tz("missing JWE Encryption Algorithm (enc) in JWE Header");
        if (s10 && !s10.has(w2) || !s10 && w2.startsWith("PBES2")) throw new tV('"alg" (Algorithm) Header Parameter value not allowed');
        if (c2 && !c2.has(b2)) throw new tV('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        let v2 = r$(b2);
        void 0 !== g2 && (o10 = tH(g2, "encrypted_key", tz));
        let _2 = false;
        "function" == typeof n10 && (n10 = await n10(u2, e10), _2 = true);
        let S2 = rL(w2), x2 = await r_("dir" === w2 ? v2 : S2, n10, "decrypt");
        try {
          a10 = await rG(w2, v2, x2, o10, i10, l2);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof tz || e11 instanceof tJ) throw e11;
          a10 = rt(v2);
        }
        let k2 = await rh(v2, a10, d2, p2, h2, f2);
        if ("DEF" === i10.zip) {
          let e11 = l2?.maxDecompressedLength ?? 25e4;
          if (0 === e11) throw new tJ('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (e11 !== 1 / 0 && (!Number.isSafeInteger(e11) || e11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          k2 = await r2(k2, e11).catch((e12) => {
            if (e12 instanceof tz) throw e12;
            throw new tz("Failed to decompress plaintext", { cause: e12 });
          });
        }
        return [k2, u2, x2, _2];
      }
      async function np(e10, t10, r10) {
        return nd(e10, function(e11) {
          let t11;
          let { protected: r11, ciphertext: n10, iv: i10, tag: o10, aad: a10 } = e11;
          r11 && (t11 = function(e12, t12, r12) {
            let n11;
            try {
              n11 = JSON.parse(tx.decode(tR(e12)));
            } catch {
              throw new t12(r12);
            }
            if (!tN(n11)) throw new t12(r12);
            return n11;
          }(r11, tz, "JWE Protected Header is invalid"));
          let s10 = void 0 !== r11 ? tT(r11) : new Uint8Array();
          return [t11, tH(n10, "ciphertext", tz), void 0 !== i10 ? tH(i10, "iv", tz) : void 0, void 0 !== o10 ? tH(o10, "tag", tz) : void 0, void 0 !== a10 ? tk(s10, tT("."), function(e12, t12, r12) {
            try {
              return tT(e12);
            } catch {
              throw new r12("The aad is not a valid base64url string");
            }
          }(a10, 0, tz)) : s10];
        }(e10), t10, r10);
      }
      async function nh(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = tS.decode(e10)), "string" != typeof e10) throw new tz("Compact JWE must be a string or Uint8Array");
        let { 0: n10, 1: i10, 2: o10, 3: a10, 4: s10, length: c2 } = e10.split(".");
        if (5 !== c2) throw new tz("Invalid Compact JWE");
        return np({ ciphertext: a10, iv: o10 || void 0, protected: n10, tag: s10 || void 0, encrypted_key: i10 || void 0 }, t10, r10);
      }
      async function nf(e10, t10, r10) {
        let n10 = await nh(e10, [r10 && rY("keyManagementAlgorithms", r10.keyManagementAlgorithms), r10 && rY("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms), r10], t10), i10 = n10[1], o10 = function(e11, t11, r11 = {}) {
          let n11;
          try {
            n11 = JSON.parse(tx.decode(t11));
          } catch {
          }
          if (!tN(n11)) throw new tG("JWT Claims Set must be a top-level JSON object");
          let { typ: i11 } = r11;
          if (i11 && ("string" != typeof e11.typ || no(e11.typ) !== no(i11))) throw new tq('unexpected "typ" JWT header value', n11, "typ", nt);
          let { requiredClaims: o11 = [], issuer: a11, subject: s10, audience: c2, maxTokenAge: l2 } = r11, u2 = [...o11];
          for (let e12 of (void 0 !== l2 && u2.push("iat"), void 0 !== c2 && u2.push("aud"), void 0 !== s10 && u2.push("sub"), void 0 !== a11 && u2.push("iss"), new Set(u2.reverse()))) if (!Object.hasOwn(n11, e12)) throw new tq(`missing required "${e12}" claim`, n11, e12, "missing");
          void 0 === a11 || (Array.isArray(a11) ? a11 : [a11]).includes(n11.iss) || nc(n11, "iss"), void 0 !== s10 && n11.sub !== s10 && nc(n11, "sub"), void 0 === c2 || na(n11.aud, "string" == typeof c2 ? [c2] : c2) || nc(n11, "aud");
          let { clockTolerance: d2 } = r11, p2 = 0;
          if ("string" == typeof d2) p2 = nr(d2);
          else if (void 0 !== d2) {
            if ("number" != typeof d2) throw TypeError("Invalid clockTolerance option type");
            p2 = d2;
          }
          nn("clockTolerance option", p2);
          let { currentDate: h2 } = r11, f2 = nn("currentDate option", r9(h2 || /* @__PURE__ */ new Date())), g2 = ns(n11, "iat", void 0 !== l2), m2 = ns(n11, "nbf");
          if (void 0 !== m2 && m2 > f2 + p2) throw new tq('"nbf" claim timestamp check failed', n11, "nbf", nt);
          let y2 = ns(n11, "exp");
          if (void 0 !== y2 && y2 <= f2 - p2) throw new tK('"exp" claim timestamp check failed', n11, "exp", nt);
          if (void 0 !== l2) {
            let e12 = f2 - g2;
            if (e12 - p2 > ("number" == typeof l2 ? l2 : nr(l2))) throw new tK('"iat" claim timestamp check failed (too far in the past)', n11, "iat", nt);
            if (e12 < 0 - p2) throw new tq('"iat" claim timestamp check failed (it should be in the past)', n11, "iat", nt);
          }
          return n11;
        }(i10, n10[0], r10);
        if (void 0 !== i10.iss && i10.iss !== o10.iss) throw new tq('replicated "iss" claim header parameter mismatch', o10, "iss", "mismatch");
        if (void 0 !== i10.sub && i10.sub !== o10.sub) throw new tq('replicated "sub" claim header parameter mismatch', o10, "sub", "mismatch");
        if (void 0 !== i10.aud && JSON.stringify(i10.aud) !== JSON.stringify(o10.aud)) throw new tq('replicated "aud" claim header parameter mismatch', o10, "aud", "mismatch");
        let a10 = { payload: o10, protectedHeader: i10 };
        return "function" == typeof t10 ? { ...a10, key: n10[2] } : a10;
      }
      let ng = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, nm = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, ny = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, nw = /^[\u0020-\u003A\u003D-\u007E]*$/, nb = Object.prototype.toString, nv = (() => {
        let e10 = function() {
        };
        return e10.prototype = /* @__PURE__ */ Object.create(null), e10;
      })();
      function n_(e10, t10) {
        let r10 = new nv(), n10 = e10.length;
        if (n10 < 2) return r10;
        let i10 = t10?.decode || nE, o10 = 0;
        do {
          let t11 = e10.indexOf("=", o10);
          if (-1 === t11) break;
          let a10 = e10.indexOf(";", o10), s10 = -1 === a10 ? n10 : a10;
          if (t11 > s10) {
            o10 = e10.lastIndexOf(";", t11 - 1) + 1;
            continue;
          }
          let c2 = nS(e10, o10, t11), l2 = nx(e10, t11, c2), u2 = e10.slice(c2, l2);
          if (void 0 === r10[u2]) {
            let n11 = nS(e10, t11 + 1, s10), o11 = nx(e10, s10, n11), a11 = i10(e10.slice(n11, o11));
            r10[u2] = a11;
          }
          o10 = s10 + 1;
        } while (o10 < n10);
        return r10;
      }
      function nS(e10, t10, r10) {
        do {
          let r11 = e10.charCodeAt(t10);
          if (32 !== r11 && 9 !== r11) return t10;
        } while (++t10 < r10);
        return r10;
      }
      function nx(e10, t10, r10) {
        for (; t10 > r10; ) {
          let r11 = e10.charCodeAt(--t10);
          if (32 !== r11 && 9 !== r11) return t10 + 1;
        }
        return r10;
      }
      function nk(e10, t10, r10) {
        let n10 = r10?.encode || encodeURIComponent;
        if (!ng.test(e10)) throw TypeError(`argument name is invalid: ${e10}`);
        let i10 = n10(t10);
        if (!nm.test(i10)) throw TypeError(`argument val is invalid: ${t10}`);
        let o10 = e10 + "=" + i10;
        if (!r10) return o10;
        if (void 0 !== r10.maxAge) {
          if (!Number.isInteger(r10.maxAge)) throw TypeError(`option maxAge is invalid: ${r10.maxAge}`);
          o10 += "; Max-Age=" + r10.maxAge;
        }
        if (r10.domain) {
          if (!ny.test(r10.domain)) throw TypeError(`option domain is invalid: ${r10.domain}`);
          o10 += "; Domain=" + r10.domain;
        }
        if (r10.path) {
          if (!nw.test(r10.path)) throw TypeError(`option path is invalid: ${r10.path}`);
          o10 += "; Path=" + r10.path;
        }
        if (r10.expires) {
          var a10;
          if (a10 = r10.expires, "[object Date]" !== nb.call(a10) || !Number.isFinite(r10.expires.valueOf())) throw TypeError(`option expires is invalid: ${r10.expires}`);
          o10 += "; Expires=" + r10.expires.toUTCString();
        }
        if (r10.httpOnly && (o10 += "; HttpOnly"), r10.secure && (o10 += "; Secure"), r10.partitioned && (o10 += "; Partitioned"), r10.priority) switch ("string" == typeof r10.priority ? r10.priority.toLowerCase() : void 0) {
          case "low":
            o10 += "; Priority=Low";
            break;
          case "medium":
            o10 += "; Priority=Medium";
            break;
          case "high":
            o10 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r10.priority}`);
        }
        if (r10.sameSite) switch ("string" == typeof r10.sameSite ? r10.sameSite.toLowerCase() : r10.sameSite) {
          case true:
          case "strict":
            o10 += "; SameSite=Strict";
            break;
          case "lax":
            o10 += "; SameSite=Lax";
            break;
          case "none":
            o10 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r10.sameSite}`);
        }
        return o10;
      }
      function nE(e10) {
        if (-1 === e10.indexOf("%")) return e10;
        try {
          return decodeURIComponent(e10);
        } catch (t10) {
          return e10;
        }
      }
      let { parse: nA } = p, nP = () => Date.now() / 1e3 | 0, nT = "A256CBC-HS512";
      async function nC(e10) {
        let { token: t10 = {}, secret: r10, maxAge: n10 = 2592e3, salt: i10 } = e10, o10 = Array.isArray(r10) ? r10 : [r10], a10 = await nO(nT, o10[0], i10), s10 = await t7({ kty: "oct", k: tO(a10) }, `sha${a10.byteLength << 3}`);
        return await new nu(t10).setProtectedHeader({ alg: "dir", enc: nT, kid: s10 }).setIssuedAt().setExpirationTime(nP() + n10).setJti(crypto.randomUUID()).encrypt(a10);
      }
      async function nR(e10) {
        let { token: t10, secret: r10, salt: n10 } = e10, i10 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        let { payload: o10 } = await nf(t10, async ({ kid: e11, enc: t11 }) => {
          for (let r11 of i10) {
            let i11 = await nO(t11, r11, n10);
            if (void 0 === e11 || e11 === await t7({ kty: "oct", k: tO(i11) }, `sha${i11.byteLength << 3}`)) return i11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [nT, "A256GCM"] });
        return o10;
      }
      async function nO(e10, t10, r10) {
        let n10;
        switch (e10) {
          case "A256CBC-HS512":
            n10 = 64;
            break;
          case "A256GCM":
            n10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await tv("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, n10);
      }
      async function nN({ options: e10, paramValue: t10, cookieValue: r10 }) {
        let { url: n10, callbacks: i10 } = e10, o10 = n10.origin;
        return t10 ? o10 = await i10.redirect({ url: t10, baseUrl: n10.origin }) : r10 && (o10 = await i10.redirect({ url: r10, baseUrl: n10.origin })), { callbackUrl: o10, callbackUrlCookie: o10 !== r10 ? o10 : void 0 };
      }
      let nI = "\x1B[31m", nU = "\x1B[0m", nL = { error(e10) {
        let t10 = e10 instanceof eD ? e10.type : e10.name;
        if (console.error(`${nI}[auth][error]${nU} ${t10}: ${e10.message}`), e10.cause && "object" == typeof e10.cause && "err" in e10.cause && e10.cause.err instanceof Error) {
          let { err: t11, ...r10 } = e10.cause;
          console.error(`${nI}[auth][cause]${nU}:`, t11.stack), r10 && console.error(`${nI}[auth][details]${nU}:`, JSON.stringify(r10, null, 2));
        } else e10.stack && console.error(e10.stack.replace(/.*/, "").substring(1));
      }, warn(e10) {
        console.warn(`\x1B[33m[auth][warn][${e10}]${nU}`, "Read more: https://warnings.authjs.dev");
      }, debug(e10, t10) {
        console.log(`\x1B[90m[auth][debug]:${nU} ${e10}`, JSON.stringify(t10, null, 2));
      } };
      function n$(e10) {
        let t10 = { ...nL };
        return e10.debug || (t10.debug = () => {
        }), e10.logger?.error && (t10.error = e10.logger.error), e10.logger?.warn && (t10.warn = e10.logger.warn), e10.logger?.debug && (t10.debug = e10.logger.debug), e10.logger ?? (e10.logger = t10), t10;
      }
      let nM = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"], { parse: nD, serialize: nj } = p;
      async function nH(e10) {
        if (!("body" in e10) || !e10.body || "POST" !== e10.method) return;
        let t10 = e10.headers.get("content-type");
        return t10?.includes("application/json") ? await e10.json() : t10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await e10.text())) : void 0;
      }
      async function nW(e10, t10) {
        try {
          if ("GET" !== e10.method && "POST" !== e10.method) throw new e7("Only GET and POST requests are supported");
          t10.basePath ?? (t10.basePath = "/auth");
          let r10 = new URL(e10.url), { action: n10, providerId: i10 } = function(e11, t11) {
            let r11 = e11.match(RegExp(`^${t11}(.+)`));
            if (null === r11) throw new e7(`Cannot parse action at ${e11}`);
            let n11 = r11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== n11.length && 2 !== n11.length) throw new e7(`Cannot parse action at ${e11}`);
            let [i11, o10] = n11;
            if (!nM.includes(i11) || o10 && !["signin", "callback", "webauthn-options"].includes(i11)) throw new e7(`Cannot parse action at ${e11}`);
            return { action: i11, providerId: "undefined" == o10 ? void 0 : o10 };
          }(r10.pathname, t10.basePath);
          return { url: r10, action: n10, providerId: i10, method: e10.method, headers: Object.fromEntries(e10.headers), body: e10.body ? await nH(e10) : void 0, cookies: nD(e10.headers.get("cookie") ?? "") ?? {}, error: r10.searchParams.get("error") ?? void 0, query: Object.fromEntries(r10.searchParams) };
        } catch (n10) {
          let r10 = n$(t10);
          r10.error(n10), r10.debug("request", e10);
        }
      }
      function nB(e10) {
        let t10 = new Headers(e10.headers);
        e10.cookies?.forEach((e11) => {
          let { name: r11, value: n11, options: i10 } = e11, o10 = nj(r11, n11, i10);
          t10.has("Set-Cookie") ? t10.append("Set-Cookie", o10) : t10.set("Set-Cookie", o10);
        });
        let r10 = e10.body;
        "application/json" === t10.get("content-type") ? r10 = JSON.stringify(e10.body) : "application/x-www-form-urlencoded" === t10.get("content-type") && (r10 = new URLSearchParams(e10.body).toString());
        let n10 = new Response(r10, { headers: t10, status: e10.redirect ? 302 : e10.status ?? 200 });
        return e10.redirect && n10.headers.set("Location", e10.redirect), n10;
      }
      async function nq(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").toString();
      }
      function nK(e10) {
        let t10 = (e11) => ("0" + e11.toString(16)).slice(-2);
        return Array.from(crypto.getRandomValues(new Uint8Array(e10))).reduce((e11, r10) => e11 + t10(r10), "");
      }
      async function nV({ options: e10, cookieValue: t10, isPost: r10, bodyValue: n10 }) {
        if (t10) {
          let [i11, o11] = t10.split("|");
          if (o11 === await nq(`${i11}${e10.secret}`)) return { csrfTokenVerified: r10 && i11 === n10, csrfToken: i11 };
        }
        let i10 = nK(32), o10 = await nq(`${i10}${e10.secret}`);
        return { cookie: `${i10}|${o10}`, csrfToken: i10 };
      }
      function nJ(e10, t10) {
        if (!t10) throw new tr(`CSRF token was missing during an action ${e10}`);
      }
      function nF(e10) {
        return null !== e10 && "object" == typeof e10;
      }
      function nz(e10, ...t10) {
        if (!t10.length) return e10;
        let r10 = t10.shift();
        if (nF(e10) && nF(r10)) for (let t11 in r10) nF(r10[t11]) ? (nF(e10[t11]) || (e10[t11] = Array.isArray(r10[t11]) ? [] : {}), nz(e10[t11], r10[t11])) : void 0 !== r10[t11] && (e10[t11] = r10[t11]);
        return nz(e10, ...t10);
      }
      let nG = Symbol("skip-csrf-check"), nX = Symbol("return-type-raw"), nZ = Symbol("custom-fetch"), nY = Symbol("conform-internal"), nQ = (e10) => n1({ id: e10.sub ?? e10.id ?? crypto.randomUUID(), name: e10.name ?? e10.nickname ?? e10.preferred_username, email: e10.email, image: e10.picture }), n0 = (e10) => n1({ access_token: e10.access_token, id_token: e10.id_token, refresh_token: e10.refresh_token, expires_at: e10.expires_at, scope: e10.scope, token_type: e10.token_type, session_state: e10.session_state });
      function n1(e10) {
        let t10 = {};
        for (let [r10, n10] of Object.entries(e10)) void 0 !== n10 && (t10[r10] = n10);
        return t10;
      }
      function n2(e10, t10) {
        if (!e10 && t10) return;
        if ("string" == typeof e10) return { url: new URL(e10) };
        let r10 = new URL(e10?.url ?? "https://authjs.dev");
        if (e10?.params != null) for (let [t11, n10] of Object.entries(e10.params)) "claims" === t11 && (n10 = JSON.stringify(n10)), r10.searchParams.set(t11, String(n10));
        return { url: r10, request: e10?.request, conform: e10?.conform, ...e10?.clientPrivateKey ? { clientPrivateKey: e10?.clientPrivateKey } : null };
      }
      let n3 = { signIn: () => true, redirect: ({ url: e10, baseUrl: t10 }) => e10.startsWith("/") ? `${t10}${e10}` : new URL(e10).origin === t10 ? e10 : t10, session: ({ session: e10 }) => ({ user: { name: e10.user?.name, email: e10.user?.email, image: e10.user?.image }, expires: e10.expires?.toISOString?.() ?? e10.expires }), jwt: ({ token: e10 }) => e10 };
      async function n5({ authOptions: e10, providerId: t10, action: r10, url: n10, cookies: i10, callbackUrl: o10, csrfToken: a10, csrfDisabled: s10, isPost: c2 }) {
        var l2;
        let u2 = n$(e10), { providers: d2, provider: p2 } = function(e11) {
          let { providerId: t11, config: r11 } = e11, n11 = new URL(r11.basePath ?? "/auth", e11.url.origin), i11 = r11.providers.map((e12) => {
            let t12 = "function" == typeof e12 ? e12() : e12, { options: i12, ...o12 } = t12, a11 = i12?.id ?? o12.id, s11 = nz(o12, i12, { signinUrl: `${n11}/signin/${a11}`, callbackUrl: `${n11}/callback/${a11}` });
            if ("oauth" === t12.type || "oidc" === t12.type) {
              s11.redirectProxyUrl ?? (s11.redirectProxyUrl = i12?.redirectProxyUrl ?? r11.redirectProxyUrl);
              let e13 = function(e14) {
                e14.issuer && (e14.wellKnown ?? (e14.wellKnown = `${e14.issuer}/.well-known/openid-configuration`));
                let t13 = n2(e14.authorization, e14.issuer);
                t13 && !t13.url?.searchParams.has("scope") && t13.url.searchParams.set("scope", "openid profile email");
                let r12 = n2(e14.token, e14.issuer), n12 = n2(e14.userinfo, e14.issuer), i13 = e14.checks ?? ["pkce"];
                return e14.redirectProxyUrl && (i13.includes("state") || i13.push("state"), e14.redirectProxyUrl = `${e14.redirectProxyUrl}/callback/${e14.id}`), { ...e14, authorization: t13, token: r12, checks: i13, userinfo: n12, profile: e14.profile ?? nQ, account: e14.account ?? n0 };
              }(s11);
              return e13.authorization?.url.searchParams.get("response_mode") === "form_post" && delete e13.redirectProxyUrl, e13[nZ] ?? (e13[nZ] = i12?.[nZ]), e13;
            }
            return s11;
          }), o11 = i11.find(({ id: e12 }) => e12 === t11);
          if (t11 && !o11) {
            let e12 = i11.map((e13) => e13.id).join(", ");
            throw Error(`Provider with id "${t11}" not found. Available providers: [${e12}].`);
          }
          return { providers: i11, provider: o11 };
        }({ url: n10, providerId: t10, config: e10 }), h2 = false;
        if ((p2?.type === "oauth" || p2?.type === "oidc") && p2.redirectProxyUrl) try {
          h2 = new URL(p2.redirectProxyUrl).origin === n10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${p2.redirectProxyUrl}`);
        }
        let f2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...e10, url: n10, action: r10, provider: p2, cookies: nz(e$(e10.useSecureCookies ?? "https:" === n10.protocol), e10.cookies), providers: d2, session: { strategy: e10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...e10.session }, jwt: { secret: e10.secret, maxAge: e10.session?.maxAge ?? 2592e3, encode: nC, decode: nR, ...e10.jwt }, events: Object.keys(l2 = e10.events ?? {}).reduce((e11, t11) => (e11[t11] = async (...e12) => {
          try {
            let r11 = l2[t11];
            return await r11(...e12);
          } catch (e13) {
            u2.error(new eK(e13));
          }
        }, e11), {}), adapter: function(e11, t11) {
          if (e11) return Object.keys(e11).reduce((r11, n11) => (r11[n11] = async (...r12) => {
            try {
              t11.debug(`adapter_${n11}`, { args: r12 });
              let i11 = e11[n11];
              return await i11(...r12);
            } catch (r13) {
              let e12 = new eH(r13);
              throw t11.error(e12), e12;
            }
          }, r11), {});
        }(e10.adapter, u2), callbacks: { ...n3, ...e10.callbacks }, logger: u2, callbackUrl: n10.origin, isOnRedirectProxy: h2, experimental: { ...e10.experimental } }, g2 = [];
        if (s10) f2.csrfTokenVerified = true;
        else {
          let { csrfToken: e11, cookie: t11, csrfTokenVerified: r11 } = await nV({ options: f2, cookieValue: i10?.[f2.cookies.csrfToken.name], isPost: c2, bodyValue: a10 });
          f2.csrfToken = e11, f2.csrfTokenVerified = r11, t11 && g2.push({ name: f2.cookies.csrfToken.name, value: t11, options: f2.cookies.csrfToken.options });
        }
        let { callbackUrl: m2, callbackUrlCookie: y2 } = await nN({ options: f2, cookieValue: i10?.[f2.cookies.callbackUrl.name], paramValue: o10 });
        return f2.callbackUrl = m2, y2 && g2.push({ name: f2.cookies.callbackUrl.name, value: y2, options: f2.cookies.callbackUrl.options }), { options: f2, cookies: g2 };
      }
      var n4, n6, n7, n9, n8, ie, it, ir, ii, io, ia, is, ic, il, iu, id, ip, ih, ig, im, iy, iw, ib, iv, i_, iS, ix, ik, iE = {}, iA = [], iP = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, iT = Array.isArray;
      function iC(e10, t10) {
        for (var r10 in t10) e10[r10] = t10[r10];
        return e10;
      }
      function iR(e10) {
        e10 && e10.parentNode && e10.parentNode.removeChild(e10);
      }
      function iO(e10, t10, r10) {
        var n10, i10, o10, a10 = {};
        for (o10 in t10) "key" == o10 ? n10 = t10[o10] : "ref" == o10 ? i10 = t10[o10] : a10[o10] = t10[o10];
        if (arguments.length > 2 && (a10.children = arguments.length > 3 ? ig.call(arguments, 2) : r10), "function" == typeof e10 && null != e10.defaultProps) for (o10 in e10.defaultProps) void 0 === a10[o10] && (a10[o10] = e10.defaultProps[o10]);
        return iN(e10, a10, n10, i10, null);
      }
      function iN(e10, t10, r10, n10, i10) {
        var o10 = { type: e10, props: t10, key: r10, ref: n10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == i10 ? ++iy : i10, __i: -1, __u: 0 };
        return null == i10 && null != im.vnode && im.vnode(o10), o10;
      }
      function iI(e10) {
        return e10.children;
      }
      function iU(e10, t10) {
        this.props = e10, this.context = t10;
      }
      function iL(e10, t10) {
        if (null == t10) return e10.__ ? iL(e10.__, e10.__i + 1) : null;
        for (var r10; t10 < e10.__k.length; t10++) if (null != (r10 = e10.__k[t10]) && null != r10.__e) return r10.__e;
        return "function" == typeof e10.type ? iL(e10) : null;
      }
      function i$(e10) {
        (!e10.__d && (e10.__d = true) && iw.push(e10) && !iM.__r++ || ib !== im.debounceRendering) && ((ib = im.debounceRendering) || iv)(iM);
      }
      function iM() {
        var e10, t10, r10, n10, i10, o10, a10, s10;
        for (iw.sort(i_); e10 = iw.shift(); ) e10.__d && (t10 = iw.length, n10 = void 0, o10 = (i10 = (r10 = e10).__v).__e, a10 = [], s10 = [], r10.__P && ((n10 = iC({}, i10)).__v = i10.__v + 1, im.vnode && im.vnode(n10), iB(r10.__P, n10, i10, r10.__n, r10.__P.namespaceURI, 32 & i10.__u ? [o10] : null, a10, null == o10 ? iL(i10) : o10, !!(32 & i10.__u), s10), n10.__v = i10.__v, n10.__.__k[n10.__i] = n10, iq(a10, n10, s10), n10.__e != o10 && function e11(t11) {
          var r11, n11;
          if (null != (t11 = t11.__) && null != t11.__c) {
            for (t11.__e = t11.__c.base = null, r11 = 0; r11 < t11.__k.length; r11++) if (null != (n11 = t11.__k[r11]) && null != n11.__e) {
              t11.__e = t11.__c.base = n11.__e;
              break;
            }
            return e11(t11);
          }
        }(n10)), iw.length > t10 && iw.sort(i_));
        iM.__r = 0;
      }
      function iD(e10, t10, r10, n10, i10, o10, a10, s10, c2, l2, u2) {
        var d2, p2, h2, f2, g2, m2 = n10 && n10.__k || iA, y2 = t10.length;
        for (r10.__d = c2, function(e11, t11, r11) {
          var n11, i11, o11, a11, s11, c3 = t11.length, l3 = r11.length, u3 = l3, d3 = 0;
          for (e11.__k = [], n11 = 0; n11 < c3; n11++) null != (i11 = t11[n11]) && "boolean" != typeof i11 && "function" != typeof i11 ? (a11 = n11 + d3, (i11 = e11.__k[n11] = "string" == typeof i11 || "number" == typeof i11 || "bigint" == typeof i11 || i11.constructor == String ? iN(null, i11, null, null, null) : iT(i11) ? iN(iI, { children: i11 }, null, null, null) : void 0 === i11.constructor && i11.__b > 0 ? iN(i11.type, i11.props, i11.key, i11.ref ? i11.ref : null, i11.__v) : i11).__ = e11, i11.__b = e11.__b + 1, o11 = null, -1 !== (s11 = i11.__i = function(e12, t12, r12, n12) {
            var i12 = e12.key, o12 = e12.type, a12 = r12 - 1, s12 = r12 + 1, c4 = t12[r12];
            if (null === c4 || c4 && i12 == c4.key && o12 === c4.type && 0 == (131072 & c4.__u)) return r12;
            if (n12 > (null != c4 && 0 == (131072 & c4.__u) ? 1 : 0)) for (; a12 >= 0 || s12 < t12.length; ) {
              if (a12 >= 0) {
                if ((c4 = t12[a12]) && 0 == (131072 & c4.__u) && i12 == c4.key && o12 === c4.type) return a12;
                a12--;
              }
              if (s12 < t12.length) {
                if ((c4 = t12[s12]) && 0 == (131072 & c4.__u) && i12 == c4.key && o12 === c4.type) return s12;
                s12++;
              }
            }
            return -1;
          }(i11, r11, a11, u3)) && (u3--, (o11 = r11[s11]) && (o11.__u |= 131072)), null == o11 || null === o11.__v ? (-1 == s11 && d3--, "function" != typeof i11.type && (i11.__u |= 65536)) : s11 !== a11 && (s11 == a11 - 1 ? d3-- : s11 == a11 + 1 ? d3++ : (s11 > a11 ? d3-- : d3++, i11.__u |= 65536))) : i11 = e11.__k[n11] = null;
          if (u3) for (n11 = 0; n11 < l3; n11++) null != (o11 = r11[n11]) && 0 == (131072 & o11.__u) && (o11.__e == e11.__d && (e11.__d = iL(o11)), function e12(t12, r12, n12) {
            var i12, o12;
            if (im.unmount && im.unmount(t12), (i12 = t12.ref) && (i12.current && i12.current !== t12.__e || iK(i12, null, r12)), null != (i12 = t12.__c)) {
              if (i12.componentWillUnmount) try {
                i12.componentWillUnmount();
              } catch (e13) {
                im.__e(e13, r12);
              }
              i12.base = i12.__P = null;
            }
            if (i12 = t12.__k) for (o12 = 0; o12 < i12.length; o12++) i12[o12] && e12(i12[o12], r12, n12 || "function" != typeof t12.type);
            n12 || iR(t12.__e), t12.__c = t12.__ = t12.__e = t12.__d = void 0;
          }(o11, o11));
        }(r10, t10, m2), c2 = r10.__d, d2 = 0; d2 < y2; d2++) null != (h2 = r10.__k[d2]) && (p2 = -1 === h2.__i ? iE : m2[h2.__i] || iE, h2.__i = d2, iB(e10, h2, p2, i10, o10, a10, s10, c2, l2, u2), f2 = h2.__e, h2.ref && p2.ref != h2.ref && (p2.ref && iK(p2.ref, null, h2), u2.push(h2.ref, h2.__c || f2, h2)), null == g2 && null != f2 && (g2 = f2), 65536 & h2.__u || p2.__k === h2.__k ? c2 = function e11(t11, r11, n11) {
          var i11, o11;
          if ("function" == typeof t11.type) {
            for (i11 = t11.__k, o11 = 0; i11 && o11 < i11.length; o11++) i11[o11] && (i11[o11].__ = t11, r11 = e11(i11[o11], r11, n11));
            return r11;
          }
          t11.__e != r11 && (r11 && t11.type && !n11.contains(r11) && (r11 = iL(t11)), n11.insertBefore(t11.__e, r11 || null), r11 = t11.__e);
          do
            r11 = r11 && r11.nextSibling;
          while (null != r11 && 8 === r11.nodeType);
          return r11;
        }(h2, c2, e10) : "function" == typeof h2.type && void 0 !== h2.__d ? c2 = h2.__d : f2 && (c2 = f2.nextSibling), h2.__d = void 0, h2.__u &= -196609);
        r10.__d = c2, r10.__e = g2;
      }
      function ij(e10, t10, r10) {
        "-" === t10[0] ? e10.setProperty(t10, null == r10 ? "" : r10) : e10[t10] = null == r10 ? "" : "number" != typeof r10 || iP.test(t10) ? r10 : r10 + "px";
      }
      function iH(e10, t10, r10, n10, i10) {
        var o10;
        e: if ("style" === t10) {
          if ("string" == typeof r10) e10.style.cssText = r10;
          else {
            if ("string" == typeof n10 && (e10.style.cssText = n10 = ""), n10) for (t10 in n10) r10 && t10 in r10 || ij(e10.style, t10, "");
            if (r10) for (t10 in r10) n10 && r10[t10] === n10[t10] || ij(e10.style, t10, r10[t10]);
          }
        } else if ("o" === t10[0] && "n" === t10[1]) o10 = t10 !== (t10 = t10.replace(/(PointerCapture)$|Capture$/i, "$1")), t10 = t10.toLowerCase() in e10 || "onFocusOut" === t10 || "onFocusIn" === t10 ? t10.toLowerCase().slice(2) : t10.slice(2), e10.l || (e10.l = {}), e10.l[t10 + o10] = r10, r10 ? n10 ? r10.u = n10.u : (r10.u = iS, e10.addEventListener(t10, o10 ? ik : ix, o10)) : e10.removeEventListener(t10, o10 ? ik : ix, o10);
        else {
          if ("http://www.w3.org/2000/svg" == i10) t10 = t10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("width" != t10 && "height" != t10 && "href" != t10 && "list" != t10 && "form" != t10 && "tabIndex" != t10 && "download" != t10 && "rowSpan" != t10 && "colSpan" != t10 && "role" != t10 && "popover" != t10 && t10 in e10) try {
            e10[t10] = null == r10 ? "" : r10;
            break e;
          } catch (e11) {
          }
          "function" == typeof r10 || (null == r10 || false === r10 && "-" !== t10[4] ? e10.removeAttribute(t10) : e10.setAttribute(t10, "popover" == t10 && 1 == r10 ? "" : r10));
        }
      }
      function iW(e10) {
        return function(t10) {
          if (this.l) {
            var r10 = this.l[t10.type + e10];
            if (null == t10.t) t10.t = iS++;
            else if (t10.t < r10.u) return;
            return r10(im.event ? im.event(t10) : t10);
          }
        };
      }
      function iB(e10, t10, r10, n10, i10, o10, a10, s10, c2, l2) {
        var u2, d2, p2, h2, f2, g2, m2, y2, w2, b2, v2, _2, S2, x2, k2, E2, A2 = t10.type;
        if (void 0 !== t10.constructor) return null;
        128 & r10.__u && (c2 = !!(32 & r10.__u), o10 = [s10 = t10.__e = r10.__e]), (u2 = im.__b) && u2(t10);
        e: if ("function" == typeof A2) try {
          if (y2 = t10.props, w2 = "prototype" in A2 && A2.prototype.render, b2 = (u2 = A2.contextType) && n10[u2.__c], v2 = u2 ? b2 ? b2.props.value : u2.__ : n10, r10.__c ? m2 = (d2 = t10.__c = r10.__c).__ = d2.__E : (w2 ? t10.__c = d2 = new A2(y2, v2) : (t10.__c = d2 = new iU(y2, v2), d2.constructor = A2, d2.render = iV), b2 && b2.sub(d2), d2.props = y2, d2.state || (d2.state = {}), d2.context = v2, d2.__n = n10, p2 = d2.__d = true, d2.__h = [], d2._sb = []), w2 && null == d2.__s && (d2.__s = d2.state), w2 && null != A2.getDerivedStateFromProps && (d2.__s == d2.state && (d2.__s = iC({}, d2.__s)), iC(d2.__s, A2.getDerivedStateFromProps(y2, d2.__s))), h2 = d2.props, f2 = d2.state, d2.__v = t10, p2) w2 && null == A2.getDerivedStateFromProps && null != d2.componentWillMount && d2.componentWillMount(), w2 && null != d2.componentDidMount && d2.__h.push(d2.componentDidMount);
          else {
            if (w2 && null == A2.getDerivedStateFromProps && y2 !== h2 && null != d2.componentWillReceiveProps && d2.componentWillReceiveProps(y2, v2), !d2.__e && (null != d2.shouldComponentUpdate && false === d2.shouldComponentUpdate(y2, d2.__s, v2) || t10.__v === r10.__v)) {
              for (t10.__v !== r10.__v && (d2.props = y2, d2.state = d2.__s, d2.__d = false), t10.__e = r10.__e, t10.__k = r10.__k, t10.__k.some(function(e11) {
                e11 && (e11.__ = t10);
              }), _2 = 0; _2 < d2._sb.length; _2++) d2.__h.push(d2._sb[_2]);
              d2._sb = [], d2.__h.length && a10.push(d2);
              break e;
            }
            null != d2.componentWillUpdate && d2.componentWillUpdate(y2, d2.__s, v2), w2 && null != d2.componentDidUpdate && d2.__h.push(function() {
              d2.componentDidUpdate(h2, f2, g2);
            });
          }
          if (d2.context = v2, d2.props = y2, d2.__P = e10, d2.__e = false, S2 = im.__r, x2 = 0, w2) {
            for (d2.state = d2.__s, d2.__d = false, S2 && S2(t10), u2 = d2.render(d2.props, d2.state, d2.context), k2 = 0; k2 < d2._sb.length; k2++) d2.__h.push(d2._sb[k2]);
            d2._sb = [];
          } else do
            d2.__d = false, S2 && S2(t10), u2 = d2.render(d2.props, d2.state, d2.context), d2.state = d2.__s;
          while (d2.__d && ++x2 < 25);
          d2.state = d2.__s, null != d2.getChildContext && (n10 = iC(iC({}, n10), d2.getChildContext())), w2 && !p2 && null != d2.getSnapshotBeforeUpdate && (g2 = d2.getSnapshotBeforeUpdate(h2, f2)), iD(e10, iT(E2 = null != u2 && u2.type === iI && null == u2.key ? u2.props.children : u2) ? E2 : [E2], t10, r10, n10, i10, o10, a10, s10, c2, l2), d2.base = t10.__e, t10.__u &= -161, d2.__h.length && a10.push(d2), m2 && (d2.__E = d2.__ = null);
        } catch (e11) {
          if (t10.__v = null, c2 || null != o10) {
            for (t10.__u |= c2 ? 160 : 128; s10 && 8 === s10.nodeType && s10.nextSibling; ) s10 = s10.nextSibling;
            o10[o10.indexOf(s10)] = null, t10.__e = s10;
          } else t10.__e = r10.__e, t10.__k = r10.__k;
          im.__e(e11, t10, r10);
        }
        else null == o10 && t10.__v === r10.__v ? (t10.__k = r10.__k, t10.__e = r10.__e) : t10.__e = function(e11, t11, r11, n11, i11, o11, a11, s11, c3) {
          var l3, u3, d3, p3, h3, f3, g3, m3 = r11.props, y3 = t11.props, w3 = t11.type;
          if ("svg" === w3 ? i11 = "http://www.w3.org/2000/svg" : "math" === w3 ? i11 = "http://www.w3.org/1998/Math/MathML" : i11 || (i11 = "http://www.w3.org/1999/xhtml"), null != o11) {
            for (l3 = 0; l3 < o11.length; l3++) if ((h3 = o11[l3]) && "setAttribute" in h3 == !!w3 && (w3 ? h3.localName === w3 : 3 === h3.nodeType)) {
              e11 = h3, o11[l3] = null;
              break;
            }
          }
          if (null == e11) {
            if (null === w3) return document.createTextNode(y3);
            e11 = document.createElementNS(i11, w3, y3.is && y3), s11 && (im.__m && im.__m(t11, o11), s11 = false), o11 = null;
          }
          if (null === w3) m3 === y3 || s11 && e11.data === y3 || (e11.data = y3);
          else {
            if (o11 = o11 && ig.call(e11.childNodes), m3 = r11.props || iE, !s11 && null != o11) for (m3 = {}, l3 = 0; l3 < e11.attributes.length; l3++) m3[(h3 = e11.attributes[l3]).name] = h3.value;
            for (l3 in m3) if (h3 = m3[l3], "children" == l3) ;
            else if ("dangerouslySetInnerHTML" == l3) d3 = h3;
            else if (!(l3 in y3)) {
              if ("value" == l3 && "defaultValue" in y3 || "checked" == l3 && "defaultChecked" in y3) continue;
              iH(e11, l3, null, h3, i11);
            }
            for (l3 in y3) h3 = y3[l3], "children" == l3 ? p3 = h3 : "dangerouslySetInnerHTML" == l3 ? u3 = h3 : "value" == l3 ? f3 = h3 : "checked" == l3 ? g3 = h3 : s11 && "function" != typeof h3 || m3[l3] === h3 || iH(e11, l3, h3, m3[l3], i11);
            if (u3) s11 || d3 && (u3.__html === d3.__html || u3.__html === e11.innerHTML) || (e11.innerHTML = u3.__html), t11.__k = [];
            else if (d3 && (e11.innerHTML = ""), iD(e11, iT(p3) ? p3 : [p3], t11, r11, n11, "foreignObject" === w3 ? "http://www.w3.org/1999/xhtml" : i11, o11, a11, o11 ? o11[0] : r11.__k && iL(r11, 0), s11, c3), null != o11) for (l3 = o11.length; l3--; ) iR(o11[l3]);
            s11 || (l3 = "value", "progress" === w3 && null == f3 ? e11.removeAttribute("value") : void 0 === f3 || f3 === e11[l3] && ("progress" !== w3 || f3) && ("option" !== w3 || f3 === m3[l3]) || iH(e11, l3, f3, m3[l3], i11), l3 = "checked", void 0 !== g3 && g3 !== e11[l3] && iH(e11, l3, g3, m3[l3], i11));
          }
          return e11;
        }(r10.__e, t10, r10, n10, i10, o10, a10, c2, l2);
        (u2 = im.diffed) && u2(t10);
      }
      function iq(e10, t10, r10) {
        t10.__d = void 0;
        for (var n10 = 0; n10 < r10.length; n10++) iK(r10[n10], r10[++n10], r10[++n10]);
        im.__c && im.__c(t10, e10), e10.some(function(t11) {
          try {
            e10 = t11.__h, t11.__h = [], e10.some(function(e11) {
              e11.call(t11);
            });
          } catch (e11) {
            im.__e(e11, t11.__v);
          }
        });
      }
      function iK(e10, t10, r10) {
        try {
          if ("function" == typeof e10) {
            var n10 = "function" == typeof e10.__u;
            n10 && e10.__u(), n10 && null == t10 || (e10.__u = e10(t10));
          } else e10.current = t10;
        } catch (e11) {
          im.__e(e11, r10);
        }
      }
      function iV(e10, t10, r10) {
        return this.constructor(e10, r10);
      }
      function iJ(e10, t10) {
        var r10, n10, i10, o10, a10;
        r10 = e10, im.__ && im.__(r10, t10), i10 = (n10 = "function" == typeof iJ) ? null : iJ && iJ.__k || t10.__k, o10 = [], a10 = [], iB(t10, r10 = (!n10 && iJ || t10).__k = iO(iI, null, [r10]), i10 || iE, iE, t10.namespaceURI, !n10 && iJ ? [iJ] : i10 ? null : t10.firstChild ? ig.call(t10.childNodes) : null, o10, !n10 && iJ ? iJ : i10 ? i10.__e : t10.firstChild, n10, a10), iq(o10, r10, a10);
      }
      ig = iA.slice, im = { __e: function(e10, t10, r10, n10) {
        for (var i10, o10, a10; t10 = t10.__; ) if ((i10 = t10.__c) && !i10.__) try {
          if ((o10 = i10.constructor) && null != o10.getDerivedStateFromError && (i10.setState(o10.getDerivedStateFromError(e10)), a10 = i10.__d), null != i10.componentDidCatch && (i10.componentDidCatch(e10, n10 || {}), a10 = i10.__d), a10) return i10.__E = i10;
        } catch (t11) {
          e10 = t11;
        }
        throw e10;
      } }, iy = 0, iU.prototype.setState = function(e10, t10) {
        var r10;
        r10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = iC({}, this.state), "function" == typeof e10 && (e10 = e10(iC({}, r10), this.props)), e10 && iC(r10, e10), null != e10 && this.__v && (t10 && this._sb.push(t10), i$(this));
      }, iU.prototype.forceUpdate = function(e10) {
        this.__v && (this.__e = true, e10 && this.__h.push(e10), i$(this));
      }, iU.prototype.render = iI, iw = [], iv = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, i_ = function(e10, t10) {
        return e10.__v.__b - t10.__v.__b;
      }, iM.__r = 0, iS = 0, ix = iW(false), ik = iW(true);
      var iF = /[\s\n\\/='"\0<>]/, iz = /^(xlink|xmlns|xml)([A-Z])/, iG = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, iX = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, iZ = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), iY = /["&<]/;
      function iQ(e10) {
        if (0 === e10.length || false === iY.test(e10)) return e10;
        for (var t10 = 0, r10 = 0, n10 = "", i10 = ""; r10 < e10.length; r10++) {
          switch (e10.charCodeAt(r10)) {
            case 34:
              i10 = "&quot;";
              break;
            case 38:
              i10 = "&amp;";
              break;
            case 60:
              i10 = "&lt;";
              break;
            default:
              continue;
          }
          r10 !== t10 && (n10 += e10.slice(t10, r10)), n10 += i10, t10 = r10 + 1;
        }
        return r10 !== t10 && (n10 += e10.slice(t10, r10)), n10;
      }
      var i0 = {}, i1 = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), i2 = /[A-Z]/g;
      function i3() {
        this.__d = true;
      }
      var i5, i4, i6, i7, i9 = {}, i8 = [], oe = Array.isArray, ot = Object.assign;
      function or(e10, t10) {
        var r10, n10 = e10.type, i10 = true;
        return e10.__c ? (i10 = false, (r10 = e10.__c).state = r10.__s) : r10 = new n10(e10.props, t10), e10.__c = r10, r10.__v = e10, r10.props = e10.props, r10.context = t10, r10.__d = true, null == r10.state && (r10.state = i9), null == r10.__s && (r10.__s = r10.state), n10.getDerivedStateFromProps ? r10.state = ot({}, r10.state, n10.getDerivedStateFromProps(r10.props, r10.state)) : i10 && r10.componentWillMount ? (r10.componentWillMount(), r10.state = r10.__s !== r10.state ? r10.__s : r10.state) : !i10 && r10.componentWillUpdate && r10.componentWillUpdate(), i6 && i6(e10), r10.render(r10.props, r10.state, t10);
      }
      var on = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]), oi = 0;
      function oo(e10, t10, r10, n10, i10, o10) {
        t10 || (t10 = {});
        var a10, s10, c2 = t10;
        "ref" in t10 && (a10 = t10.ref, delete t10.ref);
        var l2 = { type: e10, props: c2, key: r10, ref: a10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --oi, __i: -1, __u: 0, __source: i10, __self: o10 };
        if ("function" == typeof e10 && (a10 = e10.defaultProps)) for (s10 in a10) void 0 === c2[s10] && (c2[s10] = a10[s10]);
        return im.vnode && im.vnode(l2), l2;
      }
      async function oa(e10, t10) {
        let r10 = window.SimpleWebAuthnBrowser;
        async function n10(r11) {
          let n11 = new URL(`${e10}/webauthn-options/${t10}`);
          r11 && n11.searchParams.append("action", r11), o10().forEach((e11) => {
            n11.searchParams.append(e11.name, e11.value);
          });
          let i11 = await fetch(n11);
          if (!i11.ok) {
            console.error("Failed to fetch options", i11);
            return;
          }
          return i11.json();
        }
        function i10() {
          let e11 = `#${t10}-form`, r11 = document.querySelector(e11);
          if (!r11) throw Error(`Form '${e11}' not found`);
          return r11;
        }
        function o10() {
          return Array.from(i10().querySelectorAll("input[data-form-field]"));
        }
        async function a10(e11, t11) {
          let r11 = i10();
          if (e11) {
            let t12 = document.createElement("input");
            t12.type = "hidden", t12.name = "action", t12.value = e11, r11.appendChild(t12);
          }
          if (t11) {
            let e12 = document.createElement("input");
            e12.type = "hidden", e12.name = "data", e12.value = JSON.stringify(t11), r11.appendChild(e12);
          }
          return r11.submit();
        }
        async function s10(e11, t11) {
          let n11 = await r10.startAuthentication(e11, t11);
          return await a10("authenticate", n11);
        }
        async function c2(e11) {
          o10().forEach((e12) => {
            if (e12.required && !e12.value) throw Error(`Missing required field: ${e12.name}`);
          });
          let t11 = await r10.startRegistration(e11);
          return await a10("register", t11);
        }
        async function l2() {
          if (!r10.browserSupportsWebAuthnAutofill()) return;
          let e11 = await n10("authenticate");
          if (!e11) {
            console.error("Failed to fetch option for autofill authentication");
            return;
          }
          try {
            await s10(e11.options, true);
          } catch (e12) {
            console.error(e12);
          }
        }
        (async function() {
          let e11 = i10();
          if (!r10.browserSupportsWebAuthn()) {
            e11.style.display = "none";
            return;
          }
          e11 && e11.addEventListener("submit", async (e12) => {
            e12.preventDefault();
            let t11 = await n10(void 0);
            if (!t11) {
              console.error("Failed to fetch options for form submission");
              return;
            }
            if ("authenticate" === t11.action) try {
              await s10(t11.options, false);
            } catch (e13) {
              console.error(e13);
            }
            else if ("register" === t11.action) try {
              await c2(t11.options);
            } catch (e13) {
              console.error(e13);
            }
          });
        })(), l2();
      }
      let os = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." }, oc = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
      function ol({ html: e10, title: t10, status: r10, cookies: n10, theme: i10, headTags: o10 }) {
        return { cookies: n10, status: r10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${oc}</style><title>${t10}</title>${o10 ?? ""}</head><body class="__next-auth-theme-${i10?.colorScheme ?? "auto"}"><div class="page">${function(e11, t11, r11) {
          var n11 = im.__s;
          im.__s = true, i5 = im.__b, i4 = im.diffed, i6 = im.__r, i7 = im.unmount;
          var i11 = iO(iI, null);
          i11.__k = [e11];
          try {
            var o11 = function e12(t12, r12, n12, i12, o12, a10, s10) {
              if (null == t12 || true === t12 || false === t12 || "" === t12) return "";
              var c2 = typeof t12;
              if ("object" != c2) return "function" == c2 ? "" : "string" == c2 ? iQ(t12) : t12 + "";
              if (oe(t12)) {
                var l2, u2 = "";
                o12.__k = t12;
                for (var d2 = 0; d2 < t12.length; d2++) {
                  var p2 = t12[d2];
                  if (null != p2 && "boolean" != typeof p2) {
                    var h2, f2 = e12(p2, r12, n12, i12, o12, a10, s10);
                    "string" == typeof f2 ? u2 += f2 : (l2 || (l2 = []), u2 && l2.push(u2), u2 = "", oe(f2) ? (h2 = l2).push.apply(h2, f2) : l2.push(f2));
                  }
                }
                return l2 ? (u2 && l2.push(u2), l2) : u2;
              }
              if (void 0 !== t12.constructor) return "";
              t12.__ = o12, i5 && i5(t12);
              var g2 = t12.type, m2 = t12.props;
              if ("function" == typeof g2) {
                var y2, w2, b2, v2 = r12;
                if (g2 === iI) {
                  if ("tpl" in m2) {
                    for (var _2 = "", S2 = 0; S2 < m2.tpl.length; S2++) if (_2 += m2.tpl[S2], m2.exprs && S2 < m2.exprs.length) {
                      var x2 = m2.exprs[S2];
                      if (null == x2) continue;
                      "object" == typeof x2 && (void 0 === x2.constructor || oe(x2)) ? _2 += e12(x2, r12, n12, i12, t12, a10, s10) : _2 += x2;
                    }
                    return _2;
                  }
                  if ("UNSTABLE_comment" in m2) return "<!--" + iQ(m2.UNSTABLE_comment) + "-->";
                  w2 = m2.children;
                } else {
                  if (null != (y2 = g2.contextType)) {
                    var k2 = r12[y2.__c];
                    v2 = k2 ? k2.props.value : y2.__;
                  }
                  var E2 = g2.prototype && "function" == typeof g2.prototype.render;
                  if (E2) w2 = or(t12, v2), b2 = t12.__c;
                  else {
                    t12.__c = b2 = { __v: t12, context: v2, props: t12.props, setState: i3, forceUpdate: i3, __d: true, __h: [] };
                    for (var A2 = 0; b2.__d && A2++ < 25; ) b2.__d = false, i6 && i6(t12), w2 = g2.call(b2, m2, v2);
                    b2.__d = true;
                  }
                  if (null != b2.getChildContext && (r12 = ot({}, r12, b2.getChildContext())), E2 && im.errorBoundaries && (g2.getDerivedStateFromError || b2.componentDidCatch)) {
                    w2 = null != w2 && w2.type === iI && null == w2.key && null == w2.props.tpl ? w2.props.children : w2;
                    try {
                      return e12(w2, r12, n12, i12, t12, a10, s10);
                    } catch (o13) {
                      return g2.getDerivedStateFromError && (b2.__s = g2.getDerivedStateFromError(o13)), b2.componentDidCatch && b2.componentDidCatch(o13, i9), b2.__d ? (w2 = or(t12, r12), null != (b2 = t12.__c).getChildContext && (r12 = ot({}, r12, b2.getChildContext())), e12(w2 = null != w2 && w2.type === iI && null == w2.key && null == w2.props.tpl ? w2.props.children : w2, r12, n12, i12, t12, a10, s10)) : "";
                    } finally {
                      i4 && i4(t12), t12.__ = null, i7 && i7(t12);
                    }
                  }
                }
                w2 = null != w2 && w2.type === iI && null == w2.key && null == w2.props.tpl ? w2.props.children : w2;
                try {
                  var P2 = e12(w2, r12, n12, i12, t12, a10, s10);
                  return i4 && i4(t12), t12.__ = null, im.unmount && im.unmount(t12), P2;
                } catch (o13) {
                  if (!a10 && s10 && s10.onError) {
                    var T2 = s10.onError(o13, t12, function(o14) {
                      return e12(o14, r12, n12, i12, t12, a10, s10);
                    });
                    if (void 0 !== T2) return T2;
                    var C2 = im.__e;
                    return C2 && C2(o13, t12), "";
                  }
                  if (!a10 || !o13 || "function" != typeof o13.then) throw o13;
                  return o13.then(function o14() {
                    try {
                      return e12(w2, r12, n12, i12, t12, a10, s10);
                    } catch (c3) {
                      if (!c3 || "function" != typeof c3.then) throw c3;
                      return c3.then(function() {
                        return e12(w2, r12, n12, i12, t12, a10, s10);
                      }, o14);
                    }
                  });
                }
              }
              var R2, O2 = "<" + g2, N2 = "";
              for (var I2 in m2) {
                var U2 = m2[I2];
                if ("function" != typeof U2 || "class" === I2 || "className" === I2) {
                  switch (I2) {
                    case "children":
                      R2 = U2;
                      continue;
                    case "key":
                    case "ref":
                    case "__self":
                    case "__source":
                      continue;
                    case "htmlFor":
                      if ("for" in m2) continue;
                      I2 = "for";
                      break;
                    case "className":
                      if ("class" in m2) continue;
                      I2 = "class";
                      break;
                    case "defaultChecked":
                      I2 = "checked";
                      break;
                    case "defaultSelected":
                      I2 = "selected";
                      break;
                    case "defaultValue":
                    case "value":
                      switch (I2 = "value", g2) {
                        case "textarea":
                          R2 = U2;
                          continue;
                        case "select":
                          i12 = U2;
                          continue;
                        case "option":
                          i12 != U2 || "selected" in m2 || (O2 += " selected");
                      }
                      break;
                    case "dangerouslySetInnerHTML":
                      N2 = U2 && U2.__html;
                      continue;
                    case "style":
                      "object" == typeof U2 && (U2 = function(e13) {
                        var t13 = "";
                        for (var r13 in e13) {
                          var n13 = e13[r13];
                          if (null != n13 && "" !== n13) {
                            var i13 = "-" == r13[0] ? r13 : i0[r13] || (i0[r13] = r13.replace(i2, "-$&").toLowerCase()), o13 = ";";
                            "number" != typeof n13 || i13.startsWith("--") || i1.has(i13) || (o13 = "px;"), t13 = t13 + i13 + ":" + n13 + o13;
                          }
                        }
                        return t13 || void 0;
                      }(U2));
                      break;
                    case "acceptCharset":
                      I2 = "accept-charset";
                      break;
                    case "httpEquiv":
                      I2 = "http-equiv";
                      break;
                    default:
                      if (iz.test(I2)) I2 = I2.replace(iz, "$1:$2").toLowerCase();
                      else {
                        if (iF.test(I2)) continue;
                        ("-" === I2[4] || iZ.has(I2)) && null != U2 ? U2 += "" : n12 ? iX.test(I2) && (I2 = "panose1" === I2 ? "panose-1" : I2.replace(/([A-Z])/g, "-$1").toLowerCase()) : iG.test(I2) && (I2 = I2.toLowerCase());
                      }
                  }
                  null != U2 && false !== U2 && (O2 = true === U2 || "" === U2 ? O2 + " " + I2 : O2 + " " + I2 + '="' + ("string" == typeof U2 ? iQ(U2) : U2 + "") + '"');
                }
              }
              if (iF.test(g2)) throw Error(g2 + " is not a valid HTML tag name in " + O2 + ">");
              if (N2 || ("string" == typeof R2 ? N2 = iQ(R2) : null != R2 && false !== R2 && true !== R2 && (N2 = e12(R2, r12, "svg" === g2 || "foreignObject" !== g2 && n12, i12, t12, a10, s10))), i4 && i4(t12), t12.__ = null, i7 && i7(t12), !N2 && on.has(g2)) return O2 + "/>";
              var L2 = "</" + g2 + ">", $2 = O2 + ">";
              return oe(N2) ? [$2].concat(N2, [L2]) : "string" != typeof N2 ? [$2, N2, L2] : $2 + N2 + L2;
            }(e11, i9, false, void 0, i11, false, void 0);
            return oe(o11) ? o11.join("") : o11;
          } catch (e12) {
            if (e12.then) throw Error('Use "renderToStringAsync" for suspenseful rendering.');
            throw e12;
          } finally {
            im.__c && im.__c(e11, i8), im.__s = n11, i8.length = 0;
          }
        }(e10)}</div></body></html>` };
      }
      function ou(e10) {
        let { url: t10, theme: r10, query: n10, cookies: i10, pages: o10, providers: a10 } = e10;
        return { csrf: (e11, t11, r11) => e11 ? (t11.logger.warn("csrf-disabled"), r11.push({ name: t11.cookies.csrfToken.name, value: "", options: { ...t11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: r11 }) : { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" }, body: { csrfToken: t11.csrfToken }, cookies: r11 }, providers: (e11) => ({ headers: { "Content-Type": "application/json" }, body: e11.reduce((e12, { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: o11 }) => (e12[t11] = { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: o11 }, e12), {}) }), signin(t11, s10) {
          if (t11) throw new e7("Unsupported action");
          if (o10?.signIn) {
            let t12 = `${o10.signIn}${o10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: e10.callbackUrl ?? "/" })}`;
            return s10 && (t12 = `${t12}&${new URLSearchParams({ error: s10 })}`), { redirect: t12, cookies: i10 };
          }
          let c2 = a10?.find((e11) => "webauthn" === e11.type && e11.enableConditionalUI && !!e11.simpleWebAuthnBrowserVersion), l2 = "";
          if (c2) {
            let { simpleWebAuthnBrowserVersion: e11 } = c2;
            l2 = `<script src="https://unpkg.com/@simplewebauthn/browser@${e11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return ol({ cookies: i10, theme: r10, html: function(e11) {
            let { csrfToken: t12, providers: r11 = [], callbackUrl: n11, theme: i11, email: o11, error: a11 } = e11;
            "undefined" != typeof document && i11?.brandColor && document.documentElement.style.setProperty("--brand-color", i11.brandColor), "undefined" != typeof document && i11?.buttonText && document.documentElement.style.setProperty("--button-text-color", i11.buttonText);
            let s11 = a11 && (os[a11] ?? os.default), c3 = r11.find((e12) => "webauthn" === e12.type && e12.enableConditionalUI)?.id;
            return oo("div", { className: "signin", children: [i11?.brandColor && oo("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${i11.brandColor}}` } }), i11?.buttonText && oo("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${i11.buttonText}
        }
      ` } }), oo("div", { className: "card", children: [s11 && oo("div", { className: "error", children: oo("p", { children: s11 }) }), i11?.logo && oo("img", { src: i11.logo, alt: "Logo", className: "logo" }), r11.map((e12, i12) => {
              let a12, s12, c4;
              ("oauth" === e12.type || "oidc" === e12.type) && ({ bg: a12 = "#fff", brandColor: s12, logo: c4 = `https://authjs.dev/img/providers/${e12.id}.svg` } = e12.style ?? {});
              let l3 = s12 ?? a12 ?? "#fff";
              return oo("div", { className: "provider", children: ["oauth" === e12.type || "oidc" === e12.type ? oo("form", { action: e12.signinUrl, method: "POST", children: [oo("input", { type: "hidden", name: "csrfToken", value: t12 }), n11 && oo("input", { type: "hidden", name: "callbackUrl", value: n11 }), oo("button", { type: "submit", className: "button", style: { "--provider-brand-color": l3 }, tabIndex: 0, children: [oo("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", e12.name] }), c4 && oo("img", { loading: "lazy", height: 24, src: c4 })] })] }) : null, ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 > 0 && "email" !== r11[i12 - 1].type && "credentials" !== r11[i12 - 1].type && "webauthn" !== r11[i12 - 1].type && oo("hr", {}), "email" === e12.type && oo("form", { action: e12.signinUrl, method: "POST", children: [oo("input", { type: "hidden", name: "csrfToken", value: t12 }), oo("label", { className: "section-header", htmlFor: `input-email-for-${e12.id}-provider`, children: "Email" }), oo("input", { id: `input-email-for-${e12.id}-provider`, autoFocus: true, type: "email", name: "email", value: o11, placeholder: "email@example.com", required: true }), oo("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "credentials" === e12.type && oo("form", { action: e12.callbackUrl, method: "POST", children: [oo("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.credentials).map((t13) => oo("div", { children: [oo("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.credentials[t13].label ?? t13 }), oo("input", { name: t13, id: `input-${t13}-for-${e12.id}-provider`, type: e12.credentials[t13].type ?? "text", placeholder: e12.credentials[t13].placeholder ?? "", ...e12.credentials[t13] })] }, `input-group-${e12.id}`)), oo("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "webauthn" === e12.type && oo("form", { action: e12.callbackUrl, method: "POST", id: `${e12.id}-form`, children: [oo("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.formFields).map((t13) => oo("div", { children: [oo("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.formFields[t13].label ?? t13 }), oo("input", { name: t13, "data-form-field": true, id: `input-${t13}-for-${e12.id}-provider`, type: e12.formFields[t13].type ?? "text", placeholder: e12.formFields[t13].placeholder ?? "", ...e12.formFields[t13] })] }, `input-group-${e12.id}`)), oo("button", { id: `submitButton-${e12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 + 1 < r11.length && oo("hr", {})] }, e12.id);
            })] }), c3 && oo(iI, { children: oo("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${oa})(authURL, "${c3}");
` } }) })] });
          }({ csrfToken: e10.csrfToken, providers: e10.providers?.filter((e11) => ["email", "oauth", "oidc"].includes(e11.type) || "credentials" === e11.type && e11.credentials || "webauthn" === e11.type && e11.formFields || false), callbackUrl: e10.callbackUrl, theme: e10.theme, error: s10, ...n10 }), title: "Sign In", headTags: l2 });
        }, signout: () => o10?.signOut ? { redirect: o10.signOut, cookies: i10 } : ol({ cookies: i10, theme: r10, html: function(e11) {
          let { url: t11, csrfToken: r11, theme: n11 } = e11;
          return oo("div", { className: "signout", children: [n11?.brandColor && oo("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11.brandColor}
        }
      ` } }), n11?.buttonText && oo("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${n11.buttonText}
        }
      ` } }), oo("div", { className: "card", children: [n11?.logo && oo("img", { src: n11.logo, alt: "Logo", className: "logo" }), oo("h1", { children: "Signout" }), oo("p", { children: "Are you sure you want to sign out?" }), oo("form", { action: t11?.toString(), method: "POST", children: [oo("input", { type: "hidden", name: "csrfToken", value: r11 }), oo("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        }({ csrfToken: e10.csrfToken, url: t10, theme: r10 }), title: "Sign Out" }), verifyRequest: (e11) => o10?.verifyRequest ? { redirect: `${o10.verifyRequest}${t10?.search ?? ""}`, cookies: i10 } : ol({ cookies: i10, theme: r10, html: function(e12) {
          let { url: t11, theme: r11 } = e12;
          return oo("div", { className: "verify-request", children: [r11.brandColor && oo("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${r11.brandColor}
        }
      ` } }), oo("div", { className: "card", children: [r11.logo && oo("img", { src: r11.logo, alt: "Logo", className: "logo" }), oo("h1", { children: "Check your email" }), oo("p", { children: "A sign in link has been sent to your email address." }), oo("p", { children: oo("a", { className: "site", href: t11.origin, children: t11.host }) })] })] });
        }({ url: t10, theme: r10, ...e11 }), title: "Verify Request" }), error: (e11) => o10?.error ? { redirect: `${o10.error}${o10.error.includes("?") ? "&" : "?"}error=${e11}`, cookies: i10 } : ol({ cookies: i10, theme: r10, ...function(e12) {
          let { url: t11, error: r11 = "default", theme: n11 } = e12, i11 = `${t11}/signin`, o11 = { default: { status: 200, heading: "Error", message: oo("p", { children: oo("a", { className: "site", href: t11?.origin, children: t11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: oo("div", { children: [oo("p", { children: "There is a problem with the server configuration." }), oo("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: oo("div", { children: [oo("p", { children: "You do not have permission to sign in." }), oo("p", { children: oo("a", { className: "button", href: i11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: oo("div", { children: [oo("p", { children: "The sign in link is no longer valid." }), oo("p", { children: "It may have been used already or it may have expired." })] }), signin: oo("a", { className: "button", href: i11, children: "Sign in" }) } }, { status: a11, heading: s10, message: c2, signin: l2 } = o11[r11] ?? o11.default;
          return { status: a11, html: oo("div", { className: "error", children: [n11?.brandColor && oo("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11?.brandColor}
        }
      ` } }), oo("div", { className: "card", children: [n11?.logo && oo("img", { src: n11?.logo, alt: "Logo", className: "logo" }), oo("h1", { children: s10 }), oo("div", { className: "message", children: c2 }), l2] })] }) };
        }({ url: t10, theme: r10, error: e11 }), title: "Error" }) };
      }
      function od(e10, t10 = Date.now()) {
        return new Date(t10 + 1e3 * e10);
      }
      async function op(e10, t10, r10, n10) {
        if (!r10?.providerAccountId || !r10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(r10.type)) throw Error("Provider not supported");
        let { adapter: i10, jwt: o10, events: a10, session: { strategy: s10, generateSessionToken: c2 } } = n10;
        if (!i10) return { user: t10, account: r10 };
        let l2 = r10, { createUser: u2, updateUser: d2, getUser: p2, getUserByAccount: h2, getUserByEmail: f2, linkAccount: g2, createSession: m2, getSessionAndUser: y2, deleteSession: w2 } = i10, b2 = null, v2 = null, _2 = false, S2 = "jwt" === s10;
        if (e10) {
          if (S2) try {
            let t11 = n10.cookies.sessionToken.name;
            (b2 = await o10.decode({ ...o10, token: e10, salt: t11 })) && "sub" in b2 && b2.sub && (v2 = await p2(b2.sub));
          } catch {
          }
          else {
            let t11 = await y2(e10);
            t11 && (b2 = t11.session, v2 = t11.user);
          }
        }
        if ("email" === l2.type) {
          let r11 = await f2(t10.email);
          return r11 ? (v2?.id !== r11.id && !S2 && e10 && await w2(e10), v2 = await d2({ id: r11.id, emailVerified: /* @__PURE__ */ new Date() }), await a10.updateUser?.({ user: v2 })) : (v2 = await u2({ ...t10, emailVerified: /* @__PURE__ */ new Date() }), await a10.createUser?.({ user: v2 }), _2 = true), { session: b2 = S2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: od(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
        if ("webauthn" === l2.type) {
          let e11 = await h2({ providerAccountId: l2.providerAccountId, provider: l2.provider });
          if (e11) {
            if (v2) {
              if (e11.id === v2.id) {
                let e12 = { ...l2, userId: v2.id };
                return { session: b2, user: v2, isNewUser: _2, account: e12 };
              }
              throw new ts("The account is already associated with another user", { provider: l2.provider });
            }
            b2 = S2 ? {} : await m2({ sessionToken: c2(), userId: e11.id, expires: od(n10.session.maxAge) });
            let t11 = { ...l2, userId: e11.id };
            return { session: b2, user: e11, isNewUser: _2, account: t11 };
          }
          {
            if (v2) {
              await g2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 });
              let e13 = { ...l2, userId: v2.id };
              return { session: b2, user: v2, isNewUser: _2, account: e13 };
            }
            if (t10.email ? await f2(t10.email) : null) throw new ts("Another account already exists with the same e-mail address", { provider: l2.provider });
            v2 = await u2({ ...t10 }), await a10.createUser?.({ user: v2 }), await g2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), b2 = S2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: od(n10.session.maxAge) });
            let e12 = { ...l2, userId: v2.id };
            return { session: b2, user: v2, isNewUser: true, account: e12 };
          }
        }
        let x2 = await h2({ providerAccountId: l2.providerAccountId, provider: l2.provider });
        if (x2) {
          if (v2) {
            if (x2.id === v2.id) return { session: b2, user: v2, isNewUser: _2 };
            throw new e0("The account is already associated with another user", { provider: l2.provider });
          }
          return { session: b2 = S2 ? {} : await m2({ sessionToken: c2(), userId: x2.id, expires: od(n10.session.maxAge) }), user: x2, isNewUser: _2 };
        }
        {
          let { provider: e11 } = n10, { type: r11, provider: i11, providerAccountId: o11, userId: s11, ...d3 } = l2;
          if (l2 = Object.assign(e11.account(d3) ?? {}, { providerAccountId: o11, provider: i11, type: r11, userId: s11 }), v2) return await g2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), { session: b2, user: v2, isNewUser: _2 };
          let p3 = t10.email ? await f2(t10.email) : null;
          if (p3) {
            let e12 = n10.provider;
            if (e12?.allowDangerousEmailAccountLinking) v2 = p3, _2 = false;
            else throw new e0("Another account already exists with the same e-mail address", { provider: l2.provider });
          } else v2 = await u2({ ...t10, emailVerified: null }), _2 = true;
          return await a10.createUser?.({ user: v2 }), await g2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), { session: b2 = S2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: od(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
      }
      function oh(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (o = "oauth4webapi/v3.8.7");
      let of = "ERR_INVALID_ARG_VALUE", og = "ERR_INVALID_ARG_TYPE";
      function om(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      let oy = Symbol(), ow = Symbol(), ob = Symbol(), ov = Symbol(), o_ = Symbol(), oS = Symbol(), ox = Symbol(), ok = new TextEncoder(), oE = new TextDecoder();
      function oA(e10) {
        return "string" == typeof e10 ? ok.encode(e10) : oE.decode(e10);
      }
      function oP(e10) {
        return "string" == typeof e10 ? s(e10) : a(e10);
      }
      Uint8Array.prototype.toBase64 ? a = (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : a = (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, Uint8Array.fromBase64 ? s = (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw om("The input to be decoded is not correctly encoded.", of, e11);
        }
      } : s = (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw om("The input to be decoded is not correctly encoded.", of, e11);
        }
      };
      class oT extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = aI, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oC extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function oR(e10, t10, r10) {
        return new oC(e10, { code: t10, cause: r10 });
      }
      function oO(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function oN(e10) {
        oh(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (o && !t10.has("user-agent") && t10.set("user-agent", o), t10.has("authorization")) throw om('"options.headers" must not include the "authorization" header name', of);
        return t10;
      }
      function oI(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw om('"options.signal" must return or be an instance of AbortSignal', og);
          return t10;
        }
      }
      function oU(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function oL(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw om(`"${t10}" must be an instance of URL`, og);
        oQ(e10, n10?.[oy] !== true);
        let i10 = r10(new URL(e10.href)), o10 = oN(n10?.headers);
        return o10.set("accept", "application/json"), (n10?.[ov] || fetch)(i10.href, { body: void 0, headers: Object.fromEntries(o10.entries()), method: "GET", redirect: "manual", signal: oI(i10, n10?.signal) });
      }
      async function o$(e10, t10) {
        return oL(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = oU(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = oU(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw om('"options.algorithm" must be "oidc" (default), or "oauth2"', of);
          }
          return e11;
        }, t10);
      }
      function oM(e10, t10, r10, n10, i10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw om(`${r10} must be a number`, og, i10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw om(`${r10} must be a non-negative number`, of, i10);
            return;
          }
          throw om(`${r10} must be a positive number`, of, i10);
        } catch (e11) {
          if (n10) throw oR(e11.message, n10, i10);
          throw e11;
        }
      }
      function oD(e10, t10, r10, n10) {
        try {
          if ("string" != typeof e10) throw om(`${t10} must be a string`, og, n10);
          if (0 === e10.length) throw om(`${t10} must not be empty`, of, n10);
        } catch (e11) {
          if (r10) throw oR(e11.message, r10, n10);
          throw e11;
        }
      }
      async function oj(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== a9) throw om('"expectedIssuerIdentifier" must be an instance of URL', og);
        if (!oh(t10, Response)) throw om('"response" must be an instance of Response', og);
        if (200 !== t10.status) throw oR('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', aj, t10);
        az(t10);
        let r10 = await a7(t10);
        if (oD(r10.issuer, '"response" body "issuer" property', aM, { body: r10 }), e10 !== a9 && new URL(r10.issuer).href !== e10.href) throw oR('"response" body "issuer" property does not match the expected value', aK, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function oH(e10) {
        !function(e11, t10) {
          if (ac(e11) !== t10) throw oW(e11, t10);
        }(e10, "application/json");
      }
      function oW(e10, ...t10) {
        let r10 = '"response" content-type must be ';
        if (t10.length > 2) {
          let e11 = t10.pop();
          r10 += `${t10.join(", ")}, or ${e11}`;
        } else 2 === t10.length ? r10 += `${t10[0]} or ${t10[1]}` : r10 += t10[0];
        return oR(r10, aD, e10);
      }
      function oB() {
        return oP(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function oq(e10) {
        return oD(e10, "codeVerifier"), oP(await crypto.subtle.digest("SHA-256", oA(e10)));
      }
      function oK(e10) {
        let t10 = e10?.[ow];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function oV(e10) {
        let t10 = e10?.[ob];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function oJ() {
        return Math.floor(Date.now() / 1e3);
      }
      function oF(e10) {
        if ("object" != typeof e10 || null === e10) throw om('"as" must be an object', og);
        oD(e10.issuer, '"as.issuer"');
      }
      function oz(e10) {
        if ("object" != typeof e10 || null === e10) throw om('"client" must be an object', og);
        oD(e10.client_id, '"client.client_id"');
      }
      function oG(e10, t10) {
        let r10 = oJ() + oK(t10);
        return { jti: oB(), aud: e10.issuer, exp: r10 + 60, iat: r10, nbf: r10, iss: t10.client_id, sub: t10.client_id };
      }
      async function oX(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw om('CryptoKey instances used for signing assertions must include "sign" in their "usages"', of);
        let n10 = `${oP(oA(JSON.stringify(e10)))}.${oP(oA(JSON.stringify(t10)))}`, i10 = oP(await crypto.subtle.sign(aY(r10), r10, oA(n10)));
        return `${n10}.${i10}`;
      }
      async function oZ(e10, t10) {
        let { kty: r10, e: n10, n: i10, x: o10, y: a10, crv: s10, pub: l2 } = await crypto.subtle.exportKey("jwk", e10), u2 = { kty: r10, e: n10, n: i10, x: o10, y: a10, crv: s10, pub: l2 };
        return "AKP" === r10 && (u2.alg = t10), c.set(e10, u2), u2;
      }
      let oY = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function oQ(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw oR("only requests to HTTPS are allowed", aH, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw oR("only HTTP and HTTPS requests are allowed", aW, e10);
      }
      function o0(e10, t10, r10, n10) {
        let i10;
        if ("string" != typeof e10 || !(i10 = oY(e10))) throw oR(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? aJ : aF, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return oQ(i10, n10), i10;
      }
      function o1(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? o0(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : o0(e10[t10], t10, r10, n10);
      }
      class o2 extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = aN, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class o3 extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = aU, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class o5 extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = aO, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let o4 = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", o6 = RegExp("^[,\\s]*(" + o4 + ")"), o7 = RegExp("^[,\\s]*(" + o4 + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), o9 = RegExp("^[,\\s]*(" + o4 + ")\\s*=\\s*(" + o4 + ")[,\\s]*(.*)"), o8 = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function ae(e10) {
        if (e10.status > 399 && e10.status < 500) {
          az(e10), oH(e10);
          try {
            let t10 = await e10.clone().json();
            if (oO(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function at(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (am(e10), t11 = await ae(e10)) throw await e10.body?.cancel(), new o2("server responded with an error in the response body", { cause: t11, response: e10 });
          throw oR(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, aj, e10);
        }
      }
      function ar(e10) {
        if (!a_.has(e10)) throw om('"options.DPoP" is not a valid DPoPHandle', of);
      }
      async function an(e10, t10, r10, n10, i10, o10) {
        if (oD(e10, '"accessToken"'), !(r10 instanceof URL)) throw om('"url" must be an instance of URL', og);
        oQ(r10, o10?.[oy] !== true), n10 = oN(n10), o10?.DPoP && (ar(o10.DPoP), await o10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let a10 = await (o10?.[ov] || fetch)(r10.href, { duplex: oh(i10, ReadableStream) ? "half" : void 0, body: i10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: oI(r10, o10?.signal) });
        return o10?.DPoP?.cacheNonce(a10, r10), a10;
      }
      async function ai(e10, t10, r10, n10) {
        oF(e10), oz(t10);
        let i10 = o1(e10, "userinfo_endpoint", t10.use_mtls_endpoint_aliases, n10?.[oy] !== true), o10 = oN(n10?.headers);
        return t10.userinfo_signed_response_alg ? o10.set("accept", "application/jwt") : (o10.set("accept", "application/json"), o10.append("accept", "application/jwt")), an(r10, "GET", i10, o10, null, { ...n10, [ow]: oK(t10) });
      }
      function ao(e10, t10, r10, n10) {
        (l ||= /* @__PURE__ */ new WeakMap()).set(e10, { jwks: t10, uat: r10, get age() {
          return oJ() - this.uat;
        } }), n10 && Object.assign(n10, { jwks: structuredClone(t10), uat: r10 });
      }
      function aa(e10, t10) {
        l?.delete(e10), delete t10?.jwks, delete t10?.uat;
      }
      let as = Symbol();
      function ac(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function al(e10, t10, r10, n10, i10) {
        let o10;
        if (oF(e10), oz(t10), !oh(n10, Response)) throw om('"response" must be an instance of Response', og);
        if (am(n10), 200 !== n10.status) throw oR('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', aj, n10);
        if (az(n10), "application/jwt" === ac(n10)) {
          let { claims: r11, jwt: a10 } = await aQ(await n10.text(), a2.bind(void 0, t10.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported, void 0), oK(t10), oV(t10), i10?.[oS]).then(ay.bind(void 0, t10.client_id)).then(ab.bind(void 0, e10));
          ah.set(n10, a10), o10 = r11;
        } else {
          if (t10.userinfo_signed_response_alg) throw oR("JWT UserInfo Response expected", aL, n10);
          o10 = await a7(n10);
        }
        if (oD(o10.sub, '"response" body "sub" property', aM, { body: o10 }), r10 === as) ;
        else if (oD(r10, '"expectedSubject"'), o10.sub !== r10) throw oR('unexpected "response" body "sub" property value', aK, { expected: r10, body: o10, attribute: "sub" });
        return o10;
      }
      async function au(e10, t10, r10, n10, i10, o10, a10) {
        return await r10(e10, t10, i10, o10), o10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (a10?.[ov] || fetch)(n10.href, { body: i10, headers: Object.fromEntries(o10.entries()), method: "POST", redirect: "manual", signal: oI(n10, a10?.signal) });
      }
      async function ad(e10, t10, r10, n10, i10, o10) {
        let a10 = o1(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, o10?.[oy] !== true);
        i10.set("grant_type", n10);
        let s10 = oN(o10?.headers);
        s10.set("accept", "application/json"), o10?.DPoP !== void 0 && (ar(o10.DPoP), await o10.DPoP.addProof(a10, s10, "POST"));
        let c2 = await au(e10, t10, r10, a10, i10, s10, o10);
        return o10?.DPoP?.cacheNonce(c2, a10), c2;
      }
      let ap = /* @__PURE__ */ new WeakMap(), ah = /* @__PURE__ */ new WeakMap();
      function af(e10) {
        if (!e10.id_token) return;
        let t10 = ap.get(e10);
        if (!t10) throw om('"ref" was already garbage collected or did not resolve from the proper sources', of);
        return t10;
      }
      async function ag(e10, t10, r10, n10, i10, o10) {
        if (oF(e10), oz(t10), !oh(r10, Response)) throw om('"response" must be an instance of Response', og);
        await at(r10, 200, "Token Endpoint"), az(r10);
        let a10 = await a7(r10);
        if (oD(a10.access_token, '"response" body "access_token" property', aM, { body: a10 }), oD(a10.token_type, '"response" body "token_type" property', aM, { body: a10 }), a10.token_type = a10.token_type.toLowerCase(), void 0 !== a10.expires_in) {
          let e11 = "number" != typeof a10.expires_in ? parseFloat(a10.expires_in) : a10.expires_in;
          oM(e11, true, '"response" body "expires_in" property', aM, { body: a10 }), a10.expires_in = e11;
        }
        if (void 0 !== a10.refresh_token && oD(a10.refresh_token, '"response" body "refresh_token" property', aM, { body: a10 }), void 0 !== a10.scope && "string" != typeof a10.scope) throw oR('"response" body "scope" property must be a string', aM, { body: a10 });
        if (void 0 !== a10.id_token) {
          oD(a10.id_token, '"response" body "id_token" property', aM, { body: a10 });
          let o11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && o11.push("auth_time"), void 0 !== t10.default_max_age && (oM(t10.default_max_age, true, '"client.default_max_age"'), o11.push("auth_time")), n10?.length && o11.push(...n10);
          let { claims: s10, jwt: c2 } = await aQ(a10.id_token, a2.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), oK(t10), oV(t10), i10).then(aE.bind(void 0, o11)).then(av.bind(void 0, e10)).then(aw.bind(void 0, t10.client_id));
          if (Array.isArray(s10.aud) && 1 !== s10.aud.length) {
            if (void 0 === s10.azp) throw oR('ID Token "aud" (audience) claim includes additional untrusted audiences', aq, { claims: s10, claim: "aud" });
            if (s10.azp !== t10.client_id) throw oR('unexpected ID Token "azp" (authorized party) claim value', aq, { expected: t10.client_id, claims: s10, claim: "azp" });
          }
          void 0 !== s10.auth_time && oM(s10.auth_time, true, 'ID Token "auth_time" (authentication time)', aM, { claims: s10 }), ah.set(r10, c2), ap.set(a10, s10);
        }
        if (o10?.[a10.token_type] !== void 0) o10[a10.token_type](r10, a10);
        else if ("dpop" !== a10.token_type && "bearer" !== a10.token_type) throw new oT("unsupported `token_type` value", { cause: { body: a10 } });
        return a10;
      }
      function am(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!oh(e11, Response)) throw om('"response" must be an instance of Response', og);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], n10 = t11;
          for (; n10; ) {
            let e12, t12 = n10.match(o6), i10 = t12?.["1"].toLowerCase();
            if (!i10) return;
            let o10 = n10.substring(t12[0].length);
            if (o10 && !o10.match(/^[\s,]/)) return;
            let a10 = o10.match(/^\s+(.*)$/), s10 = !!a10;
            n10 = a10 ? a10[1] : void 0;
            let c2 = {};
            if (s10) for (; n10; ) {
              let r11, i11;
              if (t12 = n10.match(o7)) {
                if ([, r11, i11, n10] = t12, i11.includes("\\")) try {
                  i11 = JSON.parse(`"${i11}"`);
                } catch {
                }
                c2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(o9)) {
                [, r11, i11, n10] = t12, c2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(o8)) {
                if (Object.keys(c2).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            else n10 = o10 || void 0;
            let l2 = { scheme: i10, parameters: c2 };
            e12 && (l2.token68 = e12), r10.push(l2);
          }
          if (r10.length) return r10;
        }(e10)) throw new o5("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      function ay(e10, t10) {
        return void 0 !== t10.claims.aud ? aw(e10, t10) : t10;
      }
      function aw(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw oR('unexpected JWT "aud" (audience) claim value', aq, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw oR('unexpected JWT "aud" (audience) claim value', aq, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function ab(e10, t10) {
        return void 0 !== t10.claims.iss ? av(e10, t10) : t10;
      }
      function av(e10, t10) {
        let r10 = e10[a8]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw oR('unexpected JWT "iss" (issuer) claim value', aq, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let a_ = /* @__PURE__ */ new WeakSet(), aS = Symbol();
      async function ax(e10, t10, r10, n10, i10, o10, a10) {
        if (oF(e10), oz(t10), !a_.has(n10)) throw om('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', of);
        oD(i10, '"redirectUri"');
        let s10 = a3(n10, "code");
        if (!s10) throw oR('no authorization code in "callbackParameters"', aM);
        let c2 = new URLSearchParams(a10?.additionalParameters);
        return c2.set("redirect_uri", i10), c2.set("code", s10), o10 !== aS && (oD(o10, '"codeVerifier"'), c2.set("code_verifier", o10)), ad(e10, t10, r10, "authorization_code", c2, a10);
      }
      let ak = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function aE(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw oR(`JWT "${r10}" (${ak[r10]}) claim missing`, aM, { claims: t10.claims });
        return t10;
      }
      let aA = Symbol(), aP = Symbol();
      async function aT(e10, t10, r10, n10) {
        return "string" == typeof n10?.expectedNonce || "number" == typeof n10?.maxAge || n10?.requireIdToken ? aC(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[oS], n10.recognizedTokenTypes) : aR(e10, t10, r10, n10?.[oS], n10?.recognizedTokenTypes);
      }
      async function aC(e10, t10, r10, n10, i10, o10, a10) {
        let s10 = [];
        switch (n10) {
          case void 0:
            n10 = aA;
            break;
          case aA:
            break;
          default:
            oD(n10, '"expectedNonce" argument'), s10.push("nonce");
        }
        switch (i10 ??= t10.default_max_age) {
          case void 0:
            i10 = aP;
            break;
          case aP:
            break;
          default:
            oM(i10, true, '"maxAge" argument'), s10.push("auth_time");
        }
        let c2 = await ag(e10, t10, r10, s10, o10, a10);
        oD(c2.id_token, '"response" body "id_token" property', aM, { body: c2 });
        let l2 = af(c2);
        if (i10 !== aP) {
          let e11 = oJ() + oK(t10), r11 = oV(t10);
          if (l2.auth_time + i10 < e11 - r11) throw oR("too much time has elapsed since the last End-User authentication", aB, { claims: l2, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === aA) {
          if (void 0 !== l2.nonce) throw oR('unexpected ID Token "nonce" claim value', aq, { expected: void 0, claims: l2, claim: "nonce" });
        } else if (l2.nonce !== n10) throw oR('unexpected ID Token "nonce" claim value', aq, { expected: n10, claims: l2, claim: "nonce" });
        return c2;
      }
      async function aR(e10, t10, r10, n10, i10) {
        let o10 = await ag(e10, t10, r10, void 0, n10, i10), a10 = af(o10);
        if (a10) {
          if (void 0 !== t10.default_max_age) {
            oM(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = oJ() + oK(t10), r11 = oV(t10);
            if (a10.auth_time + t10.default_max_age < e11 - r11) throw oR("too much time has elapsed since the last End-User authentication", aB, { claims: a10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== a10.nonce) throw oR('unexpected ID Token "nonce" claim value', aq, { expected: void 0, claims: a10, claim: "nonce" });
        }
        return o10;
      }
      let aO = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", aN = "OAUTH_RESPONSE_BODY_ERROR", aI = "OAUTH_UNSUPPORTED_OPERATION", aU = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", aL = "OAUTH_JWT_USERINFO_EXPECTED", a$ = "OAUTH_PARSE_ERROR", aM = "OAUTH_INVALID_RESPONSE", aD = "OAUTH_RESPONSE_IS_NOT_JSON", aj = "OAUTH_RESPONSE_IS_NOT_CONFORM", aH = "OAUTH_HTTP_REQUEST_FORBIDDEN", aW = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", aB = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", aq = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", aK = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", aV = "OAUTH_KEY_SELECTION_FAILED", aJ = "OAUTH_MISSING_SERVER_METADATA", aF = "OAUTH_INVALID_SERVER_METADATA";
      function az(e10) {
        if (e10.bodyUsed) throw om('"response" body has been used already', of);
      }
      async function aG(e10, t10) {
        oF(e10);
        let r10 = o1(e10, "jwks_uri", false, t10?.[oy] !== true), n10 = oN(t10?.headers);
        return n10.set("accept", "application/json"), n10.append("accept", "application/jwk-set+json"), (t10?.[ov] || fetch)(r10.href, { body: void 0, headers: Object.fromEntries(n10.entries()), method: "GET", redirect: "manual", signal: oI(r10, t10?.signal) });
      }
      async function aX(e10) {
        if (!oh(e10, Response)) throw om('"response" must be an instance of Response', og);
        if (200 !== e10.status) throw oR('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', aj, e10);
        az(e10);
        let t10 = await a7(e10, (e11) => function(e12, ...t11) {
          if (!t11.includes(ac(e12))) throw oW(e12, ...t11);
        }(e11, "application/json", "application/jwk-set+json"));
        if (!Array.isArray(t10.keys)) throw oR('"response" body "keys" property must be an array', aM, { body: t10 });
        if (!Array.prototype.every.call(t10.keys, oO)) throw oR('"response" body "keys" property members must be JWK formatted objects', aM, { body: t10 });
        return t10;
      }
      function aZ(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new oT(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      function aY(e10) {
        switch (e10.algorithm.name) {
          case "ECDSA":
            return { name: e10.algorithm.name, hash: function(e11) {
              let { algorithm: t10 } = e11;
              switch (t10.namedCurve) {
                case "P-256":
                  return "SHA-256";
                case "P-384":
                  return "SHA-384";
                case "P-521":
                  return "SHA-512";
                default:
                  throw new oT("unsupported ECDSA namedCurve", { cause: e11 });
              }
            }(e10) };
          case "RSA-PSS":
            switch (aZ(e10), e10.algorithm.hash.name) {
              case "SHA-256":
              case "SHA-384":
              case "SHA-512":
                return { name: e10.algorithm.name, saltLength: parseInt(e10.algorithm.hash.name.slice(-3), 10) >> 3 };
              default:
                throw new oT("unsupported RSA-PSS hash name", { cause: e10 });
            }
          case "RSASSA-PKCS1-v1_5":
            return aZ(e10), e10.algorithm.name;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
          case "Ed25519":
            return e10.algorithm.name;
        }
        throw new oT("unsupported CryptoKey algorithm name", { cause: e10 });
      }
      async function aQ(e10, t10, r10, n10, i10) {
        let o10, a10, { 0: s10, 1: c2, length: l2 } = e10.split(".");
        if (5 === l2) {
          if (void 0 !== i10) e10 = await i10(e10), { 0: s10, 1: c2, length: l2 } = e10.split(".");
          else throw new oT("JWE decryption is not configured", { cause: e10 });
        }
        if (3 !== l2) throw oR("Invalid JWT", aM, e10);
        try {
          o10 = JSON.parse(oA(oP(s10)));
        } catch (e11) {
          throw oR("failed to parse JWT Header body as base64url encoded JSON", a$, e11);
        }
        if (!oO(o10)) throw oR("JWT Header must be a top level object", aM, e10);
        if (t10(o10), void 0 !== o10.crit) throw new oT('no JWT "crit" header parameter extensions are supported', { cause: { header: o10 } });
        try {
          a10 = JSON.parse(oA(oP(c2)));
        } catch (e11) {
          throw oR("failed to parse JWT Payload body as base64url encoded JSON", a$, e11);
        }
        if (!oO(a10)) throw oR("JWT Payload must be a top level object", aM, e10);
        let u2 = oJ() + r10;
        if (void 0 !== a10.exp) {
          if ("number" != typeof a10.exp) throw oR('unexpected JWT "exp" (expiration time) claim type', aM, { claims: a10 });
          if (a10.exp <= u2 - n10) throw oR('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', aB, { claims: a10, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== a10.iat && "number" != typeof a10.iat) throw oR('unexpected JWT "iat" (issued at) claim type', aM, { claims: a10 });
        if (void 0 !== a10.iss && "string" != typeof a10.iss) throw oR('unexpected JWT "iss" (issuer) claim type', aM, { claims: a10 });
        if (void 0 !== a10.nbf) {
          if ("number" != typeof a10.nbf) throw oR('unexpected JWT "nbf" (not before) claim type', aM, { claims: a10 });
          if (a10.nbf > u2 + n10) throw oR('unexpected JWT "nbf" (not before) claim value', aB, { claims: a10, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== a10.aud && "string" != typeof a10.aud && !Array.isArray(a10.aud)) throw oR('unexpected JWT "aud" (audience) claim type', aM, { claims: a10 });
        return { header: o10, claims: a10, jwt: e10 };
      }
      async function a0(e10, t10, r10) {
        let n10;
        switch (t10.alg) {
          case "RS256":
          case "PS256":
          case "ES256":
            n10 = "SHA-256";
            break;
          case "RS384":
          case "PS384":
          case "ES384":
            n10 = "SHA-384";
            break;
          case "RS512":
          case "PS512":
          case "ES512":
          case "Ed25519":
          case "EdDSA":
            n10 = "SHA-512";
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            n10 = { name: "cSHAKE256", length: 512, outputLength: 512 };
            break;
          default:
            throw new oT(`unsupported JWS algorithm for ${r10} calculation`, { cause: { alg: t10.alg } });
        }
        let i10 = await crypto.subtle.digest(n10, oA(e10));
        return oP(i10.slice(0, i10.byteLength / 2));
      }
      async function a1(e10) {
        if (e10.bodyUsed) throw om("form_post Request instances must contain a readable body", of, { cause: e10 });
        return e10.text();
      }
      function a2(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw oR('unexpected JWT "alg" header parameter', aM, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw oR('unexpected JWT "alg" header parameter', aM, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? n10.alg !== r10 : "function" == typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw oR('unexpected JWT "alg" header parameter', aM, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw oR('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function a3(e10, t10) {
        let { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw oR(`"${t10}" parameter must be provided only once`, aM);
        return r10;
      }
      let a5 = Symbol(), a4 = Symbol();
      async function a6(e10, t10) {
        let { ext: r10, key_ops: n10, use: i10, ...o10 } = t10;
        return crypto.subtle.importKey("jwk", o10, function(e11) {
          switch (e11) {
            case "PS256":
            case "PS384":
            case "PS512":
              return { name: "RSA-PSS", hash: `SHA-${e11.slice(-3)}` };
            case "RS256":
            case "RS384":
            case "RS512":
              return { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.slice(-3)}` };
            case "ES256":
            case "ES384":
              return { name: "ECDSA", namedCurve: `P-${e11.slice(-3)}` };
            case "ES512":
              return { name: "ECDSA", namedCurve: "P-521" };
            case "EdDSA":
              return "Ed25519";
            case "Ed25519":
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return e11;
            default:
              throw new oT("unsupported JWS algorithm", { cause: { alg: e11 } });
          }
        }(e10), true, ["verify"]);
      }
      async function a7(e10, t10 = oH) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), oR('failed to parse "response" body as JSON', a$, r11);
        }
        if (!oO(r10)) throw oR('"response" body must be a top level object', aM, { body: r10 });
        return r10;
      }
      let a9 = Symbol(), a8 = Symbol();
      async function se(e10, t10, r10) {
        let { cookies: n10, logger: i10 } = r10, o10 = n10[e10], a10 = /* @__PURE__ */ new Date();
        a10.setTime(a10.getTime() + 9e5), i10.debug(`CREATE_${e10.toUpperCase()}`, { name: o10.name, payload: t10, COOKIE_TTL: 900, expires: a10 });
        let s10 = await nC({ ...r10.jwt, maxAge: 900, token: { value: t10, provider: r10.provider.id }, salt: o10.name }), c2 = { ...o10.options, expires: a10 };
        return { name: o10.name, value: s10, options: c2 };
      }
      async function st(e10, t10, r10) {
        try {
          let { logger: n10, cookies: i10, jwt: o10 } = r10;
          if (n10.debug(`PARSE_${e10.toUpperCase()}`, { cookie: t10 }), !t10) throw new ez(`${e10} cookie was missing`);
          let a10 = await nR({ ...o10, token: t10, salt: i10[e10].name });
          if (!a10?.value) throw Error("Invalid cookie");
          if (a10.provider !== r10.provider?.id) throw Error(`${e10} cookie was created for a different provider than the one handling the callback`);
          return a10.value;
        } catch (t11) {
          throw new ez(`${e10} value could not be parsed`, { cause: t11 });
        }
      }
      function sr(e10, t10, r10) {
        let { logger: n10, cookies: i10 } = t10, o10 = i10[e10];
        n10.debug(`CLEAR_${e10.toUpperCase()}`, { cookie: o10 }), r10.push({ name: o10.name, value: "", options: { ...i10[e10].options, maxAge: 0 } });
      }
      function sn(e10, t10) {
        return async function(r10, n10, i10) {
          let { provider: o10, logger: a10 } = i10;
          if (!o10?.checks?.includes(e10)) return;
          let s10 = r10?.[i10.cookies[t10].name];
          a10.debug(`USE_${t10.toUpperCase()}`, { value: s10 });
          let c2 = await st(t10, s10, i10);
          return sr(t10, i10, n10), c2;
        };
      }
      let si = { async create(e10) {
        let t10 = oB(), r10 = await oq(t10);
        return { cookie: await se("pkceCodeVerifier", t10, e10), value: r10 };
      }, use: sn("pkce", "pkceCodeVerifier") }, so = "encodedState", sa = { async create(e10, t10) {
        let { provider: r10 } = e10;
        if (!r10.checks.includes("state")) {
          if (t10) throw new ez("State data was provided but the provider is not configured to use state");
          return;
        }
        let n10 = { origin: t10, random: oB() }, i10 = await nC({ secret: e10.jwt.secret, token: n10, salt: so, maxAge: 900 });
        return { cookie: await se("state", i10, e10), value: i10 };
      }, use: sn("state", "state"), async decode(e10, t10) {
        try {
          t10.logger.debug("DECODE_STATE", { state: e10 });
          let r10 = await nR({ secret: t10.jwt.secret, token: e10, salt: so });
          if (r10) return r10;
          throw Error("Invalid state");
        } catch (e11) {
          throw new ez("State could not be decoded", { cause: e11 });
        }
      } }, ss = { async create(e10) {
        if (!e10.provider.checks.includes("nonce")) return;
        let t10 = oB();
        return { cookie: await se("nonce", t10, e10), value: t10 };
      }, use: sn("nonce", "nonce") }, sc = "encodedWebauthnChallenge", sl = { create: async (e10, t10, r10) => ({ cookie: await se("webauthnChallenge", await nC({ secret: e10.jwt.secret, token: { challenge: t10, registerData: r10 }, salt: sc, maxAge: 900 }), e10) }), async use(e10, t10, r10) {
        let n10 = t10?.[e10.cookies.webauthnChallenge.name], i10 = await st("webauthnChallenge", n10, e10), o10 = await nR({ secret: e10.jwt.secret, token: i10, salt: sc });
        if (sr("webauthnChallenge", e10, r10), !o10) throw new ez("WebAuthn challenge was missing");
        return o10;
      } };
      function su(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      async function sd(e10, t10, r10) {
        let n10, i10, o10;
        let { logger: a10, provider: s10 } = r10, { token: c2, userinfo: l2 } = s10;
        if (c2?.url && "authjs.dev" !== c2.url.host || l2?.url && "authjs.dev" !== l2.url.host) n10 = { issuer: s10.issuer ?? "https://authjs.dev", token_endpoint: c2?.url.toString(), userinfo_endpoint: l2?.url.toString() };
        else {
          let e11 = new URL(s10.issuer), t11 = await o$(e11, { [oy]: true, [ov]: s10[nZ] });
          if (!(n10 = await oj(e11, t11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!n10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        let u2 = { client_id: s10.clientId, ...s10.client };
        switch (u2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            i10 = (e11, t11, r11, n11) => {
              n11.set("authorization", function(e12, t12) {
                let r12 = su(e12), n12 = su(t12), i11 = btoa(`${r12}:${n12}`);
                return `Basic ${i11}`;
              }(s10.clientId, s10.clientSecret));
            };
            break;
          case "client_secret_post":
            var d2;
            oD(d2 = s10.clientSecret, '"clientSecret"'), i10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id), r11.set("client_secret", d2);
            };
            break;
          case "client_secret_jwt":
            i10 = function(e11, t11) {
              let r11;
              oD(e11, '"clientSecret"');
              let n11 = void 0;
              return async (t12, i11, o11, a11) => {
                r11 ||= await crypto.subtle.importKey("raw", oA(e11), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
                let s11 = { alg: "HS256" }, c3 = oG(t12, i11);
                n11?.(s11, c3);
                let l3 = `${oP(oA(JSON.stringify(s11)))}.${oP(oA(JSON.stringify(c3)))}`, u3 = await crypto.subtle.sign(r11.algorithm, r11, oA(l3));
                o11.set("client_id", i11.client_id), o11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), o11.set("client_assertion", `${l3}.${oP(new Uint8Array(u3))}`);
              };
            }(s10.clientSecret);
            break;
          case "private_key_jwt":
            i10 = function(e11, t11) {
              let { key: r11, kid: n11 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && oD(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
              return function(e12, t12) {
                if (function(e13, t13) {
                  if (!(e13 instanceof CryptoKey)) throw om(`${t13} must be a CryptoKey`, og);
                }(e12, t12), "private" !== e12.type) throw om(`${t12} must be a private CryptoKey`, of);
              }(r11, '"clientPrivateKey.key"'), async (e12, i11, o11, a11) => {
                let s11 = { alg: function(e13) {
                  switch (e13.algorithm.name) {
                    case "RSA-PSS":
                      return function(e14) {
                        switch (e14.algorithm.hash.name) {
                          case "SHA-256":
                            return "PS256";
                          case "SHA-384":
                            return "PS384";
                          case "SHA-512":
                            return "PS512";
                          default:
                            throw new oT("unsupported RsaHashedKeyAlgorithm hash name", { cause: e14 });
                        }
                      }(e13);
                    case "RSASSA-PKCS1-v1_5":
                      return function(e14) {
                        switch (e14.algorithm.hash.name) {
                          case "SHA-256":
                            return "RS256";
                          case "SHA-384":
                            return "RS384";
                          case "SHA-512":
                            return "RS512";
                          default:
                            throw new oT("unsupported RsaHashedKeyAlgorithm hash name", { cause: e14 });
                        }
                      }(e13);
                    case "ECDSA":
                      return function(e14) {
                        switch (e14.algorithm.namedCurve) {
                          case "P-256":
                            return "ES256";
                          case "P-384":
                            return "ES384";
                          case "P-521":
                            return "ES512";
                          default:
                            throw new oT("unsupported EcKeyAlgorithm namedCurve", { cause: e14 });
                        }
                      }(e13);
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return e13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new oT("unsupported CryptoKey algorithm name", { cause: e13 });
                  }
                }(r11), kid: n11 }, c3 = oG(e12, i11);
                t11?.[o_]?.(s11, c3), o11.set("client_id", i11.client_id), o11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), o11.set("client_assertion", await oX(s11, c3, r11));
              };
            }(s10.token.clientPrivateKey, { [o_](e11, t11) {
              t11.aud = [n10.issuer, n10.token_endpoint];
            } });
            break;
          case "none":
            i10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        let p2 = [], h2 = await sa.use(t10, p2, r10);
        try {
          o10 = function(e11, t11, r11, n11) {
            var i11;
            if (oF(e11), oz(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw om('"parameters" must be an instance of URLSearchParams, or URL', og);
            if (a3(r11, "response")) throw oR('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', aM, { parameters: r11 });
            let o11 = a3(r11, "iss"), a11 = a3(r11, "state");
            if (!o11 && e11.authorization_response_iss_parameter_supported) throw oR('response parameter "iss" (issuer) missing', aM, { parameters: r11 });
            if (o11 && o11 !== e11.issuer) throw oR('unexpected "iss" (issuer) response parameter value', aM, { expected: e11.issuer, parameters: r11 });
            switch (n11) {
              case void 0:
              case a4:
                if (void 0 !== a11) throw oR('unexpected "state" response parameter encountered', aM, { expected: void 0, parameters: r11 });
                break;
              case a5:
                break;
              default:
                if (oD(n11, '"expectedState" argument'), a11 !== n11) throw oR(void 0 === a11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', aM, { expected: n11, parameters: r11 });
            }
            if (a3(r11, "error")) throw new o3("authorization response from the server is an error", { cause: r11 });
            let s11 = a3(r11, "id_token"), c3 = a3(r11, "token");
            if (void 0 !== s11 || void 0 !== c3) throw new oT("implicit and hybrid flows are not supported");
            return i11 = new URLSearchParams(r11), a_.add(i11), i11;
          }(n10, u2, new URLSearchParams(e10), s10.checks.includes("state") ? h2 : a5);
        } catch (e11) {
          if (e11 instanceof o3) {
            let t11 = { providerId: s10.id, ...Object.fromEntries(e11.cause.entries()) };
            throw a10.debug("OAuthCallbackError", t11), new e1("OAuth Provider returned an error", t11);
          }
          throw e11;
        }
        let f2 = await si.use(t10, p2, r10), g2 = s10.callbackUrl;
        !r10.isOnRedirectProxy && s10.redirectProxyUrl && (g2 = s10.redirectProxyUrl);
        let m2 = await ax(n10, u2, i10, o10, g2, f2 ?? "decoy", { [oy]: true, [ov]: (...e11) => (s10.checks.includes("pkce") || e11[1].body.delete("code_verifier"), (s10[nZ] ?? fetch)(...e11)) });
        s10.token?.conform && (m2 = await s10.token.conform(m2.clone()) ?? m2);
        let y2 = {}, w2 = "oidc" === s10.type;
        if (s10[nY]) switch (s10.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            let e11 = await m2.clone().json();
            if (e11.error) {
              let t12 = { providerId: s10.id, ...e11 };
              throw new e1(`OAuth Provider returned an error: ${e11.error}`, t12);
            }
            let { tid: t11 } = function(e12) {
              let t12, r11;
              if ("string" != typeof e12) throw new tG("JWTs must use Compact JWS serialization, JWT must be a string");
              let { 1: n11, length: i11 } = e12.split(".");
              if (5 === i11) throw new tG("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== i11) throw new tG("Invalid JWT");
              if (!n11) throw new tG("JWTs must contain a payload");
              try {
                t12 = tR(n11);
              } catch {
                throw new tG("Failed to base64url decode the payload");
              }
              try {
                r11 = JSON.parse(tx.decode(t12));
              } catch {
                throw new tG("Failed to parse the decoded payload as JSON");
              }
              if (!tN(r11)) throw new tG("Invalid JWT Claims Set");
              return r11;
            }(e11.id_token);
            if ("string" == typeof t11) {
              let e12 = n10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common", r11 = new URL(n10.issuer.replace(e12, t11)), i11 = await o$(r11, { [ov]: s10[nZ] });
              n10 = await oj(r11, i11);
            }
          }
        }
        let b2 = await aT(n10, u2, m2, { expectedNonce: await ss.use(t10, p2, r10), requireIdToken: w2 });
        if (w2) {
          let t11 = af(b2);
          if (y2 = t11, s10[nY] && "apple" === s10.id) try {
            y2.user = JSON.parse(e10?.user);
          } catch {
          }
          if (false === s10.idToken) {
            let e11 = await ai(n10, u2, b2.access_token, { [ov]: s10[nZ], [oy]: true });
            y2 = await al(n10, u2, t11.sub, e11);
          }
        } else if (l2?.request) {
          let e11 = await l2.request({ tokens: b2, provider: s10 });
          e11 instanceof Object && (y2 = e11);
        } else if (l2?.url) {
          let e11 = await ai(n10, u2, b2.access_token, { [ov]: s10[nZ], [oy]: true });
          y2 = await e11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return b2.expires_in && (b2.expires_at = Math.floor(Date.now() / 1e3) + Number(b2.expires_in)), { ...await sp(y2, s10, b2, a10), profile: y2, cookies: p2 };
      }
      async function sp(e10, t10, r10, n10) {
        try {
          let n11 = await t10.profile(e10, r10);
          return { user: { ...n11, id: crypto.randomUUID(), email: n11.email?.toLowerCase() }, account: { ...r10, provider: t10.id, type: t10.type, providerAccountId: n11.id ?? crypto.randomUUID() } };
        } catch (r11) {
          n10.debug("getProfile error details", e10), n10.error(new e2(r11, { provider: t10.id }));
        }
      }
      var sh = r(195).Buffer;
      async function sf(e10, t10, r10, n10) {
        let i10 = await sb(e10, t10, r10), { cookie: o10 } = await sl.create(e10, i10.challenge, r10);
        return { status: 200, cookies: [...n10 ?? [], o10], body: { action: "register", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function sg(e10, t10, r10, n10) {
        let i10 = await sw(e10, t10, r10), { cookie: o10 } = await sl.create(e10, i10.challenge);
        return { status: 200, cookies: [...n10 ?? [], o10], body: { action: "authenticate", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function sm(e10, t10, r10) {
        let n10;
        let { adapter: i10, provider: o10 } = e10, a10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!a10 || "object" != typeof a10 || !("id" in a10) || "string" != typeof a10.id) throw new eD("Invalid WebAuthn Authentication response");
        let s10 = sS(s_(a10.id)), c2 = await i10.getAuthenticator(s10);
        if (!c2) throw new eD(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: s10 })}`);
        let { challenge: l2 } = await sl.use(e10, t10.cookies, r10);
        try {
          let r11 = o10.getRelayingParty(e10, t10);
          n10 = await o10.simpleWebAuthn.verifyAuthenticationResponse({ ...o10.verifyAuthenticationOptions, expectedChallenge: l2, response: a10, authenticator: { ...c2, credentialDeviceType: c2.credentialDeviceType, transports: sx(c2.transports), credentialID: s_(c2.credentialID), credentialPublicKey: s_(c2.credentialPublicKey) }, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new ta(e11);
        }
        let { verified: u2, authenticationInfo: d2 } = n10;
        if (!u2) throw new ta("WebAuthn authentication response could not be verified");
        try {
          let { newCounter: e11 } = d2;
          await i10.updateAuthenticatorCounter(c2.credentialID, e11);
        } catch (e11) {
          throw new eH(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: s10, oldCounter: c2.counter, newCounter: d2.newCounter })}`, e11);
        }
        let p2 = await i10.getAccount(c2.providerAccountId, o10.id);
        if (!p2) throw new eD(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: c2.providerAccountId })}`);
        let h2 = await i10.getUser(p2.userId);
        if (!h2) throw new eD(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: c2.providerAccountId, userID: p2.userId })}`);
        return { account: p2, user: h2 };
      }
      async function sy(e10, t10, r10) {
        var n10;
        let i10;
        let { provider: o10 } = e10, a10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!a10 || "object" != typeof a10 || !("id" in a10) || "string" != typeof a10.id) throw new eD("Invalid WebAuthn Registration response");
        let { challenge: s10, registerData: c2 } = await sl.use(e10, t10.cookies, r10);
        if (!c2) throw new eD("Missing user registration data in WebAuthn challenge cookie");
        try {
          let r11 = o10.getRelayingParty(e10, t10);
          i10 = await o10.simpleWebAuthn.verifyRegistrationResponse({ ...o10.verifyRegistrationOptions, expectedChallenge: s10, response: a10, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new ta(e11);
        }
        if (!i10.verified || !i10.registrationInfo) throw new ta("WebAuthn registration response could not be verified");
        let l2 = { providerAccountId: sS(i10.registrationInfo.credentialID), provider: e10.provider.id, type: o10.type }, u2 = { providerAccountId: l2.providerAccountId, counter: i10.registrationInfo.counter, credentialID: sS(i10.registrationInfo.credentialID), credentialPublicKey: sS(i10.registrationInfo.credentialPublicKey), credentialBackedUp: i10.registrationInfo.credentialBackedUp, credentialDeviceType: i10.registrationInfo.credentialDeviceType, transports: (n10 = a10.response.transports, n10?.join(",")) };
        return { user: c2, account: l2, authenticator: u2 };
      }
      async function sw(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, o10 = r10 && r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, a10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateAuthenticationOptions({ ...n10.authenticationOptions, rpID: a10.id, allowCredentials: o10?.map((e11) => ({ id: s_(e11.credentialID), type: "public-key", transports: sx(e11.transports) })) });
      }
      async function sb(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, o10 = r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, a10 = nK(32), s10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateRegistrationOptions({ ...n10.registrationOptions, userID: a10, userName: r10.email, userDisplayName: r10.name ?? void 0, rpID: s10.id, rpName: s10.name, excludeCredentials: o10?.map((e11) => ({ id: s_(e11.credentialID), type: "public-key", transports: sx(e11.transports) })) });
      }
      function sv(e10) {
        let { provider: t10, adapter: r10 } = e10;
        if (!r10) throw new eX("An adapter is required for the WebAuthn provider");
        if (!t10 || "webauthn" !== t10.type) throw new e8("Provider must be WebAuthn");
        return { ...e10, provider: t10, adapter: r10 };
      }
      function s_(e10) {
        return new Uint8Array(sh.from(e10, "base64"));
      }
      function sS(e10) {
        return sh.from(e10).toString("base64");
      }
      function sx(e10) {
        return e10 ? e10.split(",") : void 0;
      }
      async function sk(e10, t10, r10, n10) {
        if (!t10.provider) throw new e8("Callback route called without provider");
        let { query: i10, body: o10, method: a10, headers: s10 } = e10, { provider: c2, adapter: l2, url: u2, callbackUrl: d2, pages: p2, jwt: h2, events: f2, callbacks: g2, session: { strategy: m2, maxAge: y2 }, logger: w2 } = t10, b2 = "jwt" === m2;
        try {
          if ("oauth" === c2.type || "oidc" === c2.type) {
            let a11;
            let s11 = c2.authorization?.url.searchParams.get("response_mode") === "form_post" ? o10 : i10;
            if (t10.isOnRedirectProxy && s11?.state) {
              let e11 = await sa.decode(s11.state, t10);
              if (e11?.origin && new URL(e11.origin).origin !== t10.url.origin) {
                let t11 = `${e11.origin}?${new URLSearchParams(s11)}`;
                return w2.debug("Proxy redirecting to", t11), { redirect: t11, cookies: n10 };
              }
            }
            let m3 = await sd(s11, e10.cookies, t10);
            m3.cookies.length && n10.push(...m3.cookies), w2.debug("authorization result", m3);
            let { user: v2, account: _2, profile: S2 } = m3;
            if (!v2 || !_2 || !S2) return { redirect: `${u2}/signin`, cookies: n10 };
            if (l2) {
              let { getUserByAccount: e11 } = l2;
              a11 = await e11({ providerAccountId: _2.providerAccountId, provider: c2.id });
            }
            let x2 = await sE({ user: a11 ?? v2, account: _2, profile: S2 }, t10);
            if (x2) return { redirect: x2, cookies: n10 };
            let { user: k2, session: E2, isNewUser: A2 } = await op(r10.value, v2, _2, t10);
            if (b2) {
              let e11 = { name: k2.name, email: k2.email, picture: k2.image, sub: k2.id?.toString() }, i11 = await g2.jwt({ token: e11, user: k2, account: _2, profile: S2, isNewUser: A2, trigger: A2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, o11 = await h2.encode({ ...h2, token: i11, salt: e12 }), a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(o11, { expires: a12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: E2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: E2.expires } });
            if (await f2.signIn?.({ user: k2, account: _2, profile: S2, isNewUser: A2 }), A2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("email" === c2.type) {
            let e11 = i10?.token, o11 = i10?.email;
            if (!e11) {
              let t11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!e11 } });
              throw t11.name = "Configuration", t11;
            }
            let a11 = c2.secret ?? t10.secret, s11 = await l2.useVerificationToken({ identifier: o11, token: await nq(`${e11}${a11}`) }), u3 = !!s11, m3 = u3 && s11.expires.valueOf() < Date.now();
            if (!u3 || m3 || o11 && s11.identifier !== o11) throw new tt({ hasInvite: u3, expired: m3 });
            let { identifier: w3 } = s11, v2 = await l2.getUserByEmail(w3) ?? { id: crypto.randomUUID(), email: w3, emailVerified: null }, _2 = { providerAccountId: v2.email, userId: v2.id, type: "email", provider: c2.id }, S2 = await sE({ user: v2, account: _2 }, t10);
            if (S2) return { redirect: S2, cookies: n10 };
            let { user: x2, session: k2, isNewUser: E2 } = await op(r10.value, v2, _2, t10);
            if (b2) {
              let e12 = { name: x2.name, email: x2.email, picture: x2.image, sub: x2.id?.toString() }, i11 = await g2.jwt({ token: e12, user: x2, account: _2, isNewUser: E2, trigger: E2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e13 = t10.cookies.sessionToken.name, o12 = await h2.encode({ ...h2, token: i11, salt: e13 }), a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(o12, { expires: a12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: k2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: k2.expires } });
            if (await f2.signIn?.({ user: x2, account: _2, isNewUser: E2 }), E2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("credentials" === c2.type && "POST" === a10) {
            let e11 = o10 ?? {};
            Object.entries(i10 ?? {}).forEach(([e12, t11]) => u2.searchParams.set(e12, t11));
            let l3 = await c2.authorize(e11, new Request(u2, { headers: s10, method: a10, body: JSON.stringify(o10) }));
            if (l3) l3.id = l3.id?.toString() ?? crypto.randomUUID();
            else throw new eJ();
            let p3 = { providerAccountId: l3.id, type: "credentials", provider: c2.id }, m3 = await sE({ user: l3, account: p3, credentials: e11 }, t10);
            if (m3) return { redirect: m3, cookies: n10 };
            let w3 = { name: l3.name, email: l3.email, picture: l3.image, sub: l3.id }, b3 = await g2.jwt({ token: w3, user: l3, account: p3, isNewUser: false, trigger: "signIn" });
            if (null === b3) n10.push(...r10.clean());
            else {
              let e12 = t10.cookies.sessionToken.name, i11 = await h2.encode({ ...h2, token: b3, salt: e12 }), o11 = /* @__PURE__ */ new Date();
              o11.setTime(o11.getTime() + 1e3 * y2);
              let a11 = r10.chunk(i11, { expires: o11 });
              n10.push(...a11);
            }
            return await f2.signIn?.({ user: l3, account: p3 }), { redirect: d2, cookies: n10 };
          }
          if ("webauthn" === c2.type && "POST" === a10) {
            let i11, o11, a11;
            let s11 = e10.body?.action;
            if ("string" != typeof s11 || "authenticate" !== s11 && "register" !== s11) throw new eD("Invalid action parameter");
            let c3 = sv(t10);
            switch (s11) {
              case "authenticate": {
                let t11 = await sm(c3, e10, n10);
                i11 = t11.user, o11 = t11.account;
                break;
              }
              case "register": {
                let r11 = await sy(t10, e10, n10);
                i11 = r11.user, o11 = r11.account, a11 = r11.authenticator;
              }
            }
            await sE({ user: i11, account: o11 }, t10);
            let { user: l3, isNewUser: u3, session: m3, account: w3 } = await op(r10.value, i11, o11, t10);
            if (!w3) throw new eD("Error creating or finding account");
            if (a11 && l3.id && await c3.adapter.createAuthenticator({ ...a11, userId: l3.id }), b2) {
              let e11 = { name: l3.name, email: l3.email, picture: l3.image, sub: l3.id?.toString() }, i12 = await g2.jwt({ token: e11, user: l3, account: w3, isNewUser: u3, trigger: u3 ? "signUp" : "signIn" });
              if (null === i12) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, o12 = await h2.encode({ ...h2, token: i12, salt: e12 }), a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(o12, { expires: a12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: m3.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: m3.expires } });
            if (await f2.signIn?.({ user: l3, account: w3, isNewUser: u3 }), u3 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          throw new e8(`Callback for provider type (${c2.type}) is not supported`);
        } catch (t11) {
          if (t11 instanceof eD) throw t11;
          let e11 = new eB(t11, { provider: c2.id });
          throw w2.debug("callback route error details", { method: a10, query: i10, body: o10 }), e11;
        }
      }
      async function sE(e10, t10) {
        let r10;
        let { signIn: n10, redirect: i10 } = t10.callbacks;
        try {
          r10 = await n10(e10);
        } catch (e11) {
          if (e11 instanceof eD) throw e11;
          throw new eW(e11);
        }
        if (!r10) throw new eW("AccessDenied");
        if ("string" == typeof r10) return await i10({ url: r10, baseUrl: t10.url.origin });
      }
      async function sA(e10, t10, r10, n10, i10) {
        let { adapter: o10, jwt: a10, events: s10, callbacks: c2, logger: l2, session: { strategy: u2, maxAge: d2 } } = e10, p2 = { body: null, headers: { "Content-Type": "application/json", ...!n10 && { "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" } }, cookies: r10 }, h2 = t10.value;
        if (!h2) return p2;
        if ("jwt" === u2) {
          try {
            let r11 = e10.cookies.sessionToken.name, o11 = await a10.decode({ ...a10, token: h2, salt: r11 });
            if (!o11) throw Error("Invalid JWT");
            let l3 = await c2.jwt({ token: o11, ...n10 && { trigger: "update" }, session: i10 }), u3 = od(d2);
            if (null !== l3) {
              let e11 = { user: { name: l3.name, email: l3.email, image: l3.picture }, expires: u3.toISOString() }, n11 = await c2.session({ session: e11, token: l3 });
              p2.body = n11;
              let i11 = await a10.encode({ ...a10, token: l3, salt: r11 }), o12 = t10.chunk(i11, { expires: u3 });
              p2.cookies?.push(...o12), await s10.session?.({ session: n11, token: l3 });
            } else p2.cookies?.push(...t10.clean());
          } catch (e11) {
            l2.error(new eG(e11)), p2.cookies?.push(...t10.clean());
          }
          return p2;
        }
        try {
          let { getSessionAndUser: r11, deleteSession: a11, updateSession: l3 } = o10, u3 = await r11(h2);
          if (u3 && u3.session.expires.valueOf() < Date.now() && (await a11(h2), u3 = null), u3) {
            let { user: t11, session: r12 } = u3, o11 = e10.session.updateAge, a12 = r12.expires.valueOf() - 1e3 * d2 + 1e3 * o11, f2 = od(d2);
            a12 <= Date.now() && await l3({ sessionToken: h2, expires: f2 });
            let g2 = await c2.session({ session: { ...r12, user: t11 }, user: t11, newSession: i10, ...n10 ? { trigger: "update" } : {} });
            p2.body = g2, p2.cookies?.push({ name: e10.cookies.sessionToken.name, value: h2, options: { ...e10.cookies.sessionToken.options, expires: f2 } }), await s10.session?.({ session: g2 });
          } else h2 && p2.cookies?.push(...t10.clean());
        } catch (e11) {
          l2.error(new e3(e11));
        }
        return p2;
      }
      async function sP(e10, t10) {
        let r10, n10;
        let { logger: i10, provider: o10 } = t10, a10 = o10.authorization?.url;
        if (!a10 || "authjs.dev" === a10.host) {
          let e11 = new URL(o10.issuer), t11 = await o$(e11, { [ov]: o10[nZ], [oy]: true }), r11 = await oj(e11, t11).catch((t12) => {
            if (!(t12 instanceof TypeError) || "Invalid URL" !== t12.message) throw t12;
            throw TypeError(`Discovery request responded with an invalid issuer. expected: ${e11}`);
          });
          if (!r11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          a10 = new URL(r11.authorization_endpoint);
        }
        let s10 = a10.searchParams, c2 = o10.callbackUrl;
        !t10.isOnRedirectProxy && o10.redirectProxyUrl && (c2 = o10.redirectProxyUrl, n10 = o10.callbackUrl, i10.debug("using redirect proxy", { redirect_uri: c2, data: n10 }));
        let l2 = Object.assign({ response_type: "code", client_id: o10.clientId, redirect_uri: c2, ...o10.authorization?.params }, Object.fromEntries(o10.authorization?.url.searchParams ?? []), e10);
        for (let e11 in l2) s10.set(e11, l2[e11]);
        let u2 = [];
        o10.authorization?.url.searchParams.get("response_mode") === "form_post" && (t10.cookies.state.options.sameSite = "none", t10.cookies.state.options.secure = true, t10.cookies.nonce.options.sameSite = "none", t10.cookies.nonce.options.secure = true);
        let d2 = await sa.create(t10, n10);
        if (d2 && (s10.set("state", d2.value), u2.push(d2.cookie)), o10.checks?.includes("pkce")) {
          if (r10 && !r10.code_challenge_methods_supported?.includes("S256")) "oidc" === o10.type && (o10.checks = ["nonce"]);
          else {
            let { value: e11, cookie: r11 } = await si.create(t10);
            s10.set("code_challenge", e11), s10.set("code_challenge_method", "S256"), u2.push(r11);
          }
        }
        let p2 = await ss.create(t10);
        return p2 && (s10.set("nonce", p2.value), u2.push(p2.cookie)), "oidc" !== o10.type || a10.searchParams.has("scope") || a10.searchParams.set("scope", "openid profile email"), i10.debug("authorization url is ready", { url: a10, cookies: u2, provider: o10 }), { redirect: a10.toString(), cookies: u2 };
      }
      async function sT(e10, t10) {
        let r10;
        let { body: n10 } = e10, { provider: i10, callbacks: o10, adapter: a10 } = t10, s10 = (i10.normalizeIdentifier ?? function(e11) {
          if (!e11) throw Error("Missing email from request body.");
          let t11 = e11.normalize("NFKC").toLowerCase().trim();
          if (t11.includes('"')) throw Error("Invalid email address format.");
          let [r11, n11] = t11.split("@");
          if (!r11 || !n11 || 2 !== t11.split("@").length || !(n11 = n11.split(",")[0])) throw Error("Invalid email address format.");
          return `${r11}@${n11}`;
        })(n10?.email), c2 = { id: crypto.randomUUID(), email: s10, emailVerified: null }, l2 = await a10.getUserByEmail(s10) ?? c2, u2 = { providerAccountId: s10, userId: l2.id, type: "email", provider: i10.id };
        try {
          r10 = await o10.signIn({ user: l2, account: u2, email: { verificationRequest: true } });
        } catch (e11) {
          throw new eW(e11);
        }
        if (!r10) throw new eW("AccessDenied");
        if ("string" == typeof r10) return { redirect: await o10.redirect({ url: r10, baseUrl: t10.url.origin }) };
        let { callbackUrl: d2, theme: p2 } = t10, h2 = await i10.generateVerificationToken?.() ?? nK(32), f2 = new Date(Date.now() + (i10.maxAge ?? 86400) * 1e3), g2 = i10.secret ?? t10.secret, m2 = new URL(t10.basePath, t10.url.origin), y2 = i10.sendVerificationRequest({ identifier: s10, token: h2, expires: f2, url: `${m2}/callback/${i10.id}?${new URLSearchParams({ callbackUrl: d2, token: h2, email: s10 })}`, provider: i10, theme: p2, request: new Request(e10.url, { headers: e10.headers, method: e10.method, body: "POST" === e10.method ? JSON.stringify(e10.body ?? {}) : void 0 }) }), w2 = a10.createVerificationToken?.({ identifier: s10, token: await nq(`${h2}${g2}`), expires: f2 });
        return await Promise.all([y2, w2]), { redirect: `${m2}/verify-request?${new URLSearchParams({ provider: i10.id, type: i10.type })}` };
      }
      async function sC(e10, t10, r10) {
        let n10 = `${r10.url.origin}${r10.basePath}/signin`;
        if (!r10.provider) return { redirect: n10, cookies: t10 };
        switch (r10.provider.type) {
          case "oauth":
          case "oidc": {
            let { redirect: n11, cookies: i10 } = await sP(e10.query, r10);
            return i10 && t10.push(...i10), { redirect: n11, cookies: t10 };
          }
          case "email":
            return { ...await sT(e10, r10), cookies: t10 };
          default:
            return { redirect: n10, cookies: t10 };
        }
      }
      async function sR(e10, t10, r10) {
        let { jwt: n10, events: i10, callbackUrl: o10, logger: a10, session: s10 } = r10, c2 = t10.value;
        if (!c2) return { redirect: o10, cookies: e10 };
        try {
          if ("jwt" === s10.strategy) {
            let e11 = r10.cookies.sessionToken.name, t11 = await n10.decode({ ...n10, token: c2, salt: e11 });
            await i10.signOut?.({ token: t11 });
          } else {
            let e11 = await r10.adapter?.deleteSession(c2);
            await i10.signOut?.({ session: e11 });
          }
        } catch (e11) {
          a10.error(new e6(e11));
        }
        return e10.push(...t10.clean()), { redirect: o10, cookies: e10 };
      }
      async function sO(e10, t10) {
        let { adapter: r10, jwt: n10, session: { strategy: i10 } } = e10, o10 = t10.value;
        if (!o10) return null;
        if ("jwt" === i10) {
          let t11 = e10.cookies.sessionToken.name, r11 = await n10.decode({ ...n10, token: o10, salt: t11 });
          if (r11 && r11.sub) return { id: r11.sub, name: r11.name, email: r11.email, image: r11.picture };
        } else {
          let e11 = await r10?.getSessionAndUser(o10);
          if (e11) return e11.user;
        }
        return null;
      }
      async function sN(e10, t10, r10, n10) {
        let i10 = sv(t10), { provider: o10 } = i10, { action: a10 } = e10.query ?? {};
        if ("register" !== a10 && "authenticate" !== a10 && void 0 !== a10) return { status: 400, body: { error: "Invalid action" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        let s10 = await sO(t10, r10), c2 = s10 ? { user: s10, exists: true } : await o10.getUserInfo(t10, e10), l2 = c2?.user;
        switch (function(e11, t11, r11) {
          let { user: n11, exists: i11 = false } = r11 ?? {};
          switch (e11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (n11 && t11 === i11) return "register";
              break;
            case void 0:
              if (!t11) {
                if (!n11 || i11) return "authenticate";
                return "register";
              }
          }
          return null;
        }(a10, !!s10, c2)) {
          case "authenticate":
            return sg(i10, e10, l2, n10);
          case "register":
            if ("string" == typeof l2?.email) return sf(i10, e10, l2, n10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function sI(e10, t10) {
        let { action: r10, providerId: n10, error: i10, method: o10 } = e10, a10 = t10.skipCSRFCheck === nG, { options: s10, cookies: c2 } = await n5({ authOptions: t10, action: r10, providerId: n10, url: e10.url, callbackUrl: e10.body?.callbackUrl ?? e10.query?.callbackUrl, csrfToken: e10.body?.csrfToken, cookies: e10.cookies, isPost: "POST" === o10, csrfDisabled: a10 }), l2 = new eM(s10.cookies.sessionToken, e10.cookies, s10.logger);
        if ("GET" === o10) {
          let t11 = ou({ ...s10, query: e10.query, cookies: c2 });
          switch (r10) {
            case "callback":
              return await sk(e10, s10, l2, c2);
            case "csrf":
              return t11.csrf(a10, s10, c2);
            case "error":
              return t11.error(i10);
            case "providers":
              return t11.providers(s10.providers);
            case "session":
              return await sA(s10, l2, c2);
            case "signin":
              return t11.signin(n10, i10);
            case "signout":
              return t11.signout();
            case "verify-request":
              return t11.verifyRequest();
            case "webauthn-options":
              return await sN(e10, s10, l2, c2);
          }
        } else {
          let { csrfTokenVerified: t11 } = s10;
          switch (r10) {
            case "callback":
              return "credentials" === s10.provider.type && nJ(r10, t11), await sk(e10, s10, l2, c2);
            case "session":
              return nJ(r10, t11), await sA(s10, l2, c2, true, e10.body?.data);
            case "signin":
              return nJ(r10, t11), await sC(e10, c2, s10);
            case "signout":
              return nJ(r10, t11), await sR(c2, l2, s10);
          }
        }
        throw new e7(`Cannot handle action: ${r10}`);
      }
      function sU(e10, t10, r10, n10, i10) {
        let o10;
        let a10 = i10?.basePath, s10 = n10.AUTH_URL ?? n10.NEXTAUTH_URL;
        if (s10) o10 = new URL(s10), a10 && "/" !== a10 && "/" !== o10.pathname && (o10.pathname !== a10 && n$(i10).warn("env-url-basepath-mismatch"), o10.pathname = "/");
        else {
          let e11 = r10.get("x-forwarded-host") ?? r10.get("host"), n11 = r10.get("x-forwarded-proto") ?? t10 ?? "https", i11 = n11.endsWith(":") ? n11 : n11 + ":";
          o10 = new URL(`${i11}//${e11}`);
        }
        let c2 = o10.toString().replace(/\/$/, "");
        if (a10) {
          let t11 = a10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${c2}/${t11}/${e10}`);
        }
        return new URL(`${c2}/${e10}`);
      }
      async function sL(e10, t10) {
        let r10 = n$(t10), n10 = await nW(e10, t10);
        if (!n10) return Response.json("Bad request.", { status: 400 });
        let i10 = function(e11, t11) {
          let { url: r11 } = e11, n11 = [];
          if (!tl && t11.debug && n11.push("debug-enabled"), !t11.trustHost) return new te(`Host must be trusted. URL was: ${e11.url}`);
          if (!t11.secret?.length) return new eQ("Please define a `secret`");
          let i11 = e11.query?.callbackUrl;
          if (i11 && !tu(i11, r11.origin)) return new eV(`Invalid callback URL. Received: ${i11}`);
          let { callbackUrl: o11 } = e$(t11.useSecureCookies ?? "https:" === r11.protocol), a11 = e11.cookies?.[t11.cookies?.callbackUrl?.name ?? o11.name];
          if (a11 && !tu(a11, r11.origin)) return new eV(`Invalid callback URL. Received: ${a11}`);
          let s10 = false;
          for (let e12 of t11.providers) {
            let t12 = "function" == typeof e12 ? e12() : e12;
            if (("oauth" === t12.type || "oidc" === t12.type) && !(t12.issuer ?? t12.options?.issuer)) {
              let e13;
              let { authorization: r12, token: n12, userinfo: i12 } = t12;
              if ("string" == typeof r12 || r12?.url ? "string" == typeof n12 || n12?.url ? "string" == typeof i12 || i12?.url || (e13 = "userinfo") : e13 = "token" : e13 = "authorization", e13) return new eF(`Provider "${t12.id}" is missing both \`issuer\` and \`${e13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === t12.type) td = true;
            else if ("email" === t12.type) tp = true;
            else if ("webauthn" === t12.type) {
              var c2;
              if (th = true, t12.simpleWebAuthnBrowserVersion && (c2 = t12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(c2))) return new eD(`Invalid provider config for "${t12.id}": simpleWebAuthnBrowserVersion "${t12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (t12.enableConditionalUI) {
                if (s10) return new ti("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (s10 = true, !Object.values(t12.formFields).some((e13) => e13.autocomplete && e13.autocomplete.toString().indexOf("webauthn") > -1)) return new to(`Provider "${t12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (td) {
            let e12 = t11.session?.strategy === "database", r12 = !t11.providers.some((e13) => "credentials" !== ("function" == typeof e13 ? e13() : e13).type);
            if (e12 && r12) return new e9("Signing in with credentials only supported if JWT strategy is enabled");
            if (t11.providers.some((e13) => {
              let t12 = "function" == typeof e13 ? e13() : e13;
              return "credentials" === t12.type && !t12.authorize;
            })) return new eY("Must define an authorize() handler to use credentials authentication provider");
          }
          let { adapter: l2, session: u2 } = t11, d2 = [];
          if (tp || u2?.strategy === "database" || !u2?.strategy && l2) {
            if (tp) {
              if (!l2) return new eX("Email login requires an adapter");
              d2.push(...tf);
            } else {
              if (!l2) return new eX("Database session requires an adapter");
              d2.push(...tg);
            }
          }
          if (th) {
            if (!t11.experimental?.enableWebAuthn) return new tc("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (n11.push("experimental-webauthn"), !l2) return new eX("WebAuthn requires an adapter");
            d2.push(...tm);
          }
          if (l2) {
            let e12 = d2.filter((e13) => !(e13 in l2));
            if (e12.length) return new eZ(`Required adapter methods were missing: ${e12.join(", ")}`);
          }
          return tl || (tl = true), n11;
        }(n10, t10);
        if (Array.isArray(i10)) i10.forEach(r10.warn);
        else if (i10) {
          if (r10.error(i10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(n10.action) || "GET" !== n10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          let { pages: e11, theme: o11 } = t10, a11 = e11?.error && n10.url.searchParams.get("callbackUrl")?.startsWith(e11.error);
          if (!e11?.error || a11) return a11 && r10.error(new eq(`The error page ${e11?.error} should not require authentication`)), nB(ou({ theme: o11 }).error("Configuration"));
          let s10 = `${n10.url.origin}${e11.error}?error=Configuration`;
          return Response.redirect(s10);
        }
        let o10 = e10.headers?.has("X-Auth-Return-Redirect"), a10 = t10.raw === nX;
        try {
          let e11 = await sI(n10, t10);
          if (a10) return e11;
          let r11 = nB(e11), i11 = r11.headers.get("Location");
          if (!o10 || !i11) return r11;
          return Response.json({ url: i11 }, { headers: r11.headers });
        } catch (d2) {
          r10.error(d2);
          let i11 = d2 instanceof eD;
          if (i11 && a10 && !o10) throw d2;
          if ("POST" === e10.method && "session" === n10.action) return Response.json(null, { status: 400 });
          let s10 = new URLSearchParams({ error: d2 instanceof eD && tn.has(d2.type) ? d2.type : "Configuration" });
          d2 instanceof eJ && s10.set("code", d2.code);
          let c2 = i11 && d2.kind || "error", l2 = t10.pages?.[c2] ?? `${t10.basePath}/${c2.toLowerCase()}`, u2 = `${n10.url.origin}${l2}?${s10}`;
          if (o10) return Response.json({ url: u2 });
          return Response.redirect(u2);
        }
      }
      function s$(e10) {
        let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!t10) return e10;
        let { origin: r10 } = new URL(t10), { href: n10, origin: i10 } = e10.nextUrl;
        return new B(n10.replace(i10, r10), e10);
      }
      function sM(e10) {
        try {
          e10.secret ?? (e10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!t10) return;
          let { pathname: r10 } = new URL(t10);
          if ("/" === r10) return;
          e10.basePath || (e10.basePath = r10);
        } catch {
        } finally {
          e10.basePath || (e10.basePath = "/api/auth"), function(e11, t10, r10 = false) {
            try {
              let n10 = e11.AUTH_URL;
              n10 && (t10.basePath ? r10 || n$(t10).warn("env-url-basepath-redundant") : t10.basePath = new URL(n10).pathname);
            } catch {
            } finally {
              t10.basePath ?? (t10.basePath = "/auth");
            }
            if (!t10.secret?.length) {
              t10.secret = [];
              let r11 = e11.AUTH_SECRET;
              for (let n10 of (r11 && t10.secret.push(r11), [1, 2, 3])) {
                let r12 = e11[`AUTH_SECRET_${n10}`];
                r12 && t10.secret.unshift(r12);
              }
            }
            t10.redirectProxyUrl ?? (t10.redirectProxyUrl = e11.AUTH_REDIRECT_PROXY_URL), t10.trustHost ?? (t10.trustHost = !!(e11.AUTH_URL ?? e11.AUTH_TRUST_HOST ?? e11.VERCEL ?? e11.CF_PAGES ?? "production" !== e11.NODE_ENV)), t10.providers = t10.providers.map((t11) => {
              let { id: r11 } = "function" == typeof t11 ? t11({}) : t11, n10 = r11.toUpperCase().replace(/-/g, "_"), i10 = e11[`AUTH_${n10}_ID`], o10 = e11[`AUTH_${n10}_SECRET`], a10 = e11[`AUTH_${n10}_ISSUER`], s10 = e11[`AUTH_${n10}_KEY`], c2 = "function" == typeof t11 ? t11({ clientId: i10, clientSecret: o10, issuer: a10, apiKey: s10 }) : t11;
              return "oauth" === c2.type || "oidc" === c2.type ? (c2.clientId ?? (c2.clientId = i10), c2.clientSecret ?? (c2.clientSecret = o10), c2.issuer ?? (c2.issuer = a10)) : "email" === c2.type && (c2.apiKey ?? (c2.apiKey = s10)), c2;
            });
          }(process.env, e10, true);
        }
      }
      r(340), "undefined" == typeof URLPattern || URLPattern;
      let sD = (0, eE.P)();
      var sj = r(23);
      class sH extends Error {
        constructor(e10) {
          super("Dynamic server usage: " + e10), this.description = e10, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
      class sW extends Error {
        constructor(...e10) {
          super(...e10), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      let sB = "function" == typeof sj.unstable_postpone;
      function sq(e10, t10) {
        let r10 = new URL(e10.urlPathname, "http://n").pathname;
        if (e10.isUnstableCacheCallback) throw Error(`Route ${r10} used "${t10}" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "${t10}" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        if (e10.dynamicShouldError) throw new sW(`Route ${r10} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${t10}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        if (e10.prerenderState) !function(e11, t11, r11) {
          !function() {
            if (!sB) throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
          }();
          let n10 = `Route ${r11} needs to bail out of prerendering at this point because it used ${t11}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
          e11.dynamicAccesses.push({ stack: e11.isDebugSkeleton ? Error().stack : void 0, expression: t11 }), sj.unstable_postpone(n10);
        }(e10.prerenderState, t10, r10);
        else if (e10.revalidate = 0, e10.isStaticGeneration) {
          let n10 = new sH(`Route ${r10} couldn't be rendered statically because it used \`${t10}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
          throw e10.dynamicUsageDescription = t10, e10.dynamicUsageStack = n10.stack, n10;
        }
      }
      function sK() {
        let e10 = "headers", t10 = ee.A.getStore();
        if (t10) {
          if (t10.forceStatic) return Q.seal(new Headers({}));
          sq(t10, e10);
        }
        return eP(e10).headers;
      }
      function sV() {
        let e10 = "cookies", t10 = ee.A.getStore();
        if (t10) {
          if (t10.forceStatic) return er.seal(new H.RequestCookies(new Headers({})));
          sq(t10, e10);
        }
        let r10 = eP(e10), n10 = sD.getStore();
        return (null == n10 ? void 0 : n10.isAction) || (null == n10 ? void 0 : n10.isAppRoute) ? r10.mutableCookies : r10.cookies;
      }
      async function sJ(e10, t10) {
        return sL(new Request(sU("session", e10.get("x-forwarded-proto"), e10, process.env, t10), { headers: { cookie: e10.get("cookie") ?? "" } }), { ...t10, callbacks: { ...t10.callbacks, async session(...e11) {
          let r10 = await t10.callbacks?.session?.(...e11) ?? { ...e11[0].session, expires: e11[0].session.expires?.toISOString?.() ?? e11[0].session.expires };
          return { user: e11[0].user ?? e11[0].token, ...r10 };
        } } });
      }
      async function sF(e10) {
        return e10.ok ? await e10.json() : null;
      }
      function sz(e10) {
        return "function" == typeof e10;
      }
      function sG(e10, t10) {
        return "function" == typeof e10 ? async (...r10) => {
          if (!r10.length) {
            let r11 = await sK(), n11 = await e10(void 0);
            return t10?.(n11), sJ(r11, n11).then(sF);
          }
          if (r10[0] instanceof Request) {
            let n11 = r10[0], i11 = r10[1], o11 = await e10(n11);
            return t10?.(o11), sX([n11, i11], o11);
          }
          if (sz(r10[0])) {
            let n11 = r10[0];
            return async (...r11) => {
              let i11 = await e10(r11[0]);
              return t10?.(i11), sX(r11, i11, n11);
            };
          }
          let n10 = "req" in r10[0] ? r10[0].req : r10[0], i10 = "res" in r10[0] ? r10[0].res : r10[1], o10 = await e10(n10);
          return t10?.(o10), sJ(new Headers(n10.headers), o10).then(async (e11) => {
            let t11 = await sF(e11);
            for (let t12 of e11.headers.getSetCookie()) "headers" in i10 ? i10.headers.append("set-cookie", t12) : i10.appendHeader("set-cookie", t12);
            return t11;
          });
        } : (...t11) => {
          if (!t11.length) return Promise.resolve(sK()).then((t12) => sJ(t12, e10).then(sF));
          if (t11[0] instanceof Request) return sX([t11[0], t11[1]], e10);
          if (sz(t11[0])) {
            let r11 = t11[0];
            return async (...t12) => sX(t12, e10, r11).then((e11) => e11);
          }
          let r10 = "req" in t11[0] ? t11[0].req : t11[0], n10 = "res" in t11[0] ? t11[0].res : t11[1];
          return sJ(new Headers(r10.headers), e10).then(async (e11) => {
            let t12 = await sF(e11);
            for (let t13 of e11.headers.getSetCookie()) "headers" in n10 ? n10.headers.append("set-cookie", t13) : n10.appendHeader("set-cookie", t13);
            return t12;
          });
        };
      }
      async function sX(e10, t10, r10) {
        let n10 = s$(e10[0]), i10 = await sJ(n10.headers, t10), o10 = await sF(i10), a10 = true;
        t10.callbacks?.authorized && (a10 = await t10.callbacks.authorized({ request: n10, auth: o10 }));
        let s10 = F.next?.();
        if (a10 instanceof Response) {
          s10 = a10;
          let e11 = a10.headers.get("Location"), { pathname: r11 } = n10.nextUrl;
          e11 && function(e12, t11, r12) {
            let n11 = t11.replace(`${e12}/`, ""), i11 = Object.values(r12.pages ?? {});
            return (sZ.has(n11) || i11.includes(t11)) && t11 === e12;
          }(r11, new URL(e11).pathname, t10) && (a10 = true);
        } else if (r10) n10.auth = o10, s10 = await r10(n10, e10[1]) ?? F.next();
        else if (!a10) {
          let e11 = t10.pages?.signIn ?? `${t10.basePath}/signin`;
          if (n10.nextUrl.pathname !== e11) {
            let t11 = n10.nextUrl.clone();
            t11.pathname = e11, t11.searchParams.set("callbackUrl", n10.nextUrl.href), s10 = F.redirect(t11);
          }
        }
        let c2 = new Response(s10?.body, s10);
        for (let e11 of i10.headers.getSetCookie()) c2.headers.append("set-cookie", e11);
        return c2;
      }
      let sZ = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      !function(e10) {
        e10[e10.SeeOther = 303] = "SeeOther", e10[e10.TemporaryRedirect = 307] = "TemporaryRedirect", e10[e10.PermanentRedirect = 308] = "PermanentRedirect";
      }(u || (u = {}));
      let sY = "NEXT_REDIRECT";
      function sQ(e10, t10) {
        void 0 === t10 && (t10 = "replace");
        let r10 = sD.getStore();
        throw function(e11, t11, r11) {
          void 0 === r11 && (r11 = u.TemporaryRedirect);
          let n10 = Error(sY);
          n10.digest = sY + ";" + t11 + ";" + e11 + ";" + r11 + ";";
          let i10 = eA.getStore();
          return i10 && (n10.mutableCookies = i10.mutableCookies), n10;
        }(e10, t10, (null == r10 ? void 0 : r10.isAction) ? u.SeeOther : u.TemporaryRedirect);
      }
      async function s0(e10, t10 = {}, r10, n10) {
        let i10 = new Headers(await sK()), { redirect: o10 = true, redirectTo: a10, ...s10 } = t10 instanceof FormData ? Object.fromEntries(t10) : t10, c2 = a10?.toString() ?? i10.get("Referer") ?? "/", l2 = sU("signin", i10.get("x-forwarded-proto"), i10, process.env, n10);
        if (!e10) return l2.searchParams.append("callbackUrl", c2), o10 && sQ(l2.toString()), l2.toString();
        let u2 = `${l2}/${e10}?${new URLSearchParams(r10)}`, d2 = {};
        for (let t11 of n10.providers) {
          let { options: r11, ...n11 } = "function" == typeof t11 ? t11() : t11, i11 = r11?.id ?? n11.id;
          if (i11 === e10) {
            d2 = { id: i11, type: r11?.type ?? n11.type };
            break;
          }
        }
        if (!d2.id) {
          let e11 = `${l2}?${new URLSearchParams({ callbackUrl: c2 })}`;
          return o10 && sQ(e11), e11;
        }
        "credentials" === d2.type && (u2 = u2.replace("signin", "callback")), i10.set("Content-Type", "application/x-www-form-urlencoded");
        let p2 = new Request(u2, { method: "POST", headers: i10, body: new URLSearchParams({ ...s10, callbackUrl: c2 }) }), h2 = await sL(p2, { ...n10, raw: nX, skipCSRFCheck: nG }), f2 = await sV();
        for (let e11 of h2?.cookies ?? []) f2.set(e11.name, e11.value, e11.options);
        let g2 = (h2 instanceof Response ? h2.headers.get("Location") : h2.redirect) ?? u2;
        return o10 ? sQ(g2) : g2;
      }
      async function s1(e10, t10) {
        let r10 = new Headers(await sK());
        r10.set("Content-Type", "application/x-www-form-urlencoded");
        let n10 = sU("signout", r10.get("x-forwarded-proto"), r10, process.env, t10), i10 = new URLSearchParams({ callbackUrl: e10?.redirectTo ?? r10.get("Referer") ?? "/" }), o10 = new Request(n10, { method: "POST", headers: r10, body: i10 }), a10 = await sL(o10, { ...t10, raw: nX, skipCSRFCheck: nG }), s10 = await sV();
        for (let e11 of a10?.cookies ?? []) s10.set(e11.name, e11.value, e11.options);
        return e10?.redirect ?? true ? sQ(a10.redirect) : a10;
      }
      async function s2(e10, t10) {
        let r10 = new Headers(await sK());
        r10.set("Content-Type", "application/json");
        let n10 = new Request(sU("session", r10.get("x-forwarded-proto"), r10, process.env, t10), { method: "POST", headers: r10, body: JSON.stringify({ data: e10 }) }), i10 = await sL(n10, { ...t10, raw: nX, skipCSRFCheck: nG }), o10 = await sV();
        for (let e11 of i10?.cookies ?? []) o10.set(e11.name, e11.value, e11.options);
        return i10.body;
      }
      !function(e10) {
        e10.push = "push", e10.replace = "replace";
      }(d || (d = {}));
      var s3 = r(673);
      let s5 = globalThis.prisma || new s3.PrismaClient();
      var s4 = r(468), s6 = null;
      function s7(e10, t10) {
        if ("number" != typeof (e10 = e10 || cl)) throw Error("Illegal arguments: " + typeof e10 + ", " + typeof t10);
        e10 < 4 ? e10 = 4 : e10 > 31 && (e10 = 31);
        var r10 = [];
        return r10.push("$2b$"), e10 < 10 && r10.push("0"), r10.push(e10.toString()), r10.push("$"), r10.push(ca(function(e11) {
          try {
            return crypto.getRandomValues(new Uint8Array(e11));
          } catch {
          }
          try {
            return s4.randomBytes(e11);
          } catch {
          }
          if (!s6) throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
          return s6(e11);
        }(cc), cc)), r10.join("");
      }
      function s9(e10, t10, r10) {
        if ("function" == typeof t10 && (r10 = t10, t10 = void 0), "function" == typeof e10 && (r10 = e10, e10 = void 0), void 0 === e10) e10 = cl;
        else if ("number" != typeof e10) throw Error("illegal arguments: " + typeof e10);
        function n10(t11) {
          cr(function() {
            try {
              t11(null, s7(e10));
            } catch (e11) {
              t11(e11);
            }
          });
        }
        if (!r10) return new Promise(function(e11, t11) {
          n10(function(r11, n11) {
            if (r11) {
              t11(r11);
              return;
            }
            e11(n11);
          });
        });
        if ("function" != typeof r10) throw Error("Illegal callback: " + typeof r10);
        n10(r10);
      }
      function s8(e10, t10) {
        if (void 0 === t10 && (t10 = cl), "number" == typeof t10 && (t10 = s7(t10)), "string" != typeof e10 || "string" != typeof t10) throw Error("Illegal arguments: " + typeof e10 + ", " + typeof t10);
        return cy(e10, t10);
      }
      function ce(e10, t10, r10, n10) {
        function i10(r11) {
          "string" == typeof e10 && "number" == typeof t10 ? s9(t10, function(t11, i11) {
            cy(e10, i11, r11, n10);
          }) : "string" == typeof e10 && "string" == typeof t10 ? cy(e10, t10, r11, n10) : cr(r11.bind(this, Error("Illegal arguments: " + typeof e10 + ", " + typeof t10)));
        }
        if (!r10) return new Promise(function(e11, t11) {
          i10(function(r11, n11) {
            if (r11) {
              t11(r11);
              return;
            }
            e11(n11);
          });
        });
        if ("function" != typeof r10) throw Error("Illegal callback: " + typeof r10);
        i10(r10);
      }
      function ct(e10, t10) {
        for (var r10 = e10.length ^ t10.length, n10 = 0; n10 < e10.length; ++n10) r10 |= e10.charCodeAt(n10) ^ t10.charCodeAt(n10);
        return 0 === r10;
      }
      var cr = "function" == typeof setImmediate ? setImmediate : "object" == typeof scheduler && "function" == typeof scheduler.postTask ? scheduler.postTask.bind(scheduler) : setTimeout;
      function cn(e10) {
        for (var t10 = 0, r10 = 0, n10 = 0; n10 < e10.length; ++n10) (r10 = e10.charCodeAt(n10)) < 128 ? t10 += 1 : r10 < 2048 ? t10 += 2 : (64512 & r10) == 55296 && (64512 & e10.charCodeAt(n10 + 1)) == 56320 ? (++n10, t10 += 4) : t10 += 3;
        return t10;
      }
      var ci = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), co = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1];
      function ca(e10, t10) {
        var r10, n10, i10 = 0, o10 = [];
        if (t10 <= 0 || t10 > e10.length) throw Error("Illegal len: " + t10);
        for (; i10 < t10; ) {
          if (r10 = 255 & e10[i10++], o10.push(ci[r10 >> 2 & 63]), r10 = (3 & r10) << 4, i10 >= t10 || (r10 |= (n10 = 255 & e10[i10++]) >> 4 & 15, o10.push(ci[63 & r10]), r10 = (15 & n10) << 2, i10 >= t10)) {
            o10.push(ci[63 & r10]);
            break;
          }
          r10 |= (n10 = 255 & e10[i10++]) >> 6 & 3, o10.push(ci[63 & r10]), o10.push(ci[63 & n10]);
        }
        return o10.join("");
      }
      function cs(e10, t10) {
        var r10, n10, i10, o10, a10, s10 = 0, c2 = e10.length, l2 = 0, u2 = [];
        if (t10 <= 0) throw Error("Illegal len: " + t10);
        for (; s10 < c2 - 1 && l2 < t10 && (r10 = (a10 = e10.charCodeAt(s10++)) < co.length ? co[a10] : -1, n10 = (a10 = e10.charCodeAt(s10++)) < co.length ? co[a10] : -1, -1 != r10 && -1 != n10) && (o10 = r10 << 2 >>> 0 | (48 & n10) >> 4, u2.push(String.fromCharCode(o10)), !(++l2 >= t10 || s10 >= c2 || -1 == (i10 = (a10 = e10.charCodeAt(s10++)) < co.length ? co[a10] : -1) || (o10 = (15 & n10) << 4 >>> 0 | (60 & i10) >> 2, u2.push(String.fromCharCode(o10)), ++l2 >= t10 || s10 >= c2))); ) o10 = (3 & i10) << 6 >>> 0 | ((a10 = e10.charCodeAt(s10++)) < co.length ? co[a10] : -1), u2.push(String.fromCharCode(o10)), ++l2;
        var d2 = [];
        for (s10 = 0; s10 < l2; s10++) d2.push(u2[s10].charCodeAt(0));
        return d2;
      }
      var cc = 16, cl = 10, cu = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], cd = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462], cp = [1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892];
      function ch(e10, t10, r10, n10) {
        var i10 = e10[t10], o10 = e10[t10 + 1];
        return i10 ^= r10[0], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[1], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[2], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[3], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[4], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[5], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[6], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[7], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[8], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[9], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[10], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[11], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[12], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[13], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[14], o10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[15], i10 ^= (n10[o10 >>> 24] + n10[256 | o10 >> 16 & 255] ^ n10[512 | o10 >> 8 & 255]) + n10[768 | 255 & o10] ^ r10[16], e10[t10] = o10 ^ r10[17], e10[t10 + 1] = i10, e10;
      }
      function cf(e10, t10) {
        for (var r10 = 0, n10 = 0; r10 < 4; ++r10) n10 = n10 << 8 | 255 & e10[t10], t10 = (t10 + 1) % e10.length;
        return { key: n10, offp: t10 };
      }
      function cg(e10, t10, r10) {
        for (var n10, i10 = 0, o10 = [0, 0], a10 = t10.length, s10 = r10.length, c2 = 0; c2 < a10; c2++) i10 = (n10 = cf(e10, i10)).offp, t10[c2] = t10[c2] ^ n10.key;
        for (c2 = 0; c2 < a10; c2 += 2) o10 = ch(o10, 0, t10, r10), t10[c2] = o10[0], t10[c2 + 1] = o10[1];
        for (c2 = 0; c2 < s10; c2 += 2) o10 = ch(o10, 0, t10, r10), r10[c2] = o10[0], r10[c2 + 1] = o10[1];
      }
      function cm(e10, t10, r10, n10, i10) {
        var o10, a10, s10 = cp.slice(), c2 = s10.length;
        if (r10 < 4 || r10 > 31) {
          if (a10 = Error("Illegal number of rounds (4-31): " + r10), n10) {
            cr(n10.bind(this, a10));
            return;
          }
          throw a10;
        }
        if (t10.length !== cc) {
          if (a10 = Error("Illegal salt length: " + t10.length + " != " + cc), n10) {
            cr(n10.bind(this, a10));
            return;
          }
          throw a10;
        }
        r10 = 1 << r10 >>> 0;
        var l2, u2, d2, p2 = 0;
        function h2() {
          if (i10 && i10(p2 / r10), p2 < r10) for (var o11 = Date.now(); p2 < r10 && (p2 += 1, cg(e10, l2, u2), cg(t10, l2, u2), !(Date.now() - o11 > 100)); ) ;
          else {
            for (p2 = 0; p2 < 64; p2++) for (d2 = 0; d2 < c2 >> 1; d2++) ch(s10, d2 << 1, l2, u2);
            var a11 = [];
            for (p2 = 0; p2 < c2; p2++) a11.push((s10[p2] >> 24 & 255) >>> 0), a11.push((s10[p2] >> 16 & 255) >>> 0), a11.push((s10[p2] >> 8 & 255) >>> 0), a11.push((255 & s10[p2]) >>> 0);
            return n10 ? void n10(null, a11) : a11;
          }
          n10 && cr(h2);
        }
        if ("function" == typeof Int32Array ? (l2 = new Int32Array(cu), u2 = new Int32Array(cd)) : (l2 = cu.slice(), u2 = cd.slice()), !function(e11, t11, r11, n11) {
          for (var i11, o11 = 0, a11 = [0, 0], s11 = r11.length, c3 = n11.length, l3 = 0; l3 < s11; l3++) o11 = (i11 = cf(t11, o11)).offp, r11[l3] = r11[l3] ^ i11.key;
          for (l3 = 0, o11 = 0; l3 < s11; l3 += 2) o11 = (i11 = cf(e11, o11)).offp, a11[0] ^= i11.key, o11 = (i11 = cf(e11, o11)).offp, a11[1] ^= i11.key, a11 = ch(a11, 0, r11, n11), r11[l3] = a11[0], r11[l3 + 1] = a11[1];
          for (l3 = 0; l3 < c3; l3 += 2) o11 = (i11 = cf(e11, o11)).offp, a11[0] ^= i11.key, o11 = (i11 = cf(e11, o11)).offp, a11[1] ^= i11.key, a11 = ch(a11, 0, r11, n11), n11[l3] = a11[0], n11[l3 + 1] = a11[1];
        }(t10, e10, l2, u2), void 0 !== n10) h2();
        else for (; ; ) if (void 0 !== (o10 = h2())) return o10 || [];
      }
      function cy(e10, t10, r10, n10) {
        if ("string" != typeof e10 || "string" != typeof t10) {
          if (i10 = Error("Invalid string / salt: Not a string"), r10) {
            cr(r10.bind(this, i10));
            return;
          }
          throw i10;
        }
        if ("$" !== t10.charAt(0) || "2" !== t10.charAt(1)) {
          if (i10 = Error("Invalid salt version: " + t10.substring(0, 2)), r10) {
            cr(r10.bind(this, i10));
            return;
          }
          throw i10;
        }
        if ("$" === t10.charAt(2)) o10 = "\0", a10 = 3;
        else {
          if ("a" !== (o10 = t10.charAt(2)) && "b" !== o10 && "y" !== o10 || "$" !== t10.charAt(3)) {
            if (i10 = Error("Invalid salt revision: " + t10.substring(2, 4)), r10) {
              cr(r10.bind(this, i10));
              return;
            }
            throw i10;
          }
          a10 = 4;
        }
        if (t10.charAt(a10 + 2) > "$") {
          if (i10 = Error("Missing salt rounds"), r10) {
            cr(r10.bind(this, i10));
            return;
          }
          throw i10;
        }
        var i10, o10, a10, s10 = 10 * parseInt(t10.substring(a10, a10 + 1), 10) + parseInt(t10.substring(a10 + 1, a10 + 2), 10), c2 = t10.substring(a10 + 3, a10 + 25), l2 = function(e11) {
          for (var t11, r11, n11 = 0, i11 = Array(cn(e11)), o11 = 0, a11 = e11.length; o11 < a11; ++o11) (t11 = e11.charCodeAt(o11)) < 128 ? i11[n11++] = t11 : (t11 < 2048 ? i11[n11++] = t11 >> 6 | 192 : ((64512 & t11) == 55296 && (64512 & (r11 = e11.charCodeAt(o11 + 1))) == 56320 ? (t11 = 65536 + ((1023 & t11) << 10) + (1023 & r11), ++o11, i11[n11++] = t11 >> 18 | 240, i11[n11++] = t11 >> 12 & 63 | 128) : i11[n11++] = t11 >> 12 | 224, i11[n11++] = t11 >> 6 & 63 | 128), i11[n11++] = 63 & t11 | 128);
          return i11;
        }(e10 += o10 >= "a" ? "\0" : ""), u2 = cs(c2, cc);
        function d2(e11) {
          var t11 = [];
          return t11.push("$2"), o10 >= "a" && t11.push(o10), t11.push("$"), s10 < 10 && t11.push("0"), t11.push(s10.toString()), t11.push("$"), t11.push(ca(u2, u2.length)), t11.push(ca(e11, 4 * cp.length - 1)), t11.join("");
        }
        if (void 0 === r10) return d2(cm(l2, u2, s10));
        cm(l2, u2, s10, function(e11, t11) {
          e11 ? r10(e11, null) : r10(null, d2(t11));
        }, n10);
      }
      let cw = { setRandomFallback: function(e10) {
        s6 = e10;
      }, genSaltSync: s7, genSalt: s9, hashSync: s8, hash: ce, compareSync: function(e10, t10) {
        if ("string" != typeof e10 || "string" != typeof t10) throw Error("Illegal arguments: " + typeof e10 + ", " + typeof t10);
        return 60 === t10.length && ct(s8(e10, t10.substring(0, t10.length - 31)), t10);
      }, compare: function(e10, t10, r10, n10) {
        function i10(r11) {
          if ("string" != typeof e10 || "string" != typeof t10) {
            cr(r11.bind(this, Error("Illegal arguments: " + typeof e10 + ", " + typeof t10)));
            return;
          }
          if (60 !== t10.length) {
            cr(r11.bind(this, null, false));
            return;
          }
          ce(e10, t10.substring(0, 29), function(e11, n11) {
            e11 ? r11(e11) : r11(null, ct(n11, t10));
          }, n10);
        }
        if (!r10) return new Promise(function(e11, t11) {
          i10(function(r11, n11) {
            if (r11) {
              t11(r11);
              return;
            }
            e11(n11);
          });
        });
        if ("function" != typeof r10) throw Error("Illegal callback: " + typeof r10);
        i10(r10);
      }, getRounds: function(e10) {
        if ("string" != typeof e10) throw Error("Illegal arguments: " + typeof e10);
        return parseInt(e10.split("$")[2], 10);
      }, getSalt: function(e10) {
        if ("string" != typeof e10) throw Error("Illegal arguments: " + typeof e10);
        if (60 !== e10.length) throw Error("Illegal hash length: " + e10.length + " != 60");
        return e10.substring(0, 29);
      }, truncates: function(e10) {
        if ("string" != typeof e10) throw Error("Illegal arguments: " + typeof e10);
        return cn(e10) > 72;
      }, encodeBase64: function(e10, t10) {
        return ca(e10, t10);
      }, decodeBase64: function(e10, t10) {
        return cs(e10, t10);
      } }, { handlers: cb, auth: cv, signIn: c_, signOut: cS } = function(e10) {
        if ("function" == typeof e10) {
          let t11 = async (t12) => {
            let r10 = await e10(t12);
            return sM(r10), sL(s$(t12), r10);
          };
          return { handlers: { GET: t11, POST: t11 }, auth: sG(e10, (e11) => sM(e11)), signIn: async (t12, r10, n10) => {
            let i10 = await e10(void 0);
            return sM(i10), s0(t12, r10, n10, i10);
          }, signOut: async (t12) => {
            let r10 = await e10(void 0);
            return sM(r10), s1(t12, r10);
          }, unstable_update: async (t12) => {
            let r10 = await e10(void 0);
            return sM(r10), s2(t12, r10);
          } };
        }
        sM(e10);
        let t10 = (t11) => sL(s$(t11), e10);
        return { handlers: { GET: t10, POST: t10 }, auth: sG(e10), signIn: (t11, r10, n10) => s0(t11, r10, n10, e10), signOut: (t11) => s1(t11, e10), unstable_update: (t11) => s2(t11, e10) };
      }({ session: { strategy: "jwt" }, pages: { signIn: "/login" }, secret: process.env.NEXTAUTH_SECRET || "dev-secret-key-pixlape", providers: [{ id: "credentials", name: "Credentials", type: "credentials", credentials: {}, authorize: () => null, options: { name: "credentials", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(e10) {
        if (!e10?.email || !e10?.password) return null;
        let t10 = e10.email.trim().toLowerCase(), r10 = e10.password;
        try {
          let e11 = await s5.user.findUnique({ where: { email: t10 } });
          if (e11 && e11.password && await cw.compare(r10, e11.password)) return { id: e11.id, email: e11.email, name: e11.name || "Admin User", role: e11.role || "ADMIN" };
        } catch (e11) {
          console.warn("\u26A0\uFE0F [Auth] Database user query fallback:", e11);
        }
        let n10 = (process.env.ADMIN_EMAIL || "admin@store.com").toLowerCase(), i10 = process.env.ADMIN_PASSWORD || "admin123";
        return t10 === n10 && r10 === i10 || "admin@pixlape.com" === t10 && "adminpassword" === r10 ? { id: "default-admin-id", email: t10, name: "Galih Addi (Admin)", role: "ADMIN" } : null;
      } } }], callbacks: { jwt: async ({ token: e10, user: t10 }) => (t10 && (e10.role = t10.role || "ADMIN", e10.id = t10.id), e10), session: async ({ session: e10, token: t10 }) => (t10 && e10.user && (e10.user.id = t10.id, e10.user.role = t10.role), e10) } }), cx = cv((e10) => {
        let { nextUrl: t10 } = e10, r10 = !!e10.auth, n10 = e10.auth?.user?.role, i10 = t10.pathname.startsWith("/admin"), o10 = "/login" === t10.pathname || "/admin/login" === t10.pathname;
        if (o10 && r10 && "ADMIN" === n10) return F.redirect(new URL("/admin", t10));
        if (i10 && !o10 && !r10) {
          let e11 = new URL("/login", t10);
          return e11.searchParams.set("callbackUrl", t10.pathname), F.redirect(e11);
        }
        return i10 && !o10 && r10 && "ADMIN" !== n10 ? F.redirect(new URL("/", t10)) : F.next();
      }), ck = { matcher: ["/admin/:path*", "/login", "/admin/login"] }, cE = { ...h }, cA = cE.middleware || cE.default, cP = "/src/middleware";
      if ("function" != typeof cA) throw Error(`The Middleware "${cP}" must export a \`middleware\` or a \`default\` function`);
      function cT(e10) {
        return eI({ ...e10, page: cP, handler: cA });
      }
    }, 671: (e, t, r) => {
      e.exports = { ...r(92) };
    }, 92: (e, t, r) => {
      Object.defineProperty(t, "__esModule", { value: true });
      let { Decimal: n, objectEnumValues: i, makeStrictEnum: o, Public: a, getRuntime: s, skip: c } = r(57), l = {};
      t.Prisma = l, t.$Enums = {}, l.prismaVersion = { client: "5.22.0", engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, l.PrismaClientKnownRequestError = () => {
        let e2 = s().prettyName;
        throw Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.PrismaClientUnknownRequestError = () => {
        let e2 = s().prettyName;
        throw Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.PrismaClientRustPanicError = () => {
        let e2 = s().prettyName;
        throw Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.PrismaClientInitializationError = () => {
        let e2 = s().prettyName;
        throw Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.PrismaClientValidationError = () => {
        let e2 = s().prettyName;
        throw Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.NotFoundError = () => {
        let e2 = s().prettyName;
        throw Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.Decimal = n, l.sql = () => {
        let e2 = s().prettyName;
        throw Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.empty = () => {
        let e2 = s().prettyName;
        throw Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.join = () => {
        let e2 = s().prettyName;
        throw Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.raw = () => {
        let e2 = s().prettyName;
        throw Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.validator = a.validator, l.getExtensionContext = () => {
        let e2 = s().prettyName;
        throw Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.defineExtension = () => {
        let e2 = s().prettyName;
        throw Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${e2}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
      }, l.DbNull = i.instances.DbNull, l.JsonNull = i.instances.JsonNull, l.AnyNull = i.instances.AnyNull, l.NullTypes = { DbNull: i.classes.DbNull, JsonNull: i.classes.JsonNull, AnyNull: i.classes.AnyNull }, t.Prisma.TransactionIsolationLevel = o({ ReadUncommitted: "ReadUncommitted", ReadCommitted: "ReadCommitted", RepeatableRead: "RepeatableRead", Serializable: "Serializable" }), t.Prisma.UserScalarFieldEnum = { id: "id", name: "name", email: "email", password: "password", emailVerified: "emailVerified", image: "image", role: "role", createdAt: "createdAt", updatedAt: "updatedAt" }, t.Prisma.ProductScalarFieldEnum = { id: "id", slug: "slug", name: "name", desc: "desc", size: "size", os: "os", rating: "rating", downloads: "downloads", tag: "tag", icon: "icon", license: "license", version: "version", category: "category", isPremium: "isPremium", price: "price", stock: "stock", downloadLink: "downloadLink", status: "status", authorName: "authorName", format: "format", createdAt: "createdAt", updatedAt: "updatedAt" }, t.Prisma.OrderScalarFieldEnum = { id: "id", userId: "userId", totalAmount: "totalAmount", status: "status", createdAt: "createdAt", updatedAt: "updatedAt" }, t.Prisma.OrderItemScalarFieldEnum = { id: "id", orderId: "orderId", productId: "productId", quantity: "quantity", price: "price" }, t.Prisma.SortOrder = { asc: "asc", desc: "desc" }, t.Prisma.QueryMode = { default: "default", insensitive: "insensitive" }, t.Prisma.NullsOrder = { first: "first", last: "last" }, t.Role = t.$Enums.Role = { USER: "USER", ADMIN: "ADMIN" }, t.OrderStatus = t.$Enums.OrderStatus = { PENDING: "PENDING", COMPLETED: "COMPLETED", CANCELLED: "CANCELLED", FAILED: "FAILED" }, t.Prisma.ModelName = { User: "User", Product: "Product", Order: "Order", OrderItem: "OrderItem" };
      class u {
        constructor() {
          return new Proxy(this, { get(e2, t2) {
            let r2 = s();
            throw Error((r2.isEdge ? `PrismaClient is not configured to run in ${r2.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
` : "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + r2.prettyName + "`).") + `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`);
          } });
        }
      }
      t.PrismaClient = u, Object.assign(t, l);
    }, 673: (e, t, r) => {
      e.exports = { ...r(671) };
    }, 57: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, o = (e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      }, a = {};
      o(a, { Decimal: () => e0, Public: () => s, getRuntime: () => _, makeStrictEnum: () => b, objectEnumValues: () => m }), e.exports = ((e2, o2, a2, s2) => {
        if (o2 && "object" == typeof o2 || "function" == typeof o2) for (let c2 of n(o2)) i.call(e2, c2) || c2 === a2 || t(e2, c2, { get: () => o2[c2], enumerable: !(s2 = r(o2, c2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), a);
      var s = {};
      function c(...e2) {
        return (e3) => e3;
      }
      o(s, { validator: () => c });
      var l = Symbol(), u = /* @__PURE__ */ new WeakMap(), d = class {
        constructor(e2) {
          e2 === l ? u.set(this, "Prisma.".concat(this._getName())) : u.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return u.get(this);
        }
      }, p = class extends d {
        _getNamespace() {
          return "NullTypes";
        }
      }, h = class extends p {
      };
      y(h, "DbNull");
      var f = class extends p {
      };
      y(f, "JsonNull");
      var g = class extends p {
      };
      y(g, "AnyNull");
      var m = { classes: { DbNull: h, JsonNull: f, AnyNull: g }, instances: { DbNull: new h(l), JsonNull: new f(l), AnyNull: new g(l) } };
      function y(e2, t2) {
        Object.defineProperty(e2, "name", { value: t2, configurable: true });
      }
      var w = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function b(e2) {
        return new Proxy(e2, { get(e3, t2) {
          if (t2 in e3) return e3[t2];
          if (!w.has(t2)) throw TypeError("Invalid enum value: ".concat(String(t2)));
        } });
      }
      var v = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function _() {
        let e2 = "object" == typeof Netlify ? "netlify" : "edge-light";
        return { id: e2, prettyName: v[e2] || e2, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e2) };
      }
      var S, x, k = "0123456789abcdef", E = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", A = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", P = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -9e15, maxE: 9e15, crypto: false }, T = true, C = "[DecimalError] ", R = C + "Invalid argument: ", O = C + "Precision limit exceeded", N = C + "crypto unavailable", I = "[object Decimal]", U = Math.floor, L = Math.pow, $ = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, M = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, D = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, j = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, H = E.length - 1, W = A.length - 1, B = { toStringTag: I };
      function q(e2) {
        var t2, r2, n2, i2 = e2.length - 1, o2 = "", a2 = e2[0];
        if (i2 > 0) {
          for (o2 += a2, t2 = 1; t2 < i2; t2++) (r2 = 7 - (n2 = e2[t2] + "").length) && (o2 += ee(r2)), o2 += n2;
          (r2 = 7 - (n2 = (a2 = e2[t2]) + "").length) && (o2 += ee(r2));
        } else if (0 === a2) return "0";
        for (; a2 % 10 == 0; ) a2 /= 10;
        return o2 + a2;
      }
      function K(e2, t2, r2) {
        if (e2 !== ~~e2 || e2 < t2 || e2 > r2) throw Error(R + e2);
      }
      function V(e2, t2, r2, n2) {
        var i2, o2, a2, s2;
        for (o2 = e2[0]; o2 >= 10; o2 /= 10) --t2;
        return --t2 < 0 ? (t2 += 7, i2 = 0) : (i2 = Math.ceil((t2 + 1) / 7), t2 %= 7), o2 = L(10, 7 - t2), s2 = e2[i2] % o2 | 0, null == n2 ? t2 < 3 ? (0 == t2 ? s2 = s2 / 100 | 0 : 1 == t2 && (s2 = s2 / 10 | 0), a2 = r2 < 4 && 99999 == s2 || r2 > 3 && 49999 == s2 || 5e4 == s2 || 0 == s2) : a2 = (r2 < 4 && s2 + 1 == o2 || r2 > 3 && s2 + 1 == o2 / 2) && (e2[i2 + 1] / o2 / 100 | 0) == L(10, t2 - 2) - 1 || (s2 == o2 / 2 || 0 == s2) && (e2[i2 + 1] / o2 / 100 | 0) == 0 : t2 < 4 ? (0 == t2 ? s2 = s2 / 1e3 | 0 : 1 == t2 ? s2 = s2 / 100 | 0 : 2 == t2 && (s2 = s2 / 10 | 0), a2 = (n2 || r2 < 4) && 9999 == s2 || !n2 && r2 > 3 && 4999 == s2) : a2 = ((n2 || r2 < 4) && s2 + 1 == o2 || !n2 && r2 > 3 && s2 + 1 == o2 / 2) && (e2[i2 + 1] / o2 / 1e3 | 0) == L(10, t2 - 3) - 1, a2;
      }
      function J(e2, t2, r2) {
        for (var n2, i2, o2 = [0], a2 = 0, s2 = e2.length; a2 < s2; ) {
          for (i2 = o2.length; i2--; ) o2[i2] *= t2;
          for (o2[0] += k.indexOf(e2.charAt(a2++)), n2 = 0; n2 < o2.length; n2++) o2[n2] > r2 - 1 && (void 0 === o2[n2 + 1] && (o2[n2 + 1] = 0), o2[n2 + 1] += o2[n2] / r2 | 0, o2[n2] %= r2);
        }
        return o2.reverse();
      }
      B.absoluteValue = B.abs = function() {
        var e2 = new this.constructor(this);
        return e2.s < 0 && (e2.s = 1), z(e2);
      }, B.ceil = function() {
        return z(new this.constructor(this), this.e + 1, 2);
      }, B.clampedTo = B.clamp = function(e2, t2) {
        var r2 = this.constructor;
        if (e2 = new r2(e2), t2 = new r2(t2), !e2.s || !t2.s) return new r2(NaN);
        if (e2.gt(t2)) throw Error(R + t2);
        return 0 > this.cmp(e2) ? e2 : this.cmp(t2) > 0 ? t2 : new r2(this);
      }, B.comparedTo = B.cmp = function(e2) {
        var t2, r2, n2, i2, o2 = this.d, a2 = (e2 = new this.constructor(e2)).d, s2 = this.s, c2 = e2.s;
        if (!o2 || !a2) return s2 && c2 ? s2 !== c2 ? s2 : o2 === a2 ? 0 : !o2 ^ s2 < 0 ? 1 : -1 : NaN;
        if (!o2[0] || !a2[0]) return o2[0] ? s2 : a2[0] ? -c2 : 0;
        if (s2 !== c2) return s2;
        if (this.e !== e2.e) return this.e > e2.e ^ s2 < 0 ? 1 : -1;
        for (n2 = o2.length, i2 = a2.length, t2 = 0, r2 = n2 < i2 ? n2 : i2; t2 < r2; ++t2) if (o2[t2] !== a2[t2]) return o2[t2] > a2[t2] ^ s2 < 0 ? 1 : -1;
        return n2 === i2 ? 0 : n2 > i2 ^ s2 < 0 ? 1 : -1;
      }, B.cosine = B.cos = function() {
        var e2, t2, r2 = this, n2 = r2.constructor;
        return r2.d ? r2.d[0] ? (e2 = n2.precision, t2 = n2.rounding, n2.precision = e2 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(e3, t3) {
          var r3, n3, i2;
          if (t3.isZero()) return t3;
          (n3 = t3.d.length) < 32 ? i2 = (1 / el(4, r3 = Math.ceil(n3 / 3))).toString() : (r3 = 16, i2 = "2.3283064365386962890625e-10"), e3.precision += r3, t3 = ec(e3, 1, t3.times(i2), new e3(1));
          for (var o2 = r3; o2--; ) {
            var a2 = t3.times(t3);
            t3 = a2.times(a2).minus(a2).times(8).plus(1);
          }
          return e3.precision -= r3, t3;
        }(n2, eu(n2, r2)), n2.precision = e2, n2.rounding = t2, z(2 == x || 3 == x ? r2.neg() : r2, e2, t2, true)) : new n2(1) : new n2(NaN);
      }, B.cubeRoot = B.cbrt = function() {
        var e2, t2, r2, n2, i2, o2, a2, s2, c2, l2, u2 = this.constructor;
        if (!this.isFinite() || this.isZero()) return new u2(this);
        for (T = false, (o2 = this.s * L(this.s * this, 1 / 3)) && Math.abs(o2) != 1 / 0 ? n2 = new u2(o2.toString()) : (r2 = q(this.d), (o2 = ((e2 = this.e) - r2.length + 1) % 3) && (r2 += 1 == o2 || -2 == o2 ? "0" : "00"), o2 = L(r2, 1 / 3), e2 = U((e2 + 1) / 3) - (e2 % 3 == (e2 < 0 ? -1 : 2)), (n2 = new u2(r2 = o2 == 1 / 0 ? "5e" + e2 : (r2 = o2.toExponential()).slice(0, r2.indexOf("e") + 1) + e2)).s = this.s), a2 = (e2 = u2.precision) + 3; ; ) if (n2 = F((l2 = (c2 = (s2 = n2).times(s2).times(s2)).plus(this)).plus(this).times(s2), l2.plus(c2), a2 + 2, 1), q(s2.d).slice(0, a2) === (r2 = q(n2.d)).slice(0, a2)) {
          if ("9999" != (r2 = r2.slice(a2 - 3, a2 + 1)) && (i2 || "4999" != r2)) {
            +r2 && (+r2.slice(1) || "5" != r2.charAt(0)) || (z(n2, e2 + 1, 1), t2 = !n2.times(n2).times(n2).eq(this));
            break;
          }
          if (!i2 && (z(s2, e2 + 1, 0), s2.times(s2).times(s2).eq(this))) {
            n2 = s2;
            break;
          }
          a2 += 4, i2 = 1;
        }
        return T = true, z(n2, e2, u2.rounding, t2);
      }, B.decimalPlaces = B.dp = function() {
        var e2, t2 = this.d, r2 = NaN;
        if (t2) {
          if (r2 = ((e2 = t2.length - 1) - U(this.e / 7)) * 7, e2 = t2[e2]) for (; e2 % 10 == 0; e2 /= 10) r2--;
          r2 < 0 && (r2 = 0);
        }
        return r2;
      }, B.dividedBy = B.div = function(e2) {
        return F(this, new this.constructor(e2));
      }, B.dividedToIntegerBy = B.divToInt = function(e2) {
        var t2 = this.constructor;
        return z(F(this, new t2(e2), 0, 1, 1), t2.precision, t2.rounding);
      }, B.equals = B.eq = function(e2) {
        return 0 === this.cmp(e2);
      }, B.floor = function() {
        return z(new this.constructor(this), this.e + 1, 3);
      }, B.greaterThan = B.gt = function(e2) {
        return this.cmp(e2) > 0;
      }, B.greaterThanOrEqualTo = B.gte = function(e2) {
        var t2 = this.cmp(e2);
        return 1 == t2 || 0 === t2;
      }, B.hyperbolicCosine = B.cosh = function() {
        var e2, t2, r2, n2, i2, o2 = this, a2 = o2.constructor, s2 = new a2(1);
        if (!o2.isFinite()) return new a2(o2.s ? 1 / 0 : NaN);
        if (o2.isZero()) return s2;
        r2 = a2.precision, n2 = a2.rounding, a2.precision = r2 + Math.max(o2.e, o2.sd()) + 4, a2.rounding = 1, (i2 = o2.d.length) < 32 ? t2 = (1 / el(4, e2 = Math.ceil(i2 / 3))).toString() : (e2 = 16, t2 = "2.3283064365386962890625e-10"), o2 = ec(a2, 1, o2.times(t2), new a2(1), true);
        for (var c2, l2 = e2, u2 = new a2(8); l2--; ) c2 = o2.times(o2), o2 = s2.minus(c2.times(u2.minus(c2.times(u2))));
        return z(o2, a2.precision = r2, a2.rounding = n2, true);
      }, B.hyperbolicSine = B.sinh = function() {
        var e2, t2, r2, n2, i2 = this, o2 = i2.constructor;
        if (!i2.isFinite() || i2.isZero()) return new o2(i2);
        if (t2 = o2.precision, r2 = o2.rounding, o2.precision = t2 + Math.max(i2.e, i2.sd()) + 4, o2.rounding = 1, (n2 = i2.d.length) < 3) i2 = ec(o2, 2, i2, i2, true);
        else {
          e2 = (e2 = 1.4 * Math.sqrt(n2)) > 16 ? 16 : 0 | e2, i2 = ec(o2, 2, i2 = i2.times(1 / el(5, e2)), i2, true);
          for (var a2, s2 = new o2(5), c2 = new o2(16), l2 = new o2(20); e2--; ) a2 = i2.times(i2), i2 = i2.times(s2.plus(a2.times(c2.times(a2).plus(l2))));
        }
        return o2.precision = t2, o2.rounding = r2, z(i2, t2, r2, true);
      }, B.hyperbolicTangent = B.tanh = function() {
        var e2, t2, r2 = this.constructor;
        return this.isFinite() ? this.isZero() ? new r2(this) : (e2 = r2.precision, t2 = r2.rounding, r2.precision = e2 + 7, r2.rounding = 1, F(this.sinh(), this.cosh(), r2.precision = e2, r2.rounding = t2)) : new r2(this.s);
      }, B.inverseCosine = B.acos = function() {
        var e2, t2 = this, r2 = t2.constructor, n2 = t2.abs().cmp(1), i2 = r2.precision, o2 = r2.rounding;
        return -1 !== n2 ? 0 === n2 ? t2.isNeg() ? Y(r2, i2, o2) : new r2(0) : new r2(NaN) : t2.isZero() ? Y(r2, i2 + 4, o2).times(0.5) : (r2.precision = i2 + 6, r2.rounding = 1, t2 = t2.asin(), e2 = Y(r2, i2 + 4, o2).times(0.5), r2.precision = i2, r2.rounding = o2, e2.minus(t2));
      }, B.inverseHyperbolicCosine = B.acosh = function() {
        var e2, t2, r2 = this, n2 = r2.constructor;
        return r2.lte(1) ? new n2(r2.eq(1) ? 0 : NaN) : r2.isFinite() ? (e2 = n2.precision, t2 = n2.rounding, n2.precision = e2 + Math.max(Math.abs(r2.e), r2.sd()) + 4, n2.rounding = 1, T = false, r2 = r2.times(r2).minus(1).sqrt().plus(r2), T = true, n2.precision = e2, n2.rounding = t2, r2.ln()) : new n2(r2);
      }, B.inverseHyperbolicSine = B.asinh = function() {
        var e2, t2, r2 = this, n2 = r2.constructor;
        return !r2.isFinite() || r2.isZero() ? new n2(r2) : (e2 = n2.precision, t2 = n2.rounding, n2.precision = e2 + 2 * Math.max(Math.abs(r2.e), r2.sd()) + 6, n2.rounding = 1, T = false, r2 = r2.times(r2).plus(1).sqrt().plus(r2), T = true, n2.precision = e2, n2.rounding = t2, r2.ln());
      }, B.inverseHyperbolicTangent = B.atanh = function() {
        var e2, t2, r2, n2, i2 = this, o2 = i2.constructor;
        return i2.isFinite() ? i2.e >= 0 ? new o2(i2.abs().eq(1) ? i2.s / 0 : i2.isZero() ? i2 : NaN) : (e2 = o2.precision, t2 = o2.rounding, Math.max(n2 = i2.sd(), e2) < -(2 * i2.e) - 1 ? z(new o2(i2), e2, t2, true) : (o2.precision = r2 = n2 - i2.e, i2 = F(i2.plus(1), new o2(1).minus(i2), r2 + e2, 1), o2.precision = e2 + 4, o2.rounding = 1, i2 = i2.ln(), o2.precision = e2, o2.rounding = t2, i2.times(0.5))) : new o2(NaN);
      }, B.inverseSine = B.asin = function() {
        var e2, t2, r2, n2, i2 = this, o2 = i2.constructor;
        return i2.isZero() ? new o2(i2) : (t2 = i2.abs().cmp(1), r2 = o2.precision, n2 = o2.rounding, -1 !== t2 ? 0 === t2 ? ((e2 = Y(o2, r2 + 4, n2).times(0.5)).s = i2.s, e2) : new o2(NaN) : (o2.precision = r2 + 6, o2.rounding = 1, i2 = i2.div(new o2(1).minus(i2.times(i2)).sqrt().plus(1)).atan(), o2.precision = r2, o2.rounding = n2, i2.times(2)));
      }, B.inverseTangent = B.atan = function() {
        var e2, t2, r2, n2, i2, o2, a2, s2, c2, l2 = this, u2 = l2.constructor, d2 = u2.precision, p2 = u2.rounding;
        if (l2.isFinite()) {
          if (l2.isZero()) return new u2(l2);
          if (l2.abs().eq(1) && d2 + 4 <= W) return (a2 = Y(u2, d2 + 4, p2).times(0.25)).s = l2.s, a2;
        } else {
          if (!l2.s) return new u2(NaN);
          if (d2 + 4 <= W) return (a2 = Y(u2, d2 + 4, p2).times(0.5)).s = l2.s, a2;
        }
        for (u2.precision = s2 = d2 + 10, u2.rounding = 1, e2 = r2 = Math.min(28, s2 / 7 + 2 | 0); e2; --e2) l2 = l2.div(l2.times(l2).plus(1).sqrt().plus(1));
        for (T = false, t2 = Math.ceil(s2 / 7), n2 = 1, c2 = l2.times(l2), a2 = new u2(l2), i2 = l2; -1 !== e2; ) if (i2 = i2.times(c2), o2 = a2.minus(i2.div(n2 += 2)), i2 = i2.times(c2), void 0 !== (a2 = o2.plus(i2.div(n2 += 2))).d[t2]) for (e2 = t2; a2.d[e2] === o2.d[e2] && e2--; ) ;
        return r2 && (a2 = a2.times(2 << r2 - 1)), T = true, z(a2, u2.precision = d2, u2.rounding = p2, true);
      }, B.isFinite = function() {
        return !!this.d;
      }, B.isInteger = B.isInt = function() {
        return !!this.d && U(this.e / 7) > this.d.length - 2;
      }, B.isNaN = function() {
        return !this.s;
      }, B.isNegative = B.isNeg = function() {
        return this.s < 0;
      }, B.isPositive = B.isPos = function() {
        return this.s > 0;
      }, B.isZero = function() {
        return !!this.d && 0 === this.d[0];
      }, B.lessThan = B.lt = function(e2) {
        return 0 > this.cmp(e2);
      }, B.lessThanOrEqualTo = B.lte = function(e2) {
        return 1 > this.cmp(e2);
      }, B.logarithm = B.log = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2, c2 = this.constructor, l2 = c2.precision, u2 = c2.rounding;
        if (null == e2) e2 = new c2(10), t2 = true;
        else {
          if (r2 = (e2 = new c2(e2)).d, e2.s < 0 || !r2 || !r2[0] || e2.eq(1)) return new c2(NaN);
          t2 = e2.eq(10);
        }
        if (r2 = this.d, this.s < 0 || !r2 || !r2[0] || this.eq(1)) return new c2(r2 && !r2[0] ? -1 / 0 : 1 != this.s ? NaN : r2 ? 0 : 1 / 0);
        if (t2) {
          if (r2.length > 1) i2 = true;
          else {
            for (n2 = r2[0]; n2 % 10 == 0; ) n2 /= 10;
            i2 = 1 !== n2;
          }
        }
        if (T = false, V((s2 = F(eo(this, a2 = l2 + 5), t2 ? Z(c2, a2 + 10) : eo(e2, a2), a2, 1)).d, n2 = l2, u2)) do
          if (a2 += 10, s2 = F(eo(this, a2), t2 ? Z(c2, a2 + 10) : eo(e2, a2), a2, 1), !i2) {
            +q(s2.d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (s2 = z(s2, l2 + 1, 0));
            break;
          }
        while (V(s2.d, n2 += 10, u2));
        return T = true, z(s2, l2, u2);
      }, B.minus = B.sub = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2, c2, l2, u2, d2, p2, h2 = this.constructor;
        if (e2 = new h2(e2), !this.d || !e2.d) return this.s && e2.s ? this.d ? e2.s = -e2.s : e2 = new h2(e2.d || this.s !== e2.s ? this : NaN) : e2 = new h2(NaN), e2;
        if (this.s != e2.s) return e2.s = -e2.s, this.plus(e2);
        if (l2 = this.d, p2 = e2.d, s2 = h2.precision, c2 = h2.rounding, !l2[0] || !p2[0]) {
          if (p2[0]) e2.s = -e2.s;
          else {
            if (!l2[0]) return new h2(3 === c2 ? -0 : 0);
            e2 = new h2(this);
          }
          return T ? z(e2, s2, c2) : e2;
        }
        if (r2 = U(e2.e / 7), u2 = U(this.e / 7), l2 = l2.slice(), o2 = u2 - r2) {
          for ((d2 = o2 < 0) ? (t2 = l2, o2 = -o2, a2 = p2.length) : (t2 = p2, r2 = u2, a2 = l2.length), o2 > (n2 = Math.max(Math.ceil(s2 / 7), a2) + 2) && (o2 = n2, t2.length = 1), t2.reverse(), n2 = o2; n2--; ) t2.push(0);
          t2.reverse();
        } else {
          for ((d2 = (n2 = l2.length) < (a2 = p2.length)) && (a2 = n2), n2 = 0; n2 < a2; n2++) if (l2[n2] != p2[n2]) {
            d2 = l2[n2] < p2[n2];
            break;
          }
          o2 = 0;
        }
        for (d2 && (t2 = l2, l2 = p2, p2 = t2, e2.s = -e2.s), a2 = l2.length, n2 = p2.length - a2; n2 > 0; --n2) l2[a2++] = 0;
        for (n2 = p2.length; n2 > o2; ) {
          if (l2[--n2] < p2[n2]) {
            for (i2 = n2; i2 && 0 === l2[--i2]; ) l2[i2] = 1e7 - 1;
            --l2[i2], l2[n2] += 1e7;
          }
          l2[n2] -= p2[n2];
        }
        for (; 0 === l2[--a2]; ) l2.pop();
        for (; 0 === l2[0]; l2.shift()) --r2;
        return l2[0] ? (e2.d = l2, e2.e = X(l2, r2), T ? z(e2, s2, c2) : e2) : new h2(3 === c2 ? -0 : 0);
      }, B.modulo = B.mod = function(e2) {
        var t2, r2 = this.constructor;
        return e2 = new r2(e2), this.d && e2.s && (!e2.d || e2.d[0]) ? e2.d && (!this.d || this.d[0]) ? (T = false, 9 == r2.modulo ? (t2 = F(this, e2.abs(), 0, 3, 1), t2.s *= e2.s) : t2 = F(this, e2, 0, r2.modulo, 1), t2 = t2.times(e2), T = true, this.minus(t2)) : z(new r2(this), r2.precision, r2.rounding) : new r2(NaN);
      }, B.naturalExponential = B.exp = function() {
        return ei(this);
      }, B.naturalLogarithm = B.ln = function() {
        return eo(this);
      }, B.negated = B.neg = function() {
        var e2 = new this.constructor(this);
        return e2.s = -e2.s, z(e2);
      }, B.plus = B.add = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2, c2, l2, u2, d2 = this.constructor;
        if (e2 = new d2(e2), !this.d || !e2.d) return this.s && e2.s ? this.d || (e2 = new d2(e2.d || this.s === e2.s ? this : NaN)) : e2 = new d2(NaN), e2;
        if (this.s != e2.s) return e2.s = -e2.s, this.minus(e2);
        if (l2 = this.d, u2 = e2.d, s2 = d2.precision, c2 = d2.rounding, !l2[0] || !u2[0]) return u2[0] || (e2 = new d2(this)), T ? z(e2, s2, c2) : e2;
        if (o2 = U(this.e / 7), n2 = U(e2.e / 7), l2 = l2.slice(), i2 = o2 - n2) {
          for (i2 < 0 ? (r2 = l2, i2 = -i2, a2 = u2.length) : (r2 = u2, n2 = o2, a2 = l2.length), i2 > (a2 = (o2 = Math.ceil(s2 / 7)) > a2 ? o2 + 1 : a2 + 1) && (i2 = a2, r2.length = 1), r2.reverse(); i2--; ) r2.push(0);
          r2.reverse();
        }
        for ((a2 = l2.length) - (i2 = u2.length) < 0 && (i2 = a2, r2 = u2, u2 = l2, l2 = r2), t2 = 0; i2; ) t2 = (l2[--i2] = l2[i2] + u2[i2] + t2) / 1e7 | 0, l2[i2] %= 1e7;
        for (t2 && (l2.unshift(t2), ++n2), a2 = l2.length; 0 == l2[--a2]; ) l2.pop();
        return e2.d = l2, e2.e = X(l2, n2), T ? z(e2, s2, c2) : e2;
      }, B.precision = B.sd = function(e2) {
        var t2;
        if (void 0 !== e2 && !!e2 !== e2 && 1 !== e2 && 0 !== e2) throw Error(R + e2);
        return this.d ? (t2 = Q(this.d), e2 && this.e + 1 > t2 && (t2 = this.e + 1)) : t2 = NaN, t2;
      }, B.round = function() {
        var e2 = this.constructor;
        return z(new e2(this), this.e + 1, e2.rounding);
      }, B.sine = B.sin = function() {
        var e2, t2, r2 = this, n2 = r2.constructor;
        return r2.isFinite() ? r2.isZero() ? new n2(r2) : (e2 = n2.precision, t2 = n2.rounding, n2.precision = e2 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(e3, t3) {
          var r3, n3 = t3.d.length;
          if (n3 < 3) return t3.isZero() ? t3 : ec(e3, 2, t3, t3);
          r3 = (r3 = 1.4 * Math.sqrt(n3)) > 16 ? 16 : 0 | r3, t3 = ec(e3, 2, t3 = t3.times(1 / el(5, r3)), t3);
          for (var i2, o2 = new e3(5), a2 = new e3(16), s2 = new e3(20); r3--; ) i2 = t3.times(t3), t3 = t3.times(o2.plus(i2.times(a2.times(i2).minus(s2))));
          return t3;
        }(n2, eu(n2, r2)), n2.precision = e2, n2.rounding = t2, z(x > 2 ? r2.neg() : r2, e2, t2, true)) : new n2(NaN);
      }, B.squareRoot = B.sqrt = function() {
        var e2, t2, r2, n2, i2, o2, a2 = this.d, s2 = this.e, c2 = this.s, l2 = this.constructor;
        if (1 !== c2 || !a2 || !a2[0]) return new l2(!c2 || c2 < 0 && (!a2 || a2[0]) ? NaN : a2 ? this : 1 / 0);
        for (T = false, 0 == (c2 = Math.sqrt(+this)) || c2 == 1 / 0 ? (((t2 = q(a2)).length + s2) % 2 == 0 && (t2 += "0"), c2 = Math.sqrt(t2), s2 = U((s2 + 1) / 2) - (s2 < 0 || s2 % 2), n2 = new l2(t2 = c2 == 1 / 0 ? "5e" + s2 : (t2 = c2.toExponential()).slice(0, t2.indexOf("e") + 1) + s2)) : n2 = new l2(c2.toString()), r2 = (s2 = l2.precision) + 3; ; ) if (n2 = (o2 = n2).plus(F(this, o2, r2 + 2, 1)).times(0.5), q(o2.d).slice(0, r2) === (t2 = q(n2.d)).slice(0, r2)) {
          if ("9999" != (t2 = t2.slice(r2 - 3, r2 + 1)) && (i2 || "4999" != t2)) {
            +t2 && (+t2.slice(1) || "5" != t2.charAt(0)) || (z(n2, s2 + 1, 1), e2 = !n2.times(n2).eq(this));
            break;
          }
          if (!i2 && (z(o2, s2 + 1, 0), o2.times(o2).eq(this))) {
            n2 = o2;
            break;
          }
          r2 += 4, i2 = 1;
        }
        return T = true, z(n2, s2, l2.rounding, e2);
      }, B.tangent = B.tan = function() {
        var e2, t2, r2 = this, n2 = r2.constructor;
        return r2.isFinite() ? r2.isZero() ? new n2(r2) : (e2 = n2.precision, t2 = n2.rounding, n2.precision = e2 + 10, n2.rounding = 1, (r2 = r2.sin()).s = 1, r2 = F(r2, new n2(1).minus(r2.times(r2)).sqrt(), e2 + 10, 0), n2.precision = e2, n2.rounding = t2, z(2 == x || 4 == x ? r2.neg() : r2, e2, t2, true)) : new n2(NaN);
      }, B.times = B.mul = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2, c2, l2, u2 = this.constructor, d2 = this.d, p2 = (e2 = new u2(e2)).d;
        if (e2.s *= this.s, !d2 || !d2[0] || !p2 || !p2[0]) return new u2(e2.s && (!d2 || d2[0] || p2) && (!p2 || p2[0] || d2) ? d2 && p2 ? 0 * e2.s : e2.s / 0 : NaN);
        for (r2 = U(this.e / 7) + U(e2.e / 7), (c2 = d2.length) < (l2 = p2.length) && (o2 = d2, d2 = p2, p2 = o2, a2 = c2, c2 = l2, l2 = a2), o2 = [], n2 = a2 = c2 + l2; n2--; ) o2.push(0);
        for (n2 = l2; --n2 >= 0; ) {
          for (t2 = 0, i2 = c2 + n2; i2 > n2; ) s2 = o2[i2] + p2[n2] * d2[i2 - n2 - 1] + t2, o2[i2--] = s2 % 1e7 | 0, t2 = s2 / 1e7 | 0;
          o2[i2] = (o2[i2] + t2) % 1e7 | 0;
        }
        for (; !o2[--a2]; ) o2.pop();
        return t2 ? ++r2 : o2.shift(), e2.d = o2, e2.e = X(o2, r2), T ? z(e2, u2.precision, u2.rounding) : e2;
      }, B.toBinary = function(e2, t2) {
        return ed(this, 2, e2, t2);
      }, B.toDecimalPlaces = B.toDP = function(e2, t2) {
        var r2 = this, n2 = r2.constructor;
        return r2 = new n2(r2), void 0 === e2 ? r2 : (K(e2, 0, 1e9), void 0 === t2 ? t2 = n2.rounding : K(t2, 0, 8), z(r2, e2 + r2.e + 1, t2));
      }, B.toExponential = function(e2, t2) {
        var r2, n2 = this, i2 = n2.constructor;
        return void 0 === e2 ? r2 = G(n2, true) : (K(e2, 0, 1e9), void 0 === t2 ? t2 = i2.rounding : K(t2, 0, 8), r2 = G(n2 = z(new i2(n2), e2 + 1, t2), true, e2 + 1)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
      }, B.toFixed = function(e2, t2) {
        var r2, n2, i2 = this.constructor;
        return void 0 === e2 ? r2 = G(this) : (K(e2, 0, 1e9), void 0 === t2 ? t2 = i2.rounding : K(t2, 0, 8), r2 = G(n2 = z(new i2(this), e2 + this.e + 1, t2), false, e2 + n2.e + 1)), this.isNeg() && !this.isZero() ? "-" + r2 : r2;
      }, B.toFraction = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2, c2, l2, u2, d2, p2, h2 = this.d, f2 = this.constructor;
        if (!h2) return new f2(this);
        if (l2 = r2 = new f2(1), n2 = c2 = new f2(0), a2 = (o2 = (t2 = new f2(n2)).e = Q(h2) - this.e - 1) % 7, t2.d[0] = L(10, a2 < 0 ? 7 + a2 : a2), null == e2) e2 = o2 > 0 ? t2 : l2;
        else {
          if (!(s2 = new f2(e2)).isInt() || s2.lt(l2)) throw Error(R + s2);
          e2 = s2.gt(t2) ? o2 > 0 ? t2 : l2 : s2;
        }
        for (T = false, s2 = new f2(q(h2)), u2 = f2.precision, f2.precision = o2 = 14 * h2.length; d2 = F(s2, t2, 0, 1, 1), 1 != (i2 = r2.plus(d2.times(n2))).cmp(e2); ) r2 = n2, n2 = i2, i2 = l2, l2 = c2.plus(d2.times(i2)), c2 = i2, i2 = t2, t2 = s2.minus(d2.times(i2)), s2 = i2;
        return i2 = F(e2.minus(r2), n2, 0, 1, 1), c2 = c2.plus(i2.times(l2)), r2 = r2.plus(i2.times(n2)), c2.s = l2.s = this.s, p2 = 1 > F(l2, n2, o2, 1).minus(this).abs().cmp(F(c2, r2, o2, 1).minus(this).abs()) ? [l2, n2] : [c2, r2], f2.precision = u2, T = true, p2;
      }, B.toHexadecimal = B.toHex = function(e2, t2) {
        return ed(this, 16, e2, t2);
      }, B.toNearest = function(e2, t2) {
        var r2 = this, n2 = r2.constructor;
        if (r2 = new n2(r2), null == e2) {
          if (!r2.d) return r2;
          e2 = new n2(1), t2 = n2.rounding;
        } else {
          if (e2 = new n2(e2), void 0 === t2 ? t2 = n2.rounding : K(t2, 0, 8), !r2.d) return e2.s ? r2 : e2;
          if (!e2.d) return e2.s && (e2.s = r2.s), e2;
        }
        return e2.d[0] ? (T = false, r2 = F(r2, e2, 0, t2, 1).times(e2), T = true, z(r2)) : (e2.s = r2.s, r2 = e2), r2;
      }, B.toNumber = function() {
        return +this;
      }, B.toOctal = function(e2, t2) {
        return ed(this, 8, e2, t2);
      }, B.toPower = B.pow = function(e2) {
        var t2, r2, n2, i2, o2, a2, s2 = this, c2 = s2.constructor, l2 = +(e2 = new c2(e2));
        if (!s2.d || !e2.d || !s2.d[0] || !e2.d[0]) return new c2(L(+s2, l2));
        if ((s2 = new c2(s2)).eq(1)) return s2;
        if (n2 = c2.precision, o2 = c2.rounding, e2.eq(1)) return z(s2, n2, o2);
        if ((t2 = U(e2.e / 7)) >= e2.d.length - 1 && (r2 = l2 < 0 ? -l2 : l2) <= 9007199254740991) return i2 = et(c2, s2, r2, n2), e2.s < 0 ? new c2(1).div(i2) : z(i2, n2, o2);
        if ((a2 = s2.s) < 0) {
          if (t2 < e2.d.length - 1) return new c2(NaN);
          if (1 & e2.d[t2] || (a2 = 1), 0 == s2.e && 1 == s2.d[0] && 1 == s2.d.length) return s2.s = a2, s2;
        }
        return (t2 = 0 != (r2 = L(+s2, l2)) && isFinite(r2) ? new c2(r2 + "").e : U(l2 * (Math.log("0." + q(s2.d)) / Math.LN10 + s2.e + 1))) > c2.maxE + 1 || t2 < c2.minE - 1 ? new c2(t2 > 0 ? a2 / 0 : 0) : (T = false, c2.rounding = s2.s = 1, r2 = Math.min(12, (t2 + "").length), (i2 = ei(e2.times(eo(s2, n2 + r2)), n2)).d && V((i2 = z(i2, n2 + 5, 1)).d, n2, o2) && (t2 = n2 + 10, +q((i2 = z(ei(e2.times(eo(s2, t2 + r2)), t2), t2 + 5, 1)).d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (i2 = z(i2, n2 + 1, 0))), i2.s = a2, T = true, c2.rounding = o2, z(i2, n2, o2));
      }, B.toPrecision = function(e2, t2) {
        var r2, n2 = this, i2 = n2.constructor;
        return void 0 === e2 ? r2 = G(n2, n2.e <= i2.toExpNeg || n2.e >= i2.toExpPos) : (K(e2, 1, 1e9), void 0 === t2 ? t2 = i2.rounding : K(t2, 0, 8), r2 = G(n2 = z(new i2(n2), e2, t2), e2 <= n2.e || n2.e <= i2.toExpNeg, e2)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
      }, B.toSignificantDigits = B.toSD = function(e2, t2) {
        var r2 = this.constructor;
        return void 0 === e2 ? (e2 = r2.precision, t2 = r2.rounding) : (K(e2, 1, 1e9), void 0 === t2 ? t2 = r2.rounding : K(t2, 0, 8)), z(new r2(this), e2, t2);
      }, B.toString = function() {
        var e2 = this.constructor, t2 = G(this, this.e <= e2.toExpNeg || this.e >= e2.toExpPos);
        return this.isNeg() && !this.isZero() ? "-" + t2 : t2;
      }, B.truncated = B.trunc = function() {
        return z(new this.constructor(this), this.e + 1, 1);
      }, B.valueOf = B.toJSON = function() {
        var e2 = this.constructor, t2 = G(this, this.e <= e2.toExpNeg || this.e >= e2.toExpPos);
        return this.isNeg() ? "-" + t2 : t2;
      };
      var F = /* @__PURE__ */ function() {
        function e2(e3, t3, r3) {
          var n2, i2 = 0, o2 = e3.length;
          for (e3 = e3.slice(); o2--; ) n2 = e3[o2] * t3 + i2, e3[o2] = n2 % r3 | 0, i2 = n2 / r3 | 0;
          return i2 && e3.unshift(i2), e3;
        }
        function t2(e3, t3, r3, n2) {
          var i2, o2;
          if (r3 != n2) o2 = r3 > n2 ? 1 : -1;
          else for (i2 = o2 = 0; i2 < r3; i2++) if (e3[i2] != t3[i2]) {
            o2 = e3[i2] > t3[i2] ? 1 : -1;
            break;
          }
          return o2;
        }
        function r2(e3, t3, r3, n2) {
          for (var i2 = 0; r3--; ) e3[r3] -= i2, i2 = e3[r3] < t3[r3] ? 1 : 0, e3[r3] = i2 * n2 + e3[r3] - t3[r3];
          for (; !e3[0] && e3.length > 1; ) e3.shift();
        }
        return function(n2, i2, o2, a2, s2, c2) {
          var l2, u2, d2, p2, h2, f2, g2, m2, y2, w2, b2, v2, _2, x2, k2, E2, A2, P2, T2, C2, R2 = n2.constructor, O2 = n2.s == i2.s ? 1 : -1, N2 = n2.d, I2 = i2.d;
          if (!N2 || !N2[0] || !I2 || !I2[0]) return new R2(n2.s && i2.s && (N2 ? !I2 || N2[0] != I2[0] : I2) ? N2 && 0 == N2[0] || !I2 ? 0 * O2 : O2 / 0 : NaN);
          for (c2 ? (h2 = 1, u2 = n2.e - i2.e) : (c2 = 1e7, h2 = 7, u2 = U(n2.e / h2) - U(i2.e / h2)), T2 = I2.length, A2 = N2.length, w2 = (y2 = new R2(O2)).d = [], d2 = 0; I2[d2] == (N2[d2] || 0); d2++) ;
          if (I2[d2] > (N2[d2] || 0) && u2--, null == o2 ? (x2 = o2 = R2.precision, a2 = R2.rounding) : x2 = s2 ? o2 + (n2.e - i2.e) + 1 : o2, x2 < 0) w2.push(1), f2 = true;
          else {
            if (x2 = x2 / h2 + 2 | 0, d2 = 0, 1 == T2) {
              for (p2 = 0, I2 = I2[0], x2++; (d2 < A2 || p2) && x2--; d2++) k2 = p2 * c2 + (N2[d2] || 0), w2[d2] = k2 / I2 | 0, p2 = k2 % I2 | 0;
              f2 = p2 || d2 < A2;
            } else {
              for ((p2 = c2 / (I2[0] + 1) | 0) > 1 && (I2 = e2(I2, p2, c2), N2 = e2(N2, p2, c2), T2 = I2.length, A2 = N2.length), E2 = T2, v2 = (b2 = N2.slice(0, T2)).length; v2 < T2; ) b2[v2++] = 0;
              (C2 = I2.slice()).unshift(0), P2 = I2[0], I2[1] >= c2 / 2 && ++P2;
              do
                p2 = 0, (l2 = t2(I2, b2, T2, v2)) < 0 ? (_2 = b2[0], T2 != v2 && (_2 = _2 * c2 + (b2[1] || 0)), (p2 = _2 / P2 | 0) > 1 ? (p2 >= c2 && (p2 = c2 - 1), m2 = (g2 = e2(I2, p2, c2)).length, v2 = b2.length, 1 == (l2 = t2(g2, b2, m2, v2)) && (p2--, r2(g2, T2 < m2 ? C2 : I2, m2, c2))) : (0 == p2 && (l2 = p2 = 1), g2 = I2.slice()), (m2 = g2.length) < v2 && g2.unshift(0), r2(b2, g2, v2, c2), -1 == l2 && (v2 = b2.length, (l2 = t2(I2, b2, T2, v2)) < 1 && (p2++, r2(b2, T2 < v2 ? C2 : I2, v2, c2))), v2 = b2.length) : 0 === l2 && (p2++, b2 = [0]), w2[d2++] = p2, l2 && b2[0] ? b2[v2++] = N2[E2] || 0 : (b2 = [N2[E2]], v2 = 1);
              while ((E2++ < A2 || void 0 !== b2[0]) && x2--);
              f2 = void 0 !== b2[0];
            }
            w2[0] || w2.shift();
          }
          if (1 == h2) y2.e = u2, S = f2;
          else {
            for (d2 = 1, p2 = w2[0]; p2 >= 10; p2 /= 10) d2++;
            y2.e = d2 + u2 * h2 - 1, z(y2, s2 ? o2 + y2.e + 1 : o2, a2, f2);
          }
          return y2;
        };
      }();
      function z(e2, t2, r2, n2) {
        var i2, o2, a2, s2, c2, l2, u2, d2, p2, h2 = e2.constructor;
        t: if (null != t2) {
          if (!(d2 = e2.d)) return e2;
          for (i2 = 1, s2 = d2[0]; s2 >= 10; s2 /= 10) i2++;
          if ((o2 = t2 - i2) < 0) o2 += 7, a2 = t2, c2 = (u2 = d2[p2 = 0]) / L(10, i2 - a2 - 1) % 10 | 0;
          else if ((p2 = Math.ceil((o2 + 1) / 7)) >= (s2 = d2.length)) {
            if (n2) {
              for (; s2++ <= p2; ) d2.push(0);
              u2 = c2 = 0, i2 = 1, o2 %= 7, a2 = o2 - 7 + 1;
            } else break t;
          } else {
            for (u2 = s2 = d2[p2], i2 = 1; s2 >= 10; s2 /= 10) i2++;
            o2 %= 7, c2 = (a2 = o2 - 7 + i2) < 0 ? 0 : u2 / L(10, i2 - a2 - 1) % 10 | 0;
          }
          if (n2 = n2 || t2 < 0 || void 0 !== d2[p2 + 1] || (a2 < 0 ? u2 : u2 % L(10, i2 - a2 - 1)), l2 = r2 < 4 ? (c2 || n2) && (0 == r2 || r2 == (e2.s < 0 ? 3 : 2)) : c2 > 5 || 5 == c2 && (4 == r2 || n2 || 6 == r2 && (o2 > 0 ? a2 > 0 ? u2 / L(10, i2 - a2) : 0 : d2[p2 - 1]) % 10 & 1 || r2 == (e2.s < 0 ? 8 : 7)), t2 < 1 || !d2[0]) return d2.length = 0, l2 ? (t2 -= e2.e + 1, d2[0] = L(10, (7 - t2 % 7) % 7), e2.e = -t2 || 0) : d2[0] = e2.e = 0, e2;
          if (0 == o2 ? (d2.length = p2, s2 = 1, p2--) : (d2.length = p2 + 1, s2 = L(10, 7 - o2), d2[p2] = a2 > 0 ? (u2 / L(10, i2 - a2) % L(10, a2) | 0) * s2 : 0), l2) for (; ; ) if (0 == p2) {
            for (o2 = 1, a2 = d2[0]; a2 >= 10; a2 /= 10) o2++;
            for (a2 = d2[0] += s2, s2 = 1; a2 >= 10; a2 /= 10) s2++;
            o2 != s2 && (e2.e++, 1e7 == d2[0] && (d2[0] = 1));
            break;
          } else {
            if (d2[p2] += s2, 1e7 != d2[p2]) break;
            d2[p2--] = 0, s2 = 1;
          }
          for (o2 = d2.length; 0 === d2[--o2]; ) d2.pop();
        }
        return T && (e2.e > h2.maxE ? (e2.d = null, e2.e = NaN) : e2.e < h2.minE && (e2.e = 0, e2.d = [0])), e2;
      }
      function G(e2, t2, r2) {
        if (!e2.isFinite()) return ea(e2);
        var n2, i2 = e2.e, o2 = q(e2.d), a2 = o2.length;
        return t2 ? (r2 && (n2 = r2 - a2) > 0 ? o2 = o2.charAt(0) + "." + o2.slice(1) + ee(n2) : a2 > 1 && (o2 = o2.charAt(0) + "." + o2.slice(1)), o2 = o2 + (e2.e < 0 ? "e" : "e+") + e2.e) : i2 < 0 ? (o2 = "0." + ee(-i2 - 1) + o2, r2 && (n2 = r2 - a2) > 0 && (o2 += ee(n2))) : i2 >= a2 ? (o2 += ee(i2 + 1 - a2), r2 && (n2 = r2 - i2 - 1) > 0 && (o2 = o2 + "." + ee(n2))) : ((n2 = i2 + 1) < a2 && (o2 = o2.slice(0, n2) + "." + o2.slice(n2)), r2 && (n2 = r2 - a2) > 0 && (i2 + 1 === a2 && (o2 += "."), o2 += ee(n2))), o2;
      }
      function X(e2, t2) {
        var r2 = e2[0];
        for (t2 *= 7; r2 >= 10; r2 /= 10) t2++;
        return t2;
      }
      function Z(e2, t2, r2) {
        if (t2 > H) throw T = true, r2 && (e2.precision = r2), Error(O);
        return z(new e2(E), t2, 1, true);
      }
      function Y(e2, t2, r2) {
        if (t2 > W) throw Error(O);
        return z(new e2(A), t2, r2, true);
      }
      function Q(e2) {
        var t2 = e2.length - 1, r2 = 7 * t2 + 1;
        if (t2 = e2[t2]) {
          for (; t2 % 10 == 0; t2 /= 10) r2--;
          for (t2 = e2[0]; t2 >= 10; t2 /= 10) r2++;
        }
        return r2;
      }
      function ee(e2) {
        for (var t2 = ""; e2--; ) t2 += "0";
        return t2;
      }
      function et(e2, t2, r2, n2) {
        var i2, o2 = new e2(1), a2 = Math.ceil(n2 / 7 + 4);
        for (T = false; ; ) {
          if (r2 % 2 && ep((o2 = o2.times(t2)).d, a2) && (i2 = true), 0 === (r2 = U(r2 / 2))) {
            r2 = o2.d.length - 1, i2 && 0 === o2.d[r2] && ++o2.d[r2];
            break;
          }
          ep((t2 = t2.times(t2)).d, a2);
        }
        return T = true, o2;
      }
      function er(e2) {
        return 1 & e2.d[e2.d.length - 1];
      }
      function en(e2, t2, r2) {
        for (var n2, i2 = new e2(t2[0]), o2 = 0; ++o2 < t2.length; ) if ((n2 = new e2(t2[o2])).s) i2[r2](n2) && (i2 = n2);
        else {
          i2 = n2;
          break;
        }
        return i2;
      }
      function ei(e2, t2) {
        var r2, n2, i2, o2, a2, s2, c2, l2 = 0, u2 = 0, d2 = 0, p2 = e2.constructor, h2 = p2.rounding, f2 = p2.precision;
        if (!e2.d || !e2.d[0] || e2.e > 17) return new p2(e2.d ? e2.d[0] ? e2.s < 0 ? 0 : 1 / 0 : 1 : e2.s ? e2.s < 0 ? 0 : e2 : NaN);
        for (null == t2 ? (T = false, c2 = f2) : c2 = t2, s2 = new p2(0.03125); e2.e > -2; ) e2 = e2.times(s2), d2 += 5;
        for (c2 += n2 = Math.log(L(2, d2)) / Math.LN10 * 2 + 5 | 0, r2 = o2 = a2 = new p2(1), p2.precision = c2; ; ) {
          if (o2 = z(o2.times(e2), c2, 1), r2 = r2.times(++u2), q((s2 = a2.plus(F(o2, r2, c2, 1))).d).slice(0, c2) === q(a2.d).slice(0, c2)) {
            for (i2 = d2; i2--; ) a2 = z(a2.times(a2), c2, 1);
            if (null != t2) return p2.precision = f2, a2;
            if (!(l2 < 3 && V(a2.d, c2 - n2, h2, l2))) return z(a2, p2.precision = f2, h2, T = true);
            p2.precision = c2 += 10, r2 = o2 = s2 = new p2(1), u2 = 0, l2++;
          }
          a2 = s2;
        }
      }
      function eo(e2, t2) {
        var r2, n2, i2, o2, a2, s2, c2, l2, u2, d2, p2, h2 = 1, f2 = e2, g2 = f2.d, m2 = f2.constructor, y2 = m2.rounding, w2 = m2.precision;
        if (f2.s < 0 || !g2 || !g2[0] || !f2.e && 1 == g2[0] && 1 == g2.length) return new m2(g2 && !g2[0] ? -1 / 0 : 1 != f2.s ? NaN : g2 ? 0 : f2);
        if (null == t2 ? (T = false, u2 = w2) : u2 = t2, m2.precision = u2 += 10, n2 = (r2 = q(g2)).charAt(0), !(15e14 > Math.abs(o2 = f2.e))) return l2 = Z(m2, u2 + 2, w2).times(o2 + ""), f2 = eo(new m2(n2 + "." + r2.slice(1)), u2 - 10).plus(l2), m2.precision = w2, null == t2 ? z(f2, w2, y2, T = true) : f2;
        for (; n2 < 7 && 1 != n2 || 1 == n2 && r2.charAt(1) > 3; ) n2 = (r2 = q((f2 = f2.times(e2)).d)).charAt(0), h2++;
        for (o2 = f2.e, n2 > 1 ? (f2 = new m2("0." + r2), o2++) : f2 = new m2(n2 + "." + r2.slice(1)), d2 = f2, c2 = a2 = f2 = F(f2.minus(1), f2.plus(1), u2, 1), p2 = z(f2.times(f2), u2, 1), i2 = 3; ; ) {
          if (a2 = z(a2.times(p2), u2, 1), q((l2 = c2.plus(F(a2, new m2(i2), u2, 1))).d).slice(0, u2) === q(c2.d).slice(0, u2)) {
            if (c2 = c2.times(2), 0 !== o2 && (c2 = c2.plus(Z(m2, u2 + 2, w2).times(o2 + ""))), c2 = F(c2, new m2(h2), u2, 1), null != t2) return m2.precision = w2, c2;
            if (!V(c2.d, u2 - 10, y2, s2)) return z(c2, m2.precision = w2, y2, T = true);
            m2.precision = u2 += 10, l2 = a2 = f2 = F(d2.minus(1), d2.plus(1), u2, 1), p2 = z(f2.times(f2), u2, 1), i2 = s2 = 1;
          }
          c2 = l2, i2 += 2;
        }
      }
      function ea(e2) {
        return String(e2.s * e2.s / 0);
      }
      function es(e2, t2) {
        var r2, n2, i2;
        for ((r2 = t2.indexOf(".")) > -1 && (t2 = t2.replace(".", "")), (n2 = t2.search(/e/i)) > 0 ? (r2 < 0 && (r2 = n2), r2 += +t2.slice(n2 + 1), t2 = t2.substring(0, n2)) : r2 < 0 && (r2 = t2.length), n2 = 0; 48 === t2.charCodeAt(n2); n2++) ;
        for (i2 = t2.length; 48 === t2.charCodeAt(i2 - 1); --i2) ;
        if (t2 = t2.slice(n2, i2)) {
          if (i2 -= n2, e2.e = r2 = r2 - n2 - 1, e2.d = [], n2 = (r2 + 1) % 7, r2 < 0 && (n2 += 7), n2 < i2) {
            for (n2 && e2.d.push(+t2.slice(0, n2)), i2 -= 7; n2 < i2; ) e2.d.push(+t2.slice(n2, n2 += 7));
            n2 = 7 - (t2 = t2.slice(n2)).length;
          } else n2 -= i2;
          for (; n2--; ) t2 += "0";
          e2.d.push(+t2), T && (e2.e > e2.constructor.maxE ? (e2.d = null, e2.e = NaN) : e2.e < e2.constructor.minE && (e2.e = 0, e2.d = [0]));
        } else e2.e = 0, e2.d = [0];
        return e2;
      }
      function ec(e2, t2, r2, n2, i2) {
        var o2, a2, s2, c2, l2 = e2.precision, u2 = Math.ceil(l2 / 7);
        for (T = false, c2 = r2.times(r2), s2 = new e2(n2); ; ) {
          if (a2 = F(s2.times(c2), new e2(t2++ * t2++), l2, 1), s2 = i2 ? n2.plus(a2) : n2.minus(a2), n2 = F(a2.times(c2), new e2(t2++ * t2++), l2, 1), void 0 !== (a2 = s2.plus(n2)).d[u2]) {
            for (o2 = u2; a2.d[o2] === s2.d[o2] && o2--; ) ;
            if (-1 == o2) break;
          }
          o2 = s2, s2 = n2, n2 = a2, a2 = o2;
        }
        return T = true, a2.d.length = u2 + 1, a2;
      }
      function el(e2, t2) {
        for (var r2 = e2; --t2; ) r2 *= e2;
        return r2;
      }
      function eu(e2, t2) {
        var r2, n2 = t2.s < 0, i2 = Y(e2, e2.precision, 1), o2 = i2.times(0.5);
        if ((t2 = t2.abs()).lte(o2)) return x = n2 ? 4 : 1, t2;
        if ((r2 = t2.divToInt(i2)).isZero()) x = n2 ? 3 : 2;
        else {
          if ((t2 = t2.minus(r2.times(i2))).lte(o2)) return x = er(r2) ? n2 ? 2 : 3 : n2 ? 4 : 1, t2;
          x = er(r2) ? n2 ? 1 : 4 : n2 ? 3 : 2;
        }
        return t2.minus(i2).abs();
      }
      function ed(e2, t2, r2, n2) {
        var i2, o2, a2, s2, c2, l2, u2, d2, p2, h2 = e2.constructor, f2 = void 0 !== r2;
        if (f2 ? (K(r2, 1, 1e9), void 0 === n2 ? n2 = h2.rounding : K(n2, 0, 8)) : (r2 = h2.precision, n2 = h2.rounding), e2.isFinite()) {
          for (a2 = (u2 = G(e2)).indexOf("."), f2 ? (i2 = 2, 16 == t2 ? r2 = 4 * r2 - 3 : 8 == t2 && (r2 = 3 * r2 - 2)) : i2 = t2, a2 >= 0 && (u2 = u2.replace(".", ""), (p2 = new h2(1)).e = u2.length - a2, p2.d = J(G(p2), 10, i2), p2.e = p2.d.length), o2 = c2 = (d2 = J(u2, 10, i2)).length; 0 == d2[--c2]; ) d2.pop();
          if (d2[0]) {
            if (a2 < 0 ? o2-- : ((e2 = new h2(e2)).d = d2, e2.e = o2, d2 = (e2 = F(e2, p2, r2, n2, 0, i2)).d, o2 = e2.e, l2 = S), a2 = d2[r2], s2 = i2 / 2, l2 = l2 || void 0 !== d2[r2 + 1], l2 = n2 < 4 ? (void 0 !== a2 || l2) && (0 === n2 || n2 === (e2.s < 0 ? 3 : 2)) : a2 > s2 || a2 === s2 && (4 === n2 || l2 || 6 === n2 && 1 & d2[r2 - 1] || n2 === (e2.s < 0 ? 8 : 7)), d2.length = r2, l2) for (; ++d2[--r2] > i2 - 1; ) d2[r2] = 0, r2 || (++o2, d2.unshift(1));
            for (c2 = d2.length; !d2[c2 - 1]; --c2) ;
            for (a2 = 0, u2 = ""; a2 < c2; a2++) u2 += k.charAt(d2[a2]);
            if (f2) {
              if (c2 > 1) {
                if (16 == t2 || 8 == t2) {
                  for (a2 = 16 == t2 ? 4 : 3, --c2; c2 % a2; c2++) u2 += "0";
                  for (c2 = (d2 = J(u2, i2, t2)).length; !d2[c2 - 1]; --c2) ;
                  for (a2 = 1, u2 = "1."; a2 < c2; a2++) u2 += k.charAt(d2[a2]);
                } else u2 = u2.charAt(0) + "." + u2.slice(1);
              }
              u2 = u2 + (o2 < 0 ? "p" : "p+") + o2;
            } else if (o2 < 0) {
              for (; ++o2; ) u2 = "0" + u2;
              u2 = "0." + u2;
            } else if (++o2 > c2) for (o2 -= c2; o2--; ) u2 += "0";
            else o2 < c2 && (u2 = u2.slice(0, o2) + "." + u2.slice(o2));
          } else u2 = f2 ? "0p+0" : "0";
          u2 = (16 == t2 ? "0x" : 2 == t2 ? "0b" : 8 == t2 ? "0o" : "") + u2;
        } else u2 = ea(e2);
        return e2.s < 0 ? "-" + u2 : u2;
      }
      function ep(e2, t2) {
        if (e2.length > t2) return e2.length = t2, true;
      }
      function eh(e2) {
        return new this(e2).abs();
      }
      function ef(e2) {
        return new this(e2).acos();
      }
      function eg(e2) {
        return new this(e2).acosh();
      }
      function em(e2, t2) {
        return new this(e2).plus(t2);
      }
      function ey(e2) {
        return new this(e2).asin();
      }
      function ew(e2) {
        return new this(e2).asinh();
      }
      function eb(e2) {
        return new this(e2).atan();
      }
      function ev(e2) {
        return new this(e2).atanh();
      }
      function e_(e2, t2) {
        e2 = new this(e2), t2 = new this(t2);
        var r2, n2 = this.precision, i2 = this.rounding, o2 = n2 + 4;
        return e2.s && t2.s ? e2.d || t2.d ? !t2.d || e2.isZero() ? (r2 = t2.s < 0 ? Y(this, n2, i2) : new this(0)).s = e2.s : !e2.d || t2.isZero() ? (r2 = Y(this, o2, 1).times(0.5)).s = e2.s : t2.s < 0 ? (this.precision = o2, this.rounding = 1, r2 = this.atan(F(e2, t2, o2, 1)), t2 = Y(this, o2, 1), this.precision = n2, this.rounding = i2, r2 = e2.s < 0 ? r2.minus(t2) : r2.plus(t2)) : r2 = this.atan(F(e2, t2, o2, 1)) : (r2 = Y(this, o2, 1).times(t2.s > 0 ? 0.25 : 0.75)).s = e2.s : r2 = new this(NaN), r2;
      }
      function eS(e2) {
        return new this(e2).cbrt();
      }
      function ex(e2) {
        return z(e2 = new this(e2), e2.e + 1, 2);
      }
      function ek(e2, t2, r2) {
        return new this(e2).clamp(t2, r2);
      }
      function eE(e2) {
        if (!e2 || "object" != typeof e2) throw Error(C + "Object expected");
        var t2, r2, n2, i2 = true === e2.defaults, o2 = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -9e15, 0, "toExpPos", 0, 9e15, "maxE", 0, 9e15, "minE", -9e15, 0, "modulo", 0, 9];
        for (t2 = 0; t2 < o2.length; t2 += 3) if (r2 = o2[t2], i2 && (this[r2] = P[r2]), void 0 !== (n2 = e2[r2])) {
          if (U(n2) === n2 && n2 >= o2[t2 + 1] && n2 <= o2[t2 + 2]) this[r2] = n2;
          else throw Error(R + r2 + ": " + n2);
        }
        if (r2 = "crypto", i2 && (this[r2] = P[r2]), void 0 !== (n2 = e2[r2])) {
          if (true === n2 || false === n2 || 0 === n2 || 1 === n2) {
            if (n2) {
              if ("u" > typeof crypto && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r2] = true;
              else throw Error(N);
            } else this[r2] = false;
          } else throw Error(R + r2 + ": " + n2);
        }
        return this;
      }
      function eA(e2) {
        return new this(e2).cos();
      }
      function eP(e2) {
        return new this(e2).cosh();
      }
      function eT(e2, t2) {
        return new this(e2).div(t2);
      }
      function eC(e2) {
        return new this(e2).exp();
      }
      function eR(e2) {
        return z(e2 = new this(e2), e2.e + 1, 3);
      }
      function eO() {
        var e2, t2, r2 = new this(0);
        for (T = false, e2 = 0; e2 < arguments.length; ) if (t2 = new this(arguments[e2++]), t2.d) r2.d && (r2 = r2.plus(t2.times(t2)));
        else {
          if (t2.s) return T = true, new this(1 / 0);
          r2 = t2;
        }
        return T = true, r2.sqrt();
      }
      function eN(e2) {
        return e2 instanceof eQ || e2 && e2.toStringTag === I || false;
      }
      function eI(e2) {
        return new this(e2).ln();
      }
      function eU(e2, t2) {
        return new this(e2).log(t2);
      }
      function eL(e2) {
        return new this(e2).log(2);
      }
      function e$(e2) {
        return new this(e2).log(10);
      }
      function eM() {
        return en(this, arguments, "lt");
      }
      function eD() {
        return en(this, arguments, "gt");
      }
      function ej(e2, t2) {
        return new this(e2).mod(t2);
      }
      function eH(e2, t2) {
        return new this(e2).mul(t2);
      }
      function eW(e2, t2) {
        return new this(e2).pow(t2);
      }
      function eB(e2) {
        var t2, r2, n2, i2, o2 = 0, a2 = new this(1), s2 = [];
        if (void 0 === e2 ? e2 = this.precision : K(e2, 1, 1e9), n2 = Math.ceil(e2 / 7), this.crypto) {
          if (crypto.getRandomValues) for (t2 = crypto.getRandomValues(new Uint32Array(n2)); o2 < n2; ) (i2 = t2[o2]) >= 429e7 ? t2[o2] = crypto.getRandomValues(new Uint32Array(1))[0] : s2[o2++] = i2 % 1e7;
          else if (crypto.randomBytes) {
            for (t2 = crypto.randomBytes(n2 *= 4); o2 < n2; ) (i2 = t2[o2] + (t2[o2 + 1] << 8) + (t2[o2 + 2] << 16) + ((127 & t2[o2 + 3]) << 24)) >= 214e7 ? crypto.randomBytes(4).copy(t2, o2) : (s2.push(i2 % 1e7), o2 += 4);
            o2 = n2 / 4;
          } else throw Error(N);
        } else for (; o2 < n2; ) s2[o2++] = 1e7 * Math.random() | 0;
        for (n2 = s2[--o2], e2 %= 7, n2 && e2 && (i2 = L(10, 7 - e2), s2[o2] = (n2 / i2 | 0) * i2); 0 === s2[o2]; o2--) s2.pop();
        if (o2 < 0) r2 = 0, s2 = [0];
        else {
          for (r2 = -1; 0 === s2[0]; r2 -= 7) s2.shift();
          for (n2 = 1, i2 = s2[0]; i2 >= 10; i2 /= 10) n2++;
          n2 < 7 && (r2 -= 7 - n2);
        }
        return a2.e = r2, a2.d = s2, a2;
      }
      function eq(e2) {
        return z(e2 = new this(e2), e2.e + 1, this.rounding);
      }
      function eK(e2) {
        return (e2 = new this(e2)).d ? e2.d[0] ? e2.s : 0 * e2.s : e2.s || NaN;
      }
      function eV(e2) {
        return new this(e2).sin();
      }
      function eJ(e2) {
        return new this(e2).sinh();
      }
      function eF(e2) {
        return new this(e2).sqrt();
      }
      function ez(e2, t2) {
        return new this(e2).sub(t2);
      }
      function eG() {
        var e2 = 0, t2 = arguments, r2 = new this(t2[0]);
        for (T = false; r2.s && ++e2 < t2.length; ) r2 = r2.plus(t2[e2]);
        return T = true, z(r2, this.precision, this.rounding);
      }
      function eX(e2) {
        return new this(e2).tan();
      }
      function eZ(e2) {
        return new this(e2).tanh();
      }
      function eY(e2) {
        return z(e2 = new this(e2), e2.e + 1, 1);
      }
      B[Symbol.for("nodejs.util.inspect.custom")] = B.toString, B[Symbol.toStringTag] = "Decimal";
      var eQ = B.constructor = function e2(t2) {
        var r2, n2, i2;
        function o2(e3) {
          var t3, r3, n3;
          if (!(this instanceof o2)) return new o2(e3);
          if (this.constructor = o2, eN(e3)) {
            this.s = e3.s, T ? !e3.d || e3.e > o2.maxE ? (this.e = NaN, this.d = null) : e3.e < o2.minE ? (this.e = 0, this.d = [0]) : (this.e = e3.e, this.d = e3.d.slice()) : (this.e = e3.e, this.d = e3.d ? e3.d.slice() : e3.d);
            return;
          }
          if ("number" == (n3 = typeof e3)) {
            if (0 === e3) {
              this.s = 1 / e3 < 0 ? -1 : 1, this.e = 0, this.d = [0];
              return;
            }
            if (e3 < 0 ? (e3 = -e3, this.s = -1) : this.s = 1, e3 === ~~e3 && e3 < 1e7) {
              for (t3 = 0, r3 = e3; r3 >= 10; r3 /= 10) t3++;
              T ? t3 > o2.maxE ? (this.e = NaN, this.d = null) : t3 < o2.minE ? (this.e = 0, this.d = [0]) : (this.e = t3, this.d = [e3]) : (this.e = t3, this.d = [e3]);
              return;
            }
            if (0 * e3 != 0) {
              e3 || (this.s = NaN), this.e = NaN, this.d = null;
              return;
            }
            return es(this, e3.toString());
          }
          if ("string" !== n3) throw Error(R + e3);
          return 45 === (r3 = e3.charCodeAt(0)) ? (e3 = e3.slice(1), this.s = -1) : (43 === r3 && (e3 = e3.slice(1)), this.s = 1), j.test(e3) ? es(this, e3) : function(e4, t4) {
            var r4, n4, i3, o3, a2, s2, c2, l2, u2;
            if (t4.indexOf("_") > -1) {
              if (t4 = t4.replace(/(\d)_(?=\d)/g, "$1"), j.test(t4)) return es(e4, t4);
            } else if ("Infinity" === t4 || "NaN" === t4) return +t4 || (e4.s = NaN), e4.e = NaN, e4.d = null, e4;
            if (M.test(t4)) r4 = 16, t4 = t4.toLowerCase();
            else if ($.test(t4)) r4 = 2;
            else if (D.test(t4)) r4 = 8;
            else throw Error(R + t4);
            for ((o3 = t4.search(/p/i)) > 0 ? (c2 = +t4.slice(o3 + 1), t4 = t4.substring(2, o3)) : t4 = t4.slice(2), a2 = (o3 = t4.indexOf(".")) >= 0, n4 = e4.constructor, a2 && (o3 = (s2 = (t4 = t4.replace(".", "")).length) - o3, i3 = et(n4, new n4(r4), o3, 2 * o3)), o3 = u2 = (l2 = J(t4, r4, 1e7)).length - 1; 0 === l2[o3]; --o3) l2.pop();
            return o3 < 0 ? new n4(0 * e4.s) : (e4.e = X(l2, u2), e4.d = l2, T = false, a2 && (e4 = F(e4, i3, 4 * s2)), c2 && (e4 = e4.times(54 > Math.abs(c2) ? L(2, c2) : eQ.pow(2, c2))), T = true, e4);
          }(this, e3);
        }
        if (o2.prototype = B, o2.ROUND_UP = 0, o2.ROUND_DOWN = 1, o2.ROUND_CEIL = 2, o2.ROUND_FLOOR = 3, o2.ROUND_HALF_UP = 4, o2.ROUND_HALF_DOWN = 5, o2.ROUND_HALF_EVEN = 6, o2.ROUND_HALF_CEIL = 7, o2.ROUND_HALF_FLOOR = 8, o2.EUCLID = 9, o2.config = o2.set = eE, o2.clone = e2, o2.isDecimal = eN, o2.abs = eh, o2.acos = ef, o2.acosh = eg, o2.add = em, o2.asin = ey, o2.asinh = ew, o2.atan = eb, o2.atanh = ev, o2.atan2 = e_, o2.cbrt = eS, o2.ceil = ex, o2.clamp = ek, o2.cos = eA, o2.cosh = eP, o2.div = eT, o2.exp = eC, o2.floor = eR, o2.hypot = eO, o2.ln = eI, o2.log = eU, o2.log10 = e$, o2.log2 = eL, o2.max = eM, o2.min = eD, o2.mod = ej, o2.mul = eH, o2.pow = eW, o2.random = eB, o2.round = eq, o2.sign = eK, o2.sin = eV, o2.sinh = eJ, o2.sqrt = eF, o2.sub = ez, o2.sum = eG, o2.tan = eX, o2.tanh = eZ, o2.trunc = eY, void 0 === t2 && (t2 = {}), t2 && true !== t2.defaults) for (i2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r2 = 0; r2 < i2.length; ) t2.hasOwnProperty(n2 = i2[r2++]) || (t2[n2] = this[n2]);
        return o2.config(t2), o2;
      }(P);
      E = new eQ(E), A = new eQ(A);
      var e0 = eQ;
    }, 945: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, o = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function s(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function c(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, i2], ...o2] = s(e2), { domain: a2, expires: c2, httponly: d2, maxage: p2, path: h, samesite: f, secure: g, partitioned: m, priority: y } = Object.fromEntries(o2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(i2), domain: a2, ...c2 && { expires: new Date(c2) }, ...d2 && { httpOnly: true }, ..."string" == typeof p2 && { maxAge: Number(p2) }, path: h, ...f && { sameSite: l.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...y && { priority: u.includes(r2 = (r2 = y).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(o, { RequestCookies: () => d, ResponseCookies: () => p, parseCookie: () => s, parseSetCookie: () => c, stringifyCookie: () => a }), e.exports = ((e2, o2, a2, s2) => {
        if (o2 && "object" == typeof o2 || "function" == typeof o2) for (let c2 of n(o2)) i.call(e2, c2) || c2 === a2 || t(e2, c2, { get: () => o2[c2], enumerable: !(s2 = r(o2, c2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), o);
      var l = ["strict", "lax", "none"], u = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of s(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, p = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, o2, a2 = [], s2 = 0;
            function c2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, o2 = false; c2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, c2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (o2 = true, s2 = i3, a2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!o2 || s2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(i2)) {
            let t3 = c(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, n2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: n2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 439: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), o2 = r2(930), a = "context", s = new n2.NoopContextManager();
          class c {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(a, e3, o2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(a) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(a, o2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = c;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), o2 = r2(957), a = r2(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: o2.DiagLogLevel.INFO }) => {
                var n3, s2, c;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let l = (0, a.getGlobal)("diag"), u = (0, i2.createLogLevelDiagLogger)(null !== (s2 = r3.logLevel) && void 0 !== s2 ? s2 : o2.DiagLogLevel.INFO, e4);
                if (l && !r3.suppressOverrideMessage) {
                  let e5 = null !== (c = Error().stack) && void 0 !== c ? c : "<failed to generate stacktrace>";
                  l.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t3.DiagAPI = s;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), o2 = r2(930), a = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(a, e3, o2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(a) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(a, o2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = s;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), o2 = r2(194), a = r2(277), s = r2(369), c = r2(930), l = "propagation", u = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(l, e3, c.DiagAPI.instance());
            }
            inject(e3, t4, r3 = o2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = o2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(l, c.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(l) || u;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), o2 = r2(139), a = r2(607), s = r2(930), c = "trace";
          class l {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = o2.wrapSpanContext, this.isSpanContextValid = o2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(c, this._proxyTracerProvider, s.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(c) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(c, s.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = l;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function o2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = o2, t3.getActiveBaggage = function() {
            return o2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), o2 = r2(830), a = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: o2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return o2("debug", this._namespace, e3);
            }
            error(...e3) {
              return o2("error", this._namespace, e3);
            }
            info(...e3) {
              return o2("info", this._namespace, e3);
            }
            warn(...e3) {
              return o2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return o2("verbose", this._namespace, e3);
            }
          }
          function o2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), o2 = r2(130), a = i2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${a}`), c = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var o3;
            let a2 = c[s] = null !== (o3 = c[s]) && void 0 !== o3 ? o3 : { version: i2.VERSION };
            if (!n3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = c[s]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, o2.isCompatible)(n3)) return null === (r3 = c[s]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = c[s];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function o2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let o3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != o3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return a(e4);
              let s = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != s.prerelease || o3.major !== s.major ? a(e4) : 0 === o3.major ? o3.minor === s.minor && o3.patch <= s.patch ? (t4.add(e4), true) : a(e4) : o3.minor <= s.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = o2, t3.isCompatible = o2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class o2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = o2;
          class a extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = s;
          class c extends s {
          }
          t3.NoopObservableCounterMetric = c;
          class l extends s {
          }
          t3.NoopObservableGaugeMetric = l;
          class u extends s {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new o2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new c(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new l(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), o2 = r2(403), a = r2(139), s = n2.ContextAPI.getInstance();
          class c {
            startSpan(e3, t4, r3 = s.active()) {
              if (null == t4 ? void 0 : t4.root) return new o2.NonRecordingSpan();
              let n3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, a.isSpanContextValid)(n3) ? new o2.NonRecordingSpan(n3) : new o2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let o3, a2, c2;
              if (arguments.length < 2) return;
              2 == arguments.length ? c2 = t4 : 3 == arguments.length ? (o3 = t4, c2 = r3) : (o3 = t4, a2 = r3, c2 = n3);
              let l = null != a2 ? a2 : s.active(), u = this.startSpan(e3, o3, l), d = (0, i2.setSpan)(l, u);
              return s.with(d, c2, void 0, u);
            }
          }
          t3.NoopTracer = c;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class o2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = o2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), o2 = r2(491), a = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(a) || void 0;
          }
          function c(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = s, t3.getActiveSpan = function() {
            return s(o2.ContextAPI.getInstance().active());
          }, t3.setSpan = c, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return c(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = s(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let o2 = r3.slice(0, i3), a = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(o2) && (0, n2.validateValue)(a) && e4.set(o2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, o2 = RegExp(`^(?:${n2}|${i2})$`), a = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t3.validateKey = function(e3) {
            return o2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), o2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function c(e3) {
            return a.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = s, t3.isValidSpanId = c, t3.isSpanContextValid = function(e3) {
            return s(e3.traceId) && c(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var o2 = n[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(o2.exports, o2, o2.exports, i), a = false;
          } finally {
            a && delete n[e2];
          }
          return o2.exports;
        }
        i.ab = "//";
        var o = {};
        (() => {
          Object.defineProperty(o, "__esModule", { value: true }), o.trace = o.propagation = o.metrics = o.diag = o.context = o.INVALID_SPAN_CONTEXT = o.INVALID_TRACEID = o.INVALID_SPANID = o.isValidSpanId = o.isValidTraceId = o.isSpanContextValid = o.createTraceState = o.TraceFlags = o.SpanStatusCode = o.SpanKind = o.SamplingDecision = o.ProxyTracerProvider = o.ProxyTracer = o.defaultTextMapSetter = o.defaultTextMapGetter = o.ValueType = o.createNoopMeter = o.DiagLogLevel = o.DiagConsoleLogger = o.ROOT_CONTEXT = o.createContextKey = o.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(o, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(o, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(o, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(o, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(o, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var a = i(102);
          Object.defineProperty(o, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var s = i(901);
          Object.defineProperty(o, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var c = i(194);
          Object.defineProperty(o, "defaultTextMapGetter", { enumerable: true, get: function() {
            return c.defaultTextMapGetter;
          } }), Object.defineProperty(o, "defaultTextMapSetter", { enumerable: true, get: function() {
            return c.defaultTextMapSetter;
          } });
          var l = i(125);
          Object.defineProperty(o, "ProxyTracer", { enumerable: true, get: function() {
            return l.ProxyTracer;
          } });
          var u = i(846);
          Object.defineProperty(o, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(o, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var p = i(357);
          Object.defineProperty(o, "SpanKind", { enumerable: true, get: function() {
            return p.SpanKind;
          } });
          var h = i(847);
          Object.defineProperty(o, "SpanStatusCode", { enumerable: true, get: function() {
            return h.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(o, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(o, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(o, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(o, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(o, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var y = i(476);
          Object.defineProperty(o, "INVALID_SPANID", { enumerable: true, get: function() {
            return y.INVALID_SPANID;
          } }), Object.defineProperty(o, "INVALID_TRACEID", { enumerable: true, get: function() {
            return y.INVALID_TRACEID;
          } }), Object.defineProperty(o, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return y.INVALID_SPAN_CONTEXT;
          } });
          let w = i(67);
          Object.defineProperty(o, "context", { enumerable: true, get: function() {
            return w.context;
          } });
          let b = i(506);
          Object.defineProperty(o, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let v = i(886);
          Object.defineProperty(o, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let _ = i(939);
          Object.defineProperty(o, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = i(845);
          Object.defineProperty(o, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), o.default = { context: w.context, diag: b.diag, metrics: v.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = o;
      })();
    }, 133: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, o = t2.split(n), a = (r2 || {}).decode || e2, s = 0; s < o.length; s++) {
              var c = o[s], l = c.indexOf("=");
              if (!(l < 0)) {
                var u = c.substr(0, l).trim(), d = c.substr(++l, c.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, a));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var o = n2 || {}, a = o.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var s = a(t2);
            if (s && !i.test(s)) throw TypeError("argument val is invalid");
            var c = e3 + "=" + s;
            if (null != o.maxAge) {
              var l = o.maxAge - 0;
              if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
              c += "; Max-Age=" + Math.floor(l);
            }
            if (o.domain) {
              if (!i.test(o.domain)) throw TypeError("option domain is invalid");
              c += "; Domain=" + o.domain;
            }
            if (o.path) {
              if (!i.test(o.path)) throw TypeError("option path is invalid");
              c += "; Path=" + o.path;
            }
            if (o.expires) {
              if ("function" != typeof o.expires.toUTCString) throw TypeError("option expires is invalid");
              c += "; Expires=" + o.expires.toUTCString();
            }
            if (o.httpOnly && (c += "; HttpOnly"), o.secure && (c += "; Secure"), o.sameSite) switch ("string" == typeof o.sameSite ? o.sameSite.toLowerCase() : o.sameSite) {
              case true:
              case "strict":
                c += "; SameSite=Strict";
                break;
              case "lax":
                c += "; SameSite=Lax";
                break;
              case "none":
                c += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return c;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 340: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, o2) {
          !function(a2, s2) {
            "use strict";
            var c = "function", l = "undefined", u = "object", d = "string", p = "major", h = "model", f = "name", g = "type", m = "vendor", y = "version", w = "architecture", b = "console", v = "mobile", _ = "tablet", S = "smarttv", x = "wearable", k = "embedded", E = "Amazon", A = "Apple", P = "ASUS", T = "BlackBerry", C = "Browser", R = "Chrome", O = "Firefox", N = "Google", I = "Huawei", U = "Microsoft", L = "Motorola", $ = "Opera", M = "Samsung", D = "Sharp", j = "Sony", H = "Xiaomi", W = "Zebra", B = "Facebook", q = "Chromium OS", K = "Mac OS", V = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, J = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, F = function(e2, t2) {
              return typeof e2 === d && -1 !== z(t2).indexOf(z(e2));
            }, z = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === l ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, n2, i3, o3, a3, l2, d2 = 0; d2 < t2.length && !a3; ) {
                var p2 = t2[d2], h2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < p2.length && !a3 && p2[r2]; ) if (a3 = p2[r2++].exec(e2)) for (i3 = 0; i3 < h2.length; i3++) l2 = a3[++n2], typeof (o3 = h2[i3]) === u && o3.length > 0 ? 2 === o3.length ? typeof o3[1] == c ? this[o3[0]] = o3[1].call(this, l2) : this[o3[0]] = o3[1] : 3 === o3.length ? typeof o3[1] !== c || o3[1].exec && o3[1].test ? this[o3[0]] = l2 ? l2.replace(o3[1], o3[2]) : void 0 : this[o3[0]] = l2 ? o3[1].call(this, l2, o3[2]) : void 0 : 4 === o3.length && (this[o3[0]] = l2 ? o3[3].call(this, l2.replace(o3[1], o3[2])) : void 0) : this[o3] = l2 || s2;
                d2 += 2;
              }
            }, Z = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (F(t2[r2][n2], e2)) return "?" === r2 ? s2 : r2;
              } else if (F(t2[r2], e2)) return "?" === r2 ? s2 : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [y, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [y, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, y], [/opios[\/ ]+([\w\.]+)/i], [y, [f, $ + " Mini"]], [/\bopr\/([\w\.]+)/i], [y, [f, $]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, y], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [y, [f, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [y, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [y, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [y, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [y, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [y, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + C], y], [/\bfocus\/([\w\.]+)/i], [y, [f, O + " Focus"]], [/\bopt\/([\w\.]+)/i], [y, [f, $ + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [y, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [y, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [y, [f, $ + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [y, [f, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [y, [f, O]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + C], y], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], y], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, y], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, B], y], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, y], [/\bgsa\/([\w\.]+) .*safari\//i], [y, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [y, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [y, [f, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, R + " WebView"], y], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [y, [f, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, y], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [y, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [y, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [y, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, y], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], y], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [y, [f, O + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, y], [/(cobalt)\/([\w\.]+)/i], [f, [y, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[w, "amd64"]], [/(ia32(?=;))/i], [[w, z]], [/((?:i[346]|x)86)[;\)]/i], [[w, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[w, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[w, "armhf"]], [/windows (ce|mobile); ppc;/i], [[w, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[w, /ower/, "", z]], [/(sun4\w)[;\)]/i], [[w, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[w, z]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [h, [m, M], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [h, [m, M], [g, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [h, [m, A], [g, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [h, [m, A], [g, _]], [/(macintosh);/i], [h, [m, A]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [h, [m, D], [g, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [h, [m, I], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [h, [m, I], [g, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[h, /_/g, " "], [m, H], [g, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[h, /_/g, " "], [m, H], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [h, [m, "OPPO"], [g, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [h, [m, "Vivo"], [g, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [h, [m, "Realme"], [g, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [h, [m, L], [g, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [h, [m, L], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [h, [m, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [h, [m, "LG"], [g, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [h, [m, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[h, /_/g, " "], [m, "Nokia"], [g, v]], [/(pixel c)\b/i], [h, [m, N], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [h, [m, N], [g, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [h, [m, j], [g, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[h, "Xperia Tablet"], [m, j], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [h, [m, "OnePlus"], [g, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [h, [m, E], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[h, /(.+)/g, "Fire Phone $1"], [m, E], [g, v]], [/(playbook);[-\w\),; ]+(rim)/i], [h, m, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [h, [m, T], [g, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [h, [m, P], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [h, [m, P], [g, v]], [/(nexus 9)/i], [h, [m, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [h, /_/g, " "], [g, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [h, [m, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [h, [m, "Meizu"], [g, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, h, [g, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, h, [g, _]], [/(surface duo)/i], [h, [m, U], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [h, [m, "Fairphone"], [g, v]], [/(u304aa)/i], [h, [m, "AT&T"], [g, v]], [/\bsie-(\w*)/i], [h, [m, "Siemens"], [g, v]], [/\b(rct\w+) b/i], [h, [m, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [h, [m, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [h, [m, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [h, [m, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [h, [m, "NuVision"], [g, _]], [/\b(k88) b/i], [h, [m, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [h, [m, "ZTE"], [g, v]], [/\b(gen\d{3}) b.+49h/i], [h, [m, "Swiss"], [g, v]], [/\b(zur\d{3}) b/i], [h, [m, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [h, [m, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], h, [g, _]], [/\b(ns-?\w{0,9}) b/i], [h, [m, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [h, [m, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], h, [g, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], h, [g, v]], [/\b(ph-1) /i], [h, [m, "Essential"], [g, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [h, [m, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [h, [m, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [h, [m, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [h, [m, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [m, h, [g, v]], [/(kin\.[onetw]{3})/i], [[h, /\./g, " "], [m, U], [g, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [h, [m, W], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [h, [m, W], [g, v]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[h, /^/, "SmartTV"], [m, M], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [h, A + " TV"], [g, S]], [/crkey/i], [[h, R + "cast"], [m, N], [g, S]], [/droid.+aft(\w)( bui|\))/i], [h, [m, E], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [h, [m, D], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [h, [m, j], [g, S]], [/(mitv-\w{5}) bui/i], [h, [m, H], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, h, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, G], [h, G], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, h, [g, b]], [/droid.+; (shield) bui/i], [h, [m, "Nvidia"], [g, b]], [/(playstation [345portablevi]+)/i], [h, [m, j], [g, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [h, [m, U], [g, b]], [/((pebble))app/i], [m, h, [g, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [h, [m, A], [g, x]], [/droid.+; (glass) \d/i], [h, [m, N], [g, x]], [/droid.+; (wt63?0{2,3})\)/i], [h, [m, W], [g, x]], [/(quest( 2| pro)?)/i], [h, [m, B], [g, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, k]], [/(aeobc)\b/i], [h, [m, E], [g, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [h, [g, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [h, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, v]], [/(android[-\w\. ]{0,9});.+buil/i], [h, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [y, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [y, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, y], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [y, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, y], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [y, Z, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [y, Z, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[y, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, K], [y, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [y, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, y], [/\(bb(10);/i], [y, [f, T]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [y, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [y, [f, O + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [y, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [y, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [y, [f, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, q], y], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, y], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], y], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, y]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = s2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== l && a2.navigator ? a2.navigator : s2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : s2, o3 = t2 ? V(Q, t2) : Q, b2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = s2, t3[y] = s2, X.call(t3, n2, o3.browser), t3[p] = typeof (e3 = t3[y]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : s2, b2 && r2 && r2.brave && typeof r2.brave.isBrave == c && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[w] = s2, X.call(e3, n2, o3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = s2, e3[h] = s2, e3[g] = s2, X.call(e3, n2, o3.device), b2 && !e3[g] && i3 && i3.mobile && (e3[g] = v), b2 && "Macintosh" == e3[h] && r2 && typeof r2.standalone !== l && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[h] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = s2, e3[y] = s2, X.call(e3, n2, o3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = s2, e3[y] = s2, X.call(e3, n2, o3.os), b2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, q).replace(/macos/i, K)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = J([f, y, p]), ee.CPU = J([w]), ee.DEVICE = J([h, m, g, b, v, S, _, x, k]), ee.ENGINE = ee.OS = J([f, y]), typeof o2 !== l ? (i2.exports && (o2 = i2.exports = ee), o2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof a2 !== l && (a2.UAParser = ee);
            var et = typeof a2 !== l && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, o = {};
        function a(e2) {
          var t2 = o[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = o[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, a), n2 = false;
          } finally {
            n2 && delete o[e2];
          }
          return r2.exports;
        }
        a.ab = "//";
        var s = a(226);
        e.exports = s;
      })();
    }, 912: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { bailoutToClientRendering: () => o });
      class n extends Error {
        constructor(e2) {
          super("Bail out to client-side rendering: " + e2), this.reason = e2, this.digest = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
        }
      }
      var i = r(452);
      function o(e2) {
        let t2 = i.A.getStore();
        if ((null == t2 || !t2.forceStatic) && (null == t2 ? void 0 : t2.isStaticGeneration)) throw new n(e2);
      }
    }, 452: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(228).P)();
    }, 488: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return o;
      } });
      let n = new (r(67)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let o2 = i(e2, t2);
        return o2 ? n.run(o2, r2) : r2();
      }
      function a(e2, t2) {
        return n.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 375: (e, t, r) => {
      "use strict";
      var n = r(195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return c;
      }, reader: function() {
        return o;
      } });
      let i = r(488), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: i2, headers: o2, body: a2, cache: s2, credentials: c2, integrity: l, mode: u, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(o2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: c2, integrity: l, mode: u, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function s(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: c2 } = r2, l = await a(s2, t2), u = await e2(`http://localhost:${c2}`, { method: "POST", body: JSON.stringify(l), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let d = await u.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? n.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(d);
      }
      function c(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : s(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 177: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let n = r(488), i = r(375);
      function o() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 835: (e, t) => {
      "use strict";
      var r = Symbol.for("react.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), h = Symbol.iterator, f = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } }, g = Object.assign, m = {};
      function y(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = m, this.updater = r2 || f;
      }
      function w() {
      }
      function b(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = m, this.updater = r2 || f;
      }
      y.prototype.isReactComponent = {}, y.prototype.setState = function(e2, t2) {
        if ("object" != typeof e2 && "function" != typeof e2 && null != e2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e2, t2, "setState");
      }, y.prototype.forceUpdate = function(e2) {
        this.updater.enqueueForceUpdate(this, e2, "forceUpdate");
      }, w.prototype = y.prototype;
      var v = b.prototype = new w();
      v.constructor = b, g(v, y.prototype), v.isPureReactComponent = true;
      var _ = Array.isArray, S = Object.prototype.hasOwnProperty, x = { current: null }, k = { key: true, ref: true, __self: true, __source: true };
      function E(e2, t2, n2) {
        var i2, o2 = {}, a2 = null, s2 = null;
        if (null != t2) for (i2 in void 0 !== t2.ref && (s2 = t2.ref), void 0 !== t2.key && (a2 = "" + t2.key), t2) S.call(t2, i2) && !k.hasOwnProperty(i2) && (o2[i2] = t2[i2]);
        var c2 = arguments.length - 2;
        if (1 === c2) o2.children = n2;
        else if (1 < c2) {
          for (var l2 = Array(c2), u2 = 0; u2 < c2; u2++) l2[u2] = arguments[u2 + 2];
          o2.children = l2;
        }
        if (e2 && e2.defaultProps) for (i2 in c2 = e2.defaultProps) void 0 === o2[i2] && (o2[i2] = c2[i2]);
        return { $$typeof: r, type: e2, key: a2, ref: s2, props: o2, _owner: x.current };
      }
      function A(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === r;
      }
      var P = /\/+/g;
      function T(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function C(e2, t2, i2) {
        if (null == e2) return e2;
        var o2 = [], a2 = 0;
        return !function e3(t3, i3, o3, a3, s2) {
          var c2, l2, u2, d2 = typeof t3;
          ("undefined" === d2 || "boolean" === d2) && (t3 = null);
          var p2 = false;
          if (null === t3) p2 = true;
          else switch (d2) {
            case "string":
            case "number":
              p2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case r:
                case n:
                  p2 = true;
              }
          }
          if (p2) return s2 = s2(p2 = t3), t3 = "" === a3 ? "." + T(p2, 0) : a3, _(s2) ? (o3 = "", null != t3 && (o3 = t3.replace(P, "$&/") + "/"), e3(s2, i3, o3, "", function(e4) {
            return e4;
          })) : null != s2 && (A(s2) && (c2 = s2, l2 = o3 + (!s2.key || p2 && p2.key === s2.key ? "" : ("" + s2.key).replace(P, "$&/") + "/") + t3, s2 = { $$typeof: r, type: c2.type, key: l2, ref: c2.ref, props: c2.props, _owner: c2._owner }), i3.push(s2)), 1;
          if (p2 = 0, a3 = "" === a3 ? "." : a3 + ":", _(t3)) for (var f2 = 0; f2 < t3.length; f2++) {
            var g2 = a3 + T(d2 = t3[f2], f2);
            p2 += e3(d2, i3, o3, g2, s2);
          }
          else if ("function" == typeof (g2 = null === (u2 = t3) || "object" != typeof u2 ? null : "function" == typeof (u2 = h && u2[h] || u2["@@iterator"]) ? u2 : null)) for (t3 = g2.call(t3), f2 = 0; !(d2 = t3.next()).done; ) g2 = a3 + T(d2 = d2.value, f2++), p2 += e3(d2, i3, o3, g2, s2);
          else if ("object" === d2) throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === (i3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : i3) + "). If you meant to render a collection of children, use an array instead.");
          return p2;
        }(e2, o2, "", "", function(e3) {
          return t2.call(i2, e3, a2++);
        }), o2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      var O = { current: null }, N = { transition: null };
      function I() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      t.Children = { map: C, forEach: function(e2, t2, r2) {
        C(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return C(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return C(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!A(e2)) throw Error("React.Children.only expected to receive a single React element child.");
        return e2;
      } }, t.Component = y, t.Fragment = i, t.Profiler = a, t.PureComponent = b, t.StrictMode = o, t.Suspense = u, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { ReactCurrentDispatcher: O, ReactCurrentBatchConfig: N, ReactCurrentOwner: x }, t.act = I, t.cloneElement = function(e2, t2, n2) {
        if (null == e2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e2 + ".");
        var i2 = g({}, e2.props), o2 = e2.key, a2 = e2.ref, s2 = e2._owner;
        if (null != t2) {
          if (void 0 !== t2.ref && (a2 = t2.ref, s2 = x.current), void 0 !== t2.key && (o2 = "" + t2.key), e2.type && e2.type.defaultProps) var c2 = e2.type.defaultProps;
          for (l2 in t2) S.call(t2, l2) && !k.hasOwnProperty(l2) && (i2[l2] = void 0 === t2[l2] && void 0 !== c2 ? c2[l2] : t2[l2]);
        }
        var l2 = arguments.length - 2;
        if (1 === l2) i2.children = n2;
        else if (1 < l2) {
          c2 = Array(l2);
          for (var u2 = 0; u2 < l2; u2++) c2[u2] = arguments[u2 + 2];
          i2.children = c2;
        }
        return { $$typeof: r, type: e2.type, key: o2, ref: a2, props: i2, _owner: s2 };
      }, t.createContext = function(e2) {
        return (e2 = { $$typeof: c, _currentValue: e2, _currentValue2: e2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: s, _context: e2 }, e2.Consumer = e2;
      }, t.createElement = E, t.createFactory = function(e2) {
        var t2 = E.bind(null, e2);
        return t2.type = e2, t2;
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: l, render: e2 };
      }, t.isValidElement = A, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: R };
      }, t.memo = function(e2, t2) {
        return { $$typeof: d, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.startTransition = function(e2) {
        var t2 = N.transition;
        N.transition = {};
        try {
          e2();
        } finally {
          N.transition = t2;
        }
      }, t.unstable_act = I, t.useCallback = function(e2, t2) {
        return O.current.useCallback(e2, t2);
      }, t.useContext = function(e2) {
        return O.current.useContext(e2);
      }, t.useDebugValue = function() {
      }, t.useDeferredValue = function(e2) {
        return O.current.useDeferredValue(e2);
      }, t.useEffect = function(e2, t2) {
        return O.current.useEffect(e2, t2);
      }, t.useId = function() {
        return O.current.useId();
      }, t.useImperativeHandle = function(e2, t2, r2) {
        return O.current.useImperativeHandle(e2, t2, r2);
      }, t.useInsertionEffect = function(e2, t2) {
        return O.current.useInsertionEffect(e2, t2);
      }, t.useLayoutEffect = function(e2, t2) {
        return O.current.useLayoutEffect(e2, t2);
      }, t.useMemo = function(e2, t2) {
        return O.current.useMemo(e2, t2);
      }, t.useReducer = function(e2, t2, r2) {
        return O.current.useReducer(e2, t2, r2);
      }, t.useRef = function(e2) {
        return O.current.useRef(e2);
      }, t.useState = function(e2) {
        return O.current.useState(e2);
      }, t.useSyncExternalStore = function(e2, t2, r2) {
        return O.current.useSyncExternalStore(e2, t2, r2);
      }, t.useTransition = function() {
        return O.current.useTransition();
      }, t.version = "18.3.1";
    }, 23: (e, t, r) => {
      "use strict";
      e.exports = r(835);
    }, 228: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => a });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
      }
      let o = globalThis.AsyncLocalStorage;
      function a() {
        return o ? new o() : new i();
      }
    } }, (e) => {
      var t = e(e.s = 713);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/login(.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin\\/login(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "D:\\Projectweb\\modtlab\\PixlApe", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.mjs" };
var BuildId = "89AFOqWRrLHNn2FgTPBnv";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/changelog", "regex": "^/admin/changelog(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/changelog(?:/)?$" }, { "page": "/admin/cloud", "regex": "^/admin/cloud(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/cloud(?:/)?$" }, { "page": "/admin/document", "regex": "^/admin/document(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/document(?:/)?$" }, { "page": "/admin/document/new", "regex": "^/admin/document/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/document/new(?:/)?$" }, { "page": "/admin/orders", "regex": "^/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/orders(?:/)?$" }, { "page": "/admin/products", "regex": "^/admin/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products(?:/)?$" }, { "page": "/admin/products/new", "regex": "^/admin/products/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products/new(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/admin/tools", "regex": "^/admin/tools(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/tools(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/cart", "regex": "^/cart(?:/)?$", "routeKeys": {}, "namedRegex": "^/cart(?:/)?$" }, { "page": "/help", "regex": "^/help(?:/)?$", "routeKeys": {}, "namedRegex": "^/help(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/privacy-polish", "regex": "^/privacy\\-polish(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy\\-polish(?:/)?$" }, { "page": "/products", "regex": "^/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/products(?:/)?$" }], "dynamic": [{ "page": "/admin/products/[id]", "regex": "^/admin/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/products/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/admin/products/[id]", "regex": "^/api/admin/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/products/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/blog/[id]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/blog/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/premium-preview/[id]", "regex": "^/premium\\-preview/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/premium\\-preview/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/preview/[id]", "regex": "^/preview/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/preview/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/products/[slug]", "regex": "^/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/products/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/api/:path*", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }, { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" }, { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }], "regex": "^/api(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/admin/products/new": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/products/new", "dataRoute": "/admin/products/new.rsc" }, "/admin/document": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/document", "dataRoute": "/admin/document.rsc" }, "/admin/document/new": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/document/new", "dataRoute": "/admin/document/new.rsc" }, "/admin/settings": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/settings", "dataRoute": "/admin/settings.rsc" }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc" }, "/admin/tools": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/tools", "dataRoute": "/admin/tools.rsc" }, "/cart": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/cart", "dataRoute": "/cart.rsc" }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc" }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc" }, "/products": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/products", "dataRoute": "/products.rsc" }, "/admin/cloud": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/cloud", "dataRoute": "/admin/cloud.rsc" }, "/help": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/help", "dataRoute": "/help.rsc" }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc" }, "/admin/orders": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/orders", "dataRoute": "/admin/orders.rsc" }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc" }, "/admin/changelog": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/changelog", "dataRoute": "/admin/changelog.rsc" }, "/privacy-polish": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy-polish", "dataRoute": "/privacy-polish.rsc" }, "/admin/products": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/products", "dataRoute": "/admin/products.rsc" } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "90524148336047e66d97b275610b2021", "previewModeSigningKey": "a40a640446e5175a9a07c66f7ff82bcf758b814ebcd7e2653687a526fd227241", "previewModeEncryptionKey": "07b0743740db8f240f6b857fc91e8a8c7ee51ae5af555485d7e08e2df15113e5" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(.json)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/login(.json)?[\\/#\\?]?$", "originalSource": "/login" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin\\/login(.json)?[\\/#\\?]?$", "originalSource": "/admin/login" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "89AFOqWRrLHNn2FgTPBnv", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "n2xT/NpEx7r5TYaVfBgdQteVAYjDVuNu/AfVFCQjA1I=", "__NEXT_PREVIEW_MODE_ID": "90524148336047e66d97b275610b2021", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "07b0743740db8f240f6b857fc91e8a8c7ee51ae5af555485d7e08e2df15113e5", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a40a640446e5175a9a07c66f7ff82bcf758b814ebcd7e2653687a526fd227241" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/(admin)/login/page": "/login", "/(public)/blog/[id]/page": "/blog/[id]", "/(public)/help/page": "/help", "/(public)/cart/page": "/cart", "/(public)/page": "/", "/(public)/premium-preview/[id]/page": "/premium-preview/[id]", "/(public)/preview/[id]/page": "/preview/[id]", "/(public)/products/[slug]/page": "/products/[slug]", "/(public)/products/page": "/products", "/api/d1-orders/route": "/api/d1-orders", "/(public)/about/page": "/about", "/(public)/blog/page": "/blog", "/(public)/privacy-polish/page": "/privacy-polish", "/api/admin/orders/route": "/api/admin/orders", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/admin/stats/route": "/api/admin/stats", "/api/auth/login/route": "/api/auth/login", "/api/public/products/route": "/api/public/products", "/api/admin/products/route": "/api/admin/products", "/api/admin/products/[id]/route": "/api/admin/products/[id]", "/(admin)/admin/changelog/page": "/admin/changelog", "/(admin)/admin/page": "/admin", "/(admin)/admin/cloud/page": "/admin/cloud", "/(admin)/admin/document/new/page": "/admin/document/new", "/(admin)/admin/orders/page": "/admin/orders", "/(admin)/admin/document/page": "/admin/document", "/(admin)/admin/products/[id]/page": "/admin/products/[id]", "/(admin)/admin/products/new/page": "/admin/products/new", "/(admin)/admin/products/page": "/admin/products", "/(admin)/admin/settings/page": "/admin/settings", "/(admin)/admin/tools/page": "/admin/tools" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/admin/orders": {}, "/api/auth/[...nextauth]": {}, "/api/auth/login": {}, "/api/public/products": {}, "/about": {}, "/blog": {}, "/privacy-polish": {}, "/api/admin/products/[id]": {}, "/api/admin/stats": {}, "/api/admin/products": {} } };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  const cacheKey = localizedPath === "/" ? "/index" : localizedPath;
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
