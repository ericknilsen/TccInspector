# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import docx
import constants
from error import ErrorMessages


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Util(object):
    __metaclass__ = Singleton

    def getText(self, fileName):
        doc = docx.Document(constants.FILE_PATH+fileName)
        return doc.paragraphs


    def saveError(self,errorCode,content):
        error = ErrorMessages()
        error.errorCode = errorCode
        error.content = list(content)
        error.save()

    def showErrors(self):
        ErrorMessages().show()

    def getErrors(self):
        return ErrorMessages().get()
