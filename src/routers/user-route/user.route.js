const express = require('express');

const userAuth = require('../../middleware/user-auth');

const newUser = require('../../controllers/user-controller/newUser');
const createUserGoogle = require('../../controllers/user-controller/createUserGoogle');
const checkUser = require('../../controllers/user-controller/checkUser');
const login = require('../../controllers/user-controller/login');
const googleLogin = require('../../controllers/user-controller/googleLogin');
const autoLogin = require('../../controllers/user-controller/autoLogin');
const forgotPassword = require('../../controllers/user-controller/forgotPassword');
const validateToken = require('../../controllers/user-controller/validateToken');
const resetPassword = require('../../controllers/user-controller/resetPassword');
const setPassword = require('../../controllers/user-controller/setPassword');
const changePassword = require('../../controllers/user-controller/changePassword');
const logout = require('../../controllers/user-controller/logout');
const logoutAll = require('../../controllers/user-controller/logoutAll');

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

router.post('/autoLogin', userAuth, async (req, res) => {
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

router.post('/setPassword', userAuth, async (req, res) => {
  await setPassword(req, res);
});

router.post('/changePassword', userAuth, async (req, res) => {
  await changePassword(req, res);
});

router.post('/logout', userAuth, async (req, res) => {
  await logout(req, res);
});

router.post('/logoutAll', userAuth, async (req, res) => {
  await logoutAll(req, res);
});

module.exports = router;
