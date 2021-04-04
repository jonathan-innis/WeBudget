import React, {useState} from "react";
import './Modal.scss';

export default function Modal(props) {
    return(
        <>
        { props.isOpen ?
            <div className="modal-overlay">
                <div className="modal-backdrop" style={{maxWidth: props.maxWidth}}>
                    <div className="modal-wrapper">
                        {props.children}
                    </div>
                </div>
            </div> 
            : null
        }
        </>
    );
}