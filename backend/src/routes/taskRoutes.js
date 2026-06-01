const express = require("express");
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description: Task created
 */
// User/Admin
router.post(
  "/",
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required').escape(),
    body('description').optional().trim().escape(),
    body('status').optional().isIn(['pending','in-progress','completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low','medium','high']).withMessage('Invalid priority')
  ],
  validate,
  createTask
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", auth, getTasks);

router.get("/:id", auth, getTaskById);

router.put(
  "/:id",
  auth,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').escape(),
    body('description').optional().trim().escape(),
    body('status').optional().isIn(['pending','in-progress','completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low','medium','high']).withMessage('Invalid priority')
  ],
  validate,
  updateTask
);

// Admin only
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteTask
);

module.exports = router;