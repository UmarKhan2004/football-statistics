import os
import sys
import django
import random
from faker import Faker
from datetime import date, timedelta
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
fake=Faker()
django.setup()

from footballapp.models import League,Team,Player,Trophy,Match,PlayerStats
PlayerStats.objects.all().delete()
Match.objects.all().delete()
Player.objects.all().delete()
Team.objects.all().delete()
League.objects.all().delete()
Trophy.objects.all().delete()
trophies=["Premier League","FA Cup","Champions League","League Cup","Super Cup"]
trophy_objs={n:Trophy.objects.get_or_create(name=n)[0] for n in trophies}

leagues={
"Premier League":["Arsenal","Chelsea","Liverpool","Manchester City"],
"La Liga":["Real Madrid","Barcelona","Atletico Madrid","Sevilla"],
"Serie A":["Inter","AC Milan","Juventus","Napoli"],
"Bundesliga":["Bayern Munich","Borussia Dortmund","Leverkusen","RB Leipzig"],
"Ligue 1":["PSG","Marseille","Monaco","Lyon"],
}
season="2025/26"
team_data = {
    "Arsenal": "ARS",
    "Chelsea": "CHE",
    "Liverpool": "LIV",
    "Manchester City": "MCI",
    "Real Madrid": "RMA",
    "Barcelona": "BAR",
    "Atletico Madrid": "ATM",
    "Sevilla": "SEV",
    "Inter": "INT",
    "AC Milan": "ACM",
    "Juventus": "JUV",
    "Napoli": "NAP",
    "Bayern Munich": "FCB",
    "Borussia Dortmund": "BVB",
    "Leverkusen": "B04",
    "RB Leipzig": "RBL",
    "PSG": "PSG",
    "Marseille": "OM",
    "Monaco": "ASM",
    "Lyon": "OL"
}
countries = {
    "Premier League": "England",
    "La Liga": "Spain",
    "Serie A": "Italy",
    "Bundesliga": "Germany",
    "Ligue 1": "France",
}
for lname,teams in leagues.items():
    league,_=League.objects.get_or_create(name=lname,season=season,country=countries[lname])
    team_objs=[]
    
    for t in teams:
        team,_=Team.objects.get_or_create(
            name=t,
            defaults={"short_name":team_data[t],"league":league}
        )
        team.league=league; team.save()
        team.trophy.add(random.choice(list(trophy_objs.values())))
        team_objs.append(team)
        players = {
    "Arsenal": [
        "Bukayo Saka",
        "Martin Ødegaard",
        "Declan Rice",
        "Kai Havertz",
        "William Saliba",
        "Gabriel Martinelli",
        "Gabriel Magalhães",
        "Ben White",
        "David Raya",
        "Mikel Merino",
        "Leandro Trossard"
    ],

    "Manchester City": [
        "Erling Haaland",
        "Phil Foden",
        "Rodri",
        "Bernardo Silva",
        "Rúben Dias",
        "Josko Gvardiol",
        "Jeremy Doku",
        "Omar Marmoush",
        "Ederson",
        "Nathan Aké",
        "Mateo Kovačić"
    ],
    "Chelsea": [
        "Cole Palmer",
        "Enzo Fernández",
        "Moises Caicedo",
        "Nicolas Jackson",
        "Levi Colwill",
        "Marc Cucurella",
        "Christopher Nkunku",
        "Pedro Neto",
        "Malo Gusto",
        "Reece James",
        "Robert Sánchez"
    ],

    "Liverpool": [
        "Alexander Isak",
        "Florian Wirtz",
        "Virgil van Dijk",
        "Alisson Becker",
        "Trent Alexander-Arnold",
        "Alexis Mac Allister",
        "Dominik Szoboszlai",
        "Cody Gakpo",
        "Luis Díaz",
        "Federico Chiesa",
        "Giorgi Mamardashvili"
    ],

    "Manchester City": [
        "Erling Haaland",
        "Phil Foden",
        "Rodri",
        "Marc Guéhi",
        "Rúben Dias",
        "Joško Gvardiol",
        "Jérémy Doku",
        "Omar Marmoush",
        "Gianluigi Donnarumma",
        "Tijjani Reijnders",
        "Mateo Kovačić"
    ],

    "Real Madrid": [
        "Kylian Mbappé",
        "Jude Bellingham",
        "Vinícius Júnior",
        "Federico Valverde",
        "Ibrahima Konaté",
        "Aurélien Tchouaméni",
        "Eduardo Camavinga",
        "Antonio Rüdiger",
        "Dani Carvajal",
        "Eder Militão",
        "Thibaut Courtois"
    ],

    "Barcelona": [
        "Lamine Yamal",
        "Robert Lewandowski",
        "Raphinha",
        "Pedri",
        "Gavi",
        "Frenkie de Jong",
        "Ronald Araújo",
        "Jules Koundé",
        "Alejandro Balde",
        "Pau Cubarsí",
        "Marc-André ter Stegen"
    ],

    "Atletico Madrid": [
        "Antoine Griezmann",
        "Julián Álvarez",
        "Conor Gallagher",
        "Alexander Sørloth",
        "Rodrigo De Paul",
        "Marcos Llorente",
        "Robin Le Normand",
        "José María Giménez",
        "Samuel Lino",
        "Nahuel Molina",
        "Jan Oblak"
    ],

    "Sevilla": [
        "Isaac Romero",
        "Dodi Lukebakio",
        "Albert Sambi Lokonga",
        "Saúl Ñíguez",
        "Loïc Badé",
        "Adrià Pedrosa",
        "Peque Fernández",
        "Djibril Sow",
        "Kike Salas",
        "Carmona",
        "Orjan Nyland"
    ],

    "Inter": [
        "Lautaro Martínez",
        "Marcus Thuram",
        "Nicolò Barella",
        "Hakan Çalhanoğlu",
        "Alessandro Bastoni",
        "Federico Dimarco",
        "Benjamin Pavard",
        "Denzel Dumfries",
        "Henrikh Mkhitaryan",
        "Francesco Acerbi",
        "Yann Sommer"
    ],

    "AC Milan": [
        "Rafael Leão",
        "Christian Pulisic",
        "Alvaro Morata",
        "Theo Hernández",
        "Mike Maignan",
        "Ruben Loftus-Cheek",
        "Ismaël Bennacer",
        "Fikayo Tomori",
        "Strahinja Pavlović",
        "Youssouf Fofana",
        "Davide Calabria"
    ],

    "Juventus": [
        "Dušan Vlahović",
        "Teun Koopmeiners",
        "Kenan Yıldız",
        "Douglas Luiz",
        "Manuel Locatelli",
        "Bremer",
        "Federico Gatti",
        "Andrea Cambiaso",
        "Khéphren Thuram",
        "Nico González",
        "Michele Di Gregorio"
    ],

    "Napoli": [
        "Khvicha Kvaratskhelia",
        "Romelu Lukaku",
        "Scott McTominay",
        "Alessandro Buongiorno",
        "Stanislav Lobotka",
        "Frank Anguissa",
        "Giovanni Di Lorenzo",
        "Mathías Olivera",
        "Amir Rrahmani",
        "Matteo Politano",
        "Alex Meret"
    ],

    "Bayern Munich": [
        "Harry Kane",
        "Jamal Musiala",
        "Leroy Sané",
        "Michael Olise",
        "Joshua Kimmich",
        "João Palhinha",
        "Alphonso Davies",
        "Dayot Upamecano",
        "Kim Min-jae",
        "Aleksandar Pavlović",
        "Manuel Neuer"
    ],

    "Borussia Dortmund": [
        "Serhou Guirassy",
        "Julian Brandt",
        "Nico Schlotterbeck",
        "Gregor Kobel",
        "Emre Can",
        "Marcel Sabitzer",
        "Pascal Groß",
        "Waldemar Anton",
        "Jamie Gittens",
        "Maximilian Beier",
        "Yan Couto"
    ],

    "Leverkusen": [
        "Victor Boniface",
        "Granit Xhaka",
        "Alejandro Grimaldo",
        "Jeremie Frimpong",
        "Edmond Tapsoba",
        "Jonathan Tah",
        "Piero Hincapié",
        "Robert Andrich",
        "Martin Terrier",
        "Aleix García",
        "Lukáš Hrádecký"
    ],

    "RB Leipzig": [
        "Loïs Openda",
        "Benjamin Šeško",
        "Xavi Simons",
        "Amadou Haidara",
        "Castello Lukeba",
        "Willi Orbán",
        "David Raum",
        "Benjamin Henrichs",
        "Nicolas Seiwald",
        "Christoph Baumgartner",
        "Péter Gulácsi"
    ],

    "PSG": [
        "Ousmane Dembélé",
        "Bradley Barcola",
        "João Neves",
        "Vitinha",
        "Warren Zaïre-Emery",
        "Achraf Hakimi",
        "Marquinhos",
        "Willian Pacho",
        "Nuno Mendes",
        "Gonçalo Ramos",
        "Matvey Safonov"
    ],

    "Marseille": [
        "Mason Greenwood",
        "Elye Wahi",
        "Pierre-Emile Højbjerg",
        "Adrien Rabiot",
        "Amine Harit",
        "Luis Henrique",
        "Leonardo Balerdi",
        "Jonathan Rowe",
        "Michael Murillo",
        "Lilian Brassier",
        "Geronimo Rulli"
    ],

    "Monaco": [
        "Folarin Balogun",
        "Denis Zakaria",
        "Aleksandr Golovin",
        "Maghnes Akliouche",
        "Eliesse Ben Seghir",
        "Thilo Kehrer",
        "Wilfried Singo",
        "Vanderson",
        "Caio Henrique",
        "Lamine Camara",
        "Philipp Köhn"
    ],

    "Lyon": [
        "Alexandre Lacazette",
        "Georges Mikautadze",
        "Malick Fofana",
        "Corentin Tolisso",
        "Maxence Caqueret",
        "Ainsley Maitland-Niles",
        "Duje Ćaleta-Car",
        "Clinton Mata",
        "Abner Vinícius",
        "Saïd Benrahma",
        "Lucas Perri"
    ]

    
}
        positions=["GK","DF","MF","FW"]
        nationalities=["Argentina","Portugal","Brazil","Spain","England","France","Uruguay","Netherlands","Italy"]
        for player_name in players[t]:
            position=random.choice(positions)
            if position == "GK":
                pace=random.randint(30,55)
                shooting=random.randint(5,20)
                passing=random.randint(40,75)
                dribbling=random.randint(20,45)
                physicality=random.randint(60,90)
                defending=random.randint(20,40)
            elif position == "DF":
                pace=random.randint(55,85)
                shooting=random.randint(35,75)
                passing=random.randint(45,85)
                dribbling=random.randint(20,45)
                physicality=random.randint(60,90)
                defending=random.randint(70,95)
            elif position == "MF":
                pace=random.randint(55,95)
                shooting=random.randint(55,80)
                passing=random.randint(70,99)
                dribbling=random.randint(45,90)
                physicality=random.randint(60,90)
                defending=random.randint(30,80)
            else:
                pace=random.randint(70,99)
                shooting=random.randint(65,95)
                passing=random.randint(55,85)
                dribbling=random.randint(60,95)
                physicality=random.randint(60,90)
                defending=random.randint(20,40)        
            p, _=Player.objects.get_or_create(
                name=player_name,
                team=team,
                defaults={
            "position": position,
            "goals": random.randint(0, 30),
            "assists": random.randint(0, 20),
            "matches": random.randint(20, 38),

            "pace": pace,
            "shooting": shooting,
            "passing": passing,
            "dribbling": dribbling,
            "defending": defending,
            "physicality": physicality,

            "preferred_foot": random.choice(["Left", "Right"]),
            "age": random.randint(18, 36),
            "shirt_number": random.randint(1, 99),
            "height": random.randint(165, 200),
            "weight": random.randint(60, 95),
            "nationality": random.choice(nationalities),
            "market_value": random.randint(500_000, 150_000_000),
            "joined": fake.date_between(start_date="-8y", end_date="-1y"),
            "contract_until": fake.date_between(start_date="+1y", end_date="+6y"),
        }
            )
            for trophy in team.trophy.all():
                p.trophy.add(trophy)
    for i in range(len(team_objs)):
        for j in range(i+1,len(team_objs)):
            home,away=team_objs[i],team_objs[j]
            m,_=Match.objects.get_or_create(
                home_team=home,away_team=away,league=league,
                date=date(2025,8,1)+timedelta(days=random.randint(0,250)),
                defaults={"home_score":random.randint(0,4),"away_score":random.randint(0,4),"played":True}
            )
            for pl in list(home.players.all())[:5]+list(away.players.all())[:5]:
                PlayerStats.objects.get_or_create(
                    player=pl,matches=m,
                    defaults={
                        "goals":random.randint(0,2),
                        "assists":random.randint(0,2),
                        "yellow_card":random.randint(0,1),
                        "red_card":1 if random.random()<0.03 else 0,
                        "minutes_played":random.randint(60,90)
                    }
                )
                from footballapp.models import Team, League, TeamStanding

