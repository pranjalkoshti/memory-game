import React, { useState, useEffect } from 'react';

const Grid = (props) => {

    const [activeItems, setactiveItems] = useState([]);
    const [revealedElements, setrevealedElements] = useState([]);

    useEffect(() => {
     setactiveItems([])
     setrevealedElements([])
    }, [props.flag])

    useEffect(() => {
      if(revealedElements.length == ((props.level*props.level)/2)){
        if(props.onGameOver){
            props.onGameOver(true)
        }
      }
    }, [revealedElements.length])


    const revealCard = (rowIndex, colIndex, colItem)=>{
        let arr = [...activeItems];
        if(arr.length == 1){
            let obj= { rowIndex, colIndex,  colItem}
            arr.push(obj)
            setactiveItems(arr)
            setTimeout(() => {
                setactiveItems([])
            }, 500);
   
            if(arr[0].colItem == colItem){
                let arr2 = [...revealedElements]
                arr2.push(colItem)
                setrevealedElements(arr2)
            }
        }else if(arr.length == 0){
                let obj= { rowIndex, colIndex,  colItem}
                arr.push(obj)
                setactiveItems(arr)
        }
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {props.gridArray.map((rowItem, rowIndex) => {
                return (
                    <div >
                        {
                            rowItem.map((colItem, colIndex) => {
                                let flag = 
                                activeItems.find((item)=>item.rowIndex == rowIndex && item.colIndex == colIndex) ? true 
                                : revealedElements.includes(colItem) ? true : false;
                                return (
                                    <div class="flip-card" style={{cursor:'pointer'}} 
                                    onClick={()=>{
                                        revealCard(rowIndex, colIndex, colItem)
                                    }}>
                                        <div class={`flip-card-inner ${flag == true ? "flip-card-revealed" : ''}`}>
                                            <div class="flip-card-front">
                                            </div>
                                            <div class="flip-card-back">
                                                {/* <img src="https://avatars.dicebear.com/api/bottts/seed-9.svg" height="auto" width={96} alt="Avatar" /> */}
                                                <div style={{position:'absolute'}}>{colItem}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }</div>
                )
            })}
        </div>
    )
}

export default Grid;