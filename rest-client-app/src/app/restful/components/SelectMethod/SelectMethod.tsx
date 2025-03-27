'use client';

import { ChangeEventHandler, useState } from "react"
import { Methods } from "./types";
import { selectClasses } from "./classes";

function isMethod(value: string): value is Methods {
    return Object.values(Methods).includes(value as Methods);
}

export function SelectMethod(){

    const [method, setMethod] = useState<Methods>(Methods.GET);

    const onChange: ChangeEventHandler<HTMLSelectElement>  = (e ) => {
        const value = e.target.value;
        if (isMethod(value)) {
            setMethod(value);
        }
    }

    return (
        <select value={method} onChange={onChange}
          className={`
            px-3 py-2 
            border-2 border-blue-400
            rounded-md 
            ${selectClasses[method]}
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          `}>
            {
                Object.values(Methods).map((method) => {
                   return <option key={method}             
                   className={selectClasses[method]}
                >{method}</option>
                })
            }
        </select>
    )
}