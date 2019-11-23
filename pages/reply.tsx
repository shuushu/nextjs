import {NextPage} from 'next';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useState, useEffect } from 'react';
import { fb } from '../common/firebase';
import Header from '@/Header';
import Form from '@/Form';
import Content from '@/Content';
import * as firebase from 'firebase/app';
import 'firebase/database';

interface Props {
    userAgent?: string;
}

interface PropsReplyList {
    [key: string]: any;
}

const View: NextPage<Props> = ({ userAgent }) => {
    const router = useRouter();
    const [item, setList] = useState<PropsReplyList>({});
    const [user, setName] = useState('');
    const [pw, setPW] = useState('');
    const [str, setValue] = useState('');
    const [checkedValue, setCheck] = useState(false)
    const refArr = Array(3);

    function onInputChange(e: BaseSyntheticEvent) {
        setName(e.target.value);
    }

    function onPasswordChange(e: BaseSyntheticEvent) {
        setPW(e.target.value);
    }

    function onTextAreaChange(e: BaseSyntheticEvent) {
        setValue(e.target.value);
    }

    function onChecked() {
        setCheck(!checkedValue);
    }

    function clickSubmit() {
        if (str.length > 0) {
            const params: any = { str };
            if (!checkedValue) {
                if (user.length <= 0 ) {
                    alert('비공개 입력시 아이디 입력 필수');
                    refArr[0].focus();
                    return;
                }
                if (pw.length <= 0) {
                    alert('비공개 입력시 비밀번호 입력 필수');
                    refArr[1].focus();
                    return;
                }
                params.user = user;
                params.pw = pw;
            }
            fb.writeReply(params).then((result) => {
                if (result) {
                    setValue('');
                    setName('');
                    setPW('');
                } else {
                    alert('error');
                }
            });
        } else {
            alert('내용 입력 하세요');
            refArr[2].focus();
        }

    }

    function removeReply(key: string) {
        fb.removeReply(key);
    }

    function convertoDate(v: string) {
        const date = new Date(v);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    const setListItem = Object.keys(item).map((i: string) => {
        const { time, str, user } = item[i];
        return (
            <div key={`item${time}`}>
                <div>
                    {user} {convertoDate(time)}
                    {user && <button onClick={() => removeReply(time)}>delete</button> }
                </div>
                <p>{str}</p>
            </div>
        );
    });

    useEffect(() => {
        let isCancelled = false;

        firebase.database().ref('reply').on('value', (result: any) => {
            if (result.val() && !isCancelled) {
                setList(result.val());
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [str]);

    return (
        <main>
            <Header />
            <h3>{router.query.id}</h3>
            <Content />
            Your user agent: {userAgent}

            {setListItem}
            <Form
                onInputChange={onInputChange}
                onPasswordChange={onPasswordChange}
                onTextAreaChange={onTextAreaChange}
                onChecked={onChecked}
                text={str}
                name={user}
                isChecked={checkedValue}
                clickSubmit={clickSubmit}
                refs={refArr}
                pw={pw}
             />
        </main>
    );
};

View.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};
export default View;
