module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("SINGLE", "DOUBLE", "SUITE", "FAMILY"),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      dateCreated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      dateUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Room",
      timestamps: false,
    }
  );
  Room.associate = (db) => {
    Room.belongsTo(db.Hotel, { foreignKey: "hotel_id" });
    Room.hasMany(db.Booking, { foreignKey: "room_id" });
    Room.hasMany(db.Media, { foreignKey: "room_id" });
  };
  return Room;
};
