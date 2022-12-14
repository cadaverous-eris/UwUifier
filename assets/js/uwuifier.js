const translations = {
	hello: [
		'hewwo',
		'henlo',
		'hiiii',
	],
	with: [
		'wif',
		'wiff',
		'with',
	],
	you: [
		'you',
		'u',
		'u',
		'u',
	],
	your: 'ur',
	youre: 'ur',
	"you're": 'ur',
	there: [
		'der',
		'der',
		'there',
	],
	their: [
		'der',
		'der',
		'ther',
		'their',
	],
	"they're": [
		'der',
		'der',
		"they're",
	],
	some: "sum",
	something: 'sumting',
	somewhere: 'sumwhere',
	sometime: 'sumtime',
	somewhat: 'sumwat',
	somehow: 'sumhow',
	dog: [
		'doggo',
		'pupper',
	],
	dogs: [
		'doggos',
		'puppers',
	],
	cat: 'kitteh',
	cats: 'kitties',
	bird:  'birb',
	birds:  'birbs',
	baby: [
		'bwaby',
		'bwabby',
		'babby',
	],
	babies: 'bwabies',
	friend: [
		'fwend',
		'frend',
		'fren',
	],
	friend: [
		'fwends',
		'frends',
		'frens',
	],
	little: [
		'widdle',
		'wil',
		'lil',
	],
	yes: 'yess',
	no: [
		'no',
		'noo',
		'nyo',
	],
	best: 'bestest',
	stop: 'stawp',
	never: [
		'nyever',
		'nyevew',
		'nevew',
	],
	cute: [
		'cuute',
		'kawaii',
		'kawaii',
	],
	stupid: 'stoopid',
	dead: 'ded',
	lol: [
		'lulz',
		'lolz',
	],
	snack: 'snacc',
	thick: 'thicc',
	fat: 'thicc',
	boy: 'boi',
	boyfriend: [
		'boifwend',
		'boifren',
		'bf',
	],
	girl: 'gorl',
	girlfriend: [
		'gorlfwend',
		'gorlfren',
		'gf',
	],
	lord: 'daddy',
	sir: 'daddy',
	mister: 'daddy',
	mr: 'daddy',
	dad: 'daddy',
	father: 'daddy',
	papa: 'daddy',
	maam: 'mommy',
	"ma'am": 'mommy',
	madam: 'mommy',
	miss: 'mommy',
	ms: 'mommy',
	mrs: 'mommy',
	mom: 'mommy',
	mother: 'mommy',
	mama: 'mommy',
	love: 'wuv',
	suck: 'succ',
	sucks: 'succs',
	fuck: [
		'frick',
		'heck',
	],
	fucking: [
		'hecking',
		'heckin',
	],
	fuckin: 'heckin',
	hell: 'heck',
	damn: 'darn',
	god: 'daddy',
	'super': [
		'sooper',
		'soopew',
		'sooper dooper',
	],
	the: [
		'the',
		'teh',
	],
	its: 'it',
	bad: [
		'bad',
		'naughty',
	],
};

const prefixes = [
	'OwO',
	'OwO',
	'OwO',
	'owo',
	'owo',
	'*nuzzles*',
	'*nuzzles*',
	'*nuzzles*',
	'*blushes*',
	'*blushes*',
	'*giggles*',
	'OwO whats this?',
];

const suffixes = [
	'xox',
	'*gwomps*',
	'*twerks*',
	'*starts twerking*',
	'*starts twerking*',
	'*gives headpats*',
	'UwU',
	'UwU',
	'UwU',
	'UwU',
	'UwU',
	'uwu',
	'uwu',
	'uwu',
	'uwu',
	'nya',
	'nya',
	'nya',
	'nya',
	'nya',
	'nyan',
	'nyan',
	'nyaa',
	'nyaa',
	'XD',
	'X3',
	'x3',
	'>3<',
	':3',
	'>:3',
	'?????????????',
	'(????????)',
	'(?????????)',
	'(*?????????)',
	'( ?????? ???)',
	'( ??? ?????)',
	'(?????v?????)',
	'(???`???????)',
	'(????? ?? `)???',
	'???(??? ????????)??????',
	'(??,,????????,,)???',
	'( ????? .?? ????? )',
	'( ?? ??? ` ).?????????',
];


function uwuify(input) {
	let sentences = splitSentences(input).map(sentence => splitWords(sentence));
	sentences = sentences.map(sentence => {
		let wordIndex = 0;
		let words = sentence.map((word, wi) => {
			const isCapitalized = isWordCapitalized(word);
			let newWord = word.toLowerCase();
			const isWord = (word.length > 1) || ((word.length === 1) && isLetter(word));
			// translate full words
			if (isWord) {
				newWord = translateWord(newWord);
			}
			// recapitalize word
			if (isCapitalized) {
				newWord = capitalizeWord(newWord);
			}
			if (isWord) {
				if ((wordIndex > 0) && (Math.random() < 0.075)) { // chance to repeat word
					const rand = Math.random();
					if (rand < 0.3) {
						newWord = newWord + ' uh ' + newWord;
					} else if (rand < 0.55) {
						newWord = newWord + ' umm ' + newWord;
					} else {
						newWord = newWord + ' ' + newWord;
					}
				} else if ((newWord.length > 1) && (Math.random() < 0.15)) {
					// chance to stutter word
					newWord = stutterWord(newWord);
				}
				
				wordIndex++;
			} else if ((word === ' ') && (wordIndex > 0) && (wi < (sentence.length - 2))) {
				// chance to add uh, um, or umm between words
				const rand = Math.random();
				if (rand < 0.035) {
					newWord = ' uh ';
				} else if (rand < 0.075) {
					newWord = ' um ';
				} else if (rand < 0.105) {
					newWord = ' umm ';
				}
			}
			return newWord;
		});
		// chance to add prefix/suffix to sentence
		if ((words.length > 2) && words.some(w => (w.length > 3))) {
			if (Math.random() < 0.3) {
				let index = 0;
				while (
					(index < words.length) && 
					((words[index].length === 1) && !isAlphanumeric(words[index]))
				) {
					index++;
				}
				if (index < words.length) {					
					words.splice(index, 0, pickRandomElement(prefixes), ' ');
				}
			}
			if (Math.random() < 0.45) {
				let index = words.length - 1;
				while (
					(index >= 0) &&
					((words[index].length === 1) && !isAlphanumeric(words[index]))
				) {
					index--;
				}
				if (index > 0) {
					words.splice(index + 1, 0, ' ', pickRandomElement(suffixes));
				}
			}
		}
		return words;
	});
	return sentences.map(words => words.join('')).join('');
}

