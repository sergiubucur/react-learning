import React from "react";

export default function Button({ onClick, text = "Button" }) {
	return (
		<button onClick={onClick}>{text}</button>
	);
}
