import styles from "./MainMenu.module.css";
import {States} from "../../states/States";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import {LoadingScreen} from "../LoadingScreen/LoadingScreen";
import {getHero, updateHero, useHeroStore} from "../../store/HeroStore";
import {getFirstHero, getHeroesByUser} from "../../api/hero";
import {Stats} from "../Stats/Stats";
import {MenuToolbar} from "../MenuToolbar/MenuToolbar";
import {MenuToolbarIcon} from "../MenuToolbar/MenuToolbarIcon/MenuToolbarIcon";
import {toolsButtons} from "../../constants/ToolsButtons";

export const MainMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const hero = useHeroStore(getHero);

  const goToGame = () => navigate(States.Game);

  useEffect(() => {
    getHeroesByUser()
      .then(heroes => {
        if(heroes.length > 0)
        {
          updateHero(heroes[0]);
        }
      })
  }, []);

  const handePlayClick = useCallback(() => {
    getFirstHero()
      .then(hero => {
        updateHero(hero);
        goToGame();
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }, [])

  const handleMenuClick = useCallback((id) => {
    console.log(id);
  }, []);

  const leftScripts = useMemo(() => {
    const leftScripts = hero.scriptsLeft;
    const lastDigit = leftScripts % 10;
    let word = "встреча";

    if(lastDigit >=2 && lastDigit <=4)
    {
      word = "встречи"
    } else if (lastDigit >= 5 || lastDigit === 0) {
      word = "встреч"
    }

    return leftScripts + " " + word;
  }, [hero]);

  return <div className={styles.wrapper}>
    <Stats absoluteValue/>
    <div className={styles.centerPart}>
      <div className={styles.centerPartBg}/>
      <div className={styles.titleBlock}>
        <div className={styles.title}>{"Безымянный герой"}</div>
        {leftScripts != undefined && <div className={styles.gamesLeftCounter}>{`Вам сегодня предстоит ${leftScripts}`}</div>}
        <button
          className={styles.playButton}
          onClick={handePlayClick}
        >{"В ПОХОД!"}</button>
      </div>
    </div>
    <MenuToolbar>
      {toolsButtons.map(icon =>
        <MenuToolbarIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          icon={icon.icon}
          lockIcon={icon.lockIcon}
          locked={icon.locked}
          onClick={handleMenuClick}
        />)}
    </MenuToolbar>
    {isLoading && <LoadingScreen transparent/>}
  </div>
}
