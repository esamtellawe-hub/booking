module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("IMAGE", "VIDEO"),
        defaultValue: "IMAGE",
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Media",
      timestamps: false,
    }
  );
  Media.associate = (db) => {
    // Media.belongsTo(db.User, { foreignKey: "uploaded_by" });
    Media.belongsTo(db.Hotel, { foreignKey: "hotel_id" });
    Media.belongsTo(db.Room, { foreignKey: "room_id" });
  };
  return Media;
};
