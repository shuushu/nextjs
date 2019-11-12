import {NextPage} from "next";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import { fb } from '../common/firebase';
import Header from "@/Header";
import Form from "@/Form";

import * as firebase from 'firebase/app';
import "firebase/database";

interface Props {
    userAgent?: string;
}

interface PropsReplyList{
    [key: string]: any
}

const Index: NextPage<Props> = ({ userAgent }) => {
    const [item, setList] = useState<PropsReplyList>({})
    const [str, setValue] = useState('shushu')

    function onInputChange(e: BaseSyntheticEvent) {
        setValue(e.target.value)
    }

    function clickSubmit() {
        fb.writeReply(str)
    }

    const setListItem = Object.keys(item).map((i: string) => {
        let { time, context } = item[i];
        return (
            <div key={`item${time}`}>
                <h1>{context}</h1>
                {time}
            </div>
        )
    })
    
    useEffect(() => {
        let isCancelled = false;

        firebase.database().ref('reply').on('value', result => {
            if (result.val() && !isCancelled) {
                setList(result.val())
            }               
        })

        return () => {
            isCancelled = true
        }
    }, [str])

    return (
        <main>
            <Header />
            Your user agent: {userAgent}

            {setListItem}

            <Form 
                onInputChange={onInputChange} 
                text={str}
                clickSubmit={clickSubmit}
             />
        </main>
    );
}


Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};
export default Index;
