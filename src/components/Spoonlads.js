import React from 'react'
import { timer, flattenPubs, composePubDetail } from '../lib/utils'

import Loading from './Loading'
import Map from './Map'
import PubView from './PubView'

class Spoonlads extends React.Component {
	state = {
		loading: true,
		error: null,
		pubs: null,
		facilities: null,
		detail: null,
		chosenPub: null,
		location: null
	}

	positionWatcher = null

	componentDidMount() {
		this.fetchData()
	}

	componentWillUnmount() {
		if ( this.positionWatcher )
			window.navigator.geolocation.clearWatch( this.positionWatcher )
	}

	async fetchData() {
		try {
			const [ pubsResponse, facilitiesResponse, detailResponse ] = await Promise.all( [
				fetch( '/data/pubs.json' ),
				fetch( '/data/facilities.json' ),
				fetch( '/data/pubs-detail.json' ),
				timer( window.location.href.indexOf( 'localhost' ) === -1? 1500 : 100 )
			] )

			const pubs = flattenPubs( await pubsResponse.json() )
			const detail = composePubDetail( await detailResponse.json() )
			const facilities = await facilitiesResponse.json()

			this.setState( {
				pubs,
				facilities,
				detail,
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

	setPub = pub => this.setState( {
		chosenPub: pub
	} )

	async fetchLocation() {
		window.navigator.geolocation.getCurrentPosition( position => {
			console.log( position )
			this.setPosition( position )

			this.positionWatcher = window.navigator.geolocation.watchPosition( potision => {
				console.log( position )
				this.setPosition( position )
			}, err => console.error( err ), {
				enableHighAccuracy: true
			} )
		}, err => console.error( err ), {
			enableHighAccuracy: true
		} )
	}

	render() {
		const {
			loading,
			error,
			pubs,
			facilities,
			location,
			detail,
			chosenPub
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

		if ( chosenPub )
			console.log( chosenPub )

		return (
			<main>
				<Map
					pubs={ pubs }
					chosenPub={ chosenPub }
					facilities={ facilities }
					location={ location }
					onPubClick={ this.setPub }
					zoom={ location ? 12 : undefined } />
				<PubView
					pub={ chosenPub }
					location={ location }
					detail={ chosenPub ? detail[ chosenPub.id ]: null }
					onClose={ () => this.setPub( null ) } />
			</main>
		)
	}
}


export default Spoonlads
