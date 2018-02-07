import React from 'react';

const Note = (props) => {


 
    return (
        <div className="panel panel-default">
        <div className="panel-heading">
        { props.info.title}
            <span className="pull-right text-uppercase delete-button" >&times;</span>
        </div>
        <div className="panel-body">{props.info.content}</div>
    </div>
    )
}


export default Note