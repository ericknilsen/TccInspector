import re
from util import Util
from verify_ref import VerifyRef
import constants


class Verify():

    fileName = ""

    def __init__(self, fileName):
        self.fileName = fileName

    def process(self):
        paragraphs = Util().getText(self.fileName)
        VerifyRef(paragraphs).process()

        return Util().getErrors()
