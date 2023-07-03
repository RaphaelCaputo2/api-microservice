const Joi = require('joi');

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
    } else {
        next();
    }
};

module.exports = {
    validateUser
};