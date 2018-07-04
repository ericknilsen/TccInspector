from rest_framework import serializers

from error_messages.models import Message

class MessageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Message
        #fields = ('url', 'id', 'created', 'name')
        fields = ('content','detail')
        extra_kwargs = {
            'url': {
                'view_name': 'error_messages:message-detail',
            }
        }
