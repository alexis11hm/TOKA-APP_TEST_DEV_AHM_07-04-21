
const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `http://alexis11hm-001-site1.htempurl.com/api/${endpoint}`

    if(method === 'GET'){
        return fetch(url)
    }else{
        return fetch(url, { 
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `http://alexis11hm-001-site1.htempurl.com/api/${endpoint}`
    const token = `Bearer ${localStorage.getItem('token')}` || ''

    if(method === 'GET'){
        return fetch(url,{
            method,
            headers: {
                'Authorization': token
            },
        })
    }else{
        return fetch(url, { 
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data),
        })
    }

}

//Fetchs to Tokens

const fetchSinTokenToka = (endpoint, data, method = 'GET') => {

    const url = `https://api.toka.com.mx/candidato/api/${endpoint}`

    console.log(`data: ${JSON.stringify(data)}`)

    if(method === 'GET'){
        return fetch(url)
    }else{
        return fetch(url, { 
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'no-cors',
            body: JSON.stringify(data)
        })
    }
}

const fetchConTokenToka = (endpoint, data, method = 'GET') => {

    const url = `https://api.toka.com.mx/candidato/api/${endpoint}`
    const token = `Bearer ${localStorage.getItem('tokenToka')}` || ''

    if(method === 'GET'){
        return fetch(url,{
            method,
            headers: {
                'Authorization': token
            },
            mode: 'no-cors'
        })
    }else{
        return fetch(url, { 
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': token
            },
            mode: 'no-cors',
            body: JSON.stringify(data)
        })
    }

}

export {
    fetchSinToken,
    fetchConToken,
    fetchSinTokenToka,
    fetchConTokenToka
}