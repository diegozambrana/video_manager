"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from server.views import IndexView
from django.conf import settings


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('video.urls'), name="video"),
    path('api/', include('manager.urls'), name="manager"),

    # Frontend pages
    path('', IndexView.as_view()),
    path('shows/', IndexView.as_view()),
    path('show/<slug:show>/', IndexView.as_view()),
    path('show/<slug:show>/<slug:episode>/', IndexView.as_view()),
    path('movies/', IndexView.as_view()),
    path('movie/<slug:movie>/', IndexView.as_view()),
    path('shorts/', IndexView.as_view()),
    path('faq/', IndexView.as_view()),
    path('acerca/', IndexView.as_view()),
    path('search/', IndexView.as_view()),
]

if settings.DEBUG:
    urlpatterns += [path('admin/', admin.site.urls)]
