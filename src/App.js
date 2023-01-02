import { useEffect, useState } from "react"
import blueCandy from './images/blueCandy.png'
import greenCandy from './images/greenCandy.png'
import orangeCandy from './images/orangeCandy.png'
import purpleCandy from './images/purpleCandy.png'
import redCandy from './images/redCandy.png'
import yellowCandy from './images/yellowCandy.png'
import blank from './images/blank.png'
const width =8
const candyColor=[
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy
]

const  App= ()=> {

  const [currentColorArrangement,setCurrentColorArrangement]=useState([])

  const [squareBeingDragged,setSquareBeingDragged]=useState(null)

  const [squareBeingReplaced,setSquareBeingReplaced]=useState(null)

  const checkForColumnOfFour=()=>{
   for(let i=0;i<=39;i++){
     const checkForColumnOfFour=[i,i+width,i+width*2,i+width*3]

      const decidedColor=currentColorArrangement[i]


      if(checkForColumnOfFour.every(square => currentColorArrangement[square]===decidedColor)){
        checkForColumnOfFour.forEach(square =>currentColorArrangement[square]=blank)
        return true
      }
   }
  }
  const checkForRowOfFour=()=>{
    for(let i=0;i<64;i++){
      const rowOfFour=[i,i+1,i+2,i+3]

       const decidedColor=currentColorArrangement[i]
       const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
       if(notValid.includes(i)) continue


       if(rowOfFour.every(square => currentColorArrangement[square]===decidedColor)){
         rowOfFour.forEach(square =>currentColorArrangement[square]=blank)
         return true
       }
    }
  }

  const checkForColumnOfThree=()=>{
     for(let i=0;i<=47;i++){
       const columnOfThree=[i,i+width,i+width*2]

        const decidedColor=currentColorArrangement[i]


        if(columnOfThree.every(square => currentColorArrangement[square]===decidedColor)){
          columnOfThree.forEach(square =>currentColorArrangement[square]=blank)
          return true
        }
     }
   }


  const checkForRowOfThree=()=>{
    for(let i=0;i<64;i++){
      const rowOfThree=[i,i+1,i+2]

       const decidedColor=currentColorArrangement[i]
       const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
       if(notValid.includes(i)) continue


       if(rowOfThree.every(square => currentColorArrangement[square]===decidedColor)){
         rowOfThree.forEach(square =>currentColorArrangement[square]=blank)
         return true
       }
    }
  }

  const moveIntoSquareBelow=()=>{
    for (let i = 0; i <=55; i++) {
      const firstRow=[0,1,2,3,4,5,6,7]
      const isFirstRow=firstRow.includes(i)
      if(isFirstRow && currentColorArrangement[i]===blank){
        let randomNumber=Math.floor(Math.random() * candyColor.length)
        currentColorArrangement[i]=candyColor[randomNumber]
      }
      if((currentColorArrangement[i+width])===blank){
        currentColorArrangement[i+width]=currentColorArrangement[i]
        currentColorArrangement[i]=blank
      }
      
    }
  }

  const dragStart=(e) => {
    console.log(e.target)
    console.log('drag start')
    setSquareBeingDragged(e.target)
  }

  const dragDrop=(e) => {
    console.log(e.target)
    console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }

  const dragEnd=(e) => {
    console.log(e.target)
    console.log('drag end')
    const squareBeingDraggedId=parseInt(squareBeingDragged.getAttribute ('data-id'))
    const squareBeingReplacedId=parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId]=squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId]=squareBeingReplaced.getAttribute('src')
    console.log('squareBeingDraggedId',squareBeingDraggedId)
    console.log('squareBeingReplacedId',squareBeingReplacedId)


    //სიმბოლოების(ფერების) გადატანა შეგვეძლოს მხოლოდ ერთი უჯრით
    const validMoves=[
      squareBeingDraggedId-1,
      squareBeingDraggedId-width,
      squareBeingDraggedId+1,
      squareBeingDraggedId+width
      
    ]
    const validMove=validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour=checkForColumnOfFour()
    const isARowOfFour=checkForRowOfFour()
    const isAColumnOfThree=checkForColumnOfThree()
    const isARowOfThree=checkForRowOfThree()

    if(squareBeingReplacedId && 
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)){
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      }else{
        currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src')
        setCurrentColorArrangement([...currentColorArrangement])

      }



  }

// ვქმნით 64 ფერის მასივს და რენდერით ვწერთ setCurrentColorArrangment-ში
  const createBoard=() =>{

    const randomColorArrangment=[]
    for(let i=0;i<width*width;i++){
      const randomColor=candyColor[Math.floor(Math.random()*candyColor.length)]
      randomColorArrangment.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangment)
  }
  //ვიძახებთ createBoard ფუნქციას useEffect-ის საშუალებით ერთხელ
  useEffect(() =>{
    createBoard()
    
    

  }, [])

  //ვიძახებთ ოთხ ფუნქციას რომლებიც შლიან ერთნაირი ფერების მეზოელ ობიქტებს.
  //ვიძახებთ setCurrentColorArrangement ფუნქციას რომელიც რენდერს უკეთებს პროექტს.
   useEffect(() =>{
     const timer=setInterval(() =>{
       checkForColumnOfFour()
       checkForRowOfFour()
       checkForColumnOfThree()
       checkForRowOfThree()
       
       moveIntoSquareBelow()
       setCurrentColorArrangement([...currentColorArrangement])
     })

     return () =>clearInterval(timer)

   },[currentColorArrangement])




  return(
    <div className="app">
      <div className="game">
        {/* 64 ფერის მასივს გადავუვლით map-ით და თითოეულ ელემენტს(ფერს) ვანიჭებთ სურათის backgroundColors-ს */}
        {currentColorArrangement.map((candyColor,index) =>(
          <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
                onDragOver={(e) =>e.preventDefault()}
                onDragEnter={(e) =>e.preventDefault()}
                onDragLeave={(e) =>e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  )

}

export default App



