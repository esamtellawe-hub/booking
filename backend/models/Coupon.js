module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discountType: {
        type: DataTypes.ENUM("PERCENT", "FIXED"),
        allowNull: false,
      },
      discountValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxUsage: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: "Coupon",
      timestamps: false,
    }
  );

  return Coupon;
};
