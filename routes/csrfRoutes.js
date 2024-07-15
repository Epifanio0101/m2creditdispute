const express = require('express');
const router = express.Router();

// CSRF token route
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
