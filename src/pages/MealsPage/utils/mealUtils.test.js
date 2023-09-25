const { applyColors } = require('./mealUtils'); 

describe('applyColors function', () => {

    it('should color all items red if total calories exceed userCaloriesPerDay for a day', () => {
        const data = [
            { dateAndTime: '2023-09-23T12:00:00Z', calories: 1000 },
            { dateAndTime: '2023-09-23T14:00:00Z', calories: 1000 },
            { dateAndTime: '2023-09-22T18:00:00Z', calories: 1000 },
        ];
        const userCaloriesPerDay = 1500;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result[0].color).toBe('red');
        expect(result[1].color).toBe('red');
        expect(result[1].color).toBe('red');
    });

    it('should set green color if total calories are less than userCaloriesPerDay for a day', () => {
        const data = [
            { dateAndTime: '2023-09-23T12:00:00Z', calories: 500 },
            { dateAndTime: '2023-09-23T18:00:00Z', calories: 500 },
        ];
        const userCaloriesPerDay = 1500;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result[0].color).toBe('green');
        expect(result[1].color).toBe('green');
    });

    it('should set green color if total calories are equal userCaloriesPerDay for a day', () => {
        const data = [
            { dateAndTime: '2023-09-23T12:00:00Z', calories: 500 },
            { dateAndTime: '2023-09-23T14:00:00Z', calories: 500 },
            { dateAndTime: '2023-09-23T18:00:00Z', calories: 500 },
        ];
        const userCaloriesPerDay = 1500;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result[0].color).toBe('green');
        expect(result[1].color).toBe('green');
        expect(result[2].color).toBe('green');
    });

    it('should set correct colors for different dates', () => {
        const data = [
            { dateAndTime: '2023-09-23T12:00:00Z', calories: 1000 },
            { dateAndTime: '2023-09-23T18:00:00Z', calories: 1000 },
            { dateAndTime: '2023-09-24T12:00:00Z', calories: 500 },
            { dateAndTime: '2023-09-24T18:00:00Z', calories: 500 },
            { dateAndTime: '2023-09-24T19:00:00Z', calories: 200 },
        ];
        const userCaloriesPerDay = 1500;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result[0].color).toBe('red');
        expect(result[1].color).toBe('red');
        expect(result[2].color).toBe('green');
        expect(result[3].color).toBe('green');
        expect(result[4].color).toBe('green');
    });

    it('should apply new colors for existing colors if userCaloriesPerDay exceeds the previously applied value', () => {
        const data = [
            { dateAndTime: '2023-09-23T12:00:00Z', calories: 500, color: "green" },
            { dateAndTime: '2023-09-23T18:00:00Z', calories: 500, color: "green" },
        ];
        const userCaloriesPerDay = 800;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result[0].color).toBe('red');
        expect(result[1].color).toBe('red');
    });

    it('should handle an empty data array', () => {
        const data = [];
        const userCaloriesPerDay = 1500;
        const result = applyColors(data, userCaloriesPerDay);
        expect(result).toEqual([]);
    });
});
