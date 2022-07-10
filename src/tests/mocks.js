const mockDynamoDbPut = jest.fn().mockImplementation(() => {
    return {
        promise() {
            return Promise.resolve({});
        }
    };
});

module.exports = { mockDynamoDbPut }