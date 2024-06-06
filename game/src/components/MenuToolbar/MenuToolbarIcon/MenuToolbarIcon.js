import styles from "./MenuToolbarIcon.module.css";
import {useCallback, useMemo} from "react";
import cn from "classnames";

export const MenuToolbarIcon = ({id, label, icon, lockIcon, locked, onClick}) => {
  const imgStyle = useMemo(() => {
    const img = locked ? lockIcon : icon
    return {
      backgroundImage: `url(${img})`
    }
  }, [locked]);

  const labelStyle = useMemo(() =>
    cn({
      [styles.label]: true,
      [styles.lockedLabel]: locked
    }), [locked]);

  const handleClick = useCallback(() => {
    if(!locked) {
      onClick(id);
    }
  }, [onClick, locked, id]);

  return <button className={styles.container} onClick={handleClick}>
    <div className={styles.img} style={imgStyle}>
      {locked && <div className={styles.lockIcon}/>}
    </div>
    <div className={labelStyle}>{label}</div>
  </button>
}
