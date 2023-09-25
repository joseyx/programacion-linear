import { useState } from "react";
import solver from "javascript-lp-solver/src/solver.js";

function App() {
	const [constraints, setConstraints] = useState({});
	const [variables, setVariables] = useState({});
	const [optimize, setOptimize] = useState("");
	const [results, setResults] = useState(null);

	const handleAddConstraint = () => {
		const constraintName = prompt(
			"Ingrese el nombre de la variable a restringir:"
		);
		const constraintValue = prompt("Ingrese el valor de la restricción:");
		setConstraints((prevConstraints) => ({
			...prevConstraints,
			[constraintName]: { max: Number(constraintValue) },
		}));
	};

	const handleAddVariable = () => {
		const variableName = prompt("Ingrese el nombre del producto:");
		const variableValues = {};
		const variableValueCount = prompt(
			"Ingrese la cantidad de valores que tendrá la variable:"
		);

		for (let i = 0; i < variableValueCount; i++) {
			const valueName = prompt(
				`Ingrese el nombre de la variable ${i + 1}:`
			);
			const value = prompt(`Ingrese el valor de la variable ${i + 1}:`);
			variableValues[valueName] = Number(value);
		}

		setVariables((prevVariables) => ({
			...prevVariables,
			[variableName]: variableValues,
		}));
	};

	const handleSolve = () => {
		const model = {
			optimize,
			opType: "min",
			constraints,
			variables,
		};

		const solverResults = solver.Solve(model);
		setResults(solverResults);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				Problema de minimización. Programación Lineal
			</h1>

			<div className="mb-4">
				<h2 className="text-lg font-bold mb-2">Variables</h2>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleAddVariable}
				>
					Agregar variable
				</button>
				<pre className="mt-2 p-2 bg-gray-200">
					{JSON.stringify(variables, null, 2)}
				</pre>
			</div>

			<div className="mb-4">
				<h2 className="text-lg font-bold mb-2">Restricciones</h2>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleAddConstraint}
				>
					Agregar restricción
				</button>
				<pre className="mt-2 p-2 bg-gray-200">
					{JSON.stringify(constraints, null, 2)}
				</pre>
			</div>

			<div className="mb-4">
				<h2 className="text-lg font-bold mb-2">Optimización</h2>
				<label className="block mb-2">
					Variable a optimizar:
					<input
						className="border border-gray-400 rounded px-2 py-1"
						type="text"
						value={optimize}
						onChange={(e) => setOptimize(e.target.value)}
					/>
				</label>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleSolve}
				>
					Mostrar solución
				</button>
			</div>

			{results && (
				<div>
					<h2 className="text-lg font-bold mb-2">Resultados</h2>
					<pre className="p-2 bg-gray-200">
						{JSON.stringify(results, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}

export default App;
