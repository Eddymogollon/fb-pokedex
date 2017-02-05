const random = array => { return array[Math.floor(Math.random() * array.length)]; };
const getGoodbyes = (entity) => {
  const answers = [
    `Bye!`,
    `Take care!`,
    `See you later.`,
    `Hasta la vista!`,
    `Goodbye!`,
    `So soon? Dang, I'll miss you my friend`,
  ];
  
  return Promise.resolve([toText(random(answers))]);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

module.exports = getGoodbyes;

	