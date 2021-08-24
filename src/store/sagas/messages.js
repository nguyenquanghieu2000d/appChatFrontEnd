import {call, put, takeLatest} from 'redux-saga/effects';

import {messagesLoaded} from '../actions';
import {ChatApi} from "../../api/ChatApi";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const messagesSaga = function* (action) {

    const {conversationId, numberOfMessages, lastMessageId, fromacc} = action.payload;
    const toacc = conversationId;
    const messages = yield call(ChatApi.getAllMessageAndFileForm2User, {user1: fromacc, user2: toacc})
    const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1 : 0;
    const endIndex = startIndex + numberOfMessages;
    const pageGroup = messages.slice(startIndex, endIndex);
    const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
    const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);
    yield delay(50);

    yield put(messagesLoaded(
        conversationId,
        pageGroup,
        hasMoreMessages,
        newLastMessageId
    ));

    if (hasMoreMessages) {
        yield delay(50);
        yield put({
            type: 'MESSAGES_REQUESTED',
            payload: {
                conversationId,
                numberOfMessages,
                lastMessageId: newLastMessageId,
                fromacc
            }
        })
    }
}

export const watchGetMessagesAsync = function* () {
    yield takeLatest('MESSAGES_REQUESTED', messagesSaga);
}