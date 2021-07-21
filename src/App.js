import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import CloseIcon from '@material-ui/icons/Close';
import Form from './components/Form'
import Label from './components/Label';
import './App.css'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    

  },
  btn:{
    background: 'linear-gradient(90deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)',
    color:'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '100px',
    padding: '10px',
    width:'200px',
    fontSize:'20px',
  },
  close:{
    background:'#3584A7',
    color:'white',
    borderRadius:'50%',
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: '5px 10px 0px 0px',
    width:'100%',
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [phone,setPhone]=useState('');
  const [selectedTime,setSelectedTime]=useState(-1);
  const selectTime=(index)=>{
    setSelectedTime(index)
    for(var i=1;i<5;i++){
         if(i===index){
            document.getElementById(`time-slot-${i}`).className="form-input time-selection-option time-selection-option-color";
        }
        else{
            document.getElementById(`time-slot-${i}`).className="form-input time-selection-option";  
        }
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <div className={classes.container}>
      <button type="button" onClick={handleOpen} className={classes.btn}>
        Click Me!
      </button>
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <div className={classes.paper}> */}
          <div className="modal-container">
            <div className="modal-form-container">
                <Label/>
                <div>
                <Form phone={phone} setPhone={setPhone} selectedTime={selectedTime} handleClose={handleClose} selectTime={selectTime}/>
            </div>
          </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

