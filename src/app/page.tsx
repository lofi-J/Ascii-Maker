import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <pre>{`
          
      .o.                           o8o   o8o             .o.                    .        ooo        ooooo           oooo                           
     .888.                          \`"'   \`"'            .888.                 .o8        \`88.       .888'           \`888                           
    .8"888.      .oooo.o  .ooooo.  oooo  oooo           .8"888.     oooo d8b .o888oo       888b     d'888   .oooo.    888  oooo   .ooooo.  oooo d8b 
   .8' \`888.    d88(  "8 d88' \`"Y8 \`888  \`888          .8' \`888.    \`888""8P   888         8 Y88. .P  888  \`P  )88b   888 .8P'   d88' \`88b \`888""8P 
  .88ooo8888.   \`"Y88b.  888        888   888         .88ooo8888.    888       888         8  \`888'   888   .oP"888   888888.    888ooo888  888     
 .8'     \`888.  o.  )88b 888   .o8  888   888        .8'     \`888.   888       888 .       8    Y     888  d8(  888   888 \`88b.  888    .o  888     
o88o     o8888o 8""888P' \`Y8bod8P' o888o o888o      o88o     o8888o d888b      "888"      o8o        o888o \`Y888""8o o888o o888o \`Y8bod8P' d888b    
                                                                                                                                                    
                                                                                                                                                                                                                                                                       
`}
          </pre>
          <h3 className={styles.subTitle}>Build Your ASCII Art!</h3>
        </div>
        <div className={styles.btnWrap}>
          <Link href={'/ascii'} className={styles.btn}>Go!</Link>
        </div>
      </div>
    </div>
  );
}
