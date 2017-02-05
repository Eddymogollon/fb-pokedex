const request = require('superagent');
const getInfoPokemon = (entity) => {
  if (!entity) { 
  	return Promise.reject('You didn\'t give me any pokemons');
	}

  return new Promise((resolve, reject) => {
    request.get('https://pokeapi.co/api/v2/pokemon/' + entity.raw)
    .end((err, res) => {
      if (err) { 
      	return reject('ERROR');
      }
      resolve(infoPokemonLayout(res.body));
      // console.log(res);
    });
  });

};

const infoPokemonLayout = (json) => {
  const answer = [toText(`:mag_right: ${json.name} infos`)];
  const toAdd = json.types.map(elem => elem.type.name).join(' / ');
  answer.push(toText(`Type(s): ${toAdd}`));
  if (json.sprites.front_default) {
  	answer.push(toImage(json.sprites.front_default));
  }
  return answer;
};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

const toImage = (image) => { 
	return { type: 'image', content: image };
};

module.exports = getInfoPokemon;











// const request = require('superagent');
// const getInfoPokemon = (entity) => {
//   if (!entity) { 
//   	return Promise.reject('You didn\'t give me any pokemon');
//   }
//   return new Promise((resolve, reject)) => {
//     request.get('https://pokeapi.co/api/v2/pokemon/' + entity.raw)
//     .end((err, res) => {
//       if (err) { return reject('ERROR'); }
//       resolve('OK');
//       console.log(res.body);
//     });
//   };
// }

// modules.exports = getInfoPokemon;