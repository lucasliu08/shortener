describe ('retriever test', function(){
    beforeEach(function(){
    	browser.ignoreSynchronization = true;
    	browser.waitForAngularEnabled(false);
    	browser.get('http://192.168.1.106:3000/');
    })
    
    it('encurtar url', function(){
        element(by.id('button1')).click();
        element(by.id('urlcustom')).sendKeys('www.google.com');
        element(by.id('alias')).sendKeys('gog');
        element(by.id('button-submit1')).click();
        var urlgerada = element(by.id('url-encurtado')).getText();
        var aliasgerado= element(by.id('alias-encurtado')).getText();
        expect(urlgerada).toEqual('Url original: http://www.google.com');
        expect(aliasgerado).toEqual('Link encurtado: short/gog')

    })

    it('acessar url encurtada', function(){

    	element(by.id('button2')).click();
        element(by.id('alias')).sendKeys('short/gog');
        element(by.id('button-submit')).click();

        browser.driver.sleep(300);
        var urlredirected = browser.driver.getCurrentUrl();
        expect(urlredirected).toEqual('https://www.google.com/?gws_rd=ssl');

		
       
    })

   })