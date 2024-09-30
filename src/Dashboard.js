import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, PieChart, BarChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';

// Random increasing number of active and total Users
const activeUsers = Array.from(Array(12)).map((_, i) => Math.floor(Math.random() * 100 + 50 * i))
const totalUsers = Array.from(Array(12)).map((_, i) => {
	let total = 0;
	for (let j = 0; j < i + 1; j++){
		total += activeUsers[j] * (j + 1) / (i + 1);
	}
	return total;
})

// Get the past 12 months
const months = Array.from(Array(12)).map((_, i) => {
	const date = new Date();
	let month = date.getMonth() - i;
	if (month < 0) month += 12
	return (new Date(2000, month, 1)).toLocaleString('default', {month: 'short'})
}).reverse();

// Total Revenue from all sources all time
const revenue = [
	{
		title: 'Subscribed Users',
		value: 2309
	},
	{
		title: 'Premium Users',
		value: 23890
	},
	{
		title: 'Advertisements',
		value: 23099
	},
	{
		title: 'Artists',
		value: 39204
	}
]

const totalRevenue = revenue.reduce((sum, source) => sum + source.value, 0);

const artists = ['Archie', 'Billy', 'Caroline', 'Darlene', 'Ethan', 'Francine', 'Greta']

// Streams from songs in the past 30 days
const songs = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	.split(' ').map(song => ({title: song, streams: Math.floor(Math.random() * 10000), artist: artists[Math.floor(Math.random() * 7)]}))
	.sort((a, b) => b.streams - a.streams);

const totalStreams = songs.reduce((total, song) => total + song.streams, 0);
const topSongs = songs.slice(0, 5);

const cardInfo = [
	[
		{
			title: 'Active Users',
			value: activeUsers[11]
		},
		{
			title: 'Total Users',
			value: totalUsers[11]
		}
	],
	[
		{
			title: 'Monthly Streams',
			value: totalStreams
		},
		{
			title: 'Total Streams',
			value: totalStreams * 3
		}
	],
	[
		{
			title: 'Monthly Revenue',
			value: `$${totalRevenue * 0.3}`
		},
		{
			title: 'Total Revenue',
			value: `$${totalRevenue}`
		}
	],
	[
		{
			title: 'Top Artist',
			value: songs[0].artist
		},
		{
			title: 'All-time Artist',
			value: artists[3]
		}
	],
]

// 30 most recent streams from users
const recentStreams = Array.from(Array(30)).map((_, i) => {
	// Squaring the random number makes it more likely for the song selected to be near the top of the list (has more streams this month)
	const song = songs[Math.floor(Math.random() * Math.random() * (songs.length - 1))]

	const date = new Date();
	const month = date.getMonth() + 1; // months from 1-12
	const day = date.getDate();
	const year = date.getFullYear();

	return {
		id: i + 1,
		title: song.title,
		artist: song.artist,
		date: `${month}/${day}/${year}`,
		streams: song.streams,
		userID: `#${Math.floor(Math.random() * 1000000000)}`
	}
})

// Cards with key metrics
const Cards = () => {
	return cardInfo.map((card, key) => {
		const monthly = card[0];
		const total = card[1]
		return <Card key={key}>
			<Typography>{monthly.title}: {monthly.value}</Typography>
			<Typography>{total.title}: {total.value}</Typography>
		</Card>
	})
};

// Important Graphs from past 12 months
const Graphs = () => {
	return <div>
		<Card>
			<LineChart  
				xAxis={[{ data: months, scaleType: 'point', }]}
				series={[
					{data: activeUsers, label: 'Active Users'},
					{data: totalUsers, label: 'Total Users'}
				]}
				width={500}
				height={300}/>
		</Card>
		<Card>
		<PieChart
			series={[
				{data: revenue.map((source, i) => ({
					id: i, value: source.value, label: source.title
				}))},
			]}
			width={400}
			height={200}
			/>
		</Card>
		<Card>
		<BarChart
			xAxis={[{ scaleType: 'band', data: ['songs'] }]}
			series={topSongs.map(song => ({data: [song.streams], label: song.title}))}
			width={500}
			height={300}
			/>
		</Card>
	</div>
}

const Table = () => {
	const columns = [
		{
			field: 'id',
			headerName: 'Number',
			width: 90
		},
		{ 
			field: 'title',
			headerName: 'Song Name',
			width: 90
		},
		{
		  field: 'artist',
		  headerName: 'Artist',
		  width: 150,
		},
		{
		  field: 'date',
		  headerName: 'Date Streamed',
		  width: 150,
		},
		{
		  field: 'streams',
		  headerName: 'Stream Count',
		  width: 110,
		},
		{
		  field: 'userID',
		  headerName: 'User ID',
		  width: 160,
		},
	];

	return <DataGrid
		rows={recentStreams}
		columns={columns}
		initialState={{
		pagination: {
			paginationModel: {
			pageSize: 5,
			},
		},
		}}
		pageSizeOptions={[5]}
		checkboxSelection
		disableRowSelectionOnClick
  />
}

const Dashboard = () => {
	return <div>
		<Cards />
		<Graphs />
		<Table />
	</div>
};

export default Dashboard;