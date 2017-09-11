var express = require('express');

var app =express();
var query = require('./utils')

app.get("/",function(req,res){
	res.send('hello express')
}).listen(2024,() => {
	console.log('hello word')
})

//书本信息
app.get('/book/:id',function(req,res){
	var id = req.params.id;
	query(`select * from booklist WHERE bookId=${id}`,(err, rows) => {
	    res.json({data:rows[0],success:true})
	})
})

//书本列表
app.get('/booklist',function(req,res){
	var type = req.query.type;
	if(type){
		if(type=="fan"){
			type="玄幻"
		}else if(type=="wan"){
			type="修真"
		}
		else if(type=="city"){
			type="都市"
		}
		else if(type=="ero"){
			type="言情"
		}
		query(`SELECT * FROM booklist WHERE type='${type}' ORDER BY ratings DESC`,(err, rows) => {
		    res.json({data:rows,success:true})
		})
	}else{
		query(`SELECT * FROM booklist ORDER BY ratings DESC`,(err, rows) => {
		    res.json({data:rows,success:true})
		})
	}
	
})

//书本章节&&章节内容
app.get('/books',function(req,res){
	var id = req.query.id;
	var chapter = req.query.chapter;
	if(chapter){
		//章节内容
		query(`select * from books WHERE bookId=${id} and chapterId=${chapter}`,(err, rows) => {
		    res.json({data:rows,success:true})
		})
	}else{
		//书本章节
		query(`select * from books WHERE bookId=${id} ORDER BY chapterId ASC`,(err, rows) => {
		    res.json({data:rows,success:true})
		})
	}
	
})
