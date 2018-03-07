import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    this.onAdd = this.onAdd.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onAdd(index) {
  }

  onUpdate(index) {
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const data = [...this.state.acronyms];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.acronyms[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  }

  render() {
    const { name } = this.props.match.params;
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
        <h1>{`Team ${name}`}</h1>
        <ReactTable
          data={this.state.acronyms}
          columns={columns}
        />
      </div>
    );
  }
}

TeamShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default TeamShow;
