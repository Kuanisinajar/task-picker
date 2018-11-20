export const addTag = (tag) => {

    return (dispatch, getState, { getfirebase, getFirestore}) => {
        const firestore = getFirestore();

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
    }
}