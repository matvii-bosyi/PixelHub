const content = document.getElementById('contentContainer')
const text1 = document.getElementById('pageText1')
const text2 = document.getElementById('pageText2')
const orderContainer = document.getElementById('orderContainer')

export function renderGames(data) {
	document.getElementById(
		'searchInput'
	).placeholder = `Search ${data.count.toLocaleString()} games`

	content.innerHTML = data.results
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

			function getMetacriticColor(score) {
				if (score >= 75) {
					return '#6dc849'
				} else if (score >= 50) {
					return '#fdc849'
				} else {
					return '#ff4c4c'
				}
			}

			text1.innerHTML = 'All Games'
			text2.classList.add('hidden')
			orderContainer.classList.remove('hidden')

			return `
			<div class="bg-[#202020] text-white rounded-[12px] h-fit overflow-hidden font-sans">
					<div class="w-full overflow-hidden" style="aspect-ratio: 16 / 9;">
							<img src="${
								gameData.background_image
							}" class="w-full h-full object-cover object-center"/>
					</div>
					<div class="px-[16px] pt-[16px] pb-[28px] flex flex-col gap-[]">
							<div class="flex items-center justify-between mb-[7px]">
									<div class="flex gap-[6px]">
											${platformsHTML.join('')}
									</div>
							</div>
							<div class="text-[24px] font-[700] leading-[28px] mb-[10px]">
									${gameData.name}
							</div>
							<button class="bg-[#ffffff1a] flex items-center text-white text-sm p-[6px_8px] rounded gap-[6px] w-fit">
									<img class='w-[12px] h-[12px]' src="./img/svg/plus.svg" alt="">
									<span class='text-[10.5] leading-[12px]'>${gameData.added}</span>
							</button>
					</div>
			</div>
			`
		})
		.join('')
}

export function renderPlatforms(data) {
	text1.innerHTML = 'Platforms'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderStores(data) {
	text1.innerHTML = 'Stores'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderGenres(data) {
	text1.innerHTML = 'Genres'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderCreators(data) {
	text1.innerHTML = 'Creators'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div>
				<img src="${cardData.image}" class="w-[128px] h-[128px] object-cover object-center rounded-full mb-[16px]"/>
			</div>
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<div>

			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderTags(data) {
	text1.innerHTML = 'Tags'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderDevelopers(data) {
	text1.innerHTML = 'Developers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}

export function renderPublishers(data) {
	text1.innerHTML = 'Publishers'
	text2.classList.add('hidden')
	orderContainer.classList.add('hidden')

	content.innerHTML = data.results.map(cardData => {
	return `
		<div class="flex relative flex-col items-center rounded-[6px] p-[32px_24px]" style="background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${cardData.image_background}'); background-size: cover; background-position: center;" >
			<div class='border-b-[1px] border-b-neutral-500 w-fit mb-[16px]'>
				<a class='text-[24px] leading-[28px] text-white font-[700]'>${cardData.name}</a>
			</div>
			<button class='mb-[24px] p-[10px_35px] text-[16px] bg-[hsla(0,0%,100%,.1)] rounded-[4px] transition-colors text-white hover:bg-[white] hover:text-black'>Follow</button>
			<div class='w-full text-white'>
				<div class='flex flex-row justify-between pb-[8px] mb-[8px] border-b-[1px] border-b-neutral-700'>
					<span class='text-[16px] font-[700] leading-[20px]'>Popular items</span>
					<span class='opacity-40'>${cardData.games_count.toLocaleString()}</span>
				</div>
				<ul class='flex flex-col'>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[0].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[0].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px] mb-[6px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[1].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[1].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
					<li class='flex justify-between leading-[18px]'>
						<a class='max-w-[70%] text-[14px] text-ellipsis text-nowrap overflow-hidden border-b-[1px] border-b-neutral-500 cursor-pointer transition-opacity hover:opacity-40'>${cardData.games[2].name}</a>
						<span class='flex items-center gap-[3px] opacity-40 font-[400]'>${cardData.games[2].added.toLocaleString()}<span><img src="./img/svg/people-icon.svg" alt=""></span></span>
					</li>
				</ul>
			</div>
		</div>
	`
	}).join('')
}
