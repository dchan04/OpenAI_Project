import "./CreateImg.css";
import { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import * as Icon from "react-bootstrap-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loadImg from "./assets/loadingSpin.svg";
import axios from "axios";

export default function CreateImg() {
	const bottomRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [imgs, setImgs] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [errors, setErrors] = useState({});
	const [numImgs, setNumImgs] = useState(1);
	const [testImages] = useState([]);

	useEffect(() => {
		setIsLoading(false);
	}, [imgs]);

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const submitUserInput = async () => {
		if (userInput.length !== 0) {
			setErrors({ ...errors, prompt: null });
			setIsLoading(true);
			//Get images from backend
			axios
				.post(
					`https://localhost:7290/ChatApi/ImageGen?prompt=${userInput}&num=${numImgs}`
				)
				.then((res) => setImgs(res.data))
				.catch((error) => console.log(error));
			await sleep(3000);
		} else {
			setErrors({
				...errors,
				prompt: "This field is required.",
			});
		}
	};

	return (
		<div className="createImg">
			<div className="title">
				<h1>Create Image</h1>
			</div>
			<Row className="image-gallery">
				{isLoading ? (
					<div className="loader">
						<Image src={loadImg} width={150} height={150} />
					</div>
				) : (
					imgs?.map((img) => (
						<Col
							key={crypto.randomUUID()}
							md={3}
							className="image-box mb-2"
						>
							<a target="_blank" rel="noreferrer" href={img.url}>
								<LazyLoadImage
									className="image"
									src={img.url}
									alt=""
									effect="blur"
									placeholderSrc={img.url}
								/>
							</a>
						</Col>
					))
				)}
				<div ref={bottomRef} />
			</Row>
			<div className="input-section">
				<Form className="align-items-center">
					<Row>
						<Col sm={6}>
							<Form.Group
								className="mb-3"
								controlId="formBasicText"
							>
								<Form.Label column="sm">
									<h6>Image Request</h6>
								</Form.Label>
								<Form.Control
									type="text"
									aria-describedby="inputGroupPrepend"
									placeholder="Ex: Dog, Cat, Audi, BMW"
									value={userInput}
									onChange={(e) =>
										setUserInput(e.target.value)
									}
									isInvalid={!!errors.prompt}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.prompt}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col sm={3}>
							<Form.Group className="mb-3">
								<Form.Label column="sm">
									<h6># Of Images</h6>
								</Form.Label>
								<Form.Control
									type="number"
									placeholder="#"
									value={numImgs}
									onChange={(e) => setNumImgs(e.target.value)}
									max={10}
									min={1}
								/>
							</Form.Group>
						</Col>
						<Col sm={3}>
							<Form.Group className="mb-3">
								<Form.Label column="sm">
									Number of Images
								</Form.Label>
								<Button
									className="mt-1"
									variant="primary"
									type="button"
									onClick={submitUserInput}
								>
									Submit
								</Button>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}
