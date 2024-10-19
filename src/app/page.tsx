import styles from "./page.module.css";
import SelectMode from "@/components/SelectMode/SelectMode";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <pre className={styles.mainTitle}>
{`
 █████  ███████  ██████ ██ ██      █████  ██████  ████████
██   ██ ██      ██      ██ ██     ██   ██ ██   ██    ██
███████ ███████ ██      ██ ██     ███████ ██████     ██
██   ██      ██ ██      ██ ██     ██   ██ ██   ██    ██
██   ██ ███████  ██████ ██ ██     ██   ██ ██   ██    ██`}</pre>
          <h3 className={styles.info}><b>Author: Lofi-J</b><b>(v.1.0)</b></h3>
          <pre className={styles.emailAndGithub}>
{`===========================================================================
          [+] Email | lofi2505@gmail.com
          [+] Github | https://github.com/lofi-J
===========================================================================`}
          </pre>
          <h2 className={styles.subTitle}>Build ASCII Art...</h2>
          <p className={styles.note}>Note:
            <b className={styles.text}>Please choose between Text to ASCII or Image to ASCII</b>
          </p>
        </div>
        <SelectMode />
      </div>
    </div>
  );
}
