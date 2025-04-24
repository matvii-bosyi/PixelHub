import { renderGames, renderPlatforms, renderStores, renderGenres, renderCreators, renderTags, renderDevelopers, renderPublishers } from './renders.js';

export function renderContent() {
	const url = 'https://api.rawg.io/api/'
	const query = new URLSearchParams(window.location.search).get('filter') ? new URLSearchParams(window.location.search).get('filter') : 'games'
	const APIKey = ''
	const reqUrl = `${url}${query}?key=${APIKey}`

	function sendRequest(method, url, body = {}) {
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

	sendRequest('GET', reqUrl)
		.then(data => {
			// console.log(data)
			if (renderMap[query]) {
				renderMap[query](data)
			}
		})
		.catch(error => {
			console.log(error)
		})
}

document.addEventListener('DOMContentLoaded', () => {
	renderContent()
})