import React from 'react'

interface Props {
	text?: string;
	onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;	
	clickSubmit(): void;
}


const Form: React.SFC<Props> = ({onInputChange, clickSubmit, text}) => (
	<div>
		<textarea onChange={onInputChange} value={text} placeholder="댓글입력"></textarea>
		<button onClick={clickSubmit}>전송</button>
		Form
	</div>
)
export default Form