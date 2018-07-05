# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import constants
from error import ErrorMessages
import boto3    
import docx2txt
import io
import re
import json


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Util(object):
    __metaclass__ = Singleton

    def getText(self, fileName):

        with open('files/credentials.json') as f:
            credentials = json.load(f)

        client = boto3.client('s3',
                                aws_access_key_id = credentials["accessKeyId"],
                                aws_secret_access_key = credentials["secretAccessKey"]
                             )  
                            
        obj = client.get_object(Bucket = credentials["bucketName"], Key = credentials["folder"]+"TccTatiane.docx")

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
