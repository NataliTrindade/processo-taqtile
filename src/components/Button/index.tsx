import { ReactElement } from 'react';
import styles from "./Button.module.css";

interface ButtonProps {
    children: ReactElement | string;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            type='submit'
            className={styles.button}>
            {props.children}
        </button>)
}

export default Button;