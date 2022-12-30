export async function post(url,payload){
    const response = await fetch(url,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function patch(url,payload){
    const response = await fetch(url,{
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}
export async function get(url,params){
    const urlExtend = params?"?"+new URLSearchParams(params):""
    const response = await fetch(url+urlExtend,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        }
    });
    return response;
}