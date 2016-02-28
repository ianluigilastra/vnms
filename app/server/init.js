Meteor.startup(function () {
    var pwd = process.env.PWD1;
    UploadServer.init({
    tmpDir: pwd + '/public/tmp',
    uploadDir: pwd + '/public/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
        if(fileInfo.type.indexOf("image") > -1){
          return "newsfeed/img";
        }else{
          return "newsfeed/docs";
        }
    }
  })
});