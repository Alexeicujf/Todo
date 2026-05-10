// useLocalStorage почитать!
// дженерик ts!!!
import { useState } from "react"

export function useLocalStorage<T>(name: string, initianValue: T) {
    const [data, setData] = useState<T | null>(() => {
         let value = localStorage.getItem(name);
        if (value !== null) {
            return JSON.parse(value);  // JSON.parse(value); stringify() LOG
        }
        //set({})
        return initianValue;
    });
 

    const set = (value: any) => {
        let newValue = value;
        if (typeof newValue === "object" ) {
            newValue = JSON.stringify(value); //  stringify - переводит обьъект в строки
        }
        localStorage.setItem(name, newValue) ///!!!!!
        setData(newValue);
    };

    const get = () => {
        let value = localStorage.getItem(name);
        if (value !== null) {
            return JSON.parse(value);  // JSON.parse(value); stringify() LOG
        }
        //set({})
       return initianValue;
    };

    const remove = () => {
        localStorage.removeItem(name);
        setData(null);
        return true;
    };

//    { useEffect(() => { /// !!!!!!!!!!!!!!!!!!
//         setData(get());
//     },[]) 
    return {
        set, remove, get, data
    } 
}