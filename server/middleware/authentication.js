const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: 'Unauthenticated' };
    }
    const payload = verifyToken(access_token);
    let user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      throw { name: 'Unauthenticated' };
    }
    req.additionalData = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication
