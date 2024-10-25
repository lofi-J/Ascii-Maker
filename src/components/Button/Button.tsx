import styles from "./Button.module.css";


interface IButton {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({text, onClick, disabled = false}: IButton) => {
  return (
    <div className={`${styles.buttonWrap} ${!disabled && styles.activeButtonWrap}`}>
      <button
        className={styles.button}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
