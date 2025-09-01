from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import F
from datetime import date
from .forms import LoggedFoodForm
from .models import LoggedFood, Food

# Create your views here.

@login_required
def log_food_view(request):
    if request.method == 'POST':
        form = LoggedFoodForm(request.POST)
        if form.is_valid():
            logged_food = form.save(commit=False)
            logged_food.user = request.user
            logged_food.save()
            return redirect('view_logs')
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


