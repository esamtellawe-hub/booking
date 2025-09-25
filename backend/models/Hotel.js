module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      numOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bookingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      coverImage: {
        type: DataTypes.STRING,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Hotel",
      timestamps: false,
    }
  );
  Hotel.associate = (db) => {
    Hotel.belongsTo(db.User, { foreignKey: "manager_id" });
    Hotel.hasMany(db.Room, { foreignKey: "hotel_id" });
    Hotel.hasMany(db.Media, { foreignKey: "hotel_id" });
  };
  return Hotel;
};
