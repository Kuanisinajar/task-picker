export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            const userId = firebase.auth().currentUser.uid;
            firestore.collection('users').doc(userId).get()
                .then((res) => {
                    // console.log(res.data());
                    dispatch({ type: "LOGIN_SUCCESS", data: res.data()})
                }).catch((err) => {
                    console.log(err);
                });
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err })
        })
    }
}

export const signOut = () => {

    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT_SUCCESS" })
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
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
        })
    }

}