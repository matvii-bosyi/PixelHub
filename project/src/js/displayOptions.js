import { updateCardHeights } from './renders.js'

document.addEventListener('DOMContentLoaded', () => {
	const gridOption = document.getElementById('gridDisplayOption')
	const listOption = document.getElementById('listDisplayOption')
	const contentContainer = document.getElementById('contentContainer')

	const savedDisplay = localStorage.getItem('displayOption') || 'grid'
	contentContainer.setAttribute('data-display', savedDisplay)
	gridOption.setAttribute(
		'data-active',
		savedDisplay === 'grid' ? 'true' : 'false'
	)
	listOption.setAttribute(
		'data-active',
		savedDisplay === 'list' ? 'true' : 'false'
	)

	const toggleDisplay = option => {
		if (option === 'grid') {
			contentContainer.setAttribute('data-display', 'grid')
			gridOption.setAttribute('data-active', 'true')
			listOption.setAttribute('data-active', 'false')
			localStorage.setItem('displayOption', 'grid')
		} else if (option === 'list') {
			contentContainer.setAttribute('data-display', 'list')
			gridOption.setAttribute('data-active', 'false')
			listOption.setAttribute('data-active', 'true')
			localStorage.setItem('displayOption', 'list')
			updateCardHeights()
		}
	}

	gridOption.addEventListener('click', () => toggleDisplay('grid'))
	listOption.addEventListener('click', () => toggleDisplay('list'))
})