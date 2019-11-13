export class Recipe {
    title: String = '';
    author: String = '';
    image: String = '';
    description: String = '';
    id: Number = null;
    steps: Step[] = [];
    ingredients: any[] = [];
    notes: String = '';
    shoppingListItem: boolean = false;

    // constructor(obj?: any) {
    //     Object.assign(this, obj);
    // }

}

export class Step {
    number: Number = null;
    instruction: String = '';
}