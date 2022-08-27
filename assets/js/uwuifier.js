const translations = {
	hello: [
		'hewwo',
		'henlo',
		'hiiii',
	],
	no: [
		'no',
		'no',
		'nyo',
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
	dog: 'doggo',
	cat: 'kitteh',
	friend: [
		'fwend',
		'frend',
		'fren',
	],
	stop: 'stawp',
	never: [
		'nyever',
		'nevew',
	],
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
	fuck: 'frick',
	fucking: 'hecking',
	hell: 'heck',
	damn: 'darn',
	god: 'daddy',
	'super': [
		'sooper',
		'soopew',
	],
	the: [
		'the',
		'teh',
	],
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
	'nya',
	'nya',
	'nya',
	'XD',
	'X3',
	'>3<',
	':3',
	'>:3',
	'ɾ⚈▿⚈ɹ',
	'(・ω・)',
	'(ᗒᗨᗕ)',
	'(*≧▽≦)',
	'( ﾟ∀ ﾟ)',
	'( ・ ̫・)',
	'(▰˘v˘▰)',
	'(・`ω´・)',
	'(ﾉ´ з `)ノ',
	'✾(〜 ☌ω☌)〜✾',
	'(´,,•ω•,,)♡',
	'( •́ .̫ •̀ )',
	'( ´ ▽ ` ).｡ｏ♡',
];


function uwuify(input) {
	let sentences = splitSentences(input).map(sentence => splitWords(sentence));
	sentences = sentences.map(sentence => {
		let wordIndex = 0;
		let words = sentence.map(word => {
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
					newWord = newWord + ' ' + newWord;
				} else if (Math.random() < 0.15) { // chance to stutter word
					newWord = stutterWord(newWord);
				}
				
				wordIndex++;
			}
			return newWord;
		});
		// chance to add prefix/suffix to sentence
		if ((words.length > 2) && words.some(w => (w.length > 3))) {
			if (Math.random() < 0.2) {
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
			if (Math.random() < 0.35) {
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
				(((i > 0) && (word.charAt(i - 1) === 'l') && (newWord.charAt(i - 1) === 'w')) || (((i < 1) || newWord.charAt(i - 1) !== 'l') && (Math.random() < 0.9)))
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
	const code = char.charCodeAt(0);
	return ((code >= 48) && (code <= 57)) || // 0-9
				 ((code >= 65) && (code <= 90)) || // A-Z
				 ((code >= 97) && (code <= 122));  // a-z
}

// returns true if provided character is a letter
function isLetter(char) {
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
		if (!isAlphanumeric(char) && (char !== "'")) {
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
