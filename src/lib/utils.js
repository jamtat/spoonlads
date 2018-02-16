import flatMap from 'lodash/flatMap'
import haversine from 'haversine'

export const timer = delay => new Promise( resolve => setTimeout( resolve, delay ) )

export const flattenPubs = pubs => flatMap( pubs.regions, r => {
	const { region, subRegions } = r
	return flatMap( subRegions, s => {
		const { items, name: subRegion } = s
		return items.map( pub => ({
			region,
			subRegion,
			...pub
		}) )
	} )
} )

export const computeDistanceToPub = ( location, pub ) => haversine( {
	latitude: location.lat,
	longitude: location.lng
}, {
	latitude: pub.lat,
	longitude: pub.lng
} )
