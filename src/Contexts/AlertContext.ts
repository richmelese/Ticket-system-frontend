/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';

export default createContext<any>({
    showAlert: false,
    alertType: "success"
});