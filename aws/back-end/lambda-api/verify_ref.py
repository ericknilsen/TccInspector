import re
from util import Util
import constants


class VerifyRef():

    references = []
    paragraphs = ""
    body = []
    referenceFound = []

    def __init__(self, paragraphs):
        self.clean()
        self.paragraphs = paragraphs


    def clean(self):
        self.references = []
        self.body = []
        self.referenceFound = []
        paragraphs = ""



    def verifyFirstNameUpperCase(self,reference):
        return re.match(r''+constants.FIRST_NAME_UPPER_CASE_RE, reference)


    def verifyPubYear(self,reference):
        return re.match(r''+constants.PUB_YEAR_RE, reference)


    def verifyLink(self,reference):
        if re.match(r''+constants.LINK_RE, reference):
            return re.match(r''+constants.LINK_REF_RE, reference)
        else:
            return True


    def verifyUsedReference(self,reference):
        self.referenceFound = []
        group = re.match(r''+constants.USED_REF_RE, reference)
        if group:
            firstToken = group.group(0)
            for para in self.body:
               if firstToken.lower() in para.lower():
                   self.referenceFound.append(para)

        if len(self.referenceFound) > 0:
            return True
        else:
            return False


    def authorPatternDirectQuoteInParagraphIsValid(self, author, paragraph):
        firstChar = author[0].upper()
        lastChars = author[1:].lower()
        name = firstChar+lastChars

        return re.match(r''+constants.FIRST_DIRECT_QUOTE_REF_PATTERN_RE+name+constants.LAST_DIRECT_QUOTE_REF_PATTERN_RE, paragraph)


    def authorPatternIndirectQuoteInParagraphIsValid(self,author,paragraph):
        return re.match(r''+constants.FIRST_INDIRECT_QUOTE_REF_PATTERN_RE+author.upper()+constants.LAST_INDIRECT_QUOTE_REF_PATTERN_RE, paragraph)


    def verifyUsedReferencePattern(self, reference):
        author = re.match(r''+constants.USED_REF_RE, reference).group(0)

        for para in self.referenceFound:
            if not self.authorPatternIndirectQuoteInParagraphIsValid(author, para) and not self.authorPatternDirectQuoteInParagraphIsValid(author, para):
                Util().saveError(constants.USED_REF_PATTERN_ERROR,list([reference,para]))


    def verifyReferencePattern(self,reference):
        if not self.verifyFirstNameUpperCase(reference):
            Util().saveError(constants.FIRST_NAME_UPPER_CASE_ERROR,list([reference]))
        else:
            if not self.verifyUsedReference(reference):
                Util().saveError(constants.USED_REF_ERROR,list([reference]))
            else:
                self.verifyUsedReferencePattern(reference)
        if not self.verifyPubYear(reference):
            Util().saveError(constants.PUB_YEAR_ERROR,list([reference]))
        if not self.verifyLink(reference):
            Util().saveError(constants.LINK_ERROR,list([reference]))


    def verifyReferences(self):
        for ref in self.references:
            self.verifyReferencePattern(ref)


    def verifyRefSection(self,line):
        return line in constants.REFERENCES


    def verifyOptionalSections(self,line):
        return constants.ATTACHMENT == line or constants.GLOSSARY == line or constants.APPENDIX == line


    def extractReferences(self):
        getRefs = False
        for para in self.paragraphs:
            if not getRefs:
                self.body.append(para)
            if self.verifyOptionalSections(para.lower().strip()):
                getRefs = False
            if getRefs and para:
                self.references.append(para)
            if self.verifyRefSection(para.lower().strip()):
                getRefs = True


    def process(self):
        self.extractReferences()
        self.verifyReferences()
