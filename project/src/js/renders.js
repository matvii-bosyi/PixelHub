const contentContainer = document.getElementById('contentContainer')
const text1 = document.getElementById('pageText1')
const text2 = document.getElementById('pageText2')
const orderContainer = document.getElementById('orderContainer')

let gameElements = []

function getColumnCount() {
	const width = window.innerWidth
	if (width > 1920) return 5
	if (width > 1439) return 4
	if (width > 1023) return 3
	if (width > 979) return 2
	return 1
}

function createColumns() {
	contentContainer.innerHTML = ''
	const columnCount = getColumnCount()

	for (let i = 0; i < columnCount; i++) {
		const column = document.createElement('div')
		column.classList.add('flex', 'flex-col', 'gap-[24px]')
		column.dataset.columnIndex = i
		contentContainer.appendChild(column)
	}
}

function getShortestColumn() {
	const columns = Array.from(contentContainer.children)
	return columns.reduce((shortest, current) => {
		return current.children.length < shortest.children.length ? current : shortest
	})
}

export function renderGames(data, append = false) {
	document.title = 'All Games • RAWG'
	text1.innerHTML = 'All Games'
	text2.classList.add('hidden')
	orderContainer.classList.remove('hidden')

	if (!append) {
		createColumns()
		gameElements = []
	}

	const columns = Array.from(contentContainer.children)
	let columnIndex = 0

	data.results.forEach((gameData) => {
		const column = columns[columnIndex]
		const gameCard = createGameCard(gameData)
		gameElements.push(gameCard)
		column.appendChild(gameCard)
		columnIndex = (columnIndex + 1) % columns.length
		updateCardHeights()
	})



	function createGameCard(gameData) {
		const platformsHTML = gameData.parent_platforms.map((cardData, index, array) => {
			const platformName = cardData.platform.name.toLowerCase()
			let platformIcon = ''

			const iconMap = {
				'pc': './img/svg/windows-icon.svg',
				'xbox': './img/svg/xbox-icon.svg',
				'playstation': './img/svg/playstation-icon.svg',
				'nintendo': './img/svg/nintendo-icon.svg',
				'apple macintosh': './img/svg/mac-icon.svg',
				'android': './img/svg/android-icon.svg',
				'linux': './img/svg/linux-icon.svg',
				'web': './img/svg/web-icon.svg',
				'ios': './img/svg/ios-icon.svg',
				'sega': './img/svg/sega-icon.svg',
				'commodore': './img/svg/commodore-icon.svg',
				'atari': './img/svg/atari-icon.svg'
			}

			for (const key in iconMap) {
				if (platformName.includes(key)) {
					platformIcon = iconMap[key]
					break
				}
			}

			if (array.length === 7 && index === 5) {
				const extraPlatformsCount = array.length - 5
				return `<span class="text-white text-[14px]">+${extraPlatformsCount}</span>`
			}

			if (index < 5) {
				return `<img src="${platformIcon}" alt="${platformName}" class="w-auto h-[13px]"/>`
			}

			return null
		}).filter(Boolean)

		const dateFormatted = new Date(`${gameData.released}`).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

		const genresFormatted = gameData.genres.map(g => `<span class='border-b-[1px] border-solid border-[rgba(255, 255, 255, 0.4]'>${g.name}</span>`).join(', ')

		const bgImg = gameData.background_image || 'https://placehold.co/1280x720/000000/white?text=404%0APicture+not+found&font=oswald'

		const ratingEmoji = { exceptional: '🎯', recommended: '👍', meh: '😑', skip: '⛔' }[gameData.ratings?.[0]?.title?.toLowerCase()] || ''

		const addedFormatted = gameData.added.toString().slice(0, 2) + ',' + gameData.added.toString().slice(2)


		function metacriticCheck() {
			if (gameData.metacritic) {
				return `<div class='min-w-[32px] text-center rounded-[4px] font-[700] text-[14px] text-[#6dc849] border-[1px] border-solid border-[rgba(109,200,73,.4)]'>${gameData.metacritic}</div>`
			} else {
				return `<div></div>`
			}
		}


		const card = document.createElement('div')
		card.classList.add('gameContainer')
		card.innerHTML = `
			<div class="gameCard bg-[#202020] shadow-lg text-white rounded-[12px] overflow-hidden h-fit transition-transform duration-300 hover:scale-103">
				<div class="w-full overflow-hidden aspect-video">
					<img src="${bgImg}" class="w-full h-full object-cover object-center" />
				</div>
				<div class="px-[16px] pt-[16px] pb-[24px] flex flex-col">
					<div class="flex items-center justify-between mb-[7px]">
						<div class="flex items-center gap-[6px]">
							${platformsHTML.join('')}
						</div>
						${metacriticCheck()}
					</div>
					<a href='./gamePage.html?id=${gameData.id}' class="text-[24px] font-[700] leading-[28px] mb-[10px] transition-opacity hover:opacity-40">
						${gameData.name}${ratingEmoji}
					</a>
					<button class="group bg-[#ffffff1a] flex items-center text-white text-sm p-[6px_8px] rounded gap-[6px] w-fit transition-colors hover:bg-white hover:text-black">
						<img class='group-hover:brightness-0 w-[12px] h-[12px]' src="./img/svg/plus.svg" alt="">
						<span class='text-[12px] leading-[12px]'>${addedFormatted}</span>
					</button>
					<div class='flex-col'>
						<div class='flex items-center justify-between text-[12px] py-[12px]'>
							<span class=' opacity-40'>Release date:</span><span></span>${dateFormatted}</span>
						</div>
						<div class='flex items-center justify-between text-[12px] py-[12px] border-t-[1px] border-b-[1px] border-solid border-[hsla(0,0%,100%,.07)]'>
							<span class=' opacity-40'>Genres:</span><span>${genresFormatted}</span>
						</div>
						<div class='flex items-center justify-between text-[12px] py-[12px]'>
							<span class=' opacity-40'>Chart:</span><span>Sorry, not working</span>
						</div>
						<button class='notWorking w-full flex items-center justify-between p-[12px_16px] cursor-pointer bg-[hsla(0,0%,100%,.07)] rounded-[8px] text-[14px] text-white transition-colors hover:text-[#fad860]'>Show more like this <img src="./img/svg/arrow.svg" class='-rotate-90 w-[18px] h-[12px] opacity-40' alt="arrow"></button>
					</div>
				</div>
			</div>
    `
		return card
	}
}

