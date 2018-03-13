import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import apiFetch from '../helpers/apiFetch';

let tempId = 0;

const getTempName = () => {
  const name = `temp${tempId}`;
  tempId += 1;
  return name;
};

class TeamShow extends Component {
  constructor() {
    super();
    this.state = {
      acronyms: List([]),
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    apiFetch(`/api/teams/${id}/acronyms`).then(({ acronyms }) => {
      acronyms = acronyms.map(acronym => Object.assign({}, { meta: { state: 'default' } }, acronym));
      this.updateAcronyms(fromJS(acronyms));
    });
  }

  getBody(index) {
    return JSON.stringify({
      name: this.state.acronyms.getIn([index, 'name']),
      means: this.state.acronyms.getIn([index, 'means']),
      description: this.state.acronyms.getIn([index, 'description']),
    });
  }

  getIndex(tempName) {
    return this.state.acronyms.findIndex(acronym => acronym.getIn(['meta', 'tempName']) === tempName);
  }

  setTempName(index) {
    const tempName = getTempName();
    const acronyms = this.state.acronyms
      .setIn([index, 'meta', 'tempName'], tempName)
      .setIn([index, 'meta', 'state'], 'saving');
    this.updateAcronyms(acronyms);
    return tempName;
  }

  add(index) {
    const { id: teamId } = this.props.match.params;
    const tempName = this.setTempName(index);

    const body = this.getBody(index);

    apiFetch(`/api/teams/${teamId}/acronyms`, {
      method: 'post',
      body,
    }).then(({ id, added_by }) => {
      const newIndex = this.getIndex(tempName);
      this.updateAcronyms(this.state.acronyms
        .setIn([newIndex, 'meta'], Map({ state: 'default' }))
        .setIn([newIndex, 'id'], id)
        .setIn([newIndex, 'added_by'], added_by));
    });
  }

  update(index) {
    const { id: teamId } = this.props.match.params;
    const id = this.state.acronyms.getIn([index, 'id']);

    const tempName = this.setTempName(index);
    const body = this.getBody(index);
    apiFetch(`/api/teams/${teamId}/acronyms/${id}`, {
      method: 'put',
      body,
    }).then(({ added_by }) => {
      const newIndex = this.getIndex(tempName);
      this.updateAcronyms(this.state.acronyms
        .setIn([newIndex, 'meta'], Map({ state: 'default' }))
        .setIn([newIndex, 'added_by'], added_by));
    });
  }

  del(index) {
    const { id: teamId } = this.props.match.params;
    const id = this.state.acronyms.getIn([index, 'id']);
    const tempName = this.setTempName(index);

    apiFetch(`/api/teams/${teamId}/acronyms/${id}`, {
      method: 'delete',
    }).then(() => {
      const newIndex = this.getIndex(tempName);
      this.updateAcronyms(this.state.acronyms.delete(newIndex));
    });
  }

  updateAcronyms(acronyms) {
    if (!acronyms.some(acronym => acronym.getIn(['meta', 'new']))) {
      acronyms = acronyms.push(fromJS({
        name: '',
        means: '',
        description: '',
        added_by: '',
        meta: {
          new: true,
          state: 'editing',
        },
      }));
    }
    this.setState({ acronyms });
  }


  renderAddRowButton(index) {
    const onClick = () => this.add(index);
    const disabled = this.state.acronyms.getIn([index, 'meta', 'state']) === 'saving';
    return (<button disabled={disabled ? 'disabled' : undefined} onClick={onClick}>Add</button>);
  }

  renderEditRowButtons(index) {
    const editing = this.state.acronyms.getIn([index, 'meta', 'state']) === 'editing';
    const disabled = this.state.acronyms.getIn([index, 'meta', 'state']) === 'saving';
    let buttons;
    if (editing) {
      const update = () => this.update(index);
      const reset = () => {
        const original = this.state.acronyms.getIn([index, 'meta', 'original']);
        this.updateAcronyms(this.state.acronyms
          .setIn([index, 'name'], original.get('name'))
          .setIn([index, 'means'], original.get('means'))
          .setIn([index, 'description'], original.get('description'))
          .setIn([index, 'meta', 'state'], 'default')
          .deleteIn([index, 'meta', 'original']));
      };

      buttons = (
        <div>
          <button disabled={disabled ? 'disabled' : undefined} onClick={update}>Save</button>
          <button disabled={disabled ? 'disabled' : undefined} onClick={reset}>Reset</button>
        </div>
      );
    } else {
      const edit = () => {
        const original = Map({
          name: this.state.acronyms.getIn([index, 'name']),
          means: this.state.acronyms.getIn([index, 'means']),
          description: this.state.acronyms.getIn([index, 'description']),
        });
        this.updateAcronyms(this.state.acronyms
          .setIn([index, 'meta', 'state'], 'editing')
          .setIn([index, 'meta', 'original'], original));
      };
      const del = () => this.del(index);
      buttons = (
        <div>
          <button disabled={disabled ? 'disabled' : undefined} onClick={edit}>Edit</button>
          <button disabled={disabled ? 'disabled' : undefined} onClick={del}>Delete</button>
        </div>
      );
    }
    return buttons;
  }

  renderEditable(cellInfo) {
    const { index, column: { id: columnId } } = cellInfo;
    const editable = this.state.acronyms.getIn([index, 'meta', 'state']) === 'editing' && columnId !== 'added_by';
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable={editable}
        suppressContentEditableWarning
        onBlur={(e) => {
          this.updateAcronyms(this.state.acronyms.setIn([index, columnId], e.target.textContent));
        }}
      >
        {
          this.state.acronyms.getIn([index, columnId])
        }
      </div>
    );
  }

  render() {
    const button = ({ index }) => {
      const addRow = !!this.state.acronyms.getIn([index, 'meta', 'new']);
      return addRow ? this.renderAddRowButton(index) : this.renderEditRowButtons(index);
    };

    const columns = [
      {
        Header: 'Acronym',
        accessor: 'name',
        Cell: this.renderEditable,
      },
      {
        Header: 'Stands For',
        accessor: 'means',
        Cell: this.renderEditable,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: this.renderEditable,
      },
      {
        Header: 'Added By',
        accessor: 'added_by',
        Cell: this.renderEditable,
      },
      {
        Header: '',
        Cell: button,
      },
    ];

    return (
      <div>
        <h1>{`Team ${this.props.team.name}`}</h1>
        <ReactTable
          data={this.state.acronyms.toJS()}
          columns={columns}
        />
      </div>
    );
  }
}

TeamShow.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default TeamShow;
