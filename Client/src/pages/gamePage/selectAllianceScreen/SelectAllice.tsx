import flag1 from '../../../source/1.jpg';
import flag2 from '../../../source/2.jpg';
import flag3 from '../../../source/3.jpg';


export default function SelectAllice(props: any) {
    const allianceid: number = props.id;
    const allianceName = (allianceid === 1) ? 'Компания' :
        (allianceid === 2) ? 'Армада' :
            (allianceid === 3) ? 'Альянс' : ''
    const img = (allianceid === 1) ? flag1 :
        (allianceid === 2) ? flag2 :
            (allianceid === 3) ? flag3 : ''
    const callback = props.callback;


    const onClickHandler = () => {
        callback(props.id);
    }

    return (<div className={'selectAllice '+`alliance${allianceid}`} onClick={onClickHandler}>
        <div className='nameAlliance'>{allianceName}</div>
    </div>)
}