import {useCallback, useEffect, useState} from "react";
import { singletonHook } from 'react-singleton-hook';
import {Hook, Unhook} from "console-feed";

export const allowedMethods = ["warn", "error"];

const useLoggerImpl = () => {
  const [logs, setLogs] = useState([])
  const [consoleIsShowed, setConsoleIsShowed] = useState(false);

  const showConsole = useCallback(() => setConsoleIsShowed(true), [setConsoleIsShowed]);
  const hideConsole = useCallback(() => setConsoleIsShowed(false), [setConsoleIsShowed]);

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        if(allowedMethods.includes(log.method)) {
          setLogs((currLogs) => [log, ...currLogs]);
        }
      },
      false
    )
    return () => Unhook(hookedConsole)
  }, []);

  return {
    logs,
    enable: consoleIsShowed,
    showConsole,
    hideConsole
  }
}

export const useLogger = singletonHook({}, useLoggerImpl);
