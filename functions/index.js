const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNewMessageNotification = functions.firestore
  .document('/chats/{chatUid}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const snapshotData = snapshot.data();
    if (snapshotData.unread !== true) return;
    const userName = snapshotData.user.substring(0,snapshotData.user.lastIndexOf('@'),);
    const payload = {
      notification: {
        title: `${userName}`,
        body: `${snapshotData.message === undefined ? 'Image' : snapshotData.message}`,
      },
    };
    const toUserTokenQuery = admin
      .firestore()
      .collection('users')
      .where('email', '==', snapshotData.sendTo)
      .get();
    const toUserToken = await toUserTokenQuery.then(doc =>
      doc.docs.map(d => d.data().fcmTokens),
    );
    console.log(toUserToken);
    return await admin.messaging().sendToDevice(toUserToken, payload, {
      // Required for background/quit data-only messages on iOS
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    }).catch(error => console.log(error));
  });
