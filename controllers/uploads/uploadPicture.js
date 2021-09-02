/**
 * 
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {Function} next The callback function.
 */
 module.exports = async (req, res, next) => {
  try {
    const userId = '2';
    const pictureUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${userId}/${req.file.filename}`;

    res.json({
      message: 'Picture upload successful.',
      picture_url: pictureUrl
    });
  } catch (error) {
    next(error);
  }
};
