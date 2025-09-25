module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
        defaultValue: "PENDING",
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "Booking",
      timestamps: false,
    }
  );
  Booking.associate = (db) => {
    Booking.belongsTo(db.User, { foreignKey: "user_id" });
    Booking.belongsTo(db.Room, { foreignKey: "room_id" });
  };
  return Booking;
};
