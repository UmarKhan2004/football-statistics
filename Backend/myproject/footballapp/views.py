from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from.models import Team,Player,League,Match,PlayerStats,TeamStanding
from.serializer import PlayerSerializer,TeamSerializer,LeagueSerializer,MatchSerializer,PlayerstatsSerializer,TeamStandingSerializer

# Create your views here.
class PlayerViewSet(viewsets.ModelViewSet):
    queryset=Player.objects.all()
    serializer_class=PlayerSerializer
class TeamViewSet(viewsets.ModelViewSet):
    queryset=Team.objects.all()
    serializer_class=TeamSerializer
class LeagueViewSet(viewsets.ModelViewSet):
    queryset=League.objects.all()
    serializer_class=LeagueSerializer
class MatchViewSet(viewsets.ModelViewSet):
    queryset=Match.objects.all()    
    serializer_class=MatchSerializer
    filter_backends=[DjangoFilterBackend,OrderingFilter]
    filterset_fields=['league','played','home_team','away_team']
    ordering_fields=['date','home_score','away_score']
class PlayerstatsViewSet(viewsets.ModelViewSet):
    queryset=PlayerStats.objects.all()
    serializer_class=PlayerstatsSerializer
    filter_backends=[DjangoFilterBackend,OrderingFilter]
    filterset_fields=['player','matches']
    ordering_fields=['goals','assists','yellow_cards','red_cards']
class TeamStandingViewSet(viewsets.ModelViewSet):
    queryset=TeamStanding.objects.order_by("-points")    
    serializer_class=TeamStandingSerializer