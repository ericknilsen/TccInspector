from rest_framework import serializers
 
from file_upload.models import File
 
class UploadSerializer(serializers.HyperlinkedModelSerializer):
 
    class Meta():
        model = File
        fields = ('file', 'remark', 'timestamp')
        