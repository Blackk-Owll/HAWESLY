from api.views import *

from api import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'annonces', views.AnnonceViewSet, basename='annonce')
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'communes', views.CommuneViewSet, basename='commune')
router.register(r'wilayas', views.WilayaViewSet, basename='wilaya')
router.register(r'categories', views.CategorieViewSet, basename='categorie')
router.register(r'types', views.TypeViewSet, basename='type')
router.register(r'positions', views.PositionViewSet, basename='position')
router.register(r'favoris', views.FavoriViewSet, basename='favori')
router.register(r'messagesOffres', views.MessgeOffreViewSet, basename='messageOffre')
router.register(r'admins', views.AdminViewSet, basename='admin')
router.register(r'photos', views.PhotoViewSet, basename='photo')

urlpatterns = router.urls