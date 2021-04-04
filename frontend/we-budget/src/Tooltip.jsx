import React, {useState, useRef, useEffect, useContext} from 'react';
import './Tooltip.scss';

const TooltipContext = React.createContext();

export function Tooltip(props) {
    const [active, setActive] = useState(false);
    const node = useRef();

    const handleClick = (event) => {
        if (active && node.current.contains(event.target)) return;
        setActive(false);
    }

    function close() {
        setActive(false);
        console.log(active);
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
                <TooltipContext.Provider value={{close}}>
                {active && (
                    <div className='tooltip-tip bottom' ref={node}>
                            {props.content}
                    </div>
                )}
                </TooltipContext.Provider>
            </div>
    )
}

export function EditLineItemInnerTooltip(props) {
    const {setActive} = useContext(TooltipContext);

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
                    <button onClick={() => setActive(false)}>Cancel</button>
                    <button className="accent" onClick={() => setActive(false)}>OK</button>
                </div>
            </div>
        </div>
    );
}

export function AddCategoryInnerTooltip(props) {
    const {close} = useContext(TooltipContext);

    return(
        <div className="inner-tooltip-wrapper">
            <input
                className="tooltip-custom-input"
                type="text"
                defaultValue={props.name}
            />
            <div className="button-end">
                <button onClick={() => close}>Cancel</button>
                <button>Ok</button>
            </div>
        </div>
    )
}
