
type PaymentByType = {
    [key: string]: {date:string|undefined,amount:number|string}[]
}
type PaymentByDate = {
    certain_payments:{[date:string]:{date:number|undefined,type:string,amount:number|string}[]},
    uncertain_payments:{type:string,amount:number|string}[]
}
export default function reFormatPayments(byType:PaymentByType):PaymentByDate {
    let byDate:PaymentByDate = {certain_payments:{},uncertain_payments:[]}
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    for (let type in byType) {
        for (let date in byType[type]) {
            // let dateMDY,dateKey;
            // if (byType[type][date].date){
            //     const dateMDY = byType[type][date].date!.split('-');
            //     const month = parseInt(dateMDY[0]);
            //     if(month>0&&month<12)
            //         dateKey= `${months[month-1]} ${dateMDY[dateMDY.length-1]}`;
            // }
            if (byType[type][date].date&&typeof byType[type][date].amount === 'number') {
                const dateMDY = byType[type][date].date!.split('-');
                const month = parseInt(dateMDY[0]);
                const dateKey= `${months[month-1]} ${dateMDY[dateMDY.length-1]}`;
                if (!byDate.certain_payments[dateKey]) {
                    byDate.certain_payments[dateKey] = []
                }
                byDate.certain_payments[dateKey].push({
                    date:dateMDY.length==3?parseInt(dateMDY[1]):undefined,
                    type:type,
                    amount:byType[type][date].amount
                })
            } else {
                byDate.uncertain_payments.push({
                    type:type,
                    amount:byType[type][date].amount
                })
            }
        }
    }
    byDate.certain_payments = Object.keys(byDate.certain_payments)
        .sort((a, b)=>{
            ///compare "mmm yyyy" to "mmm yyyy"
            const aSplit = a.split(' ');
            const bSplit = b.split(' ');
            const aMonth = months.indexOf(aSplit[0]);
            const bMonth = months.indexOf(bSplit[0]);
            return `${aSplit[1]} ${aMonth}`==`${bSplit[1]} ${bMonth}`?0:
                `${aSplit[1]} ${aMonth}` > `${bSplit[1]} ${bMonth}`?1:-1;
        })
        .reduce(
        (obj, key) => {
            obj[key] = byDate.certain_payments[key];
            return obj;
        },
        {}as {[date:string]:{date:number|undefined,type:string,amount:number|string}[]}
    );
    return byDate
}

/// format "mm-dd-yyyy" to "mmm yyyy"