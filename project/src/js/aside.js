import { renderContent } from './contentGenerate.js'

const asideData = [
	{
		title: 'New Releases',
		links: [
			{ text: 'Last 30 days', img: './img/svg/aside1_1.svg', notWorking: true },
			{ text: 'This week', img: './img/svg/aside1_2.svg', notWorking: true },
			{ text: 'Next week', img: './img/svg/aside1_3.svg', notWorking: true },
			{ text: 'Release calendar', img: './img/svg/aside1_4.svg', notWorking: true },
		],
	},
	{
		title: 'Top',
		links: [
			{ text: 'Best of the year', img: './img/svg/aside2_1.svg', notWorking: true },
			{ text: 'Popular in 2024', img: './img/svg/aside2_2.svg', notWorking: true },
			{ text: 'All time top 250', img: './img/svg/aside2_3.svg', notWorking: true },
		],
	},
	{
		title: 'Browse',
		links: [
			{ text: 'Platforms', img: './img/svg/aside3_1.svg', link: 'platforms' },
			{ text: 'Stores', img: './img/svg/aside3_2.svg', link: 'stores' },
			{ text: 'Collections', img: './img/svg/aside3_3.svg', notWorking: true },
			{ text: 'Reviews', img: './img/svg/aside3_4.svg', notWorking: true },
			{ text: 'Genres', img: './img/svg/aside3_5.svg', link: 'genres' },
			{ text: 'Creators', img: './img/svg/aside3_6.svg', link: 'creators' },
			{ text: 'Tags', img: './img/svg/aside3_7.svg', link: 'tags' },
			{ text: 'Developers', img: './img/svg/aside3_8.svg', link: 'developers' },
			{ text: 'Publishers', img: './img/svg/aside3_9.svg', link: 'publishers' },
		],
	},
	{
		title: 'Platforms',
		links: [
			{ text: 'PC', img: './img/svg/windows-icon.svg' },
			{ text: 'PlayStation 4', img: './img/svg/playstation-icon.svg' },
			{ text: 'Xbox One', img: './img/svg/xbox-icon.svg' },
			{ text: 'Nintendo Switch', img: './img/svg/nintendo-icon.svg' },
			{ text: 'iOS', img: './img/svg/ios-icon.svg' },
			{ text: 'Android', img: './img/svg/android-icon.svg' },
		],
	},
	{
		title: 'Genres',
		links: [
			{ text: 'Free Online Games', img: './img/aside5_1.png' },
			{ text: 'Action', img: './img/aside5_2.png' },
			{ text: 'Strategy', img: './img/aside5_3.png' },
			{ text: 'RPG', img: './img/aside5_4.png' },
			{ text: 'Shooter', img: './img/aside5_5.png' },
			{ text: 'Adventure', img: './img/aside5_6.png' },
			{ text: 'Puzzle', img: './img/aside5_7.png' },
			{ text: 'Racing', img: './img/aside5_8.png' },
			{ text: 'Sports', img: './img/aside5_9.png' },
		],
	},
]

function updateQueryParam(key, value) {
	const url = new URL(window.location)
	url.searchParams.set(key, value)
	window.history.pushState({}, '', url)
}

function generateAsideBlocks(containerId) {
	const container = document.getElementById(containerId)

	asideData.forEach((block, blockIndex) => {
		const asideBlock = document.createElement('div')
		asideBlock.classList.add('asideBlock')

		const title = document.createElement('h3')
		title.classList.add('asideTitle', 'mb-[8px]')
		title.textContent = block.title
		asideBlock.appendChild(title)

		const linksContainer = document.createElement('div')
		linksContainer.classList.add('linksContainer')

		block.links.forEach((link, index) => {
			const linkDiv = document.createElement('a')
			linkDiv.classList.add('linkItem')
			linkDiv.href = '#'

			if (link.notWorking) {
				linkDiv.classList.add('notWorking')
			} else {
				linkDiv.addEventListener('click', event => {
					event.preventDefault()

					const newFilter = link.link.toLowerCase().replace(/\s+/g, '_')

					if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
						window.location.href = `/index.html?filter=${newFilter}`
						return
					}

					updateQueryParam('filter', newFilter)

					if (!window.location.pathname.includes('gamePage.html')) {
						renderContent(false)
					}

					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					})
				})
			}

			const imgDiv = document.createElement('div')
			imgDiv.classList.add('imgWrapper')
			const img = document.createElement('img')
			img.src = link.img
			img.alt = link.text
			imgDiv.appendChild(img)

			const text = document.createElement('p')
			text.classList.add('asideText')
			text.textContent = link.text

			linkDiv.appendChild(imgDiv)
			linkDiv.appendChild(text)

			if (index >= 4) {
				linkDiv.style.display = 'none'
			}

			linksContainer.appendChild(linkDiv)
		})

		asideBlock.appendChild(linksContainer)

		if (block.links.length > 4) {
			const showMoreButton = document.createElement('div')
			showMoreButton.classList.add('linkItem', 'showMoreButton')

			const imgDiv = document.createElement('div')
			imgDiv.classList.add('imgWrapper')
			const img = document.createElement('img')
			img.src = './img/svg/arrow.svg'
			img.alt = 'Show All'
			imgDiv.appendChild(img)

			const text = document.createElement('p')
			text.classList.add('asideText')
			text.textContent = 'Show All'

			showMoreButton.appendChild(imgDiv)
			showMoreButton.appendChild(text)

			showMoreButton.addEventListener('click', () => {
				const hiddenLinks = linksContainer.querySelectorAll(
					'.linkItem:not(.showMoreButton)'
				)
				const isHidden = Array.from(hiddenLinks).some(
					link => link.style.display === 'none'
				)

				hiddenLinks.forEach((link, index) => {
					if (index >= 4) {
						link.style.display = isHidden ? 'flex' : 'none'
					}
				})

				text.textContent = isHidden ? 'Hide' : 'Show All'
				img.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)'
			})

			linksContainer.appendChild(showMoreButton)
		}

		container.appendChild(asideBlock)

		if (block.title === 'Top') {
			const allGamesDiv = document.createElement('div')
			allGamesDiv.classList.add('asideBlock')
			allGamesDiv.style.cursor = 'pointer'

			const allGamesLink = document.createElement('a')
			allGamesLink.classList.add('asideTitle', 'asideTitleLink', 'mb-[8px]')
			allGamesLink.textContent = 'All Games'

			allGamesLink.addEventListener('click', event => {
				event.preventDefault()

				if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
					window.location.href = '/index.html'
					return
				}

				updateQueryParam(
					'filter',
					"games".toLowerCase().replace(/\s+/g, '_')
				)
			})
			allGamesLink.addEventListener('click', () => {
				if (!window.location.pathname.includes('gamePage.html')) {
					renderContent(false)
				}
			})
			allGamesDiv.appendChild(allGamesLink)

			container.appendChild(allGamesDiv)
		}
	})
}

document.addEventListener('DOMContentLoaded', () => {
	generateAsideBlocks('asideBlocksContainer')
})
