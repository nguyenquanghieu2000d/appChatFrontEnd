import React from 'react';
import classNames from 'classnames';

import './ConversationItem.scss';

const ConversationItem = ({ conversation, isActive, onConversationItemSelected }) => {
    const className = classNames('conversation', {
        'active': isActive
    });

    return (
        <div className={className} onClick={() => {
            onConversationItemSelected(conversation.username)
        }}>
            <img src={conversation.imageUrl} alt={conversation.imageAlt} />
            <div className="title-text">{conversation.hoten}</div>
            <div className="created-date">{conversation.date}</div>
            <div className="conversation-message">
                {conversation.latestMessageText}
            </div>
        </div>
    );
}

export default ConversationItem;