export default class Validation {
    kiemTraRong = (input, id, mess)=>{
        if(input===''){
            document.getElementById(id).innerHTML = 'Vui lòng nhập '+mess;
            document.getElementById(id).style.opacity = '1';
            return false;
        }
        document.getElementById(id).innerHTML='';
        return true;
    }
}