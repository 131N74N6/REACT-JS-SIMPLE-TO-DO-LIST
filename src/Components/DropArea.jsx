import { useState } from "react";
import "../Styles/DropArea.css";

export default function DropArea(props) {
    const [isShowDrop, setIsShowDrop] = useState(false);

    const visibilityOn = () => {
        setIsShowDrop(true);
    }

    const visibilityOff = () => {
        setIsShowDrop(false);
    }

    const handleDropping = (event) => {
        event.preventDefault()
        props.dropHandling(props.index, props.category);
        setIsShowDrop(false);
    }

    return (
        <div 
            className={isShowDrop ? "drop-area" : "drop-area-disabled"} 
            onDragEnter={visibilityOn} 
            onDragLeave={visibilityOff} 
            onDrop={handleDropping} 
            onDragOver={(event) => event.preventDefault()}
        >
            Drop Here
        </div>
    )
}
