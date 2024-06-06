import styles from './Stats.module.css';
import {StatIcon} from "./icons/StatIcon";
import {ProvisionIcon} from "./icons/ProvisionIcon";
import {ToolsIcon} from "./icons/ToolsIcon";
import {ArmyIcon} from "./icons/ArmyIcon";
import {CurrencyIcon} from "./icons/CurrencyIcon";
import {useEffect, useState} from "react";
import {DateTime} from "luxon";
import {useLogger} from "../Logger/useLogger";
import {getHero, getLastChange, getResources, useHeroStore} from "../../store/HeroStore";
import {ValueIcon} from "./icons/ValueIcon";

const CONSOLE_CLICK_LIMIT = 5;
const CONSOLE_TIME_LIMIT = 2000;

export const Stats = ({absoluteValue}) => {
  const [clickCounter, setClickCounter] = useState(0);
  const [firstClickTime, setFirstClickTime] = useState(null);
  const {showConsole} = useLogger();
  const hero = useHeroStore(getHero);
  const resources = useHeroStore(getResources);
  const lastChange = useHeroStore(getLastChange);

  // Checking for console showing
  useEffect(() => {
    if(clickCounter === 1) {
      setFirstClickTime(DateTime.now().toMillis());
      setTimeout(() => setClickCounter(0), CONSOLE_TIME_LIMIT);
    }
    if(clickCounter === CONSOLE_CLICK_LIMIT) {
      const lastClickTime = DateTime.now().toMillis();
      if(lastClickTime - firstClickTime < CONSOLE_TIME_LIMIT) {
        showConsole();
      }
      setClickCounter(0);
    }
  }, [clickCounter, firstClickTime])

  const addClick = () => {
    setClickCounter(count => count + 1);
  }

  return <div className={styles.container}>
    <div className={styles.iconBar}>
      <StatIcon
        value={resources.provision}
        lastChange={lastChange?.provision || 0}
        width={50}
        height={93}
        bgLayer={<ProvisionIcon classname={styles.bgLayer} />}
        maskedLayer={<ProvisionIcon classname={styles.maskedLayer} />}
        onClick={addClick}
      />
      <StatIcon
        value={resources.tools}
        lastChange={lastChange?.tools || 0}
        width={90}
        height={92}
        bgLayer={<ToolsIcon classname={styles.bgLayer} />}
        maskedLayer={<ToolsIcon classname={styles.maskedLayer} />}
      />
      <StatIcon
        value={resources.army}
        lastChange={lastChange?.army || 0}
        width={50}
        height={107}
        bgLayer={<ArmyIcon classname={styles.bgLayer} />}
        maskedLayer={<ArmyIcon classname={styles.maskedLayer} />}
      />
      {!(absoluteValue && hero.vault) ?
        <StatIcon
          value={resources.mysteryCurrency}
          lastChange={lastChange?.mysteryCurrency || 0}
          width={105}
          height={91}
          bgLayer={<CurrencyIcon classname={styles.currBgLayer} />}
          maskedLayer={<CurrencyIcon classname={styles.currMaskedLayer} />}
        /> :
        <ValueIcon value={hero.vault} />
      }
    </div>
    <div className={styles.bottomConsole}></div>
  </div>
}
