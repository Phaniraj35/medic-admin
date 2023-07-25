import { useEffect, useMemo, useState } from 'react'
import { drugActions } from '../../../features/drug/drugSlice';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import { FaEdit, FaTrash} from "react-icons/fa"
import './ListMedicine.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const ListMedicine = ({navigator = () => /* c8 ignore next 5 */{}}) => {
 
    const drugs = useAppSelector(state => state.drugs.drugList);

    const isLoading = useAppSelector(state => state.drugs.isLoading);

    const dispatch = useAppDispatch();

    const [count, setCount] = useState(0); // used to force re-render cuz. React Table does not have refresh table feature

    const editHandler = drugDetails => {
      navigator(`/edit-medication/${drugDetails.id}`, {state: drugDetails})
    }

    const deleteHandler = async drugId => {

      /* c8 ignore next 7*/
      if (window.confirm("Do you really want to delete?")) {
          dispatch(drugActions.deleteDrug(drugId));
          setCount(cnt => cnt + 1) //force update table
      }

    }

    const columns = useMemo(() => ([
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Strength',
        accessorKey: 'strength'
      },
      {
        header: 'Dosage Form',
        accessorKey: 'dosage_form'
      },
      {
        header: 'Frequency',
        accessorKey: 'frequency'
      },
      {
        header: 'Duration',
        accessorKey: 'duration'
      },
      {
        header: 'Route',
        accessorKey: 'route'
      },
      {
        header: 'Actions',
        cell: ({row}) => {
          const id = row.original.id;
          return <>
            <button title={`Edit ${row.original.name}`} className='medicene-list-action-btn edit-btn' onClick={() => editHandler(row.original)}><FaEdit /></button>

            <button title={`Delete ${row.original.name}`} className='medicene-list-action-btn delete-btn' onClick={() => deleteHandler(id)}><FaTrash /></button>
          </>
        } 
      }
    ]), [])

    const table = useReactTable({ 
      data: drugs, 
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel()
    })

    useEffect(() => {
        dispatch(drugActions.getDrugsFetch())
    }, [dispatch, count])

  return (
    <div>
      {isLoading && <p>Loading</p>}

      { !isLoading && (
          <Card className='mt-4'>
            <Card.Header><h5 id='medication-list-heading' style={{marginBottom: 0}}>Medication List</h5></Card.Header>
    
            <Card.Body>
              
              <Table striped bordered hover responsive id="medication-list-table">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {
                      headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))
                    }
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className='medication-row'>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
      
            <div className='pagination-container mt-3'>
                <div>
                    <ButtonGroup aria-label="First group">
                        <Button
                            onClick={/* c8 ignore next 1*/() => table.setPageIndex(0)}
                            variant="outline-secondary"
                        >First</Button>{' '}

                        <Button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            variant="outline-secondary"
                        >Prev</Button>{' '}

                        <Button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            variant="outline-secondary"
                        >Next</Button>{' '}

                        <Button
                            onClick={() => /* c8 ignore next 1*/ () => table.setPageIndex(table.getPageCount() - 1)}
                            variant="outline-secondary"
                        >Last</Button>
                    </ButtonGroup>
                </div>

            </div>
      
            </Card.Body>
    
        </Card>
      )}
    </div>
  )
}

export default ListMedicine