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
import MashSchedule from './MashSchedule';
import RecipeFermentation from './RecipeFermentation';
import BJCPCategory from './BJCPCategory';
import BJCPStyle from './BJCPStyle';
import flatten from 'lodash/flatten';
import pick from 'lodash/pick';

import Ingredients from '../../constants/TestIngredients';
import bjcp from '../../constants/bjcp';
import zymath from '../../utils/zymath';
import helpers from '../../utils/helpers';

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

// Recipe -> Style
Recipe.belongsTo(BJCPStyle, { as: 'style', foreignKey: 'styleId' });

// User <- SharedRecipe -> Recipe
Recipe.belongsToMany(User, { through: SharedRecipe, as: 'sharedUsers', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: SharedRecipe, as: 'sharedRecipes', foreignKey: 'userId' });

// User <- RecipeHistory -> Recipe
Recipe.belongsToMany(User, { through: RecipeHistory, as: 'userActions', foreignKey: 'recipeId' });
User.belongsToMany(Recipe, { through: RecipeHistory, as: 'recipeActions', foreignKey: 'userId' });

// Recipe <- RecipeGrain -> Grain
Recipe.belongsToMany(Grain, { through: { model: RecipeGrain, unique: false }, as: 'grains', foreignKey: 'recipeId' });
Grain.belongsToMany(Recipe, { through: { model: RecipeGrain, unique: false }, as: 'recipes', foreignKey: 'grainId' });

// Recipe <- RecipeHop -> Hop
Recipe.belongsToMany(Hop, { through: { model: RecipeHop }, as: 'hopAdditions', foreignKey: 'recipeId' });
Hop.belongsToMany(Recipe, { through: { model: RecipeHop }, as: 'recipes', foreignKey: 'hopId' });

// Recipe <- RecipeYeast -> Yeast
Recipe.belongsToMany(Yeast, { through: { model: RecipeYeast, unique: false }, as: 'yeast', foreignKey: 'recipeId' });
Yeast.belongsToMany(Recipe, { through: { model: RecipeYeast, unique: false }, as: 'recipes', foreignKey: 'yeastId' });

// why does't this work when the sources are reversed and 'belongsTo' is used?
Recipe.hasOne(MashSchedule, { as: 'mashSchedule', foreignKey: 'recipeId' });
Recipe.hasOne(RecipeFermentation, { as: 'fermentation', foreignKey: 'recipeId' });

BJCPStyle.belongsTo(BJCPCategory, { as: 'category', foreignKey: 'categoryId' });

function sync(...args) {
  if (process.env.NODE_ENV !== 'production') {
    const clean = false;

    if (!clean) {
      return sequelize.sync(...args);
    } else {
      const users = [{
        id: 'c17bd4a0-8288-11e6-9448-dd60cdc5f340',
        email: 'andyghaynes@gmail.com',
        claims: [{
          name: 'google',
          key: '112708624366974007964'
        }],
        logins: [{
          type: 'urn:google:access_token',
          value: 'ya29.CjBoA4VfDDBaobEg88kaAsLu_i8GxedUA7rRLn5zZoU6XB2CDcwAWrrMji7mHm9WmXM'
        }]
      }];

      const logins = flatten(users.map(user => user.logins.map(login => ({ userId: user.id, ...login }))));
      const claims = flatten(users.map(user => user.claims.map(claim => ({ userId: user.id, ...claim }))));

      //region ingredients
      const grains = Ingredients.filter(i => i.ingredientType === 1 && i.name);
      const hops = Ingredients.filter(i => i.ingredientType === 2 && i.name);
      const yeasts = Ingredients.filter(i => i.ingredientType === 3 && i.name);

      const styles = flatten(bjcp.map(c => c.styles || []));
      const categories = bjcp.map(c => ({
        number: parseInt(c.number),
        name: c.category,
        description: c.description
      }));

      const bjcpStyles = styles.map(style => Object.assign({}, style, {
        fgRange: helpers.extractRange(style.FG),
        ogRange: helpers.extractRange(style.OG),
        ibuRange: helpers.extractRange(style.IBUs),
        srmRange: helpers.extractRange(style.SRM),
        abvRange: helpers.extractRange(style.ABV),
        categoryId: parseInt(style.code)
      })).map(style => Object.assign({}, style, {
        fg_low: style.fgRange.low || null,
        fg_high: style.fgRange.high || null,
        og_low: style.ogRange.low || null,
        og_high: style.ogRange.high || null,
        ibu_low: style.ibuRange.low || null,
        ibu_high: style.ibuRange.high || null,
        srm_low: style.srmRange.low || null,
        srm_high: style.srmRange.high || null,
        abv_low: style.abvRange.low || null,
        abv_high: style.abvRange.high || null
      }));
      //endregion

      return sequelize.sync(Object.assign({}, args, { force: true }))
        .then(() => User.bulkCreate(users.map(user => ({ emailConfirmed: true, ...user }))))
        .then(() => UserClaim.bulkCreate(logins))
        .then(() => UserLogin.bulkCreate(claims))
        .then(() => Grain.bulkCreate(grains))
        .then(() => Hop.bulkCreate(hops))
        .then(() => Yeast.bulkCreate(yeasts))
        .then(() => BJCPCategory.bulkCreate(categories))
        .then(() => BJCPStyle.bulkCreate(bjcpStyles));
    }
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
  Yeast,
  MashSchedule,
  RecipeFermentation,
  BJCPCategory,
  BJCPStyle
};
