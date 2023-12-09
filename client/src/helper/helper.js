import axios from "axios";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";

/**get server data */
export async function getServerData(url, callback){
    //const data = await axios.get(url);
    //console.log("PEREVIRKA");

   // console.log(data);
     const data = await (await axios.get(url))?.data;
     return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url,result ,callback){
    const data = await (await axios.get(url, result))?.data;
    return callback ? callback(data) : data;
}

