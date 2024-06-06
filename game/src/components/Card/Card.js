import styles from "./Card.module.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {tween, easeOut} from "../../utils/animation";
import {Answer} from "../../constants/Answer";
import cn from "classnames";
import {getImageApi} from "../../api";

const TRANSLATION_LIMIT = 200;
const TRANSLATION_MULTIPLIER = 2;
const ROTATION_MULTIPLIER = 0.2;
const DROP_MULTIPLIER = 0.4;
const CANCEL_OFFSET = 30;
const BACK_TIME = 200;
const DROP_DISTANCE = window.screen.height;
const DROP_TIME = 500;

export const Card = ({data, enable, onSubmit, onFinish}) => {
  const [startPosition, setStartPosition] = useState(0);
  const [lastDistance, setLastDistance] = useState(0);
  const [lastPosition, setLastPosition] = useState({x: 0, y: 0, rotation: 0});
  const [translation, setTranslation] = useState({x: 0, y: 0});
  const [rotation, setRotation] = useState(0);
  const [isSubmited, setSubmited] = useState(false);
  const [side, setSide] = useState(Answer.NONE);
  const [catchMouseEvents, setCatchMouseEvents] = useState(false);
  const isBlocked = isSubmited || !enable || !data.answers;

  const handleMoveStart = useCallback((position) => {
    if(isBlocked)
    {
      return;
    }
    setStartPosition(position.screenX);
  }, [isBlocked]);

  const handleTouchStart = useCallback((e) => {
    const position = e.changedTouches[0];
    handleMoveStart(position);
  }, [handleMoveStart]);

  const handleMouseStart = useCallback((e) => {
    setCatchMouseEvents(true);
    handleMoveStart(e);
  }, [handleMoveStart]);

  const handleMove = useCallback((position) => {
    if(isBlocked)
    {
      return;
    }

    const dX = position.screenX - startPosition;
    const absDX = Math.abs(dX);
    const signature = dX / absDX;
    let xDistance = 0;
    if(Math.abs(dX) <= TRANSLATION_LIMIT)
    {
      xDistance = dX;
    } else {
      xDistance = TRANSLATION_LIMIT * signature;
    }
    setLastDistance(xDistance);
    setTranslation({
      x: xDistance * TRANSLATION_MULTIPLIER,
      y: Math.abs(xDistance) * DROP_MULTIPLIER
    });
    setRotation(xDistance * ROTATION_MULTIPLIER);
    setLastPosition({x: translation.x, y: translation.y, rotation});
  }, [startPosition, isBlocked]);

  const handleMouseMove = useCallback((e) => {
    if(catchMouseEvents) {
      handleMove(e);
    }
  }, [handleMove, catchMouseEvents]);

  const handleTouchMove = useCallback((e) => {
    const position = e.changedTouches[0];
    handleMove(position);
  }, [startPosition]);

  useEffect(() => {
    setLastPosition({x: translation.x, y: translation.y, rotation});
  }, [translation, rotation]);

  const moveCardBack = useCallback((progress) => {
    const step =  1 - progress;
    setTranslation({
      x: lastDistance * TRANSLATION_MULTIPLIER * step,
      y: Math.abs(lastDistance) * DROP_MULTIPLIER * step
    });
    setRotation(lastDistance * ROTATION_MULTIPLIER * step);
  }, [lastDistance])

  const dropCard = useCallback((step) => {
    setTranslation({
      x: lastPosition.x,
      y: lastPosition.y + (DROP_DISTANCE * step)
    });
    setRotation(lastPosition.rotation);
    if(step == 1)
    {
      onFinish(data.id);
    }
  }, [
    lastPosition,
    onFinish,
    data
  ]);

  const handleMoveEnd = useCallback((e) => {
    if(isBlocked)
    {
      return;
    }

    if(Math.abs(translation.x) < CANCEL_OFFSET)
    {
      tween(easeOut, BACK_TIME, moveCardBack);
    } else {
      tween(easeOut, DROP_TIME, dropCard);
      const answer = translation.x > 0 ? data.answers[1] : data.answers[0];
      onSubmit(data.id, answer);
      setSubmited(true);
    }
  }, [
    moveCardBack,
    dropCard,
    translation,
    onSubmit,
    data,
    isBlocked
  ]);

  const handleMouseMoveEnd = useCallback((e) => {
    handleMoveEnd(e);
    setCatchMouseEvents(false);
  }, [handleMoveEnd]);

  useEffect(() => {
    if(Math.abs(translation.x) > CANCEL_OFFSET)
    {
      setSide(translation.x > 0 ? Answer.RIGHT : Answer.LEFT);
    } else {
      setSide(Answer.NONE);
    }
  }, [translation])

  const cardStyle = useMemo(() =>
    cn(
      styles.card,
      {[styles.isSubmitted]: isBlocked}
      )
  , [isBlocked]);

  return (
    <div
      style={{
        transform: `translate(${translation.x}px, ${translation.y}px) rotate(${rotation}deg)`,
        backgroundImage: `url(${getImageApi()+data?.img}.webp)`
      }}
      className={cardStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMoveEnd}
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseMoveEnd}
    >
      {side === Answer.LEFT && <div className={styles.side}>
        <div className={styles.sideBg}/>
        <div className={cn(styles.cardText, styles.leftSide)}>{data.answers[0].line}</div>
      </div>}
      {side === Answer.RIGHT && <div className={styles.side}>
        <div className={styles.sideBg}/>
        <div className={cn(styles.cardText, styles.rightSide)}>{data.answers[1].line}</div>
      </div>}
    </div>
  );
}
