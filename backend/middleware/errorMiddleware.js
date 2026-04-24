const notFound = (req, res, next) => {
  res.status(404);
  throw new Error("Route Not Found");
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: process.env.NODE_ENV === 'production' && statusCode === 500 ? 'Internal Server Error' : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
