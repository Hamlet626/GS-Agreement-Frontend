import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./index";

interface IsaveCallback {
    saveCallback:Function|null
}

const initialState:IsaveCallback={
    saveCallback:null
}

export const slice=createSlice({
    name:"SaveCallback",
    initialState,
    reducers: {
        addSave:(state,{payload})=>{
            state.saveCallback=payload;
        },
        removeSave:(state)=>{
            // if(state.saveCallback)state.saveCallback();
            state.saveCallback=null;
        }
    }
})

export const selectSaveCallback=(state:RootState)=>state.saveButton.saveCallback;
export const {addSave,removeSave}=slice.actions;
export default slice.reducer;