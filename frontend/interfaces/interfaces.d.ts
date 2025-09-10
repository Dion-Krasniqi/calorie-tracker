interface Food {
    id: number;
    name: string;
    brand: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;

};
interface LoggedFood {
    id: number;
    food: Food;
    quantity: number;
    date_consumed: string;
    calories_consumed: number;
}