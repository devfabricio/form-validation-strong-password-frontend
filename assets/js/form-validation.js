'use strict';

(() => {
    const form = document.querySelector('[data-form]')
    const fields = {}
    
    const showMessageError = (field, message) => {
        const { element, errorElement } = field
        element.classList.add('error')
        errorElement.style.display = 'block'
        errorElement.textContent = message
    }

    const hideMessageError = (field) => {
        const { element, errorElement } = field
        element.classList.remove('error')
        errorElement.style.display = 'none'
        errorElement.textContent = ''
    }

    const validateRequiredFields = () => {
        let isInvalid = false
        for (const fieldKey in fields) {
            const field = fields[fieldKey]
            const { element, isRequired } = field
            if((!element.value || (fieldKey === 'terms' && !element.checked)) && isRequired) {
                isInvalid = true
                showMessageError(field, 'Este campo é obrigatório!')
            }
        }
        return isInvalid
    }

    const onInputFocus = (event) => {
        hideMessageError(fields[event.target.name])
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        if(validateRequiredFields()) return
        alert('Dados prontos para serem enviados!')
    }

    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit)
        for (const fieldKey in fields) {
            const { element } = fields[fieldKey]
            element.addEventListener('focus', onInputFocus)
        }
    }

    const setFieldElements = () => {
        const inputElements = document.querySelectorAll('[data-input]')
        for (const input of inputElements) {
            const inputName = input.getAttribute('name')
            fields[inputName] = {
                element: input,
                errorElement: input.parentElement.querySelector('[data-error-message]'),
                isRequired: input.hasAttribute('required')
            }
            input.removeAttribute('required')
        }
    }

    const init = () => {
        setFieldElements()
        setListeners()
    }

    init()
})()


