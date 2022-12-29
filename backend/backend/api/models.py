from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Client(models.Model, Importable):
    phone = PhoneNumberField(null=False, blank=False, unique=True)
# models 

class User(models.Model):
    userId  = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    nom=models.CharField(max_length=200)
    prenom=models.CharField(max_length=200)
    phone=models.DecimalField()

    def __str__(self) -> str:
        return self.userId


class Annonce(models.Model):
    annonceId = models.AutoField(primary_key=True)
