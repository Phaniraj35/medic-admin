import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import {v4 as uuidv4} from "uuid";
import {postDrugs, putDrug} from "../../../api/index.js";
import {errorToast, successToast} from "../../../utils/toast.js";


const MedicationForm = (
    {
      defaultValues = {
      name: '', strength: '', dosage_form: '', frequency: '',
      duration: '', route: '',active: false
     },
      cardTitle = 'Add Medication',
      submitMethod = 'post',
    }
) => {

  
  const form = useForm({
    defaultValues: defaultValues
  });

  const {register, control, handleSubmit, formState, reset} = form

  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

  const submitHandler = async data => {

    if (submitMethod === 'post') {
      data.id = uuidv4();

      try {
        const response = await postDrugs(data);
        response.status === 201 && successToast('Successfully added medication.')
      } catch (e) {
        errorToast('Error! Something went wrong.')
      }

    } else if (submitMethod === 'put') {
      try {
        const response = await putDrug(data?.id, data);
        response.status === 200 && successToast('Successfully updated.')
      } catch (e) {
        errorToast('Oops! Something went wrong.')
      }
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful && submitMethod !== 'put') {
      reset();
    }
  }, [isSubmitSuccessful, reset, submitMethod])

  return (
    <>
    <div className='mt-4 mb-4'>

      <Card>
        <Card.Header><h5 style={{marginBottom: 0}}>{cardTitle}</h5></Card.Header>

        <Card.Body>

          <Row>

            <Col sm={12} md={6}>
            
            <Form onSubmit={handleSubmit(submitHandler)} noValidate>
            <Form.Group className="mb-3" controlId="formMedicationName">
              <Form.Label>Medication Name <span className='text-red'>*</span></Form.Label>
              <Form.Control
                isInvalid={errors?.name?.message || false}
                type="text" 
                placeholder="Enter medication name" 
                {...register('name', {
                  required: "Medication name is required."
                })}/>

                {errors?.name?.message && <Form.Control.Feedback id='name-error' type='invalid'>{errors.name.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMedicationStrength">
              <Form.Label>Strength</Form.Label>
              <Form.Control 
                isInvalid={errors?.strength?.message || false}
                type="text" 
                placeholder="Enter Strength" 
                {...register('strength', {
                  required: "Strength is required."
                })}/>
                {errors?.strength?.message && <Form.Control.Feedback type='invalid'>{errors.strength.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMedicationDosageForm">
              <Form.Label>Dosage Form</Form.Label>
              <Form.Select
                isInvalid={errors?.dosage_form?.message || false}
                aria-label="dosage_form" 
                {...register('dosage_form', {
                  required: "Dosage form is required."
                })}
              >
                <option value="" disabled>Select Dosage Form</option>
                <option value="Capsule">Capsule</option>
                <option value="Tablet">Tablet</option>
              </Form.Select>
              {errors?.dosage_form?.message && <Form.Control.Feedback type='invalid'>{errors.dosage_form.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formMedicationFrequency'>
              <Form.Label>Frequency</Form.Label>
              <Form.Select 
                isInvalid={errors?.frequency?.message || false}
                aria-label="frequency" 
                {...register('frequency', {
                  required: "Frequency is required."
                })}>
                <option value="" disabled>Select Frequency</option>
                <option value="Once a day">Once a day</option>
                <option value="Twice a day">Twice a day</option>
                <option value="Thrice a day">Thrice a day</option>
              </Form.Select>
              {errors?.frequency?.message && <Form.Control.Feedback type='invalid'>{errors.frequency.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMedicationDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control 
                isInvalid={errors?.duration?.message || false}
                type="text" 
                placeholder="Enter Duration" 
                {...register('duration', {
                  required: "Duration is required"
                })}/>
                {errors?.duration?.message && <Form.Control.Feedback type='invalid'>{errors.duration.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formMedicationRoute'>
              <Form.Label>Route</Form.Label>
              <Form.Select 
                isInvalid={errors?.route?.message || false}
                aria-label="route" 
                {...register('route', {
                  required: "Route is required"
                })}>
                <option value="" disabled>Select Route</option>
                <option value="Oral">Oral</option>
                <option value="External Use">External use</option>
                <option value="Injection">Injection</option>
              </Form.Select>
              {errors?.route?.message && <Form.Control.Feedback type='invalid'>{errors.route.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formActive">
              <Form.Check type="checkbox" label="Active"  {...register('active')}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!isDirty || isSubmitting}>
              Submit
            </Button>
          </Form>
            
            </Col>

          </Row>

        </Card.Body>
      </Card>
      <DevTool control={control} />
    </div>
    </>
  )
}

export default MedicationForm;