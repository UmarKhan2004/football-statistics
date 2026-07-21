from django.contrib import admin
from .models import Team,Player,League,PlayerStats,TeamStanding,Match
# Register your models here.
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display=("name","short_name","league","founded_year")
    search_fields=('name','short_name')
@admin.register(Player)    
class PlayerAdmin(admin.ModelAdmin):
    list_display=("name","goals","assists","matches","team","display_trophies")
    def display_trophies(self,obj):
        return ",".join([t.name for t in obj.trophy.all()])
    display_trophies.short_description='Trophies'    
    search_fields=('team__name','name')
    list_filter=('team',)
@admin.register(League)    
class LeagueAdmin(admin.ModelAdmin):
    list_display=("name","season")
    list_filter=("name","is_active") 
    search_fields=('name',)   
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display=("home_team","away_team","home_score","away_score","date","played")
    list_filter=("home_team","away_team","played","league","date")
@admin.register(PlayerStats)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display=("player","matches","goals","assists","yellow_card","red_card")
    list_filter=("player","matches","goals","assists","yellow_card","red_card")
@admin.register(TeamStanding)
class TeamStandingAdmin(admin.ModelAdmin):
    list_display=("win","loss","draws","goals_for","goals_conceded","team","league")
    list_filter=("win","loss","draws","goals_for","goals_conceded")            