import { deleteLogDetails, fetchLogs, fetchLogsCurrent, logFood } from '@/services/api';
import useFetch from '@/services/useFetch';
import { create } from 'zustand';





interface LogStore {
    foodlogs: LoggedFood[];
    loadFoodLogs: ()=>Promise<void>;
    logFood: (foodId:number,quantity:number)=>Promise<void>;
    deleteLog: (logId:number)=>Promise<void>;
}

export const useLogStore = create<LogStore>((set)=>({
    foodlogs:[],
    loadFoodLogs: async()=>{
        const result = await fetchLogs();
        set({foodlogs:result})
    },
    logFood: async(foodId:number,quantity:number)=>{
        const info = await logFood({foodId, quantity});
        const result = await fetchLogs();
        set({foodlogs:result})
    },
    deleteLog: async(logId:number)=>{
        await deleteLogDetails(logId);
        const result = await fetchLogs();
        set({foodlogs:result})
    },
}))