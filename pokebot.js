const getInfoPokemon = require('./intents/infopokemon.js');
const getGreetings = require('./intents/greetings.js');
const getGoodbyes = require('./intents/goodbyes.js');
const getFeelings = require('./intents/feelings.js');

const pokeData = require('./lib/poke-data.js');
const Fuzzy = require('fuzzy-matching')
const fmpokemons = new Fuzzy(pokeData.pokemons);

const config = require('./config.js');
const restify = require('restify');
const builder = require('botbuilder');
const recast = require('recastai');
const recastClient = new recast.Client(config.recast);


// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
});

const bot = new builder.UniversalBot(connector);
const INTENTS = {
  infopokemon: getInfoPokemon,
  greetings: getGreetings,
  goodbyes: getGoodbyes,
  feelings: getFeelings,
  // help: getHelp,
};

const sendMessageByType = {
  image: (session, elem) => session.send(new builder.Message().addAttachment({
    contentType: 'image/png',
    contentUrl: elem.content,
  })),
  text: (session, elem) => session.send(elem.content),
};

const checkEntity = (res) => {
  const pokemon = res.get('pokemon');
  if (pokemon) {
    const match = fmpokemons.get(pokemon.raw);
    if (match.distance < 0.7) {
      pokemon.wrong = true;
    } else { pokemon.raw = match.value; }
    return pokemon;
  }
  return null;
};

bot.dialog('/', (session) => {
  recastClient.textRequest(session.message.text)
  .then(res => {
    const intent = res.intent();
    //const entity = res.get('pokemon');
    const entity = checkEntity(res);

    //Check words is not necessary

    console.log(intent);
    console.log(entity); //console.log(res.get('pokemon'));

    if (intent) {

			INTENTS[intent.slug](entity)
  		// INTENTS[intent.slug](entity)
  		.then(res => { res.forEach((message) => sendMessageByType[message.type](session, message)); })
  		.catch(err => { err.forEach((message) => sendMessageByType[message.type](session, message)); });
		}

  })
  .catch(() => session.send('I need some sleep right now... Talk to me later!'));
});
// Server Init
const server = restify.createServer();
server.listen(8080);
server.post('/', connector.listen());

console.log("Server running!");










// const config = require('./config.js');
// const restify = require('restify');
// const builder = require('botbuilder');
// const recast = require('recastai');
// const recastClient = new recast.Client(config.recast);

// // Connection to Microsoft Bot Framework
// const connector = new builder.ChatConnector({
//   appId: config.appId,
//   appPassword: config.appPassword,
// });

// const bot = new builder.UniversalBot(connector);

// // Event when Message received
// bot.dialog('/', (session) => {
// recastClient.textRequest(session.message.text)
//  .then(res => {
//    const intent = res.intent();
//    const entity = res.get('pokemon');
//    session.send(`Intent: ${intent.slug}`);
//    session.send(`Entity: ${entity.name}`);
//  })
//  .catch(() => session.send('I need some sleep right now... Talk to me later!'));
// });



// // Server Init
// const server = restify.createServer();
// server.listen(8080);
// server.post('/', connector.listen());
