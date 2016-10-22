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
import _ from 'lodash';

import Ingredients from '../../constants/TestIngredients';
import styles from '../../constants/BJCP_JSON';
import zymath from '../../utils/zymath';

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

// why does't this work when the sour are reversed and 'belongsTo' is used?
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

      const logins = _.flatten(users.map(user => user.logins.map(login => ({ userId: user.id, ...login }))));
      const claims = _.flatten(users.map(user => user.claims.map(claim => ({ userId: user.id, ...claim }))));

      //region ingredients
      const grains = Ingredients.filter(i => i.ingredientType === 1).map(grain => Object.assign(
        _.pick(grain, 'name', 'category', 'description', 'characteristics', 'flavor', 'mfg', 'lovibond'), {
          DBFG: isNaN(parseFloat(grain.DBFG)) ? null : parseFloat(grain.DBFG),
          DBCG: isNaN(parseFloat(grain.DBCG)) ? null : parseFloat(grain.DBCG),
          lintner: isNaN(parseFloat(grain.lintner)) ? null : parseFloat(grain.lintner),
          gravity: isNaN(parseFloat(grain.DBCG || grain.DBFG)) ? null : zymath.DBFGtoGravity(parseFloat(grain.DBCG || grain.DBFG)),
          isExtract: grain.pdfUrl && (grain.pdfUrl.indexOf('LME') + grain.pdfUrl.indexOf('DME') > -2),
          url: grain.pdfUrl || grain.url
        }
      ));

      const hops = Ingredients.filter(i => i.ingredientType === 2).map(hop => Object.assign(
        _.pick(hop, 'name', 'aroma', 'url', 'alpha', 'beta', 'coHumulone', 'totalOil', 'myrcene', 'caryophyllene', 'farnesene', 'humulene', 'geraniol'), {
          aroma: hop.aroma.join(','),
          categories: hop.categories.join(',')
        }
      ));

      const yeasts = Ingredients.filter(i => i.ingredientType === 3).map(yeast => Object.assign(
        _.pick(yeast, 'name', 'code', 'url', 'description', 'flocculation', 'rangeF', 'rangeC', 'tolerance', 'attenuationRange', 'mfg'), {
          styles: yeast.styles ? yeast.styles.join(',') : null
        }
      ));

      const categories = Object.keys(styles).map(k => ({
        id: parseInt(k),
        name: styles[k].name,
        description: styles[k].description
      }));

      const bjcpStyles = Object.keys(styles)
        .map(k => styles[k].styles)
        .reduce((prev, next) => prev.concat(next), [])
        .map(style => Object.assign({}, style, {
          categoryId: style.code ? parseInt(style.code) : (style.name.indexOf('IPA') > -1 ? 21 : 27),
          commercialExamples: style.commercialExamples && style.commercialExamples.length ? style.commercialExamples.join(', ') : '',
          tags: style.tags && style.tags.length ? style.tags.join(', ') : ''
        }));
      //endregion

      return sequelize.sync(Object.assign({}, args, { force: true }))
        .then(() =>  User.bulkCreate(users.map(user => ({ emailConfirmed: true, ...user }))))
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