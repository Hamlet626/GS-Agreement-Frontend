import openAiChat from "./openAiChat";

export async function mergeDates(sbpFields:{date:string[],boolean:string[]}) {
    const dateResponse=(await openAiChat([
        { role: "system", content: `You are an intellectual assistant. Given a set of dates:
            ${JSON.stringify(sbpFields.date)}` },
        { role: "user", content: `What are the dates that could be inferred or simplified into one single date?
            For example:
            Set of dates: [“3 days after happening of event a”, “5 weeks of event a”, “next month after 20 weeks of event a”, “next month of event b”]
            Response: {“date of event a”:[“3 days after happening of event a”, “5 weeks of event a”, “next month after 20 weeks of event a”]}
            JSON response ONLY:` },
    ],1000)).lastChoice;
    const dateMergeList=JSON.parse(dateResponse?.content || "");
    sbpFields.date=Object.keys(dateMergeList);
    return {sbpFields,dateMergeList};
}

export async function unmergeDates(sbpForm: Object, dateMergeList:{[key:string]:string[]}) {
    let formOptions: string;

    const dates=Object.entries(sbpForm).filter(([key, value]) => value!=="Yes" && value !== "No");

    // console.log(`dateMergeList: ${JSON.stringify(dateMergeList)}`);
    ///if user didn't fill any date, no need to ask for dates to prevent ChatGPT Error
    if(dates.length===0){
        formOptions=Object.entries(sbpForm)
            .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
            .join("\n");
    } else{
        const allDatesKeys=Object.keys(dateMergeList).reduce((acc,key)=>{
            if(dates.some(([k,v])=>k===key))
                acc=acc.concat(dateMergeList[key]);
            return acc
        },[]as string[]);
        const allDates=JSON.parse((await openAiChat([
            { role: "system", content: `You are a date calculator assistant. Known these dates:
          ${dates.map(([k,v])=>`${k}: ${v}`).join("\n")}` },
            { role: "user", content: `What would be the following date?
          ${allDatesKeys.join("\n")}
          answer in JSON (with formate {“date a”:“01-16-2023", “date b”: “02-22-2023"}):` },
        ])).lastChoice?.content||"");

        formOptions = Object.entries(allDates)
            .concat(Object.entries(sbpForm).filter(([key, value]) =>value==="Yes" || value === "No"))
            .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
            .join("\n");
    }
    return formOptions;
}