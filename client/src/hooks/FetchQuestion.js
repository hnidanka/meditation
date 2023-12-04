import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Action from '../redux/features/question_reducer'
import { getServerData } from "../helper/helper";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = ()=>{
    const dispatch = useDispatch();
    const [getQuestions, setGetQuestions] = useState({ isLoading : false, apiQuestions : [], serverError : null})

    useEffect(()=>{
        setGetQuestions(prev => ({...prev, isLoading : true}));

        (async () => {
            try {
                const [{questions, answers}] = await getServerData('http://localhost:3002/api/test/questions', (data)=>data)
                if(questions.length > 0){
                    setGetQuestions(prev => ({...prev, isLoading : false}));
                    setGetQuestions(prev => ({...prev, apiQuestions : questions}));

                    dispatch(Action.startTestAction({question : questions, answers}))
                }else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetQuestions(prev => ({...prev, isLoading : false}));
                setGetQuestions(prev => ({...prev, serverError: error}));


            }
        })();
    }, [dispatch]);
    return [getQuestions, setGetQuestions]
}

export const MoveNextQuestion = () => async(dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error)
    }
}