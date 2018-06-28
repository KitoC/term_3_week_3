import React from 'react';
import Button from './../Button';
import styles from './styles.module.css'





const Form = (props) => {
    const { onSubmit, createAccount, buttonText, switchText, cancel, title } = props

    return(
        <React.Fragment>
            <div className={styles.form} onSubmit={ onSubmit }>
                <h3>{title}</h3>
                { props.children }
                <div className={styles.submitBox}>
                    <Button className={styles.formButton} text={buttonText} />
                    {/* <p onClick={cancel}>Cancel</p> */}
                </div>
                    <p onClick={createAccount}>New to food-schedulo? <br /><span>Create an Account.</span></p>
            </div>
        </React.Fragment>
    )
}


export default Form;