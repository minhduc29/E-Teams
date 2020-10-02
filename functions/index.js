const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
});

// Http callable function (adding a request)
exports.addDiscussion = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'This website is not available for unauthenticated users'
        );
    }
    return admin.firestore().collection('discussion').add({
        owner: data.owner,
        title: data.title,
        description: data.description,
        likes: 0,
        dislike: 0
    });
});