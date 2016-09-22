import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Recipe from './Recipe';
import SharedRecipe from './SharedRecipe';
import RecipeHistory from './RecipeHistory';
import RecipeGrain from './RecipeGrain';
import RecipeHop from './RecipeHop';
import RecipeYeast from './RecipeYeast';
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
Recipe.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
User.hasMany(Recipe, { as: 'recipes', foreignKey: 'ownerId' });

// User <- SharedRecipe -> Recipe
Recipe.belongsToMany(User, { through: SharedRecipe, as: 'sharedUsers', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: SharedRecipe, as: 'sharedRecipes', foreignKey: 'userId'  });

// User <- RecipeHistory -> Recipe
Recipe.belongsToMany(User, { through: RecipeHistory, as: 'userActions', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: RecipeHistory, as: 'recipeActions', foreignKey: 'userId' });

// Recipe <- RecipeGrain -> Grain
Recipe.belongsToMany(Grain, { through: RecipeGrain, as: 'grains', foreignKey: 'recipeId' });
Grain.belongsToMany(Recipe, { through: RecipeGrain, as: 'recipes', foreignKey: 'grainId' });

// Recipe <- RecipeHop -> Hop
Recipe.belongsToMany(Hop, { through: RecipeHop, as: 'hopAdditions', foreignKey: 'recipeId' });
Hop.belongsToMany(Recipe, { through: RecipeHop, as: 'recipes', foreignKey: 'hopId' });

// Recipe <- RecipeYeast -> Yeast
Recipe.belongsToMany(Yeast, { through: RecipeYeast, as: 'yeast', foreignKey: 'recipeId' });
Yeast.belongsToMany(Recipe, { through: RecipeYeast, as: 'recipes', foreignKey: 'yeastId' });

function sync(...args) {
  if (process.env.NODE_ENV !== 'production') {
    //return sequelize.sync(...args)
    let currentIngredientId = 0;
    return sequelize.sync(Object.assign({}, args, { force: false }));
      /*
            .then(() => {
              return User.findOrCreate({
                where: {
                  id: 'c42ccdc0-806d-11e6-a049-657457c8144e',
                  email: 'andyghaynes@gmail.com',
                  emailConfirmed: true
                }
              });
            }).then(() => {
              return Grain.bulkCreate(Ingredients.filter(i => i.ingredientType === 1).map(grain => ({
                name: grain.name,
                category: grain.category,
                gravity: grain.gravity,
                lovibond: grain.lovibond,
                description: grain.description
              })));
            }).then(() => {
              return Hop.bulkCreate(Ingredients.filter(i => i.ingredientType === 2).map(hop => ({
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
export {
  User,
  UserLogin,
  UserClaim,
  UserProfile,
  Recipe,
  SharedRecipe,
  RecipeGrain,
  RecipeHop,
  RecipeYeast,
  Grain,
  Hop,
  Yeast
};