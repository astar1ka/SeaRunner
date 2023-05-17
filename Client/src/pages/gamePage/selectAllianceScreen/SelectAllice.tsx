export default function SelectAllice(props: any){
    const allianceid = props.id;
    const allianceName = (allianceid === 1) ? 'Компания':
    (allianceid === 2) ? 'Армада':
    (allianceid === 3) ? 'Альянс': ''
    const callback = props.callback;

    const onClickHandler = () => {
        callback(props.id);
    }

    return <div className='selectAllice' onClick={onClickHandler}>
        <img className={'image' + allianceid}/>
        <a>{allianceName}</a>
    </div>
}