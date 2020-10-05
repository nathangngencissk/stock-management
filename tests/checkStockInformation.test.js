const { mockRequest, mockResponse } = require('../src/utils/interceptor');
const controller = require('../src/controllers/shop')();

describe("Check method \'getStockInformation\' ", () => {
    test('should 200 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await controller.getStockInformation(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith('Shop not found');
    });

    test('should 500 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = null;
        const res = mockResponse();

        await controller.getStockInformation(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'No Id received' });
    });
});