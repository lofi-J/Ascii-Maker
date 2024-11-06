import styles from "./page.module.css";
import SelectMode from "@/components/SelectMode/SelectMode";
import {ASCII_TEXT_TITLE} from "@/static/AsciiText";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <pre className={styles.mainTitle}>
            {ASCII_TEXT_TITLE}
          </pre>
          <h3 className={styles.info}><b>Author: Lofi-J</b><b>(v.1.0)</b></h3>
          <div className={styles.emailAndGithub}>
            <div>===========================================================================</div>
            <div>[+] Email | lofi2505@gmail.com</div>
            <div>[+] Github |&nbsp;
              <a
                href="http://github.com/lofi-J"
                target="_blank">
                https://github.com/lofi-J
              </a>
            </div>
            <div>===========================================================================</div>
          </div>
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
