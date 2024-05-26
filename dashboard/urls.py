from django.urls import path, include

from dashboard import views

urlpatterns = [
    path('', views.Dashboard.as_view(), name='dashboard'),
]