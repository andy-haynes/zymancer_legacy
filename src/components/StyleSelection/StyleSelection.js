import React from 'react';
import PropTypes from 'prop-types';
import BJCPStyles from '../../constants/BJCPStyles';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StyleSelection.css';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


class StyleSelection extends React.Component {
  static propTypes = {
    setStyle: PropTypes.func.isRequired
  };

  render() {
    const { style, setStyle } = this.props;
    return (
      <div className={s.styleSelection}>
        <SelectField
          value={style && style.id}
          onChange={(e, i, v) => setStyle(v)}
          className={s.longInput}
          style={{width: '19.7em'}}
        >
          {BJCPStyles.map((rs, i) => (
            <MenuItem
              key={i}
              value={rs.id}
              primaryText={`${rs.code} - ${rs.name}`}
            />
          ))}
        </SelectField>
      </div>
    );
  }
}

export default withStyles(s)(StyleSelection);
