const functions = require('firebase-functions');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express');

const app = express();

const admin = require('firebase-admin');
admin.initializeApp();

// app.get('/tickets/:pushId', (req, res) => {
//     const ticketId = req.params.pushId;
//     admin.database().ref(`/tickets/${ticketId}`).transaction(t => {
//         if(t.open === true) {
//             return admin.database().ref(`/tickets/${ticketId}`).update({secondUserId: newUserId, open: false}).then(()=>{
//                 return admin.database().ref(`usertickets/${userId}/${ticketId}`).set(newUserTicket);
//             })
//         }
//     })
// })

exports.addBets = functions.database.ref('/tickets/{pushId}').onCreate((snapshot, context) => {
    const ticket = snapshot.val();
    const userticket = {
        createdAt: ticket.createdAt,
        betOutcome: ticket.outcome,
        ticketId: ticket.id,
        stake: ticket.openingStake
    };
    return snapshot.ref.parent.parent.child(`usertickets/${ticket.creatorId}/${ticket.id}`).set(userticket);
})



exports.addUserToBet = functions.database.ref('triggers/JOINBETS/{userId}').onCreate((snapshot, context) => {
    const ticket = snapshot.val();
    console.log(ticket);
    const ticketid = ticket.ticketId;
    const userId = context.params.userId;
    let ticketWasOpen = false;//we would be using this soon, pay attention
    const newUserTicket = {
        createdAt: Date.now(),
        betOutcome: ticket.outcome,
        ticketId: ticketid,
    }
    return snapshot.ref.parent.parent.parent.child(`tickets/${ticketid}`).transaction(transaction => {
        if (transaction === null) {
            return null;
        } else if (transaction !== null) {
            if (transaction.open === true) {
                ticketWasOpen = true;//we reset our variable
                transaction['contenderId'] = userId;
                transaction['open'] = false;
                //we update the transaction and return it


            } else {
                // return transaction; 
            }

            return transaction;//note this line...you must return the transaction object back. thats the point. 

        }
    })
        .then(() => {
            if (ticketWasOpen) {//we used it here
                return snapshot.ref.parent.parent.parent
                .child(`usertickets/${userId}/${ticketid}`)
                .set(newUserTicket).then(()=> {
                    return admin.database().ref(`triggers/JOINBETS/${userId}`).remove()
                })
            } else {
                return null
            }
        })
})

// exports.signUp = functions.auth.user().onCreate((user, context) => {
//     const newUser = {
//         displayName: user.displayName,
//         email: user.email,
//         userId: user.uid,
//     }
//     return admin.database().ref(`userProfiles/${newUser.userId}`).set(newUser);
// })
// exports.signUp = functions.database.ref('triggers/UPDATEUSERNAME/{userId}').onCreate((snapshot, context)=> {
//     const user = snapshot.val();

// })
