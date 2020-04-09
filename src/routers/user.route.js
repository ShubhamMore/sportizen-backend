const express = require('express');

const auth = require('../middleware/auth');

const newUser = require('../handlers/user/newUser');
const checkUser = require('../handlers/user/checkUser');
const login = require('../handlers/user/login');
const autoLogin = require('../handlers/user/autoLogin');
const forgotPassword = require('../handlers/user/forgotPassword');
const validateToken = require('../handlers/user/validateToken');
const resetPassword = require('../handlers/user/resetPassword');
const changePassword = require('../handlers/user/changePassword');
const logout = require('../handlers/user/logout');
const logoutAll = require('../handlers/user/logoutAll');

const router = new express.Router();

router.post('/newUser', async (req, res) => {
  await newUser(req, res);
});

router.post('/checkUser', async (req, res) => {
  await checkUser(req, res);
});

router.post('/login', async (req, res) => {
  await login(req, res);
});

router.post('/autoLogin', auth, async (req, res) => {
  await autoLogin(req, res);
});

router.post('/forgotPassword', async (req, res) => {
  await forgotPassword(req, res);
});

router.post('/validateToken', async (req, res) => {
  await validateToken(req, res);
});

router.post('/resetPassword', async (req, res) => {
  await resetPassword(req, res);
});

router.post('/changePassword', auth, async (req, res) => {
  await changePassword(req, res);
});

router.post('/logout', auth, async (req, res) => {
  await logout(req, res);
});

router.post('/logoutAll', auth, async (req, res) => {
  await logoutAll(req, res);
});

module.exports = router;
