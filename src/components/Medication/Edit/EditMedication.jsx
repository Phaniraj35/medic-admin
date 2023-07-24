import { useLocation } from "react-router-dom"
import MedicationForm from "../Form/MedicationForm";

const EditMedication = () => {

  const { state } = useLocation();

  return (
    <MedicationForm defaultValues={state} 
      submitMethod="put" 
      cardTitle="Update Medication"
    />
  )
}

export default EditMedication