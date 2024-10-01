import React from 'react';
import Dashboard from './Dashboard';

import { Typography } from '@mui/material';

// Main component of the SPA. If there were other menus they would all be displayed from this page.
const Home = () => {
	return <div style={{
		backgroundColor:' #F7F7F7',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}}>
		<Typography style={{
			color: 'cornflowerblue',
			fontSize: '5rem',
			fontFamily: 'Brush Script MT',
			fontStyle: 'italic'
		}}>Streamify</Typography>
		<Dashboard />
	</div>
};

export default Home;