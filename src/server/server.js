import firebase from 'firebase';
import myFirebase from '../Firebase';

myFirebase.init();

function writeUserData(userId, type, question_id, question) {
    firebase.database().ref(userId + "/" + type + "/" + question_id).set({
        question: question,
    });
}

async function listUser() {
    const snapshot = await firebase.database().ref().once('value');
    var users = [];
    snapshot.forEach(function (item) {
        var itemVal = item.ref.key;
        users.push({ id: itemVal });
    });
    return users;
}

async function getQuestionnaire(userId, type) {
    return await (await firebase.database().ref("/" + userId + "/" + type).once('value')).val();
}

async function getQuestion(userId, type, question_id) {
    return await (await firebase.database().ref("/" + userId + "/" + type + "/" + question_id).once('value')).val();
}

function removeQuestion(userId, type, question_id) {
    try {
        firebase.database().ref("/" + userId + "/" + type + "/" + question_id).remove();
    } catch (err) {
        console.log(err);
    }
}

function writeTimestamp(userId, type, question_id, start, stop) {
    firebase.database().ref(userId + "/" + type + "/" + question_id).set({
        start: start,
        stop: stop,
    });
}

export { writeUserData, listUser, getQuestionnaire, getQuestion, removeQuestion, writeTimestamp };