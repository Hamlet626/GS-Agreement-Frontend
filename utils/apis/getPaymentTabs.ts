import openAiChat from "../openAiChat";

export const getPaymentTabs = async (fileText: string, formOptions: string):Promise<string> => {
    const chat = [
        {
            role: "system",
            content: `You are a helpful contract document analyst for the file below:
        ${fileText}
        `,
        },
        {
            role: "user",
            content: `Given the document, and these information by surrogate:

        ${formOptions}

        Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format(in one line without any quotation marks!) as the example below:
        Json answer example:
        {certain_payments:{Jan 2022:[{date:1,type:Compensation Fee,amount:10.00},{type:Insurance Fee,amount:10.00}],Feb 2022:[{date:12,type:Insurance Fee,amount:11.00}],...},uncertain_payments:[{type:Xx Fee,amount:100.00}]}

        JSON answers in one line without any quotation marks:`,
        },
    ];
    // Note: Ensure that the 'date' and 'type' fields in the JSON are formatted as strings, while the 'amount' field should always be in numerical format.


    const { lastChoice: sbpLastChoice } =
        await openAiChat(chat,900);

    if(sbpLastChoice?.content==null){throw "Error while getting estimated payments!";}

    console.log(`sbpLastChoice: ${sbpLastChoice.content}`);
    let correctJson = sbpLastChoice?.content
        .replace(/(['"])?([^{}[\]:,]*[^{}[\]:, ][^{}[\]:,]*)(['"])?:/g, '"$2":')
        .replace(/:(['"])?([^{}[\]:,]*[^{}[\]:, ][^{}[\]:,]*)(['"])?/g, ':"$2"');
    console.log(`correctJson: ${correctJson}`);
    correctJson=JSON.stringify(JSON.parse(correctJson,(key,value)=>{
        if(typeof value==="string"){
            return /^[0-9,.]+$/.test(value)?parseFloat(value.trim()):value.trim();
        }
        return value;
    }));
    console.log(`correctJson: ${correctJson}`);
    return correctJson;

}
