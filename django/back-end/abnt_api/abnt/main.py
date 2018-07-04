from verify import Verify

fileName = '/media/Tcc_Tatiane.docx'
messages = Verify(fileName).process()

for value in messages:
    print value.content
    print value.detail
