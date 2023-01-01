export async function post(url,token,payload){
    const response = await fetch(url,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization':'Bearer ' + token??"",
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function _delete(url,token,payload){
    const response = await fetch(url,{
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization':'Bearer ' + token??"",
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function patch(url,token,payload){
    const response = await fetch(url,{
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Authorization':'Bearer ' + token??"",
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function put(url,token,payload){
    const response = await fetch(url,{
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Authorization':'Bearer ' + token??"",
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function get(url,token,params){
    const urlExtend = params?"?"+new URLSearchParams(params):""
    const response = await fetch(url+urlExtend,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization':'Bearer ' + token??"",
            'Content-Type':'application/json'
        }
    });
    return response;
}