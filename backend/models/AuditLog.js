module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    "AuditLog",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      action: {
        type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM(
          "HOTEL",
          "ROOM",
          "BOOKING",
          "COUPON",
          "MEDIA",
          "USER"
        ),
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      performed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      details: {
        type: DataTypes.TEXT,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "AuditLog",
      timestamps: false,
    }
  );
  AuditLog.associate = (db) => {
    AuditLog.belongsTo(db.User, { foreignKey: "performed_by" });
  };
  return AuditLog;
};
