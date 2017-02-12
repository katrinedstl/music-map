const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV === 'development';
let port = isDeveloping ? 8000 : process.env.PORT;
if (!port) port = 8000;

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname + 'app/assets')));

const http = require('http').Server(app);

require('./server/socket').listen(http);

http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

if(isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        hot: true,
        contentBase: '/public/',
        stats: { 
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(function (req, res, next) {
        if (req.header('x-forwarded-proto') == 'http') {
            http.get('*',function(req,res){  
                res.redirect('https://' + req.headers['host']+req.url)
            })
        }
        next()
    })
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
}