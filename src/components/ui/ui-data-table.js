/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import paginate from 'jw-paginate'
import cx from 'classnames'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import { orderBy } from 'natural-orderby'
import { Table, Input, Icon, Checkbox, Button, Field, Control } from 'rbx'
import { UiPagination } from './ui-pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSortUp,
  faSortDown,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

const noop = () => {}

const WrappedTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;

  table.tableHover tbody > tr:hover {
    cursor: pointer;
    background-color: hsl(217, 71%, 53%) !important;
    color: #fff;
  }
`

export const UiDataTable = ({
  columns,
  rowKey,
  rows = [],
  pageSize = 10,
  showSelect = false,
  hideSearch = false,
  onClick,
  onSelect
}) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)
  const [filteredItems, setFilteredItems] = React.useState([])
  const [pagedItems, setPagedItems] = React.useState([])
  const [selectedItems, setSelectedItems] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [sortBy, setSortBy] = React.useState(rowKey)
  const [sortOrder, setSortOrder] = React.useState('asc')

  React.useEffect(() => {
    if (!search) {
      return setFilteredItems(orderBy(rows, v => v[sortBy], sortOrder))
    }
    const regex = new RegExp(search, 'i')
    const newItems = rows.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    setFilteredItems(orderBy(newItems, v => v[sortBy], sortOrder))
  }, [rows, search, sortBy, sortOrder])

  React.useEffect(() => {
    const pager = paginate(filteredItems.length, currentPage, pageSize)
    setCurrentPage(pager.currentPage || 1)
    setTotalPages(pager.totalPages)
    setPagedItems(filteredItems.slice(pager.startIndex, pager.endIndex + 1))
  }, [currentPage, filteredItems, pageSize])

  const handleSort = column => {
    if (sortBy === column.key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column.key)
    }
  }

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const onFirst = () => setCurrentPage(1)
  const onPrevious = () => setCurrentPage(currentPage - 1)
  const onNext = () => setCurrentPage(currentPage + 1)
  const onLast = () => setCurrentPage(totalPages)

  const canClick = isFunction(onClick)
  const canSelect = showSelect && isFunction(onSelect)
  const isAllSelected =
    Object.keys(selectedItems).length === filteredItems.length

  const handleClick = row => {
    if (canSelect) {
      selectRow(row)
    } else if (canClick) {
      onClick(row)
    }
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems({})
    } else {
      setSelectedItems(
        filteredItems.reduce((obj, item) => {
          obj[item[rowKey]] = true
          return obj
        }, {})
      )
    }
  }

  const isSelected = row => !!selectedItems[row[rowKey]]

  const selectRow = row => {
    const id = row[rowKey]
    const newSelectedItems = { ...selectedItems }
    if (newSelectedItems[id]) {
      delete newSelectedItems[id]
    } else {
      newSelectedItems[id] = true
    }
    setSelectedItems(newSelectedItems)
  }

  const cancelSelection = () => {
    setSelectedItems([])
    sendSelected()
  }

  const sendSelected = () => {
    const selectedKeys = Object.keys(selectedItems)
    onSelect(rows.filter(row => selectedKeys.includes(row[rowKey])))
  }

  const headingIcon = column => {
    if (column.key !== sortBy) return null
    return (
      <Icon size="small" align="left">
        <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
      </Icon>
    )
  }

  return (
    <>
      {!hideSearch && rows.length > 1 && (
        <Input
          type="search"
          placeholder="Filter Results"
          value={search}
          onChange={handleSearch}
          style={{ marginBottom: '1rem' }}
        />
      )}
      {canSelect && (
        <Field kind="addons">
          <Control>
            <Button onClick={cancelSelection}>
              <Icon size="small">
                <FontAwesomeIcon icon={faTimes} />
              </Icon>
            </Button>
          </Control>
          <Control expanded>
            <Button static fullwidth>
              Items Selected:&nbsp;
              <strong>{Object.keys(selectedItems).length}</strong>
            </Button>
          </Control>
          <Control>
            <Button color="primary" onClick={sendSelected}>
              <Icon size="small">
                <FontAwesomeIcon icon={faCheck} />
              </Icon>
            </Button>
          </Control>
        </Field>
      )}
      <WrappedTable>
        <Table
          fullwidth
          bordered
          striped
          narrow
          className={cx({ tableHover: canClick || canSelect })}
        >
          <Table.Head>
            <Table.Row>
              {canSelect && (
                <Table.Heading textAlign="centered" onClick={handleSelectAll}>
                  <Checkbox checked={isAllSelected} onChange={noop} />
                </Table.Heading>
              )}
              {columns.map(column => (
                <Table.Heading
                  key={column.key}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <a
                    href="javascript:void(0)"
                    onClick={() => handleSort(column)}
                  >
                    {column.label || column.key}
                    {headingIcon(column)}
                  </a>
                </Table.Heading>
              ))}
            </Table.Row>
          </Table.Head>
          {pagedItems.length === 0 ? (
            <Table.Foot>
              <Table.Row>
                <Table.Cell colSpan="100">No Data Found</Table.Cell>
              </Table.Row>
            </Table.Foot>
          ) : (
            <Table.Body>
              {pagedItems.map(row => (
                <Table.Row key={row[rowKey]} onClick={() => handleClick(row)}>
                  {canSelect && (
                    <Table.Cell textAlign="centered">
                      <Checkbox checked={isSelected(row)} onChange={noop} />
                    </Table.Cell>
                  )}
                  {columns.map(column => (
                    <Table.Cell
                      key={column.key}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {isFunction(column.render)
                        ? column.render(row)
                        : get(row, column.key)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </WrappedTable>
      <UiPagination
        align="right"
        pages={totalPages}
        page={currentPage}
        onFirst={onFirst}
        onNext={onNext}
        onPrevious={onPrevious}
        onLast={onLast}
      />
    </>
  )
}

UiDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  hideSearch: PropTypes.bool,
  showSelect: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
}
