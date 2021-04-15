define( function() {

    externals = {};

    externals.getCharacter = function() {

        return fetch(arguments[0] || 'https://rickandmortyapi.com/api/character/' + sessionStorage.characterId);
                    
    }

    return externals;
});