set HTTP_PROXY=http://mwgmn01.ap.vishayint.com@172.18.20.101:8080
set PWD1=/home/CORP/svc_webgroup/sites/www.vishay.com/www.vishay.com
set HTTP_PROXY=http://mwgmn01.ap.vishayint.com@172.18.20.101:8080
set ROOT_URL=http://localhost:1964/
set ROOT_URL=http://localhost:1964/
set MAIL_URL=smtp://hubmv01.corp.vishayint.com:25/
REM MONGO_URL=mongodb://website:p3R#Seu~@lxmv97.corp.vishayint.com:27017/rev?authSource=admin
set MONGO_URL=mongodb://localhost:27017/test?authSource=admin

meteor --port=1964 --verbose  run
