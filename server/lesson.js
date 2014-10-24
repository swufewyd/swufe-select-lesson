/*
 * GET lesson listing.
 */


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

exports.getAllLessons = function (req,res) {
	var sql = 'select * from lessons';
	conn.query(sql, function(err, rows, fields) {
	    if (err) throw err;

	    /*console.log(sql);
	    console.log(rows);*/
	    if(rows.length){
	        res.json({"lessons":rows});
	    }else{

	    }
	    // res.send('reg ok');
	});
};

//查询课程总数
exports.getLessonsAmount = function (req,res) {


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
		var sql = "select count(*) as total from(select distinct name from lessons where name like '%"+searchObj.searchLesson+"%' and teacher like '%"+searchObj.searchTeacher+"%')L";
	}else{
		var sql = 'select count(*) as total from(select distinct name from lessons)L';
	}

	conn.query(sql, function(err, rows, fields) {
	    if (err) throw err;

	    /*console.log(sql);
	    console.log(rows);*/
	    if(rows.length){
	        res.json({"lessonsAmount":rows});
	    }else{

	    }
	    // res.send('reg ok');
	});
};

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
		var sql = "select DISTINCT name from lessons where name like '%"+searchObj.searchLesson+"%' and teacher like '%"+searchObj.searchTeacher+"%' order by code limit "+currentPage+","+offset;
	}else{
		var sql = 'select DISTINCT name from lessons order by code limit '+currentPage+','+offset;
	}

	// console.log(sql);return
	conn.query(sql, function(err, rows, fields) {
	    if (err) throw err;


	    // console.log(rows);
	    if(rows.length){
	    	var sql_multiple = '';
	    	for(i=0;i<rows.length;i++){
	    		sql_multiple += "select property,academy,score,teacher as teacher_name,group_concat(distinct time order by time separator '|||') as time from lessons where name='"+rows[i].name+"' group by teacher;";
	    	}
	    	// console.log(sql_multiple);

	        conn.query(sql_multiple, function(err2, rows2, fields2) {
	        	if (err2) throw err2;

	        	for(j=0;j<rows.length;j++){
	        		//如果某课程只有一个老师开讲，注意teacher_info只有一个元素但必须被数组包裹，这样前端的ng-repeat才不会报错
	        		if(rows2.length==1){
	        			rows[j].teacher_info=[];
	        			rows[j].teacher_info[0] = rows2[j];
	        		}else{
	        			if(rows.length==1){//搜索结果只有一门课
	        				rows[j].teacher_info = rows2;
	        			}else{
	        				rows[j].teacher_info = rows2[j];
	        			}

	        		}

	        	}
	        	var sql_multiple_comments = '';
	        	for(i=0;i<rows.length;i++){
	        		for(j=0;j<rows[i].teacher_info.length;j++){
	        			sql_multiple_comments += "select user_from,time,content from comments_lesson where lesson='"+rows[i].name+"' and teacher='"+rows[i].teacher_info[j].teacher_name+"';";
	        		}
	        	}
	        	// console.log(sql_multiple_comments);return
	        	conn.query(sql_multiple_comments, function(err3, rows3, fields3) {
	        		if (err3) throw err3;
	        		console.log(sql_multiple_comments);
	        		console.log(rows3);
	        		/*console.log(rows3);
	        		console.log(rows3.length);*/
	        		/*for(i=0;i<rows.length;i++){
	        			var tmp=[];
	        			tmp.push(rows3[i][j])

	        			for(j=0;j<rows[i].teacher_info.length;j++){

	        				rows[i].teacher_info[j].comments = rows3[i]
	        			}
	        		}*/
	        		var k = 0;
	        		if(rows3.length==0){//该页只有一个课程，且没有评论
	        			rows[0].teacher_info[0].comments = [];
	        		}else if(rows.length==1){//该页只有一个课程，有评论
						rows[0].teacher_info[0].comments = [];
						for(j=0;j<rows3.length;j++){

							rows[0].teacher_info[0].comments[j] = rows3[k];
							k++;
						}
	        		}else{
	        			for(i=0;i<rows.length;i++){
	        				for(j=0;j<rows[i].teacher_info.length;j++){

	        					rows[i].teacher_info[j].comments = rows3[k];
	        					k++;
	        				}
	        			}
	        		}

	        		// console.log(rows3);
	        		//批量获取赞的数量
	        		var sql_multiple_praise = '';
	        		for(i=0;i<rows.length;i++){
	        			for(j=0;j<rows[i].teacher_info.length;j++){
	        				sql_multiple_praise += "select count(*) as praise_amount from  lesson_praise_line where header_id = (select id from lesson_praise_header where lesson_name ='"+rows[i].name+"' and teacher_name ='"+rows[i].teacher_info[j].teacher_name+"');";
	        			}
	        		}
	        		conn.query(sql_multiple_praise, function(err4, rows4, fields4) {
	        			if (err4) throw err4;
	        			/*console.log(rows4);
	        			console.log(rows4.length);*/
	        			var q = 0;
	        			if(rows4.length==1){
	        				for(i=0;i<rows.length;i++){
	        					for(j=0;j<rows[i].teacher_info.length;j++){
	        						rows[i].teacher_info[j].praise = rows4[q].praise_amount;
	        						q++;
	        					}
	        				}
	        			}else{
	        				for(i=0;i<rows.length;i++){
	        					for(j=0;j<rows[i].teacher_info.length;j++){
	        						rows[i].teacher_info[j].praise = rows4[q][0].praise_amount;
	        						q++;
	        					}
	        				}
	        			}


	        			res.json({"lessons":rows});
	        		});




	        	});


	        });

	    }else{

	    }
	    // res.send('reg ok');
	});
};

