from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CommuneViewSet(viewsets.ModelViewSet):
    serializer_class = CommuneSerializer
    queryset = Commune.objects.all()

class WilayaViewSet(viewsets.ModelViewSet):
    serializer_class = WilayaSerializer
    queryset = Wilaya.objects.all()

class AnnonceViewSet(viewsets.ModelViewSet):
    serializer_class = AnnonceSerializer
    queryset = Annonce.objects.all()

class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer
    queryset = Type.objects.all()

class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    queryset = Photo.objects.all()

class CategorieViewSet(viewsets.ModelViewSet):
    serializer_class = CategorieSerializer
    queryset = Categorie.objects.all()

class PositionViewSet(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class FavoriViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriSerializer
    queryset = Favori.objects.all()

class MessgeOffreViewSet(viewsets.ModelViewSet):
    serializer_class = MessgeOffreSerializer
    queryset = MessgeOffre.objects.all()

class AdminViewSet(viewsets.ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()











