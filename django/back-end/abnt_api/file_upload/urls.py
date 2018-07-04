from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from file_upload import views
 
urlpatterns = [
    url(r'^upload/$', views.FileView.as_view(), name='upload-list'),    
]