module.exports = function(application){
    application.get('/shortener', function(req,res){
        res.render('admin/shortform');
    });

    application.post('/shortener/custom', function(req,res){
        var shorteneds = req.body;
        var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        shorteneds.alias = 'short.com/' + shorteneds.alias;

        getAlias = function(cb){
            shortenedModel.checkAlias(shorteneds, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    cb(rows);                   
                }
            });
        }
        
        getAlias(function(rows){
            if(rows.length == 0){
                shortenedModel.saveUrl(shorteneds,function(error, result){
                   shortenedModel.checkAlias(shorteneds,function(error, result){
                        var endTime = new Date() - startTime;
                        res.render('response/response', { shorteneds : result, time : endTime });
                    });
                });
            }else{
                res.send('ErrorCode 001: CUSTOM ALIAS ALREADY EXISTS');
            }
            
        });
    });
    application.post('/shortener/random', function(req,res){
        var shorteneds = req.body;
        var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        function makeid(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        shorteneds.alias = 'short.com/' + makeid(7);

        getAlias = function(cb){
            shortenedModel.checkAlias(shorteneds, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    cb(rows);                   
                }
            });
        }
        
        getAlias(function(rows){
            if(rows.length == 0){
                shortenedModel.saveUrl(shorteneds,function(error, result){
                    shortenedModel.checkAlias(shorteneds,function(error, result){
                        var endTime = new Date() - startTime;
                        res.render('response/response', { shorteneds : result, time : endTime });
                    });
                    
                });
            }else{
                res.send('ErrorCode 001: CUSTOM ALIAS ALREADY EXISTS');

            }
            
        });
        
        


     
           

    });
}
