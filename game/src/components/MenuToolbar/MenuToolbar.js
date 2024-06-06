import styles from "./MenuToolbar.module.css";

export const MenuToolbar = ({children}) => {
  return <div className={styles.container}>
    <div className={styles.topConsole}/>
    <div className={styles.toolbar}>
      {children}
    </div>
  </div>
}
