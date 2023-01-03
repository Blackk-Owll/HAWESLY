from django.contrib import admin
from .models import *

# Register your models here.

class CommuneAdmin(admin.ModelAdmin):
    list = ('communeId', 'nom', 'wilaya')

    admin.site.register(Commune)

    

class WilayaAdmin(admin.ModelAdmin):
    list = ('wilayaId', 'nom')

    admin.site.register(Wilaya)

class UserAdmin(admin.ModelAdmin):
    list = ('userId', 'username','email','password','nom','prenom','phone')

    admin.site.register(User)
    
class TypeAdmin(admin.ModelAdmin):
    list = ('typeId', 'type')

    admin.site.register(Type)


class PhotoAdmin(admin.ModelAdmin):
    list = ('photoId', 'url')

    admin.site.register(Photo)


class CategorieAdmin(admin.ModelAdmin):
    liste=('categorieId', 'label')

    admin.site.register(Categorie)


class AnnonceAdmin(admin.ModelAdmin):
    list = ('annonceId', 'user', 'description','prix','surface','wilaya','commune','adresse','categorie','type','date','mapX','mapY','zoom')

    admin.site.register(Annonce)

class PositionAdmin(admin.ModelAdmin):
    liste=('x', 'y','zoom')

    admin.site.register(Position)

class FavoriAdmin(admin.ModelAdmin):
    liste=('favoriId', 'user','annonce')

    admin.site.register(Favori)


class MessgeOffreAdmin(admin.ModelAdmin):
    liste=('messgeOffreId', 'Annonce','emetteur')

    admin.site.register(MessgeOffre)


class AdminAdmin(admin.ModelAdmin):
    liste=('adminId', 'email','mdps')

    admin.site.register(Admin)

