function createDateData() {
    let date = {};
    for (let i = 1950; i < 2050; i++) {
        let month = {};
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    day.push(k);
                }
            }
            else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                for (let k = 1; k < 32; k++) {
                    day.push(k);
                }
            }
            else {
                for (let k = 1; k < 31; k++) {
                    day.push(k);
                }
            }
            month[j] = day;
        }
        date[i] = month;
    }
    return date;
};
//moment("06/22/2015", "DD/MM/YYYY", true).isValid(); 