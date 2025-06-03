const data = {
    categories: [
        {
            id: 1,
            name: "Games",
        },
        {
            id: 2,
            name: "Movies",
        },
        {
            id: 3,
            name: "Music",
        },
        {
            id: 4,
            name: "18+",
        },
    ],
    questions : {
        Games: [
            {
              id: 1,
              question: "Quel est le nom de la princesse que Mario doit sauver dans la plupart de ses aventures ?",
              answers: [
                { id: '1', text: 'Princesse Peach', isCorrect: true },
                { id: '2', text: 'Princesse Zelda', isCorrect: false },
                { id: '3', text: 'Princesse Daisy', isCorrect: false },
                { id: '4', text: 'Princesse Rosalina', isCorrect: false },
                { id: '5', text: 'Princesse Pauline', isCorrect: false },
                { id: '6', text: 'Princesse Toadstool', isCorrect: false },
                { id: '7', text: 'Princesse Bowsette', isCorrect: false },
                { id: '8', text: 'Princesse Birdo', isCorrect: false },
                { id: '9', text: 'Princesse Vivian', isCorrect: false },
                { id: '10', text: 'Princesse Mallow', isCorrect: false }
              ]
            },
            {
              id: 2,
              question: "Dans quelle ville fictive se déroule principalement l'action de Grand Theft Auto V ?",
              answers: [
                { id: '1', text: 'San Fierro', isCorrect: false },
                { id: '2', text: 'Los Santos', isCorrect: true },
                { id: '3', text: 'Vice City', isCorrect: false },
                { id: '4', text: 'Liberty City', isCorrect: false },
                { id: '5', text: 'Las Venturas', isCorrect: false },
                { id: '6', text: 'San Andreas', isCorrect: false },
                { id: '7', text: 'Vinewood', isCorrect: false },
                { id: '8', text: 'Paleto Bay', isCorrect: false },
                { id: '9', text: 'Sandy Shores', isCorrect: false },
                { id: '10', text: 'Blaine County', isCorrect: false }
              ]
            },
            {
              id: 3,
              question: "Quel studio a développé la série The Elder Scrolls ?",
              answers: [
                { id: '1', text: 'BioWare', isCorrect: false },
                { id: '2', text: 'Bethesda Game Studios', isCorrect: true },
                { id: '3', text: 'CD Projekt Red', isCorrect: false },
                { id: '4', text: 'Rockstar Games', isCorrect: false },
                { id: '5', text: 'Ubisoft', isCorrect: false },
                { id: '6', text: 'Electronic Arts', isCorrect: false },
                { id: '7', text: 'Square Enix', isCorrect: false },
                { id: '8', text: 'Activision', isCorrect: false },
                { id: '9', text: 'Take-Two Interactive', isCorrect: false },
                { id: '10', text: 'Valve Corporation', isCorrect: false }
              ]
            },
            {
              id: 4,
              question: "En quelle année est sorti le tout premier jeu de la franchise Pokémon ?",
              answers: [
                { id: '1', text: '1996', isCorrect: true },
                { id: '2', text: '1998', isCorrect: false },
                { id: '3', text: '1999', isCorrect: false },
                { id: '4', text: '2000', isCorrect: false },
                { id: '5', text: '1995', isCorrect: false },
                { id: '6', text: '1997', isCorrect: false },
                { id: '7', text: '2001', isCorrect: false },
                { id: '8', text: '1994', isCorrect: false },
                { id: '9', text: '2002', isCorrect: false },
                { id: '10', text: '1993', isCorrect: false }
              ]
            },
            {
              id: 5,
              question: "Comment s'appelle le plombier italien moustachu héros de Donkey Kong (1981) ?",
              answers: [
                { id: '1', text: 'Luigi', isCorrect: false },
                { id: '2', text: 'Mario', isCorrect: true },
                { id: '3', text: 'Wario', isCorrect: false },
                { id: '4', text: 'Toad', isCorrect: false },
                { id: '5', text: 'Waluigi', isCorrect: false },
                { id: '6', text: 'Bowser', isCorrect: false },
                { id: '7', text: 'Donkey Kong', isCorrect: false },
                { id: '8', text: 'Yoshi', isCorrect: false },
                { id: '9', text: 'Koopa', isCorrect: false },
                { id: '10', text: 'Goomba', isCorrect: false }
              ]
            },
            {
              id: 6,
              question: "Quelle console de salon 32 bits a été lancée par Sony en 1994 ?",
              answers: [
                { id: '1', text: 'PlayStation', isCorrect: true },
                { id: '2', text: 'Saturn', isCorrect: false },
                { id: '3', text: 'N64', isCorrect: false },
                { id: '4', text: 'Dreamcast', isCorrect: false },
                { id: '5', text: '3DO', isCorrect: false },
                { id: '6', text: 'Jaguar', isCorrect: false },
                { id: '7', text: 'Neo Geo', isCorrect: false },
                { id: '8', text: 'PC-FX', isCorrect: false },
                { id: '9', text: 'CD-i', isCorrect: false },
                { id: '10', text: '32X', isCorrect: false }
              ]
            },
            {
              id: 7,
              question: "Quel est le titre du jeu d'action-aventure développé par Naughty Dog et sorti en 2013 sur PS3 ?",
              answers: [
                { id: '1', text: 'Uncharted 3', isCorrect: false },
                { id: '2', text: 'The Last of Us', isCorrect: true },
                { id: '3', text: 'Beyond: Two Souls', isCorrect: false },
                { id: '4', text: 'God of War Ascension', isCorrect: false },
                { id: '5', text: 'Heavy Rain', isCorrect: false },
                { id: '6', text: 'Infamous 2', isCorrect: false },
                { id: '7', text: 'Resistance 3', isCorrect: false },
                { id: '8', text: 'Killzone 3', isCorrect: false },
                { id: '9', text: 'LittleBigPlanet 2', isCorrect: false },
                { id: '10', text: 'Gran Turismo 5', isCorrect: false }
              ]
            },
            {
              id: 8,
              question: "Dans la série Halo, quel est le nom du protagoniste principal, également appelé le Master Chief ?",
              answers: [
                { id: '1', text: 'Spartan Locke', isCorrect: false },
                { id: '2', text: 'Cortana', isCorrect: false },
                { id: '3', text: 'John-117', isCorrect: true },
                { id: '4', text: 'Jameson', isCorrect: false },
                { id: '5', text: 'Noble Six', isCorrect: false },
                { id: '6', text: 'Arbiter', isCorrect: false },
                { id: '7', text: 'Sergeant Johnson', isCorrect: false },
                { id: '8', text: 'Commander Keyes', isCorrect: false },
                { id: '9', text: 'Captain Lasky', isCorrect: false },
                { id: '10', text: 'Spartan Buck', isCorrect: false }
              ]
            },
            {
              id: 9,
              question: "Quel jeu de puzzle culte, créé par Alexey Pajitnov en 1984, consiste à empiler des blocs tombants ?",
              answers: [
                { id: '1', text: 'Dr. Mario', isCorrect: false },
                { id: '2', text: 'Columns', isCorrect: false },
                { id: '3', text: 'Tetris', isCorrect: true },
                { id: '4', text: 'Puyo Puyo', isCorrect: false },
                { id: '5', text: 'Lumines', isCorrect: false },
                { id: '6', text: 'Panel de Pon', isCorrect: false },
                { id: '7', text: 'Magical Drop', isCorrect: false },
                { id: '8', text: 'Bust-a-Move', isCorrect: false },
                { id: '9', text: 'Klax', isCorrect: false },
                { id: '10', text: 'Columns III', isCorrect: false }
              ]
            },
            {
              id: 10,
              question: "Quel jeu de battle royale développé par Epic Games est sorti en accès libre en 2017 ?",
              answers: [
                { id: '1', text: 'Apex Legends', isCorrect: false },
                { id: '2', text: 'PlayerUnknowns Battlegrounds', isCorrect: false },
                { id: '3', text: 'Fortnite', isCorrect: true },
                { id: '4', text: 'Call of Duty: Warzone', isCorrect: false },
                { id: '5', text: 'Realm Royale', isCorrect: false },
                { id: '6', text: 'Spellbreak', isCorrect: false },
                { id: '7', text: 'Hyper Scape', isCorrect: false },
                { id: '8', text: 'Rogue Company', isCorrect: false },
                { id: '9', text: 'Knockout City', isCorrect: false },
                { id: '10', text: 'Rocket Arena', isCorrect: false }
              ]
            }
          ],
          Movies: [
            { id: 1, question: "Quel film a remporté l'Oscar du meilleur film en 1994 ?", answers: [
                { id: '1', text: 'Pulp Fiction', isCorrect: false },
                { id: '2', text: 'Forrest Gump', isCorrect: true },
                { id: '3', text: 'Quatre mariages et un enterrement', isCorrect: false },
                { id: '4', text: 'La Liste de Schindler', isCorrect: false },
                { id: '5', text: 'The Shawshank Redemption', isCorrect: false },
                { id: '6', text: 'Natural Born Killers', isCorrect: false },
                { id: '7', text: 'True Lies', isCorrect: false },
                { id: '8', text: 'Speed', isCorrect: false },
                { id: '9', text: 'Léon', isCorrect: false },
                { id: '10', text: 'The Mask', isCorrect: false }
              ]
            },
            { id: 2, question: "Qui a réalisé le film « Inception » (2010) ?", answers: [
                { id: '1', text: 'Quentin Tarantino', isCorrect: false },
                { id: '2', text: 'Christopher Nolan', isCorrect: true },
                { id: '3', text: 'Steven Spielberg', isCorrect: false },
                { id: '4', text: 'James Cameron', isCorrect: false },
                { id: '5', text: 'Martin Scorsese', isCorrect: false },
                { id: '6', text: 'David Fincher', isCorrect: false },
                { id: '7', text: 'Ridley Scott', isCorrect: false },
                { id: '8', text: 'Peter Jackson', isCorrect: false },
                { id: '9', text: 'Guillermo del Toro', isCorrect: false },
                { id: '10', text: 'Alfonso Cuarón', isCorrect: false }
              ]
            },
            { id: 3, question: "Dans quelle saga trouve-t-on les personnages Luke Skywalker et Dark Vador ?", answers: [
                { id: '1', text: 'Star Trek', isCorrect: false },
                { id: '2', text: 'Star Wars', isCorrect: true },
                { id: '3', text: 'Stargate', isCorrect: false },
                { id: '4', text: 'Matrix', isCorrect: false },
                { id: '5', text: 'Battlestar Galactica', isCorrect: false },
                { id: '6', text: 'Dune', isCorrect: false },
                { id: '7', text: 'Alien', isCorrect: false },
                { id: '8', text: 'Predator', isCorrect: false },
                { id: '9', text: 'Blade Runner', isCorrect: false },
                { id: '10', text: 'The Fifth Element', isCorrect: false }
              ]
            },
            { id: 4, question: "Quel est le film français le plus vu au cinéma depuis sa sortie ?", answers: [
                { id: '1', text: 'Intouchables', isCorrect: true },
                { id: '2', text: 'La Grande Vadrouille', isCorrect: false },
                { id: '3', text: 'Bienvenue chez les Chtis', isCorrect: false },
                { id: '4', text: 'Les Choristes', isCorrect: false },
                { id: '5', text: 'Astérix et Obélix : Mission Cléopâtre', isCorrect: false },
                { id: '6', text: 'Le Petit Nicolas', isCorrect: false },
                { id: '7', text: 'Les Visiteurs', isCorrect: false },
                { id: '8', text: 'Taxi 2', isCorrect: false },
                { id: '9', text: 'Les Bronzés', isCorrect: false },
                { id: '10', text: 'Le Dîner de Cons', isCorrect: false }
              ]
            },
            { id: 5, question: "Quel acteur incarne Iron Man dans l'Univers cinématographique Marvel ?", answers: [
                { id: '1', text: 'Chris Evans', isCorrect: false },
                { id: '2', text: 'Robert Downey Jr.', isCorrect: true },
                { id: '3', text: 'Chris Hemsworth', isCorrect: false },
                { id: '4', text: 'Mark Ruffalo', isCorrect: false },
                { id: '5', text: 'Tom Holland', isCorrect: false },
                { id: '6', text: 'Benedict Cumberbatch', isCorrect: false },
                { id: '7', text: 'Paul Rudd', isCorrect: false },
                { id: '8', text: 'Chadwick Boseman', isCorrect: false },
                { id: '9', text: 'Tom Hiddleston', isCorrect: false },
                { id: '10', text: 'Jeremy Renner', isCorrect: false }
              ]
            },
            { id: 6, question: "Quel film d'animation Pixar met en scène des monstres dans une usine de cris ?", answers: [
                { id: '1', text: 'Les Indestructibles', isCorrect: false },
                { id: '2', text: 'Monstres & Cie', isCorrect: true },
                { id: '3', text: 'Toy Story', isCorrect: false },
                { id: '4', text: 'Vice-versa', isCorrect: false },
                { id: '5', text: 'Ratatouille', isCorrect: false },
                { id: '6', text: 'Wall-E', isCorrect: false },
                { id: '7', text: 'Là-haut', isCorrect: false },
                { id: '8', text: 'Coco', isCorrect: false },
                { id: '9', text: 'Le Monde de Nemo', isCorrect: false },
                { id: '10', text: 'Les Aventures de Bernard et Bianca', isCorrect: false }
              ]
            },
            { id: 7, question: "Quel réalisateur est connu pour ses films avec des dinosaures, comme Jurassic Park ?", answers: [
                { id: '1', text: 'Ridley Scott', isCorrect: false },
                { id: '2', text: 'James Cameron', isCorrect: false },
                { id: '3', text: 'Steven Spielberg', isCorrect: true },
                { id: '4', text: 'Peter Jackson', isCorrect: false },
                { id: '5', text: 'George Lucas', isCorrect: false },
                { id: '6', text: 'Christopher Nolan', isCorrect: false },
                { id: '7', text: 'Martin Scorsese', isCorrect: false },
                { id: '8', text: 'Quentin Tarantino', isCorrect: false },
                { id: '9', text: 'David Fincher', isCorrect: false },
                { id: '10', text: 'Guillermo del Toro', isCorrect: false }
              ]
            },
            { id: 8, question: "Dans quel film peut-on entendre la réplique « I'll be back » ?", answers: [
                { id: '1', text: 'Terminator', isCorrect: true },
                { id: '2', text: 'Predator', isCorrect: false },
                { id: '3', text: 'Commando', isCorrect: false },
                { id: '4', text: 'Total Recall', isCorrect: false },
                { id: '5', text: 'Die Hard', isCorrect: false },
                { id: '6', text: 'Rambo', isCorrect: false },
                { id: '7', text: 'RoboCop', isCorrect: false },
                { id: '8', text: 'LArme fatale', isCorrect: false },
                { id: '9', text: 'Aliens', isCorrect: false },
                { id: '10', text: 'True Lies', isCorrect: false }
              ]
            },
            { id: 9, question: "Quel film de Christopher Nolan suit un groupe de voleurs de rêves ?", answers: [
                { id: '1', text: 'Memento', isCorrect: false },
                { id: '2', text: 'Inception', isCorrect: true },
                { id: '3', text: 'Interstellar', isCorrect: false },
                { id: '4', text: 'Dunkirk', isCorrect: false },
                { id: '5', text: 'The Prestige', isCorrect: false },
                { id: '6', text: 'Batman Begins', isCorrect: false },
                { id: '7', text: 'The Dark Knight', isCorrect: false },
                { id: '8', text: 'Insomnia', isCorrect: false },
                { id: '9', text: 'Following', isCorrect: false },
                { id: '10', text: 'Tenet', isCorrect: false }
              ]
            },
            { id: 10, question: "Quelle trilogie suit les aventures de Frodo et de l'Anneau Unique ?", answers: [
                { id: '1', text: 'Harry Potter', isCorrect: false },
                { id: '2', text: 'Le Seigneur des Anneaux', isCorrect: true },
                { id: '3', text: 'Star Wars', isCorrect: false },
                { id: '4', text: 'Matrix', isCorrect: false },
                { id: '5', text: 'Le Hobbit', isCorrect: false },
                { id: '6', text: 'Narnia', isCorrect: false },
                { id: '7', text: 'Hunger Games', isCorrect: false },
                { id: '8', text: 'Divergente', isCorrect: false },
                { id: '9', text: 'Maze Runner', isCorrect: false },
                { id: '10', text: 'Twilight', isCorrect: false }
              ]
            }
          ],
      
          Music: [
            { id: 1, question: "Quel groupe britannique a sorti l'album « Abbey Road » en 1969 ?", answers: [
                { id: '1', text: 'The Rolling Stones', isCorrect: false },
                { id: '2', text: 'The Beatles', isCorrect: true },
                { id: '3', text: 'Pink Floyd', isCorrect: false },
                { id: '4', text: 'Led Zeppelin', isCorrect: false },
                { id: '5', text: 'The Who', isCorrect: false },
                { id: '6', text: 'Queen', isCorrect: false },
                { id: '7', text: 'The Kinks', isCorrect: false },
                { id: '8', text: 'The Animals', isCorrect: false },
                { id: '9', text: 'The Yardbirds', isCorrect: false },
                { id: '10', text: 'The Hollies', isCorrect: false }
              ]
            },
            { id: 2, question: "Quel artiste est surnommé « King of Pop » ?", answers: [
                { id: '1', text: 'Elvis Presley', isCorrect: false },
                { id: '2', text: 'Michael Jackson', isCorrect: true },
                { id: '3', text: 'Prince', isCorrect: false },
                { id: '4', text: 'Freddie Mercury', isCorrect: false },
                { id: '5', text: 'David Bowie', isCorrect: false },
                { id: '6', text: 'Madonna', isCorrect: false },
                { id: '7', text: 'Stevie Wonder', isCorrect: false },
                { id: '8', text: 'James Brown', isCorrect: false },
                { id: '9', text: 'Ray Charles', isCorrect: false },
                { id: '10', text: 'Marvin Gaye', isCorrect: false }
              ]
            },
            { id: 3, question: "Quel est le genre musical de Bob Marley ?", answers: [
                { id: '1', text: 'Reggae', isCorrect: true },
                { id: '2', text: 'Rock', isCorrect: false },
                { id: '3', text: 'Jazz', isCorrect: false },
                { id: '4', text: 'Blues', isCorrect: false },
                { id: '5', text: 'Ska', isCorrect: false },
                { id: '6', text: 'Dub', isCorrect: false },
                { id: '7', text: 'Soul', isCorrect: false },
                { id: '8', text: 'Funk', isCorrect: false },
                { id: '9', text: 'R&B', isCorrect: false },
                { id: '10', text: 'Hip-Hop', isCorrect: false }
              ]
            },
            { id: 4, question: "Quel groupe a chanté « Bohemian Rhapsody » ?", answers: [
                { id: '1', text: 'Queen', isCorrect: true },
                { id: '2', text: 'The Who', isCorrect: false },
                { id: '3', text: 'Eurythmics', isCorrect: false },
                { id: '4', text: 'Pink', isCorrect: false },
                { id: '5', text: 'Led Zeppelin', isCorrect: false },
                { id: '6', text: 'Pink Floyd', isCorrect: false },
                { id: '7', text: 'The Rolling Stones', isCorrect: false },
                { id: '8', text: 'The Beatles', isCorrect: false },
                { id: '9', text: 'The Kinks', isCorrect: false },
                { id: '10', text: 'The Animals', isCorrect: false }
              ]
            },
            { id: 5, question: "Quel instrument utilise-t-on principalement dans la musique classique ?", answers: [
                { id: '1', text: 'Synthétiseur', isCorrect: false },
                { id: '2', text: 'Guitare électrique', isCorrect: false },
                { id: '3', text: 'Piano', isCorrect: true },
                { id: '4', text: 'Batterie', isCorrect: false },
                { id: '5', text: 'Violon', isCorrect: false },
                { id: '6', text: 'Violoncelle', isCorrect: false },
                { id: '7', text: 'Flûte', isCorrect: false },
                { id: '8', text: 'Clarinette', isCorrect: false },
                { id: '9', text: 'Trompette', isCorrect: false },
                { id: '10', text: 'Harpe', isCorrect: false }
              ]
            },
            { id: 6, question: "Quel chanteur canadien a sorti l'album « Purpose » en 2015 ?", answers: [
                { id: '1', text: 'Drake', isCorrect: false },
                { id: '2', text: 'Justin Bieber', isCorrect: true },
                { id: '3', text: 'The Weeknd', isCorrect: false },
                { id: '4', text: 'Shawn Mendes', isCorrect: false },
                { id: '5', text: 'Celine Dion', isCorrect: false },
                { id: '6', text: 'Avril Lavigne', isCorrect: false },
                { id: '7', text: 'Michael Bublé', isCorrect: false },
                { id: '8', text: 'Bryan Adams', isCorrect: false },
                { id: '9', text: 'Neil Young', isCorrect: false },
                { id: '10', text: 'Leonard Cohen', isCorrect: false }
              ]
            },
            { id: 7, question: "Quel groupe rock originaire de Seattle a popularisé le grunge ?", answers: [
                { id: '1', text: 'Nirvana', isCorrect: true },
                { id: '2', text: 'Pearl Jam', isCorrect: false },
                { id: '3', text: 'Soundgarden', isCorrect: false },
                { id: '4', text: 'Alice in Chains', isCorrect: false },
                { id: '5', text: 'Mudhoney', isCorrect: false },
                { id: '6', text: 'Screaming Trees', isCorrect: false },
                { id: '7', text: 'Temple of the Dog', isCorrect: false },
                { id: '8', text: 'Mother Love Bone', isCorrect: false },
                { id: '9', text: 'Melvins', isCorrect: false },
                { id: '10', text: 'Green River', isCorrect: false }
              ]
            },
            { id: 8, question: "Quel festival de musique se tient chaque année à Indio, Californie ?", answers: [
                { id: '1', text: 'Glastonbury', isCorrect: false },
                { id: '2', text: 'Coachella', isCorrect: true },
                { id: '3', text: 'Burning Man', isCorrect: false },
                { id: '4', text: 'Lollapalooza', isCorrect: false },
                { id: '5', text: 'SXSW', isCorrect: false },
                { id: '6', text: 'Bonnaroo', isCorrect: false },
                { id: '7', text: 'Ultra Music Festival', isCorrect: false },
                { id: '8', text: 'Tomorrowland', isCorrect: false },
                { id: '9', text: 'Woodstock', isCorrect: false },
                { id: '10', text: 'Rock in Rio', isCorrect: false }
              ]
            },
            { id: 9, question: "Quel rappeur de Detroit est surnommé Slim Shady ?", answers: [
                { id: '1', text: 'Dr. Dre', isCorrect: false },
                { id: '2', text: 'Eminem', isCorrect: true },
                { id: '3', text: 'Ice Cube', isCorrect: false },
                { id: '4', text: 'Snoop Dogg', isCorrect: false },
                { id: '5', text: '50 Cent', isCorrect: false },
                { id: '6', text: 'Kendrick Lamar', isCorrect: false },
                { id: '7', text: 'Tupac', isCorrect: false },
                { id: '8', text: 'The Notorious B.I.G.', isCorrect: false },
                { id: '9', text: 'Jay-Z', isCorrect: false },
                { id: '10', text: 'Nas', isCorrect: false }
              ]
            },
            { id: 10, question: "Quel label Jay-Z a fondé en 2008 ?", answers: [
                { id: '1', text: 'Def Jam', isCorrect: false },
                { id: '2', text: 'Bad Boy Records', isCorrect: false },
                { id: '3', text: 'Roc Nation', isCorrect: true },
                { id: '4', text: 'Aftermath Entertainment', isCorrect: false },
                { id: '5', text: 'Cash Money Records', isCorrect: false },
                { id: '6', text: 'Young Money', isCorrect: false },
                { id: '7', text: 'Top Dawg Entertainment', isCorrect: false },
                { id: '8', text: 'Dreamville', isCorrect: false },
                { id: '9', text: 'OVO Sound', isCorrect: false },
                { id: '10', text: 'GOOD Music', isCorrect: false }
              ]
            }
          ],
          "18+": [
            {
                id: 1,
                question: "Qui est la personne présente sur cette image ?",
                image: "https://cdn.tv-programme.com/photos/adriana-chechik_people_10_102280_1200.webp",
                answers: [
                    { id: '1', text: 'Abella Danger', isCorrect: true },
                    { id: '2', text: 'Mia Malkova', isCorrect: false },
                    { id: '3', text: 'Lana Rhoades', isCorrect: false },
                    { id: '4', text: 'Kendra Lust', isCorrect: false },
                    { id: '5', text: 'Riley Reid', isCorrect: false },
                    { id: '6', text: 'Adriana Chechik', isCorrect: false },
                    { id: '7', text: 'Angela White', isCorrect: false },
                    { id: '8', text: 'Eva Lovia', isCorrect: false },
                    { id: '9', text: 'Jenna Jameson', isCorrect: false },
                    { id: '10', text: 'Tori Black', isCorrect: false }
                ]
            },
            {
                id: 2,
                question: "Quelle actrice a remporté le plus de prix AVN en 2023 ?",
                answers: [
                    { id: '1', text: 'Gianna Dior', isCorrect: true },
                    { id: '2', text: 'Emily Willis', isCorrect: false },
                    { id: '3', text: 'Violet Myers', isCorrect: false },
                    { id: '4', text: 'Kenzie Reeves', isCorrect: false },
                    { id: '5', text: 'Lana Rhoades', isCorrect: false },
                    { id: '6', text: 'Mia Malkova', isCorrect: false },
                    { id: '7', text: 'Riley Reid', isCorrect: false },
                    { id: '8', text: 'Adriana Chechik', isCorrect: false },
                    { id: '9', text: 'Angela White', isCorrect: false },
                    { id: '10', text: 'Eva Lovia', isCorrect: false }
                ]
            },
            {
                id: 3,
                question: "Quel est le nom du studio de production fondé par James Deen ?",
                answers: [
                    { id: '1', text: 'Deen Digital', isCorrect: true },
                    { id: '2', text: 'James Productions', isCorrect: false },
                    { id: '3', text: 'Deen Studios', isCorrect: false },
                    { id: '4', text: 'James Entertainment', isCorrect: false },
                    { id: '5', text: 'Digital Dreams', isCorrect: false },
                    { id: '6', text: 'Virtual Vixens', isCorrect: false },
                    { id: '7', text: 'Online Obsession', isCorrect: false },
                    { id: '8', text: 'Cyber Studios', isCorrect: false },
                    { id: '9', text: 'Digital Entertainment', isCorrect: false },
                    { id: '10', text: 'Virtual Studios', isCorrect: false }
                ]
            },
            {
                id: 4,
                question: "Quelle actrice a joué dans \"The Deuce\" sur HBO ?",
                answers: [
                    { id: '1', text: 'Sasha Grey', isCorrect: true },
                    { id: '2', text: 'Jenna Jameson', isCorrect: false },
                    { id: '3', text: 'Tori Black', isCorrect: false },
                    { id: '4', text: 'Riley Reid', isCorrect: false },
                    { id: '5', text: 'Mia Malkova', isCorrect: false },
                    { id: '6', text: 'Lana Rhoades', isCorrect: false },
                    { id: '7', text: 'Adriana Chechik', isCorrect: false },
                    { id: '8', text: 'Angela White', isCorrect: false },
                    { id: '9', text: 'Eva Lovia', isCorrect: false },
                    { id: '10', text: 'Gianna Dior', isCorrect: false }
                ]
            },
            {
                id: 5,
                question: "Quel est le nom du premier film X à avoir remporté un Oscar ?",
                answers: [
                    { id: '1', text: "Aucun film X n'a jamais remporté d'Oscar", isCorrect: true },
                    { id: '2', text: 'Deep Throat', isCorrect: false },
                    { id: '3', text: 'Behind the Green Door', isCorrect: false },
                    { id: '4', text: 'The Devil in Miss Jones', isCorrect: false },
                    { id: '5', text: 'Boogie Nights', isCorrect: false },
                    { id: '6', text: 'The People vs. Larry Flynt', isCorrect: false },
                    { id: '7', text: 'Lovelace', isCorrect: false },
                    { id: '8', text: 'The Notorious Bettie Page', isCorrect: false },
                    { id: '9', text: 'The Girl Next Door', isCorrect: false },
                    { id: '10', text: 'The Brown Bunny', isCorrect: false }
                ]
            },
            {
                id: 6,
                question: "Quelle actrice a fondé le site web \"Fleshbot\" ?",
                answers: [
                    { id: '1', text: 'Stoya', isCorrect: true },
                    { id: '2', text: 'Asa Akira', isCorrect: false },
                    { id: '3', text: 'Belladonna', isCorrect: false },
                    { id: '4', text: 'Jenna Haze', isCorrect: false },
                    { id: '5', text: 'Sasha Grey', isCorrect: false },
                    { id: '6', text: 'Tori Black', isCorrect: false },
                    { id: '7', text: 'Riley Reid', isCorrect: false },
                    { id: '8', text: 'Mia Malkova', isCorrect: false },
                    { id: '9', text: 'Lana Rhoades', isCorrect: false },
                    { id: '10', text: 'Adriana Chechik', isCorrect: false }
                ]
            },
            {
                id: 7,
                question: "Quel est le nom du premier film X à avoir été diffusé en streaming ?",
                answers: [
                    { id: '1', text: 'Cyberella', isCorrect: true },
                    { id: '2', text: 'Digital Dreams', isCorrect: false },
                    { id: '3', text: 'Virtual Vixens', isCorrect: false },
                    { id: '4', text: 'Online Obsession', isCorrect: false },
                    { id: '5', text: 'Web Dreams', isCorrect: false },
                    { id: '6', text: 'Digital Fantasy', isCorrect: false },
                    { id: '7', text: 'Virtual Reality', isCorrect: false },
                    { id: '8', text: 'Online Fantasy', isCorrect: false },
                    { id: '9', text: 'Web Reality', isCorrect: false },
                    { id: '10', text: 'Digital Reality', isCorrect: false }
                ]
            },
            {
                id: 8,
                question: "Quelle actrice a écrit le livre \"How to Make Love Like a Porn Star\" ?",
                answers: [
                    { id: '1', text: 'Jenna Jameson', isCorrect: true },
                    { id: '2', text: 'Tera Patrick', isCorrect: false },
                    { id: '3', text: 'Jesse Jane', isCorrect: false },
                    { id: '4', text: 'Sunny Leone', isCorrect: false },
                    { id: '5', text: 'Sasha Grey', isCorrect: false },
                    { id: '6', text: 'Tori Black', isCorrect: false },
                    { id: '7', text: 'Riley Reid', isCorrect: false },
                    { id: '8', text: 'Mia Malkova', isCorrect: false },
                    { id: '9', text: 'Lana Rhoades', isCorrect: false },
                    { id: '10', text: 'Adriana Chechik', isCorrect: false }
                ]
            },
            {
                id: 9,
                question: "Quel est le nom du premier site web de contenu adulte à avoir été coté en bourse ?",
                answers: [
                    { id: '1', text: 'Private Media Group', isCorrect: true },
                    { id: '2', text: 'Playboy Enterprises', isCorrect: false },
                    { id: '3', text: 'MindGeek', isCorrect: false },
                    { id: '4', text: 'Vivid Entertainment', isCorrect: false },
                    { id: '5', text: 'Digital Playground', isCorrect: false },
                    { id: '6', text: 'Wicked Pictures', isCorrect: false },
                    { id: '7', text: 'Evil Angel', isCorrect: false },
                    { id: '8', text: 'Hustler', isCorrect: false },
                    { id: '9', text: 'Penthouse', isCorrect: false },
                    { id: '10', text: 'Adult Entertainment', isCorrect: false }
                ]
            },
            {
                id: 10,
                question: "Quelle actrice a remporté le plus de prix XBIZ en 2023 ?",
                answers: [
                    { id: '1', text: 'Violet Myers', isCorrect: true },
                    { id: '2', text: 'Kenzie Reeves', isCorrect: false },
                    { id: '3', text: 'Gianna Dior', isCorrect: false },
                    { id: '4', text: 'Emily Willis', isCorrect: false },
                    { id: '5', text: 'Lana Rhoades', isCorrect: false },
                    { id: '6', text: 'Mia Malkova', isCorrect: false },
                    { id: '7', text: 'Riley Reid', isCorrect: false },
                    { id: '8', text: 'Adriana Chechik', isCorrect: false },
                    { id: '9', text: 'Angela White', isCorrect: false },
                    { id: '10', text: 'Eva Lovia', isCorrect: false }
                ]
            }
          ]
    }
}

module.exports = data;