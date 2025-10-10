import { sequelize, User, Event } from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "12345678",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "12345678",
    },
    {
      name: "Jane Doe",
      email: "Jae@example.com",
      password: "12345678",
    },
  ];

  const events = [
    {
      title: "Summer Festival",
      description: "A fun summer festival with music and food",
      date: new Date("2025-06-20T11:00:00"),
      location: "Central Park",
      latitude: 40.785091,
      longitude: -73.968285,
      organizerId: 1,
      image:
        "https://cityparksfoundation.org/wp-content/uploads/2025/04/6.15.24_SummerStage_AussieBBQ_CentralPark_MerissaBlitz298-scaled-1-1.webp",
    },
    {
      title: "Tech Conference",
      description: "A conference about the latest in tech",
      date: new Date("2025-11-10T09:00:00"),
      location: "Convention Center",
      latitude: 37.774929,
      longitude: -122.419418,
      organizerId: 2,
      image:
        "https://skift.com/wp-content/uploads/2014/04/SwissTechCC-Lausanne.jpg",
    },
    {
      title: "Oktoberfest",
      description:
        "A traditional German beer festival held annually in Munich.",
      date: new Date("2024-09-21"),
      location: "Theresienwiese, Munich",
      latitude: 48.131271,
      longitude: 11.549669,
      organizerId: 1,
      image:
        "https://rp-online.de/imgs/32/2/4/3/8/1/2/1/1/9/tok_ed203074f96d695e31cfc6e8aefc8a72/w2048_h1203_x1024_y601_DPA_dpa_urn_newsml_dpa.com_20090101_250920-911-006531-v4-s2048-837e47b13b837355.jpeg",
    },
    {
      title: "Berlin Marathon",
      description:
        "One of the world’s largest and most popular marathons held annually in Berlin.",
      date: new Date("2024-09-29T09:15:00"),
      location: "Brandenburg Gate, Berlin",
      latitude: 52.516275,
      longitude: 13.377704,
      organizerId: 3,
      image:
        "https://norqain.it/cdn/shop/files/Partnership_Hero_BMW_Marathon.jpg?v=1692815357&width=2500",
    },
    {
      title: "Christmas Market",
      description:
        "A traditional German Christmas market held in the heart of Dortmund.",
      date: new Date("2025-12-01"),
      location: "Borsigplatz, Dortmund",
      latitude: 51.5233644,
      longitude: 7.399296,
      organizerId: 3,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/8a/7d/25/caption.jpg?w=1200&h=-1&s=1",
    },
    {
      title: "76th Berlin International Film Festival (Berlinale)",
      description:
        "One of the world's leading film festivals, premiering thousands of films and attracting global celebrities.",
      date: new Date("2026-02-12T19:00:00"),
      location: "Potsdamer Platz, Berlin",
      latitude: 52.5098,
      longitude: 13.3752,
      organizerId: 3,
      image:
        "https://www.deutschland.de/sites/default/files/media/image/-c-sandra-weller-berlinale-2024-2-.jpg",
    },
    {
      title: "Cologne Carnival: Rose Monday Parade",
      description:
        "The peak of the 'fifth season' in the Rhineland, featuring the largest parade with floats, music, and throwing of sweets (Kamelle).",
      date: new Date("2026-02-16T10:00:00"),
      location: "Innenstadt (City Center), Cologne",
      latitude: 50.9375,
      longitude: 6.9603,
      organizerId: 1,
      image:
        "https://www.consultancy.eu/illustrations/news/spotlight/2020-02-24-110432150-Cologne-carnival.jpg",
    },
    {
      title: "Hannover Messe 2026",
      description:
        "The world's leading trade fair for industrial technology, showcasing innovations in automation, energy, and digital ecosystems.",
      date: new Date("2026-04-20T09:00:00"),
      location: "Messegelände, Hannover",
      latitude: 52.3275,
      longitude: 9.8077,
      organizerId: 2,
      image:
        "https://packaging-journal.de/wp-content/uploads/2024/04/hannover-messe-24.jpg",
    },
    {
      title: "Stuttgart Spring Festival (Frühlingsfest)",
      description:
        "A major spring festival on the Cannstatter Wasen featuring beer tents, carnival rides, and traditional Swabian food.",
      date: new Date("2026-04-18T12:00:00"),
      location: "Cannstatter Wasen, Stuttgart",
      latitude: 48.7997,
      longitude: 9.2227,
      organizerId: 3,
      image:
        "https://militaryingermany.com/wp-content/uploads/2018/02/433520278_FooTToo.jpg",
    },
    {
      title: "Open Day: Signal Iduna Park",
      description:
        "Visit the worlds greatest stadion, located in Dortmund- Germany.",
      date: new Date("2026-05-09T15:30:00"),
      location: "Signal Iduna Park, Dortmund",
      latitude: 51.4928271,
      longitude: 7.4518975,
      organizerId: 3,
      image: "https://www.signal-iduna-park.de/m/i/27/14d182f.jpeg",
    },
    {
      title: "Rhein in Flammen (Rhine in Flames) - Rüdesheim/Bingen",
      description:
        "A spectacular annual event featuring a massive fireworks display over the Rhine river, viewed by a convoy of illuminated ships.",
      date: new Date("2026-07-04T22:00:00"),
      location: "Rhine River, near Rüdesheim am Rhein",
      latitude: 49.988,
      longitude: 7.936,
      organizerId: 1,
      image:
        "https://www.rhein-in-flammen.com/images/presse/koblenzer-sommerfest-rhein-in-flammen-2024-jm401000.jpg",
    },
    {
      title: "Frankfurt Book Fair 2026",
      description:
        "The world's largest trade fair for books, attracting publishers, authors, and literary fans globally. Guest of Honour: Czechia.",
      date: new Date("2026-10-07T10:00:00"),
      location: "Messe Frankfurt, Frankfurt am Main",
      latitude: 50.1067,
      longitude: 8.6417,
      organizerId: 3,
      image:
        "https://chytomo.com/wp-content/uploads/2022/09/was-ist-die-messe-ohne.jpg",
    },
    {
      title: "Hamburg Harbor Birthday (Hafengeburtstag) Opening",
      description:
        "The opening weekend of the world's largest harbor festival, featuring ship parades, tugboat ballets, and music along the Elbe river.",
      date: new Date("2026-05-08T14:00:00"),
      location: "Landungsbrücken, Hamburg Port",
      latitude: 53.5463,
      longitude: 9.9678,
      organizerId: 1,
      image:
        "https://www.hamburgcruisedays.de/wp-content/uploads/2018/08/parade.jpg",
    },
    {
      title: "Aachen Christmas Market Opening Day",
      description:
        "The opening of one of Germany's most famous Christmas markets, known for its atmosphere around the UNESCO World Heritage Cathedral.",
      date: new Date("2026-11-20T17:00:00"),
      location: "Aachener Dom (Cathedral Square), Aachen",
      latitude: 50.7742,
      longitude: 6.0838,
      organizerId: 2,
      image: "https://aachenweihnachtsmarkt.de/assets/images/header_neu.jpg",
    },
    // {
    //   title: "The Ultimate Insult Sword Fighting Tournament",
    //   description:
    //     "Witness the clash of wits as participants trade hilariously specific insults for glory. No actual swords allowed.",
    //   date: new Date("2026-07-28T14:00:00"),
    //   location: "Mêlée Island™ Convention Hall",
    //   latitude: 18.2321,
    //   longitude: -66.5901,
    //   organizerId: 1,
    //   image:
    //     "https://image.api.playstation.com/vulcan/ap/rnd/202210/1918/l2UbmPQCGx53KdULPA4XDZsK.jpg",
    // },
    // {
    //   title: "Doomguy's Annual Plant-Nurturing Seminar",
    //   description:
    //     "Learn to lovingly tend to your prize-winning ferns. Chainsaws and plasma rifles strictly prohibited (they scare the petunias).",
    //   date: new Date("2026-04-20T10:00:00"),
    //   location: "Greenhouse on Mars Station Alpha",
    //   latitude: 4.5899,
    //   longitude: 137.957,
    //   organizerId: 3,
    //   image: "https://cdn.mos.cms.futurecdn.net/6sN8TTRmVYunJAbhzAhZgL.jpg",
    // },
    // {
    //   title: "Leisure Suit Larry's Advanced Etiquette & Social Skills Seminar",
    //   description:
    //     "An intensive training on sophisticated conversation and avoiding being dumped by the entire bar. Includes a section on appropriate leisure suit fabrics.",
    //   date: new Date("2026-02-09T17:00:00"),
    //   location: "The Sincere Dating Conference Center",
    //   latitude: 51.5074,
    //   longitude: -0.1278,
    //   organizerId: 3,
    //   image:
    //     "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/765870/header.jpg?t=1728901767", // Inspired by: Leisure Suit Larry
    // },
    // {
    //   title: "The Great 'E' Key Scavenger Hunt",
    //   description:
    //     "A frantic, first-person-view race to press the 'use' key on a series of ambiguously interactable objects. May involve mild clipping through walls.",
    //   date: new Date("2026-01-13T16:30:00"),
    //   location: "Abandoned Research Facility, Level 7",
    //   latitude: 36.7783,
    //   longitude: -119.4179,
    //   organizerId: 1,
    //   image: "https://m.media-amazon.com/images/I/71-0O+5Cf6L._AC_SL1440_.jpg",
    // },
    // {
    //   title: "Three-Headed Monkey Sightings & Q&A",
    //   description:
    //     "Is it really there? Join our panel of expert crypto-zoologists who have never found it, to discuss if it might be a distraction.",
    //   date: new Date("2026-09-01T19:00:00"),
    //   location: "Circus Tent near the Voodoo Lady's House",
    //   latitude: 27.9944,
    //   longitude: -81.7603,
    //   organizerId: 3,
    //   image:
    //     "https://image.api.playstation.com/vulcan/ap/rnd/202210/1918/l2UbmPQCGx53KdULPA4XDZsK.jpg",
    // },
    // {
    //   title: "The BFG (Big Friendly Giant) Knitting Circle",
    //   description:
    //     "A relaxed evening focused on oversized yarn and even bigger scarves. No projectiles. RSVP for the chunky needles.",
    //   date: new Date("2026-02-05T18:00:00"),
    //   location: "The Local Yarn Store & Arena",
    //   latitude: 51.509865,
    //   longitude: -0.118092,
    //   organizerId: 2,
    //   image:
    //     "https://images.cgames.de/images/gamestar/287/doom-3-bfg-edition_2348257.jpg",
    // },
    // {
    //   title: "The Sim's Annual Ladder-Swimming Championships",
    //   description:
    //     "A thrilling event where contestants attempt to exit a pool without the use of a ladder. The prize is a decorative plumbob. No cheating via 'motherlode'.",
    //   date: new Date("2026-07-19T13:00:00"),
    //   location: "The Community Center Public Pool",
    //   latitude: 33.749,
    //   longitude: -84.388,
    //   organizerId: 3,
    //   image:
    //     "https://cdn.sortiraparis.com/images/80/88384/1174741-les-sims-4-nature-enchantee.jpg",
    // },
    // {
    //   title: "IDDQD Cheat Code Meditation Hour",
    //   description:
    //     "A zen session focused on feeling momentarily invincible. We'll chant the code until we achieve inner peace (or invulnerability).",
    //   date: new Date("2026-01-05T07:00:00"),
    //   location: "The Silent Monastery, Hidden Hills",
    //   latitude: 40.73061,
    //   longitude: -73.935242,
    //   organizerId: 2,
    //   image:
    //     "https://assets.gamerprofiles.com/game/G9J8/game_G9J8_profilebanner.webp",
    // },
    // {
    //   title: "How to Hold Your Breath Underwater for 10 Minutes Challenge",
    //   description:
    //     "A demonstration by an 'expert' on impossible diving techniques. Disclaimer: Do not try this at home. Or here.",
    //   date: new Date("2025-10-18T11:00:00"),
    //   location: "The Deep Sea Adventure Aquarium",
    //   latitude: 32.8801,
    //   longitude: -117.234,
    //   organizerId: 1,
    //   image:
    //     "https://gpstatic.com/acache/28/11/1/de/s10-32b35a8ffa00c039400a7dde5fe7a227.jpg",
    // },

    // {
    //   title: "90s Shareware Demo Disc Film Festival",
    //   description:
    //     "A nostalgic viewing of five-minute game demos and mind-blowing 3D rendering tests. The first 100 get a free floppy disk.",
    //   date: new Date("2026-02-14T20:00:00"),
    //   location: "The Abandoned Computer Lab",
    //   latitude: 37.773972,
    //   longitude: -122.431297,
    //   organizerId: 1,
    //   image: "https://example.com/placeholder/shareware_fest.jpg",
    // },

    // {
    //   title: "The 'Get a Job' Career Fair",
    //   description:
    //     "Tired of being a legendary figure? Meet recruiters offering stable, boring jobs like 'File Clerk' and 'Mushroom Inspector'.",
    //   date: new Date("2026-01-28T10:00:00"),
    //   location: "The Office Park of Despair",
    //   latitude: 41.8781,
    //   longitude: -87.6298,
    //   organizerId: 2,
    //   image:
    //     "https://image.api.playstation.com/vulcan/ap/rnd/202210/1918/l2UbmPQCGx53KdULPA4XDZsK.jpg",
    // },
    // {
    //   title: "The Inflatable Lifeboat and Compass Repair Seminar",
    //   description:
    //     "Learn the crucial skill of fixing a rubber raft with duct tape and making a compass point to something useful for once.",
    //   date: new Date("2026-10-10T11:30:00"),
    //   location: "The Seaside Nautical School",
    //   latitude: 51.4545,
    //   longitude: -2.5879,
    //   organizerId: 1,
    //   image: "https://example.com/placeholder/lifeboat_repair.jpg",
    // },
  ];

  await User.bulkCreate(users, { individualHooks: true });
  await Event.bulkCreate(events, { individualHooks: true });
};

try {
  await seedDB();
  console.log("Database seeded");
} catch (error) {
  console.error({ error });
} finally {
  sequelize.close();
  console.log("Database connection closed");
}
