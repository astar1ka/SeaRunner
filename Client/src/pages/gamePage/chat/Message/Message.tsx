import { useRef } from "react";
import './Message.css';

export default function Message(props:any) {
    const {from, message, to} = props;
    const lastMessage = useRef<HTMLInputElement | null>(null);
    setTimeout(() => lastMessage.current?.scrollIntoView(true), 0);
    return (<div className='message' ref = {lastMessage}>
       <a className='--messageName'>{from + to}:</a> <a className='--message-text'>{message}</a>
    </div>)
}