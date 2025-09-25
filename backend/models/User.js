module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      email: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "MANAGER", "USER"),
        defaultValue: "USER",
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );
  User.associate = (db) => {
    User.hasMany(db.Booking, { foreignKey: "user_id" });
    User.hasMany(db.Hotel, { foreignKey: "manager_id" });
    User.hasMany(db.Media, { foreignKey: "uploaded_by" });
    User.hasMany(db.AuditLog, { foreignKey: "performed_by" });
  };
  return User;
};
