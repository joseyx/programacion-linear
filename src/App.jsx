import { useState } from "react";
import solver from "javascript-lp-solver/src/solver.js";

function App() {
	const [constraints, setConstraints] = useState({});
	const [variables, setVariables] = useState({});
	const [optimize, setOptimize] = useState("");
	const [results, setResults] = useState(null);

	// Función para agregar una restricción
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

	// Función para agregar una variable
	const handleAddVariable = () => {
		const variableName = prompt("Ingrese el nombre de la variable:");
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

	// Función para resolver el problema de optimización
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
		<div>
			<h1>Problema de minimización. Programación Lineal</h1>

			<h2>Variables</h2>
			<button onClick={handleAddVariable}>Agregar variable</button>
			<pre>{JSON.stringify(variables, null, 2)}</pre>

			<h2>Restricciones</h2>
			<button onClick={handleAddConstraint}>Agregar restricción</button>
			<pre>{JSON.stringify(constraints, null, 2)}</pre>

			<h2>Optimización</h2>
			<label>
				Variable a optimizar:
				<input
					type="text"
					value={optimize}
					onChange={(e) => setOptimize(e.target.value)}
				/>
			</label>

			<button onClick={handleSolve}>Mostrar solución</button>

			{results && (
				<div>
					<h2>Resultados</h2>
					<pre>{JSON.stringify(results, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}

export default App;
