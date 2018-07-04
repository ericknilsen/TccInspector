# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

from error_messages.models import Message
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse

from error_messages.serializers import MessageSerializer
from abnt.message import Message
from abnt.verify import Verify


class MessageList(generics.ListCreateAPIView):

    lookup_url_kwargs = "f"

    def get_queryset(self):
        fileName = '/'+self.kwargs.get(self.lookup_url_kwargs)
        print fileName
        messages = Verify(fileName).process()

        return messages

    serializer_class = MessageSerializer
