interface Food {
    id: number;
    name: string;
    brand: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;

};

interface FoodCardProp {
    food_data:Food;
    quantity: number;
}

interface LoggedFood {
    id: number;
    food: Food;
    quantity: number;
    date_consumed: string;
    calories_consumed: number;
}

interface ProfileInfo {
    username: string;
    expenditure: number;
}

interface LoginResponse {
    access: string;
    refresh: string;
}

interface RunningAverageStat {
    date: string;
    average_calories: number;
}

interface IntakeCurrent {
    total_calories: number;
    total_protein: number;
    total_carbohydrates: number;
    total_fats: number;
    expenditure?:number;
}

/*interface LogDetails {
    id: number;
    food: Food;
    quantity: number;
    date_consumed: string;
    calories_consumed: number;
}*/