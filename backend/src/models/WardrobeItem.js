

import { sequelize} from '../config/neondb.js';
import { DataTypes } from 'sequelize';


const WardrobeItem = sequelize.define(
  'WardrobeItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    class_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color_primary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color_secondary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fabric_guess: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    texture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neck_style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sleeves: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    length: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    style_category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occasion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ethnic_vs_western: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 1,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'wardrobe_items',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  }
);

export default WardrobeItem;

