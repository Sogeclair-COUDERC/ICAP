import React, { useEffect, useState } from 'react';
import './_radioBtn.scss'

const RadioBtn = ({ label, className, name, disabled, listRadio, handleChange, labelPosition, alignItem }) => {
    const [targetCheck, setTargetCheck] = useState('')

    const onSelectChange = (radioSelect) => {
        if (!radioSelect.disabled && !disabled) {
            setTargetCheck(radioSelect.radioName);
            handleChange(radioSelect.radioName);
        }

    }

    useEffect(() => {
        listRadio.map((item) => {
            if (item.checked) {
                setTargetCheck(item.radioName);
                //handleChange(item.radioName);
            }
        })
    }, [])

    return (
        <div className={`radio-fullcontainer ${disabled ? 'disable' : ''} ${className}`}>
            <label className="checkbox_label">{label}</label>
            <div className={`radio-group ${className} ${(alignItem) && alignItem}`}>
                {listRadio.map((item, index) => (
                    <div key={className + index} className={`radio-container ${(targetCheck === item.radioName) ? 'active' : ''} ${item.disabled ? 'disable' : ''} ${className} ${(labelPosition) ? labelPosition : 'right'}`}
                        onClick={() => onSelectChange(item)}
                        value={item.radioName}
                    >


                        <div className='radio-btn-container'>
                            <input type="radio" name={name}
                                value={item.radioName}
                                checked={targetCheck === item.radioName}
                                onChange={() => onSelectChange(item)}
                                disabled={item.disabled} >
                            </input>
                            <span className="radio-border"></span>
                            <span className="checkmark"></span>
                        </div>
                        <label className={`radio_label ${(labelPosition) ? labelPosition : 'right'}`}>{item.radioName}</label>

                    </div>
                ))
                }
            </div>

        </div >
    );
};

export default RadioBtn;