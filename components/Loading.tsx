import * as React from 'react'
import main from '../asset/style.scss';

const Loading = (props: {addClass?: string}) => {
    let style;
    if (props.addClass !== undefined) {
        style = `${main[props.addClass]}`;
    } else {
        style = `${main.loading}`
    }

    return (
        <div className={style}>
            <div className={main["lds-ripple"]}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading;