import { useCallback } from 'react'
import MedicationForm from '../Form/MedicationForm'
import { postDrugs } from '../../../api';
import {v4 as uuidv4} from "uuid"
import { toast } from 'react-toastify';

const AddMedication = () => {
  const formSubmitHandler = useCallback(async data => {
      /* c8 ignore next 6 */
      //mocked while testing so ignoring
      data.id = uuidv4();
      
      const response = await postDrugs(data);

      console.log(response);

      response.status === 201 ? toast.success('Successfully added medication.') : toast.error('Error! Something went wrong.')
  }, [])

  return (
    <MedicationForm submitCallback={formSubmitHandler}/>
  )
}

export default AddMedication