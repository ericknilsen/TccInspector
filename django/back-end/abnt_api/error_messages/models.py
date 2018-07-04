# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=100, unique=True, blank=False, null=False)
    detail = models.CharField(max_length=100, unique=True, blank=False, null=False)

    class Meta:
        ordering = ('created',)
