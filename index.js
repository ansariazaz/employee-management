(async function () {
    let apiResponse = await fetch("./data.json")
    let data = await apiResponse.json()

    let selectedEmployee = data[0]
    let selectedEmployeeId = data[0].id
    console.log(selectedEmployeeId, "selectedEmployeeId")
    let list = document.getElementById("left-cont")
    // logic to Render List of employeee
    function renderAllEmployee() {
        list.innerHTML = ""
        data.forEach(ele => {
            let span = document.createElement("SPAN")
            span.classList.add("item")
            span.setAttribute("id", ele.id)
            if (parseInt(selectedEmployeeId, 10) === ele.id) {
                selectedEmployee = ele
                span.classList.add("selected")
            }
            span.innerHTML = `${ele.firstName} ${ele.lastName}`
            list.append(span)
        });
    }

    //Render Selected Employee in right side
    let div = document.createElement("div")
    const renderSingleEmployee = () => {

        div.classList.add("detail")
        div.innerHTML = `
          <img src=${selectedEmployee.imageUrl} alt="imageurl" class="profile-pic">
          <span>Name:${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
          <span>Email:${selectedEmployee.email}</span>
          <span>Age:${selectedEmployee.age}</span>
          <span>Mobile Number:${selectedEmployee.contactNumber}</span> 
          <span>DOB:${selectedEmployee.dob}</span>
          `
        let detail = document.getElementById("right-cont")
        detail.append(div)
    }


    // logic to select employee

    list.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderAllEmployee()
            renderSingleEmployee();
        }
    })

    //logic to add Employee
    let addBtn = document.getElementById("addBtn")
    let mainCont = document.getElementById("mainContainer")
    mainCont.addEventListener("click", (e) => {
        const form = document.querySelector('.addEmployeeForm');
        if (!form.contains(e.target) && e.target.id !== 'addBtn') {
            addEmployeeForm.style.display = "none";
        } 
    })
    let addEmployeeForm = document.querySelector(".addEmployeeForm")
    addBtn.addEventListener("click", () => {
        addEmployeeForm.style.display = "flex";
    })

    addEmployeeForm.addEventListener("submit", (e) => {
       e.preventDefault()
       let formData = new FormData(addEmployeeForm)
       const values = [...formData.entries()];
       console.log(values)
       let objdata = {}
       values.forEach((val)=>{
        objdata[val[0]]= val[1]
       })
       objdata.id = data[data.length-1].id+1
       objdata.imageUrl ="https://cdn-icons-png.flaticon.com/512/0/93.png";
       data.push(objdata);
       renderAllEmployee()
       addEmployeeForm.reset()
       addEmployeeForm.style.display = "none";
    })


    renderAllEmployee();
    if (selectedEmployee) renderSingleEmployee();
}())