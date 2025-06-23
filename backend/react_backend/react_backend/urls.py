"""
URL configuration for react_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path
from .views import (
    register_user_view,
    login_user_view,
    logout_user_view,
    house_items_view,
    listing_detail_view,
    create_booking_view,
    get_bookings_by_listing,  # ✅ already imported
)

urlpatterns = [
    path('api/register/', register_user_view),
    path('api/login/', login_user_view),
    path('api/logout/', logout_user_view),
    path('api/houses/', house_items_view),
    path('api/listing/<str:id>/', listing_detail_view),
    path('api/bookings/', create_booking_view),  # POST
    path('api/bookings/listing/<str:listing_id>/', get_bookings_by_listing),  # ✅ new GET route
]

