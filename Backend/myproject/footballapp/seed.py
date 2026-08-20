import os
import sys
import random
from datetime import date, timedelta, time

from faker import Faker

# ---------------------------------------------------------
# Django setup
# ---------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")

import django
django.setup()

from django.db import transaction

from footballapp.models import (
    League,
    Team,
    Player,
    Trophy,
    Match,
    PlayerStats,
    Transfer,
)

fake = Faker()
random.seed(42)

# ---------------------------------------------------------
# DATA
# ---------------------------------------------------------

SEASON = "2025/26"

LEAGUES = {
    "Premier League": {
        "country": "England",
        "teams": [
            "Arsenal",
            "Chelsea",
            "Liverpool",
            "Manchester City",
        ],
    },
    "La Liga": {
        "country": "Spain",
        "teams": [
            "Real Madrid",
            "Barcelona",
            "Atletico Madrid",
            "Sevilla",
        ],
    },
    "Serie A": {
        "country": "Italy",
        "teams": [
            "Inter",
            "AC Milan",
            "Juventus",
            "Napoli",
        ],
    },
    "Bundesliga": {
        "country": "Germany",
        "teams": [
            "Bayern Munich",
            "Borussia Dortmund",
            "Leverkusen",
            "RB Leipzig",
        ],
    },
    "Ligue 1": {
        "country": "France",
        "teams": [
            "PSG",
            "Marseille",
            "Monaco",
            "Lyon",
        ],
    },
}


TEAM_CODES = {
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
    "Lyon": "OL",
}


