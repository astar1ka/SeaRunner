import './ErrorLabel.css'

type TErrorProps = {
    errorText: string, 
    showError: boolean
}

export default function ErrorLabel({errorText, showError}: TErrorProps){
    const hide = (showError) ? '' : ' hide';
    return <label className={'error' + hide}>{errorText}</label>
}