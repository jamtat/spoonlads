import React from 'react'

import Loading from './Loading'
import Map from './Map'
import { timer, flattenPubs } from '../lib/utils'

class Spoonlads extends React.Component {
	state = {
		loading: true,
		error: null,
		pubs: null,
		facilities: null,
		location: null
	}

	componentDidMount() {
		this.fetchData()
	}

	async fetchData() {
		try {
			const [ pubsResponse, facilitiesResponse ] = await Promise.all( [
				fetch( '/data/pubs.json' ),
				fetch( '/data/facilities.json' ),
				timer( 100 )
			] )

			const pubs = flattenPubs( await pubsResponse.json() )
			const facilities = await facilitiesResponse.json()

			this.setState( {
				pubs,
				facilities,
				loading: false
			} )
		} catch (err) {
			console.error( err )
			this.setState( {
				loading: false,
				error: err
			} )
		}

		await timer( 100 )

		this.fetchLocation()
	}

	setPosition = position => this.setState( {
		location: {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		}
	} )

	async fetchLocation() {
		window.navigator.geolocation.getCurrentPosition( position => {
			console.log( position )
			this.setPosition( position )
		} )
	}

	render() {
		const {
			loading,
			error,
			pubs,
			facilities,
			location
		} = this.state

		if ( error ) {
			return (
				<main>
					<div className='error-main'>
						There was an error loading the map, sorry :(
					</div>
				</main>
			)
		}

		if ( loading ) {
			return (
				<main>
					<Loading/>
				</main>
			)
		}

		return (
			<main>
				<Map
					pubs={ pubs }
					facilities={ facilities }
					location={ location }
					onPubClick={ pub => console.log( pub ) }
					zoom={ location ? 11 : undefined } />
			</main>
		)
	}
}


export default Spoonlads
