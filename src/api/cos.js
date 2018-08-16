var cos = new COS({
    getAuthorization: function (options,callback) {
          var method = (options.Method || 'get').toLowerCase();
          var key = options.Key || '';
          var query = options.Query || {};
          var headers = options.Headers || {};
          var pathname = key.indexOf('/') === 0 ? key : '/' + key;
          // var url = 'http://127.0.0.1:3000/sts-auth';
          var url = 'getFileAuthorization';
          var xhr = new XMLHttpRequest();
          var data = {
              method: method,
              pathname: pathname,
              query: query,
              headers: headers,
          };
          xhr.open('POST', url, true);
          xhr.setRequestHeader('content-type', 'application/json');
          xhr.onload = function (e) {
              try {
                  var AuthData = JSON.parse(e.target.responseText);
              } catch (e) {
              }
              callback({
                  Authorization: AuthData.Authorization,
                  XCosSecurityToken: AuthData.XCosSecurityToken,
              });
          };
//          xhr.onload = function (e) {
//              try {
//                  var Authorization = e.target.responseText;
//              } catch (e) {
//              }
//              callback(Authorization);
//          };
          xhr.send(JSON.stringify(data));
    }
});

//暂停任务
function pauseTask(taskId) {
    cos.pauseTask(taskId);
}

//开始任务
function restartTask(taskId) {
    cos.restartTask(taskId);
}

//上传文件
function selectFile(ev) {
	var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function (e) {
        var file = this.files[0]
        if (file) {
        	 	
        	var progressId = ++id;
        	
            if (file.size > 100 * 1024 * 1024) {
                cos.sliceUploadFile({
                    Bucket: config.Bucket, 
                    Region: config.Region,
                    Key: file.name,
                    Body: file,
                    TaskReady: function (tid) {
                    	taskId = tid;
                        appendUploadFile(file.name, progressId, file.size);
                        
                    },
                    onHashProgress: function (progressData) {
                        //console.log('onHashProgress', JSON.stringify(progressData));
                    },
                    onProgress: function (progressData) {
                    	console.log('onProgress', JSON.stringify(progressData));
                    	$("#progress" + progressId).css("width", parseInt(progressData.percent * 10000) / 100 + "%");
                    }
                }, function (err, data) {
                    console.log(err || data);
                });
            } else {
                cos.putObject({
                    Bucket: config.Bucket,
                    Region: config.Region,
                    Key: file.name,
                    Body: file,
                    TaskReady: function (tid) {
                        TaskId = tid;
                        appendUploadFile(file.name, progressId, file.size);                    
                    },
                    onProgress: function (progressData) {
                        //console.log(JSON.stringify(progressData));
                        $("#progress" + progressId).css("width", parseInt(progressData.percent * 10000) / 100 + "%");
                    }
                }, function (err, data) {
                    console.log(err || data);
                });
            }
        }
    };
    input.click();
}

//上传文件夹（暂时不用）
function selectFolder(ev) {
	var input = document.createElement('input');
	input.multiple = "multiple";
	input.webkitdirectory = "webkitdirectory";	
	
    input.type = 'file';
    input.onchange = function (e) {
        var tfiles = this.files;
        var files = new Array();
        var progressId = ++id;
        var totalSize = 0;
        
        if (tfiles) {
    		for(i = 0,len=tfiles.length; i < len; i++) {
    			files.push({
					Bucket: config.Bucket,
					Region: config.Region,
					Key: tfiles[i].webkitRelativePath,
					Body: tfiles[i]
	          	});
	    		totalSize += tfiles[i].size;
    		}
	    	
	    	var absolutePathName = tfiles[0].webkitRelativePath;
	    	var folder = absolutePathName.substring(0, absolutePathName.indexOf('/'));
	    	
	    	appendUploadFile(folder + "文件夹", progressId, totalSize);
	    	
        	cos.uploadFiles({
                files: files,
                SliceSize: 1024 * 1024,
                onProgress: function (info) {
                    $("#progress" + progressId).css("width", parseInt(info.percent * 100) + "%");
                },
                onFileFinish: function (err, data, options) {
                    //console.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
                    console.log("success data" + data + "options " + options);
                }
            }, function (err, data) {
                console.log(err || data);
            });
        }
    };
    input.click();
}


