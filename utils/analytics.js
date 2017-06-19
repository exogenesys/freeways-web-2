import ReactGA from 'react-ga'

export const initGA = () => {
	ReactGA.initialize('UA-84262726-1')
}

export const logPageView = () => {
	ReactGA.set({page: window.location.pathname + window.location.search })
	ReactGA.pageview(window.location.pathname + window.location.search )
}

export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({category, action})
	}
}

export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({description, fatal})
	}
}

export default undefined
