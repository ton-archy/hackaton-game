import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { Console, Hook, Unhook } from 'console-feed'
import styles from "./Logger.module.css";

export const Logger = ({logs ,enable, onClose}) => {
  const [portal] = useState(document.getElementById("console"));

  return (enable && createPortal(<div className={styles.logger}>
    <Console
      logs={logs}
      variant="dark"
    />
    <button className={styles.closeButton} onClick={onClose}/>
  </div>, portal));
}
