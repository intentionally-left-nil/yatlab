import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import apiFetch from '../helpers/apiFetch';

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
    const { id } = this.props.match.params;
    apiFetch(`/api/teams/${id}/acronyms`, {
      method: 'post',
      body: JSON.stringify(this.state.acronyms[index]),
    });
  }

  update(index) {
  }

  updateAcronyms(acronyms) {
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
