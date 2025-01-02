import "../Styles/Notification.css";

export default function Notification(props) {
    return (
        <div className="modal-body">
            <div>{props.message}</div>
            <button type="button" onClick={props.close}>Tutup</button>
        </div>
    )
}
