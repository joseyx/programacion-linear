import solver from "javascript-lp-solver";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const App = () => {
	const model = {};
	const chartRef = useRef(null);
	const chartInstanceRef = useRef(null);

	// Agrega propiedades al objeto model
	model.optimize = "price";
	model.opType = "min";
	model.constraints = {};
	model.variables = {};

	// agrega restricciones al objeto model
	model.constraints.screenSize = { min: 6 };
	model.constraints.memory = { min: 128 };

	console.log(model.constraints);

	// agrega variables al objeto model
	model.variables.product = {
		name: "Samsung Galaxy S22",
		price: 799,
		screenSize: 6.1,
		memory: 128,
	};

	// agrega un nuevo telefono al objeto model
	model.variables.product2 = {
		name: "Google Pixel 6 Pro",
		price: 999,
		screenSize: 6.2,
		memory: 256,
	};

	// resuelve el modelo
	const results = solver.Solve(model);

	const generateChart = (results) => {
		const chartElement = chartRef.current;

		if (chartElement) {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			const chartData = {
				labels: ["Samsung S22", "Google Pixel 6 Pro"],
				datasets: [
					{
						label: "Solución Óptima",
						data: [results.product * 100, results.product2 * 100],
						backgroundColor: [
							"rgba(54, 162, 235, 0.5)",
							"rgba(75, 192, 192, 0.5)",
						],
						borderColor: [
							"rgba(54, 162, 235, 1)",
							"rgba(75, 192, 192, 1)",
						],
						borderWidth: 1,
					},
				],
			};

			chartInstanceRef.current = new Chart(chartElement, {
				type: "bar",
				data: chartData,
				options: {
					scales: {
						y: {
							beginAtZero: true,
							max: 100,
							ticks: {
								stepSize: 10,
							},
						},
					},
				},
			});
		}
	};
	useEffect(() => {
		generateChart(results);

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
			chartInstanceRef.current = null;
		};
	}, [results]);

	// muestra los resultados en consola
	console.log(model.variables);
	console.log(results);

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto py-8">
				<h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
					Programacion linear
				</h1>
				<p className="text-lg text-center mb-8 text-gray-700">
					Obtener mediante la minimización, cuál teléfono inteligente
					es una mejor compra basándose en el precio y ciertas
					limitaciones establecidas.
				</p>
				<div className="grid grid-cols-2 gap-8">
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h2 className="text-xl font-bold mb-4 text-gray-800">
							Samsung S22
						</h2>
						<p className="mb-2">
							Solucion optima: {results.product * 100}%
						</p>
						<div className="h-4 bg-blue-500 rounded-full">
							<div
								className="h-full bg-blue-200 rounded-full"
								style={{ width: `${results.product}%` }}
							></div>
						</div>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h2 className="text-xl font-bold mb-4 text-gray-800">
							Goole pixel 6 PRO
						</h2>
						<p className="mb-2">
							Solucion optima: {results.product2 * 100}%
						</p>
						<div className="h-4 bg-green-500 rounded-full">
							<div
								className="h-full bg-green-200 rounded-full"
								style={{ width: `${results.product2}%` }}
							></div>
						</div>
					</div>
				</div>
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	);
};

export default App;
