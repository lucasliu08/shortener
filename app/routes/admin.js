module.exports = function(application){
    application.get('/shortener', function(req,res){
        res.render('admin/shortform');
    });

    application.post('/shortener/custom', function(req,res){                                        //encurta url com custom alias
        var shorteneds = req.body;                                                                  
        var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        shorteneds.alias = 'short/' + shorteneds.alias;
        shorteneds.url = shorteneds.url;
        getAlias = function(cb){
            shortenedModel.checkAlias(shorteneds, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    cb(rows);                   
                }
            });
        }
        
        getAlias(function(rows){                                                  //função feita para retornar um array de rows do banco caso ache algum
            if(rows.length == 0){                                                 
                shortenedModel.saveUrl(shorteneds,function(error, result){
                   shortenedModel.checkAlias(shorteneds,function(error, result){
                        var endTime = new Date() - startTime;
                        res.render('response/response', { shorteneds : result, time : endTime }); //renderiza a pagina response/response com variaveis auxiliares shorteneds e time
                    });                                                                           
                });
            }else{
                res.send('ErrorCode 001: CUSTOM ALIAS ALREADY EXISTS');                          //mostra pagina com erro codigo 001
            }
            
        });
    });
    application.post('/shortener/random', function(req,res){                                        //encurta url usando um gerador de alias random
        var shorteneds = req.body;
        var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        function makeid(length) {                                                                  //realiza a randomização utilizando os caracteres em "var possible"
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        shorteneds.alias = 'short/' + makeid(7);                                               //inclui a url padrao short/ e randomiza um alias de tamanho 7 

        getAlias = function(cb){
            shortenedModel.checkAlias(shorteneds, function(error, rows){
                if(error){
                    console.log(error);
                }else{
                    cb(rows);                   
                }
            });
        }
        
        getAlias(function(rows){                                                               //retorna um array de rows do banco caso ache algum
            if(rows.length == 0){
                shortenedModel.saveUrl(shorteneds,function(error, result){
                    shortenedModel.checkAlias(shorteneds,function(error, result){
                        var endTime = new Date() - startTime;
                        res.render('response/response', { shorteneds : result, time : endTime }); //renderiza a pagina response/response com variaveis auxiliares
                    });
                    
                });
            }else{
                res.send('ErrorCode 001: CUSTOM ALIAS ALREADY EXISTS');

            }
            
        });
        
        


     
           

    });
}
