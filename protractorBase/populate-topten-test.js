describe ('top10 test', function(){
    beforeEach(function(){
    	browser.ignoreSynchronization = true;
    	browser.waitForAngularEnabled(false);
    	browser.get('http://192.168.1.106:3000/');
    })
    
   it('popular top10', function(done){
        var linksparapopular = ['www.youtube.com', 'www.facebook.com','learn.freecodecamp.org', 'github.com/bemobi/hire.me', 
                                'bemobi.com', 'www.udemy.com', 'stackoverflow.com/'];
        var aliasparapopular = ['vid', 'nsa', 'ogcollege', 'bemobi', 'emp', 'learn', 'ST4ck'];
        for (var i = 0; i < 7; i++) {
            element(by.id('button1')).click();
            element(by.id('urlcustom')).sendKeys(linksparapopular[i]);
            element(by.id('alias')).sendKeys(aliasparapopular[i]);
            element(by.id('button-submit1')).click();
            element(by.id('cancel-button')).click();

        }
           
        done();
    })

    it('adicionar clicks', function(done){
        var aliasparapopular = ['short/gog', 'short/vid', 'short/nsa', 'short/ogcollege', 'short/bemobi',
                                 'short/emp', 'short/learn', 'short/ST4ck'];
        
        for (var i = 0; i < 8; i++) {
            var clicks = Math.floor((Math.random() * 10) + 1);
            for (var j = 0; j < clicks; j++) {
                
                element(by.id('button2')).click();
                element(by.id('alias')).sendKeys(aliasparapopular[i]);
                element(by.id('button-submit')).click();
                browser.get('http://192.168.1.106:3000/');    
                
            }
        }
        done();

    })

    it('ver tabela', function(){

        element(by.id('button3')).click();
        browser.driver.sleep(5000);
    })
})