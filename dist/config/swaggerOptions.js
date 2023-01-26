"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _contacts = _interopRequireDefault(require("../documentantion/contacts"));
var _categories = _interopRequireDefault(require("../documentantion/categories"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let constant = {
  info: {
    title: "Anathole'sPortifolio API Documentation",
    description: "Anathole'sPortifolio API Documentation",
    version: "1.0.0"
  }
};
let servers = [{
  url: "http://127.0.0.1:5000/"
}];
const contacts = {
  definition: {
    openapi: "3.0.0",
    constant,
    servers: servers,
    paths: _objectSpread({}, _contacts.default)
  },
  apis: ["./api-docs/"]
};
const categories = {
  definition: {
    openapi: "3.0.0",
    constant,
    servers: servers,
    paths: _objectSpread({}, _categories.default)
  },
  apis: ["./api-docs/"]
};
var _default = {
  contacts,
  categories
};
exports.default = _default;