standings = [
    {
        "team": "Manchester City",
        "league": "Premier League",
        "played": 38,
        "goals_for": 96,
        "goals_conceded": 34,
        "points": 91,
        "win": 29,
        "draws": 4,
        "loss": 5,
    },
    {
        "team": "Arsenal",
        "league": "Premier League",
        "played": 38,
        "goals_for": 91,
        "goals_conceded": 29,
        "points": 89,
        "win": 28,
        "draws": 5,
        "loss": 5,
    },
    {
        "team": "Liverpool",
        "league": "Premier League",
        "played": 38,
        "goals_for": 86,
        "goals_conceded": 41,
        "points": 82,
        "win": 24,
        "draws": 10,
        "loss": 4,
    },
    {
        "team": "Real Madrid",
        "league": "La Liga",
        "played": 38,
        "goals_for": 87,
        "goals_conceded": 26,
        "points": 95,
        "win": 30,
        "draws": 5,
        "loss": 3,
    },
    {
        "team": "Barcelona",
        "league": "La Liga",
        "played": 38,
        "goals_for": 79,
        "goals_conceded": 32,
        "points": 85,
        "win": 26,
        "draws": 7,
        "loss": 5,
    },
]

for item in standings:
    team = Team.objects.get(name=item["team"])
    league = League.objects.get(name=item["league"])

    TeamStanding.objects.update_or_create(
        team=team,
        league=league,
        defaults={
            "played": item["played"],
            "goals_for": item["goals_for"],
            "goals_conceded": item["goals_conceded"],
            "points": item["points"],
            "win": item["win"],
            "draws": item["draws"],
            "loss": item["loss"],
        },
    )

