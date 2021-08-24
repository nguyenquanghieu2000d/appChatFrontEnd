import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    conversationChanged as cvd,
    conversationDeleted,
    conversationsRequested,
    newMessageAdded
} from '../../store/actions';
import ConversationSearch from '../../components/conversation/conversation-search/ConversationSearch';
import NoConversations from '../../components/conversation/no-conversations/NoConversations';
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import NewConversation from '../../components/conversation/new-conversation/NewConversation';
import ChatTitle from '../../components/chat-title/ChatTitle';
import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';

import './ChatShell.scss';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const ChatShell = () => {


    const conversations = useSelector(state => state.conversationState.conversations)  // Đây là dữ liệu trò chuyện giữa các user với nhau
    const selectedConversation = useSelector(state => state.conversationState.selectedConversation) // Đây là usẻ được chọn để trò chuyện
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate()

    const conversationChanged = (conversationId) => {

        dispatch(cvd(conversationId))
    }
    const onMessageSubmitted = (messageText) => {

        dispatch(newMessageAdded(messageText))
    }
    const onDeleteConversation = () => {
        dispatch(conversationDeleted());
    }

    const isLogin = () => {

        if(cookies.user === undefined)
            navigate("/")
    }

    const loadConversations = () => {
        if (cookies.user !== undefined)
            dispatch(conversationsRequested(cookies.user))
        else isLogin()
        // alert("con " + conversations)
    }


    useEffect(() => {
        isLogin()
        loadConversations();
    }, []);

    let conversationContent = (
        <>
            <NoConversations/>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.username}/>
            </>
        );
    }

    return (
        <div id="chat-container">
            <ConversationSearch conversations={conversations}/>
            <ConversationList
                onConversationItemSelected={conversationChanged}
                conversations={conversations}
                selectedConversation={selectedConversation}/>
            <NewConversation/>
            <ChatTitle
                selectedConversation={selectedConversation}
                onDeleteConversation={onDeleteConversation}/>
            {conversationContent}
            <ChatForm
                selectedConversation={selectedConversation}
                onMessageSubmitted={onMessageSubmitted}/>
        </div>
    );
}

export default ChatShell;