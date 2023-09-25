const { mockRequest, mockResponse } = require('jest-mock-req-res'); 
const User = require('../../models/user');
const { update } = require('./users'); 

jest.mock('../../models/user', () => ({
    findByIdAndUpdate: jest.fn()
}));

describe('update function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update user and return updated user', async () => {
        const req = mockRequest({
            body: { caloriesPerDay: 2000 },
            user: { _id: 'some-id' }
        });
        const res = mockResponse();

        // Mock the successful findByIdAndUpdate method
        User.findByIdAndUpdate.mockResolvedValue({ some: 'updatedUser' });

        await update(req, res);
        expect(res.json).toHaveBeenCalledWith({ some: 'updatedUser' });
    });

    it('should return 404 if user not found', async () => {
        const req = mockRequest({
            body: { caloriesPerDay: 2000 },
            user: { _id: 'some-id' }
        });
        const res = mockResponse();

        // Mock the findByIdAndUpdate method to return null (user not found)
        User.findByIdAndUpdate.mockResolvedValue(null);

        await update(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 500 on any other error', async () => {
        const req = mockRequest({
            body: { caloriesPerDay: 2000 },
            user: { _id: 'some-id' }
        });
        const res = mockResponse();

        // Mock the findByIdAndUpdate method to throw an error
        User.findByIdAndUpdate.mockRejectedValue(new Error('Test Error'));

        await update(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while updating caloriesPerDay' });
    });
});
