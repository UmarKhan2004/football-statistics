from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)
from.views import TeamViewSet,PlayerMatchStatsViewSet,PlayerViewSet,LeagueViewSet,MatchViewSet,PlayerstatsViewSet,TeamStandingViewSet,RegisterView
router=DefaultRouter()
router.register(r'teams',TeamViewSet,basename='team')
router.register(r'player',PlayerViewSet,basename='player')
router.register(r'league',LeagueViewSet,basename='league')
router.register(r'match',MatchViewSet,basename='match')
router.register(r'playerstats',PlayerstatsViewSet,basename='playerstats')
router.register(r'teamstanding',TeamStandingViewSet,basename='teamstanding')
router.register(
    r"player-matches",
    PlayerMatchStatsViewSet,
    basename="player-matches"
)
urlpatterns=[
    path('',include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/",TokenObtainPairView.as_view(),name="login"),
    path("refresh/",TokenRefreshView.as_view(),name="token_refresh")
]