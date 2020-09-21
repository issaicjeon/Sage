"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var validateEmail_1 = __importDefault(require("./validateEmail"));
var app = express();
var port = 3500;
var User_1 = __importDefault(require("./User"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var users = new Array();
var userCount = 0;
app.post('/login', function (req, res) {
    console.log("login");
    var _a = req.body, username = _a.username, password = _a.password;
    var u = users.find(function (user) { return user.username === username; });
    if (u === undefined) {
        res.send({
            success: false,
            error: 'User does not exist'
        });
        return;
    }
    bcrypt.compare(password, u.password, function (err, result) {
        if (result) {
            res.send({
                success: true
            });
        }
        else {
            res.send({
                success: false,
                error: 'Password was incorrect'
            });
        }
    });
});
app.post('/register', function (req, res) {
    console.log("register");
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password, passwordConfirm = _a.passwordConfirm;
    if (password !== passwordConfirm) {
        res.send({
            success: false,
            error: 'Passwords do not match'
        });
        return;
    }
    if (!validateEmail_1.default(email)) {
        res.send({
            success: false,
            error: 'Invalid email address'
        });
        return;
    }
    if (users.find(function (user) { return user.email === email; })) {
        res.send({
            success: false,
            error: 'Account with that email already exists'
        });
        return;
    }
    if (users.find(function (user) { return user.username === username; })) {
        res.send({
            success: false,
            error: 'Account with that username already exists'
        });
        return;
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var user = new User_1.default(userCount.toString(), username, hash, email);
            users.push(user);
            userCount++;
            res.send({
                success: true
            });
            console.log(users);
        });
    });
});
app.listen(port, function () {
    console.log("Listening at port " + port);
});
