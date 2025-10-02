import csv
from django.core.management.base import BaseCommand
from caloriebalance.models import Food
from datetime import datetime

class Command(BaseCommand):
    help = "Import food data from extracted_usda.csv into Food Model"

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help="Path of extracted_usda.csv")

    def handle(self, *args, **options):
        file_path = options['csv_file']
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            foods = []
            for row in reader:
                foods.append(Food(usda_id=row['usda_id'],
                                  name=row['name'],
                                  calories=row['calories'] or 0,
                                  protein=row['protein'] or 0,
                                  carbohydrates=row['carbohydrates'] or 0,
                                  fats=row['fats'] or 0,
                                  time_tracked = 0,
                                  last_tracked = None))
                
            Food.objects.bulk_create(foods, ignore_conflicts=True)

        self.stdout.write(self.style.SUCCESS("USDA DATA IMPORTED"))
