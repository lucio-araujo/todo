import styles from "./Header.module.css";
import rocketLogo from "../assets/rocket.png";

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={rocketLogo} alt="Rocket Logo" />
      </div>

      <span className={styles.to}>to</span>
      <span className={styles.do}>do</span>
    </header>
  );
}
