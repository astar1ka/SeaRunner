import {useState} from 'react'

export default function useActive(){
    const [active, setActive] = useState(false);
    return [
        active,
        (active) ? '': ' inactive',
        () => setActive(!active)
    ] as const;
}