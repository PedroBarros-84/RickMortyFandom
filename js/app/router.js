define(() => {

	let internals = {};
	let externals = {};

	internals.routes = {
		landingPage: { hash: '#landingPage', controller: 'landing-page-controller'},
		movie: { hash: '#movie', controller: 'movie-controller' }
	}
	
  	// keep current state
	internals.currentHash = '#landingPage';
	
	// define a default route
	internals.defaultRoute = 'landingPage';

	// check to see if hash has changed
	internals.checkHash = function(){

		// hash hasn't changed
		if(window.location.hash === internals.currentHash){
			return;
		}

		let routeName = Object.keys(internals.routes).find(function(key){
			return internals.routes[key].hash === window.location.hash;
		});

		if(!routeName){
			routeName = internals.defaultRoute;
			window.location.hash = internals.routes[internals.defaultRoute].hash;
		}
		
		internals.currentHash = window.location.hash;

		// this method will receive the return value from the module it invoques
		require(['./controllers/' + internals.routes[routeName].controller], (controller) => {

			// the object received is the externals object from the model
			controller.init();

		});

	}

	externals.start = () => { 
	
		console.log('Router is online!');
		setInterval(internals.checkHash, 150);

	}

	return externals;

});