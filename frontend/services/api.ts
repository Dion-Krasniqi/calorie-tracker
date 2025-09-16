import { loggedIn } from '@/app/(tabs)';
import * as SecureStore from 'expo-secure-store';


export const TRACKER_CONFIG = {
    BASE_URL: 'http://192.168.1.9:8000',
   /* headers: { 
        accept: "application/json" ,
        Authorization: `Bearer ${getSecureItem()}`
    },*/
}

export const fetchWithAuth = async <T>(endpoint: string, json_options?: RequestInit): Promise<T> => {

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
        return fetchWithAuth(endpoint, json_options);
      } catch (error) {
        await SecureStore.setItemAsync('accessToken', '');
        await SecureStore.setItemAsync('refreshToken', '') ;
        //logout
        throw (error)
    } 
    } 

  }
  const data: T = await response.json();
  return data
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
                  Authorization: `Bearer ${token}`,
    }
    });

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch foods', response.statusText);
    }

    const data = await response.json();
    return data;

}

export const fetchFoodDetails = async (foodId: string) : Promise<Food> => {
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/fooddetail/${foodId}`;
    const token = await SecureStore.getItemAsync('accessToken');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }); 
    if (!response.ok) {
      throw new Error('Failed to fetch log details');
    }
    const data = await response.json();
    return data;

  } catch (error){
    console.log(error);
    throw(error);
  }
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


export const fetchLogDetails = async (logId: string) : Promise<LoggedFood> => {
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/logs/${logId}/`;
    const token = await SecureStore.getItemAsync('accessToken');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }); 
    if (!response.ok) {
      throw new Error('Failed to fetch log details');
    }
    const data = await response.json();
    return data;

  } catch (error){
    console.log(error);
    throw(error);
  }
}

export const fetchProfile = async () => {
  try{
    const endpoint = `${TRACKER_CONFIG.BASE_URL}/account/api/profile/`;
    const token = await SecureStore.getItemAsync('accessToken');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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