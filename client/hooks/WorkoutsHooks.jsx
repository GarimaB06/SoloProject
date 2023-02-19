import React, {useEffect} from "react";

function Workouts(){
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await fetch('/api/')
                const data = await response.json()
            } catch(err){
                console.log('Workouts.getWorkouts error ', err)
            }
        }
    }, [])
    return (<div>Hello I'm in Workouts!</div>)
}
export default Workouts 
