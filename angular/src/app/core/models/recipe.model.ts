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
    user_recipe: boolean = false;
    tags: any = null;

}

export class Step {
    number: Number = null;
    instruction: String = '';
}