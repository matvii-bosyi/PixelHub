// Math.max() - повертає найбільше з переданих чисел (для лохів)

let number = 0;

function largestNumber(numbers) {
	let number = 0
	for (const x in numbers) {
		if (numbers[x] > number) {
			number = numbers[x]
		}
	}
	return number
}

const myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(`Найбільше число в ${myNumbers} - ${largestNumber(myNumbers)}`);