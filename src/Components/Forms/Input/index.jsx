import React from 'react'
import styles from './Input.module.css'

const Input = ({type, value, label, name, onChange, error, onBlur}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input
                className={styles.input}
                type={type}
                onChange={onChange}
                value={value}
                id={name}
                name={name}
                onBlur={onBlur}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

export default Input
