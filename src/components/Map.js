import React from 'react'
import { GoogleMap, Marker, Circle, withGoogleMap } from 'react-google-maps'
import './Map.css'

const locationFromPub = ( { lat, lng } ) => ({
	lat,
	lng
})

const markerFromPub = ( pub, onPubClick ) => (
	<Marker
		key={ pub.id }
		title={ pub.name }
		onClick={ () => onPubClick( pub ) }
		position={ locationFromPub( pub ) } />
)

const DEFAULT_LOCATION = {
	lat: 54.5,
	lng: -2.5
}

const DEFAULT_ZOOM = 6

let lastZoom = DEFAULT_ZOOM

const Map = withGoogleMap( ( {
		location,
		zoom,
		pubs = {
			regions: []
		},
		facilities = {},
		onPubClick
	} ) => {

	location = location || DEFAULT_LOCATION
	zoom = zoom || DEFAULT_ZOOM

	const markers = pubs.map( pub => markerFromPub( pub, onPubClick ) )
	console.log( 'location', location )

	const viewParams = zoom !== lastZoom && location !== DEFAULT_LOCATION? {
		zoom,
		center: location
	}: null

	if ( viewParams )
		lastZoom = zoom

	return (
		<GoogleMap
			{...viewParams}
			defaultZoom={ zoom }
			defaultCenter={ location }>
			{ markers }
			<PersonalMarker location={ location } />
		</GoogleMap>
	)
} )

const PERSONAL_MARKER_PATH_OPTIONS = () => ({
	path: window.google.maps.SymbolPath.CIRCLE,
	scale: 7,
	fillOpacity: 1,
	fillColor: '#4286f4',
	strokeColor: 'white',
	strokeWeight: 2
})

const PersonalMarker = ( { location } ) => location !== null && location !== DEFAULT_LOCATION? (
	<Marker
		position={ location }
		icon={ PERSONAL_MARKER_PATH_OPTIONS() } />
	) : null

const MapContainer = ( props ) => {
	const container = (
	<div className='map-container'></div>
	)

	const element = (
	<div className='map-element'></div>
	)
	return (
		<Map
			containerElement={ container }
			mapElement={ element }
			{...props}/>
	)
}

export default MapContainer
