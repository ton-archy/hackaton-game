import styles from "./StatIcon.module.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {easeOut, tween} from "../../../utils/animation";
import cn from "classnames";

const MOVEMENT_TIME = 1200;
const MOVEMENT_DISTANCE = 200;

export const StatIcon = ({value, lastChange, width, height, bgLayer, maskedLayer, onClick}) => {
  const [maskId] = useState("mask_" + uuidv4());
  const [maskedId] = useState("masked_" + uuidv4());
  const [valueChange, setValueChange] = useState("0");
  const [valuePosition, setValuePosition] = useState(0);
  const [valueSign, setValueSign] = useState(1);
  const [valueStyle, setValueStyle] = useState(styles.positive);
  const [valueOpacity, setValueOpacity] = useState(0);

  const percentageValue = useMemo(() => (100 - value) * (height / 100), [value]);

  const moveValueChange = useCallback((step) => {
    setValuePosition(step * MOVEMENT_DISTANCE * valueSign * -1);
    setValueOpacity(1 - step);
    if(step === 1)
    {
      setValuePosition(0);
    }
  }, [
    valueSign,
    lastChange
  ]);

  useEffect(() => {
    if(lastChange != 0) {
      setValueSign(lastChange / Math.abs(lastChange));
      if (lastChange > 0) {
        setValueChange("+" + lastChange);
        setValueStyle(styles.positive);
        tween(easeOut, MOVEMENT_TIME, moveValueChange);
      }
      if (lastChange < 0) {
        setValueChange(lastChange);
        setValueStyle(styles.negative);
        tween(easeOut, MOVEMENT_TIME, moveValueChange);
      }
    }
  }, [lastChange, moveValueChange])

  const changingValueStyle = useMemo(() => cn(styles.valueChange, valueStyle), [valueStyle])

  return (
    <div className={styles.statIcon} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <mask id={maskId}>
              <rect x="0" y={percentageValue} width="100" height="100" fill="#fff" />
            </mask>
          </defs>
          {bgLayer}
          <g id={maskedId} mask={`url(#${maskId})`}>
            {maskedLayer}
          </g>
        </svg>
        <div
          className={changingValueStyle}
          style={{
            transform: `translate(0, ${valuePosition}%)`,
            opacity: valueOpacity
          }}
        >{valueChange}</div>
      </div>
    </div>
  )
}
