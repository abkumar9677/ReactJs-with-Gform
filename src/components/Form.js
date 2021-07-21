import React from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import formurlencoded from 'form-urlencoded';
import './Form.css'
export default function Form({phone, setPhone, selectedTime, handleClose, selectTime}){
    const sendData=()=>{
        var name=document.getElementById('name').value;
        var address=document.getElementById('address').value;
        var location=document.getElementById('hear-location').value;
        var error='';
        if(name==='')
            error+='Name can not be empty.\n'
        if(address==='')
        error+='Address can not be empty.\n'
        if(phone==='')
            error+='Phone can not be empty.\n'
        if(selectedTime===-1)
            error+='Please select demo time.\n'
        if(error!==''){
            alert(error)
            return    
        }
        var data={
            'entry.923575230':name,   //name
            'entry.959771919':address,  //address
            'entry.1470857061':phone,   //phone
            'entry.766642417':'',   //3 - 4
            'entry.210369612':location    
        }
        switch(selectedTime){
            case 1 : data['entry.766642417']="1 - 2";break;
            case 2 : data['entry.766642417']="3 - 4";break;
            case 3 : data['entry.766642417']="5 - 6";break;
            default : data['entry.766642417']="7 - 8";break;
        }
        if(location==='__other_option__'){
            let locaiton_other=document.getElementById('other').value;
            data['entry.210369612.other_option_response']=locaiton_other;
        }
        axios.post('https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/'+
            '1FAIpQLScWUyeUYn_LuegxlH5SkFfGwXnZ4fW8u2cbFV_Kr4FRS3tTmw/'+
            'formResponse',formurlencoded(data).toString(),{
                headers: { 'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*'
            },
            })
        .then((response)=>{
            console.log(response.status);
        })
        .catch((e)=>{console.log(e)})
        
        alert('Data sended');
    }
    const updateListLook=()=>{
        document.getElementById('hear-location').style.color="black";
        var location=document.getElementById('hear-location').value;
        if(location==='__other_option__')
            document.getElementById('other').style.display="inline";
        else
            document.getElementById('other').style.display="none";
    }
    
    

    return(
        <div className="form-container">
            <CloseIcon className="close" onClick={handleClose} />
            <div className="form-demo-text">Get a Free Demo.</div>
            <div className="form-demo-text">It's Completely <span className="form-demo-link">Free!</span></div>
            <div className="form-label"><span className="label">Name</span></div>
            <input id="name" type="text" className="form-input" placeholder="Enter your Name here"/>
            
            <div className="form-label"><span className="label">Address</span></div>
            <input id="address" type="text" className="form-input" placeholder="Enter your Address here"/>
            <div className="form-label"><span className="label">Phone Number</span></div>
            <PhoneInput defaultCountry="IN" className="form-input" placeholder="Enter phone number" value={phone} onChange={setPhone}/>
            <div className="form-label">Select Demo Time</div>
            <div className="time-selection">
                <div id="time-slot-1" className="form-input time-selection-option" onClick={selectTime.bind(this,1)}>1-2</div>
                <div id="time-slot-2" className="form-input time-selection-option" onClick={selectTime.bind(this,2)}>3-4</div>
                <div id="time-slot-3" className="form-input time-selection-option" onClick={selectTime.bind(this,3)}>5-6</div>
                <div id="time-slot-4" className="form-input time-selection-option" onClick={selectTime.bind(this,4)}>7-8</div>
            </div>
            <div className="form-label">Where did you hear about us?</div>
            <select id="hear-location" defaultValue="" className="form-input form-select" placeholder="Select" onChange={updateListLook}>
                <option disabled value="" className="hear-location-default">Select</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Friends & Families">Friends & Family</option>
                <option value="__other_option__">Other</option>
            </select>
            <input id="other" type="text" className="form-input"/>
            <button className="form-continue" onClick={sendData}>Continue</button>
            <div className="terms-text">By registering here, I agree to PolyMatic’s <span className="terms-conditions">Terms & Conditions</span> and <span className="terms-conditions">Privacy Policy</span></div>
        </div>
    )
}