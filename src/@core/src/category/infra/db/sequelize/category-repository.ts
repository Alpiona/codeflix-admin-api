import { UniqueEntityId } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";

export class CategorySequelizeRepository extends CategoryRepository {
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {}

  async findById(id: string | UniqueEntityId): Promise<Category> {
    return new Category({});
  }

  async findAll(): Promise<Category[]> {
    return [];
  }

  async update(entity: Category): Promise<void> {}

  async delete(id: string | UniqueEntityId): Promise<void> {}

  sortableFields: string[];

  async search(
    props: CategoryRepository.SearchParms
  ): Promise<CategoryRepository.SearchResult> {}
}
