// ============================================
// Kankor Dashboard
// Chart.js Visualization Engine
// ============================================


let chartInstances = {};




// ============================================
// Initialize All Charts
// ============================================

function initializeCharts(data) {


    destroyCharts();


    createPassFailChart(data);

    createExamTypeChart(data);

    createSchoolChart(data);

    createPassedSchoolChart(data);

    createUniversityChart(data);

    createFacultyChart(data);

    createScoreChart(data);

    createSchoolStackChart(data);

    createDistrictChart(data);

    createBubbleChart(data);


}






// ============================================
// Destroy Existing Charts
// ============================================

function destroyCharts() {


    Object.values(chartInstances)
        .forEach(chart => {

            if(chart)
                chart.destroy();

        });


    chartInstances = {};

}







// ============================================
// Chart Default Options
// ============================================

const chartOptions = {


    responsive:true,

    maintainAspectRatio:false,


    animation:{

        duration:1000

    },


    plugins:{


        legend:{

            position:"bottom"

        },


        tooltip:{

            rtl:true

        }


    }


};










// ============================================
// Passed / Failed Doughnut
// ============================================


function createPassFailChart(data){


    const passed =
    data.filter(x=>x.passed).length;


    const failed =
    data.length - passed;



    chartInstances.passFail =

    new Chart(

        document.getElementById(
            "passFailChart"
        ),

        {


        type:"doughnut",


        data:{


            labels:[

                "کامیاب",

                "ناکام"

            ],


            datasets:[{


                data:[

                    passed,

                    failed

                ]


            }]


        },


        options:chartOptions


        }


    );


}










// ============================================
// Exam Type Pie
// ============================================


function createExamTypeChart(data){


    const result =
    groupCount(
        data,
        "examType"
    );



    chartInstances.examType =

    new Chart(

    document.getElementById(
        "examTypeChart"
    ),


    {


    type:"pie",


    data:{


        labels:
        Object.keys(result),


        datasets:[{


            data:
            Object.values(result)


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Top Schools
// ============================================


function createSchoolChart(data){


    const schools =
    topGroups(
        data,
        "school",
        20
    );



    chartInstances.school =

    new Chart(

    document.getElementById(
        "schoolChart"
    ),


    {


    type:"bar",


    data:{


        labels:
        schools.labels,


        datasets:[{


            label:
            "تعداد اشتراک کننده",


            data:
            schools.values


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Top Passed Schools
// ============================================


function createPassedSchoolChart(data){


    const passed =

    data.filter(
        x=>x.passed
    );



    const schools =

    topGroups(
        passed,
        "school",
        20
    );



    chartInstances.passedSchool =

    new Chart(

    document.getElementById(
        "passedSchoolChart"
    ),


    {


    type:"bar",


    data:{


        labels:
        schools.labels,


        datasets:[{


            label:
            "کامیاب",


            data:
            schools.values


        }]


    },


    options:chartOptions


    });


}









// ============================================
// University Chart
// ============================================


function createUniversityChart(data){


    const universities =

    topGroups(
        data,
        "university",
        15
    );



    chartInstances.university =

    new Chart(

    document.getElementById(
        "universityChart"
    ),


    {


    type:"bar",


    data:{


        labels:
        universities.labels,


        datasets:[{


            label:
            "تعداد محصلین",


            data:
            universities.values


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Faculty Polar Area
// ============================================


function createFacultyChart(data){


    const faculties =

    topGroups(
        data,
        "faculty",
        10
    );



    chartInstances.faculty =

    new Chart(

    document.getElementById(
        "facultyChart"
    ),


    {


    type:"polarArea",


    data:{


        labels:
        faculties.labels,


        datasets:[{


            data:
            faculties.values


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Score Histogram / Distribution
// ============================================


function createScoreChart(data){


    const ranges = {


        "0-100":0,

        "100-150":0,

        "150-200":0,

        "200-250":0,

        "250-300":0,

        "300+":0


    };




    data.forEach(student=>{


        const score =
        student.score;



        if(score < 100)
            ranges["0-100"]++;


        else if(score < 150)
            ranges["100-150"]++;


        else if(score < 200)
            ranges["150-200"]++;


        else if(score < 250)
            ranges["200-250"]++;


        else if(score < 300)
            ranges["250-300"]++;


        else
            ranges["300+"]++;


    });





    chartInstances.score =

    new Chart(

    document.getElementById(
        "scoreChart"
    ),


    {


    type:"line",


    data:{


        labels:
        Object.keys(ranges),


        datasets:[{


            label:
            "توزیع نمرات",


            data:
            Object.values(ranges)


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Stacked School Passed Failed
// ============================================


function createSchoolStackChart(data){


    const schools =

    topGroups(
        data,
        "school",
        15
    );



    const labels =
    schools.labels;



    const passed = [];

    const failed = [];



    labels.forEach(school=>{


        const rows =

        data.filter(
            x=>x.school===school
        );



        passed.push(

            rows.filter(
                x=>x.passed
            ).length

        );



        failed.push(

            rows.filter(
                x=>!x.passed
            ).length

        );


    });





    chartInstances.schoolStack =

    new Chart(

    document.getElementById(
        "schoolStackChart"
    ),


    {


    type:"bar",


    data:{


        labels,


        datasets:[


        {


        label:"کامیاب",

        data:passed


        },


        {


        label:"ناکام",

        data:failed


        }


        ]


    },


    options:{


        ...chartOptions,


        scales:{


            x:{
                stacked:true
            },


            y:{
                stacked:true
            }


        }


    }


    });


}









// ============================================
// District Chart
// ============================================


function createDistrictChart(data){


    const districts =

    groupCount(
        data,
        "district"
    );



    chartInstances.district =

    new Chart(

    document.getElementById(
        "districtChart"
    ),


    {


    type:"line",


    data:{


        labels:
        Object.keys(districts),


        datasets:[{


            label:
            "اشتراک کننده",


            data:
            Object.values(districts),


            fill:true


        }]


    },


    options:chartOptions


    });


}









// ============================================
// Bubble Chart
// ============================================


function createBubbleChart(data){


    const schools = {};



    data.forEach(student=>{


        if(!schools[student.school]){


            schools[student.school]={

                count:0,

                totalScore:0

            };


        }



        schools[student.school].count++;


        schools[student.school].totalScore +=
        student.score;


    });




    const bubbleData =

    Object.keys(schools)
    .slice(0,30)
    .map(name=>{


        const item =
        schools[name];


        return {


            x:
            item.count,


            y:
            Number(
                (
                item.totalScore /
                item.count
                )
                .toFixed(2)
            ),


            r:
            Math.max(
                5,
                item.count/10
            ),


            label:name


        };


    });





    chartInstances.bubble =

    new Chart(

    document.getElementById(
        "bubbleChart"
    ),


    {


    type:"bubble",


    data:{


        datasets:[{


            label:
            "مقایسه مکاتب",


            data:
            bubbleData


        }]


    },


    options:chartOptions


    });



}









// ============================================
// Helper Functions
// ============================================


function groupCount(data,key){


    return data.reduce(

        (obj,item)=>{


            const value =
            item[key] || "نامشخص";


            obj[value] =
            (obj[value] || 0)+1;


            return obj;


        },

        {}

    );


}






function topGroups(data,key,limit){


    const groups =
    groupCount(
        data,
        key
    );



    const sorted =

    Object.entries(groups)

    .sort(
        (a,b)=>b[1]-a[1]
    )

    .slice(0,limit);



    return {


        labels:
        sorted.map(x=>x[0]),


        values:
        sorted.map(x=>x[1])


    };


}