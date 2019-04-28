function ShortenedDAO(connection){
    this._connection = connection;
}

ShortenedDAO.prototype.getShorteneds = function(callback){                            //busca no table do banco toda data e retorna em ordem decrescente por clicks
    this._connection.query('SELECT * FROM shortened ORDER BY clicks DESC', callback);
}


ShortenedDAO.prototype.saveUrl = function(shorteneds, callback){						//insere url e alias novo no banco
    this._connection.query('INSERT INTO shortened SET ?', shorteneds, callback);	

}

ShortenedDAO.prototype.checkAlias = function(shorteneds, callback){						//checa se a alias é unica no banco e retorna a mesma caso nao seja unica
	this._connection.query('SELECT * FROM shortened WHERE alias = ?', shorteneds.alias, callback);

}
ShortenedDAO.prototype.addClick = function(alias, callback){							//adiciona um click a url, utilizado na tabela de top 10
    this._connection.query('UPDATE shortened SET clicks = clicks+1 WHERE alias = ?', alias.alias, callback);
}

module.exports = function(){
    return ShortenedDAO;
}
