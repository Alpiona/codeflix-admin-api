import InMemoryRepository from "../../../@seedwork/domain/repository/in-memory.repository";
import Category from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";

export default class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements CategoryRepository {}
