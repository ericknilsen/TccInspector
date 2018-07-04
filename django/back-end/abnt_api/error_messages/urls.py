# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from error_messages import views


urlpatterns = [
    #url(r'^messages/$', views.MessageList.as_view(), name='message-list'),
    url(r'^messages/(?P<f>media/[\s\S]+)/$', views.MessageList.as_view(), name='message-list'),
]
