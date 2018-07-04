# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import constants
from message import Message

#class Error:

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class ErrorMessages(object):
    __metaclass__ = Singleton

    errorMessages = []
    errorCode = ""
    content = []


    def save(self):
        if self.errorCode == constants.FIRST_NAME_UPPER_CASE_ERROR:
            message = {}
            message["content"] = "Referências devem começar com o primeiro nome em letras maiúsculas em: '"+self.content[0]+"'"
            message["detail"] = "Exemplo: GOMES, L. G. F. F. Novela e sociedade no Brasil. Niterói: EdUFF, 1998."

            self.errorMessages.append(message)
        elif self.errorCode == constants.PUB_YEAR_ERROR:
            message = {}
            message["content"] = "Referências devem conter o ano de publicação no formato AAAA (e.g. 2004) em: '"+self.content[0]+"'"
            message["detail"] = "Exemplo: GURGEL, C. Reforma do Estado e segurança pública. Política e Administração, Rio de Janeiro, v. 3, n. 2, p. 15-21, set. 1997."

            self.errorMessages.append(message)
        elif self.errorCode == constants.LINK_ERROR:
            message = {}
            message["content"] = "Referências que contêm endereço de website devem seguir o padrão 'Disponível em: <endereço de website>. Acesso em: <data de acesso>' em: '"+self.content[0]+"'"
            message["detail"] = "(Exemplo: ARRANJO tributário. Diário do Nordeste Online, Fortaleza, 27 nov. 1998. Disponível em: <http://www.diariodonordeste.com.br>. Acesso em: 28 nov. 1998."


            self.errorMessages.append(message)
        elif self.errorCode == constants.USED_REF_ERROR:
            message = {}
            message["content"] = "A Referência '"+self.content[0]+"' não foi citada no corpo de texto."
            message["detail"] = "Todas as referências declaradas devem ser citadas no corpo do texto."

            self.errorMessages.append(message)
        elif self.errorCode == constants.USED_REF_PATTERN_ERROR:
            message = {}
            message["content"] = "A Referência '"+self.content[0]+"' não foi citada corretamente no parágrafo '"+self.content[1]+"'"
            message["detail"] = "Referências devem ser citadas de forma direta ou indireta. Exemplo de citação direta: \"A frase \'Ser ou não ser, eis a questão\', (SHAKESPEARE, 1599, ato III Cena I), era a expressão preferida\". Exemplo de citação Indireta: \"Analisando a rotação do osso sobre a base, pode-se, segundo Kapan (2001), descobrir até que ponto haverá o desenvolvimento do paciente.\""

            self.errorMessages.append(message)
        elif self.errorCode == constants.REQUIRED_ERROR:
            message = {}
            message["content"] = "O elemento '"+self.content[0]+"' é obrigatório."
            message["detail"] = "Os seguintes elementos são obrigatórios: Resumo, Abstract, Introdução, Bibliografia"

            self.errorMessages.append(message)
        elif self.errorCode == constants.ORDERED_ERROR:
            message = {}
            message["content"] = "O elemento '"+self.content[0]+"' está fora da ordem."
            message["detail"] = "Os elementos devem aparecer na seguinte ordem: Resumo, Abstract, Introdução, Bibliografia"

            self.errorMessages.append(message)


    def show(self):
        for error in self.errorMessages:
            print error


    def get(self):
        messages = []
        messages = list(self.errorMessages)

        self.clean()

        return messages

    def clean(self):
        self.errorMessages = []
        self.errorCode = ""
        self.content = []
