export class Recipe {
    title: String = '';
    author: String = '';
    image: String = '';
    description: String = '';
    id: Number = null;
    steps: Step[] = [];
    ingredient_sections: [];
    notes: String = '';
    shoppingListItem: boolean = false;

}

export class Step {
    number: Number = null;
    instruction: String = '';
}