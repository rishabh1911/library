var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');


var app = express();

//morgan used to console log all web traffic logs
app.use(morgan('tiny'));
//use static files in public folder
app.use(express.static(path.join(__dirname,'public')));
//to avoid copy paste of js and css files we can give commands for alternate paths.
app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/jquery/dist')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/popper/dist')));




// express is used to route requests
app.get('/',function(request, response){
    //we need to send fully qualified path of file
    // using __dirname, which gives location of current executable. we can 
    //use a kind of relative path but this has issue between platforms
    // of mac and windows so we use path
    response.sendFile(path.join(__dirname,"views","index.html"));
}); 


//now we can run app using command: node app.js
// this command only runs the js file
//thus understand express is just another js file.
app.listen(3000,function() {
    //two ways of using chalk
    //console.log(`listening on ${chalk.red('port: ')} `+chalk.green(3000));

    //better not to use console.log() but use debug.
    debug(`listening on ${chalk.red('port: ')} ${chalk.green('3000')}`);
    //now run app using: DEBUG=app node app.js
});
