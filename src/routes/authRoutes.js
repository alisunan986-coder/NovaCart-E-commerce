const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Validation runner
const validate = (validations) => async (req, res, next) => {
	for (const validation of validations) {
		const result = await validation.run(req);
		if (result.errors.length) break;
	}
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post(
	'/register',
	validate([
		check('name').trim().notEmpty().withMessage('Name is required'),
		check('email').isEmail().withMessage('Valid email is required'),
		check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	]),
	registerUser
);

router.post(
	'/login',
	validate([
		check('email').isEmail().withMessage('Valid email is required'),
		check('password').exists().withMessage('Password is required'),
	]),
	loginUser
);

module.exports = router;