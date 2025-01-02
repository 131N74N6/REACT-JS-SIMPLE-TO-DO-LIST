import Card from "./Card";
import DropArea from "./DropArea";
import "../Styles/ListColumn.css";

export default function ListColumn(props) {
    return (
        <div className="column-content">
            <div className="title">{props.columnTitle}</div>
            <div className="contents">
                <DropArea 
                    dropHandling={props.dropHandling} 
                    index={0} 
                    category={props.category}
                />
                {props.data.map((d, index) => props.category === d.category ? (
                    <div key={index}>
                        <Card
                            listId={d.id}
                            activity={d.title} 
                            level={d.status} 
                            eraser={() => props.eraser(d.id)}
                            activeCard={() => props.activeCard(d.id)} 
                            noActive={() => props.activeCard(0)}
                        />
                        <DropArea 
                            dropHandling={props.dropHandling} 
                            index={index + 1} 
                            category={props.category}
                        />
                    </div>
                ) : null)}
            </div>
        </div>
    )
}
