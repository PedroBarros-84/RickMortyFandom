define(['../services/landing-page-service', '../views/landing-page'], (landingPageService, landingPageView) => {

    internals = {};
    externals = {};

    externals.init = function() {

        landingPageService.getList()
            .then(response => response.json())
            .then(json => landingPageView.show(json, internals.fetchPage));
		
	}

    internals.fetchPage = function(pageUrl) {

        landingPageService.getList(pageUrl)
            .then(response => response.json())
            .then(json => landingPageView.appendMoreCharacters(json));

    }

    


	return externals;

})