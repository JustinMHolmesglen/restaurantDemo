import api from '../services/api'

function post(data){
    const formData = prepareFormData(data)
    return api.post('/enquiry', 
        data,
        
    )
}
//product service write functions
//1 set content header to multipart data
const formConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
}
//2 



const feedback = {
    post
}

export default feedback;