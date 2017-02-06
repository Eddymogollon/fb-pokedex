const getHelp = (entity) => {
  const answer = `
    Hi, I am a Pokedex bot. You can ask me about any pokemon and I will gladly help.
    You can say: "Tell me about Pikachu" or "What do you know about Pikachu?" and
    I will give you the answer.

    If you want to see this again, just ask for help!
  `;
  
  return Promise.resolve([toText(answer)]);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

module.exports = getHelp;

	