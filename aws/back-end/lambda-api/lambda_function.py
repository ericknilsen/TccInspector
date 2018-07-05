# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from verify import Verify
import json


def lambda_handler(event, context):

    fileName = event['file']
    messages = Verify(fileName).process()

    errorMessages = []
    for value in messages:
        errorMessages.append(value)

    return errorMessages

