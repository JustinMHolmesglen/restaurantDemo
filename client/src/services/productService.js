import api from '../services/api'

function getAll(){
    return api.get("/menu")
}

//get onsale product sale

function post(data){
    const formData = prepareFormData(data)
    return api.post('/menu', 
        formData,
        formConfig
    )
}

//get by id
function getById(id){
    return api.get('/menu/' + id)
}

//put
function put(id, data, uploadedFile){
    const formData = prepareFormData(data, uploadedFile)
    return api.put(
        '/menu/' + id,
        formData,
        formConfig
    )
}

//delete
function del(id) {
    return api.delete('/menu/' + id);
  }
  

//product service write functions
//1 set content header to multipart data
const formConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
}
//2 
function prepareFormData(data, uploadedfile){
    let formData = new FormData();

     // Append reconfigured mixed data to new object
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('sizes', data.sizes);
        formData.append('texture', data.texture);
        formData.append('onSale', data.onSale);
        formData.append('isAvailable', data.isAvailable);
        formData.append('image', data.image);
    if (uploadedfile) {
        formData.append('uploadedFile', uploadedfile);
  }

  return formData;
}


const productService = {
    getAll,
    post,
    getById,
    put,
    del
}

export default productService;