import React, {useState, useRef, useEffect} from 'react';
import './Tooltip.scss';

export function Tooltip(props) {
    const [active, setActive] = useState(false);
    const node = useRef();

    const handleClick = (event) => {
        if (active && node.current.contains(event.target)) return;
        setActive(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [active])

    return (
        <div className="tooltip-wrapper"
             onClick={() => setActive(true)}
        >
            {props.children}
            {active && (
                <div className='tooltip-tip bottom' ref={node}>
                    {props.content}
                </div>
            )}
        </div>
    )
}

export function EditLineItemInnerTooltip(props) {
    return(
        <div className="inner-tooltip-wrapper">
            <input
                className="tooltip-custom-input"
                type="text"
                defaultValue={props.name}
            />
            <div className="button-wrapper">
                <div className="button-container">
                    <button>Hide</button>
                    <button className="delete">Delete</button>
                </div>
                <div className="button-container">
                    <button>Cancel</button>
                    <button className="accent">OK</button>
                </div>
            </div>
        </div>
    );
}

export function AddCategoryInnerTooltip(props) {
    return(
        <div className="inner-tooltip-wrapper">
            <input
                className="tooltip-custom-input"
                type="text"
            />
            <div className="button-end">
                <button>Cancel</button>
                <button>Ok</button>
            </div>
        </div>
    )
}
