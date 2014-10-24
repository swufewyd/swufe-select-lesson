/*
 * GET lesson listing.
 */

var async = require('async');
//mysql
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'swufe',
    port: 3306,
    multipleStatements: true
});
//redis
var redis = require("redis");
var client = redis.createClient(6379, '127.0.0.1', {});

// var UsersModel = require("./../models").Users;
var path = require('path');

//分页查询课程
exports.getLessonsGroupByCode = function (req,res) {
	var offset = 10;
	var currentPage = req.body.currentPage*offset;
	if(req.body.search){
		var searchObj = {};
		if(typeof(req.body.search.searchLesson)!='undefined'){
			searchObj.searchLesson = req.body.search.searchLesson;
		}else{
			searchObj.searchLesson = "";
		}
		if(typeof(req.body.search.searchTeacher)!='undefined'){
			searchObj.searchTeacher = req.body.search.searchTeacher;
		}else{
			searchObj.searchTeacher = "";
		}
		var sql_getLessonName = "select DISTINCT name as lesson_name from lessons where name like '%"+searchObj.searchLesson+"%' and teacher like '%"+searchObj.searchTeacher+"%' order by code limit "+currentPage+","+offset;
	}else{
		var sql_getLessonName = 'select DISTINCT name as lesson_name from lessons order by code limit '+currentPage+','+offset;
	}



	async.waterfall([
	    function(callback){
	    	conn.query(sql_getLessonName, function(err, rows, fields) {
	    	    if (err) throw err;

	    	    callback(err, rows);
	    	});


	    },
	    function(resultData, callback){
	    	var sql_getTeacherInfo = '';
	    	for(i=0;i<resultData.length;i++){
	    		sql_getTeacherInfo += "select property,academy,score,teacher as teacher_name,group_concat(distinct time order by time separator '|||') as time from lessons where name='"+resultData[i].lesson_name+"' group by teacher;";
	    	}
	    	// console.log(sql_getTeacherInfo);
	    	conn.query(sql_getTeacherInfo, function(err, rows, fields) {
	    	    if (err) throw err;
	    	    /*for(j=0;j<resultData.length;j++){
	    	    	//如果某课程只有一个老师开讲，注意teacher_info只有一个元素但必须被数组包裹，这样前端的ng-repeat才不会报错
	    	    	if(rows.length==1){
	    	    		resultData[j].teacher_info=[];
	    	    		resultData[j].teacher_info[0] = rows[j];
	    	    	}else{
	    	    		if(resultData.length==1){//搜索结果只有一门课
	    	    			resultData[j].teacher_info = rows;
	    	    		}else{
	    	    			resultData[j].teacher_info = rows[j];
	    	    		}

	    	    	}

	    	    }*/
	    	    for(j=0;j<resultData.length;j++){
	    	    	resultData[j].teacher_info = rows[j];
	    	    }
	    	    callback(err, resultData);
	    	});
	    }/*,
	    function(arg1, callback){
	        // arg1 now equals 'three'
	        callback(null, 'done');
	    }*/
	], function (err, result) {
	   // result now equals 'done'
	   console.log(result);
	   res.json({"result":result});
	});
};