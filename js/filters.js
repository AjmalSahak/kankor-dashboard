// ============================================
// Kankor Dashboard
// Filter Management Engine
// ============================================



document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeFilters();

    }
);






// ============================================
// Initialize Filters
// ============================================


function initializeFilters(){


    const filters = [

        "schoolFilter",
        "districtFilter",
        "genderFilter",
        "universityFilter",
        "facultyFilter"

    ];



    filters.forEach(id=>{


        const element =
        document.getElementById(id);



        if(element){

            element.addEventListener(
                "change",
                applyFilters
            );

        }


    });





    const search =
    document.getElementById(
        "nameSearch"
    );


    if(search){


        search.addEventListener(
            "input",
            debounce(
                applyFilters,
                300
            )
        );


    }






    const reset =
    document.getElementById(
        "resetFilters"
    );


    if(reset){


        reset.addEventListener(
            "click",
            resetAllFilters
        );


    }



}









// ============================================
// Populate Dropdowns
// ============================================


function populateFilters(data){


    fillSelect(
        "schoolFilter",
        data,
        "school"
    );


    fillSelect(
        "districtFilter",
        data,
        "district"
    );


    fillSelect(
        "universityFilter",
        data,
        "university"
    );


    fillSelect(
        "facultyFilter",
        data,
        "faculty"
    );


}









function fillSelect(id,data,key){


    const select =
    document.getElementById(id);



    if(!select)
        return;



    const values =

    [...new Set(

        data
        .map(x=>x[key])
        .filter(Boolean)

    )]

    .sort();



    select.innerHTML =
    `<option value="">
        همه
    </option>`;



    values.forEach(value=>{


        select.innerHTML +=

        `
        <option value="${value}">
            ${value}
        </option>
        `;


    });


}









// ============================================
// Apply Filters
// ============================================


function applyFilters(){


    let data =
    allStudents;



    const school =
    getValue("schoolFilter");



    const district =
    getValue("districtFilter");



    const gender =
    getValue("genderFilter");



    const university =
    getValue("universityFilter");



    const faculty =
    getValue("facultyFilter");



    const name =
    getValue("nameSearch");







    if(school){


        data =
        data.filter(
            x=>x.school===school
        );


    }





    if(district){


        data =
        data.filter(
            x=>x.district===district
        );


    }






    if(gender){


        data =
        data.filter(
            x=>x.gender===gender
        );


    }







    if(university){


        data =
        data.filter(
            x=>x.university===university
        );


    }







    if(faculty){


        data =
        data.filter(
            x=>x.faculty===faculty
        );


    }







    if(name){


        data =
        data.filter(

            x=>

            x.name
            .includes(name)

        );


    }







    filteredStudents =
    data;



    refreshDashboard();



}









// ============================================
// Update Dashboard
// ============================================


function refreshDashboard(){


    generateKPICards(filteredStudents);

    initializeCharts(filteredStudents);

    refreshTables(filteredStudents);




}









// ============================================
// Reset Filters
// ============================================


function resetAllFilters(){



    document
    .querySelectorAll(
        ".filter-card select,"
        +
        ".filter-card input"
    )

    .forEach(element=>{


        element.value="";


    });




    filteredStudents =
    [...allStudents];



    refreshDashboard();


}









// ============================================
// Helpers
// ============================================


function getValue(id){


    const element =
    document.getElementById(id);



    return element
    ?
    element.value.trim()
    :
    "";


}








// ============================================
// Debounce
// ============================================


function debounce(func,delay){


    let timer;



    return function(){


        clearTimeout(timer);



        timer =
        setTimeout(
            func,
            delay
        );


    };


}