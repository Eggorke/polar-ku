import * as React from 'react'
import ApiService from '../../../lib/services/api-service'

// Сделать тут все по уму, сейчас по сути это proof of concept

const apiService = new ApiService()

interface orderItemsI {
  place: string
  subject: string
  description: string
}

interface formValuesI {
  due_date: string
  order_items: orderItemsI[]
}

const NewOrder = () => {
  const [formValues, setFormValues] = React.useState<formValuesI>({
    due_date: '',
    order_items: [
      {
        place: '',
        subject: '',
        description: ''
      }
    ]
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    apiService.createNewOrder(formValues)
  }

  const handleAddNewItems = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    let order_items = formValues.order_items
    order_items.push({place: '', subject: '', description: ''})
    setFormValues(prev => ({
      ...prev,
      order_items
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleItemsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let order_items = formValues.order_items
    const name = e.target.name

    switch (name){
      case 'place':
        order_items[index].place = e.target.value
        break;
      case 'subject':
        order_items[index].subject = e.target.value
        break;
      case 'description':
        order_items[index].description = e.target.value
        break;
      default:
        break;
    }

    setFormValues(prev => ({
      ...prev,
      order_items
    }))
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id='due_date'
          name='due_date'
          type='date'
          onChange={(e) => handleChange(e)}
        >
        </input>
        {
          formValues.order_items.map((el, index) => {
            return (
              <div key={index}>
                <input
                  id={`place_${index}`}
                  name={`place`}
                  type='text'
                  onChange={(e) => handleItemsChange(e, index)}
                  placeholder='Place'
                >
                </input>
                <input
                  id={`subject_${index}`}
                  name={`subject`}
                  type='text'
                  onChange={(e) => handleItemsChange(e, index)}
                  placeholder='Subject'
                >
                </input>
                <input
                  id={`description_${index}`}
                  name={`description`}
                  type='text'
                  onChange={(e) => handleItemsChange(e, index)}
                  placeholder='Description'
                >
                </input>
              </div>
            )
          })
        }
        {
          formValues.order_items.length < 3 && (
            <button onClick={(e) => handleAddNewItems(e)}>
              Add
            </button>
          )
        }
        <button type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewOrder
