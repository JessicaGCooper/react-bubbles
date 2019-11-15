import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { axiosWithAuth } from '../utils/axiosWithAuth'

const AddColorForm = ({updateColors}) => {
    
    const [newColor, setNewColor] = useState({
        color: "",
        code: { hex: "" }
    });

    let history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
         .post('/api/colors', newColor)
         .then( res => {
             console.log(res);
             updateColors(res.data)
             history.push("/bubblepage")
         })
         .catch( err => console.log(err));
    }

    const handleColorChange = e => {
        setNewColor({
            ...newColor,
            color: e.target.value
        })
    }

    const handleHexChange = e => {
        setNewColor({
            ...newColor,
            code: { hex: e.target.value }
        })
    }

    return (
        <div className="addFriendForm">
            <form onSubmit={handleSubmit}>
                <legend>add color</legend>
                <label>
                    color name:
                <input 
                    onChange={handleColorChange} 
                    type="text" 
                    name="color" 
                    value={newColor.color} 
                    placeholder="color name" 
                    size="30" 
                    required
                />
                </label>
                <label>
                    hex code:
                <input 
                    onChange={handleHexChange} 
                    type="text" 
                    name="hex" 
                    value={newColor.code.hex} 
                    placeholder="hex code" 
                    size="30" 
                    required
                />
                </label>
            <div className="button-row">
                <button type="submit">add color</button>
            </div>
        </form>    
    </div>  
    )
}

export default AddColorForm