module.exports = function(application){
  application.get('/retrieve', function(req,res){
      res.render('shorteneds/retrieve');
  });

  application.post('/retrieve/access', function(req,res){
    var alias = req.body;
   
    var connection = application.config.dbConnection();
    var shortenedModel = new application.app.models.ShortenedDAO(connection);



    function fetchUrl(alias, callback){
    	shortenedModel.checkAlias(alias, function(error, rows){
    		if(error){
          
    			callback(error, null);
    		}else{

          if(rows.length > 0){
      			shortenedModel.addClick(alias, function(error, result){

            });
      			callback(null, rows[0].url);
          }else{

            res.send('ERR_CODE: 002, Description:SHORTENED URL NOT FOUND');
          }
    		}

    	});
    }

   

    fetchUrl(alias, function(error, content){
      res.redirect('http://' + content);

    })
  });
      	
}
