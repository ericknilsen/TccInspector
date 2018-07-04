# -*- coding: utf-8 -*-
from __future__ import unicode_literals

REFERENCES = ['referências bibliográficas', 'referências']
ATTACHMENT = "anexo"
GLOSSARY = "glossário"
APPENDIX = "apêndice"

FIRST_NAME_UPPER_CASE_ERROR = 0
PUB_YEAR_ERROR = 1
LINK_ERROR = 2
USED_REF_ERROR = 3
USED_REF_PATTERN_ERROR = 4
REQUIRED_ERROR = 5
ORDERED_ERROR = 6

FIRST_NAME_UPPER_CASE_RE = '^[A-ZÀ-Ú]+(\.|:|,|-| )[\s\S]*'
PUB_YEAR_RE = '[\s\S]*[0-9]{4}[\s\S]*'
LINK_RE = '[\s\S]*https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)[\s\S]*'
LINK_REF_RE = '[\s\S]*\. Disponível em: <https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)>\. Acesso em: [\s\S]*'
USED_REF_RE = '^[A-ZÀ-Ú- 0-9]+'
FIRST_INDIRECT_QUOTE_REF_PATTERN_RE = '[\s\S]*\('
LAST_INDIRECT_QUOTE_REF_PATTERN_RE = ', [\s\S]*[0-9]{4}[\s\S]*\)[\s\S]*'
FIRST_DIRECT_QUOTE_REF_PATTERN_RE = '[\s\S]*'
LAST_DIRECT_QUOTE_REF_PATTERN_RE = ' \([0-9]{4}[\s\S]*\)[\s\S]*'


FILE_PATH = ''
