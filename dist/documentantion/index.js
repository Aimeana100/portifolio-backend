"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerDocRouter = void 0;
var _schemas = _interopRequireDefault(require("./schema/schemas"));
var _blogs = _interopRequireDefault(require("./blogs"));
var _auth = _interopRequireDefault(require("./auth"));
var _user = _interopRequireDefault(require("./user"));
var _categories = _interopRequireDefault(require("./categories"));
var _comments = _interopRequireDefault(require("./comments"));
var _contacts = _interopRequireDefault(require("./contacts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const {
  Router
} = require("express");
const {
  serve,
  setup
} = require("swagger-ui-express");
const swaggerDocRouter = Router();
exports.swaggerDocRouter = swaggerDocRouter;
const options = {
  openapi: "3.0.3",
  info: {
    title: "Anathole's portifolio  API documentation ",
    version: "1.0.0",
    description: "The API documentation of all end-points of the Anathole's portifolio build with node.js"
  },
  api: "http://localhost:5000/",
  security: [{
    bearerAuth: []
  }],
  tags: [{
    name: "Contacts",
    description: "contacts | queries"
  },
  // { name: "Users", description: "Users" },
  {
    name: "Categories",
    description: "blog categories"
  }, {
    name: "Blogs",
    description: "Blogs | articles"
  }, {
    name: "Comments",
    description: "blog comments"
  }],
  paths: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _auth.default), _categories.default), _blogs.default), _comments.default), _contacts.default),
  components: {
    schemas: _schemas.default,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};
swaggerDocRouter.use("/api-docs", serve, setup(options));