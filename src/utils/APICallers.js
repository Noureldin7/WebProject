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