import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const monthlySalesData = [
	{ month: "Jan", sales: 4000 },
	{ month: "Feb", sales: 3000 },
	{ month: "Mar", sales: 5000 },
	{ month: "Apr", sales: 4500 },
	{ month: "May", sales: 6000 },
	{ month: "Jun", sales: 5500 },
	{ month: "Jul", sales: 7000 },
	{ month: "Aug", sales: 4000 },
	{ month: "Sep", sales: 7500 },
	{ month: "Oct", sales: 5000 },
	{ month: "Nov", sales: 6000 },
	{ month: "Dec", sales: 6300 },
];

const SalesOverviewChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");

	const filteredData =
	selectedTimeRange === "All Time"
		? monthlySalesData
		: (() => {
				const index = monthlySalesData.findIndex(item => item.month === selectedTimeRange);
				if (index === -1) return [];

				const selected = monthlySalesData[index];

				// Choose previous and next month names if available
				const prev = monthlySalesData[index - 1] || { month: "", sales: 0 };
				const next = monthlySalesData[index + 1] || { month: "", sales: 0 };

				return [prev, selected, next];
		  })();


	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Sales Overview</h2>

				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 
          focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>All Time</option>
					{monthlySalesData.map((item) => (
						<option key={item.month}>{item.month}</option>
					))}
				</select>
			</div>

			<div className='w-full h-80'>
				<ResponsiveContainer>
					<AreaChart data={filteredData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Area type='monotone' dataKey='sales' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
