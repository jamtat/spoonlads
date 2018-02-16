import React from 'react'
import shuffle from 'lodash/shuffle'
import './Loading.css'

import logo from '../img/logo.svg'

const SPOONY_THINGS = shuffle( `
laying out a wide variety of carpets
microwaving mixed grills
two for twelve pounding pitchers
regretting curry club
pretending the order and pay app works
destroying the 9:30am pint
studying the racing post
`.trim().split( '\n' ) )

class Ticker extends React.Component {
	state = {
		index: 0,
		items: this.props.items
	}

	interval = null

	componentDidMount() {
		setInterval( this.updateIndex, 500 )
	}

	componentWillUnmount() {
		clearInterval( this.interval )
	}

	updateIndex = () => this.setState( {
		index: (this.state.index + 1) % this.props.items.length
	} )

	render() {
		const { items } = this.props
		const { index } = this.state
		return items[ index ]
	}
}

const Loading = () => {

	return (
		<div className='loading'>
			<img
				src={ logo }
				alt='logo' />
			<div className='dividing-bar'></div>
			<div className='megalols'>
				<Ticker items={ SPOONY_THINGS } />
			</div>
		</div>
	)
}

export default Loading
