import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CreationForms from '../../constants/CreateIngredientForms';
import s from './IngredientSearch.css';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const _creationFormLookup = Object.keys(CreationForms).reduce((lookup, ingredientType) => {
  lookup[ingredientType] = CreationForms[ingredientType].reduce((fields, field) => {
    fields[field.key] = field;
    return fields;
  }, {});
  return lookup;
}, {});

class IngredientSearch extends React.PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    active: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    header: PropTypes.node.isRequired,
    filter: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    ingredientType: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      createDialogOpen: false,
      form: CreationForms[props.ingredientType].reduce((form, field) => {
        form[field.key] = field.default;
        return form;
      }, {})
    };
  }

  openCreateDialog = () => {
    this.setState({ createDialogOpen: true });
  };

  closeCreateDialog = () => {
    this.setState({ createDialogOpen: false });
  };

  updateField = (key, value) => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [key]: value
      })
    })
  };

  createIngredient = () => {
    this.setState({ createDialogOpen: false }, () => {
      this.props.create(this.state.form);
    });
  };

  render() {
    const { query, cache, loading, error, active, children, header, filter, ingredientType } = this.props;
    const { form } = this.state;
    const formLookup = _creationFormLookup[ingredientType];

    return (
      <div className={s.ingredientSearch}>
        <TextField
          id="ingredient-search"
          className={s.searchInput}
          inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em', textAlign: 'center'}}
          placeholder="Start typing to search ingredients"
          value={query}
          onChange={e => filter(e.target.value, cache)}
          style={{width: '90%'}}
        />
        <div className={s.searchResults}>
          {!active || !children.filter(i => i.id !== -1).length ? '' : (
            <div className={s.resultsHeader}>
              {header}
            </div>
          )}
          {active && children}
          {active && (
            <div className={s.createIngredient} onClick={this.openCreateDialog}>
              Create New {ingredientType}
            </div>
          )}
          <Dialog
            title={`Create ${ingredientType}`}
            open={this.state.createDialogOpen}
            modal={false}
            onRequestClose={this.closeCreateDialog}
          >
            <div className={s.creationForm}>
              <div className="pure-g">
                {Object.keys(form).map(key => (
                  <div className={`pure-u-${formLookup[key].width}`} key={key}>
                    <div className={s.creationField}>
                      <div className={s.creationFieldLabel}>
                        {formLookup[key].label}
                      </div>
                      <div className={s.creationFieldInput}>
                        <TextField
                          id={`creation-${ingredientType}-${key}`}
                          defaultValue={formLookup[key].default}
                          onChange={(e) => this.updateField(key, e.target.value)}
                          style={{
                            width: '80%',
                            float: 'left'
                          }}
                        />
                      </div>
                      <div className={s.creationFieldSuffix}>
                        {formLookup[key].suffix}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <RaisedButton
                onClick={this.createIngredient}
                primary={true}
                label='Create'
                style={{
                  float: 'right'
                }}
              />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(IngredientSearch);