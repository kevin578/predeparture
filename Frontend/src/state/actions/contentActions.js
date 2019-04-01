export const setContent = (content)=> {
    return {
        type: "SET_CONTENT",
        payload: content
    }
} 

export const setContentHistory = (contentHistory)=> {
    return {
        type: "SET_CONTENT_HISTORY",
        payload: contentHistory
    }
}