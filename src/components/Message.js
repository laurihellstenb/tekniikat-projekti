import React from 'react';

// renderöi viestitekstin ja poistonappulan
const Message = ({ msgText, msgId, removeMsg }) => {

    return (
        <div className="messages">
            <div>{msgText}</div>
            <div className="removeButton" onClick={() => removeMsg(msgId)}>&#10007;</div>
        </div>
    )
}

export default Message