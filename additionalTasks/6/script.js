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

	for (let i = 0; i < romanNum.length; i++) {
		const current = romanNumerals[romanNum[i]]
		const next = romanNumerals[romanNum[i + 1]]

		if (current === undefined) {
			return `Не існує римського числа ${romanNum[i]}`
		}

		if (next && current < next) {
			total -= current
		} else {
			total += current
		}
	}

	return total
}


const myRomanNum = "CmDxI"

console.log(`${myRomanNum.toUpperCase()} - ${convertingNumber(myRomanNum)}`)