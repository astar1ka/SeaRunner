import {useState} from 'react' 

export default function User(userName: string){
    const [name, setName] = useState(userName);
    return [
        name,
        (name: string) => setName(name)
    ] as const;
}
