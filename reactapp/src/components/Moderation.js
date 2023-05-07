import "./Moderation.css";
import { useEffect, useState, useRef } from "react";
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
	const [resultHistory, setresultHistory] = useState([]);
	const testResults = [
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
	];

	const submitUserInput = () => {
		setIsLoading(true);
		setUserInput("");
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<div className="moderation">
			<div className="title">
				<h1>Moderation Ai</h1>
			</div>
			<ul className="results-container">
				{testResults?.map((result) => (
					<li className="msg-result" key={result.id}>
						<span>User Prompt: </span>"userInput"
						<div>
							<span>Flagged By Mod: </span>
							<FlagIcon flag={result.flagged} />
						</div>
						<Table striped>
							<thead>
								<tr>
									<th></th>
									<th>Hate</th>
									<th>Threatening</th>
									<th>Self Harm</th>
									<th>Sexual</th>
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
									<td>{result.categoryScores.hate * 100}%</td>
									<td>
										{result.categoryScores.threatening *
											100}
										%
									</td>
									<td>
										{result.categoryScores.selfHarm * 100}%
									</td>
									<td>
										{result.categoryScores.sexual * 100}%
									</td>
									<td>
										{result.categoryScores.violence * 100}%
									</td>
									<td>
										{result.categoryScores.graphic * 100}%
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
