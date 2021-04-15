define(['../services/profile-page-service', '../views/profile-page'], function(profilePageService, profilePageView) {

    internals = {};
    externals = {};

    externals.init = function() {

        profilePageService.getCharacter()
            .then(response => response.json())
            .then(json => profilePageView.show(json, internals.fetchProfile))
            .catch();
		
	}

    internals.fetchProfile = function(characterUrl) {

        profilePageService.getCharacter(characterUrl)
            .then(response => response.json())
            .then(json => profilePageView.loadOtherProfile(json));

    }

	return externals;

});