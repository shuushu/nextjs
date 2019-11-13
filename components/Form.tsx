import React from 'react'

interface Props {
    text?: string;
	name?: string;
	pw?: string;
	onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    clickSubmit(): void;
}


const Form: React.SFC<Props> = ({text, name, pw, onInputChange, onPasswordChange, onTextAreaChange, clickSubmit}) => (
	<div>
        <fieldset>
            <legend>댓글 입력 폼</legend>
            <div className="test">
                <label htmlFor="ids">NAME</label>
                <input id="ids" type="text" onChange={onInputChange} value={name} />
                <label htmlFor="pws" >PW</label>
                <input id="pws" type="password" onChange={onPasswordChange} value={pw} />
            </div>
            

            <textarea onChange={onTextAreaChange} value={text} placeholder="댓글입력"></textarea>
            <button onClick={clickSubmit}>전송</button>
        </fieldset>
	</div>
)
export default Form