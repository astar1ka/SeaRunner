import './MenuButton.css'

export default function MenuButton(props:any){
    const setActive = props.setActive;
    return <div className = 'MenuButton'>
        <img className = {'MenuButton ' + props.name+'Button'} onClick={() => setActive(true)}/>
    </div>
}