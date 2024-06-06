import styles from "./StatIcon.module.css";

export const ValueIcon = ({value}) => {
  return <div className={styles.valueIcon}>
    <div className={styles.icon}/>
    <div className={styles.value}>{value}</div>
  </div>
}
