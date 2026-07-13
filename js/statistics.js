// ============================================
// Kankor Dashboard
// Statistics Calculation Engine
// ============================================



// ============================================
// Main Statistics Function
// ============================================

function calculateStatistics(data) {


    if (!data || data.length === 0) {

        return {

            total:0,
            passed:0,
            failed:0,
            highest:0,
            lowest:0,
            average:0,
            median:0,
            mode:0,
            standardDeviation:0,
            passPercentage:0,
            failPercentage:0,
            schools:0,
            universities:0,
            faculties:0

        };

    }



    const scores =
        data.map(x => x.score)
            .filter(x => x > 0);




    const total =
        data.length;



    const passed =
        data.filter(x => x.passed).length;



    const failed =
        total - passed;



    return {


        total,


        passed,


        failed,


        highest:
        Math.max(...scores),



        lowest:
        Math.min(...scores),



        average:
        calculateAverage(scores),



        median:
        calculateMedian(scores),



        mode:
        calculateMode(scores),



        standardDeviation:
        calculateStandardDeviation(scores),



        passPercentage:
        percentage(
            passed,
            total
        ),



        failPercentage:
        percentage(
            failed,
            total
        ),



        schools:
        uniqueCount(
            data,
            "school"
        ),



        universities:
        uniqueCount(
            data,
            "university"
        ),



        faculties:
        uniqueCount(
            data,
            "faculty"
        )

    };


}








// ============================================
// Average
// ============================================

function calculateAverage(numbers){


    if(numbers.length===0)
        return 0;


    const sum =
    numbers.reduce(
        (a,b)=>a+b,
        0
    );


    return round(
        sum / numbers.length
    );


}








// ============================================
// Median
// ============================================

function calculateMedian(numbers){


    if(numbers.length===0)
        return 0;



    const sorted =
    [...numbers]
    .sort(
        (a,b)=>a-b
    );



    const middle =
    Math.floor(
        sorted.length/2
    );



    if(sorted.length % 2 === 0){


        return round(
            (
                sorted[middle-1]
                +
                sorted[middle]
            )
            /
            2
        );


    }



    return round(
        sorted[middle]
    );


}









// ============================================
// Mode
// ============================================

function calculateMode(numbers){


    const frequency={};



    numbers.forEach(num=>{


        const key =
        num.toFixed(2);



        frequency[key] =
        (frequency[key] || 0)+1;


    });



    let max = 0;

    let mode = 0;



    Object.keys(frequency)
    .forEach(key=>{


        if(frequency[key]>max){


            max =
            frequency[key];


            mode =
            Number(key);


        }


    });



    return mode;


}









// ============================================
// Standard Deviation
// ============================================

function calculateStandardDeviation(numbers){


    if(numbers.length===0)
        return 0;



    const mean =
    calculateAverage(numbers);



    const variance =
    numbers.reduce(
        (sum,value)=>{

            return sum +
            Math.pow(
                value-mean,
                2
            );

        },
        0
    )
    /
    numbers.length;



    return round(
        Math.sqrt(variance)
    );


}









// ============================================
// Percentage
// ============================================

function percentage(value,total){


    if(total===0)
        return 0;



    return round(
        (value/total)*100
    );


}









// ============================================
// Unique Count
// ============================================

function uniqueCount(data,column){


    return new Set(

        data
        .map(x=>x[column])
        .filter(Boolean)

    ).size;


}








// ============================================
// Round Numbers
// ============================================

function round(value){


    return Number(
        value.toFixed(2)
    );


}