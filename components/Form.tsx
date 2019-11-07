import React, { Component } from 'react'

interface Props {
	text?: string;
	onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

interface State {
	shushu: string;
}

const Form: React.SFC<Props> = ({onInputChange, text}) => (
	<div>
		<textarea onChange={onInputChange} value={text} placeholder="댓글입력"></textarea>
		<button>전송</button>
		Form
	</div>
)
export default Form
// export default class Form extends Component<Props, State> {
// 	state: State = {
// 		shushu: ''
// 	}	

//     onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         this.setState({ shushu: e.target.value });
//     };


// 	render() {
// 		return (
// 			<div>
// 				<textarea onChange={this.onInputChange} value={this.state.shushu} placeholder="댓글입력"></textarea>
// 				<button>전송</button>
// 				Form
// 			</div>
// 		)
// 	}
// };