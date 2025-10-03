import { fetchLogs, fetchLogsCurrent } from '@/services/api';
import useFetch from '@/services/useFetch';
import { create } from 'zustand';





interface LogStore {
    foodlogs: LoggedFood[];
    loadFoodLogs: ()=>Promise<void>;
}

export const useLogStore = create<LogStore>((set)=>({
    foodlogs:[],
    loadFoodLogs: async()=>{
        const result = await fetchLogs();
        set({foodlogs:result})
    }
}))