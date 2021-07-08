import './PopupMessage.css';
import { useState, useEffect } from 'react';

export default function PopupMessage ({ message }) {
  const [opacity, setOpacity] = useState("0");
  const [errMsg, setErrMsg] = useState(message);

  useEffect(() => {
    setErrMsg(message);
  }, [message]);

  useEffect(() => {
    if (message !== "") {
      setOpacity("100%");
      setTimeout(() => {
        setOpacity("0%");
      }, 5000);
    }
  }, [errMsg, message]);

   return (
     <div className="pop-up" style={{opacity: opacity}}>
       <span className="pop-up__message">{errMsg}</span>
     </div>
   )
}