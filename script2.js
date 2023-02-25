let courseName=document.getElementById("courseName");
let courseCategory=document.getElementById("courseCategory");
let coursePrice=document.getElementById("coursePrice");
let courseDescription=document.getElementById("courseDescription");
let datatable=document.getElementById("data");
let courseSearch=document.getElementById("search");
let error=document.getElementsByClassName("error");
let courses;
if(localStorage.getItem("alldata")!=null){
    courses=JSON.parse(localStorage.getItem("alldata"));
    displayCourses();
}
else{
 courses=[];
}
function creatCourse(){
    // console.log(courseName.value,courseCategory.value,coursePrice.value,courseDescription.value);
    if(testInputName()){ //--------------------------------- lec13
        let course = {
        cName:courseName.value,
        cCategory:courseCategory.value,
        cPrice:coursePrice.value,
        cDescription:courseDescription.value,
        }
        courses.push(course);
        localStorage.setItem("alldata",JSON.stringify(courses));
        displayCourses();
        clearr();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        
    }

    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }

}

// console.log(courses);

function displayCourses(){
    let result=``;
    for (let i = 0; i < courses.length; i++) {
        result+=`
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].cName}</td>
            <td>${courses[i].cCategory}</td>
            <td>${courses[i].cPrice}</td>
            <td>${courses[i].cDescription}</td>
            <td><button onclick="updateCourse(${i+1})"><i class="fas fa-edit"></i></button></td>
            <td><button class="delete" onclick="deleteCourse(${i+1})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>


        `;
        
    }
    datatable.innerHTML=result;

}

function clearr(){
     courseName.value="";
     courseCategory.value="";
     coursePrice.value="";
     courseDescription.value="";
}
function deleteCourse(id){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id-1,1);
            localStorage.setItem("alldata",JSON.stringify(courses));
            displayCourses();  
          Swal.fire(
            'Deleted!',
            'success'
          )
        }
        else{
            Swal.fire(
                'course not Deleted!'
                
              ) 
        }
      })



}
function updateCourse(id){
    id=id-1;
    courses[id].cName=courseName.value;
    courses[id].cCategory=courseCategory.value;
    courses[id].cPrice=coursePrice.value;
    courses[id].cDescription=courseDescription.value;
    localStorage.setItem("alldata",JSON.stringify(courses));

    displayCourses();
    clearr();
}


function searchC(){
    let valueSearch=courseSearch.value;
    let result=``;
    for (let i = 0; i < courses.length; i++) {
        if(courses[i].cName.toLowerCase().includes(valueSearch.toLowerCase())){
        result+=`
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].cName}</td>
            <td>${courses[i].cCategory}</td>
            <td>${courses[i].cPrice}</td>
            <td>${courses[i].cDescription}</td>
            <td><button onclick="updateCourse(${i+1})"><i class="fas fa-edit"></i></button></td>
            <td><button class="delete" onclick="deleteCourse(${i+1})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>


        `;
        }
        
    }
    datatable.innerHTML=result;

}
//-------------------------------------------------------lecture 13

courseName.addEventListener('blur',testInputName);
function testInputName(){
    let regexName=/^[A-Z][a-z0-9]{2,14}$/;
    if(!regexName.test(courseName.value)){
        error[0].style.display="block";
        return false;
    }
    else{
        error[0].style.display="none";
        return true; 
    }

    
}



