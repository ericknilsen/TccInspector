# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from verify import Verify
import json


#def lambda_handler(event, context):
def lambda_handler():

    fileName = 'TccTatiane.docx'
    messages = Verify(fileName).process()

    errorMessages = []
    for value in messages:
        print value["content"]
        errorMessages.append(value)

    return errorMessages

lambda_handler()