export function updateCardHeights() {
	const elements = document.querySelectorAll('.gameContainer')
	if (elements.length > 0) {
		elements.forEach((container) => {
			if (container.firstElementChild && container.offsetParent !== null) {
				const childHeight = container.firstElementChild.offsetHeight
				container.style.maxHeight = `${childHeight}px`
			}
		})
	}
}

window.addEventListener('resize', () => {
	if (window.location.pathname.includes('gamePage.html')) {
		return
	}

	createColumns()

	const columns = Array.from(contentContainer.children)
	let columnIndex = 0

	gameElements.forEach((game) => {
		const column = columns[columnIndex]
		column.appendChild(game)
		columnIndex = (columnIndex + 1) % columns.length
	})

	updateCardHeights()
})

export function renderPlatforms(data) {
	document.title = 'Platforms • RAWG'
	text1.innerHTML = 'Platforms'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderStores(data) {
	document.title = 'Stores • RAWG'
	text1.innerHTML = 'Stores'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderGenres(data) {
	document.title = 'Genres • RAWG'
	text1.innerHTML = 'Genres'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderCreators(data) {
	document.title = 'Creators • RAWG'
	text1.innerHTML = 'Creators'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			const positions = cardData.positions
				.map(p => p.name[0].toUpperCase() + p.name.slice(1))
				.join(', ')

			return `
			<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
				<div>
					<img src="${cardData.image
				}" class="w-[128px] h-[128px] object-cover object-center rounded-full mb-[16px]"/>
				</div>
				<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[8px]'>
					<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
				</div>
				<div class='mb-[16px] text-white text-[12px]'>
					<span>${positions}</span>
				</div>
				<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
				<div class='w-full text-white'>
					<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
						<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
						<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
					</div>
					<ul class='flex flex-col'>
						<li class='flex justify-between leading-[18px] mb-[6px]'>
							<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
							<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
						</li>
						<li class='flex justify-between leading-[18px] mb-[6px]'>
							<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
							<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
						</li>
						<li class='flex justify-between leading-[18px]'>
							<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
							<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
						</li>
					</ul>
				</div>
			</div>
		`
		})
		.join('')
}

export function renderTags(data) {
	document.title = 'Tags • RAWG'
	text1.innerHTML = 'Tags'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderDevelopers(data) {
	document.title = 'Developers • RAWG'
	text1.innerHTML = 'Developers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderPublishers(data) {
	document.title = 'Publishers • RAWG'
	text1.innerHTML = 'Publishers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	contentContainer.innerHTML += data.results
		.map(cardData => {
			return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background
				}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40 text-[14px] leading-[20px]'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name
				}</a>
						<span class='flex items-center gap-[3px] opacity-40 text-[14px] font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
		})
		.join('')
}

