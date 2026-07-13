// ============================================
// Kankor Dashboard - Utility Functions
// Excel Data Processing Engine
// ============================================


let allStudents = [];

let filteredStudents = [];


// async function loadExcelFromServer() {


//     const response = await fetch(
//         "data/kankor-logar.xlsx"
//     );


//     if(!response.ok){

//         throw new Error(
//             "Excel file not found"
//         );

//     }


//     const buffer =
//     await response.arrayBuffer();



//     const workbook =
//     XLSX.read(
//         buffer,
//         {
//             type:"array"
//         }
//     );



//     const sheetName =
//     workbook.SheetNames[0];



//     const sheet =
//     workbook.Sheets[sheetName];



//     const rows =
//     XLSX.utils.sheet_to_json(
//         sheet,
//         {
//             defval:""
//         }
//     );



//     return normalizeStudentData(rows);


// }

// Excel Column Mapping
// Change only here if Excel headers change


async function loadDataFromServer() {

    const response = await fetch(
        "data/logar-kankor-1405.json"
    );


    if (!response.ok) {

        throw new Error(
            "JSON file not found"
        );

    }


    const rows =
    await response.json();


    return normalizeStudentData(rows);

}


const excelColumns = {

    id: "کانکور آی دی",

    name: "اسم / نوم",

    fatherName: "اسم پدر / د پلار نوم",

    grandfatherName: "اسم پدرکلان",

    gender: "جنسیت",

    province: "ولایت",

    school: "مکتب",

    score: "نمره",

    result: "نتیجه",

    examType: "نوع امتحان"

};







// ============================================
// Load Excel File
// ============================================

function loadExcelFile(file) {


    return new Promise((resolve, reject) => {


        const reader = new FileReader();



        reader.onload = function(e) {


            try {


                const data = new Uint8Array(
                    e.target.result
                );


                const workbook = XLSX.read(
                    data,
                    {
                        type: "array"
                    }
                );



                const sheetName =
                    workbook.SheetNames[0];



                const worksheet =
                    workbook.Sheets[sheetName];



                const rows =
                    XLSX.utils.sheet_to_json(
                        worksheet,
                        {
                            defval:""
                        }
                    );



                const students =
                    normalizeStudentData(rows);



                resolve(students);



            }
            catch(error){

                reject(error);

            }


        };



        reader.onerror = reject;



        reader.readAsArrayBuffer(file);


    });


}








// ============================================
// Normalize Excel Data
// ============================================


function normalizeStudentData(rows) {


    return rows.map(row => {


        const resultText =
            row[excelColumns.result] || "";



        return {


            id:
            row[excelColumns.id],



            name:
            row[excelColumns.name],



            fatherName:
            row[excelColumns.fatherName],



            grandfatherName:
            row[excelColumns.grandfatherName],



            gender:
            row[excelColumns.gender],



            province:
            row[excelColumns.province],



            school:
            row[excelColumns.school],



            score:
            Number(
                row[excelColumns.score]
            ) || 0,



            result:
            resultText,



            examType:
            row[excelColumns.examType],



            passed:
            detectPassed(resultText),



            university:
            extractUniversity(resultText),



            faculty:
            extractFaculty(resultText)



        };


    });


}









// ============================================
// Detect Passed Students
// ============================================

function detectPassed(result) {


    if(!result)
        return false;



    const keywords = [

        "بریالی",

        "قبول",

        "کامیاب",

        "موفق"

    ];



    return keywords.some(
        x => result.includes(x)
    );


}









// ============================================
// Extract University
// ============================================


function extractUniversity(text){


    if(!text)
        return "نامشخص";



    const keywords = [

        "پوهنتون",

        "دانشگاه"

    ];



    let index = -1;



    keywords.forEach(k => {


        const i =
        text.indexOf(k);


        if(i > index)
            index=i;


    });



    if(index === -1)
        return "نامشخص";



    let start =
    Math.max(
        0,
        index-40
    );



    return text
        .substring(start,index+10)
        .trim();


}









// ============================================
// Extract Faculty
// ============================================


function extractFaculty(text){


    if(!text)
        return "نامشخص";



    const facultyKeywords = [

        "پوهنځي",

        "پوهنځی",

        "فاکولته"

    ];



    for(const key of facultyKeywords){


        const index =
        text.indexOf(key);



        if(index !== -1){


            return text
            .substring(
                Math.max(0,index-25),
                index+10
            )
            .trim();


        }


    }



    return "نامشخص";


}








// ============================================
// Apply Filter Dataset
// ============================================


function applyCurrentData(data){


    filteredStudents = data;


}