PLAYERS = {
    "Arsenal": [
        "Bukayo Saka",
        "Martin Odegaard",
        "Declan Rice",
        "Kai Havertz",
        "William Saliba",
        "Gabriel Martinelli",
        "Gabriel Magalhaes",
        "Ben White",
        "David Raya",
        "Mikel Merino",
        "Leandro Trossard",
    ],

    "Chelsea": [
        "Cole Palmer",
        "Enzo Fernandez",
        "Moises Caicedo",
        "Nicolas Jackson",
        "Levi Colwill",
        "Marc Cucurella",
        "Christopher Nkunku",
        "Pedro Neto",
        "Malo Gusto",
        "Reece James",
        "Robert Sanchez",
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
        "Luis Diaz",
        "Federico Chiesa",
        "Giorgi Mamardashvili",
    ],

    "Manchester City": [
        "Erling Haaland",
        "Phil Foden",
        "Rodri",
        "Bernardo Silva",
        "Ruben Dias",
        "Josko Gvardiol",
        "Jeremy Doku",
        "Omar Marmoush",
        "Ederson",
        "Nathan Ake",
        "Mateo Kovacic",
    ],

    "Real Madrid": [
        "Kylian Mbappe",
        "Jude Bellingham",
        "Vinicius Junior",
        "Federico Valverde",
        "Ibrahima Konate",
        "Aurelien Tchouameni",
        "Eduardo Camavinga",
        "Antonio Rudiger",
        "Dani Carvajal",
        "Eder Militao",
        "Thibaut Courtois",
    ],

    "Barcelona": [
        "Lamine Yamal",
        "Robert Lewandowski",
        "Raphinha",
        "Pedri",
        "Gavi",
        "Frenkie de Jong",
        "Ronald Araujo",
        "Jules Kounde",
        "Alejandro Balde",
        "Pau Cubarsi",
        "Marc-Andre ter Stegen",
    ],

    "Atletico Madrid": [
        "Antoine Griezmann",
        "Julian Alvarez",
        "Conor Gallagher",
        "Alexander Sorloth",
        "Rodrigo De Paul",
        "Marcos Llorente",
        "Robin Le Normand",
        "Jose Gimenez",
        "Samuel Lino",
        "Nahuel Molina",
        "Jan Oblak",
    ],

    "Sevilla": [
        "Isaac Romero",
        "Dodi Lukebakio",
        "Albert Sambi Lokonga",
        "Saul Niguez",
        "Loic Bade",
        "Adria Pedrosa",
        "Peque Fernandez",
        "Djibril Sow",
        "Kike Salas",
        "Carmona",
        "Orjan Nyland",
    ],

    "Inter": [
        "Lautaro Martinez",
        "Marcus Thuram",
        "Nicolo Barella",
        "Hakan Calhanoglu",
        "Alessandro Bastoni",
        "Federico Dimarco",
        "Benjamin Pavard",
        "Denzel Dumfries",
        "Henrikh Mkhitaryan",
        "Francesco Acerbi",
        "Yann Sommer",
    ],

    "AC Milan": [
        "Rafael Leao",
        "Christian Pulisic",
        "Alvaro Morata",
        "Theo Hernandez",
        "Mike Maignan",
        "Ruben Loftus-Cheek",
        "Ismael Bennacer",
        "Fikayo Tomori",
        "Strahinja Pavlovic",
        "Youssouf Fofana",
        "Davide Calabria",
    ],

    "Juventus": [
        "Dusan Vlahovic",
        "Teun Koopmeiners",
        "Kenan Yildiz",
        "Douglas Luiz",
        "Manuel Locatelli",
        "Bremer",
        "Federico Gatti",
        "Andrea Cambiaso",
        "Khéphren Thuram",
        "Nico Gonzalez",
        "Michele Di Gregorio",
    ],

    "Napoli": [
        "Khvicha Kvaratskhelia",
        "Romelu Lukaku",
        "Scott McTominay",
        "Alessandro Buongiorno",
        "Stanislav Lobotka",
        "Frank Anguissa",
        "Giovanni Di Lorenzo",
        "Mathias Olivera",
        "Amir Rrahmani",
        "Matteo Politano",
        "Alex Meret",
    ],

    "Bayern Munich": [
        "Harry Kane",
        "Jamal Musiala",
        "Leroy Sane",
        "Michael Olise",
        "Joshua Kimmich",
        "Joao Palhinha",
        "Alphonso Davies",
        "Dayot Upamecano",
        "Kim Min-jae",
        "Aleksandar Pavlovic",
        "Manuel Neuer",
    ],

    "Borussia Dortmund": [
        "Serhou Guirassy",
        "Julian Brandt",
        "Nico Schlotterbeck",
        "Gregor Kobel",
        "Emre Can",
        "Marcel Sabitzer",
        "Pascal Gross",
        "Waldemar Anton",
        "Jamie Gittens",
        "Maximilian Beier",
        "Yan Couto",
    ],

    "Leverkusen": [
        "Victor Boniface",
        "Granit Xhaka",
        "Alejandro Grimaldo",
        "Jeremie Frimpong",
        "Edmond Tapsoba",
        "Jonathan Tah",
        "Piero Hincapie",
        "Robert Andrich",
        "Martin Terrier",
        "Aleix Garcia",
        "Lukas Hradecky",
    ],

    "RB Leipzig": [
        "Lois Openda",
        "Benjamin Sesko",
        "Xavi Simons",
        "Amadou Haidara",
        "Castello Lukeba",
        "Willi Orban",
        "David Raum",
        "Benjamin Henrichs",
        "Nicolas Seiwald",
        "Christoph Baumgartner",
        "Peter Gulacsi",
    ],

    "PSG": [
        "Ousmane Dembele",
        "Bradley Barcola",
        "Joao Neves",
        "Vitinha",
        "Warren Zaire-Emery",
        "Achraf Hakimi",
        "Marquinhos",
        "Willian Pacho",
        "Nuno Mendes",
        "Goncalo Ramos",
        "Matvey Safonov",
    ],

    "Marseille": [
        "Mason Greenwood",
        "Elye Wahi",
        "Pierre-Emile Hojbjerg",
        "Adrien Rabiot",
        "Amine Harit",
        "Luis Henrique",
        "Leonardo Balerdi",
        "Jonathan Rowe",
        "Michael Murillo",
        "Lilian Brassier",
        "Geronimo Rulli",
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
        "Philipp Kohn",
    ],

    "Lyon": [
        "Alexandre Lacazette",
        "Georges Mikautadze",
        "Malick Fofana",
        "Corentin Tolisso",
        "Maxence Caqueret",
        "Ainsley Maitland-Niles",
        "Duje Caleta-Car",
        "Clinton Mata",
        "Abner Vinicius",
        "Said Benrahma",
        "Lucas Perri",
    ],
}


