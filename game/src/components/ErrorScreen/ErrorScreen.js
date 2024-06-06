import style from "../Game/Game.module.css";
import {useLogger} from "../Logger/useLogger";
import {useEffect} from "react";
import {Logger} from "../Logger/Logger";

export const ErrorScreen = () => {
  const {
    logs,
    enable,
    showConsole,
    hideConsole
  } = useLogger();

  useEffect(() => {
    showConsole();
  }, [showConsole]);

  return <div className={style.bg}>
    <Logger logs={logs} enable={enable} onClose={hideConsole}></Logger>
  </div>
}
