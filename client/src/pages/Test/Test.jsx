import React, { useEffect, useState } from 'react'
import Questions from '../Questions/questions'
import styles from './styles.module.css';
import { MoveNextQuestion } from '../../hooks/FetchQuestion';
import { PushAnswer } from '../../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Test() {
  
  const [selectedBlock, setSelectedBlock] = useState(null);

    const state = useSelector(state => state)
    const result = useSelector(state => state.result.result)
    const {que, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()
    useEffect(() =>{
      console.log(state)
    })
  

    /** next button event handler */
    function onNext(){
      if(trace < que.length){
           
        /** increase the trace value by one using MoveNextAction */
           dispatch(MoveNextQuestion());
        
        //     /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(selectedBlock))
             }
         }
     
      
    }

    /** Prev button event handler */
    function onPrev(){
        // if(trace > 0){
        //     /** decrease the trace value by one using MovePrevQuestion */
        //     dispatch(MovePrevQuestion());
        // }
    }

    function onChecked(selectedBlock){
      setSelectedBlock(selectedBlock);
      console.log(selectedBlock)
      
        //setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= que.length){
         return <Navigate to={'/endtest'} replace={true}></Navigate>
     }

  return (
    <div className={styles.bodyBlock}>
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

     
        <Questions onChecked={onChecked} />

        
        <div className={styles.centeredButtonContainer}>
                <button className={styles.nextButton} onClick={onNext}>Dalej</button>
            </div>
            
       
    </div> </div>
  )
}