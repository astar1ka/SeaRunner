import './CaptainMenu.css'

export default function CaptainMenu(props:any) {
    const {active, setActive} = props;

    const onClickHandler = () => {
         setActive(false);
    }

    return (<div className={'captainMenu' + ((!active) ? ' inactive': '')} onClick = {onClickHandler}>
        Здесь что-то будет, но потом
        </div>)
}