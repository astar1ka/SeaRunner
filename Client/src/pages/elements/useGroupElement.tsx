import {useState} from 'react';

type TGroupElements = {
    [key: string] : {
        element:Function,
        props: object
    }
}

export default function useGroupElement(elements: TGroupElements){
    const [element, setElement] = useState('');
    return [
        () => {return elements[element]?.element(elements[element].props) || ''},
        (element: string) => setElement(element)
    ] as const
}