function translateWord(word) {
	if (word.length < 1) {
		return word;
	}
	if (translations[word]) {
		if (Array.isArray(translations[word])) {
			return pickRandomElement(translations[word]);
		} else {
			return translations[word];
		}
	} else {
		let newWord = '';
		for (let i = 0; i < word.length; i++) {
			let char = word.charAt(i);
			if (
				(char === 'r') &&
				(Math.random() < 0.8)
			) {
				// chance to convert r into w
				char = 'w';
			} else if (
				(char === 'l') &&
				((i === 0) || ((word.charAt(i - 1) !== 'r') && (word.charAt(i - 1) !== 'w'))) &&
				((i + 2) !== word.length || ((i + 1 < word.length) && (word.charAt(i + 1) !== 'e'))) &&
				(((i > 0) && (word.charAt(i - 1) === 'l') && (newWord.charAt(newWord.length - 1) === 'w')) || (((i < 1) || newWord.charAt(newWord.length - 1) !== 'l') && (Math.random() < 0.9)))
			) {
				// chance to convert l into w
				char = 'w';
				if (((i + 1) < word.length) && (word.charAt(i + 1) === 'l')) {}
			} else if (
				(char === 'n') &&
				((i + 1) < word.length) &&
				(['a', 'o', 'u'].indexOf(word.charAt(i + 1)) >= 0) &&
				(Math.random() < 0.85)
			) {
				// chance to add a y between an n and a vowel
				char = char + 'y';
			} else if (
				(char === 'y') &&
				(word.length > 2) &&
				((i + 1) === word.length) && (i > 0) &&
				(['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(i - 1)) < 0)
			) {
				const rand = Math.random();
				// chance to convert 'y' at end of word to 'iee' or 'ie'
				if (rand < 0.45) {
					char = 'iee';
				} else if (rand < 0.8) {
					char = 'ie';
				}
			}
			newWord += char;
		}
		return newWord;
	}
}

// adds a stutter to the provided word
function stutterWord(word) {
	if (word.length < 2) {
		// stutter the entire word if the word is short
		return word + '-' + word;
	}
	if (word.startsWith('ch') || word.startsWith('sh') || word.startsWith('th')) {
		return word.substring(0, 2) + '-' + word;
	} else {
		return word.charAt(0) + '-' + word;
	}
}

// returns a random element from an array
function pickRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// returns true if first letter of provided word is capitalized
function isWordCapitalized(word) {
	return word.charAt(0) === word.charAt(0).toUpperCase();
}

// capitalizes the first letter of provided word
function capitalizeWord(word) {
	if (!word) {
		return word;
	}
	return word.charAt(0).toUpperCase() + word.substring(1, word.length);
}

// returns true if provided character is alphanumeric
function isAlphanumeric(char) {
	if (!char) {
		return false;
	}
	const code = char.charCodeAt(0);
	return ((code >= 48) && (code <= 57)) || // 0-9
				 ((code >= 65) && (code <= 90)) || // A-Z
				 ((code >= 97) && (code <= 122));  // a-z
}

// returns true if provided character is a letter
function isLetter(char) {
	if (!char) {
		return false;
	}
	const code = char.charCodeAt(0);
	return ((code >= 65) && (code <= 90)) || // A-Z
				 ((code >= 97) && (code <= 122));  // a-z
}

// split text into sentences and punctuation
function splitSentences(input) {
	let sentences = [];
	let sentenceStart = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.charAt(i);
		if (
			(char === '.') ||
			(char === '?') ||
			(char === '!') ||
			(char === '\n')
		) {
			if (sentenceStart < i) {
				sentences.push(input.substring(sentenceStart, i));
			}
			sentences.push(char);
			sentenceStart = i + 1;
		}
	}
	if (sentenceStart < input.length) {
		sentences.push(input.substring(sentenceStart, input.length));
	}
	return sentences;
}

// split sentence into words and spaces and punctuation
function splitWords(input) {
	let words = [];
	let wordStart = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.charAt(i);
		if (
			!isAlphanumeric(char) &&
			(
				(char !== "'") ||
				(
					((i + 1) < input.length) &&
					(!isLetter(input.charAt(i + 1)) || (input.charAt(i + 1) === 's'))
				) ||
				(i === wordStart)
			)
		) {
			if (wordStart < i) {
				words.push(input.substring(wordStart, i));
			}
			words.push(char);
			wordStart = i + 1;
		}
	}
	if (wordStart < input.length) {
		words.push(input.substring(wordStart, input.length));
	}
	return words;
}
