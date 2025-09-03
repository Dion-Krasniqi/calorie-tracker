from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import F, Sum
from datetime import date

from .forms import LoggedFoodForm
from .models import LoggedFood, Food
from .serializers import LoggedFoodSerializer

# Create your views here.

@login_required
def log_food_view(request):
    if request.method == 'POST':
        form = LoggedFoodForm(request.POST)
        if form.is_valid():
            logged_food = form.save(commit=False)
            logged_food.user = request.user

            logged_food.calories_consumed = (logged_food.quantity/100)*logged_food.food.calories
            logged_food.save()
            return redirect('/')
    else:
        form = LoggedFoodForm(initial={'date_consumed':date.today()})

    foods = Food.objects.all().order_by('name')
    return render(request, 'caloriebalance/log_food.html',{'form':form, 'foods':foods})

@login_required
def delete_logged_food(request, logged_food_id):
    logged_food = get_object_or_404(LoggedFood, id=logged_food_id)
    if logged_food.user==request.user or request.user.is_staff:
        logged_food.delete()
    return redirect('view_logs')



@login_required
def see_logs_view(request):
    all_logs = LoggedFood.objects.filter(user=request.user).select_related('food').order_by(F('date_consumed').desc())

    daily_logs = {}
    for log in all_logs:
        date_key = log.date_consumed
        if date_key not in daily_logs:
            daily_logs[date_key]=[]
        daily_logs[date_key].append(log)
    return render(request, 'caloriebalance/view_logs.html', {'daily_logs':daily_logs})


@login_required
def view_dashboard(request):
    user = request.user
    intake_dict = LoggedFood.objects.filter(user=request.user,date_consumed=date.today()).select_related('food').aggregate(total=Sum('calories_consumed'))
    if intake_dict.get('total') is None:
        intake_today = 0
    else:
        intake_today = intake_dict.get('total')
    template_parameters = {'intake_today':intake_today,}

    if user.expenditure is not None:
        if user.expenditure!=0.00:
            balance_today = user.expenditure - intake_today
            template_parameters['balance_today'] = balance_today
        
    return render(request, 'caloriebalance/dashboard.html',template_parameters)


class LoggedFoodListAPI_view(generics.ListAPIView):
    queryset = LoggedFood.objects.all()
    serializer_class = LoggedFoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-date_consumed')
    
class LogFoodAPI_view(generics.CreateAPIView):
    queryset = LoggedFood.objects.all()
    serializer_class = LoggedFoodSerializer
    permission_class = [IsAuthenticated]

    def perform_create(self, serializer):
        food_instance = serializer.validated_data.get('food')
        quantity = serializer.validated_data.get('quantity')

        calories_consumed = (quantity/100) * food_instance.calories

        serializer.save(user=self.request.user, calories_consumed=calories_consumed)
