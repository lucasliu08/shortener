function ShortenedDAO(connection){
    this._connection = connection;
}

ShortenedDAO.prototype.getShorteneds = function(callback){
    this._connection.query('SELECT * FROM shortened ORDER BY clicks DESC', callback);
}

ShortenedDAO.prototype.getUrl = function(alias, callback){
    this._connection.query('SELECT url FROM shortened WHERE alias = ?', alias, callback);
}

ShortenedDAO.prototype.saveUrl = function(shorteneds, callback){
    this._connection.query('INSERT INTO shortened SET ?', shorteneds, callback);	

}

ShortenedDAO.prototype.checkAlias = function(shorteneds, callback){
	this._connection.query('SELECT * FROM shortened WHERE alias = ?', shorteneds.alias, callback);

}
ShortenedDAO.prototype.addClick = function(alias, callback){
    this._connection.query('UPDATE shortened SET clicks = clicks+1 WHERE alias = ?', alias.alias, callback);
}

module.exports = function(){
    return ShortenedDAO;
}
