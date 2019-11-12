import {NextPage} from "next";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import { fb } from '../common/firebase';
import Header from "@/Header";
import Form from "@/Form";


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

    async function load() {
        await fb.getList().then((r) => {
            setList(r)
        })        
    }

    useEffect(() => {
        load()
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
