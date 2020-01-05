export class Recipe {
    title: string = '';
    author: string = '';
    image: string = '';
    description: string = '';
    id: Number = null;
    steps: Step[] = [];
    ingredient_sections: [];
    notes: string = '';
    shoppingListItem: boolean = false;
    user_recipe: boolean = false;
    tags: any = null;

}

export class Step {
    number: Number = null;
    instruction: string = '';
}