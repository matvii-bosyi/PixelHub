const romanNumerals = {
	"I": 1,
	"V": 5,
	"X": 10,
	"L": 50,
	"C": 100,
	"D": 500,
	"M": 1000
}

function convertingNumber(romanNum) {
	romanNum = romanNum.toUpperCase()
	
	let total = 0

	for (const index in romanNum) {
		total += romanNumerals[romanNum[index]]
		if (romanNumerals[romanNum[index]] === undefined) {
			return `Не існує римського числа ${romanNum[index]}`
		}	
	}

	return total
}

const myRomanNum = "CmDxI"

console.log(`${myRomanNum.toUpperCase()} - ${convertingNumber(myRomanNum)}`)