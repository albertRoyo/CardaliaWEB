import axios from "axios"

export const PostCollection = (cardsList, token) => {
    var url = "https://cardalia-api.herokuapp.com/cards"
    const headers = { "Authorization": `bearer ${token}` }
    console.log("PostCol: ", cardsList)
    axios.post(url, { "collection": cardsList }, { headers: headers })
        .catch(err => {
            console.log(err)
        })
}

export const GetCollection = (token) => {
    var url = "https://cardalia-api.herokuapp.com/cards"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}


export const GetUsersCollection = (username) => {
    var url = "https://cardalia-api.herokuapp.com/user/" + username
    return axios.get(url, { reponseType: 'json' })
}

export const GetData = (query, setData) => {
    var url = "https://cardalia-api.herokuapp.com/" + query
    axios.get(url, { reponseType: 'json' })
        .then(response => {
            setData(response.data)
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const GetVersions = (name) => {
    var url = "https://cardalia-api.herokuapp.com/cards/versions/" + name
    return axios.get(url, { reponseType: 'json' })
}

export const PostRegister = (username, password) => {
    var url = "https://cardalia-api.herokuapp.com/register"
    return axios.post(url, { "username": username, "password": password })
}

export const PostLogin = (username, password) => {
    var url = "https://cardalia-api.herokuapp.com/login"
    return axios.post(url, { "username": username, "password": password })
}

export const GetUsersCollectionsWithCard = (oracle_id, token) => {
    var url = "https://cardalia-api.herokuapp.com/users/" + oracle_id
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}

export const ModifyTrade = (trade, token) => {
    console.log("put trade:", trade)
    var url = "https://cardalia-api.herokuapp.com/trade"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.put(url, { "username": trade.username, "whatYouTrade": trade.whatYouTrade, "whatHeTrade": trade.whatHeTrade, "youChecked": trade.youChecked, "heChecked": trade.heChecked }, { headers: headers })
}

export const PostNewTrade = (trade, token) => {
    console.log("Post trade:", trade)
    var url = "https://cardalia-api.herokuapp.com/trade"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.post(url, { "username": trade.username, "whatYouTrade": trade.whatYouTrade, "whatHeTrade": trade.whatHeTrade, "youChecked": trade.youChecked, "heChecked": trade.heChecked }, { headers: headers })
}

export const GetTrades = (token) => {
    var url = "https://cardalia-api.herokuapp.com/trades"
    const headers = { "Authorization": `bearer ${token}` }
    return axios.get(url, { headers: headers }, { reponseType: 'json' })
}

export const DeleteTrade = (token, username) => {
    var url = "https://cardalia-api.herokuapp.com/trade/" + username
    const headers = { "Authorization": `bearer ${token}` }
    return axios.delete(url, { headers: headers }, { reponseType: 'json' })
}
