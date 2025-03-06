/* eslint-disable react-refresh/only-export-components */
import Alert from "@mui/material/Alert";


export default function (props: {
    message: string,
    color: "success"|"error"|"warning"|"info"
}){
    return (
        <div className="my-alert p-1">
            <Alert variant="filled" severity={props.color}>
                {props.message}
            </Alert>
        </div>
    );

}