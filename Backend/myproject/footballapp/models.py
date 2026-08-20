from django.db import models

# Create your models here.
class Trophy(models.Model):
    name=models.CharField(max_length=1000)
    def __str__(self):
        return self.name
class League(models.Model):
    name=models.CharField(max_length=1000)
    season=models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    country=models.CharField(max_length=1000)
    #Prevents creating the same league and season twice
    class Meta:    
        unique_together=('name','season')
    def __str__(self):
        return f"{self.name} ({self.season})"    
class Team(models.Model):
    name=models.CharField(max_length=1000)
    short_name=models.CharField(max_length=10,help_text='e.g Ars,MCI')
    logo=models.ImageField(upload_to="team_logos/",blank=True,null=True)
    founded_year=models.IntegerField(blank=True,null=True)
    league = models.ForeignKey(
    League,
    on_delete=models.CASCADE,
    related_name="teams",   
    null=True,
    blank=True
)
    trophy=models.ManyToManyField(Trophy,related_name="team",blank=True)
    def __str__(self):
        return self.name
class Player(models.Model):
    POSITION_CHOICES=[
        ("GK","Goalkeeper"),
        ("DF","Defender"),
        ("MD","Midfielder"),
        ("FW","Forward")
    ]
    name=models.CharField(max_length=100)
    picture=models.ImageField(upload_to="player_picture/",blank=True,null=True)
    goals=models.IntegerField(default=0)    
    assists=models.IntegerField(default=0)    
    matches=models.IntegerField(default=0)    
    trophy=models.ManyToManyField(Trophy,related_name='player',blank=True)
    team=models.ForeignKey(Team,on_delete=models.CASCADE,related_name="players")
    pace=models.SmallIntegerField(default=50)
    shooting=models.SmallIntegerField(default=50)
    passing=models.SmallIntegerField(default=50)
    dribbling=models.SmallIntegerField(default=50)
    physicality=models.SmallIntegerField(default=50)
    defending=models.SmallIntegerField(default=50)
    position=models.CharField(
        max_length=2,
        choices=POSITION_CHOICES
        )
    preferred_foot=models.CharField(
        max_length=100,
        choices=[
            ("Left","Left"),
            ("Right","Right")
            ],
        default="Right"
    )
    age=models.SmallIntegerField(default=18)
    shirt_number=models.SmallIntegerField(default=1)
    height=models.SmallIntegerField(default=180)
    weight=models.SmallIntegerField(default=75)
    nationality=models.CharField(max_length=100)
    market_value=models.PositiveIntegerField(default=0)
    joined=models.DateField()
    contract_until=models.DateField()
    def __str__(self):
        return self.name       
class Match(models.Model):
    home_team=models.ForeignKey(Team,on_delete=models.CASCADE,related_name="home_matches")
    away_team=models.ForeignKey(Team,on_delete=models.CASCADE,related_name="away_matches")
    league=models.ForeignKey(League,on_delete=models.CASCADE)
    date=models.DateField()
    time=models.TimeField(blank=True,null=True)
    home_score=models.PositiveIntegerField(default=0)
    away_score=models.PositiveIntegerField(default=0)
    played=models.BooleanField(default=False)
    completed=models.BooleanField(default=False)
    def __str__(self):
        return f"{self.home_team}vs{self.away_team}"
class PlayerStats(models.Model):
    player=models.ForeignKey(Player,on_delete=models.CASCADE)
    matches=models.ForeignKey(Match,on_delete=models.CASCADE)
    goals=models.PositiveIntegerField(default=0)
    assists=models.PositiveIntegerField(default=0)
    yellow_card=models.PositiveIntegerField(default=0)
    red_card=models.PositiveIntegerField(default=0)
    minutes_played=models.PositiveIntegerField(default=0)
class TeamStanding(models.Model):
    team=models.ForeignKey(Team,on_delete=models.CASCADE)
    league=models.ForeignKey(League,on_delete=models.CASCADE)
    played=models.PositiveIntegerField(default=0)
    goals_for=models.PositiveIntegerField(default=0)
    goals_conceded=models.PositiveIntegerField(default=0)
    points=models.PositiveIntegerField(default=0)
    win=models.PositiveIntegerField(default=0)
    draws=models.PositiveIntegerField(default=0)
    loss=models.PositiveIntegerField(default=0)
    class Meta:
        unique_together=("team","league")        
class Transfer(models.Model):
    player=models.ForeignKey(Player,on_delete=models.CASCADE)
    team_from=models.ForeignKey(Team,on_delete=models.SET_NULL,null=True,related_name="transfer_out")
    team_to=models.ForeignKey(Team,on_delete=models.SET_NULL,null=True,related_name="transfer_in")
    transfer_fee=models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    transfer_type=models.CharField(max_length=120,choices=[
        ("Free","Free"),
        ("Loan","Loan"),
        ("Permanent","Permanent")
    ])
    transfer_status=models.CharField(max_length=120,choices=[
        ("Rumour","Rumour"),
        ("FreeAgent","FreeAgent"),
        ("Loan","Loan"),
        ("OfficIal","OfficIal")   
    ])
    created_at=models.DateTimeField(auto_now_add=True)
    transfer_date=models.DateField(null=True,blank=True)
    league=models.ForeignKey(League,on_delete=models.CASCADE,null=True,blank=True )
    def __str__(self):  
        team_from=self.team_from.name if self.team_from else "Unknown"
        team_to=self.team_to.name if self.team_to else "Unknown"
        return f"{self.player.name}:{team_from} →{team_to}"