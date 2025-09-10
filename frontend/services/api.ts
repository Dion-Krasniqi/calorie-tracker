let tokenT : string | '';


export const TRACKER_CONFIG = {
    BASE_URL: 'http://192.168.1.9:8000',
    headers: { 
        accept: "application/json" ,
        Authorization: 'Token 3f6b77ee6254f7da1858be09aba7adae04fca629'
    },
}



export async function login(username: string, password: string) {
  const res = await fetch(`${TRACKER_CONFIG.BASE_URL}/account/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({username: username, password: password,}),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  const data = await res.json();
  tokenT = data.token;
  return data.token;
}



export const fetchFoods = async ({ query } : { query : string}) => {
  //Have to add brand here aswell
    const endpoint = query ? `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/foodsearch/?name=${encodeURIComponent(query)}`
    :`${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/foodlist/`;

    const response = await fetch(endpoint, {
        method:'GET',
        headers: {
            Accept: 'application/json',
            //@ts-ignore
            Authorization: `Token ${tokenT}`,
        },
    })

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch foods', response.statusText);
    }

    const data = await response.json();
    return data;

}





