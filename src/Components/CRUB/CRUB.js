import contacts from '../api/contacts';
import api from '../api/contacts'
// Get Data
export const retrieveWords = async () => {
    const response = await api.get("/words");
    return response.data
}

//Add Data
export const addWords = async (word) => {
    try {
        const request = {
            ...word,
        }
        const respone = await api.post("/words", request)

        return respone.data
    } catch(err) {
        alert("Lỗi !!!")
    } 
}
//Remove Data
export const removeWord = async (id) => {
    await api.delete(`/words/${id}`)
    
}
//Update Data

export const updateDataHandle = async (word) => {
    const response = await api.put(`/words/${word.id}`, word)
    return response.data
}