POSITIONS = ["GK", "DF", "MF", "FW"]

NATIONALITIES = [
    "Argentina",
    "Portugal",
    "Brazil",
    "Spain",
    "England",
    "France",
    "Uruguay",
    "Netherlands",
    "Italy",
]


# ---------------------------------------------------------
# HELPERS
# ---------------------------------------------------------

def create_player_stats(player, matches):
    """
    Create PlayerStats records.

    Your PlayerStats model uses:
        player
        matches
        goals
        assists
        yellow_card
        red_card
        minutes_played
    """

    for match in matches:

        # Only create stats when the player belongs
        # to one of the teams playing.
        if player.team_id not in [
            match.home_team_id,
            match.away_team_id,
        ]:
            continue

        # Approximately 75% chance of appearing
        if random.random() > 0.75:
            continue

        position = player.position

        if position == "GK":
            goals = 0
            assists = random.randint(0, 1)

        elif position == "DF":
            goals = random.randint(0, 1)
            assists = random.randint(0, 1)

        elif position == "MF":
            goals = random.randint(0, 2)
            assists = random.randint(0, 2)

        else:
            goals = random.randint(0, 2)
            assists = random.randint(0, 2)

        PlayerStats.objects.update_or_create(
            player=player,
            matches=match,
            defaults={
                "goals": goals,
                "assists": assists,
                "yellow_card": 1 if random.random() < 0.12 else 0,
                "red_card": 1 if random.random() < 0.02 else 0,
                "minutes_played": random.randint(15, 90),
            },
        )


# ---------------------------------------------------------
# SEED
# ---------------------------------------------------------

