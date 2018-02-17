import React from 'react'
import { computeDistanceToPub } from '../lib/utils'
import './PubView.css'

const WEEKDAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

const PubView = ( { pub, location, detail, onClose } ) => {

	if ( !pub )
		return null

	const distance = computeDistanceToPub( location, pub )

	console.log( detail )

	return (
		<div className='pub-view'>
			<div className='pub-view-left'>
				<div className='pub-view-name'>
					{ pub.name }
				</div>
				<div className='pub-view-address'>
					<div className='pub-view-street'>
						{ pub.address1 }
					</div>
					<div className='pub-view-postcode'>
						{ pub.postcode }
					</div>
				</div>
				<OpeningTimes
					pub={ pub }
					openingTimes={ detail.openingTimes } />
			</div>
			<div className='pub-view-right'>
				<div className='pub-view-distance'>
					{ `${distance.toFixed(2)}km` }
				</div>
			</div>
		</div>
	)
}

const OpeningTimes = ( { pub, openingTimes } ) => {
	if ( !openingTimes )
		return null

	const today = WEEKDAYS[ (new Date()).getDay() ]

	const openToday = openingTimes[ today ]

	const message = openToday ? (
		`Open Today: ${openToday}`
		) : 'Closed Today'

	return (
		<div className='pub-view-openingtimes'>
			{ message }
		</div>
	)
}

export default PubView
