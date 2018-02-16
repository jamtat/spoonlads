import React from 'react'
import './Loading.css'

import logo from '../img/logo.svg'

const Loading = ( props ) => (
	<div className='loading'>
		<img
			src={ logo }
			alt='logo' />
		<div className='loading-bar'></div>
	</div>
)

export default Loading
