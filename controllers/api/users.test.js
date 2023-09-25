const { mockRequest, mockResponse } = require('jest-mock-req-res'); 
const { update } = require('./users');
const User = require('../../models/user');

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

        User.findByIdAndUpdate.mockResolvedValue(null);

        await update(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
});


