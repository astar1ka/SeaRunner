import './Chat.css';
import { useRef, useState} from "react"
import Message from './Message/Message';

type TMessage = {
    id: number;
    userIdFrom: number;
    message: string;
    userIdTo: number;
}

var messagesToAll: TMessage [] = [];
var messagesPrivate: TMessage [] = [];

export default function Chat(props: any) {
    const socket = props.socket;
    console.log(socket);
    const newMessage = useRef<HTMLInputElement | null>(null);
    const [dirtyMessages, setDirtyMessages] = useState([]);

    const messages = messagesToAll.concat(messagesPrivate).sort((a, b) => a.id - b.id);
    const sendHandler = () => {
        if (newMessage.current?.value) {
            socket.sendMessage(newMessage.current.value);
            newMessage.current.value = '';
        };
    }

    return (<div className="chat_window">
        <div className="chat-messages_window">
            <div className="chat-messages_window --allMessages" >
            {messages.map((mes: TMessage) => { if (mes)
                    return (<Message key={mes.id} from={mes.userIdFrom} message={mes.message} to={mes.userIdTo}/>)
                })}
            </div>
            <div className="chat-messages_window --newMessage">
                <input className="chat_input" autoComplete="off" ref={newMessage} />
                <button className="chat_button" onClick={sendHandler}>Send</button>
            </div>
        </div>
    </div>)
}