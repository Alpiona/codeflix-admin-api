import { UniqueEntityId } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";
import { CategoryModel } from './category-model';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON())
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    return new Category({name: 'teste'});
  }

  async findAll(): Promise<Category[]> {
    return [];
  }

  async update(entity: Category): Promise<void> {}

  async delete(id: string | UniqueEntityId): Promise<void> {}

  sortableFields: string[] = ['name', 'created_at'];

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    return 
  }
}
