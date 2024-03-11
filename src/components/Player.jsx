import { useState } from "react";
export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName]=useState(initialName)
    const [isEditing, setIsEditing]= useState(false);
    let editablePlayerName= <span className="player-name">{playerName}</span>
    function ChangeHandler(event){
        console.log(event)
        setPlayerName(event.target.value)
    }
    // let buttonCaption="Edit"
    if (isEditing){
        editablePlayerName=<input type="text" required value={playerName} onChange={ChangeHandler}/>
    }
    function editHandler(){
        setIsEditing(!isEditing)
        if(isEditing){onChangeName(symbol, playerName)}
    }
    ;
    return(
        <li className={isActive ? "active" : undefined}>
        <span className="player">   
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editHandler}>{isEditing ? "Save": "Edit"}</button>
      </li>
    )
}