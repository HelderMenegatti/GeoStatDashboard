from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication


from api.models import State, County
from api.serializers import StateSerializer, CountySerializer
from api.pagination import StandardResultsSetPagination


class StateList(generics.ListAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    authentication_classes = [JWTAuthentication]
    pagination_class = None


class CountyListView(generics.ListAPIView):
    serializer_class = CountySerializer
    pagination_class = StandardResultsSetPagination
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        uf = self.request.query_params.get('uf', None)
        if uf:
            return County.objects.filter(state__uf=uf)
        return County.objects.all()