print("Team standings seeded successfully!")
print("Seeding complete.")
from datetime import date, time
from footballapp.models import Match, Team, League

matches = [
    {
        "home_team": "Real Madrid",
        "away_team": "Barcelona",
        "league": "La Liga",
        "date": date(2024, 5, 24),
        "time": time(20, 0),
        "home_score": 2,
        "away_score": 1,
        "played": True,
        "completed": True,
    },
    {
        "home_team": "Manchester City",
        "away_team": "Chelsea",
        "league": "Premier League",
        "date": date(2024, 5, 24),
        "time": time(18, 30),
        "home_score": 3,
        "away_score": 0,
        "played": True,
        "completed": True,
    },
    {
        "home_team": "Liverpool",
        "away_team": "Arsenal",
        "league": "Premier League",
        "date": date(2024, 5, 25),
        "time": time(17, 0),
        "home_score": 0,
        "away_score": 0,
        "played": False,
        "completed": False,
    },
    {
        "home_team": "Bayern Munich",
        "away_team": "Borussia Dortmund",
        "league": "Bundesliga",
        "date": date(2024, 5, 25),
        "time": time(19, 30),
        "home_score": 0,
        "away_score": 0,
        "played": False,
        "completed": False,
    },
    {
        "home_team": "AC Milan",
        "away_team": "Inter",
        "league": "Serie A",
        "date": date(2024, 5, 26),
        "time": time(20, 0),
        "home_score": 0,
        "away_score": 0,
        "played": False,
        "completed": False,
    },
    {
        "home_team": "PSG",
        "away_team": "Marseille",
        "league": "Ligue 1",
        "date": date(2024, 5, 26),
        "time": time(22, 0),
        "home_score": 0,
        "away_score": 0,
        "played": False,
        "completed": False,
    },
]

for item in matches:
    Match.objects.update_or_create(
        home_team=Team.objects.get(name=item["home_team"]),
        away_team=Team.objects.get(name=item["away_team"]),
        league=League.objects.get(name=item["league"]),
        defaults={
            "date": item["date"],
            "time": item["time"],
            "home_score": item["home_score"],
            "away_score": item["away_score"],
            "played": item["played"],
            "completed": item["completed"],
        },
    )

print("Matches seeded successfully!")