//提交评论
exports.submitComment = function (req,res) {
	var lesson = req.body.lesson;
	var teacher = req.body.teacher;
	var content = req.body.content;
	var user_from = req.body.user_id;
	var user_to = '';

	var time = Date.parse(new Date());
	var sql = "insert into comments_lesson(lesson,teacher,user_from,user_to,time,content) values('"+lesson+"','"+teacher+"','"+user_from+"','"+user_to+"',"+time+",'"+content+"')";
	console.log(sql);
	conn.query(sql, function(err, rows, fields) {
	    if (err) throw err;

	    res.json({"msg":"评论成功"});
	});

};

//赞课程
exports.praiseLesson = function (req,res) {
	var lesson = req.body.lesson;
	var teacher = req.body.teacher;
	var user_id = req.body.user_id;
	var sql = "select * from lesson_praise_header where lesson_name='"+lesson+"' and teacher_name='"+teacher+"'";
	conn.query(sql, function(err0, rows0, fields0) {
	    if (err0) throw err0;

	    if(rows0.length>0){
	    	var header_id = rows0[0].id;
	    	var sql_unique = "select * from lesson_praise_line where user_id='"+user_id+"' and header_id="+header_id;
	    	conn.query(sql_unique, function(err3, rows3, fields3) {
	    		if (err3) throw err3;
	    		if(rows3.length>0){
	    			res.json({"msg":"不能重复赞同一个老师！","key":false});
	    		}else{
	    			var sql_line = "insert into lesson_praise_line(user_id,header_id) values('"+user_id+"','"+header_id+"')";
	    			conn.query(sql_line, function(err2, rows2, fields2) {
	    				if (err2) throw err2;
	    				res.json({"msg":"已赞","key":true});
	    			});
	    		}
	    	});



	    }else{
	    	var sql_header = "insert into lesson_praise_header(lesson_name,teacher_name) values('"+lesson+"','"+teacher+"')";

	    	conn.query(sql_header, function(err, rows, fields) {
	    	    if (err) throw err;

	    	    var header_id = rows.insertId;
	    	    var sql_line = "insert into lesson_praise_line(user_id,header_id) values('"+user_id+"','"+header_id+"')";
	    	    conn.query(sql_line, function(err2, rows2, fields2) {
	    	    	if (err2) throw err2;
	    	    	res.json({"msg":"已赞","key":true});
	    	    });

	    	});
	    }

	});

};