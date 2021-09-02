/**
 * 
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {Function} next The callback function.
 */
 module.exports = async (req, res, next) => {
  try {
    console.log(req.params);
    res.json({});
  } catch (error) {
    next(error);
  }
};
