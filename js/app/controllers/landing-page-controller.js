define(['../services/landing-page-service', '../views/landing-page'], 
                                        function(landingPageService, landingPageView) {

    internals = {};
    externals = {};

    externals.init = function() {

        landingPageService.getList()
            .then(response => response.json())
            .then(json => landingPageView.show(json, internals.fetchPage, internals.fetchSearch))
            .catch();
		
	}

    internals.fetchPage = function(pageUrl) {

        landingPageService.getList(pageUrl)
            .then(response => response.json())
            .then(json => landingPageView.appendMoreCharacters(json));

    }

    internals.fetchSearch = function(search) {

        landingPageService.getSearch(search)
            .then(response => response.json())
            .then(json => landingPageView.loadSearchResults(json));

    }

    

	return externals;

});