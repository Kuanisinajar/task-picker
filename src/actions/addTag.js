export const addTag = (tag, userId) => {

    return (dispatch, getState, { getfirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (userId !== undefined) {
            firestore.collection('userTags').add({
                ...tag
            }).then(() => {
                dispatch({
                    type: "ADD_TAG",
                    tag: tag
                });
            }).catch((err) => {
                dispatch({
                    type: "ADD_TAG_ERROR",
                    err
                });
            })
        } else {
            console.log('middle ware received');
            dispatch({
                type: "ADD_TAG",
                tag: tag
            });
        }
    }
}