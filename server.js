// var fs = require("fs");  
// var http = require("http");  
// var url = require("url");  
// var path = require("path");  
  
// var rootPath = "./static";  
  
// //mime 文件，用来做mine类型匹配的。网上能下载  
// var mineJSON = require("./mime.json");  
  
// var server = http.createServer(function(req,res){     
      
//      var reqPath = url.parse(req.url,true).pathname;  
       
//      if(reqPath == "/favicon.ico") return ;  
       
//      var extname = path.extname(reqPath);  
       
      
//      var mineType = mineJSON[extname];  
//      console.log(mineType);  
          
//      if(reqPath == "/") reqPath = "/index.html";  
       
//      var targetPath = rootPath + reqPath;  
       
      
//      fs.readFile(targetPath,function(err,data){  
//         if(err) {  
//             //throw err;  
//             //return 404page  
//             fs.readFile(rootPath + "/404.html",function(err,data){  
//                 res.writeHead(200,{"Context-Type":"text/html;charset=UTF-8"});  
//                 res.end(data);  
//             });  
//         } else {  
//             res.writeHead(200,{"Context-Type":""+mineType+";charset=UTF-8"});  
//             res.end(data);  
//         }  
          
//      });  
       
// });  
  
// server.listen(3000,"127.0.0.1"); 
var express = require("express");
var app = express();
app.use("/",express.static(__dirname + "/dist"));
app.listen(3000);