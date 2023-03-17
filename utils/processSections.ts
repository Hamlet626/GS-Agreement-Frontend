export const processSections=(titles:string[],rawText:string)=>{
    titles=titles.filter((t)=>/[a-z]/i.test(t) &&
        t === t?.toUpperCase() &&
        t.split(" ").filter((word) => word !== "").length < 16);

    let sections=[];
    let i=0;
    while (i <= titles.length) {
        let section;
        if(i!==titles.length) {
            let matchIndexes = Array.from(rawText.matchAll(new RegExp(titles[i], 'g'))).map((e) => e.index);
            let title2;
            ///if(couldn't find original title)
            if (matchIndexes.length === 0) {
                title2 = titles[i].replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
                matchIndexes = Array.from(rawText.matchAll(new RegExp(title2, 'g'))).map((e) => e.index);

                ///if(couldn't find title without leading/ending [^a-z])
                if (matchIndexes.length === 0) {
                    titles.splice(i, 1);
                    continue;
                }
            }
            section = rawText.substring(0, matchIndexes[0]!);
            rawText = rawText.substring(matchIndexes[0]! + (title2 || titles[i]).length);
        }else section=rawText;

        sections.push({
            title: i===0?"  ":
                titles[i-1]?.replaceAll(/\s{3,}/g, "").replace(/\t/g, "").trim(),
            text: section
                .replace(/(?<!\n)\n(?!\n)/g, "")
                .replace(/^\n\n(?!$)/, "")
                .replace(/\n+$/, ""),
            transcriptions: [],
        });
        i++;
    }
    /// remove first section(which without a title) if it's empty.
    if(!/[a-z]/i.test(sections[0].text))sections.splice(0,1);
    return sections;
}