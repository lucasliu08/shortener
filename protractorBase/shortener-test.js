describe ('shortener test', function(){
    beforeEach(function(){
    	browser.ignoreSynchronization = true;
    	browser.waitForAngularEnabled(false);
    	browser.get('http://192.168.1.106:3000/');
    })
    
    it('realizar encurtamento de url com custom alias', function(){
        element(by.id('button1')).click();
        element(by.id('urlcustom')).sendKeys('teste_com_customalias');
        element(by.id('alias')).sendKeys('custom');
        element(by.id('button-submit1')).click();
        var urlgerada = element(by.id('url-encurtado')).getText();
        var aliasgerado= element(by.id('alias-encurtado')).getText();
        expect(urlgerada).toEqual('Url original: http://teste_com_customalias');
        expect(aliasgerado).toEqual('Link encurtado: short/custom')

    })

    it('realizar encurtamento de url sem custom alias', function(){

    	element(by.id('button1')).click();
        element(by.id('urlnocustom')).sendKeys('teste_sem_customalias');
        element(by.id('button-submit2')).click();

       	var urlgerada = element(by.id('url-encurtado')).getText();
        expect(urlgerada).toEqual('Url original: http://teste_sem_customalias');
		
       
    })

    it('realizar encurtamento de url com custom alias ja existente', function(){
        element(by.id('button1')).click();
        element(by.id('urlcustom')).sendKeys('teste_com_aliasexistente');
        element(by.id('alias')).sendKeys('custom');
        element(by.id('button-submit1')).click();
        var body = element(by.xpath('//body')).getText();

        expect(body).toEqual('ErrorCode 001: CUSTOM ALIAS ALREADY EXISTS');
    })
})