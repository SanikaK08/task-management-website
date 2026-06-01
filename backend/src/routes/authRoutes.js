const express = require("express");
const { body } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

const {
  register,
  login,
  registerAdmin
} = require("../controllers/authController");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered
 */
router.post(
  "/register",
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  register
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

/**
 * @swagger
 * /api/v1/auth/register-admin:
 *   post:
 *     summary: Register admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Admin registered
 *       403:
 *         description: Invalid admin secret
 */
router.post(
  "/register-admin",
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('adminSecret').notEmpty().withMessage('Admin secret is required')
  ],
  validate,
  registerAdmin
);

module.exports = router;