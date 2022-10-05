import { instanceToPlain } from 'class-transformer';
import { CategoryPresenter } from './category.presenter';

describe('CategoryPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '0af15cfe-d6e0-4f78-aeeb-a96cef5401d6',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      expect(presenter.id).toBe('0af15cfe-d6e0-4f78-aeeb-a96cef5401d6');
      expect(presenter.name).toBe('movie');
      expect(presenter.description).toBe('some description');
      expect(presenter.is_active).toBe(true);
      expect(presenter.created_at).toBe(created_at);
    });
  });

  it('should presenter data', () => {
    const created_at = new Date();
    const presenter = new CategoryPresenter({
      id: '0af15cfe-d6e0-4f78-aeeb-a96cef5401d6',
      name: 'movie',
      description: 'some description',
      is_active: true,
      created_at,
    });

    const data = instanceToPlain(presenter);
    expect(data).toStrictEqual({
      id: '0af15cfe-d6e0-4f78-aeeb-a96cef5401d6',
      name: 'movie',
      description: 'some description',
      is_active: true,
      created_at: created_at.toISOString(),
    });
  });
});
