import * as SecureStore from 'expo-secure-store';


 


export const TRACKER_CONFIG = {
    BASE_URL: 'http://192.168.1.9:8000',
   /* headers: { 
        accept: "application/json" ,
        Authorization: `Bearer ${getSecureItem()}`
    },*/
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


export const fetchLogDetails = async (logId: string) : Promise<LogDetails> => {
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


export const changeLog = async () => {
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