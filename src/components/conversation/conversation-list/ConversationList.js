import React from 'react';

import ConversationItem from '../conversation-item/ConversationItem';
import './ConversationList.scss';

const ConversationList = ({ conversations, selectedConversation, onConversationItemSelected }) => {
    const conversationItems = conversations.map((conversation) => {
        const conversationIsActive = selectedConversation && conversation.username === selectedConversation.username;

        return <ConversationItem 
            key={ conversation.username }
            onConversationItemSelected={ onConversationItemSelected }
            isActive={ conversationIsActive }
            conversation={ conversation } />;
    });

    return (
        <div id="conversation-list">
            {conversationItems}
        </div>
    );
}

export default ConversationList;