// ============================================
// Kankor Dashboard
// Dynamic Tables Engine
// ============================================



document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeTableButtons();

    }
);







// ============================================
// Refresh All Tables
// ============================================


function refreshTables(data){


    createTopStudentsTable(data);


    createSchoolStatisticsTable(data);


}









// ============================================
// Top Students Table
// ============================================


function createTopStudentsTable(data){


    const table =
    document.getElementById(
        "topStudentsTable"
    );



    if(!table)
        return;



    const students =

    [...data]

    .sort(
        (a,b)=>
        b.score-a.score
    )

    .slice(0,10);




    table.innerHTML="";



    students.forEach(
        (student,index)=>{


        table.innerHTML += `

        <tr>

            <td>
            ${index+1}
            </td>


            <td>
            ${student.name}
            </td>


            <td>
            ${student.school}
            </td>


            <td>
            ${student.score.toFixed(2)}
            </td>


            <td>
            ${student.faculty}
            </td>


            <td>
            ${student.university}
            </td>


        </tr>

        `;


    });


}









// ============================================
// School Statistics Table
// ============================================


function createSchoolStatisticsTable(data){


    const table =
    document.getElementById(
        "schoolStatisticsTable"
    );


    if(!table)
        return;




    const schools={};



    data.forEach(student=>{


        if(!schools[student.school]){


            schools[student.school]={

                total:0,

                passed:0,

                failed:0,

                scores:[]


            };


        }




        const item =
        schools[student.school];



        item.total++;



        if(student.passed)

            item.passed++;

        else

            item.failed++;




        item.scores.push(
            student.score
        );



    });







    const rows =

    Object.entries(schools)

    .map(([name,item])=>{


        const average =

        item.scores.reduce(
            (a,b)=>a+b,
            0
        )
        /
        item.scores.length;



        return {


            name,

            total:item.total,

            passed:item.passed,

            failed:item.failed,


            average:


            average.toFixed(2),


            highest:


            Math.max(
                ...item.scores
            ).toFixed(2),


            rate:

            (
                item.passed /
                item.total *
                100

            ).toFixed(2)

        };


    })


    .sort(
        (a,b)=>
        b.total-a.total
    );







    table.innerHTML="";



    rows.forEach(row=>{


        table.innerHTML += `

        <tr>

        <td>
        ${row.name}
        </td>


        <td>
        ${row.total}
        </td>


        <td>
        ${row.passed}
        </td>


        <td>
        ${row.failed}
        </td>


        <td>
        ${row.average}
        </td>


        <td>
        ${row.highest}
        </td>


        <td>
        ${row.rate}%
        </td>


        </tr>

        `;


    });



}









// ============================================
// Export Tables To Excel
// ============================================


function exportTablesToExcel(){


    const workbook =
    XLSX.utils.book_new();




    const topTable =
    document.querySelector(
        "#topStudentsTable"
    );



    const schoolTable =
    document.querySelector(
        "#schoolStatisticsTable"
    );





    if(topTable){


        const sheet =
        XLSX.utils.table_to_sheet(
            topTable.parentElement
        );


        XLSX.utils.book_append_sheet(

            workbook,

            sheet,

            "Top Students"

        );


    }







    if(schoolTable){


        const sheet =
        XLSX.utils.table_to_sheet(
            schoolTable.parentElement
        );


        XLSX.utils.book_append_sheet(

            workbook,

            sheet,

            "Schools"

        );


    }





    XLSX.writeFile(

        workbook,

        "Kankor_Logar_Report.xlsx"

    );



}









// ============================================
// Print Dashboard
// ============================================


function printDashboard(){


    window.print();


}









// ============================================
// Buttons
// ============================================


function initializeTableButtons(){


    const exportBtn =
    document.getElementById(
        "exportExcelBtn"
    );



    if(exportBtn){


        exportBtn.onclick =
        exportTablesToExcel;


    }




    const printBtn =
    document.getElementById(
        "printBtn"
    );



    if(printBtn){


        printBtn.onclick =
        printDashboard;


    }



}