import { loggedIn } from '@/app/(tabs)';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const router = useRouter();

export const TRACKER_CONFIG = {
   //BASE_URL: 'https://calorie-tracker-gxq2.onrender.com',
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
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({refresh:refreshToken}),
    })
        const newData = await tokenResponse.json()
        await SecureStore.setItemAsync('accessToken', newData.access);
        await SecureStore.setItemAsync('refreshToken', newData.refresh || refreshToken) ;
        return fetchWithAuth<T>(endpoint, json_options);
      } catch (error) {
        await SecureStore.setItemAsync('accessToken', '');
        await SecureStore.setItemAsync('refreshToken', '') ;
        router.replace('/login');
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
export const logFood = async ({foodId,quantity}:{foodId:number,quantity:number})=>{
  try {
        const endpoint = `${TRACKER_CONFIG.BASE_URL}/caloriebalance/api/add/`;
        const token = await SecureStore.getItemAsync('accessToken');
        const response = await fetch(endpoint,{
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
          body: JSON.stringify({food:foodId, quantity: quantity})
        })
        if (!response.ok){
          throw new Error('Failed to add food');
        }
        const data = response.json();
        return data;
          
      }catch (error) {
        throw (error)
      } 

}





export const fetchFoods = async ({ query } : { query : string}) => {
    const endpoint = query ? `caloriebalance/api/foodsearch/?name=${encodeURIComponent(query)}`
    :`caloriebalance/api/recentfoods/`;
    const data = await customGetFetch<Array<Food>>(endpoint);

    return data;

}

export const fetchFoodDetails = async (foodId: string) : Promise<Food> => {
    const endpoint = `caloriebalance/api/fooddetail/${foodId}`;
    const data = await customGetFetch<Food>(endpoint);

    return data;

  
}


export const fetchLogs = async() => {
  const endpoint = `caloriebalance/api/logs/`;
  //const data = await customGetFetch<LoggedFood>(endpoint);
  const data = await customGetFetch<LoggedFood[]>(endpoint);

  return data;

}

export const fetchLogsCurrent = async() => {
  const endpoint = `caloriebalance/api/logs/today/`;
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

export const updateExpenditure = async (expenditure:string) => {
  const endpoint = `account/api/profile/update/`;
  const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'},  body: JSON.stringify({expenditure:expenditure})};
  const data = await fetchWithAuth(endpoint,options);
  
  return data;
}


export const fetchIntakeCurrent = async () => {
  const endpoint = `caloriebalance/api/stats/daily/`;
  const options = {method: 'GET'}

  const data = await fetchWithAuth<IntakeCurrent>(endpoint, options);
  console.log(data);

  return data;
}




export const fetchRunningAverage = async () => {
  const requestedDate : Date = new Date();
  const month = `0${requestedDate.getMonth()+1}`.slice(-2)
  const dateString = `${requestedDate.getFullYear()}-${month}-${requestedDate.getDate()}`;
  const endpoint = `caloriebalance/api/stats/average/?date=${dateString}`;
  const options = {method: 'GET'}

  const data = await fetchWithAuth<RunningAverageStat>(endpoint, options);

  return data;
}