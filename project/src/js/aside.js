const asideData = [
	{
		title: 'New Releases',
		links: [
			{ text: 'Last 30 days', img: './img/svg/aside1_1.svg' },
			{ text: 'This week', img: './img/svg/aside1_2.svg' },
			{ text: 'Next week', img: './img/svg/aside1_3.svg' },
			{ text: 'Release calendar', img: './img/svg/aside1_4.svg' },
		],
	},
	{
		title: 'Top',
		links: [
			{ text: 'Best of the year', img: './img/svg/aside2_1.svg' },
			{ text: 'Popular in 2024', img: './img/svg/aside2_2.svg' },
			{ text: 'All time top 250', img: './img/svg/aside2_3.svg' },
		],
	},
	{
		title: 'Browse',
		links: [
			{ text: 'Platforms', img: './img/svg/aside3_1.svg' },
			{ text: 'Stores', img: './img/svg/aside3_2.svg' },
			{ text: 'Collections', img: './img/svg/aside3_3.svg' },
			{ text: 'Reviews', img: './img/svg/aside3_4.svg' },
			{ text: 'Genres', img: './img/svg/aside3_5.svg' },
			{ text: 'Creators', img: './img/svg/aside3_6.svg' },
			{ text: 'Tags', img: './img/svg/aside3_7.svg' },
			{ text: 'Developers', img: './img/svg/aside3_8.svg' },
			{ text: 'Publishers', img: './img/svg/aside3_9.svg' },
		],
	},
	{
		title: 'Platforms',
		links: [
			{ text: 'PC', img: './img/svg/aside4_1.svg' },
			{ text: 'PlayStation 4', img: './img/svg/aside4_2.svg' },
			{ text: 'Xbox One', img: './img/svg/aside4_3.svg' },
			{ text: 'Nintendo Switch', img: './img/svg/aside4_4.svg' },
			{ text: 'iOS', img: './img/svg/aside4_5.svg' },
			{ text: 'Android', img: './img/svg/aside4_6.svg' },
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
			const linkDiv = document.createElement('div')
			linkDiv.classList.add('linkItem')
			if (index >= 3) linkDiv.style.display = 'none'

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
					if (index >= 3) {
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

			const allGamesLink = document.createElement('a')
			allGamesLink.classList.add('asideTitle', 'asideTitleLink', 'mb-[8px]')
			allGamesLink.textContent = 'All Games'
			allGamesLink.href = '#'
			allGamesDiv.appendChild(allGamesLink)

			container.appendChild(allGamesDiv)
		}
	})
}

document.addEventListener('DOMContentLoaded', () => {
	generateAsideBlocks('asideBlocksContainer')
})