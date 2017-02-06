const getInfoPokemon = require('./intents/infopokemon.js');
const getGreetings = require('./intents/greetings.js');
const getGoodbyes = require('./intents/goodbyes.js');
const getFeelings = require('./intents/feelings.js');
const getThanks = require('./intents/thanks.js');
const getHelp = require('./intents/help.js');


const pokeData = require('./lib/poke-data.js');
const Fuzzy = require('fuzzy-matching');
const fmpokemons = new Fuzzy(pokeData.pokemons);

const config = require('./config.js');
const restify = require('restify');
const builder = require('botbuilder');
const recast = require('recastai');
const recastClient = new recast.Client(config.recast);
const port = (process.env.PORT || 8080);

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
  thanks: getThanks,
  help: getHelp
};

const sendMessageByType = {
  image: (session, elem) => session.send(new builder.Message().addAttachment({
    contentType: 'image/png',
    contentUrl: elem.content,
  })),
  text: (session, elem) => session.send(elem.content),
  buttons: (session, elem) => {
   const buttons = elem.content.map(button => {
     return (new builder.CardAction().title(button.title).type('imBack').value(button.value));
   });
   const card = new builder.ThumbnailCard().buttons(buttons).subtitle(elem.title);
   session.send(new builder.Message().addAttachment(card));
  }
};

const checkEntity = (res) => {
  const pokemon = res.get('pokemon');
  if (pokemon) {
    const match = fmpokemons.get(pokemon.raw);
    if (match.distance < 0.70 && math.distance > 0.65) {
      pokemon.wrong = true;
    } else if (match.distance < 0.60) {
    	pokemon.nonsense = true;
    } else { pokemon.raw = match.value; }
    return pokemon;
  }
  return null;
};

bot.dialog('/', (session) => {
  recastClient.textRequest(session.message.text)
  .then(res => {
    const intent = res.intent();
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
  .catch(() => session.send("Sorry, didn't get that. Ask for help if you're confused!"));
});
// Server Init
const server = restify.createServer();
server.listen(port);
server.post('/', connector.listen());

console.log("Server running!");