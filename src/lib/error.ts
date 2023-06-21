
export class NumberExists extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, NumberExists.prototype);
    }
}

export class NumberNotFound extends  Error{
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, NumberNotFound.prototype)
    }
}