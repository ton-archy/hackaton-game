import styles from "./LoadingScreen.module.css";
import {useMemo} from "react";

export const LoadingScreen = ({transparent}) => {
  const bgStyle = useMemo(() => transparent ? styles.transparentBg : styles.defaultBg, [transparent]);

  return <div className={styles.wrapper}>
    <div className={bgStyle}/>
    <div className={styles.container}>
      <div className={styles.centerQuad}/>
      <div className={styles.innerFrameQuad}/>
      <div className={styles.outerFrameQuad}/>
      <div className={styles.leftOrnament}/>
      <div className={styles.rightOrnament}/>
    </div>
  </div>
}
