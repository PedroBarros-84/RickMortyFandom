define(['../services/profile-page-service', '../views/profile-page'], 
                            function(profilePageService, profilePageView) {

    let internals = {};
    let externals = {};

    internals.fetchProfile = function(characterUrl) {

        profilePageService.getCharacter(characterUrl)
            .then(response => response.json())
            .then(json => profilePageView.loadOtherProfile(json));
    }

    externals.init = function() {

        profilePageService.getCharacter()
            .then(response => response.json())
            .then(json => profilePageView.show(json, internals.fetchProfile));
	}

	return externals;
});