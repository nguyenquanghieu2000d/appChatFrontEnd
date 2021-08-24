export const conversationChanged = conversationId => ({
    type: 'SELECTED_CONVERSATION_CHANGED',
    conversationId
});

export const conversationsRequested = username => ({
    type: 'CONVERSATIONS_REQUESTED',
    payload: username
});

export const conversationDeleted = () => ({
    type: 'DELETE_CONVERSATION'
});

export const newMessageAdded = textMessage => ({
    type: 'NEW_MESSAGE_ADDED',
    textMessage
});

export const messagesRequested = (conversationId, numberOfMessages, lastMessageId, fromacc) => ({
    type: 'MESSAGES_REQUESTED',
    payload: {
        conversationId,
        numberOfMessages,
        lastMessageId,
        fromacc
    }
});

export const messagesLoaded = (conversationId, messages, hasMoreMessages, lastMessageId) => ({
    type: 'MESSAGES_LOADED',
    payload: {
        conversationId,
        messages,
        hasMoreMessages,
        lastMessageId
    }
});