export function renderGamePage(data) {
	const bg = document.getElementById('background-layer')

	bg.style.cssText = `
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 50%), url('${data.background_image}');
		background-size: 100% auto;
		background-position: top;
		background-repeat: no-repeat;
		z-index: -10;
		opacity: 0.8;
		filter: brightness(0.8);
	`

	const date = new Date(data.released);
	const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

	contentContainer.innerHTML = `
	<div class='flex flex-row'>
		<div class='flex flex-col'>
			<div class='flex flex-row gap-[15px] mb-[12px]'>
				<div class='bg-white p-[2px_7.5px] text-[12px] rounded-[4px] leading-[15px] tracking-[2px]'>
					${formattedDate}
				</div>
				<div class="flex items-center gap-[10px]">
					<img class='h-[16px] w-auto' src="./img/svg/windows-icon.svg" alt="">
					<img class='h-[16px] w-auto' src="./img/svg/playstation-icon.svg" alt="">
					<img class='h-[16px] w-auto' src="./img/svg/xbox-icon.svg" alt="">
				</div>
				<span class='uppercase text-[12px] tracking-[2px] text-white'>Average playtime: ${data.playtime} hours</span>
			</div>

			<div class='mb-[24px]'>
				<h1 class='text-[72px] font-[700] leading-[74px] text-white'>${data.name}</h1>
			</div>

			<div class='mb-[32px]'>
				<button class='relative overflow-hidden p-[5px_16px] bg-white rounded-[6px] min-w-[180px] cursor-pointer'>
					<div class='flex flex-col text-start'>
						<span class='text-[12px] leading-[14px] opacity-40'>Add to</span>
						<span class='text-[18px] leading-[22px]'>My games</span>
					</div>
					<div class='absolute top-[50%] translate-y-[-50%] right-[-7px]'>
						<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a"><stop stop-color="#B4EC51" offset="0%" /><stop stop-color="#429321" offset="100%" /></linearGradient></defs><path d="M18 0C8.018 0 0 8.018 0 18s8.018 18 18 18 18-8.018 18-18S27.982 0 18 0zm9.818 18.818c0 .491-.327.818-.818.818h-6.955c-.245 0-.409.164-.409.41V27c0 .49-.327.818-.818.818h-1.636c-.491 0-.818-.327-.818-.818v-6.955c0-.245-.164-.409-.41-.409H9c-.49 0-.818-.327-.818-.818v-1.636c0-.491.327-.818.818-.818h6.955c.245 0 .409-.164.409-.41V9c0-.49.327-.818.818-.818h1.636c.491 0 .818.327.818.818v6.955c0 .245.164.409.41.409H27c.49 0 .818.327.818.818v1.636z"fill="url(#a)" fill-rule="evenodd" /></svg>
					</div>
				</button>
			</div>

			<div class='flex flex-col text-white'>
				<span class='text-[24px] font-[700] leading-[28px] mb-[8px]'>About</span>
				<p class='max-h-[176px] max-w-[530px] leading-[22px] text-[16px] overflow-hidden text-ellipsis'>
					${data.description_raw.replaceAll('\n', '<br />')}
				</p>
			</div>
		</div>
	</div>
	`
}