function applyColors(data, userCaloriesPerDay) {
    let i = 0;
    while (i < data.length) {
        let caloriesCounter = data[i].calories;
        let c = i + 1;
        while (c < data.length && new Date(data[c].dateAndTime).toLocaleString("en-US").split(', ')[0] === new Date(data[i].dateAndTime).toLocaleString("en-US").split(', ')[0]) {
            caloriesCounter += data[c].calories
            c++;
        }
        if (caloriesCounter > userCaloriesPerDay) {
            for (let m = i; m < c; m++) {
                data[m].color = "red";
            }
        } else {
            for (let m = i; m < c; m++) {
                data[m].color = "green";
            }
        }
        i = c;
    }
    return data;
}

module.exports = {
    applyColors
};