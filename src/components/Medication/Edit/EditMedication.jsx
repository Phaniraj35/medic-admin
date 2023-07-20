import { useLocation } from "react-router-dom"
import MedicationForm from "../Form/MedicationForm";
import { useCallback } from "react";
import { putDrug } from "../../../api";
import { toast } from "react-toastify";

const EditMedication = () => {

  const { state } = useLocation();

  const formSubmitHandler = useCallback(async data => {
    /* c8 ignore next 5 */
    //mocked while testing so ignoring
    const response = await putDrug(data?.id, data)
       
    response.status == 200 ? toast.success('Successfully updated.') : toast.error('Oops! Something went wrong.')

  }, [])

  return (
    <MedicationForm defaultValues={state} 
      submitMethod="put" 
      cardTitle="Update Medication"
      submitCallback={formSubmitHandler}
    />
  )
}

export default EditMedication