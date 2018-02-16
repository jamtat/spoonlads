import React from 'react'

import Loading from './Loading'

import { timer } from '../lib/utils'

class Spoonlads extends React.Component {
	state = {
		loading: true,
		error: null,
		pubs: null,
		facilities: null
	}

	componentDidMount() {
		this.fetchData()
	}

	async fetchData() {
		try {
			const [ pubs, facilities ] = await Promise.all( [
				fetch( '/data/pubs.json' ),
				fetch( '/data/facilities.json' ),
				timer( 1500 )
			] )
			this.setState( {
				pubs,
				facilities,
				loading: false
			} )
		} catch (err) {
			this.setState( {
				loading: false,
				error: err
			} )
		}
	}

	render() {
		const {
			loading,
			error,
			pubs,
			facilities
		} = this.state

		if ( loading ) {
			return (
				<main>
					<Loading/>
				</main>
			)
		}
		return (
			<main>
				fuk
			</main>
		)
	}
}


export default Spoonlads
