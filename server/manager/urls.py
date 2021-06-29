from django.urls import path
from manager.views import recommend, report


urlpatterns = [
    path('manager/recommend', recommend, name='recommend'),
    path('manager/report', report, name='report'),
]
