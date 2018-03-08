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

  add(index) {
    const { id: teamId } = this.props.match.params;
    const tempName = getTempName();

    this.updateAcronyms(this.state.acronyms
      .setIn([index, 'meta', 'state'], 'saving')
      .setIn([index, 'meta', 'tempName'], tempName));

    const body = JSON.stringify({
      name: this.state.acronyms.getIn([index, 'name']),
      means: this.state.acronyms.getIn([index, 'means']),
      description: this.state.acronyms.getIn([index, 'description']),
    });

    apiFetch(`/api/teams/${teamId}/acronyms`, {
      method: 'post',
      body,
    }).then(({ id }) => {
      const newIndex = this.state.acronyms.findIndex(a => a.id === tempName);
      this.updateAcronyms(this.state.acronyms
        .setIn([newIndex, 'meta'], Map({ state: 'default' }))
        .setIn([newIndex, 'id'], id));
    });
  }

  update(index) {
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
          state: 'default',
        },
      }));
    }
    this.setState({ acronyms });
  }

  renderEditable(cellInfo) {
    const { index, column: { id: columnId } } = cellInfo;
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          this.updateAcronyms(this.state.acronyms.setIn([index, columnId], e.target.innerHTML));
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.acronyms.getIn([index, columnId]),
        }}
      />
    );
  }

  render() {
    const button = ({ index }) => {
      const addRow = !!this.state.acronyms.getIn([index, 'meta', 'new']);
      const text = addRow ? 'Add' : 'Edit';
      const onClick = () => {
        if (addRow) {
          this.add(index);
        } else {
          this.update(index);
        }
      };
      return (<button onClick={onClick}>{text}</button>);
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
