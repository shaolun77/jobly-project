const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
    test("should generate SQL SET clause and values for partial update", () => {
        const dataToUpdate = {
            firstName: "Aliya",
            age: 32,
        };

        const jsToSql = {
            firstName: "first_name",
            age: "age",
        };

        const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ["Aliya", 32],
        });
    });

    test("should throw BadRequestError if no data is provided", () => {
        const dataToUpdate = {};

        const jsToSql = {
            firstName: "first_name",
            age: "age",
        };

        expect(() => {
            sqlForPartialUpdate(dataToUpdate, jsToSql);
        }).toThrow(BadRequestError);
    });

    // test("works: 1 item", function () {
    //     const result = sqlForPartialUpdate(
    //         { f1: "v1" },
    //         { f1: "f1", fF2: "f2" });
    //     expect(result).toEqual({
    //         setCols: "\"f1\"=$1",
    //         values: ["v1"],
    //     });
    // });

    // test("works: 2 items", function () {
    //     const result = sqlForPartialUpdate(
    //         { f1: "v1", jsF2: "v2" },
    //         { jsF2: "f2" });
    //     expect(result).toEqual({
    //         setCols: "\"f1\"=$1, \"f2\"=$2",
    //         values: ["v1", "v2"],
    //     });
    // });        


});