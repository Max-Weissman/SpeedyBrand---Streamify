import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

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
const Months = Array.from(Array(12)).map((_, i) => {
	const date = new Date();
	let month = date.getMonth() - i;
	if (month < 0) month += 12
	return (new Date(2000, month, 1)).toLocaleString('default', {month: 'short'})
}).reverse()

const CardInfo = [
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
			value: 434
		},
		{
			title: 'Total Streams',
			value: 3424
		}
	],
	[
		{
			title: 'Monthly Revenue',
			value: '$2332'
		},
		{
			title: 'Total Revenue',
			value: '$232323'
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
	return CardInfo.map((card, key) => {
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
				xAxis={[{ data: Months, scaleType: 'point', }]}
				series={[
					{data: activeUsers, label: 'Active Users'},
					{data: totalUsers, label: 'Total Users'}
				]}
				width={500}
				height={300}/>
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