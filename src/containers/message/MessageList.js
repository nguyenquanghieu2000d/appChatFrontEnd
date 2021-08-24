import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {messagesRequested} from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';
import {useCookies} from "react-cookie";

const MessageList = ({conversationId}) => {
    const messageDetails = useSelector(state => state.conversationState.messageDetails[conversationId]);
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['user']);

    const loadMessages = (conversationId, lastMessageId) => {
        dispatch(messagesRequested(conversationId, 5, lastMessageId, cookies.user.username))
    }


    const messages = messageDetails ? messageDetails.messages : null;
    let messageItems = null;

    useEffect(() => {
        if (!messageDetails) {
            loadMessages(conversationId, null);
        }
    }, [messageDetails, loadMessages, conversationId])

    if (messages && messages.length > 0) {
        messageItems = messages.map((message, index) => {
            return <Message
                key={index}
                isMyMessage={message.isMyMessage}
                message={message}/>;
        });
    }

    return (
        <div id="chat-message-list">
            {messageItems}
        </div>
    );
}

export default MessageList;