export class Recipe {
    title: String = '';
    author: String = '';
    image: String = '';
    description: String = '';
    id: Number = null;
    steps: Step[] = [];
    ingredients: any[] = [];

    constructor(obj?: any) {
        Object.assign(this, obj);
    }

}

export class Step {
    number: Number = null;
    instruction: String = '';
}