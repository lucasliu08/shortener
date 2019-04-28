module.exports = function(application){

    application.get('/topten', function(req,res){                                    //faz a tabela de top 10
    	var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        shortenedModel.getShorteneds(function(error, result){
        	
        	if(result.length < 9){
                var endTime = new Date() - startTime;
        		res.render('shorteneds/topten', { shorteneds : result, time : endTime, max : result.length });
        	}else{
                var endTime = new Date() - startTime;
        		res.render('shorteneds/topten', { shorteneds : result, time : endTime, max : 10 });
        	}
            
        });
        
    });
}