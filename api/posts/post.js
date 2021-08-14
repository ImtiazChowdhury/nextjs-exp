export async function getPostList(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(res.ok) return await res.json()
    else return [];
}

export async function getPostData(id){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/'+id);
    if(res.ok) return await res.json()
    else return {};
}