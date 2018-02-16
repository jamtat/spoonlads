import flatMap from 'lodash/flatMap'

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
