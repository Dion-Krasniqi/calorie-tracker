from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import F, Sum
from django.db.models.functions import TruncDate
from datetime import date, timedelta

from .forms import LoggedFoodForm
from .models import LoggedFood, Food
from .serializers import LoggedFoodSerializer, FoodSerializer



# Create your views here.



    
class LogFoodAPI_view(generics.CreateAPIView): # Logging food
    queryset = Food.objects.all()
    serializer_class = LoggedFoodSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        food_instance = serializer.validated_data.get('food')
        quantity = serializer.validated_data.get('quantity')
        print(food_instance)

        calories_consumed = (quantity/100) * food_instance.calories

        serializer.save(user=self.request.user, calories_consumed=calories_consumed)

#class DeleteLogAPI_view(generics.DestroyAPIView):
#    queryset = LoggedFood.objects.all()
#    
#    def get_queryset(self):
#        return self.queryset.filter(user=self.request.user)
    

class LoggedFoodDetailAPI_view(generics.RetrieveUpdateDestroyAPIView): # Single logged food editing
    serializer_class = LoggedFoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LoggedFood.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        food_instance = serializer.instance.food
        quantity = serializer.validated_data.get('quantity', serializer.instance.quantity)

        calories_consumed = (quantity/100) * food_instance.calories
        serializer.save(calories_consumed=calories_consumed)
        
    
    
class LoggedFoodListAPI_view(generics.ListAPIView): # All logged foods
    queryset = LoggedFood.objects.all() #filter(date_consumed = date.today())
    serializer_class = LoggedFoodSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    

class FoodListAPI_view(generics.ListAPIView): # All foods in the database
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    permission_classes = [IsAuthenticated]

class FoodSearchAPI_view(generics.ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = FoodSerializer

    def get(self, request, *args, **kwargs):
        food_name = request.query_params.get('name', None)
        food_brand = request.query_params.get('brand', None)
        if food_name is None and food_brand is None:
            return Response({"error":"You must enter the name or brand of the food"}, status=status.HTTP_400_BAD_REQUEST) 

        return super().get(request, *args, **kwargs)   

    def get_queryset(self):

        queryset = Food.objects.all()
        food_name = self.request.query_params.get('name',None)
        food_brand = self.request.query_params.get('brand',None)
        if food_name:
            queryset = queryset.filter(name__icontains=food_name)
        if food_brand:
            queryset = queryset.filter(brand__icontains=food_brand)   
        return queryset
    
    
class FoodDetailAPI_view(generics.RetrieveAPIView): # Single food detail
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]
    queryset = Food.objects.all()
    
    
    
    
class GetDailyIntakeAPI_view(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):
        requested_date = request.query_params.get('date', None)
        if requested_date:
            try:
                requested_date = date.fromisoformat(requested_date)
            except ValueError:
                return Response({"error":"Date must be of format YYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            requested_date = date.today()
        
        daily_log = LoggedFood.objects.filter(user=request.user, date_consumed=requested_date)

        total_calories = daily_log.aggregate(Sum('calories_consumed'))['calories_consumed__sum'] or 0
        total_macros = {'protein':daily_log.aggregate(Sum('food__protein'))['food__protein__sum'] or 0,
                        'carbohydrates':daily_log.aggregate(Sum('food__carbohydrates'))['food__carbohydrates__sum'] or 0,
                        'fats':daily_log.aggregate(Sum('food__fats'))['food__fats__sum'] or 0,}
         
        response_data = {
            'date':requested_date.isoformat,
            'total_calories':round(total_calories, 2),
            'protein': round(total_macros['protein'], 2),
            'carbohydrates': round(total_macros['carbohydrates'], 2),
            'fats': round(total_macros['fats'], 2),
        }
        expenditure = request.user.expenditure   
        if expenditure is not None:
            if expenditure > 0:
                remaining_calories = expenditure - total_calories
                response_data['remaining_calories']=round(remaining_calories,2)
                response_data['expenditure'] = expenditure

        return Response(response_data, status=status.HTTP_200_OK)
                
        
        
class GetPeriodIntakeAPI_view(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        requested_start_date = request.query_params.get('start_date', None)
        requested_end_date = request.query_params.get('end_date', None)
        
        if requested_start_date:
            try:
                requested_start_date = date.fromisoformat(requested_start_date)
            except ValueError:
                return Response({"error":"Date must be of format YYYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"errror":"You must enter a starting date"}, status=status.HTTP_400_BAD_REQUEST)

        if requested_end_date:
            try:
                requested_end_date = date.fromisoformat(requested_end_date)
            except ValueError:
                return Response({"error":"Date must be of format YYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            requested_end_date = date.today()
        
        if requested_end_date< requested_start_date:
            return Response({"error":"Start date cannot be after end date"}, status=status.HTTP_400_BAD_REQUEST)


        period_log = LoggedFood.objects.filter(user=request.user, date_consumed__range=[requested_start_date, requested_end_date])

        date_totals = {}
       # macro_totals = {}
        current_date = requested_start_date
        while current_date <= requested_end_date:
            date_totals[current_date] = {'calories':0, 'protein':0, 'carbohydrates':0, 'fats':0}
        #    macro_totals[current_date] = []
            current_date += timedelta(days=1)
        for log in period_log:
            date_totals[log.date_consumed]['calories'] += log.calories_consumed or 0
            date_totals[log.date_consumed]['protein'] += log.food.protein or 0
            date_totals[log.date_consumed]['carbohydrates'] += log.food.carbohydrates or 0
            date_totals[log.date_consumed]['fats'] += log.food.fats or 0
       # for log in period_log:
       #     date_totals[log.date_consumed] += log.calories_consumed
       #     macro_totals[log.date_consumed].append(log.protein)
       #     macro_totals[log.date_consumed].append(log.carbohydrates)
       #     macro_totals[log.date_consumed].append(log.fats)

        response_data = []
        for day, totals in date_totals.items():
            response_data.append({'date':day.isoformat(),
                                  'total_calories':round(totals['calories'],2),
                                  'total_protein':round(totals['protein'],2),
                                  'total_carbohydrates':round(totals['carbohydrates'],2),
                                  'total_fats':round(totals['fats'],2)})  

        return Response(sorted(response_data,key =lambda x: x['date']), status=status.HTTP_200_OK)

class GetRunningAverageAPI_view(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requested_date = request.query_params.get('date', None)
        if requested_date:
            try:
                requested_date = date.fromisoformat(requested_date)
            except ValueError:
                return Response({"error":"Date must be of format YYYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            requested_date = date.today()

        start_date = requested_date - timedelta(days=6)

        period_logs = LoggedFood.objects.filter(user=request.user, date_consumed__range=[start_date, requested_date])

        date_totals = {}
        for i in range(7):
            date_totals[start_date + timedelta(days=i)]=0

        for log in period_logs:
            if log.date_consumed in date_totals:
                date_totals[log.date_consumed] += log.calories_consumed

        total_calories = sum(date_totals.values())

        if len(date_totals) > 0:
            average_calories = round(total_calories/len(date_totals), 2)
        else:
            average_calories = 0
        
        response_data = {
            'date': requested_date.isoformat(),
            'average_calories': average_calories,
        }

        return Response(response_data, status=status.HTTP_200_OK)

        