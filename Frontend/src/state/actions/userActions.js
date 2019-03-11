export const setLoginState = status => ({
    type: "SET_LOGIN_STATE",
    payload: status
}); 

export const editProgress = progress => ({
    type: "EDIT_PROGRESS",
    payload: progress
});

export const setUserInfo = userInfo => ({
    type: "SET_USER_INFO",
    payload: userInfo
});

export const clearUserInfo = ()=> ({
    type: 'CLEAR_USER'
});


