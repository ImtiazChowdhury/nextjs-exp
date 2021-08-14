import config from "../../config.json";

export async function getProductList(){
    const res = await fetch(`${config.baseUrl}/api/product?limit=50`);
    if(res.ok) return await res.json();
    else return [];
} 

export async function getProductDetail(id){
    const res = await fetch(`${config.baseUrl}/api/product/${id}?resolveCategory=1&resolveBrand=1&resolveTag=1`);
    if(res.ok) return await res.json();
    else return {};
}

export async function searchProduct(keyword){
    const res = await fetch(`${config.baseUrl}/api/product?limit=10&search=${keyword}`);
    if(res.ok) return await res.json();
    else return [];
}