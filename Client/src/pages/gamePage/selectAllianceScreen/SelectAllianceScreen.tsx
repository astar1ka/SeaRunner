import SelectAllice from "./SelectAllice";
import './SelectAllianceScreen.css';

type TProps = {
    select: Function
}

export default function SelectAllianceScreen({select}: TProps) {
    const selectHandler = (id: number) => select(id);
    return (<div className='firstRun'>
        <SelectAllice callback={selectHandler} 
        id={1}/>
        <SelectAllice callback={selectHandler} 
        id={2}/>
        <SelectAllice callback={selectHandler} 
        id={3}/>
    </div>)
}