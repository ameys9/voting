// middleware.js
const exampleMiddleware = (req, res, next) => {
  console.log('Example middleware executed');
  next(); // Call next to pass control to the next middleware or route handler
};

module.exports = exampleMiddleware;
