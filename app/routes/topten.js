module.exports = function(application){

    application.get('/topten', function(req,res){
    	var startTime = new Date();
        var connection = application.config.dbConnection();
        var shortenedModel = new application.app.models.ShortenedDAO(connection);

        shortenedModel.getShorteneds(function(error, result){
        	var endTime = new Date() - startTime;
            res.render('shorteneds/topten', { shorteneds : result, time : endTime });
        });
        
    });
}