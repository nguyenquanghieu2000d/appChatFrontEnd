const initialState = {
    conversations: [],
    selectedConversation: {},
    messageDetails: {}
};

initialState.selectedConversation = initialState.conversations[1];

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONVERSATIONS_LOADED': {
            const newState = {...state};
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;

            return newState;
        }
        case 'SELECTED_CONVERSATION_CHANGED': {
            const newState = {...state};
            newState.selectedConversation =
                newState.conversations.find(
                    conversation => {
                        // alert(JSON.stringify(conversation))
                        // alert(conversation.id === action.conversationId)
                        return conversation.username === action.conversationId

                    }
                );
            // alert(JSON.stringify(newState.selectedConversation))
            return newState;
        }
        case 'DELETE_CONVERSATION': {
            if (state.selectedConversation) {
                const newState = {...state};

                let selectedConversationIndex =
                    newState.conversations.findIndex(c => c.username === newState.selectedConversation.username);
                newState.conversations.splice(selectedConversationIndex, 1);

                if (newState.conversations.length > 0) {
                    if (selectedConversationIndex > 0) {
                        --selectedConversationIndex;
                    }

                    newState.selectedConversation = newState.conversations[selectedConversationIndex];
                } else {
                    newState.selectedConversation = null;
                }

                return newState;
            }

            return state;
        }
        case 'NEW_MESSAGE_ADDED': {
            if (state.selectedConversation) {
                const newState = {...state};
                newState.selectedConversation = {...newState.selectedConversation};
                alert(JSON.stringify(newState.selectedConversation));
                // alert(JSON.stringify(newState.messageDetails))
                newState.messageDetails[newState.selectedConversation.username].messages.unshift(
                    {
                        imageUrl: null,
                        imageAlt: null,
                        message: action.textMessage,
                        date: 'Apr 16',
                        isMyMessage: true
                    },
                )

                return newState;
            }

            return state;
        }
        case 'MESSAGES_LOADED':
            const {conversationId, messages, hasMoreMessages, lastMessageId} = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry = {hasMoreMessages, lastMessageId, messages: []};
            if (currentConversationMapEntry) {
                newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            }
            newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];
            const newMessageDetails = {...state.messageDetails};
            newMessageDetails[conversationId] = newConversationMapEntry;
            const newState = {...state};
            newState.messageDetails = newMessageDetails
            return newState;
        default:
            return state;
    }
}

export default conversationsReducer;