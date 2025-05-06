import {
	renderCreators,
	renderDevelopers,
	renderGamePage,
	renderGames,
	renderGenres,
	renderPlatforms,
	renderPublishers,
	renderStores,
	renderTags,
} from './renders.js'

let nextPageUrl = null
let isLoading = false

function checkContentHeight() {
	const contentContainer = document.getElementById('contentContainer')
	if (!contentContainer) return

	const windowHeight = window.innerHeight
	if (contentContainer.offsetHeight < windowHeight && nextPageUrl) {
		loadNextPage()
	}
}

function sendRequest(method, url) {
	const headers = {
		'Content-Type': 'application/json',
	}

	return fetch(url, {
		method: method,
		headers: headers,
	}).then(response => {
		if (response.ok) {
			return response.json()
		}

		return response.json().then(err => {
			const e = new Error('Something went wrong')
			e.data = err
			throw e
		})
	})
}

export function renderContent(append = false) {
	const url = 'https://api.rawg.io/api/'
	let filter = null
	const searchParams = new URLSearchParams(window.location.search)

	if (!searchParams.has('filter')) {
		searchParams.set('filter', 'games')
		filter = 'games'

		const newUrl = `${window.location.pathname}?${searchParams.toString()}`
		try {
			window.history.replaceState({}, '', newUrl)
		} catch (error) {
			console.error('Failed to update URL:', error)
		}
	} else {
		filter = searchParams.get('filter')
	}

	const ordering = new URLSearchParams(window.location.search).get('ordering') || 'popularity'
	const APIKey = '1d238169109b4ffe9eaf244df6dea4f9'
	let reqUrl = `${url}${filter}?key=${APIKey}`

	if (filter === 'games') {
		reqUrl += `&ordering=${ordering}`
	} else {
		const url = new URL(window.location)
		url.searchParams.delete('ordering')
		try {
			window.history.replaceState({}, '', url)
		} catch (error) {
			console.error('Failed to update URL:', error)
		}
	}

	sendRequest('GET', reqUrl)
		.then(data => {
			const contentContainer = document.getElementById('contentContainer')
			if (!contentContainer) {
				console.error('Content container not found')
				return
			}

			if (!append) {
				contentContainer.innerHTML = ''
			}

			const renderMap = {
				games: renderGames,
				platforms: renderPlatforms,
				stores: renderStores,
				genres: renderGenres,
				creators: renderCreators,
				tags: renderTags,
				developers: renderDevelopers,
				publishers: renderPublishers,
			}

			if (renderMap[filter]) {
				renderMap[filter](data, append)
			}
			nextPageUrl = data.next

			checkContentHeight()
		})
		.catch(error => {
			console.error('Error fetching data:', error)
		})
}

function loadNextPage() {
	if (!nextPageUrl || isLoading) return

	isLoading = true

	sendRequest('GET', nextPageUrl)
		.then(data => {
			const filter =
				new URLSearchParams(window.location.search).get('filter') || 'games'
			const renderMap = {
				games: renderGames,
				platforms: renderPlatforms,
				stores: renderStores,
				genres: renderGenres,
				creators: renderCreators,
				tags: renderTags,
				developers: renderDevelopers,
				publishers: renderPublishers,
			}

			if (renderMap[filter]) {
				renderMap[filter](data, true)
			}
			nextPageUrl = data.next
			isLoading = false

			checkContentHeight()
		})
		.catch(error => {
			console.error('Error loading next page:', error)
			isLoading = false
		})
}

window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY + window.innerHeight
	const scrollHeight = document.documentElement.scrollHeight

	if (scrollPosition >= scrollHeight * 0.97) {
		loadNextPage()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const searchParams = new URLSearchParams(window.location.search)

	if (window.location.pathname.includes('gamePage.html')) {
		if (searchParams.has('id')) {
			const gameId = searchParams.get('id')
			const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`

			sendRequest('GET', url)
				.then(data => {
					renderGamePage(data)
				})
				.catch(error => {
					console.error('Error fetching game data:', error)
				})
		}
		return
	}

	renderContent()
	
})