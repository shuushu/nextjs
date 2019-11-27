import {NextPage} from 'next';
import { BaseSyntheticEvent, useState, useEffect } from 'react';
import { inputValue, inputCheck } from '../common/util';
import { fb } from '../common/firebase';
import Header from '@/Header';
import Form from '@/Form';
import * as firebase from 'firebase/app';
import 'firebase/database';

interface Props {
    seq: number
}

interface PropsReplyList {
    [key: string]: any;
}

const Reply = ({ seq }: Props) => {
    const checkMinLength = (v: string) => v.length < 255;
    const inputName = inputValue('', checkMinLength)
    const inputPassword = inputValue('', checkMinLength)
    const valueTextArea = inputValue('', checkMinLength)
    const inputCheckProps = inputCheck(true)

    const [item, setList] = useState<PropsReplyList | null>(null);
    const refArr = Array(3);


    function clickSubmit() {
        if (valueTextArea.value) {
            const params: {
                str: string;
                user?: string;
                pw?: string;
            } = {
                str: valueTextArea.value,
            };

            if (!inputCheckProps.value) {
                if (!inputName.value) {
                    alert('비공개 입력시 아이디 입력 필수');
                    refArr[0].focus();
                    return;
                }
                if (!inputPassword.value) {
                    alert('비공개 입력시 비밀번호 입력 필수');
                    refArr[1].focus();
                    return;
                }
                params.user = inputName.value;
                params.pw = inputPassword.value;
            }
            fb.writeReply(seq, params).then((result) => {
                if (result) {
                    inputName.triggerSetValue('');
                    inputPassword.triggerSetValue('');
                    valueTextArea.triggerSetValue('');
                } else {
                    alert('error');
                }
            });
        } else {
            alert('내용 입력 하세요');
            refArr[2].focus();
        }

    }

    function convertoDate(v: string) {
        const date = new Date(v);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    const setListItem = (() => {
        if (item) {
        return Object.keys(item).map((i: string) => {
            const { time, str, user } = item[i];
            return (
                <div key={`item${time}`}>
                    <div>
                        {user} {convertoDate(time)}
                        {user && <button onClick={() => fb.removeReply(seq, time)}>delete</button> }
                    </div>
                    <p>{str}</p>
                </div>
            );
        })
        } else {
            return <div>nodata</div>
        }
    })();

    useEffect(() => {
        let isCancelled = false;
        firebase.database().ref(`reply/${seq}`).on('value', (result: any) => {
            setList(result.val());
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <section>
            <Form
                onInputChange={inputName.onChange}
                onPasswordChange={inputPassword.onChange}
                onTextAreaChange={valueTextArea.onChange}
                onChecked={inputCheckProps.onChange}
                text={valueTextArea.value}
                name={inputName.value}
                isChecked={inputCheckProps.value}
                clickSubmit={clickSubmit}
                refs={refArr}
                pw={inputPassword.value}
             />

            { setListItem }
        </section>
    );
};

Reply.getInitialProps = ({ seq }: Props) => {
    return { seq };
};

export default Reply;
