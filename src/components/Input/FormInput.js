import React, { useState } from 'react'
import './../../pages/SignUp.css'
const FormInput = (props) => {
    const { label, errorMessage, onChange, id, ...inputProps } = props, [focused, setFocused] = useState(false), handleFocus = (e) => { setFocused(true) }
    return (
        <>
            <div className='input_fieldss'> <label className='formInput_label'>{label}</label> <input className='inputs'{...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)} focused={focused.toString()} /> <span className='register_errorMessage'>{errorMessage}</span> </div>
        </>
    )
}
export default FormInput