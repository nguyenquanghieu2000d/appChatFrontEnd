import {call, put, takeEvery} from 'redux-saga/effects';

import {messagesLoaded} from '../actions';
import {UserApi} from "../../api/UserApi";
import {ChatApi} from "../../api/ChatApi";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function fetchUser() {
    let conversations
    try {
        conversations = UserApi.getAllUsers();
    } catch (error) {

    }
}

export const conversationsSaga = function* (action) {

    yield delay(50);
    try {
        const conversations = yield call(UserApi.getAllUsers)
        const fromacc = action.payload.username;
        const toacc = conversations[0].username;
        const messageFirstFoundId = yield call(ChatApi.getAllMessageAndFileForm2User, {user1: fromacc, user2: toacc})
        yield put(messagesLoaded(conversations[0].username, messageFirstFoundId, false, null));
        yield put({
            type: 'CONVERSATIONS_LOADED',
            payload: {
                conversations,
                selectedConversation: conversations[0]
            }
        });

    } catch (error) {
        alert(error.response.data)
    }


}

export function* watchGetConversationsAsync() {
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}