import axios from 'axios';
import {useState, useEffect, BaseSyntheticEvent} from 'react';

async function crawling(url: string) {
    const res = await axios(`${'https://cors-anywhere.herokuapp.com/'}${url}`);
    if (res.status === 200) {
        return res.data;
    } else {
        return false;
    }
}

function inputValue(initValue?: string, validator?: (value: string) => boolean ) {
    const [value, setValue] = useState(initValue);
    const onChange = (event: BaseSyntheticEvent): void => {
        const {
            target: { value },
        } = event;
        let willUpdate = true;
        if (typeof validator === 'function') {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };
    const triggerSetValue = (v: string) => {
        setValue(v);
    };
    return { value, onChange, triggerSetValue };
}

function inputCheck(v: boolean) {
    const [value, setValue] = useState(v);
    const onChange = (event: BaseSyntheticEvent): void => {
        const {
            target: { checked },
        } = event;
        setValue(checked);
    };
    return { value, onChange };
}

export { crawling, inputValue, inputCheck };
