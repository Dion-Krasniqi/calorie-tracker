import { deleteLogDetails, fetchLogs, fetchLogsCurrent, fetchProfile, logFood, updateExpenditure } from '@/services/api';
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


interface ProfileStore {
    username: string;
    expenditure: number;
    loadProfileInfo: ()=>void;
    changeExpenditure: (newExp:number)=>void;
}

export const useProfileStore = create<ProfileStore>((set)=>({
    username:'',
    expenditure:0,
    loadProfileInfo: async()=>{
        const info = await fetchProfile();
        console.log('called');
        set({username:info.username});
        set({expenditure:info.expenditure});
    },
    changeExpenditure: async(newExp)=>{
        set({expenditure:newExp});
        updateExpenditure(newExp);

    },

}))