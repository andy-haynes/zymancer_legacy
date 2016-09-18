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
import Grain from './Grain';
import Hop from './Hop';
import Yeast from './Yeast';

import Ingredients from '../../constants/TestIngredients';

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

Grain.belongsTo(Ingredient, { as: 'Ingredient', foreignKey: 'ingredientId' });
Hop.belongsTo(Ingredient, { as: 'Ingredient', foreignKey: 'ingredientId' });
Yeast.belongsTo(Ingredient, { as: 'Ingredient', foreignKey: 'ingredientId' });

function sync(...args) {
  if (process.env.NODE_ENV !== 'production') {
    //return sequelize.sync(...args)
    let currentIngredientId = 0;
    return sequelize.sync(Object.assign({}, args, { force: false }));
    /*
            .then(() => {
              return User.findOrCreate({
                where: {
                  id: 'cc845b20-798b-11e6-8a74-99d691d2ae33',
                  email: 'andyghaynes@gmail.com',
                  emailConfirmed: true
              }});
            }).then(() => Ingredient.bulkCreate(Ingredients.map(({ ingredientType }) => ({ ingredientType })))
            ).then(() => {
              return Grain.bulkCreate(Ingredients.filter(i => i.ingredientType === 1).map(grain => ({
                ingredientId: ++currentIngredientId,
                name: grain.name,
                category: grain.category,
                gravity: grain.gravity,
                lovibond: grain.lovibond,
                description: grain.description
              })));
            }).then(() => {
              return Hop.bulkCreate(Ingredients.filter(i => i.ingredientType === 2).map(hop => ({
                ingredientId: ++currentIngredientId,
                name: hop.name,
                aroma: hop.aroma.join(','),
                categories: hop.categories.join(','),
                url: hop.url,
                alpha: hop.alpha,
                beta: hop.beta,
                coHumulone: hop.coHumulone,
                totalOil: hop.totalOil,
                myrcene: hop.myrcene,
                caryophyllene: hop.caryophyllene,
                farnesene: hop.farnesene,
                humulene: hop.humulene,
                geraniol: hop.geraniol
              })));
            }).then(() => {
              return Yeast.bulkCreate(Ingredients.filter(i => i.ingredientType === 3).map(yeast => ({
                ingredientId: ++currentIngredientId,
                name: yeast.name,
                code: yeast.code,
                url: yeast.url,
                description: yeast.description,
                flocculation: yeast.flocculation,
                rangeF: yeast.rangeF,
                rangeC: yeast.rangeC,
                tolerance: yeast.tolerance,
                attenuation: yeast.attenuation,
                mfg: yeast.mfg,
                styles: yeast.styles.join(',')
              })));
            });
            */
  } else {
    return sequelize.sync(...args);
  }
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile, Recipe, SharedRecipe, Grain, Hop, Yeast, Ingredient };
