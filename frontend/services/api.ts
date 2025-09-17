import { loggedIn } from '@/app/(tabs)';
import * as SecureStore from 'expo-secure-store';


export const TRACKER_CONFIG = {
    BASE_URL: 'http://192.168.1.9:8000',
   /* headers: { 
        accept: "application/json" ,
        Authorization: `Bearer ${getSecureItem()}`
    },*/
}

export const fetchWithAuth = async <T>(endpoint: string, json_options?: RequestInit, parse:boolean=true): Promise<T> => {
  
  endpoint = `${TRACKER_CONFIG.BASE_URL}/${endpoint}`
  const token = await SecureStore.getItemAsync('accessToken');
  const options : RequestInit = {...json_options,
    headers: {...(json_options?.headers || {}),
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },

  };
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    if(response.status == 401) {
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const tokenResponse = await fetch(`${TRACKER_CONFIG.BASE_URL}/api/token/refresh/`, {
        method:'POST',
        headers: {Accept: 'application/json'},
        body: JSON.stringify({refresh:refreshToken}),
    })
        const newData = await tokenResponse.json()
        await SecureStore.setItemAsync('accessToken', newData.access);
        await SecureStore.setItemAsync('refreshToken', newData.refresh || refreshToken) ;
        return fetchWithAuth<T>(endpoint, json_options);
      } catch (error) {
        await SecureStore.setItemAsync('accessToken', '');
        await SecureStore.setItemAsync('refreshToken', '') ;
        //logout
        throw (error)
    } 
    } 

  }
  //const data: T = await response.json();
  return parse? response.json() : (undefined as T)
}
 

export const customGetFetch = async<T> (endpoint: string): Promise<T> => {
  const data = await fetchWithAuth<T>(endpoint, {method: 'GET'});
  return data;


}






export const fetchFoods = async ({ query } : { query : string}) => {
  //Have to add brand here aswell
    const endpoint = query ? `caloriebalance/api/foodsearch/?name=${encodeURIComponent(query)}`
    :`caloriebalance/api/foodlist/`;
    const data = await customGetFetch<Food>(endpoint);

    return data;

}

export const fetchFoodDetails = async (foodId: string) : Promise<Food> => {
    const endpoint = `caloriebalance/api/fooddetail/${foodId}`;
    const data = await customGetFetch<Food>(endpoint);

    return data;

  
}


export const fetchLogs = async() => {
  const endpoint = `caloriebalance/api/logs/`;
  const data = await customGetFetch<LoggedFood>(endpoint);

  return data;

}


export const fetchLogDetails = async (logId: string) : Promise<LoggedFood> => {
  const endpoint = `caloriebalance/api/logs/${logId}/`;
  const data = await customGetFetch<LoggedFood>(endpoint);
  
  return data;

}
export const deleteLogDetails = async (logId: string) => {
  const endpoint = `caloriebalance/api/logs/${logId}/`;
  const response = await fetchWithAuth(endpoint,{method: 'DELETE'},false);
  

}

export const fetchProfile = async () => {
  const endpoint = `account/api/profile/`;
  const data = await customGetFetch<ProfileInfo>(endpoint);
  
  return data;
    
}


/*export const changeLog = async (logId:string, newQuantity: string) => {
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/logs/${logId}/`;
    const token = await SecureStore.getItemAsync('accessToken');
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({quantity: newQuantity}),
    });
    if (!response.ok){
      throw new Error('Failed to fetch profile information');
    }
    return response;
    
  } catch (error) {
    console.log(error);
    throw(error);
  }
}*/