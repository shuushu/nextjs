import { SFC } from 'react'

interface Props {
    text?: string;
	name?: string;
	pw?: string;
	isChecked: boolean;
    refs: any[];
	onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    onChecked(e: React.ChangeEvent<HTMLInputElement>): void;
    clickSubmit(): void;
}


const Form: SFC<Props> = (props) => {
    const { text, name, pw, isChecked, refs, onChecked, onInputChange, onPasswordChange, onTextAreaChange, clickSubmit } = props;
    return (
        <div>
            <fieldset>
                <legend>댓글 입력 폼 </legend>
                <div className="test">
                    <input id="public" checked={isChecked} onChange={onChecked} type="checkbox"/>
                    <label htmlFor="public">{ isChecked ? '공개' : '비공개' }</label>

                    { !isChecked &&
                    <>
                        <label htmlFor="ids">NAME</label>
                        <input id="ids" placeholder="이름을 입력하세요" type="text" onChange={onInputChange} ref={(ref) => { refs[0] = ref }} value={name} />
                        <label htmlFor="pws" >PW</label>
                        <input id="pws" placeholder="비밀번를 입력하세요" type="password" onChange={onPasswordChange} ref={(ref) => { refs[1] = ref }} value={pw} />
                    </>
                    }
                </div>


                <textarea onChange={onTextAreaChange} value={text} ref={(ref) => { refs[2] = ref }} placeholder="댓글입력"></textarea>
                <button onClick={clickSubmit}>전송</button>
            </fieldset>
        </div>
    )
};

export default Form