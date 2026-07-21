from django.urls import path,include
from rest_framework.routers import DefaultRouter
from.views import TeamViewSet,PlayerViewSet,LeagueViewSet,MatchViewSet,PlayerstatsViewSet,TeamStandingViewSet
router=DefaultRouter()
router.register(r'teams',TeamViewSet,basename='team')
router.register(r'player',PlayerViewSet,basename='player')
router.register(r'league',LeagueViewSet,basename='league')
router.register(r'match',MatchViewSet,basename='match')
router.register(r'playerstats',PlayerstatsViewSet,basename='playerstats')
router.register(r'teamstanding',TeamStandingViewSet,basename='teamstanding')
urlpatterns=[
    path('',include(router.urls)),
]