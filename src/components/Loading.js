import React from 'react'
import './Loading.css'

const Loading = ( props ) => (
	<div className='loading'>
		<pre>{ JSON.stringify( props, null, '  ' ) }</pre>
	</div>
)

export default Loading
