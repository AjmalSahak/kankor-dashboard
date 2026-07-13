// ============================================
// Kankor Dashboard
// Main Dashboard Controller
// ============================================


// document.addEventListener(
//     "DOMContentLoaded",
//     function () {


//         initializeDashboard();


//     }
// );
document.addEventListener(
"DOMContentLoaded",
loadDashboard
);


async function loadDashboard(){


    try{


        showLoading(
            "در حال خواندن فایل اکسل..."
        );



        const students =
        await loadExcelFromServer();



        allStudents =
        students;



        filteredStudents =
        [...students];



        populateFilters(
            filteredStudents
        );



        generateKPICards(
            filteredStudents
        );



        initializeCharts(
            filteredStudents
        );



        refreshTables(
            filteredStudents
        );



        showLoading(

            `تعداد ${students.length.toLocaleString()} ریکارد بارگذاری شد`

        );



    }
    catch(error){


        console.error(error);



        showLoading(
            "خطا در بارگذاری معلومات"
        );


    }


}


// ============================================
// Global Initialization
// ============================================


function initializeDashboard(){


    const excelInput =
        document.getElementById(
            "excelFile"
        );



    if(excelInput){


        excelInput.addEventListener(
            "change",
            handleExcelUpload
        );


    }



    initializeButtons();


}









// ============================================
// Excel Upload Handler
// ============================================


async function handleExcelUpload(event){

    const file = event.target.files[0];

    if(!file)
        return;


    showLoading("در حال خواندن فایل اکسل...");


    try {


        const students = await loadExcelFile(file);



        allStudents = students;


        filteredStudents = [...students];



        showLoading(
            `تعداد ${students.length.toLocaleString()} ریکارد دریافت شد`
        );



        // Populate dropdown filters
        populateFilters(filteredStudents);



        // Generate KPI cards
        generateKPICards(filteredStudents);



        // Generate charts
        initializeCharts(filteredStudents);



        // Generate tables
        refreshTables(filteredStudents);



    }
    catch(error){


        console.error(
            "Excel Loading Error:",
            error
        );


        showLoading(
            "خطا در خواندن فایل اکسل"
        );


    }

}








// ============================================
// Generate KPI Cards
// ============================================


function generateKPICards(data){


    const stats =
        calculateStatistics(data);



    const container =
        document.getElementById(
            "kpiContainer"
        );



    if(!container)
        return;



    const cards = [


        {
            title:"مجموع اشتراک کننده‌گان",
            value:stats.total,
            icon:"bi-people"
        },


        {
            title:"محصلین کامیاب",
            value:stats.passed,
            icon:"bi-check-circle"
        },


        {
            title:"محصلین ناکام",
            value:stats.failed,
            icon:"bi-x-circle"
        },


        {
            title:"بلندترین نمره",
            value:stats.highest,
            icon:"bi-award"
        },


        {
            title:"کمترین نمره",
            value:stats.lowest,
            icon:"bi-arrow-down-circle"
        },


        {
            title:"اوسط نمرات",
            value:stats.average,
            icon:"bi-bar-chart"
        },


        {
            title:"درصد کامیابی",
            value:stats.passPercentage+"%",
            icon:"bi-percent"
        },


        {
            title:"تعداد مکاتب",
            value:stats.schools,
            icon:"bi-building"
        },


        {
            title:"تعداد دانشگاه‌ها",
            value:stats.universities,
            icon:"bi-mortarboard"
        },


        {
            title:"تعداد پوهنځی‌ها",
            value:stats.faculties,
            icon:"bi-book"
        }


    ];





    container.innerHTML="";



    cards.forEach(card=>{


        container.innerHTML += `

        <div class="col-xl-3 col-lg-4 col-md-6">

            <div class="kpi-card">


                <div class="kpi-icon">

                    <i class="bi ${card.icon}"></i>

                </div>


                <div class="kpi-title">

                    ${card.title}

                </div>


                <div class="kpi-value">

                    ${formatNumber(card.value)}

                </div>


            </div>

        </div>

        `;


    });


}









// ============================================
// Helpers
// ============================================


function formatNumber(value){


    if(typeof value !== "number")
        return value;



    return value.toLocaleString(
        "en-US"
    );


}







function showLoading(message){


    const element =
    document.getElementById(
        "loadingStatus"
    );



    if(element){

        element.innerHTML =
        message;

    }


}









// ============================================
// UI Buttons
// ============================================


function initializeButtons(){



    const darkButton =
    document.getElementById(
        "darkModeBtn"
    );



    if(darkButton){


        darkButton.onclick =
        function(){


            document.body
            .classList
            .toggle(
                "dark"
            );


        };


    }





    const fullscreenButton =
    document.getElementById(
        "fullscreenBtn"
    );



    if(fullscreenButton){


        fullscreenButton.onclick =
        function(){


            if(
                !document.fullscreenElement
            ){

                document.documentElement
                .requestFullscreen();


            }
            else{


                document.exitFullscreen();


            }


        };


    }



}