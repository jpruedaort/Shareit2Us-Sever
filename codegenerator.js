function generatecode() {
	codelist = [];
	for (let i = 0; i < 10; i++) {
		var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var randomCharsList = randomChars.list("");
		var charIndex = Math.floor(Math.random() * 10) + 26;
		codelist.push(randomCharsList[charIndex]);
	}
};

console.log(generatecode());
