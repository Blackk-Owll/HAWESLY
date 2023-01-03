from django.db import models
from django.utils.translation import gettext_lazy as _


# models

# les classe secondaires
class Wilaya(models.Model):
    wilayaId = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.nom


class Commune(models.Model):
    communeId = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.nom


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    nom = models.CharField(max_length=200)
    prenom = models.CharField(max_length=200)
    phone = models.IntegerField()

    def __str__(self) -> str:
        return self.username


class Type(models.Model):
    typeId = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.type


class Photo(models.Model):
    photoId = models.AutoField(primary_key=True)
    url = models.CharField(max_length=500)

    def __str__(self) -> str:
        return self.url


class Categorie(models.Model):
    categorieId = models.AutoField(primary_key=True)
    label = models.CharField(max_length=200)


class Annonce(models.Model):

    annonceId = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    prix = models.IntegerField()
    surface = models.FloatField(default=0)
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)
    adresse = models.CharField(max_length=500)
    categorie = models.ForeignKey(Categorie, on_delete=models.DO_NOTHING)
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    mapX = models.IntegerField()
    mapY = models.IntegerField()
    zoom = models.FloatField()

    def __str__(self) -> str:
        return (str(self.annonceId))


class Position(models.Model):

    # peut etre util pour la recuperation de posiion seulement

    x = models.IntegerField()
    y = models.IntegerField()
    zoom = models.FloatField()


class Favori(models.Model):
    favoriId = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    annonce = models.ForeignKey(Annonce, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return (str(self.favoriId))


class MessgeOffre(models.Model):
    messgeOffreId = models.AutoField(primary_key=True)
    Annonce = models.ForeignKey(Annonce, on_delete=models.CASCADE)
    emetteur = models.ForeignKey(User, on_delete=models.DO_NOTHING)


class Admin(models.Model):
    adminId = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100)
    mdps = models.CharField(max_length=200)
