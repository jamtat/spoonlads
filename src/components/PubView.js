import React from 'react'
import { computeDistanceToPub } from '../lib/utils'
import './PubView.css'

const PubView = ( { pub, location, onClose } ) => {

	if ( !pub )
		return null

	const distance = computeDistanceToPub( location, pub )

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
			</div>
			<div className='pub-view-right'>
				<div className='pub-view-distance'>
					{ `${distance.toFixed(2)}km` }
				</div>
			</div>
		</div>
	)
}

export default PubView
