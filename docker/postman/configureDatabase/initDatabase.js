load('/docker-entrypoint-initdb.d/pokemonsDataToBePersisted.js');

const DATABASE_NAME = 'ddialar-pokemon-postman';

const apiDatabases = [
  {
    dbName: DATABASE_NAME,
    dbUsers: [
      {
        username: 'pokemonpostman',
        password: 'pokemonpostman',
        roles: [
          {
            role: 'readWrite',
            db: DATABASE_NAME,
          },
        ],
      },
    ],
    dbData: [
      {
        collection: 'Pokemon',
        data: pokemonsDataToBePersisted,
      },
    ],
  },
];

const collections = {
  Pokemon: (db, pokemonData) => db.Pokemon.insert(pokemonData),
};

const createDatabaseUsers = (db, dbName, users) => {
  users.map(dbUserData => {
    print(
      `[TRACE] Creating new user '${dbUserData.username}' into the '${dbName}' database...`,
    );

    db.createUser({
      user: dbUserData.username,
      pwd: dbUserData.password,
      roles: dbUserData.roles,
    });

    print(
      `[INFO ] The user '${dbUserData.username}' has been created successfully.`,
    );
  });
};

const populateDatabase = (db, data) => {
  if (data !== null && data.length > 0) {
    data.map(setOfData => {
      print(
        `[TRACE] Persisting data of collection '${setOfData.collection}'...`,
      );
      setOfData.data.map(document =>
        collections[setOfData.collection](db, document),
      );
    });
  }
};

try {
  apiDatabases.map(database => {
    const {dbName, dbUsers, dbData} = database;

    db = db.getSiblingDB(dbName);

    print(`[TRACE] Switching to '${dbName}' database...`);
    createDatabaseUsers(db, dbName, dbUsers);
    populateDatabase(db, dbData);
  });
} catch ({message}) {
  print(`[ERROR ] ${message}`);
}