@transaction.atomic
def seed():

    print("\n===================================")
    print("CLEARING OLD DATA")
    print("===================================\n")

    # Delete in dependency order.
    PlayerStats.objects.all().delete()
    Transfer.objects.all().delete()
    Match.objects.all().delete()
    Player.objects.all().delete()
    Team.objects.all().delete()
    League.objects.all().delete()
    Trophy.objects.all().delete()

    print("Old data deleted.\n")


    # -----------------------------------------------------
    # TROPHIES
    # -----------------------------------------------------

    print("Creating trophies...")

    trophy_names = [
        "Premier League",
        "FA Cup",
        "Champions League",
        "League Cup",
        "Super Cup",
    ]

    trophies = {}

    for name in trophy_names:
        trophy, _ = Trophy.objects.get_or_create(name=name)
        trophies[name] = trophy

    print(f"Trophies: {len(trophies)}")


    # -----------------------------------------------------
    # LEAGUES
    # -----------------------------------------------------

    league_objects = {}

    print("\nCreating leagues...")

    for league_name, data in LEAGUES.items():

        league = League.objects.create(
            name=league_name,
            season=SEASON,
            country=data["country"],
        )

        league_objects[league_name] = league

    print(f"Leagues: {len(league_objects)}")


    # -----------------------------------------------------
    # TEAMS
    # -----------------------------------------------------

    team_objects = {}

    print("\nCreating teams...")

    for league_name, data in LEAGUES.items():

        league = league_objects[league_name]

        for team_name in data["teams"]:

            team = Team.objects.create(
                name=team_name,
                short_name=TEAM_CODES[team_name],
                league=league,
            )

            # Give each team 1–2 trophies
            selected_trophies = random.sample(
                list(trophies.values()),
                random.randint(1, 2)
            )

            for trophy in selected_trophies:
                team.trophy.add(trophy)

            team_objects[team_name] = team

    print(f"Teams: {len(team_objects)}")


    # -----------------------------------------------------
    # PLAYERS
    # -----------------------------------------------------

    player_objects = {}

    print("\nCreating players...")

    for team_name, player_names in PLAYERS.items():

        team = team_objects[team_name]

        for index, player_name in enumerate(player_names):

            # Give some recognizable positions
            if index == 0:
                position = "FW"
            elif index == 1:
                position = "MF"
            elif index == 2:
                position = "MF"
            elif index == 3:
                position = "FW"
            elif index == 4:
                position = "DF"
            elif index == 5:
                position = "DF"
            elif index == 6:
                position = "DF"
            elif index == 7:
                position = "DF"
            elif index == 8:
                position = "GK"
            else:
                position = random.choice(POSITIONS)

            # Position-based attributes
            if position == "GK":

                goals = random.randint(0, 1)
                assists = random.randint(0, 2)

                pace = random.randint(30, 55)
                shooting = random.randint(5, 20)
                passing = random.randint(40, 75)
                dribbling = random.randint(20, 45)
                physicality = random.randint(60, 90)
                defending = random.randint(20, 40)

            elif position == "DF":

                goals = random.randint(0, 5)
                assists = random.randint(0, 6)

                pace = random.randint(55, 85)
                shooting = random.randint(35, 75)
                passing = random.randint(45, 85)
                dribbling = random.randint(20, 65)
                physicality = random.randint(60, 90)
                defending = random.randint(70, 95)

            elif position == "MF":

                goals = random.randint(3, 15)
                assists = random.randint(5, 18)

                pace = random.randint(55, 95)
                shooting = random.randint(55, 80)
                passing = random.randint(70, 99)
                dribbling = random.randint(45, 90)
                physicality = random.randint(60, 90)
                defending = random.randint(30, 80)

            else:

                goals = random.randint(12, 35)
                assists = random.randint(3, 12)

                pace = random.randint(70, 99)
                shooting = random.randint(65, 95)
                passing = random.randint(55, 85)
                dribbling = random.randint(60, 95)
                physicality = random.randint(60, 90)
                defending = random.randint(20, 40)

            # Elite scorers
            elite_scorers = {
                "Erling Haaland": (30, 38),
                "Kylian Mbappe": (28, 36),
                "Harry Kane": (26, 34),
                "Robert Lewandowski": (24, 32),
                "Lautaro Martinez": (22, 30),
            }

            if player_name in elite_scorers:

                low, high = elite_scorers[player_name]

                goals = random.randint(low, high)
                position = "FW"

            player = Player.objects.create(
                name=player_name,
                team=team,
                position=position,

                goals=goals,
                assists=assists,
                matches=random.randint(28, 38),

                pace=pace,
                shooting=shooting,
                passing=passing,
                dribbling=dribbling,
                defending=defending,
                physicality=physicality,

                preferred_foot=random.choice(
                    ["Left", "Right"]
                ),

                age=random.randint(18, 36),
                shirt_number=index + 1,

                height=random.randint(165, 200),
                weight=random.randint(60, 95),

                nationality=random.choice(
                    NATIONALITIES
                ),

                market_value=random.randint(
                    500_000,
                    150_000_000
                ),

                joined=fake.date_between(
                    start_date="-8y",
                    end_date="-1y"
                ),

                contract_until=fake.date_between(
                    start_date="+1y",
                    end_date="+6y"
                ),
            )

            # Add team trophies to player
            for trophy in team.trophy.all():
                player.trophy.add(trophy)

            player_objects[player_name] = player

    print(f"Players: {len(player_objects)}")


    # -----------------------------------------------------
    # MATCHES
    # -----------------------------------------------------

    print("\nCreating matches...")

    match_objects = []

    for league_name, data in LEAGUES.items():

        league = league_objects[league_name]

        league_teams = [
            team_objects[name]
            for name in data["teams"]
        ]

        # Each team plays every other team once.
        for i in range(len(league_teams)):

            for j in range(i + 1, len(league_teams)):

                home = league_teams[i]
                away = league_teams[j]

                match_date = (
                    date(2025, 8, 15)
                    + timedelta(
                        days=random.randint(0, 240)
                    )
                )

                home_score = random.randint(0, 4)
                away_score = random.randint(0, 4)

                match = Match.objects.create(
                    home_team=home,
                    away_team=away,
                    league=league,

                    date=match_date,

                    time=time(
                        random.choice(
                            [15, 17, 18, 19, 20, 21]
                        ),
                        0,
                    ),

                    home_score=home_score,
                    away_score=away_score,

                    played=True,
                    completed=True,
                )

                match_objects.append(match)

    print(f"Matches: {len(match_objects)}")


    # -----------------------------------------------------
    # PLAYER MATCH STATS
    # -----------------------------------------------------

    print("\nCreating PlayerStats...")

    stats_count = 0

    for match in match_objects:

        players_in_match = Player.objects.filter(
            team_id__in=[
                match.home_team_id,
                match.away_team_id,
            ]
        )

        for player in players_in_match:

            # About 75% appearance rate
            if random.random() > 0.75:
                continue

            if player.position == "GK":
                goals = 0
                assists = random.randint(0, 1)

            elif player.position == "DF":
                goals = random.randint(0, 1)
                assists = random.randint(0, 1)

            elif player.position == "MF":
                goals = random.randint(0, 2)
                assists = random.randint(0, 2)

            else:
                goals = random.randint(0, 2)
                assists = random.randint(0, 2)

            PlayerStats.objects.create(
                player=player,
                matches=match,

                goals=goals,
                assists=assists,

                yellow_card=(
                    1 if random.random() < 0.12 else 0
                ),

                red_card=(
                    1 if random.random() < 0.02 else 0
                ),

                minutes_played=random.randint(
                    15,
                    90
                ),
            )

            stats_count += 1

    print(f"PlayerStats: {stats_count}")


    # -----------------------------------------------------
    # TRANSFERS
    # -----------------------------------------------------

    print("\nCreating transfers...")

    transfer_count = 0

    all_players = list(player_objects.values())
    all_teams = list(team_objects.values())

    for player in random.sample(
        all_players,
        min(40, len(all_players))
    ):

        current_team = player.team

        possible_teams = [
            team
            for team in all_teams
            if team.id != current_team.id
        ]

        new_team = random.choice(possible_teams)

        league = new_team.league

        Transfer.objects.create(
            player=player,

            team_from=current_team,
            team_to=new_team,

            transfer_fee=random.randint(
                1_000_000,
                120_000_000
            ),

            transfer_type=random.choice(
                ["Permanent", "Loan"]
            ),

            transfer_status=random.choice(
                ["Completed", "Completed", "Pending"]
            ),

            transfer_date=fake.date_between(
                start_date="-2y",
                end_date="today"
            ),

            league=league,
        )

        transfer_count += 1

    print(f"Transfers: {transfer_count}")


    # -----------------------------------------------------
    # FINISH
    # -----------------------------------------------------

    print("\n===================================")
    print("SEEDING COMPLETE")
    print("===================================")

    print(f"Leagues:      {League.objects.count()}")
    print(f"Teams:        {Team.objects.count()}")
    print(f"Players:      {Player.objects.count()}")
    print(f"Matches:      {Match.objects.count()}")
    print(f"PlayerStats:  {PlayerStats.objects.count()}")
    print(f"Transfers:    {Transfer.objects.count()}")
    print("===================================\n")


if __name__ == "__main__":
    seed()