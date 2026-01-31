from django.urls import path
from .views import home, simple_api, inquiry_api

urlpatterns = [
    path("", home, name="home"),
    path("api/test/", simple_api, name="simple_api"),
    path("api/inquiry/", inquiry_api, name="inquiry_api"),
]
