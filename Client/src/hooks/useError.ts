import {useState} from 'react'

import ErrorLabel from "../pages/elements/ErrorLabel/ErrorLabel";

export default function useError(){
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const label = ErrorLabel({
        errorText: text, 
        showError: show});
    
    return [
        label,
        setText,
        setShow
    ] as const;
}