import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

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
}).reverse();

const Revenue = [
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

const TotalRevenue = Revenue.reduce((sum, source) => sum + source.value, 0);

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
			value: `$${TotalRevenue * 0.3}`
		},
		{
			title: 'Total Revenue',
			value: `$${TotalRevenue}`
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
		<Card>
		<PieChart
			series={[
				{data: Revenue.map((source, i) => ({
					id: i, value: source.value, label: source.title
				}))},
			]}
			width={400}
			height={200}
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