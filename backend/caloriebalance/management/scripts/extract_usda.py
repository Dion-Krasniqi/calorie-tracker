import pandas as pd
from pathlib import Path

# just need to fill these when needed
#usda_paths = //
#usda_file1 = usda_paths / 'food.csv'
#usda_file2 = usda_paths / 'food_nutrient.csv'

save_path = Path(__file__).resolve().parent.parent.parent.parent / 'data' / 'extracted_usda.csv'


NUTRIENT_IDS = {
    1008:'calories',
    1003:'protein',
    1005:'carbohydrates',
    1004:'fats'
}

def extract_food_data(food_file, nutrient_file, output_file):

    foods = pd.read_csv(food_file)
    basic_foods = foods[foods['data_type'].isin(['foundation_food', 'sr_legacy_food'])]
    nutrients = pd.read_csv(nutrient_file)


    nutrients_filtered = nutrients[nutrients['nutrient_id'].isin(NUTRIENT_IDS.keys())]
    nutrients_filtered['nutrient_name'] = nutrients_filtered['nutrient_id'].map(NUTRIENT_IDS)

    nutrients_pivot = nutrients_filtered.pivot_table(
        index = 'fdc_id',
        columns = 'nutrient_name',
        values = 'amount',
        aggfunc = 'first' #aggregrate function?
    ).reset_index()

    merged = pd.merge(basic_foods[['fdc_id', 'description']],
                             nutrients_pivot,
                             on='fdc_id')
    
    merged = merged.rename(columns={
                            "fdc_id":"usda_id",
                            "description":"name"
    })

    merged = merged[['usda_id', 'name', 'calories', 'protein', 'carbohydrates', 'fats']]

    merged.to_csv(output_file, index=False)


extract_food_data(usda_file1, usda_file2, save_path)