from rest_framework import serializers
from .models import Team,League,Player,Match,PlayerStats,TeamStanding,Transfer
from django.contrib.auth.models import User
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
        extra_kwargs={
            "password":{"write_only":True}
        }
    def create(self,validated_data):
         user=User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
            )
         return user
class PlayerSerializer(serializers.ModelSerializer):
    team = serializers.CharField(source="team.name", read_only=True)
    class Meta:
        model=Player
        fields="__all__"
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields=['id','name','short_name','logo','founded_year','league']        
class LeagueSerializer(serializers.ModelSerializer):
    teams=TeamSerializer(many=True,read_only=True)
    
    class Meta:
        model=League
        fields=['id','name','season','teams','created_at','is_active','country']        
class MatchSerializer(serializers.ModelSerializer):
    home_team=serializers.CharField(source="home_team.name",read_only=True)
    away_team=serializers.CharField(source="away_team.name",read_only=True)
    league=serializers.CharField(source="league.name",read_only=True)
    class Meta:
        model=Match
        fields=['home_team','away_team','home_score','away_score','league','date','time','completed']
class PlayerstatsSerializer(serializers.ModelSerializer):
    team=serializers.CharField(source="player.team.name" ,read_only=True)
    class Meta:
        model=PlayerStats
        fields="__all__"   
class TeamStandingSerializer(serializers.ModelSerializer):
    team=serializers.CharField(source="team.name",read_only=True)
    league=serializers.CharField(source="league.name",read_only=True)
    class Meta:
        model=TeamStanding
        fields=['win','draws','loss','played','goals_for','goals_conceded','team','league','points']
        class TransferSerializer(serializers.ModelSerializer):
         player = serializers.CharField(source="player.name", read_only=True)
         team_from = serializers.CharField(source="team_from.name", read_only=True)
         team_to = serializers.CharField(source="team_to.name", read_only=True)
         league = serializers.CharField(source="league.name", read_only=True)

        class Meta:
            model = Transfer
            fields = [
                "id",
                "player",
                "team_from",
                "team_to",
                "transfer_fee",
                 "transfer_type",
                "transfer_status",
                "transfer_date",
                "league",
                "created_at",
        ]
class PlayerMatchStatsSerializer(serializers.ModelSerializer):
    match_id = serializers.IntegerField(source="match.id", read_only=True)
    home_team = serializers.CharField(
        source="match.home_team.name",
        read_only=True
    )
    away_team = serializers.CharField(
        source="match.away_team.name",
        read_only=True
    )
    home_score = serializers.IntegerField(
        source="match.home_score",
        read_only=True
    )
    away_score = serializers.IntegerField(
        source="match.away_score",
        read_only=True
    )
    date = serializers.DateField(
        source="match.date",
        read_only=True
    )
    time = serializers.TimeField(
        source="match.time",
        read_only=True
    )
    completed = serializers.BooleanField(
        source="match.completed",
        read_only=True
    )

    class Meta:
        model = PlayerStats
        fields = [
            "match_id",
            "home_team",
            "away_team",
            "home_score",
            "away_score",
            "date",
            "time",
            "completed",
            "goals",
            "assists",
            "yellow_card",
            "red_card",
            "minutes_played",
            "rating",
        ]            