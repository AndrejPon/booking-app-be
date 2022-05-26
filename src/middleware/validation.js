const validation = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).send({
      msg: 'Neteisingi duomenys. Patikrinkite įvesties laukus.',
    });
  }
};

module.exports = validation;
