import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Recipe from './Recipe';
import SharedRecipe from './SharedRecipe';
import RecipeHistory from './RecipeHistory';
import CustomIngredient from './CustomIngredient';
import RecipeIngredient from './RecipeIngredient';
import Ingredient from './Ingredient';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

// User <-> Recipe
Recipe.belongsTo(User, { as: 'Owner', foreignKey: 'ownerId' });
User.hasMany(Recipe, { as: 'Recipes', foreignKey: 'ownerId' });

// User <- SharedRecipe -> Recipe
Recipe.belongsToMany(User, { through: SharedRecipe, as: 'SharedUsers', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: SharedRecipe, as: 'SharedRecipes', foreignKey: 'userId'  });

// User <- RecipeHistory -> Recipe
Recipe.belongsToMany(User, { through: RecipeHistory, as: 'UserActions', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: RecipeHistory, as: 'RecipeActions', foreignKey: 'userId' });

// Recipe <- RecipeIngredient -> Ingredient
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, as: 'Ingredients', foreignKey: 'recipeId' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, as: 'Recipes', foreignKey: 'ingredientId' });

// User <- CustomIngredient -> Ingredient
User.belongsToMany(Ingredient, { through: CustomIngredient, as: 'CustomIngredients', foreignKey: 'userId' });
Ingredient.belongsToMany(User, { through: CustomIngredient, as: 'UserOverrides', foreignKey: 'ingredientId' });

function sync(...args) {
  if (process.env.NODE_ENV !== 'production') {
    return sequelize.sync(...args)
            .then(() => {
              return User.findOrCreate({
                where: {
                  id: 'cc845b20-798b-11e6-8a74-99d691d2ae33',
                  email: 'andyghaynes@gmail.com',
                  emailConfirmed: true
              }});
            });
  } else {
    return sequelize.sync(...args);
  }
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile, Recipe, SharedRecipe };
