const express = require('express');

const auth = require('../middleware/auth');

const newUser = require('../handlers/user/newUser');
const createUserGoogle = require('../handlers/user/createUserGoogle');
const checkUser = require('../handlers/user/checkUser');
const login = require('../handlers/user/login');
const googleLogin = require('../handlers/user/googleLogin');
const autoLogin = require('../handlers/user/autoLogin');
const forgotPassword = require('../handlers/user/forgotPassword');
const validateToken = require('../handlers/user/validateToken');
const resetPassword = require('../handlers/user/resetPassword');
const setPassword = require('../handlers/user/setPassword');
const changePassword = require('../handlers/user/changePassword');
const logout = require('../handlers/user/logout');
const logoutAll = require('../handlers/user/logoutAll');

const router = new express.Router();

router.post('/newUser', async (req, res) => {
  await newUser(req, res);
});

router.post('/createUserGoogle', async (req, res) => {
  await createUserGoogle(req, res);
});

router.post('/checkUser', async (req, res) => {
  await checkUser(req, res);
});

router.post('/login', async (req, res) => {
  await login(req, res);
});

router.post('/googleLogin', async (req, res) => {
  await googleLogin(req, res);
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

router.post('/setPassword', auth, async (req, res) => {
  await setPassword(req, res);
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
