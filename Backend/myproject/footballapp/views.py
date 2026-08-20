from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from.models import Team,Player,League,Match,PlayerStats,TeamStanding
from.serializer import PlayerSerializer,TeamSerializer,RegisterSerializer,LeagueSerializer,PlayerMatchStatsSerializer,MatchSerializer,PlayerstatsSerializer,TeamStandingSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=RegisterSerializer
class PlayerViewSet(viewsets.ModelViewSet):
    queryset=Player.objects.all()
    serializer_class=PlayerSerializer
    permission_classes = [IsAuthenticated]
class TeamViewSet(viewsets.ModelViewSet):
    queryset=Team.objects.all()
    serializer_class=TeamSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
           team = serializer.save()
           TeamStanding.objects.create(
           team=team,
           league=team.league
    )
class LeagueViewSet(viewsets.ModelViewSet):
    queryset=League.objects.all()
    serializer_class=LeagueSerializer
    permission_classes = [IsAuthenticated]
class MatchViewSet(viewsets.ModelViewSet):
    queryset=Match.objects.all()    
    serializer_class=MatchSerializer
    permission_classes = [IsAuthenticated]
    filter_backends=[DjangoFilterBackend,OrderingFilter]
    filterset_fields=['league','played','home_team','away_team']
    ordering_fields=['date','home_score','away_score']
class PlayerstatsViewSet(viewsets.ModelViewSet):
    queryset=PlayerStats.objects.all()
    serializer_class=PlayerstatsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends=[DjangoFilterBackend,OrderingFilter]
    filterset_fields=['player','matches']
    ordering_fields=['goals','assists','yellow_card','red_card']
class TeamStandingViewSet(viewsets.ModelViewSet):
    queryset=TeamStanding.objects.order_by("-points")    
    serializer_class=TeamStandingSerializer
    permission_classes = [IsAuthenticated]
class PlayerMatchStatsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PlayerMatchStatsSerializer

    def get_queryset(self):
        player_id = self.request.query_params.get("player")

        if player_id:
            return PlayerStats.objects.filter(
                player_id=player_id
            ).select_related(
                "match",
                "match__home_team",
                "match__away_team"
            )

        return PlayerStats.objects.none()    