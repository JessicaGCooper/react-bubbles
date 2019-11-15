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
                <legend>Add Color</legend>
                <label htmlFor="color">Name:</label>
                <input 
                    onChange={handleColorChange} 
                    type="text" 
                    name="color" 
                    value={newColor.color} 
                    placeholder="Color Name" 
                    size="30" 
                    required
                />
                <label htmlFor="hex">Hex:</label>
                <input 
                    onChange={handleHexChange} 
                    type="text" 
                    name="hex" 
                    value={newColor.code.hex} 
                    placeholder="hex" 
                    size="30" 
                    required
                />
            <div className="button-row">
                <button type="submit">Add Color</button>
            </div>
        </form>    
    </div>  
    )
}

export default AddColorForm