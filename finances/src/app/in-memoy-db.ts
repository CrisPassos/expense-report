import { Category } from './pages/categories/shared/category.model';
import { InMemoryDbService, httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas de Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinemas, parques, praias, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalhos com freelancher' },
    ];

    return categories;
  }

}

