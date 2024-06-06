import styles from './Game.module.css';
import {Cardboard} from "../Cardboard/Cardboard";
import {Stats} from "../Stats/Stats";
import {useEffect} from "react";
import {updateHero} from "../../store/HeroStore";
import {getFirstHero} from "../../api/hero";

const Game = () => {
  useEffect(() => {
    getFirstHero()
      .then(hero => updateHero(hero));
  }, [])

  return (
    <div className={styles.bg}>
      <Stats/>
      <Cardboard/>
    </div>
  );
}

export default Game;
