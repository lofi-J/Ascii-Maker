import styles from "./page.module.css";
import ImgUpload from "@/components/ImgUpload/ImgUpload";


export default function Home() {
  return (
    <div className={styles.container}>
      <ImgUpload />
    </div>
  );
}
