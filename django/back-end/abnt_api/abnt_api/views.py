from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
 
@api_view(['GET'])
def api_root(request, format=None):
    return Response({      
       'error_messages': reverse('error_messages:message-list', request=request, format=format),
       'file_upload': reverse('file_upload:upload-list', request=request, format=format),
    })