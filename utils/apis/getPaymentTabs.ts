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

        Estimate and list all single payments (with type and amount, with date on that month if could be estimated) the surrogate would get on the following 12 month separated into months in json format as the example below:
        Json Example:
        {"certain_payments":{"Jan 2022":[{"date":1,"type":"fee1","amount":10.00},{"type":"fee2","amount":10.00}],"Feb 2022":[{"date":12,"type":"fee2","amount":11.00}],...},"uncertain_payments":[{"type":"fee4","amount":100.00}],}

        JSON answers:`,
        },
    ];
    // Note: Ensure that the 'date' and 'type' fields in the JSON are formatted as strings, while the 'amount' field should always be in numerical format.


    const { lastChoice: sbpLastChoice } =
        await openAiChat(chat,1200);

    if(sbpLastChoice?.content==null){throw "Error while getting estimated payments!";}
    return sbpLastChoice?.content;

}
