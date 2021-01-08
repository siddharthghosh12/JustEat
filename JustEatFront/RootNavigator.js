import {createRef} from 'react';


export const Navigation_ref = createRef();

export function navigate(name,params) {
    Navigation_ref.current?.navigate(name,params);
}