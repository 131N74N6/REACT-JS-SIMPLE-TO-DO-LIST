import { memo } from "react";
import ListColumn from "./ListColumn";

function ListField(props) {
    return (
        <div className="list-group">
            <ListColumn 
                columnTitle="✒️ Baru" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                category="baru"
            />
            <ListColumn 
                columnTitle="⭐ Sedang Dilakukan" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                category="sedang dilakukan"
            />
            <ListColumn 
                columnTitle="☑️ Selesai" 
                data={props.data} 
                eraser={props.eraser} 
                activeCard={props.activeCard} 
                dropHandling={props.dropHandling} 
                category="selesai"
            />
        </div>
    )
}

export default memo(ListField);
