import { Fragment } from "react";

export default function ToDoModal(props) {
    return (
        <Fragment>
            <input type="text" id="list-input" value={props.getData} onChange={props.handleData} 
            placeholder="masukkan aktivitas..." />
            <button type="submit" onClick={props.update} id="edit-btn">Update</button>
            <button type="button" onClick={props.cancel} className="cncl-b">Cancel</button>
        </Fragment>
    )
}