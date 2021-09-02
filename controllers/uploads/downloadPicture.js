const fs = require('fs');
const path = require('path');
/**
 * 
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {Function} next The callback function.
 */
 module.exports = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = `uploads/${filename}`;
    const file = fs.createReadStream(filePath);

    file.pipe(res);
  } catch (error) {
    next(error);
  }
};
