const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.user_id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: 3000 });
  res.json({ message: 'Đăng nhập Facebook thành công!', token });
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }, ));


router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.user_id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: 3000 });
    res.json({
      message: "Đăng nhập Google thành công!",
      token
    });
  }
);



module.exports = router;