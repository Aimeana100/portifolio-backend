"use strict";

var _express = _interopRequireDefault(require("express"));
var _dbConn = _interopRequireDefault(require("./config/dbConn"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _home = _interopRequireDefault(require("./routes/home"));
var _categories = _interopRequireDefault(require("./routes/api/categories"));
var _blogs = _interopRequireDefault(require("./routes/api//blogs"));
var _contacts = _interopRequireDefault(require("./routes/api/contacts"));
var _comments = _interopRequireDefault(require("./routes/api/comments"));
var _users = _interopRequireDefault(require("./routes/api/users"));
var _register = _interopRequireDefault(require("./routes/register"));
var _login = _interopRequireDefault(require("./routes/login"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// routers

const app = (0, _express.default)();
(0, _dbConn.default)();

// middleware
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/', _home.default);
app.use('/register', _register.default);
app.use('/auth', _login.default);
app.use('/categories', _categories.default);
app.use('/blogs', _blogs.default);
app.use('/contacts', _contacts.default);
app.use('/comments', _comments.default);
app.use('/users', _users.default);

// Set `strictQuery` to `false` to prepare for the change
_mongoose.default.set('strictQuery', false);
_mongoose.default.connection.once('open', () => {
  console.log('Connected to MongoDB');
  const PORT = process.env.port || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});