import "./Moderation.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
function FlagIcon(prop) {
	if (prop.flag === true) {
		return <Icon.CheckCircleFill color="lightgreen" size={25} />;
	} else {
		return <Icon.XCircleFill color="#FFCCCB" size={25} />;
	}
}

export default function Moderation() {
	const bottomRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [resultHistory, setResultHistory] = useState([]);
	/*const testResults = [
		{
			id: crypto.randomUUID(),
			flagged: true,
			categories: {
				hate: false,
				threatening: true,
				selfHarm: false,
				sexual: true,
				violence: false,
				graphic: true,
			},
			categoryScores: {
				hate: 0.1,
				threatening: 0.5,
				selfHarm: 0,
				sexual: 0.2,
				violence: 0.3,
				graphic: 0.35,
			},
			timeStamp: "11:26:14",
		},
		{
			id: crypto.randomUUID(),
			flagged: false,
			categories: {
				hate: false,
				threatening: true,
				selfHarm: false,
				sexual: true,
				violence: false,
				graphic: true,
			},
			categoryScores: {
				hate: 0.1,
				threatening: 0.5,
				selfHarm: 0,
				sexual: 0.2,
				violence: 0.3,
				graphic: 0.35,
			},
			timeStamp: "11:26:14",
		},
	];*/

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [userInput]);

	useEffect(() => {
		console.log("useEffect called");
		console.log(Object.keys(results).length !== 0);
		if (Object.keys(results).length !== 0) {
			let today = new Date();
			let newResult = {
				id: crypto.randomUUID(),
				userPrompt: userInput,
				flagged: results.flagged,
				categories: {
					hate: results.categories.hate,
					threatening: results.categories["hate/threatening"],
					selfHarm: results.categories["self-harm"],
					sexual: results.categories.sexual,
					minors: results.categories["sexual/minors"],
					violence: results.categories.violence,
					graphic: results.categories["violence/graphic"],
				},
				categoryScores: {
					hate: results.category_scores.hate,
					threatening: results.category_scores["hate/threatening"],
					selfHarm: results.category_scores["self-harm"],
					sexual: results.category_scores.sexual,
					minors: results.category_scores["sexual/minors"],
					violence: results.category_scores.violence,
					graphic: results.category_scores["violence/graphic"],
				},
				timeStamp:
					today.getHours() +
					":" +
					today.getMinutes() +
					":" +
					today.getSeconds(),
			};
			resultHistory.push(newResult);

			setIsLoading(false);
		}
		setUserInput("");
	}, [results]);

	const submitUserInput = () => {
		setIsLoading(true);
		//call backend for result
		axios
			.post(`https://localhost:7290/ChatApi/AIMod?input=${userInput}`)
			.then((res) => setResults(res.data))
			.catch((error) => console.log(error));
	};

	return (
		<div className="moderation">
			<div className="title">
				<h1>Moderation Ai</h1>
			</div>
			<ul className="results-container">
				{resultHistory?.map((result) => (
					<li className="msg-result" key={result.id}>
						<span>User Prompt: </span> {result.userPrompt}
						<div>
							<span>Flagged By Mod: </span>
							<FlagIcon flag={result.flagged} />
						</div>
						<Table striped>
							<thead>
								<tr>
									<th></th>
									<th>Hate</th>
									<th>Hate/Threatening</th>
									<th>Self Harm</th>
									<th>Sexual</th>
									<th>Sexual/Minors</th>
									<th>Violence</th>
									<th>Graphic</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Flagged</td>
									<td>
										<FlagIcon
											flag={result.categories.hate}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.threatening}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.selfHarm}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.sexual}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.minors}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.violence}
										/>
									</td>
									<td>
										<FlagIcon
											flag={result.categories.graphic}
										/>
									</td>
								</tr>
								<tr>
									<td>Score</td>
									<td>
										{(
											result.categoryScores.hate * 100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.threatening *
											100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.selfHarm * 100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.sexual * 100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.minors * 100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.violence * 100
										).toFixed(2)}
										%
									</td>
									<td>
										{(
											result.categoryScores.graphic * 100
										).toFixed(2)}
										%
									</td>
								</tr>
							</tbody>
						</Table>
						<div className="timeStamp">
							Moderator, {result.timeStamp}
						</div>
					</li>
				))}
				<div ref={bottomRef} />
			</ul>
			<div className="input-section">
				{isLoading && (
					<div className="load-container">
						<div className="load-msg">Computing results</div>
						<div className="load-animation">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)}
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Type Here"
						aria-label="User Input"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
					/>
					<button
						className="btn btn-primary"
						type="button"
						id="submit"
						onClick={submitUserInput}
					>
						Enter
					</button>
				</div>
			</div>
		</div>
	);
}
