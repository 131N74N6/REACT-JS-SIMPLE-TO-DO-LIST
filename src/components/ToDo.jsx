import React, { useReducer, Fragment, useRef, useContext } from "react";
import Swal from "sweetalert";
import "./ToDo.css";
import ToDoModal from "./modal-reg";
import { DarkModeContext } from "./Dark-Mode-Context";
import Header from "./Header";
import Footer from "./Footer";

export default function ToDoList() {

    const { dark } = useContext(DarkModeContext);

    // Initial state atau nilai default
    const initialState = {
        data: [],
        updateData: "",
        isFillOpen: false,
        isChangeOpen: false,
        totalList: 0,
        chosenList: []
    }

    // Reducer function
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_DATA':
                return { ...state, data: action.payload }
            case 'SET_UPDATE_DATA':
                return { ...state, updateData: action.payload }
            case 'SET_FILL_MODAL':
                return { ...state, isFillOpen: action.payload }
            case 'SET_CHANGE_MODAL':
                return { ...state, isChangeOpen: action.payload }
            case 'SET_TOTAL_LIST':
                return { ...state, totalList: action.payload }
            default:
                return state;
        }
    }

    const [state, setState] = useReducer(reducer, initialState);
    const inputRef = useRef();
    const selectIndexRef = useRef();
    const submitRef = useRef();

    const openForm = () => {
        setState({ type: 'SET_CHANGE_MODAL', payload: false });
        setState({ type: 'SET_FILL_MODAL', payload: true });
        submitRef.current.style.display = "none";
    }

    const closeForm = () => {
        setState({ type: 'SET_CHANGE_MODAL', payload: false });
        setState({ type: 'SET_FILL_MODAL', payload: false });
        submitRef.current.style.display = "inline-block";
    }

    const handleDataChange = (event) => {
        setState({ type: 'SET_UPDATE_DATA', payload: event.target.value });
    }

    //menghapus salah satu data
    const handleDelete = (index) => {
        Swal({
            title : "kamu ingin menghapusnya ?",
            text : "data yang dihapus tidak dapat dikembalikan",
            icon : "warning",
            buttons : true,
            dangerMode : true
        }).then((willDelete) => {
            if (willDelete) {
                Swal("data berhasil dihapus", {icon : "success"})
                const deletedData = state.data.filter((_, i) => i !== index);
                setState({ type: 'SET_DATA', payload: deletedData });
                setState({ type: 'SET_TOTAL_LIST', payload: state.totalList - 1 });
            }
            else {
                Swal("data batal dihapus");
            }
        })
    }

    //memindahkan array ke atas
    const moveAbove = (index) => {
        if (index > 0) {
            const editedData = [...state.data];
            [editedData[index], editedData[index - 1]] = [editedData[index - 1], editedData[index]];
            setState({ type: 'SET_DATA', payload: editedData });
        }
    }

    //memindahkan array ke bawah
    const moveBelow = (index) => {
        if (index < state.data.length - 1) {
            const editedData = [...state.data];
            [editedData[index], editedData[index + 1]] = [editedData[index + 1], editedData[index]];
            setState({ type: 'SET_DATA', payload: editedData });
        }
    }

    const handleClearAll = () => {
        if (state.data.length > 0) {
            Swal({
                title: "kamu ingin menghapus seluruh data ?",
                text: "data akan hilang setelah dihapus!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    Swal("tempat sudah kosong", {
                        icon: "success",
                    })
                    setState({ type: 'SET_DATA', payload: [] })
                    setState({ type: 'SET_TOTAL_LIST', payload: 0 });
                }
                else {
                    Swal("List batal dihapus!");
                }
            })
        }
        else {
            Swal("", "kamu belum menambahkan satu data pun", "error");
        }
    }

    //menambahkan ke array (database)
    const handleAdd = (event) => {
        const allowedChar = /^[a-zA-Z -0-9]+$/
        event.preventDefault();
        if (allowedChar.test(state.updateData) && state.updateData.trim() !== "") {
            if (!state.data.includes(state.updateData)) {
                setState({ type: 'SET_DATA', payload: [...state.data, state.updateData] });
                setState({ type: 'SET_UPDATE_DATA', payload: "" });
                setState({ type: 'SET_TOTAL_LIST', payload: state.totalList + 1 });
                Swal("", "data berhasil ditambahkan", "success");
            }
            else {
                setState({ type: 'SET_UPDATE_DATA', payload: "" });
                Swal("", "data sudah ada", "error");
            }
        }
        else {
            setState({ type: 'SET_UPDATE_DATA', payload: "" });
            Swal("", "masukkan data dengan benar", "error");
        }
    }

    //mengututkan dari kecil ke besar
    const ascendingSort = () => {
        const asc = [...state.data].sort((a, b) => a.localeCompare(b)); 
        setState({ type: 'SET_DATA', payload: asc });
    }

    //mengututkan dari besar ke kecil
    const descendingSort = () => {
        const dsc = [...state.data].sort((a, b) => b.localeCompare(a)); 
        setState({ type: 'SET_DATA', payload: dsc });
    }

    const listMark = (event) => {
        event.target.style.textDecoration = "line-through"; //mencoret list
        event.target.style.color = "darkblue";
    }

    const handleSelect = (index) => {
        selectIndexRef.current = index;
        setState({ type: 'SET_UPDATE_DATA', payload: state.data[selectIndexRef.current] });
        setState({ type:'SET_CHANGE_MODAL', payload: true });
        setState({ type: 'SET_FILL_MODAL', payload: false });
        submitRef.current.style.display = "inline-block";
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const allowChar = /^[a-zA-Z -0-9]+$/;
        const editedData = [...state.data];

        if (selectIndexRef.current !== undefined && selectIndexRef.current !== null) {
            if (allowChar.test(state.updateData) && state.updateData.trim() !== "") {
                if (state.updateData !== state.data[selectIndexRef.current]) {
                    editedData[selectIndexRef.current] = state.updateData
                    setState({ type: 'SET_DATA', payload: editedData });
                    setState({ type: 'SET_UPDATE_DATA', payload: "" });
                    Swal("", "data berhasil di update", "success");
                }
                else {
                    setState({ type: 'SET_UPDATE_DATA', payload: "" });
                    Swal("", "data harus berbeda", "error");
                }
            }
            else {
                setState({ type: 'SET_UPDATE_DATA', payload: "" });
                Swal("", "data harus berbeda", "error");
            }
        }
        else {
            Swal("", "kamu belum menambahkan satu data pun", "error");
        }
    }

    return (
        <Fragment>
            <Header/>
            <div className={`list-wrap ${dark ? "active" : ""}`}>
                <div className="list-content">
                    <h2>write your own list here...</h2>
                    {state.isFillOpen === true && (
                        <form id="input-wrap">
                            <input type="text" id="list-input" value={state.updateData} onChange={handleDataChange}
                                placeholder="masukkan aktivitas..." ref={inputRef} />
                            <button type="submit" className="add-btn" onClick={handleAdd}>Add</button>
                            <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
                        </form>
                    )}
                    {state.isChangeOpen === true && (
                        <form className="update-list" >
                            <ToDoModal 
                                getData={state.updateData} handleData={handleDataChange} 
                                update={handleUpdate} cancel={closeForm}
                            />
                        </form>
                    )}
                    <div className="sorting">
                        <button type="button" id="open" onClick={openForm} ref={submitRef}>Add List</button>
                        <button type="button" id="asc-1" onClick={() => ascendingSort()}>A-Z</button>
                        <button type="button" id="dsc-1" onClick={() => descendingSort()}>Z-A</button>
                        <button type="button" id="empty" onClick={() => handleClearAll()}>Clear All</button>
                    </div>
                    <div className="data-length" style={{textAlign:'center'}}>{state.totalList} list added</div>
                    {state.data.length > 0 ? (
                        state.data.map((dt, index) => (
                            <div key={index} className="list">
                                <div className="list-text" onClick={listMark}>{dt}</div>
                                <div className="control-wrap">
                                    <button type="button" id="editlist" onClick={() => handleSelect(index)} >📝</button>
                                    <button type="button" id="moveup" onClick={() => moveAbove(index)}>⬆️</button>
                                    <button type="button" id="movedwn" onClick={() => moveBelow(index)}>⬇️</button>
                                    <button type="button" id="erase" onClick={() => handleDelete(index)}>🗑️</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-wrap">
                            <div className="empty-warn">...kamu belum menambahkan list satu pun...</div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </Fragment>
    )
}