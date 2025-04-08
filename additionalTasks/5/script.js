function factorial(n) {
	if (n < 0) {
		return "Факторіалу немає для від'ємних чисел."
	}else if (n === 0 || n === 1) {
		return 1
	}else {
		return n * factorial(n - 1)
	}
}

myNumber = 10;

console.log(`Факторіал числа ${myNumber} - ${factorial(myNumber)}`);