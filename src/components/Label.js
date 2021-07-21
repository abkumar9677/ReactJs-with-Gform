import Icon from './Icon.svg'
import './Label.css'
export default function Label(){
    return(
        <div className="label-container">
            <img className="label-logo" src={Icon} alt="logo"/>
            <div className="company-name">PolyMatic</div>
            <div className="label-quoto">Redesign Everything</div>
        </div>
    )
}