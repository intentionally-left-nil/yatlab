import React, { Component } from 'react';
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
      acronyms: [
        {
          name: '',
          means: '',
          description: '',
          added_by: '',
        },
      ],
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    apiFetch(`/api/teams/${id}/acronyms`).then(({ acronyms }) => this.updateAcronyms(acronyms));
  }

  add(index) {
    const { id: teamId } = this.props.match.params;
    const tempName = getTempName();
    this.state.acronyms[index].id = tempName;

    const body = JSON.stringify({
      name: this.state.acronyms[index].name,
      means: this.state.acronyms[index].means,
      description: this.state.acronyms[index].description,
    });

    apiFetch(`/api/teams/${teamId}/acronyms`, {
      method: 'post',
      body,
    }).then(({ id }) => {
      const acronyms = this.state.acronyms.slice();
      const newIndex = acronyms.findIndex(a => a.id === tempName);
      acronyms[newIndex] = Object.assign({}, acronyms[newIndex], { id });
      this.updateAcronyms(acronyms);
    });
  }

  update(index) {
  }

  updateAcronyms(acronyms) {
    if (!(acronyms.length && acronyms.some(acronym => !acronym.id && acronym.id !== 0))) {
      acronyms.push({
        name: '',
        means: '',
        description: '',
        added_by: '',
      });
    }
    this.setState({ acronyms });
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const acronyms = [...this.state.acronyms];
          acronyms[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.updateAcronyms(acronyms);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.acronyms[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  }

  render() {
    const numRows = this.state.acronyms.length;

    const button = ({ index }) => {
      const lastRow = index + 1 === numRows;
      const text = lastRow ? 'Add' : 'Edit';
      const onClick = () => {
        if (lastRow) {
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
          data={this.state.acronyms}
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
