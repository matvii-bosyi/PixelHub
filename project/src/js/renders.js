const content = document.getElementById('contentContainer')
const text1 = document.getElementById('pageText1')
const text2 = document.getElementById('pageText2')
const orderContainer = document.getElementById('orderContainer')

export function renderGames(data, append = false) {
	text1.innerHTML = 'All Games'
	text2.classList.add('hidden')
	orderContainer.classList.remove('hidden')
	const content = document.getElementById('contentContainer')

	if (!append) {
		content.innerHTML = ''
	}

	content.innerHTML += data.results
		.map(gameData => {
			const platformsHTML = gameData.parent_platforms
				.slice(0, 6)
				.map(cardData => {
					const platformName = cardData.platform.name.toLowerCase()
					let platformIcon = ''

					if (platformName.includes('pc')) {
						platformIcon = './img/svg/windows-icon.svg'
					} else if (platformName.includes('xbox')) {
						platformIcon = './img/svg/xbox-icon.svg'
					} else if (platformName.includes('playstation')) {
						platformIcon = './img/svg/playstation-icon.svg'
					} else if (platformName.includes('nintendo')) {
						platformIcon = './img/svg/nintendo-icon.svg'
					} else if (platformName.includes('apple macintosh')) {
						platformIcon = './img/svg/mac-icon.svg'
					} else if (platformName.includes('android')) {
						platformIcon = './img/svg/android-icon.svg'
					} else if (platformName.includes('linux')) {
						platformIcon = './img/svg/linux-icon.svg'
					} else if (platformName.includes('web')) {
						platformIcon = './img/svg/web-icon.svg'
					} else if (platformName.includes('ios')) {
						platformIcon = './img/svg/ios-icon.svg'
					}

					return `<img src="${platformIcon}" alt="${platformName}" class="w-[16px] h-[16px]"/>`
				})

			if (gameData.parent_platforms.length > 6) {
				const extraPlatformsCount = gameData.parent_platforms.length - 6
				platformsHTML.push(
					`<span class="text-white text-sm">+${extraPlatformsCount}</span>`
				)
			}

			const formattedDate = new Date(`${gameData.released}`).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

			const genresString = gameData.genres.map(g => `<span class='border-b-[1px] border-solid border-[]'>${g.name}</span>`).join(', ');

			const bgImg = gameData.background_image || 'https://placehold.co/1280x720/000000/white?text=404%0APicture+not+found&font=oswald'

			return `
					<div class="gameContainer">
						<div class="gameCard bg-[#202020] shadow-lg text-white rounded-[12px] overflow-hidden h-fit transition-transform hover:scale-103">
							<div class="w-full overflow-hidden" style="aspect-ratio: 16 / 9;">
								<img src="${bgImg}" class="w-full h-full object-cover object-center" />
							</div>
							<div class="px-[16px] pt-[16px] pb-[28px] flex flex-col">
								<div class="flex items-center justify-between mb-[7px]">
									<div class="flex gap-[6px]">
										${platformsHTML.join('')}
									</div>
									<div class='min-w-[32px] text-center rounded-[4px] font-[700] text-[14px] text-[#6dc849] border-[1px] border-solid border-[rgba(109,200,73,.4)]'>80</div>
								</div>
								<div class="text-[24px] font-[700] leading-[28px] mb-[10px]">
									${gameData.name}
								</div>
								<button class="group bg-[#ffffff1a] flex items-center text-white text-sm p-[6px_8px] rounded gap-[6px] w-fit transition-colors hover:bg-white hover:text-black">
									<img class='group-hover:brightness-0 w-[12px] h-[12px]' src="./img/svg/plus.svg" alt="">
									<span class='text-[12px] leading-[12px]'>${gameData.added.toLocaleString()}</span>
								</button>
								<div class='flex-col'>
									<div class='flex items-center justify-between text-[12px] py-[12px]'>
										<span class=' opacity-40'>Release date:</span><span></span>${formattedDate}</span>
									</div>
									<div class='flex items-center justify-between text-[12px] py-[12px] border-t-[1px] border-b-[1px] border-solid border-[hsla(0,0%,100%,.07)]'>
										<span class=' opacity-40'>Genres:</span><span>${genresString}</span>
									</div>
									<div class='flex items-center justify-between text-[12px] py-[12px]'>
										<span class=' opacity-40'>Chart:</span><span>Sorry, not working</span>
									</div>
									<button class='w-full flex items-center justify-between p-[12px_16px] cursor-pointer bg-[hsla(0,0%,100%,.07)] rounded-[8px] text-[14px] text-white transition-colors hover:text-[#fad860]'>Show more like this <img src="./img/svg/arrow.svg" class='-rotate-90 w-[18px] h-[12px] opacity-40' alt="arrow"></button>
								</div>
							</div>
						</div>
					</div>
            `
		})
		.join('')

	const elements = document.querySelectorAll('.gameContainer')
	if (elements.length > 0) {
		elements.forEach((container) => {
			const childHeight = container.firstElementChild.offsetHeight
			container.style.maxHeight = `${childHeight}px`
		})
	}
	window.addEventListener('resize', () => {
		if (elements.length > 0) {
			elements.forEach((container) => {
				const childHeight = container.firstElementChild.offsetHeight
				container.style.maxHeight = `${childHeight}px`
			})
	}
	})
}

export function renderPlatforms(data) {
	text1.innerHTML = 'Platforms'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Stores'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Genres'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Creators'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Tags'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Developers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
	text1.innerHTML = 'Publishers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML += data.results
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
