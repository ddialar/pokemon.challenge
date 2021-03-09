load('/docker-entrypoint-initdb.d/usersDataToBePersisted.js');
load('/docker-entrypoint-initdb.d/pokemonsDataToBePersisted.js');

const apiDatabases = [
  {
    dbName: 'ddialar-pokemon-dev',
    dbUsers: [
      {
        username: 'pokemondev',
        password: 'pokemondev',
        roles: ['readWrite', 'dbAdmin'],
      },
    ],
    dbData: [
      {
        collection: 'User',
        data: usersDataToBePersisted,
      },
      {
        collection: 'Pokemon',
        data: pokemonsDataToBePersisted,
      },
    ],
  },
];

const collections = {
  User: (db, userData) => db.User.insert(userData),
  Pokemon: (db, pokemonData) => db.Pokemon.insert(pokemonData),
};

const createDatabaseUsers = (db, dbName, users) => {
  users.map(dbUserData => {
    print(
      `[TRACE] Creating new user '${dbUserData.username}' into the '${dbName}' database...`,
    );

    const roles = dbUserData.roles.reduce((previousValue, role) => {
      const roleDefinition = {
        role,
        db: dbName,
      };

      previousValue.push(roleDefinition);
      return previousValue;
    }, []);

    db.createUser({
      user: dbUserData.username,
      pwd: dbUserData.password,
      roles,
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
