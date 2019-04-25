module.exports = function(){


    this.getShorteneds = function(connection, callback){
        connection.query('SELECT * FROM shortened ORDER BY clicks DESC', callback);
    }

    this.getUrl = function(alias, connection, callback){
        connection.query('SELECT url FROM shortened WHERE alias = ?', alias, callback);
    }

    this.saveUrl = function(shorteneds, connection, callback){
        connection.query('INSERT INTO shortened SET ?', shorteneds, callback);
   
    }

    this.checkAlias = function(shorteneds, connection, callback){
        connection.query('SELECT * FROM shortened WHERE alias = ?', shorteneds.alias, callback);
    }

    this.addClick = function(alias, connection, callback){    
        connection.query("UPDATE shortened SET clicks = clicks+1 WHERE alias = ?", alias.alias, callback);
    }


    return this;

}