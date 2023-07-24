import { useEffect, useMemo, useState } from 'react'
import { drugActions } from '../../../features/drug/drugSlice';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Card, Pagination, Table } from 'react-bootstrap';
import { FaEdit, FaTrash} from "react-icons/fa"
import './ListMedicine.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteDrug } from '../../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


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
        const response = await deleteDrug(drugId);

        setCount(cnt => cnt + 1) //force update table

        response.status == 200 ? toast.success('Successfully deleted') : toast.error('Oops! Something went wrong')
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
      
            <div className='pagination-container'>
              <Pagination>
                
                <Pagination.First onClick={/* c8 ignore next 1*/() => table.setPageIndex(0)} />
                <Pagination.Prev 
                  onClick={/* c8 ignore next 1*/ () => table.previousPage()}
                  disabled={/* c8 ignore next 1*/ !table.getCanPreviousPage()}
                />
                <Pagination.Next 
                  onClick={/* c8 ignore next 1*/ () => table.nextPage()}
                  disabled={/* c8 ignore next 1*/ !table.getCanNextPage()}
                />
                <Pagination.Last onClick={/* c8 ignore next 1*/ () => table.setPageIndex(table.getPageCount() - 1)} />
      
              </Pagination>
            </div>
      
            </Card.Body>
    
        </Card>
      )}
    </div>
  )
}

export default ListMedicine