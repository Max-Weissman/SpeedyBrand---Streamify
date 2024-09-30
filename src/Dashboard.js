import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, PieChart, BarChart } from '@mui/x-charts';

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

// Streams from songs in the past 30 days
const songs = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	.split(' ').map(song => ({title: song, streams: Math.floor(Math.random() * 10000)}))
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
			value: 'Lorem Ipsum'
		},
		{
			title: 'All-time Artist',
			value: 'Lorem Ipsum'
		}
	],
]

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

const Dashboard = () => {
	return <div>
		<Cards />
		<Graphs />
	</div>
};

export default Dashboard;