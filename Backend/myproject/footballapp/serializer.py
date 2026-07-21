from rest_framework import serializers
from .models import Team,League,Player,Match,PlayerStats,TeamStanding
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Player
        fields="__all__"
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields=['id','name','short_name','logo','founded_year']        
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
    class Meta:
        model=PlayerStats
        fields=['goals','assists','red_card','yellow_card',]       
class TeamStandingSerializer(serializers.ModelSerializer):
    team=serializers.CharField(source="team.name",read_only=True)
    league=serializers.CharField(source="league.name",read_only=True)
    class Meta:
        model=TeamStanding
        fields=['win','draws','loss','played','goals_for','goals_conceded','team','league','points']