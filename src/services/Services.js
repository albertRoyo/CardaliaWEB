/*
Services

This is a collection of functions that interact with the backend API of the application. The functions 
use the axios library to make requests to the API and return, to the component that made the request, 
a promise that resolves with the response from the API or rejects with an error.

The requests that need authentification have a header containing the user token.

*/
import axios from "axios"

const API_URL = "https://cardalia-api.herokuapp.com"  // Production
//const API_URL = "http://localhost:9090"             // Development

export const PostRegister = (username, email, password) => {
    var url = API_URL + "/register"
    return axios.post(url, { "username": username, "email": email, "password": password })
}

export const PostLogin = (username, password) => {
    var url = API_URL + "/login"
    return axios.post(url, { "username": username, "password": password })
}

export const GetData = (autocomplete) => {
    var url = API_URL + "/cards/" + autocomplete
    return axios.get(url, { reponseType: 'json' })
}

export const GetVersions = (name) => {
    var url = API_URL + "/cards/versions/" + name
    return axios.get(url, { reponseType: 'json' })
}

export const GetUsersCollection = (username) => {
    var url = API_URL + "/user/collection/" + username
    return axios.get(url, { reponseType: 'json' })
}

////////////////////////////////////////  AUTH  /////////////////////////////////


export const ChangeUserPassword = (oldPassword, newPassword, token) => {
    var url = API_URL + "/user/password"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.put(url, { "oldPassword": oldPassword, "newPassword": newPassword }, { headers: headers })
}

export const PostCollection = (cardsList, token) => {
    var url = API_URL + "/user/collection"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.post(url, { "collection": cardsList }, { headers: headers })
}

export const GetCollection = (token) => {
    var url = API_URL + "/user/collection"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}

export const GetUsersCollectionsWithCard = (oracle_id, token) => {
    var url = API_URL + "/users/collections/" + oracle_id
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}

export const PostNewTrade = (trade, token) => {
    var url = API_URL + "/user/trade"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.post(url, { "username": trade.username, "whatYouTrade": trade.whatYouTrade, "whatHeTrade": trade.whatHeTrade, "youChecked": trade.youChecked, "heChecked": trade.heChecked }, { headers: headers })
}

export const ModifyTrade = (trade, token) => {
    var url = API_URL + "/user/trade"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.put(url, { "username": trade.username, "whatYouTrade": trade.whatYouTrade, "whatHeTrade": trade.whatHeTrade, "youChecked": trade.youChecked, "heChecked": trade.heChecked }, { headers: headers })
}


export const DeleteTrade = (token, username) => {
    var url = API_URL + "/user/trade/" + username
    const headers = { "Authorization": `bearer ${token}` }
    return axios.delete(url, { headers: headers }, { reponseType: 'json' })
}

export const GetTrades = (token) => {
    var url = API_URL + "/user/trades"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}
