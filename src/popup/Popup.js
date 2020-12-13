import React from 'react';
import './popup.css';
import Button from "@material-ui/core/Button";

export default function Popup({text, options}){
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <h1>{text}</h1>
                <div className="popup-options">
                    {options.map(option => {
                        return (
                            <Button className="popup-button" variant="contained" onClick={option.clickHandler}>{option.text}</Button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}