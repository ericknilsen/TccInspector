# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import constants
from error import ErrorMessages
import boto3    
import docx2txt
import io
import re


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Util(object):
    __metaclass__ = Singleton

    def getText(self, fileName):
        client = boto3.client('s3',
                                aws_access_key_id="YOUR-ACCESS-KEY-ID",
                                aws_secret_access_key="YOUR-SECRET-ACCESS-KEY")
        obj = client.get_object(Bucket='abnt-verify', Key='jsa-s3/TccTatiane.docx')

        body = obj['Body'].read()
        buffer = io.BytesIO()
        buffer.write(body)
        text = docx2txt.process(buffer)
     
        paragraphs = re.split('\n',text)

        
        return paragraphs
       

    def saveError(self,errorCode,content):
        error = ErrorMessages()
        error.errorCode = errorCode
        error.content = list(content)
        error.save()

    def showErrors(self):
        ErrorMessages().show()

    def getErrors(self):
        return ErrorMessages().get()
