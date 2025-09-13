import * as SecureStore from 'expo-secure-store';
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
    const token = await SecureStore.getItemAsync('accessToken');
    const response = await fetch(endpoint, {
        method:'GET',
        headers: {
            Accept: 'application/json',
            //@ts-ignore
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch foods', response.statusText);
    }

    const data = await response.json();
    return data;

}


export const fetchLogs = async() => {
  const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/logs/`;
  const token = await SecureStore.getItemAsync('accessToken');
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (!response.ok) {
    //@ts-ignore
      throw new Error('Failed to fetch logs', response.statusText);
    }
    const data = await response.json();
    return data;

}


export const fetchFoodDetails = async (foodId: string) : Promise<FoodDetails> => {
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/logs/${foodId}/`
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
      Accept: 'application/json',
      Authorization: `Token ${tokenT}`,
    }

    }); 
    if (!response.ok) {
      throw new Error('Failed to fetch food detail');
    }
    const data = await response.json();
    return data;

  } catch (error){
    console.log(error);
    throw(error);
  }
}

export const fetchProfile = async () => {
  login('user1', 'weirdfishes');
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/account/api/profile/`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${tokenT}`,
      }
    });
    if (!response.ok){
      throw new Error('Failed to fetch profile information');
    }
    const data = await response.json();
    console.log('we got em');
    return data;
    
  } catch (error) {
    console.log(error);
    throw(error);
  }
}