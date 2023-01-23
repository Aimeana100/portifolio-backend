"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cors = _interopRequireDefault(require("cors"));
var _dbConn = _interopRequireDefault(require("./config/dbConn"));
var _home = _interopRequireDefault(require("./routes/home"));
var _categories = _interopRequireDefault(require("./routes/api/categories"));
var _blogs = _interopRequireDefault(require("./routes/api/blogs"));
var _contacts = _interopRequireDefault(require("./routes/api/contacts"));
var _comments = _interopRequireDefault(require("./routes/api/comments"));
var _users = _interopRequireDefault(require("./routes/api/users"));
var _register = _interopRequireDefault(require("./routes/register"));
var _login = _interopRequireDefault(require("./routes/login"));
var _logout = _interopRequireDefault(require("./routes/logout"));
var _multer = _interopRequireDefault(require("./config/multer"));
var _documentantion = require("./documentantion");
var _corsOptions = _interopRequireDefault(require("./middleware/corsOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// routers

const app = (0, _express.default)();
(0, _dbConn.default)();

// Cross Origin Resource Sharing
app.use((0, _cors.default)(_corsOptions.default));

// middleware
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/', _home.default);
app.use('/api/auth/register', _register.default);
app.use('/api/auth/login', _login.default);
app.use('/api/auth/logout', _logout.default);
app.use('/api/categories', _categories.default);
app.use('/api/blogs', _multer.default.single('image'), _blogs.default);
app.use('/api/contacts', _contacts.default);
app.use('/api/comments', _comments.default);
app.use('/api/users', _users.default);
app.use(_documentantion.swaggerDocRouter);
app.all('*', (req, res) => {
  return res.status(404).json({
    "error": "404 Not Found"
  });
});

// Set `strictQuery` to `false` to prepare for the change
_mongoose.default.set('strictQuery', false);
_mongoose.default.connection.once('open', () => {
  console.log('Connected to MongoDB');
  const PORT = process.env.port || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});