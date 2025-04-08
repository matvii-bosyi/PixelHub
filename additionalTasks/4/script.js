const symbol = "%20"

function spaceChange(str) {
	return str.split(' ').join(symbol);
}

myStr = 'Mr John Smith'

console.log(`${myStr} - ${spaceChange(myStr)}`)
