import './PopupMessage.css';
import { useState, useEffect } from 'react';

export default function PopupMessage ({ message }) {
  const [opacity, setOpacity] = useState("0");
  const [errMsg, setErrMsg] = useState(message);

  useEffect(() => {
    setErrMsg(message);
  }, [message]);

  useEffect(() => {
    if (message[0] === true) {
      setOpacity("100%");
      setTimeout(() => {
        setOpacity("0%");
        message[0] = false;
      }, 5000);
    }
  }, [errMsg, message]);

   return (
     <div className="pop-up" style={{opacity: opacity}}>
       <span className="pop-up__message">{errMsg[1]}</span>
     </div>
   )
}