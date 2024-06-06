import styles from "./Cardboard.module.css";
import {Card} from "../Card/Card";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getScript} from "../../api/script";
import {
  applyAnswer
} from "../../api/hero";
import cn from "classnames";
import {HeroState} from "../../constants/HeroState";
import {dailyLimitCard, lastCard, loseCard, victoryCard} from "./staticCards";
import {useHeroStore, getHero, updateHero, updateResources} from "../../store/HeroStore";
import {useNavigate} from "react-router-dom";
import {States} from "../../states/States";

export const Cardboard = () => {
  const navigate = useNavigate();
  const [isInitFetch, setInitFetch] = useState(true);
  const [cards, setCards] = useState([]);
  const [forDispose, setForDispose] = useState([]);
  const [nextScriptId, setNextScriptId] = useState("3baa2fe4-0795-4fff-82de-32b79f450a39");
  const [lastCurrencyValue, setLastCurrencyValue] = useState(0);
  const [staticCard, setStaticCard] = useState([]);
  const hero = useHeroStore(getHero);

  const goToHome = () => navigate(States.MainMenu);

  useEffect(() => {
    if(hero?.state === HeroState.None)
    {
      setLastCurrencyValue(hero.resources.mysteryCurrency);
    }
  }, [hero])

  useEffect(() => {
    console.log(hero);
    console.log(hero.currentScript);
    if(hero && isInitFetch && hero.currentScript) {
      getScript(hero.currentScript)
        .then(card => {
          if(card != null) {
            setCards([card]);
            setNextScriptId(card?.next);
          }
        })
      setInitFetch(false);
    }
  }, [hero])

  useEffect(() => {
    if(forDispose.length > 0) {
      const filteredCards = cards.filter(card => !forDispose.includes(card.id));
      setForDispose([]);
      setCards(filteredCards);
    }
  }, [cards, forDispose]);

  const isBlocked = useMemo(() => {
    return hero?.scriptsLeft === 0;
  }, [hero]);

  useEffect(() => {
    if(hero?.state === HeroState.Lose)
    {
      setStaticCard([loseCard(lastCurrencyValue)]);
    } else if(hero?.state === HeroState.Victory) {
      setStaticCard([victoryCard(lastCurrencyValue)]);
    } else if(isBlocked) {
      setStaticCard([dailyLimitCard(lastCurrencyValue)]);
    } else if(cards.length === 0) {
      setStaticCard([lastCard()]);
    }
  }, [
    hero,
    lastCurrencyValue,
    isBlocked,
    cards
  ]);

  const handleSubmit = useCallback((id, answer) => {
    updateResources(answer.resourcesChange);
    applyAnswer(hero.id, answer._id)
      .then(updateHero);
    getScript(nextScriptId)
      .then(newCard => {
        if(newCard != null) {
          setCards([newCard, ...cards]);
          setNextScriptId(newCard.next);
        }
      })
  }, [
    cards,
    nextScriptId,
    updateHero,
    updateResources,
    hero
  ]);

  const handleDispose = useCallback((id) => {
    setForDispose([id]);
  }, []);

  const deskStyle = useMemo(() => {
    console.log(cards);
    return cn(
      styles.deck,
      {
        [styles.unknownWorld]: cards.length === 0
      }
    );
  }, [cards]);

  const cardsToRender = !isBlocked && cards.length > 0 ? cards : staticCard;
  const currentCard = cardsToRender[cardsToRender.length - 1];

  return <div className={styles.cardboard}>
    <div className={styles.message}>{currentCard?.line}</div>
    <div className={deskStyle}>
      {cardsToRender.map(card =>
        <Card
          key={card?.id || "null"}
          data={card}
          enable={!isBlocked}
          onSubmit={handleSubmit}
          onFinish={handleDispose}
        />)}
    </div>
    <div className={styles.title}>{currentCard?.actor}</div>
    <div className={styles.homeButton} onClick={goToHome}/>
  </div>
}
