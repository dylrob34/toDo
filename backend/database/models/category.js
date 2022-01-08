const database = require("../data");

class Category {
    constructor(id, owner, title, color)  {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.color = color;
    }

    static async getCategory(id) {
        let temp;
        try {
            temp = await database.getCategory(id);
        } catch {
            return null;
        }
        return new Category(temp._id, temp.owner, temp.title, temp.color);
    }

    static async getCategories(owner) {
        const categories = await database.getCategories(owner);
        return categories;
    }

    static async createCategory(owner, title, color) {
        const result = await database.createCategory(
            owner,
            title,
            color
            )
        .catch(() => {
            throw "Error Creating Category";
        });
        let category = await Category.getCategory(result.ops[0]._id);
        return category;
    }

    async delete() {
        database.deleteCategory(this.id);
    }

    async edit(title, color) {
        this.title = title;
        this.color = color;
        const something = await database.editCategory(this.id, title, color);

    }

}

module.exports = Category