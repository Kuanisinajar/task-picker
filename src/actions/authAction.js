export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        // Use firebase function to sign in
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            // connect to users collection 
            const userId = firebase.auth().currentUser.uid;
            firestore.collection('users').doc(userId).get()
                .then((res) => {
                    // dispatch to auth reducer with user's data
                    dispatch({ type: "LOGIN_SUCCESS", data: res.data() })
                }).then(() => {
                    // connect to userTasks collection with the user Id then dispatch to 
                    // projectReducer
                    firestore.collection('userTasks').where('ownerId', '==', userId).get()
                        .then((snapshot) => {
                            const tasks = [];
                            snapshot.docs.forEach(doc => {
                                const task = doc.data();
                                task.id = doc.id;
                                tasks.push(task);
                            });
                            dispatch({
                                type: 'LOAD_TASKS_WHEN_LOGIN',
                                tasks: tasks
                            });
                        }).catch((err) => {
                            dispatch({
                                type: 'LOAD_TASKS_ERROR',
                                err
                            });
                        })
                }).catch((err) => {
                    console.log(err);
                });
            // Also Tags 
            firestore.collection('userTags').where('ownerId', '==', userId).get()
                .then((snapshot) => {
                    const tags = [];
                    snapshot.docs.forEach(doc => {
                        const tag = doc.data();
                        tag.id = doc.id;
                        tags.push(tag);
                    });
                    dispatch({
                        type: 'LOAD_TAGS_WHEN_LOGIN',
                        tags: tags
                    });
                })
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err })
        })
    }
}

export const signOut = () => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT_SUCCESS" })
            }).then(() => {
                // switch to default tasks
                firestore.collection('defaultTasks').get()
                    .then((snapshot) => {
                        const tasks = [];
                        snapshot.docs.forEach(doc => {
                            const task = doc.data();
                            task.id = doc.id;
                            tasks.push(task);
                        });
                        dispatch({
                            type: 'LOAD_TASKS_WHEN_LOGOUT',
                            tasks: tasks
                        });
                    });
                // Switch to default tags
                firestore.collection('defaultTags').get()
                    .then((snapshot) => {
                        const tags = [];
                        snapshot.docs.forEach(doc => {
                            const tag = doc.data();
                            tag.id = doc.id;
                            tags.push(tag);
                        });
                        dispatch({
                            type: 'LOAD_TAGS_WHEN_LOGOUT',
                            tags: tags
                        });
                    });
            })
    }
}

export const signUp = (newUser) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).collection('user-profile').add({
                name: newUser.name
            })
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
            
        }).catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
        })
    }

}