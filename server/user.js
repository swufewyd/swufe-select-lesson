/*
 * GET users listing.
 */
//md5
var crypto = require('crypto');

//mysql
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'swufe',
    port: 3306
});
//redis
var redis = require("redis");
var client = redis.createClient(6379, '127.0.0.1', {});

// var UsersModel = require("./../models").Users;
var path = require('path');

exports.checkSession = function (req,res) {

    client.hgetall(req.sessionID, function (err, obj) {
        if(obj!=null){
            obj.isLogin="1";
            res.json(obj);
        }else{
            res.json({"isLogin":"0"});
        }
    });

};

exports.login = function (req, res) {

    client.on("error", function (err) {
        console.log("Error " + err);
    });
    console.log(req.body.loginData);
    var username = req.body.loginData.username;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.loginData.password).digest('hex');

    var sql = 'select * from user where username='+conn.escape(username)+' and password='+conn.escape(password);
    conn.query(sql, function(err, rows, fields) {
        if (err) throw err;


        if(rows.length){
            client.hmset(req.sessionID, rows[0]);
            res.json(rows[0]);
        }else{
            res.send(404);
            res.send('mimacuowu');
        }

    });
};

exports.logout = function (req, res) {
    client.del(req.sessionID, function() {
        console.log('session del done!');
        res.json({"sessionDel":"1"});
    });
};

exports.checkUserExist = function (req, res) {
    var username = req.body.username;
    var sql = 'select * from user where username='+conn.escape(username);
    conn.query(sql, function(err, rows, fields) {
        if (err) throw err;

        console.log(sql);
        console.log(rows);
        if(rows.length){
            res.json({"isUnique":false});
        }else{
            res.json({"isUnique":true});
        }
        // res.send('reg ok');
    });
};

exports.reg = function (req, res) {
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    var username = req.body.regData.username;
    var email = req.body.regData.email;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.regData.password).digest('hex');
    var sql = 'insert into user(username,password,email) values('+conn.escape(username)+','+conn.escape(password)+','+conn.escape(email)+')';

    conn.query(sql, function(err, rows, fields) {
        if (err) throw err;

        console.log(sql);
        res.send('reg ok');
    });
};

//带邀请码的注册
exports.regInvite = function (req, res) {
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    var username = req.body.regData.username;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.regData.password).digest('hex');
    var invitecode = req.body.regData.invitecode;
    var sql_valid = "select * from invite_code where code ='"+invitecode+"' and valid=1";
    // console.log(sql_valid);

    var userData = {};
    userData.username = username;
    userData.password = password;
    userData.invitecode = invitecode;

    conn.query(sql_valid, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows);
        if(rows.length>0){
            var sql = 'insert into user(username,password,invite_code) values('+conn.escape(username)+','+conn.escape(password)+','+conn.escape(invitecode)+')';
            conn.query(sql, function(err2, rows2, fields2) {
                if (err2) throw err2;
                if(rows2.insertId){
                    client.hmset(req.sessionID, userData);
                    // res.json(rows[0]);

                    res.json({"key":true,"msg":"注册成功,已自动登录！"});
                }
            });
        }else{
            res.json({"key":false,"msg":"邀请码无效"});
        }

    });



};