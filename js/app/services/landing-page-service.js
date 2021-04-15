define( () => {

    externals = {};

    externals.getList = function() {

        return fetch(arguments[0] || 'https://rickandmortyapi.com/api/character');
                    
    }



    return externals;
});