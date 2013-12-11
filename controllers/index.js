'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        
        var model = { name: 'books' };
        
        res.render('index', model);
        
    });

};
